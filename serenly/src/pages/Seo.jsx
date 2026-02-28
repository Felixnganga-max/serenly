// src/pages/SEO.jsx
// Serenly — SEO Optimization Service Page
// Design: Fusion of Compatto (full-bleed hero + numbered steps + bento grid)
//         and Phlox (split stats + headline left / cards right layout)
// Stack: React + Tailwind v4 CSS tokens (index.css)

import React, { useEffect, useRef, useState } from "react";

/* ─── Unsplash placeholders ─── */
const HERO_BG =
  "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1600&q=80";
const AUDIT_IMG =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80";
const ONPAGE_IMG =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80";
const LINK_IMG =
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=80";
const LOCAL_IMG =
  "https://images.unsplash.com/photo-1569168713092-2aa02a9c97e2?w=900&q=80";

/* ─── Data ─── */
const STATS = [
  { val: "340%", label: "Average ROI", accent: "orange" },
  { val: "#1", label: "Page Rankings", accent: "blue" },
  { val: "12k+", label: "Leads Generated", accent: "orange" },
  { val: "98%", label: "Client Retention", accent: "blue" },
];

const SEO_SERVICES = [
  {
    id: "audit",
    num: "01",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
    title: "SEO Audit & Strategy",
    short:
      "Deep technical and content audit that maps every gap between you and page one.",
    accent: "orange",
    badge: "Foundation",
    image: AUDIT_IMG,
    features: [
      "Full technical SEO crawl & health report",
      "Keyword gap analysis vs. top competitors",
      "Content opportunity mapping",
      "Core Web Vitals & page speed audit",
      "Backlink profile analysis",
      "12-month SEO roadmap with priorities",
    ],
  },
  {
    id: "onpage",
    num: "02",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: "On-Page Optimisation",
    short:
      "Every page tuned for search engines and humans — so rankings rise and bounce rates fall.",
    accent: "blue",
    badge: "Core SEO",
    image: ONPAGE_IMG,
    features: [
      "Title tags, meta descriptions & heading hierarchy",
      "Semantic keyword integration into content",
      "Schema markup & structured data implementation",
      "Image compression, alt text & lazy loading",
      "Internal linking architecture overhaul",
      "URL structure & canonical tag management",
    ],
  },
  {
    id: "linkbuilding",
    num: "03",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: "Link Building & Off-Page",
    short:
      "High-authority backlinks that signal trust and push you past competitors who've been stuck for years.",
    accent: "orange",
    badge: "Authority",
    image: LINK_IMG,
    features: [
      "Manual outreach to DA 40+ publications",
      "Guest posting on relevant industry sites",
      "Digital PR & brand mention campaigns",
      "Broken link building & resource page targeting",
      "Competitor backlink gap exploitation",
      "Monthly link acquisition reports",
    ],
  },
  {
    id: "local",
    num: "04",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Local SEO",
    short:
      "Dominate Nairobi, Kenya and East African searches — so customers near you find you first.",
    accent: "blue",
    badge: "Local Domination",
    image: LOCAL_IMG,
    features: [
      "Google Business Profile setup & optimisation",
      "NAP consistency audit across all directories",
      "Local keyword targeting & content strategy",
      "Review generation & reputation management",
      "Local citation building (500+ directories)",
      "Geo-targeted landing pages for key areas",
    ],
  },
];

const PROCESS_STEPS = [
  {
    num: "1",
    title: "Free SEO Audit",
    desc: "We run a comprehensive crawl of your site — technical health, keyword gaps, backlink profile, and competitor analysis — all delivered as a clear action report.",
    accent: "orange",
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80",
  },
  {
    num: "2",
    title: "Strategy & Roadmap",
    desc: "Based on audit findings, we build a prioritised 12-month SEO roadmap targeting the keywords and content gaps that will deliver the fastest and most significant ranking gains.",
    accent: "blue",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=80",
  },
  {
    num: "3",
    title: "Execution & Optimisation",
    desc: "Our team handles everything — on-page fixes, content creation, technical improvements, and link acquisition — executed to a tight monthly sprint schedule.",
    accent: "orange",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80",
  },
  {
    num: "4",
    title: "Report & Refine",
    desc: "Every month you receive a clear analytics report — rankings, traffic, leads, and conversions — with insights on what's working and where we're pushing next.",
    accent: "blue",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80",
  },
];

