// src/pages/Branding.jsx
// Serenly — Brand Identity & Strategy Service Page
// Stack: React + Tailwind v4 + Global CSS (index.css)
// Unsplash images used as placeholders — swap with your own assets later

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal, ParallaxLayer } from "../components/Parallax";

/* ─── Unsplash placeholder images ─── */
const HERO_BG =
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80"; // design workspace

const SERVICES = [
  {
    id: "strategy",
    tag: "01 — Strategy",
    title: "Brand Strategy & Positioning",
    desc: "We research your market, decode your audience, and craft a positioning that carves out undeniable space for your brand. Strategy first — always.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    accent: "orange",
    bullets: [
      "Competitor & market landscape analysis",
      "Target audience persona mapping",
      "Brand messaging architecture",
      "Unique value proposition development",
    ],
  },
  {
    id: "identity",
    tag: "02 — Identity",
    title: "Visual Identity & Logo Design",
    desc: "From the first sketch to the final brand guidelines, we craft visual identities that are bold, consistent, and built to last across every touchpoint.",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    accent: "blue",
    bullets: [
      "Logo design & full icon system",
      "Typography & colour palette curation",
      "Brand guidelines document (PDF)",
      "Pattern, texture & visual language",
    ],
  },
  {
    id: "collateral",
    tag: "03 — Collateral",
    title: "Print & Digital Collateral",
    desc: "Business cards, letterheads, flyers, banners, social templates — every piece of branded material designed to command attention and drive recall.",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
    accent: "green",
    bullets: [
      "Business cards & stationery",
      "Brochures, flyers & print materials",
      "Outdoor & event banners",
      "Social media template kits",
    ],
  },
  {
    id: "voice",
    tag: "04 — Voice",
    title: "Brand Voice & Copywriting",
    desc: "Your brand speaks constantly — on your website, in your emails, on social media. We make sure every word reinforces your identity and moves people to act.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    accent: "orange",
    bullets: [
      "Brand voice & tone guidelines",
      "Taglines & key messaging",
      "Website & landing page copy",
      "Brand storytelling framework",
    ],
  },
];

const PORTFOLIO = [
  {
    id: 1,
    label: "Business Cards",
    category: "Print",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&q=80",
    wide: false,
  },
  {
    id: 2,
    label: "Brand Identity System",
    category: "Identity",
    img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=700&q=80",
    wide: true,
  },
  {
    id: 3,
    label: "Event Banner Design",
    category: "Print",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
    wide: false,
  },
  {
    id: 4,
    label: "Packaging Design",
    category: "Collateral",
    img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=700&q=80",
    wide: false,
  },
  {
    id: 5,
    label: "Social Media Kit",
    category: "Digital",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&q=80",
    wide: false,
  },
  {
    id: 6,
    label: "Flyer & Brochure",
    category: "Print",
    img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=700&q=80",
    wide: true,
  },
  {
    id: 7,
    label: "Corporate Stationery",
    category: "Print",
    img: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=700&q=80",
    wide: false,
  },
  {
    id: 8,
    label: "Logo Variations",
    category: "Identity",
    img: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=700&q=80",
    wide: false,
  },
];

const STATS = [
  { value: "200+", label: "Brands Built" },
  { value: "8+", label: "Years Experience" },
  { value: "98%", label: "Client Retention" },
  { value: "15+", label: "Industry Sectors" },
];

const CATEGORIES = ["All", "Identity", "Print", "Collateral", "Digital"];

/* Portfolio category → accent colour, so the gallery reads as a rotation
   rather than a single repeated brand colour */
const CATEGORY_COLOR = {
  Identity: "var(--color-brand-blue-light)",
  Print: "var(--color-brand-orange)",
  Collateral: "var(--color-brand-green-light)",
  Digital: "var(--color-brand-green-light)",
};

/* Accent tokens shared across the page — orange / blue / green kept in
   roughly equal rotation rather than letting one colour dominate */
const TAG_DOT_COLOR = {
  orange: "var(--color-brand-orange)",
  blue: "var(--color-brand-blue)",
  green: "var(--color-brand-green-light)",
};

const ACCENT_HEX = {
  orange: "var(--color-brand-orange)",
  blue: "var(--color-brand-blue)",
  green: "var(--color-brand-green)",
};

const ACCENT_CYCLE = ["orange", "blue", "green"];

