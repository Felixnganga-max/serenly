// src/pages/Solutions.jsx
// Serenly — Web Development & Software Solutions Page
// Structure (mirrors reference image):
//   1. Hero — split layout (text left, image right)
//   2. Solutions Grid — headline left + 2×N service cards right
//   3. Deep-dive — each solution expanded (alternating rows)
//   4. Tech Stack strip
//   5. Process timeline
//   6. CTA Banner

import React, { useEffect, useRef, useState } from "react";

/* ─── Unsplash placeholders ─────────────────────────────── */
const HERO_IMG =
  "https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80"; // web dev workspace

const SOLUTIONS = [
  {
    id: "education",
    num: "01",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Educational Platforms",
    tagline: "Full School Management Systems",
    accent: "orange",
    short:
      "End-to-end school systems — from student enrolment to result slips, all in one powerful platform built for Kenyan institutions.",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    features: [
      "Admin dashboard with role-based access control",
      "Student enrolment & profile management",
      "Automated grading & report card generation",
      "Class scheduling & timetable builder",
      "Teacher & staff management portal",
      "Parent communication & fee payment portal",
      "Library & resource management system",
      "Exam & assessment module with analytics",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "PDF generation"],
    badge: "Full-Stack System",
  },
  {
    id: "ecommerce",
    num: "02",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    title: "E-Commerce Stores",
    tagline: "Built to Sell, Built to Scale",
    accent: "blue",
    short:
      "High-converting online stores with seamless payment integrations, inventory management, and the APIs your business runs on.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    features: [
      "M-Pesa, Stripe & PayPal payment integration",
      "Product catalogue with variants & inventory tracking",
      "Customer accounts, wishlists & order history",
      "Discount codes, promotions & loyalty system",
      "Shipping & delivery zone configuration",
      "Third-party API integrations (ERP, CRM, logistics)",
      "SEO-optimised product pages from day one",
      "Sales analytics & conversion dashboard",
    ],
    tech: ["Next.js", "Stripe", "M-Pesa API", "Sanity CMS", "Vercel"],
    badge: "Revenue Engine",
  },
  {
    id: "portfolio",
    num: "03",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Portfolio Websites",
    tagline: "Your Work, Showcased Perfectly",
    accent: "orange",
    short:
      "Stunning, fast portfolio sites for creatives, agencies, and professionals — designed to win clients before they even reach out.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    features: [
      "Custom-designed hero & project showcase sections",
      "Filterable project gallery with lightbox",
      "Case study pages with rich media support",
      "Contact form with calendar booking integration",
      "Blog / insights section for thought leadership",
      "Performance score 95+ out of the box",
      "CMS-powered so you update it yourself",
      "Social proof — testimonials & client logos",
    ],
    tech: ["Next.js", "Framer Motion", "Sanity", "Tailwind CSS", "Vercel"],
    badge: "Conversion Focused",
  },
  {
    id: "informational",
    num: "04",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "Informational Websites",
    tagline: "Blogs, Business & Company Sites",
    accent: "blue",
    short:
      "Professional company websites and content-rich blogs that establish authority, attract organic traffic, and generate steady leads.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    features: [
      "Corporate website with multi-page architecture",
      "SEO-optimised blog with category & tag system",
      "Team, about & company culture pages",
      "Services / products showcase with inquiry CTAs",
      "Newsletter integration (Mailchimp, ConvertKit)",
      "Google Analytics 4 & Search Console setup",
      "Multi-language support for regional markets",
      "Lead capture forms with CRM integration",
    ],
    tech: ["Next.js", "WordPress", "Sanity CMS", "Mailchimp API", "GA4"],
    badge: "Lead Generation",
  },
  {
    id: "saas",
    num: "05",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "SaaS Applications",
    tagline: "Software That Scales With You",
    accent: "orange",
    short:
      "Full-stack SaaS products — subscription billing, user onboarding, dashboards, and the infrastructure to grow from 10 to 10,000 users.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    features: [
      "Multi-tenant architecture with workspace isolation",
      "Subscription billing via Stripe (monthly / annual)",
      "User authentication — social login, SSO & MFA",
      "Feature-gated plans with usage metering",
      "Real-time dashboards & data visualisation",
      "REST & GraphQL API with documentation",
      "Webhook system for third-party integrations",
      "Admin panel for customer success & ops teams",
    ],
    tech: ["Next.js", "Supabase", "Stripe", "Prisma", "AWS / Railway"],
    badge: "Enterprise Ready",
  },
];

