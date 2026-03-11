import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import {
  LayoutDashboard, Users, FileText, PenSquare, Image, Settings, LogOut, Menu, X, Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/leads", icon: Inbox, label: "Leads" },
  { to: "/admin/pages", icon: FileText, label: "Pages" },
  { to: "/admin/blog", icon: PenSquare, label: "Blog" },
  { to: "/admin/media", icon: Image, label: "Media" },
  { to: "/admin/users", icon: Users, label: "Users" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminLayout() {
  const { user, role, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform lg:translate-x-0 lg:static lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          <span className="font-bold text-lg text-foreground">SF Admin</span>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground mb-2 truncate">{user?.email}</div>
          <div className="text-xs text-muted-foreground mb-3 capitalize">{role}</div>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center px-6 border-b border-border bg-card">
          <Button variant="ghost" size="icon" className="lg:hidden mr-3" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Social Factory Admin</h1>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
