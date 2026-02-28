// src/pages/Branding.jsx
// Serenly — Brand Identity & Strategy Service Page
// Stack: React + Tailwind v4 + Global CSS (index.css)
// Unsplash images used as placeholders — swap with your own assets later

import React, { useEffect, useRef, useState } from "react";

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
    accent: "orange",
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
    accent: "blue",
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

/* ─── Intersection observer hook for scroll animations ─── */
function useFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Small reusable components ─── */
function SectionTag({ label, color = "orange" }) {
  return (
    <span className={`section-tag section-tag-${color}`}>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background:
            color === "orange"
              ? "var(--color-brand-orange)"
              : "var(--color-brand-blue)",
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

      {/* ── 3. INTRO / WHAT WE DO ───────────────────────────── */}
      <IntroSection />

      {/* ── 4. SERVICES (alternating layout) ───────────────── */}
      <ServicesSection />

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
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.22)",
          transform: "scale(1.04)",
          transition: "transform 8s ease-out",
        }}
      />

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

      {/* Glow blobs */}
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
      <div
        className="glow-blue"
        style={{
          width: 500,
          height: 500,
          bottom: "5%",
          right: "5%",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="container-site"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div style={{ maxWidth: 820 }}>
          <h1
            className="animate-fade-up delay-100"
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

          <p
            className="animate-fade-up delay-200"
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
        </div>

        {/* Floating badge */}
        <div
          className="animate-float glass"
          style={{
            position: "absolute",
            right: "clamp(1rem, 6vw, 8rem)",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "1.5rem 2rem",
            borderRadius: "var(--radius-xl)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(254,122,54,0.3)",
            textAlign: "center",
            display: "none", // hidden on mobile via inline; shown via media below
          }}
          //   className="animate-float hero-badge glass"
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
              "linear-gradient(to bottom, rgba(254,122,54,0.7), transparent)",
            animation: "fade-up 1.5s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`.hero-badge { display: block; } @media(max-width:900px){ .hero-badge { display: none !important; } }`}</style>
    </section>
  );
}

