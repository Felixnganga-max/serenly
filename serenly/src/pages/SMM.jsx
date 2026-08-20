// src/pages/SMM.jsx
// Serenly — Social Media Marketing (Meta Ads) Service Page
// SEO-structured with real Meta advertising data, statistics, and best practices
// Sections:
//   1. Hero          — floating card, live metric badges, platform tabs
//   2. Why Meta      — real stats + value proposition
//   3. Ad Formats    — image / video / carousel / collection with real descriptions
//   4. Retargeting   — how the pixel works, cart abandonment, ROAS
//   5. Our Strategy  — 10 real techniques (audience segmentation, UGC, lookalikes, UTMs…)
//   6. Platforms     — Facebook vs Instagram deep-dive
//   7. Process       — 5-step timeline
//   8. Results       — real benchmark metrics
//   9. FAQ           — SEO-rich Q&A
//  10. CTA

import React, { useEffect, useState } from "react";
import { Reveal, ParallaxLayer } from "../components/Parallax";

/* ─────────────────────────────────────────────
   ACCENT LOOKUPS
   Shared orange / blue / green / periwinkle
   values consumed by the inline style ternaries
   throughout this page's accent-driven cards.
───────────────────────────────────────────── */
const ACCENT_RGB = {
  orange: "239, 105, 5",
  blue: "0, 85, 218",
  green: "91, 126, 60",
  periwinkle: "201,211,243",
};
const ACCENT_VAR = {
  orange: "var(--color-brand-orange)",
  blue: "var(--color-brand-blue)",
  green: "var(--color-brand-green)",
  periwinkle: "var(--color-brand-periwinkle-dark)",
};

/* ─────────────────────────────────────────────
   REAL DATA (sourced from article research)
───────────────────────────────────────────── */

const META_STATS = [
  { val: "5B+", label: "Social media users globally", accent: "orange" },
  { val: "2.5hrs", label: "Average daily time on social", accent: "blue" },
  { val: "70%", label: "US adults log into Facebook daily", accent: "green" },
  {
    val: "$5–30",
    label: "Average CPL on Meta vs $20–100 on Google",
    accent: "periwinkle",
  },
];

const AD_FORMATS = [
  {
    id: "image",
    icon: "🖼️",
    title: "Image Ads",
    accent: "orange",
    badge: "Most Used",
    desc: "A single eye-catching image — professional photo, user-generated content, or a designed graphic. Best for brand awareness, driving website traffic, and showcasing products or services. Keep text minimal on the creative itself.",
    useCases: [
      "Brand awareness",
      "Product showcase",
      "Website traffic",
      "Promotions",
    ],
    tip: "Use real customer photos or UGC over stock imagery — authenticity drives 3× more engagement.",
  },
  {
    id: "video",
    icon: "🎬",
    title: "Video Ads",
    accent: "blue",
    badge: "Highest Engagement",
    desc: "Video drives 67.55% more ad clicks on Facebook than static images. Great for storytelling, product demos, tutorials and creating immersive brand experiences that hold attention far longer than images.",
    useCases: [
      "Product demos",
      "Brand storytelling",
      "Tutorials",
      "Testimonials",
    ],
    tip: "Business owner self-recorded smartphone videos often outperform polished productions — raw and real wins on social.",
  },
  {
    id: "carousel",
    icon: "🎠",
    title: "Carousel Ads",
    accent: "green",
    badge: "Best for Products",
    desc: "Multiple images or cards in one ad. Carousels invite users to swipe and discover more — ideal when showcasing multiple products, services, or a narrative that builds curiosity. The key: make the content flow, not feel generic.",
    useCases: [
      "Multiple products",
      "Step-by-step stories",
      "Feature showcases",
      "Before/after",
    ],
    tip: "Craft a narrative across cards — each swipe should leave the viewer curious about the next one.",
  },
  {
    id: "collection",
    icon: "🛍️",
    title: "Collection Ads",
    accent: "blue",
    badge: "Best for eCommerce",
    desc: "A product video or hero image with 3 thumbnail products below. Tapping opens an Instant Experience — a fast, full-screen shopping journey inside Meta. Purpose-built for eCommerce brands wanting frictionless purchase flows.",
    useCases: [
      "eCommerce catalogues",
      "Product collections",
      "Seasonal sales",
      "New arrivals",
    ],
    tip: "Pair with Facebook Shop and a product catalogue for seamless checkout without leaving the platform.",
  },
];

const RETARGETING_TYPES = [
  {
    icon: "🌐",
    title: "Website Retargeting",
    desc: "Target users who visited your website but didn't convert — by page visited, exact URL, or time spent on site. Re-engages visitors who clearly showed interest in your brand.",
    color: "orange",
  },
  {
    icon: "🛒",
    title: "Cart Abandonment",
    desc: "Specifically targets users who added items to their cart but didn't complete the purchase. Significantly reduces abandonment rates and directly boosts sales revenue.",
    color: "blue",
  },
  {
    icon: "👥",
    title: "Lookalike Audiences",
    desc: "Meta builds a new audience that mirrors the behaviour and interests of your existing customers or site visitors — expanding your reach to cold audiences most likely to convert.",
    color: "green",
  },
  {
    icon: "📧",
    title: "Custom Audience Upload",
    desc: "Upload your customer list (name, email, phone, DOB, zip) for 80–90% match rates on Meta. Target existing customers with upsells, re-engagement offers, or loyalty campaigns.",
    color: "green",
  },
];

const STRATEGY_PILLARS = [
  {
    num: "01",
    title: "Audience Segmentation",
    desc: "Segment at the Ad Set level by behaviour, demographics, and interests. Allocate budget dynamically to best-performing sets — pause what underperforms, scale what converts.",
    icon: "🎯",
    accent: "orange",
  },
  {
    num: "02",
    title: "Raw, Authentic Creative",
    desc: "Real beats polished on Meta. Smartphone videos from business owners, UGC, and candid content blend into the organic feed — driving more comments, clicks, and shares.",
    icon: "📱",
    accent: "blue",
  },
  {
    num: "03",
    title: "UTM Tracking",
    desc: "Every ad URL carries UTM parameters so Google Analytics shows exactly which ads drive traffic and revenue — far more accurate than Meta's own attribution reporting.",
    icon: "🔗",
    accent: "green",
  },
  {
    num: "04",
    title: "Meta Ad Library Research",
    desc: "We analyse competitor ads in Meta's public Ad Library before every campaign — understanding their creative strategy, ad types, and targeting gaps we can exploit.",
    icon: "🔍",
    accent: "blue",
  },
  {
    num: "05",
    title: "No Boost Post — Ever",
    desc: "We never use the Boost Post feature. It causes targeting mismatches and wastes budget. Every campaign is built properly inside Meta Ads Manager for full control.",
    icon: "🚫",
    accent: "orange",
  },
  {
    num: "06",
    title: "Ad Relevance Optimisation",
    desc: "We monitor Quality Ranking, Engagement Rate Ranking, and Conversion Rate Ranking — Meta's three Ad Relevance Diagnostics — to keep CPMs low and delivery high.",
    icon: "📊",
    accent: "green",
  },
];