const BENTO_REASONS = [
  {
    id: "results",
    title: "Results, Not Vanity Metrics",
    desc: "We track rankings, organic traffic, leads, and revenue — not just impressions. Every report ties back to business outcomes.",
    accent: "orange",
    icon: "📈",
    size: "wide",
  },
  {
    id: "local",
    title: "Kenya & Africa Specialists",
    desc: "We understand the local search landscape, Swahili keyword intent, and what Kenyan consumers actually type into Google.",
    accent: "blue",
    icon: "🌍",
    size: "normal",
  },
  {
    id: "transparent",
    title: "Full Transparency",
    desc: "You get live dashboard access, monthly reports, and a direct line to your SEO strategist — no black boxes.",
    accent: "orange",
    icon: "🔍",
    size: "normal",
  },
  {
    id: "technical",
    title: "Technical + Content Combined",
    desc: "Most agencies do one or the other. We do both — so nothing is left on the table.",
    accent: "blue",
    icon: "⚙️",
    size: "normal",
  },
  {
    id: "speed",
    title: "Fast Onboarding",
    desc: "From audit to live execution in 14 days. No endless onboarding calls.",
    accent: "orange",
    icon: "⚡",
    size: "normal",
  },
  {
    id: "proven",
    title: "340% Average ROI",
    desc: "Across our SEO clients, the average return on investment over 12 months is 340% — backed by tracked data.",
    accent: "blue",
    icon: "✦",
    size: "wide",
  },
];

/* ─── Shared utilities ─── */
function useFadeIn(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
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

function SectionTag({ label, color = "orange" }) {
  return (
    <span className={`section-tag section-tag-${color}`}>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          display: "inline-block",
          background:
            color === "orange"
              ? "var(--color-brand-orange)"
              : "var(--color-brand-blue)",
        }}
      />
      {label}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════════ */
export default function SEO() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div
      style={{
        background: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
        overflowX: "hidden",
      }}
    >
      <HeroSection />
      <StatsRow />
      <ServicesIntroSection />
      <ProcessSection activeStep={activeStep} setActiveStep={setActiveStep} />
      <BentoSection />
      <ResultsStrip />
      <CtaBanner />
    </div>
  );
}

