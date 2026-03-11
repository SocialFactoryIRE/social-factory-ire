import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Loader2, Save } from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { role } = useAdminAuth();

  useEffect(() => {
    supabase.from("site_settings").select("*").limit(1).single().then(({ data }) => {
      setSettings(data);
    });
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    const { error } = await supabase.from("site_settings").update({
      site_name: settings.site_name,
      contact_email: settings.contact_email,
      instagram_url: settings.instagram_url,
      linkedin_url: settings.linkedin_url,
      analytics_id: settings.analytics_id,
      updated_at: new Date().toISOString(),
    }).eq("id", settings.id);

    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Settings saved" });
    setSaving(false);
  };

  if (role !== "admin") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Only admins can manage settings.</p>
      </div>
    );
  }

  if (!settings) return null;

  const fields = [
    { key: "site_name", label: "Site Name" },
    { key: "contact_email", label: "Contact Email" },
    { key: "instagram_url", label: "Instagram URL" },
    { key: "linkedin_url", label: "LinkedIn URL" },
    { key: "analytics_id", label: "Analytics ID" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Site Settings</h2>

      <Card>
        <CardHeader><CardTitle>General Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {fields.map((f) => (
            <div key={f.key} className="space-y-2">
              <Label>{f.label}</Label>
              <Input
                value={settings[f.key] || ""}
                onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                maxLength={500}
              />
            </div>
          ))}
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
