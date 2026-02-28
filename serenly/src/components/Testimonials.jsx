// src/components/Testimonials.jsx
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Amara Wanjiku",
    role: "Founder, Zuri Skincare",
    text: "Serenly completely transformed how our brand shows up online. Within 3 months of working with them, our Instagram following grew by 8,000 and our DMs were full of purchase inquiries. The ROI has been incredible.",
    stars: 5,
    avatar: "AW",
    color: "#FE7A36",
    result: "+8k followers in 90 days",
  },
  {
    name: "Kevin Otieno",
    role: "CEO, BuildRight Construction",
    text: "I was skeptical about digital marketing until Serenly showed me the numbers. Their SEO work got us ranking #1 for 'construction company Nairobi' and now we receive 40+ qualified leads every single month from our website alone.",
    stars: 5,
    avatar: "KO",
    color: "#0046FF",
    result: "40+ leads/month from SEO",
  },
  {
    name: "Fatima Hassan",
    role: "Director, Hassan Legal Group",
    text: "Our old website was costing us clients. Serenly redesigned it in 6 weeks — it looks incredible, loads fast, and actually converts. We went from 1–2 enquiries a week to 10+. Worth every shilling.",
    stars: 5,
    avatar: "FH",
    color: "#FE7A36",
    result: "5x increase in web enquiries",
  },
  {
    name: "Brian Kamau",
    role: "Marketing Manager, Savanna Foods",
    text: "Serenly runs all our social media and we've never looked back. Their content team gets our brand voice perfectly and our campaigns consistently outperform industry benchmarks. Genuinely the best agency we've worked with.",
    stars: 5,
    avatar: "BK",
    color: "#0046FF",
    result: "3× campaign ROAS",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(1);

  const prev = () => setActive((a) => Math.max(0, a - 1));
  const next = () => setActive((a) => Math.min(TESTIMONIALS.length - 1, a + 1));

  return (
    <section
      id="testimonials"
      className="section-padding"
      style={{
        background: "var(--color-bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="glow-orange"
        style={{
          width: "45vw",
          height: "45vw",
          bottom: "-20%",
          left: "-12%",
          opacity: 0.5,
        }}
      />
      <div
        className="glow-blue"
        style={{
          width: "35vw",
          height: "35vw",
          top: "-15%",
          right: "-8%",
          opacity: 0.4,
        }}
      />

      <div
        className="container-site"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            className="section-tag section-tag-orange animate-fade-up"
            style={{ display: "inline-flex", marginBottom: "1.25rem" }}
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
            Client Success Stories
          </div>
          <h2 className="animate-fade-up delay-100">
            Real Results from{" "}
            <span className="text-gradient-orange">Real Clients</span>
          </h2>
          <p
            className="animate-fade-up delay-200"
            style={{
              maxWidth: 460,
              margin: "1rem auto 0",
              fontSize: "0.9375rem",
              lineHeight: 1.75,
            }}
          >
            Don't take our word for it — see how Serenly has helped businesses
            across Kenya and beyond grow their digital presence and revenue.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "1.25rem",
            marginBottom: "2.5rem",
          }}
          className="test-grid"
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                padding: "2rem",
                borderRadius: "var(--radius-xl)",
                background: "var(--color-surface-raised)",
                border: `1px solid ${i === active ? `${t.color}35` : "var(--color-border)"}`,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transform: i === active ? "translateY(-4px)" : "translateY(0)",
                boxShadow:
                  i === active
                    ? `0 24px 56px rgba(0,0,0,0.13), 0 0 0 1px ${t.color}18`
                    : "var(--shadow-sm)",
                transition: "all 0.4s var(--ease-spring)",
              }}
            >
              {/* Active glow */}
              {i === active && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "50%",
                    height: "45%",
                    background: `radial-gradient(circle at 80% 10%, ${t.color}0D, transparent 60%)`,
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Quote icon */}
              <Quote
                size={28}
                style={{
                  color: i === active ? t.color : "var(--color-border-strong)",
                  marginBottom: "1rem",
                  transition: "color 0.3s",
                }}
              />

              {/* Stars */}
              <div
                style={{ display: "flex", gap: 3, marginBottom: "0.875rem" }}
              >
                {[...Array(t.stars)].map((_, j) => (
                  <Star
                    key={j}
                    size={13}
                    fill="#FE7A36"
                    style={{ color: "#FE7A36" }}
                  />
                ))}
              </div>

              {/* Text */}
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                  fontStyle: "italic",
                  color:
                    i === active
                      ? "var(--color-text-primary)"
                      : "var(--color-text-secondary)",
                  transition: "color 0.3s",
                }}
              >
                "{t.text}"
              </p>

              {/* Result badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "0.3rem 0.875rem",
                  borderRadius: "var(--radius-full)",
                  background: `${t.color}12`,
                  border: `1px solid ${t.color}25`,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: t.color,
                  fontFamily: "var(--font-body)",
                  marginBottom: "1.25rem",
                }}
              >
                ✦ {t.result}
              </div>

              {/* Author */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg,${t.color},${t.color}99)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1.5px solid ${t.color}45`,
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 13,
                      color: "#fff",
                    }}
                  >
                    {t.avatar}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.9375rem",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nav */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          {[prev, next]
            .map((fn, i) => (
              <button
                key={i}
                onClick={fn}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: "var(--color-surface-raised)",
                  border: "1.5px solid var(--color-border)",
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#FE7A36";
                  e.currentTarget.style.color = "#FE7A36";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                }}
              >
                {i === 0 ? (
                  <ChevronLeft size={17} />
                ) : (
                  <ChevronRight size={17} />
                )}
              </button>
            ))
            .reduce(
              (acc, btn, i) => [
                acc,
                ...TESTIMONIALS.map((_, j) => (
                  <div
                    key={`dot-${j}`}
                    onClick={() => setActive(j)}
                    style={{
                      width: j === active ? 28 : 8,
                      height: 8,
                      borderRadius: 4,
                      cursor: "pointer",
                      background:
                        j === active
                          ? "linear-gradient(90deg,#FE7A36,#FF9A62)"
                          : "var(--color-border-strong)",
                      transition: "all 0.3s var(--ease-spring)",
                    }}
                  />
                ))
                  .filter((_, j) => (i === 0 ? false : true))
                  .slice(0, 0),
                btn,
              ],
              [],
            )}

          {/* Dots inline (separate, simpler) */}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "0.875rem",
          }}
        >
          {TESTIMONIALS.map((_, j) => (
            <div
              key={j}
              onClick={() => setActive(j)}
              style={{
                width: j === active ? 28 : 8,
                height: 8,
                borderRadius: 4,
                cursor: "pointer",
                background:
                  j === active
                    ? "linear-gradient(90deg,#FE7A36,#FF9A62)"
                    : "var(--color-border-strong)",
                transition: "all 0.3s var(--ease-spring)",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:768px){ .test-grid{grid-template-columns:1fr !important;} }
      `}</style>
    </section>
  );
}
