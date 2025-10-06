import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Thank you for joining!",
        description: "We'll keep you updated on Social Factory's journey.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <Mail className="h-16 w-16 mx-auto mb-6 text-foreground" />
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Be Part of Ireland's Social Revolution
          </h2>
          <p className="text-lg mb-8 text-foreground/80">
            Join our early membership and get updates on events, programs, and our launch.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-background/80 backdrop-blur-sm border-2 border-background"
            />
            <Button type="submit" size="lg" className="bg-coral hover:bg-coral/90 text-foreground font-bold">
              Join Now
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
