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
      const { error: dbError } = await supabase
        .from("newsletter_signups")
        .insert([{ email }]);

      if (dbError) throw dbError;

      const { error: emailError } = await supabase.functions.invoke(
        "send-newsletter-email",
        { body: { email } }
      );

      if (emailError) {
        // Don't fail the signup if email fails
      }

      toast({
        title: "Thank you for joining!",
        description: "We'll keep you updated on Social Factory's journey.",
      });
      setEmail("");
    } catch (error: any) {
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
    <section className="py-20 bg-ink">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <Mail className="h-16 w-16 mx-auto mb-6 text-green" />
          <h2 className="text-cream mb-4">
            Be Part of Ireland's Social Revolution
          </h2>
          <p className="text-lg mb-8 text-cream/80">
            Join our early membership and get updates on events, programs, and our launch.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-cream/10 backdrop-blur-sm border-2 border-cream/30 rounded-2xl h-12 text-base text-cream placeholder:text-cream/50"
            />
            <Button type="submit" size="lg" variant="green" disabled={isSubmitting}>
              {isSubmitting ? "Joining..." : "Join Now"}
            </Button>
          </form>
          <p className="text-sm mt-4 text-cream/50">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
