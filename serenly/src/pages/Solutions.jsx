// src/pages/Solutions.jsx
// Serenly — Web Development page, routed at /web-dev
// 12 proven web development strategies — copy sourced from industry
// research, preserved verbatim. Visual system rebuilt to match Serenly's
// Home/Services design language: rounded-soft cards, orange/blue/green
// rotating accents, Reveal + ParallaxLayer scroll motion.
// SEO schema markup included via JSON-LD.

import React, { useState } from "react";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { Reveal, ParallaxLayer } from "../components/Parallax";

/* ─── Accent system — orange / blue / green rotate roughly 1/3 each ──── */
const ACCENT = {
  orange: {
    text: "text-brand-orange",
    groupHoverText: "group-hover:text-brand-orange",
    tag: "section-tag-orange",
    iconBg: "bg-brand-orange/10",
    iconBorder: "border-brand-orange/25",
    chipBg: "bg-brand-orange/7",
    chipBorder: "border-brand-orange/20",
    hoverBorder: "group-hover:border-brand-orange/35",
    hoverShadow:
      "group-hover:shadow-[0_20px_50px_-16px_rgba(239,105,5,0.4)]",
  },
  blue: {
    text: "text-brand-blue",
    groupHoverText: "group-hover:text-brand-blue",
    tag: "section-tag-blue",
    iconBg: "bg-brand-blue/8",
    iconBorder: "border-brand-blue/20",
    chipBg: "bg-brand-blue/6",
    chipBorder: "border-brand-blue/18",
    hoverBorder: "group-hover:border-brand-blue/30",
    hoverShadow: "group-hover:shadow-[0_20px_50px_-16px_rgba(0,85,218,0.35)]",
  },
  green: {
    text: "text-brand-green",
    groupHoverText: "group-hover:text-brand-green",
    tag: "section-tag-green",
    iconBg: "bg-brand-green/10",
    iconBorder: "border-brand-green/25",
    chipBg: "bg-brand-green/8",
    chipBorder: "border-brand-green/25",
    hoverBorder: "group-hover:border-brand-green/35",
    hoverShadow:
      "group-hover:shadow-[0_20px_50px_-16px_rgba(91,126,60,0.4)]",
  },
};

/* ─── Strategy data — sourced from industry research ──────────────────
   Accents rebalanced to a genuine 1/3 orange / 1/3 blue / 1/3 green split
   (4 strategies each) — all titles, summaries, impact stats and
   how-we-do-it bullets preserved exactly. ─────────────────────────── */
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
    accent: "green",
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
    accent: "green",
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
    accent: "green",
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
    accent: "green",
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

/* ─── JSON-LD SEO Schema ────────────────────────────────────────────── */
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

/* ─── Stats bar data ────────────────────────────────────────────────── */
const STATS = [
  { val: "12", label: "Core Strategies", accent: "orange" },
  { val: "95+", label: "Avg Perf Score", accent: "blue" },
  { val: "54%", label: "Traffic is Mobile", accent: "green", tint: true },
  { val: "7%", label: "Conversion Lost per 1s Delay", accent: "orange" },
];

/* ─── Strategy Card ─────────────────────────────────────────────────── */
function StrategyCard({ strategy }) {
  const [open, setOpen] = useState(false);
  const a = ACCENT[strategy.accent];

  const toggle = () => setOpen((v) => !v);

  return (
    <article
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label={strategy.title}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      className={`group relative flex h-full cursor-pointer flex-col rounded-soft border border-border bg-bg-secondary p-7 transition-all duration-300 hover:-translate-y-1 ${a.hoverBorder} ${a.hoverShadow}`}
    >
      {/* Top row — icon + category tag */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-soft border transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 ${a.iconBg} ${a.iconBorder} ${a.text}`}
        >
          {strategy.icon}
        </div>
        <span className={`section-tag ${a.tag}`}>{strategy.category}</span>
      </div>

      <div className="mb-1 font-display text-xs tracking-[0.1em] text-text-tertiary">
        {strategy.num}
      </div>

      <h3
        className={`mb-3 font-display text-xl leading-tight text-foreground transition-colors duration-300 ${a.groupHoverText}`}
      >
        {strategy.title}
      </h3>

      <p className="mb-5 text-sm leading-relaxed text-text-secondary">
        {strategy.summary}
      </p>

      {/* Impact chip */}
      <div
        className={`mb-5 inline-flex w-fit items-center gap-1.5 rounded-pill! border px-3 py-1.5 text-[0.7rem] font-bold tracking-wide ${a.chipBg} ${a.chipBorder} ${a.text}`}
      >
        <Check size={12} strokeWidth={3} />
        {strategy.impact}
      </div>

      {/* Expandable how-we-do-it */}
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <div className="mt-1 border-t border-border pt-5">
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-text-tertiary">
              How We Do It
            </p>
            <ul className="flex flex-col gap-2.5">
              {strategy.howWeDoIt.map((point, pi) => (
                <li
                  key={pi}
                  className="flex items-start gap-2.5 text-sm text-text-secondary"
                >
                  <span
                    className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-pill border ${a.iconBg} ${a.iconBorder} ${a.text}`}
                  >
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Expand toggle indicator */}
      <div
        className={`mt-5 flex items-center gap-1.5 text-sm font-bold ${a.text}`}
      >
        {open ? "Show less" : "How we do it"}
        <ChevronDown
          size={15}
          strokeWidth={2.5}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </div>
    </article>
  );
}

