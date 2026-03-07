import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Plus, X, ThumbsUp, ThumbsDown } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface Proposal {
  id: string;
  title: string;
  type: string;
  status: string;
  author_name: string;
  yes_count: number;
  no_count: number;
  created_at: string;
}

const TYPE_LABELS: Record<string, string> = {
  proposal: "Proposal",
  initiative: "Initiative",
  co_design: "Co-Design",
  vote: "Vote",
};

const typeColors: Record<string, string> = {
  proposal: "bg-primary/15 text-primary",
  initiative: "bg-secondary/15 text-secondary-foreground",
  co_design: "bg-accent/20 text-accent-foreground",
  vote: "bg-destructive/15 text-destructive",
};

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  open: "bg-secondary/15 text-secondary-foreground",
  voting: "bg-primary/15 text-primary",
  closed: "bg-muted text-muted-foreground",
  adopted: "bg-secondary/20 text-secondary-foreground",
  rejected: "bg-destructive/15 text-destructive",
};

function relativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const TYPES = ["proposal", "initiative", "co_design", "vote"] as const;

const DemocracyContent = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [type, setType] = useState<string>("proposal");
  const [submitting, setSubmitting] = useState(false);

  const fetchProposals = useCallback(async () => {
    const { data } = await supabase
      .from("proposals")
      .select("id, title, type, status, author_id, created_at")
      .order("created_at", { ascending: false });

    if (!data) {
      setProposals([]);
      setLoading(false);
      return;
    }

    // Fetch author names
    const authorIds = [...new Set(data.map((p) => p.author_id))];
    const { data: profiles } = await supabase.rpc("get_display_names", {
      user_ids: authorIds,
    });
    const nameMap = new Map(
      (profiles || []).map((p: any) => [p.user_id, p.display_name || "Member"])
    );

    // Fetch vote counts
    const proposalIds = data.map((p) => p.id);
    const { data: votes } = await supabase
      .from("proposal_votes")
      .select("proposal_id, vote")
      .in("proposal_id", proposalIds);

    const voteCounts = new Map<string, { yes: number; no: number }>();
    (votes || []).forEach((v: any) => {
      const entry = voteCounts.get(v.proposal_id) || { yes: 0, no: 0 };
      if (v.vote === "yes") entry.yes++;
      else if (v.vote === "no") entry.no++;
      voteCounts.set(v.proposal_id, entry);
    });

    setProposals(
      data.map((p) => ({
        id: p.id,
        title: p.title,
        type: p.type,
        status: p.status,
        author_name: nameMap.get(p.author_id) || "Member",
        yes_count: voteCounts.get(p.id)?.yes || 0,
        no_count: voteCounts.get(p.id)?.no || 0,
        created_at: p.created_at,
      }))
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) return;
    setSubmitting(true);
    await supabase.from("proposals").insert({
      author_id: user.id,
      title: title.trim(),
      body: body.trim(),
      type,
    });
    setTitle("");
    setBody("");
    setType("proposal");
    setShowForm(false);
    setSubmitting(false);
    fetchProposals();
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10">
          <button
            onClick={() => navigate("/town-hall")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Town Hall
          </button>

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">Democracy</h1>
            <Button
              size="sm"
              onClick={() => setShowForm((v) => !v)}
              className="gap-1.5"
            >
              {showForm ? (
                <X className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              {showForm ? "Cancel" : "New Proposal"}
            </Button>
          </div>

          {showForm && (
            <div className="mb-8 rounded-2xl border-2 border-border bg-card p-6 space-y-4">
              <Input
                placeholder="Proposal title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Describe your proposal…"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
              />
              <div className="flex items-center gap-3">
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="w-44">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {TYPE_LABELS[t]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleSubmit}
                  disabled={submitting || !title.trim() || !body.trim()}
                >
                  {submitting ? "Submitting…" : "Submit"}
                </Button>
              </div>
            </div>
          )}

          {loading ? (
            <p className="text-center text-muted-foreground">Loading…</p>
          ) : proposals.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No proposals yet. Be the first to start the conversation!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {proposals.map((p) => (
                <Link
                  key={p.id}
                  to={`/democracy/proposals/${p.id}`}
                  className="block rounded-2xl border-2 border-border bg-card p-6 transition-shadow hover:shadow-hover"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h2 className="text-lg font-semibold text-foreground">
                      {p.title}
                    </h2>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge className={typeColors[p.type] || ""}>
                        {TYPE_LABELS[p.type] || p.type}
                      </Badge>
                      <Badge className={statusColors[p.status] || ""}>
                        {p.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {p.author_name}
                    </span>
                    <span>·</span>
                    <span>{relativeTime(p.created_at)}</span>
                    <span className="ml-auto flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-3.5 w-3.5 text-secondary" />
                        {p.yes_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsDown className="h-3.5 w-3.5 text-destructive" />
                        {p.no_count}
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Democracy = () => (
  <AuthGuard>{(user) => <DemocracyContent user={user} />}</AuthGuard>
);

export default Democracy;
