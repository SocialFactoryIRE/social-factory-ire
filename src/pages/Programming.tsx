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
    description: "Skate, climb, dance, create, this is where fun and friendship meet. The Social domain brings energy and togetherness through youth activities, action sports, art, and events.",
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

        {/* Sample Timetable */}
        <div className="max-w-7xl mx-auto mt-32 animate-fade-in">
          <div className="text-center mb-12">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2 block">Example</span>
            <h2 className="text-4xl md:text-5xl mb-6 text-foreground">
              Weekly Programming Schedule
            </h2>
            <p className="text-lg text-ink-soft max-w-[70ch] mx-auto font-light">
              Age-based programming across all four domains throughout the week
            </p>
          </div>

          <div className="overflow-x-auto" style={{ borderRadius: 20, border: "1.5px solid rgba(30,28,26,0.08)" }}>
            <table className="w-full" style={{ background: "#fff9f2" }}>
              <thead>
                <tr style={{ borderBottom: "1.5px solid rgba(30,28,26,0.08)" }}>
                  <th className="p-4 text-left font-semibold text-foreground sticky left-0 z-10" style={{ background: "#fdf6ec" }}>Time</th>
                  <th className="p-4 text-center font-semibold text-foreground min-w-[140px]" style={{ background: "#fdf6ec" }}>Monday</th>
                  <th className="p-4 text-center font-semibold text-foreground min-w-[140px]" style={{ background: "#fdf6ec" }}>Tuesday</th>
                  <th className="p-4 text-center font-semibold text-foreground min-w-[140px]" style={{ background: "#fdf6ec" }}>Wednesday</th>
                  <th className="p-4 text-center font-semibold text-foreground min-w-[140px]" style={{ background: "#fdf6ec" }}>Thursday</th>
                  <th className="p-4 text-center font-semibold text-foreground min-w-[140px]" style={{ background: "#fdf6ec" }}>Friday</th>
                  <th className="p-4 text-center font-semibold text-foreground min-w-[140px]" style={{ background: "#fdf6ec" }}>Saturday</th>
                  <th className="p-4 text-center font-semibold text-foreground min-w-[140px]" style={{ background: "#fdf6ec" }}>Sunday</th>
                </tr>
              </thead>
              <tbody>
                {/* Baby & Parents: 9am - 11am */}
                <tr style={{ background: "rgba(93,205,249,0.15)", borderBottom: "1.5px solid rgba(30,28,26,0.08)" }}>
                  <td colSpan={8} className="p-4 text-center">
                    <span className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Zodiak', serif" }}>Baby & Parents</span>
                    <span className="text-sm text-muted-foreground ml-2">9am - 11am</span>
                  </td>
                </tr>
                <tr className="border-b border-border transition-colors" style={{ ["--tw-bg-opacity" as string]: 1 }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(253,246,236,0.8)")} onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="p-4 font-medium text-foreground sticky left-0" style={{ background: "#fff9f2" }}>9am</td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Baby & Me Yoga</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Tiny Tunes</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Parent Meet-Up Café</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Creative Little Hands</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Stroller Circuit</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Family Flow</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Slow Sunday</span></td>
                </tr>
                <tr className="border-b border-border transition-colors" onMouseEnter={e => (e.currentTarget.style.background = "rgba(253,246,236,0.8)")} onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="p-4 font-medium text-foreground sticky left-0" style={{ background: "#fff9f2" }}>10am</td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Coffee & Chat</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Sensory Studio</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Mini Movers</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Parent Skills Swap</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-accent/20">Factory Brunch</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Baby Disco</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-accent/20">Slow Sunday Brunch</span></td>
                </tr>

                {/* Older Adults (50+): 11am - 2pm */}
                <tr style={{ background: "rgba(0,179,137,0.12)", borderBottom: "1.5px solid rgba(30,28,26,0.08)" }}>
                  <td colSpan={8} className="p-4 text-center">
                    <span className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Zodiak', serif" }}>Older Adults (50+)</span>
                    <span className="text-sm text-muted-foreground ml-2">11am - 2pm</span>
                  </td>
                </tr>
                <tr className="border-b border-border transition-colors" onMouseEnter={e => (e.currentTarget.style.background = "rgba(253,246,236,0.8)")} onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="p-4 font-medium text-foreground sticky left-0" style={{ background: "#fff9f2" }}>11am</td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Morning Mobility & Stretch</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Walk & Talk</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Gentle Fitness</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Art & Expression</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Functional Movement</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Active Saturdays</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Slow Start</span></td>
                </tr>
                <tr className="border-b border-border transition-colors" onMouseEnter={e => (e.currentTarget.style.background = "rgba(253,246,236,0.8)")} onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="p-4 font-medium text-foreground sticky left-0" style={{ background: "#fff9f2" }}>12pm</td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Coffee & Conversation</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-accent/20">Healthy Lunch Club</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-accent/20">Community Lunch</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Mind & Matter Talks</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-accent/20">Factory Friday Lunch</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-accent/20">Market Brunch Meetup</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-accent/20">Sunday Feast</span></td>
                </tr>
                <tr className="border-b border-border transition-colors" onMouseEnter={e => (e.currentTarget.style.background = "rgba(253,246,236,0.8)")} onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="p-4 font-medium text-foreground sticky left-0" style={{ background: "#fff9f2" }}>1pm</td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Creative Crafts Circle</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Digital Skills Café</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Memory & Music Hour</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Games & Socials</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Skills Revival</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Storytelling & Poetry</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Film Club & Tea</span></td>
                </tr>

                {/* Kids Afterschool (4-12): 2pm - 4pm */}
                <tr style={{ background: "rgba(249,187,134,0.15)", borderBottom: "1.5px solid rgba(30,28,26,0.08)" }}>
                  <td colSpan={8} className="p-4 text-center">
                    <span className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Zodiak', serif" }}>Kids Afterschool (4-12 yr old)</span>
                    <span className="text-sm text-muted-foreground ml-2">2pm - 4pm</span>
                  </td>
                </tr>
                <tr className="border-b border-border transition-colors" onMouseEnter={e => (e.currentTarget.style.background = "rgba(253,246,236,0.8)")} onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="p-4 font-medium text-foreground sticky left-0" style={{ background: "#fff9f2" }}>2pm</td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Active Start</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Mindful Movers</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Midweek Makers</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Adventure Fitness</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Fun Factory Fridays</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Adventure Games</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Creative Café</span></td>
                </tr>
                <tr className="border-b border-border transition-colors" onMouseEnter={e => (e.currentTarget.style.background = "rgba(253,246,236,0.8)")} onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="p-4 font-medium text-foreground sticky left-0" style={{ background: "#fff9f2" }}>3pm</td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Creative Corner</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">STEM Explorers</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Mini Mingle</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Studio Thursdays</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-accent/20">Kids Market Setup</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Family Free Play</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Kindness Crew</span></td>
                </tr>

                {/* Teens Afterschool (12-16): 4pm - 6pm */}
                <tr style={{ background: "rgba(255,205,26,0.12)", borderBottom: "1.5px solid rgba(30,28,26,0.08)" }}>
                  <td colSpan={8} className="p-4 text-center">
                    <span className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Zodiak', serif" }}>Teens Afterschool (12-16 yr old)</span>
                    <span className="text-sm text-muted-foreground ml-2">4pm - 6pm</span>
                  </td>
                </tr>
                <tr className="border-b border-border transition-colors" onMouseEnter={e => (e.currentTarget.style.background = "rgba(253,246,236,0.8)")} onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="p-4 font-medium text-foreground sticky left-0" style={{ background: "#fff9f2" }}>4pm</td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Move & Groove</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Maker Lab</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Midweek Movement</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Digital Studio</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Fun Factory Fridays</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Weekend Workshop</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Brunch & Chat</span></td>
                </tr>
                <tr className="border-b border-border transition-colors" onMouseEnter={e => (e.currentTarget.style.background = "rgba(253,246,236,0.8)")} onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="p-4 font-medium text-foreground sticky left-0" style={{ background: "#fff9f2" }}>5pm</td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Chill Café + Homework</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Skill Swap</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Wednesday Club</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Community Crew</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Friday Night Lights</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-accent/20">Teen Market Helpers</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Sunday Sport & Social</span></td>
                </tr>

                {/* Teens Late Night (16-18): 6pm - 8pm */}
                <tr style={{ background: "rgba(249,187,134,0.18)", borderBottom: "1.5px solid rgba(30,28,26,0.08)" }}>
                  <td colSpan={8} className="p-4 text-center">
                    <span className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Zodiak', serif" }}>Teens Late Night (16-18 yr old)</span>
                    <span className="text-sm text-muted-foreground ml-2">6pm - 8pm</span>
                  </td>
                </tr>
                <tr className="border-b border-border transition-colors" onMouseEnter={e => (e.currentTarget.style.background = "rgba(253,246,236,0.8)")} onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="p-4 font-medium text-foreground sticky left-0" style={{ background: "#fff9f2" }}>6pm</td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Functional Fitness</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Studio Sessions</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Youth Leadership</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Enterprise Sprint</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Action Sports Jam</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Creative Jam</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Mindful Reset</span></td>
                </tr>
                <tr className="border-b border-border transition-colors" onMouseEnter={e => (e.currentTarget.style.background = "rgba(253,246,236,0.8)")} onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="p-4 font-medium text-foreground sticky left-0" style={{ background: "#fff9f2" }}>7pm</td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Mindset Café</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Open Collab Hour</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Wednesday Club Late</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Future Talks</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Factory Nights</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Night Studio</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Film & Reflect</span></td>
                </tr>

                {/* Adults: 8pm - 12am */}
                <tr style={{ background: "rgba(0,179,137,0.12)", borderBottom: "1.5px solid rgba(30,28,26,0.08)" }}>
                  <td colSpan={8} className="p-4 text-center">
                    <span className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Zodiak', serif" }}>Adults</span>
                    <span className="text-sm text-muted-foreground ml-2">8pm - 12am</span>
                  </td>
                </tr>
                <tr className="border-b border-border transition-colors" onMouseEnter={e => (e.currentTarget.style.background = "rgba(253,246,236,0.8)")} onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="p-4 font-medium text-foreground sticky left-0" style={{ background: "#fff9f2" }}>8pm</td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Factory Fitness</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Creative Workshop</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Wednesday Club</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Studio Night</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Factory Fridays</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Movement & Music</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Sound Bath</span></td>
                </tr>
                <tr className="border-b border-border transition-colors" onMouseEnter={e => (e.currentTarget.style.background = "rgba(253,246,236,0.8)")} onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="p-4 font-medium text-foreground sticky left-0" style={{ background: "#fff9f2" }}>9pm</td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-peach/20">Mindfulness & Recovery</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Skill-Share Session</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-accent/20">Mingle Meal</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Cultural Exchange</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-accent/20">Open Market Night</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-accent/20">Community Feast</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Film & Discussion</span></td>
                </tr>
                <tr className="transition-colors" onMouseEnter={e => (e.currentTarget.style.background = "rgba(253,246,236,0.8)")} onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="p-4 font-medium text-foreground sticky left-0" style={{ background: "#fff9f2" }}>10pm</td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Café Lounge Social</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-mint/20">Co-Work Late</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Late Lounge</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Night Café</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">After Hours Lounge</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Social Factory Nights</span></td>
                  <td className="p-4 text-center text-sm"><span className="inline-block px-3 py-1 rounded-full bg-sky/20">Quiet Café</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 py-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "#1a9fd4" }}></div>
              <span className="text-sm text-ink-soft">Social</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "#007d61" }}></div>
              <span className="text-sm text-ink-soft">Work</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "#e8874a" }}></div>
              <span className="text-sm text-ink-soft">Health</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "#e6a800" }}></div>
              <span className="text-sm text-ink-soft">Market</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>;
};
export default Programming;
