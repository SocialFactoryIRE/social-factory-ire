import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const validation = newsletterSchema.safeParse({ email });
    if (!validation.success) {
      toast({
        title: "Invalid email",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from("newsletter_signups")
        .insert([{ email }]);

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke(
        "send-newsletter-email",
        {
          body: { email },
        }
      );

      if (emailError) {
        console.error("Email notification failed:", emailError);
        // Don't fail the signup if email fails, just log it
      }

      toast({
        title: "Thank you for joining!",
        description: "We'll keep you updated on Social Factory's journey.",
      });
      setEmail("");
    } catch (error: any) {
      console.error("Error submitting newsletter signup:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <Mail className="h-16 w-16 mx-auto mb-6 text-foreground" />
          <h2 className="text-foreground mb-4">
            Be Part of Ireland's Social Revolution
          </h2>
          <p className="text-lg mb-8 text-foreground/90">
            Join our early membership and get updates on events, programs, and our launch.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-background/80 backdrop-blur-sm border-2 border-background rounded-2xl h-12 text-base"
            />
            <Button type="submit" size="lg" variant="coral" disabled={isSubmitting}>
              {isSubmitting ? "Joining..." : "Join Now"}
            </Button>
          </form>
          <p className="text-sm mt-4 text-foreground/70">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
