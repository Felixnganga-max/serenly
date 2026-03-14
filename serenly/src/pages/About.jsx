// src/pages/About.jsx
// Serenly — About Us | SEO: digital marketing agency Nairobi Kenya | branding | SEO | Meta Ads | web dev East Africa

import React, { useEffect, useRef, useState } from "react";

const HERO_BG =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80";
const ABOUT_IMG1 =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80";
const ABOUT_IMG2 =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80";
const MISSION_IMG =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80";
const FELIX_IMG =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80";
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

const FELIX_STACK = [
  {
    name: "Spring Boot",
    color: "#6DB33F",
    bg: "rgba(109,179,63,0.1)",
    border: "rgba(109,179,63,0.3)",
    desc: "Enterprise Java microservices & REST APIs",
  },
  {
    name: "Django",
    color: "#44B78B",
    bg: "rgba(68,183,139,0.1)",
    border: "rgba(68,183,139,0.3)",
    desc: "Robust Python web apps & admin systems",
  },
  {
    name: "Node.js",
    color: "#68A063",
    bg: "rgba(104,160,99,0.1)",
    border: "rgba(104,160,99,0.3)",
    desc: "Scalable real-time JS backend systems",
  },
  {
    name: "REST & GraphQL",
    color: "#E535AB",
    bg: "rgba(229,53,171,0.08)",
    border: "rgba(229,53,171,0.25)",
    desc: "API design, integration & documentation",
  },
  {
    name: "PostgreSQL",
    color: "#336791",
    bg: "rgba(51,103,145,0.1)",
    border: "rgba(51,103,145,0.3)",
    desc: "Relational database architecture & optimisation",
  },
  {
    name: "Docker & CI/CD",
    color: "#2496ED",
    bg: "rgba(36,150,237,0.08)",
    border: "rgba(36,150,237,0.25)",
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
    icon: "✦",
    accent: "orange",
    label: "Branding & Design",
    headline: "Identities that command attention",
    bullets: [
      "Logo design, brand guidelines & full visual identity systems",
      "Print-ready designs — T-shirts, banners, flyers, business cards",
      "Packaging, merchandise & branded collateral",
      "Pixel-perfect design that works across digital and physical media",
    ],
    cta: "We don't just design — we build brands people remember, trust, and buy from.",
  },
  {
    id: "smm",
    icon: "◈",
    accent: "blue",
    label: "Social Media & Meta Ads",
    headline: "Content that converts. Ads that dominate.",
    bullets: [
      "Meta Ads (Facebook & Instagram) — the only paid platform we run, done exceptionally well",
      "Audience targeting, retargeting, lookalike campaigns and A/B creative testing",
      "Profile optimisation across Instagram, Facebook, LinkedIn and TikTok",
      "Content strategy, calendar planning and community management",
      "Lead generation funnels built to fill your pipeline every single month",
    ],
    cta: "We run Meta Ads exclusively — because deep specialisation beats generalism every time.",
  },
  {
    id: "seo",
    icon: "⬡",
    accent: "orange",
    label: "SEO Optimisation",
    headline: "Rank higher. Get found. Grow faster.",
    bullets: [
      "Technical SEO audits and on-page optimisation for sustainable rankings",
      "Keyword research built around buyer intent, not just search volume",
      "Local SEO domination — we put Nairobi and East African businesses on the map",
      "Link building, content marketing and authority building strategies",
      "All websites we build are fully SEO-optimised from day one",
    ],
    cta: "We rank websites at the top of Google — and keep them there.",
  },
  {
    id: "web",
    icon: "⬢",
    accent: "blue",
    label: "Website Development",
    headline: "Fast. Beautiful. Built to perform.",
    bullets: [
      "Custom websites, landing pages and e-commerce stores built for conversion",
      "Complex systems built with Spring Boot, Django & Node.js — led by Felix personally",
      "M-Pesa integration, booking systems, portals and custom web applications",
      "Mobile-first, lightning-fast builds with Core Web Vitals scores that Google loves",
      "Ongoing maintenance, hosting support and performance monitoring",
    ],
    cta: "Every website we deliver is designed beautifully, coded cleanly, and ranked strategically.",
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

const TABS = [
  {
    id: "mission",
    label: "Our Mission",
    heading: "Our Company Mission",
    body: [
      "Serenly was founded in 2024 by Felix Ngunga with a singular purpose: to solve the digital marketing gap facing businesses in Kenya and East Africa. Too many great companies were being left behind online — not because of their products, but because they lacked the right digital strategy.",
      "We combine strategy-first thinking with world-class creative execution to help our clients dominate their digital spaces, build loyal audiences, and turn online attention into consistent, measurable revenue.",
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
      "The Meta Ads team at Serenly just gets it. Our Instagram went from 400 followers to over 12,000 in 8 months — and more importantly, our DMs are full of genuine enquiries every single week.",
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
      "Our e-commerce store was built and launched in under 6 weeks with M-Pesa integration working perfectly from day one. Sales are up 4x compared to before. Highly recommended.",
    name: "Cynthia Ouma",
    title: "Director, StyleHub Kenya",
    avatar: AVA4,
    rating: 5,
  },
];

const TEAM = [
  {
    name: "Aisha Kamau",
    title: "SEO & Content Lead",
    img: TEAM_IMG2,
    expertise: ["Technical SEO", "Content Strategy", "Keyword Research"],
  },
  {
    name: "Kevin Otieno",
    title: "Frontend Developer",
    img: TEAM_IMG3,
    expertise: ["React", "Next.js", "UI/UX Design"],
  },
  {
    name: "Lily Njoroge",
    title: "Social Media Strategist",
    img: TEAM_IMG4,
    expertise: ["Meta Ads", "Content Creation", "Analytics"],
  },
];

const NEWS = [
  {
    img: NEWS_IMG1,
    tag: "Digital Marketing",
    date: "Jan 15, 2026",
    title: "5 SEO Strategies That Are Dominating Kenyan Search in 2026",
    excerpt:
      "As Google's algorithm continues to evolve, these five strategies are separating page-one brands from everyone else in Kenya's digital landscape.",
  },
  {
    img: NEWS_IMG2,
    tag: "Social Media",
    date: "Jan 8, 2026",
    title:
      "Why Instagram Reels Are the Highest-ROI Content Format for Kenyan Brands",
    excerpt:
      "Short-form video has overtaken static posts across every metric — reach, engagement, and conversion. Here's how to use it on any budget.",
  },
  {
    img: NEWS_IMG3,
    tag: "Web Development",
    date: "Dec 22, 2025",
    title:
      "M-Pesa Integration: The Complete Guide for Kenyan E-Commerce in 2026",
    excerpt:
      "From Daraja API setup to UX best practices that reduce cart abandonment — everything your store needs to accept M-Pesa payments flawlessly.",
  },
];

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
    <span className={"section-tag section-tag-" + color}>
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
      <WhatWeDo />
      <ToolsWeUse />
      <MissionSection activeTab={activeTab} setActiveTab={setActiveTab} />
      <FounderSpotlight />
      <TeamSection />
      <TestimonialsSection />
      <LatestNews />
    </div>
  );
}

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
        height: "clamp(320px,45vh,500px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(" + HERO_BG + ")",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          transform: loaded ? "scale(1)" : "scale(1.04)",
          transition: "transform 1.2s var(--ease-smooth)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg,rgba(12,12,14,0.82) 0%,rgba(0,35,80,0.75) 60%,rgba(12,12,14,0.8) 100%)",
        }}
      />
      <div
        className="bg-dot-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.25 }}
      />
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
            fontSize: "clamp(2.75rem,6vw,4.5rem)",
            color: "#fff",
            marginBottom: "1rem",
            lineHeight: 1.05,
          }}
        >
          About <span className="text-gradient-orange">Serenly</span>
        </h1>
        <p
          style={{
            color: "rgba(245,245,245,0.6)",
            fontSize: "1rem",
            maxWidth: 500,
            margin: "0 auto 1.25rem",
            lineHeight: 1.7,
          }}
        >
          Nairobi's leading digital marketing agency — branding, SEO, Meta Ads
          &amp; web development for businesses across Kenya and East Africa.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
            color: "rgba(245,245,245,0.45)",
          }}
        >
          <a
            href="/"
            style={{ color: "rgba(245,245,245,0.45)", textDecoration: "none" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-brand-orange)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(245,245,245,0.45)")
            }
          >
            Home
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