/* ─── Small reusable components ─── */
function SectionTag({ label, color = "orange", className = "", style }) {
  return (
    <span className={`section-tag section-tag-${color} ${className}`} style={style}>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: TAG_DOT_COLOR[color] || TAG_DOT_COLOR.orange,
          display: "inline-block",
        }}
      />
      {label}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
══════════════════════════════════════════════════════════════ */
export default function Branding() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [heroLoaded, setHeroLoaded] = useState(false);

  const filteredPortfolio =
    activeCategory === "All"
      ? PORTFOLIO
      : PORTFOLIO.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        background: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
        overflowX: "hidden",
      }}
    >
      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <HeroSection heroLoaded={heroLoaded} />

      {/* ── 2. STATS — floating card overlapping the hero ─────── */}
      <StatsBar />

      {/* ── 3. INTRO / WHAT WE DO ───────────────────────────── */}
      <IntroSection />

      {/* ── 4. SERVICES (alternating layout) ───────────────── */}
      <ServicesSection />

      {/* ── 5. PROCESS ──────────────────────────────────────── */}
      <ProcessStrip />

      {/* ── 6. PORTFOLIO GALLERY ────────────────────────────── */}
      <PortfolioSection
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        filteredPortfolio={filteredPortfolio}
      />

      {/* ── 7. CTA BANNER ───────────────────────────────────── */}
      <CtaBanner />
    </div>
  );
}

/* ══════ HERO ══════ */
function HeroSection({ heroLoaded }) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background image — drifts on scroll, zooms in gently on load */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <ParallaxLayer
          speed={34}
          style={{ position: "absolute", inset: "-10% 0", height: "120%" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${HERO_BG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.22)",
              transform: heroLoaded ? "scale(1.04)" : "scale(1.14)",
              transition: "transform 8s ease-out",
            }}
          />
        </ParallaxLayer>
      </div>

      {/* Dot grid overlay */}
      <div
        className="bg-dot-grid"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          zIndex: 1,
        }}
      />

      {/* Glow blobs — orange, blue, green in roughly equal presence */}
      <div
        className="glow-orange"
        style={{
          width: 700,
          height: 700,
          top: "-15%",
          left: "-10%",
          zIndex: 1,
        }}
      />
      <ParallaxLayer
        speed={-26}
        style={{
          position: "absolute",
          bottom: "6%",
          right: "6%",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <div className="glow-blue" style={{ position: "relative", width: 500, height: 500 }} />
      </ParallaxLayer>
      <ParallaxLayer
        speed={22}
        style={{
          position: "absolute",
          top: "36%",
          left: "40%",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(91,126,60,0.16) 0%, transparent 65%)",
            filter: "blur(2px)",
            animation: "pulse-glow 6.5s ease-in-out infinite 0.6s",
          }}
        />
      </ParallaxLayer>

      {/* Content */}
      <div
        className="container-site"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div style={{ maxWidth: 820 }}>
          <Reveal type="up">
            <SectionTag
              label="Brand Identity & Strategy"
              color="orange"
              style={{ marginBottom: "1.5rem" }}
            />
          </Reveal>

          <Reveal type="up" delay={0.08}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                lineHeight: 1.05,
                color: "var(--color-neutral-0)",
                marginBottom: "1.75rem",
              }}
            >
              A Brand That <span className="text-gradient-orange">Commands</span>
              <br />
              Attention.
            </h1>
          </Reveal>

          <Reveal type="up" delay={0.16}>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "rgba(245,245,245,0.65)",
                maxWidth: 560,
                lineHeight: 1.8,
                marginBottom: "2.5rem",
              }}
            >
              Your brand is more than a logo — it's the first impression, the
              lasting memory, and the reason customers choose you over
              competitors. Serenly crafts compelling brand identities that
              resonate.
            </p>
          </Reveal>
        </div>

        {/* Floating badge — hidden on smaller screens via Tailwind, not a
            broken always-off inline style */}
        <div
          className="hidden lg:block animate-float glass"
          style={{
            position: "absolute",
            right: "clamp(1rem, 6vw, 8rem)",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "1.5rem 2rem",
            borderRadius: "var(--radius-soft)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(239, 105, 5,0.3)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              fontFamily: "var(--font-display)",
              color: "var(--color-brand-orange)",
            }}
          >
            200+
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "rgba(245,245,245,0.6)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Brands Built
          </div>
          <div
            style={{
              width: "100%",
              height: 1,
              background: "rgba(255,255,255,0.1)",
              margin: "1rem 0",
            }}
          />
          <div
            style={{
              fontSize: "2rem",
              fontFamily: "var(--font-display)",
              color: "var(--color-brand-blue-light)",
            }}
          >
            98%
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "rgba(245,245,245,0.6)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Satisfaction
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
          background:
            "linear-gradient(to bottom, transparent, var(--color-bg-primary))",
          zIndex: 2,
        }}
      />

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(to bottom, rgba(239, 105, 5,0.7), transparent)",
            animation: "fade-up 1.5s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}

