// src/sections/WebDevStrategies.jsx
// Serenly — Web Development Strategies Section
// Drop-in addition to Solutions.jsx — add <WebDevStrategies /> before <CtaBanner />
// SEO schema markup included via JSON-LD
// Covers: mobile-first, speed, UX, SEO, security, conversion, integrations,
//         scalability, branding, maintenance, analytics, AI/voice search

import React, { useEffect, useRef, useState } from "react";

/* ─── Scroll animation hook ────────────────────────────── */
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

/* ─── Strategy data — sourced from industry research ──── */
const STRATEGIES = [
  {
    num: "01",
    accent: "orange",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
      </svg>
    ),
    title: "Mobile-First Architecture",
    category: "Design & Structure",
    summary:
      "Over 54% of global web traffic comes from mobile devices. We build every site mobile-first — responsive layouts, touch-optimised navigation, and fluid grids that scale gracefully to desktop.",
    impact: "Higher search rankings + lower bounce rate",
    howWeDoIt: [
      "Responsive CSS grid & flexbox from the smallest breakpoint up",
      "Touch-friendly tap targets and swipe gestures",
      "Viewport-relative typography for perfect scaling",
      "Mobile-first performance budgets enforced at build time",
    ],
  },
  {
    num: "02",
    accent: "blue",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Speed & Performance Optimisation",
    category: "Core Web Vitals",
    summary:
      "A one-second delay reduces conversions by 7%. Our sites consistently score 95+ on Google PageSpeed. We achieve this through image optimisation, code-splitting, CDN delivery, and server-side rendering.",
    impact: "95+ performance score, faster conversions",
    howWeDoIt: [
      "Next.js SSR/SSG for sub-200ms first content paint",
      "WebP & AVIF images with lazy loading",
      "Code-splitting and tree-shaking with zero unused JS",
      "Edge CDN deployment via Vercel for global latency",
    ],
  },
  {
    num: "03",
    accent: "orange",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "User Experience (UX) Engineering",
    category: "Engagement & Retention",
    summary:
      "Visitors who enjoy browsing stay longer, trust more, and convert higher. We map every user journey before writing code — clear IA, intuitive navigation, and purposeful visual hierarchy guide users to your goals.",
    impact: "Longer sessions, lower exit rate",
    howWeDoIt: [
      "Figma wireframes and user flow mapping pre-development",
      "Accessibility-first component design (WCAG 2.1 AA)",
      "Consistent design systems for predictable interactions",
      "A/B testable component architecture",
    ],
  },
  {
    num: "04",
    accent: "blue",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: "SEO-First Development",
    category: "Search Visibility",
    summary:
      "SEO is built into our code, not bolted on after. Semantic HTML, structured data, clean URLs, proper heading hierarchies, and optimised meta tags ensure search engines understand and rank your site from day one.",
    impact: "Organic traffic growth from launch day",
    howWeDoIt: [
      "Semantic HTML5 with proper heading hierarchy (H1→H6)",
      "JSON-LD structured data for rich snippets",
      "Canonical tags, XML sitemaps, and robots.txt configuration",
      "Core Web Vitals compliance — LCP, FID, CLS optimised",
    ],
  },
  {
    num: "05",
    accent: "orange",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Security-First Engineering",
    category: "Trust & Compliance",
    summary:
      "Security is never an afterthought at Serenly. Every site is deployed with HTTPS, hardened server configurations, input sanitisation, and regular dependency audits — protecting your business and your customers.",
    impact: "Customer trust + search ranking boost",
    howWeDoIt: [
      "SSL/TLS from day one — HTTPS enforced across all routes",
      "Secure HTTP headers (CSP, HSTS, X-Frame-Options)",
      "Input sanitisation and SQL-injection protection",
      "Scheduled vulnerability audits and dependency updates",
    ],
  },
  {
    num: "06",
    accent: "blue",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Conversion-Focused Design",
    category: "Revenue Impact",
    summary:
      "A beautiful site that doesn't convert is decoration. We engineer every CTA placement, form flow, and trust signal strategically — guiding visitors naturally toward the actions that grow your revenue.",
    impact: "Higher lead capture & lower cart abandonment",
    howWeDoIt: [
      "Strategically placed, high-contrast CTAs above the fold",
      "Streamlined checkout flows with minimal friction",
      "Social proof integration — reviews, badges, client logos",
      "Heat-map friendly layouts for ongoing CRO testing",
    ],
  },
  {
    num: "07",
    accent: "orange",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Digital Marketing Integrations",
    category: "Growth Tooling",
    summary:
      "Your website should be the hub of your marketing stack, not isolated from it. We integrate GA4, CRM platforms, email automation, M-Pesa payments, and advertising pixels so your data flows without friction.",
    impact: "Unified data, better marketing ROI",
    howWeDoIt: [
      "Google Analytics 4 + Search Console setup & event tracking",
      "CRM integration (HubSpot, Salesforce, Zoho)",
      "Email automation (Mailchimp, ConvertKit, Brevo)",
      "M-Pesa, Stripe, and PayPal payment gateway APIs",
    ],
  },
  {
    num: "08",
    accent: "blue",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    title: "Scalable & Future-Ready Architecture",
    category: "Infrastructure",
    summary:
      "We build for where your business is going, not just where it is today. Load-balanced cloud infrastructure, microservice-ready APIs, and modular codebases ensure your site handles 10× growth without a rebuild.",
    impact: "Handle traffic spikes without downtime",
    howWeDoIt: [
      "Cloud-native deployment — Vercel, AWS, or Railway",
      "Horizontal scaling with load balancing baked in",
      "API-first architecture for easy third-party expansion",
      "Database indexing and query optimisation from day one",
    ],
  },
  {
    num: "09",
    accent: "orange",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
    title: "Voice & AI Search Optimisation",
    category: "Next-Gen SEO",
    summary:
      "AI-powered search (Google SGE, Bing Copilot) and voice assistants demand structured, conversational content. We build sites with FAQ schema, clear answer blocks, and NLP-optimised copy ready for the next wave of search.",
    impact: "Competitive edge in AI-powered search results",
    howWeDoIt: [
      "FAQ and HowTo schema markup for AI search snippets",
      "Conversational content structure with direct answer blocks",
      "Speakable schema for voice assistant compatibility",
      "Semantic keyword clusters instead of keyword stuffing",
    ],
  },
  {
    num: "10",
    accent: "blue",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Consistent Branding Systems",
    category: "Brand Identity",
    summary:
      "Inconsistent branding erodes trust. We build design systems — token-based colour palettes, typography scales, and component libraries — that keep every page cohesive and your brand memorable across every touchpoint.",
    impact: "Stronger brand recall and trust signals",
    howWeDoIt: [
      "Custom design token system (colours, spacing, typography)",
      "Reusable component library documented in Storybook",
      "Style guide handoff for your in-house team",
      "Consistent micro-copy tone across all UI states",
    ],
  },
  {
    num: "11",
    accent: "orange",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: "Ongoing Maintenance & Support",
    category: "Post-Launch Care",
    summary:
      "Websites decay without care — plugins break, security patches are missed, and content goes stale. Every Serenly project includes 3 months of post-launch support, with retainer plans available for continuous care.",
    impact: "Zero downtime, always current, always secure",
    howWeDoIt: [
      "3 months post-launch support included in every project",
      "Automated uptime monitoring with instant alerts",
      "Monthly dependency and security patch reviews",
      "Quarterly performance audits with improvement reports",
    ],
  },
  {
    num: "12",
    accent: "blue",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Data-Driven Continuous Improvement",
    category: "Analytics & CRO",
    summary:
      "At Serenly, launch is not the finish line — it's the starting gun. We configure analytics dashboards that track real business metrics: conversion funnels, traffic sources, user behaviour, and revenue attribution.",
    impact: "Compounding ROI with every iteration",
    howWeDoIt: [
      "Custom GA4 dashboards tracking your business KPIs",
      "Funnel analysis to identify drop-off and opportunity",
      "Heatmap & session recording integration (Hotjar/Clarity)",
      "Quarterly data reviews with actionable recommendations",
    ],
  },
];

