import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      // Check if user has been onboarded
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarded")
        .eq("user_id", data.user.id)
        .single();

      if (profile?.onboarded) {
        navigate("/town-hall", { replace: true });
      } else {
        navigate("/onboarding", { replace: true });
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Welcome Back</h1>
              <p className="text-muted-foreground text-lg">Log in to your Social Factory account</p>
            </div>

            <div className="bg-card p-8 md:p-10 rounded-3xl shadow-hover border-2 border-border">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 text-base font-semibold mb-2">
                    <Mail className="h-4 w-4 text-primary" /> Email
                  </Label>
                  <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required className="text-base p-5" />
                </div>

                <div>
                  <Label htmlFor="password" className="flex items-center gap-2 text-base font-semibold mb-2">
                    <Lock className="h-4 w-4 text-primary" /> Password
                  </Label>
                  <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Your password" required className="text-base p-5" />
                </div>

                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-primary font-semibold hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" size="lg" className="w-full text-base py-5 bg-gradient-hero hover:opacity-90 font-bold" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Log In"}
                </Button>
              </form>

              <p className="text-center text-muted-foreground mt-6">
                Don't have an account?{" "}
                <Link to="/join" className="text-primary font-semibold hover:underline">Join us</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