function CompanyAbout() {
  const [ref, visible] = useFadeIn(0.1);
  return (
    <section ref={ref} className="section-padding">
      <div className="container-site">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(3rem,6vw,7rem)",
            alignItems: "center",
          }}
          className="about-grid"
        >
          <div
            style={{
              position: "relative",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-28px)",
              transition: "all 0.7s ease",
            }}
          >
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
                alt="Serenly digital marketing agency Nairobi"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
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
                alt="Serenly team at work"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: "2rem",
                right: 0,
                background:
                  "linear-gradient(135deg,var(--color-brand-blue),var(--color-brand-blue-light))",
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
                  fontSize: "2rem",
                  color: "#fff",
                  lineHeight: 1,
                  marginBottom: "0.3rem",
                }}
              >
                2024
              </div>
              <div
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Founded
                <br />
                Nairobi, KE
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "3rem",
                left: "-1rem",
                display: "grid",
                gridTemplateColumns: "repeat(4,8px)",
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
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(28px)",
              transition: "all 0.7s ease 0.15s",
            }}
          >
            <SectionTag label="Who We Are" color="orange" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem,3.5vw,2.85rem)",
                lineHeight: 1.1,
                marginTop: "1.25rem",
                marginBottom: "1.25rem",
              }}
            >
              Solving digital marketing for{" "}
              <span className="text-gradient-orange">Kenya & East Africa</span>
            </h2>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.85,
                marginBottom: "1.25rem",
              }}
            >
              Serenly was founded in <strong>2024 by Felix Ngunga</strong> in
              Nairobi, Kenya — built to close the gap between the digital
              strategies East African businesses deserve, and what most agencies
              were actually delivering.
            </p>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.85,
                marginBottom: "1.75rem",
              }}
            >
              We are a full-service digital marketing and systems development
              agency headquartered in <strong>Nairobi, Kenya</strong>, serving
              ambitious brands across Kenya, Uganda, Tanzania and the wider East
              African region. From startups to enterprises — we make digital
              work, with measurable results at the centre of everything we do.
            </p>

            <a href="/contact" className="btn btn-primary btn-lg">
              Work With Us{" "}
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
      <style>
        {
          "@media(max-width:768px){.about-grid{grid-template-columns:1fr !important;}}"
        }
      </style>
    </section>
  );
}

