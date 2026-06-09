import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Clock, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const RESEND_COOLDOWN_SECONDS = 60;

const CheckEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const email = (location.state as { email?: string } | null)?.email
    ?? sessionStorage.getItem("pendingSignupEmail")
    ?? "";

  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/register", { replace: true });
      return;
    }
    sessionStorage.setItem("pendingSignupEmail", email);
  }, [email, navigate]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleResend = async () => {
    if (!email || cooldown > 0 || resending) return;
    setResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
      toast({
        title: "Confirmation resent",
        description: "If your email is in our system, a new link is on the way.",
      });
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err: any) {
      if (err?.status === 429 || /rate limit/i.test(err?.message ?? "")) {
        toast({
          title: "Hang tight",
          description: "We are sending a lot of emails right now. Try again in a minute.",
          variant: "destructive",
        });
        setCooldown(RESEND_COOLDOWN_SECONDS);
      } else {
        toast({
          title: "Couldn't resend",
          description: err?.message ?? "Please try again shortly.",
          variant: "destructive",
        });
      }
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 grid-pattern relative overflow-hidden">
      <div className="geometric-shape shape-circle w-64 h-64 bg-mint/20 top-20 right-10 blur-3xl" />
      <div className="geometric-shape w-40 h-40 bg-accent/20 bottom-1/4 left-10 rounded-3xl rotate-12" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-xl mx-auto bg-card p-8 md:p-12 rounded-3xl shadow-hover border-2 border-border text-center">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-6">
            <Mail className="h-10 w-10 text-primary" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            You're on the list
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            We sent a confirmation link to
          </p>
          <p className="font-semibold text-foreground break-all mb-8">
            {email || "your inbox"}
          </p>

          <div className="text-left space-y-4 mb-8">
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">Open the email</span> and tap the
                green confirmation button to finish signing up.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">It can take a few minutes</span>{" "}
                during the festival rush. Check spam if you don't see it.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <RefreshCw className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-foreground">
                Still nothing? You can resend the link below, no need to sign
                up again.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="green"
              size="lg"
              onClick={handleResend}
              disabled={cooldown > 0 || resending || !email}
              className="font-bold"
            >
              {resending
                ? "Sending..."
                : cooldown > 0
                ? `Resend in ${cooldown}s`
                : "Resend confirmation"}
            </Button>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full font-bold">
                Go to log in
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            Wrong address?{" "}
            <Link to="/register" className="underline hover:text-foreground">
              Sign up again
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
