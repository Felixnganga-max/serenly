import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  BookOpen,
  Brain,
  Users,
  BarChart3,
  ShieldCheck,
  Star,
  Play,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// ─────────────────────────────────────────────────────────────
// FONT INJECTION
// ─────────────────────────────────────────────────────────────
const FONTS_CSS = `@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&family=Marcellus&display=swap');`;

// ─────────────────────────────────────────────────────────────
// IMAGES — expanded with atmospheric shots
// ─────────────────────────────────────────────────────────────
const IMG = {
  // Hero slides — dramatic, high-contrast
  hero_system:
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=85&auto=format&fit=crop",
  hero_website:
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1600&q=85&auto=format&fit=crop",
  hero_branding:
    "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1600&q=85&auto=format&fit=crop",
  hero_ads:
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1600&q=85&auto=format&fit=crop",

  // Service sections — full-bleed backgrounds
  service_system:
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1600&q=80&auto=format&fit=crop",
  service_web:
    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1600&q=80&auto=format&fit=crop",
  service_brand:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&auto=format&fit=crop",
  service_ads:
    "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1600&q=80&auto=format&fit=crop",

  // Atmosphere / texture
  atmos_students:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=80&auto=format&fit=crop",
  atmos_class:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80&auto=format&fit=crop",
  atmos_tech:
    "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=1400&q=80&auto=format&fit=crop",
  atmos_campus:
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400&q=80&auto=format&fit=crop",

  // Floating card thumbnails
  card_exam:
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=75&auto=format&fit=crop",
  card_fee:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=75&auto=format&fit=crop",
  card_brand:
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=75&auto=format&fit=crop",
  card_web:
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=75&auto=format&fit=crop",
};

// ─────────────────────────────────────────────────────────────
// PARALLAX HOOK
// ─────────────────────────────────────────────────────────────
function useParallax(speed = 0.08) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const fn = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(center * speed);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [speed]);
  return [ref, offset];
}

// ─────────────────────────────────────────────────────────────
// INTERSECTION REVEAL HOOK
// ─────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
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

// ─────────────────────────────────────────────────────────────
// GLOBAL CSS
// ─────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  ${FONTS_CSS}
  :root {
    --font-display: 'Marcellus', Georgia, serif;
    --font-body: 'Dosis', system-ui, sans-serif;
    --orange: #ef6905;
    --blue: #0055da;
    --ease-spring: cubic-bezier(0.34,1.56,0.64,1);
    --ease-smooth: cubic-bezier(0.4,0,0.2,1);
  }
  [data-theme="light"],:root:not([data-theme="dark"]){
    --color-bg-primary:#FAFAFA;
    --color-bg-secondary:#F3F3F6;
    --color-surface:rgba(255,255,255,0.92);
    --color-surface-raised:#f5f5f5;
    --color-border:rgba(0,0,0,0.07);
    --color-border-subtle:rgba(0,0,0,0.04);
    --color-border-strong:rgba(0,0,0,0.13);
    --color-text-primary:#0A0A0F;
    --color-text-secondary:rgba(10,10,15,0.55);
    --color-text-tertiary:rgba(10,10,15,0.32);
    --shadow-sm:0 1px 4px rgba(0,0,0,0.06);
    --shadow-md:0 4px 16px rgba(0,0,0,0.08);
    --shadow-lg:0 16px 48px rgba(0,0,0,0.1);
    --shadow-xl:0 32px 80px rgba(0,0,0,0.14);
  }
  [data-theme="dark"]{
    --color-bg-primary:#0A0A0F;
    --color-bg-secondary:#0F0F18;
    --color-surface:rgba(255,255,255,0.04);
    --color-surface-raised:#111118;
    --color-border:rgba(255,255,255,0.08);
    --color-border-subtle:rgba(255,255,255,0.04);
    --color-border-strong:rgba(255,255,255,0.14);
    --color-text-primary:#F0EDE8;
    --color-text-secondary:rgba(240,237,232,0.52);
    --color-text-tertiary:rgba(240,237,232,0.28);
    --shadow-sm:0 1px 4px rgba(0,0,0,0.4);
    --shadow-md:0 4px 16px rgba(0,0,0,0.5);
    --shadow-lg:0 16px 48px rgba(0,0,0,0.55);
    --shadow-xl:0 32px 80px rgba(0,0,0,0.7);
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{
    font-family:var(--font-body);
    background:var(--color-bg-primary);
    color:var(--color-text-primary);
    overflow-x:hidden;
    -webkit-font-smoothing:antialiased;
    transition:background 0.4s,color 0.4s;
  }
  h1,h2,h3,h4,h5,h6{font-family:var(--font-display);font-weight:400}
  ::selection{background:rgba(239, 105, 5,0.18);color:var(--color-text-primary)}
  ::-webkit-scrollbar{width:4px}
  ::-webkit-scrollbar-track{background:var(--color-bg-secondary)}
  ::-webkit-scrollbar-thumb{background:var(--orange);border-radius:2px}

  .container-site{
    max-width:1220px;
    margin:0 auto;
    padding:0 clamp(1.25rem,5vw,4rem);
  }

  .btn{
    display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;
    font-family:var(--font-body);font-weight:600;font-size:0.9rem;
    border:none;cursor:pointer;border-radius:999px;text-decoration:none;
    transition:transform 0.2s var(--ease-spring),box-shadow 0.2s,opacity 0.15s;
  }
  .btn:active{transform:scale(0.97) !important}
  .btn-lg{padding:0.875rem 2rem}
  .btn-md{padding:0.7rem 1.6rem}
  .btn-ghost{
    background:rgba(255,255,255,0.1);
    backdrop-filter:blur(12px);
    -webkit-backdrop-filter:blur(12px);
    border:1.5px solid rgba(255,255,255,0.25);
    color:#f5f5f5;
  }
  .btn-ghost:hover{background:rgba(255,255,255,0.18);border-color:rgba(255,255,255,0.45)}

  .input{
    width:100%;padding:0.875rem 1.25rem;
    font-family:var(--font-body);font-size:0.9rem;font-weight:400;
    background:var(--color-bg-primary);border:1.5px solid var(--color-border);
    border-radius:10px;color:var(--color-text-primary);outline:none;
    transition:border-color 0.2s,box-shadow 0.2s;
  }
  .input::placeholder{color:var(--color-text-tertiary)}
  .input:focus{border-color:var(--orange);box-shadow:0 0 0 3px rgba(239, 105, 5,0.1)}

  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
  @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  @keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}}
  @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes badgePulse{0%,100%{box-shadow:0 0 0 0 rgba(239, 105, 5,0.5)}50%{box-shadow:0 0 0 6px rgba(239, 105, 5,0)}}
  @keyframes scaleIn{from{opacity:0;transform:scale(0.94)}to{opacity:1;transform:scale(1)}}
  @keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}
  @keyframes bgPan{from{transform:scale(1.08) translateY(0)}to{transform:scale(1.08) translateY(-3%)}}
