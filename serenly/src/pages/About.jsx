// src/pages/About.jsx
// Serenly — About Us Page
// Design: Inch-perfect GrowHub layout adapted to Serenly brand system
// Sections:
//   1. Hero banner — full-width image, dark overlay, centred title + breadcrumb
//   2. Company About — image mosaic left + badge, copy + bullets + CTA right
//   3. Stats bar — dark full-width strip, 4 icon+number+label columns
//   4. Mission/Vision/Goal — headline left, 3-tab switcher + content, image right
//   5. Testimonials — light bg, 2-col cards with avatar + stars
//   6. Team strip — brief team section
//   7. Latest Updates — 3-col blog/news cards

import React, { useEffect, useRef, useState } from "react";

/* ─── Unsplash placeholders ─── */
const HERO_BG =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80";
const ABOUT_IMG1 =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80";
const ABOUT_IMG2 =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80";
const MISSION_IMG =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80";
const TEAM_IMG1 =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80";
const TEAM_IMG2 =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80";
const TEAM_IMG3 =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80";
const TEAM_IMG4 =
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80";
const NEWS_IMG1 =
  "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80";
const NEWS_IMG2 =
  "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80";
const NEWS_IMG3 =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80";
const AVA1 =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80";
const AVA2 =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80";
const AVA3 =
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=120&q=80";
const AVA4 =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80";

/* ─── Data ─── */
const STATS = [
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 20c0-3-2-5.5-5-6.5" />
      </svg>
    ),
    val: "500+",
    label: "Happy Clients",
  },
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8h10M7 11h6" />
      </svg>
    ),
    val: "3",
    label: "Active Campaigns",
  },
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    val: "340%",
    label: "Average ROI",
  },
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    val: "8+",
    label: "Years of Experience",
  },
];

const TABS = [
  {
    id: "mission",
    label: "Our Mission",
    heading: "Our Company Mission",
    body: [
      "Serenly exists to level the playing field for ambitious businesses across Kenya and Africa. We believe every brand — regardless of size — deserves world-class digital marketing that drives real, measurable results.",
      "We combine strategic thinking with creative execution to help our clients dominate their digital spaces, build loyal audiences, and convert attention into consistent revenue growth.",
    ],
  },
  {
    id: "vision",
    label: "Our Vision",
    heading: "Where We're Going",
    body: [
      "Our vision is to become the most trusted digital growth partner for businesses across East and Central Africa — a name that brands mention when they talk about the agency that actually moved the needle.",
      "We're building a future where African businesses compete and win globally — powered by strategy-first digital marketing, local market expertise, and a relentless focus on outcomes over activity.",
    ],
  },
  {
    id: "goal",
    label: "Our Goal",
    heading: "What We're Building Towards",
    body: [
      "By 2027, Serenly aims to have helped 1,000+ businesses across Africa build powerful digital presences — through branding, social media, SEO, and web development done right.",
      "Every campaign we run, every brand we build, and every website we launch moves us closer to that goal: a continent of businesses that know exactly how to win online.",
    ],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Serenly completely transformed our online presence. Within three months of launching our new brand identity and SEO strategy, we saw a 218% increase in organic traffic and our leads nearly tripled.",
    name: "James Kariuki",
    title: "CEO, TechNairobi Solutions",
    avatar: AVA1,
    rating: 5,
  },
  {
    quote:
      "The SMM team at Serenly just gets it. Our Instagram went from 400 followers to over 12,000 in 8 months — and more importantly, our DMs are full of genuine enquiries every single week.",
    name: "Amina Hassan",
    title: "Founder, Amirah Beauty Kenya",
    avatar: AVA2,
    rating: 5,
  },
  {
    quote:
      "We hired Serenly to build our school management system and the result exceeded everything we expected. The admin portal, grading module, and parent portal all work flawlessly. Exceptional team.",
    name: "David Mwangi",
    title: "Principal, Sunrise Academy",
    avatar: AVA3,
    rating: 5,
  },
  {
    quote:
      "Our e-commerce store was built and launched in under 6 weeks with M-Pesa integration working perfectly from day one. Sales are up 4× compared to what we were doing before. Highly recommended.",
    name: "Cynthia Ouma",
    title: "Director, StyleHub Kenya",
    avatar: AVA4,
    rating: 5,
  },
];

