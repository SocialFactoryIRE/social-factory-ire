import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Upload, Copy, Trash2, Loader2 } from "lucide-react";

export default function AdminMedia() {
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { role } = useAdminAuth();

  const fetchMedia = async () => {
    const { data } = await supabase.from("media_files").select("*").order("uploaded_at", { ascending: false });
    setFiles(data ?? []);
  };

  useEffect(() => { fetchMedia(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Too large", description: "Max file size is 5MB.", variant: "destructive" });
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: publicUrl } = supabase.storage.from("media").getPublicUrl(path);

    await supabase.from("media_files").insert({
      url: publicUrl.publicUrl,
      filename: file.name,
      type: file.type.startsWith("image") ? "image" : "file",
    });

    setUploading(false);
    fetchMedia();
    if (fileRef.current) fileRef.current.value = "";
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: "Copied", description: "URL copied to clipboard." });
  };

  const deleteFile = async (id: string) => {
    const { error } = await supabase.from("media_files").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else fetchMedia();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Media Library</h2>
        <div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          <Button onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
            Upload Image
          </Button>
        </div>
      </div>

      {files.length === 0 ? (
        <Card><CardContent className="pt-6"><p className="text-muted-foreground text-sm">No media files yet.</p></CardContent></Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {files.map((file) => (
            <Card key={file.id} className="overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center">
                <img src={file.url} alt={file.filename} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-3 space-y-2">
                <p className="text-sm font-medium truncate">{file.filename}</p>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => copyUrl(file.url)}>
                    <Copy className="h-3 w-3 mr-1" />Copy URL
                  </Button>
                  {role === "admin" && (
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => deleteFile(file.id)}>
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
