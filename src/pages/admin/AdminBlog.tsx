import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { role } = useAdminAuth();

  const fetchPosts = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts(data ?? []);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    const { id, title, slug, content, featured_image, published } = editing;
    if (!title?.trim() || !slug?.trim()) {
      toast({ title: "Validation", description: "Title and slug are required.", variant: "destructive" });
      return;
    }

    if (id) {
      const { error } = await supabase.from("blog_posts").update({ title, slug, content, featured_image, published }).eq("id", id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("blog_posts").insert({ title, slug, content, featured_image, published });
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    setOpen(false);
    setEditing(null);
    fetchPosts();
  };

  const deletePost = async (id: string) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else fetchPosts();
  };

  const togglePublished = async (id: string, published: boolean) => {
    await supabase.from("blog_posts").update({ published: !published }).eq("id", id);
    fetchPosts();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Blog</h2>
        <Button onClick={() => { setEditing({ title: "", slug: "", content: "", featured_image: "", published: false }); setOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />New Post
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {posts.length === 0 ? (
            <p className="text-muted-foreground text-sm">No blog posts yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell className="text-muted-foreground">/{post.slug}</TableCell>
                      <TableCell>
                        <Badge variant={post.published ? "default" : "secondary"} className="cursor-pointer" onClick={() => togglePublished(post.id, post.published)}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{format(new Date(post.created_at), "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => { setEditing({ ...post }); setOpen(true); }}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          {role === "admin" && (
                            <Button variant="ghost" size="icon" onClick={() => deletePost(post.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing?.id ? "Edit Post" : "New Post"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} maxLength={200} />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} maxLength={200} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} rows={10} />
              </div>
              <div className="space-y-2">
                <Label>Featured Image URL</Label>
                <Input value={editing.featured_image || ""} onChange={(e) => setEditing({ ...editing, featured_image: e.target.value })} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={editing.published} onCheckedChange={(checked) => setEditing({ ...editing, published: checked })} />
                <Label>Published</Label>
              </div>
              <Button onClick={handleSave} className="w-full">Save Post</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
