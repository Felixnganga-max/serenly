// src/pages/About.jsx
// Serenly — About Us | digital marketing agency Nairobi Kenya | branding | SEO | Meta Ads | web dev East Africa

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal, ParallaxScope, ParallaxLayer } from "../components/Parallax";
import assets from "../assets/assets";

// ─────────────────────────────────────────────────────────────
// IMAGES — sourced entirely from local brand assets
// ─────────────────────────────────────────────────────────────
const IMG = {
  about_accent: assets.hero1,
  mission: assets.brand,
  stack_bg: assets.heroo,
  news1: assets.se,
  news2: assets.smm,
  news3: assets.sc,
  atmos1: assets.hero3,
  atmos2: assets.hero4,
};

// ─────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
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

function useParallax(speed = 0.08) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const fn = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(center * speed);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [speed]);
  return [ref, offset];
}

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
// The three words the story philosophy keeps coming back to — trust,
// reliability, dependability — built by retelling the same story consistently.
const STORY_VALUES = [
  {
    name: "Trust",
    color: "#ef6905",
    desc: "Earned when a brand tells the same true story, consistently.",
  },
  {
    name: "Reliability",
    color: "#0055da",
    desc: "Your audience knows what to expect from you, every time.",
  },
  {
    name: "Dependability",
    color: "#5b7e3c",
    desc: "The go-to brand isn't the loudest — it's the one people can count on.",
  },
];

const FOUNDER_TRAITS = [
  "Brand storytelling & positioning",
  "Content strategy across channels",
  "Social media amplification",
  "SEO-driven storytelling",
  "Reputation & narrative management",
  "Community building & retention",
];

const SERVICES = [
  {
    id: "branding",
    num: "01",
    icon: "✦",
    accent: "#ef6905",
    label: "Branding & Design",
    headline: "Identities that command attention.",
    body: "From your logo to your packaging, we build the cohesive brand that earns trust at first glance and stays in memory long after.",
    bullets: [
      "Logo design, brand guidelines & full visual identity systems",
      "Print-ready designs — T-shirts, banners, flyers, business cards",
      "Packaging, merchandise & branded collateral",
    ],
  },
  {
    id: "smm",
    num: "02",
    icon: "◈",
    accent: "#0055da",
    label: "Meta Ads",
    headline: "Ads that dominate. Content that converts.",
    body: "We run Meta Ads exclusively — because deep specialisation beats generalism every time. One platform, done exceptionally.",
    bullets: [
      "Facebook & Instagram — audience targeting, retargeting, A/B testing",
      "Lead generation funnels built to fill your pipeline every month",
      "Profile optimisation across Instagram, Facebook, LinkedIn and TikTok",
    ],
  },
  {
    id: "seo",
    num: "03",
    icon: "⬡",
    accent: "#5b7e3c",
    label: "SEO Optimisation",
    headline: "Rank higher. Get found. Grow faster.",
    body: "We rank websites at the top of Google and keep them there — through technical depth, buyer-intent keywords, and authority that compounds.",
    bullets: [
      "Technical SEO audits and on-page optimisation",
      "Local SEO domination — Nairobi and East African businesses",
      "All websites we build are SEO-optimised from day one",
    ],
  },
  {
    id: "web",
    num: "04",
    icon: "⬢",
    accent: "#0055da",
    label: "Website Development",
    headline: "Fast. Beautiful. Built to perform.",
    body: "Every website we deliver is designed beautifully, coded cleanly, and ranked strategically. Felix leads all complex systems personally.",
    bullets: [
      "Custom websites, landing pages and e-commerce stores",
      "M-Pesa integration, booking systems, portals and web applications",
      "Mobile-first builds with Core Web Vitals scores Google loves",
    ],
  },
];

const TABS = [
  {
    id: "mission",
    label: "Mission",
    heading: "Our Mission",
    body: "Serenly was founded in 2024 by Felix Ngunga with a singular purpose: to solve the digital marketing gap facing businesses in Kenya and East Africa. We combine strategy-first thinking with world-class creative execution to help our clients dominate their digital spaces and turn online attention into measurable revenue.",
  },
  {
    id: "vision",
    label: "Vision",
    heading: "Our Vision",
    body: "To become the most trusted digital growth partner for businesses across East and Central Africa — the name brands mention when they talk about the agency that actually moved the needle. Building a future where African businesses compete and win globally.",
  },
  {
    id: "goal",
    label: "Goal",
    heading: "Our Goal",
    body: "By 2027, Serenly aims to have helped 1,000+ businesses across Africa build powerful digital presences — through branding, social media, SEO, and web development done right. Every campaign we run moves us closer to that goal.",
  },
];

// Our Journey — company timeline, reusing the mission/vision/goal copy above
// plus an origin step, styled as a numbered stepper like the reference layout.
const JOURNEY = [
  {
    num: "01",
    label: "Foundations",
    heading: "Founded In Nairobi",
    body: "Serenly was founded in 2024 by Felix Ngunga in Nairobi — built to close the gap between the digital strategies East African businesses deserve, and what most agencies were actually delivering.",
    img: IMG.about_accent,
  },
  {
    num: "02",
    label: "Our Mission",
    heading: TABS[0].heading,
    body: TABS[0].body,
    img: IMG.mission,
  },
  {
    num: "03",
    label: "Our Vision",
    heading: TABS[1].heading,
    body: TABS[1].body,
    img: IMG.atmos1,
  },
  {
    num: "04",
    label: "Our Goal",
    heading: TABS[2].heading,
    body: TABS[2].body,
    img: IMG.atmos2,
  },
];

