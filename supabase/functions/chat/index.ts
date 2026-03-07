import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the Social Factory Assistant — a friendly, knowledgeable guide for visitors to the Social Factory website. Social Factory is Ireland's first social factory, a bold community hub in Limerick tackling loneliness through action sports, creative arts, wellness, and entrepreneurship.

Key facts you should know:
- Social Factory has four domains: Social (skate, climb, dance, create), Work (co-working & maker space), Health (gyms, wellness, clinicians), and Market (local food, crafts, weekend markets).
- It is a 30,000+ sq ft shared space in Limerick.
- It is a mission-locked social enterprise — all surpluses reinvested into programmes and community.
- Governance follows the New European Bauhaus Compass prioritising sustainability, inclusion, and quality of everyday life.
- The project is grounded in science: Planet Youth model, UN SDGs, Ireland's Healthy Communities framework, and New European Bauhaus values.
- 87% of participants in similar community programs report reduced loneliness.
- 12+ evidence-based intervention frameworks inform the work.

Be warm, concise, and encouraging. If someone asks something outside your knowledge, suggest they use the Contact page. Keep answers under 150 words unless more detail is requested.`;

async function checkRateLimit(supabase: any, ipAddress: string, endpoint: string): Promise<boolean> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const { count, error } = await supabase
    .from("rate_limit_tracking")
    .select("*", { count: "exact", head: true })
    .eq("ip_address", ipAddress)
    .eq("endpoint", endpoint)
    .gte("created_at", oneHourAgo);

  if (error) {
    console.error("Rate limit check error:", error);
    return true;
  }

  if (count !== null && count >= 20) {
    return false;
  }

  await supabase
    .from("rate_limit_tracking")
    .insert({ ip_address: ipAddress, endpoint });

  return true;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
                      req.headers.get("x-real-ip") ||
                      "unknown";

    const isAllowed = await checkRateLimit(supabase, ipAddress, "chat");
    if (!isAllowed) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages } = await req.json();

    // Validate messages payload
    const MAX_MESSAGES = 20;
    const MAX_MSG_LENGTH = 2000;
    const ALLOWED_ROLES = new Set(["user", "assistant"]);

    if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
      return new Response(
        JSON.stringify({ error: "Invalid request" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    for (const msg of messages) {
      if (!ALLOWED_ROLES.has(msg.role) || typeof msg.content !== "string" || msg.content.length > MAX_MSG_LENGTH) {
        return new Response(
          JSON.stringify({ error: "Invalid message format" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Unable to process your request. Please try again later." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: "Unable to process your request. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