function WhatWeDo() {
  const [ref, visible] = useFadeIn(0.06);
  const [activeService, setActiveService] = useState("branding");
  const service = SERVICES.find((s) => s.id === activeService);
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
        <div style={{ maxWidth: 620, marginBottom: "3.5rem" }}>
          <SectionTag label="Our Services" color="orange" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem,4vw,3rem)",
              marginTop: "1.25rem",
              lineHeight: 1.08,
              marginBottom: "1rem",
            }}
          >
            Everything your brand needs to{" "}
            <span className="text-gradient-orange">win online</span>
          </h2>
          <p style={{ fontSize: "1.0625rem", lineHeight: 1.75 }}>
            Four specialised services. One agency. Zero guesswork. Nairobi's
            most results-focused digital partner for growing businesses across
            East Africa.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}
        >
          {SERVICES.map((s) => {
            const isActive = activeService === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveService(s.id)}
                style={{
                  padding: "0.625rem 1.375rem",
                  borderRadius: 999,
                  border: isActive
                    ? "1.5px solid " +
                      (s.accent === "orange"
                        ? "rgba(254,122,54,0.7)"
                        : "rgba(0,70,255,0.6)")
                    : "1.5px solid var(--color-border)",
                  background: isActive
                    ? s.accent === "orange"
                      ? "rgba(254,122,54,0.1)"
                      : "rgba(0,70,255,0.08)"
                    : "transparent",
                  color: isActive
                    ? s.accent === "orange"
                      ? "var(--color-brand-orange)"
                      : "var(--color-brand-blue-light)"
                    : "var(--color-text-secondary)",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-body)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ fontSize: "1rem" }}>{s.icon}</span>
                {s.label}
              </button>
            );
          })}
        </div>
        {service && (
          <div
            key={service.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(2rem,5vw,5rem)",
              alignItems: "start",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
            className="service-detail-grid"
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 52,
                  height: 52,
                  borderRadius: 15,
                  fontSize: "1.5rem",
                  marginBottom: "1.5rem",
                  background:
                    service.accent === "orange"
                      ? "rgba(254,122,54,0.1)"
                      : "rgba(0,70,255,0.08)",
                  border:
                    "1px solid " +
                    (service.accent === "orange"
                      ? "rgba(254,122,54,0.25)"
                      : "rgba(0,70,255,0.2)"),
                }}
              >
                {service.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem,3vw,2.25rem)",
                  lineHeight: 1.1,
                  marginBottom: "0.875rem",
                }}
              >
                {service.headline}
              </h3>
              <p
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                {service.cta}
              </p>
              <a
                href="/contact"
                className={
                  "btn btn-" +
                  (service.accent === "orange" ? "primary" : "secondary") +
                  " btn-md"
                }
                style={{ borderRadius: 12 }}
              >
                Get Started{" "}
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
            <div
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 24,
                padding: "2rem 2.25rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-text-tertiary)",
                  marginBottom: "1.5rem",
                }}
              >
                What's included
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.125rem",
                }}
              >
                {service.bullets.map((b, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.875rem",
                    }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        flexShrink: 0,
                        marginTop: 1,
                        background:
                          service.accent === "orange"
                            ? "rgba(254,122,54,0.12)"
                            : "rgba(0,70,255,0.08)",
                        border:
                          "1px solid " +
                          (service.accent === "orange"
                            ? "rgba(254,122,54,0.35)"
                            : "rgba(0,70,255,0.3)"),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color:
                          service.accent === "orange"
                            ? "var(--color-brand-orange)"
                            : "var(--color-brand-blue-light)",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </div>
                    <p
                      style={{
                        fontSize: "0.9375rem",
                        lineHeight: 1.65,
                        color: "var(--color-text-secondary)",
                        margin: 0,
                      }}
                    >
                      {b}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <style>
        {
          "@media(max-width:768px){.service-detail-grid{grid-template-columns:1fr !important;}}"
        }
      </style>
    </section>
  );
}

