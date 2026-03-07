import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, RefreshCw, Users, Check, UserCircle } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const OCEAN_INFO = [
  { key: "ocean_o", label: "Openness", desc: "Your curiosity, creativity, and willingness to explore new ideas and experiences." },
  { key: "ocean_c", label: "Conscientiousness", desc: "Your organisation, dependability, and tendency to plan ahead." },
  { key: "ocean_e", label: "Extraversion", desc: "Your energy from social interaction, assertiveness, and enthusiasm." },
  { key: "ocean_a", label: "Agreeableness", desc: "Your cooperation, empathy, and concern for others' wellbeing." },
  { key: "ocean_n", label: "Neuroticism", desc: "Your tendency to experience stress, worry, and emotional sensitivity." },
];

interface OceanScores {
  ocean_o: number | null;
  ocean_c: number | null;
  ocean_e: number | null;
  ocean_a: number | null;
  ocean_n: number | null;
}

interface Community {
  id: string;
  name: string;
  description: string | null;
  joined: boolean;
}

function getOceanTags(scores: OceanScores): string[] {
  const tags: string[] = [];
  const entries: [string, string][] = [
    ["ocean_o", "o"], ["ocean_c", "c"], ["ocean_e", "e"], ["ocean_a", "a"], ["ocean_n", "n"],
  ];
  for (const [key, letter] of entries) {
    const val = Number((scores as any)[key]) || 0;
    if (val >= 3.5) tags.push(`high_${letter}`);
    if (val < 2.5) tags.push(`low_${letter}`);
  }
  return tags;
}

const PersonalityResultContent = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<OceanScores | null>(null);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const { data: result } = await supabase
      .from("personality_results")
      .select("ocean_o, ocean_c, ocean_e, ocean_a, ocean_n")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!result) {
      navigate("/social-lab/test", { replace: true });
      return;
    }

    setScores(result as OceanScores);
    const userTags = getOceanTags(result as OceanScores);

    const { data: allCommunities } = await supabase.from("communities").select("*");
    const matched = (allCommunities || []).filter((c: any) =>
      (c.suited_types || []).some((t: string) => userTags.includes(t))
    );

    const { data: memberships } = await supabase
      .from("community_members")
      .select("community_id")
      .eq("user_id", user.id);
    const joinedIds = new Set((memberships || []).map((m) => m.community_id));

    setCommunities(
      matched.map((c: any) => ({
        id: c.id,
        name: c.name,
        description: c.description,
        joined: joinedIds.has(c.id),
      }))
    );
    setLoading(false);
  }, [user.id, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleJoin = async (communityId: string) => {
    setJoiningId(communityId);
    await supabase.from("community_members").insert({
      community_id: communityId,
      user_id: user.id,
      role: "member",
    });
    setCommunities((prev) =>
      prev.map((c) => (c.id === communityId ? { ...c, joined: true } : c))
    );
    setJoiningId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

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
            <p className="text-sm text-muted-foreground mb-3">Your Big Five Profile</p>
            <h1 className="text-3xl font-bold text-foreground">Personality Results</h1>
          </div>

          {/* OCEAN bars */}
          <div className="space-y-6 mb-10">
            {OCEAN_INFO.map((dim) => {
              const val = scores ? Number((scores as any)[dim.key]) || 0 : 0;
              const pct = (val / 5) * 100;
              return (
                <div key={dim.key} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-sm font-semibold text-foreground">{dim.label}</span>
                    <span className="text-sm font-mono text-muted-foreground">{val.toFixed(2)}</span>
                  </div>
                  <Progress value={pct} className="h-3 mb-2" />
                  <p className="text-xs text-muted-foreground">{dim.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Matching communities */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Communities for you</h2>
            {communities.length === 0 ? (
              <p className="text-muted-foreground">No matching communities found yet.</p>
            ) : (
              <div className="space-y-4">
                {communities.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-2xl border-2 border-border bg-card p-6 flex items-start justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{c.name}</h3>
                      {c.description && (
                        <p className="text-sm text-muted-foreground">{c.description}</p>
                      )}
                    </div>
                    {c.joined ? (
                      <Badge variant="secondary" className="shrink-0 gap-1.5 py-1.5 px-3">
                        <Check className="h-3.5 w-3.5" /> Joined
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        disabled={joiningId === c.id}
                        onClick={() => handleJoin(c.id)}
                        className="shrink-0 gap-1.5"
                      >
                        <Users className="h-4 w-4" />
                        {joiningId === c.id ? "Joining…" : "Join"}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate("/profile")} className="gap-2">
              <UserCircle className="h-4 w-4" /> View My Profile
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/social-lab/test")}
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

const PersonalityResult = () => (
  <AuthGuard>{(user) => <PersonalityResultContent user={user} />}</AuthGuard>
);

export default PersonalityResult;
