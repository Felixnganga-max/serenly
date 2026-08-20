// src/pages/Contact.jsx
import React, { useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronDown,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { api } from "../lib/api";

const PHONE = "+254 797 743 366";
const PHONE_CLEAN = "+254797743366";
const EMAIL = "contact@serenlydm.com";
const WA_URL = `https://wa.me/${PHONE_CLEAN.replace("+", "")}`;

const SOCIALS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const SERVICE_OPTIONS = [
  "Website Development",
  "SEO Optimisation",
  "Social Media & Meta Ads",
  "Brand Identity",
  "School Management System (EduCore)",
  "Not sure yet — let's talk",
];

const BUDGET_OPTIONS = [
  "Under KSh 50,000",
  "KSh 50,000 – 150,000",
  "KSh 150,000 – 500,000",
  "KSh 500,000+",
  "Not sure yet",
];

const HERO_IMG =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80&auto=format&fit=crop";

/* ── Circular rotating "Get In Touch" badge ── */
function GetInTouchBadge() {
  const uid = useId().replace(/[:]/g, "");
  const pathId = `gitpath-${uid}`;
  const r = 60;
  const label = "GET IN TOUCH  ✦  GET IN TOUCH  ✦  GET IN TOUCH  ✦  ";

  return (
    <div style={{ position: "relative", width: 128, height: 128, flexShrink: 0 }}>
      <svg
        viewBox="0 0 128 128"
        width="128"
        height="128"
        style={{ animation: "spin-badge 14s linear infinite" }}
      >
        <defs>
          <path
            id={pathId}
            fill="none"
            d={`M 64,64 m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>
        <circle cx="64" cy="64" r={r} fill="var(--color-brand-green)" />
        <text fontSize="9.5" fontWeight="700" letterSpacing="0.5" fill="var(--color-brand-black)">
          <textPath href={`#${pathId}`} startOffset="0%">
            {label}
          </textPath>
        </text>
      </svg>
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-brand-black)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
      >
        <path d="M7 17L17 7M17 7H8M17 7v9" />
      </svg>
      <style>{`
        @keyframes spin-badge { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

/* ── Numbered field shell — "01  What's your name?" + underline ── */
function NumberField({ n, label, error, children }) {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "2.1rem" }}>
      <span
        style={{
          flexShrink: 0,
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "1.5px solid rgba(245,245,245,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "rgba(245,245,245,0.6)",
        }}
      >
        {n}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <label
          style={{
            display: "block",
            fontSize: "0.9375rem",
            fontWeight: 600,
            color: "#F5F5F5",
            marginBottom: "0.6rem",
          }}
        >
          {label}
        </label>
        {children}
        <div
          style={{
            height: 1,
            background: error ? "#E2725B" : "rgba(245,245,245,0.25)",
            marginTop: "0.6rem",
          }}
        />
        {error && (
          <p style={{ color: "#E2725B", fontSize: "0.75rem", marginTop: "0.5rem" }}>{error}</p>
        )}
      </div>
    </div>
  );
}

const fieldInputStyle = {
  width: "100%",
  background: "transparent",
  border: "none",
  outline: "none",
  color: "#F5F5F5",
  fontSize: "0.9375rem",
  fontFamily: "var(--font-body)",
  padding: "0.2rem 0",
};

/* ── Custom dropdown, styled to match the reference's white panel ── */
function Dropdown({ value, placeholder, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          ...fieldInputStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          color: value ? "#F5F5F5" : "rgba(245,245,245,0.4)",
        }}
      >
        {value || placeholder}
        <ChevronDown
          size={16}
          style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none", flexShrink: 0 }}
        />
      </button>
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 20 }}
          />
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 0.75rem)",
              left: 0,
              right: 0,
              background: "#F5F5F5",
              borderRadius: 10,
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
              zIndex: 21,
              maxHeight: 260,
              overflowY: "auto",
            }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "0.85rem 1.1rem",
                  border: "none",
                  background: opt === value ? "rgba(46,41,16,0.08)" : "transparent",
                  color: "var(--color-brand-black)",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(46,41,16,0.06)")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = opt === value ? "rgba(46,41,16,0.08)" : "transparent")
                }
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [sent, setSent] = useState(false);

  const set = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "This field is required";
    if (!form.email.trim()) next.email = "This field is required";
    else if (!EMAIL_RE.test(form.email)) next.email = "The e-mail address entered is invalid";
    if (!form.phone.trim()) next.phone = "This field is required";
    if (!form.message.trim()) next.message = "This field is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      await api.contact.create(form);
      setSent(true);
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <main style={{ background: "var(--color-brand-black)" }}>
        <section style={{ padding: "5rem 1.5rem 6rem" }}>
          <div
            className="container-site"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-green)",
                  marginBottom: "1rem",
                }}
              >
                Message sent
              </span>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.25rem,4.5vw,3.25rem)",
                  color: "#F5F5F5",
                  lineHeight: 1.1,
                  marginBottom: "1rem",
                }}
              >
                Thank you for contacting us!
              </h1>
            </div>
            <div>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#F5F5F5",
                  fontWeight: 600,
                  marginBottom: "0.75rem",
                }}
              >
                We have received your message.
              </p>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "rgba(245,245,245,0.65)",
                  lineHeight: 1.8,
                  marginBottom: "1.75rem",
                }}
              >
                Your message has been received and we'll be contacting you
                shortly to follow up. If you'd like to speak to someone
                immediately, feel free to call or WhatsApp us.
              </p>
              <Link
                to="/"
                className="btn btn-primary btn-md"
                style={{ borderRadius: 999 }}
              >
                Back to Home <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>
        <div style={{ height: "38vh", position: "relative", overflow: "hidden" }}>
          <img
            src={HERO_IMG}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: "var(--color-brand-black)" }}>
      <section style={{ padding: "4rem 1.5rem 6rem" }}>
        <div className="container-site">
          {/* Heading row */}
          <div
            className="contact-top-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "start",
              gap: "2rem",
              marginBottom: "1rem",
              paddingBottom: "2.5rem",
              borderBottom: "1px solid rgba(245,245,245,0.14)",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.75rem,6vw,4.5rem)",
                lineHeight: 1.02,
                color: "#F5F5F5",
                margin: 0,
              }}
            >
              Let's work <span className="text-brand-orange">together!</span>
            </h1>
            <GetInTouchBadge />
          </div>

          <p
            style={{
              maxWidth: 460,
              fontSize: "1rem",
              color: "rgba(245,245,245,0.6)",
              lineHeight: 1.8,
              margin: "2rem 0 3rem",
            }}
          >
            Let us help you tell your story the right way. Fill out the form
            below and we'll get back to you within 24 hours.
          </p>

          {/* Form + sidebar */}
          <form
            onSubmit={handleSubmit}
            className="contact-form-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 0.55fr", gap: "4rem" }}
          >
            <div>
              <NumberField n="01" label="What's your name?" error={errors.name}>
                <input
                  style={fieldInputStyle}
                  placeholder="Type your full name"
                  value={form.name}
                  onChange={set("name")}
                />
              </NumberField>

              <NumberField n="02" label="What's your email address?" error={errors.email}>
                <input
                  style={fieldInputStyle}
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={set("email")}
                />
              </NumberField>

              <NumberField n="03" label="What's your phone number?" error={errors.phone}>
                <input
                  style={fieldInputStyle}
                  placeholder="+254 700 000000"
                  value={form.phone}
                  onChange={set("phone")}
                />
              </NumberField>

              <NumberField n="04" label="What's your company/organisation name?">
                <input
                  style={fieldInputStyle}
                  placeholder="Type your company/organisation name"
                  value={form.company}
                  onChange={set("company")}
                />
              </NumberField>

              <NumberField n="05" label="What service are you looking for?">
                <Dropdown
                  value={form.service}
                  placeholder="Choose from a list here"
                  options={SERVICE_OPTIONS}
                  onChange={(v) => setForm((p) => ({ ...p, service: v }))}
                />
              </NumberField>

              <NumberField n="06" label="What have you budgeted for this project?">
                <Dropdown
                  value={form.budget}
                  placeholder="Choose from a list here"
                  options={BUDGET_OPTIONS}
                  onChange={(v) => setForm((p) => ({ ...p, budget: v }))}
                />
              </NumberField>

              <NumberField n="07" label="Tell us about your project" error={errors.message}>
                <textarea
                  style={{ ...fieldInputStyle, resize: "vertical", minHeight: 60 }}
                  placeholder="Please type your project description"
                  rows={2}
                  value={form.message}
                  onChange={set("message")}
                />
              </NumberField>

              {submitError && (
                <p style={{ color: "#E2725B", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "0.9rem 1.75rem",
                  borderRadius: 999,
                  border: "1.5px solid #F5F5F5",
                  background: "transparent",
                  color: "#F5F5F5",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.6 : 1,
                  transition: "background 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (submitting) return;
                  e.currentTarget.style.background = "var(--color-brand-orange)";
                  e.currentTarget.style.borderColor = "var(--color-brand-orange)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "#F5F5F5";
                }}
              >
                {submitting ? "Sending…" : "Send Message"} <ArrowUpRight size={15} />
              </button>
            </div>

            {/* Sidebar */}
            <div>
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(245,245,245,0.45)",
                  marginBottom: "0.75rem",
                }}
              >
                Call Us
              </p>
              <a href={`tel:${PHONE_CLEAN}`} style={{ display: "block", color: "#F5F5F5", fontSize: "0.9375rem", marginBottom: "0.35rem", textDecoration: "none" }}>
                {PHONE}
              </a>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ display: "block", color: "var(--color-brand-green)", fontSize: "0.9375rem", marginBottom: "2rem", textDecoration: "none" }}>
                WhatsApp us →
              </a>

              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(245,245,245,0.45)",
                  marginBottom: "0.75rem",
                }}
              >
                Email
              </p>
              <a href={`mailto:${EMAIL}`} style={{ display: "block", color: "#F5F5F5", fontSize: "0.9375rem", marginBottom: "2rem", textDecoration: "none" }}>
                {EMAIL}
              </a>

              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(245,245,245,0.45)",
                  marginBottom: "0.75rem",
                }}
              >
                Address
              </p>
              <p style={{ color: "#F5F5F5", fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                Nairobi, Kenya
                <br />
                Serving East Africa &amp; beyond
              </p>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      border: "1px solid rgba(245,245,245,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#F5F5F5",
                    }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </form>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .contact-top-grid { grid-template-columns: 1fr !important; }
          .contact-form-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </main>
  );
}
