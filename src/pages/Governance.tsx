import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Scale, Users, Heart, FileText } from "lucide-react";
const Governance = () => {
  return <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20 grid-pattern relative overflow-hidden">
        {/* Background geometric elements */}
        <div className="geometric-shape shape-circle w-68 h-68 bg-accent/20 -top-32 -right-32 blur-3xl"></div>
        <div className="geometric-shape w-36 h-36 bg-coral/30 top-1/4 left-16 rounded-3xl rotate-45"></div>
        <div className="geometric-shape shape-circle w-52 h-52 bg-mint/20 top-2/3 right-20 blur-2xl"></div>
        <div className="geometric-shape w-40 h-40 bg-sky/30 bottom-1/4 left-1/3 rounded-2xl -rotate-12"></div>
        <div className="geometric-shape shape-circle w-64 h-64 bg-peach/20 -bottom-32 -left-32 blur-3xl"></div>
        <div className="geometric-shape shape-circle w-50 h-50 bg-peach/20 top-28 left-1/3 blur-2xl"></div>
        <div className="geometric-shape shape-circle w-46 h-46 bg-accent/15 bottom-16 right-1/4 blur-xl"></div>
        <div className="geometric-shape shape-circle w-54 h-54 bg-coral/20 top-1/3 right-12 blur-3xl"></div>
        <div className="geometric-shape shape-circle w-42 h-42 bg-sky/22 bottom-1/2 left-20 blur-2xl"></div>
        <div className="geometric-shape shape-circle w-48 h-48 bg-mint/18 top-1/2 right-1/3 blur-xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Governance & Social Purpose
            </h1>
            <p className="text-xl text-muted-foreground">
              Operating as a social enterprise with transparent, sustainable, and community-accountable practices
            </p>
          </div>

          {/* Mission Statement */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-gradient-hero p-12 rounded-3xl shadow-hover border-2 border-primary">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Mission Statement</h2>
              <p className="text-lg text-foreground/90 leading-relaxed">
                Social Factory empowers people to connect through action sports, creative arts, and
                entrepreneurship, offering an accessible and educational environment free from
                everyday financial barriers. We are committed to sustainable development by
                promoting youth entrepreneurship, equipping young people with employability skills, and
                providing a safe space to test business ideas. At the heart of our mission is a
                commitment to wellbeing, ensuring it is supported and prioritised in every aspect of
                what we do.
              </p>
            </div>
          </div>

          {/* Social Enterprise Model */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-gradient-hero p-12 rounded-3xl shadow-hover mb-12">
              <Scale className="h-16 w-16 mb-6 text-foreground" />
              <h2 className="text-3xl font-bold mb-6 text-foreground">Social Enterprise Model</h2>
              <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                Social Factory operates as a social enterprise, reinvesting all profits into programmes that 
                build connection, creativity, and wellbeing. Our model is transparent, sustainable, and 
                accountable to the community we serve.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                Governance aligns with best-practice frameworks under the Social Enterprise Model and the 
                New European Bauhaus Compass principles. This ensures sustainability while maintaining our 
                commitment to accessibility, inclusion, and community benefit above profit extraction.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-card rounded-2xl shadow-soft border-2 border-primary">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Revenue Streams</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                    <span>Affordable Membership fees</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                    <span>Program fees and workshop registrations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                    <span>Sub-leasing space rentals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                    <span>Partnership commissions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                    <span>Grants and philanthropic support</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-card rounded-2xl shadow-soft border-2 border-secondary">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Impact Priorities</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 mr-3 flex-shrink-0"></span>
                    <span>Reducing loneliness and social isolation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 mr-3 flex-shrink-0"></span>
                    <span>Improving mental health and wellbeing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 mr-3 flex-shrink-0"></span>
                    <span>Fostering entrepreneurship and employment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 mr-3 flex-shrink-0"></span>
                    <span>Building community cohesion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 mr-3 flex-shrink-0"></span>
                    <span>Environmental sustainability</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Community Governance */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-12">
              <Users className="h-16 w-16 mx-auto mb-6 text-accent" />
              <h2 className="text-4xl font-bold mb-4 text-foreground">Community Governance</h2>
              <p className="text-lg text-muted-foreground">
                Our community shapes our direction through participatory decision-making
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-sky/10 rounded-2xl border-2 border-sky">
                <h3 className="text-xl font-bold mb-3 text-foreground">Advisory Council</h3>
                <p className="text-muted-foreground">
                  A diverse council of community members, youth representatives, experts, and stakeholders 
                  provides guidance on strategic decisions, programming, and impact measurement.
                </p>
              </div>

              <div className="p-6 bg-mint/10 rounded-2xl border-2 border-mint">
                <h3 className="text-xl font-bold mb-3 text-foreground">Member Input</h3>
                <p className="text-muted-foreground">
                  Regular surveys, town halls, and feedback sessions ensure member voices directly influence 
                  programs, policies, and space design.
                </p>
              </div>

              <div className="p-6 bg-peach/10 rounded-2xl border-2 border-coral">
                <h3 className="text-xl font-bold mb-3 text-foreground">Transparent Operations</h3>
                <p className="text-muted-foreground">
                  Annual impact reports, financial transparency, and open communication channels keep our 
                  community informed and involved in our journey.
                </p>
              </div>

              <div className="p-6 bg-accent/10 rounded-2xl border-2 border-accent">
                <h3 className="text-xl font-bold mb-3 text-foreground">Youth Leadership</h3>
                <p className="text-muted-foreground">
                  Young people aren't just participants—they're leaders. Youth-led committees guide program 
                  development and ensure Social Factory meets the real needs of our community.
                </p>
              </div>
            </div>
          </div>

          {/* Values & Accountability */}
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-2xl shadow-soft">
                <Heart className="h-12 w-12 mb-4 text-coral" />
                <h2 className="text-2xl font-bold mb-4 text-foreground">Our Commitments</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-coral mt-2 mr-3 flex-shrink-0"></span>
                    <span>Accessibility: Sliding scale fees, scholarships, and barrier-free access</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-coral mt-2 mr-3 flex-shrink-0"></span>
                    <span>Inclusion: Welcoming all backgrounds, identities, and abilities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-coral mt-2 mr-3 flex-shrink-0"></span>
                    <span>Sustainability: Environmental and financial responsibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-coral mt-2 mr-3 flex-shrink-0"></span>
                    <span>Transparency: Open communication and accountability</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-soft">
                <FileText className="h-12 w-12 mb-4 text-cyan" />
                <h2 className="text-2xl font-bold mb-4 text-foreground">Impact Reporting</h2>
                <p className="text-muted-foreground mb-4">
                  We measure and report on our impact regularly, tracking:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-cyan mt-2 mr-3 flex-shrink-0"></span>
                    <span>Social connection and loneliness metrics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-cyan mt-2 mr-3 flex-shrink-0"></span>
                    <span>Wellbeing and mental health outcomes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-cyan mt-2 mr-3 flex-shrink-0"></span>
                    <span>Skills developed and jobs created</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-cyan mt-2 mr-3 flex-shrink-0"></span>
                    <span>Community engagement and participation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default Governance;