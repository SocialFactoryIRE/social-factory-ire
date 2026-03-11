import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Plus } from "lucide-react";

export default function AdminPages() {
  const [pages, setPages] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const fetchPages = async () => {
    const { data } = await supabase.from("cms_pages").select("*").order("updated_at", { ascending: false });
    setPages(data ?? []);
  };

  useEffect(() => { fetchPages(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    const { id, title, slug, content, seo_title, seo_description } = editing;
    if (!title?.trim() || !slug?.trim()) {
      toast({ title: "Validation", description: "Title and slug are required.", variant: "destructive" });
      return;
    }

    if (id) {
      const { error } = await supabase.from("cms_pages").update({ title, slug, content, seo_title, seo_description, updated_at: new Date().toISOString() }).eq("id", id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("cms_pages").insert({ title, slug, content, seo_title, seo_description });
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    setOpen(false);
    setEditing(null);
    fetchPages();
  };

  const openNew = () => { setEditing({ title: "", slug: "", content: "", seo_title: "", seo_description: "" }); setOpen(true); };
  const openEdit = (page: any) => { setEditing({ ...page }); setOpen(true); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Pages CMS</h2>
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />New Page</Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {pages.length === 0 ? (
            <p className="text-muted-foreground text-sm">No pages yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>SEO Title</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell className="text-muted-foreground">/{page.slug}</TableCell>
                    <TableCell className="text-muted-foreground">{page.seo_title || "—"}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => openEdit(page)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing?.id ? "Edit Page" : "New Page"}</DialogTitle></DialogHeader>
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
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>SEO Title</Label>
                  <Input value={editing.seo_title || ""} onChange={(e) => setEditing({ ...editing, seo_title: e.target.value })} maxLength={60} />
                </div>
                <div className="space-y-2">
                  <Label>SEO Description</Label>
                  <Input value={editing.seo_description || ""} onChange={(e) => setEditing({ ...editing, seo_description: e.target.value })} maxLength={160} />
                </div>
              </div>
              <Button onClick={handleSave} className="w-full">Save Page</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