/* ══════ STATS BAR — floating card overlapping the hero's bottom edge ══════ */
function StatsBar() {
  return (
    <section style={{ position: "relative", zIndex: 5 }}>
      <div
        className="container-site"
        style={{ marginTop: "clamp(-3.5rem, -6vw, -5.5rem)" }}
      >
        <Reveal
          type="up"
          className="rounded-soft"
          style={{
            background: "var(--color-surface-raised)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-xl)",
            padding: "2.5rem clamp(1.5rem, 4vw, 3rem)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            {STATS.map((s, i) => {
              const accent = ACCENT_CYCLE[i % ACCENT_CYCLE.length];
              const special = accent === "green";
              return (
                <div
                  key={s.label}
                  className={special ? "rounded-soft" : ""}
                  style={{
                    padding: special ? "1rem" : 0,
                    background: special ? "rgba(201,211,243,0.16)" : "transparent",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2rem, 4vw, 2.75rem)",
                      color: ACCENT_HEX[accent],
                      lineHeight: 1,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-text-tertiary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontWeight: 600,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════ INTRO SECTION ══════ */
function IntroSection() {
  return (
    <section className="section-padding">
      <div className="container-site">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(3rem, 6vw, 7rem)",
            alignItems: "center",
          }}
          className="intro-grid"
        >
          {/* Left */}
          <Reveal type="left">
            <div>
              <SectionTag
                label="What We Do"
                color="orange"
                style={{ marginBottom: "1.25rem" }}
              />
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  marginBottom: "1.5rem",
                  lineHeight: 1.1,
                }}
              >
                We Build Brands That{" "}
                <span className="text-gradient-green">People Remember</span>
              </h2>
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.85,
                  marginBottom: "1.25rem",
                }}
              >
                In a world full of noise, forgettable brands lose. Serenly's
                branding process is rooted in strategy — understanding your
                audience, your competitors, and your ambitions before we ever open
                a design tool.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.85 }}>
                The result? A brand that doesn't just look good — it feels right,
                communicates clearly, and converts strangers into loyal customers
                across every channel.
              </p>

              <div
                style={{ marginTop: "2.5rem", display: "flex", gap: "2.5rem" }}
              >
                {[
                  { icon: "🎨", label: "Visual Identity" },
                  { icon: "📋", label: "Brand Strategy" },
                  { icon: "✍️", label: "Brand Voice" },
                ].map((item) => (
                  <div key={item.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "1.75rem", marginBottom: "0.4rem" }}>
                      {item.icon}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right — image mosaic */}
          <Reveal type="right" delay={0.12}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    borderRadius: "var(--radius-soft)",
                    overflow: "hidden",
                    aspectRatio: "3/4",
                    gridRow: "span 2",
                  }}
                >
                  <ParallaxLayer
                    speed={30}
                    style={{ position: "absolute", inset: "-10% 0", height: "120%" }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=500&q=80"
                      alt="Branding design"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </ParallaxLayer>
                </div>
                <div
                  style={{
                    position: "relative",
                    borderRadius: "var(--radius-soft)",
                    overflow: "hidden",
                    aspectRatio: "1/1",
                  }}
                >
                  <ParallaxLayer
                    speed={-20}
                    style={{ position: "absolute", inset: "-10% 0", height: "120%" }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
                      alt="Brand collateral"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </ParallaxLayer>
                </div>
                <div
                  style={{
                    position: "relative",
                    borderRadius: "var(--radius-soft)",
                    overflow: "hidden",
                    aspectRatio: "1/1",
                  }}
                >
                  <ParallaxLayer
                    speed={24}
                    style={{ position: "absolute", inset: "-10% 0", height: "120%" }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1561070791-36c11767b26a?w=500&q=80"
                      alt="Brand guidelines"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </ParallaxLayer>
                </div>
              </div>

              {/* Floating label */}
              <div
                className="bg-brand-periwinkle/15 backdrop-blur-xl border border-brand-periwinkle/40 rounded-soft"
                style={{
                  position: "absolute",
                  bottom: "-1.5rem",
                  left: "-1.5rem",
                  padding: "1rem 1.5rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    color: "var(--color-brand-green)",
                  }}
                >
                  ✦
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    marginTop: "0.25rem",
                  }}
                >
                  Strategy-First
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  Brand Design
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`@media(max-width:768px){ .intro-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ══════ SERVICES ══════ */
function ServicesSection() {
  return (
    <section
      style={{
        background: "var(--color-bg-secondary)",
        padding: "var(--spacing-section) 0",
      }}
    >
      <div className="container-site">
        <Reveal type="up" className="text-center" style={{ marginBottom: "5rem" }}>
          <SectionTag label="Our Services" color="blue" style={{ marginBottom: "1.25rem" }} />
          <h2 style={{ fontFamily: "var(--font-display)" }}>
            Everything Your Brand <span className="text-gradient-blue">Needs</span>
          </h2>
          <p
            style={{
              maxWidth: 520,
              margin: "1rem auto 0",
              fontSize: "1.05rem",
            }}
          >
            From strategy to execution — we handle every dimension of your brand
            identity so it's consistent, compelling, and conversion-ready.
          </p>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.id} type="up" delay={(i % 2) * 0.06}>
              <ServiceRow svc={svc} reverse={i % 2 !== 0} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICE_ACCENT = {
  orange: {
    tagColor: "var(--color-brand-orange)",
    tagBorder: "rgba(239, 105, 5,0.3)",
    bulletBg: "rgba(239, 105, 5,0.12)",
    bulletBorder: "rgba(239, 105, 5,0.3)",
    bulletColor: "var(--color-brand-orange)",
  },
  blue: {
    tagColor: "var(--color-brand-blue-light)",
    tagBorder: "rgba(0, 85, 218,0.3)",
    bulletBg: "rgba(0, 85, 218,0.08)",
    bulletBorder: "rgba(0, 85, 218,0.25)",
    bulletColor: "var(--color-brand-blue)",
  },
  green: {
    tagColor: "var(--color-brand-green-light)",
    tagBorder: "rgba(91, 126, 60,0.4)",
    bulletBg: "rgba(91, 126, 60,0.12)",
    bulletBorder: "rgba(91, 126, 60,0.3)",
    bulletColor: "var(--color-brand-green-light)",
  },
};

function ServiceRow({ svc, reverse, index = 0 }) {
  const accent = SERVICE_ACCENT[svc.accent] || SERVICE_ACCENT.orange;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(2rem, 5vw, 6rem)",
        alignItems: "center",
        direction: reverse ? "rtl" : "ltr",
      }}
      className="svc-row"
    >
      {/* Image */}
      <div style={{ direction: "ltr", position: "relative" }}>
        <div
          style={{
            position: "relative",
            borderRadius: "var(--radius-soft)",
            overflow: "hidden",
            aspectRatio: "4/3",
          }}
        >
          <ParallaxLayer
            speed={index % 2 === 0 ? 26 : -18}
            style={{ position: "absolute", inset: "-8% 0", height: "116%" }}
          >
            <img
              src={svc.image}
              alt={svc.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.6s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.04)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </ParallaxLayer>
          {/* Tag overlay */}
          <div
            style={{
              position: "absolute",
              top: "1.25rem",
              left: "1.25rem",
              zIndex: 2,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(12px)",
              borderRadius: "var(--radius-pill)",
              padding: "0.4rem 1rem",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: accent.tagColor,
              border: `1px solid ${accent.tagBorder}`,
            }}
          >
            {svc.tag}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ direction: "ltr" }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            marginBottom: "1rem",
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
          }}
        >
          {svc.title}
        </h3>
        <p style={{ fontSize: "1rem", lineHeight: 1.85, marginBottom: "2rem" }}>
          {svc.desc}
        </p>

        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.875rem",
          }}
        >
          {svc.bullets.map((b) => (
            <li
              key={b}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                fontSize: "0.9375rem",
                color: "var(--color-text-secondary)",
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: accent.bulletBg,
                  border: `1px solid ${accent.bulletBorder}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: accent.bulletColor,
                  fontSize: "0.7rem",
                }}
              >
                ✓
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ══════ PROCESS STRIP ══════ */
const PROCESS_CIRCLE_BG = {
  orange: "linear-gradient(135deg, #ef6905, #ff8a2e)",
  blue: "linear-gradient(135deg, #0055da, #3878e6)",
  green: "linear-gradient(135deg, #5b7e3c, #7a9c59)",
};
const PROCESS_CIRCLE_SHADOW = {
  orange: "var(--shadow-orange)",
  blue: "var(--shadow-blue)",
  green: "0 12px 40px rgba(91, 126, 60, 0.35)",
};

