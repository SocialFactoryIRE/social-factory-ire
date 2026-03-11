import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/social-factory-logo.jpeg";
import { supabase } from "@/integrations/supabase/client";

const NAV_DOT_COLORS: Record<string, string> = {
  About: "#ffcd1a",
  Programming: "#f9bb86",
  "Science & Research": "#5dcdf9",
  Governance: "#00b389",
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      const { data } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("user_id", userId)
        .maybeSingle();
      setAvatarUrl(data?.avatar_url ?? null);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const loggedIn = !!session?.user;
      setIsLoggedIn(loggedIn);
      if (loggedIn && session?.user?.id) fetchProfile(session.user.id);
      else setAvatarUrl(null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      const loggedIn = !!session?.user;
      setIsLoggedIn(loggedIn);
      if (loggedIn && session?.user?.id) fetchProfile(session.user.id);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Nav links without Profile/Login — those are handled separately
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Programming", path: "/programming" },
    { name: "Science & Research", path: "/science" },
    { name: "Governance", path: "/governance" },
    ...(!isLoggedIn ? [{ name: "Join", path: "/join" }] : []),
    ...(!isLoggedIn ? [{ name: "Log In", path: "/login" }] : []),
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/[0.92] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src={logo} alt="Social Factory" className="h-12 w-12 rounded-full object-cover" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isJoin = link.name === "Join";
              const dotColor = NAV_DOT_COLORS[link.name];
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-medium transition-all text-sm ${
                    isJoin
                      ? "bg-green text-white hover:bg-green-deep"
                      : active
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {dotColor && (
                    <span
                      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: dotColor }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}

            {/* Profile avatar */}
            {isLoggedIn && (
              <Link
                to="/profile"
                className="ml-2 flex-shrink-0 hover:opacity-80 transition-opacity"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="h-9 w-9 rounded-full object-cover border-2 border-green"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-green flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                )}
              </Link>
            )}
          </div>

          {/* Mobile: avatar + menu button */}
          <div className="flex md:hidden items-center gap-2">
            {isLoggedIn && (
              <Link to="/profile" className="flex-shrink-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="h-9 w-9 rounded-full object-cover border-2 border-green"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-green flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                )}
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1 bg-cream/95 backdrop-blur-md rounded-b-2xl px-2">
            {navLinks.map((link) => {
              const isJoin = link.name === "Join";
              const dotColor = NAV_DOT_COLORS[link.name];
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium text-base transition-all ${
                    isJoin
                      ? "bg-green text-white hover:bg-green-deep"
                      : active
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {dotColor && (
                    <span
                      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: dotColor }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
