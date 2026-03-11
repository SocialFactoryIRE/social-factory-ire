import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DomainCard from "@/components/DomainCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import MemberMapSection from "@/components/MemberMapSection";
import { Button } from "@/components/ui/button";
import { Palette, Briefcase, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const domains = [
    {
      icon: Palette,
      title: "Social",
      description: "Skate, climb, dance, create — this is where fun and friendship meet. The Social domain brings energy and togetherness through youth activities, action sports, art, and events.",
      color: "bg-sky",
      link: "/programming#social",
    },
    {
      icon: Briefcase,
      title: "Work",
      description: "A co-working and maker environment supporting creativity, digital fabrication, and new ideas. A space to learn, collaborate, and grow small enterprises that strengthen the community.",
      color: "bg-mint",
      link: "/programming#work",
    },
    {
      icon: Heart,
      title: "Health",
      description: "From gyms to wellness studios, our Health domain promotes movement and mindfulness, with clinicians and coaches working side by side to make wellbeing accessible to everyone.",
      color: "bg-peach",
      link: "/programming#health",
    },
    {
      icon: ShoppingBag,
      title: "Market",
      description: "Local food, crafts, and weekend markets — the Market domain celebrates the culture of place and supports local entrepreneurship and circular economy principles.",
      color: "bg-accent",
      link: "/programming#market",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero relative overflow-hidden">
        <div className="geometric-shape shape-circle w-64 h-64 bg-coral/20 -top-32 -right-32 blur-3xl"></div>
        <div className="geometric-shape shape-circle w-96 h-96 bg-mint/20 -bottom-48 -left-48 blur-3xl"></div>
        <div className="geometric-shape w-32 h-32 bg-accent/30 top-20 right-1/4 rounded-3xl rotate-12"></div>
        <div className="geometric-shape shape-circle w-24 h-24 bg-sky/40 bottom-32 left-1/4"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-foreground animate-fade-in">
              <span className="text-3xl md:text-4xl font-normal">Ireland's First</span><br />
              <span className="text-5xl md:text-6xl font-black">Social Factory</span>
            </h1>
            <p className="text-xl md:text-2xl mt-8 mb-4 text-foreground/90 animate-fade-in font-semibold">
              Reconnecting communities through action sports, creative arts, wellness, and entrepreneurship.
            </p>
            <p className="text-lg md:text-xl mb-10 text-foreground/80 animate-fade-in max-w-2xl mx-auto">
              1 in 5 Irish adults report loneliness. We're building the spaces and systems to change that —
              starting in Limerick.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button
                size="lg"
                variant="coral"
                className="text-lg px-8 py-6"
                asChild
              >
                <Link to="/join">
                  Join the Movement <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-soft"
                asChild
              >
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="curve-divider bottom-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-16 md:h-24">
            <path d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z" className="fill-[hsl(var(--background))]"></path>
          </svg>
        </div>
      </section>

      {/* The Problem We're Solving */}
      <section className="py-20 bg-gradient-mint relative overflow-hidden">
        <div className="geometric-shape w-48 h-48 bg-sky/20 top-10 right-10 rounded-full blur-2xl"></div>
        <div className="geometric-shape w-32 h-32 bg-coral/20 bottom-10 left-10 rounded-3xl rotate-45"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-foreground mb-6">Why Social Factory?</h2>
            <p className="text-lg text-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
              Ireland's own research tells us that loneliness, poor mental health, and disconnection are
              not personal failings — they are structural problems that need structural solutions.
              Social Factory is that solution: a permanent, preventative, community-owned hub where people
              of all ages can belong, participate, and thrive.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <Link to="/science" className="block h-full">
                <div className="p-8 rounded-3xl bg-coral border-2 border-coral backdrop-blur-sm transform hover:scale-105 transition-all duration-300 layer-3d cursor-pointer h-full flex flex-col items-center justify-center">
                  <div className="text-4xl font-extrabold text-cream mb-2">1 in 5</div>
                  <p className="text-sm text-cream/90 font-medium">Irish adults report loneliness</p>
                  <p className="text-xs text-cream/70 mt-1">Healthy Ireland Survey 2025</p>
                </div>
              </Link>
              <Link to="/science" className="block h-full">
                <div className="p-8 rounded-3xl bg-sky border-2 border-sky backdrop-blur-sm transform hover:scale-105 transition-all duration-300 layer-3d cursor-pointer h-full flex flex-col items-center justify-center">
                  <div className="text-4xl font-extrabold text-charcoal mb-2">Only 53%</div>
                  <p className="text-sm text-charcoal/80 font-medium">of adults meet activity guidelines</p>
                  <p className="text-xs text-charcoal/60 mt-1">Healthy Ireland Survey 2025</p>
                </div>
              </Link>
              <Link to="/science" className="block h-full">
                <div className="p-8 rounded-3xl bg-mint border-2 border-mint backdrop-blur-sm transform hover:scale-105 transition-all duration-300 layer-3d cursor-pointer h-full flex flex-col items-center justify-center">
                  <div className="text-4xl font-extrabold text-cream mb-2">30%</div>
                  <p className="text-sm text-cream/90 font-medium">of young people below WHO wellbeing threshold</p>
                  <p className="text-xs text-cream/70 mt-1">Planet Youth West Ireland 2024</p>
                </div>
              </Link>
            </div>

            <Button asChild size="lg" className="font-bold bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-hover text-lg">
              <Link to="/science">
                See the Evidence <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="curve-divider bottom-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-16 md:h-24">
            <path d="M0,60 Q300,0 600,60 T1200,60 L1200,120 L0,120 Z" className="fill-cream"></path>
          </svg>
        </div>
      </section>

      {/* Four Domains */}
      <section className="py-20 bg-cream relative overflow-hidden grid-pattern">
        <div className="geometric-shape shape-circle w-40 h-40 bg-accent/20 top-20 left-10 blur-xl"></div>
        <div className="geometric-shape w-24 h-24 bg-coral/30 bottom-20 right-20 rounded-2xl rotate-12"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-foreground">
              Four Domains of Connection
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our programmes are built around four interconnected pillars — each one a pathway to belonging.
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
                Explore Our Programmes <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="curve-divider bottom-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-16 md:h-24">
            <path d="M0,0 C400,120 800,120 1200,0 L1200,120 L0,120 Z" className="fill-[hsl(var(--background))]"></path>
          </svg>
        </div>
      </section>

      {/* Policy Alignment */}
      <section className="py-20 bg-gradient-coral relative overflow-hidden">
        <div className="geometric-shape w-64 h-64 bg-mint/20 -top-32 -left-32 blur-3xl"></div>
        <div className="geometric-shape shape-circle w-40 h-40 bg-sky/30 top-32 right-20 blur-2xl"></div>
        <div className="geometric-shape w-28 h-28 bg-accent/30 bottom-40 left-1/4 rounded-3xl rotate-45"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-foreground mb-6">
              Grounded in Science. Aligned with Policy.
            </h2>
            <p className="text-lg text-white mb-10 max-w-3xl mx-auto">
              Social Factory is built on the Planet Youth model, aligned with Ireland's
              <strong> Pathways to Wellbeing National Mental Health Promotion Plan 2024–2030</strong>,
              and informed by the <strong>Healthy Ireland Survey 2025</strong>. Every design choice —
              from our social prescribing membership tier to our cross-domain programming — is evidence-led.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-8 rounded-3xl bg-sky border-2 border-sky backdrop-blur-sm transform hover:scale-105 transition-all duration-300 layer-3d">
                <div className="text-3xl font-extrabold text-charcoal mb-2">Planet Youth</div>
                <p className="text-sm text-charcoal/80 font-medium">Proven model for youth wellbeing & community resilience</p>
              </div>
              <div className="p-8 rounded-3xl bg-mint border-2 border-mint backdrop-blur-sm transform hover:scale-105 transition-all duration-300 layer-3d">
                <div className="text-3xl font-extrabold text-cream mb-2">Pathways to Wellbeing</div>
                <p className="text-sm text-cream/90 font-medium">Ireland's National Mental Health Promotion Plan 2024–2030</p>
              </div>
              <div className="p-8 rounded-3xl bg-accent border-2 border-accent backdrop-blur-sm transform hover:scale-105 transition-all duration-300 layer-3d">
                <div className="text-3xl font-extrabold text-charcoal mb-2">NEB Aligned</div>
                <p className="text-sm text-charcoal/80 font-medium">New European Bauhaus: sustainability, inclusion & beauty</p>
              </div>
            </div>
            <Button asChild size="lg" className="mt-10 font-semibold bg-foreground text-background hover:bg-foreground/90">
              <Link to="/science">
                Explore Our Research <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Member Locations */}
      <MemberMapSection />

      {/* Newsletter CTA */}
      <NewsletterSignup />

      <Footer />
    </div>
  );
};

export default Index;
