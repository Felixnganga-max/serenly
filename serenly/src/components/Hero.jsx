// src/components/Hero.jsx
import React, { useState } from "react";
import {
  ArrowRight,
  Play,
  TrendingUp,
  Users,
  Award,
  Globe,
} from "lucide-react";

/* ── SVG Illustration ── */
function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 540 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%",
        height: "100%",
        filter: "drop-shadow(0 28px 56px rgba(254,122,54,0.13))",
      }}
    >
      <defs>
        <linearGradient id="og" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FE7A36" />
          <stop offset="100%" stopColor="#FF9A62" />
        </linearGradient>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0046FF" />
          <stop offset="100%" stopColor="#3369FF" />
        </linearGradient>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#0d0d1a" />
        </linearGradient>
        <filter id="cs">
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="14"
            floodColor="#000"
            floodOpacity="0.22"
          />
        </filter>
      </defs>

      {/* Orbit rings */}
      <ellipse
        cx="270"
        cy="238"
        rx="225"
        ry="182"
        stroke="rgba(254,122,54,0.07)"
        strokeWidth="1"
        strokeDasharray="4 9"
        fill="none"
      />
      <ellipse
        cx="270"
        cy="238"
        rx="165"
        ry="130"
        stroke="rgba(0,70,255,0.05)"
        strokeWidth="1"
        fill="none"
      />

      {/* Main dashboard card */}
      <rect
        x="88"
        y="115"
        width="324"
        height="215"
        rx="16"
        fill="url(#sg)"
        filter="url(#cs)"
      />
      <rect
        x="88"
        y="115"
        width="324"
        height="215"
        rx="16"
        stroke="rgba(254,122,54,0.22)"
        strokeWidth="1.5"
        fill="none"
      />
      <rect x="102" y="130" width="296" height="186" rx="8" fill="#080812" />

      {/* Sidebar */}
      <rect
        x="102"
        y="130"
        width="58"
        height="186"
        rx="8"
        fill="rgba(254,122,54,0.05)"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx="131"
          cy={162 + i * 28}
          r="9"
          fill={i === 0 ? "url(#og)" : "rgba(255,255,255,0.06)"}
        />
      ))}

      {/* Top bar */}
      <rect
        x="168"
        y="138"
        width="218"
        height="16"
        rx="4"
        fill="rgba(255,255,255,0.04)"
      />
      <text
        x="174"
        y="149"
        fontSize="7"
        fill="rgba(254,122,54,0.55)"
        fontFamily="monospace"
      >
        Marketing Dashboard — Serenly
      </text>
      <circle cx="376" cy="146" r="4" fill="url(#og)" />

      {/* KPI cards */}
      {[
        ["340%", "ROI", "#FE7A36"],
        ["12k+", "Leads", "#0046FF"],
        ["98%", "Retention", "#10B981"],
      ].map(([v, l, c], i) => (
        <g key={i}>
          <rect
            x={168 + i * 74}
            y={162}
            width={68}
            height={44}
            rx={6}
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="0.5"
          />
          <text
            x={202 + i * 74}
            y={181}
            textAnchor="middle"
            fontSize="12"
            fill={c}
            fontWeight="bold"
          >
            {v}
          </text>
          <text
            x={202 + i * 74}
            y={197}
            textAnchor="middle"
            fontSize="6.5"
            fill="rgba(255,255,255,0.3)"
          >
            {l}
          </text>
        </g>
      ))}

      {/* Bar chart */}
      {[28, 45, 32, 60, 38, 55, 72, 40, 50, 66].map((h, i) => (
        <rect
          key={i}
          x={170 + i * 19}
          y={298 - h}
          width={13}
          height={h}
          fill={
            i % 3 === 0
              ? "url(#og)"
              : i % 3 === 1
                ? "url(#bg)"
                : "rgba(255,255,255,0.07)"
          }
          rx={3}
        />
      ))}

      {/* Line chart */}
      <polyline
        points="168,268 188,255 208,260 228,242 248,248 268,232 288,237 308,221 328,227 348,214 366,218"
        stroke="url(#og)"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <polyline
        points="168,278 188,272 208,275 228,261 248,266 268,250 288,255 308,241 328,246 348,235 366,239"
        stroke="url(#bg)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Base */}
      <rect
        x="55"
        y="328"
        width="390"
        height="11"
        rx="5.5"
        fill="#1a1a26"
        stroke="rgba(254,122,54,0.14)"
        strokeWidth="1"
      />
      <rect
        x="185"
        y="328"
        width="130"
        height="5.5"
        rx="2.75"
        fill="rgba(254,122,54,0.12)"
      />

      {/* Float card — top right: Reach */}
      <g className="animate-float" style={{ transformOrigin: "418px 98px" }}>
        <rect
          x="360"
          y="55"
          width="150"
          height="86"
          rx="14"
          fill="rgba(15,15,28,0.96)"
          stroke="rgba(254,122,54,0.22)"
          strokeWidth="1"
          filter="url(#cs)"
        />
        <rect x="374" y="72" width="28" height="28" rx="7" fill="url(#og)" />
        <text x="387" y="90" textAnchor="middle" fontSize="13">
          📈
        </text>
        <text
          x="408"
          y="85"
          fontSize="10"
          fill="rgba(255,255,255,0.9)"
          fontWeight="700"
          fontFamily="sans-serif"
        >
          Brand Reach
        </text>
        <text
          x="408"
          y="99"
          fontSize="8"
          fill="rgba(254,122,54,0.75)"
          fontFamily="sans-serif"
        >
          +218% this quarter
        </text>
        <polyline
          points="366,128 376,120 386,123 396,113 406,116 416,107 426,110 436,102 446,105"
          stroke="url(#og)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Float card — bottom left: Clients */}
      <g className="animate-float-d" style={{ transformOrigin: "92px 385px" }}>
        <rect
          x="18"
          y="346"
          width="160"
          height="90"
          rx="14"
          fill="rgba(15,15,28,0.96)"
          stroke="rgba(0,70,255,0.22)"
          strokeWidth="1"
          filter="url(#cs)"
        />
        <text
          x="36"
          y="372"
          fontSize="9"
          fill="rgba(255,255,255,0.4)"
          fontFamily="sans-serif"
        >
          Happy clients
        </text>
        <text
          x="36"
          y="400"
          fontSize="26"
          fill="url(#og)"
          fontWeight="800"
          fontFamily="sans-serif"
        >
          500+
        </text>
        {["#FE7A36", "#0046FF", "#10B981", "#8B5CF6"].map((c, i) => (
          <circle
            key={i}
            cx={36 + i * 17}
            cy={422}
            r={10}
            fill={c}
            stroke="rgba(15,15,28,1)"
            strokeWidth="2"
            opacity="0.9"
          />
        ))}
        <text
          x="110"
          y={426}
          fontSize="7.5"
          fill="rgba(255,255,255,0.3)"
          fontFamily="sans-serif"
        >
          & growing
        </text>
      </g>

      {/* Live badge */}
      <g
        className="animate-float"
        style={{ animationDelay: "1.1s", transformOrigin: "50px 218px" }}
      >
        <rect
          x="8"
          y="193"
          width="92"
          height="48"
          rx="24"
          fill="rgba(15,15,28,0.96)"
          stroke="rgba(16,185,129,0.38)"
          strokeWidth="1"
        />
        <circle cx="30" cy="217" r="8" fill="rgba(16,185,129,0.15)" />
        <circle cx="30" cy="217" r="4" fill="#10B981" />
        <text
          x="44"
          y="213"
          fontSize="8.5"
          fill="rgba(255,255,255,0.85)"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Active
        </text>
        <text
          x="44"
          y="226"
          fontSize="7"
          fill="rgba(255,255,255,0.35)"
          fontFamily="sans-serif"
        >
          3 campaigns live
        </text>
      </g>

      {/* Particles */}
      {[
        [492, 52, 3],
        [508, 192, 2],
        [28, 118, 4],
        [502, 372, 2.5],
        [42, 456, 3],
        [516, 285, 2],
      ].map(([x, y, r], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill="url(#og)"
          opacity={[0.4, 0.3, 0.5, 0.3, 0.4, 0.25][i]}
        />
      ))}
    </svg>
  );
}

