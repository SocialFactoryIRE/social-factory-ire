import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
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
        <div className="geometric-shape shape-circle w-56 h-56 bg-peach/20 top-10 left-10 blur-3xl"></div>
        <div className="geometric-shape shape-circle w-44 h-44 bg-sky/30 top-1/4 right-20 blur-2xl"></div>
        <div className="geometric-shape w-32 h-32 bg-mint/30 bottom-1/3 left-1/4 rounded-3xl rotate-12"></div>
        <div className="geometric-shape shape-circle w-60 h-60 bg-accent/20 bottom-20 right-10 blur-3xl"></div>
        <div className="geometric-shape shape-circle w-52 h-52 bg-coral/20 top-36 right-1/4 blur-2xl"></div>
        <div className="geometric-shape shape-circle w-40 h-40 bg-mint/25 bottom-1/4 left-16 blur-xl"></div>
        <div className="geometric-shape shape-circle w-48 h-48 bg-sky/20 top-2/3 left-1/3 blur-2xl"></div>
        <div className="geometric-shape shape-circle w-46 h-46 bg-coral/18 bottom-1/2 right-1/3 blur-xl"></div>
        <div className="geometric-shape shape-circle w-38 h-38 bg-peach/25 top-1/2 left-12 blur-2xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              Have a question, idea, or partnership proposal? We'd love to hear from you — 
              Social Factory is a community project built by everyone.
            </p>
          </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card p-8 rounded-3xl shadow-hover border-2 border-border">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-base font-semibold mb-2 block">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="p-5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-base font-semibold mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="p-5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-base font-semibold mb-2 block">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                      className="p-5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-base font-semibold mb-2 block">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more..."
                      rows={5}
                      required
                      className="p-4"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-hero hover:opacity-90 font-bold"
                  >
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 p-6 bg-sky/10 rounded-2xl border-2 border-sky">
                      <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-foreground">Location</h3>
                        <p className="text-muted-foreground">
                          Ireland<br />
                          (Exact location coming soon)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-6 bg-mint/10 rounded-2xl border-2 border-mint">
                      <Mail className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-foreground">Email</h3>
                        <a 
                          href="mailto:Jason@socialfactory.ie" 
                          className="text-muted-foreground hover:text-foreground transition-colors underline"
                        >
                          Jason@socialfactory.ie
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-6 bg-peach/10 rounded-2xl border-2 border-coral">
                      <Phone className="h-6 w-6 text-coral flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-foreground">Phone</h3>
                        <p className="text-muted-foreground">
                          +353 85 820 8979
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-hero p-8 rounded-3xl">
                  <h3 className="text-xl font-bold mb-3 text-foreground">For Funders & Partners</h3>
                  <p className="text-foreground/90 mb-4">
                    Interested in supporting or collaborating with Social Factory? We'd love to explore 
                    opportunities together.
                  </p>
                  <p className="text-sm text-foreground/80">
                    Please include "Partnership" in your subject line.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