const PLATFORMS = [
  {
    id: "facebook",
    label: "Facebook",
    color: "#1877F2",
    tagline: "Turn Scrollers Into Buyers",
    desc: "With 2.9 billion monthly active users and the most advanced targeting system in digital advertising, Facebook lets you reach exactly who you want — by age, interest, behaviour, location, income bracket, and more. We manage your page, run campaigns, and build audiences that compound over time.",
    placements: [
      "News Feed",
      "Marketplace",
      "Facebook Watch",
      "Stories",
      "Reels",
      "Search Results",
    ],
    services: [
      {
        title: "Page Management",
        detail: "Daily posts, community engagement & consistent brand voice",
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
          "Facebook Shop setup & product catalogue ads for eCommerce brands",
      },
    ],
    stat: { val: "70%", label: "of US adults use Facebook daily" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    color: "#E1306C",
    tagline: "Build a Brand People Follow & Buy From",
    desc: "Instagram is where aesthetics meet commerce. With 63% of users checking daily, it's the premier platform for visual brands, eCommerce, and service businesses that want to build genuine community. We run feeds, reels, stories, and paid campaigns — all aligned to your visual identity.",
    placements: ["Main Feed", "Stories", "Reels", "Instagram Shop", "Explore"],
    services: [
      {
        title: "Feed Curation",
        detail:
          "Grid planning, colour palette & aesthetic direction for a scroll-stopping profile",
      },
      {
        title: "Reels & Stories",
        detail:
          "Short-form video that reaches non-followers and drives saves, shares & follows",
      },
      {
        title: "Instagram Ads",
        detail:
          "Awareness, traffic, conversion & lead generation via Meta Ads Manager",
      },
      {
        title: "Influencer Outreach",
        detail:
          "Micro-influencer collaborations for authentic reach in Kenya & East Africa",
      },
      {
        title: "Instagram Shop",
        detail:
          "Product tagging, shopping posts & checkout optimisation for eCommerce",
      },
      {
        title: "DM Automation",
        detail:
          "ManyChat flows that convert DM enquiries into booked calls or closed sales",
      },
    ],
    stat: { val: "63%", label: "of users check Instagram daily" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

const PROCESS = [
  {
    num: 1,
    title: "Discovery & Audit",
    desc: "We audit your existing profiles, analyse your competitors in Meta Ad Library, and map your target audience by behaviour and interest group.",
    color: "var(--color-brand-orange)",
  },
  {
    num: 2,
    title: "Strategy & Calendar",
    desc: "Full 30-day content calendar, campaign objectives, ad budget allocation, and audience segmentation plan — reviewed and approved before we touch anything.",
    color: "var(--color-brand-blue)",
  },
  {
    num: 3,
    title: "Content & Creative",
    desc: "Graphics, video scripts, UGC sourcing, captions and hashtag strategy — all crafted to match your brand voice and optimised for Meta's ad relevance scoring.",
    color: "var(--color-brand-green)",
  },
  {
    num: 4,
    title: "Launch & Engage",
    desc: "Campaigns go live at optimal times. We monitor the auction, adjust bids, respond to comments, manage your inbox, and A/B test creatives continuously.",
    color: "var(--color-brand-green)",
  },
  {
    num: 5,
    title: "Report & Scale",
    desc: "Monthly analytics report with UTM-verified data from Google Analytics: ROAS, CPL, reach, engagement, and a clear plan to scale what's working.",
    color: "var(--color-brand-blue)",
  },
];

const RESULTS = [
  {
    val: "3×",
    label: "Average ROAS on paid campaigns",
    sub: "Return on ad spend",
    accent: "orange",
  },
  {
    val: "8.7%",
    label: "Average engagement rate",
    sub: "vs 0.5–1% industry average",
    accent: "blue",
  },
  {
    val: "80–90%",
    label: "Custom audience match rate",
    sub: "On email/phone list uploads",
    accent: "green",
  },
  {
    val: "30 days",
    label: "To see measurable results",
    sub: "Leads, followers or revenue",
    accent: "green",
  },
];

const FAQS = [
  {
    q: "What's the difference between boosting a post and running a proper Meta ad campaign?",
    a: "Boosting a post is a simplified shortcut that often mismatches your targeting and allocates budget inefficiently. A proper campaign built inside Meta Ads Manager gives you full control over objectives, audience segmentation, placements, creative testing, and bidding strategy — resulting in significantly better performance and lower cost per result.",
  },
  {
    q: "How does the Meta Pixel work for retargeting?",
    a: "The Meta Pixel is a small piece of code installed on your website. When a user visits, a cookie is placed on their browser. Meta then identifies that user on Facebook or Instagram and can show them targeted ads — whether they visited a specific page, spent a certain amount of time on your site, or abandoned a shopping cart.",
  },
  {
    q: "How much should I budget for Meta ads in Kenya?",
    a: "You can start testing with as little as $5–10 per day. For meaningful data and optimisation, we recommend a minimum of $300–500/month on ad spend. The average Cost Per Lead on Meta is $5–30, significantly lower than Google's $20–100 CPL, making it highly cost-effective for local businesses.",
  },
  {
    q: "How long does it take for Meta's algorithm to optimise my ads?",
    a: "Meta needs roughly 50 conversion events per ad set per week to exit the 'learning phase' and start efficient delivery. This typically takes 1–2 weeks for well-targeted campaigns. We structure campaigns to reach this threshold as quickly as possible and use CBO (Campaign Budget Optimisation) to help budget flow to the best-performing ad sets.",
  },
  {
    q: "What ad formats work best for service businesses vs eCommerce?",
    a: "Service businesses typically see best results from video ads (builds trust), lead form campaigns, and retargeting sequences. eCommerce brands perform best with Collection ads, Carousel product ads, and Dynamic Product Ads linked to a Facebook catalogue. We tailor the format mix to your business model and objectives.",
  },
  {
    q: "Do you create the ad content or do we need to provide it?",
    a: "We handle everything — strategy, copywriting, graphic design, video editing, and publishing. You review and approve before anything goes live. We also advise on and help source UGC (user-generated content) since authentic, raw content consistently outperforms polished studio production on Meta platforms.",
  },
];

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
function Tag({ label, color = "orange" }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: "0.68rem",
        fontWeight: 800,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color:
          color === "orange"
            ? "var(--color-brand-orange)"
            : color === "pink"
              ? "#E1306C"
              : color === "green"
                ? "var(--color-brand-green)"
                : "var(--color-brand-blue)",
        background:
          color === "orange"
            ? "rgba(239, 105, 5,0.1)"
            : color === "pink"
              ? "rgba(225,48,108,0.1)"
              : color === "green"
                ? "rgba(91, 126, 60,0.1)"
                : "rgba(0, 85, 218,0.08)",
        border: `1px solid ${color === "orange" ? "rgba(239, 105, 5,0.25)" : color === "pink" ? "rgba(225,48,108,0.25)" : color === "green" ? "rgba(91, 126, 60,0.25)" : "rgba(0, 85, 218,0.2)"}`,
        borderRadius: 999,
        padding: "5px 12px",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background:
            color === "orange"
              ? "var(--color-brand-orange)"
              : color === "pink"
                ? "#E1306C"
                : color === "green"
                  ? "var(--color-brand-green)"
                  : "var(--color-brand-blue)",
          display: "inline-block",
        }}
      />
      {label}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════ */
export default function SMM() {
  const [activePlatform, setActivePlatform] = useState("facebook");
  const [activeFormat, setActiveFormat] = useState("image");
  const [openFaq, setOpenFaq] = useState(null);
  const platform = PLATFORMS.find((p) => p.id === activePlatform);
  const format = AD_FORMATS.find((f) => f.id === activeFormat);

  return (
    <>
      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Social Media Marketing — Facebook & Instagram Ads",
            provider: { "@type": "Organization", name: "Serenly" },
            description:
              "Full-service Meta advertising and social media management for businesses in Kenya. Facebook ads, Instagram ads, retargeting, content creation and monthly reporting.",
            areaServed: "Kenya",
            serviceType: "Social Media Marketing",
          }),
        }}
      />

      <div
        style={{
          background: "var(--color-bg-primary)",
          color: "var(--color-text-primary)",
          // `overflow-x: hidden` alone forces the UA to compute overflow-y as
          // `auto` too (CSS Overflow spec: a lone 'visible' axis paired with a
          // non-visible one is coerced to 'auto'), which turns this wrapper
          // into an unintended scroll container and hijacks every descendant
          // `animation-timeline: view()` <Reveal>/<ParallaxLayer> calculation
          // against this div's own (page-length-tall) box instead of the real
          // viewport — pinning far-down sections like the final CTA at
          // near-zero opacity forever. `clip` on both axes avoids the
          // visible->auto coercion (neither axis is 'visible') while still
          // clipping the horizontal overflow from full-bleed decorative
          // blobs, and — unlike hidden/auto — never establishes a scroll
          // container, so it doesn't hijack view-timeline math.
          overflowX: "clip",
          overflowY: "clip",
        }}
      >
        <HeroSection
          activePlatform={activePlatform}
          setActivePlatform={setActivePlatform}
          platform={platform}
        />
        <StatsStrip />
        <AdFormatsSection
          activeFormat={activeFormat}
          setActiveFormat={setActiveFormat}
          format={format}
        />
        <RetargetingSection />
        <StrategySection />
        <PlatformsSection
          activePlatform={activePlatform}
          setActivePlatform={setActivePlatform}
          platform={platform}
        />
        <ProcessSection />
        <ResultsSection />
        <FaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
        <CtaSection />
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes floatD { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .anim-float { animation: float 6s ease-in-out infinite; }
        .anim-float-d { animation: floatD 8s ease-in-out infinite 1s; }
        .live-dot { animation: pulse 2s ease-in-out infinite; }
        .section-pad { padding: clamp(4rem,8vw,7rem) 0; }
        .smm-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:clamp(2rem,4vw,5rem); align-items:center; }
        @media(max-width:820px){ .smm-grid-2 { grid-template-columns:1fr !important; } }
        .format-tab:hover { transform:translateY(-2px); }
        /* strategy-card / svc-tile / result-card / retarget-card lift is applied via
           onMouseEnter/onMouseLeave (not :hover transform) — those cards are wrapped in
           <Reveal>, whose scroll-linked entrance animation keeps a filled transform value
           that would silently out-prioritise a competing :hover transform in browsers with
           native scroll-timeline support. box-shadow/border-color hover cues don't collide. */
        .faq-item { border-bottom:1px solid var(--color-border); }
        .faq-item:last-child { border-bottom:none; }
      `}</style>
    </>
  );
}

/* ══════ 1. HERO ══════ */
function HeroSection({ activePlatform, setActivePlatform, platform }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      aria-label="Social Media Marketing Services"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(150deg, rgba(239, 105, 5,0.08) 0%, rgba(0, 85, 218,0.06) 45%, rgba(225,48,108,0.05) 100%)",
        padding: "5rem 0 3rem",
      }}
    >
      {/* Background blobs — drift at different speeds for a layered depth effect */}
      {[
        {
          top: "5%",
          left: "4%",
          w: 220,
          bg: "rgba(239, 105, 5,0.15)",
          anim: "anim-float",
          speed: 30,
        },
        {
          top: "12%",
          right: "6%",
          w: 160,
          bg: "rgba(0, 85, 218,0.12)",
          anim: "anim-float-d",
          speed: -24,
        },
        {
          bottom: "18%",
          left: "2%",
          w: 100,
          bg: "rgba(91, 126, 60,0.14)",
          anim: "anim-float",
          speed: 22,
        },
        {
          bottom: "8%",
          right: "4%",
          w: 180,
          bg: "rgba(225,48,108,0.09)",
          anim: "anim-float-d",
          speed: -18,
        },
      ].map((b, i) => (
        <ParallaxLayer key={i} speed={b.speed} style={{ position: "absolute", ...b }}>
          <div
            className={b.anim}
            style={{
              width: b.w,
              height: b.w,
              borderRadius: "50%",
              background: `radial-gradient(circle,${b.bg} 0%,transparent 70%)`,
              filter: "blur(3px)",
              pointerEvents: "none",
            }}
          />
        </ParallaxLayer>
      ))}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px,transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
        }}
      />

      <div
        className="container-site"
        style={{ position: "relative", zIndex: 2, width: "100%" }}
      >
        {/* Floating hero card */}
        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-soft)",
            boxShadow: "var(--shadow-xl)",
            padding: "clamp(2rem,4vw,3.5rem)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.75s cubic-bezier(0.34,1.56,0.64,1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top gradient bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background:
                "linear-gradient(90deg,var(--color-brand-orange),var(--color-brand-blue),#E1306C)",
              borderRadius: "var(--radius-soft) var(--radius-soft) 0 0",
            }}
          />

          <div
            className="smm-grid-2"
            style={{ minHeight: "clamp(340px,45vh,520px)" }}
          >
            {/* LEFT — copy */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(12px)",
                  transition: "all 0.5s ease 0.1s",
                  marginBottom: "1rem",
                }}
              >
                <Tag label="Facebook & Instagram Marketing" color="orange" />
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.2rem,4.5vw,3.8rem)",
                  lineHeight: 1.05,
                  marginBottom: "1.25rem",
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(16px)",
                  transition: "all 0.55s ease 0.18s",
                }}
              >
                Turn Followers
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(135deg,var(--color-brand-orange),#ff8a2e)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Into Revenue.
                </span>
              </h1>

              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.85,
                  color: "var(--color-text-secondary)",
                  maxWidth: 460,
                  marginBottom: "2rem",
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(12px)",
                  transition: "all 0.55s ease 0.26s",
                }}
              >
                Over 5 billion people use social media daily — your ideal
                customers are on Facebook and Instagram right now. Serenly runs
                the strategy, creates the content, manages the ads, and delivers
                monthly reports tied to real business outcomes.
              </p>

              {/* Feature list */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  marginBottom: "2rem",
                }}
              >
                {[
                  {
                    icon: "🎯",
                    t: "Precision Targeting",
                    s: "Super-define your audience by age, interest, behaviour & location",
                  },
                  {
                    icon: "📊",
                    t: "Full Meta Ads Management",
                    s: "Image, video, carousel, collection ads — all formats handled",
                  },
                  {
                    icon: "🔁",
                    t: "Retargeting & Lookalike Audiences",
                    s: "Re-engage website visitors & reach new customers like your best ones",
                  },
                ].map((f, i) => (
                  <div
                    key={f.t}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.875rem",
                      padding: "0.85rem 1rem",
                      borderRadius: "var(--radius-soft)",
                      border: "1px solid var(--color-border)",
                      background: "var(--color-bg-secondary)",
                      opacity: loaded ? 1 : 0,
                      transform: loaded ? "translateX(0)" : "translateX(-16px)",
                      transition: `all 0.5s ease ${0.35 + i * 0.1}s`,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "var(--radius-soft)",
                        flexShrink: 0,
                        background: `rgba(${ACCENT_RGB[["orange", "blue", "green"][i % 3]]},0.1)`,
                        border: `1px solid rgba(${ACCENT_RGB[["orange", "blue", "green"][i % 3]]},0.23)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.15rem",
                      }}
                    >
                      {f.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          marginBottom: 2,
                        }}
                      >
                        {f.t}
                      </div>
                      <div
                        style={{
                          fontSize: "0.775rem",
                          color: "var(--color-text-tertiary)",
                          lineHeight: 1.4,
                        }}
                      >
                        {f.s}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "0.875rem",
                  flexWrap: "wrap",
                  opacity: loaded ? 1 : 0,
                  transition: "all 0.5s ease 0.6s",
                }}
              >
                <a
                  href="#ad-formats"
                  className="btn btn-primary btn-lg"
                  style={{
                    background:
                      "linear-gradient(135deg,var(--color-brand-orange),#ff8a2e)",
                    boxShadow: "0 8px 28px rgba(239, 105, 5,0.4)",
                    borderRadius: "var(--radius-pill)",
                  }}
                >
                  See Ad Formats
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
                <a
                  href="/contact"
                  className="btn btn-ghost btn-lg"
                  style={{ borderRadius: "var(--radius-pill)" }}
                >
                  Get Free Audit
                </a>
              </div>
            </div>

            {/* RIGHT — live metrics mock */}
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Main analytics card */}
              <ParallaxLayer
                speed={18}
                style={{
                  width: "100%",
                  maxWidth: 320,
                  background: "var(--color-surface-raised)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-soft)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    background: "linear-gradient(135deg,#1877F2,#E1306C)",
                    padding: "1rem 1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#f5f5f5",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                    }}
                  >
                    S
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "#f5f5f5",
                      }}
                    >
                      Serenly Client Campaign
                    </div>
                    <div
                      style={{
                        fontSize: "0.62rem",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      Meta Ads Manager · Live
                    </div>
                  </div>
                  <div
                    className="live-dot"
                    style={{
                      marginLeft: "auto",
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#4ade80",
                    }}
                  />
                </div>

                {/* Metrics grid */}
                <div
                  style={{
                    padding: "1.25rem",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.875rem",
                  }}
                >
                  {[
                    {
                      label: "Reach",
                      val: "48,290",
                      change: "+12%",
                      up: true,
                      c: "var(--color-brand-orange)",
                    },
                    {
                      label: "Engagements",
                      val: "4,201",
                      change: "+8.7%",
                      up: true,
                      c: "var(--color-brand-blue)",
                    },
                    {
                      label: "Link Clicks",
                      val: "1,840",
                      change: "+23%",
                      up: true,
                      c: "#E1306C",
                    },
                    {
                      label: "Cost Per Lead",
                      val: "Ksh 340",
                      change: "-18%",
                      up: false,
                      c: "var(--color-brand-green)",
                    },
                  ].map((m) => (
                    <div
                      key={m.label}
                      style={{
                        padding: "0.875rem",
                        borderRadius: "var(--radius-soft)",
                        background: "var(--color-bg-secondary)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "var(--color-text-tertiary)",
                          marginBottom: 4,
                        }}
                      >
                        {m.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.2rem",
                          color: m.c,
                          lineHeight: 1,
                        }}
                      >
                        {m.val}
                      </div>
                      <div
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          color: m.up ? "#4ade80" : "#f87171",
                          marginTop: 3,
                        }}
                      >
                        {m.change} vs last month
                      </div>
                    </div>
                  ))}
                </div>

                {/* ROAS bar */}
                <div style={{ padding: "0 1.25rem 1.25rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6,
                      fontSize: "0.72rem",
                      fontWeight: 700,
                    }}
                  >
                    <span style={{ color: "var(--color-text-secondary)" }}>
                      ROAS
                    </span>
                    <span style={{ color: "var(--color-brand-orange)" }}>
                      3.2× return
                    </span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      borderRadius: 999,
                      background: "var(--color-border)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: "78%",
                        background:
                          "linear-gradient(90deg,var(--color-brand-orange),#ff8a2e)",
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>
              </ParallaxLayer>

              {/* Floating badges */}
              <div
                className="anim-float"
                style={{
                  position: "absolute",
                  top: "-0.75rem",
                  right: "-0.25rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-soft)",
                  background: "var(--color-surface)",
                  border: "1px solid rgba(239, 105, 5,0.3)",
                  boxShadow: "var(--shadow-md)",
                  textAlign: "center",
                  minWidth: 96,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.4rem",
                    color: "var(--color-brand-orange)",
                    lineHeight: 1,
                  }}
                >
                  +2.4k
                </div>
                <div
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-text-tertiary)",
                    marginTop: 2,
                  }}
                >
                  New Followers
                </div>
              </div>

              <div
                className="anim-float-d"
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "-0.75rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-soft)",
                  background: "rgba(201,211,243,0.22)",
                  border: "1px solid var(--color-brand-periwinkle-dark)",
                  boxShadow: "var(--shadow-md)",
                  textAlign: "center",
                  minWidth: 110,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.4rem",
                    color: "var(--color-brand-blue)",
                    lineHeight: 1,
                  }}
                >
                  CPL $8.40
                </div>
                <div
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-text-tertiary)",
                    marginTop: 2,
                  }}
                >
                  Cost Per Lead
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform tab switcher */}
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
              borderRadius: 999,
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
                  padding: "0.55rem 1.4rem",
                  borderRadius: 999,
                  border: "1px solid",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  transition: "all 0.3s ease",
                  background:
                    activePlatform === p.id ? `${p.color}18` : "transparent",
                  color:
                    activePlatform === p.id
                      ? p.color
                      : "var(--color-text-tertiary)",
                  borderColor:
                    activePlatform === p.id ? `${p.color}44` : "transparent",
                  boxShadow:
                    activePlatform === p.id
                      ? `0 4px 14px ${p.color}25`
                      : "none",
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
        <p
          style={{
            textAlign: "center",
            marginTop: "0.75rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "var(--color-text-tertiary)",
          }}
        >
          <span style={{ color: platform.color }}>● </span>
          {platform.tagline}
        </p>
      </div>
    </section>
  );
}

