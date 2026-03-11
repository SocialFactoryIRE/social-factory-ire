import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("onboarded")
          .eq("user_id", session.user.id)
          .single();

        if (profile?.onboarded) {
          navigate("/town-hall", { replace: true });
        } else {
          navigate("/onboarding", { replace: true });
        }
      } else {
        navigate("/login", { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground text-lg">Verifying your account...</p>
    </div>
  );
};

export default AuthCallback;
