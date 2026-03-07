import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
import { ArrowLeft, Pin, Plus, X } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface Post {
  id: string;
  title: string;
  body: string | null;
  category: string;
  is_pinned: boolean;
  created_at: string;
  author_id: string;
  author_name: string;
}

const CATEGORIES = ["general", "event", "resource", "opportunity"] as const;

const categoryColors: Record<string, string> = {
  general: "bg-muted text-muted-foreground",
  event: "bg-primary/15 text-primary",
  resource: "bg-secondary/15 text-secondary",
  opportunity: "bg-accent/20 text-accent-foreground",
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

const NoticeboardContent = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<string>("general");
  const [submitting, setSubmitting] = useState(false);

  const fetchPosts = useCallback(async () => {
    const { data } = await supabase
      .from("noticeboard_posts")
      .select("*")
      .is("chapter_id", null)
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (!data) {
      setPosts([]);
      setLoading(false);
      return;
    }

    // Fetch author names
    const authorIds = [...new Set(data.map((p) => p.author_id))];
    const { data: profiles } = await supabase
      .rpc("get_display_names", { user_ids: authorIds });

    const nameMap = new Map(
      (profiles || []).map((p) => [p.user_id, p.display_name || "Member"])
    );

    setPosts(
      data.map((p) => ({
        id: p.id,
        title: p.title,
        body: p.body,
        category: p.category,
        is_pinned: p.is_pinned,
        created_at: p.created_at,
        author_id: p.author_id,
        author_name: nameMap.get(p.author_id) || "Member",
      }))
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setSubmitting(true);
    await supabase.from("noticeboard_posts").insert({
      author_id: user.id,
      chapter_id: null,
      title: title.trim(),
      body: body.trim() || null,
      category,
    });
    setTitle("");
    setBody("");
    setCategory("general");
    setShowForm(false);
    setSubmitting(false);
    fetchPosts();
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
            <h1 className="text-3xl font-bold text-foreground">
              Global Noticeboard
            </h1>
            <Button
              size="sm"
              onClick={() => setShowForm((v) => !v)}
              className="gap-1.5"
            >
              {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {showForm ? "Cancel" : "New Post"}
            </Button>
          </div>

          {/* New post form */}
          {showForm && (
            <div className="mb-8 rounded-2xl border-2 border-border bg-card p-6 space-y-4">
              <Input
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Write your post…"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
              />
              <div className="flex items-center gap-3">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-44">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c} className="capitalize">
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleSubmit} disabled={submitting || !title.trim()}>
                  {submitting ? "Posting…" : "Post"}
                </Button>
              </div>
            </div>
          )}

          {/* Posts */}
          {loading ? (
            <p className="text-center text-muted-foreground">Loading…</p>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No posts yet. Be the first to share something!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-2xl border-2 border-border bg-card p-6 transition-shadow hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      {post.is_pinned && <Pin className="h-4 w-4 text-accent" />}
                      {post.title}
                    </h2>
                    <Badge className={`shrink-0 capitalize ${categoryColors[post.category] || ""}`}>
                      {post.category}
                    </Badge>
                  </div>
                  {post.body && (
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                      {post.body}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{post.author_name}</span>
                    <span>·</span>
                    <span>{relativeTime(post.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Noticeboard = () => (
  <AuthGuard>{(user) => <NoticeboardContent user={user} />}</AuthGuard>
);

export default Noticeboard;
