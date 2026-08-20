import React, { useState, useEffect, useRef } from "react";

// ── Google Fonts injection ───────────────────────────────────────────
const FONTS_CSS = `@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&family=Marcellus&display=swap');`;

// ── Theme Hook ───────────────────────────────────────────────────────
function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("educore-theme") || "light";
    }
    return "light";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("educore-theme", theme);
  }, [theme]);
  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return [theme, toggle];
}

// ── Scroll reveal hook ───────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, isVisible];
}

// ── Parallax hook ────────────────────────────────────────────────────
function useParallax(speed = 0.08) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(center * speed);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);
  return [ref, offset];
}

// ── SVG Icons ────────────────────────────────────────────────────────
const Icons = {
  Arrow: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Check: () => (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Sun: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Moon: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Shield: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Lock: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Server: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  Globe: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Zap: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Users: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  BookOpen: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Brain: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.16Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.16Z" />
    </svg>
  ),
  CreditCard: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  BarChart: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  Clock: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Library: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      <line x1="12" y1="3" x2="12" y2="21" />
    </svg>
  ),
  Heart: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Star: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  GraduationCap: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
};

// ── Global CSS ───────────────────────────────────────────────────────
const GLOBAL_CSS = `
  ${FONTS_CSS}

  @layer base {

  :root {
    --orange: #ef6905;
    --blue: #0055da;
    --font-display: 'Marcellus', Georgia, serif;
    --font-body: 'Dosis', system-ui, sans-serif;
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  }

  [data-theme="light"] {
    --bg: #FAFAFA;
    --bg2: #F3F3F6;
    --surface: rgba(255,255,255,0.92);
    --surface2: #f5f5f5;
    --border: rgba(0,0,0,0.07);
    --border2: rgba(0,0,0,0.13);
    --text: #0A0A0F;
    --text2: rgba(10,10,15,0.54);
    --text3: rgba(10,10,15,0.3);
    --chip-bg: rgba(0,0,0,0.04);
    --chip-border: rgba(0,0,0,0.09);
    --shadow-card: 0 2px 20px rgba(0,0,0,0.06);
    --shadow-lg: 0 24px 64px rgba(0,0,0,0.12);
    --shadow-xl: 0 40px 100px rgba(0,0,0,0.16);
  }
  [data-theme="dark"] {
    --bg: #0A0A0F;
    --bg2: #0F0F18;
    --surface: rgba(255,255,255,0.04);
    --surface2: #111118;
    --border: rgba(255,255,255,0.08);
    --border2: rgba(255,255,255,0.14);
    --text: #F0EDE8;
    --text2: rgba(240,237,232,0.52);
    --text3: rgba(240,237,232,0.28);
    --chip-bg: rgba(255,255,255,0.05);
    --chip-border: rgba(255,255,255,0.1);
    --shadow-card: 0 2px 20px rgba(0,0,0,0.5);
    --shadow-lg: 0 24px 64px rgba(0,0,0,0.5);
    --shadow-xl: 0 40px 100px rgba(0,0,0,0.7);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: var(--font-body);
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    transition: background 0.4s, color 0.4s;
  }
  ::selection { background: rgba(239, 105, 5,0.18); color: var(--text); }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg2); }
  ::-webkit-scrollbar-thumb { background: var(--orange); border-radius: 2px; }
  :focus-visible { outline: 2px solid var(--orange); outline-offset: 3px; border-radius: 4px; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
  @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes pulse { 0%,100%{opacity:0.55} 50%{opacity:1} }
  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes shimmer { 0%{background-position:0% center} 100%{background-position:200% center} }

  } /* end @layer base */
`;

// ── Reusable primitives ──────────────────────────────────────────────
const s = {
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 clamp(1.5rem, 5vw, 4rem)",
  },
};

function Tag({ children, color = "orange" }) {
  const styles = {
    orange: {
      bg: "rgba(239, 105, 5,0.08)",
      border: "rgba(239, 105, 5,0.22)",
      color: "#ef6905",
    },
    blue: {
      bg: "rgba(0, 85, 218,0.06)",
      border: "rgba(0, 85, 218,0.18)",
      color: "#0055da",
    },
    green: {
      bg: "rgba(91, 126, 60,0.08)",
      border: "rgba(14,115,80,0.28)",
      color: "#7a9c59",
    },
  }[color];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.36rem 1rem",
        borderRadius: 999,
        background: styles.bg,
        border: `1px solid ${styles.border}`,
        color: styles.color,
        fontFamily: "var(--font-body)",
        fontSize: "0.64rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        marginBottom: "1.25rem",
      }}
    >
      {children}
    </span>
  );
}

