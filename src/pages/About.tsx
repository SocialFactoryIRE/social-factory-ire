import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Users, Globe, Sparkles, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const About = () => {
  return <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-20 grid-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center leading-tight">
              <span className="block text-foreground text-6xl md:text-7xl font-black tracking-tight -mt-2">
                Reconnecting<br />Society
              </span>
              <span className="block text-accent text-3xl md:text-4xl font-medium tracking-widest mt-2">
                through Space, Participation & Design
              </span>
            </h1>
          </div>

          {/* Mission */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-gradient-hero p-12 rounded-3xl shadow-hover mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Our Story</h2>
              <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                Social Factory was founded with one clear purpose: to tackle loneliness through design.
                We're creating Ireland's first integrated social hub where action sports, creative arts,
                health, and entrepreneurship live side-by-side under one roof in Limerick.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                Guided by the principles of the New European Bauhaus and Ireland's own national mental health
                frameworks, we blend sustainability, inclusion, and beauty to design environments where
                everyone can thrive, not as a service delivered to people, but as a space built with them.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                Our approach isn't just about spaces. It's about systems. We're building a movement that
                reconnects communities, redefines belonging, and creates new pathways for wellbeing and
                opportunity for people of all ages and backgrounds.
              </p>
              <div className="mt-8 p-6 bg-background/50 rounded-2xl border-2 border-background">
                <p className="text-foreground/90 italic text-lg">
                  "I'm on a mission to reconnect society by creating spaces and systems where vulnerable
                  communities can belong, participate, and thrive."
                </p>
                <p className="text-foreground/60 text-sm mt-3">Jason O'Donovan, Founder, Social Factory CLG</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-card rounded-2xl shadow-soft border-2 border-primary">
                <Heart className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-3">Why It Matters</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The <strong>Healthy Ireland Survey 2025</strong> shows 1 in 5 Irish adults experience
                  loneliness, a figure that is highest among young adults aged 18–24 and older people
                  living alone. Loneliness affects physical and mental health as significantly as smoking
                  15 cigarettes a day. These are not personal failings; they are structural problems
                  that demand structural solutions.
                </p>
              </div>
              <div className="p-8 bg-card rounded-2xl shadow-soft border-2 border-secondary">
                <Users className="h-12 w-12 mb-4 text-secondary" />
                <h3 className="text-2xl font-bold mb-3">Our Approach</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We create spaces where connection happens naturally, through skateboarding, art workshops,
                  wellness programmes, and entrepreneurial collaboration. Structured around the
                  <strong> Lundy Model of Participation</strong>, our community has real voice and real
                  influence. No forced networking, just authentic, everyday belonging.
                </p>
              </div>
            </div>
          </div>

          {/* New European Bauhaus */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="text-center mb-12">
              <Globe className="h-16 w-16 mx-auto mb-6 text-accent" />
              <h2 className="text-4xl font-bold mb-4 text-foreground">
                Aligned with New European Bauhaus
              </h2>
              <p className="text-lg text-muted-foreground">
                Our vision embodies the three core pillars of the NEB movement
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-mint/20 rounded-2xl border-2 border-mint">
                <h3 className="text-xl font-bold mb-3 text-foreground">Sustainability</h3>
                <p className="text-muted-foreground text-sm">
                  Building a circular economy model, supporting local production,
                  and creating long-term social and environmental value for Limerick and beyond.
                </p>
              </div>
              <div className="p-6 bg-sky/20 rounded-2xl border-2 border-sky">
                <h3 className="text-xl font-bold mb-3 text-foreground">Inclusion</h3>
                <p className="text-muted-foreground text-sm">
                  Welcoming all ages, abilities, and backgrounds. A tiered concession membership
                  and social prescribing pathway ensure no one is excluded by cost or circumstance.
                </p>
              </div>
              <div className="p-6 bg-peach/20 rounded-2xl border-2 border-coral">
                <h3 className="text-xl font-bold mb-3 text-foreground">Beauty</h3>
                <p className="text-muted-foreground text-sm">
                  Designing spaces that inspire joy, creativity, and connection.
                  Where aesthetics meet function and form follows feeling, because environment shapes behaviour.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="text-center mb-12">
              <Sparkles className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h2 className="text-4xl font-bold mb-4 text-foreground">Our Values</h2>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-card rounded-2xl shadow-soft">
                <h3 className="text-xl font-bold mb-2 text-foreground">Community First</h3>
                <p className="text-muted-foreground">
                  Every decision we make centres the needs and voices of our community members.
                  The Lundy Model of Participation isn't a framework we apply, it's how we work.
                </p>
              </div>
              <div className="p-6 bg-card rounded-2xl shadow-soft">
                <h3 className="text-xl font-bold mb-2 text-foreground">Evidence-Based Action</h3>
                <p className="text-muted-foreground">
                  We ground our work in research, including the Healthy Ireland Survey 2025, Pathways to
                  Wellbeing 2024–2030, and the Planet Youth model. Our design choices are informed by data,
                  not intuition alone.
                </p>
              </div>
              <div className="p-6 bg-card rounded-2xl shadow-soft">
                <h3 className="text-xl font-bold mb-2 text-foreground">Playful Innovation</h3>
                <p className="text-muted-foreground">
                  We believe serious impact comes from joyful, creative, and playful approaches.
                  A skate park and a mental health clinic can, and should, share a building.
                </p>
              </div>
              <div className="p-6 bg-card rounded-2xl shadow-soft">
                <h3 className="text-xl font-bold mb-2 text-foreground">Radical Inclusion</h3>
                <p className="text-muted-foreground">
                  Social Factory is for everyone, regardless of background, ability, age, or circumstance.
                  Our concession membership tier at €60 per year ensures cost is never a barrier to belonging.
                </p>
              </div>
            </div>
          </div>

          {/* Challenges vs Our Response */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-12">
              <Shield className="h-16 w-16 mx-auto mb-6 text-coral" />
              <h2 className="text-4xl font-bold mb-4 text-foreground">Challenge vs Response</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ireland's social challenges are well documented. Here's how Social Factory responds.
              </p>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-hidden rounded-3xl border-2 border-border shadow-hover">
              <div className="grid md:grid-cols-2">
                <div className="bg-coral p-6 border-b-2 border-r-2 border-border">
                  <h3 className="text-2xl font-bold text-foreground text-center">The Challenge</h3>
                </div>
                <div className="bg-secondary p-6 border-b-2 border-border">
                  <h3 className="text-2xl font-bold text-secondary-foreground text-center">Our Response</h3>
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                <div className="p-6 border-b-2 border-r-2 border-border bg-coral/10">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Lack of inclusive spaces</h4>
                  <p className="text-muted-foreground">Few affordable, safe places exist for people, especially adolescents, to socialise outside of food-and-drink settings.</p>
                </div>
                <div className="p-6 border-b-2 border-border bg-mint/20">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Create inspiring, accessible hubs</h4>
                  <p className="text-muted-foreground">30,000+ sq. ft. of shared space in Limerick where people of all ages can connect safely and meaningfully, every day of the week.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                <div className="p-6 border-b-2 border-r-2 border-border bg-coral/10">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Youth at risk</h4>
                  <p className="text-muted-foreground">31% of 15–16 year olds were drunk in the last month. 30% score below WHO wellbeing thresholds. Mental health challenges are rising. <em>(Planet Youth West Ireland 2024)</em></p>
                </div>
                <div className="p-6 border-b-2 border-border bg-mint/20">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Empower young people</h4>
                  <p className="text-muted-foreground">Through positive programmes, mentorship, and entrepreneurship opportunities rooted in the Planet Youth model of structured community participation.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                <div className="p-6 border-b-2 border-r-2 border-border bg-coral/10">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Declining face-to-face interaction</h4>
                  <p className="text-muted-foreground">65% of young people spend 3+ hours daily on social media. In-person socialising is declining, fuelling the loneliness epidemic. <em>(Planet Youth 2024)</em></p>
                </div>
                <div className="p-6 border-b-2 border-border bg-mint/20">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Foster everyday connection</h4>
                  <p className="text-muted-foreground">With structured activities across Social, Work, Health, and Market domains, supported by embedded mental health professionals.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                <div className="p-6 border-b-2 border-r-2 border-border bg-coral/10">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Widening socioeconomic gaps</h4>
                  <p className="text-muted-foreground">Many people lack access to peer networks and cultural opportunities. Cost is often the barrier.</p>
                </div>
                <div className="p-6 border-b-2 border-border bg-mint/20">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Tiered access for all</h4>
                  <p className="text-muted-foreground">A concession membership at €60 per year, a social prescribing referral pathway, and free community events ensure no one is priced out of belonging.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                <div className="p-6 border-b-2 border-r-2 border-border bg-coral/10">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Mental health service pressure</h4>
                  <p className="text-muted-foreground">Demand for mental health services is outpacing clinical capacity. Preventative community approaches are underfunded and undersupplied.</p>
                </div>
                <div className="p-6 border-b-2 border-border bg-mint/20">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Preventative social prescribing</h4>
                  <p className="text-muted-foreground">Aligned with Pathways to Wellbeing 2024–2030, Social Factory is designed as a primary social prescribing destination, reducing pressure on clinical services through community participation.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                <div className="p-6 border-r-2 border-border bg-coral/10">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Unsustainable social models</h4>
                  <p className="text-muted-foreground">Community needs outpace traditional funding and grant-dependent models. Social impact rarely pays for itself.</p>
                </div>
                <div className="p-6 bg-mint/20">
                  <h4 className="text-lg font-bold mb-2 text-foreground">A self-sustaining enterprise</h4>
                  <p className="text-muted-foreground">Revenue from memberships, co-working, wellness services, and market trading is reinvested in programmes, creating a financially independent, mission-locked CLG.</p>
                </div>
              </div>
            </div>

            {/* Mobile Accordion */}
            <Accordion type="single" collapsible className="md:hidden space-y-4">
              {[
                {
                  title: "Lack of inclusive spaces",
                  challenge: "Few affordable, safe places exist for people, especially adolescents, to socialise outside of food-and-drink settings.",
                  response: "30,000+ sq. ft. of shared space in Limerick where people of all ages can connect safely and meaningfully, every day of the week."
                },
                {
                  title: "Youth at risk",
                  challenge: "31% of 15–16 year olds were drunk in the last month. 30% score below WHO wellbeing thresholds. (Planet Youth West Ireland 2024)",
                  response: "Through positive programmes, mentorship, and entrepreneurship opportunities rooted in the Planet Youth model."
                },
                {
                  title: "Declining face-to-face interaction",
                  challenge: "65% of young people spend 3+ hours daily on social media. In-person socialising is declining, fuelling the loneliness epidemic.",
                  response: "Structured activities across four domains, supported by embedded mental health professionals."
                },
                {
                  title: "Widening socioeconomic gaps",
                  challenge: "Many lack access to peer networks and cultural opportunities. Cost is often the barrier.",
                  response: "A concession membership at €60/year and a social prescribing pathway ensure no one is priced out of belonging."
                },
                {
                  title: "Mental health service pressure",
                  challenge: "Demand for mental health services is outpacing clinical capacity. Preventative approaches are underfunded.",
                  response: "Aligned with Pathways to Wellbeing 2024–2030, Social Factory is a primary social prescribing destination."
                },
                {
                  title: "Unsustainable social models",
                  challenge: "Community needs outpace traditional grant-dependent funding models.",
                  response: "Revenue from memberships, co-working, wellness, and market trading funds the mission, a financially independent CLG."
                }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-2 border-border rounded-2xl overflow-hidden bg-card">
                  <AccordionTrigger className="px-6 py-4 bg-coral/20 hover:bg-coral/30">
                    <span className="text-lg font-bold text-foreground">{item.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-4 pt-2">
                      <div>
                        <h5 className="font-semibold text-coral mb-2">Challenge:</h5>
                        <p className="text-muted-foreground">{item.challenge}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-secondary mb-2">Our Response:</h5>
                        <p className="text-muted-foreground">{item.response}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Join Us in Building Something New
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're a funder, community member, or just curious, we'd love to connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-semibold">
                <Link to="/join">Become a Member</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-semibold">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>;
};

export default About;
