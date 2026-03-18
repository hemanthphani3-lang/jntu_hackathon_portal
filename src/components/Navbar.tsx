import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Prizes", href: "/prizes" },
  { label: "Speakers", href: "/speakers" },
  { label: "Committee", href: "/committee" },
  { label: "Coordinator", href: "/coordinator" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, signOut } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      toast({
        title: "Authentication Required",
        description: "Please login first to register for events.",
      });
      navigate("/login");
    }
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <span className="font-display font-bold text-lg text-foreground">
            ISEA JNTUK<span className="text-primary"> - 2026</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="cyber-outline" size="sm">Login</Button>
            </Link>
          )}
          <Link to="/register" onClick={handleRegisterClick}>
            <Button variant="cyber" size="sm">Register</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-b border-border px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-4 text-base font-medium transition-colors border-b border-white/5 last:border-0 ${
                location.pathname === link.href
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-3 pt-3 border-t border-border">
            {isAuthenticated ? (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start gap-2">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            ) : (
              <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button variant="cyber-outline" size="sm" className="w-full">Login</Button>
              </Link>
            )}
            <Link to="/register" className="flex-1" onClick={handleRegisterClick}>
              <Button variant="cyber" size="sm" className="w-full">Register</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
