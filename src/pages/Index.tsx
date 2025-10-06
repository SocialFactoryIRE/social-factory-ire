import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DomainCard from "@/components/DomainCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { Button } from "@/components/ui/button";
import { Palette, Briefcase, Heart, ShoppingBag, ArrowRight, Users, Lightbulb, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const domains = [
    {
      icon: Palette,
      title: "Social / Play",
      description: "Action sports, creative arts, and collaborative play spaces that bring people together through shared experiences.",
      color: "bg-sky",
    },
    {
      icon: Briefcase,
      title: "Work",
      description: "Entrepreneurship programs, skill development, and co-working spaces fostering innovation and career growth.",
      color: "bg-mint",
    },
    {
      icon: Heart,
      title: "Health",
      description: "Wellness programs, mental health support, and active living initiatives promoting holistic wellbeing.",
      color: "bg-peach",
    },
    {
      icon: ShoppingBag,
      title: "Market",
      description: "Community marketplace connecting local creators, sustainable businesses, and conscious consumers.",
      color: "bg-accent",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground animate-fade-in">
              Building Ireland's First Social Factory
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-foreground/80 animate-fade-in">
              A 21st-century hub for play, creativity, wellness & work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button 
                size="lg" 
                className="bg-coral hover:bg-coral/90 text-foreground font-bold text-lg px-8 py-6 rounded-2xl shadow-hover"
                asChild
              >
                <Link to="/join">
                  Join the Movement <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-bold text-lg px-8 py-6 rounded-2xl"
                asChild
              >
                <Link to="/about">Learn Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-bold text-xl mb-2">Community First</h3>
                <p className="text-muted-foreground">Building connections that combat loneliness</p>
              </div>
              <div className="text-center p-6">
                <Lightbulb className="h-12 w-12 mx-auto mb-4 text-secondary" />
                <h3 className="font-bold text-xl mb-2">Innovation Hub</h3>
                <p className="text-muted-foreground">Where creativity meets action</p>
              </div>
              <div className="text-center p-6">
                <Target className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h3 className="font-bold text-xl mb-2">Evidence-Based</h3>
                <p className="text-muted-foreground">Grounded in research and impact</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-6">
                Social Factory is tackling the loneliness epidemic through a groundbreaking approach: 
                creating spaces where people can connect through action sports, creative arts, wellness activities, 
                and entrepreneurship. Aligned with New European Bauhaus values, we're building Ireland's 
                first social factory—a warm, inclusive, design-driven community hub.
              </p>
              <Button asChild variant="outline" size="lg" className="font-semibold">
                <Link to="/about">
                  Discover Our Story <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Four Domains */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Four Domains of Connection
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the interconnected spaces that make Social Factory unique
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {domains.map((domain, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <DomainCard {...domain} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="font-semibold">
              <Link to="/programming">
                Explore Our Programs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Science & Impact */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Grounded in Research
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our approach is backed by evidence from Planet Youth research, EU New European Bauhaus initiatives, 
              and comprehensive data on social connection. We're not just creating a space—we're building a 
              proven model for community wellbeing that addresses the loneliness epidemic through meaningful 
              engagement, creative expression, and shared experiences.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 rounded-2xl bg-sky/20 border-2 border-sky">
                <div className="text-4xl font-bold text-primary mb-2">87%</div>
                <p className="text-sm text-muted-foreground">Report reduced loneliness through community programs</p>
              </div>
              <div className="p-6 rounded-2xl bg-mint/20 border-2 border-mint">
                <div className="text-4xl font-bold text-secondary mb-2">12+</div>
                <p className="text-sm text-muted-foreground">Evidence-based intervention frameworks</p>
              </div>
              <div className="p-6 rounded-2xl bg-accent/20 border-2 border-accent">
                <div className="text-4xl font-bold text-accent mb-2">NEB</div>
                <p className="text-sm text-muted-foreground">Aligned with European values of sustainability & inclusion</p>
              </div>
            </div>
            <Button asChild variant="outline" size="lg" className="mt-8 font-semibold">
              <Link to="/science">
                Explore Our Research <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterSignup />

      <Footer />
    </div>
  );
};

export default Index;