const TEAM = [
  { name: "Brian Mutua", title: "Creative Director", img: TEAM_IMG1 },
  { name: "Aisha Kamau", title: "SEO & Content Lead", img: TEAM_IMG2 },
  { name: "Kevin Otieno", title: "Lead Developer", img: TEAM_IMG3 },
  { name: "Lily Njoroge", title: "Social Media Strategist", img: TEAM_IMG4 },
];

const NEWS = [
  {
    img: NEWS_IMG1,
    tag: "Digital Marketing",
    date: "Jan 15, 2026",
    title: "5 SEO Strategies That Are Dominating Kenyan Search in 2026",
    excerpt:
      "As Google's algorithm continues to evolve, these five strategies are the ones separating page-one brands from everyone else in Kenya's competitive digital landscape.",
  },
  {
    img: NEWS_IMG2,
    tag: "Social Media",
    date: "Jan 8, 2026",
    title:
      "Why Instagram Reels Are the Highest-ROI Content Format for Kenyan Brands",
    excerpt:
      "Short-form video has overtaken static posts across every metric — reach, engagement, and conversion. Here's how to use it without a big production budget.",
  },
  {
    img: NEWS_IMG3,
    tag: "Web Development",
    date: "Dec 22, 2025",
    title:
      "M-Pesa Integration: The Complete Guide for Kenyan E-Commerce in 2026",
    excerpt:
      "From Daraja API setup to UX best practices that reduce cart abandonment — everything your online store needs to accept M-Pesa payments flawlessly.",
  },
];

/* ─── Utilities ─── */
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

