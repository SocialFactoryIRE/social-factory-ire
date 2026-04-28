import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Pencil, X, Camera, FlaskConical, Heart, Save, ArrowLeft } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const COUNTIES = [
  "Carlow","Cavan","Clare","Cork","Donegal","Dublin","Galway","Kerry",
  "Kildare","Kilkenny","Laois","Leitrim","Limerick","Longford","Louth",
  "Mayo","Meath","Monaghan","Offaly","Roscommon","Sligo","Tipperary",
  "Waterford","Westmeath","Wexford","Wicklow",
];

const PRESET_TAGS = [
  "Community Building","Youth Work","Mental Health","Arts & Culture",
  "Sport & Wellbeing","Environment","Social Enterprise","Education",
  "Technology","Local Government","Music","Volunteering",
];

const OCEAN_LABELS = [
  { key: "ocean_o", label: "Openness" },
  { key: "ocean_c", label: "Conscientiousness" },
  { key: "ocean_e", label: "Extraversion" },
  { key: "ocean_a", label: "Agreeableness" },
  { key: "ocean_n", label: "Neuroticism" },
];

const VALUE_COLORS = [
  "bg-primary/15 text-primary",
  "bg-accent/80 text-accent-foreground",
  "bg-secondary text-secondary-foreground",
];

interface ProfileData {
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  county: string | null;
  town: string | null;
  membership_type: string | null;
  created_at: string;
}

interface OceanScores {
  ocean_o: number | null;
  ocean_c: number | null;
  ocean_e: number | null;
  ocean_a: number | null;
  ocean_n: number | null;
}

