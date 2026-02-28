// src/components/Newsletter.jsx
import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const PERKS = [
  "Digital marketing tips & trends delivered weekly",
  "Exclusive campaign strategies used by top brands",
  "Early access to Serenly guides, tools & resources",
  "No spam — unsubscribe anytime, no questions asked",
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
      className="section-padding-sm"
      style={{
        background: "var(--color-bg-secondary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        className="glow-orange"
        style={{
          width: "50vw",
          height: "50vw",
          top: "-30%",
          right: "-15%",
          opacity: 0.45,
        }}
      />
      <div
        className="bg-dot-grid"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />

      <div
        className="container-site"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          style={{
            borderRadius: "var(--radius-2xl)",
            padding: "clamp(2.5rem,6vw,5rem) clamp(2rem,6vw,5rem)",
            background:
              "linear-gradient(135deg, rgba(254,122,54,0.09) 0%, rgba(0,70,255,0.06) 50%, rgba(254,122,54,0.05) 100%)",
            border: "1px solid rgba(254,122,54,0.18)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Inner glows */}
          <div
            style={{
              position: "absolute",
              top: "-20%",
              right: "-5%",
              width: 320,
              height: 320,
              background:
                "radial-gradient(circle,rgba(254,122,54,0.1) 0%,transparent 65%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-30%",
              left: "5%",
              width: 260,
              height: 260,
              background:
                "radial-gradient(circle,rgba(0,70,255,0.08) 0%,transparent 65%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
              position: "relative",
              zIndex: 2,
            }}
            className="nl-grid"
          >
            {/* Left — copy */}
            <div>
              <div
                className="section-tag section-tag-orange animate-fade-up"
                style={{ marginBottom: "1.25rem" }}
              >
                <Sparkles size={12} style={{ color: "#FE7A36" }} />
                Free Marketing Insights
              </div>

              <h2
                className="animate-fade-up delay-100"
                style={{ marginBottom: "1rem" }}
              >
                Stay Ahead of the{" "}
                <span className="text-gradient-orange">Digital Curve.</span>
              </h2>

              <p
                className="animate-fade-up delay-200"
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  maxWidth: 420,
                  marginBottom: "1.75rem",
                }}
              >
                Join 3,000+ business owners and marketers getting Serenly's
                weekly newsletter — packed with actionable digital marketing
                strategies you can implement today.
              </p>

              {/* Perks */}
              <ul
                style={{ listStyle: "none", padding: 0 }}
                className="animate-fade-up delay-300"
              >
                {PERKS.map((p) => (
                  <li
                    key={p}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.625rem",
                      marginBottom: "0.625rem",
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      style={{ color: "#FE7A36", flexShrink: 0, marginTop: 2 }}
                    />
                    <span
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — form */}
            <div className="animate-fade-up delay-300">
              {submitted ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "3rem 2rem",
                    borderRadius: "var(--radius-xl)",
                    background: "var(--color-surface-raised)",
                    border: "1px solid rgba(16,185,129,0.3)",
                  }}
                >
                  <CheckCircle2
                    size={52}
                    style={{ color: "#10B981", margin: "0 auto 1rem" }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.375rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    You're in!
                  </h3>
                  <p
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.7,
                    }}
                  >
                    Welcome to the Serenly community. Check your inbox for a
                    confirmation email and your first free marketing guide.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    padding: "2.5rem",
                    borderRadius: "var(--radius-xl)",
                    background: "var(--color-surface-raised)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "var(--shadow-lg)",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.25rem",
                      marginBottom: "0.5rem",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    Join the Newsletter
                  </h4>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-text-tertiary)",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Free weekly digital marketing strategies. No fluff.
                  </p>

                  <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div style={{ marginBottom: "0.875rem" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          color: "var(--color-text-secondary)",
                          marginBottom: "0.375rem",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your first name"
                        className="input"
                        style={{ fontSize: "0.9rem" }}
                      />
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: "1.25rem" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          color: "var(--color-text-secondary)",
                          marginBottom: "0.375rem",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        Business Email
                      </label>
                      <input
                        type="email"
                        placeholder="you@yourbusiness.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                        style={{ fontSize: "0.9rem" }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        borderRadius: 10,
                        opacity: loading ? 0.75 : 1,
                        transition: "all 0.3s",
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <span>Subscribing…</span>
                      ) : (
                        <>
                          <span>Subscribe — It's Free</span>
                          <ArrowRight size={16} strokeWidth={2.5} />
                        </>
                      )}
                    </button>

                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "0.75rem",
                        color: "var(--color-text-tertiary)",
                        marginTop: "0.875rem",
                        lineHeight: 1.6,
                      }}
                    >
                      By subscribing you agree to our Privacy Policy. We respect
                      your inbox.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .nl-grid{grid-template-columns:1fr !important; gap:2.5rem !important;} }
      `}</style>
    </section>
  );
}
