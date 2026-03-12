// src/components/Hero.jsx
import React, { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import assets from "../assets/assets";

const SLIDES = [
  {
    tag: "Web Design & Development",
    headline: "Convert Visitors Into",
    accent: "Paying Customers.",
    body: "High-converting, blazing-fast websites built for performance and mobile. From landing pages to full e-commerce platforms.",
    keywords: ["#WebDesign", "#ResponsiveDesign", "#LandingPages"],
    cta: "Get a Free Website Audit",
    image: assets.wb,
    imageAlt: "Web Design & Development",
  },
  {
    tag: "Meta Ads Management",
    headline: "Turn Ad Spend Into",
    accent: "Real Revenue.",
    body: "Precision-targeted Meta campaigns on Facebook & Instagram that put your brand in front of the right buyers — and convert them.",
    keywords: ["#MetaAds", "#FacebookAds", "#InstagramAds"],
    cta: "Launch My Meta Campaign",
    image: assets.sc,
    imageAlt: "Meta Ads Management",
  },
  {
    tag: "Search Engine Optimisation",
    headline: "Rank #1 on Google.",
    accent: "Own Your Niche.",
    body: "Technical SEO and content strategy that drives sustainable organic traffic and dominates search rankings.",
    keywords: ["#SEO", "#GoogleRanking", "#OrganicTraffic"],
    cta: "Audit My SEO for Free",
    image: assets.se,
    imageAlt: "Search Engine Optimisation",
  },
  {
    tag: "Branding & Print Design",
    headline: "Make Your Brand",
    accent: "Impossible to Forget.",
    body: "Logos, brand identities, print collateral, and packaging that tell your story and leave a lasting impression.",
    keywords: ["#LogoDesign", "#BrandIdentity", "#PrintDesign"],
    cta: "Start My Brand Project",
    image: assets.br,
    imageAlt: "Branding & Print Design",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState("");
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (idx, dir = 1) => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(idx);
        setAnimating(false);
      }, 300);
    },
    [animating],
  );

  const prev = () => go((current - 1 + SLIDES.length) % SLIDES.length, -1);
  const next = () => go((current + 1) % SLIDES.length, 1);

  useEffect(() => {
    const t = setInterval(() => go((current + 1) % SLIDES.length, 1), 6000);
    return () => clearInterval(t);
  }, [current, go]);

  const slide = SLIDES[current];

  return (
    <section
      id="home"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "2rem 0 4rem",
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
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3.5rem",
            alignItems: "start",
          }}
        >
          {/* LEFT — text content (order: 2 on mobile so image appears first) */}
          <div
            className="hero-text"
            style={{
              paddingTop: "1rem",
              opacity: animating ? 0 : 1,
              transform: animating
                ? `translateX(${direction * -28}px)`
                : "translateX(0)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            {/* Tag pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(254,122,54,0.1)",
                border: "1px solid rgba(254,122,54,0.25)",
                borderRadius: 999,
                padding: "5px 14px",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#FE7A36",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-secondary)",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                {slide.tag}
              </span>
            </div>

            {/* Headline */}
            <h1 style={{ marginBottom: "1.25rem", lineHeight: 1.08 }}>
              {slide.headline}
              <br />
              <span className="text-gradient-orange">{slide.accent}</span>
            </h1>

            <p
              style={{
                fontSize: "1.0625rem",
                maxWidth: 440,
                marginBottom: "1.5rem",
                lineHeight: 1.8,
              }}
            >
              {slide.body}
            </p>

            {/* Keywords */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: "2rem",
              }}
            >
              {slide.keywords.map((kw) => (
                <span
                  key={kw}
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-tertiary)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 6,
                    padding: "3px 10px",
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>

            {/* Email CTA */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
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
                {slide.cta} <ArrowRight size={16} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* RIGHT — image (order: 1 on mobile so it appears above text) */}
          <div
            className="hero-image"
            style={{
              height: "clamp(800px,42vw,500px)",
              opacity: animating ? 0 : 1,
              transform: animating
                ? `translateX(${direction * 28}px)`
                : "translateX(0)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <img
              src={slide.image}
              alt={slide.imageAlt}
              style={{
                width: "100%",
                height: "80%",
                objectFit: "contain",
                objectPosition: "top",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Carousel controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginTop: "2.5rem",
          }}
        >
          <button
            onClick={prev}
            className="btn btn-ghost"
            style={{ width: 40, height: 40, padding: 0, borderRadius: "50%" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#FE7A36";
              e.currentTarget.style.color = "#FE7A36";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border-strong)";
              e.currentTarget.style.color = "";
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > current ? 1 : -1)}
                style={{
                  width: i === current ? 26 : 7,
                  height: 7,
                  borderRadius: 999,
                  background:
                    i === current ? "#FE7A36" : "rgba(255,255,255,0.15)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="btn btn-ghost"
            style={{ width: 40, height: 40, padding: 0, borderRadius: "50%" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#FE7A36";
              e.currentTarget.style.color = "#FE7A36";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border-strong)";
              e.currentTarget.style.color = "";
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Tab pills */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginTop: "1rem",
            flexWrap: "wrap",
          }}
        >
          {SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                padding: "5px 14px",
                borderRadius: 999,
                border: `1px solid ${i === current ? "rgba(254,122,54,0.5)" : "rgba(255,255,255,0.08)"}`,
                background:
                  i === current ? "rgba(254,122,54,0.1)" : "transparent",
                color: i === current ? "#FE7A36" : "var(--color-text-tertiary)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {s.tag}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .hero-grid{
            grid-template-columns: 1fr !important;
          }
          .hero-image{
            order: -1;
            height: 260px !important;
          }
          .hero-text{
            order: 1;
          }
        }
        @media(max-width:640px){
          .hero-image{ height: 220px !important; }
        }
      `}</style>
    </section>
  );
}
