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
      title: "Welcome to Social Factory!",
      description: "We'll be in touch soon with updates and next steps.",
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
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                Join the Movement
              </h1>
              <p className="text-xl text-muted-foreground">
                Be part of Ireland's first social factory. Early members get exclusive updates and opportunities.
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
