import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, RefreshCw, Users, Check } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const LETTER_DESC: Record<string, { label: string; meaning: string }> = {
  O: { label: "Outward", meaning: "You draw energy from social interaction and collaboration" },
  I: { label: "Inner", meaning: "You recharge through reflection and quieter settings" },
  A: { label: "Abstract", meaning: "You're drawn to big-picture thinking and possibilities" },
  C: { label: "Concrete", meaning: "You prefer practical, evidence-based approaches" },
  F: { label: "Feeling", meaning: "You prioritise empathy and harmony in decisions" },
  R: { label: "Reasoning", meaning: "You lean on logic and objective analysis" },
  S: { label: "Structured", meaning: "You prefer plans, order, and closure" },
  X: { label: "Flexible", meaning: "You stay open, adaptive, and spontaneous" },
};

interface Community {
  id: string;
  name: string;
  description: string | null;
  member_count: number;
  joined: boolean;
}

const PersonalityResultContent = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const [typeCode, setTypeCode] = useState<string | null>(null);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    // Get personality result
    const { data: result } = await supabase
      .from("personality_results")
      .select("type_code")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!result?.type_code) {
      navigate("/social-lab/test", { replace: true });
      return;
    }

    setTypeCode(result.type_code);

    // Get all communities
    const { data: allCommunities } = await supabase
      .from("communities")
      .select("*");

    // Filter where suited_types contains the user's type_code
    const matched = (allCommunities || []).filter((c: any) =>
      (c.suited_types || []).includes(result.type_code)
    );

    // Get user's memberships
    const { data: memberships } = await supabase
      .from("community_members")
      .select("community_id")
      .eq("user_id", user.id);

    const joinedIds = new Set((memberships || []).map((m) => m.community_id));

    // Get member counts for matched communities
    const communityList: Community[] = [];
    for (const c of matched) {
      // We can't aggregate with current RLS (users can only see own rows),
      // so we'll show "Join" without count, or fetch count via a workaround
      communityList.push({
        id: c.id,
        name: c.name,
        description: c.description,
        member_count: 0, // Count not available due to RLS
        joined: joinedIds.has(c.id),
      });
    }

    setCommunities(communityList);
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

  const letters = typeCode ? typeCode.split("") : [];

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

          {/* Type Code */}
          <div className="text-center mb-10">
            <p className="text-sm text-muted-foreground mb-3">Your personality type</p>
            <div className="text-5xl md:text-6xl font-mono font-bold text-foreground tracking-widest mb-6">
              {typeCode}
            </div>
          </div>

          {/* Dimension breakdown */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            {letters.map((letter, i) => {
              const info = LETTER_DESC[letter];
              if (!info) return null;
              return (
                <div
                  key={i}
                  className="rounded-xl border-2 border-border bg-card p-5"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl font-mono font-bold text-primary">
                      {letter}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {info.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{info.meaning}</p>
                </div>
              );
            })}
          </div>

          {/* Matching communities */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Communities for you
            </h2>
            {communities.length === 0 ? (
              <p className="text-muted-foreground">
                No matching communities found for your type yet.
              </p>
            ) : (
              <div className="space-y-4">
                {communities.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-2xl border-2 border-border bg-card p-6 flex items-start justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {c.name}
                      </h3>
                      {c.description && (
                        <p className="text-sm text-muted-foreground">
                          {c.description}
                        </p>
                      )}
                    </div>
                    {c.joined ? (
                      <Badge
                        variant="secondary"
                        className="shrink-0 gap-1.5 py-1.5 px-3"
                      >
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

          {/* Retake */}
          <div className="text-center">
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
  <AuthGuard>
    {(user) => <PersonalityResultContent user={user} />}
  </AuthGuard>
);

export default PersonalityResult;