const TECH_STACK = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Node.js", color: "#68A063" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Supabase", color: "#3FCF8E" },
  { name: "Stripe", color: "#635BFF" },
  { name: "M-Pesa API", color: "#fe7a36" },
  { name: "Tailwind CSS", color: "#38BDF8" },
  { name: "Figma", color: "#F24E1E" },
  { name: "Vercel", color: "#ffffff" },
  { name: "AWS", color: "#FF9900" },
];

const PROCESS = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "We scope your project, understand your users, and map the technical requirements.",
  },
  {
    num: "02",
    title: "Design & Prototype",
    desc: "Figma wireframes and interactive prototypes before a single line of code is written.",
  },
  {
    num: "03",
    title: "Development",
    desc: "Agile sprints with weekly demos. You see progress, not just invoices.",
  },
  {
    num: "04",
    title: "QA & Testing",
    desc: "Cross-device testing, performance audits, and security checks before launch.",
  },
  {
    num: "05",
    title: "Launch & Support",
    desc: "Deployment, DNS setup, training, and 3 months of post-launch support included.",
  },
];

/* ─── Scroll animation hook ─────────────────────────────── */
function useFadeIn(threshold = 0.12) {
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

/* ─── Section tag ────────────────────────────────────────── */
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
   MAIN PAGE
══════════════════════════════════════════════════════════ */
export default function Solutions() {
  const [activeId, setActiveId] = useState(null);

  return (
    <div
      style={{
        background: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
        overflowX: "hidden",
      }}
    >
      <HeroSection />
      <SolutionsGrid setActiveId={setActiveId} />
      <DeepDiveSection activeId={activeId} />
      <TechStackStrip />
      <ProcessSection />
      <CtaBanner />
    </div>
  );
}

/* ══════ 1. HERO — split layout ══════ */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "var(--color-bg-primary)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* Background line grid */}
      <div
        className="bg-line-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.4, zIndex: 0 }}
      />

      {/* Glow blobs */}
      <div
        className="glow-orange"
        style={{ width: 600, height: 600, top: "-20%", left: "-8%", zIndex: 0 }}
      />
      <div
        className="glow-blue"
        style={{
          width: 450,
          height: 450,
          bottom: "0",
          right: "35%",
          zIndex: 0,
        }}
      />

      <div
        className="container-site"
        style={{ position: "relative", zIndex: 1, width: "100%" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 6rem)",
            alignItems: "center",
            minHeight: "80vh",
          }}
          className="hero-grid"
        >
          {/* LEFT — Text (order-2 on mobile so image shows first) */}
          <div className="hero-text-col">
            <div
              className="animate-fade-up delay-0"
              style={{ marginBottom: "1.5rem" }}
            >
              <SectionTag label="Web Development & Software" color="orange" />
            </div>

            {/* Eyebrow like the reference */}
            <p
              className="animate-fade-up delay-100"
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-brand-orange)",
                marginBottom: "1rem",
              }}
            >
              5 Tailored Website Solutions
            </p>

            <h1
              className="animate-fade-up delay-200"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.75rem, 6vw, 5rem)",
                lineHeight: 1.06,
                marginBottom: "1.75rem",
              }}
            >
              We Build Websites <br />
              That <span className="text-gradient-orange">Work</span> For Your{" "}
              <br />
              <span className="text-gradient-blue">Business.</span>
            </h1>

            <p
              className="animate-fade-up delay-300"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                color: "var(--color-text-secondary)",
                maxWidth: 500,
                lineHeight: 1.85,
                marginBottom: "2.5rem",
              }}
            >
              From school management systems and e-commerce stores to SaaS
              applications — Serenly engineers fast, scalable, and
              conversion-ready web solutions for businesses across Kenya and
              Africa.
            </p>

            {/* Social proof row — mirrors reference layout */}
            <div
              className="animate-fade-up delay-400"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                marginBottom: "2.5rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { val: "80+", label: "Sites Delivered" },
                { val: "98", label: "Perf Score Avg" },
                { val: "3mo", label: "Post-Launch Support" },
              ].map((s, i) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2rem",
                      color:
                        i % 2 === 0
                          ? "var(--color-brand-orange)"
                          : "var(--color-brand-blue)",
                      lineHeight: 1,
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
                      marginTop: "0.2rem",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="animate-fade-up delay-500"
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              <a href="#solutions" className="btn btn-primary btn-lg">
                Explore Solutions
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
                Get Free Quote
              </a>
            </div>

            {/* Platform links strip (mirrors reference social links row) */}
            <div
              className="animate-fade-up delay-600"
              style={{
                display: "flex",
                gap: "1.5rem",
                marginTop: "2.5rem",
                borderTop: "1px solid var(--color-border)",
                paddingTop: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              {[
                "Education",
                "E-Commerce",
                "Portfolio",
                "Informational",
                "SaaS",
              ].map((s, i) => (
                <a
                  key={s}
                  href={`#${s.toLowerCase()}`}
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-text-tertiary)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-brand-orange)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text-tertiary)")
                  }
                >
                  {i > 0 && (
                    <span style={{ color: "var(--color-border-strong)" }}>
                      ·
                    </span>
                  )}
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — Image with floating cards (order-1 on mobile = shows first) */}
          <div
            className="animate-slide-right delay-200 hero-img-col"
            style={{ position: "relative" }}
          >
            {/* Main image */}
            <div
              style={{
                borderRadius: "var(--radius-2xl)",
                overflow: "hidden",
                aspectRatio: "4/5",
                boxShadow: "var(--shadow-xl)",
              }}
            >
              <img
                src={HERO_IMG}
                alt="Web development"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.9)",
                }}
              />
              {/* overlay gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)",
                }}
              />
            </div>

            {/* Floating card — top left */}
            <div
              className="glass animate-float"
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "-2rem",
                padding: "1rem 1.25rem",
                borderRadius: "var(--radius-lg)",
                minWidth: 160,
                background: "var(--color-surface-overlay)",
                border: "1px solid rgba(254,122,54,0.25)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
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
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  Live Now
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  color: "var(--color-brand-orange)",
                }}
              >
                98
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "var(--color-text-tertiary)",
                  fontWeight: 600,
                }}
              >
                Performance Score
              </div>
            </div>

            {/* Floating card — bottom right */}
            <div
              className="glass-blue animate-float-d"
              style={{
                position: "absolute",
                bottom: "2rem",
                right: "-1.5rem",
                padding: "1rem 1.25rem",
                borderRadius: "var(--radius-lg)",
                minWidth: 170,
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-blue-light)",
                  marginBottom: "0.4rem",
                }}
              >
                Stack Used
              </div>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {["React", "Next.js", "Node"].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      padding: "0.2rem 0.5rem",
                      borderRadius: "var(--radius-full)",
                      background: "rgba(0,70,255,0.12)",
                      border: "1px solid rgba(0,70,255,0.25)",
                      color: "var(--color-brand-blue-light)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Slide indicator dots (mirrors reference 01 02 03) */}
            <div
              style={{
                position: "absolute",
                bottom: "-2rem",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "0.75rem",
                alignItems: "center",
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: i === 0 ? 32 : 8,
                    height: 8,
                    borderRadius: "var(--radius-full)",
                    background:
                      i === 0
                        ? "var(--color-brand-orange)"
                        : "var(--color-border-strong)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:860px){
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-img-col {
            order: -1 !important;
          }
          .hero-text-col {
            order: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ══════ 2. SOLUTIONS GRID — headline left + cards right (reference layout) ══════ */
function SolutionsGrid({ setActiveId }) {
  const [ref, visible] = useFadeIn(0.08);

  return (
    <section
      id="solutions"
      ref={ref}
      className="section-padding"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      <div className="container-site">
        {/* Top row: headline LEFT, intro RIGHT — mirrors reference "We are here to..." */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 6rem)",
            alignItems: "flex-end",
            marginBottom: "4rem",
          }}
          className="grid-header"
        >
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-24px)",
              transition: "all 0.6s ease",
            }}
          >
            <SectionTag label="Our Solutions" color="orange" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
                lineHeight: 1.08,
                marginTop: "1.25rem",
              }}
            >
              We're here to make your{" "}
              <span className="text-gradient-orange">website</span> work harder{" "}
              <span className="text-gradient-blue">and smarter.</span>
            </h2>
            <div style={{ marginTop: "2rem" }}>
              <div
                className="divider-gradient divider"
                style={{ marginBottom: "1.5rem" }}
              />
              <a href="#contact" className="btn btn-primary btn-md">
                View All Solutions
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
              transform: visible ? "translateX(0)" : "translateX(24px)",
              transition: "all 0.6s ease 0.15s",
            }}
          >
            <p style={{ fontSize: "1.05rem", lineHeight: 1.85 }}>
              Every business has different digital needs. Serenly builds
              purpose-driven web solutions — engineered for performance,
              designed for conversion, and built to grow with you.
            </p>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.85,
                marginTop: "1rem",
              }}
            >
              Pick your solution below and explore exactly what you get, or
              reach out and we'll advise the best fit for your goals.
            </p>
          </div>
        </div>

        {/* Cards — 2-col grid on desktop, horizontal scroll snap on mobile */}
        <div className="sol-cards-outer">
          <div className="sol-cards-inner">
            {SOLUTIONS.map((sol, i) => (
              <SolutionCard
                key={sol.id}
                sol={sol}
                index={i}
                visible={visible}
                setActiveId={setActiveId}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .grid-header { grid-template-columns: 1fr !important; }
        }

        /* Desktop: normal grid */
        .sol-cards-inner {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        /* Mobile: horizontal scroll */
        @media (max-width: 768px) {
          .sol-cards-outer {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            /* bleed to edge of screen */
            margin-left: calc(-1 * clamp(1.25rem, 5vw, 5rem));
            margin-right: calc(-1 * clamp(1.25rem, 5vw, 5rem));
            padding-left: clamp(1.25rem, 5vw, 5rem);
            padding-right: clamp(1.25rem, 5vw, 5rem);
            padding-bottom: 1.25rem;
          }
          .sol-cards-outer::-webkit-scrollbar {
            display: none;
          }
          .sol-cards-inner {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 1rem;
            width: max-content;
            scroll-snap-type: x mandatory;
          }
          .sol-cards-inner > * {
            width: 78vw;
            max-width: 300px;
            flex-shrink: 0;
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  );
}

function SolutionCard({ sol, index, visible, setActiveId }) {
  const [hovered, setHovered] = useState(false);
  const isOrange = sol.accent === "orange";

  return (
    <a
      href={`#${sol.id}`}
      id={sol.id + "-card"}
      onClick={(e) => {
        e.preventDefault();
        setActiveId(sol.id);
        document.getElementById(sol.id)?.scrollIntoView({ behavior: "smooth" });
      }}
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
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? isOrange
            ? "var(--shadow-orange)"
            : "var(--shadow-blue)"
          : "var(--shadow-sm)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 80}ms`,
        cursor: "pointer",
      }}
    >
      {/* Top row: icon + badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
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
            transition: "transform 0.3s ease",
            transform: hovered ? "scale(1.08) rotate(-3deg)" : "scale(1)",
          }}
        >
          {sol.icon}
        </div>
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0.3rem 0.75rem",
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
          {sol.badge}
        </span>
      </div>

      {/* Number */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.8rem",
          color: "var(--color-text-tertiary)",
          letterSpacing: "0.1em",
          marginBottom: "0.5rem",
        }}
      >
        {sol.num}
      </div>

      {/* Title & tagline */}
      <h4
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.375rem",
          marginBottom: "0.4rem",
          transition: "color 0.2s ease",
          color: hovered
            ? isOrange
              ? "var(--color-brand-orange)"
              : "var(--color-brand-blue)"
            : "var(--color-text-primary)",
        }}
      >
        {sol.title}
      </h4>
      <p
        style={{
          fontSize: "0.8rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          color: "var(--color-text-tertiary)",
          marginBottom: "1rem",
        }}
      >
        {sol.tagline}
      </p>

      <p
        style={{
          fontSize: "0.9375rem",
          lineHeight: 1.75,
          color: "var(--color-text-secondary)",
          marginBottom: "1.5rem",
        }}
      >
        {sol.short}
      </p>

      {/* Tech pills */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "1.5rem",
        }}
      >
        {sol.tech.slice(0, 3).map((t) => (
          <span
            key={t}
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              padding: "0.25rem 0.6rem",
              borderRadius: "var(--radius-full)",
              background: "var(--color-bg-tertiary)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-tertiary)",
            }}
          >
            {t}
          </span>
        ))}
        {sol.tech.length > 3 && (
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              padding: "0.25rem 0.6rem",
              borderRadius: "var(--radius-full)",
              background: "var(--color-bg-tertiary)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-tertiary)",
            }}
          >
            +{sol.tech.length - 3} more
          </span>
        )}
      </div>

      {/* CTA arrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "0.875rem",
          fontWeight: 700,
          color: isOrange
            ? "var(--color-brand-orange)"
            : "var(--color-brand-blue)",
          transition: "gap 0.2s ease",
          gap: hovered ? "0.85rem" : "0.5rem",
        }}
      >
        Explore Solution
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
      </div>
    </a>
  );
}

/* ══════ 3. DEEP-DIVE — alternating rows per solution ══════ */
function DeepDiveSection() {
  return (
    <section style={{ padding: "var(--spacing-section) 0" }}>
      <div className="container-site">
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <SectionTag label="What's Included" color="blue" />
          <h2
            style={{ fontFamily: "var(--font-display)", marginTop: "1.25rem" }}
          >
            Everything Inside Each Solution
          </h2>
          <p
            style={{
              maxWidth: 520,
              margin: "1rem auto 0",
              fontSize: "1.05rem",
            }}
          >
            No hidden extras. Every solution comes with a defined scope so you
            know exactly what you're getting.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "7rem" }}>
          {SOLUTIONS.map((sol, i) => (
            <DeepDiveRow key={sol.id} sol={sol} reverse={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DeepDiveRow({ sol, reverse }) {
  const [ref, visible] = useFadeIn(0.1);
  const isOrange = sol.accent === "orange";

  return (
    <div
      id={sol.id}
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(2rem, 5vw, 6rem)",
        alignItems: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "all 0.7s var(--ease-smooth)",
      }}
      className="deepdive-row"
    >
      {/* Image side */}
      <div style={{ order: reverse ? 2 : 1, position: "relative" }}>
        <div
          style={{
            borderRadius: "var(--radius-2xl)",
            overflow: "hidden",
            aspectRatio: "4/3",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <img
            src={sol.image}
            alt={sol.title}
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

        {/* Number watermark */}
        <div
          style={{
            position: "absolute",
            bottom: "-1.5rem",
            right: reverse ? "auto" : "-1rem",
            left: reverse ? "-1rem" : "auto",
            fontFamily: "var(--font-display)",
            fontSize: "8rem",
            fontWeight: 400,
            lineHeight: 1,
            color: isOrange ? "rgba(254,122,54,0.08)" : "rgba(0,70,255,0.06)",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {sol.num}
        </div>

        {/* Tech badge */}
        <div
          style={{
            position: "absolute",
            top: "1.25rem",
            left: reverse ? "auto" : "1.25rem",
            right: reverse ? "1.25rem" : "auto",
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(12px)",
            borderRadius: "var(--radius-full)",
            padding: "0.35rem 0.9rem",
            display: "flex",
            gap: "0.4rem",
            alignItems: "center",
            border: `1px solid ${isOrange ? "rgba(254,122,54,0.3)" : "rgba(0,70,255,0.3)"}`,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: isOrange
                ? "var(--color-brand-orange)"
                : "var(--color-brand-blue-light)",
            }}
          />
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: isOrange
                ? "var(--color-brand-orange)"
                : "var(--color-brand-blue-light)",
            }}
          >
            {sol.badge}
          </span>
        </div>
      </div>

      {/* Content side */}
      <div style={{ order: reverse ? 1 : 2 }}>
        <span
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: isOrange
              ? "var(--color-brand-orange)"
              : "var(--color-brand-blue)",
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          {sol.tag || sol.num + " — " + sol.tagline}
        </span>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            marginBottom: "0.75rem",
            lineHeight: 1.1,
          }}
        >
          {sol.title}
        </h3>

        <p
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.85,
            color: "var(--color-text-secondary)",
            marginBottom: "2rem",
          }}
        >
          {sol.short}
        </p>

        {/* Feature list */}
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginBottom: "2.25rem",
          }}
        >
          {sol.features.map((f, fi) => (
            <li
              key={f}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                fontSize: "0.9375rem",
                color: "var(--color-text-secondary)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-12px)",
                transition: `all 0.5s ease ${0.3 + fi * 0.06}s`,
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  flexShrink: 0,
                  marginTop: "0.15rem",
                  background: isOrange
                    ? "rgba(254,122,54,0.1)"
                    : "rgba(0,70,255,0.08)",
                  border: `1px solid ${isOrange ? "rgba(254,122,54,0.28)" : "rgba(0,70,255,0.22)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isOrange
                    ? "var(--color-brand-orange)"
                    : "var(--color-brand-blue)",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                }}
              >
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* Tech stack pills */}
        <div style={{ marginBottom: "2rem" }}>
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
            Tech Stack
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {sol.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  padding: "0.35rem 0.8rem",
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
                {t}
              </span>
            ))}
          </div>
        </div>

        <a
          href="#contact"
          className={`btn btn-${isOrange ? "primary" : "secondary"} btn-md`}
        >
          Get a Quote
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
  );
}

/* ══════ 4. TECH STACK MARQUEE ══════ */
function TechStackStrip() {
  return (
    <section
      style={{
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        padding: "3rem 0",
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <p
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-text-tertiary)",
          }}
        >
          Technologies We Build With
        </p>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...TECH_STACK, ...TECH_STACK].map((t, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.6rem 2rem",
                margin: "0 0.5rem",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                whiteSpace: "nowrap",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: t.color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--color-text-secondary)",
                }}
              >
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════ 5. PROCESS ══════ */
function ProcessSection() {
  const [ref, visible] = useFadeIn(0.1);

  return (
    <section ref={ref} className="section-padding">
      <div className="container-site">
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <SectionTag label="How It Works" color="orange" />
          <h2
            style={{ fontFamily: "var(--font-display)", marginTop: "1.25rem" }}
          >
            From Idea to Launch
          </h2>
          <p
            style={{
              maxWidth: 480,
              margin: "1rem auto 0",
              fontSize: "1.05rem",
            }}
          >
            A proven 5-step process that keeps projects on time, on budget, and
            above expectations.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {PROCESS.map((step, i) => (
            <div
              key={step.num}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1px 1fr",
                gap: "0 2rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-20px)",
                transition: `all 0.55s ease ${i * 0.1}s`,
              }}
            >
              {/* Number */}
              <div
                style={{
                  textAlign: "right",
                  paddingTop: "0.25rem",
                  paddingBottom: "2.5rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.9rem",
                    color:
                      i % 2 === 0
                        ? "var(--color-brand-orange)"
                        : "var(--color-brand-blue)",
                    fontWeight: 400,
                  }}
                >
                  {step.num}
                </div>
              </div>

              {/* Timeline line + dot */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background:
                      i % 2 === 0
                        ? "var(--color-brand-orange)"
                        : "var(--color-brand-blue)",
                    boxShadow:
                      i % 2 === 0
                        ? "0 0 0 4px rgba(254,122,54,0.15)"
                        : "0 0 0 4px rgba(0,70,255,0.12)",
                    marginTop: "0.25rem",
                  }}
                />
                {i < PROCESS.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      width: 1,
                      background: `linear-gradient(to bottom, ${i % 2 === 0 ? "rgba(254,122,54,0.4)" : "rgba(0,70,255,0.3)"}, var(--color-border))`,
                      marginTop: "0.5rem",
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingBottom: "2.5rem" }}>
                <h5
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    marginBottom: "0.4rem",
                  }}
                >
                  {step.title}
                </h5>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:768px){ .deepdive-row { grid-template-columns: 1fr !important; } .deepdive-row > div { order: unset !important; } }`}</style>
    </section>
  );
}

/* ══════ 6. CTA BANNER ══════ */
function CtaBanner() {
  const [ref, visible] = useFadeIn(0.2);

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      <div className="container-site">
        <div
          style={{
            borderRadius: "var(--radius-2xl)",
            overflow: "hidden",
            padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 5rem)",
            background:
              "linear-gradient(135deg, #0c0c0e 0%, #111116 60%, #0c0c0e 100%)",
            border: "1px solid rgba(254,122,54,0.12)",
            position: "relative",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.7s ease",
          }}
        >
          <div
            className="bg-dot-grid"
            style={{ position: "absolute", inset: 0, opacity: 0.25 }}
          />
          <div
            className="glow-orange"
            style={{
              width: 550,
              height: 550,
              top: "-30%",
              left: "-5%",
              opacity: 0.55,
            }}
          />
          <div
            className="glow-blue"
            style={{
              width: 400,
              height: 400,
              bottom: "-25%",
              right: "10%",
              opacity: 0.45,
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "3rem",
                alignItems: "center",
              }}
              className="cta-grid"
            >
              <div>
                <SectionTag label="Start Your Project" color="orange" />
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
                  Ready to build something{" "}
                  <span className="text-gradient-orange">powerful?</span>
                </h2>
                <p
                  style={{
                    color: "rgba(245,245,245,0.55)",
                    fontSize: "1.05rem",
                    maxWidth: 500,
                    lineHeight: 1.8,
                  }}
                >
                  Tell us your idea. We'll scope it, design it, and build it —
                  on time, on budget, and built to last.
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
                  Get a Free Quote
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
                  href="#solutions"
                  className="btn btn-ghost btn-lg"
                  style={{
                    borderColor: "rgba(255,255,255,0.2)",
                    color: "#fff",
                  }}
                >
                  Browse Solutions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){ .cta-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
