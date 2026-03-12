// src/components/Hero.jsx
import React, { useState, useEffect, useCallback } from "react";
import { ArrowRight } from "lucide-react";
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
        padding: "1rem 0 1.5rem",
        background: "var(--color-bg-primary)",
      }}
    >
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
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* LEFT */}
          <div
            className="hero-text"
            style={{
              paddingTop: "0.25rem",
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
                gap: 6,
                background: "rgba(254,122,54,0.1)",
                border: "1px solid rgba(254,122,54,0.25)",
                borderRadius: 999,
                padding: "4px 12px",
                marginBottom: "0.5rem",
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
            <h1 style={{ marginBottom: "0.5rem", lineHeight: 1.08 }}>
              {slide.headline}
              <br />
              <span className="text-gradient-orange">{slide.accent}</span>
            </h1>

            <p
              style={{
                fontSize: "1.0625rem",
                maxWidth: 440,
                marginBottom: "0.625rem",
                lineHeight: 1.65,
              }}
            >
              {slide.body}
            </p>

            {/* Keywords */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: "0.75rem",
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
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
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

          {/* RIGHT — image */}
          <div
            className="hero-image"
            style={{
              height: "clamp(300px,42vw,500px)",
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
              className="hero-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "top",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-image {
            order: -1;
            height: 85vw !important;
            max-height: 420px !important;
            width: 100vw !important;
            margin-left: calc(-1 * var(--container-padding, 1.25rem)) !important;
            margin-right: calc(-1 * var(--container-padding, 1.25rem)) !important;
          }
          .hero-img {
            object-fit: cover !important;
            object-position: center !important;
            border-radius: 0 !important;
          }
          .hero-text { order: 1; }
        }
        @media(max-width:640px){
          .hero-image {
            height: 75vw !important;
            max-height: 360px !important;
          }
        }
      `}</style>
    </section>
  );
}
