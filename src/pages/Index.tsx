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
      title: "Connect",
      subtitle: "Social",
      description:
        "Skate, climb, dance, create — this is where fun and friendship meet. The Social domain brings energy and togetherness through youth activities, action sports, art, and events.",
      bg: "bg-yellow-light",
      accentColor: "text-yellow-deep",
      iconBg: "bg-yellow",
      link: "/programming#social",
    },
    {
      icon: Briefcase,
      title: "Create",
      subtitle: "Work",
      description:
        "A co-working and maker environment supporting creativity, digital fabrication, and new ideas. A space to learn, collaborate, and grow small enterprises that strengthen the community.",
      bg: "bg-teal-light",
      accentColor: "text-teal-deep",
      iconBg: "bg-teal",
      link: "/programming#work",
    },
    {
      icon: Heart,
      title: "Move",
      subtitle: "Health",
      description:
        "From gyms to wellness studios, our Health domain promotes movement and mindfulness, with clinicians and coaches working side by side to make wellbeing accessible to everyone.",
      bg: "bg-green-light",
      accentColor: "text-green-deep",
      iconBg: "bg-green",
      link: "/programming#health",
    },
    {
      icon: ShoppingBag,
      title: "Grow",
      subtitle: "Market",
      description:
        "Local food, crafts, and weekend markets — the Market domain celebrates the culture of place and supports local entrepreneurship and circular economy principles.",
      bg: "bg-peach-light",
      accentColor: "text-peach-deep",
      iconBg: "bg-peach",
      link: "/programming#market",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-warm-white relative overflow-hidden">
        {/* Soft radial gradient blobs */}
        <div
          className="hero-blob"
          style={{
            width: "60vw",
            height: "60vw",
            maxWidth: 700,
            maxHeight: 700,
            top: "-15%",
            left: "-10%",
            background:
              "radial-gradient(circle, rgba(255,205,26,0.35) 0%, rgba(249,187,134,0.18) 60%, transparent 100%)",
          }}
        />
        <div
          className="hero-blob"
          style={{
            width: "55vw",
            height: "55vw",
            maxWidth: 650,
            maxHeight: 650,
            bottom: "-20%",
            right: "-8%",
            background: "radial-gradient(circle, rgba(93,205,249,0.22) 0%, rgba(0,179,137,0.16) 60%, transparent 100%)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-foreground animate-fade-in">
              <span className="text-3xl md:text-4xl font-light">Ireland's First</span>
              <br />
              <span className="text-5xl md:text-6xl">Social Factory</span>
            </h1>
            <p className="text-xl md:text-2xl mt-8 mb-4 text-ink-soft animate-fade-in font-medium max-w-[70ch] mx-auto">
              Where Limerick comes together to move, make, create, and belong.
            </p>
            <p className="text-lg md:text-xl mb-10 text-ink-soft animate-fade-in max-w-[70ch] mx-auto font-light">
              1 in 5 Irish adults report loneliness. Social Factory is the structural response: permanent,
              preventative, community-owned.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button size="lg" variant="green" className="text-lg px-8 py-6" asChild>
                <Link to="/join">
                  Join the Movement <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="curve-divider bottom-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-16 md:h-24">
            <path d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z" className="fill-cream"></path>
          </svg>
        </div>
      </section>

      {/* The Problem We're Solving */}
      <section className="py-20 bg-ink relative overflow-hidden">
        <div
          className="hero-blob"
          style={{
            width: "40vw",
            height: "40vw",
            maxWidth: 500,
            maxHeight: 500,
            top: "-10%",
            right: "-5%",
            background: "radial-gradient(circle, rgba(0,179,137,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-cream mb-6">Why Social Factory?</h2>
            <p className="text-lg text-cream/90 leading-relaxed mb-10 max-w-[70ch] mx-auto font-light">
              Ireland's own research tells us that loneliness, poor mental health, and disconnection are not personal
              failings — they are structural problems that need structural solutions. Social Factory is that solution: a
              permanent, preventative, community-owned hub where people of all ages can belong, participate, and thrive.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Link to="/science" className="block h-full">
                <div className="p-6 rounded-[20px] bg-yellow border-2 border-yellow-deep transform hover:scale-105 transition-all duration-300 layer-3d cursor-pointer h-full flex flex-col items-center justify-center text-center break-words">
                  <div className="text-4xl font-bold text-ink mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
                    1 in 5
                  </div>
                  <p className="text-sm text-ink font-medium">Irish adults report loneliness</p>
                  <p className="text-xs text-ink/80 mt-1">Healthy Ireland Survey 2025</p>
                </div>
              </Link>
              <Link to="/science" className="block h-full">
                <div className="p-6 rounded-[20px] bg-teal-light border-2 border-teal-deep transform hover:scale-105 transition-all duration-300 layer-3d cursor-pointer h-full flex flex-col items-center justify-center text-center break-words">
                  <div className="text-4xl font-bold text-ink mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
                    Only 53%
                  </div>
                  <p className="text-sm text-ink font-medium">of adults meet activity guidelines</p>
                  <p className="text-xs text-ink/80 mt-1">Healthy Ireland Survey 2025</p>
                </div>
              </Link>
              <Link to="/science" className="block h-full">
                <div className="p-6 rounded-[20px] bg-green-deep border-2 border-green-deep transform hover:scale-105 transition-all duration-300 layer-3d cursor-pointer h-full flex flex-col items-center justify-center text-center break-words">
                  <div className="text-4xl font-bold text-cream mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
                    30%
                  </div>
                  <p className="text-sm text-cream font-medium">of young people below WHO wellbeing threshold</p>
                  <p className="text-xs text-cream/90 mt-1">Planet Youth West Ireland 2024</p>
                </div>
              </Link>
            </div>

            <Button
              asChild
              size="lg"
              className="font-semibold bg-cream text-ink border-2 border-cream hover:bg-cream/90 hover:scale-105 transition-all duration-300 text-lg rounded-full"
            >
              <Link to="/science">
                See the Evidence <ArrowRight className="ml-2 h-5 w-5" />
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
        <div
          className="hero-blob"
          style={{
            width: "35vw",
            height: "35vw",
            maxWidth: 400,
            maxHeight: 400,
            top: "5%",
            left: "-5%",
            background: "radial-gradient(circle, rgba(255,205,26,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-foreground">Four Domains of Connection</h2>
            <p className="text-xl text-ink-soft max-w-[70ch] mx-auto font-light">
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
            <path d="M0,0 C400,120 800,120 1200,0 L1200,120 L0,120 Z" className="fill-warm-white"></path>
          </svg>
        </div>
      </section>

      {/* Policy Alignment */}
      <section className="py-20 bg-warm-white relative overflow-hidden">
        <div
          className="hero-blob"
          style={{
            width: "45vw",
            height: "45vw",
            maxWidth: 550,
            maxHeight: 550,
            top: "-10%",
            left: "-10%",
            background: "radial-gradient(circle, rgba(0,179,137,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-foreground mb-6">Grounded in Science. Aligned with Policy.</h2>
            <p className="text-lg text-ink-soft mb-10 max-w-[70ch] mx-auto font-light">
              Social Factory is built on the Planet Youth model, aligned with Ireland's
              <strong className="text-foreground font-semibold">
                {" "}
                Pathways to Wellbeing National Mental Health Promotion Plan 2024–2030
              </strong>
              , and informed by the{" "}
              <strong className="text-foreground font-semibold">Healthy Ireland Survey 2025</strong>. Every design
              choice — from our social prescribing membership tier to our cross-domain programming — is evidence-led.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-8 rounded-[20px] bg-teal-light border-2 border-teal-deep/30 transform hover:scale-105 transition-all duration-300 layer-3d">
                <div className="text-3xl font-bold text-teal-deep mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
                  Planet Youth
                </div>
                <p className="text-sm text-ink-soft font-medium">
                  Proven model for youth wellbeing & community resilience
                </p>
              </div>
              <div className="p-8 rounded-[20px] bg-green-light border-2 border-green-deep/30 transform hover:scale-105 transition-all duration-300 layer-3d">
                <div className="text-3xl font-bold text-green-deep mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
                  Pathways to Wellbeing
                </div>
                <p className="text-sm text-ink-soft font-medium">
                  Ireland's National Mental Health Promotion Plan 2024–2030
                </p>
              </div>
              <div className="p-8 rounded-[20px] bg-yellow-light border-2 border-yellow-deep/30 transform hover:scale-105 transition-all duration-300 layer-3d">
                <div className="text-3xl font-bold text-yellow-deep mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
                  NEB Aligned
                </div>
                <p className="text-sm text-ink-soft font-medium">
                  New European Bauhaus: sustainability, inclusion & beauty
                </p>
              </div>
            </div>
            <Button asChild size="lg" className="mt-10 font-semibold">
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