function ProcessStrip() {
  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "Deep-dive into your business, audience & goals",
    },
    {
      num: "02",
      title: "Strategy",
      desc: "Positioning, messaging architecture & brand map",
    },
    {
      num: "03",
      title: "Design",
      desc: "Visual identity, logo system & colour palette",
    },
    {
      num: "04",
      title: "Collateral",
      desc: "All branded materials & templates delivered",
    },
    {
      num: "05",
      title: "Launch",
      desc: "Brand guidelines, handoff & ongoing support",
    },
  ];
  return (
    <section className="section-padding" style={{ position: "relative", overflow: "hidden" }}>
      <ParallaxLayer
        speed={-24}
        className="absolute -top-24 -right-20 w-[380px] h-[380px] pointer-events-none"
        style={{
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(91,126,60,0.09) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="container-site" style={{ position: "relative", zIndex: 1 }}>
        <Reveal type="up" className="text-center" style={{ marginBottom: "4rem" }}>
          <SectionTag label="Our Process" color="green" style={{ marginBottom: "1.25rem" }} />
          <h2
            style={{ fontFamily: "var(--font-display)" }}
          >
            How We Build Your Brand
          </h2>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "0",
            position: "relative",
          }}
        >
          {/* Connector line */}
          <div
            style={{
              position: "absolute",
              top: "2.25rem",
              left: "10%",
              right: "10%",
              height: 1,
              background:
                "linear-gradient(90deg, var(--color-brand-orange), var(--color-brand-green), var(--color-brand-blue))",
              opacity: 0.3,
              zIndex: 0,
            }}
            className="process-line"
          />

          {steps.map((step, i) => {
            const accent = ACCENT_CYCLE[i % ACCENT_CYCLE.length];
            return (
              <Reveal
                key={step.num}
                type="up"
                delay={i * 0.08}
                style={{
                  textAlign: "center",
                  padding: "0 1.5rem",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Circle */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: PROCESS_CIRCLE_BG[accent],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    color: "#f5f5f5",
                    boxShadow: PROCESS_CIRCLE_SHADOW[accent],
                  }}
                >
                  {step.num}
                </div>
                <h5
                  style={{
                    fontFamily: "var(--font-display)",
                    marginBottom: "0.5rem",
                    fontSize: "1.1rem",
                  }}
                >
                  {step.title}
                </h5>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
      <style>{`@media(max-width:768px){ .process-line { display: none; } }`}</style>
    </section>
  );
}

/* ══════ PORTFOLIO GALLERY ══════ */
function PortfolioSection({
  activeCategory,
  setActiveCategory,
  filteredPortfolio,
}) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section
      id="portfolio"
      style={{
        background: "var(--color-bg-secondary)",
        padding: "var(--spacing-section) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ParallaxLayer
        speed={26}
        className="absolute -bottom-24 -left-16 w-[420px] h-[420px] pointer-events-none"
        style={{
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(239,105,5,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container-site" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Reveal type="up" className="text-center" style={{ marginBottom: "3rem" }}>
          <SectionTag label="Portfolio" color="green" style={{ marginBottom: "1.25rem" }} />
          <h2
            style={{ fontFamily: "var(--font-display)" }}
          >
            Work We're Proud Of
          </h2>
          <p
            style={{
              maxWidth: 480,
              margin: "1rem auto 0",
              fontSize: "1.05rem",
            }}
          >
            A selection of brand identities, print materials, and design systems
            we've built for clients across Kenya and beyond.
          </p>
        </Reveal>

        {/* Filter pills */}
        <Reveal
          type="up"
          delay={0.08}
          className="flex flex-wrap justify-center gap-3"
          style={{ marginBottom: "3rem" }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="rounded-pill"
              style={{
                padding: "0.5rem 1.25rem",
                border: "1.5px solid",
                borderColor:
                  activeCategory === cat
                    ? "var(--color-brand-orange)"
                    : "var(--color-border)",
                background:
                  activeCategory === cat
                    ? "rgba(239, 105, 5,0.1)"
                    : "transparent",
                color:
                  activeCategory === cat
                    ? "var(--color-brand-orange)"
                    : "var(--color-text-secondary)",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        {/* Masonry-style grid */}
        <div
          style={{
            columns: "3 280px",
            gap: "1.25rem",
          }}
        >
          {filteredPortfolio.map((item, i) => (
            <Reveal
              key={item.id}
              type="scale"
              delay={Math.min(i, 7) * 0.05}
              style={{ breakInside: "avoid", marginBottom: "1.25rem" }}
            >
              <div
                onClick={() => setLightbox(item)}
                style={{
                  borderRadius: "var(--radius-soft)",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "zoom-in",
                }}
                className="portfolio-item"
              >
                <img
                  src={item.img}
                  alt={item.label}
                  style={{
                    width: "100%",
                    display: "block",
                    objectFit: "cover",
                    transition: "transform 0.5s var(--ease-smooth)",
                  }}
                />
                {/* Hover overlay */}
                <div
                  className="portfolio-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color:
                        CATEGORY_COLOR[item.category] ||
                        "var(--color-brand-orange)",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {item.category}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      color: "#f5f5f5",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* View all CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a href="/contact" className="btn btn-outline-green btn-lg rounded-pill!">
            Start Your Branding Project
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            animation: "fade-in 0.2s ease",
          }}
        >
          <div
            style={{ maxWidth: 900, width: "100%", position: "relative" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.img}
              alt={lightbox.label}
              style={{
                width: "100%",
                borderRadius: "var(--radius-soft)",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "1.5rem 2rem",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                borderRadius: "0 0 var(--radius-soft) var(--radius-soft)",
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  color:
                    CATEGORY_COLOR[lightbox.category] ||
                    "var(--color-brand-orange)",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {lightbox.category}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  color: "#f5f5f5",
                }}
              >
                {lightbox.label}
              </div>
            </div>
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: "absolute",
                top: "-1rem",
                right: "-1rem",
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "var(--color-brand-orange)",
                border: "none",
                color: "#f5f5f5",
                cursor: "pointer",
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style>{`
        .portfolio-item:hover img { transform: scale(1.06); }
        .portfolio-item:hover .portfolio-overlay { opacity: 1; }
        @media(max-width: 768px) { .svc-row { grid-template-columns: 1fr !important; direction: ltr !important; } }
      `}</style>
    </section>
  );
}

/* ══════ CTA BANNER ══════ */
function CtaBanner() {
  return (
    <section className="section-padding">
      <div className="container-site">
        <Reveal
          type="scale"
          className="rounded-soft"
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 5rem)",
            background:
              "linear-gradient(135deg, #0c0c0e 0%, #111116 50%, #0c0c0e 100%)",
            border: "1px solid rgba(239, 105, 5,0.15)",
          }}
        >
          {/* Background blobs — orange, blue, green all present */}
          <div
            className="glow-orange"
            style={{
              width: 500,
              height: 500,
              top: "-30%",
              left: "-10%",
              opacity: 0.6,
            }}
          />
          <ParallaxLayer
            speed={-20}
            style={{
              position: "absolute",
              bottom: "-20%",
              right: "5%",
              pointerEvents: "none",
            }}
          >
            <div className="glow-blue" style={{ position: "relative", width: 400, height: 400, opacity: 0.5 }} />
          </ParallaxLayer>
          <ParallaxLayer
            speed={18}
            style={{
              position: "absolute",
              top: "8%",
              right: "24%",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(91,126,60,0.16) 0%, transparent 65%)",
                filter: "blur(60px)",
              }}
            />
          </ParallaxLayer>
          <div
            className="bg-brand-periwinkle/10"
            style={{
              position: "absolute",
              width: 320,
              height: 320,
              top: "20%",
              right: "20%",
              filter: "blur(70px)",
              pointerEvents: "none",
            }}
          />
          <div
            className="bg-dot-grid"
            style={{ position: "absolute", inset: 0, opacity: 0.3 }}
          />

          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <SectionTag label="Ready to Start?" color="orange" style={{ marginBottom: "1.25rem" }} />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--color-neutral-0)",
                marginBottom: "1.25rem",
              }}
            >
              Let's Build Something{" "}
              <span className="text-gradient-orange">Unforgettable</span>
            </h2>
            <p
              style={{
                color: "rgba(245,245,245,0.6)",
                fontSize: "1.05rem",
                maxWidth: 500,
                margin: "0 auto 2.5rem",
                lineHeight: 1.8,
              }}
            >
              Book a free brand consultation and let our team show you what a
              strategy-first brand identity can do for your business.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a href="/contact" className="btn btn-primary btn-xl rounded-pill!">
                Get Free Brand Audit
              </a>
              <Link
                to="/#portfolio"
                className="btn btn-ghost btn-xl rounded-pill!"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "#f5f5f5" }}
              >
                See More Work
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
