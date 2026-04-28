import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const ITEMS = [
  "Thinking up new ideas and being creative is important to them.",
  "Making their own decisions about their life is important to them.",
  "Having all sorts of new experiences is important to them.",
  "Having a good time is important to them.",
  "Showing their abilities is important to them.",
  "Being the one who tells others what to do is important to them.",
  "Being wealthy is important to them.",
  "Protecting their public image is important to them.",
  "Avoiding anything dangerous is important to them.",
  "Their country protecting itself against all threats is important to them.",
  "Maintaining traditional values or beliefs is important to them.",
  "Never violating rules or regulations is important to them.",
  "Avoiding upsetting other people is important to them.",
  "Being humble is important to them.",
  "Being a dependable and reliable person is important to them.",
  "Being helpful to the people close to them is important to them.",
  "Every person being treated justly is important to them.",
  "Caring for nature is important to them.",
  "Listening to and understanding people who are different is important to them.",
  "Developing their own opinions is important to them.",
  "Doing everything independently is important to them.",
  "Taking risks that make life exciting is important to them.",
  "Enjoying life's pleasures is important to them.",
  "Being very successful is important to them.",
  "Having the power to make people do what they want is important to them.",
  "Having expensive things that show their wealth is important to them.",
  "That no one should ever shame them is important to them.",
  "Avoiding getting sick is important to them.",
  "The government ensuring their safety against all threats is important to them.",
  "Following their family's customs or the customs of a religion is important to them.",
  "Obeying all the laws is important to them.",
  "Always being polite to everyone is important to them.",
  "Not drawing attention to themselves is important to them.",
  "That people who know them well can rely on them is important to them.",
  "Seeing to the needs of people close to them is important to them.",
  "Protecting the weak and vulnerable in society is important to them.",
  "Protecting the natural environment from destruction is important to them.",
  "Accepting people even when they disagree with them is important to them.",
  "Thinking about things from different angles is important to them.",
  "Being free to choose what they do by themselves is important to them.",
  "That life be full of exciting surprises is important to them.",
  "Seeking every chance to have fun is important to them.",
  "That people recognise what they achieve is important to them.",
  "Being the most influential person in any group is important to them.",
  "Having the money to buy whatever they want is important to them.",
  "Never being humiliated is important to them.",
  "Living in secure surroundings is important to them.",
  "Their country having a strong military to protect itself is important to them.",
  "Honouring the traditional practices of their culture is important to them.",
  "Never doing anything that might be seen as wrong is important to them.",
  "Never annoying anyone is important to them.",
  "Not asking for more than what they have is important to them.",
  "That people who know them feel they are trustworthy is important to them.",
  "Working for the welfare of others is important to them.",
  "That everyone be treated equally is important to them.",
  "Preserving nature is important to them.",
  "Trying to understand everyone is important to them.",
];

const VALUE_NAMES: Record<string, { label: string; items: number[] }> = {
  sd_thought:   { label: "Self-Direction: Thought",       items: [1, 20, 39] },
  sd_action:    { label: "Self-Direction: Action",        items: [2, 21, 40] },
  stimulation:  { label: "Stimulation",                  items: [3, 22, 41] },
  hedonism:     { label: "Hedonism",                     items: [4, 23, 42] },
  achievement:  { label: "Achievement",                  items: [5, 24, 43] },
  power_dom:    { label: "Power: Dominance",              items: [6, 25, 44] },
  power_res:    { label: "Power: Resources",              items: [7, 26, 45] },
  face:         { label: "Face",                         items: [8, 27, 46] },
  sec_personal: { label: "Security: Personal",            items: [9, 28, 47] },
  sec_societal: { label: "Security: Societal",            items: [10, 29, 48] },
  tradition:    { label: "Tradition",                    items: [11, 30, 49] },
  con_rules:    { label: "Conformity: Rules",             items: [12, 31, 50] },
  con_interp:   { label: "Conformity: Interpersonal",     items: [13, 32, 51] },
  humility:     { label: "Humility",                     items: [14, 33, 52] },
  ben_dep:      { label: "Benevolence: Dependability",    items: [15, 34, 53] },
  ben_care:     { label: "Benevolence: Caring",           items: [16, 35, 54] },
  uni_concern:  { label: "Universalism: Concern",         items: [17, 36, 55] },
  uni_nature:   { label: "Universalism: Nature",          items: [18, 37, 56] },
  uni_tolerance:{ label: "Universalism: Tolerance",       items: [19, 38, 57] },
};

const SCALE_LABELS = [
  "Not like me at all",
  "Not like me",
  "A little like me",
  "Somewhat like me",
  "Like me",
  "Very much like me",
];

function scoreValues(answers: number[]): { scores: Record<string, number>; topValues: string[] } {
  const scores: Record<string, number> = {};
  for (const [key, def] of Object.entries(VALUE_NAMES)) {
    const vals = def.items.map((n) => answers[n - 1]);
    scores[key] = Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100) / 100;
  }
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topValues = sorted.slice(0, 5).map(([key]) => VALUE_NAMES[key].label);
  return { scores, topValues };
}

const TOTAL = ITEMS.length;

const CultureTestContent = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(TOTAL).fill(0));
  const [submitting, setSubmitting] = useState(false);

  const answered = answers[current] > 0;
  const progress = ((current + (answered ? 1 : 0)) / TOTAL) * 100;

  const selectAnswer = (value: number) => {
    const next = [...answers];
    next[current] = value;
    setAnswers(next);
  };

  const handleNext = async () => {
    if (current < TOTAL - 1) {
      setCurrent(current + 1);
      return;
    }
    setSubmitting(true);
    const { scores, topValues } = scoreValues(answers);

    await supabase.from("culture_results").upsert(
      {
        user_id: user.id,
        scores: scores as any,
        top_values: topValues,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

    navigate("/culture-result", { replace: true });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl relative z-10">
          <button
            onClick={() => navigate("/social-lab")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Social Lab
          </button>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {current + 1} of {TOTAL}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="bg-card rounded-2xl border-2 border-border p-8 space-y-8">
            <div>
              <p className="text-sm text-muted-foreground mb-2">How much is this person like you?</p>
              <p className="text-lg font-medium text-foreground leading-relaxed">
                {ITEMS[current]}
              </p>
            </div>

            <div className="space-y-3">
              {SCALE_LABELS.map((label, i) => {
                const value = i + 1;
                const selected = answers[current] === value;
                return (
                  <button
                    key={value}
                    onClick={() => selectAnswer(value)}
                    className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all text-sm font-medium ${
                      selected
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between">
              <Button
                variant="ghost"
                disabled={current === 0}
                onClick={() => setCurrent(current - 1)}
                className="gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button
                variant="green"
                disabled={!answered || submitting}
                onClick={handleNext}
                className="gap-1.5"
              >
                {current === TOTAL - 1
                  ? submitting
                    ? "Saving…"
                    : "See Results"
                  : "Next"}
                {current < TOTAL - 1 && <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const CultureTest = () => (
  <AuthGuard>{(user) => <CultureTestContent user={user} />}</AuthGuard>
);

export default CultureTest;
