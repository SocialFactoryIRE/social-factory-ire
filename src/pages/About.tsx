import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Users, Globe, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
const About = () => {
  return <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              <span className="block">Our Story:</span>
              <span className="block">Building Connection</span>
              <span className="block">by Design</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Creating Ireland's first integrated social hub where action sports, creative arts, health, and entrepreneurship live side-by-side
            </p>
          </div>

          {/* Mission */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-gradient-hero p-12 rounded-3xl shadow-hover mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Our Story</h2>
              <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                Social Factory was founded with one clear purpose — to tackle loneliness through design. 
                We're creating Ireland's first integrated social hub where action sports, creative arts, 
                health, and entrepreneurship live side-by-side.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                Guided by the principles of the New European Bauhaus, we blend sustainability, inclusion, 
                and beauty to design environments where everyone can thrive.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                Our approach isn't just about spaces — it's about people. We're building a movement that 
                reconnects communities, redefines belonging, and creates new pathways for wellbeing and opportunity.
              </p>
              <div className="mt-8 p-6 bg-background/50 rounded-2xl border-2 border-background">
                <p className="text-foreground/90 italic">
                  "Founded by Jason O'Donovan to spark a new kind of social connection in Ireland"
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-card rounded-2xl shadow-soft border-2 border-primary">
                <Heart className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-3">Why It Matters</h3>
                <p className="text-muted-foreground">
                  Loneliness affects physical and mental health as much as smoking 15 cigarettes a day. 
                  Young people are particularly vulnerable, facing disconnection despite being digitally connected.
                </p>
              </div>
              <div className="p-8 bg-card rounded-2xl shadow-soft border-2 border-secondary">
                <Users className="h-12 w-12 mb-4 text-secondary" />
                <h3 className="text-2xl font-bold mb-3">Our Approach</h3>
                <p className="text-muted-foreground">
                  We create spaces where connection happens naturally—through skateboarding, art workshops, 
                  wellness programs, and entrepreneurial collaboration. No forced networking, just authentic community.
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
                  Building a circular economy model, promoting local production, 
                  and creating long-term social and environmental value.
                </p>
              </div>
              <div className="p-6 bg-sky/20 rounded-2xl border-2 border-sky">
                <h3 className="text-xl font-bold mb-3 text-foreground">Inclusion</h3>
                <p className="text-muted-foreground text-sm">
                  Welcoming all ages, abilities, and backgrounds. Ensuring accessibility 
                  and creating pathways for everyone to participate and thrive.
                </p>
              </div>
              <div className="p-6 bg-peach/20 rounded-2xl border-2 border-coral">
                <h3 className="text-xl font-bold mb-3 text-foreground">Beauty</h3>
                <p className="text-muted-foreground text-sm">
                  Designing spaces that inspire joy, creativity, and connection. 
                  Where aesthetics meet function and form follows feeling.
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
                  Every decision we make centers the needs and voices of our community members.
                </p>
              </div>
              <div className="p-6 bg-card rounded-2xl shadow-soft">
                <h3 className="text-xl font-bold mb-2 text-foreground">Evidence-Based Action</h3>
                <p className="text-muted-foreground">
                  We ground our work in research, data, and proven interventions from programs like Planet Youth.
                </p>
              </div>
              <div className="p-6 bg-card rounded-2xl shadow-soft">
                <h3 className="text-xl font-bold mb-2 text-foreground">Playful Innovation</h3>
                <p className="text-muted-foreground">
                  We believe serious impact can come from joyful, creative, and playful approaches.
                </p>
              </div>
              <div className="p-6 bg-card rounded-2xl shadow-soft">
                <h3 className="text-xl font-bold mb-2 text-foreground">Radical Inclusion</h3>
                <p className="text-muted-foreground">
                  Social Factory is for everyone—regardless of background, ability, age, or circumstance.
                </p>
              </div>
            </div>
          </div>

          {/* Challenges vs Our Response */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-foreground">Challenges vs Our Response</h2>
            </div>

            <div className="overflow-hidden rounded-3xl border-2 border-border shadow-hover">
              {/* Header Row */}
              <div className="grid md:grid-cols-2">
                <div className="bg-primary p-6 border-b-2 border-r-2 border-border">
                  <h3 className="text-2xl font-bold text-primary-foreground text-center">Challenges</h3>
                </div>
                <div className="bg-secondary p-6 border-b-2 border-border">
                  <h3 className="text-2xl font-bold text-secondary-foreground text-center">Our Response</h3>
                </div>
              </div>

              {/* Content Rows */}
              <div className="grid md:grid-cols-2">
                <div className="p-6 border-b-2 border-r-2 border-border bg-card">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Lack of inclusive spaces</h4>
                  <p className="text-muted-foreground">Few affordable, safe places exist for people—especially adolescents—to socialize outside of food-and-drink settings.</p>
                </div>
                <div className="p-6 border-b-2 border-border bg-card">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Create inspiring, accessible hubs</h4>
                  <p className="text-muted-foreground">where people of all ages can connect safely and meaningfully.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                <div className="p-6 border-b-2 border-r-2 border-border bg-card">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Youth at risk</h4>
                  <p className="text-muted-foreground">Rising substance misuse, mental health challenges, and limited investment in the 1–20 age group.</p>
                </div>
                <div className="p-6 border-b-2 border-border bg-card">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Empower young people</h4>
                  <p className="text-muted-foreground">through positive programmes, mentorship, and entrepreneurship opportunities.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                <div className="p-6 border-b-2 border-r-2 border-border bg-card">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Declining face-to-face interaction</h4>
                  <p className="text-muted-foreground">Online media dominates while in-person socializing declines, fuelling the loneliness epidemic.</p>
                </div>
                <div className="p-6 border-b-2 border-border bg-card">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Foster everyday connection</h4>
                  <p className="text-muted-foreground">with structured activities supported by mental health professionals.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                <div className="p-6 border-b-2 border-r-2 border-border bg-card">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Widening socioeconomic gaps</h4>
                  <p className="text-muted-foreground">Many lack access to peer networks and cultural opportunities.</p>
                </div>
                <div className="p-6 border-b-2 border-border bg-card">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Ensure affordability and inclusivity,</h4>
                  <p className="text-muted-foreground">engaging diverse communities in shared spaces.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                <div className="p-6 border-b-2 border-r-2 border-border bg-card">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Future uncertainty</h4>
                  <p className="text-muted-foreground">AI and other forces are reshaping the workforce, creating precarity for young people.</p>
                </div>
                <div className="p-6 border-b-2 border-border bg-card">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Build resilience</h4>
                  <p className="text-muted-foreground">by promoting youth entrepreneurship, adaptable skills, and social responsibility.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                <div className="p-6 border-r-2 border-border bg-card">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Unsustainable social models</h4>
                  <p className="text-muted-foreground">Community needs outpace traditional funding and investment models.</p>
                </div>
                <div className="p-6 bg-card">
                  <h4 className="text-lg font-bold mb-2 text-foreground">Generate sustainable revenue</h4>
                  <p className="text-muted-foreground">through memberships, co-working, wellness, and reinvestment in programmes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Join Us in Building Something New
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're a funder, community member, or just curious—we'd love to connect.
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