// src/pages/Portfolio.jsx
import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  ExternalLink,
  Palette,
  Globe,
  TrendingUp,
  Search,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

/* ─── DATA ──────────────────────────────────────────────── */

const CATEGORIES = [
  { id: "all", label: "All Work" },
  { id: "branding", label: "Branding" },
  { id: "websites", label: "Websites" },
  { id: "meta-ads", label: "Meta Ads" },
  { id: "seo", label: "SEO" },
];

const BRANDING_ITEMS = [
  {
    id: "b1",
    category: "branding",
    title: "Brand Identity — Placeholder",
    desc: "Full brand system coming soon.",
    placeholder: true,
  },
  {
    id: "b2",
    category: "branding",
    title: "Brand Identity — Placeholder",
    desc: "Full brand system coming soon.",
    placeholder: true,
  },
  {
    id: "b3",
    category: "branding",
    title: "Brand Identity — Placeholder",
    desc: "Full brand system coming soon.",
    placeholder: true,
  },
];

const WEBSITE_ITEMS = [
  {
    id: "w1",
    category: "websites",
    title: "Catalystium Solutions",
    desc: "Corporate tech solutions platform with modern UX.",
    url: "https://www.catalystiumsolutions.com/",
    domain: "catalystiumsolutions.com",
  },
  {
    id: "w2",
    category: "websites",
    title: "Smart Global",
    desc: "Professional services website for a Kenyan enterprise.",
    url: "https://www.smartglobal.co.ke/",
    domain: "smartglobal.co.ke",
  },
  {
    id: "w3",
    category: "websites",
    title: "Kamson",
    desc: "Business-focused site built for the Kenyan market.",
    url: "https://www.kamson.co.ke/",
    domain: "kamson.co.ke",
  },
  {
    id: "w4",
    category: "websites",
    title: "Fédération Dawovodou",
    desc: "Multilingual cultural federation website.",
    url: "https://www.federationdawovodou.org/",
    domain: "federationdawovodou.org",
  },
  {
    id: "w5",
    category: "websites",
    title: "Mira Heights",
    desc: "Luxury real estate development showcase.",
    url: "https://www.miraheights.com/",
    domain: "miraheights.com",
  },
];

const META_ADS_ITEMS = [
  {
    id: "m1",
    category: "meta-ads",
    title: "Meta Ads Campaign",
    desc: "High-converting ad creative coming soon.",
    placeholder: true,
  },
  {
    id: "m2",
    category: "meta-ads",
    title: "Meta Ads Campaign",
    desc: "High-converting ad creative coming soon.",
    placeholder: true,
  },
];

const SEO_ITEMS = WEBSITE_ITEMS.map((w) => ({
  ...w,
  id: `seo-${w.id}`,
  category: "seo",
  desc: `${w.desc} — Fully SEO-optimised.`,
}));

const ALL_ITEMS = [
  ...BRANDING_ITEMS,
  ...WEBSITE_ITEMS,
  ...META_ADS_ITEMS,
  ...SEO_ITEMS,
];

/* ─── ICON MAP ──────────────────────────────────────────── */
const CATEGORY_ICONS = {
  branding: Palette,
  websites: Globe,
  "meta-ads": TrendingUp,
  seo: Search,
};