/* ══════ 2. STATS STRIP ══════ */
function StatsStrip() {
  return (
    <section
      style={{
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        padding: "2.5rem 0",
      }}
    >
      <div className="container-site">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "1.5rem",
          }}
          className="stats-grid"
        >
          {META_STATS.map((s, i) => (
            <Reveal
              key={s.label}
              type="up"
              delay={i * 0.08}
              style={{
                textAlign: "center",
                padding: "1.5rem 1rem",
                borderRadius: "var(--radius-soft)",
                background: `rgba(${ACCENT_RGB[s.accent]},0.05)`,
                border: `1px solid rgba(${ACCENT_RGB[s.accent]},0.16)`,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem,3vw,2.5rem)",
                  color:
                    s.accent === "periwinkle"
                      ? "var(--color-text-primary)"
                      : ACCENT_VAR[s.accent],
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-text-tertiary)",
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.stats-grid{grid-template-columns:1fr 1fr !important;}}`}</style>
    </section>
  );
}

/* ══════ 3. AD FORMATS ══════ */
function AdFormatsSection({ activeFormat, setActiveFormat, format }) {
  return (
    <section
      id="ad-formats"
      className="section-pad"
      aria-label="Meta Ad Formats"
    >
      <div className="container-site">
        <Reveal type="up" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Tag label="Ad Formats" color="orange" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              marginTop: "1rem",
              fontSize: "clamp(1.9rem,3.5vw,2.8rem)",
            }}
          >
            The Right Ad Format{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg,var(--color-brand-orange),#ff8a2e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              for Every Goal
            </span>
          </h2>
          <p
            style={{
              maxWidth: 520,
              margin: "0.875rem auto 0",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "var(--color-text-secondary)",
            }}
          >
            Meta offers four core ad formats. Each is suited to different
            objectives, audiences, and business types. We choose — and often mix
            — formats based on your campaign goal.
          </p>
        </Reveal>

        {/* Format tabs */}
        <Reveal
          type="up"
          delay={0.1}
          style={{
            display: "flex",
            gap: "0.625rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
          }}
        >
          {AD_FORMATS.map((f) => (
            <button
              key={f.id}
              className="format-tab"
              onClick={() => setActiveFormat(f.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.65rem 1.25rem",
                borderRadius: "var(--radius-pill)",
                border: `1.5px solid ${activeFormat === f.id ? ACCENT_VAR[f.accent] : "var(--color-border)"}`,
                background:
                  activeFormat === f.id
                    ? `rgba(${ACCENT_RGB[f.accent]},0.1)`
                    : "var(--color-surface)",
                color:
                  activeFormat === f.id
                    ? ACCENT_VAR[f.accent]
                    : "var(--color-text-secondary)",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              {f.icon} {f.title}
              {f.badge && (
                <span
                  style={{
                    fontSize: "0.6rem",
                    padding: "2px 7px",
                    borderRadius: 999,
                    fontWeight: 700,
                    background: `rgba(${ACCENT_RGB[f.accent]},0.14)`,
                    color: ACCENT_VAR[f.accent],
                  }}
                >
                  {f.badge}
                </span>
              )}
            </button>
          ))}
        </Reveal>

        {/* Active format detail — remounts + re-reveals on every tab switch */}
        <Reveal
          key={format.id}
          type="scale"
          style={{
            borderRadius: "var(--radius-soft)",
            background: `linear-gradient(145deg,rgba(${ACCENT_RGB[format.accent]},0.07),rgba(${ACCENT_RGB[format.accent]},0.02))`,
            border: `1px solid rgba(${ACCENT_RGB[format.accent]},0.19)`,
            padding: "clamp(2rem,4vw,3rem)",
          }}
        >
          <div className="smm-grid-2" style={{ gap: "clamp(2rem,4vw,4rem)" }}>
            <div>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "var(--radius-soft)",
                  fontSize: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  background: `rgba(${ACCENT_RGB[format.accent]},0.12)`,
                  border: `1px solid rgba(${ACCENT_RGB[format.accent]},0.26)`,
                }}
              >
                {format.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.6rem,2.5vw,2.1rem)",
                  marginBottom: "1rem",
                }}
              >
                {format.title}
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.85,
                  color: "var(--color-text-secondary)",
                  marginBottom: "1.5rem",
                }}
              >
                {format.desc}
              </p>
              {/* Pro tip */}
              <div
                style={{
                  padding: "1rem 1.25rem",
                  borderRadius: "var(--radius-soft)",
                  background: `rgba(${ACCENT_RGB[format.accent]},0.08)`,
                  border: `1px solid rgba(${ACCENT_RGB[format.accent]},0.19)`,
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: 1 }}
                >
                  💡
                </span>
                <div>
                  <div
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: ACCENT_VAR[format.accent],
                      marginBottom: 4,
                    }}
                  >
                    Pro Tip
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: 1.65,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {format.tip}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: ACCENT_VAR[format.accent],
                  marginBottom: "1.25rem",
                }}
              >
                Best Use Cases
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {format.useCases.map((u, i) => (
                  <div
                    key={u}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.875rem",
                      padding: "1rem 1.25rem",
                      borderRadius: "var(--radius-soft)",
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                    }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: `rgba(${ACCENT_RGB[format.accent]},0.12)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        color: ACCENT_VAR[format.accent],
                      }}
                    >
                      0{i + 1}
                    </span>
                    {u}
                  </div>
                ))}
              </div>
              <a
                href="/contact"
                className="btn btn-primary btn-lg"
                style={{
                  marginTop: "2rem",
                  display: "inline-flex",
                  background:
                    format.accent === "orange"
                      ? "linear-gradient(135deg,var(--color-brand-orange),#ff8a2e)"
                      : format.accent === "green"
                        ? "linear-gradient(135deg,var(--color-brand-green),var(--color-brand-green-light))"
                        : "linear-gradient(135deg,var(--color-brand-blue),#3878e6)",
                  borderRadius: "var(--radius-pill)",
                  boxShadow: `0 8px 28px rgba(${ACCENT_RGB[format.accent]},0.32)`,
                }}
              >
                Run {format.title} for My Business
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
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════ 4. RETARGETING ══════ */
function RetargetingSection() {
  return (
    <section
      id="retargeting"
      aria-label="Meta Pixel Retargeting"
      style={{
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        padding: "clamp(4rem,8vw,7rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ParallaxLayer
        speed={-26}
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: 280,
          height: 280,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(91, 126, 60,0.14) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </ParallaxLayer>
      <ParallaxLayer
        speed={20}
        style={{
          position: "absolute",
          bottom: "6%",
          left: "3%",
          width: 180,
          height: 180,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(239, 105, 5,0.1) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </ParallaxLayer>

      <div className="container-site">
        <div className="smm-grid-2">
          {/* LEFT — explanation */}
          <Reveal type="left">
            <Tag label="Retargeting & Pixel" color="green" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem,3.5vw,2.7rem)",
                marginTop: "1rem",
                marginBottom: "1.25rem",
                lineHeight: 1.1,
              }}
            >
              Most visitors don't buy on the{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg,var(--color-brand-green),var(--color-brand-green-light))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                first visit.
              </span>
            </h2>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "var(--color-text-secondary)",
                marginBottom: "1.25rem",
              }}
            >
              The Meta Pixel is a small piece of code installed on your website.
              When someone visits, a cookie is placed on their browser. The next
              time they're on Facebook or Instagram, your ads appear — keeping
              your brand front of mind until they're ready to buy.
            </p>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "var(--color-text-secondary)",
                marginBottom: "2rem",
              }}
            >
              Retargeting consistently delivers a significantly higher ROAS than
              cold-audience campaigns because you're reaching people who already
              know your brand. Combined with lookalike audiences — which mirror
              your best customers' behaviour — it's the most efficient spend in
              your entire ad account.
            </p>
            {/* How it works flow */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 19,
                  top: 24,
                  bottom: 24,
                  width: 2,
                  background:
                    "linear-gradient(180deg,var(--color-brand-green),var(--color-brand-orange))",
                  borderRadius: 2,
                  opacity: 0.35,
                }}
              />
              {[
                { icon: "👆", step: "User visits your website" },
                {
                  icon: "🍪",
                  step: "Meta Pixel drops a cookie on their browser",
                },
                { icon: "📲", step: "User opens Facebook or Instagram" },
                { icon: "🎯", step: "Your ad appears in their feed" },
                {
                  icon: "💳",
                  step: "They click, convert, and become a customer",
                },
              ].map((s, i) => (
                <Reveal
                  key={s.step}
                  type="left"
                  delay={0.15 + i * 0.07}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.875rem 0",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      flexShrink: 0,
                      zIndex: 1,
                      background: "var(--color-surface)",
                      border: "2px solid var(--color-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                    }}
                  >
                    {s.icon}
                  </div>
                  <span
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {s.step}
                  </span>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* RIGHT — retargeting type cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            {RETARGETING_TYPES.map((rt, i) => (
              <Reveal
                key={rt.title}
                type="up"
                delay={i * 0.08}
                style={{
                  padding: "1.5rem",
                  borderRadius: "var(--radius-soft)",
                  background: `rgba(${ACCENT_RGB[rt.color]},0.05)`,
                  border: `1px solid rgba(${ACCENT_RGB[rt.color]},0.16)`,
                  transition: "all 0.25s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 16px 40px rgba(${ACCENT_RGB[rt.color]},0.16)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "1.75rem", marginBottom: "0.875rem" }}>
                  {rt.icon}
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 800,
                    marginBottom: "0.5rem",
                    color: ACCENT_VAR[rt.color],
                  }}
                >
                  {rt.title}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    lineHeight: 1.65,
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  {rt.desc}
                </div>
              </Reveal>
            ))}

            {/* ROAS callout */}
            <Reveal
              type="scale"
              delay={0.2}
              style={{
                gridColumn: "1/-1",
                padding: "1.25rem 1.5rem",
                borderRadius: "var(--radius-soft)",
                background:
                  "linear-gradient(135deg,rgba(91, 126, 60,0.12),rgba(239, 105, 5,0.08))",
                border: "1px solid rgba(91, 126, 60,0.28)",
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
              }}
            >
              <div style={{ fontSize: "2rem", flexShrink: 0 }}>📈</div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    color: "var(--color-brand-green)",
                    lineHeight: 1,
                  }}
                >
                  3× Higher ROAS
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-text-tertiary)",
                    marginTop: 4,
                    lineHeight: 1.5,
                  }}
                >
                  Retargeting campaigns consistently deliver 3× or more return
                  on ad spend vs cold audiences — because you're re-engaging
                  people who already trust your brand.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════ 5. STRATEGY PILLARS ══════ */
