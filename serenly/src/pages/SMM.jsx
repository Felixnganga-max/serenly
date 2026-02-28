// src/pages/SMM.jsx
// Serenly — Social Media Marketing Service Page
// Design: Inch-perfect iMedia.by structure adapted to Serenly brand system
// Layout:
//   1. Hero — floating white card on gradient bg, headline left + mock feed right, tab switcher below
//   2. Why We're The Best — centred headline + 3-col gradient cards
//   3. Split promo — illustration left, value prop right
//   4. Platform deep-dive — Facebook + Instagram tabs
//   5. Process — horizontal dot timeline (iMedia style)
//   6. Results strip — live metrics
//   7. CTA

import React, { useEffect, useRef, useState } from "react";

/* ─── Unsplash placeholders ─── */
const FB_IMG =
  "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80";
const IG_IMG =
  "https://images.unsplash.com/photo-1611162616305-c69b3037c431?w=800&q=80";
const TEAM_IMG =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80";
const DASH_IMG =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80";

/* ─── Platform tabs ─── */
const PLATFORMS = [
  {
    id: "facebook",
    label: "Facebook",
    color: "#1877F2",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    tagline: "Turn Scrollers Into Buyers",
    desc: "Facebook's 2.9B users are your audience. We find them, speak to them, and move them to act — through both organic content and precision paid campaigns.",
    services: [
      {
        title: "Page Management",
        detail: "Daily posts, community engagement & brand voice consistency",
      },
      {
        title: "Facebook Ads",
        detail:
          "Targeted campaigns by interest, behaviour, location & lookalike audiences",
      },
      {
        title: "Content Creation",
        detail:
          "Graphics, carousels, reels & copy engineered to stop the scroll",
      },
      {
        title: "Retargeting",
        detail:
          "Re-engage warm audiences who visited your site or watched your videos",
      },
      {
        title: "Audience Building",
        detail: "Custom & lookalike audiences built from your customer data",
      },
      {
        title: "Shop & Catalogue",
        detail:
          "Facebook Shop setup & product catalogue ads for e-commerce brands",
      },
    ],
  },
  {
    id: "instagram",
    label: "Instagram",
    color: "#E1306C",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
    tagline: "Build a Brand People Follow & Buy From",
    desc: "Instagram is where aesthetics meet commerce. We build feeds that attract followers, stories that drive daily engagement, and ads that convert without feeling like ads.",
    services: [
      {
        title: "Feed Curation",
        detail:
          "Consistent visual identity — grid planning, colour palette & aesthetic direction",
      },
      {
        title: "Reels & Stories",
        detail:
          "Short-form video content that reaches non-followers and drives saves & shares",
      },
      {
        title: "Instagram Ads",
        detail:
          "Awareness, traffic, conversion & lead generation campaigns in Meta Ads Manager",
      },
      {
        title: "Influencer Outreach",
        detail:
          "Micro-influencer collaborations for authentic reach in Kenya & East Africa",
      },
      {
        title: "Instagram Shop",
        detail:
          "Product tagging, shopping posts & checkout optimisation for e-commerce",
      },
      {
        title: "DM Automation",
        detail:
          "ManyChat flows that convert DM enquiries into booked calls or sales",
      },
    ],
  },
];

/* ─── Value cards (iMedia "Why best" section) ─── */
const VALUE_CARDS = [
  {
    icon: "🎯",
    title: "Results You Can See",
    desc: "Every campaign is tracked to actual business outcomes — followers, leads, bookings, and revenue. Not just likes.",
    accent: "orange",
  },
  {
    icon: "✍️",
    title: "Content That Converts",
    desc: "We don't post to post. Every piece of content is written, designed, and timed to move your audience closer to buying.",
    accent: "blue",
  },
  {
    icon: "📊",
    title: "Monthly Reports",
    desc: "Clear, jargon-free monthly reports showing growth, reach, engagement, and what we're doing next to push further.",
    accent: "orange",
  },
  {
    icon: "⚡",
    title: "Fast Turnaround",
    desc: "Content calendar planned 2 weeks ahead. You review and approve before anything goes live — always on schedule.",
    accent: "blue",
  },
  {
    icon: "🌍",
    title: "Local Market Expertise",
    desc: "We understand Kenyan audiences, Swahili content, local trends, and what actually resonates in East African markets.",
    accent: "orange",
  },
  {
    icon: "🔒",
    title: "One Agency, Everything Done",
    desc: "Strategy, content, posting, ads, community management — handled entirely by Serenly. One point of contact.",
    accent: "blue",
  },
];