function ToolsWeUse() {
  const [ref, visible] = useFadeIn(0.1);
  return (
    <section
      ref={ref}
      style={{
        padding: "var(--spacing-section) 0",
        borderTop: "1px solid var(--color-border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="glow-blue"
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          top: "-20%",
          right: "-5%",
          opacity: 0.2,
        }}
      />
      <div
        className="container-site"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionTag label="Our Stack" color="blue" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              marginTop: "1.25rem",
              fontSize: "clamp(2rem,4vw,3rem)",
            }}
          >
            AI tools &amp; analytics that{" "}
            <span className="text-gradient-blue">drive decisions</span>
          </h2>
          <p
            style={{
              maxWidth: 520,
              margin: "1rem auto 0",
              fontSize: "1.05rem",
            }}
          >
            We don't guess — we use industry-leading software to track, analyse,
            and optimise every campaign we run.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1.25rem",
          }}
          className="tools-grid"
        >
          {TOOLS.map((tool, i) => (
            <div
              key={tool.name}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 18,
                padding: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.5s ease " + i * 0.08 + "s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,70,255,0.3)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: "rgba(0,70,255,0.07)",
                  border: "1px solid rgba(0,70,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  flexShrink: 0,
                }}
              >
                {tool.emoji}
              </div>
              <div>
                <p
                  style={{
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
      <style>
        {
          "@media(max-width:768px){.tools-grid{grid-template-columns:1fr !important;}}"
        }
      </style>
    </section>
  );
}

