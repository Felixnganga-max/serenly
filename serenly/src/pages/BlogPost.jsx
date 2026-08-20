// src/pages/BlogPost.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { api } from "../lib/api";
import { Reveal, ParallaxLayer } from "../components/Parallax";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "");
const resolveImage = (url) => (!url ? null : url.startsWith("http") ? url : `${API_ORIGIN}${url}`);

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" });
}

function ContentBlock({ block, index }) {
  switch (block.type) {
    case "heading": {
      const Tag = block.level === 3 ? "h3" : "h2";
      return (
        <Reveal type="up">
          <Tag style={{ marginTop: "2.5rem", marginBottom: "1rem" }}>{block.text}</Tag>
        </Reveal>
      );
    }
    case "image":
      return (
        <Reveal type="scale" className="not-prose" style={{ margin: "2.5rem calc(50% - 50vw)" }}>
          <figure style={{ maxWidth: 1100, marginInline: "auto" }}>
            <div style={{ borderRadius: 18, overflow: "hidden" }}>
              <ParallaxLayer speed={index % 2 === 0 ? 30 : -20}>
                <img
                  src={resolveImage(block.url)}
                  alt={block.alt || ""}
                  style={{ width: "100%", maxHeight: 560, objectFit: "cover", display: "block" }}
                />
              </ParallaxLayer>
            </div>
            {block.caption && (
              <figcaption
                style={{
                  textAlign: "center",
                  fontSize: "0.8125rem",
                  color: "var(--color-text-tertiary)",
                  marginTop: "0.75rem",
                }}
              >
                {block.caption}
              </figcaption>
            )}
          </figure>
        </Reveal>
      );
    case "quote":
      return (
        <Reveal type="left">
          <blockquote
            style={{
              margin: "2.5rem 0",
              padding: "0.5rem 0 0.5rem 1.5rem",
              borderLeft: "3px solid var(--color-brand-orange)",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "1.35rem",
              lineHeight: 1.6,
              color: "var(--color-text-primary)",
            }}
          >
            {block.text}
            {block.caption && (
              <cite
                style={{
                  display: "block",
                  marginTop: "0.75rem",
                  fontFamily: "var(--font-body)",
                  fontStyle: "normal",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  color: "var(--color-text-tertiary)",
                }}
              >
                — {block.caption}
              </cite>
            )}
          </blockquote>
        </Reveal>
      );
    case "paragraph":
    default:
      return (
        <p style={{ fontSize: "1.0625rem", lineHeight: 1.9, color: "var(--color-text-secondary)", marginBottom: "1.5rem" }}>
          {block.text}
        </p>
      );
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api.posts
      .getBySlug(slug)
      .then((res) => setPost(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-tertiary)" }}>
        Loading article…
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", padding: "2rem" }}>
        <h2>Article not found</h2>
        <Link to="/blogs" className="btn btn-primary btn-md">
          Back to Blog
        </Link>
      </div>
    );
  }

  const cover = resolveImage(post.coverImage);

  return (
    <main>
      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {cover && (
          <div style={{ position: "relative", height: "56vh", minHeight: 340, overflow: "hidden" }}>
            <ParallaxLayer speed={90} style={{ position: "absolute", inset: "-10% 0", height: "120%" }}>
              <img src={cover} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </ParallaxLayer>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, var(--color-bg-primary) 0%, rgba(46,41,16,0.25) 55%, rgba(46,41,16,0.15) 100%)",
              }}
            />
          </div>
        )}

        <div className="container-site" style={{ position: "relative", marginTop: cover ? -110 : "5rem", paddingBottom: "2rem" }}>
          <Reveal type="up">
            <Link
              to="/blogs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.8125rem",
                fontWeight: 700,
                color: cover ? "#F5F5F5" : "var(--color-text-secondary)",
                textDecoration: "none",
                marginBottom: "1.25rem",
              }}
            >
              <ArrowLeft size={14} /> Back to Blog
            </Link>

            <span className="section-tag section-tag-orange" style={{ marginBottom: "1rem" }}>
              {post.category}
            </span>

            <h1
              style={{
                maxWidth: 900,
                marginBottom: "1.25rem",
                color: cover ? "#F5F5F5" : "var(--color-text-primary)",
                textShadow: cover ? "0 2px 30px rgba(0,0,0,0.35)" : "none",
              }}
            >
              {post.title}
            </h1>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5rem",
                fontSize: "0.875rem",
                color: cover ? "rgba(245,245,245,0.85)" : "var(--color-text-tertiary)",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <User size={14} /> {post.author}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Calendar size={14} /> {formatDate(post.publishedAt || post.createdAt)}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Clock size={14} /> {post.readTime} min read
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <article className="container-site" style={{ maxWidth: 780, marginInline: "auto", padding: "3rem 1.5rem 6rem" }}>
        {post.excerpt && (
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.35rem",
              lineHeight: 1.6,
              color: "var(--color-text-primary)",
              marginBottom: "2.5rem",
            }}
          >
            {post.excerpt}
          </p>
        )}

        {(post.content || []).map((block, i) => (
          <ContentBlock key={block._id || i} block={block} index={i} />
        ))}

        {post.tags?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--color-border)" }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  padding: "0.35rem 0.8rem",
                  borderRadius: 999,
                  background: "var(--color-bg-tertiary)",
                  color: "var(--color-text-secondary)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}