const ProfileContent = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // View data
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [ocean, setOcean] = useState<OceanScores | null>(null);
  const [topValues, setTopValues] = useState<string[] | null>(null);

  // Edit form
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editCounty, setEditCounty] = useState("");
  const [editTown, setEditTown] = useState("");
  const [editTags, setEditTags] = useState<Set<string>>(new Set());
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    const [profileRes, tagsRes, oceanRes, cultureRes] = await Promise.all([
      supabase.from("profiles").select("display_name, bio, avatar_url, county, town, membership_type, created_at").eq("user_id", user.id).maybeSingle(),
      supabase.from("member_tags").select("tag").eq("user_id", user.id),
      supabase.from("personality_results").select("ocean_o, ocean_c, ocean_e, ocean_a, ocean_n").eq("user_id", user.id).maybeSingle(),
      supabase.from("culture_results").select("top_values").eq("user_id", user.id).maybeSingle(),
    ]);

    if (profileRes.data) setProfile(profileRes.data as ProfileData);
    setTags((tagsRes.data || []).map((t: any) => t.tag));
    setOcean(oceanRes.data as OceanScores | null);
    setTopValues((cultureRes.data as any)?.top_values ?? null);
    setLoading(false);
  }, [user.id]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const enterEdit = () => {
    if (!profile) return;
    setEditName(profile.display_name || "");
    setEditBio(profile.bio || "");
    setEditCounty(profile.county || "");
    setEditTown(profile.town || "");
    setEditTags(new Set(tags));
    setAvatarFile(null);
    setAvatarPreview(null);
    setEditing(true);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 2 MB", variant: "destructive" });
      return;
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const toggleTag = (tag: string) => {
    setEditTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag); else next.add(tag);
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    let avatarUrl = profile?.avatar_url || null;

    // Upload avatar if changed
    if (avatarFile) {
      const path = `${user.id}/avatar`;
      const { error: uploadErr } = await supabase.storage.from("avatars").upload(path, avatarFile, { upsert: true });
      if (uploadErr) {
        toast({ title: "Avatar upload failed", description: uploadErr.message, variant: "destructive" });
        setSaving(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
      avatarUrl = urlData.publicUrl + `?t=${Date.now()}`;
    }

    // Update profile
    const { error: profileErr } = await supabase
      .from("profiles")
      .update({
        display_name: editName.trim() || null,
        bio: editBio.trim() || null,
        county: editCounty || null,
        town: editTown.trim() || null,
        avatar_url: avatarUrl,
      })
      .eq("user_id", user.id);

    if (profileErr) {
      toast({ title: "Save failed", description: profileErr.message, variant: "destructive" });
      setSaving(false);
      return;
    }

    // Replace tags: delete all then insert selected
    await supabase.from("member_tags").delete().eq("user_id", user.id);
    const tagInserts = Array.from(editTags).map((tag) => ({ user_id: user.id, tag, category: "interest" }));
    if (tagInserts.length > 0) {
      await supabase.from("member_tags").insert(tagInserts);
    }

    toast({ title: "Profile saved" });
    setEditing(false);
    setSaving(false);
    setLoading(true);
    fetchAll();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!profile) return null;

  const initials = (profile.display_name || user.email || "?")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const currentAvatar = avatarPreview || profile.avatar_url;
  const isLocal = profile.membership_type === "Local";

  // ── VIEW MODE ──
  if (!editing) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
            <button
              onClick={() => navigate("/town-hall")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Town Hall
            </button>
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-5">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-border" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center text-2xl font-bold text-primary border-2 border-border">
                    {initials}
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{profile.display_name || "Unnamed"}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{profile.membership_type || "Online"}</Badge>
                    <span className="text-xs text-muted-foreground">
                      Member since {new Date(profile.created_at).toLocaleDateString("en-IE", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={enterEdit} className="gap-1.5 shrink-0">
                <Pencil className="h-3.5 w-3.5" /> Edit Profile
              </Button>
            </div>

            {/* Bio */}
            <section className="mb-6">
              <h2 className="text-sm font-semibold text-muted-foreground mb-2">Bio</h2>
              <p className="text-foreground">{profile.bio || <span className="italic text-muted-foreground">No bio yet, add one!</span>}</p>
            </section>

            {/* Location */}
            {isLocal && (profile.county || profile.town) && (
              <section className="mb-6">
                <h2 className="text-sm font-semibold text-muted-foreground mb-2">Location</h2>
                <p className="text-foreground">{[profile.town, profile.county].filter(Boolean).join(", ")}</p>
              </section>
            )}

            {/* Interest Tags */}
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-muted-foreground mb-2">Interests</h2>
              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <Badge key={t} variant="outline">{t}</Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground italic text-sm">No interests added yet</p>
              )}
            </section>

            {/* Tests side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border-2 border-border bg-card p-6">
                <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FlaskConical className="h-4 w-4 text-primary" /> Personality (OCEAN)
                </h2>
                {ocean ? (
                  <div className="space-y-3">
                    {OCEAN_LABELS.map(({ key, label }) => {
                      const val = Number((ocean as any)[key]) || 0;
                      return (
                        <div key={key}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium text-foreground">{label}</span>
                            <span className="font-mono text-muted-foreground">{val.toFixed(1)}</span>
                          </div>
                          <Progress value={(val / 5) * 100} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <p className="text-sm text-muted-foreground mb-3">Discover your personality profile</p>
                    <Button size="sm" onClick={() => navigate("/social-lab/test")} className="gap-1.5">
                      <FlaskConical className="h-4 w-4" /> Take Personality Test
                    </Button>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border-2 border-border bg-card p-6">
                <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-primary" /> Values
                </h2>
                {topValues && topValues.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {topValues.slice(0, 3).map((v, i) => (
                      <Badge key={v} className={`${VALUE_COLORS[i % VALUE_COLORS.length]} border-0 capitalize`}>
                        {v.replace(/_/g, " ")}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <p className="text-sm text-muted-foreground mb-3">Find out what drives you</p>
                    <Button size="sm" onClick={() => navigate("/culture-test")} className="gap-1.5">
                      <Heart className="h-4 w-4" /> Take Values Test
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── EDIT MODE ──
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
            <Button variant="ghost" size="sm" onClick={() => setEditing(false)} className="gap-1.5">
              <X className="h-4 w-4" /> Cancel
            </Button>
          </div>

          <div className="space-y-8">
            {/* Avatar */}
            <div>
              <Label className="text-sm font-semibold text-muted-foreground mb-3 block">Avatar</Label>
              <div className="flex items-center gap-4">
                {currentAvatar ? (
                  <img src={currentAvatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-border" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center text-2xl font-bold text-primary border-2 border-border">
                    {initials}
                  </div>
                )}
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                    <Camera className="h-4 w-4" /> Change photo
                  </span>
                </label>
              </div>
            </div>

            {/* Display Name */}
            <div>
              <Label htmlFor="displayName" className="text-sm font-semibold text-muted-foreground">Display Name</Label>
              <Input id="displayName" value={editName} onChange={(e) => setEditName(e.target.value)} maxLength={100} className="mt-1.5" />
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor="bio" className="text-sm font-semibold text-muted-foreground">Bio</Label>
              <Textarea id="bio" value={editBio} onChange={(e) => setEditBio(e.target.value)} maxLength={300} rows={3} className="mt-1.5" />
              <p className="text-xs text-muted-foreground mt-1 text-right">{editBio.length}/300</p>
            </div>

            {/* Location (local only) */}
            {isLocal && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold text-muted-foreground">County</Label>
                  <Select value={editCounty} onValueChange={setEditCounty}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select county" /></SelectTrigger>
                    <SelectContent>
                      {COUNTIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="town" className="text-sm font-semibold text-muted-foreground">Town</Label>
                  <Input id="town" value={editTown} onChange={(e) => setEditTown(e.target.value)} maxLength={100} className="mt-1.5" />
                </div>
              </div>
            )}

            {/* Interest Tags */}
            <div>
              <Label className="text-sm font-semibold text-muted-foreground mb-3 block">Interests</Label>
              <div className="flex flex-wrap gap-2">
                {PRESET_TAGS.map((tag) => {
                  const selected = editTags.has(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
                        selected
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Save */}
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} disabled={saving} className="gap-1.5">
                <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save Changes"}
              </Button>
              <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Profile = () => (
  <AuthGuard>{(user) => <ProfileContent user={user} />}</AuthGuard>
);

export default Profile;
