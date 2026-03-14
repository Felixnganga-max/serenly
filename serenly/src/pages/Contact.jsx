// src/pages/Contact.jsx
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Phone, Mail, MessageCircle, Send, ArrowRight } from "lucide-react";

const PHONE = "+254 97743366";
const PHONE_CLEAN = "+25497743366";
const EMAIL = "info@serenlydm.com";
const WA_URL = `https://wa.me/${PHONE_CLEAN.replace("+", "")}`;

export default function Contact() {
  const { isDark } = useTheme();
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handle = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    // TODO: wire to backend / dashboard DB
    setSent(true);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--color-bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glows */}
      <div
        className="glow-orange"
        style={{ width: 600, height: 600, top: -150, left: -150, zIndex: 0 }}
      />
      <div
        className="glow-blue"
        style={{ width: 400, height: 400, bottom: 0, right: -100, zIndex: 0 }}
      />

      <div
        className="container-site"
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "5.5rem",
          paddingBottom: "6rem",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "3.5rem", maxWidth: 560 }}>
          <span
            className="section-tag section-tag-orange"
            style={{ marginBottom: "1.25rem" }}
          >
            Get In Touch
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              lineHeight: 1.08,
              marginBottom: "1rem",
            }}
          >
            Let's build something{" "}
            <span className="text-gradient-orange">great together</span>
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            Reach out via WhatsApp, call, or email — or fill the form and we'll
            get back to you.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* ── LEFT: Contact details ── */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* WhatsApp */}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <div
                className="card"
                style={{
                  borderRadius: 18,
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(37,211,102,0.4)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-border)")
                }
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "rgba(37,211,102,0.1)",
                    border: "1px solid rgba(37,211,102,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MessageCircle
                    size={19}
                    strokeWidth={1.8}
                    style={{ color: "#25D366" }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-text-tertiary)",
                      margin: "0 0 2px",
                    }}
                  >
                    WhatsApp
                  </p>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      margin: 0,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {PHONE}
                  </p>
                </div>
                <ArrowRight
                  size={15}
                  style={{
                    marginLeft: "auto",
                    color: "var(--color-text-tertiary)",
                  }}
                />
              </div>
            </a>

            {/* Call */}
            <a href={`tel:${PHONE_CLEAN}`} style={{ textDecoration: "none" }}>
              <div
                className="card"
                style={{
                  borderRadius: 18,
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(254,122,54,0.4)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-border)")
                }
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "rgba(254,122,54,0.1)",
                    border: "1px solid rgba(254,122,54,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Phone
                    size={19}
                    strokeWidth={1.8}
                    style={{ color: "var(--color-brand-orange)" }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-text-tertiary)",
                      margin: "0 0 2px",
                    }}
                  >
                    Call Us
                  </p>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      margin: 0,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {PHONE}
                  </p>
                </div>
                <ArrowRight
                  size={15}
                  style={{
                    marginLeft: "auto",
                    color: "var(--color-text-tertiary)",
                  }}
                />
              </div>
            </a>

            {/* Email */}
            <a href={`mailto:${EMAIL}`} style={{ textDecoration: "none" }}>
              <div
                className="card"
                style={{
                  borderRadius: 18,
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(0,70,255,0.3)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-border)")
                }
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "rgba(0,70,255,0.07)",
                    border: "1px solid rgba(0,70,255,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Mail
                    size={19}
                    strokeWidth={1.8}
                    style={{ color: "var(--color-brand-blue)" }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-text-tertiary)",
                      margin: "0 0 2px",
                    }}
                  >
                    Email
                  </p>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      margin: 0,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {EMAIL}
                  </p>
                </div>
                <ArrowRight
                  size={15}
                  style={{
                    marginLeft: "auto",
                    color: "var(--color-text-tertiary)",
                  }}
                />
              </div>
            </a>
          </div>

          {/* ── RIGHT: Form ── */}
          <div
            className="card"
            style={{ borderRadius: 24, padding: "2rem 2.25rem" }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "rgba(254,122,54,0.1)",
                    border: "1.5px solid rgba(254,122,54,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem",
                  }}
                >
                  <Send
                    size={22}
                    style={{ color: "var(--color-brand-orange)" }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  Message received!
                </h3>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.9rem",
                    margin: 0,
                  }}
                >
                  We'll be in touch shortly.
                </p>
              </div>
            ) : (
              <>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.375rem",
                    marginBottom: "0.375rem",
                  }}
                >
                  Send an enquiry
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-text-tertiary)",
                    marginBottom: "1.75rem",
                  }}
                >
                  We'll reply within 24 hours.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "var(--color-text-tertiary)",
                          marginBottom: 6,
                        }}
                      >
                        Name
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handle}
                        placeholder="Your name"
                        className="input"
                        style={{ borderRadius: 10 }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "var(--color-text-tertiary)",
                          marginBottom: 6,
                        }}
                      >
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handle}
                        placeholder="you@email.com"
                        className="input"
                        style={{ borderRadius: 10 }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--color-text-tertiary)",
                        marginBottom: 6,
                      }}
                    >
                      Service
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handle}
                      className="input"
                      style={{ borderRadius: 10, cursor: "pointer" }}
                    >
                      <option value="">Select a service…</option>
                      <option value="branding">Branding</option>
                      <option value="meta-ads">Meta Ads Management</option>
                      <option value="seo">SEO Optimization</option>
                      <option value="website">Website Development</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--color-text-tertiary)",
                        marginBottom: 6,
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handle}
                      placeholder="Tell us about your project…"
                      rows={4}
                      className="input"
                      style={{
                        borderRadius: 10,
                        resize: "vertical",
                        minHeight: 110,
                      }}
                    />
                  </div>

                  <button
                    onClick={submit}
                    className="btn btn-primary btn-md"
                    style={{ borderRadius: 12, marginTop: 4, gap: 8 }}
                  >
                    Send Message <Send size={15} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