/* ─── WEBSITE CARD ──────────────────────────────────────── */
function WebsiteCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const previewUrl = `https://api.microlink.io?url=${encodeURIComponent(item.url)}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    <div
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        animationDelay: `${index * 80}ms`,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Preview thumbnail */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          background: "var(--color-bg-tertiary)",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <iframe
          src={item.url}
          title={item.title}
          sandbox="allow-scripts allow-same-origin"
          style={{
            width: "200%",
            height: "200%",
            transform: "scale(0.5)",
            transformOrigin: "top left",
            border: "none",
            pointerEvents: "none",
            transition: "transform 0.6s ease",
          }}
          loading="lazy"
        />

        {/* Hover overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            display: "flex",
            alignItems: "flex-end",
            padding: "1rem",
          }}
        >
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
            style={{ borderRadius: 8, gap: 6 }}
            onClick={(e) => e.stopPropagation()}
          >
            Visit Site <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "1.25rem 1.5rem 1.5rem", flexGrow: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <h4
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.05rem",
              color: "var(--color-text-primary)",
            }}
          >
            {item.title}
          </h4>
          <span
            style={{
              fontSize: "0.7rem",
              color: "var(--color-text-tertiary)",
              fontFamily: "var(--font-body)",
            }}
          >
            {item.domain}
          </span>
        </div>
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {item.desc}
        </p>
      </div>
    </div>
  );
}

/* ─── PLACEHOLDER CARD ──────────────────────────────────── */
function PlaceholderCard({ item, index }) {
  const Icon = CATEGORY_ICONS[item.category] || Palette;
  return (
    <div
      className="card"
      style={{
        borderRadius: 20,
        overflow: "hidden",
        animationDelay: `${index * 80}ms`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Visual area */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          background:
            "repeating-linear-gradient(-45deg, var(--color-border-subtle) 0, var(--color-border-subtle) 1px, transparent 0, transparent 50%)",
          backgroundSize: "12px 12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          color: "var(--color-text-tertiary)",
          position: "relative",
        }}
      >
        <Icon size={32} strokeWidth={1.2} />
        <span
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
          }}
        >
          Coming Soon
        </span>
        {/* Orange corner accent */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--color-brand-orange)",
            opacity: 0.5,
          }}
        />
      </div>

      <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
        <h4
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.05rem",
            color: "var(--color-text-secondary)",
            marginBottom: 6,
          }}
        >
          {item.title}
        </h4>
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--color-text-tertiary)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {item.desc}
        </p>
      </div>
    </div>
  );
}

/* ─── MAIN PORTFOLIO PAGE ───────────────────────────────── */
export default function Portfolio() {
  const { isDark } = useTheme();
  const [active, setActive] = useState("all");
  const [visible, setVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const filtered =
    active === "all"
      ? ALL_ITEMS
      : ALL_ITEMS.filter((i) => i.category === active);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Background glows ── */}
      <div
        className="glow-orange"
        style={{ width: 700, height: 700, top: -200, left: -200, zIndex: 0 }}
      />
      <div
        className="glow-blue"
        style={{ width: 500, height: 500, top: 100, right: -150, zIndex: 0 }}
      />

      {/* ── HERO HEADER ── */}
      <section
        className="container-site"
        style={{
          paddingTop: "6rem",
          paddingBottom: "4rem",
          position: "relative",
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <span
            className="section-tag section-tag-orange"
            style={{ marginBottom: "1.5rem" }}
          >
            Our Work
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.08,
              marginBottom: "1.25rem",
            }}
          >
            Crafted with purpose,{" "}
            <span className="text-gradient-orange">built to perform</span>
          </h1>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.75,
              maxWidth: 520,
            }}
          >
            From bold brand identities to high-converting websites — here's a
            look at what we've built for our clients.
          </p>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <div
        style={{
          position: "sticky",
          top: 70,
          zIndex: 40,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "var(--color-surface-overlay)",
          borderBottom: "1px solid var(--color-border-subtle)",
          borderTop: "1px solid var(--color-border-subtle)",
        }}
      >
        <div
          className="container-site"
          style={{
            display: "flex",
            gap: 4,
            overflowX: "auto",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            scrollbarWidth: "none",
          }}
        >
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id];
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "0.5rem 1.125rem",
                  borderRadius: 999,
                  border: isActive
                    ? "1.5px solid rgba(254,122,54,0.6)"
                    : "1.5px solid var(--color-border)",
                  background: isActive ? "rgba(254,122,54,0.1)" : "transparent",
                  color: isActive
                    ? "var(--color-brand-orange)"
                    : "var(--color-text-secondary)",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-body)",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                {Icon && <Icon size={13} strokeWidth={2.2} />}
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── CATEGORY SECTIONS ── */}
      <div
        className="container-site"
        style={{
          paddingTop: "3.5rem",
          paddingBottom: "6rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {active === "all" ? (
          /* All view — grouped by category */
          <>
            {[
              {
                id: "branding",
                label: "Branding",
                items: BRANDING_ITEMS,
                Icon: Palette,
              },
              {
                id: "websites",
                label: "Website Development",
                items: WEBSITE_ITEMS,
                Icon: Globe,
              },
              {
                id: "meta-ads",
                label: "Meta Ads Management",
                items: META_ADS_ITEMS,
                Icon: TrendingUp,
              },
              {
                id: "seo",
                label: "SEO Optimization",
                items: SEO_ITEMS,
                Icon: Search,
              },
            ].map(({ id, label, items, Icon }) => (
              <section key={id} style={{ marginBottom: "5rem" }}>
                {/* Section header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "2rem",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: "rgba(254,122,54,0.1)",
                        border: "1px solid rgba(254,122,54,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--color-brand-orange)",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.5rem, 3vw, 2rem)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {label}
                    </h2>
                  </div>
                  <button
                    onClick={() => setActive(id)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: "var(--color-brand-orange)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      padding: 0,
                    }}
                  >
                    View all <ChevronRight size={14} />
                  </button>
                </div>

                {/* Divider */}
                <div
                  className="divider divider-gradient"
                  style={{ marginBottom: "2rem" }}
                />

                {/* Grid — desktop: auto-fill grid, mobile: horizontal scroll */}
                <div className="portfolio-scroll-wrap">
                  <div className="portfolio-grid">
                    {items.map((item, i) =>
                      item.placeholder ? (
                        <PlaceholderCard key={item.id} item={item} index={i} />
                      ) : (
                        <WebsiteCard key={item.id} item={item} index={i} />
                      ),
                    )}
                  </div>
                </div>
              </section>
            ))}
          </>
        ) : (
          /* Filtered view */
          <>
            {/* Section title */}
            <div style={{ marginBottom: "2.5rem" }}>
              {(() => {
                const cat = CATEGORIES.find((c) => c.id === active);
                const Icon = CATEGORY_ICONS[active];
                return (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    {Icon && (
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 13,
                          background: "rgba(254,122,54,0.1)",
                          border: "1px solid rgba(254,122,54,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--color-brand-orange)",
                        }}
                      >
                        <Icon size={20} strokeWidth={1.8} />
                      </div>
                    )}
                    <div>
                      <h2
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                          color: "var(--color-text-primary)",
                          lineHeight: 1.1,
                        }}
                      >
                        {cat?.label}
                      </h2>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-text-tertiary)",
                          margin: "4px 0 0",
                        }}
                      >
                        {filtered.length} project
                        {filtered.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div
              className="divider divider-gradient"
              style={{ marginBottom: "2.5rem" }}
            />

            <div className="portfolio-scroll-wrap">
              <div className="portfolio-grid">
                {filtered.map((item, i) =>
                  item.placeholder ? (
                    <PlaceholderCard key={item.id} item={item} index={i} />
                  ) : (
                    <WebsiteCard key={item.id} item={item} index={i} />
                  ),
                )}
              </div>
            </div>
          </>
        )}

        {/* ── CTA BANNER ── */}
        <div
          style={{
            marginTop: "5rem",
            borderRadius: 24,
            padding: "3.5rem 3rem",
            background: isDark
              ? "linear-gradient(135deg, rgba(254,122,54,0.08) 0%, rgba(0,70,255,0.06) 100%)"
              : "linear-gradient(135deg, rgba(254,122,54,0.06) 0%, rgba(0,70,255,0.04) 100%)",
            border: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circle */}
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(254,122,54,0.1) 0%, transparent 70%)",
              right: -80,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: 480 }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                marginBottom: "0.625rem",
                color: "var(--color-text-primary)",
              }}
            >
              Ready to be our next project?
            </h3>
            <p
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Let's build something you're proud to show off. Get in touch and
              let's talk about your goals.
            </p>
          </div>
          <a
            href="/contact"
            className="btn btn-primary btn-lg"
            style={{ borderRadius: 12, gap: 8, flexShrink: 0 }}
          >
            Start a Project <ArrowRight size={17} />
          </a>
        </div>
      </div>

      {/* ── GRID / SCROLL STYLES ── */}
      <style>{`
        /* Desktop: regular auto-fill grid */
        .portfolio-scroll-wrap { width: 100%; }
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        /* Mobile: horizontal scroll row — cards peek at the edge to hint scrollability */
        @media (max-width: 640px) {
          .portfolio-scroll-wrap {
            overflow-x: auto;
            overflow-y: visible;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
            /* Bleed past container padding so first card is flush */
            margin-left: -1.25rem;
            margin-right: -1.25rem;
            padding-left: 1.25rem;
            padding-right: 1.25rem;
            /* Hide scrollbar but keep scroll */
            scrollbar-width: none;
          }
          .portfolio-scroll-wrap::-webkit-scrollbar { display: none; }

          .portfolio-grid {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 1rem;
            /* Last card gets breathing room so it doesn't sit flush at edge */
            padding-right: 1.25rem;
          }

          .portfolio-grid > * {
            flex: 0 0 78vw;   /* each card = 78% of viewport — next one peeks in */
            max-width: 320px;
            scroll-snap-align: start;
          }
        }
      `}</style>
    </main>
  );
}
