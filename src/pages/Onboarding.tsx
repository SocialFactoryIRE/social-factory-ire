import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <AuthGuard>
      {(user) => (
        <div className="min-h-screen">
          <Navbar />
          <div className="pt-24 pb-20 grid-pattern relative overflow-hidden">
            <div className="geometric-shape shape-circle w-64 h-64 bg-mint/20 top-20 left-10 blur-3xl" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-xl mx-auto text-center">
                <div className="bg-card p-10 md:p-14 rounded-3xl shadow-hover border-2 border-border">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                    Onboarding Coming Soon
                  </h1>
                  <p className="text-lg text-muted-foreground mb-2">Phase 2</p>
                  <p className="text-base text-muted-foreground mb-8">
                    Signed in as <span className="font-semibold text-foreground">{user.email}</span>
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
      )}
    </AuthGuard>
  );
};

export default Onboarding;
