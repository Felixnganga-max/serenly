import React, { useState } from "react";

const services = [
  {
    id: "web-application",
    title: "Web Application (Full-Stack System)",
    description:
      "We architect and build powerful, scalable full-stack web applications tailored to your business logic. From complex dashboards to enterprise-grade platforms — if you can imagine it, we can engineer it.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    featured: true,
  },
  {
    id: "mobile-applications",
    title: "Mobile Applications",
    description:
      "Cross-platform and native mobile apps built for speed, reliability, and a seamless user experience. iOS, Android, or both — we deliver mobile solutions that work.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    id: "upgrading-existing-website",
    title: "Upgrading Existing Websites",
    description:
      "We audit, optimize, and modernize outdated websites. Performance improvements, UI overhauls, security patches, and feature additions — your digital presence, elevated.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    ),
  },
  {
    id: "payment-systems-integration",
    title: "Payment Systems Integration",
    description:
      "We integrate secure, reliable payment gateways — Stripe, M-Pesa, PayPal, Flutterwave, and more. Seamless checkout flows, subscription billing, and financial reporting built in.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    id: "dashboards-database-logic",
    title: "Dashboards & Database Logic",
    description:
      "Custom analytics dashboards, admin panels, and complex database architectures. We turn raw data into actionable insights with clean, efficient backend logic.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: "generative-ai-services",
    title: "Generative AI Services",
    description:
      "We integrate cutting-edge AI into your products — chatbots, content generators, AI-powered search, recommendations, and custom LLM workflows that give your business a competitive edge.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 8v4l3 3" />
        <circle cx="18" cy="5" r="3" />
      </svg>
    ),
  },
];

export default function ServicesGrid({ onServiceClick }) {
  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        background: "#fff",
        minHeight: "100vh",
        color: "#111",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px 80px;
        }

        .service-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 16px;
          padding: 32px 28px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
        }
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.10);
        }
        .service-card.featured {
          background: #1d6ef5;
          border-color: #1d6ef5;
          color: #fff;
          grid-row: span 1;
        }
        .service-card.featured .card-title { color: #fff; }
        .service-card.featured .card-desc { color: rgba(255,255,255,0.85); }

        .icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #1d6ef5;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          margin-bottom: 20px;
        }
        .service-card.featured .icon-wrap {
          background: rgba(255,255,255,0.2);
        }

        .card-title {
          font-size: 17px;
          font-weight: 700;
          color: #111;
          margin-bottom: 12px;
          line-height: 1.3;
        }
        .card-desc {
          font-size: 13.5px;
          color: #666;
          line-height: 1.7;
        }

        .read-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 20px;
          font-size: 13px;
          font-weight: 600;
          color: #1d6ef5;
          cursor: pointer;
          background: none;
          border: none;
          font-family: inherit;
          padding: 0;
          transition: gap 0.2s;
        }
        .read-more:hover { gap: 10px; }
        .service-card.featured .read-more { color: #fff; }
      `}</style>

      {/* Section Header */}
      <div style={{ textAlign: "center", padding: "70px 40px 50px" }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#1d6ef5",
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          What We Build
        </p>
        <h2
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: "#111",
            letterSpacing: "-1px",
            marginBottom: 16,
          }}
        >
          Our Solutions
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "#888",
            maxWidth: 500,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          From full-stack systems to AI-powered products — we build digital
          infrastructure that scales with your business.
        </p>
      </div>

      {/* Grid */}
      <div className="services-grid">
        {services.map((s) => (
          <div
            key={s.id}
            className={`service-card${s.featured ? " featured" : ""}`}
            onClick={() => onServiceClick && onServiceClick(s.id)}
          >
            <div className="icon-wrap">{s.icon}</div>
            <div className="card-title">{s.title}</div>
            <div className="card-desc">{s.description}</div>
            <button className="read-more">
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
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