function Chip({ children, accent }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.3rem 0.8rem",
        borderRadius: 999,
        background: accent ? "rgba(239, 105, 5,0.1)" : "var(--chip-bg)",
        border: `1px solid ${accent ? "rgba(239, 105, 5,0.28)" : "var(--chip-border)"}`,
        fontFamily: "var(--font-body)",
        fontSize: "0.68rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: accent ? "#ef6905" : "var(--text2)",
        marginRight: "0.4rem",
        marginBottom: "1.4rem",
      }}
    >
      {children}
    </span>
  );
}

function BtnPrimary({ href, children, style: extraStyle }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55rem",
        padding: "0.9rem 2rem",
        borderRadius: 999,
        background: "#ef6905",
        color: "#f5f5f5",
        fontFamily: "var(--font-body)",
        fontSize: "0.875rem",
        fontWeight: 700,
        letterSpacing: "0.02em",
        textDecoration: "none",
        boxShadow: "0 6px 28px rgba(239, 105, 5,0.38)",
        transition: "transform 0.2s var(--ease-spring), box-shadow 0.2s",
        ...extraStyle,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.04)";
        e.currentTarget.style.boxShadow = "0 12px 44px rgba(239, 105, 5,0.55)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "0 6px 28px rgba(239, 105, 5,0.38)";
      }}
    >
      {children}
    </a>
  );
}

function BtnGhost({ href, children }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55rem",
        padding: "0.9rem 1.7rem",
        borderRadius: 999,
        background: "var(--surface2)",
        border: "1.5px solid var(--border2)",
        color: "var(--text)",
        fontFamily: "var(--font-body)",
        fontSize: "0.875rem",
        fontWeight: 500,
        textDecoration: "none",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ef6905")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--border2)")
      }
    >
      {children}
    </a>
  );
}

// ── Dashboard Mockup ─────────────────────────────────────────────────
function DashboardMockup() {
  const bars = [65, 82, 55, 90, 73, 88, 60, 95];
  const navItems = [
    "Dashboard",
    "Students",
    "Teachers",
    "Fees",
    "Exams",
    "Timetable",
    "Library",
    "Parents",
    "Activities",
  ];
  const kpis = [
    { label: "Enrolled Students", value: "842", change: "+12" },
    { label: "Fee Collection Rate", value: "94%", change: "+3%" },
    { label: "Average Grade", value: "B+", change: "↑" },
  ];

  return (
    <div style={{ position: "relative" }}>
      {/* Glow halo */}
      <div
        style={{
          position: "absolute",
          inset: -4,
          borderRadius: 24,
          background:
            "linear-gradient(135deg,rgba(239, 105, 5,0.32),rgba(0, 85, 218,0.2),transparent)",
          filter: "blur(3px)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: 20,
          background: "var(--surface2)",
          border: "1px solid var(--border)",
          overflow: "hidden",
          boxShadow: "var(--shadow-xl)",
          animation: "floatY 5s ease-in-out infinite",
        }}
      >
        {/* Chrome bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1rem",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
          }}
        >
          {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
            <div
              key={c}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
          <div
            style={{
              flex: 1,
              height: 22,
              borderRadius: 6,
              background: "var(--chip-bg)",
              border: "1px solid var(--border)",
              marginLeft: 8,
              display: "flex",
              alignItems: "center",
              paddingLeft: 8,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                color: "var(--text3)",
              }}
            >
              educore.school/dashboard
            </span>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "155px 1fr",
            minHeight: 320,
          }}
        >
          {/* Sidebar */}
          <div
            style={{
              borderRight: "1px solid var(--border)",
              padding: "1rem 0.7rem",
              background: "var(--surface)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.58rem",
                fontWeight: 800,
                color: "#ef6905",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
                paddingLeft: "0.5rem",
              }}
            >
              EduCore
            </div>
            {navItems.map((item, i) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.42rem 0.6rem",
                  borderRadius: 7,
                  marginBottom: 2,
                  background: i === 0 ? "rgba(239, 105, 5,0.11)" : "transparent",
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: i === 0 ? "#ef6905" : "var(--text3)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.7rem",
                    fontWeight: i === 0 ? 700 : 400,
                    color: i === 0 ? "#ef6905" : "var(--text2)",
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Main area */}
          <div style={{ padding: "1.1rem", overflow: "hidden" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "0.6rem",
                marginBottom: "0.9rem",
              }}
            >
              {kpis.map((k) => (
                <div
                  key={k.label}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: "0.65rem 0.75rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.58rem",
                      color: "var(--text3)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {k.label}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.35rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "1.1rem",
                        fontWeight: 800,
                        color: "var(--text)",
                      }}
                    >
                      {k.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.6rem",
                        color: "#10b981",
                        fontWeight: 700,
                      }}
                    >
                      {k.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  color: "var(--text2)",
                  marginBottom: "0.6rem",
                }}
              >
                Academic Performance — Term 2 Assessment
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  alignItems: "flex-end",
                  height: 60,
                }}
              >
                {bars.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      borderRadius: "3px 3px 0 0",
                      background:
                        i === 7
                          ? "#ef6905"
                          : i === 3
                            ? "#0055da"
                            : "var(--border2)",
                    }}
                  />
                ))}
              </div>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.48rem 0.85rem",
                background: "rgba(239, 105, 5,0.07)",
                border: "1px solid rgba(239, 105, 5,0.2)",
                borderRadius: 999,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#ef6905",
                  animation: "pulse 1.8s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  color: "#ef6905",
                }}
              >
                AI Insight: 3 students require additional support in Mathematics
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Live badge */}
      <div
        style={{
          position: "absolute",
          bottom: "-1rem",
          right: "1.5rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.6rem 1.1rem",
          borderRadius: 12,
          background: "var(--surface2)",
          border: "1px solid var(--border2)",
          boxShadow: "var(--shadow-lg)",
          fontFamily: "var(--font-body)",
          fontSize: "0.72rem",
          fontWeight: 700,
          color: "var(--text)",
          whiteSpace: "nowrap",
          zIndex: 10,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#10b981",
            display: "block",
            animation: "pulse 2s infinite",
          }}
        />
        Live Data — Real-Time Synchronization
      </div>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────
