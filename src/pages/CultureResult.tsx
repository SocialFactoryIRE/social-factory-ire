import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, RefreshCw, UserCircle } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const VALUE_META: Record<string, { label: string; desc: string }> = {
  sd_thought:    { label: "Self-Direction: Thought",    desc: "Freedom to cultivate your own ideas and abilities." },
  sd_action:     { label: "Self-Direction: Action",     desc: "Freedom to determine your own actions and plans." },
  stimulation:   { label: "Stimulation",               desc: "Excitement, novelty, and challenge in life." },
  hedonism:      { label: "Hedonism",                  desc: "Pleasure and sensuous gratification." },
  achievement:   { label: "Achievement",               desc: "Success through demonstrating competence." },
  power_dom:     { label: "Power: Dominance",           desc: "Power through exercising control over others." },
  power_res:     { label: "Power: Resources",           desc: "Power through control of material and social resources." },
  face:          { label: "Face",                      desc: "Maintaining your public image and avoiding humiliation." },
  sec_personal:  { label: "Security: Personal",         desc: "Safety in your immediate environment." },
  sec_societal:  { label: "Security: Societal",         desc: "Safety and stability in the wider society." },
  tradition:     { label: "Tradition",                 desc: "Maintaining and preserving cultural or religious traditions." },
  con_rules:     { label: "Conformity: Rules",          desc: "Compliance with rules, laws, and formal obligations." },
  con_interp:    { label: "Conformity: Interpersonal",  desc: "Avoidance of upsetting or harming other people." },
  humility:      { label: "Humility",                  desc: "Recognising your insignificance in the larger scheme." },
  ben_dep:       { label: "Benevolence: Dependability",  desc: "Being a reliable and trustworthy member of the in-group." },
  ben_care:      { label: "Benevolence: Caring",        desc: "Devotion to the welfare of in-group members." },
  uni_concern:   { label: "Universalism: Concern",      desc: "Commitment to equality, justice, and protection for all." },
  uni_nature:    { label: "Universalism: Nature",       desc: "Preservation of the natural environment." },
  uni_tolerance: { label: "Universalism: Tolerance",    desc: "Acceptance and understanding of those who are different." },
};

const VALUE_KEYS = Object.keys(VALUE_META);

const CultureResultContent = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<Record<string, number> | null>(null);
  const [topValues, setTopValues] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const { data } = await supabase
      .from("culture_results")
      .select("scores, top_values")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!data) {
      navigate("/culture-test", { replace: true });
      return;
    }

    setScores(data.scores as Record<string, number>);
    setTopValues((data.top_values as string[]) || []);
    setLoading(false);
  }, [user.id, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  const sorted = scores
    ? VALUE_KEYS.slice().sort((a, b) => (scores[b] || 0) - (scores[a] || 0))
    : VALUE_KEYS;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 relative overflow-hidden">
        <div className="geometric-shape shape-circle w-64 h-64 bg-sky/20 top-20 right-10 blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl relative z-10">
          <button
            onClick={() => navigate("/social-lab")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Social Lab
          </button>

          <div className="text-center mb-10">
            <p className="text-sm text-muted-foreground mb-3">Your Schwartz Values Profile</p>
            <h1 className="text-3xl font-bold text-foreground">Values Results</h1>
          </div>

          {/* Top values */}
          <div className="mb-8 text-center">
            <h2 className="text-lg font-semibold text-foreground mb-3">Your Top Values</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {topValues.map((v) => (
                <Badge key={v} className="text-sm px-3 py-1.5">
                  {v}
                </Badge>
              ))}
            </div>
          </div>

          {/* All values ranked */}
          <div className="space-y-4 mb-10">
            {sorted.map((key) => {
              const val = scores?.[key] || 0;
              const pct = (val / 6) * 100;
              const meta = VALUE_META[key];
              return (
                <div key={key} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-sm font-semibold text-foreground">{meta.label}</span>
                    <span className="text-sm font-mono text-muted-foreground">{val.toFixed(2)}</span>
                  </div>
                  <Progress value={pct} className="h-3 mb-2" />
                  <p className="text-xs text-muted-foreground">{meta.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate("/profile")} className="gap-2">
              <UserCircle className="h-4 w-4" /> View My Profile
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/culture-test")}
              className="gap-2 text-muted-foreground"
            >
              <RefreshCw className="h-4 w-4" /> Retake Test
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const CultureResult = () => (
  <AuthGuard>{(user) => <CultureResultContent user={user} />}</AuthGuard>
);

export default CultureResult;
