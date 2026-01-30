import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, TrendingUp, Users, Award } from "lucide-react";

const Science = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20 grid-pattern relative overflow-hidden">
        {/* Background geometric elements */}
        <div className="geometric-shape shape-circle w-72 h-72 bg-mint/20 -top-36 -left-36 blur-3xl"></div>
        <div className="geometric-shape w-36 h-36 bg-sky/30 top-32 right-20 rounded-3xl rotate-12"></div>
        <div className="geometric-shape shape-circle w-48 h-48 bg-coral/20 top-2/3 left-10 blur-2xl"></div>
        <div className="geometric-shape w-32 h-32 bg-accent/30 bottom-40 right-1/4 rounded-2xl -rotate-12"></div>
        <div className="geometric-shape shape-circle w-56 h-56 bg-peach/20 bottom-10 left-1/3 blur-3xl"></div>
        <div className="geometric-shape shape-circle w-52 h-52 bg-coral/20 top-32 left-1/4 blur-2xl"></div>
        <div className="geometric-shape shape-circle w-44 h-44 bg-sky/25 bottom-1/4 right-16 blur-xl"></div>
        <div className="geometric-shape shape-circle w-60 h-60 bg-mint/15 top-2/3 right-1/3 blur-3xl"></div>
        <div className="geometric-shape shape-circle w-40 h-40 bg-peach/30 bottom-40 left-1/3 blur-2xl"></div>
        <div className="geometric-shape shape-circle w-48 h-48 bg-accent/20 top-1/2 right-8 blur-2xl"></div>
        <div className="geometric-shape shape-circle w-38 h-38 bg-sky/18 bottom-1/3 left-20 blur-xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Grounded in Science and Research
            </h1>
            <p className="text-xl text-muted-foreground">
              Building upon leading international research on social connection, youth wellbeing, and urban innovation
            </p>
          </div>

          {/* Evidence Base */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-2xl shadow-soft border-2 border-primary">
                <BookOpen className="h-12 w-12 mb-4 text-primary" />
                <h2 className="text-2xl font-bold mb-4 text-foreground">Planet Youth Model</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Inspired by the Planet Youth model, we use data-driven strategies to design spaces that 
                  reduce isolation, improve community health, and foster creativity. This proven framework 
                  from Iceland successfully reduced substance abuse and improved youth wellbeing through 
                  community-based interventions and strong social bonds.
                </p>
              </div>
              <div className="bg-card p-8 rounded-2xl shadow-soft border-2 border-secondary">
                <Award className="h-12 w-12 mb-4 text-secondary" />
                <h2 className="text-2xl font-bold mb-4 text-foreground">New European Bauhaus</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our work aligns closely with the New European Bauhaus, the UN Sustainable Development Goals, 
                  and Ireland's Healthy Communities framework. We integrate sustainability, inclusion, and 
                  aesthetics into our design and operations—creating beautiful, accessible spaces that serve 
                  the community while respecting our planet.
                </p>
              </div>
            </div>
          </div>

          {/* Key Findings */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-12">
              <TrendingUp className="h-16 w-16 mx-auto mb-6 text-accent" />
              <h2 className="text-4xl font-bold mb-4 text-foreground">Planet Youth West Ireland – 2024 Survey</h2>
              <p className="text-lg text-muted-foreground">
                Data from 5,079 young people aged 15-16 across Galway, Mayo & Roscommon
              </p>
              <a 
                href="https://west.planetyouth.ie" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline mt-2 inline-block"
              >
                Source: west.planetyouth.ie
              </a>
            </div>

            <div className="space-y-6">
              <div className="bg-sky/10 p-8 rounded-2xl border-2 border-sky">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-primary">31%</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Drunk in Last Month</h3>
                    <p className="text-muted-foreground">
                      Nearly one third of 15-16 year olds reported being drunk at least once in the past 30 days. 
                      This highlights the need for community-based prevention and positive alternatives.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-mint/10 p-8 rounded-2xl border-2 border-mint">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-secondary">65%</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">3+ Hours Daily Social Media</h3>
                    <p className="text-muted-foreground">
                      Two thirds of young people spend 3 or more hours daily on social media, correlating 
                      with reduced sleep and lower wellbeing scores.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-peach/10 p-8 rounded-2xl border-2 border-coral">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-coral">30%</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Low Wellbeing Scores</h3>
                    <p className="text-muted-foreground">
                      Nearly one third of young people scored below the WHO-5 threshold for mental wellbeing, 
                      with similar numbers reporting low self-esteem and resilience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 p-8 rounded-2xl border-2 border-accent">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-accent">46%</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Getting Adequate Sleep</h3>
                    <p className="text-muted-foreground">
                      Less than half of young people are getting the recommended 8+ hours of sleep per night, 
                      directly impacting mental health, physical health and academic performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Research Approach */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-gradient-hero p-12 rounded-3xl shadow-hover">
              <Users className="h-16 w-16 mb-6 text-foreground" />
              <h2 className="text-3xl font-bold mb-6 text-foreground">Our Research Approach</h2>
              <div className="space-y-4 text-foreground/90">
                <p className="text-lg leading-relaxed">
                  <strong>Longitudinal Studies:</strong> We track participant outcomes over time, measuring 
                  social connection, mental health, skill development, and community engagement.
                </p>
                <p className="text-lg leading-relaxed">
                  <strong>Mixed Methods:</strong> Combining quantitative data with qualitative stories ensures 
                  we capture both statistical significance and human impact.
                </p>
                <p className="text-lg leading-relaxed">
                  <strong>Community Participation:</strong> Research is conducted with—not on—our community, 
                  ensuring voices are heard and valued in the process.
                </p>
                <p className="text-lg leading-relaxed">
                  <strong>Knowledge Sharing:</strong> All findings are made publicly available to support 
                  replication and scale of similar initiatives across Ireland and beyond.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Measurement */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
              How We Measure Impact
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-2xl shadow-soft text-center">
                <h3 className="font-bold text-lg mb-2 text-foreground">Social Connection</h3>
                <p className="text-sm text-muted-foreground">
                  Validated scales measuring loneliness, social support, and community belonging
                </p>
              </div>
              <div className="p-6 bg-card rounded-2xl shadow-soft text-center">
                <h3 className="font-bold text-lg mb-2 text-foreground">Wellbeing Outcomes</h3>
                <p className="text-sm text-muted-foreground">
                  Mental health, physical health, and life satisfaction metrics
                </p>
              </div>
              <div className="p-6 bg-card rounded-2xl shadow-soft text-center">
                <h3 className="font-bold text-lg mb-2 text-foreground">Skill Development</h3>
                <p className="text-sm text-muted-foreground">
                  Creative abilities, entrepreneurial capacity, and employability indicators
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Science;