/* ─── JSON-LD SEO Schema ────────────────────────────────── */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Web Development Strategies by Serenly",
  description:
    "12 proven web development strategies Serenly uses to build high-performance, conversion-ready websites for businesses in Kenya and Africa.",
  numberOfItems: 12,
  itemListElement: STRATEGIES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    description: s.summary,
  })),
};

/* ─── Strategy Card ─────────────────────────────────────── */
function StrategyCard({ strategy, index, visible }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isOrange = strategy.accent === "orange";

  return (
    <article
      aria-label={strategy.title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "var(--radius-xl)",
        background: "var(--color-surface)",
        border: "1px solid",
        borderColor: hovered
          ? isOrange
            ? "rgba(254,122,54,0.35)"
            : "rgba(0,70,255,0.3)"
          : "var(--color-border)",
        padding: "1.75rem",
        transition: "all 0.35s var(--ease-spring)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? isOrange
            ? "var(--shadow-orange)"
            : "var(--shadow-blue)"
          : "var(--shadow-sm)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${(index % 3) * 60}ms`,
        cursor: "pointer",
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1.25rem",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "var(--radius-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isOrange
              ? "rgba(254,122,54,0.1)"
              : "rgba(0,70,255,0.08)",
            border: `1px solid ${isOrange ? "rgba(254,122,54,0.25)" : "rgba(0,70,255,0.2)"}`,
            color: isOrange
              ? "var(--color-brand-orange)"
              : "var(--color-brand-blue)",
            flexShrink: 0,
            transition: "transform 0.3s ease",
            transform: hovered ? "scale(1.06) rotate(-2deg)" : "scale(1)",
          }}
        >
          {strategy.icon}
        </div>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.25rem 0.6rem",
              borderRadius: "var(--radius-full)",
              background: isOrange
                ? "rgba(254,122,54,0.07)"
                : "rgba(0,70,255,0.06)",
              border: `1px solid ${isOrange ? "rgba(254,122,54,0.2)" : "rgba(0,70,255,0.18)"}`,
              color: isOrange
                ? "var(--color-brand-orange)"
                : "var(--color-brand-blue)",
            }}
          >
            {strategy.category}
          </span>
        </div>
      </div>

      {/* Number */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.75rem",
          color: "var(--color-text-tertiary)",
          letterSpacing: "0.1em",
          marginBottom: "0.4rem",
        }}
      >
        {strategy.num}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.2rem",
          marginBottom: "0.75rem",
          lineHeight: 1.2,
          color: hovered
            ? isOrange
              ? "var(--color-brand-orange)"
              : "var(--color-brand-blue)"
            : "var(--color-text-primary)",
          transition: "color 0.2s ease",
        }}
      >
        {strategy.title}
      </h3>

      {/* Summary */}
      <p
        style={{
          fontSize: "0.9rem",
          lineHeight: 1.75,
          color: "var(--color-text-secondary)",
          marginBottom: "1rem",
        }}
      >
        {strategy.summary}
      </p>

      {/* Impact pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontSize: "0.72rem",
          fontWeight: 700,
          color: isOrange
            ? "var(--color-brand-orange)"
            : "var(--color-brand-blue)",
          background: isOrange
            ? "rgba(254,122,54,0.06)"
            : "rgba(0,70,255,0.05)",
          border: `1px solid ${isOrange ? "rgba(254,122,54,0.18)" : "rgba(0,70,255,0.16)"}`,
          borderRadius: "var(--radius-full)",
          padding: "0.3rem 0.75rem",
          marginBottom: "1rem",
          letterSpacing: "0.04em",
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
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
        {strategy.impact}
      </div>

      {/* Expandable how-we-do-it */}
      <div
        style={{
          maxHeight: expanded ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "1.25rem",
            marginTop: "0.5rem",
          }}
        >
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text-tertiary)",
              marginBottom: "0.75rem",
            }}
          >
            How We Do It
          </div>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.55rem",
            }}
          >
            {strategy.howWeDoIt.map((point, pi) => (
              <li
                key={pi}
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
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: isOrange
                      ? "rgba(254,122,54,0.1)"
                      : "rgba(0,70,255,0.08)",
                    border: `1px solid ${isOrange ? "rgba(254,122,54,0.25)" : "rgba(0,70,255,0.2)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isOrange
                      ? "var(--color-brand-orange)"
                      : "var(--color-brand-blue)",
                    fontSize: "0.55rem",
                    fontWeight: 700,
                    marginTop: "0.1rem",
                  }}
                >
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Expand toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          fontSize: "0.8rem",
          fontWeight: 700,
          marginTop: "1rem",
          color: isOrange
            ? "var(--color-brand-orange)"
            : "var(--color-brand-blue)",
        }}
      >
        {expanded ? "Show less" : "How we do it"}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.3s ease",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </article>
  );
}

/* ─── Stats bar ─────────────────────────────────────────── */
function StatsBar({ visible }) {
  const stats = [
    { val: "12", label: "Core Strategies", accent: "orange" },
    { val: "95+", label: "Avg Perf Score", accent: "blue" },
    { val: "54%", label: "Traffic is Mobile", accent: "orange" },
    { val: "7%", label: "Conversion Lost per 1s Delay", accent: "blue" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "1px",
        background: "var(--color-border)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        marginBottom: "5rem",
      }}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          style={{
            background: "var(--color-surface)",
            padding: "1.5rem 2rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: `all 0.5s ease ${i * 0.08}s`,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.25rem",
              lineHeight: 1,
              color:
                s.accent === "orange"
                  ? "var(--color-brand-orange)"
                  : "var(--color-brand-blue)",
              marginBottom: "0.35rem",
            }}
          >
            {s.val}
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-text-tertiary)",
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════ */
export default function Solutions() {
  const [ref, visible] = useFadeIn(0.06);
  const [cardsRef, cardsVisible] = useFadeIn(0.04);

  return (
    <>
      {/* JSON-LD SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <section
        id="web-development-strategies"
        ref={ref}
        className="section-padding"
        style={{ background: "var(--color-bg-primary)" }}
        aria-label="Web Development Strategies"
      >
        <div className="container-site">
          {/* ── Section header ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(2rem, 5vw, 6rem)",
              alignItems: "flex-end",
              marginBottom: "3.5rem",
            }}
            className="strat-header-grid"
          >
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-20px)",
                transition: "all 0.6s ease",
              }}
            >
              {/* Section tag */}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-orange)",
                  background: "rgba(254,122,54,0.06)",
                  border: "1px solid rgba(254,122,54,0.18)",
                  borderRadius: "var(--radius-full)",
                  padding: "0.3rem 0.9rem",
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--color-brand-orange)",
                    display: "inline-block",
                  }}
                />
                Our Development Approach
              </span>

              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.1rem, 4vw, 3.25rem)",
                  lineHeight: 1.08,
                  marginTop: "0.5rem",
                }}
              >
                12 Strategies That Make{" "}
                <span className="text-gradient-orange">Every Website</span> We
                Build <span className="text-gradient-blue">Perform.</span>
              </h2>

              <div style={{ marginTop: "2rem" }}>
                <div
                  className="divider-gradient divider"
                  style={{ marginBottom: "1.5rem" }}
                />
                <a href="/contact" className="btn btn-primary btn-md">
                  Start Your Project
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

            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(20px)",
                transition: "all 0.6s ease 0.15s",
              }}
            >
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.85,
                  color: "var(--color-text-secondary)",
                  marginBottom: "1rem",
                }}
              >
                Building a website without a strategy is building to fail.
                Serenly combines 12 proven web development strategies — from
                mobile-first architecture and Core Web Vitals optimisation to
                SEO-first development and AI search readiness — into every
                project we deliver.
              </p>
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.85,
                  color: "var(--color-text-secondary)",
                }}
              >
                Click any strategy below to see exactly how we implement it for
                your business.
              </p>
            </div>
          </div>

          {/* ── Stats bar ── */}
          <StatsBar visible={visible} />

          {/* ── Strategy cards grid ── */}
          <div ref={cardsRef}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.25rem",
              }}
              className="strat-cards-grid"
            >
              {STRATEGIES.map((strategy, i) => (
                <StrategyCard
                  key={strategy.num}
                  strategy={strategy}
                  index={i}
                  visible={cardsVisible}
                />
              ))}
            </div>
          </div>

          {/* ── Bottom CTA strip ── */}
          <div
            style={{
              marginTop: "4rem",
              padding: "2.5rem",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg-secondary)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem",
              opacity: cardsVisible ? 1 : 0,
              transform: cardsVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.6s",
            }}
          >
            <div>
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  marginBottom: "0.4rem",
                }}
              >
                Want all 12 strategies applied to your project?
              </h4>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                Every Serenly website ships with these principles baked in — not
                as extras, but as standard.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href="/contact" className="btn btn-primary btn-md">
                Get a Free Quote
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
              <a href="#web-development-strategies" className="btn btn-ghost btn-md">
                View Solutions
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .strat-header-grid { grid-template-columns: 1fr !important; }
            .strat-cards-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}