function StarRating({ count = 5 }) {
  return (
    <div style={{ display: "flex", gap: "0.2rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="var(--color-brand-orange)"
          stroke="none"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function About() {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <div
      style={{
        background: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
        overflowX: "hidden",
      }}
    >
      <HeroBanner />
      <CompanyAbout />
      <StatsBar />
      <MissionSection activeTab={activeTab} setActiveTab={setActiveTab} />
      <TestimonialsSection />
      <TeamSection />
      <LatestNews />
    </div>
  );
}

/* ══════ 1. HERO BANNER — GrowHub full-width image + teal overlay ══════ */
function HeroBanner() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "clamp(320px, 45vh, 500px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          backgroundPosition: "center 30%",
          transform: loaded ? "scale(1)" : "scale(1.04)",
          transition: "transform 1.2s var(--ease-smooth)",
        }}
      />

      {/* GrowHub-style dark teal overlay — adapted to Serenly dark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(12,12,14,0.82) 0%, rgba(0,35,80,0.75) 60%, rgba(12,12,14,0.8) 100%)",
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="bg-dot-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.25 }}
      />

      {/* Glow */}
      <div
        className="glow-orange"
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          top: "-20%",
          left: "10%",
          opacity: 0.3,
        }}
      />
      <div
        className="glow-blue"
        style={{
          position: "absolute",
          width: 350,
          height: 350,
          bottom: "-20%",
          right: "8%",
          opacity: 0.35,
        }}
      />

      {/* Content — centred like GrowHub */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s var(--ease-smooth)",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.75rem, 6vw, 4.5rem)",
            color: "var(--color-neutral-0)",
            marginBottom: "1rem",
            lineHeight: 1.05,
          }}
        >
          About <span className="text-gradient-orange">Us</span>
        </h1>

        {/* GrowHub breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
            color: "rgba(245,245,245,0.55)",
            fontWeight: 500,
          }}
        >
          <a
            href="/"
            style={{
              color: "rgba(245,245,245,0.55)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-brand-orange)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(245,245,245,0.55)")
            }
          >
            Serenly
          </a>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span style={{ color: "var(--color-brand-orange)" }}>About Us</span>
        </div>
      </div>
    </section>
  );
}

/* ══════ 2. COMPANY ABOUT — GrowHub image mosaic left + copy right ══════ */
function CompanyAbout() {
  const [ref, visible] = useFadeIn(0.1);

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
          className="about-grid"
        >
          {/* LEFT — Image mosaic (GrowHub overlapping photos + badge) */}
          <div
            style={{
              position: "relative",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-28px)",
              transition: "all 0.7s ease",
            }}
          >
            {/* Main large image */}
            <div
              style={{
                borderRadius: "var(--radius-2xl)",
                overflow: "hidden",
                width: "75%",
                aspectRatio: "3/4",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <img
                src={ABOUT_IMG1}
                alt="Serenly team"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Second overlapping image — GrowHub mosaic style */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                width: "55%",
                borderRadius: "var(--radius-2xl)",
                overflow: "hidden",
                aspectRatio: "1/1",
                boxShadow: "var(--shadow-xl)",
                border: "4px solid var(--color-bg-primary)",
              }}
            >
              <img
                src={ABOUT_IMG2}
                alt="Serenly work"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* GrowHub "25+ years" badge — adapted to "8+ Years" */}
            <div
              style={{
                position: "absolute",
                top: "2rem",
                right: "0",
                background:
                  "linear-gradient(135deg, var(--color-brand-blue), var(--color-brand-blue-light))",
                borderRadius: "var(--radius-xl)",
                padding: "1.25rem 1.5rem",
                textAlign: "center",
                boxShadow: "var(--shadow-blue)",
                minWidth: 110,
                zIndex: 3,
              }}
              className="animate-float"
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.25rem",
                  color: "#fff",
                  lineHeight: 1,
                  marginBottom: "0.3rem",
                }}
              >
                8+
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Years of
                <br />
                Experience
              </div>
            </div>

            {/* Bottom-left accent dot cluster */}
            <div
              style={{
                position: "absolute",
                bottom: "3rem",
                left: "-1rem",
                display: "grid",
                gridTemplateColumns: "repeat(4, 8px)",
                gap: "6px",
                pointerEvents: "none",
              }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--color-brand-orange)",
                    opacity: 0.25 + (i % 4) * 0.12,
                  }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — Copy (GrowHub: eyebrow + headline + bullets + CTA) */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(28px)",
              transition: "all 0.7s ease 0.15s",
            }}
          >
            <SectionTag label="Company About" color="orange" />

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 2.85rem)",
                lineHeight: 1.1,
                marginTop: "1.25rem",
                marginBottom: "1.25rem",
              }}
            >
              One of the fastest ways to{" "}
              <span className="text-gradient-orange">grow your business</span>{" "}
              in the digital age.
            </h2>

            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.85,
                marginBottom: "1.75rem",
              }}
            >
              Serenly is a results-driven digital marketing agency helping
              ambitious businesses across Kenya and Africa build powerful
              brands, dominate search, and convert online audiences into loyal
              customers. From startups to established enterprises — we make
              digital work.
            </p>

            {/* GrowHub "Development Special Services" bullets */}
            <div style={{ marginBottom: "2.25rem" }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  marginBottom: "0.875rem",
                  letterSpacing: "0.01em",
                }}
              >
                What Makes Serenly Different:
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.6rem 1.5rem",
                }}
              >
                {[
                  "Strategy-first approach",
                  "Measurable results always",
                  "Transparent monthly reports",
                  "Local & global expertise",
                  "Full-service under one roof",
                  "Dedicated account manager",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      fontSize: "0.9rem",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {/* GrowHub green checkmark — Serenly orange */}
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: "rgba(254,122,54,0.12)",
                        border: "1px solid rgba(254,122,54,0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--color-brand-orange)",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <a href="/contact" className="btn btn-primary btn-lg">
              Get a Quote
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
      </div>

      <style>{`@media(max-width:768px){ .about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ══════ 3. STATS BAR — GrowHub dark teal strip with 4 icon+number stats ══════ */
function StatsBar() {
  const [ref, visible] = useFadeIn(0.15);

  return (
    <div
      ref={ref}
      style={{
        /* GrowHub teal → Serenly dark with orange accent */
        background:
          "linear-gradient(135deg, #0c0c0e 0%, #111116 50%, #0c0c0e 100%)",
        borderTop: "1px solid rgba(254,122,54,0.15)",
        borderBottom: "1px solid rgba(254,122,54,0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background texture */}
      <div
        className="bg-line-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.12 }}
      />
      <div
        className="glow-orange"
        style={{
          position: "absolute",
          width: 500,
          height: 300,
          top: "-50%",
          left: "20%",
          opacity: 0.25,
        }}
      />

      <div
        className="container-site"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
          }}
          className="stats-bar-grid"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: "3rem 2rem",
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                borderRight:
                  i < STATS.length - 1
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "none",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `all 0.55s ease ${i * 0.12}s`,
              }}
            >
              {/* Icon circle — GrowHub style */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  flexShrink: 0,
                  border: `2px solid ${i % 2 === 0 ? "rgba(254,122,54,0.4)" : "rgba(0,70,255,0.4)"}`,
                  background:
                    i % 2 === 0
                      ? "rgba(254,122,54,0.08)"
                      : "rgba(0,70,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color:
                    i % 2 === 0
                      ? "var(--color-brand-orange)"
                      : "var(--color-brand-blue-light)",
                }}
              >
                {stat.icon}
              </div>
              {/* Value + label */}
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    color:
                      i % 2 === 0
                        ? "var(--color-brand-orange)"
                        : "var(--color-brand-blue-light)",
                    lineHeight: 1,
                    marginBottom: "0.3rem",
                  }}
                >
                  {stat.val}
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "rgba(245,245,245,0.5)",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:640px){ .stats-bar-grid { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
    </div>
  );
}

/* ══════ 4. MISSION / VISION / GOAL — GrowHub 3-tab left + image right ══════ */
function MissionSection({ activeTab, setActiveTab }) {
  const [ref, visible] = useFadeIn(0.1);
  const tab = TABS.find((t) => t.id === activeTab);

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      <div className="container-site">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(3rem, 6vw, 7rem)",
            alignItems: "center",
          }}
          className="mission-grid"
        >
          {/* LEFT — copy + tabs */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-28px)",
              transition: "all 0.7s ease",
            }}
          >
            <SectionTag label="About Mission" color="blue" />

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 2.85rem)",
                lineHeight: 1.1,
                marginTop: "1.25rem",
                marginBottom: "2rem",
              }}
            >
              Our Main Goal: to serve{" "}
              <span
                style={{ fontStyle: "italic" }}
                className="text-gradient-blue"
              >
                local & global clients
              </span>
            </h2>

            {/* GrowHub tab strip */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "2rem",
                background: "var(--color-bg-tertiary)",
                padding: "0.3rem",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--color-border)",
                width: "fit-content",
              }}
            >
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    padding: "0.55rem 1.25rem",
                    borderRadius: "var(--radius-full)",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    letterSpacing: "0.02em",
                    transition: "all 0.3s var(--ease-smooth)",
                    background:
                      activeTab === t.id
                        ? "linear-gradient(135deg, var(--color-brand-orange), #ff9a62)"
                        : "transparent",
                    color:
                      activeTab === t.id
                        ? "#fff"
                        : "var(--color-text-secondary)",
                    boxShadow:
                      activeTab === t.id ? "var(--shadow-orange)" : "none",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content — animated in */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            >
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  marginBottom: "1rem",
                  color: "var(--color-text-primary)",
                }}
              >
                {tab.heading}
              </h4>
              {tab.body.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "0.9875rem",
                    lineHeight: 1.85,
                    color: "var(--color-text-secondary)",
                    marginBottom: i < tab.body.length - 1 ? "1rem" : 0,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* RIGHT — image (GrowHub right image panel) */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(28px)",
              transition: "all 0.7s ease 0.15s",
              position: "relative",
            }}
          >
            <div
              style={{
                borderRadius: "var(--radius-2xl)",
                overflow: "hidden",
                aspectRatio: "4/3",
                boxShadow: "var(--shadow-xl)",
              }}
            >
              <img
                src={MISSION_IMG}
                alt="Team working"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right, rgba(254,122,54,0.15), transparent 60%)",
                }}
              />
            </div>

            {/* Floating quick-stat card */}
            <div
              style={{
                position: "absolute",
                bottom: "-1.5rem",
                left: "-1.5rem",
                background: "var(--color-surface)",
                border: "1px solid rgba(254,122,54,0.3)",
                borderRadius: "var(--radius-xl)",
                padding: "1.25rem 1.5rem",
                boxShadow: "var(--shadow-lg)",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
              className="animate-float"
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(254,122,54,0.1)",
                  border: "2px solid rgba(254,122,54,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.3rem",
                  flexShrink: 0,
                }}
              >
                🌍
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.4rem",
                    color: "var(--color-brand-orange)",
                    lineHeight: 1,
                  }}
                >
                  Kenya & Africa
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-text-tertiary)",
                    marginTop: "0.2rem",
                  }}
                >
                  Our Primary Market
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){ .mission-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ══════ 5. TESTIMONIALS — GrowHub "Trusted By" 2-col cards ══════ */
function TestimonialsSection() {
  const [ref, visible] = useFadeIn(0.08);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--color-bg-tertiary)",
        padding: "var(--spacing-section) 0",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="container-site">
        {/* GrowHub centred header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <SectionTag label="Our Experiences" color="orange" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              marginTop: "1.25rem",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            Trusted by{" "}
            <span className="text-gradient-orange">500+ Clients</span>
          </h2>
          <p
            style={{
              maxWidth: 500,
              margin: "1rem auto 0",
              fontSize: "1.05rem",
            }}
          >
            Don't just take our word for it — here's what some of our clients
            across Kenya and Africa have to say about working with Serenly.
          </p>
        </div>

        {/* 2×2 testimonial card grid — GrowHub layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
          className="testimonials-grid"
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-xl)",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.55s ease ${i * 0.1}s`,
                boxShadow: "var(--shadow-sm)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(254,122,54,0.3)";
                e.currentTarget.style.boxShadow = "var(--shadow-orange)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Large quote mark — decorative */}
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1.5rem",
                  fontFamily: "var(--font-display)",
                  fontSize: "6rem",
                  lineHeight: 1,
                  color: "rgba(254,122,54,0.07)",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                "
              </div>

              {/* Quote text */}
              <p
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.8,
                  color: "var(--color-text-secondary)",
                  marginBottom: "1.75rem",
                  fontStyle: "italic",
                }}
              >
                "{t.quote}"
              </p>

              {/* GrowHub bottom row: avatar + name + stars */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                  }}
                >
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid var(--color-border)",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.9375rem",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--color-text-tertiary)",
                        marginTop: "0.1rem",
                      }}
                    >
                      {t.title}
                    </div>
                  </div>
                </div>
                <StarRating count={t.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:768px){ .testimonials-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ══════ 6. TEAM ══════ */
function TeamSection() {
  const [ref, visible] = useFadeIn(0.1);

  return (
    <section ref={ref} className="section-padding">
      <div className="container-site">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionTag label="Our Team" color="blue" />
          <h2
            style={{ fontFamily: "var(--font-display)", marginTop: "1.25rem" }}
          >
            The People Behind{" "}
            <span className="text-gradient-blue">Serenly</span>
          </h2>
          <p
            style={{
              maxWidth: 480,
              margin: "1rem auto 0",
              fontSize: "1.05rem",
            }}
          >
            A tight-knit team of strategists, creatives, engineers, and data
            people — all obsessed with making your brand grow.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
          }}
          className="team-grid"
        >
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              style={{
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.55s ease ${i * 0.1}s`,
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  i % 2 === 0 ? "rgba(254,122,54,0.4)" : "rgba(0,70,255,0.35)";
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  i % 2 === 0 ? "var(--shadow-orange)" : "var(--shadow-blue)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.06)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)",
                  }}
                />
              </div>
              <div style={{ padding: "1.25rem" }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  {member.name}
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color:
                      i % 2 === 0
                        ? "var(--color-brand-orange)"
                        : "var(--color-brand-blue)",
                  }}
                >
                  {member.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:768px){ .team-grid { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
    </section>
  );
}

/* ══════ 7. LATEST NEWS — GrowHub bottom news cards ══════ */
function LatestNews() {
  const [ref, visible] = useFadeIn(0.1);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--color-bg-secondary)",
        padding: "var(--spacing-section) 0",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="container-site">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <SectionTag label="Latest News Update" color="orange" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                marginTop: "1.25rem",
              }}
            >
              From the{" "}
              <span className="text-gradient-orange">Serenly Blog</span>
            </h2>
          </div>
          <a href="/blog" className="btn btn-ghost btn-md">
            View All Posts
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

        {/* 3-col news cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
          className="news-grid"
        >
          {NEWS.map((post, i) => (
            <article
              key={post.title}
              style={{
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.55s ease ${i * 0.12}s`,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(254,122,54,0.35)";
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "var(--shadow-orange)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Image */}
              <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                <img
                  src={post.img}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.06)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>

              {/* Content */}
              <div style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.875rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "var(--radius-full)",
                      background: "rgba(254,122,54,0.1)",
                      border: "1px solid rgba(254,122,54,0.25)",
                      color: "var(--color-brand-orange)",
                    }}
                  >
                    {post.tag}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    {post.date}
                  </span>
                </div>

                <h5
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    lineHeight: 1.35,
                    marginBottom: "0.75rem",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {post.title}
                </h5>

                <p
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    marginBottom: "1.25rem",
                  }}
                >
                  {post.excerpt}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "var(--color-brand-orange)",
                  }}
                >
                  Read More
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:768px){ .news-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
