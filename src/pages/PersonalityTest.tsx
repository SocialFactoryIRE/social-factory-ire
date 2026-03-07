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

interface BfiItem {
  text: string;
  reverse: boolean;
}

const ITEMS: BfiItem[] = [
  { text: "Is talkative", reverse: false },
  { text: "Tends to find fault with others", reverse: true },
  { text: "Does a thorough job", reverse: false },
  { text: "Is depressed, blue", reverse: true },
  { text: "Is original, comes up with new ideas", reverse: false },
  { text: "Is reserved", reverse: true },
  { text: "Is helpful and unselfish with others", reverse: false },
  { text: "Can be somewhat careless", reverse: true },
  { text: "Is relaxed, handles stress well", reverse: true },
  { text: "Is curious about many different things", reverse: false },
  { text: "Is full of energy", reverse: false },
  { text: "Starts quarrels with others", reverse: true },
  { text: "Is a reliable worker", reverse: false },
  { text: "Can be tense", reverse: true },
  { text: "Is ingenious, a deep thinker", reverse: false },
  { text: "Generates a lot of enthusiasm", reverse: false },
  { text: "Has a forgiving nature", reverse: false },
  { text: "Tends to be disorganized", reverse: true },
  { text: "Worries a lot", reverse: true },
  { text: "Has an active imagination", reverse: false },
  { text: "Tends to be quiet", reverse: true },
  { text: "Is generally trusting", reverse: false },
  { text: "Tends to be lazy", reverse: true },
  { text: "Is emotionally stable, not easily upset", reverse: true },
  { text: "Is inventive", reverse: false },
  { text: "Has an assertive personality", reverse: false },
  { text: "Can be cold and aloof", reverse: true },
  { text: "Perseveres until the task is finished", reverse: false },
  { text: "Can be moody", reverse: true },
  { text: "Values artistic, aesthetic experiences", reverse: false },
  { text: "Is sometimes shy, inhibited", reverse: true },
  { text: "Is considerate and kind to almost everyone", reverse: false },
  { text: "Does things efficiently", reverse: false },
  { text: "Remains calm in tense situations", reverse: true },
  { text: "Prefers work that is routine", reverse: true },
  { text: "Is outgoing, sociable", reverse: false },
  { text: "Is sometimes rude to others", reverse: true },
  { text: "Makes plans and follows through with them", reverse: false },
  { text: "Gets nervous easily", reverse: true },
  { text: "Likes to reflect, play with ideas", reverse: false },
  { text: "Has few artistic interests", reverse: true },
  { text: "Likes to cooperate with others", reverse: false },
  { text: "Is easily distracted", reverse: true },
  { text: "Is sophisticated in art, music, or literature", reverse: false },
];

// 1-indexed item numbers for each dimension
const DIM_ITEMS: Record<string, number[]> = {
  E: [1, 6, 11, 16, 21, 26, 31, 36],
  A: [2, 7, 12, 17, 22, 27, 32, 37, 42],
  C: [3, 8, 13, 18, 23, 28, 33, 38, 43],
  N: [4, 9, 14, 19, 24, 29, 34, 39],
  O: [5, 10, 15, 20, 25, 30, 35, 40, 41, 44],
};

const SCALE_LABELS = [
  "Disagree strongly",
  "Disagree a little",
  "Neutral",
  "Agree a little",
  "Agree strongly",
];

function score(answers: number[]): Record<string, number> {
  const scored = answers.map((raw, i) => (ITEMS[i].reverse ? 6 - raw : raw));
  const result: Record<string, number> = {};
  for (const [dim, items] of Object.entries(DIM_ITEMS)) {
    const vals = items.map((n) => scored[n - 1]);
    result[dim] = Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100) / 100;
  }
  return result;
}

const TOTAL = ITEMS.length;

const PersonalityTestContent = ({ user }: { user: User }) => {
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
    const s = score(answers);

    await supabase.from("personality_results").upsert(
      {
        user_id: user.id,
        ocean_o: s.O,
        ocean_c: s.C,
        ocean_e: s.E,
        ocean_a: s.A,
        ocean_n: s.N,
      },
      { onConflict: "user_id" }
    );

    navigate("/social-lab/result", { replace: true });
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
              <span>
                Question {current + 1} of {TOTAL}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="bg-card rounded-2xl border-2 border-border p-8 space-y-8">
            <div>
              <p className="text-sm text-muted-foreground mb-2">I see myself as someone who...</p>
              <p className="text-lg font-medium text-foreground leading-relaxed">
                {ITEMS[current].text}
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

const PersonalityTest = () => (
  <AuthGuard>{(user) => <PersonalityTestContent user={user} />}</AuthGuard>
);

export default PersonalityTest;
