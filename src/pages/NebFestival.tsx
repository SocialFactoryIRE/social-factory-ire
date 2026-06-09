import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type Card = {
  number: number;
  topic: string;
  question: string;
  answer: string;
};

const CARDS: Card[] = [
  // Series I
  { number: 1, topic: "On Public Space", question: "What kind of public space did you wish existed when you were younger?", answer: "The places we make for the young become the places a city is judged by. Belonging should be built in — not something you have to go looking for." },
  { number: 2, topic: "On Conversation", question: "Where was the best conversation you've ever accidentally had?", answer: "A shelter, two strangers, and the time it takes for a bus to arrive. The best conversations are rarely planned. They are designed for." },
  { number: 3, topic: "On Comfort", question: "What's a public place where you instantly feel comfortable?", answer: "Warmth, light, and a chair that asks nothing of you. Comfort in public is not an accident. It is architecture." },
  { number: 4, topic: "On Gathering", question: "What kind of place naturally brings people together?", answer: "An arcade of small encounters — the oldest social technology we ever built. Some places make connection inevitable. We build those." },
  { number: 5, topic: "On the Next Generation", question: "What do young people need right now?", answer: "Give them steps to sit on, somewhere to make things, and they will fill it. Give a generation somewhere to belong, and they will." },
  { number: 6, topic: "On Everyday Life", question: "If you could redesign modern life slightly, what would you change first?", answer: "One lane handed back to people is enough to change the character of a whole street. Change the space, and you change the everyday." },
  { number: 7, topic: "On Community", question: "What if community became part of everyday life again?", answer: "Homes arranged around something shared. Connection becomes a daily accident. Community shouldn't be an event. It should be everyday." },
  { number: 8, topic: "On Design", question: "What happens when architecture is designed for people instead of profit?", answer: "An old industrial building, kept and given back to people instead of demolished. When we design for people, not profit, the city repairs itself." },
  // Series II
  { number: 9, topic: "On Architecture", question: "What's the most interesting building you've ever been inside?", answer: "Buildings remember everything we forget." },
  { number: 10, topic: "On Cities", question: "Is there somewhere you've visited that completely changed how you see cities?", answer: "A place can teach you a new language." },
  { number: 11, topic: "On the Everyday", question: "What's been the highlight of your week so far?", answer: "Small moments create lasting connections." },
  { number: 12, topic: "On Conversation", question: "Have you ever had a conversation with a stranger that stayed with you?", answer: "Strangers carry the stories we need most." },
  { number: 13, topic: "On Mentors", question: "Who taught you something you still think about?", answer: "The people who change us rarely know it." },
  { number: 14, topic: "On Seeing", question: "What's something you find beautiful that other people might overlook?", answer: "Beauty is not rare. Noticing is." },
  { number: 15, topic: "On Attention", question: "What's something you can't stop thinking about lately?", answer: "Attention is the beginning of everything." },
  { number: 16, topic: "On Neighbourhood", question: "What's something your neighbourhood does better than anywhere else?", answer: "Pride in small things is never small." },
];

const FlipCard = ({ card, onAnswer }: { card: Card; onAnswer: (c: Card) => void }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group [perspective:1200px] cursor-pointer"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => onAnswer(card)}
    >
      <div
        className={`relative w-full aspect-[3/4] transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-[20px] bg-warm-white border-2 border-ink/10 shadow-soft p-6 flex flex-col">
          <div className="text-[10px] tracking-[0.2em] uppercase text-ink-soft font-medium">
            Social Factory · Conversation Card
          </div>
          <div className="mt-2 text-[10px] tracking-[0.2em] uppercase text-green-deep font-semibold">
            {card.topic} · {String(card.number).padStart(2, "0")}/16
          </div>
          <div className="flex-1 flex items-center">
            <h3
              className="text-2xl md:text-[1.7rem] leading-snug text-ink"
              style={{ fontFamily: "'Zodiak', serif" }}
            >
              {card.question}
            </h3>
          </div>
          <div className="text-xs text-ink-soft italic">
            Hover to read our note. Tap to share yours.
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[20px] bg-ink text-cream p-6 flex flex-col shadow-soft">
          <div className="text-[10px] tracking-[0.2em] uppercase text-cream/60 font-medium">
            Field Note · Nº {String(card.number).padStart(2, "0")}/16
          </div>
          <div className="flex-1 flex items-center">
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ fontFamily: "'Zodiak', serif" }}
            >
              {card.answer}
            </p>
          </div>
          <div className="text-xs text-cream/60 italic">
            Tap to share your own answer →
          </div>
        </div>
      </div>
    </div>
  );
};

const NebFestival = () => {
  const [active, setActive] = useState<Card | null>(null);
  const [answer, setAnswer] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const closeDialog = () => {
    setActive(null);
    setAnswer("");
    setName("");
    setEmail("");
  };

  const submit = async () => {
    if (!active) return;
    const trimmed = answer.trim();
    if (trimmed.length < 1 || trimmed.length > 2000) {
      toast({ title: "Please share between 1 and 2000 characters.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("neb_festival_answers").insert({
      card_number: active.number,
      card_topic: active.topic,
      question: active.question,
      answer: trimmed,
      name: name.trim() || null,
      email: email.trim() || null,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Couldn't submit your answer", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Thank you for sharing.", description: "Your answer helps us design for connection." });
    closeDialog();
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-12 bg-warm-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">
              <span className="block text-4xl md:text-6xl text-[#f1a600]">New European Bauhaus Festival</span>
              <span className="block text-3xl md:text-5xl mt-2 text-[#eb4f07]">Conversation Cards</span>
            </h1>
            <p className="text-lg md:text-xl text-[#005493] font-light max-w-[60ch] mx-auto">
              Hover a card to read our field note. Tap it to share your own answer. Every response shapes the architecture of connection we are building together.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 bg-cream relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto pt-12">
            {CARDS.map((card) => (
              <FlipCard key={card.number} card={card} onAnswer={setActive} />
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && closeDialog()}>
        <DialogContent className="max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <DialogDescription className="text-xs tracking-[0.2em] uppercase text-green-deep font-semibold">
                  {active.topic}
                </DialogDescription>
                <DialogTitle className="text-2xl" style={{ fontFamily: "'Zodiak', serif" }}>
                  {active.question}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Your answer..."
                  rows={5}
                  maxLength={2000}
                />
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  maxLength={100}
                />
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (optional, if you'd like a reply)"
                  type="email"
                  maxLength={255}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={closeDialog} disabled={submitting}>
                  Cancel
                </Button>
                <Button variant="green" onClick={submit} disabled={submitting}>
                  {submitting ? "Sending..." : "Share my answer"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default NebFestival;
