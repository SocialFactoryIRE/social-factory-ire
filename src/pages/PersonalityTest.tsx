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

const QUESTIONS = [
  // DIM A – Energy (indices 0-2)
  "I feel energised after spending time with groups of people",
  "I prefer working through ideas by talking them out with others",
  "I enjoy being the centre of attention at social gatherings",
  // DIM B – Processing (indices 3-5)
  "I prefer concrete facts over abstract theories",
  "I trust hands-on experience more than imaginative possibilities",
  "I focus on the present reality rather than future possibilities",
  // DIM C – Deciding (indices 6-8)
  "I prioritise harmony and people's feelings when making decisions",
  "I believe empathy should guide choices more than logic",
  "I find it important that everyone feels heard before deciding",
  // DIM D – Rhythm (indices 9-11)
  "I prefer having a clear plan before starting a project",
  "I feel uncomfortable leaving tasks unfinished or open-ended",
  "I like to have decisions made and settled rather than keeping options open",
];

const SCALE_LABELS = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

function computeType(answers: number[]) {
  const avg = (start: number) =>
    (answers[start] + answers[start + 1] + answers[start + 2]) / 3;

  const dimA = avg(0);
  const dimB = avg(3);
  const dimC = avg(6);
  const dimD = avg(9);

  const a = dimA >= 3 ? "O" : "I";
  const b = dimB >= 3 ? "C" : "A"; // high = Concrete, low = Abstract (reversed from original — wait, spec says high=A low=C)
  // Re-reading spec: DIM B high=A low=C. But questions ask about preferring concrete facts.
  // If user scores high on "prefer concrete" → high score. Spec says high=A? That seems inverted.
  // Following spec literally: high=A, low=C
  const bLetter = dimB >= 3 ? "A" : "C";
  const c = dimC >= 3 ? "F" : "R";
  const d = dimD >= 3 ? "S" : "X";

  return {
    dimA: Math.round(dimA * 100) / 100,
    dimB: Math.round(dimB * 100) / 100,
    dimC: Math.round(dimC * 100) / 100,
    dimD: Math.round(dimD * 100) / 100,
    typeCode: `${a}${bLetter}${c}${d}`,
  };
}

const PersonalityTestContent = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(12).fill(0));
  const [submitting, setSubmitting] = useState(false);

  const answered = answers[current] > 0;
  const progress = ((current + (answered ? 1 : 0)) / 12) * 100;

  const selectAnswer = (value: number) => {
    const next = [...answers];
    next[current] = value;
    setAnswers(next);
  };

  const handleNext = async () => {
    if (current < 11) {
      setCurrent(current + 1);
      return;
    }
    // Submit
    setSubmitting(true);
    const result = computeType(answers);

    // Upsert
    const { data: existing } = await supabase
      .from("personality_results")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("personality_results")
        .update({
          dim_a: Math.round(result.dimA),
          dim_b: Math.round(result.dimB),
          dim_c: Math.round(result.dimC),
          dim_d: Math.round(result.dimD),
          type_code: result.typeCode,
        })
        .eq("user_id", user.id);
    } else {
      await supabase.from("personality_results").insert({
        user_id: user.id,
        dim_a: Math.round(result.dimA),
        dim_b: Math.round(result.dimB),
        dim_c: Math.round(result.dimC),
        dim_d: Math.round(result.dimD),
        type_code: result.typeCode,
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
              <span>Question {current + 1} of 12</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="bg-card rounded-2xl border-2 border-border p-8 space-y-8">
            <p className="text-lg font-medium text-foreground leading-relaxed">
              {QUESTIONS[current]}
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
                {current === 11
                  ? submitting
                    ? "Saving…"
                    : "See Results"
                  : "Next"}
                {current < 11 && <ArrowRight className="h-4 w-4" />}
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