/* ─── Process steps (iMedia horizontal timeline) ─── */
const PROCESS = [
  { num: 1, label: "Discovery & Audit", color: "var(--color-brand-orange)" },
  { num: 2, label: "Strategy & Calendar", color: "var(--color-brand-blue)" },
  { num: 3, label: "Content Creation", color: "#E1306C" },
  { num: 4, label: "Publish & Engage", color: "var(--color-brand-orange)" },
  { num: 5, label: "Report & Optimise", color: "var(--color-brand-blue)" },
];

/* ─── Metrics ─── */
// const METRICS = [
//   { val: "12k+", label: "Leads Generated", accent: "orange" },
//   { val: "8.7%", label: "Avg. Engagement", accent: "blue" },
//   { val: "2.4k", label: "Avg. Monthly Reach per Client", accent: "orange" },
//   { val: "3×", label: "Avg. ROAS on Paid", accent: "blue" },
// ];

/* ─── Hooks & helpers ─── */
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

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function SMM() {
  const [activePlatform, setActivePlatform] = useState("facebook");
  const platform = PLATFORMS.find((p) => p.id === activePlatform);

  return (
    <div
      style={{
        background: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
        overflowX: "hidden",
      }}
    >
      <HeroSection
        activePlatform={activePlatform}
        setActivePlatform={setActivePlatform}
        platform={platform}
      />
      <WhyBestSection />
      <SplitPromoSection />
      <PlatformDeepDive
        activePlatform={activePlatform}
        setActivePlatform={setActivePlatform}
        platform={platform}
      />
      <ProcessSection />

      <CtaBanner />
    </div>
  );
}

