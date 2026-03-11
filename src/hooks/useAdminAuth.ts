import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export type AdminRole = "admin" | "editor" | null;

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<AdminRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          // Check admin role via RPC
          const { data } = await supabase.rpc("is_admin_or_editor", {
            _user_id: currentUser.id,
          });
          if (data) {
            // Determine specific role
            const { data: adminCheck } = await supabase.rpc("has_role", {
              _user_id: currentUser.id,
              _role: "admin",
            });
            setRole(adminCheck ? "admin" : "editor");
          } else {
            setRole(null);
          }
        } else {
          setRole(null);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data } = await supabase.rpc("is_admin_or_editor", {
          _user_id: currentUser.id,
        });
        if (data) {
          const { data: adminCheck } = await supabase.rpc("has_role", {
            _user_id: currentUser.id,
            _role: "admin",
          });
          setRole(adminCheck ? "admin" : "editor");
        } else {
          setRole(null);
        }
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };

  return { user, role, loading, signOut };
}