`;

// ─────────────────────────────────────────────────────────────
// HERO SLIDES — leaner copy
// ─────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    id: "school-system",
    eyebrow: "Complete School Platform",
    headline: "Run Your School\nSmarter.",
    sub: "One dashboard. Every admission, exam, fee, and learner — managed.",
    cta: "Explore Platform",
    ctaLink: "#system",
    secondaryCta: "Book a Demo",
    secondaryLink: "#contact",
    accent: "#ef6905",
    img: IMG.hero_system,
  },
  {
    id: "school-website",
    eyebrow: "Digital Presence",
    headline: "Built to\nEnroll.",
    sub: "A school website that ranks on Google and converts curious parents.",
    cta: "Website Solutions",
    ctaLink: "#website",
    secondaryCta: "Request Audit",
    secondaryLink: "#contact",
    accent: "#0055da",
    img: IMG.hero_website,
  },
  {
    id: "school-branding",
    eyebrow: "Institutional Identity",
    headline: "A Brand\nParents Remember.",
    sub: "Logo. Uniforms. Voice. The full identity that sets you apart.",
    cta: "View Portfolio",
    ctaLink: "#branding",
    secondaryCta: "Start Project",
    secondaryLink: "#contact",
    accent: "#ef6905",
    img: IMG.hero_branding,
  },
  {
    id: "school-ads",
    eyebrow: "Enrollment Marketing",
    headline: "Fill Every\nAvailable Seat.",
    sub: "Targeted campaigns that reach parents searching for schools right now.",
    cta: "Campaign Results",
    ctaLink: "#ads",
    secondaryCta: "Launch Campaign",
    secondaryLink: "#contact",
    accent: "#0055da",
    img: IMG.hero_ads,
  },
];

const AUTOPLAY = 7000;

// ─────────────────────────────────────────────────────────────
// HERO — cinematic full-bleed
// ─────────────────────────────────────────────────────────────
function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [phase, setPhase] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const currentRef = useRef(0);
  const isTransitioning = useRef(false);
  const startTimeRef = useRef(Date.now());

  const slide = HERO_SLIDES[current];

  const goTo = useCallback((idx) => {
    if (isTransitioning.current || idx === currentRef.current) return;
    isTransitioning.current = true;
    setPrev(currentRef.current);
    setPhase("out");
    setTimeout(() => {
      currentRef.current = idx;
      setCurrent(idx);
      setPhase("in");
      setTimeout(() => {
        setPhase("idle");
        setPrev(null);
        isTransitioning.current = false;
        startTimeRef.current = Date.now();
        setProgress(0);
      }, 600);
    }, 400);
  }, []);

  const goNext = useCallback(
    () => goTo((currentRef.current + 1) % HERO_SLIDES.length),
    [goTo],
  );
  const goPrev = useCallback(
    () =>
      goTo((currentRef.current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length),
    [goTo],
  );

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      if (!isTransitioning.current) goNext();
    }, AUTOPLAY);
    return () => clearInterval(interval);
  }, [paused, goNext]);

  useEffect(() => {
    if (paused) return;
    startTimeRef.current = Date.now();
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(Math.min((Date.now() - startTimeRef.current) / AUTOPLAY, 1));
    }, 30);
    return () => clearInterval(interval);
  }, [current, paused]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [goNext, goPrev]);

  const headlineLines = slide.headline.split("\n");

  return (
    <section
      id="home"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        height: "calc(100vh - 72px)",
        minHeight: 560,
        overflow: "hidden",
      }}
    >
      {/* ── Background images — cross-fade ── */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.9s ease",
            zIndex: 0,
          }}
        >
          <img
            src={s.img}
            alt=""
            style={{
              width: "100%",
              height: "115%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              transform: "translateY(0)",
              animation:
                i === current
                  ? "bgPan 12s ease-in-out alternate infinite"
                  : "none",
            }}
          />
          {/* Deep gradient overlay — bottom-heavy for text legibility */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.92) 100%)",
            }}
          />
          {/* Left vignette for text contrast */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
            }}
          />
        </div>
      ))}

      {/* ── Content ── */}
      <div
        className="container-site"
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: "clamp(2.5rem,6vh,5rem)",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.1rem",
            opacity: phase === "out" ? 0 : 1,
            transform:
              phase === "out"
                ? "translateY(12px)"
                : phase === "in"
                  ? "translateY(8px)"
                  : "none",
            transition:
              phase === "idle"
                ? "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s"
                : "opacity 0.3s, transform 0.3s",
          }}
        >
          <span
            style={{
              width: 24,
              height: 1.5,
              background: slide.accent,
              display: "block",
              borderRadius: 1,
              transition: "background 0.5s",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: slide.accent,
              transition: "color 0.5s",
            }}
          >
            {slide.eyebrow}
          </span>
        </div>

        {/* Headline — large, dramatic */}
        <div
          style={{
            overflow: "hidden",
            marginBottom: "1.25rem",
            opacity: phase === "out" ? 0 : 1,
            transform:
              phase === "out"
                ? "translateY(20px)"
                : phase === "in"
                  ? "translateY(10px)"
                  : "none",
            transition:
              phase === "idle"
                ? "opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s"
                : "opacity 0.3s, transform 0.3s",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem,7vw,6.5rem)",
              lineHeight: 1.0,
              color: "#f5f5f5",
              fontWeight: 400,
              textShadow: "0 2px 40px rgba(0,0,0,0.4)",
            }}
          >
            {headlineLines[0]}
            <br />
            <em
              style={{
                color: slide.accent,
                fontStyle: "italic",
                transition: "color 0.5s",
              }}
            >
              {headlineLines[1]}
            </em>
          </h1>
        </div>

        {/* Sub — short, max 1 line */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem,1.8vw,1.15rem)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.75)",
            maxWidth: 480,
            marginBottom: "2rem",
            opacity: phase === "out" ? 0 : 1,
            transform:
              phase === "out"
                ? "translateY(14px)"
                : phase === "in"
                  ? "translateY(8px)"
                  : "none",
            transition:
              phase === "idle"
                ? "opacity 0.7s ease 0.26s, transform 0.7s ease 0.26s"
                : "opacity 0.3s, transform 0.3s",
          }}
        >
          {slide.sub}
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "3rem",
            opacity: phase === "out" ? 0 : 1,
            transform:
              phase === "out"
                ? "translateY(14px)"
                : phase === "in"
                  ? "translateY(8px)"
                  : "none",
            transition:
              phase === "idle"
                ? "opacity 0.7s ease 0.34s, transform 0.7s ease 0.34s"
                : "opacity 0.3s, transform 0.3s",
          }}
        >
          <a
            href={slide.ctaLink}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.9rem 2rem",
              borderRadius: 999,
              background: slide.accent,
              color: "#f5f5f5",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
              boxShadow: `0 8px 32px ${slide.accent}55`,
              transition: "transform 0.2s var(--ease-spring), box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = `0 14px 48px ${slide.accent}77`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = `0 8px 32px ${slide.accent}55`;
            }}
          >
            {slide.cta} <ArrowUpRight size={15} strokeWidth={2.5} />
          </a>
          <a href={slide.secondaryLink} className="btn btn-ghost btn-lg">
            {slide.secondaryCta} <ArrowRight size={14} strokeWidth={2} />
          </a>
        </div>

        {/* ── Slide nav — thin progress bars ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <NavArrowBtn onClick={goPrev} dir="left" accent={slide.accent} />
          <div
            style={{ display: "flex", gap: 6, flex: 1, alignItems: "center" }}
          >
            {HERO_SLIDES.map((s, i) => {
              const active = i === current;
              return (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  style={{
                    position: "relative",
                    height: active ? 3 : 2,
                    flex: active ? 3 : 1,
                    borderRadius: 999,
                    background: active
                      ? "rgba(255,255,255,0.25)"
                      : "rgba(255,255,255,0.15)",
                    border: "none",
                    cursor: "pointer",
                    overflow: "hidden",
                    transition:
                      "flex 0.5s var(--ease-spring), height 0.3s ease",
                    padding: 0,
                  }}
                >
                  {active && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: `${progress * 100}%`,
                        background: slide.accent,
                        borderRadius: 999,
                        transition: "width 0.03s linear",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <NavArrowBtn onClick={goNext} dir="right" accent={slide.accent} />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.45)",
              flexShrink: 0,
            }}
          >
            <span style={{ color: slide.accent }}>0{current + 1}</span> / 0
            {HERO_SLIDES.length}
          </span>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "clamp(1.25rem,5vw,4rem)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          opacity: 0.5,
          animation: "floatY 2.5s ease-in-out infinite",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.62rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#f5f5f5",
            writingMode: "vertical-rl",
            marginBottom: 4,
          }}
        >
          Scroll
        </span>
        <ChevronDown size={14} color="#f5f5f5" />
      </div>

      <style>{`
        @media(max-width:600px){
          .hero-grid{grid-template-columns:1fr !important}
        }
      `}</style>
    </section>
  );
}

function NavArrowBtn({ onClick, dir, accent }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={dir === "left" ? "Previous" : "Next"}
      style={{
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(8px)",
        border: `1.5px solid ${hovered ? accent : "rgba(255,255,255,0.25)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: hovered ? accent : "rgba(255,255,255,0.7)",
        transition: "all 0.2s ease",
        transform: hovered ? "scale(1.1)" : "scale(1)",
        flexShrink: 0,
      }}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
      </svg>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// TRUST BAR
