// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import assets from "../assets/assets";

const SERVICES = [
  { label: "Branding", href: "/branding" },
  { label: "Meta Ads Management", href: "/smm" },
  { label: "SEO Optimization", href: "/seo" },
  { label: "Website Development", href: "/web-dev" },
];

const MORE_LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blogs", href: "/blogs" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            <img
              src={assets.logo}
              className="h-22"
              alt="Serenly Digital Marketing Company Logo"
            />
          </a>

          {/* ── DESKTOP NAV ── */}
          <nav
            style={{ display: "flex", alignItems: "center", gap: 24 }}
            className="desk-nav"
          >
            {/* Services Dropdown */}
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <button
                onClick={() => setServicesOpen((o) => !o)}
                className="nav-link services-trigger"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: "0.875rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  color: "var(--color-text-primary)",
                  fontFamily: "inherit",
                }}
              >
                Services
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  style={{
                    transition: "transform 0.2s ease",
                    transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {servicesOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 14px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--color-surface-overlay)",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    border: "1px solid var(--color-border-subtle)",
                    borderRadius: 14,
                    padding: "8px",
                    minWidth: 220,
                    boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
                    zIndex: 100,
                  }}
                >
                  {/* Small arrow pointer */}
                  <div
                    style={{
                      position: "absolute",
                      top: -6,
                      left: "50%",
                      transform: "translateX(-50%) rotate(45deg)",
                      width: 10,
                      height: 10,
                      background: "var(--color-surface-overlay)",
                      border: "1px solid var(--color-border-subtle)",
                      borderRight: "none",
                      borderBottom: "none",
                    }}
                  />
                  {SERVICES.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      onClick={() => setServicesOpen(false)}
                      style={{
                        display: "block",
                        padding: "10px 14px",
                        borderRadius: 9,
                        fontSize: "0.875rem",
                        color: "var(--color-text-primary)",
                        textDecoration: "none",
                        transition: "background 0.15s ease",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "var(--color-surface-hover, rgba(254,122,54,0.08))")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

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
              Get Started
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
            {/* Mobile Services accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen((o) => !o)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  background: "none",
                  border: "none",
                  padding: "0.875rem 0",
                  borderBottom: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                  fontSize: "1rem",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Services
                <ChevronDown
                  size={16}
                  style={{
                    transition: "transform 0.2s ease",
                    transform: mobileServicesOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                />
              </button>
              {mobileServicesOpen && (
                <div style={{ paddingLeft: "1rem" }}>
                  {SERVICES.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="nav-link"
                      style={{
                        display: "block",
                        padding: "0.75rem 0",
                        borderBottom: "1px solid var(--color-border-subtle)",
                        fontSize: "0.9375rem",
                        opacity: 0.85,
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Rest of mobile links */}
            {MORE_LINKS.map((l) => (
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
              Get Started
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