/* ══════ 1. HERO — full-bleed image with text overlay (Compatto style) ══════ */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "88vh",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      {/* Full-bleed background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          transform: loaded ? "scale(1)" : "scale(1.04)",
          transition: "transform 1.2s var(--ease-smooth)",
          filter: "brightness(0.28)",
        }}
      />

      {/* Layered overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(12,12,14,0.7) 0%, rgba(0,70,255,0.08) 100%)",
          zIndex: 1,
        }}
      />
      <div
        className="bg-dot-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.35, zIndex: 2 }}
      />

      {/* Glow blobs */}
      <div
        className="glow-orange"
        style={{
          width: 700,
          height: 700,
          top: "-10%",
          right: "5%",
          zIndex: 1,
          opacity: 0.5,
        }}
      />
      <div
        className="glow-blue"
        style={{
          width: 500,
          height: 500,
          bottom: "10%",
          left: "0%",
          zIndex: 1,
          opacity: 0.4,
        }}
      />

      {/* ── CONTENT ── */}
      <div
        className="container-site"
        style={{
          position: "relative",
          zIndex: 3,
          paddingBottom: "6rem",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 6rem)",
            alignItems: "flex-end",
          }}
          className="hero-grid"
        >
          {/* Left — main headline */}
          <div>
       
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
              Rank Higher.
              <br />
              Get Found.
              <br />
              <span className="text-gradient-orange">Grow Faster.</span>
            </h1>

            <p
              className="animate-fade-up delay-200"
              style={{
                fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                color: "rgba(245,245,245,0.65)",
                maxWidth: 520,
                lineHeight: 1.85,
                marginBottom: "2.5rem",
              }}
            >
              What good is a great website if no one finds it? Serenly builds
              search strategies that get your business ranking on page one —
              driving consistent, high-intent organic traffic that converts into
              real revenue.
            </p>

            <div
              className="animate-fade-up delay-300"
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: "3rem",
              }}
            >
              <a href="#audit" className="btn btn-primary btn-lg">
                Get Free SEO Audit
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
              <a
                href="#services"
                className="btn btn-ghost btn-lg"
                style={{ borderColor: "rgba(255,255,255,0.25)", color: "#fff" }}
              >
                See Our Services
              </a>
            </div>

            {/* Phlox-style service anchor links */}
            <div
              className="animate-fade-up delay-400"
              style={{
                display: "flex",
                gap: "1.75rem",
                flexWrap: "wrap",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                paddingTop: "1.5rem",
              }}
            >
              {["SEO Audit", "On-Page", "Link Building", "Local SEO"].map(
                (s, i) => (
                  <a
                    key={s}
                    href={`#${s.toLowerCase().replace(" ", "")}`}
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(245,245,245,0.45)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color =
                        "var(--color-brand-orange)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(245,245,245,0.45)")
                    }
                  >
                    {i > 0 && <span style={{ opacity: 0.3 }}>·</span>}
                    {s}
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Right — live ranking widget (Compatto floated card style) */}
          <div
            className="animate-slide-right delay-200 hero-right-col"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "flex-end",
            }}
          >
            {/* Fake SERP card */}
            <div
              className="glass"
              style={{
                borderRadius: "var(--radius-xl)",
                padding: "1.5rem",
                width: "100%",
                maxWidth: 400,
                background: "rgba(12,12,14,0.75)",
                border: "1px solid rgba(254,122,54,0.2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: 36,
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 1rem",
                    gap: "0.5rem",
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(245,245,245,0.4)"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(245,245,245,0.5)",
                    }}
                  >
                    digital marketing agency nairobi
                  </span>
                </div>
              </div>

              {/* SERP results */}
              {[
                {
                  rank: 1,
                  domain: "serenly.agency",
                  title: "Serenly | Top Digital Marketing Agency in Kenya",
                  highlight: true,
                },
                {
                  rank: 2,
                  domain: "competitor-a.co.ke",
                  title: "Digital Marketing Services Kenya",
                  highlight: false,
                },
                {
                  rank: 3,
                  domain: "competitor-b.com",
                  title: "Best Marketing Agency Nairobi",
                  highlight: false,
                },
              ].map((r) => (
                <div
                  key={r.rank}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    marginBottom: "0.5rem",
                    background: r.highlight
                      ? "rgba(254,122,54,0.08)"
                      : "transparent",
                    border: `1px solid ${r.highlight ? "rgba(254,122,54,0.25)" : "transparent"}`,
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.2rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: r.highlight
                          ? "var(--color-brand-orange)"
                          : "rgba(255,255,255,0.08)",
                        color: r.highlight ? "#fff" : "rgba(245,245,245,0.4)",
                        flexShrink: 0,
                      }}
                    >
                      {r.rank}
                    </span>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        color: r.highlight
                          ? "rgba(254,122,54,0.8)"
                          : "rgba(245,245,245,0.35)",
                        fontWeight: 600,
                      }}
                    >
                      {r.domain}
                    </span>
                    {r.highlight && (
                      <span
                        style={{
                          fontSize: "0.55rem",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          padding: "0.1rem 0.4rem",
                          borderRadius: "var(--radius-full)",
                          background: "rgba(254,122,54,0.15)",
                          color: "var(--color-brand-orange)",
                          textTransform: "uppercase",
                        }}
                      >
                        You
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: r.highlight
                        ? "rgba(245,245,245,0.9)"
                        : "rgba(245,245,245,0.4)",
                      paddingLeft: "1.5rem",
                      fontWeight: r.highlight ? 600 : 400,
                    }}
                  >
                    {r.title}
                  </div>
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "1rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "rgba(245,245,245,0.35)",
                  }}
                >
                  Keyword rank
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#22c55e",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                  ↑ 24 positions
                </span>
              </div>
            </div>

            {/* Mini stat cards row */}
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                width: "100%",
                maxWidth: 400,
              }}
            >
              {[
                {
                  label: "Organic Traffic",
                  val: "+218%",
                  sub: "this quarter",
                  color: "orange",
                },
                {
                  label: "Avg. Position",
                  val: "3.2",
                  sub: "from 31.4",
                  color: "blue",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="glass"
                  style={{
                    flex: 1,
                    padding: "1rem",
                    borderRadius: "var(--radius-lg)",
                    border: `1px solid ${s.color === "orange" ? "rgba(254,122,54,0.2)" : "rgba(0,70,255,0.2)"}`,
                    background: "rgba(12,12,14,0.7)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "rgba(245,245,245,0.4)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      color:
                        s.color === "orange"
                          ? "var(--color-brand-orange)"
                          : "var(--color-brand-blue-light)",
                      lineHeight: 1,
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontSize: "0.65rem",
                      color: "rgba(245,245,245,0.35)",
                      marginTop: "0.2rem",
                    }}
                  >
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade — Compatto style */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 180,
          background:
            "linear-gradient(to bottom, transparent, var(--color-bg-primary))",
          zIndex: 3,
        }}
      />

      <style>{`
        @media(max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right-col { align-items: stretch !important; }
        }
      `}</style>
    </section>
  );
}

