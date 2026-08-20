import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import assets from "../assets/assets";

/* ─── Responsive hook ─── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false,
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

/* ─── Individual section ─── */
function ProductSection({
  id,
  href,
  tag,
  color = "orange",
  headline,
  headlineAccent,
  accentPosition = "after",
  body,
  bullets,
  ctaLabel,
  image,
  reverse = false,
  bgVariant = "primary",
  sectionNum,
  badge,
}) {
  const sectionRef = useRef(null);
  const blobRef = useRef(null);
  const visRef = useRef(null);
  const [inView, setInView] = useState(false);
  const isMobile = useIsMobile();

  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* Parallax blob on mouse move — desktop only */
  useEffect(() => {
    if (isMobile) return;
    const el = sectionRef.current;
    if (!el || !blobRef.current) return;
    const onMove = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 40;
      const y = ((e.clientY - top) / height - 0.5) * 40;
      blobRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [isMobile]);

  /* Parallax image on scroll — desktop only */
  useEffect(() => {
    if (isMobile) return;
    const el = visRef.current;
    if (!el) return;
    const onScroll = () => {
      const { top, height } = el.getBoundingClientRect();
      const progress =
        (window.innerHeight - top) / (window.innerHeight + height);
      const shift = (progress - 0.5) * 50;
      el.style.transform = `translateY(${shift}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  const isBlue = color === "blue";
  const accent = isBlue ? "#0055da" : "#ef6905";
  const glowRgb = isBlue ? "0, 85, 218" : "239, 105, 5";
  const bgColor = bgVariant === "secondary" ? "#0F0F18" : "#0A0A0F";

  return (
    <section
      ref={sectionRef}
      id={id}
      style={{
        position: "relative",
        background: bgColor,
        overflow: "hidden",
        padding: isMobile ? "4rem 0 5rem" : "8rem 0",
        minHeight: isMobile ? "auto" : "90vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ── Ghost section number ── */}
      {!isMobile && (
        <span
          style={{
            position: "absolute",
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(8rem,14vw,16rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1,
            color: "#f5f5f5",
            opacity: 0.025,
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 1,
            ...(reverse ? { left: "-1rem" } : { right: "-1rem" }),
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {sectionNum}
        </span>
      )}

      {/* ── Parallax blob ── */}
      <div
        ref={blobRef}
        style={{
          position: "absolute",
          width: isMobile ? "80vw" : "55vw",
          height: isMobile ? "80vw" : "55vw",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${glowRgb},0.13) 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
          transition: "transform 0.15s ease-out",
          zIndex: 1,
          top: isMobile ? "-10%" : reverse ? undefined : "-20%",
          bottom: isMobile ? undefined : reverse ? "-20%" : undefined,
          left: isMobile ? "-20%" : reverse ? "-15%" : undefined,
          right: isMobile ? undefined : reverse ? undefined : "-15%",
        }}
      />

      {/* ── Subtle grain overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.35,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Layout grid ── */}
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: isMobile ? "0 1.25rem" : "0 2.5rem",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "2.5rem" : "5rem",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* TEXT */}
        <div
          style={{
            /* On mobile: always text first (order 1), image second (order 2).
               On desktop: honour the reverse flag. */
            order: isMobile ? 1 : reverse ? 2 : 1,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "1.1rem" : "1.5rem",
          }}
        >
          {/* Tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: accent,
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(14px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: accent,
                display: "block",
                flexShrink: 0,
              }}
            />
            {tag}
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: isMobile
                ? "clamp(2rem, 7.5vw, 2.8rem)"
                : "clamp(2.4rem, 3.8vw, 3.6rem)",
              fontWeight: 400,
              lineHeight: 1.08,
              color: "#F0EDE8",
              margin: 0,
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(22px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            {accentPosition === "before" ? (
              <>
                <em style={{ color: accent, fontStyle: "italic" }}>
                  {headlineAccent}
                </em>{" "}
                {headline}
              </>
            ) : (
              <>
                {headline}
                <em style={{ color: accent, fontStyle: "italic" }}>
                  {headlineAccent}
                </em>
              </>
            )}
          </h2>

          {/* Body */}
          <p
            style={{
              fontSize: isMobile ? "0.9rem" : "0.96rem",
              lineHeight: 1.82,
              color: "rgba(240,237,232,0.52)",
              maxWidth: 420,
              margin: 0,
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(18px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            {body}
          </p>

          {/* Bullets */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.55rem",
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(16px)",
              transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
            }}
          >
            {bullets.map((b, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  fontSize: isMobile ? "0.85rem" : "0.875rem",
                  color: "rgba(240,237,232,0.5)",
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 1,
                    background: accent,
                    flexShrink: 0,
                    display: "block",
                  }}
                />
                {b}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(14px)",
              transition: "opacity 0.6s ease 0.42s, transform 0.6s ease 0.42s",
            }}
          >
            <a
              href={href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.7rem",
                padding: isMobile ? "0.75rem 1.5rem" : "0.85rem 1.8rem",
                borderRadius: 100,
                background: accent,
                color: "#f5f5f5",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                boxShadow: `0 4px 28px rgba(${glowRgb},0.38)`,
                transition: "box-shadow 0.3s ease, transform 0.25s ease",
                WebkitTapHighlightColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow = `0 8px 48px rgba(${glowRgb},0.55)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = `0 4px 28px rgba(${glowRgb},0.38)`;
              }}
            >
              {ctaLabel}
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
          </div>
        </div>

        {/* VISUAL */}
        <div
          style={{
            order: isMobile ? 2 : reverse ? 1 : 2,
            opacity: inView ? 1 : 0,
            transform: inView
              ? "none"
              : isMobile
                ? "translateY(24px) scale(0.97)"
                : `translateX(${reverse ? -30 : 30}px) scale(0.97)`,
            transition:
              "opacity 0.9s ease 0.15s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s",
            position: "relative",
          }}
        >
          <div ref={visRef} style={{ willChange: "transform" }}>
            {/* Glow ring */}
            <div
              style={{
                position: "absolute",
                inset: "-2px",
                borderRadius: 22,
                background: `linear-gradient(135deg, rgba(${glowRgb},0.35), transparent 60%)`,
                zIndex: 0,
                filter: "blur(1px)",
              }}
            />

            {/* Image frame */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                borderRadius: isMobile ? 14 : 20,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.07)",
                aspectRatio: "4/3",
                boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(${glowRgb},0.12)`,
              }}
            >
              {/* Noise overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 3,
                  pointerEvents: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
                  backgroundSize: "200px",
                  opacity: 0.3,
                  mixBlendMode: "overlay",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  pointerEvents: "none",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
                }}
              />
              <img
                src={image}
                alt={tag}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) =>
                  !isMobile && (e.currentTarget.style.transform = "scale(1.04)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              />
            </div>

            {/* Floating badge */}
            {badge && (
              <div
                style={{
                  position: "absolute",
                  bottom: isMobile ? "-1rem" : "-1.4rem",
                  ...(reverse || isMobile
                    ? { left: isMobile ? "0.75rem" : "1.5rem" }
                    : { right: "1.5rem" }),
                  zIndex: 10,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.65rem",
                  padding: isMobile ? "0.5rem 0.9rem" : "0.7rem 1.2rem",
                  borderRadius: 14,
                  background: "rgba(10,10,15,0.85)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
                  fontSize: isMobile ? "0.72rem" : "0.8rem",
                  color: "#F0EDE8",
                  whiteSpace: "nowrap",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: accent,
                    flexShrink: 0,
                    display: "block",
                    animation: "badgePulse 2s ease-in-out infinite",
                  }}
                />
                {badge.label && (
                  <strong style={{ color: accent }}>{badge.label}</strong>
                )}
                {badge.text}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes badgePulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(${glowRgb},0.5); }
          50%      { box-shadow: 0 0 0 6px rgba(${glowRgb},0); }
        }
      `}</style>
    </section>
  );
}