const NEWS = [
  {
    img: IMG.news1,
    tag: "Digital Marketing",
    date: "Jan 15, 2026",
    title: "5 SEO Strategies Dominating Kenyan Search in 2026",
    excerpt:
      "These five strategies are separating page-one brands from everyone else in Kenya's digital landscape.",
  },
  {
    img: IMG.news2,
    tag: "Social Media",
    date: "Jan 8, 2026",
    title: "Why Instagram Reels Are the Highest-ROI Format for Kenyan Brands",
    excerpt:
      "Short-form video has overtaken static posts across every metric — reach, engagement, and conversion.",
  },
  {
    img: IMG.news3,
    tag: "Web Development",
    date: "Dec 22, 2025",
    title:
      "M-Pesa Integration: The Complete Guide for Kenyan E-Commerce in 2026",
    excerpt:
      "From Daraja API setup to UX best practices that reduce cart abandonment.",
  },
];

const TOOLS = [
  { name: "HubSpot", desc: "CRM & marketing automation", emoji: "🟠" },
  { name: "Mailchimp", desc: "Email marketing campaigns", emoji: "🐒" },
  { name: "Hootsuite", desc: "Social scheduling & monitoring", emoji: "🦉" },
  {
    name: "Google Analytics",
    desc: "Traffic & conversion tracking",
    emoji: "📊",
  },
  { name: "Crimson Hexagon", desc: "AI-powered social listening", emoji: "🔬" },
  {
    name: "Meta Ads Manager",
    desc: "Paid social campaign management",
    emoji: "⚡",
  },
];

