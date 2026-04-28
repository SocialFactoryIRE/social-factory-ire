import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(5000, "Message must be less than 5000 characters"),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Save to database
      const { error: dbError } = await supabase
        .from("contacts")
        .insert({
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
          message: validatedData.message,
        });

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke("send-contact-email", {
        body: validatedData,
      });

      if (emailError) {
        toast({
          title: "Warning",
          description: "Message saved but email notification failed. We'll still receive your message.",
          variant: "default",
        });
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
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
          description: "Failed to send message. Please try again.",
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
        {/* Background geometric elements */}
        <div className="geometric-shape shape-circle w-56 h-56 bg-peach/20 top-10 left-10 blur-3xl"></div>
        <div className="geometric-shape shape-circle w-44 h-44 bg-teal/30 top-1/4 right-20 blur-2xl"></div>
        <div className="geometric-shape w-32 h-32 bg-green/30 bottom-1/3 left-1/4 rounded-3xl rotate-12"></div>
        <div className="geometric-shape shape-circle w-60 h-60 bg-yellow/20 bottom-20 right-10 blur-3xl"></div>
        <div className="geometric-shape shape-circle w-52 h-52 bg-peach/20 top-36 right-1/4 blur-2xl"></div>
        <div className="geometric-shape shape-circle w-40 h-40 bg-green/25 bottom-1/4 left-16 blur-xl"></div>
        <div className="geometric-shape shape-circle w-48 h-48 bg-teal/20 top-2/3 left-1/3 blur-2xl"></div>
        <div className="geometric-shape shape-circle w-46 h-46 bg-peach/18 bottom-1/2 right-1/3 blur-xl"></div>
        <div className="geometric-shape shape-circle w-38 h-38 bg-peach/25 top-1/2 left-12 blur-2xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              Have a question, idea, or partnership proposal? We'd love to hear from you, 
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 p-6 bg-teal-light rounded-2xl border-2 border-teal-deep/30">
                      <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-foreground">Location</h3>
                        <p className="text-muted-foreground">
                          Limerick, Ireland
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-6 bg-green-light rounded-2xl border-2 border-green-deep/30">
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

                    <div className="flex items-start space-x-4 p-6 bg-peach-light rounded-2xl border-2 border-peach-deep/30">
                      <Phone className="h-6 w-6 text-peach-deep flex-shrink-0 mt-1" />
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
