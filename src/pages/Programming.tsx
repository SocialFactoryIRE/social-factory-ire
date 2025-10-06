import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Palette, Briefcase, Heart, ShoppingBag } from "lucide-react";
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
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Our Programming
            </h1>
            <p className="text-xl text-foreground/90">Our programmes are designed around four interconnected domains — <br />
each a pillar of social connection and community growth.
          </p>
          </div>

          {/* Programs Grid */}
          <div className="space-y-20">
            {programs.map((program, index) => <div key={index} className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className={index % 2 === 1 ? "md:order-2" : ""}>
                    <div className={`w-20 h-20 rounded-3xl ${program.color} flex items-center justify-center mb-6`}>
                      <program.icon className="h-10 w-10 text-foreground" />
                    </div>
                    <h2 className="text-4xl font-bold mb-4 text-foreground">{program.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{program.description}</p>
                  </div>
                  <div className={index % 2 === 1 ? "md:order-1" : ""}>
                     <div className="bg-card rounded-2xl p-8 shadow-soft border-2 border-border">
                      <h3 className="text-xl font-bold mb-4 text-foreground">Spaces & Facilities</h3>
                      <ul className="space-y-3">
                        {program.activities.map((activity, actIndex) => <li key={actIndex} className="flex items-start">
                            <span className={`w-2 h-2 rounded-full ${program.color} mt-2 mr-3 flex-shrink-0`}></span>
                            <span className="text-muted-foreground">{activity}</span>
                          </li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>

          {/* Cross-Domain Programs */}
          <div className="max-w-4xl mx-auto mt-20">
            <div className="bg-gradient-hero p-12 rounded-3xl shadow-hover">
              <h2 className="text-3xl font-bold mb-6 text-foreground text-center">
                Cross-Domain Integration
              </h2>
              <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                The magic of Social Factory happens when domains overlap. A skateboarder might discover 
                entrepreneurship through designing boards. An artist might find wellness through creative 
                expression. A wellness coach might launch a social enterprise at our marketplace.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                This integrated approach reflects how real life works—and how meaningful connections form 
                naturally when people share space, time, and purpose.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default Programming;