import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, MessageSquare } from "lucide-react";

const Join = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thanks for joining!",
      description: "We'll be in touch as our first Social Factory opens in Limerick.",
    });
    setFormData({ name: "", email: "", interest: "" });
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
        {/* Background geometric elements */}
        <div className="geometric-shape shape-circle w-64 h-64 bg-coral/20 top-20 right-10 blur-3xl"></div>
        <div className="geometric-shape w-40 h-40 bg-mint/30 top-1/3 left-20 rounded-3xl rotate-45"></div>
        <div className="geometric-shape shape-circle w-52 h-52 bg-sky/20 bottom-1/4 right-1/4 blur-2xl"></div>
        <div className="geometric-shape w-36 h-36 bg-accent/30 bottom-32 left-10 rounded-2xl -rotate-12"></div>
        <div className="geometric-shape shape-circle w-48 h-48 bg-sky/25 top-24 left-1/4 blur-xl"></div>
        <div className="geometric-shape shape-circle w-56 h-56 bg-coral/15 bottom-1/4 right-1/3 blur-3xl"></div>
        <div className="geometric-shape shape-circle w-44 h-44 bg-mint/20 top-1/3 right-16 blur-2xl"></div>
        <div className="geometric-shape shape-circle w-50 h-50 bg-peach/22 top-1/2 left-1/2 blur-2xl"></div>
        <div className="geometric-shape shape-circle w-42 h-42 bg-accent/18 bottom-16 left-1/4 blur-xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                Join the Movement
              </h1>
              <p className="text-xl text-muted-foreground">
                Be part of Ireland's new social revolution. Sign up now for early updates, membership information, 
                and the chance to help shape the future of Social Factory.
              </p>
            </div>

            {/* Form */}
            <div className="bg-card p-8 md:p-12 rounded-3xl shadow-hover border-2 border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 text-lg font-semibold mb-2">
                    <User className="h-5 w-5 text-primary" />
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="text-lg p-6"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 text-lg font-semibold mb-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="text-lg p-6"
                  />
                </div>

                <div>
                  <Label htmlFor="interest" className="flex items-center gap-2 text-lg font-semibold mb-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    What interests you most?
                  </Label>
                  <Textarea
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    placeholder="Tell us which domains interest you (Social/Play, Work, Health, Market) and how you'd like to get involved..."
                    rows={5}
                    className="text-lg p-4"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg py-6 bg-gradient-hero hover:opacity-90 font-bold"
                >
                  Join Social Factory
                </Button>
              </form>
            </div>

            {/* What You'll Get */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-sky/10 rounded-2xl border-2 border-sky">
                <h3 className="font-bold text-lg mb-2 text-foreground">Early Access</h3>
                <p className="text-sm text-muted-foreground">
                  Be first to know about programs, events, and space openings
                </p>
              </div>
              <div className="p-6 bg-mint/10 rounded-2xl border-2 border-mint">
                <h3 className="font-bold text-lg mb-2 text-foreground">Community Input</h3>
                <p className="text-sm text-muted-foreground">
                  Shape the future of Social Factory through surveys and feedback
                </p>
              </div>
              <div className="p-6 bg-peach/10 rounded-2xl border-2 border-coral">
                <h3 className="font-bold text-lg mb-2 text-foreground">Exclusive Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Monthly newsletters with insights, research, and behind-the-scenes
                </p>
              </div>
              <div className="p-6 bg-accent/10 rounded-2xl border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-foreground">Special Events</h3>
                <p className="text-sm text-muted-foreground">
                  Invitations to founding member gatherings and launch celebrations
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
