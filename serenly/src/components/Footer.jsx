// src/components/Footer.jsx
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import React from "react";
import assets from "../assets/assets";

/* Facebook SVG icon */
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/* Instagram SVG icon */
function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const FOOTER_NAV = {
  Services: [
    { label: "Brand Identity & Strategy", href: "/branding" },
    { label: "Social Media Marketing", href: "/smm" },
    { label: "SEO Optimization", href: "/seo" },
    { label: "Web Development", href: "/web-dev" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Campaigns", href: "/campaigns" },
    { label: "Blog", href: "/blogs" },
    { label: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border-subtle)",
        paddingTop: "4.5rem",
        paddingBottom: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top gradient line accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(254,122,54,0.4),rgba(0,70,255,0.3),transparent)",
          pointerEvents: "none",
        }}
      />

      <div className="container-site">
        {/* ── MAIN GRID ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3.5rem",
          }}
          className="footer-main"
        >
          {/* Brand column */}
          <div>
            {/* Logo */}
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                marginBottom: "1.25rem",
              }}
            >
         
           <img src={assets.logo} alt="Serenly Digital Marketing Company Logo" />
            </a>

            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.85,
                maxWidth: 270,
                color: "var(--color-text-tertiary)",
                marginBottom: "1.75rem",
              }}
            >
              Serenly is a results-driven digital marketing agency helping
              ambitious businesses across Kenya and Africa grow their brand,
              dominate search, and convert online audiences into loyal
              customers.
            </p>

            {/* Contact snippets */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.625rem",
                marginBottom: "1.75rem",
              }}
            >
              {[
                { icon: <Mail size={14} />, text: "hello@serenly.agency" },
                { icon: <Phone size={14} />, text: "+254 700 000 000" },
                { icon: <MapPin size={14} />, text: "Nairobi, Kenya" },
              ].map((item) => (
                <div
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                  }}
                >
                  <span style={{ color: "#FE7A36", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8625rem",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Social — Facebook & Instagram ONLY */}
            <div style={{ display: "flex", gap: "0.625rem" }}>
              {/* Facebook */}
              <a
                href="https://facebook.com/serenly"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Serenly on Facebook"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "#1877F2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "all 0.25s var(--ease-spring)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-3px) scale(1.1)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(24,119,242,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <FacebookIcon />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/serenly"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Serenly on Instagram"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#833AB4,#FD1D1D,#FCB045)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "all 0.25s var(--ease-spring)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-3px) scale(1.1)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(253,29,29,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_NAV).map(([title, links]) => (
            <div key={title}>
              <h5
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  marginBottom: "1.25rem",
                  color: "var(--color-text-primary)",
                }}
              >
                {title}
              </h5>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {links.map((link) => (
                  <li key={link.label} style={{ marginBottom: "0.7rem" }}>
                    <a
                      href={link.href}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8875rem",
                        color: "var(--color-text-tertiary)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#FE7A36";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color =
                          "var(--color-text-tertiary)";
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── CTA strip ── */}
        <div
          style={{
            borderRadius: "var(--radius-xl)",
            padding: "1.5rem 2rem",
            marginBottom: "2.5rem",
            background:
              "linear-gradient(135deg,rgba(254,122,54,0.09),rgba(0,70,255,0.06))",
            border: "1px solid rgba(254,122,54,0.16)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.0625rem",
                color: "var(--color-text-primary)",
                marginBottom: 2,
              }}
            >
              Ready to grow your business?
            </div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-tertiary)",
              }}
            >
              Get a free digital marketing audit — no strings attached.
            </div>
          </div>
          <a
            href="/contact"
            className="btn btn-primary btn-md"
            style={{ borderRadius: 10, flexShrink: 0 }}
          >
            Get Free Audit <ArrowRight size={15} strokeWidth={2.5} />
          </a>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            height: 1,
            background: "var(--color-border)",
            marginBottom: "1.5rem",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.875rem",
          }}
        >
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--color-text-tertiary)",
            }}
          >
            © {new Date().getFullYear()} Serenly Digital Agency. All rights
            reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { l: "Privacy Policy", href: "/privacy" },
              { l: "Terms", href: "/terms" },
            ].map((item) => (
              <a
                key={item.l}
                href={item.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8125rem",
                  color: "var(--color-text-tertiary)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-secondary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-tertiary)")
                }
              >
                {item.l}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){.footer-main{grid-template-columns:1fr 1fr !important; gap:2rem !important;}}
        @media(max-width:640px) {.footer-main{grid-template-columns:1fr !important;}}
      `}</style>
    </footer>
  );
}
