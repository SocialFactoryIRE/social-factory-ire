import { useState, useMemo } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { User, Mail, Lock, Globe, MapPin } from "lucide-react";
import { countriesAndCities } from "@/data/countries-cities";

const registerSchema = z.object({
  displayName: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
});

const Register = () => {
  const [searchParams] = useSearchParams();
  const membershipType = searchParams.get("type") === "local" ? "local" : "online";
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({ displayName: "", email: "", password: "", country: "", city: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const citiesForCountry = useMemo(() => {
    const entry = countriesAndCities.find((c) => c.country === form.country);
    return entry?.cities ?? [];
  }, [form.country]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const data = registerSchema.parse(form);

      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            display_name: data.displayName,
            membership_type: membershipType,
            country: data.country,
            city: data.city,
          },
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;

      // Update profile with membership type
      const { data: session } = await supabase.auth.getSession();
      if (session?.session?.user) {
        await supabase
          .from("profiles")
          .update({ membership_type: membershipType, country: data.country, city: data.city })
          .eq("user_id", session.session.user.id);
      }

      toast({
        title: "Check your email",
        description: "We've sent you a confirmation link. Please verify your email to continue.",
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({ title: "Validation Error", description: error.errors[0].message, variant: "destructive" });
      } else {
        toast({ title: "Error", description: error.message || "Registration failed.", variant: "destructive" });
      }
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
        <div className="geometric-shape shape-circle w-64 h-64 bg-coral/20 top-20 right-10 blur-3xl" />
        <div className="geometric-shape w-40 h-40 bg-mint/30 top-1/3 left-20 rounded-3xl rotate-45" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Create Account</h1>
              <p className="text-muted-foreground text-lg">
                Joining as a <span className="font-semibold text-primary capitalize">{membershipType}</span> member
              </p>
            </div>

            <div className="bg-card p-8 md:p-10 rounded-3xl shadow-hover border-2 border-border">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="displayName" className="flex items-center gap-2 text-base font-semibold mb-2">
                    <User className="h-4 w-4 text-primary" /> Display Name
                  </Label>
                  <Input id="displayName" name="displayName" value={form.displayName} onChange={handleChange} placeholder="Your name" required className="text-base p-5" />
                </div>

                <div>
                  <Label className="flex items-center gap-2 text-base font-semibold mb-2">
                    <Globe className="h-4 w-4 text-primary" /> Country
                  </Label>
                  <Select
                    value={form.country}
                    onValueChange={(value) => setForm({ ...form, country: value, city: "" })}
                  >
                    <SelectTrigger className="text-base p-5">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {countriesAndCities.map((c) => (
                        <SelectItem key={c.country} value={c.country}>
                          {c.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="flex items-center gap-2 text-base font-semibold mb-2">
                    <MapPin className="h-4 w-4 text-primary" /> City
                  </Label>
                  <Select
                    value={form.city}
                    onValueChange={(value) => setForm({ ...form, city: value })}
                    disabled={!form.country}
                  >
                    <SelectTrigger className="text-base p-5">
                      <SelectValue placeholder={form.country ? "Select your city" : "Select a country first"} />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {citiesForCountry.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
                  <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min 8 characters" required className="text-base p-5" />
                </div>

                <Button type="submit" size="lg" className="w-full text-base py-5 bg-gradient-hero hover:opacity-90 font-bold" disabled={isSubmitting}>
                  {isSubmitting ? "Creating account..." : "Sign Up"}
                </Button>
              </form>

              <p className="text-center text-muted-foreground mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
