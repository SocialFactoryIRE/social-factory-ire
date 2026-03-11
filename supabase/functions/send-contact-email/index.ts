import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Server-side validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(5000, "Message must be less than 5000 characters"),
});

// HTML escape function to prevent XSS
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Rate limiting function
async function checkRateLimit(supabase: any, ipAddress: string, endpoint: string): Promise<boolean> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  // Count submissions from this IP in the last hour
  const { count, error } = await supabase
    .from("rate_limit_tracking")
    .select("*", { count: "exact", head: true })
    .eq("ip_address", ipAddress)
    .eq("endpoint", endpoint)
    .gte("created_at", oneHourAgo);

  if (error) {
    console.error("Rate limit check error:", error);
    return true; // Allow on error to not block legitimate users
  }

  // Allow max 5 submissions per hour
  if (count !== null && count >= 2000) {
    return false;
  }

  // Record this attempt
  await supabase.from("rate_limit_tracking").insert({ ip_address: ipAddress, endpoint });

  return true;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role key for rate limiting table access
    const supabase = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");

    // Extract IP address from request headers
    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";

    // Check rate limit
    const isAllowed = await checkRateLimit(supabase, ipAddress, "send-contact-email");
    if (!isAllowed) {
      console.warn(`Rate limit exceeded for IP: ${ipAddress}`);
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded. Please try again later.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    const body = await req.json();

    // Validate input with Zod
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error.errors);
      return new Response(
        JSON.stringify({
          error: "Invalid input data",
          details: validationResult.error.errors,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    const { name, email, subject, message } = validationResult.data;

    console.log("Sending contact email notification:", { name, email, subject });

    // Send email notification to Jason with sanitized content
    const emailResponse = await resend.emails.send({
      from: "Social Factory <onboarding@resend.dev>",
      to: ["jason@socialfactory.ie"],
      replyTo: email,
      subject: `Contact Form: ${escapeHtml(subject)}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <h3>Message:</h3>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        <hr>
        <p><em>Reply directly to this email to respond to ${escapeHtml(name)}</em></p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return new Response(JSON.stringify({ error: "Unable to process your request. Please try again later." }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
