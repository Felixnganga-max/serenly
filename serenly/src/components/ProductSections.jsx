import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

/* ── Shared check-list item ── */
function Bullet({ text }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.625rem",
        marginBottom: "0.75rem",
      }}
    >
      <CheckCircle2
        size={17}
        style={{ color: "#FE7A36", flexShrink: 0, marginTop: 2 }}
      />
      <span
        style={{
          fontSize: "0.9375rem",
          color: "var(--color-text-secondary)",
          lineHeight: 1.65,
        }}
      >
        {text}
      </span>
    </li>
  );
}

/* ── Generic product section layout ── */
function ProductSection({
  id,
  href,
  tag,
  tagColor = "orange",
  headline,
  headlineAccent,
  accentPosition = "after",
  body,
  bullets,
  ctaLabel,
  illustrationBg,
  illustration,
  reverse = false,
  bgVariant = "primary",
}) {
  const tagClass =
    tagColor === "blue" ? "section-tag-blue" : "section-tag-orange";

  return (
    <section
      id={id}
      className="section-padding"
      style={{
        background:
          bgVariant === "secondary"
            ? "var(--color-bg-secondary)"
            : "var(--color-bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        className={tagColor === "blue" ? "glow-blue" : "glow-orange"}
        style={{
          width: "40vw",
          height: "40vw",
          opacity: 0.55,
          ...(reverse
            ? { bottom: "-20%", left: "-10%" }
            : { top: "-20%", right: "-10%" }),
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
            gap: "4rem",
            alignItems: "center",
          }}
          className="prod-grid"
        >
          {/* TEXT side */}
          <div
            style={{ order: reverse ? 2 : 1 }}
            className={reverse ? "prod-text-r" : "prod-text-l"}
          >
            <div
              className={`section-tag ${tagClass} animate-fade-up`}
              style={{ marginBottom: "1.25rem" }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: tagColor === "blue" ? "#0046FF" : "#FE7A36",
                  display: "inline-block",
                }}
              />
              {tag}
            </div>

            <h2
              className="animate-fade-up delay-100"
              style={{ marginBottom: "1.125rem" }}
            >
              {accentPosition === "before" ? (
                <>
                  <span
                    className={
                      tagColor === "blue"
                        ? "text-gradient-blue"
                        : "text-gradient-orange"
                    }
                  >
                    {headlineAccent}
                  </span>{" "}
                  {headline}
                </>
              ) : (
                <>
                  {headline}{" "}
                  <span
                    className={
                      tagColor === "blue"
                        ? "text-gradient-blue"
                        : "text-gradient-orange"
                    }
                  >
                    {headlineAccent}
                  </span>
                </>
              )}
            </h2>

            <p
              className="animate-fade-up delay-200"
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                maxWidth: 460,
                marginBottom: "1.5rem",
              }}
            >
              {body}
            </p>

            <ul
              style={{ listStyle: "none", padding: 0, marginBottom: "2rem" }}
              className="animate-fade-up delay-300"
            >
              {bullets.map((b) => (
                <Bullet key={b} text={b} />
              ))}
            </ul>

            <a
              href={href}
              className="btn btn-primary btn-lg animate-fade-up delay-400"
              style={{ borderRadius: 10, display: "inline-flex" }}
            >
              {ctaLabel} <ArrowRight size={17} strokeWidth={2.5} />
            </a>
          </div>

          {/* VISUAL side */}
          <div
            style={{
              order: reverse ? 1 : 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className={reverse ? "prod-vis-r" : "prod-vis-l"}
          >
            <div
              className="animate-fade-up delay-200"
              style={{
                width: "100%",
                maxWidth: 420,
                aspectRatio: "1 / 0.9",
                borderRadius: "var(--radius-2xl)",
                background: illustrationBg,
                border: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                boxShadow: "var(--shadow-xl)",
              }}
            >
              {illustration}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .prod-grid{grid-template-columns:1fr !important; gap:2.5rem !important;}
          .prod-text-r,.prod-text-l{order:2 !important;}
          .prod-vis-r,.prod-vis-l{order:1 !important;}
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════
   BRANDING ILLUSTRATION
══════════════════════════════════════════════ */
function BrandingVisual() {
  return (
    <svg
      viewBox="0 0 380 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "88%", height: "88%" }}
    >
      <defs>
        <linearGradient id="og2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FE7A36" />
          <stop offset="100%" stopColor="#FF9A62" />
        </linearGradient>
      </defs>
      {/* Logo mark circle */}
      <circle
        cx="190"
        cy="140"
        r="72"
        fill="rgba(254,122,54,0.08)"
        stroke="rgba(254,122,54,0.2)"
        strokeWidth="1.5"
      />
      <circle cx="190" cy="140" r="52" fill="url(#og2)" opacity="0.9" />
      <text
        x="190"
        y="152"
        textAnchor="middle"
        fontSize="32"
        fill="white"
        fontFamily="serif"
        fontWeight="400"
      >
        S
      </text>
      {/* Brand name plate */}
      <rect
        x="112"
        y="228"
        width="156"
        height="36"
        rx="10"
        fill="rgba(254,122,54,0.1)"
        stroke="rgba(254,122,54,0.25)"
        strokeWidth="1"
      />
      <text
        x="190"
        y="251"
        textAnchor="middle"
        fontSize="14"
        fill="#FE7A36"
        fontWeight="700"
        fontFamily="sans-serif"
        letterSpacing="3"
      >
        SERENLY
      </text>
      {/* Color palette swatches */}
      {["#FE7A36", "#0046FF", "#E9E9E9", "#080808"].map((c, i) => (
        <circle
          key={i}
          cx={138 + i * 34}
          cy={290}
          r="14"
          fill={c}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
        />
      ))}
      {/* Floating design elements */}
      <rect
        x="42"
        y="90"
        width="64"
        height="64"
        rx="16"
        fill="rgba(254,122,54,0.07)"
        stroke="rgba(254,122,54,0.15)"
        strokeWidth="1"
        className="animate-float"
      />
      <text x="74" y="128" textAnchor="middle" fontSize="28">
        🎨
      </text>
      <rect
        x="274"
        y="110"
        width="56"
        height="56"
        rx="14"
        fill="rgba(0,70,255,0.07)"
        stroke="rgba(0,70,255,0.15)"
        strokeWidth="1"
        className="animate-float-d"
      />
      <text x="302" y="144" textAnchor="middle" fontSize="24">
        ✦
      </text>
      {/* Grid dots */}
      {[...Array(4)].map((_, r) =>
        [...Array(4)].map((_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={42 + c * 12}
            cy={220 + r * 12}
            r="1.5"
            fill="rgba(254,122,54,0.2)"
          />
        )),
      )}
    </svg>
  );
}

/* ══════════════════════════════════════════════
   SMM ILLUSTRATION
══════════════════════════════════════════════ */
function SMMVisual() {
  return (
    <svg
      viewBox="0 0 380 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "88%", height: "88%" }}
    >
      <defs>
        <linearGradient id="og3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FE7A36" />
          <stop offset="100%" stopColor="#FF9A62" />
        </linearGradient>
      </defs>
      {/* Phone frame */}
      <rect
        x="130"
        y="30"
        width="120"
        height="210"
        rx="20"
        fill="#111"
        stroke="rgba(254,122,54,0.3)"
        strokeWidth="1.5"
      />
      <rect x="138" y="44" width="104" height="182" rx="12" fill="#0d0d1a" />
      {/* Instagram-style post */}
      <rect
        x="142"
        y="48"
        width="96"
        height="16"
        rx="4"
        fill="rgba(255,255,255,0.06)"
      />
      <circle cx="154" cy="56" r="5" fill="url(#og3)" />
      <text
        x="163"
        y="59"
        fontSize="6"
        fill="rgba(255,255,255,0.5)"
        fontFamily="sans-serif"
      >
        serenly.agency
      </text>
      <rect
        x="142"
        y="68"
        width="96"
        height="72"
        rx="4"
        fill="rgba(254,122,54,0.15)"
      />
      <text x="190" y="108" textAnchor="middle" fontSize="28">
        📊
      </text>
      {/* Engagement row */}
      <text
        x="148"
        y="154"
        fontSize="9"
        fill="rgba(254,122,54,0.8)"
        fontFamily="sans-serif"
      >
        ❤️ 2.4k 💬 318 ↗️ 900
      </text>
      {/* Stories row */}
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={152 + i * 26}
          cy={178}
          r="10"
          stroke="url(#og3)"
          strokeWidth="1.5"
          fill={["#FE7A36", "#0046FF", "#10B981", "#8B5CF6"][i] + "33"}
        />
      ))}

      {/* Floating metric cards */}
      <g className="animate-float" style={{ transformOrigin: "58px 120px" }}>
        <rect
          x="20"
          y="98"
          width="100"
          height="52"
          rx="12"
          fill="rgba(15,15,28,0.96)"
          stroke="rgba(254,122,54,0.2)"
          strokeWidth="1"
        />
        <text
          x="70"
          y="119"
          textAnchor="middle"
          fontSize="8"
          fill="rgba(255,255,255,0.45)"
          fontFamily="sans-serif"
        >
          Followers
        </text>
        <text
          x="70"
          y="138"
          textAnchor="middle"
          fontSize="15"
          fill="#FE7A36"
          fontWeight="700"
          fontFamily="sans-serif"
        >
          +12.4k
        </text>
      </g>
      <g className="animate-float-d" style={{ transformOrigin: "308px 180px" }}>
        <rect
          x="260"
          y="158"
          width="100"
          height="52"
          rx="12"
          fill="rgba(15,15,28,0.96)"
          stroke="rgba(0,70,255,0.2)"
          strokeWidth="1"
        />
        <text
          x="310"
          y="179"
          textAnchor="middle"
          fontSize="8"
          fill="rgba(255,255,255,0.45)"
          fontFamily="sans-serif"
        >
          Engagement
        </text>
        <text
          x="310"
          y="198"
          textAnchor="middle"
          fontSize="15"
          fill="#0046FF"
          fontWeight="700"
          fontFamily="sans-serif"
        >
          8.7%
        </text>
      </g>

      {/* Reach graph */}
      <rect
        x="60"
        y="262"
        width="260"
        height="58"
        rx="12"
        fill="rgba(15,15,28,0.6)"
        stroke="rgba(254,122,54,0.12)"
        strokeWidth="1"
      />
      <text
        x="80"
        y="282"
        fontSize="8"
        fill="rgba(255,255,255,0.4)"
        fontFamily="sans-serif"
      >
        Monthly Reach
      </text>
      <polyline
        points="70,308 100,296 130,300 160,282 190,288 220,272 250,277 280,262 300,265"
        stroke="url(#og3)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ══════════════════════════════════════════════
   SEO ILLUSTRATION
══════════════════════════════════════════════ */
function SEOVisual() {
  return (
    <svg
      viewBox="0 0 380 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "88%", height: "88%" }}
    >
      <defs>
        <linearGradient id="og4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FE7A36" />
          <stop offset="100%" stopColor="#FF9A62" />
        </linearGradient>
        <linearGradient id="bg4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0046FF" />
          <stop offset="100%" stopColor="#3369FF" />
        </linearGradient>
      </defs>
      {/* Google SERP mockup */}
      <rect
        x="48"
        y="24"
        width="284"
        height="44"
        rx="10"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
      />
      <circle cx="70" cy="46" r="8" fill="rgba(254,122,54,0.2)" />
      <text x="70" y="50" textAnchor="middle" fontSize="10">
        🔍
      </text>
      <rect
        x="84"
        y="40"
        width="180"
        height="12"
        rx="6"
        fill="rgba(255,255,255,0.08)"
      />
      <text
        x="92"
        y="50"
        fontSize="8"
        fill="rgba(255,255,255,0.4)"
        fontFamily="sans-serif"
      >
        digital marketing agency nairobi
      </text>

      {/* #1 rank card */}
      <rect
        x="48"
        y="82"
        width="284"
        height="64"
        rx="10"
        fill="rgba(254,122,54,0.08)"
        stroke="rgba(254,122,54,0.3)"
        strokeWidth="1.5"
      />
      <rect x="58" y="90" width="24" height="14" rx="4" fill="url(#og4)" />
      <text
        x="70"
        y="101"
        textAnchor="middle"
        fontSize="7"
        fill="white"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        #1
      </text>
      <text
        x="92"
        y="101"
        fontSize="9"
        fill="#FE7A36"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        serenly.agency › digital-marketing
      </text>
      <text
        x="60"
        y="118"
        fontSize="8.5"
        fill="rgba(255,255,255,0.7)"
        fontFamily="sans-serif"
      >
        Serenly | Top Digital Marketing Agency in Kenya
      </text>
      <text
        x="60"
        y="132"
        fontSize="7.5"
        fill="rgba(255,255,255,0.35)"
        fontFamily="sans-serif"
      >
        Grow your brand with data-driven digital marketing strategies...
      </text>

      {/* #2, #3 rows (competitors, greyed) */}
      {[1, 2].map((n) => (
        <rect
          key={n}
          x={48}
          y={158 + n * 54}
          width={284}
          height={48}
          rx="10"
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
        />
      ))}
      {[1, 2].map((n) => (
        <g key={n}>
          <rect
            x={58}
            y={166 + n * 54}
            width={20}
            height={12}
            rx="3"
            fill="rgba(255,255,255,0.08)"
          />
          <text
            x={68}
            y={176 + n * 54}
            textAnchor="middle"
            fontSize="7"
            fill="rgba(255,255,255,0.3)"
            fontFamily="sans-serif"
          >
            #{n + 1}
          </text>
          <rect
            x={84}
            y={170 + n * 54}
            width={160}
            height={8}
            rx="4"
            fill="rgba(255,255,255,0.06)"
          />
          <rect
            x={84}
            y={184 + n * 54}
            width={220}
            height={6}
            rx="3"
            fill="rgba(255,255,255,0.04)"
          />
        </g>
      ))}

      {/* Rank trend badge */}
      <g className="animate-float" style={{ transformOrigin: "328px 100px" }}>
        <rect
          x="282"
          y="78"
          width="86"
          height="56"
          rx="12"
          fill="rgba(15,15,28,0.96)"
          stroke="rgba(16,185,129,0.3)"
          strokeWidth="1"
        />
        <text
          x="325"
          y="99"
          textAnchor="middle"
          fontSize="8"
          fill="rgba(255,255,255,0.4)"
          fontFamily="sans-serif"
        >
          Keyword rank
        </text>
        <text
          x="325"
          y="120"
          textAnchor="middle"
          fontSize="20"
          fill="#10B981"
          fontWeight="700"
          fontFamily="sans-serif"
        >
          ↑ 24
        </text>
      </g>

      {/* Traffic graph */}
      <rect
        x="48"
        y="280"
        width="284"
        height="46"
        rx="10"
        fill="rgba(15,15,28,0.55)"
        stroke="rgba(254,122,54,0.1)"
        strokeWidth="1"
      />
      <text
        x="65"
        y="297"
        fontSize="7.5"
        fill="rgba(255,255,255,0.35)"
        fontFamily="sans-serif"
      >
        Organic traffic growth
      </text>
      <polyline
        points="58,316 88,306 118,310 148,294 178,300 208,284 238,290 268,274 298,279 318,268"
        stroke="url(#og4)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ══════════════════════════════════════════════
   WEB DEV ILLUSTRATION
══════════════════════════════════════════════ */
function WebDevVisual() {
  return (
    <svg
      viewBox="0 0 380 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "88%", height: "88%" }}
    >
      <defs>
        <linearGradient id="og5" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FE7A36" />
          <stop offset="100%" stopColor="#FF9A62" />
        </linearGradient>
        <linearGradient id="bg5" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0046FF" />
          <stop offset="100%" stopColor="#3369FF" />
        </linearGradient>
      </defs>
      {/* Monitor */}
      <rect
        x="55"
        y="38"
        width="270"
        height="185"
        rx="14"
        fill="#111"
        stroke="rgba(254,122,54,0.25)"
        strokeWidth="1.5"
      />
      <rect x="66" y="50" width="248" height="160" rx="8" fill="#080812" />
      {/* Code editor lines */}
      <rect
        x="74"
        y="60"
        width="60"
        height="8"
        rx="3"
        fill="rgba(254,122,54,0.5)"
      />
      <rect
        x="74"
        y="74"
        width="100"
        height="6"
        rx="3"
        fill="rgba(255,255,255,0.1)"
      />
      <rect
        x="84"
        y="86"
        width="80"
        height="6"
        rx="3"
        fill="rgba(0,70,255,0.4)"
      />
      <rect
        x="84"
        y="98"
        width="120"
        height="6"
        rx="3"
        fill="rgba(255,255,255,0.07)"
      />
      <rect
        x="74"
        y="110"
        width="90"
        height="6"
        rx="3"
        fill="rgba(254,122,54,0.3)"
      />
      <rect
        x="84"
        y="122"
        width="70"
        height="6"
        rx="3"
        fill="rgba(0,70,255,0.25)"
      />
      <rect
        x="84"
        y="134"
        width="110"
        height="6"
        rx="3"
        fill="rgba(255,255,255,0.06)"
      />
      <rect
        x="74"
        y="146"
        width="95"
        height="6"
        rx="3"
        fill="rgba(254,122,54,0.35)"
      />
      <rect
        x="74"
        y="158"
        width="55"
        height="6"
        rx="3"
        fill="rgba(16,185,129,0.4)"
      />
      <rect
        x="74"
        y="170"
        width="80"
        height="6"
        rx="3"
        fill="rgba(255,255,255,0.08)"
      />
      {/* Preview panel */}
      <rect
        x="202"
        y="58"
        width="106"
        height="144"
        rx="6"
        fill="rgba(254,122,54,0.05)"
        stroke="rgba(254,122,54,0.12)"
        strokeWidth="1"
      />
      <rect
        x="210"
        y="66"
        width="90"
        height="20"
        rx="4"
        fill="url(#og5)"
        opacity="0.8"
      />
      <text
        x="255"
        y="80"
        textAnchor="middle"
        fontSize="8"
        fill="white"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Serenly
      </text>
      <rect
        x="210"
        y="92"
        width="90"
        height="6"
        rx="3"
        fill="rgba(255,255,255,0.08)"
      />
      <rect
        x="210"
        y="104"
        width="70"
        height="6"
        rx="3"
        fill="rgba(255,255,255,0.06)"
      />
      <rect
        x="210"
        y="116"
        width="80"
        height="6"
        rx="3"
        fill="rgba(255,255,255,0.05)"
      />
      <rect
        x="210"
        y="134"
        width="48"
        height="16"
        rx="8"
        fill="url(#og5)"
        opacity="0.7"
      />
      <text
        x="234"
        y="145"
        textAnchor="middle"
        fontSize="6.5"
        fill="white"
        fontFamily="sans-serif"
      >
        Get Started
      </text>

      {/* Stand */}
      <rect x="167" y="222" width="46" height="10" rx="3" fill="#1a1a26" />
      <rect x="152" y="230" width="76" height="6" rx="3" fill="#1a1a26" />

      {/* Tech stack badges */}
      {[
        ["React", "#61DAFB"],
        ["Next.js", "#fff"],
        ["Node", "#3C873A"],
        ["Figma", "#F24E1E"],
      ].map(([t, c], i) => (
        <g
          key={t}
          className={i % 2 === 0 ? "animate-float" : "animate-float-d"}
          style={{ transformOrigin: `${48 + i * 84}px 276px` }}
        >
          <rect
            x={28 + i * 84}
            y={258}
            width={66}
            height={30}
            rx={8}
            fill="rgba(15,15,28,0.96)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text
            x={61 + i * 84}
            y={278}
            textAnchor="middle"
            fontSize="9"
            fill={c}
            fontFamily="sans-serif"
            fontWeight="600"
          >
            {t}
          </text>
        </g>
      ))}

      {/* Performance badge */}
      <g className="animate-float" style={{ transformOrigin: "332px 90px" }}>
        <rect
          x="296"
          y="68"
          width="78"
          height="60"
          rx="12"
          fill="rgba(15,15,28,0.96)"
          stroke="rgba(16,185,129,0.3)"
          strokeWidth="1"
        />
        <text
          x="335"
          y="88"
          textAnchor="middle"
          fontSize="8"
          fill="rgba(255,255,255,0.4)"
          fontFamily="sans-serif"
        >
          Perf score
        </text>
        <text
          x="335"
          y="112"
          textAnchor="middle"
          fontSize="24"
          fill="#10B981"
          fontWeight="700"
          fontFamily="sans-serif"
        >
          98
        </text>
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════
   EXPORT — all 4 product sections
══════════════════════════════════════════════ */
export default function ProductSections() {
  return (
    <>
      {/* 1 ── BRANDING */}
      <ProductSection
        id="branding"
        href="/branding"
        tag="Brand Identity & Strategy"
        tagColor="orange"
        headline="A Brand That"
        headlineAccent="Commands Attention."
        accentPosition="after"
        body="Your brand is more than a logo — it's the first impression, the lasting memory, and the reason customers choose you over competitors. Serenly crafts compelling brand identities that communicate your values, resonate with your audience, and stand out in crowded markets."
        bullets={[
          "Brand strategy, positioning & messaging that converts",
          "Logo design, visual identity & brand guidelines",
          "Brand voice, tone & content personality development",
          "Competitive analysis & market positioning research",
        ]}
        ctaLabel="Explore Branding Services"
        illustrationBg="linear-gradient(135deg, rgba(254,122,54,0.06) 0%, rgba(254,122,54,0.02) 100%)"
        illustration={<BrandingVisual />}
        reverse={false}
        bgVariant="primary"
      />

      {/* 2 ── SMM */}
      <ProductSection
        id="smm"
        href="/smm"
        tag="Social Media Marketing"
        tagColor="blue"
        headline="Turn Followers Into"
        headlineAccent="Paying Customers."
        accentPosition="after"
        body="Social media is where your audience lives — and Serenly makes sure your brand shows up, stands out, and converts. We manage end-to-end social media strategies across Instagram, Facebook, TikTok, LinkedIn, and X, creating content that sparks engagement and drives real business results."
        bullets={[
          "Full social media management & content calendar planning",
          "Scroll-stopping creative content — graphics, reels & copy",
          "Paid social advertising with precision audience targeting",
          "Monthly analytics reports with actionable growth insights",
        ]}
        ctaLabel="Explore SMM Services"
        illustrationBg="linear-gradient(135deg, rgba(0,70,255,0.06) 0%, rgba(0,70,255,0.02) 100%)"
        illustration={<SMMVisual />}
        reverse={true}
        bgVariant="secondary"
      />

      {/* 3 ── SEO */}
      <ProductSection
        id="seo"
        href="/seo"
        tag="SEO Optimization"
        tagColor="orange"
        headline="Rank Higher."
        headlineAccent="Get Found. Grow Faster."
        accentPosition="after"
        body="What good is a great website if no one finds it? Serenly's SEO experts build search strategies that get your business ranking on page one for keywords your customers are already searching — driving consistent, high-intent organic traffic that turns into leads and revenue."
        bullets={[
          "Comprehensive SEO audits, keyword research & gap analysis",
          "On-page optimisation — meta, content, schema & site speed",
          "High-authority link building & off-page SEO campaigns",
          "Local SEO for Nairobi, Kenya & African markets",
        ]}
        ctaLabel="Explore SEO Services"
        illustrationBg="linear-gradient(135deg, rgba(254,122,54,0.06) 0%, rgba(254,122,54,0.02) 100%)"
        illustration={<SEOVisual />}
        reverse={false}
        bgVariant="primary"
      />

      {/* 4 ── WEB DEV */}
      <ProductSection
        id="web-dev"
        href="/web-dev"
        tag="Website & Software Development"
        tagColor="blue"
        headline="Websites That"
        headlineAccent="Work While You Sleep."
        accentPosition="after"
        body="A beautiful website is your best salesperson — available 24/7, converting visitors into clients while you focus on running your business. Serenly builds fast, secure, and scalable websites and custom software solutions tailored to your business goals and built to grow with you."
        bullets={[
          "Custom website design & development — built to convert",
          "E-commerce stores, booking systems & client portals",
          "Mobile-first, lightning-fast & SEO-ready from launch",
          "Ongoing maintenance, hosting & technical support",
        ]}
        ctaLabel="Explore Web Development"
        illustrationBg="linear-gradient(135deg, rgba(0,70,255,0.06) 0%, rgba(0,70,255,0.02) 100%)"
        illustration={<WebDevVisual />}
        reverse={true}
        bgVariant="secondary"
      />
    </>
  );
}
