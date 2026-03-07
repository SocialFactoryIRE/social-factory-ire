import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import type { User } from "@supabase/supabase-js";

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

interface ProposalData {
  id: string;
  title: string;
  body: string;
  type: string;
  status: string;
  author_id: string;
  author_name: string;
  created_at: string;
}

interface VoteTally {
  yes: number;
  no: number;
  abstain: number;
}

interface Comment {
  id: string;
  body: string;
  author_name: string;
  author_id: string;
  parent_id: string | null;
  created_at: string;
  replies: Comment[];
}

const ProposalDetailContent = ({ user }: { user: User }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [tally, setTally] = useState<VoteTally>({ yes: 0, no: 0, abstain: 0 });
  const [userVote, setUserVote] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBody, setCommentBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [commenting, setCommenting] = useState(false);

  const fetchAll = useCallback(async () => {
    if (!id) return;

    // Fetch proposal
    const { data: p } = await supabase
      .from("proposals")
      .select("*")
      .eq("id", id)
      .single();

    if (!p) {
      setLoading(false);
      return;
    }

    // Author name
    const { data: profiles } = await supabase.rpc("get_display_names", {
      user_ids: [p.author_id],
    });
    const authorName =
      profiles?.[0]?.display_name || "Member";

    setProposal({
      id: p.id,
      title: p.title,
      body: p.body,
      type: p.type,
      status: p.status,
      author_id: p.author_id,
      author_name: authorName,
      created_at: p.created_at,
    });

    // Votes tally — we can only read our own votes via RLS,
    // so we count from our own row + rely on a workaround.
    // Since RLS restricts to own votes, we'll use an rpc or
    // accept that tally is approximate. For now, let's count
    // the user's own vote for the disabled state,
    // and we need a function to get tallies.
    await fetchTally(id);
    await fetchUserVote(id);
    await fetchComments(id);
    setLoading(false);
  }, [id, user.id]);

  const fetchTally = async (proposalId: string) => {
    const { data: voteCounts } = await supabase.rpc("get_proposal_vote_counts", {
      proposal_ids: [proposalId],
    });
    const row = voteCounts?.[0];
    setTally({
      yes: Number(row?.yes_count) || 0,
      no: Number(row?.no_count) || 0,
      abstain: Number(row?.abstain_count) || 0,
    });
  };

  const fetchUserVote = async (proposalId: string) => {
    const { data } = await supabase
      .from("proposal_votes")
      .select("vote")
      .eq("proposal_id", proposalId)
      .eq("user_id", user.id)
      .maybeSingle();
    setUserVote(data?.vote || null);
  };

  const fetchComments = async (proposalId: string) => {
    const { data } = await supabase
      .from("proposal_comments")
      .select("id, body, author_id, parent_id, created_at")
      .eq("proposal_id", proposalId)
      .order("created_at", { ascending: true });

    if (!data || data.length === 0) {
      setComments([]);
      return;
    }

    const commentAuthorIds = [...new Set(data.map((c) => c.author_id))];
    const { data: cProfiles } = await supabase.rpc("get_display_names", {
      user_ids: commentAuthorIds,
    });
    const cNameMap = new Map(
      (cProfiles || []).map((p: any) => [p.user_id, p.display_name || "Member"])
    );

    // Build threaded structure
    const allComments: Comment[] = data.map((c) => ({
      id: c.id,
      body: c.body,
      author_name: cNameMap.get(c.author_id) || "Member",
      author_id: c.author_id,
      parent_id: c.parent_id,
      created_at: c.created_at,
      replies: [],
    }));

    const map = new Map(allComments.map((c) => [c.id, c]));
    const roots: Comment[] = [];
    allComments.forEach((c) => {
      if (c.parent_id && map.has(c.parent_id)) {
        map.get(c.parent_id)!.replies.push(c);
      } else {
        roots.push(c);
      }
    });
    setComments(roots);
  };

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleVote = async (vote: string) => {
    if (!id || voting) return;
    setVoting(true);
    await supabase.from("proposal_votes").insert({
      proposal_id: id,
      user_id: user.id,
      vote,
    });
    setUserVote(vote);
    await fetchTally(id);
    setVoting(false);
  };

  const handleComment = async () => {
    if (!id || !commentBody.trim()) return;
    setCommenting(true);
    await supabase.from("proposal_comments").insert({
      proposal_id: id,
      author_id: user.id,
      body: commentBody.trim(),
    });
    setCommentBody("");
    await fetchComments(id);
    setCommenting(false);
  };

  const CommentNode = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => (
    <div className={depth > 0 ? "ml-6 border-l-2 border-border pl-4" : ""}>
      <div className="py-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          <span className="font-medium text-foreground">{comment.author_name}</span>
          <span>·</span>
          <span>{relativeTime(comment.created_at)}</span>
        </div>
        <p className="text-sm text-foreground">{comment.body}</p>
      </div>
      {comment.replies.map((r) => (
        <CommentNode key={r.id} comment={r} depth={depth + 1} />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <p className="text-center text-muted-foreground">Loading…</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-muted-foreground">Proposal not found.</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate("/democracy")}>
              Back to Democracy
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10">
          <button
            onClick={() => navigate("/democracy")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Democracy
          </button>

          {/* Proposal header */}
          <div className="rounded-2xl border-2 border-border bg-card p-6 md:p-8 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground flex-1">
                {proposal.title}
              </h1>
              <div className="flex items-center gap-2 shrink-0">
                <Badge className={typeColors[proposal.type] || ""}>
                  {TYPE_LABELS[proposal.type] || proposal.type}
                </Badge>
                <Badge className={statusColors[proposal.status] || ""}>
                  {proposal.status}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <span className="font-medium text-foreground">{proposal.author_name}</span>
              <span>·</span>
              <span>{relativeTime(proposal.created_at)}</span>
            </div>
            <p className="text-foreground whitespace-pre-wrap">{proposal.body}</p>
          </div>

          {/* Vote section */}
          <div className="rounded-2xl border-2 border-border bg-card p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Vote</h2>
            <div className="flex items-center gap-6 mb-4 text-sm">
              <span className="flex items-center gap-1.5">
                <ThumbsUp className="h-4 w-4 text-secondary" /> Yes: <strong>{tally.yes}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <ThumbsDown className="h-4 w-4 text-destructive" /> No: <strong>{tally.no}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Minus className="h-4 w-4 text-muted-foreground" /> Abstain: <strong>{tally.abstain}</strong>
              </span>
            </div>
            {userVote ? (
              <p className="text-sm text-muted-foreground">
                You voted: <Badge variant="outline" className="ml-1 capitalize">{userVote}</Badge>
              </p>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  onClick={() => handleVote("yes")}
                  disabled={voting}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-1.5"
                >
                  <ThumbsUp className="h-4 w-4" /> Yes
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleVote("no")}
                  disabled={voting}
                  className="gap-1.5"
                >
                  <ThumbsDown className="h-4 w-4" /> No
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleVote("abstain")}
                  disabled={voting}
                  className="gap-1.5"
                >
                  <Minus className="h-4 w-4" /> Abstain
                </Button>
              </div>
            )}
          </div>

          {/* Comments */}
          <div className="rounded-2xl border-2 border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Comments {comments.length > 0 && `(${comments.length})`}
            </h2>

            {comments.length === 0 && (
              <p className="text-sm text-muted-foreground mb-4">No comments yet.</p>
            )}

            <div className="space-y-1 mb-6">
              {comments.map((c) => (
                <CommentNode key={c.id} comment={c} />
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <Textarea
                placeholder="Add a comment…"
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                rows={3}
              />
              <Button
                size="sm"
                onClick={handleComment}
                disabled={commenting || !commentBody.trim()}
              >
                {commenting ? "Posting…" : "Post Comment"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ProposalDetail = () => (
  <AuthGuard>{(user) => <ProposalDetailContent user={user} />}</AuthGuard>
);

export default ProposalDetail;