// ─────────────────────────────────────────────────────────────
function TrustBar() {
  const items = [
    "Multi-Tenant School Platform",
    "AI Examination Builder",
    "Online Admissions Pipeline",
    "Local SEO for Kenyan Schools",
    "Automated Fee Management",
    "Custom School Branding",
    "Digital Enrollment Campaigns",
    "Student Performance Analytics",
  ];
  return (
    <div
      style={{
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-bg-secondary)",
        overflow: "hidden",
        padding: "0.65rem 0",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "3rem",
          animation: "marquee 28s linear infinite",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              fontWeight: 500,
              color: "var(--color-text-tertiary)",
              letterSpacing: "0.04em",
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#ef6905",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PROBLEM SECTION — visual-first, minimal copy
// ─────────────────────────────────────────────────────────────
function ProblemSection() {
  const [headerRef, headerVisible] = useInView();
  const [bgRef, bgOffset] = useParallax(0.12);

  const challenges = [
    {
      icon: "📋",
      before: "Manual exam papers, prone to errors",
      after: "AI generates assessments from your curriculum",
    },
    {
      icon: "💳",
      before: "Fee collection via calls & WhatsApp",
      after: "Real-time dashboard with automated reminders",
    },
    {
      icon: "📁",
      before: "Admissions tracked in spreadsheets",
      after: "Streamlined online pipeline, full visibility",
    },
    {
      icon: "📉",
      before: "Struggling learners identified too late",
      after: "AI flags at-risk students before gaps widen",
    },
    {
      icon: "🌐",
      before: "Website parents can't find",
      after: "SEO-optimized site that ranks & converts",
    },
    {
      icon: "🎨",
      before: "No cohesive brand identity",
      after: "Complete identity: logo, uniforms, voice",
    },
  ];

  return (
    <section
      style={{
        padding: "7rem 0",
        background: "var(--color-bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Parallax atmospheric image */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: "-15%",
          backgroundImage: `url(${IMG.atmos_students})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${bgOffset}px)`,
          opacity: 0.035,
          pointerEvents: "none",
        }}
      />

      <div
        className="container-site"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 1rem",
              borderRadius: 999,
              background: "rgba(239, 105, 5,0.08)",
              border: "1px solid rgba(239, 105, 5,0.22)",
              color: "#ef6905",
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            <Sparkles size={11} /> Before & After
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem,4vw,3rem)",
              lineHeight: 1.08,
              marginBottom: "0.75rem",
            }}
          >
            Most schools operate on{" "}
            <em style={{ color: "#ef6905", fontStyle: "italic" }}>
              fragmented systems.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-secondary)",
              fontSize: "1rem",
              maxWidth: 440,
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            Here's what changes when you partner with us.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1px",
            background: "var(--color-border)",
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid var(--color-border)",
          }}
        >
          {challenges.map((c, i) => (
            <ProblemCard key={i} {...c} delay={i * 55} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemCard({ icon, before, after, delay }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "rgba(239, 105, 5,0.03)"
          : "var(--color-surface-raised)",
        padding: "2rem 1.75rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, background 0.25s ease`,
        cursor: "default",
      }}
    >
      {/* Icon */}
      <div
        style={{ fontSize: "1.5rem", marginBottom: "1.25rem", lineHeight: 1 }}
      >
        {icon}
      </div>

      {/* Before */}
      <div style={{ marginBottom: "1rem" }}>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#ef4444",
            display: "block",
            marginBottom: "0.35rem",
          }}
        >
          Before
        </span>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            color: "var(--color-text-tertiary)",
            lineHeight: 1.6,
            textDecoration: "line-through",
            textDecorationColor: "rgba(239,68,68,0.35)",
          }}
        >
          {before}
        </p>
      </div>

      {/* Divider with arrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: "1rem",
        }}
      >
        <div
          style={{ flex: 1, height: 1, background: "var(--color-border)" }}
        />
        <span style={{ color: "#10b981", fontSize: "0.8rem" }}>↓</span>
        <div
          style={{ flex: 1, height: 1, background: "var(--color-border)" }}
        />
      </div>

      {/* After */}
      <div>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#10b981",
            display: "block",
            marginBottom: "0.35rem",
          }}
        >
          After
        </span>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            color: "var(--color-text-primary)",
            lineHeight: 1.6,
            fontWeight: 500,
          }}
        >
          {after}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SERVICE DATA — reduced bullet copy
// ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "system",
    num: "01",
    tag: "School Management Platform",
    accent: "#ef6905",
    headline: "One Login.",
    headlineItalic: "Every aspect of your school.",
    body: "Built for Kenyan institutions — a secure, private dashboard for each school. Faculty, learners, fees, exams, and welfare in one place.",
    stats: [
      { val: "AI", label: "Exam Builder" },
      { val: "100%", label: "Online Admissions" },
      { val: "Real-time", label: "Fee Tracking" },
    ],
    img: IMG.service_system,
    floatImg: IMG.card_exam,
    bgAtmos: IMG.atmos_tech,
  },
  {
    id: "website",
    num: "02",
    tag: "School Websites",
    accent: "#0055da",
    headline: "A Website That",
    headlineItalic: "Drives Enrollment.",
    body: "Fast, mobile-first school websites that rank locally on Google — with your management dashboard seamlessly integrated.",
    stats: [
      { val: "Page 1", label: "SEO Target" },
      { val: "Mobile", label: "First Design" },
      { val: "Integrated", label: "Dashboard" },
    ],
    img: IMG.service_web,
    floatImg: IMG.card_web,
    bgAtmos: IMG.atmos_class,
  },
  {
    id: "branding",
    num: "03",
    tag: "Institutional Branding",
    accent: "#ef6905",
    headline: "Make Parents",
    headlineItalic: "Choose You.",
    body: "From logo to custom uniforms produced via sublimation printing — the complete identity that positions your school as the premier choice.",
    stats: [
      { val: "Full", label: "Brand Identity" },
      { val: "Custom", label: "Uniforms & Kits" },
      { val: "Print", label: "Prospectus & Signage" },
    ],
    img: IMG.service_brand,
    floatImg: IMG.card_brand,
    bgAtmos: IMG.atmos_campus,
  },
  {
    id: "ads",
    num: "04",
    tag: "Enrollment Marketing",
    accent: "#0055da",
    headline: "Fill Every",
    headlineItalic: "Available Seat.",
    body: "Targeted Meta campaigns that reach parents actively searching for quality schools — during open houses, new terms, and year-round.",
    stats: [
      { val: "3×", label: "Lead Generation" },
      { val: "Meta", label: "Ads Platform" },
      { val: "Monthly", label: "ROI Reports" },
    ],
    img: IMG.service_ads,
    floatImg: IMG.card_fee,
    bgAtmos: IMG.atmos_students,
  },
];