function Hero() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () =>
        setCount((c) => {
          if (c >= 4999) {
            clearInterval(t);
            return 4999;
          }
          return Math.min(c + 97, 4999);
        }),
      16,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        paddingTop: 68,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* Glows */}
      <div
        style={{
          position: "absolute",
          width: "80vw",
          height: "80vw",
          top: "-30%",
          right: "-20%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(239, 105, 5,0.1) 0%,transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "60vw",
          height: "60vw",
          bottom: "-20%",
          left: "-10%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(201,211,243,0.16) 0%,transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(128,128,128,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(128,128,128,0.035) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
          pointerEvents: "none",
        }}
      />

      {/* Main grid */}
      <div
        style={{
          ...s.container,
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          padding: "5rem clamp(1.5rem, 5vw, 4rem)",
          position: "relative",
          zIndex: 2,
          width: "100%",
        }}
      >
        {/* Left */}
        <div style={{ animation: "fadeUp 0.7s ease both" }}>
          <div>
            <Chip accent>Enterprise School Management</Chip>
            <Chip>Kenya CBC Compliant</Chip>
            <Chip>AI-Powered Platform</Chip>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.3rem, 4.5vw, 3.8rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              fontWeight: 400,
              marginBottom: "1.25rem",
            }}
          >
            <em style={{ color: "#ef6905", fontStyle: "italic" }}>EduCore</em>
            {" — "}The comprehensive school{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              management solution
              <svg
                viewBox="0 0 200 12"
                style={{
                  position: "absolute",
                  bottom: -6,
                  left: 0,
                  width: "100%",
                  height: 10,
                  overflow: "visible",
                }}
                aria-hidden
              >
                <path
                  d="M2 8 Q50 2 100 7 Q150 12 198 6"
                  stroke="#ef6905"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.65"
                />
              </svg>
            </span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              lineHeight: 1.9,
              color: "var(--text2)",
              maxWidth: 440,
              marginBottom: "2rem",
              fontWeight: 400,
            }}
          >
            A unified platform that empowers administrators, educators, and
            parents with real-time access to student data, academic performance,
            fee tracking, and administrative controls — all from a single,
            intelligent dashboard.
          </p>

          {/* Pricing bar */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1.5rem",
              background: "var(--surface2)",
              border: "1px solid var(--border2)",
              borderRadius: 18,
              padding: "1.1rem 1.6rem",
              marginBottom: "2rem",
              boxShadow: "var(--shadow-card)",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  color: "var(--text3)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.2rem",
                }}
              >
                Monthly Subscription
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "2.1rem",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "var(--text)",
                  lineHeight: 1,
                }}
              >
                KSh {count.toLocaleString()}
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 400,
                    color: "var(--text2)",
                    marginLeft: "0.2rem",
                  }}
                >
                  /month
                </span>
              </div>
            </div>
            <div
              style={{ width: 1, height: 44, background: "var(--border)" }}
            />
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                color: "var(--text2)",
                lineHeight: 1.65,
              }}
            >
              Unlimited staff and student accounts
              <br />
              All modules included
              <br />
              Cancel anytime — no long-term commitments
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
            <BtnPrimary href="/contact">
              Request a Demo <Icons.Arrow />
            </BtnPrimary>
            <BtnGhost href="#features">Explore Features</BtnGhost>
          </div>
        </div>

        {/* Right — Dashboard */}
        <div style={{ animation: "fadeUp 0.7s ease 0.15s both" }}>
          <DashboardMockup />
        </div>
      </div>

      {/* Stats strip */}
      <div
        style={{
          ...s.container,
          paddingBottom: "5rem",
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          {[
            { v: "12+", l: "Integrated Modules", c: "#ef6905" },
            { v: "AI", l: "Advanced Analytics", c: "#0055da" },
            { v: "CBC", l: "Curriculum Compliant", c: "#7a9c59" },
            { v: "99.9%", l: "Uptime Guarantee", c: "#0055da" },
          ].map((stat) => (
            <div
              key={stat.l}
              style={{
                background: "var(--surface2)",
                padding: "1.5rem 1.25rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.7rem",
                  fontWeight: 800,
                  color: stat.c,
                  marginBottom: "0.2rem",
                  letterSpacing: "-0.03em",
                }}
              >
                {stat.v}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.74rem",
                  color: "var(--text2)",
                }}
              >
                {stat.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Feature Marquee ──────────────────────────────────────────────────
function FeaturesMarquee() {
  const features = [
    "Teacher Management",
    "Student Profiles",
    "Fee Processing",
    "CBC Grading System",
    "AI Exam Builder",
    "Attendance Tracking",
    "Lesson Planning",
    "Timetable Generation",
    "Library Management",
    "Parent Portal",
    "Student Welfare Records",
    "Extra-Curricular Management",
    "Performance Analytics",
    "Exam Results Processing",
    "Online Admissions",
  ];
  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg2)",
        overflow: "hidden",
        padding: "0.7rem 0",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "2.5rem",
          animation: "marquee 30s linear infinite",
          width: "max-content",
          whiteSpace: "nowrap",
        }}
      >
        {[...features, ...features].map((f, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              fontWeight: 500,
              color: "var(--text2)",
              letterSpacing: "0.03em",
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#ef6905",
                display: "inline-block",
              }}
            />
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Module data ──────────────────────────────────────────────────────
const UNSPLASH = {
  teacher:
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80&auto=format&fit=crop",
  student:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80&auto=format&fit=crop",
  fees: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&auto=format&fit=crop",
  academics:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80&auto=format&fit=crop",
  exam: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&q=80&auto=format&fit=crop",
  timetable:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop",
  analytics:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop",
  library:
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80&auto=format&fit=crop",
  parents:
    "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=600&q=80&auto=format&fit=crop",
  activities:
    "https://images.unsplash.com/photo-1569879698960-9e5f95d67bb4?w=600&q=80&auto=format&fit=crop",
};

const MODULES = [
  {
    icon: "Users",
    color: "#ef6905",
    title: "Staff Management",
    tag: "Personnel Administration",
    img: "teacher",
    description:
      "Centralize all staff records, employment history, subject assignments, roles, and scheduling. Eliminate spreadsheets and maintain complete personnel data in one secure location.",
    features: [
      "Comprehensive staff profiles and employment records",
      "Subject and class assignment management",
      "Role-based permission system",
      "Leave and attendance tracking",
    ],
  },
  {
    icon: "GraduationCap",
    color: "#0055da",
    title: "Student Information System",
    tag: "Academic Records",
    img: "student",
    description:
      "Complete digital profiles for every student from enrollment through graduation, including academic history, welfare notes, parent contacts, and administrative documentation.",
    features: [
      "Comprehensive student profiles and academic history",
      "Online admissions pipeline",
      "Welfare and health record management",
      "Parent and guardian contact database",
    ],
  },
  {
    icon: "CreditCard",
    color: "#7a9c59",
    title: "Fee Management",
    tag: "Financial Operations",
    img: "fees",
    description:
      "Track fee collection in real time with automated payment reminders. Monitor payment status across all students, identify overdue accounts, and generate receipts from a single dashboard.",
    features: [
      "Real-time fee collection dashboard",
      "Automated payment reminder system",
      "Class and term-based fee structures",
      "Payment history and digital receipts",
    ],
  },
  {
    icon: "BookOpen",
    color: "#0055da",
    title: "Academic & CBC Management",
    tag: "Curriculum Integration",
    img: "academics",
    description:
      "Built specifically for Kenya's CBC curriculum. Manage learning areas, strands, sub-strands, and assessment rubrics while maintaining compatibility with traditional 8-4-4 grading systems.",
    features: [
      "Complete CBC strands and rubric management",
      "Traditional grading system support",
      "Class-based lesson planning",
      "Continuous assessment tracking",
    ],
  },
  {
    icon: "Brain",
    color: "#ef6905",
    title: "AI Examination Builder",
    tag: "Artificial Intelligence",
    img: "exam",
    description:
      "Upload notes, textbook content, or syllabus documents — EduCore's AI engine generates fully structured examinations. Review, edit, and publish directly to students with automated marking schemes.",
    features: [
      "Document-based exam generation",
      "Multiple question type support",
      "Automated marking scheme creation",
      "AI syllabus alignment verification",
    ],
  },
  {
    icon: "Clock",
    color: "#7a9c59",
    title: "Timetable & Attendance",
    tag: "Scheduling",
    img: "timetable",
    description:
      "Build school timetables efficiently and track attendance digitally. Teachers mark attendance from any device with real-time reporting by class, subject, or individual student.",
    features: [
      "Intuitive timetable builder",
      "Digital attendance tracking",
      "Parent absence notifications",
      "Period and class-level tracking",
    ],
  },
  {
    icon: "BarChart",
    color: "#ef6905",
    title: "Analytics & Performance",
    tag: "Intelligence",
    img: "analytics",
    description:
      "Beyond basic grade reporting — AI-powered analytics identify at-risk students, highlight top performers, and surface meaningful patterns across your entire institution.",
    features: [
      "AI-generated performance reports",
      "Early warning system for at-risk students",
      "Class and subject comparative analysis",
      "Term-over-term trend tracking",
    ],
  },
  {
    icon: "Library",
    color: "#0055da",
    title: "Library Management",
    tag: "Resource Management",
    img: "library",
    description:
      "Digitize your entire library catalog with automated borrowing, return tracking, and real-time visibility into book availability — eliminating manual registers entirely.",
    features: [
      "Searchable book catalog",
      "Borrowing and return automation",
      "Student borrowing history",
      "Overdue material alerts",
    ],
  },
  {
    icon: "Heart",
    color: "#7a9c59",
    title: "Parent Portal",
    tag: "Stakeholder Engagement",
    img: "parents",
    description:
      "Provide parents with real-time access to their child's academic progress, attendance records, fee status, and school communications — all from any mobile device.",
    features: [
      "Real-time grade visibility",
      "Attendance notifications",
      "Fee balance tracking",
      "School announcements and notices",
    ],
  },
  {
    icon: "Star",
    color: "#0055da",
    title: "Co-Curricular Management",
    tag: "Student Development",
    img: "activities",
    description:
      "Track every club, team, and activity within your school. Manage memberships, document participation, and celebrate student achievements beyond the classroom.",
    features: [
      "Activity and club administration",
      "Student participation records",
      "Achievement and award documentation",
      "Event and fixture scheduling",
    ],
  },
];

// ── Module Card ──────────────────────────────────────────────────────
function ModuleCard({ module, index }) {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(false);
  const IconComp = Icons[module.icon] || Icons.BookOpen;
  const delay = (index % 3) * 80;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-5px)"
            : "none"
          : "translateY(24px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.4s var(--ease-spring), box-shadow 0.4s, border-color 0.3s`,
        background: "var(--surface2)",
        border: `1px solid ${hovered ? "rgba(239, 105, 5,0.22)" : "var(--border)"}`,
        borderRadius: 20,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: hovered ? "var(--shadow-lg)" : "var(--shadow-card)",
      }}
    >
      {/* Image */}
      <div style={{ height: 190, position: "relative", overflow: "hidden" }}>
        <img
          src={UNSPLASH[module.img]}
          alt={module.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.6s var(--ease-smooth)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.35))`,
          }}
        />
        {/* Accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: module.color,
            opacity: 0.85,
          }}
        />
      </div>

      {/* Body */}
      <div
        style={{
          padding: "1.3rem 1.5rem",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            marginBottom: "0.8rem",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `${module.color}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: module.color,
              flexShrink: 0,
            }}
          >
            <IconComp />
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                fontWeight: 800,
                color: module.color,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {module.tag}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--text)",
                lineHeight: 1.2,
              }}
            >
              {module.title}
            </div>
          </div>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.81rem",
            lineHeight: 1.8,
            color: "var(--text2)",
            margin: "0 0 1rem",
            flex: 1,
          }}
        >
          {module.description}
        </p>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.44rem",
          }}
        >
          {module.features.map((f) => (
            <li
              key={f}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: `${module.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 1,
                  color: module.color,
                }}
              >
                <Icons.Check />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.76rem",
                  color: "var(--text2)",
                }}
              >
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Features Section ─────────────────────────────────────────────────
function FeaturesSection() {
  const [ref, visible] = useInView();
  return (
    <section
      id="features"
      style={{ padding: "7rem 0", background: "var(--bg)" }}
    >
      <div style={s.container}>
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
          <Tag color="green">Comprehensive Feature Set</Tag>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem,3.5vw,3rem)",
              lineHeight: 1.08,
              margin: "0 0 1rem",
              fontWeight: 400,
            }}
          >
            Twelve integrated modules.{" "}
            <em style={{ color: "#7a9c59", fontStyle: "italic" }}>
              One unified platform.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text2)",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.85,
              fontSize: "0.95rem",
            }}
          >
            Every aspect of your institution — from classroom instruction to
            administrative operations — managed cohesively. No application
            switching, no data silos, no operational chaos.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))",
            gap: "1.25rem",
          }}
        >
          {MODULES.map((mod, i) => (
            <ModuleCard key={mod.title} module={mod} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Security Section (Rebuilt) ────────────────────────────────────────
const SECURITY_ITEMS = [
  {
    icon: "Lock",
    num: "01",
    title: "End-to-End Encryption",
    color: "#0055da",
    description:
      "All data — student records, financial transactions, examination results — is encrypted both in transit and at rest. Access is restricted exclusively to authorized personnel.",
  },
  {
    icon: "Server",
    num: "02",
    title: "Enterprise-Grade Infrastructure",
    color: "#7a9c59",
    description:
      "EduCore operates on dedicated VPS infrastructure with isolated environments. Your institution's data remains completely segregated from all other clients.",
  },
  {
    icon: "Shield",
    num: "03",
    title: "Automated Daily Backups",
    color: "#0055da",
    description:
      "System data is automatically backed up every 24 hours. In the event of any system issue, we can restore your complete environment to the previous day's state.",
  },
  {
    icon: "Globe",
    num: "04",
    title: "99.9% Uptime Guarantee",
    color: "#0055da",
    description:
      "Built on enterprise hosting with redundancy at every layer. EduCore remains accessible when your institution needs it — including during critical examination periods.",
  },
  {
    icon: "Lock",
    num: "05",
    title: "Role-Based Access Control",
    color: "#7a9c59",
    description:
      "Teachers access teacher-appropriate data. Administrators have comprehensive visibility. Parents see only their child's information. Every user receives precisely calibrated permissions.",
  },
  {
    icon: "Zap",
    num: "06",
    title: "Real-Time Cross-Platform Synchronization",
    color: "#0055da",
    description:
      "Changes made by a teacher on any device appear instantly across administrative dashboards and parent portals. Always synchronized, always accurate.",
  },
];

const SEC_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&auto=format&fit=crop",
    speed: 0.06,
    style: { width: "68%", height: 310, top: 0, left: 0, zIndex: 2 },
  },
  {
    src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80&auto=format&fit=crop",
    speed: 0.12,
    style: { width: "55%", height: 230, bottom: 0, right: 0, zIndex: 3 },
  },
  {
    src: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=500&q=80&auto=format&fit=crop",
    speed: 0.04,
    style: {
      width: "40%",
      height: 170,
      bottom: 55,
      left: "12%",
      zIndex: 1,
      opacity: 0.82,
    },
  },
];

function ParallaxImage({ src, speed, style: extraStyle, visible }) {
  const [ref, offset] = useParallax(speed);
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-lg)",
        opacity: visible ? extraStyle.opacity || 1 : 0,
        transition: "opacity 0.8s ease 0.2s",
        ...extraStyle,
      }}
    >
      <img
        src={src}
        alt="Security infrastructure"
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: `translateY(${offset}px)`,
          transition: "transform 0.1s linear",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg,rgba(0, 85, 218,0.08) 0%,transparent 60%)",
        }}
      />
    </div>
  );
}

function SecuritySection() {
  const [headerRef, headerVisible] = useInView();
  const [secRef, secVisible] = useInView(0.06);

  const IconMap = {
    Lock: Icons.Lock,
    Server: Icons.Server,
    Shield: Icons.Shield,
    Globe: Icons.Globe,
    Zap: Icons.Zap,
  };

  return (
    <section
      id="security"
      style={{
        padding: "7rem 0",
        background: "var(--bg2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow */}
      <div
        style={{
          position: "absolute",
          width: "70vw",
          height: "70vw",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(0, 85, 218,0.05) 0%,transparent 65%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div style={s.container}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: "4.5rem",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.65s, transform 0.65s",
          }}
        >
          <Tag color="blue">Enterprise Security Standards</Tag>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem,3.5vw,3rem)",
              lineHeight: 1.08,
              margin: "0 0 1rem",
              fontWeight: 400,
            }}
          >
            Your student data is{" "}
            <em style={{ color: "#0055da", fontStyle: "italic" }}>
              protected with enterprise-grade security.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text2)",
              maxWidth: 540,
              margin: "0 auto",
              lineHeight: 1.85,
              fontSize: "0.95rem",
            }}
          >
            EduCore is architected on infrastructure equivalent to that used by
            financial institutions, healthcare providers, and government
            systems. We treat data security with the same priority you give to
            your students' wellbeing.
          </p>
        </div>

        {/* Two-column layout */}
        <div
          ref={secRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          {/* Left — Parallax image stack */}
          <div style={{ position: "relative", height: 520 }}>
            {SEC_IMAGES.map((img, i) => (
              <ParallaxImage
                key={i}
                src={img.src}
                speed={img.speed}
                style={img.style}
                visible={secVisible}
              />
            ))}
            {/* Floating security badge */}
            <div
              style={{
                position: "absolute",
                top: "46%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.7rem 1.3rem",
                borderRadius: 14,
                background: "var(--surface2)",
                border: "1px solid var(--border2)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
                zIndex: 10,
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#0055da",
                  display: "block",
                  animation: "pulse 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  letterSpacing: "0.02em",
                }}
              >
                AES-256 + TLS 1.3 Encryption
              </span>
            </div>
          </div>

          {/* Right — Minimal list cards */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {SECURITY_ITEMS.map((item, i) => {
              const IconComp = IconMap[item.icon] || Icons.Shield;
              return (
                <div
                  key={item.title}
                  style={{
                    padding: "1.5rem 0",
                    borderBottom: "1px solid var(--border)",
                    borderTop: i === 0 ? "1px solid var(--border)" : undefined,
                    display: "flex",
                    gap: "1.25rem",
                    alignItems: "flex-start",
                    opacity: secVisible ? 1 : 0,
                    transform: secVisible ? "none" : "translateY(16px)",
                    transition: `opacity 0.65s ease ${i * 80}ms, transform 0.65s ease ${i * 80}ms`,
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector(".sec-num").style.color =
                      item.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector(".sec-num").style.color =
                      "var(--text3)";
                  }}
                >
                  <span
                    className="sec-num"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6rem",
                      fontWeight: 800,
                      color: "var(--text3)",
                      letterSpacing: "0.08em",
                      minWidth: 24,
                      paddingTop: 3,
                      transition: "color 0.2s",
                    }}
                  >
                    {item.num}
                  </span>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.35rem",
                      }}
                    >
                      <span style={{ color: item.color, display: "flex" }}>
                        <IconComp />
                      </span>
                      <div
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.91rem",
                          fontWeight: 700,
                          color: "var(--text)",
                          lineHeight: 1.3,
                        }}
                      >
                        {item.title}
                      </div>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        color: "var(--text2)",
                        lineHeight: 1.75,
                      }}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Pricing Section ──────────────────────────────────────────────────
function PricingSection() {
  const [ref, visible] = useInView();
  const included = [
    "All 12 modules — no add-ons, no hidden fees",
    "Unlimited staff and student accounts",
    "AI examination builder and performance analytics",
    "Full CBC curriculum integration",
    "Parent portal included at no additional cost",
    "Library management system",
    "Co-curricular activity tracking",
    "Onboarding support and staff training",
    "Ongoing system updates at no extra charge",
    "Cancel anytime — no long-term contracts",
  ];
  return (
    <section
      id="pricing"
      style={{ padding: "7rem 0", background: "var(--bg)" }}
    >
      <div style={s.container}>
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
          <Tag color="orange">Transparent Pricing</Tag>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem,3.5vw,3rem)",
              lineHeight: 1.08,
              margin: "0 0 1rem",
              fontWeight: 400,
            }}
          >
            One flat rate.{" "}
            <em style={{ color: "#ef6905", fontStyle: "italic" }}>
              Everything included.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text2)",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.85,
            }}
          >
            No per-module fees. No per-seat limits. No unexpected charges. A
            single monthly subscription covering your entire institution.
          </p>
        </div>

        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
          }}
        >
          <div
            style={{
              background: "var(--surface2)",
              border: "2px solid rgba(239, 105, 5,0.28)",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(239, 105, 5,0.08)",
            }}
          >
            {/* Head */}
            <div
              style={{
                padding: "2.5rem",
                background:
                  "linear-gradient(135deg,rgba(239, 105, 5,0.07),rgba(201,211,243,0.06),rgba(0, 85, 218,0.04))",
                borderBottom: "1px solid var(--border)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle,rgba(239, 105, 5,0.14) 0%,transparent 70%)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1rem",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.65rem",
                      fontWeight: 800,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#ef6905",
                      marginBottom: "0.5rem",
                    }}
                  >
                    EduCore — Institutional Plan
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.4rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        color: "var(--text2)",
                      }}
                    >
                      KSh
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "3.5rem",
                        fontWeight: 800,
                        letterSpacing: "-0.04em",
                        color: "var(--text)",
                        lineHeight: 1,
                      }}
                    >
                      1,999
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        color: "var(--text2)",
                      }}
                    >
                      /month
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      color: "var(--text3)",
                      marginTop: "0.3rem",
                    }}
                  >
                    Monthly billing · Cancel anytime
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.4rem 1rem",
                      borderRadius: 999,
                      background: "rgba(16,185,129,0.08)",
                      border: "1px solid rgba(16,185,129,0.22)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#10b981",
                        animation: "pulse 2s infinite",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "#10b981",
                      }}
                    >
                      All Modules Included
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.72rem",
                      color: "var(--text3)",
                    }}
                  >
                    No hidden fees. No contracts.
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "2.25rem 2.5rem" }}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text3)",
                  marginBottom: "1rem",
                }}
              >
                What's Included
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.65rem 1.5rem",
                  marginBottom: "2rem",
                }}
              >
                {included.map((f) => (
                  <div
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "rgba(239, 105, 5,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 2,
                        color: "#ef6905",
                      }}
                    >
                      <Icons.Check />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.81rem",
                        color: "var(--text2)",
                        lineHeight: 1.55,
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <BtnPrimary
                  href="/contact"
                  style={{ flex: 1, minWidth: 180, justifyContent: "center" }}
                >
                  Get Started Today <Icons.Arrow />
                </BtnPrimary>
                <BtnGhost href="/contact">Schedule a Demo</BtnGhost>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CTA Section ──────────────────────────────────────────────────────
function CTASection() {
  const [ref, visible] = useInView();
  return (
    <section
      style={{
        padding: "8rem 0",
        background: "var(--bg2)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "70vw",
          height: "70vw",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(239, 105, 5,0.08) 0%,transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(128,128,128,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(128,128,128,0.028) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
          pointerEvents: "none",
        }}
      />
      <div style={{ ...s.container, position: "relative", zIndex: 2 }}>
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}
        >
          <Tag color="orange">Begin Your Journey</Tag>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem,4vw,3.4rem)",
              lineHeight: 1.06,
              margin: "0 0 1.25rem",
              fontWeight: 400,
            }}
          >
            Your institution deserves{" "}
            <em style={{ color: "#ef6905", fontStyle: "italic" }}>
              unified management.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text2)",
              maxWidth: 480,
              margin: "0 auto 2.5rem",
              lineHeight: 1.9,
              fontSize: "1rem",
            }}
          >
            Schedule a complimentary 30-minute demonstration. We'll walk you
            through the platform, address all your questions, and demonstrate
            how EduCore aligns with your institution's specific requirements.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <BtnPrimary href="/contact">
              Request a Demo <Icons.Arrow />
            </BtnPrimary>
            <BtnGhost href="#features">Explore All Features</BtnGhost>
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "var(--text3)",
              marginTop: "1.5rem",
            }}
          >
            KSh 1,999/month · No long-term contracts · Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "2.5rem 0",
      }}
    >
      <div
        style={{
          ...s.container,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            color: "#ef6905",
          }}
        >
          EduCore
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            color: "var(--text3)",
          }}
        >
          © 2025 EduCore. Empowering Kenyan Schools.
        </span>
      </div>
    </footer>
  );
}

// ── Root ─────────────────────────────────────────────────────────────
export default function EduCoreLandingPage() {
  const [theme, toggleTheme] = useTheme();
  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <Hero />
      <FeaturesMarquee />
      <FeaturesSection />
      <SecuritySection />
      <PricingSection />
      <CTASection />
      <Footer />
    </>
  );
}
