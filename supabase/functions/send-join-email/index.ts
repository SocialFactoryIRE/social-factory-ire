import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface JoinEmailRequest {
  name: string;
  email: string;
  interest: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, interest }: JoinEmailRequest = await req.json();

    console.log("Sending join notification email:", { name, email });

    // Send email notification to Jason
    const emailResponse = await resend.emails.send({
      from: "Social Factory <onboarding@resend.dev>",
      to: ["jason@socialfactory.ie"],
      replyTo: email,
      subject: `New Join Request from ${name}`,
      html: `
        <h2>New Join Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>What interests them:</h3>
        <p>${interest ? interest.replace(/\n/g, '<br>') : 'Not specified'}</p>
        <hr>
        <p><em>Reply directly to this email to respond to ${name}</em></p>
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
    console.error("Error sending join email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