const STATS = [
  {
    icon: <TrendingUp size={20} />,
    value: "340%",
    label: "Average Client ROI",
    sub: "proven & measurable",
  },
  {
    icon: <Users size={20} />,
    value: "500+",
    label: "Brands Grown",
    sub: "across Africa & beyond",
  },
  {
    icon: <Award size={20} />,
    value: "98%",
    label: "Client Satisfaction",
    sub: "year over year",
  },
  {
    icon: <Globe size={20} />,
    value: "4",
    label: "Core Specialisations",
    sub: "end-to-end digital",
  },
];

export default function Hero() {
  const [email, setEmail] = useState("");

  return (
    <section
      id="home"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "5rem 0 4rem",
        background: "var(--color-bg-primary)",
      }}
    >
      {/* Ambient glows */}
      <div
        className="glow-orange"
        style={{
          width: "55vw",
          height: "55vw",
          top: "-18%",
          right: "-12%",
          opacity: 0.9,
        }}
      />
      <div
        className="glow-blue"
        style={{ width: "42vw", height: "42vw", bottom: "-12%", left: "-10%" }}
      />
      <div
        className="bg-line-grid"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.45,
          pointerEvents: "none",
        }}
      />

      <div
        className="container-site"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3.5rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* LEFT */}
          <div>
            <h1
              className="animate-fade-up delay-100"
              style={{ marginBottom: "1.375rem", lineHeight: 1.08 }}
            >
              Grow Your Brand.
              <br />
              Dominate Your{" "}
              <span className="text-gradient-orange">Market.</span>
            </h1>

            <p
              className="animate-fade-up delay-200"
              style={{
                fontSize: "1.0625rem",
                maxWidth: 470,
                marginBottom: "0.875rem",
                lineHeight: 1.8,
              }}
            >
              Serenly is a results-driven digital marketing agency helping
              businesses build powerful brands, grow their online presence, and
              convert audiences into loyal customers.
            </p>

            {/* Email CTA */}
            <div
              className="animate-fade-up delay-400"
              style={{
                display: "flex",
                gap: 10,
                marginBottom: "1.75rem",
                flexWrap: "wrap",
              }}
            >
              <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
                <input
                  type="email"
                  placeholder="Enter your business email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  style={{ paddingLeft: "2.75rem" }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-text-tertiary)",
                    fontSize: 14,
                    pointerEvents: "none",
                  }}
                >
                  ✦
                </span>
              </div>
              <a
                href="/contact"
                className="btn btn-primary btn-lg"
                style={{ borderRadius: 10 }}
              >
                Get Free Audit <ArrowRight size={16} strokeWidth={2.5} />
              </a>
            </div>

            {/* Watch reel */}
            <div
              className="animate-fade-up delay-500"
              style={{ display: "flex", alignItems: "center", gap: 14 }}
            >
              <button
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: "var(--color-surface-raised)",
                  border: "1.5px solid var(--color-border-strong)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--color-brand-orange)",
                  transition: "all 0.3s var(--ease-spring)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#FE7A36";
                  e.currentTarget.style.background = "rgba(254,122,54,0.1)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "var(--color-border-strong)";
                  e.currentTarget.style.background =
                    "var(--color-surface-raised)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Play size={16} fill="currentColor" style={{ marginLeft: 2 }} />
              </button>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                    color: "var(--color-text-primary)",
                  }}
                >
                  See our work in action
                </div>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  2-min agency overview
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — illustration */}
          <div
            className="animate-fade-up delay-200"
            style={{ height: "clamp(320px,42vw,480px)" }}
          >
            <HeroIllustration />
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .hero-grid{grid-template-columns:1fr !important;} }
        @media(max-width:640px){
          .hero-grid>div:last-child{height:260px !important;}
          div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important;}
        }
      `}</style>
    </section>
  );
}