// ─────────────────────────────────────────────────────────────
// GLOBAL CSS — matches Serenly's design system (unchanged palette/fonts)
// ─────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&family=Marcellus&display=swap');

  @layer base {

  :root {
    --font-display: 'Marcellus', Georgia, serif;
    --font-body: 'Dosis', system-ui, sans-serif;
    --orange: #ef6905;
    --blue: #0055da;
    --ease-spring: cubic-bezier(0.34,1.56,0.64,1);
    --ease-smooth: cubic-bezier(0.4,0,0.2,1);
  }

  [data-theme="light"],:root:not([data-theme="dark"]){
    --color-bg-primary:#FAFAFA;
    --color-bg-secondary:#F3F3F6;
    --color-surface:rgba(255,255,255,0.92);
    --color-surface-raised:#f5f5f5;
    --color-border:rgba(0,0,0,0.07);
    --color-border-strong:rgba(0,0,0,0.13);
    --color-text-primary:#0A0A0F;
    --color-text-secondary:rgba(10,10,15,0.55);
    --color-text-tertiary:rgba(10,10,15,0.32);
    --shadow-md:0 4px 16px rgba(0,0,0,0.08);
    --shadow-lg:0 16px 48px rgba(0,0,0,0.1);
    --shadow-xl:0 32px 80px rgba(0,0,0,0.14);
  }
  [data-theme="dark"]{
    --color-bg-primary:#0A0A0F;
    --color-bg-secondary:#0F0F18;
    --color-surface:rgba(255,255,255,0.04);
    --color-surface-raised:#111118;
    --color-border:rgba(255,255,255,0.08);
    --color-border-strong:rgba(255,255,255,0.14);
    --color-text-primary:#F0EDE8;
    --color-text-secondary:rgba(240,237,232,0.52);
    --color-text-tertiary:rgba(240,237,232,0.28);
    --shadow-md:0 4px 16px rgba(0,0,0,0.5);
    --shadow-lg:0 16px 48px rgba(0,0,0,0.55);
    --shadow-xl:0 32px 80px rgba(0,0,0,0.7);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: var(--font-body);
    background: var(--color-bg-primary);
    color: var(--color-text-primary);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    transition: background 0.4s, color 0.4s;
  }
  h1,h2,h3,h4,h5,h6 { font-family: var(--font-display); font-weight: 400; }
  ::selection { background: rgba(239, 105, 5,0.18); color: var(--color-text-primary); }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--color-bg-secondary); }
  ::-webkit-scrollbar-thumb { background: var(--orange); border-radius: 0; }

  .container-site {
    max-width: 1220px;
    margin: 0 auto;
    padding: 0 clamp(1.25rem, 5vw, 4rem);
  }

  @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
  @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes pulse { 0%,100%{opacity:0.55} 50%{opacity:1} }
  @keyframes bgPan { from{transform:scale(1.08) translateY(0)} to{transform:scale(1.08) translateY(-3%)} }
  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes slideIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }

  /* ── Responsive — every multi-column layout on this page collapses here ── */
  @media (max-width: 1024px) {
    .partner-grid { grid-template-columns: 1fr 1fr !important; }
    .leadership-grid { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 900px) {
    .journey-layout { grid-template-columns: 1fr !important; }
    .journey-layout .journey-image { order: -1; aspect-ratio: 16/10 !important; }
  }
  @media (max-width: 768px) {
    .about-hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
    .about-hero-copy { grid-template-columns: 1fr !important; gap: 1.25rem !important; }
    .about-image-strip { flex-wrap: wrap !important; height: auto !important; }
    .about-image-strip > div { flex: 1 1 50% !important; height: 160px !important; }
    .stat-grid-3 { grid-template-columns: 1fr !important; }
    .stat-grid-3 > div { border-right: none !important; border-bottom: 1px solid var(--color-border); }
    .stat-grid-3 > div:last-child { border-bottom: none !important; }
    .whoweare-grid { grid-template-columns: 1fr !important; }
    .about-main-grid { grid-template-columns: 1fr !important; }
    .service-panel-grid { grid-template-columns: 1fr !important; }
    .mission-grid { grid-template-columns: 1fr !important; }
    .founder-grid { grid-template-columns: 1fr !important; }
    .stack-grid { grid-template-columns: 1fr 1fr !important; }
    .tools-grid { grid-template-columns: 1fr !important; }
    .news-grid { grid-template-columns: 1fr !important; }
    .partner-grid { grid-template-columns: 1fr !important; }
    .leadership-grid { grid-template-columns: 1fr 1fr !important; }
    .journey-steps-track { gap: 1.5rem !important; }
    .cta-form-row { flex-direction: column !important; }
    .cta-form-row input, .cta-form-row button { width: 100% !important; }
    section { padding-top: 4rem !important; padding-bottom: 4rem !important; }
  }
  @media (max-width: 640px) {
    .stat-bar-grid { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 480px) {
    .stack-grid { grid-template-columns: 1fr !important; }
    .leadership-grid { grid-template-columns: 1fr !important; }
    .journey-steps-track { flex-wrap: wrap; row-gap: 0.75rem; }
  }

  } /* end @layer base */
`;

// ─────────────────────────────────────────────────────────────
// SECTION TAG
// ─────────────────────────────────────────────────────────────
function SectionTag({ label, color = "orange" }) {
  const PALETTE = {
    orange: { text: "#ef6905", bg: "rgba(239, 105, 5,0.08)", border: "rgba(239, 105, 5,0.22)" },
    blue: { text: "#0055da", bg: "rgba(0, 85, 218,0.06)", border: "rgba(0, 85, 218,0.18)" },
    green: { text: "#5b7e3c", bg: "rgba(91, 126, 60,0.08)", border: "rgba(91, 126, 60,0.22)" },
  };
  const swatch = PALETTE[color] || PALETTE.orange;
  const accent = swatch.text;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.35rem 1rem",
        borderRadius: "var(--radius-soft)",
        background: swatch.bg,
        border: `1px solid ${swatch.border}`,
        color: accent,
        fontFamily: "var(--font-body)",
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        marginBottom: "1.25rem",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "var(--radius-soft)",
          background: accent,
          display: "block",
        }}
      />
      {label}
    </div>
  );
}

// A monogram placeholder standing in for a real founder photo — avoids
// passing off a stock photo as a specific named person. Swap for an actual
// photo of Felix whenever one is ready.
function FounderAvatar({ withCaption = false }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "var(--radius-soft)",
        overflow: "hidden",
        aspectRatio: "3/4",
        boxShadow: "var(--shadow-md)",
        border: "1px solid var(--color-border)",
        background:
          "linear-gradient(155deg, #0A0A0F 0%, #16161d 55%, #1c1410 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 25%, rgba(239, 105, 5,0.22) 0%, transparent 55%)",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3.5rem,9vw,6rem)",
          color: "rgba(255,255,255,0.92)",
          position: "relative",
          zIndex: 1,
        }}
      >
        FN
      </span>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "#ef6905",
        }}
      />
      {withCaption && (
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 0,
            right: 0,
            padding: "0 1.5rem",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.6rem",
              color: "#f5f5f5",
              lineHeight: 1.1,
              marginBottom: "0.25rem",
            }}
          >
            Felix Ngunga
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#ef6905",
            }}
          >
            Founder, Serenly
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO — cinematic full-bleed, breadcrumb + heading + two-column intro
// ─────────────────────────────────────────────────────────────
function HeroBanner() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 60);
  }, []);

  const bodyText = {
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    color: "var(--color-text-secondary)",
    lineHeight: 1.8,
    margin: 0,
  };

  return (
    <>
      {/* ── Light editorial intro — "About Us" heading + story-first copy ── */}
      <section
        style={{
          background: "var(--color-bg-primary)",
          paddingTop: "clamp(2.75rem,7vh,5.5rem)",
          paddingBottom: "clamp(3rem,6vh,4.5rem)",
        }}
      >
        <div
          className="container-site"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(16px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.75rem",
              color: "var(--color-text-tertiary)",
              marginBottom: "2.5rem",
              fontFamily: "var(--font-body)",
            }}
          >
            <a
              href="/"
              style={{ color: "var(--color-text-tertiary)", textDecoration: "none" }}
            >
              Home
            </a>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span style={{ color: "#ef6905" }}>About Us</span>
          </div>

          <div
            className="about-hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "0.85fr 1.15fr",
              gap: "clamp(2.5rem,5vw,5rem)",
              alignItems: "start",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem,6.5vw,5.5rem)",
                lineHeight: 1,
                color: "var(--color-text-primary)",
                margin: 0,
              }}
            >
              About Us
            </h1>

            <div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(1.05rem,1.8vw,1.35rem)",
                  lineHeight: 1.5,
                  color: "var(--color-text-primary)",
                  marginBottom: "1.75rem",
                }}
              >
                Every brand has a story worth telling. We make sure it's
                heard by the right people.
              </p>
              <div
                className="about-hero-copy"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2rem",
                }}
              >
                <p style={bodyText}>
                  The reason we started this company is to help businesses
                  tell their own stories. Stories are an essential part of
                  our lives — we like good stories, and even more, we like
                  being associated with one.
                </p>
                <p style={bodyText}>
                  So if we want to grow our brands, we need to sell success
                  stories that people want to be associated with. Believe
                  us — everyone wants to be associated with a success
                  story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-width image strip — the "moodboard" beat ── */}
      <section
        className="about-image-strip"
        style={{
          display: "flex",
          width: "100%",
          height: "clamp(200px,28vw,340px)",
        }}
      >
        {[IMG.mission, IMG.atmos1, IMG.stack_bg, IMG.atmos2].map((src, i) => (
          <div key={i} style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <img
              src={src}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </section>

      {/* ── Who tells your story? — the brand philosophy, in full ── */}
      <section
        style={{
          background: "var(--color-bg-secondary)",
          padding: "6rem 0",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div
          className="container-site"
          style={{ maxWidth: 860, marginInline: "auto" }}
        >
          <SectionTag label="Our Philosophy" color="orange" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem,4vw,3rem)",
              lineHeight: 1.1,
              marginBottom: "1.75rem",
            }}
          >
            Who tells your story?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.9,
              color: "var(--color-text-secondary)",
              marginBottom: "1.25rem",
            }}
          >
            If you don't tell your story yourself, we're going to either
            create stories about you, assume stories about you, believe
            what we hear online or from your competitors — or you're going
            to exist without a story people can relate to. You might sell,
            but never beyond a certain point.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.9,
              color: "var(--color-text-secondary)",
              marginBottom: "1.25rem",
            }}
          >
            So you tell the story, and we come in — as Serenly Digital
            Marketing Agency — and broadcast it. Because if you have the
            story and no one is hearing it, that's also a dead end. We
            make sure{" "}
            <strong style={{ color: "#ef6905" }}>the right people</strong>{" "}
            hear your story.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.9,
              color: "var(--color-text-secondary)",
              marginBottom: "2.25rem",
            }}
          >
            Of course, not everyone needs to hear your story. But there
            are probabilities in life, and we're realistic about that.
            Our work is to sell your story to the people who are more
            likely to engage with it — which is also your product.
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.1rem,2vw,1.4rem)",
              lineHeight: 1.55,
              color: "var(--color-text-primary)",
              margin: 0,
              paddingLeft: "1.5rem",
              borderLeft: "3px solid #ef6905",
            }}
          >
            You keep telling the story about your product the right way,
            and you start becoming your target audience's go-to brand —
            every day. Remember: customers need to be reminded, again and
            again, of your story and your product.
          </p>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// STATS — centered heading above 3 large numbers
// ─────────────────────────────────────────────────────────────
function StatsSection() {
  const [ref, visible] = useInView(0.2);
  const stats = [
    { val: "2024", label: "Founded In Nairobi, Kenya", color: "#ef6905" },
    { val: "4", label: "Integrated Core Services", color: "#0055da" },
    {
      val: "1,000+",
      label: "Businesses By Our 2027 Goal",
      color: "#5b7e3c",
      tint: "rgba(201,211,243,0.14)",
    },
  ];
  return (
    <section
      style={{
        background: "var(--color-bg-primary)",
        padding: "6rem 0 5rem",
      }}
    >
      <div className="container-site">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-text-tertiary)",
              marginBottom: "1.25rem",
            }}
          >
            What We've Built
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem,3vw,2.5rem)",
              lineHeight: 1.3,
              maxWidth: 760,
              margin: "0 auto",
            }}
          >
            More Than Campaigns — We Advise, Build Systems, And Help You Grow
            With Confidence.
          </h2>
        </div>

        <div
          ref={ref}
          className="stat-grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            borderTop: "1px solid var(--color-border)",
            borderLeft: "1px solid var(--color-border)",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "2.5rem 1.5rem",
                borderRight: "1px solid var(--color-border)",
                borderBottom: "1px solid var(--color-border)",
                background: s.tint || "transparent",
                textAlign: "center",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(16px)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.25rem,5vw,3.5rem)",
                  color: s.color,
                  lineHeight: 1.1,
                  marginBottom: "0.4rem",
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--color-text-tertiary)",
                  letterSpacing: "0.04em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// WHO WE ARE — heading/paragraph split, full-width image below
// ─────────────────────────────────────────────────────────────
function WhoWeAre() {
  const [ref, visible] = useInView(0.08);

  return (
    <section
      style={{
        padding: "7rem 0",
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="container-site">
        <div
          ref={ref}
          className="whoweare-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2.5rem,6vw,6rem)",
            marginBottom: "4rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div>
            <SectionTag label="Who We Are" color="green" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem,3.5vw,2.75rem)",
                lineHeight: 1.15,
              }}
            >
              Who We Are As Your Brand &{" "}
              <em style={{ color: "#ef6905", fontStyle: "italic" }}>
                Growth Partner
              </em>
            </h2>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "var(--color-text-secondary)",
              }}
            >
              Our role is more than delivering campaigns or code. We work
              alongside you as an advisor — translating complex digital
              decisions into clear strategy, and designing brand, marketing
              and web systems aligned with your goals.{" "}
              <strong style={{ color: "var(--color-text-primary)" }}>
                Serenly was founded in 2024 by Felix Ngunga in Nairobi
              </strong>{" "}
              to close the gap between the digital strategies East African
              businesses deserve, and what most agencies were actually
              delivering.
            </p>
          </div>
        </div>

        {/* Full-width image */}
        <div
          className="rounded-soft"
          style={{
            position: "relative",
            overflow: "hidden",
            aspectRatio: "16/8",
            boxShadow: "var(--shadow-xl)",
            border: "1px solid var(--color-border)",
          }}
        >
          <ParallaxLayer speed={36} style={{ position: "absolute", inset: "-8% 0", height: "116%" }}>
            <img
              src={IMG.stack_bg}
              alt="The Serenly team collaborating"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </ParallaxLayer>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(120deg, rgba(0, 85, 218,0.35) 0%, rgba(10,10,15,0.15) 55%, transparent 90%)",
            }}
          />
        </div>

        {/* Traits + CTA row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            marginTop: "3rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.6rem 2.5rem",
            }}
          >
            {[
              "Strategy-first thinking",
              "Results over activity",
              "Local market expertise",
              "Enterprise-grade delivery",
            ].map((trait, i) => (
              <div
                key={trait}
                style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
              >
                <span
                  style={{
                    width: 18,
                    height: 1.5,
                    background: ["#ef6905", "#0055da", "#5b7e3c", "#0055da"][i],
                    display: "block",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {trait}
                </span>
              </div>
            ))}
          </div>

          <a
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.9rem 2rem",
              borderRadius: "var(--radius-soft)",
              background: "#ef6905",
              color: "#f5f5f5",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
              boxShadow: "0 6px 28px rgba(239, 105, 5,0.38)",
              transition: "transform 0.2s var(--ease-spring), box-shadow 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow =
                "0 12px 48px rgba(239, 105, 5,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow =
                "0 6px 28px rgba(239, 105, 5,0.38)";
            }}
          >
            Work With Us
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// HOW WE PARTNER — 4-card numbered service grid (dark cards)
// ─────────────────────────────────────────────────────────────
function HowWePartner() {
  const [ref, visible] = useInView(0.08);

  return (
    <section
      style={{
        padding: "7rem 0",
        background: "var(--color-bg-primary)",
      }}
    >
      <div className="container-site">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "2rem",
            marginBottom: "3.5rem",
          }}
        >
          <div style={{ maxWidth: 480 }}>
            <SectionTag label="How We Partner" color="green" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem,3.5vw,2.75rem)",
                lineHeight: 1.15,
              }}
            >
              How We Partner{" "}
              <em style={{ color: "#ef6905", fontStyle: "italic" }}>
                With You
              </em>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "var(--color-text-secondary)",
              maxWidth: 440,
            }}
          >
            Every client is different, but our way of working is consistent:
            listen carefully, design boldly, and stay measurable throughout —
            so you always know exactly what to expect.
          </p>
        </div>

        <div
          ref={ref}
          className="partner-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "1.25rem",
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              style={{
                background: "#0A0A0F",
                borderRadius: "var(--radius-soft)",
                padding: "2rem 1.75rem",
                display: "flex",
                flexDirection: "column",
                minHeight: 280,
                border: `1px solid ${s.accent}25`,
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s, border-color 0.25s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${s.accent}70`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${s.accent}25`;
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.3rem",
                  marginBottom: "1.5rem",
                  background: `${s.accent}18`,
                  border: `1px solid ${s.accent}35`,
                  color: s.accent,
                }}
              >
                {s.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  lineHeight: 1.25,
                  color: "#f5f5f5",
                  marginBottom: "0.75rem",
                }}
              >
                {s.label}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "auto",
                }}
              >
                {s.body}
              </p>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.25rem",
                  color: `${s.accent}55`,
                  lineHeight: 1,
                  marginTop: "1.5rem",
                }}
              >
                {s.num}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// OUR JOURNEY — numbered timeline stepper with image
// ─────────────────────────────────────────────────────────────
function OurJourney() {
  const [active, setActive] = useState(0);
  const [ref, visible] = useInView(0.1);
  const step = JOURNEY[active];

  function go(delta) {
    setActive((prev) => (prev + delta + JOURNEY.length) % JOURNEY.length);
  }

  return (
    <section
      style={{
        padding: "7rem 0",
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="container-site" ref={ref}>
        <div style={{ marginBottom: "3.5rem" }}>
          <SectionTag label="Our Journey" color="green" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem,3.5vw,2.75rem)",
              lineHeight: 1.15,
              maxWidth: 620,
            }}
          >
            From First Idea To{" "}
            <em style={{ color: "#5b7e3c", fontStyle: "italic" }}>
              Integrated Growth.
            </em>
          </h2>
        </div>

        <div
          className="journey-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2.5rem,5vw,5rem)",
            alignItems: "center",
            marginBottom: "3rem",
          }}
        >
          {/* Text */}
          <div key={step.num} style={{ animation: "slideIn 0.35s ease both" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#5b7e3c",
                marginBottom: "0.75rem",
              }}
            >
              {step.num} / {String(JOURNEY.length).padStart(2, "0")}
            </p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem,2.75vw,2rem)",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              {step.heading}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                lineHeight: 1.85,
                color: "var(--color-text-secondary)",
                marginBottom: "2rem",
                maxWidth: 460,
              }}
            >
              {step.body}
            </p>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => go(-1)}
                aria-label="Previous step"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-soft)",
                  border: "1.5px solid var(--color-border-strong)",
                  background: "var(--color-surface-raised)",
                  color: "var(--color-text-primary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#5b7e3c";
                  e.currentTarget.style.color = "#5b7e3c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "var(--color-border-strong)";
                  e.currentTarget.style.color = "var(--color-text-primary)";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next step"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-soft)",
                  border: "1.5px solid var(--color-border-strong)",
                  background: "var(--color-surface-raised)",
                  color: "var(--color-text-primary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#5b7e3c";
                  e.currentTarget.style.color = "#5b7e3c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "var(--color-border-strong)";
                  e.currentTarget.style.color = "var(--color-text-primary)";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Image */}
          <div
            className="journey-image"
            style={{
              position: "relative",
              borderRadius: "var(--radius-soft)",
              overflow: "hidden",
              aspectRatio: "4/3",
              boxShadow: "var(--shadow-xl)",
              border: "1px solid var(--color-border)",
            }}
          >
            <img
              key={step.img}
              src={step.img}
              alt={step.heading}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                animation: "fadeUp 0.5s ease both",
              }}
            />
          </div>
        </div>

        {/* Numbered stepper track */}
        <div
          className="journey-steps-track"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          {JOURNEY.map((s, i) => (
            <React.Fragment key={s.num}>
              <button
                onClick={() => setActive(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.35rem 0",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: i === active ? "#5b7e3c" : "var(--color-text-tertiary)",
                  transition: "color 0.2s",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "var(--radius-soft)",
                    background: i === active ? "#5b7e3c" : "var(--color-border-strong)",
                    display: "block",
                    transition: "background 0.2s",
                  }}
                />
                {s.num}
              </button>
              {i < JOURNEY.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "var(--color-border)",
                    minWidth: 16,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// TOOLS WE USE
// ─────────────────────────────────────────────────────────────
function ToolsWeUse() {
  const [ref, visible] = useInView(0.08);
  return (
    <section
      style={{
        padding: "7rem 0",
        background: "var(--color-bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "45vw",
          height: "45vw",
          top: "-10%",
          right: "-10%",
          borderRadius: "var(--radius-soft)",
          background:
            "radial-gradient(circle,rgba(0, 85, 218,0.07) 0%,transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="container-site"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionTag label="Our Stack" color="blue" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem,3.5vw,2.75rem)",
              lineHeight: 1.08,
              marginBottom: "0.75rem",
            }}
          >
            AI tools & analytics that{" "}
            <em style={{ color: "#0055da", fontStyle: "italic" }}>
              drive decisions.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-secondary)",
              maxWidth: 440,
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            We don't guess — we use industry-leading software to track, analyse,
            and optimise every campaign we run.
          </p>
        </div>

        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1rem",
          }}
          className="tools-grid"
        >
          {TOOLS.map((tool, i) => (
            <div
              key={tool.name}
              style={{
                background: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-soft)",
                padding: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: `opacity 0.55s ease ${i * 75}ms, transform 0.55s ease ${i * 75}ms, border-color 0.2s, transform 0.2s`,
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 85, 218,0.3)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "var(--radius-soft)",
                  background: "rgba(0, 85, 218,0.06)",
                  border: "1px solid rgba(0, 85, 218,0.14)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  flexShrink: 0,
                }}
              >
                {tool.emoji}
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    color: "var(--color-text-primary)",
                    margin: "0 0 3px",
                  }}
                >
                  {tool.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    color: "var(--color-text-tertiary)",
                    margin: 0,
                  }}
                >
                  {tool.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// LEADERSHIP — team grid (honest headcount: founder + "join us" card)
// ─────────────────────────────────────────────────────────────
function Leadership() {
  const [ref, visible] = useInView(0.1);

  return (
    <section
      style={{
        padding: "7rem 0",
        background: "var(--color-bg-primary)",
      }}
    >
      <div className="container-site">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "2rem",
            marginBottom: "3.5rem",
          }}
        >
          <div style={{ maxWidth: 480 }}>
            <SectionTag label="Our Team" color="green" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem,3.5vw,2.75rem)",
                lineHeight: 1.15,
              }}
            >
              The Leadership
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "var(--color-text-secondary)",
              maxWidth: 440,
            }}
          >
            Serenly is led by a founder who believes every brand's growth
            starts with a story told right — and we're growing the team
            behind it.
          </p>
        </div>

        <div ref={ref} className="leadership-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: "opacity 0.55s ease, transform 0.55s ease",
            }}
          >
            <FounderAvatar />
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                marginTop: "1rem",
                marginBottom: "0.15rem",
              }}
            >
              Felix Ngunga
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                color: "var(--color-text-tertiary)",
              }}
            >
              Founder, Serenly
            </p>
          </div>

          {/* Join Us card */}
          <div
            style={{
              borderRadius: "var(--radius-soft)",
              background: "#0A0A0F",
              border: "1px solid rgba(91, 126, 60,0.35)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "2rem",
              aspectRatio: "3/4",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: "opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s",
            }}
          >
            <span
              style={{
                fontSize: "1.5rem",
                marginBottom: "0.75rem",
              }}
            >
              +
            </span>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.15rem",
                color: "#f5f5f5",
                marginBottom: "0.4rem",
              }}
            >
              Join Us!
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              We're building the next generation of Serenly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FOUNDER SPOTLIGHT — deep-dive bio, kept directly under Leadership
// ─────────────────────────────────────────────────────────────
function FounderSpotlight() {
  const [ref, visible] = useInView(0.06);
  const [bgRef, bgOffset] = useParallax(0.07);

  return (
    <section
      style={{
        padding: "7rem 0",
        background: "var(--color-bg-secondary)",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: "-15%",
          backgroundImage: `url(${IMG.atmos1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${bgOffset}px)`,
          opacity: 0.03,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "50vw",
          height: "50vw",
          top: "-10%",
          right: "-10%",
          borderRadius: "var(--radius-soft)",
          background:
            "radial-gradient(circle,rgba(239, 105, 5,0.08) 0%,transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container-site"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <SectionTag label="Meet The Founder" color="orange" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem,4vw,3rem)",
              lineHeight: 1.08,
              marginBottom: "0.75rem",
            }}
          >
            Every story deserves{" "}
            <em style={{ color: "#ef6905", fontStyle: "italic" }}>
              to be told right.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-secondary)",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.8,
              fontSize: "1rem",
            }}
          >
            Founder Felix Ngunga on why storytelling became his life's
            work — and Serenly's.
          </p>
        </div>

        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "5fr 7fr",
            gap: "clamp(3rem,5vw,6rem)",
            alignItems: "start",
            marginBottom: "4rem",
          }}
          className="founder-grid"
        >
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(-24px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <FounderAvatar withCaption />

            <div
              style={{
                marginTop: "1.25rem",
                background: "rgba(201,211,243,0.14)",
                border: "1px solid rgba(201,211,243,0.4)",
                borderRadius: "var(--radius-soft)",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
                animation: "floatY 6s ease-in-out infinite",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>🇰🇪</span>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    color: "var(--color-text-primary)",
                    margin: "0 0 2px",
                  }}
                >
                  Built in Nairobi, Kenya
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: "var(--color-text-tertiary)",
                    margin: 0,
                  }}
                >
                  Serving East Africa & beyond
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(24px)",
              transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0.4rem 1rem",
                borderRadius: "var(--radius-soft)",
                background: "rgba(239, 105, 5,0.1)",
                border: "1px solid rgba(239, 105, 5,0.28)",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "var(--radius-soft)",
                  background: "#ef6905",
                  display: "inline-block",
                  animation: "pulse 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#ef6905",
                }}
              >
                Founder · Storyteller · Serenly
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem,3vw,2.5rem)",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
              }}
            >
              The danger of a{" "}
              <em style={{ color: "#ef6905", fontStyle: "italic" }}>
                single story.
              </em>
            </h3>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "var(--color-text-secondary)",
                marginBottom: "1rem",
              }}
            >
              My name is Felix Ngunga. I created Serenly in 2024, after
              listening to a TED Talk titled{" "}
              <strong style={{ color: "var(--color-text-primary)" }}>
                "The Danger of a Single Story"
              </strong>{" "}
              by Chimamanda Ngozi Adichie. That talk opened my eyes to how
              impactful stories are in our lives — and even more, to the
              power of a wrongly told story.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "var(--color-text-secondary)",
                marginBottom: "1rem",
              }}
            >
              From there, I decided to dedicate my life to helping brands,
              individuals, corporates and businesses tell the right
              stories, the right way.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "var(--color-text-secondary)",
                marginBottom: "1rem",
              }}
            >
              In the era of social media, a bad story spreads faster than
              a good one. So every entity needs to constantly tell its
              story — in different variations of vocabulary, but always
              the same story. This builds{" "}
              <strong style={{ color: "var(--color-text-primary)" }}>
                trust, reliability, and dependability
              </strong>
              .
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "var(--color-text-primary)",
                marginBottom: "2rem",
                paddingLeft: "1.25rem",
                borderLeft: "3px solid #ef6905",
              }}
            >
              It's a journey we walk together with you, every day —
              telling the right story, and making sure no one else is
              telling it for you. Because the moment you let someone else
              tell your story, you're completely doomed.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.55rem 1.5rem",
                marginBottom: "2rem",
              }}
            >
              {FOUNDER_TRAITS.map((trait) => (
                <div
                  key={trait}
                  style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "var(--radius-soft)",
                      flexShrink: 0,
                      background: "rgba(239, 105, 5,0.1)",
                      border: "1px solid rgba(239, 105, 5,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ef6905",
                      fontSize: "0.55rem",
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {trait}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.9rem 2rem",
                borderRadius: "var(--radius-soft)",
                background: "#ef6905",
                color: "#f5f5f5",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
                boxShadow: "0 6px 28px rgba(239, 105, 5,0.38)",
                transition: "transform 0.2s var(--ease-spring), box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow =
                  "0 12px 48px rgba(239, 105, 5,0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow =
                  "0 6px 28px rgba(239, 105, 5,0.38)";
              }}
            >
              Let's Tell Your Story
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* What retelling the right story, consistently, actually builds */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "3.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-text-tertiary)",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            What The Right Story, Told Right, Builds
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "1rem",
            }}
            className="stack-grid"
          >
            {STORY_VALUES.map((tech, i) => (
              <div
                key={tech.name}
                style={{
                  background: "var(--color-surface-raised)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-soft)",
                  padding: "1.25rem 1.5rem",
                  cursor: "default",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(16px)",
                  transition: `opacity 0.5s ease ${0.3 + i * 0.07}s, transform 0.5s ease ${0.3 + i * 0.07}s, background 0.2s, transform 0.2s, border-color 0.2s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${tech.color}10`;
                  e.currentTarget.style.borderColor = `${tech.color}40`;
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "var(--color-surface-raised)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "var(--radius-soft)",
                      background: tech.color,
                      flexShrink: 0,
                      boxShadow: `0 0 10px ${tech.color}80`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                      fontSize: "0.9375rem",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {tech.name}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    color: "var(--color-text-tertiary)",
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// LATEST NEWS
// ─────────────────────────────────────────────────────────────
function LatestNews() {
  const [ref, visible] = useInView(0.08);

  return (
    <section
      style={{
        padding: "7rem 0",
        background: "var(--color-bg-primary)",
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
            <SectionTag label="Latest Insights" color="blue" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem,3.5vw,2.75rem)",
                lineHeight: 1.08,
              }}
            >
              From the{" "}
              <em style={{ color: "#0055da", fontStyle: "italic" }}>
                Serenly Blog.
              </em>
            </h2>
          </div>
          <a
            href="/blogs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.7rem 1.6rem",
              borderRadius: "var(--radius-soft)",
              background: "var(--color-surface-raised)",
              border: "1.5px solid var(--color-border-strong)",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.875rem",
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#0055da";
              e.currentTarget.style.color = "#0055da";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border-strong)";
              e.currentTarget.style.color = "var(--color-text-primary)";
            }}
          >
            View All Posts
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1.5rem",
          }}
          className="news-grid"
        >
          {NEWS.map((post, i) => (
            <article
              key={post.title}
              style={{
                borderRadius: "var(--radius-soft)",
                overflow: "hidden",
                background: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
                cursor: "pointer",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(24px)",
                transition: `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s, border-color 0.2s, box-shadow 0.2s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 85, 218,0.3)";
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 60px rgba(0, 85, 218,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                <img
                  src={post.img}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
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
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "var(--radius-soft)",
                      background: "rgba(0, 85, 218,0.08)",
                      border: "1px solid rgba(0, 85, 218,0.2)",
                      color: "#0055da",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {post.tag}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-text-tertiary)",
                      fontFamily: "var(--font-body)",
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
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    color: "var(--color-text-secondary)",
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
                    color: "#0055da",
                    fontFamily: "var(--font-body)",
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
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FINAL CTA — full-bleed cinematic, with email capture row
// ─────────────────────────────────────────────────────────────
function FinalCTA() {
  const [bgRef, bgOffset] = useParallax(0.1);
  const [ref, visible] = useInView(0.1);
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    window.location.href = `/contact${email ? `?email=${encodeURIComponent(email)}` : ""}`;
  }

  return (
    <section
      style={{
        position: "relative",
        minHeight: "55vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: "-15%",
          backgroundImage: `url(${IMG.atmos2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${bgOffset}px)`,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.88) 100%)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "50vw",
          height: "50vw",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          borderRadius: "var(--radius-soft)",
          background:
            "radial-gradient(circle,rgba(239, 105, 5,0.16) 0%,transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <div
        className="container-site"
        style={{
          position: "relative",
          zIndex: 3,
          padding: "6rem clamp(1.25rem,5vw,4rem)",
        }}
      >
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 0.75s, transform 0.75s",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#ef6905",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: 20,
                height: 1.5,
                background: "#ef6905",
                display: "block",
              }}
            />
            Ready to grow?
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem,5vw,4rem)",
              lineHeight: 1.05,
              color: "#f5f5f5",
              marginBottom: "1.25rem",
            }}
          >
            Your business deserves to{" "}
            <em style={{ color: "#ef6905", fontStyle: "italic" }}>
              win online.
            </em>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.58)",
              maxWidth: 440,
              margin: "0 auto 2.5rem",
              lineHeight: 1.8,
              fontSize: "1rem",
            }}
          >
            Let's build your brand, grow your audience, and deliver results
            that matter. Free consultation — no obligation.
          </p>

          <form
            onSubmit={handleSubmit}
            className="cta-form-row"
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              maxWidth: 480,
              margin: "0 auto 1.5rem",
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              style={{
                flex: 1,
                padding: "1rem 1.5rem",
                borderRadius: "var(--radius-soft)",
                border: "1.5px solid rgba(255,255,255,0.22)",
                background: "rgba(255,255,255,0.09)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: "#f5f5f5",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "1rem 2rem",
                borderRadius: "var(--radius-soft)",
                background: "#ef6905",
                color: "#f5f5f5",
                border: "none",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                boxShadow: "0 8px 36px rgba(239, 105, 5,0.48)",
                transition: "transform 0.2s var(--ease-spring)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
            >
              Get Started
            </button>
          </form>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/#portfolio"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.75rem 1.75rem",
                borderRadius: "var(--radius-soft)",
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.22)",
                color: "#f5f5f5",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.85rem",
                textDecoration: "none",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              }}
            >
              See Our Work
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────────────────────
export default function About() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div
        style={{
          background: "var(--color-bg-primary)",
          color: "var(--color-text-primary)",
          overflowX: "hidden",
        }}
      >
        <HeroBanner />
        <StatsSection />
        <WhoWeAre />
        <HowWePartner />
      
        <FounderSpotlight />
        <LatestNews />
        <FinalCTA />
      </div>
    </>
  );
}
