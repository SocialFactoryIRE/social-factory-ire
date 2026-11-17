import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Palette, Briefcase, Heart, ShoppingBag, Sparkles } from "lucide-react";

const CARD_STYLES: Record<string, { bg: string; shadow: string; bulletColor: string }> = {
  "bg-sky": { bg: "#c8edfd", shadow: "0 12px 32px rgba(26,159,212,0.18)", bulletColor: "#1a9fd4" },
  "bg-mint": { bg: "#b8f0e2", shadow: "0 12px 32px rgba(0,125,97,0.18)", bulletColor: "#007d61" },
  "bg-peach": { bg: "#fde4cc", shadow: "0 12px 32px rgba(232,135,74,0.18)", bulletColor: "#e8874a" },
  "bg-accent": { bg: "#fff3a3", shadow: "0 12px 32px rgba(230,168,0,0.18)", bulletColor: "#e6a800" },
};

const ICON_STYLES: Record<string, string> = {
  "bg-mint": "#b8f0e2",
  "bg-peach": "#fde4cc",
  "bg-accent": "#fff3a3",
  "bg-sky": "#c8edfd",
};

const Programming = () => {
  const programs = [{
    icon: Palette,
    title: "Social",
    color: "bg-sky",
    iconColor: "bg-sky",
    description: "Skate, climb, dance, create. This is where fun and friendship meet. The Social domain brings energy and togetherness through youth activities, action sports, art, and events.",
    activities: ["Skatepark", "Bouldering / Climbing Hub", "Trampoline & Movement Centre", "Kids Activity Zone", "Events & Performance Centre", "Adaptable Community Spaces", "Mental Health & Wellness Integration"]
  }, {
    icon: Briefcase,
    title: "Work",
    color: "bg-mint",
    iconColor: "bg-mint",
    description: "A co-working and maker environment supporting creativity, digital fabrication, and new ideas. A space to learn, collaborate, and grow small enterprises that strengthen the community.",
    activities: ["Shared Work Desks", "Digital Fabrication Lab", "Audio & Visual Studios", "Urban Library / Study Spaces", "Entrepreneurship Hub", "Adaptable Offices / Studios", "Mental Health Integration"]
  }, {
    icon: Heart,
    title: "Health",
    color: "bg-peach",
    iconColor: "bg-peach",
    description: "From gyms to wellness studios, our Health domain promotes movement and mindfulness, with clinicians and coaches working side by side to make wellbeing accessible to everyone.",
    activities: ["Clinically Trained Professionals", "Physical Health & Wellness Facilities (gym, yoga, recovery)", "Combative Sports (boxing, martial arts, resilience training)", "Adaptable Offices", "Adaptable Wellness Studios", "Organic Growth"]
  }, {
    icon: ShoppingBag,
    title: "Market",
    color: "bg-accent",
    iconColor: "bg-accent",
    description: "Local food, crafts, and weekend markets, the Market domain celebrates the culture of place and supports local entrepreneurship and circular economy principles.",
    activities: ["Traditional Market", "Sunday Market", "Food & Beverage Hall", "Education & Demonstration Spaces (workshops, cooking, nutrition)", "Organic Growth"]
  }];

  return <div className="min-h-screen">
      <Seo title="Programmes — Social Factory" description="Explore our four domains: Social, Work, Health and Market. Weekly activities for every age, from action sports to markets." path="/programming" />
    <Navbar />

    <div className="pt-24 pb-20 relative overflow-hidden">
      {/* Soft radial gradient blobs */}
      <div className="hero-blob" style={{
        width: 500, height: 500, top: "-5%", left: "-5%",
        background: "radial-gradient(circle, rgba(255,205,26,0.25) 0%, transparent 70%)",
      }} />
      <div className="hero-blob" style={{
        width: 400, height: 400, top: "0%", right: "-3%",
        background: "radial-gradient(circle, rgba(26,159,212,0.18) 0%, transparent 70%)",
      }} />
      <div className="hero-blob" style={{
        width: 350, height: 350, bottom: "5%", left: "35%",
        background: "radial-gradient(circle, rgba(249,187,134,0.18) 0%, transparent 70%)",
      }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8" style={{ background: "#b8f0e2" }}>
            <Sparkles className="w-5 h-5" style={{ color: "#007d61" }} />
            <span className="text-base font-semibold" style={{ color: "#007d61" }}>Four Interconnected Domains</span>
          </div>

          <h1 className="text-4xl md:text-6xl mb-6 text-foreground">
            Community Programming Domains
          </h1>
          <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-[70ch] mx-auto font-light">
            Our programmes are designed around four interconnected domains, <br className="hidden md:block" />
            each a pillar of social connection and community growth.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="space-y-32">
          {programs.map((program, index) => {
            const cardStyle = CARD_STYLES[program.color];
            const iconBg = ICON_STYLES[program.iconColor];
            return (
              <div key={index} id={program.title.toLowerCase()} className="max-w-6xl mx-auto group scroll-mt-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className={`space-y-6 ${index % 2 === 1 ? "md:order-2" : ""} animate-fade-in`}>
                    <div
                      className="w-24 h-24 flex items-center justify-center group-hover:scale-105 transition-all duration-500"
                      style={{ background: iconBg, borderRadius: 16 }}
                    >
                      <program.icon className="h-12 w-12 text-foreground" />
                    </div>
                    <h2 className="text-5xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {program.title}
                    </h2>
                    <p className="text-xl text-ink-soft leading-relaxed font-light max-w-[70ch]">
                      {program.description}
                    </p>
                  </div>
                  <div className={`${index % 2 === 1 ? "md:order-1" : ""} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
                    <div
                      className="p-10 transition-all duration-300 hover:-translate-y-1.5"
                      style={{
                        background: cardStyle.bg,
                        borderRadius: 20,
                        border: "1.5px solid rgba(30,28,26,0.08)",
                        boxShadow: cardStyle.shadow,
                      }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <h3 className="text-2xl text-foreground">Spaces & Facilities</h3>
                      </div>
                      <ul className="space-y-4">
                        {program.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-start group/item hover:translate-x-2 transition-transform duration-200">
                            <span
                              className="w-3 h-3 rounded-full mt-1.5 mr-4 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200"
                              style={{ backgroundColor: cardStyle.bulletColor }}
                            />
                            <span className="text-base text-foreground/90 group-hover/item:text-foreground transition-colors duration-200 font-light">
                              {activity}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cross-Domain Programs */}
        <div className="max-w-5xl mx-auto mt-32 animate-fade-in">
          <div
            className="p-12 md:p-16"
            style={{
              background: "#b8f0e2",
              border: "1.5px solid rgba(0,179,137,0.25)",
              borderRadius: 24,
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white" style={{ background: "#1a9fd4" }} />
                <div className="w-8 h-8 rounded-full border-2 border-white" style={{ background: "#00b389" }} />
                <div className="w-8 h-8 rounded-full border-2 border-white" style={{ background: "#f9bb86" }} />
                <div className="w-8 h-8 rounded-full border-2 border-white" style={{ background: "#ffcd1a" }} />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl mb-8 text-foreground text-center">
              Cross-Domain Integration
            </h2>
            <div className="space-y-6 text-center max-w-[70ch] mx-auto">
              <p className="text-lg md:text-xl text-ink leading-relaxed font-light">
                The magic of Social Factory happens when domains overlap. A skateboarder might discover
                entrepreneurship through designing boards. An artist might find wellness through creative
                expression. A wellness coach might launch a social enterprise at our marketplace.
              </p>
              <p className="text-lg md:text-xl text-ink leading-relaxed font-light">
                This integrated approach reflects how real life works: and how meaningful connections form
                naturally when people share space, time, and purpose.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <Footer />
  </div>;
};
export default Programming;
