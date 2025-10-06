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
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                          Dublin, Ireland<br />
                          (Exact location coming soon)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-6 bg-mint/10 rounded-2xl border-2 border-mint">
                      <Mail className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-foreground">Email</h3>
                        <p className="text-muted-foreground">
                          hello@socialfactory.ie
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-6 bg-peach/10 rounded-2xl border-2 border-coral">
                      <Phone className="h-6 w-6 text-coral flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-foreground">Phone</h3>
                        <p className="text-muted-foreground">
                          +353 (0)1 234 5678
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
