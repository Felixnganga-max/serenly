// src/pages/About.jsx
// Serenly — About Us | digital marketing agency Nairobi Kenya | branding | SEO | Meta Ads | web dev East Africa

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────
// IMAGES
// ─────────────────────────────────────────────────────────────
const IMG = {
  hero: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=85&auto=format&fit=crop",
  about_main:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1400&q=80&auto=format&fit=crop",
  about_accent:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80&auto=format&fit=crop",
  mission:
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80&auto=format&fit=crop",
  felix:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop",
  stack_bg:
    "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=1400&q=80&auto=format&fit=crop",
  news1:
    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=700&q=80&auto=format&fit=crop",
  news2:
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&q=80&auto=format&fit=crop",
  news3:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop",
  atmos1:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&auto=format&fit=crop",
  atmos2:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&q=80&auto=format&fit=crop",
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
const FELIX_STACK = [
  {
    name: "Spring Boot",
    color: "#6DB33F",
    desc: "Enterprise Java microservices & REST APIs",
  },
  {
    name: "Django",
    color: "#44B78B",
    desc: "Robust Python web apps & admin systems",
  },
  {
    name: "Node.js",
    color: "#68A063",
    desc: "Scalable real-time JS backend systems",
  },
  {
    name: "REST & GraphQL",
    color: "#E535AB",
    desc: "API design, integration & documentation",
  },
  {
    name: "PostgreSQL",
    color: "#336791",
    desc: "Relational database architecture & optimisation",
  },
  {
    name: "Docker & CI/CD",
    color: "#2496ED",
    desc: "Containerised deployments & automated pipelines",
  },
];

const FELIX_TRAITS = [
  "Agile & Scrum delivery",
  "Microservices architecture",
  "System design & scalability",
  "M-Pesa & payments integration",
  "Cloud infrastructure (AWS/GCP)",
  "DevOps & CI/CD pipelines",
  "Domain-driven design (DDD)",
  "Test-driven development (TDD)",
];

const SERVICES = [
  {
    id: "branding",
    num: "01",
    icon: "✦",
    accent: "#FE7A36",
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
    accent: "#0046FF",
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
    accent: "#FE7A36",
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
    accent: "#0046FF",
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

  :root {
    --font-display: 'Marcellus', Georgia, serif;
    --font-body: 'Dosis', system-ui, sans-serif;
    --orange: #FE7A36;
    --blue: #0046FF;
    --ease-spring: cubic-bezier(0.34,1.56,0.64,1);
    --ease-smooth: cubic-bezier(0.4,0,0.2,1);
  }

  [data-theme="light"],:root:not([data-theme="dark"]){
    --color-bg-primary:#FAFAFA;
    --color-bg-secondary:#F3F3F6;
    --color-surface:rgba(255,255,255,0.92);
    --color-surface-raised:#FFFFFF;
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
  ::selection { background: rgba(254,122,54,0.18); color: var(--color-text-primary); }
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
    .hero-intro-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
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
`;

// ─────────────────────────────────────────────────────────────
// SECTION TAG
// ─────────────────────────────────────────────────────────────
function SectionTag({ label, color = "orange" }) {
  const accent = color === "orange" ? "#FE7A36" : "#0046FF";
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.35rem 1rem",
        borderRadius: 0,
        background:
          color === "orange" ? "rgba(254,122,54,0.08)" : "rgba(0,70,255,0.06)",
        border: `1px solid ${color === "orange" ? "rgba(254,122,54,0.22)" : "rgba(0,70,255,0.18)"}`,
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
          borderRadius: 0,
          background: accent,
          display: "block",
        }}
      />
      {label}
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

  return (
    <section
      style={{
        position: "relative",
        minHeight: "clamp(560px,68vh,760px)",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      {/* Full-bleed image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src={IMG.hero}
          alt=""
          style={{
            width: "100%",
            height: "115%",
            objectFit: "cover",
            objectPosition: "center 30%",
            display: "block",
            animation: loaded
              ? "bgPan 14s ease-in-out alternate infinite"
              : "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0.88) 82%, rgba(0,0,0,0.97) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Orange glow top-right */}
      <div
        style={{
          position: "absolute",
          width: "40vw",
          height: "40vw",
          top: "-15%",
          right: "-5%",
          borderRadius: 0,
          background:
            "radial-gradient(circle, rgba(254,122,54,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container-site"
        style={{
          position: "relative",
          zIndex: 2,
          paddingBottom: "clamp(2.5rem,6vh,4rem)",
          width: "100%",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(20px)",
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
            color: "rgba(255,255,255,0.4)",
            marginBottom: "1.25rem",
            fontFamily: "var(--font-body)",
          }}
        >
          <a
            href="/"
            style={{
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FE7A36")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
            }
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
          <span style={{ color: "#FE7A36" }}>About Us</span>
        </div>

        {/* Eyebrow */}
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
            color: "#FE7A36",
            marginBottom: "1rem",
          }}
        >
          <span
            style={{
              width: 20,
              height: 1.5,
              background: "#FE7A36",
              display: "block",
            }}
          />
          About Serenly
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem,6vw,5rem)",
            lineHeight: 1.04,
            color: "#fff",
            marginBottom: "1.75rem",
            maxWidth: 800,
            textShadow: "0 2px 40px rgba(0,0,0,0.3)",
          }}
        >
          A Nairobi Partner In{" "}
          <em style={{ color: "#FE7A36", fontStyle: "italic" }}>
            Brand, Growth & Digital Strategy.
          </em>
        </h1>

        {/* Two-column intro row + explore link, like the reference hero */}
        <div
          className="hero-intro-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr auto",
            gap: "2.5rem",
            alignItems: "end",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: "1.75rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            Serenly helps ambitious businesses build the brand, visibility, and
            systems that turn attention into revenue.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            We bring branding, SEO, Meta Ads and full-stack web development
            together under one integrated, engineer-led approach.
          </p>
          <Link
            to="/services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "#fff",
              textDecoration: "none",
              whiteSpace: "nowrap",
              borderBottom: "1.5px solid #FE7A36",
              paddingBottom: "0.3rem",
            }}
          >
            Explore Our Services
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// STATS — centered heading above 3 large numbers
// ─────────────────────────────────────────────────────────────
function StatsSection() {
  const [ref, visible] = useInView(0.2);
  const stats = [
    { val: "2024", label: "Founded In Nairobi, Kenya" },
    { val: "4", label: "Integrated Core Services" },
    { val: "1,000+", label: "Businesses By Our 2027 Goal" },
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
                  color: "#FE7A36",
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
            <SectionTag label="Who We Are" color="orange" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem,3.5vw,2.75rem)",
                lineHeight: 1.15,
              }}
            >
              Who We Are As Your Brand &{" "}
              <em style={{ color: "#FE7A36", fontStyle: "italic" }}>
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
          style={{
            position: "relative",
            borderRadius: 0,
            overflow: "hidden",
            aspectRatio: "16/8",
            boxShadow: "var(--shadow-xl)",
            border: "1px solid var(--color-border)",
          }}
        >
          <img
            src={IMG.stack_bg}
            alt="The Serenly team collaborating"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(120deg, rgba(0,70,255,0.35) 0%, rgba(10,10,15,0.15) 55%, transparent 90%)",
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
            ].map((trait) => (
              <div
                key={trait}
                style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
              >
                <span
                  style={{
                    width: 18,
                    height: 1.5,
                    background: "#FE7A36",
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
              borderRadius: 0,
              background: "#FE7A36",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
              boxShadow: "0 6px 28px rgba(254,122,54,0.38)",
              transition: "transform 0.2s var(--ease-spring), box-shadow 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow =
                "0 12px 48px rgba(254,122,54,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow =
                "0 6px 28px rgba(254,122,54,0.38)";
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
            <SectionTag label="How We Partner" color="orange" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem,3.5vw,2.75rem)",
                lineHeight: 1.15,
              }}
            >
              How We Partner{" "}
              <em style={{ color: "#FE7A36", fontStyle: "italic" }}>
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
                borderRadius: 0,
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
                  borderRadius: 0,
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
                  color: "#fff",
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
          <SectionTag label="Our Journey" color="blue" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem,3.5vw,2.75rem)",
              lineHeight: 1.15,
              maxWidth: 620,
            }}
          >
            From First Idea To{" "}
            <em style={{ color: "#0046FF", fontStyle: "italic" }}>
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
                color: "#0046FF",
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
                  borderRadius: 0,
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
                  e.currentTarget.style.borderColor = "#0046FF";
                  e.currentTarget.style.color = "#0046FF";
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
                  borderRadius: 0,
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
                  e.currentTarget.style.borderColor = "#0046FF";
                  e.currentTarget.style.color = "#0046FF";
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
              borderRadius: 0,
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
                  color: i === active ? "#0046FF" : "var(--color-text-tertiary)",
                  transition: "color 0.2s",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 0,
                    background: i === active ? "#0046FF" : "var(--color-border-strong)",
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
          borderRadius: 0,
          background:
            "radial-gradient(circle,rgba(0,70,255,0.07) 0%,transparent 70%)",
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
            <em style={{ color: "#0046FF", fontStyle: "italic" }}>
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
                borderRadius: 0,
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
                e.currentTarget.style.borderColor = "rgba(0,70,255,0.3)";
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
                  borderRadius: 0,
                  background: "rgba(0,70,255,0.06)",
                  border: "1px solid rgba(0,70,255,0.14)",
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
            <SectionTag label="Our Team" color="orange" />
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
            Serenly is led by an engineer-founder who brings production-grade
            software discipline to every brand and campaign we build — and
            we're growing the team behind it.
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
            <div
              style={{
                position: "relative",
                borderRadius: 0,
                overflow: "hidden",
                aspectRatio: "3/4",
                boxShadow: "var(--shadow-md)",
                border: "1px solid var(--color-border)",
              }}
            >
              <img
                src={IMG.felix}
                alt="Felix Ngunga — Founder, Serenly"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
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
              Founder & Lead Software Engineer
            </p>
          </div>

          {/* Join Us card */}
          <div
            style={{
              borderRadius: 0,
              background: "#0A0A0F",
              border: "1px solid rgba(254,122,54,0.25)",
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
                color: "#fff",
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
          borderRadius: 0,
          background:
            "radial-gradient(circle,rgba(254,122,54,0.08) 0%,transparent 70%)",
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
            Engineering excellence,{" "}
            <em style={{ color: "#FE7A36", fontStyle: "italic" }}>
              by design.
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
            Behind every website, system, and campaign is a founder who
            architects enterprise-grade software — then markets it with equal
            precision.
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
            <div
              style={{
                position: "relative",
                borderRadius: 0,
                overflow: "hidden",
                aspectRatio: "3/4",
                boxShadow: "var(--shadow-xl)",
                border: "1px solid var(--color-border)",
              }}
            >
              <img
                src={IMG.felix}
                alt="Felix Ngunga — Founder, Serenly"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: "#FE7A36",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    color: "#fff",
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
                    color: "#FE7A36",
                  }}
                >
                  Founder · Lead Software Engineer
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "1.25rem",
                background: "var(--color-surface-raised)",
                border: "1px solid rgba(254,122,54,0.25)",
                borderRadius: 0,
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
                borderRadius: 0,
                background: "rgba(254,122,54,0.1)",
                border: "1px solid rgba(254,122,54,0.28)",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 0,
                  background: "#FE7A36",
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
                  color: "#FE7A36",
                }}
              >
                Software Engineer · Founder · Agile Lead
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
              Not just a marketer —<br />a{" "}
              <em style={{ color: "#FE7A36", fontStyle: "italic" }}>
                full-stack engineer
              </em>{" "}
              who markets.
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
              Felix Ngunga is a highly experienced software engineer who founded
              Serenly to bridge the gap between powerful technology and
              effective digital marketing. With deep expertise in building
              production-grade systems, Felix brings an engineer's rigour to
              everything Serenly delivers.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "var(--color-text-secondary)",
                marginBottom: "2rem",
              }}
            >
              He personally leads all complex systems development using{" "}
              <strong style={{ color: "var(--color-text-primary)" }}>
                Agile methodologies and Scrum frameworks
              </strong>{" "}
              — managing sprints, product backlogs, and cross-functional
              delivery with the discipline of a senior tech lead.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.55rem 1.5rem",
                marginBottom: "2rem",
              }}
            >
              {FELIX_TRAITS.map((trait) => (
                <div
                  key={trait}
                  style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 0,
                      flexShrink: 0,
                      background: "rgba(254,122,54,0.1)",
                      border: "1px solid rgba(254,122,54,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FE7A36",
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
                borderRadius: 0,
                background: "#FE7A36",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
                boxShadow: "0 6px 28px rgba(254,122,54,0.38)",
                transition: "transform 0.2s var(--ease-spring), box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow =
                  "0 12px 48px rgba(254,122,54,0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow =
                  "0 6px 28px rgba(254,122,54,0.38)";
              }}
            >
              Build Something With Felix
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

        {/* Tech stack */}
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
            Serenly's Core Engineering Stack
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "1rem",
            }}
            className="stack-grid"
          >
            {FELIX_STACK.map((tech, i) => (
              <div
                key={tech.name}
                style={{
                  background: "var(--color-surface-raised)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 0,
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
                      borderRadius: 0,
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
            <SectionTag label="Latest Insights" color="orange" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem,3.5vw,2.75rem)",
                lineHeight: 1.08,
              }}
            >
              From the{" "}
              <em style={{ color: "#FE7A36", fontStyle: "italic" }}>
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
              borderRadius: 0,
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
              e.currentTarget.style.borderColor = "#FE7A36";
              e.currentTarget.style.color = "#FE7A36";
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
                borderRadius: 0,
                overflow: "hidden",
                background: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
                cursor: "pointer",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(24px)",
                transition: `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s, border-color 0.2s, box-shadow 0.2s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(254,122,54,0.3)";
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 60px rgba(254,122,54,0.12)";
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
                      borderRadius: 0,
                      background: "rgba(254,122,54,0.1)",
                      border: "1px solid rgba(254,122,54,0.22)",
                      color: "#FE7A36",
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
                    color: "#FE7A36",
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
          borderRadius: 0,
          background:
            "radial-gradient(circle,rgba(254,122,54,0.16) 0%,transparent 70%)",
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
              color: "#FE7A36",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: 20,
                height: 1.5,
                background: "#FE7A36",
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
              color: "#fff",
              marginBottom: "1.25rem",
            }}
          >
            Your business deserves to{" "}
            <em style={{ color: "#FE7A36", fontStyle: "italic" }}>
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
                borderRadius: 0,
                border: "1.5px solid rgba(255,255,255,0.22)",
                background: "rgba(255,255,255,0.09)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "1rem 2rem",
                borderRadius: 0,
                background: "#FE7A36",
                color: "#fff",
                border: "none",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                boxShadow: "0 8px 36px rgba(254,122,54,0.48)",
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
                borderRadius: 0,
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.22)",
                color: "#fff",
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
        <OurJourney />
        <ToolsWeUse />
        <Leadership />
        <FounderSpotlight />
        <LatestNews />
        <FinalCTA />
      </div>
    </>
  );
}