function MissionSection({ activeTab, setActiveTab }) {
  const [ref, visible] = useFadeIn(0.1);
  const tab = TABS.find((t) => t.id === activeTab);
  return (
    <section
      ref={ref}
      className="section-padding"
      style={{
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="container-site">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(3rem,6vw,7rem)",
            alignItems: "center",
          }}
          className="mission-grid"
        >
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-28px)",
              transition: "all 0.7s ease",
            }}
          >
            <SectionTag label="Our Purpose" color="blue" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem,3.5vw,2.85rem)",
                lineHeight: 1.1,
                marginTop: "1.25rem",
                marginBottom: "2rem",
              }}
            >
              Our main goal: serve{" "}
              <span
                style={{ fontStyle: "italic" }}
                className="text-gradient-blue"
              >
                local & global clients
              </span>
            </h2>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "2rem",
                background: "var(--color-bg-tertiary)",
                padding: "0.3rem",
                borderRadius: 999,
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
                    borderRadius: 999,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    transition: "all 0.3s var(--ease-smooth)",
                    background:
                      activeTab === t.id
                        ? "linear-gradient(135deg,var(--color-brand-orange),#ff9a62)"
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
                alt="Serenly strategy session"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right,rgba(254,122,54,0.15),transparent 60%)",
                }}
              />
            </div>
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
      <style>
        {
          "@media(max-width:768px){.mission-grid{grid-template-columns:1fr !important;}}"
        }
      </style>
    </section>
  );
}

