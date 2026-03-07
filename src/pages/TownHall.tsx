import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  LogOut,
  Globe,
  MapPin,
  Megaphone,
  User,
  FlaskConical,
  Scale,
  Microscope,
  Users,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

interface Profile {
  display_name: string | null;
  membership_type: string | null;
  county: string | null;
  onboarded: boolean;
}

/* ── Small sub-link inside a section card ── */
const SubLink = ({
  icon: Icon,
  label,
  to,
}: {
  icon: React.ElementType;
  label: string;
  to: string;
}) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="flex items-center gap-2.5 rounded-xl border border-border bg-background px-4 py-3 text-left transition-all hover:border-primary/40 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-ring w-full"
    >
      <Icon className="h-5 w-5 text-primary shrink-0" />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </button>
  );
};

/* ── Section card wrapper ── */
const SectionCard = ({
  icon: Icon,
  title,
  onClick,
  children,
}: {
  icon: React.ElementType;
  title: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) => {
  const Wrapper = onClick ? "button" : "div";
  return (
    <Wrapper
      onClick={onClick}
      className={`rounded-2xl border-2 border-border bg-card p-6 text-left shadow-sm transition-all ${
        onClick
          ? "hover:shadow-hover hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
          : ""
      }`}
    >
      <div className="flex items-center gap-3 mb-1">
        <Icon className="h-7 w-7 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </Wrapper>
  );
};

const TownHallContent = ({ user }: { user: SupaUser }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
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
            <Badge variant="secondary" className="gap-1.5 text-sm px-3 py-1">
              {isLocal ? (
                <MapPin className="h-3.5 w-3.5" />
              ) : (
                <Globe className="h-3.5 w-3.5" />
              )}
              {isLocal ? "Local Member" : "Online Member"}
            </Badge>
          </div>

          {/* 3 Section Cards */}
          <div className="space-y-5">
            {/* 1 — My Profile */}
            <SectionCard
              icon={User}
              title="My Profile"
              onClick={() => navigate("/profile")}
            />

            {/* 2 — Local Noticeboard */}
            <SectionCard icon={MapPin} title="Local Noticeboard">
              <div className="grid gap-2.5 sm:grid-cols-2">
                <SubLink icon={Scale} label="Democracy" to="/democracy" />
                <SubLink icon={Microscope} label="Research" to="/research" />
                <SubLink icon={FlaskConical} label="Social Lab" to="/social-lab" />
                <SubLink icon={Users} label="Suggested Connects" to="/suggested-connects" />
              </div>
            </SectionCard>

            {/* 3 — Global Noticeboard */}
            <SectionCard
              icon={Megaphone}
              title="Global Noticeboard"
              onClick={() => navigate("/noticeboard")}
            />
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