/* ══════ 1. HERO — iMedia floating card on gradient bg ══════ */
function HeroSection({ activePlatform, setActivePlatform, platform }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        /* iMedia gradient background */
        background:
          "linear-gradient(145deg, rgba(254,122,54,0.12) 0%, rgba(0,70,255,0.08) 40%, rgba(254,122,54,0.06) 100%)",
        paddingTop: "5rem",
        paddingBottom: "3rem",
      }}
    >
      {/* Floating blob decorations — iMedia style */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "6%",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(254,122,54,0.18) 0%, transparent 70%)",
          filter: "blur(2px)",
          animation: "float 7s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "8%",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,70,255,0.14) 0%, transparent 70%)",
          filter: "blur(2px)",
          animation: "float-delayed 6s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "3%",
          width: 90,
          height: 90,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(254,122,54,0.12) 0%, transparent 70%)",
          animation: "float 9s ease-in-out infinite 1s",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: 140,
          height: 140,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(225,48,108,0.1) 0%, transparent 70%)",
          animation: "float-delayed 8s ease-in-out infinite 0.5s",
          pointerEvents: "none",
        }}
      />

      {/* Dot grid subtle overlay */}
      <div
        className="bg-dot-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.2 }}
      />

      <div
        className="container-site"
        style={{ position: "relative", zIndex: 2, width: "100%" }}
      >
        {/* ── FLOATING HERO CARD (iMedia white card style) ── */}
        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-2xl)",
            boxShadow: "var(--shadow-xl)",
            padding: "clamp(2rem, 4vw, 3.5rem)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s var(--ease-smooth)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Subtle top gradient line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background:
                "linear-gradient(90deg, var(--color-brand-orange), var(--color-brand-blue), #E1306C)",
              borderRadius: "var(--radius-2xl) var(--radius-2xl) 0 0",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: "clamp(2rem, 4vw, 4rem)",
              alignItems: "center",
            }}
            className="hero-inner-grid"
          >
            {/* LEFT — Headline + feature list */}
            <div>
              {/* iMedia eyebrow */}
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-orange)",
                  marginBottom: "1rem",
                }}
                className="animate-fade-up delay-100"
              >
                Facebook & Instagram Marketing
              </p>

              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
                  lineHeight: 1.06,
                  marginBottom: "1.5rem",
                }}
                className="animate-fade-up delay-200"
              >
                Turn Followers{" "}
                <span className="text-gradient-orange">Into</span>
                <br />
                Paying <span className="text-gradient-blue">Customers.</span>
              </h1>

              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.85,
                  color: "var(--color-text-secondary)",
                  maxWidth: 480,
                  marginBottom: "2rem",
                }}
                className="animate-fade-up delay-300"
              >
                Social media is where your audience lives. Serenly makes sure
                your brand shows up, stands out, and converts — on Facebook and
                Instagram, every single day.
              </p>

              {/* iMedia feature list with icon thumbnails */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginBottom: "2.5rem",
                }}
              >
                {[
                  {
                    icon: "📱",
                    title: "Full Social Management",
                    sub: "Strategy, content, posting & community — all handled",
                  },
                  {
                    icon: "🎯",
                    title: "Paid Ads That Actually Work",
                    sub: "Facebook & Instagram campaigns optimised for your goal",
                  },
                  {
                    icon: "📈",
                    title: "Growth You Can Measure",
                    sub: "Monthly reports with real numbers that tie to revenue",
                  },
                ].map((f, i) => (
                  <div
                    key={f.title}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "0.9rem 1.1rem",
                      borderRadius: "var(--radius-lg)",
                      border: "1px solid var(--color-border)",
                      background: "var(--color-bg-secondary)",
                      opacity: loaded ? 1 : 0,
                      transform: loaded ? "translateX(0)" : "translateX(-16px)",
                      transition: `all 0.5s ease ${0.4 + i * 0.1}s`,
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "var(--radius-md)",
                        background:
                          i % 2 === 0
                            ? "rgba(254,122,54,0.1)"
                            : "rgba(0,70,255,0.08)",
                        border: `1px solid ${i % 2 === 0 ? "rgba(254,122,54,0.25)" : "rgba(0,70,255,0.2)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.25rem",
                        flexShrink: 0,
                      }}
                    >
                      {f.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          color: "var(--color-text-primary)",
                          marginBottom: "0.15rem",
                        }}
                      >
                        {f.title}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--color-text-tertiary)",
                        }}
                      >
                        {f.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                className="animate-fade-up delay-500"
              >
                <a href="#platforms" className="btn btn-primary btn-lg">
                  Explore Services
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
                <a href="#contact" className="btn btn-ghost btn-lg">
                  Get Free Audit
                </a>
              </div>
            </div>

            {/* RIGHT — Floating social metrics mock-up (iMedia 3D character position) */}
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
              className="animate-slide-right delay-200"
            >
              {/* Main mock phone/feed */}
              <div
                style={{
                  width: "100%",
                  maxWidth: 340,
                  borderRadius: "var(--radius-2xl)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-lg)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface-raised)",
                }}
              >
                {/* Mock social header */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #1877F2, #E1306C)",
                    padding: "1rem 1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                  >
                    S
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      Serenly
                    </div>
                    <div
                      style={{
                        fontSize: "0.65rem",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      @serenly.agency · Just now
                    </div>
                  </div>
                </div>

                <img
                  src={FB_IMG}
                  alt="Social post"
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Engagement row */}
                <div style={{ padding: "1rem 1.25rem" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "1.25rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {[
                      { icon: "❤️", val: "2.4k" },
                      { icon: "💬", val: "318" },
                      { icon: "↗️", val: "900" },
                    ].map((e) => (
                      <div
                        key={e.icon}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          fontSize: "0.8rem",
                          color: "var(--color-text-secondary)",
                          fontWeight: 600,
                        }}
                      >
                        <span>{e.icon}</span> {e.val}
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    Reach 48,290 · Engagement 8.7%
                  </div>
                </div>
              </div>

              {/* Floating metric badges (iMedia floating decorations style) */}
              <div
                className="animate-float"
                style={{
                  position: "absolute",
                  top: "-1rem",
                  right: "-0.5rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--color-surface)",
                  border: "1px solid rgba(254,122,54,0.3)",
                  boxShadow: "var(--shadow-md)",
                  textAlign: "center",
                  minWidth: 100,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    color: "var(--color-brand-orange)",
                    lineHeight: 1,
                  }}
                >
                  +12.4k
                </div>
                <div
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-text-tertiary)",
                    marginTop: "0.2rem",
                  }}
                >
                  New Followers
                </div>
              </div>

              <div
                className="animate-float-d"
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  left: "-1rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--color-surface)",
                  border: "1px solid rgba(0,70,255,0.25)",
                  boxShadow: "var(--shadow-md)",
                  textAlign: "center",
                  minWidth: 110,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    color: "var(--color-brand-blue)",
                    lineHeight: 1,
                  }}
                >
                  3× ROAS
                </div>
                <div
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-text-tertiary)",
                    marginTop: "0.2rem",
                  }}
                >
                  Paid Ads Return
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TAB SWITCHER below card — iMedia "Сайты / Реклама / ПО" tabs ── */}
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-full)",
              padding: "0.3rem",
              boxShadow: "var(--shadow-md)",
              gap: "0.25rem",
            }}
          >
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePlatform(p.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.6rem 1.5rem",
                  borderRadius: "var(--radius-full)",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  transition: "all 0.3s var(--ease-smooth)",
                  background:
                    activePlatform === p.id
                      ? `linear-gradient(135deg, ${p.color}22, ${p.color}44)`
                      : "transparent",
                  color:
                    activePlatform === p.id
                      ? p.color
                      : "var(--color-text-tertiary)",
                  boxShadow:
                    activePlatform === p.id
                      ? `0 4px 16px ${p.color}33`
                      : "none",
                  borderColor:
                    activePlatform === p.id ? `${p.color}55` : "transparent",
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
              >
                <span style={{ opacity: activePlatform === p.id ? 1 : 0.5 }}>
                  {p.icon}
                </span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Platform tagline under tabs */}
        <div
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "var(--color-text-tertiary)",
            letterSpacing: "0.05em",
          }}
        >
          <span style={{ color: platform.color }}>● </span>
          {platform.tagline}
        </div>
      </div>

      <style>{`
        @media(max-width: 820px) {
          .hero-inner-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ══════ 2. WHY WE'RE THE BEST — iMedia "Почему мы лучшие" 3-col cards ══════ */
function WhyBestSection() {
  const [ref, visible] = useFadeIn(0.08);

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      <div className="container-site">
        {/* Centred header — iMedia style */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <SectionTag label="Why Serenly" color="orange" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              marginTop: "1.25rem",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            Why We're the Best at{" "}
            <span className="text-gradient-orange">Social Media</span>
          </h2>
          <p
            style={{
              maxWidth: 520,
              margin: "1rem auto 0",
              fontSize: "1.05rem",
              lineHeight: 1.8,
            }}
          >
            We've managed Facebook and Instagram for brands across Kenya —
            here's what makes Serenly different from every other agency you've
            talked to.
          </p>
        </div>

        {/* 3-col card grid — iMedia card layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
          className="why-grid"
        >
          {VALUE_CARDS.map((card, i) => {
            const isOrange = card.accent === "orange";
            return (
              <div
                key={card.title}
                style={{
                  borderRadius: "var(--radius-xl)",
                  padding: "2rem",
                  /* iMedia gradient card background */
                  background: isOrange
                    ? "linear-gradient(145deg, rgba(254,122,54,0.06) 0%, rgba(254,122,54,0.02) 100%)"
                    : "linear-gradient(145deg, rgba(0,70,255,0.05) 0%, rgba(0,70,255,0.02) 100%)",
                  border: `1px solid ${isOrange ? "rgba(254,122,54,0.18)" : "rgba(0,70,255,0.15)"}`,
                  position: "relative",
                  overflow: "hidden",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.55s ease ${i * 0.08}s`,
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = isOrange
                    ? "var(--shadow-orange)"
                    : "var(--shadow-blue)";
                  e.currentTarget.style.borderColor = isOrange
                    ? "rgba(254,122,54,0.4)"
                    : "rgba(0,70,255,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = isOrange
                    ? "rgba(254,122,54,0.18)"
                    : "rgba(0,70,255,0.15)";
                }}
              >
                {/* iMedia thumbnail/icon area */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "var(--radius-md)",
                    background: isOrange
                      ? "rgba(254,122,54,0.12)"
                      : "rgba(0,70,255,0.09)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.75rem",
                    marginBottom: "1.25rem",
                    border: `1px solid ${isOrange ? "rgba(254,122,54,0.25)" : "rgba(0,70,255,0.2)"}`,
                  }}
                >
                  {card.icon}
                </div>

                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    marginBottom: "0.65rem",
                  }}
                >
                  {card.title}
                </h4>

                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>
                  {card.desc}
                </p>

                {/* Watermark number */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-1rem",
                    right: "1rem",
                    fontFamily: "var(--font-display)",
                    fontSize: "5rem",
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
              </div>
            );
          })}
        </div>
      </div>

      <style>{`@media(max-width:768px){ .why-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ══════ 3. SPLIT PROMO — iMedia illustration left, value prop right ══════ */
function SplitPromoSection() {
  const [ref, visible] = useFadeIn(0.1);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "var(--spacing-section) 0",
        /* iMedia gradient strip */
        background:
          "linear-gradient(135deg, rgba(254,122,54,0.07) 0%, rgba(0,70,255,0.05) 50%, rgba(225,48,108,0.05) 100%)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* Floating blobs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(254,122,54,0.1) 0%, transparent 70%)",
          filter: "blur(2px)",
          pointerEvents: "none",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "15%",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,70,255,0.08) 0%, transparent 70%)",
          filter: "blur(2px)",
          pointerEvents: "none",
          animation: "float-delayed 7s ease-in-out infinite 1s",
        }}
      />

      <div
        className="container-site"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 6rem)",
            alignItems: "center",
          }}
          className="promo-grid"
        >
          {/* LEFT — visual (iMedia 3D illustration area) */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-28px)",
              transition: "all 0.7s ease",
              position: "relative",
            }}
          >
            <div
              style={{
                borderRadius: "var(--radius-2xl)",
                overflow: "hidden",
                boxShadow: "var(--shadow-xl)",
                aspectRatio: "4/3",
              }}
            >
              <img
                src={TEAM_IMG}
                alt="Social media team"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right, rgba(254,122,54,0.2), transparent 60%)",
                }}
              />
            </div>

            {/* iMedia-style "5 days" badge — adapted as "30-day results" */}
            <div
              style={{
                position: "absolute",
                bottom: "-1.25rem",
                right: "-0.5rem",
                background:
                  "linear-gradient(135deg, var(--color-brand-orange), #ff9a62)",
                borderRadius: "var(--radius-xl)",
                padding: "1rem 1.5rem",
                boxShadow: "var(--shadow-orange)",
                textAlign: "center",
              }}
              className="animate-float"
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.6rem",
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                30
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.85)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginTop: "0.15rem",
                }}
              >
                Day Results
              </div>
            </div>
          </div>

          {/* RIGHT — value prop copy (iMedia right text block) */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(28px)",
              transition: "all 0.7s ease 0.15s",
            }}
          >
            <SectionTag label="What You Get" color="orange" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                marginTop: "1.25rem",
                marginBottom: "1.25rem",
                lineHeight: 1.1,
              }}
            >
              Your brand, active on social{" "}
              <span className="text-gradient-orange">every day</span> — without
              lifting a finger.
            </h2>

            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.85,
                marginBottom: "1.5rem",
              }}
            >
              Most businesses lose on social not because their product is bad —
              but because posting consistently, creating great content, and
              running smart ads is a full-time job. That's exactly what Serenly
              does for you.
            </p>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.85,
                marginBottom: "2.5rem",
              }}
            >
              From your first content strategy call to your 6th month of
              compounding organic growth — we handle everything. You just
              approve and watch the numbers climb.
            </p>

            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                flexWrap: "wrap",
                marginBottom: "2.5rem",
              }}
            >
              {[
                { icon: "🗓️", text: "Content Calendar" },
                { icon: "🎨", text: "Original Graphics" },
                { icon: "📣", text: "Ad Campaigns" },
                { icon: "💬", text: "Community Mgmt" },
              ].map((item) => (
                <div
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>{" "}
                  {item.text}
                </div>
              ))}
            </div>

            <a href="#contact" className="btn btn-primary btn-lg">
              Start Growing Today
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

      <style>{`@media(max-width:768px){ .promo-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ══════ 4. PLATFORM DEEP-DIVE — tabbed Facebook / Instagram expanded view ══════ */
function PlatformDeepDive({ activePlatform, setActivePlatform, platform }) {
  const [ref, visible] = useFadeIn(0.08);

  return (
    <section
      id="platforms"
      ref={ref}
      className="section-padding"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      <div className="container-site">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <SectionTag label="Platforms" color="blue" />
          <h2
            style={{ fontFamily: "var(--font-display)", marginTop: "1.25rem" }}
          >
            What We Do on Each Platform
          </h2>
          <p
            style={{
              maxWidth: 480,
              margin: "1rem auto 0",
              fontSize: "1.05rem",
            }}
          >
            Two platforms, two strategies, one seamless approach — each one
            optimised for how that audience actually behaves.
          </p>
        </div>

        {/* Tab buttons — styled like iMedia tab strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "3rem",
          }}
        >
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePlatform(p.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.75rem 2rem",
                borderRadius: "var(--radius-full)",
                border: `2px solid ${activePlatform === p.id ? p.color : "var(--color-border)"}`,
                background:
                  activePlatform === p.id
                    ? `${p.color}15`
                    : "var(--color-surface)",
                color:
                  activePlatform === p.id
                    ? p.color
                    : "var(--color-text-secondary)",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "all 0.3s var(--ease-smooth)",
                boxShadow:
                  activePlatform === p.id ? `0 8px 24px ${p.color}30` : "none",
              }}
            >
              {p.icon} {p.label}
            </button>
          ))}
        </div>

        {/* Active platform expanded view */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s ease",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(2rem, 4vw, 5rem)",
              alignItems: "center",
            }}
            className="deepdive-platform-grid"
          >
            {/* Left — platform image */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  borderRadius: "var(--radius-2xl)",
                  overflow: "hidden",
                  aspectRatio: "4/3",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <img
                  src={activePlatform === "facebook" ? FB_IMG : IG_IMG}
                  alt={platform.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "opacity 0.4s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(to top, ${platform.color}55 0%, transparent 55%)`,
                  }}
                />
              </div>

              {/* Platform badge */}
              <div
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  left: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "var(--radius-full)",
                  padding: "0.4rem 0.9rem",
                  border: `1px solid ${platform.color}55`,
                }}
              >
                <span style={{ color: platform.color }}>{platform.icon}</span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#fff",
                  }}
                >
                  {platform.label}
                </span>
              </div>
            </div>

            {/* Right — service breakdown */}
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: platform.color,
                  marginBottom: "0.75rem",
                }}
              >
                {platform.label} Services
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  marginBottom: "0.75rem",
                }}
              >
                {platform.tagline}
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.85,
                  color: "var(--color-text-secondary)",
                  marginBottom: "2rem",
                }}
              >
                {platform.desc}
              </p>

              {/* Service tiles — 2-col mini grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.875rem",
                }}
              >
                {platform.services.map((svc, i) => (
                  <div
                    key={svc.title}
                    style={{
                      padding: "1rem",
                      borderRadius: "var(--radius-lg)",
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(12px)",
                      transition: `all 0.4s ease ${0.2 + i * 0.07}s`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${platform.color}55`;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-border)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: platform.color,
                        marginBottom: "0.4rem",
                      }}
                    >
                      {svc.title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--color-text-tertiary)",
                        lineHeight: 1.6,
                      }}
                    >
                      {svc.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){ .deepdive-platform-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ══════ 5. PROCESS — iMedia horizontal dot timeline ══════ */
function ProcessSection() {
  const [ref, visible] = useFadeIn(0.15);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "var(--spacing-section) 0",
        background:
          "linear-gradient(135deg, rgba(254,122,54,0.05) 0%, rgba(0,70,255,0.04) 100%)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* iMedia floating blobs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "5%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(225,48,108,0.08) 0%, transparent 70%)",
          animation: "float 9s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div
        className="container-site"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Centred header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <SectionTag label="Our Process" color="orange" />
          <h2
            style={{ fontFamily: "var(--font-display)", marginTop: "1.25rem" }}
          >
            How We Manage Your Social Media
          </h2>
          <p
            style={{
              maxWidth: 480,
              margin: "1rem auto 0",
              fontSize: "1.05rem",
            }}
          >
            We always break the job into clear stages — so you know exactly
            what's happening and when, every single month.
          </p>
        </div>

        {/* iMedia horizontal timeline */}
        <div style={{ position: "relative" }} className="timeline-outer">
          {/* Connecting line */}
          <div
            style={{
              position: "absolute",
              top: "1.6rem",
              left: "10%",
              right: "10%",
              height: 3,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${PROCESS.map((p) => p.color).join(", ")})`,
              opacity: visible ? 0.35 : 0,
              transition: "opacity 0.8s ease 0.3s",
              zIndex: 0,
            }}
          />

          {/* Steps */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              position: "relative",
              zIndex: 1,
            }}
          >
            {PROCESS.map((step, i) => (
              <div
                key={step.num}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  textAlign: "center",
                  padding: "0 0.75rem",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.55s ease ${i * 0.12}s`,
                }}
              >
                {/* iMedia coloured dot */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: step.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    color: "#fff",
                    boxShadow: `0 6px 20px ${step.color}55`,
                    marginBottom: "1.25rem",
                    flexShrink: 0,
                    zIndex: 2,
                  }}
                >
                  {step.num}
                </div>

                <div
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                    lineHeight: 1.3,
                  }}
                >
                  {step.label}
                </div>
              </div>
            ))}
          </div>

          {/* Process detail cards below timeline */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "1rem",
              marginTop: "2.5rem",
            }}
            className="process-cards"
          >
            {[
              "We audit your current profiles, understand your audience, and build a strategy around your goals.",
              "A full 30-day content calendar is planned and shared for your review before we start creating.",
              "Graphics, video scripts, captions & hashtags — all created to match your brand voice and convert.",
              "We post at optimal times, respond to comments, and manage your inbox to keep your community warm.",
              "Monthly analytics report delivered — what worked, what we're improving, and next month's plan.",
            ].map((desc, i) => (
              <div
                key={i}
                style={{
                  padding: "1.25rem",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  fontSize: "0.82rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.65,
                  borderTopColor: PROCESS[i].color,
                  borderTopWidth: 2,
                  opacity: visible ? 1 : 0,
                  transition: `all 0.5s ease ${0.5 + i * 0.1}s`,
                }}
              >
                {desc}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width: 768px) {
          .timeline-outer { overflow-x: auto; }
          .process-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ══════ 7. CTA ══════ */
function CtaBanner() {
  const [ref, visible] = useFadeIn(0.2);

  return (
    <section ref={ref} className="section-padding">
      <div className="container-site">
        <div
          style={{
            borderRadius: "var(--radius-2xl)",
            overflow: "hidden",
            position: "relative",
            /* iMedia gradient bg adapted to Serenly */
            background:
              "linear-gradient(135deg, rgba(254,122,54,0.1) 0%, rgba(0,70,255,0.08) 50%, rgba(225,48,108,0.08) 100%)",
            border: "1px solid rgba(254,122,54,0.2)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.7s ease",
          }}
        >
          {/* Blobs inside CTA */}
          <div
            style={{
              position: "absolute",
              top: "-30%",
              right: "10%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(254,122,54,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-20%",
              left: "5%",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,70,255,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            className="bg-dot-grid"
            style={{ position: "absolute", inset: 0, opacity: 0.3 }}
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
              <SectionTag label="Get Started" color="orange" />
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                  marginTop: "1.25rem",
                  marginBottom: "1rem",
                  lineHeight: 1.1,
                }}
              >
                Ready to grow on{" "}
                <span className="text-gradient-orange">Facebook</span>
                {" & "}
                <span style={{ color: "#E1306C" }}>Instagram?</span>
              </h2>
              <p
                style={{
                  fontSize: "1.05rem",
                  maxWidth: 500,
                  lineHeight: 1.8,
                  color: "var(--color-text-secondary)",
                }}
              >
                Book a free social media audit and we'll show you exactly where
                your profiles are leaving growth on the table — and how Serenly
                will fix it in 30 days.
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
              <a href="#contact" className="btn btn-primary btn-lg">
                Get Free SMM Audit
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
              <a href="#platforms" className="btn btn-ghost btn-lg">
                View Services
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){ .cta-inner { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
