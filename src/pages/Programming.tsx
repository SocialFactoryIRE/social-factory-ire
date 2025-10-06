import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Palette, Briefcase, Heart, ShoppingBag, Sparkles } from "lucide-react";
const Programming = () => {
  const programs = [{
    icon: Palette,
    title: "Social",
    color: "bg-sky",
    description: "Skate, climb, dance, create — this is where fun and friendship meet. The Social domain brings energy and togetherness through youth activities, action sports, art, and events.",
    activities: ["Skatepark", "Bouldering / Climbing Hub", "Trampoline & Movement Centre", "Kids Activity Zone", "Events & Performance Centre", "Adaptable Community Spaces", "Mental Health & Wellness Integration"]
  }, {
    icon: Briefcase,
    title: "Work",
    color: "bg-mint",
    description: "A co-working and maker environment supporting creativity, digital fabrication, and new ideas. A space to learn, collaborate, and grow small enterprises that strengthen the community.",
    activities: ["Shared Work Desks", "Digital Fabrication Lab", "Audio & Visual Studios", "Urban Library / Study Spaces", "Entrepreneurship Hub", "Adaptable Offices / Studios", "Mental Health Integration"]
  }, {
    icon: Heart,
    title: "Health",
    color: "bg-peach",
    description: "From gyms to wellness studios, our Health domain promotes movement and mindfulness, with clinicians and coaches working side by side to make wellbeing accessible to everyone.",
    activities: ["Clinically Trained Professionals", "Physical Health & Wellness Facilities (gym, yoga, recovery)", "Combative Sports (boxing, martial arts, resilience training)", "Adaptable Offices", "Adaptable Wellness Studios", "Organic Growth"]
  }, {
    icon: ShoppingBag,
    title: "Market",
    color: "bg-accent",
    description: "Local food, crafts, and weekend markets — the Market domain celebrates the culture of place and supports local entrepreneurship and circular economy principles.",
    activities: ["Traditional Market", "Sunday Market", "Food & Beverage Hall", "Education & Demonstration Spaces (workshops, cooking, nutrition)", "Organic Growth"]
  }];
  return <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Four Interconnected Domains</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
              Our Programming
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Our programmes are designed around four interconnected domains — <br className="hidden md:block" />
              each a pillar of social connection and community growth.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="space-y-32">
            {programs.map((program, index) => (
              <div key={index} className="max-w-6xl mx-auto group">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className={`space-y-6 ${index % 2 === 1 ? "md:order-2" : ""} animate-fade-in`}>
                    <div className={`w-24 h-24 rounded-3xl ${program.color} flex items-center justify-center shadow-hover group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <program.icon className="h-12 w-12 text-foreground" />
                    </div>
                    <h2 className="text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {program.title}
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                  <div className={`${index % 2 === 1 ? "md:order-1" : ""} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
                    <div className="bg-gradient-card rounded-3xl p-10 shadow-hover border-2 border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`w-1 h-8 rounded-full ${program.color}`} />
                        <h3 className="text-2xl font-bold text-foreground">Spaces & Facilities</h3>
                      </div>
                      <ul className="space-y-4">
                        {program.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-start group/item hover:translate-x-2 transition-transform duration-200">
                            <span className={`w-3 h-3 rounded-full ${program.color} mt-1.5 mr-4 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200`} />
                            <span className="text-base text-muted-foreground group-hover/item:text-foreground transition-colors duration-200">
                              {activity}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cross-Domain Programs */}
          <div className="max-w-5xl mx-auto mt-32 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-[2.5rem] blur-2xl" />
              <div className="relative bg-gradient-hero p-12 md:p-16 rounded-[2.5rem] shadow-hover border-2 border-primary/20 hover:border-primary/40 transition-all duration-500">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-sky border-2 border-background" />
                    <div className="w-8 h-8 rounded-full bg-mint border-2 border-background" />
                    <div className="w-8 h-8 rounded-full bg-peach border-2 border-background" />
                    <div className="w-8 h-8 rounded-full bg-accent border-2 border-background" />
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground text-center">
                  Cross-Domain Integration
                </h2>
                <div className="space-y-6 text-center max-w-3xl mx-auto">
                  <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
                    The magic of Social Factory happens when domains overlap. A skateboarder might discover 
                    entrepreneurship through designing boards. An artist might find wellness through creative 
                    expression. A wellness coach might launch a social enterprise at our marketplace.
                  </p>
                  <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
                    This integrated approach reflects how real life works—and how meaningful connections form 
                    naturally when people share space, time, and purpose.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default Programming;