/* ══════ STATS BAR ══════ */
function StatsBar() {
  const [ref, visible] = useFadeIn(0.2);
  return (
    <div
      ref={ref}
      style={{
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-surface-raised)",
        padding: "2.5rem 0",
      }}
    >
      <div className="container-site">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease ${i * 120}ms`,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
                  color:
                    i % 2 === 0
                      ? "var(--color-brand-orange)"
                      : "var(--color-brand-blue)",
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
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════ INTRO SECTION ══════ */
function IntroSection() {
  const [ref, visible] = useFadeIn(0.15);
  return (
    <section ref={ref} className="section-padding">
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
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.7s ease",
            }}
          >
            <SectionTag label="What We Do" color="orange" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                marginTop: "1.25rem",
                marginBottom: "1.5rem",
                lineHeight: 1.1,
              }}
            >
              We Build Brands That{" "}
              <span className="text-gradient-orange">People Remember</span>
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

          {/* Right — image mosaic */}
          <div
            style={{
              position: "relative",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(30px)",
              transition: "all 0.7s ease 0.2s",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=500&q=80"
                alt="Branding design"
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  borderRadius: "var(--radius-xl)",
                  gridRow: "span 2",
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
                alt="Brand collateral"
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  borderRadius: "var(--radius-xl)",
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1561070791-36c11767b26a?w=500&q=80"
                alt="Brand guidelines"
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  borderRadius: "var(--radius-xl)",
                }}
              />
            </div>

            {/* Floating label */}
            <div
              className="glass-orange"
              style={{
                position: "absolute",
                bottom: "-1.5rem",
                left: "-1.5rem",
                padding: "1rem 1.5rem",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  color: "var(--color-brand-orange)",
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
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <SectionTag label="Our Services" color="blue" />
          <h2
            style={{ fontFamily: "var(--font-display)", marginTop: "1.25rem" }}
          >
            Everything Your Brand Needs
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
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
          {SERVICES.map((svc, i) => (
            <ServiceRow key={svc.id} svc={svc} reverse={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ svc, reverse }) {
  const [ref, visible] = useFadeIn(0.15);
  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(2rem, 5vw, 6rem)",
        alignItems: "center",
        direction: reverse ? "rtl" : "ltr",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s ease",
      }}
      className="svc-row"
    >
      {/* Image */}
      <div style={{ direction: "ltr", position: "relative" }}>
        <div
          style={{
            borderRadius: "var(--radius-2xl)",
            overflow: "hidden",
            aspectRatio: "4/3",
          }}
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
        </div>
        {/* Tag overlay */}
        <div
          style={{
            position: "absolute",
            top: "1.25rem",
            left: "1.25rem",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(12px)",
            borderRadius: "var(--radius-full)",
            padding: "0.4rem 1rem",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color:
              svc.accent === "orange"
                ? "var(--color-brand-orange)"
                : "var(--color-brand-blue-light)",
            border: `1px solid ${svc.accent === "orange" ? "rgba(254,122,54,0.3)" : "rgba(0,70,255,0.3)"}`,
          }}
        >
          {svc.tag}
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
                  background:
                    svc.accent === "orange"
                      ? "rgba(254,122,54,0.12)"
                      : "rgba(0,70,255,0.08)",
                  border: `1px solid ${svc.accent === "orange" ? "rgba(254,122,54,0.3)" : "rgba(0,70,255,0.25)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color:
                    svc.accent === "orange"
                      ? "var(--color-brand-orange)"
                      : "var(--color-brand-blue)",
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
function ProcessStrip() {
  const [ref, visible] = useFadeIn(0.1);
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
    <section ref={ref} className="section-padding">
      <div className="container-site">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <SectionTag label="Our Process" color="orange" />
          <h2
            style={{ fontFamily: "var(--font-display)", marginTop: "1.25rem" }}
          >
            How We Build Your Brand
          </h2>
        </div>

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
                "linear-gradient(90deg, var(--color-brand-orange), var(--color-brand-blue))",
              opacity: 0.3,
              zIndex: 0,
            }}
            className="process-line"
          />

          {steps.map((step, i) => (
            <div
              key={step.num}
              style={{
                textAlign: "center",
                padding: "0 1.5rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.6s ease ${i * 100}ms`,
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
                  background:
                    i % 2 === 0
                      ? "linear-gradient(135deg, #fe7a36, #ff9a62)"
                      : "linear-gradient(135deg, #0046ff, #3369ff)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  color: "#fff",
                  boxShadow:
                    i % 2 === 0 ? "var(--shadow-orange)" : "var(--shadow-blue)",
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
            </div>
          ))}
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
  const [ref, visible] = useFadeIn(0.1);
  const [lightbox, setLightbox] = useState(null);

  return (
    <section
      ref={ref}
      id="portfolio"
      style={{
        background: "var(--color-bg-secondary)",
        padding: "var(--spacing-section) 0",
      }}
    >
      <div className="container-site">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <SectionTag label="Portfolio" color="blue" />
          <h2
            style={{ fontFamily: "var(--font-display)", marginTop: "1.25rem" }}
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
        </div>

        {/* Filter pills */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "3rem",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "var(--radius-full)",
                border: "1.5px solid",
                borderColor:
                  activeCategory === cat
                    ? "var(--color-brand-orange)"
                    : "var(--color-border)",
                background:
                  activeCategory === cat
                    ? "rgba(254,122,54,0.1)"
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
        </div>

        {/* Masonry-style grid */}
        <div
          style={{
            columns: "3 280px",
            gap: "1.25rem",
          }}
        >
          {filteredPortfolio.map((item, i) => (
            <div
              key={item.id}
              onClick={() => setLightbox(item)}
              style={{
                breakInside: "avoid",
                marginBottom: "1.25rem",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                position: "relative",
                cursor: "zoom-in",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease ${i * 80}ms`,
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
                    color: "var(--color-brand-orange)",
                    marginBottom: "0.3rem",
                  }}
                >
                  {item.category}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    color: "#fff",
                  }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a href="#contact" className="btn btn-outline-orange btn-lg">
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
                borderRadius: "var(--radius-xl)",
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
                borderRadius: "0 0 var(--radius-xl) var(--radius-xl)",
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-brand-orange)",
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
                  color: "#fff",
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
                color: "#fff",
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
  const [ref, visible] = useFadeIn(0.2);
  return (
    <section ref={ref} className="section-padding">
      <div className="container-site">
        <div
          style={{
            position: "relative",
            borderRadius: "var(--radius-2xl)",
            overflow: "hidden",
            padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 5rem)",
            background:
              "linear-gradient(135deg, #0c0c0e 0%, #111116 50%, #0c0c0e 100%)",
            border: "1px solid rgba(254,122,54,0.15)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          {/* Background blobs */}
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
          <div
            className="glow-blue"
            style={{
              width: 400,
              height: 400,
              bottom: "-20%",
              right: "5%",
              opacity: 0.5,
            }}
          />
          <div
            className="bg-dot-grid"
            style={{ position: "absolute", inset: 0, opacity: 0.3 }}
          />

          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <SectionTag label="Ready to Start?" color="orange" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--color-neutral-0)",
                marginTop: "1.25rem",
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
              <a href="#contact" className="btn btn-primary btn-xl">
                Get Free Brand Audit
              </a>
              <a
                href="#portfolio"
                className="btn btn-ghost btn-xl"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
              >
                See More Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
