// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const PRODUCTS = [
  { label: "Branding", href: "/branding" },
  { label: "SMM", href: "/smm" },
  { label: "SEO Optimization", href: "/seo" },
  { label: "Web Development", href: "/web-dev" },
];

const MORE_LINKS = [
  { label: "Blogs", href: "/blogs" },
  { label: "About Us", href: "/about" },
  // { label: "Campaigns", href: "/campaigns" },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const allLinks = [...PRODUCTS, ...MORE_LINKS];

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 80,
          height: 70,
          display: "flex",
          alignItems: "center",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: "var(--color-surface-overlay)",
          borderBottom: "1px solid var(--color-border-subtle)",
          boxShadow: scrolled ? "0 2px 28px rgba(0,0,0,0.07)" : "none",
          transition: "box-shadow 0.3s ease, background 0.4s ease",
        }}
      >
        <div
          className="container-site"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* ── LOGO ── */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                background: "linear-gradient(135deg,#FE7A36,#FF9A62)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(254,122,54,0.35)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#fff",
                  fontSize: 18,
                  lineHeight: 1,
                }}
              >
                S
              </span>
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.3rem",
                background: "linear-gradient(135deg,#FE7A36 20%,#0046FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.01em",
              }}
            >
              Serenly
            </span>
          </a>

          {/* ── DESKTOP NAV ── */}
          <nav
            style={{ display: "flex", alignItems: "center", gap: 24 }}
            className="desk-nav"
          >
            {/* Products — slightly highlighted */}
            {PRODUCTS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="nav-link"
                style={{ fontSize: "0.875rem" }}
              >
                {l.label}
              </a>
            ))}

            {/* Divider dot */}
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "var(--color-border-strong)",
                flexShrink: 0,
              }}
            />

            {MORE_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="nav-link"
                style={{ fontSize: "0.875rem" }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* ── ACTIONS ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDark ? (
                <Sun size={16} strokeWidth={2} />
              ) : (
                <Moon size={16} strokeWidth={2} />
              )}
            </button>

            <a
              href="/contact"
              className="btn btn-primary btn-md desk-cta"
              style={{ borderRadius: 10, fontSize: "0.875rem" }}
            >
              Contact Us
            </a>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="mob-btn"
              aria-label="Toggle menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--color-text-primary)",
                padding: 4,
                display: "none",
              }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── MOBILE DROPDOWN ── */}
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: 70,
              left: 0,
              right: 0,
              background: "var(--color-surface-overlay)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              borderBottom: "1px solid var(--color-border)",
              padding: "1rem 1.5rem 1.5rem",
              zIndex: 99,
            }}
          >
            {allLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="nav-link"
                style={{
                  display: "block",
                  padding: "0.875rem 0",
                  borderBottom: "1px solid var(--color-border-subtle)",
                  fontSize: "1rem",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/contact"
              className="btn btn-primary btn-md"
              style={{
                marginTop: "1.25rem",
                width: "100%",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              Contact Us
            </a>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 1060px) { .desk-nav { display:none !important; } .mob-btn { display:flex !important; } }
        @media (max-width: 640px)  { .desk-cta { display:none !important; } }
      `}</style>
    </>
  );
}