function StrategySection() {
  return (
    <section
      id="strategy"
      className="section-pad"
      aria-label="Meta Advertising Strategy"
    >
      <div className="container-site">
        <Reveal type="up" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Tag label="Our Strategy" color="blue" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              marginTop: "1rem",
              fontSize: "clamp(1.9rem,3.5vw,2.8rem)",
            }}
          >
            How We Make Your Ads{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg,var(--color-brand-blue),#3878e6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Actually Work
            </span>
          </h2>
          <p
            style={{
              maxWidth: 520,
              margin: "0.875rem auto 0",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "var(--color-text-secondary)",
            }}
          >
            Most agencies post and pray. We follow a data-backed strategy built
            on how Meta's auction, algorithm, and ad relevance scoring actually
            operate.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1.25rem",
          }}
          className="strategy-grid"
        >
          {STRATEGY_PILLARS.map((s, i) => (
            <Reveal
              key={s.num}
              type="up"
              delay={i * 0.08}
              className="strategy-card"
              style={{
                padding: "1.875rem",
                borderRadius: "var(--radius-soft)",
                background: `linear-gradient(145deg,rgba(${ACCENT_RGB[s.accent]},0.06),rgba(${ACCENT_RGB[s.accent]},0.02))`,
                border: `1px solid rgba(${ACCENT_RGB[s.accent]},0.16)`,
                position: "relative",
                overflow: "hidden",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(${ACCENT_RGB[s.accent]},0.35)`;
                e.currentTarget.style.boxShadow = `0 20px 48px rgba(${ACCENT_RGB[s.accent]},0.14)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `rgba(${ACCENT_RGB[s.accent]},0.16)`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  marginBottom: "1.125rem",
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "var(--radius-soft)",
                    fontSize: "1.4rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `rgba(${ACCENT_RGB[s.accent]},0.12)`,
                    border: `1px solid rgba(${ACCENT_RGB[s.accent]},0.23)`,
                  }}
                >
                  {s.icon}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.75rem",
                    color: `rgba(${ACCENT_RGB[s.accent]},0.4)`,
                  }}
                >
                  {s.num}
                </div>
              </div>
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  marginBottom: "0.625rem",
                }}
              >
                {s.title}
              </h4>
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.75,
                  color: "var(--color-text-secondary)",
                }}
              >
                {s.desc}
              </p>
              <div
                style={{
                  position: "absolute",
                  bottom: "-1.5rem",
                  right: "0.75rem",
                  fontFamily: "var(--font-display)",
                  fontSize: "5rem",
                  lineHeight: 1,
                  color: `rgba(${ACCENT_RGB[s.accent]},0.04)`,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {s.num}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.strategy-grid{grid-template-columns:1fr 1fr !important;}}@media(max-width:560px){.strategy-grid{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}

/* ══════ 6. PLATFORMS DEEP-DIVE ══════ */
function PlatformsSection({ activePlatform, setActivePlatform, platform }) {
  return (
    <section
      id="platforms"
      aria-label="Facebook and Instagram Marketing Services"
      style={{
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        padding: "clamp(4rem,8vw,7rem) 0",
      }}
    >
      <div className="container-site">
        <Reveal type="up" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Tag label="Platform Services" color="blue" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              marginTop: "1rem",
              fontSize: "clamp(1.9rem,3.5vw,2.8rem)",
            }}
          >
            What We Do on Each Platform
          </h2>
          <p
            style={{
              maxWidth: 480,
              margin: "0.875rem auto 0",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "var(--color-text-secondary)",
            }}
          >
            Two platforms, two tailored strategies — each optimised for how that
            audience actually scrolls, engages, and buys.
          </p>
        </Reveal>

        {/* Platform tabs */}
        <Reveal
          type="up"
          delay={0.1}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.75rem",
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
                borderRadius: 999,
                cursor: "pointer",
                border: `2px solid ${activePlatform === p.id ? p.color : "var(--color-border)"}`,
                background:
                  activePlatform === p.id
                    ? `${p.color}12`
                    : "var(--color-surface)",
                color:
                  activePlatform === p.id
                    ? p.color
                    : "var(--color-text-secondary)",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "0.95rem",
                transition: "all 0.3s ease",
                boxShadow:
                  activePlatform === p.id ? `0 8px 24px ${p.color}28` : "none",
              }}
            >
              {p.icon}
              {p.label}
            </button>
          ))}
        </Reveal>

        <div className="smm-grid-2">
          {/* Left — stats & info */}
          <Reveal key={`${platform.id}-left`} type="left">
            {/* Stat banner */}
            <div
              style={{
                padding: "1.5rem 2rem",
                borderRadius: "var(--radius-soft)",
                marginBottom: "2rem",
                background: `linear-gradient(135deg,${platform.color}15,${platform.color}08)`,
                border: `1px solid ${platform.color}30`,
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              <div style={{ color: platform.color, flexShrink: 0 }}>
                {platform.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.2rem",
                    color: platform.color,
                    lineHeight: 1,
                  }}
                >
                  {platform.stat.val}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-text-tertiary)",
                    marginTop: 4,
                  }}
                >
                  {platform.stat.label}
                </div>
              </div>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem,2.5vw,2.1rem)",
                marginBottom: "1rem",
              }}
            >
              {platform.tagline}
            </h3>
            <p
              style={{
                fontSize: "0.975rem",
                lineHeight: 1.85,
                color: "var(--color-text-secondary)",
                marginBottom: "1.5rem",
              }}
            >
              {platform.desc}
            </p>

            {/* Ad placements */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: platform.color,
                  marginBottom: "0.75rem",
                }}
              >
                Ad Placements
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {platform.placements.map((pl) => (
                  <span
                    key={pl}
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      padding: "4px 12px",
                      borderRadius: 999,
                      background: `${platform.color}12`,
                      border: `1px solid ${platform.color}28`,
                      color: platform.color,
                    }}
                  >
                    {pl}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="/contact"
              className="btn btn-primary btn-lg"
              style={{
                background: `linear-gradient(135deg,${platform.color},${platform.color}cc)`,
                boxShadow: `0 8px 28px ${platform.color}35`,
                borderRadius: "var(--radius-pill)",
              }}
            >
              Get {platform.label} Strategy
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
            </a>
          </Reveal>

          {/* Right — service tiles */}
          <div
            key={`${platform.id}-right`}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.875rem",
            }}
          >
            {platform.services.map((svc, i) => (
              <Reveal
                key={svc.title}
                type="up"
                delay={i * 0.07}
                className="svc-tile"
                style={{
                  padding: "1.125rem",
                  borderRadius: "var(--radius-soft)",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  cursor: "default",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${platform.color}44`;
                  e.currentTarget.style.boxShadow = `0 12px 28px ${platform.color}1c`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
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
                    fontSize: "0.78rem",
                    color: "var(--color-text-tertiary)",
                    lineHeight: 1.6,
                  }}
                >
                  {svc.detail}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════ 7. PROCESS ══════ */
function ProcessSection() {
  return (
    <section
      id="process"
      className="section-pad"
      aria-label="Our Social Media Marketing Process"
    >
      <div className="container-site">
        <Reveal type="up" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <Tag label="Our Process" color="green" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              marginTop: "1rem",
              fontSize: "clamp(1.9rem,3.5vw,2.8rem)",
            }}
          >
            How We Manage Your{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg,var(--color-brand-green),var(--color-brand-green-light))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Social Media
            </span>
          </h2>
        </Reveal>

        {/* Horizontal timeline */}
        <div
          style={{
            position: "relative",
            overflowX: "auto",
            paddingBottom: "0.5rem",
          }}
        >
          {/* Line */}
          <div
            style={{
              position: "absolute",
              top: 18,
              left: "10%",
              right: "10%",
              height: 3,
              borderRadius: 2,
              background: `linear-gradient(90deg,${PROCESS.map((p) => p.color).join(",")})`,
              opacity: 0.35,
            }}
          />
          {/* Dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
              zIndex: 1,
              minWidth: 500,
            }}
          >
            {PROCESS.map((p, i) => (
              <Reveal
                key={p.num}
                type="up"
                delay={i * 0.1}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "0 0.5rem",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: p.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#f5f5f5",
                    fontWeight: 800,
                    fontSize: "0.875rem",
                    flexShrink: 0,
                    zIndex: 2,
                    boxShadow: `0 6px 20px ${p.color}55`,
                    marginBottom: "1.25rem",
                  }}
                >
                  {p.num}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    textAlign: "center",
                    marginBottom: "0.5rem",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {p.title}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Detail cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5,1fr)",
              gap: "0.875rem",
              marginTop: "1.5rem",
              minWidth: 500,
            }}
          >
            {PROCESS.map((p, i) => (
              <Reveal
                key={p.num}
                type="up"
                delay={0.3 + i * 0.1}
                style={{
                  padding: "1.125rem",
                  borderRadius: "var(--radius-soft)",
                  background: "var(--color-surface)",
                  border: `1px solid var(--color-border)`,
                  borderTopColor: p.color,
                  borderTopWidth: 2,
                  fontSize: "0.78rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.65,
                }}
              >
                {p.desc}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════ 8. RESULTS ══════ */
function ResultsSection() {
  return (
    <section
      style={{
        background:
          "linear-gradient(135deg,rgba(239, 105, 5,0.07) 0%,rgba(91, 126, 60,0.05) 50%,rgba(0, 85, 218,0.05) 100%)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        padding: "clamp(4rem,8vw,6rem) 0",
      }}
    >
      <div className="container-site">
        <Reveal type="up" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Tag label="Real Results" color="orange" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              marginTop: "1rem",
              fontSize: "clamp(1.9rem,3.5vw,2.8rem)",
            }}
          >
            Numbers That Actually Matter
          </h2>
          <p
            style={{
              maxWidth: 460,
              margin: "0.875rem auto 0",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "var(--color-text-secondary)",
            }}
          >
            Benchmark figures from Meta industry data and our managed client
            campaigns.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "1.25rem",
          }}
          className="results-grid"
        >
          {RESULTS.map((r, i) => (
            <Reveal
              key={r.label}
              type="up"
              delay={i * 0.1}
              className="result-card"
              style={{
                padding: "2rem 1.5rem",
                borderRadius: "var(--radius-soft)",
                textAlign: "center",
                background: "var(--color-surface)",
                border: `1px solid rgba(${ACCENT_RGB[r.accent]},0.18)`,
                cursor: "default",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 48px rgba(${ACCENT_RGB[r.accent]},0.16)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem,3.5vw,3rem)",
                  lineHeight: 1,
                  marginBottom: "0.75rem",
                  color: ACCENT_VAR[r.accent],
                }}
              >
                {r.val}
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  marginBottom: "0.375rem",
                }}
              >
                {r.label}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-tertiary)",
                  lineHeight: 1.4,
                }}
              >
                {r.sub}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.results-grid{grid-template-columns:1fr 1fr !important;}}`}</style>
    </section>
  );
}

/* ══════ 9. FAQ ══════ */
function FaqSection({ openFaq, setOpenFaq }) {
  return (
    <section
      id="faq"
      className="section-pad"
      aria-label="Social Media Marketing FAQ"
    >
      <div className="container-site" style={{ maxWidth: 820 }}>
        <Reveal type="up" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Tag label="FAQ" color="blue" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              marginTop: "1rem",
              fontSize: "clamp(1.9rem,3.5vw,2.8rem)",
            }}
          >
            Questions About Meta Ads
          </h2>
          <p
            style={{
              maxWidth: 480,
              margin: "0.875rem auto 0",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "var(--color-text-secondary)",
            }}
          >
            Everything you need to know before running your first — or next —
            Meta advertising campaign.
          </p>
        </Reveal>

        <Reveal
          type="scale"
          style={{
            borderRadius: "var(--radius-soft)",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            overflow: "hidden",
          }}
        >
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="faq-item">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "1.5rem 2rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.975rem",
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                      lineHeight: 1.4,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {faq.q}
                  </span>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: isOpen
                        ? "rgba(239, 105, 5,0.12)"
                        : "var(--color-bg-secondary)",
                      border: `1px solid ${isOpen ? "rgba(239, 105, 5,0.3)" : "var(--color-border)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      color: isOpen
                        ? "var(--color-brand-orange)"
                        : "var(--color-text-tertiary)",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: "0 2rem 1.5rem",
                      animation: "slideUp 0.25s ease",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.9rem",
                        lineHeight: 1.85,
                        color: "var(--color-text-secondary)",
                        margin: 0,
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ══════ 10. CTA ══════ */
function CtaSection() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <Reveal
          type="scale"
          style={{
            borderRadius: "var(--radius-soft)",
            overflow: "hidden",
            position: "relative",
            background:
              "linear-gradient(135deg,rgba(239, 105, 5,0.1) 0%,rgba(91, 126, 60,0.07) 50%,rgba(0, 85, 218,0.08) 100%)",
            border: "1px solid rgba(239, 105, 5,0.22)",
          }}
        >
          <ParallaxLayer
            speed={-22}
            style={{ position: "absolute", top: "-30%", right: "10%", width: 400, height: 400 }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(239, 105, 5,0.12) 0%,transparent 70%)",
                pointerEvents: "none",
              }}
            />
          </ParallaxLayer>
          <ParallaxLayer
            speed={18}
            style={{ position: "absolute", bottom: "-20%", left: "5%", width: 300, height: 300 }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(0, 85, 218,0.1) 0%,transparent 70%)",
                pointerEvents: "none",
              }}
            />
          </ParallaxLayer>
          <ParallaxLayer
            speed={-14}
            style={{ position: "absolute", top: "20%", left: "22%", width: 220, height: 220 }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(91, 126, 60,0.14) 0%,transparent 70%)",
                pointerEvents: "none",
              }}
            />
          </ParallaxLayer>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              padding: "clamp(3rem,6vw,5rem) clamp(2rem,5vw,5rem)",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "3rem",
              alignItems: "center",
            }}
            className="cta-inner"
          >
            <div>
              <Tag label="Get Started Today" color="orange" />
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem,4.5vw,3.25rem)",
                  marginTop: "1.25rem",
                  marginBottom: "1rem",
                  lineHeight: 1.1,
                }}
              >
                Ready to grow on{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg,#1877F2,#3878e6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Facebook
                </span>
                {" & "}
                <span style={{ color: "#E1306C" }}>Instagram?</span>
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  maxWidth: 500,
                  lineHeight: 1.85,
                  color: "var(--color-text-secondary)",
                }}
              >
                Book a free social media audit. We'll review your profiles,
                analyse your competitor ads in the Meta Ad Library, and show you
                exactly what's holding your brand back — and how Serenly will
                fix it in 30 days.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.875rem",
                flexShrink: 0,
              }}
            >
              <a
                href="/contact"
                className="btn btn-primary btn-lg"
                style={{
                  background:
                    "linear-gradient(135deg,var(--color-brand-orange),#ff8a2e)",
                  boxShadow: "0 8px 32px rgba(239, 105, 5,0.45)",
                  borderRadius: "var(--radius-pill)",
                  whiteSpace: "nowrap",
                }}
              >
                Get Free SMM Audit
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#platforms"
                className="btn btn-ghost btn-lg"
                style={{ borderRadius: "var(--radius-pill)", textAlign: "center" }}
              >
                View Platform Services
              </a>
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`@media(max-width:768px){.cta-inner{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}