function FounderSpotlight() {
  const [ref, visible] = useFadeIn(0.08);
  return (
    <section
      ref={ref}
      style={{
        padding: "var(--spacing-section) 0",
        borderTop: "1px solid var(--color-border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="bg-line-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.05 }}
      />
      <div
        className="glow-orange"
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          top: "-10%",
          right: "-10%",
          opacity: 0.1,
        }}
      />
      <div
        className="container-site"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <SectionTag label="The Founder" color="orange" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem,4vw,3rem)",
              marginTop: "1.25rem",
              lineHeight: 1.08,
            }}
          >
            Engineering excellence,{" "}
            <span className="text-gradient-orange">by design</span>
          </h2>
          <p
            style={{
              maxWidth: 580,
              margin: "1rem auto 0",
              fontSize: "1.05rem",
              lineHeight: 1.75,
            }}
          >
            Serenly is more than a marketing agency. Behind every website,
            system, and campaign is a founder who architects and ships
            enterprise-grade software — then markets it with equal precision.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: "clamp(2.5rem,5vw,6rem)",
            alignItems: "start",
            marginBottom: "4rem",
          }}
          className="founder-grid"
        >
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-24px)",
              transition: "all 0.7s ease",
            }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: "var(--radius-2xl)",
                overflow: "hidden",
                aspectRatio: "3/4",
                boxShadow: "var(--shadow-xl)",
                border: "1px solid var(--color-border)",
              }}
            >
              <img
                src={FELIX_IMG}
                alt="Felix Ngunga — Founder & Software Engineer, Serenly Nairobi"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top,rgba(12,12,14,0.78) 0%,transparent 55%)",
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
                    fontSize: "1.5rem",
                    color: "#fff",
                    lineHeight: 1.1,
                    marginBottom: "0.3rem",
                  }}
                >
                  Felix Ngunga
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--color-brand-orange)",
                  }}
                >
                  Founder · Lead Software Engineer
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: "1.25rem",
                background: "var(--color-surface)",
                border: "1px solid rgba(254,122,54,0.3)",
                borderRadius: 16,
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
              className="animate-float"
            >
              <span style={{ fontSize: "1.6rem" }}>🇰🇪</span>
              <div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                    margin: "0 0 2px",
                  }}
                >
                  Built in Nairobi, Kenya
                </p>
                <p
                  style={{
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
              transform: visible ? "translateX(0)" : "translateX(24px)",
              transition: "all 0.7s ease 0.15s",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0.4rem 1rem",
                borderRadius: 999,
                background: "rgba(254,122,54,0.1)",
                border: "1px solid rgba(254,122,54,0.3)",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--color-brand-orange)",
                  display: "inline-block",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-orange)",
                }}
              >
                Software Engineer · Founder · Agile Lead
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem,3vw,2.25rem)",
                lineHeight: 1.12,
                marginBottom: "1.25rem",
              }}
            >
              Not just a marketer —<br />a{" "}
              <span className="text-gradient-orange">full-stack engineer</span>{" "}
              who markets.
            </h3>

            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "var(--color-text-secondary)",
                marginBottom: "1.125rem",
              }}
            >
              Felix Ngunga is a highly experienced software engineer who founded
              Serenly to bridge the gap between powerful technology and
              effective digital marketing. With a deep background in building
              complex, production-grade systems, Felix brings an engineer's
              rigour and precision to everything Serenly delivers.
            </p>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "var(--color-text-secondary)",
                marginBottom: "2rem",
              }}
            >
              He personally leads all complex systems development at Serenly
              using{" "}
              <strong style={{ color: "var(--color-text-primary)" }}>
                Agile methodologies and Scrum frameworks
              </strong>{" "}
              — managing sprints, product backlogs, and cross-functional
              delivery with the discipline of a senior tech lead. From
              enterprise portals to custom APIs and full e-commerce platforms,
              Felix architects and ships to the highest engineering standard.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.6rem 1.5rem",
                marginBottom: "2rem",
              }}
            >
              {FELIX_TRAITS.map((trait) => (
                <div
                  key={trait}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                  }}
                >
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
                      fontSize: "0.55rem",
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </div>
                  {trait}
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="btn btn-primary btn-md"
              style={{ borderRadius: 12, gap: 8 }}
            >
              Build Something With Felix
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
        </div>

        <div>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-text-tertiary)",
              marginBottom: "1.25rem",
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
                  background: "var(--color-surface)",
                  border: "1px solid " + tech.border,
                  borderRadius: 16,
                  padding: "1.25rem 1.5rem",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: "all 0.5s ease " + (i * 0.07 + 0.3) + "s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = tech.bg;
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-surface)";
                  e.currentTarget.style.transform = "translateY(0)";
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
                      borderRadius: "50%",
                      background: tech.color,
                      flexShrink: 0,
                      boxShadow: "0 0 8px " + tech.color + "80",
                    }}
                  />
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "0.9375rem",
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {tech.name}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--color-text-tertiary)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>
        {
          "@media(max-width:768px){.founder-grid{grid-template-columns:1fr !important;}.stack-grid{grid-template-columns:1fr 1fr !important;}}@media(max-width:480px){.stack-grid{grid-template-columns:1fr !important;}}"
        }
      </style>
    </section>
  );
}

