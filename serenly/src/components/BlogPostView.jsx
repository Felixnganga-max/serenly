// src/components/BlogPostView.jsx
// Full article reader — used by the /blogs/:slug route
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function BlogPostView({ post, onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div style={{ background: "var(--color-bg-primary)", minHeight: "100vh" }}>
      {/* Post hero */}
      <div
        style={{
          position: "relative",
          height: "clamp(320px, 45vh, 480px)",
          overflow: "hidden",
        }}
      >
        <img
          src={post.img}
          alt={post.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(12,12,14,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: 0,
            right: 0,
          }}
        >
          <div className="container-site">
            <button
              onClick={onBack}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "rgba(245,245,245,0.6)",
                background: "none",
                border: "none",
                cursor: "pointer",
                marginBottom: "1rem",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-brand-orange)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(245,245,245,0.6)")
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to Blog
            </button>
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-brand-orange)",
                background: "rgba(239, 105, 5,0.15)",
                border: "1px solid rgba(239, 105, 5,0.3)",
                padding: "0.25rem 0.75rem",
                borderRadius: "var(--radius-full)",
                marginBottom: "1rem",
                display: "inline-block",
              }}
            >
              {post.category}
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                color: "#f5f5f5",
                lineHeight: 1.15,
                maxWidth: 720,
              }}
            >
              {post.title}
            </h1>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "0.875rem",
                fontSize: "0.78rem",
                color: "rgba(245,245,245,0.5)",
                fontWeight: 600,
              }}
            >
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div
        className="container-site"
        style={{ paddingTop: "4rem", paddingBottom: "6rem" }}
      >
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          {/* Lead */}
          <p
            style={{
              fontSize: "1.15rem",
              lineHeight: 1.85,
              color: "var(--color-text-secondary)",
              marginBottom: "2rem",
              borderLeft: "3px solid var(--color-brand-orange)",
              paddingLeft: "1.5rem",
              fontStyle: "italic",
            }}
          >
            {post.excerpt}
          </p>

          {/* Body content */}
          <div
            style={{
              fontSize: "1rem",
              lineHeight: 1.85,
              color: "var(--color-text-secondary)",
            }}
          >
            {post.content.split("\n\n").map((para, i) => {
              if (para.startsWith("**") && para.endsWith("**")) {
                return (
                  <h3
                    key={i}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.35rem",
                      color: "var(--color-text-primary)",
                      marginTop: "2.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {para.replace(/\*\*/g, "")}
                  </h3>
                );
              }
              if (para.includes("**")) {
                const parts = para.split(/\*\*(.*?)\*\*/g);
                return (
                  <p key={i} style={{ marginBottom: "1.25rem" }}>
                    {parts.map((part, j) =>
                      j % 2 === 1 ? (
                        <strong
                          key={j}
                          style={{
                            color: "var(--color-text-primary)",
                            fontWeight: 700,
                          }}
                        >
                          {part}
                        </strong>
                      ) : (
                        part
                      ),
                    )}
                  </p>
                );
              }
              return (
                <p key={i} style={{ marginBottom: "1.25rem" }}>
                  {para}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--color-border)",
            }}
          >
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "var(--color-text-tertiary)",
                marginRight: "0.5rem",
              }}
            >
              Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  padding: "0.3rem 0.75rem",
                  borderRadius: "var(--radius-full)",
                  background: "var(--color-bg-tertiary)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: "3rem",
              background:
                "linear-gradient(135deg, rgba(239, 105, 5,0.08), rgba(0, 85, 218,0.06))",
              border: "1px solid rgba(239, 105, 5,0.2)",
              borderRadius: "var(--radius-xl)",
              padding: "2rem 2.5rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                color: "var(--color-text-primary)",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              Ready to put this into action for your business?
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--color-text-secondary)",
                marginBottom: "1.5rem",
              }}
            >
              Serenly helps businesses across Kenya grow with strategy-first
              digital marketing.
            </p>
            <Link to="/contact" className="btn btn-primary btn-md">
              Get a Free Consultation
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <button
            onClick={onBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "2.5rem",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--color-text-tertiary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-brand-orange)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-tertiary)")
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to all posts
          </button>
        </div>
      </div>
    </div>
  );
}