/* ─── Stats bar ──────────────────────────────────────────────────────── */
function StatsBar() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-soft border border-border bg-border md:grid-cols-4">
      {STATS.map((s, i) => (
        <Reveal
          key={s.label}
          type="up"
          delay={i * 0.08}
          className={`px-6 py-8 md:px-8 ${s.tint ? "bg-brand-periwinkle/15" : "bg-background"}`}
        >
          <p
            className={`mb-2 font-display text-4xl leading-none md:text-[2.75rem] ${ACCENT[s.accent].text}`}
          >
            {s.val}
          </p>
          <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary md:text-sm">
            {s.label}
          </p>
        </Reveal>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════════════ */
export default function Solutions() {
  return (
    <div
      id="web-development-strategies"
      className="min-h-screen bg-background text-foreground font-body"
    >
      {/* JSON-LD SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* ── Hero / section header ── */}
      <section
        className="relative overflow-hidden px-6 pb-16 pt-32 md:pb-20 md:pt-40 lg:px-12"
        aria-label="Web Development Strategies"
      >
        <ParallaxLayer
          speed={-40}
          className="pointer-events-none absolute -left-24 -top-20 h-[380px] w-[380px] rounded-pill"
          style={{
            background:
              "radial-gradient(circle, rgba(239,105,5,0.14) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        <ParallaxLayer
          speed={50}
          className="pointer-events-none absolute -right-28 top-24 h-[420px] w-[420px] rounded-pill"
          style={{
            background:
              "radial-gradient(circle, rgba(0,85,218,0.12) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        <ParallaxLayer
          speed={-25}
          className="pointer-events-none absolute bottom-[-4rem] left-1/3 h-[300px] w-[300px] rounded-pill"
          style={{
            background:
              "radial-gradient(circle, rgba(91,126,60,0.12) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        <div className="container-site relative">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-2 lg:gap-20">
            <Reveal type="left">
              <span className="section-tag section-tag-orange mb-6">
                <span className="inline-block h-1.5 w-1.5 rounded-pill bg-brand-orange" />
                Our Development Approach
              </span>

              <h1 className="mb-2 leading-[1.08]">
                12 Strategies That Make{" "}
                <span className="text-gradient-orange">Every Website</span> We
                Build <span className="text-gradient-blue">Perform.</span>
              </h1>

              <div className="divider-gradient divider my-8" />

              <a
                href="/contact"
                className="btn btn-primary btn-md rounded-pill!"
              >
                Start Your Project
                <ArrowUpRight size={16} />
              </a>
            </Reveal>

            <Reveal type="right" delay={0.15}>
              <p className="mb-4 text-lg leading-relaxed text-text-secondary">
                Building a website without a strategy is building to fail.
                Serenly combines 12 proven web development strategies — from
                mobile-first architecture and Core Web Vitals optimisation to
                SEO-first development and AI search readiness — into every
                project we deliver.
              </p>
              <p className="text-lg leading-relaxed text-text-secondary">
                Click any strategy below to see exactly how we implement it
                for your business.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="relative overflow-hidden px-6 pb-16 md:pb-20 lg:px-12">
        <ParallaxLayer
          speed={30}
          className="pointer-events-none absolute -right-32 top-0 h-[500px] w-[500px] rounded-pill opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(201,211,243,0.4) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div className="container-site relative">
          <StatsBar />
        </div>
      </section>

      {/* ── Strategy cards grid ── */}
      <section className="px-6 pb-16 md:pb-20 lg:px-12">
        <div className="container-site">
          <Reveal type="up" className="mb-10 md:mb-12">
            <span className="section-tag section-tag-green">
              The Strategies
            </span>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {STRATEGIES.map((strategy, i) => (
              <Reveal key={strategy.num} type="up" delay={(i % 3) * 0.08}>
                <StrategyCard strategy={strategy} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA banner ── */}
      <section className="relative z-10 -mt-4 px-4 pb-20 md:-mt-8 md:px-6 md:pb-28 lg:px-12">
        <Reveal type="scale" className="container-site">
          <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-soft bg-brand-black px-6 py-14 text-neutral-0 md:flex-row md:rounded-[36px] md:px-14 md:py-16">
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-pill"
              style={{
                background:
                  "radial-gradient(circle, rgba(239,105,5,0.18) 0%, transparent 70%)",
              }}
            />
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-pill"
              style={{
                background:
                  "radial-gradient(circle, rgba(91,126,60,0.18) 0%, transparent 70%)",
              }}
            />

            <div className="relative max-w-xl text-center md:text-left">
              <h4 className="mb-3 font-display text-2xl leading-tight md:text-3xl">
                Want all 12 strategies applied to your project?
              </h4>
              <p className="leading-relaxed text-neutral-0/70">
                Every Serenly website ships with these principles baked in —
                not as extras, but as standard.
              </p>
            </div>

            <div className="relative flex shrink-0 flex-wrap justify-center gap-3">
              <a
                href="/contact"
                className="btn btn-primary btn-md rounded-pill!"
              >
                Get a Free Quote
                <ArrowUpRight size={16} />
              </a>
              <a
                href="#web-development-strategies"
                className="inline-flex items-center gap-2 rounded-pill border border-neutral-0/25 px-6 py-3 text-sm font-semibold text-neutral-0 transition-all hover:border-brand-orange hover:text-brand-orange"
              >
                View Solutions
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
