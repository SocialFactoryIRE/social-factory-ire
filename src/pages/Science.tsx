import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, TrendingUp, Users, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Science = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-20 grid-pattern relative overflow-hidden">
        <div className="geometric-shape shape-circle w-72 h-72 bg-mint/20 -top-36 -left-36 blur-3xl"></div>
        <div className="geometric-shape w-36 h-36 bg-sky/30 top-32 right-20 rounded-3xl rotate-12"></div>
        <div className="geometric-shape shape-circle w-48 h-48 bg-coral/20 top-2/3 left-10 blur-2xl"></div>
        <div className="geometric-shape w-32 h-32 bg-accent/30 bottom-40 right-1/4 rounded-2xl -rotate-12"></div>
        <div className="geometric-shape shape-circle w-56 h-56 bg-peach/20 bottom-10 left-1/3 blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              The Evidence Is Clear
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Social Factory is built on a growing body of national and international research.
              The case for preventative, community-based social infrastructure has never been stronger —
              and Ireland's own data makes it urgent.
            </p>
          </div>

          {/* Ireland's Data — Healthy Ireland 2025 */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-12">
              <TrendingUp className="h-16 w-16 mx-auto mb-6 text-coral" />
              <h2 className="text-4xl font-bold mb-4 text-foreground">Ireland's Wellbeing Crisis</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Data from the <strong>Healthy Ireland Survey 2025</strong> — Ireland's national annual health and wellbeing study
              </p>
              <a

                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2" href="https://www.gov.ie/en/healthy-ireland/publications/healthy-ireland-survey-2025/">
                
                Source: Healthy Ireland Survey 2025 <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-coral/10 p-8 rounded-2xl border-2 border-coral">
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-extrabold text-ink shrink-0">1 in 5</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Adults Report Loneliness</h3>
                    <p className="text-ink-soft max-w-[70ch]">
                      One in five adults in Ireland report feeling lonely often or always — a figure that rises sharply
                      among young adults aged 18–24 and older adults living alone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-sky/10 p-8 rounded-2xl border-2 border-sky">
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-extrabold text-ink shrink-0">53%</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Meet Physical Activity Guidelines</h3>
                    <p className="text-ink-soft max-w-[70ch]">
                      Only 53% of adults meet recommended physical activity levels — leaving almost half the population
                      at elevated risk of poor physical and mental health outcomes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-mint/10 p-8 rounded-2xl border-2 border-mint">
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-extrabold text-ink shrink-0">40%</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Experience Mental Health Difficulties</h3>
                    <p className="text-ink-soft max-w-[70ch]">
                      Approximately 40% of adults report experiencing mental health difficulties at some point in their
                      lives, with community-based supports remaining unevenly distributed across regions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 p-8 rounded-2xl border-2 border-accent">
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-extrabold text-ink shrink-0">18–24</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Highest Risk Age Group</h3>
                    <p className="text-ink-soft max-w-[70ch]">
                      Young adults aged 18–24 report the lowest wellbeing scores of any demographic —
                      challenging the assumption that loneliness is primarily an older person's problem.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-coral p-8 rounded-2xl text-center">
              <p className="text-lg text-white font-medium leading-relaxed">
                "Poor mental health and loneliness are not inevitable — they are preventable.
                The evidence consistently points to participation, connection, and community as the most
                powerful protective factors available."
              </p>
              <p className="text-white/70 text-sm mt-3">— Healthy Ireland Framework</p>
            </div>
          </div>

          {/* Pathways to Wellbeing */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-12">
              <Award className="h-16 w-16 mx-auto mb-6 text-secondary" />
              <h2 className="text-4xl font-bold mb-4 text-foreground">Aligned with National Policy</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Social Factory is designed in direct alignment with <strong>Pathways to Wellbeing:
                Ireland's National Mental Health Promotion Plan 2024–2030</strong>
              </p>
              <a
                href="https://www.gov.ie/en/publication/pathways-to-wellbeing/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2">
                
                Source: Department of Health, Ireland <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 bg-card rounded-2xl shadow-soft border-2 border-primary">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-lg">1</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">Promote Positive Mental Health</h3>
                <p className="text-sm text-muted-foreground">
                  Pathways to Wellbeing calls for population-level mental health promotion through participatory
                  community programmes. Social Factory delivers this through structured, accessible activity across all four domains.
                </p>
              </div>
              <div className="p-6 bg-card rounded-2xl shadow-soft border-2 border-secondary">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <span className="text-secondary font-bold text-lg">2</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">Reduce Stigma & Increase Access</h3>
                <p className="text-sm text-muted-foreground">
                  The Plan prioritises reducing barriers to mental health support. Social Factory embeds
                  clinical and wellness professionals directly within community activity spaces — normalising
                  care through participation rather than clinical referral.
                </p>
              </div>
              <div className="p-6 bg-card rounded-2xl shadow-soft border-2 border-accent">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <span className="text-accent font-bold text-lg">3</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">Target Vulnerable Groups</h3>
                <p className="text-sm text-muted-foreground">
                  Pathways to Wellbeing highlights young people, older adults, and socioeconomically
                  disadvantaged groups as priority populations. Our tiered concession membership and
                  social prescribing pathway directly address these groups.
                </p>
              </div>
            </div>

            <div className="bg-mint/10 border-2 border-mint rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-3 text-foreground">Social Prescribing — A National Priority</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pathways to Wellbeing 2024–2030 identifies social prescribing — where GPs and community
                health workers refer patients to non-clinical community activities — as a key intervention
                for reducing pressure on mental health services. Social Factory is designed to be a
                primary social prescribing destination in Limerick, with a dedicated concession
                membership tier for referred participants.
              </p>
            </div>
          </div>

          {/* Planet Youth */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-12">
              <BookOpen className="h-16 w-16 mx-auto mb-6 text-accent" />
              <h2 className="text-4xl font-bold mb-4 text-foreground">Planet Youth — Proven at Scale</h2>
              <p className="text-lg text-muted-foreground">
                Data from 5,079 young people aged 15–16 across Galway, Mayo & Roscommon
              </p>
              <a
                href="https://west.planetyouth.ie"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2">
                
                Source: Planet Youth West Ireland 2024 <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="space-y-6">
              <div className="bg-sky/10 p-8 rounded-2xl border-2 border-sky">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-ink shrink-0">31%</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Drunk in the Last Month</h3>
                    <p className="text-ink-soft max-w-[70ch]">
                      Nearly one in three 15–16 year olds reported being drunk at least once in the past 30 days.
                      Where the Planet Youth model has been implemented — providing structured alternatives — these
                      figures have fallen dramatically over time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-mint/10 p-8 rounded-2xl border-2 border-mint">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-ink shrink-0">65%</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">3+ Hours Daily on Social Media</h3>
                    <p className="text-ink-soft max-w-[70ch]">
                      Two thirds of young people spend three or more hours daily on social media — strongly
                      correlated with poorer sleep, lower wellbeing scores, and reduced face-to-face connection.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-peach/10 p-8 rounded-2xl border-2 border-coral">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-ink shrink-0">30%</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Below WHO Wellbeing Threshold</h3>
                    <p className="text-ink-soft max-w-[70ch]">
                      Nearly one in three young people scored below the WHO-5 threshold for mental wellbeing.
                      Similar numbers reported low self-esteem and resilience — conditions strongly linked to
                      lack of belonging and structured peer participation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 p-8 rounded-2xl border-2 border-accent">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-ink shrink-0">25–30%</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Depression, Anxiety & Stress</h3>
                    <p className="text-ink-soft max-w-[70ch]">
                      Around one in four young people fall outside the normal range for depression, anxiety,
                      and stress. The Planet Youth model responds to precisely these indicators through
                      structured activity, peer connection, and adult mentorship.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Frameworks */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-2xl shadow-soft border-2 border-primary">
                <BookOpen className="h-12 w-12 mb-4 text-primary" />
                <h2 className="text-2xl font-bold mb-4 text-foreground">New European Bauhaus</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Social Factory aligns with the EU's New European Bauhaus initiative, integrating
                  sustainability, inclusion, and beauty into our physical design and programming.
                  We create spaces that are not just functional but inspiring — because environment
                  shapes behaviour, and beauty encourages people to stay, return, and belong.
                </p>
              </div>
              <div className="bg-card p-8 rounded-2xl shadow-soft border-2 border-secondary">
                <Users className="h-12 w-12 mb-4 text-secondary" />
                <h2 className="text-2xl font-bold mb-4 text-foreground">Lundy Model of Participation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our approach to community engagement is structured around the Lundy Model of Participation —
                  ensuring the people we serve have real Space to express views, genuine Voice in programme design,
                  and meaningful Influence over decisions that affect them. Participation is not an add-on at
                  Social Factory; it is foundational.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Measurement */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-gradient-hero p-12 rounded-3xl shadow-hover">
              <Users className="h-16 w-16 mb-6 text-foreground" />
              <h2 className="text-3xl font-bold mb-6 text-foreground">How We Measure Impact</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-background/30 rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-2 text-foreground">Social Connection</h3>
                  <p className="text-sm text-foreground/80">
                    Validated scales tracking loneliness, belonging, and quality of peer relationships
                    across all participant age groups.
                  </p>
                </div>
                <div className="bg-background/30 rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-2 text-foreground">Wellbeing Outcomes</h3>
                  <p className="text-sm text-foreground/80">
                    WHO-5 Wellbeing Index, WEMWBS, and domain-specific measures across mental, physical,
                    and social health dimensions.
                  </p>
                </div>
                <div className="bg-background/30 rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-2 text-foreground">Community Participation</h3>
                  <p className="text-sm text-foreground/80">
                    Engagement frequency, cross-domain activity, volunteer hours, and qualitative participant
                    voice data gathered through the Lundy framework.
                  </p>
                </div>
              </div>
              <p className="text-foreground/80 mt-6 text-sm">
                All findings will be made publicly available to support replication across Ireland.
                We conduct research <em>with</em> our community — not <em>on</em> it.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Built on Evidence. Designed for People.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              If you're a funder, researcher, or policy maker interested in Social Factory's evidence base,
              we'd love to talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-semibold">
                <Link to="/contact">Get in Touch</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-semibold">
                <Link to="/join">Join the Movement</Link>
              </Button>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>);

};

export default Science;