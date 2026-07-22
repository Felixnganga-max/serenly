import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import assets from "../assets/assets";

const SERVICE_LINKS = [
  { label: "All Services", href: "/services", desc: "See everything we offer" },
  {
    label: "Web Development",
    href: "/web-dev",
    desc: "Fast, custom-built websites",
  },
  {
    label: "Brand Identity",
    href: "/branding",
    desc: "Logos, guidelines & assets",
  },
  {
    label: "Social Media & Meta Ads",
    href: "/smm",
    desc: "Content, community & ROI",
  },
  { label: "SEO Optimisation", href: "/seo", desc: "Rank higher, get found" },
  {
    label: "School Management System",
    href: "/our-system",
    desc: "Serenly EduCore platform",
  },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef(null);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openServices = () => {
    clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServicesDelayed = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium tracking-wide transition-colors ${
      isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-background border-b border-border transition-shadow duration-300 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-8 h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src={assets.logo}
            alt="Serenly"
            className="h-9 w-9 object-contain"
          />
          <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Serenly
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={closeServicesDelayed}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-foreground/80 hover:text-primary transition-colors"
              aria-expanded={servicesOpen}
            >
              Services
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {servicesOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-80"
                onMouseEnter={openServices}
                onMouseLeave={closeServicesDelayed}
              >
                <div className="bg-background border border-border shadow-xl py-2">
                  {SERVICE_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setServicesOpen(false)}
                      className="flex flex-col gap-0.5 px-5 py-3 hover:bg-muted/40 transition-colors group"
                    >
                      <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {link.label}
                      </span>
                      <span className="text-xs text-foreground/50">
                        {link.desc}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink to="/about" className={linkClass}>
            About Us
          </NavLink>
          <NavLink to="/blogs" className={linkClass}>
            Blog
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-9 h-9 flex items-center justify-center border border-border text-foreground hover:border-foreground transition-colors"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link
            to="/contact"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 text-sm font-semibold tracking-wide transition-colors"
          >
            Let’s Meet & Talk
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-9 h-9 flex items-center justify-center border border-border text-foreground"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full max-h-[calc(100dvh-5rem)] overflow-y-auto bg-background border-b border-border shadow-xl py-6 px-6 flex flex-col gap-1">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-serif text-foreground py-3"
          >
            Home
          </Link>

          <button
            type="button"
            onClick={() => setMobileServicesOpen((v) => !v)}
            className="flex items-center justify-between text-lg font-serif text-foreground py-3"
          >
            Services
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
            />
          </button>
          {mobileServicesOpen && (
            <div className="flex flex-col pl-4 border-l border-border mb-2">
              {SERVICE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-foreground/70 py-2.5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-serif text-foreground py-3"
          >
            About Us
          </Link>
          <Link
            to="/blogs"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-serif text-foreground py-3"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-serif text-foreground py-3"
          >
            Contact
          </Link>
          <div className="h-px w-full bg-border my-3"></div>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-primary text-primary-foreground text-center px-6 py-3 text-sm font-semibold tracking-wide"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