/* ══════ 2. STATS ROW — Compatto "numbers" card style ══════ */
function StatsRow() {
  const [ref, visible] = useFadeIn(0.15);

  return (
    <div
      ref={ref}
      style={{
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-surface-raised)",
      }}
    >
      <div className="container-site">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderLeft: "1px solid var(--color-border)",
          }}
          className="stats-row"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "2.5rem 2rem",
                borderRight: "1px solid var(--color-border)",
                borderTop: "1px solid var(--color-border)",
                position: "relative",
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `all 0.55s ease ${i * 0.1}s`,
              }}
            >
              {/* Subtle corner glow */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background:
                    s.accent === "orange"
                      ? "radial-gradient(circle, rgba(254,122,54,0.1) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(0,70,255,0.08) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  color:
                    s.accent === "orange"
                      ? "var(--color-brand-orange)"
                      : "var(--color-brand-blue)",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--color-text-tertiary)",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:640px){ .stats-row { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
    </div>
  );
}

/* ══════ 3. SERVICES INTRO — Phlox "headline left + 2×2 cards right" layout ══════ */
function ServicesIntroSection() {
  const [ref, visible] = useFadeIn(0.08);

  return (
    <section
      id="services"
      ref={ref}
      className="section-padding"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      <div className="container-site">
        {/* Top: headline LEFT + intro RIGHT — pure Phlox layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 7rem)",
            alignItems: "flex-end",
            marginBottom: "4.5rem",
          }}
          className="svc-header"
        >
          {/* Left headline */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-24px)",
              transition: "all 0.65s ease",
            }}
          >
            <SectionTag label="Our Services" color="orange" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
                lineHeight: 1.08,
                marginTop: "1.25rem",
              }}
            >
              We're here to make your{" "}
              <span className="text-gradient-orange">website</span> rank higher{" "}
              <span className="text-gradient-blue">and convert better.</span>
            </h2>

            <div
              style={{
                width: 48,
                height: 3,
                borderRadius: 2,
                background:
                  "linear-gradient(90deg, var(--color-brand-orange), var(--color-brand-blue))",
                margin: "1.5rem 0 2rem",
              }}
            />

            <a href="#audit" className="btn btn-primary btn-md">
              View All Services
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right intro text */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(24px)",
              transition: "all 0.65s ease 0.15s",
            }}
          >
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.85,
                marginBottom: "1.25rem",
              }}
            >
              SEO isn't a one-time fix — it's a compound strategy. The
              businesses that dominate search results are the ones that invest
              consistently in all four pillars: technical health, on-page
              relevance, authority, and local presence.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.85 }}>
              Serenly handles every pillar so you rank for the keywords your
              customers are actually typing into Google — and stay there.
            </p>
          </div>
        </div>

        {/* 2 × 2 service cards — Phlox icon cards layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
          className="svc-cards-grid"
        >
          {SEO_SERVICES.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} index={i} visible={visible} />
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width: 768px) {
          .svc-header { grid-template-columns: 1fr !important; }
          .svc-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function ServiceCard({ svc, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const isOrange = svc.accent === "orange";

  return (
    <a
      href={`#${svc.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        borderRadius: "var(--radius-xl)",
        padding: "2rem",
        background: "var(--color-surface)",
        border: "1px solid",
        borderColor: hovered
          ? isOrange
            ? "rgba(254,122,54,0.4)"
            : "rgba(0,70,255,0.35)"
          : "var(--color-border)",
        transition: "all 0.35s var(--ease-spring)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered
          ? isOrange
            ? "var(--shadow-orange)"
            : "var(--shadow-blue)"
          : "var(--shadow-sm)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 90}ms`,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background number watermark */}
      <div
        style={{
          position: "absolute",
          bottom: "-1rem",
          right: "1rem",
          fontFamily: "var(--font-display)",
          fontSize: "6rem",
          lineHeight: 1,
          fontWeight: 400,
          color: isOrange ? "rgba(254,122,54,0.05)" : "rgba(0,70,255,0.05)",
          userSelect: "none",
          pointerEvents: "none",
          transition: "color 0.3s ease",
        }}
      >
        {svc.num}
      </div>

      {/* Icon */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "var(--radius-md)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isOrange ? "rgba(254,122,54,0.1)" : "rgba(0,70,255,0.08)",
          border: `1px solid ${isOrange ? "rgba(254,122,54,0.25)" : "rgba(0,70,255,0.2)"}`,
          color: isOrange
            ? "var(--color-brand-orange)"
            : "var(--color-brand-blue)",
          marginBottom: "1.25rem",
          transition: "transform 0.3s var(--ease-spring)",
          transform: hovered ? "scale(1.1) rotate(-4deg)" : "scale(1)",
        }}
      >
        {svc.icon}
      </div>

      {/* Badge */}
      <div style={{ marginBottom: "0.75rem" }}>
        <span
          style={{
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0.25rem 0.65rem",
            borderRadius: "var(--radius-full)",
            background: isOrange
              ? "rgba(254,122,54,0.08)"
              : "rgba(0,70,255,0.07)",
            border: `1px solid ${isOrange ? "rgba(254,122,54,0.2)" : "rgba(0,70,255,0.18)"}`,
            color: isOrange
              ? "var(--color-brand-orange)"
              : "var(--color-brand-blue)",
          }}
        >
          {svc.badge}
        </span>
      </div>

      <h4
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.35rem",
          marginBottom: "0.6rem",
          color: hovered
            ? isOrange
              ? "var(--color-brand-orange)"
              : "var(--color-brand-blue)"
            : "var(--color-text-primary)",
          transition: "color 0.2s ease",
        }}
      >
        {svc.title}
      </h4>

      <p
        style={{
          fontSize: "0.9375rem",
          lineHeight: 1.75,
          color: "var(--color-text-secondary)",
          marginBottom: "1.5rem",
        }}
      >
        {svc.short}
      </p>

      {/* Mini feature list */}
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {svc.features.slice(0, 3).map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.6rem",
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                flexShrink: 0,
                marginTop: "0.15rem",
                background: isOrange
                  ? "rgba(254,122,54,0.12)"
                  : "rgba(0,70,255,0.09)",
                border: `1px solid ${isOrange ? "rgba(254,122,54,0.3)" : "rgba(0,70,255,0.25)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isOrange
                  ? "var(--color-brand-orange)"
                  : "var(--color-brand-blue)",
                fontSize: "0.55rem",
                fontWeight: 700,
              }}
            >
              ✓
            </span>
            {f}
          </li>
        ))}
        {svc.features.length > 3 && (
          <li
            style={{
              fontSize: "0.8rem",
              color: isOrange
                ? "var(--color-brand-orange)"
                : "var(--color-brand-blue)",
              fontWeight: 600,
              paddingLeft: "1.4rem",
            }}
          >
            + {svc.features.length - 3} more included
          </li>
        )}
      </ul>

      {/* Arrow CTA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: hovered ? "0.85rem" : "0.5rem",
          marginTop: "1.5rem",
          fontSize: "0.875rem",
          fontWeight: 700,
          color: isOrange
            ? "var(--color-brand-orange)"
            : "var(--color-brand-blue)",
          transition: "gap 0.25s ease",
        }}
      >
        Learn More
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
}

/* ══════ 4. PROCESS — Compatto numbered steps with image right ══════ */
function ProcessSection({ activeStep, setActiveStep }) {
  const [ref, visible] = useFadeIn(0.08);

  return (
    <section ref={ref} id="process" className="section-padding">
      <div className="container-site">
        <div style={{ marginBottom: "4rem" }}>
          <SectionTag label="How It Works" color="blue" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              marginTop: "1.25rem",
              maxWidth: 480,
            }}
          >
            How We <span className="text-gradient-blue">Simplify</span> Your SEO
            Journey
          </h2>
        </div>

        {/* Compatto layout: steps left panel + active image right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "start",
          }}
          className="process-grid"
        >
          {/* Left: numbered steps list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {PROCESS_STEPS.map((step, i) => {
              const isActive = activeStep === i;
              const isOrange = step.accent === "orange";
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(i)}
                  style={{
                    cursor: "pointer",
                    borderLeft: `3px solid ${
                      isActive
                        ? isOrange
                          ? "var(--color-brand-orange)"
                          : "var(--color-brand-blue)"
                        : "var(--color-border)"
                    }`,
                    paddingLeft: "2rem",
                    paddingBlock: "1.75rem",
                    transition: "all 0.3s ease",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-20px)",
                    transitionDelay: `${i * 0.1}s`,
                    background: isActive
                      ? "var(--color-bg-secondary)"
                      : "transparent",
                    borderRadius: isActive
                      ? `0 var(--radius-lg) var(--radius-lg) 0`
                      : 0,
                  }}
                >
                  {/* Big number — Compatto style */}
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "3rem",
                      lineHeight: 1,
                      color: isActive
                        ? isOrange
                          ? "var(--color-brand-orange)"
                          : "var(--color-brand-blue)"
                        : "var(--color-text-tertiary)",
                      marginBottom: "0.5rem",
                      transition: "color 0.3s ease",
                      opacity: isActive ? 1 : 0.4,
                    }}
                  >
                    {step.num}
                  </div>

                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.25rem",
                      marginBottom: "0.5rem",
                      color: isActive
                        ? "var(--color-text-primary)"
                        : "var(--color-text-secondary)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {step.title}
                  </h4>

                  {/* Description slides in when active */}
                  <div
                    style={{
                      maxHeight: isActive ? 120 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.4s var(--ease-smooth)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.9375rem",
                        lineHeight: 1.75,
                        paddingTop: "0.25rem",
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: active step image — Compatto image panel */}
          <div
            style={{
              position: "sticky",
              top: "6rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: "var(--radius-2xl)",
                overflow: "hidden",
                aspectRatio: "4/3",
              }}
            >
              {PROCESS_STEPS.map((step, i) => (
                <img
                  key={step.num}
                  src={step.image}
                  alt={step.title}
                  style={{
                    position: i === 0 ? "relative" : "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: activeStep === i ? 1 : 0,
                    transition: "opacity 0.5s ease",
                  }}
                />
              ))}

              {/* Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)",
                }}
              />

              {/* Step label overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  left: "1.5rem",
                  right: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color:
                      PROCESS_STEPS[activeStep].accent === "orange"
                        ? "var(--color-brand-orange)"
                        : "var(--color-brand-blue-light)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Step {PROCESS_STEPS[activeStep].num}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.35rem",
                    color: "#fff",
                  }}
                >
                  {PROCESS_STEPS[activeStep].title}
                </div>
              </div>
            </div>

            {/* Step dots */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginTop: "1.25rem",
                justifyContent: "center",
              }}
            >
              {PROCESS_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  style={{
                    width: activeStep === i ? 28 : 8,
                    height: 8,
                    borderRadius: "var(--radius-full)",
                    border: "none",
                    cursor: "pointer",
                    background:
                      activeStep === i
                        ? PROCESS_STEPS[i].accent === "orange"
                          ? "var(--color-brand-orange)"
                          : "var(--color-brand-blue)"
                        : "var(--color-border-strong)",
                    transition: "all 0.3s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width: 768px){ .process-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ══════ 5. BENTO GRID — "Why Choose Serenly" Compatto bottom cards ══════ */
function BentoSection() {
  const [ref, visible] = useFadeIn(0.08);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--color-bg-secondary)",
        padding: "var(--spacing-section) 0",
      }}
    >
      <div className="container-site">
        <div style={{ marginBottom: "3.5rem" }}>
          <SectionTag label="Why Serenly" color="orange" />
          <h2
            style={{ fontFamily: "var(--font-display)", marginTop: "1.25rem" }}
          >
            Why Choose <span className="text-gradient-orange">Serenly</span> for
            SEO
          </h2>
        </div>

        {/* Bento grid — mirrors Compatto bottom card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "auto auto",
            gap: "1.25rem",
          }}
          className="bento-grid"
        >
          {BENTO_REASONS.map((item, i) => {
            const isOrange = item.accent === "orange";
            const isWide = item.size === "wide";
            return (
              <div
                key={item.id}
                style={{
                  gridColumn: isWide ? "span 2" : "span 1",
                  borderRadius: "var(--radius-xl)",
                  padding: "2rem",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  position: "relative",
                  overflow: "hidden",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.55s ease ${i * 0.08}s`,
                }}
                className="bento-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = isOrange
                    ? "rgba(254,122,54,0.35)"
                    : "rgba(0,70,255,0.3)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = isOrange
                    ? "var(--shadow-orange)"
                    : "var(--shadow-blue)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Background number */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-1.5rem",
                    right: "1.5rem",
                    fontFamily: "var(--font-display)",
                    fontSize: "7rem",
                    lineHeight: 1,
                    color: isOrange
                      ? "rgba(254,122,54,0.05)"
                      : "rgba(0,70,255,0.05)",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  0{i + 1}
                </div>

                {/* Subtle top glow */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: isOrange
                      ? "linear-gradient(90deg, var(--color-brand-orange), transparent)"
                      : "linear-gradient(90deg, var(--color-brand-blue), transparent)",
                    opacity: 0.5,
                  }}
                />

                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                  {item.icon}
                </div>

                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    marginBottom: "0.75rem",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {item.title}
                </h4>

                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media(max-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
          }
          .bento-card {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ══════ 6. RESULTS STRIP — live ranking mockup ticker ══════ */
function ResultsStrip() {
  const [ref, visible] = useFadeIn(0.15);
  const keywords = [
    { kw: "digital marketing agency nairobi", pos: 1 },
    { kw: "seo services kenya", pos: 2 },
    { kw: "social media marketing nairobi", pos: 1 },
    { kw: "web design company kenya", pos: 3 },
    { kw: "branding agency nairobi", pos: 1 },
    { kw: "google ads management kenya", pos: 2 },
    { kw: "content marketing africa", pos: 4 },
    { kw: "ecommerce website kenya", pos: 2 },
  ];

  return (
    <section ref={ref} className="section-padding">
      <div className="container-site">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "center",
          }}
          className="results-grid"
        >
          {/* Left */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-24px)",
              transition: "all 0.65s ease",
            }}
          >
            <SectionTag label="Real Results" color="blue" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                marginTop: "1.25rem",
                marginBottom: "1.25rem",
              }}
            >
              Rankings We've <span className="text-gradient-blue">Earned</span>{" "}
              for Clients
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.85,
                marginBottom: "2rem",
              }}
            >
              Every position in this list is a real keyword our clients rank for
              today — not projections, not estimates. Just consistent,
              compounding organic results.
            </p>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {[
                { val: "+218%", label: "Organic traffic" },
                { val: "6mo", label: "Avg. to page one" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2.25rem",
                      color: "var(--color-brand-blue)",
                      lineHeight: 1,
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--color-text-tertiary)",
                      marginTop: "0.25rem",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — keyword ranking list */}
          <div
            style={{
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border)",
              overflow: "hidden",
              background: "var(--color-surface)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(24px)",
              transition: "all 0.65s ease 0.15s",
            }}
          >
            {/* Header bar */}
            <div
              style={{
                padding: "1rem 1.5rem",
                borderBottom: "1px solid var(--color-border)",
                background: "var(--color-surface-raised)",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 6px #22c55e",
                }}
              />
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-text-tertiary)",
                }}
              >
                Live Keyword Rankings — Serenly Clients
              </span>
            </div>

            {/* Column headers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                padding: "0.75rem 1.5rem",
                borderBottom: "1px solid var(--color-border-subtle)",
              }}
            >
              <span
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--color-text-tertiary)",
                }}
              >
                Keyword
              </span>
              <span
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--color-text-tertiary)",
                }}
              >
                Position
              </span>
            </div>

            {keywords.map((k, i) => (
              <div
                key={k.kw}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  padding: "0.9rem 1.5rem",
                  borderBottom:
                    i < keywords.length - 1
                      ? "1px solid var(--color-border-subtle)"
                      : "none",
                  alignItems: "center",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(12px)",
                  transition: `all 0.4s ease ${0.3 + i * 0.06}s`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(254,122,54,0.5)"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {k.kw}
                  </span>
                </div>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "var(--radius-sm)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      k.pos === 1
                        ? "rgba(254,122,54,0.12)"
                        : k.pos <= 3
                          ? "rgba(0,70,255,0.08)"
                          : "var(--color-bg-tertiary)",
                    border:
                      k.pos === 1
                        ? "1px solid rgba(254,122,54,0.3)"
                        : k.pos <= 3
                          ? "1px solid rgba(0,70,255,0.2)"
                          : "1px solid var(--color-border)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    color:
                      k.pos === 1
                        ? "var(--color-brand-orange)"
                        : k.pos <= 3
                          ? "var(--color-brand-blue)"
                          : "var(--color-text-tertiary)",
                  }}
                >
                  #{k.pos}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@media(max-width: 768px){ .results-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ══════ 7. CTA ══════ */
function CtaBanner() {
  const [ref, visible] = useFadeIn(0.2);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--color-bg-secondary)",
        padding: "var(--spacing-section) 0",
      }}
    >
      <div className="container-site">
        <div
          style={{
            borderRadius: "var(--radius-2xl)",
            overflow: "hidden",
            position: "relative",
            background:
              "linear-gradient(135deg, #0c0c0e 0%, #111116 55%, #0c0c0e 100%)",
            border: "1px solid rgba(0,70,255,0.15)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.7s ease",
          }}
        >
          <div
            className="bg-line-grid"
            style={{ position: "absolute", inset: 0, opacity: 0.2 }}
          />
          <div
            className="glow-blue"
            style={{
              width: 600,
              height: 600,
              top: "-30%",
              right: "-5%",
              opacity: 0.5,
            }}
          />
          <div
            className="glow-orange"
            style={{
              width: 450,
              height: 450,
              bottom: "-30%",
              left: "10%",
              opacity: 0.45,
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 5rem)",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "3rem",
              alignItems: "center",
            }}
            className="cta-inner"
          >
            <div>
              <SectionTag label="Free SEO Audit" color="blue" />
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                  color: "var(--color-neutral-0)",
                  marginTop: "1.25rem",
                  marginBottom: "1rem",
                  lineHeight: 1.1,
                }}
              >
                Ready to rank <span className="text-gradient-blue">#1</span> on
                Google?
              </h2>
              <p
                style={{
                  color: "rgba(245,245,245,0.55)",
                  fontSize: "1.05rem",
                  maxWidth: 500,
                  lineHeight: 1.8,
                }}
              >
                Get your free SEO audit today — we'll show you exactly where
                you're losing rankings, traffic, and revenue to competitors, and
                how to take it back.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                flexShrink: 0,
              }}
            >
              <a href="#contact" className="btn btn-secondary btn-lg">
                Get Free Audit
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
              <a
                href="#services"
                className="btn btn-ghost btn-lg"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){ .cta-inner { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
