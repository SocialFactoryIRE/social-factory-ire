import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, FlaskConical, Compass, Eye } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const SocialLabContent = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const [typeCode, setTypeCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("personality_results")
      .select("type_code")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        setTypeCode(data?.type_code ?? null);
        setLoading(false);
      });
  }, [user.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 relative overflow-hidden">
        <div className="geometric-shape shape-circle w-64 h-64 bg-sky/20 top-20 right-10 blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl relative z-10">
          <button
            onClick={() => navigate("/town-hall")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Town Hall
          </button>

          <div className="text-center mb-10">
            <FlaskConical className="h-12 w-12 mx-auto text-primary mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Social Lab
            </h1>
            <p className="text-muted-foreground">
              Discover your social personality and find your community
            </p>
          </div>

          {typeCode ? (
            <div className="bg-card rounded-2xl border-2 border-border p-8 text-center space-y-6">
              <p className="text-muted-foreground">Your personality type</p>
              <Badge className="text-2xl px-5 py-2 font-mono font-bold bg-primary/15 text-primary border-0">
                {typeCode}
              </Badge>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => navigate("/social-lab/result")} className="gap-2">
                  <Eye className="h-4 w-4" /> View My Result
                </Button>
                <Button variant="outline" onClick={() => navigate("/communities")} className="gap-2">
                  <Compass className="h-4 w-4" /> Explore Communities
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-2xl border-2 border-border p-8 text-center space-y-6">
              <p className="text-lg text-foreground font-medium">
                Take a short personality test to discover your social type and get matched to communities.
              </p>
              <Button size="lg" onClick={() => navigate("/social-lab/test")} className="gap-2">
                <FlaskConical className="h-5 w-5" /> Take the Personality Test
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const SocialLab = () => (
  <AuthGuard>{(user) => <SocialLabContent user={user} />}</AuthGuard>
);

export default SocialLab;
