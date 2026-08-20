import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Moon, Sun, LayoutDashboard, LogIn } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import assets from "../assets/assets";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  return (
    <header
      className={`sticky top-0 left-0 w-full z-50 h-[72px] flex items-center px-6 lg:px-12 bg-surface-overlay backdrop-blur-2xl border-b border-border-subtle transition-shadow duration-300 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container-site !px-0 flex items-center gap-8 w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src={assets.logo}
            alt="Serenly"
            className="h-9 w-9 object-contain"
          />
          <span className="font-display text-2xl tracking-tight text-foreground">
            Serenly
          </span>
        </Link>

        {/* Nav links sit close to the logo */}
        <nav className="hidden lg:flex items-center gap-8 ml-10 xl:ml-16">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/services" className={linkClass}>
            Services
          </NavLink>
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

        {/* Actions pushed to the far right */}
        <div className="hidden lg:flex items-center gap-4 ml-auto">
          <Link
            to={isAuthenticated ? "/admin" : "/admin/login"}
            aria-label={isAuthenticated ? "Go to dashboard" : "Admin login"}
            title={isAuthenticated ? "Dashboard" : "Login"}
            className="theme-toggle"
          >
            {isAuthenticated ? (
              <LayoutDashboard size={16} />
            ) : (
              <LogIn size={16} />
            )}
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="theme-toggle"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link to="/contact" className="btn btn-primary btn-md">
            Let's Meet & Talk
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-2 ml-auto">
          <Link
            to={isAuthenticated ? "/admin" : "/admin/login"}
            aria-label={isAuthenticated ? "Go to dashboard" : "Admin login"}
            title={isAuthenticated ? "Dashboard" : "Login"}
            className="theme-toggle"
          >
            {isAuthenticated ? (
              <LayoutDashboard size={16} />
            ) : (
              <LogIn size={16} />
            )}
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="theme-toggle"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — always solid, never transparent */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full max-h-[calc(100dvh-72px)] overflow-y-auto bg-surface border-b border-border shadow-xl py-6 px-6 flex flex-col gap-1">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-display text-foreground py-3"
          >
            Home
          </Link>
          <Link
            to="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-display text-foreground py-3"
          >
            Services
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-display text-foreground py-3"
          >
            About Us
          </Link>
          <Link
            to="/blogs"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-display text-foreground py-3"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-display text-foreground py-3"
          >
            Contact
          </Link>
          <Link
            to={isAuthenticated ? "/admin" : "/admin/login"}
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-display text-foreground py-3"
          >
            {isAuthenticated ? "Dashboard" : "Admin Login"}
          </Link>
          <div className="divider my-3" />
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary btn-lg justify-center"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
