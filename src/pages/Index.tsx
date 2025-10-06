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
      description: "Skate, climb, dance, create — this is where fun and friendship meet. The Social domain brings energy and togetherness through youth activities, action sports, art, and events.",
      color: "bg-sky",
    },
    {
      icon: Briefcase,
      title: "Work",
      description: "A co-working and maker environment supporting creativity, digital fabrication, and new ideas. A space to learn, collaborate, and grow small enterprises that strengthen the community.",
      color: "bg-mint",
    },
    {
      icon: Heart,
      title: "Health",
      description: "From gyms to wellness studios, our Health domain promotes movement and mindfulness, with clinicians and coaches working side by side to make wellbeing accessible to everyone.",
      color: "bg-peach",
    },
    {
      icon: ShoppingBag,
      title: "Market",
      description: "Local food, crafts, and weekend markets — the Market domain celebrates the culture of place and supports local entrepreneurship and circular economy principles.",
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
              A playful, modern 21st-century hub tackling loneliness through action sports, creative arts, wellness, and entrepreneurship.
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
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Social Factory is a bold new approach to connection. By bringing play, creativity, wellness, 
              and enterprise together under one roof, we're reimagining what community means in Ireland. 
              Our goal is to build vibrant spaces that help people feel part of something bigger — grounded 
              in science, driven by design, and inspired by belonging.
            </p>
            
            {/* Stats Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-sky/20 border-2 border-sky">
                <div className="text-3xl font-bold text-primary mb-2">30,000+ sq. ft</div>
                <p className="text-sm text-muted-foreground">Shared space in Limerick</p>
              </div>
              <div className="p-6 rounded-2xl bg-mint/20 border-2 border-mint">
                <div className="text-3xl font-bold text-secondary mb-2">EU-Aligned</div>
                <p className="text-sm text-muted-foreground">Social innovation frameworks</p>
              </div>
              <div className="p-6 rounded-2xl bg-peach/20 border-2 border-coral">
                <div className="text-3xl font-bold text-coral mb-2">Community</div>
                <p className="text-sm text-muted-foreground">Wellbeing & creative growth</p>
              </div>
            </div>

            <Button asChild variant="outline" size="lg" className="font-semibold">
              <Link to="/about">
                Discover Our Story <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
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
              Our programmes are designed around four interconnected domains — each a pillar of social connection and community growth.
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
              Grounded in Science and Research
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Social Factory builds upon leading international research on social connection, youth wellbeing, 
              and urban innovation. Inspired by the Planet Youth model, we use data-driven strategies to design 
              spaces that reduce isolation, improve community health, and foster creativity. Our work aligns 
              closely with the New European Bauhaus, the UN Sustainable Development Goals, and Ireland's 
              Healthy Communities framework. Every design choice — from light to layout — is informed by evidence 
              and crafted to strengthen real human connection.
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
