import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, FlaskConical, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

const ResearchContent = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [consented, setConsented] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("research_consents")
        .select("consented")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) setConsented(data.consented);
      setLoading(false);
    };
    fetch();
  }, [user.id]);

  const handleToggle = async (checked: boolean) => {
    setSaving(true);
    setConsented(checked);
    const { error } = await supabase
      .from("research_consents")
      .upsert(
        {
          user_id: user.id,
          consented: checked,
          consented_at: checked ? new Date().toISOString() : null,
        },
        { onConflict: "user_id" }
      );

    if (error) {
      setConsented(!checked);
      toast({
        title: "Error",
        description: "Could not save your preference. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: checked ? "Consent given" : "Consent withdrawn",
        description: checked
          ? "Thank you, your anonymised data will support community research."
          : "Your consent has been withdrawn.",
      });
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl relative z-10">
          <button
            onClick={() => navigate("/town-hall")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Town Hall
          </button>

          <div className="flex items-center gap-3 mb-8">
            <FlaskConical className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Research</h1>
          </div>

          <div className="rounded-2xl border-2 border-border bg-card p-6 md:p-8 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Why we do research
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Social Factory partners with universities and research bodies to study
              community wellbeing in Ireland. Our work spans mental health, sociology,
              and psychology, helping us understand what makes communities thrive.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              All data used in research is fully anonymised and aggregated. Individual
              responses are never shared. Your participation helps shape
              evidence-based programmes for communities across Ireland.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-border bg-card p-6 md:p-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Your consent
            </h2>

            {loading ? (
              <p className="text-muted-foreground text-sm">Loading…</p>
            ) : (
              <div className="flex items-start gap-4">
                <Switch
                  id="consent-toggle"
                  checked={consented}
                  onCheckedChange={handleToggle}
                  disabled={saving}
                />
                <Label
                  htmlFor="consent-toggle"
                  className="text-sm text-foreground leading-relaxed cursor-pointer"
                >
                  I consent to my anonymised data being used for research
                </Label>
              </div>
            )}

            {consented && !loading && (
              <div className="mt-4 flex items-center gap-2 text-sm text-secondary">
                <Check className="h-4 w-4" />
                <span>You have given consent. You can withdraw at any time.</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Research = () => (
  <AuthGuard>{(user) => <ResearchContent user={user} />}</AuthGuard>
);

export default Research;
