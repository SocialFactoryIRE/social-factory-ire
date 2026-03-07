import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Globe, MapPin, Megaphone, User, FlaskConical } from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

interface Profile {
  display_name: string | null;
  membership_type: string | null;
  county: string | null;
  onboarded: boolean;
}

const NavCard = ({
  icon: Icon,
  title,
  description,
  to,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  to: string;
}) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="flex flex-col items-center gap-3 rounded-2xl border-2 border-border bg-card p-8 text-center shadow-sm transition-all hover:shadow-hover hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <Icon className="h-8 w-8 text-primary" />
      <span className="text-lg font-semibold text-foreground">{title}</span>
      <span className="text-sm text-muted-foreground">{description}</span>
    </button>
  );
};

const TownHallContent = ({ user }: { user: SupaUser }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Fetch profile
      const { data } = await supabase
        .from("profiles")
        .select("display_name, membership_type, county, onboarded")
        .eq("user_id", user.id)
        .single();

      if (!data || !data.onboarded) {
        navigate("/onboarding", { replace: true });
        return;
      }

      setProfile(data);

      // Auto-join chapter for local members
      if (data.membership_type === "local" && data.county) {
        const { data: existing } = await supabase
          .from("chapter_members")
          .select("id")
          .eq("user_id", user.id)
          .limit(1);

        if (!existing || existing.length === 0) {
          const { data: chapter } = await supabase
            .from("local_chapters")
            .select("id")
            .ilike("county", data.county)
            .eq("is_active", true)
            .limit(1)
            .single();

          if (chapter) {
            await supabase.from("chapter_members").insert({
              chapter_id: chapter.id,
              user_id: user.id,
              role: "member",
            });
          }
        }
      }

      setLoading(false);
    };

    init();
  }, [user, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  const isLocal = profile.membership_type === "local";

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 grid-pattern relative overflow-hidden">
        <div className="geometric-shape shape-circle w-64 h-64 bg-sky/20 top-20 right-10 blur-3xl" />
        <div className="geometric-shape w-40 h-40 bg-accent/30 top-1/3 left-20 rounded-3xl rotate-45" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Welcome back, {profile.display_name}
            </h1>
            <Badge
              variant="secondary"
              className="gap-1.5 text-sm px-3 py-1"
            >
              {isLocal ? (
                <MapPin className="h-3.5 w-3.5" />
              ) : (
                <Globe className="h-3.5 w-3.5" />
              )}
              {isLocal ? "Local Member" : "Online Member"}
            </Badge>
          </div>

          {/* Nav Cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            <NavCard
              icon={Megaphone}
              title="Global Noticeboard"
              description="Community-wide updates and discussions"
              to="/noticeboard"
            />

            {isLocal && (
              <>
                <NavCard
                  icon={MapPin}
                  title="Local Noticeboard"
                  description="Updates from your local chapter"
                  to="/local/noticeboard"
                />
                <NavCard
                  icon={User}
                  title="My Profile"
                  description="View and edit your member profile"
                  to="/profile"
                />
                <NavCard
                  icon={FlaskConical}
                  title="Social Lab"
                  description="Collaborate on local projects"
                  to="/social-lab"
                />
              </>
            )}
          </div>

          {/* Logout */}
          <div className="mt-10 text-center">
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" /> Log Out
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const TownHall = () => (
  <AuthGuard>
    {(user) => <TownHallContent user={user} />}
  </AuthGuard>
);

export default TownHall;
