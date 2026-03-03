import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Shield, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const navLinks = [
  { label: "Home", to: "/", ocid: "nav.home.link" },
  { label: "MLAs", to: "/mlas", ocid: "nav.mlas.link" },
  { label: "Candidates", to: "/candidates", ocid: "nav.candidates.link" },
  { label: "Supporters", to: "/supporters", ocid: "nav.supporters.link" },
  { label: "Join Us", to: "/join", ocid: "nav.join.link" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-party">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center shadow-saffron">
            <span className="text-accent-foreground font-display font-black text-sm leading-none">
              B
            </span>
          </div>
          <span className="font-display font-black text-xl text-primary-foreground tracking-tight group-hover:opacity-90 transition-opacity">
            BOROLA
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={link.ocid}
              className={`px-4 py-2 rounded-md font-body text-sm font-medium transition-all duration-200 ${
                isActive(link.to)
                  ? "bg-accent text-accent-foreground"
                  : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            data-ocid="nav.admin.link"
            className="ml-2 flex items-center gap-1.5 px-3 py-2 rounded-md text-primary-foreground/60 hover:text-primary-foreground/90 hover:bg-white/10 transition-all duration-200 text-sm"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="font-body text-xs">Admin</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden text-primary-foreground p-2 rounded-md hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-primary border-t border-white/10"
          >
            <div className="flex flex-col px-4 py-3 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={link.ocid}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-md font-body text-sm font-medium transition-all ${
                    isActive(link.to)
                      ? "bg-accent text-accent-foreground"
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/admin"
                data-ocid="nav.admin.link"
                onClick={() => setMobileOpen(false)}
                className="mt-1 flex items-center gap-1.5 px-4 py-3 rounded-md text-primary-foreground/60 hover:text-primary-foreground/80 hover:bg-white/10 transition-all text-sm"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function AdminNavbar() {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 bg-primary shadow-party">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center shadow-saffron">
            <span className="text-accent-foreground font-display font-black text-sm leading-none">
              B
            </span>
          </div>
          <div>
            <span className="font-display font-black text-xl text-primary-foreground tracking-tight">
              BOROLA
            </span>
            <span className="ml-2 text-xs text-accent font-body">
              Admin Panel
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-accent" />
          <span className="text-primary-foreground/70 text-sm font-body hidden sm:block">
            {location.pathname.includes("dashboard") ? "Dashboard" : "Login"}
          </span>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;
  return (
    <footer className="bg-primary text-primary-foreground/70 py-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-display font-black text-xs">
              B
            </span>
          </div>
          <span className="font-display font-bold text-primary-foreground">
            BOROLA Party
          </span>
        </div>
        <p className="text-xs text-primary-foreground/50 mb-1">
          Serving the people with dedication and integrity.
        </p>
        <p className="text-xs text-primary-foreground/40">
          © {year}. Built with ♥ using{" "}
          <a
            href={utm}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent/80 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

export function Button_saffron({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
}) {
  return (
    <button
      className={`bg-accent text-accent-foreground font-display font-bold px-6 py-3 rounded-md shadow-saffron hover:bg-saffron-400 transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
