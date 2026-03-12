import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import assets from "../assets/assets";

/* ── Shared check-list item ── */
function Bullet({ text }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.625rem",
        marginBottom: "0.75rem",
      }}
    >
      <CheckCircle2
        size={17}
        style={{ color: "#FE7A36", flexShrink: 0, marginTop: 2 }}
      />
      <span
        style={{
          fontSize: "0.9375rem",
          color: "var(--color-text-secondary)",
          lineHeight: 1.65,
        }}
      >
        {text}
      </span>
    </li>
  );
}

/* ── Generic product section layout ── */
function ProductSection({
  id,
  href,
  tag,
  tagColor = "orange",
  headline,
  headlineAccent,
  accentPosition = "after",
  body,
  bullets,
  ctaLabel,
  image,
  reverse = false,
  bgVariant = "primary",
}) {
  const tagClass =
    tagColor === "blue" ? "section-tag-blue" : "section-tag-orange";

  return (
    <section
      id={id}
      className="section-padding"
      style={{
        background:
          bgVariant === "secondary"
            ? "var(--color-bg-secondary)"
            : "var(--color-bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        className={tagColor === "blue" ? "glow-blue" : "glow-orange"}
        style={{
          width: "40vw",
          height: "40vw",
          opacity: 0.55,
          ...(reverse
            ? { bottom: "-20%", left: "-10%" }
            : { top: "-20%", right: "-10%" }),
        }}
      />

      <div
        className="container-site"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="prod-grid"
        >
          {/* TEXT side */}
          <div
            style={{ order: reverse ? 2 : 1 }}
            className={reverse ? "prod-text-r" : "prod-text-l"}
          >
            <div
              className={`section-tag ${tagClass} animate-fade-up`}
              style={{ marginBottom: "1.25rem" }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: tagColor === "blue" ? "#0046FF" : "#FE7A36",
                  display: "inline-block",
                }}
              />
              {tag}
            </div>

            <h2
              className="animate-fade-up delay-100"
              style={{ marginBottom: "1.125rem" }}
            >
              {accentPosition === "before" ? (
                <>
                  <span
                    className={
                      tagColor === "blue"
                        ? "text-gradient-blue"
                        : "text-gradient-orange"
                    }
                  >
                    {headlineAccent}
                  </span>{" "}
                  {headline}
                </>
              ) : (
                <>
                  {headline}{" "}
                  <span
                    className={
                      tagColor === "blue"
                        ? "text-gradient-blue"
                        : "text-gradient-orange"
                    }
                  >
                    {headlineAccent}
                  </span>
                </>
              )}
            </h2>

            <p
              className="animate-fade-up delay-200"
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                maxWidth: 460,
                marginBottom: "1.5rem",
              }}
            >
              {body}
            </p>

            <ul
              style={{ listStyle: "none", padding: 0, marginBottom: "2rem" }}
              className="animate-fade-up delay-300"
            >
              {bullets.map((b) => (
                <Bullet key={b} text={b} />
              ))}
            </ul>

            <a
              href={href}
              className="btn btn-primary btn-lg animate-fade-up delay-400"
              style={{ borderRadius: 10, display: "inline-flex" }}
            >
              {ctaLabel} <ArrowRight size={17} strokeWidth={2.5} />
            </a>
          </div>

          {/* VISUAL side */}
          <div
            style={{
              order: reverse ? 1 : 2,
              display: "flex",
              justifyContent: "stretch",
              alignItems: "stretch",
            }}
            className={reverse ? "prod-vis-r" : "prod-vis-l"}
          >
            <img
              src={image}
              alt={tag}
              className="animate-fade-up delay-200"
              style={{
                width: "100%",
                height: "100%",
                minHeight: 420,
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .prod-grid{grid-template-columns:1fr !important; gap:2.5rem !important;}
          .prod-text-r,.prod-text-l{order:2 !important;}
          .prod-vis-r,.prod-vis-l{order:1 !important;}
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════
   EXPORT — all 4 product sections
══════════════════════════════════════════════ */
export default function ProductSections() {
  return (
    <>
      {/* 1 ── BRANDING */}
      <ProductSection
        id="branding"
        href="/branding"
        tag="Brand Identity & Strategy"
        tagColor="orange"
        headline="A Brand That"
        headlineAccent="Commands Attention."
        accentPosition="after"
        body="Your brand is more than a logo — it's the first impression, the lasting memory, and the reason customers choose you over competitors. Serenly crafts compelling brand identities that communicate your values, resonate with your audience, and stand out in crowded markets."
        bullets={[
          "Brand strategy, positioning & messaging that converts",
          "Logo design, visual identity & brand guidelines",
          "Brand voice, tone & content personality development",
          "Competitive analysis & market positioning research",
        ]}
        ctaLabel="Explore Branding Services"
        image={assets.brand}
        reverse={false}
        bgVariant="primary"
      />

      {/* 2 ── SMM */}
      <ProductSection
        id="smm"
        href="/smm"
        tag="Social Media Marketing"
        tagColor="blue"
        headline="Turn Followers Into"
        headlineAccent="Paying Customers."
        accentPosition="after"
        body="Social media is where your audience lives — and Serenly makes sure your brand shows up, stands out, and converts. We manage end-to-end social media strategies across Instagram, Facebook, TikTok, LinkedIn, and X, creating content that sparks engagement and drives real business results."
        bullets={[
          "Full social media management & content calendar planning",
          "Scroll-stopping creative content — graphics, reels & copy",
          "Paid social advertising with precision audience targeting",
          "Monthly analytics reports with actionable growth insights",
        ]}
        ctaLabel="Explore SMM Services"
        image={assets.social}
        reverse={true}
        bgVariant="secondary"
      />

      {/* 3 ── SEO */}
      <ProductSection
        id="seo"
        href="/seo"
        tag="SEO Optimization"
        tagColor="orange"
        headline="Rank Higher."
        headlineAccent="Get Found. Grow Faster."
        accentPosition="after"
        body="What good is a great website if no one finds it? Serenly's SEO experts build search strategies that get your business ranking on page one for keywords your customers are already searching — driving consistent, high-intent organic traffic that turns into leads and revenue."
        bullets={[
          "Comprehensive SEO audits, keyword research & gap analysis",
          "On-page optimisation — meta, content, schema & site speed",
          "High-authority link building & off-page SEO campaigns",
          "Local SEO for Nairobi, Kenya & African markets",
        ]}
        ctaLabel="Explore SEO Services"
        image={assets.seo}
        reverse={false}
        bgVariant="primary"
      />

      {/* 4 ── WEB DEV */}
      <ProductSection
        id="web-dev"
        href="/web-dev"
        tag="Website & Software Development"
        tagColor="blue"
        headline="Websites That"
        headlineAccent="Work While You Sleep."
        accentPosition="after"
        body="A beautiful website is your best salesperson — available 24/7, converting visitors into clients while you focus on running your business. Serenly builds fast, secure, and scalable websites and custom software solutions tailored to your business goals and built to grow with you."
        bullets={[
          "Custom website design & development — built to convert",
          "E-commerce stores, booking systems & client portals",
          "Mobile-first, lightning-fast & SEO-ready from launch",
          "Ongoing maintenance, hosting & technical support",
        ]}
        ctaLabel="Explore Web Development"
        image={assets.websites}
        reverse={true}
        bgVariant="secondary"
      />
    </>
  );
}
