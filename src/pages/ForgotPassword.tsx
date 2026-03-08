import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSent(true);
      toast({
        title: "Email sent",
        description: "Check your inbox for a password reset link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 grid-pattern relative overflow-hidden">
        <div className="geometric-shape shape-circle w-52 h-52 bg-sky/20 bottom-1/4 right-1/4 blur-2xl" />
        <div className="geometric-shape w-36 h-36 bg-accent/30 bottom-32 left-10 rounded-2xl -rotate-12" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Forgot Password</h1>
              <p className="text-muted-foreground text-lg">
                Enter your email and we'll send you a reset link
              </p>
            </div>

            <div className="bg-card p-8 md:p-10 rounded-3xl shadow-hover border-2 border-border">
              {sent ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Check your email</h2>
                  <p className="text-muted-foreground">
                    We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
                  </p>
                  <Link to="/login" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline mt-4">
                    <ArrowLeft className="h-4 w-4" /> Back to Login
                  </Link>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="email" className="flex items-center gap-2 text-base font-semibold mb-2">
                        <Mail className="h-4 w-4 text-primary" /> Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="text-base p-5"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-base py-5 bg-gradient-hero hover:opacity-90 font-bold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Reset Link"}
                    </Button>
                  </form>

                  <p className="text-center text-muted-foreground mt-6">
                    <Link to="/login" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                      <ArrowLeft className="h-4 w-4" /> Back to Login
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