function TeamSection() {
  const [ref, visible] = useFadeIn(0.08);
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
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "end",
            marginBottom: "3.5rem",
          }}
          className="team-header-grid"
        >
          <div>
            <SectionTag label="The Team" color="blue" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem,4vw,3rem)",
                marginTop: "1.25rem",
                lineHeight: 1.08,
              }}
            >
              One team. Every service.{" "}
              <span className="text-gradient-blue">Zero compromise.</span>
            </h2>
          </div>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "var(--color-text-secondary)",
            }}
          >
            Behind Serenly is a tight-knit crew of strategists, creatives, and
            engineers — each a specialist in their lane, united by one standard:{" "}
            <strong style={{ color: "var(--color-text-primary)" }}>
              excellence in every deliverable.
            </strong>{" "}
            Together, we build systems, design brands, run campaigns, and ship
            websites that move the needle for every client we work with.
          </p>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,rgba(254,122,54,0.05) 0%,rgba(0,70,255,0.04) 100%)",
            border: "1px solid var(--color-border)",
            borderRadius: 20,
            padding: "1.5rem 2rem",
            marginBottom: "3rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-text-tertiary)",
              marginRight: "0.5rem",
            }}
          >
            We deliver with excellence:
          </span>
          {[
            "Complex Systems (Spring Boot, Django, Node.js)",
            "Custom Websites & E-Commerce",
            "Brand Identity & Print Design",
            "Meta Ads Campaigns",
            "SEO & Content Strategy",
            "M-Pesa & Payments Integration",
          ].map((cap) => (
            <span
              key={cap}
              style={{
                padding: "0.3rem 0.875rem",
                borderRadius: 999,
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
              }}
            >
              {cap}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1.5rem",
          }}
          className="team-cards-grid"
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
                transition: "all 0.55s ease " + i * 0.1 + "s",
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
                    (e.currentTarget.style.transform = "scale(1.05)")
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
                      "linear-gradient(to top,rgba(0,0,0,0.45) 0%,transparent 55%)",
                  }}
                />
              </div>
              <div style={{ padding: "1.25rem 1.5rem" }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  {member.name}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color:
                      i % 2 === 0
                        ? "var(--color-brand-orange)"
                        : "var(--color-brand-blue)",
                    marginBottom: "0.875rem",
                  }}
                >
                  {member.title}
                </div>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}
                >
                  {member.expertise.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "0.7rem",
                        padding: "0.2rem 0.6rem",
                        borderRadius: 999,
                        background: "var(--color-bg-tertiary)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text-tertiary)",
                        fontWeight: 600,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "3.5rem",
            borderRadius: 20,
            background: "var(--color-bg-primary)",
            border: "1px solid var(--color-border)",
            padding: "2rem 2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.375rem",
                color: "var(--color-text-primary)",
                margin: "0 0 6px",
              }}
            >
              Excellence is our baseline — not our exception.
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--color-text-secondary)",
                margin: 0,
              }}
            >
              Every project gets the full force of the Serenly team. No
              shortcuts, no half-measures.
            </p>
          </div>
          <a
            href="/portfolio"
            className="btn btn-ghost btn-md"
            style={{ borderRadius: 12, flexShrink: 0 }}
          >
            See Our Work{" "}
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
      </div>
      <style>
        {
          "@media(max-width:900px){.team-cards-grid{grid-template-columns:repeat(2,1fr) !important;}.team-header-grid{grid-template-columns:1fr !important;}}@media(max-width:540px){.team-cards-grid{grid-template-columns:1fr !important;}}"
        }
      </style>
    </section>
  );
}

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
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <SectionTag label="Client Stories" color="orange" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              marginTop: "1.25rem",
              fontSize: "clamp(2rem,4vw,3rem)",
            }}
          >
            Trusted by{" "}
            <span className="text-gradient-orange">500+ clients</span>
          </h2>
          <p
            style={{
              maxWidth: 500,
              margin: "1rem auto 0",
              fontSize: "1.05rem",
            }}
          >
            Here's what businesses across Kenya and Africa say about working
            with Serenly.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
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
                transition: "all 0.55s ease " + i * 0.1 + "s",
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
                }}
              >
                "
              </div>
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
      <style>
        {
          "@media(max-width:768px){.testimonials-grid{grid-template-columns:1fr !important;}}"
        }
      </style>
    </section>
  );
}

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
            <SectionTag label="Latest Insights" color="orange" />
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
          <a href="/blogs" className="btn btn-ghost btn-md">
            View All Posts{" "}
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
        <div
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
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.55s ease " + i * 0.12 + "s",
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
                  Read More{" "}
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
      <style>
        {
          "@media(max-width:768px){.news-grid{grid-template-columns:1fr !important;}}"
        }
      </style>
    </section>
  );
}
