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

// Two questions per OCEAN dimension, scored 1-5
const QUESTIONS: { dim: "O" | "C" | "E" | "A" | "N"; text: string }[] = [
  { dim: "O", text: "I enjoy exploring new ideas and creative possibilities" },
  { dim: "O", text: "I am curious about many different things" },
  { dim: "C", text: "I am organised and like to keep things in order" },
  { dim: "C", text: "I follow through on my commitments and plans" },
  { dim: "E", text: "I feel energised after spending time with groups of people" },
  { dim: "E", text: "I enjoy being the centre of attention at social gatherings" },
  { dim: "A", text: "I prioritise harmony and people's feelings when making decisions" },
  { dim: "A", text: "I find it easy to cooperate and compromise with others" },
  { dim: "N", text: "I tend to worry about things that might go wrong" },
  { dim: "N", text: "I often feel stressed or anxious in uncertain situations" },
];

const SCALE_LABELS = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

function computeOcean(answers: number[]) {
  const byDim: Record<string, number[]> = { O: [], C: [], E: [], A: [], N: [] };
  QUESTIONS.forEach((q, i) => byDim[q.dim].push(answers[i]));
  const avg = (arr: number[]) => {
    const sum = arr.reduce((a, b) => a + b, 0);
    return Math.round((sum / arr.length) * 100) / 100;
  };
  return {
    ocean_o: avg(byDim.O),
    ocean_c: avg(byDim.C),
    ocean_e: avg(byDim.E),
    ocean_a: avg(byDim.A),
    ocean_n: avg(byDim.N),
  };
}

const PersonalityTestContent = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const total = QUESTIONS.length;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(total).fill(0));
  const [submitting, setSubmitting] = useState(false);

  const answered = answers[current] > 0;
  const progress = ((current + (answered ? 1 : 0)) / total) * 100;

  const selectAnswer = (value: number) => {
    const next = [...answers];
    next[current] = value;
    setAnswers(next);
  };

  const handleNext = async () => {
    if (current < total - 1) {
      setCurrent(current + 1);
      return;
    }
    setSubmitting(true);
    const scores = computeOcean(answers);

    const { data: existing } = await supabase
      .from("personality_results")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("personality_results")
        .update(scores)
        .eq("user_id", user.id);
    } else {
      await supabase.from("personality_results").insert({
        user_id: user.id,
        ...scores,
      });
    }

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
              <span>Question {current + 1} of {total}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="bg-card rounded-2xl border-2 border-border p-8 space-y-8">
            <p className="text-lg font-medium text-foreground leading-relaxed">
              {QUESTIONS[current].text}
            </p>

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
                {current === total - 1
                  ? submitting
                    ? "Saving…"
                    : "See Results"
                  : "Next"}
                {current < total - 1 && <ArrowRight className="h-4 w-4" />}
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
