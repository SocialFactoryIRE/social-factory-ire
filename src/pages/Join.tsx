import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, MessageSquare, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Link } from "react-router-dom";

const joinSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  interest: z.string().trim().max(2000, "Interest must be less than 2000 characters").optional(),
});

const Join = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = joinSchema.parse(formData);

      const { error: dbError } = await supabase
        .from("join_submissions")
        .insert({
          name: validatedData.name,
          email: validatedData.email,
          interest: validatedData.interest || null,
        });

      if (dbError) throw dbError;

      const { error: emailError } = await supabase.functions.invoke("send-join-email", {
        body: validatedData,
      });

      if (emailError) {
        toast({
          title: "Warning",
          description: "Your request was saved but email notification failed. We'll still receive your information.",
          variant: "default",
        });
      }

      toast({
        title: "You're in — thank you!",
        description: "We'll be in touch as Social Factory Limerick takes shape.",
      });

      setFormData({ name: "", email: "", interest: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-20 grid-pattern relative overflow-hidden">
        <div className="geometric-shape shape-circle w-64 h-64 bg-coral/20 top-20 right-10 blur-3xl"></div>
        <div className="geometric-shape w-40 h-40 bg-mint/30 top-1/3 left-20 rounded-3xl rotate-45"></div>
        <div className="geometric-shape shape-circle w-52 h-52 bg-sky/20 bottom-1/4 right-1/4 blur-2xl"></div>
        <div className="geometric-shape w-36 h-36 bg-accent/30 bottom-32 left-10 rounded-2xl -rotate-12"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto">

            {/* Hero */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                Be Part of It
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Social Factory is being built right now — and the people who sign up first will help shape it.
                Register your interest, tell us what matters to you, and we'll keep you close as Limerick's
                first Social Factory comes to life.
              </p>
            </div>

            {/* Membership context */}
            <div className="bg-gradient-hero rounded-3xl p-8 mb-10 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Become a Member</h2>
              <p className="text-foreground/80 leading-relaxed">
                When we open, membership will give you access to all four domains — Social, Work, Health, and Market —
                with a concession tier for those on low incomes or referred through social prescribing.
                No one locked out. No one left behind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Link to="/register?type=online">
                  <Button size="lg" className="font-bold text-base px-8 py-5">
                    Join Online <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/register?type=local">
                  <Button size="lg" variant="coral" className="font-bold text-base px-8 py-5 border-2 border-foreground text-foreground">
                    Join Locally <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <Link to="/science" className="inline-flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground mt-4 underline underline-offset-2">
                Why we built it this way <ArrowRight className="h-3 w-3" />
              </Link>
            </div>


            {/* Benefits */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-sky/10 rounded-2xl border-2 border-sky">
                <h3 className="font-bold text-lg mb-2 text-foreground">Early Access</h3>
                <p className="text-sm text-muted-foreground">
                  Be first to know about programme launches, membership tiers, and space openings
                  as Social Factory Limerick takes shape.
                </p>
              </div>
              <div className="p-6 bg-mint/10 rounded-2xl border-2 border-mint">
                <h3 className="font-bold text-lg mb-2 text-foreground">Community Voice</h3>
                <p className="text-sm text-muted-foreground">
                  Founding members shape the future of Social Factory — through surveys, feedback sessions,
                  and real participation in our design process.
                </p>
              </div>
              <div className="p-6 bg-peach/10 rounded-2xl border-2 border-coral">
                <h3 className="font-bold text-lg mb-2 text-foreground">Exclusive Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Monthly insights on our progress, the research behind our model, and behind-the-scenes
                  development updates.
                </p>
              </div>
              <div className="p-6 bg-accent/10 rounded-2xl border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-foreground">Founding Member Status</h3>
                <p className="text-sm text-muted-foreground">
                  Invitations to launch events, founding member gatherings, and the chance to be part
                  of something genuinely new in Ireland.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Join;