// ─────────────────────────────────────────────────────────────
// SERVICE SECTION — full-bleed cinematic with overlay text
// ─────────────────────────────────────────────────────────────
function ServiceSection({
  id,
  num,
  tag,
  accent,
  headline,
  headlineItalic,
  body,
  stats,
  img,
  floatImg,
  bgAtmos,
}) {
  const [ref, inView] = useInView(0.08);
  const [bgParRef, bgOffset] = useParallax(0.12);
  const isBlue = accent === "#0055da";
  const glowRgb = isBlue ? "0, 85, 218" : "239, 105, 5";

  return (
    <section
      id={id}
      ref={ref}
      style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Full-bleed parallax background image */}
      <div
        ref={bgParRef}
        style={{
          position: "absolute",
          inset: "-15%",
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${bgOffset}px)`,
          zIndex: 0,
        }}
      />

      {/* Overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isBlue
            ? "linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,20,80,0.75) 50%, rgba(0,0,0,0.7) 100%)"
            : "linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(40,10,0,0.78) 50%, rgba(0,0,0,0.7) 100%)",
          zIndex: 1,
        }}
      />
      {/* Accent color wash bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${glowRgb},0.18) 0%, transparent 65%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Section number watermark */}
      <span
        style={{
          position: "absolute",
          bottom: "3rem",
          right: "clamp(1.25rem,5vw,4rem)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(6rem,12vw,14rem)",
          fontWeight: 400,
          fontStyle: "italic",
          color: "#f5f5f5",
          opacity: 0.05,
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 2,
          lineHeight: 1,
        }}
      >
        {num}
      </span>

      <div
        className="container-site"
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          padding: "6rem clamp(1.25rem,5vw,4rem)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(3rem,6vw,7rem)",
            alignItems: "center",
          }}
          className="srv-grid"
        >
          {/* LEFT — Text */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(16px)",
                transition:
                  "opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s",
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 1.5,
                  background: accent,
                  display: "block",
                  borderRadius: 1,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: accent,
                }}
              >
                {tag}
              </span>
            </div>

            {/* Headline */}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem,4.5vw,4rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                color: "#f5f5f5",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(24px)",
                transition:
                  "opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s",
              }}
            >
              {headline}
              <br />
              <em style={{ color: accent, fontStyle: "italic" }}>
                {headlineItalic}
              </em>
            </h2>

            {/* Body — shorter */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.65)",
                maxWidth: 400,
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(18px)",
                transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
              }}
            >
              {body}
            </p>

            {/* Stat chips */}
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(14px)",
                transition:
                  "opacity 0.7s ease 0.28s, transform 0.7s ease 0.28s",
              }}
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: "0.7rem 1.1rem",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.2rem",
                      color: accent,
                      lineHeight: 1.1,
                      marginBottom: 3,
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.68rem",
                      color: "rgba(255,255,255,0.5)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(12px)",
                transition:
                  "opacity 0.6s ease 0.36s, transform 0.6s ease 0.36s",
              }}
            >
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.875rem 2rem",
                  borderRadius: 999,
                  background: accent,
                  color: "#f5f5f5",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  boxShadow: `0 6px 28px rgba(${glowRgb},0.42)`,
                  transition:
                    "transform 0.2s var(--ease-spring), box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = `0 12px 48px rgba(${glowRgb},0.6)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = `0 6px 28px rgba(${glowRgb},0.42)`;
                }}
              >
                Get Started <ArrowRight size={15} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* RIGHT — Floating image card */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateX(30px) scale(0.96)",
              transition:
                "opacity 0.9s ease 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
              position: "relative",
            }}
            className="srv-vis"
          >
            <ServiceImageCard
              floatImg={floatImg}
              accent={accent}
              glowRgb={glowRgb}
              id={id}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .srv-grid{grid-template-columns:1fr !important;gap:2.5rem !important}
          .srv-vis{display:none}
        }
      `}</style>
    </section>
  );
}

// Floating image card shown in right column
function ServiceImageCard({ floatImg, accent, glowRgb, id }) {
  const features = {
    system: [
      "AI Exam Builder",
      "Online Admissions",
      "Fee Dashboard",
      "Analytics",
    ],
    website: [
      "Local SEO",
      "Online Enrollment",
      "Mobile-First",
      "Integrated Portal",
    ],
    branding: [
      "Logo & Identity",
      "Custom Uniforms",
      "Print Materials",
      "Brand Guidelines",
    ],
    ads: ["Meta Campaigns", "Retargeting", "Open House Ads", "Monthly Reports"],
  };
  const items = features[id] || features.system;

  return (
    <div
      style={{
        position: "relative",
        animation: "floatY 7s ease-in-out infinite",
      }}
    >
      {/* Glow halo */}
      <div
        style={{
          position: "absolute",
          inset: -8,
          borderRadius: 26,
          background: `linear-gradient(135deg, rgba(${glowRgb},0.35) 0%, transparent 60%)`,
          filter: "blur(16px)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(${glowRgb},0.15)`,
        }}
      >
        {/* Image */}
        <div style={{ height: 220, overflow: "hidden" }}>
          <img
            src={floatImg}
            alt=""
            style={{
              width: "100%",
              height: "130%",
              objectFit: "cover",
              marginTop: "-15%",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 220,
              background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.6) 100%)`,
            }}
          />
        </div>

        {/* Feature pills */}
        <div
          style={{
            padding: "1.25rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "0.7rem 0.875rem",
                borderRadius: 10,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.8)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: accent,
                  flexShrink: 0,
                  display: "block",
                }}
              />
              {item}
            </div>
          ))}
        </div>

        {/* Live pulse badge */}
        <div style={{ padding: "0 1.25rem 1.25rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.55rem 0.875rem",
              borderRadius: 8,
              background: `rgba(${glowRgb},0.15)`,
              border: `1px solid rgba(${glowRgb},0.3)`,
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: accent,
              letterSpacing: "0.05em",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: accent,
                display: "block",
                animation: "pulse 2s infinite",
              }}
            />
            Live on{" "}
            {id === "system"
              ? "50+"
              : id === "website"
                ? "30+"
                : id === "branding"
                  ? "40+"
                  : "20+"}{" "}
            Kenyan Schools
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HOW IT WORKS — compact, visual
// ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const [ref, visible] = useInView();
  const [bgRef, bgOffset] = useParallax(0.1);

  const pathNew = [
    {
      step: "01",
      title: "We build your website",
      desc: "Design, content, mobile-optimized — with your dashboard integrated from day one.",
    },
    {
      step: "02",
      title: "We onboard your school",
      desc: "Secure multi-tenant setup. Your data stays isolated and private.",
    },
    {
      step: "03",
      title: "You go live",
      desc: "Staff log in, parents apply online, you manage everything from one place.",
    },
  ];
  const pathExisting = [
    {
      step: "01",
      title: "We add a portal to your site",
      desc: "One button. No website rebuild needed.",
    },
    {
      step: "02",
      title: "We onboard your school",
      desc: "Registered in our platform within 48 hours.",
    },
    {
      step: "03",
      title: "Full system access",
      desc: "Every feature — assessments, fees, admissions, analytics — ready immediately.",
    },
  ];

  return (
    <section
      style={{
        padding: "7rem 0",
        background: "var(--color-bg-secondary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: "-15%",
          backgroundImage: `url(${IMG.atmos_class})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${bgOffset}px)`,
          opacity: 0.03,
          pointerEvents: "none",
        }}
      />
      <div
        className="container-site"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          ref={ref}
          style={{
            textAlign: "center",
            marginBottom: "3.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity 0.65s, transform 0.65s",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 1rem",
              borderRadius: 999,
              background: "rgba(239, 105, 5,0.08)",
              border: "1px solid rgba(239, 105, 5,0.22)",
              color: "#ef6905",
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "1.1rem",
            }}
          >
            <Sparkles size={11} /> How It Works
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem,3.5vw,2.7rem)",
              lineHeight: 1.08,
              marginBottom: "0.75rem",
            }}
          >
            Operational in{" "}
            <em style={{ color: "#ef6905", fontStyle: "italic" }}>
              days, not months.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-secondary)",
              maxWidth: 400,
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            Two paths, one destination — your school running smarter.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
          className="hiw-grid"
        >
          <PathCard
            title="No website yet?"
            subtitle="We build everything."
            steps={pathNew}
            accent="#ef6905"
          />
          <PathCard
            title="Have a website?"
            subtitle="We plug right in."
            steps={pathExisting}
            accent="#0055da"
          />
        </div>
      </div>
      <style>{`@media(max-width:768px){.hiw-grid{grid-template-columns:1fr !important}}`}</style>
    </section>
  );
}

function PathCard({ title, subtitle, steps, accent }) {
  const [ref, visible] = useInView();
  const isBlue = accent === "#0055da";
  const glowRgb = isBlue ? "0, 85, 218" : "239, 105, 5";
  return (
    <div
      ref={ref}
      style={{
        background: "var(--color-surface-raised)",
        border: "1px solid var(--color-border)",
        borderRadius: 20,
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: "opacity 0.65s, transform 0.65s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${glowRgb},0.1) 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: accent,
          marginBottom: "0.3rem",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.2rem",
          color: "var(--color-text-primary)",
          marginBottom: "1.75rem",
        }}
      >
        {subtitle}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {steps.map((step, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                flexShrink: 0,
                background: `${accent}18`,
                border: `1px solid ${accent}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-body)",
                fontSize: "0.68rem",
                fontWeight: 700,
                color: accent,
              }}
            >
              {step.step}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  marginBottom: "0.2rem",
                }}
              >
                {step.title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                {step.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NEWSLETTER
// ─────────────────────────────────────────────────────────────
const BENEFITS = [
  "Weekly school marketing strategies and enrollment best practices",
  "Exclusive guides on platform optimization",
  "Early access to new features",
  "No spam — unsubscribe any time",
];

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ref, visible] = useInView();
  const [bgRef, bgOffset] = useParallax(0.1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <section
      id="newsletter"
      style={{
        padding: "6rem 0",
        background: "var(--color-bg-secondary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: "-15%",
          backgroundImage: `url(${IMG.atmos_campus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${bgOffset}px)`,
          opacity: 0.04,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "50vw",
          height: "50vw",
          top: "-30%",
          right: "-15%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(239, 105, 5,0.08) 0%, transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container-site"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          ref={ref}
          style={{
            borderRadius: 24,
            padding: "clamp(2.5rem,6vw,5rem) clamp(2rem,6vw,5rem)",
            background:
              "linear-gradient(135deg, rgba(239, 105, 5,0.07) 0%, rgba(0, 85, 218,0.04) 50%, rgba(239, 105, 5,0.03) 100%)",
            border: "1px solid rgba(239, 105, 5,0.18)",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
            className="nl-grid"
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.35rem 1rem",
                  borderRadius: 999,
                  background: "rgba(239, 105, 5,0.08)",
                  border: "1px solid rgba(239, 105, 5,0.22)",
                  color: "#ef6905",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "1.25rem",
                }}
              >
                <Sparkles size={11} /> Free Professional Development
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem,3vw,2.6rem)",
                  marginBottom: "1rem",
                  lineHeight: 1.08,
                }}
              >
                Grow your school's{" "}
                <em style={{ color: "#ef6905", fontStyle: "italic" }}>
                  enrollment every term.
                </em>
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  maxWidth: 380,
                  marginBottom: "1.5rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                Join school leaders receiving our weekly newsletter — practical
                strategies, no fluff.
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {BENEFITS.map((b) => (
                  <li
                    key={b}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.625rem",
                      marginBottom: "0.6rem",
                    }}
                  >
                    <CheckCircle2
                      size={15}
                      style={{ color: "#ef6905", flexShrink: 0, marginTop: 2 }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {submitted ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "3rem 2rem",
                    borderRadius: 20,
                    background: "var(--color-surface-raised)",
                    border: "1px solid rgba(16,185,129,0.25)",
                  }}
                >
                  <CheckCircle2
                    size={52}
                    style={{
                      color: "#10B981",
                      margin: "0 auto 1rem",
                      display: "block",
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.375rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Welcome aboard!
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-secondary)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.7,
                    }}
                  >
                    Check your inbox for your first school leadership guide.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    padding: "2.5rem",
                    borderRadius: 20,
                    background: "var(--color-surface-raised)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "var(--shadow-lg)",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.25rem",
                      marginBottom: "0.4rem",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    School Leadership Briefing
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--color-text-tertiary)",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Weekly. Practical. Free.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "0.875rem" }}>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          color: "var(--color-text-secondary)",
                          marginBottom: "0.375rem",
                        }}
                      >
                        School Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your school's official name"
                        className="input"
                      />
                    </div>
                    <div style={{ marginBottom: "1.25rem" }}>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          color: "var(--color-text-secondary)",
                          marginBottom: "0.375rem",
                        }}
                      >
                        Professional Email
                      </label>
                      <input
                        type="email"
                        placeholder="headteacher@yourschool.ac.ke"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-lg"
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        borderRadius: 10,
                        background: "linear-gradient(135deg, #ef6905, #ff8a2e)",
                        color: "#f5f5f5",
                        boxShadow: "0 6px 24px rgba(239, 105, 5,0.35)",
                        opacity: loading ? 0.75 : 1,
                        border: "none",
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        "Subscribing…"
                      ) : (
                        <>
                          <span>Subscribe — Free Access</span>
                          <ArrowRight size={16} strokeWidth={2.5} />
                        </>
                      )}
                    </button>
                    <p
                      style={{
                        textAlign: "center",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.72rem",
                        color: "var(--color-text-tertiary)",
                        marginTop: "0.75rem",
                        lineHeight: 1.6,
                      }}
                    >
                      We respect your inbox. Unsubscribe any time.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.nl-grid{grid-template-columns:1fr !important;gap:2.5rem !important}}`}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FINAL CTA — cinematic full-bleed
// ─────────────────────────────────────────────────────────────
function FinalCTA() {
  const [bgRef, bgOffset] = useParallax(0.12);
  const [ref, visible] = useInView();

  return (
    <section
      style={{
        position: "relative",
        minHeight: "65vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Full-bleed bg */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: "-15%",
          backgroundImage: `url(${IMG.atmos_class})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${bgOffset}px)`,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.82) 100%)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "55vw",
          height: "55vw",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(239, 105, 5,0.18) 0%,transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <div
        className="container-site"
        style={{
          position: "relative",
          zIndex: 3,
          padding: "6rem clamp(1.25rem,5vw,4rem)",
        }}
      >
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(28px)",
            transition: "opacity 0.75s, transform 0.75s",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#ef6905",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: 20,
                height: 1.5,
                background: "#ef6905",
                display: "block",
              }}
            />
            Ready to transform your school?
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem,5vw,4rem)",
              lineHeight: 1.05,
              marginBottom: "1.25rem",
              color: "#f5f5f5",
            }}
          >
            Your institution deserves to operate{" "}
            <em style={{ color: "#ef6905", fontStyle: "italic" }}>
              at its full potential.
            </em>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.6)",
              maxWidth: 420,
              margin: "0 auto 2.5rem",
              lineHeight: 1.8,
              fontSize: "1rem",
            }}
          >
            30-minute demo. No obligation. We'll show you the platform and build
            a plan for your school.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.7rem",
                padding: "1rem 2.25rem",
                borderRadius: 999,
                background: "#ef6905",
                color: "#f5f5f5",
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 8px 36px rgba(239, 105, 5,0.48)",
                transition:
                  "transform 0.2s var(--ease-spring), box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 16px 60px rgba(239, 105, 5,0.65)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow =
                  "0 8px 36px rgba(239, 105, 5,0.48)";
              }}
            >
              Request a Demo <ArrowUpRight size={16} strokeWidth={2.5} />
            </a>
            <a
              href="#system"
              className="btn btn-ghost btn-lg"
              style={{ borderRadius: 999 }}
            >
              Explore Platform <ArrowRight size={15} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// DIVIDER
// ─────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div
      style={{
        height: 1,
        background:
          "linear-gradient(90deg,transparent 0%,rgba(128,128,128,0.1) 30%,rgba(128,128,128,0.1) 70%,transparent 100%)",
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────
export default function SchoolHomePage() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Hero />
      <TrustBar />
      <ProblemSection />
      {SERVICES.map((service, index) => (
        <React.Fragment key={service.id}>
          <ServiceSection {...service} />
        </React.Fragment>
      ))}
      <HowItWorks />
      <Newsletter />
      <FinalCTA />
    </>
  );
}
