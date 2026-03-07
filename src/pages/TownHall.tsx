import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const TownHallContent = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState<string>("");

  useEffect(() => {
    supabase
      .from("profiles")
      .select("display_name")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        setDisplayName(data?.display_name || user.email || "");
      });
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 grid-pattern relative overflow-hidden">
        <div className="geometric-shape shape-circle w-64 h-64 bg-sky/20 top-20 right-10 blur-3xl" />
        <div className="geometric-shape w-40 h-40 bg-accent/30 top-1/3 left-20 rounded-3xl rotate-45" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <div className="bg-card p-10 md:p-14 rounded-3xl shadow-hover border-2 border-border">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Welcome to the Town Hall
              </h1>
              <p className="text-lg text-muted-foreground mb-2">Phase 3 coming soon</p>
              <p className="text-base text-muted-foreground mb-8">
                Hello, <span className="font-semibold text-foreground">{displayName}</span>
              </p>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" /> Log Out
              </Button>
            </div>
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