/* ─── Thin divider ─── */
function Divider() {
  return (
    <div
      style={{
        height: 1,
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent 100%)",
        margin: "0 1.25rem",
      }}
    />
  );
}

/* ─── Composed export ─── */
export default function ProductSections() {
  return (
    <>
      <ProductSection
        id="web-dev"
        href="/web-dev"
        sectionNum="01"
        tag="Web & Software"
        color="blue"
        headline="Your site, working "
        headlineAccent="24/7."
        accentPosition="after"
        body="Fast, secure, and built to convert — from landing pages to full custom platforms. Your best salesperson never sleeps."
        bullets={[
          "Custom design built to convert visitors",
          "E-commerce, booking & client portals",
          "Mobile-first, SEO-ready from day one",
        ]}
        ctaLabel="Explore Web Dev"
        image={assets.websites}
        reverse={true}
        bgVariant="secondary"
        badge={{ label: "99", text: " PageSpeed Score" }}
      />

      <Divider />

      <ProductSection
        id="branding"
        href="/branding"
        sectionNum="02"
        tag="Brand Identity"
        color="orange"
        headline="A brand they "
        headlineAccent="can't forget."
        accentPosition="after"
        body="Your logo is the door — your brand is the room. We craft identities that make people feel something, then choose you."
        bullets={[
          "Strategy, positioning & messaging",
          "Logo, visual identity & brand guidelines",
          "Voice, tone & competitive research",
        ]}
        ctaLabel="Explore Branding"
        image={assets.brand}
        reverse={false}
        bgVariant="primary"
        badge={{ label: "", text: "Brand Guidelines Included" }}
      />

      <Divider />

      <ProductSection
        id="smm"
        href="/smm"
        sectionNum="03"
        tag="Social Media"
        color="blue"
        headline="Followers that "
        headlineAccent="actually buy."
        accentPosition="after"
        body="We run your social end-to-end — content, ads, analytics — so every post moves people closer to purchasing."
        bullets={[
          "Full management & content calendar",
          "Graphics, reels & scroll-stopping copy",
          "Paid social with precision targeting",
        ]}
        ctaLabel="Explore SMM"
        image={assets.social}
        reverse={true}
        bgVariant="secondary"
        badge={{ label: "3×", text: " avg. engagement lift" }}
      />

      <Divider />

      <ProductSection
        id="seo"
        href="/seo"
        sectionNum="04"
        tag="SEO"
        color="orange"
        headline="Rank higher. "
        headlineAccent="Get found."
        accentPosition="after"
        body="What good is a great website if no one finds it? We get you to page one for keywords your customers are already searching."
        bullets={[
          "Full SEO audit, keywords & gap analysis",
          "On-page optimisation — meta, schema & speed",
          "Local SEO for Nairobi, Kenya & beyond",
        ]}
        ctaLabel="Explore SEO"
        image={assets.seo}
        reverse={false}
        bgVariant="primary"
        badge={{ label: "", text: "Page 1 or We Keep Working" }}
      />
    </>
  );
}
