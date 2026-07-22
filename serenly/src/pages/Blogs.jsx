// src/pages/Blogs.jsx
// Serenly — Blog / Insights Page
// Design: Inch-perfect GutenVerse magazine layout in Serenly brand system
// SEO: 10 posts targeting high-intent Kenya digital marketing keywords
// Sections:
//   1. Hero banner (page header)
//   2. Featured post — GutenVerse dark card + image split hero
//   3. "Latest Insights" — 3-col post grid  (GutenVerse "Latest Stories")
//   4. Load More button
//   5. "Staff's Picks" editorial strip

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ALL_POSTS, STAFF_PICKS, CATEGORIES } from "../data/blogPosts";

/* ─── Utilities ─── */
function useFadeIn(threshold = 0.1) {
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

function SectionTag({ label, color = "orange" }) {
  return (
    <span className={`section-tag section-tag-${color}`}>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          display: "inline-block",
          background:
            color === "orange"
              ? "var(--color-brand-orange)"
              : "var(--color-brand-blue)",
        }}
      />
      {label}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function Blogs() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const openPost = (post) => navigate(`/blogs/${post.slug}`);

  const nonFeatured = ALL_POSTS.filter((p) => !p.featured);
  const filtered =
    activeCategory === "All"
      ? nonFeatured
      : nonFeatured.filter((p) => p.category === activeCategory);
  const shown = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div
      style={{
        background: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
        overflowX: "hidden",
      }}
    >
      <HeroBanner />
      <FeaturedPost post={ALL_POSTS[0]} onOpen={() => openPost(ALL_POSTS[0])} />
      <LatestInsights
        posts={shown}
        categories={CATEGORIES}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        hasMore={hasMore}
        loadMore={() => setVisibleCount((v) => v + 3)}
        onOpen={openPost}
      />
      <StaffPicks posts={STAFF_PICKS} onOpen={openPost} />
    </div>
  );
}

/* ══════ 1. HERO BANNER ══════ */
function HeroBanner() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "clamp(260px, 35vh, 380px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--color-bg-inverse)",
      }}
    >
      <div
        className="bg-line-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.15 }}
      />
      <div
        className="glow-orange"
        style={{
          position: "absolute",
          width: 500,
          height: 300,
          top: "-20%",
          left: "5%",
          opacity: 0.3,
        }}
      />
      <div
        className="glow-blue"
        style={{
          position: "absolute",
          width: 400,
          height: 300,
          bottom: "-20%",
          right: "8%",
          opacity: 0.25,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.7s ease",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-brand-orange)",
            marginBottom: "0.875rem",
          }}
        >
          Insights & Strategies
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "var(--color-neutral-0)",
            lineHeight: 1.05,
            marginBottom: "1rem",
          }}
        >
          The Serenly <span className="text-gradient-orange">Blog</span>
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
            color: "rgba(245,245,245,0.45)",
          }}
        >
          <Link
            to="/"
            style={{ color: "rgba(245,245,245,0.45)", textDecoration: "none" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-brand-orange)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(245,245,245,0.45)")
            }
          >
            Serenly
          </Link>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span style={{ color: "var(--color-brand-orange)" }}>Blog</span>
        </div>
      </div>
    </section>
  );
}

/* ══════ 2. FEATURED POST — GutenVerse dark card + image split ══════ */
function FeaturedPost({ post, onOpen }) {
  const [ref, visible] = useFadeIn(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <section
      ref={ref}
      style={{ padding: "4rem 0", background: "var(--color-bg-secondary)" }}
    >
      <div className="container-site">
        {/* GutenVerse: dark background card with white text card LEFT + image RIGHT */}
        <div
          onClick={onOpen}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            borderRadius: "var(--radius-2xl)",
            overflow: "hidden",
            cursor: "pointer",
            boxShadow: hovered ? "var(--shadow-xl)" : "var(--shadow-lg)",
            transform: hovered ? "translateY(-3px)" : "translateY(0)",
            transition: "all 0.35s var(--ease-spring)",
            opacity: visible ? 1 : 0,
            transitionDelay: "0ms",
          }}
          className="featured-grid"
        >
          {/* LEFT — white card (GutenVerse style) */}
          <div
            style={{
              background: "var(--color-surface)",
              padding: "clamp(2rem, 4vw, 3.5rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              borderLeft: "4px solid var(--color-brand-orange)",
            }}
          >
            {/* Meta row — GutenVerse: date · tag · comments */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.72rem",
                color: "var(--color-text-tertiary)",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
                flexWrap: "wrap",
              }}
            >
              <span>{post.date}</span>
              <span style={{ color: "var(--color-border-strong)" }}>·</span>
              <span style={{ color: "var(--color-brand-orange)" }}>
                Featured
              </span>
              <span style={{ color: "var(--color-border-strong)" }}>·</span>
              <span>{post.readTime}</span>
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                lineHeight: 1.2,
                color: "var(--color-text-primary)",
                marginBottom: "1.1rem",
                transition: "color 0.2s ease",
                ...(hovered ? { color: "var(--color-brand-orange)" } : {}),
              }}
            >
              {post.title}
            </h2>

            {/* Divider — GutenVerse red line under title */}
            <div
              style={{
                width: 40,
                height: 3,
                borderRadius: 2,
                background:
                  "linear-gradient(90deg, var(--color-brand-orange), var(--color-brand-blue))",
                marginBottom: "1.25rem",
              }}
            />

            <p
              style={{
                fontSize: "0.975rem",
                lineHeight: 1.8,
                color: "var(--color-text-secondary)",
                marginBottom: "2rem",
              }}
            >
              {post.excerpt}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--color-brand-orange)",
              }}
            >
              Read More
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{
                  animation: hovered
                    ? "bounce-x 1.4s ease-in-out infinite"
                    : "none",
                }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            {/* Category tag */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                right: "1.5rem",
              }}
            >
              <span
                className="section-tag section-tag-orange"
                style={{ fontSize: "0.6rem" }}
              >
                {post.category}
              </span>
            </div>
          </div>

          {/* RIGHT — image */}
          <div
            style={{ position: "relative", overflow: "hidden", minHeight: 320 }}
          >
            <img
              src={post.img}
              alt={post.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.6s ease",
                transform: hovered ? "scale(1.04)" : "scale(1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.2), transparent 60%)",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){ .featured-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ══════ 3. LATEST INSIGHTS — GutenVerse 3-col grid ══════ */
function LatestInsights({
  posts,
  categories,
  activeCategory,
  setActiveCategory,
  hasMore,
  loadMore,
  onOpen,
}) {
  const [ref, visible] = useFadeIn(0.05);

  return (
    <section ref={ref} style={{ padding: "var(--spacing-section) 0" }}>
      <div className="container-site">
        {/* GutenVerse section header: eyebrow + large serif heading */}
        <div style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-text-tertiary)",
              marginBottom: "0.6rem",
            }}
          >
            Browse and read the latest stuff
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
              }}
            >
              Latest <span className="text-gradient-orange">Insights</span>
            </h2>

            {/* Category filter pills */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
              className="cat-filters"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                  }}
                  style={{
                    padding: "0.4rem 1rem",
                    borderRadius: "var(--radius-full)",
                    border: "1.5px solid",
                    borderColor:
                      activeCategory === cat
                        ? "var(--color-brand-orange)"
                        : "var(--color-border)",
                    background:
                      activeCategory === cat
                        ? "rgba(254,122,54,0.1)"
                        : "transparent",
                    color:
                      activeCategory === cat
                        ? "var(--color-brand-orange)"
                        : "var(--color-text-tertiary)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3-col post grid — GutenVerse style */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            marginBottom: "3.5rem",
          }}
          className="posts-grid"
        >
          {posts.map((post, i) => (
            <PostCard
              key={post.id}
              post={post}
              index={i}
              visible={visible}
              onOpen={onOpen}
            />
          ))}
        </div>

        {/* GutenVerse "More Posts" centred pill button */}
        {hasMore && (
          <div style={{ textAlign: "center" }}>
            <button
              onClick={loadMore}
              className="btn btn-primary btn-lg"
              style={{ borderRadius: "var(--radius-full)" }}
            >
              More Posts
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media(max-width:900px){ .posts-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:580px){ .posts-grid { grid-template-columns: 1fr !important; } }
        @media(max-width:768px){ .cat-filters { display: none; } }
      `}</style>
    </section>
  );
}

/* ─── Single Post Card — GutenVerse card ─── */
function PostCard({ post, index, visible, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onClick={() => onOpen(post)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.55s ease ${index * 0.08}s`,
        ...(hovered
          ? {
              borderColor: "rgba(254,122,54,0.35)",
              boxShadow: "var(--shadow-orange)",
              transform: "translateY(-5px)",
            }
          : {}),
      }}
    >
      {/* Image — GutenVerse full-width top image */}
      <div
        style={{
          overflow: "hidden",
          aspectRatio: "16/10",
          position: "relative",
        }}
      >
        <img
          src={post.img}
          alt={post.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        {/* Category badge overlay */}
        <div
          style={{
            position: "absolute",
            top: "0.875rem",
            left: "0.875rem",
          }}
        >
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.25rem 0.65rem",
              borderRadius: "var(--radius-full)",
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(8px)",
              color: "var(--color-brand-orange)",
              border: "1px solid rgba(254,122,54,0.3)",
            }}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem" }}>
        {/* GutenVerse: date · tags meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--color-text-tertiary)",
            marginBottom: "0.875rem",
            flexWrap: "wrap",
          }}
        >
          <span>{post.date}</span>
          <span>·</span>
          {post.tags.slice(0, 2).map((tag, i) => (
            <React.Fragment key={tag}>
              {i > 0 && <span>,</span>}
              <span style={{ color: "var(--color-brand-orange)" }}>{tag}</span>
            </React.Fragment>
          ))}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
            lineHeight: 1.3,
            marginBottom: "0.5rem",
            color: hovered
              ? "var(--color-brand-orange)"
              : "var(--color-text-primary)",
            transition: "color 0.2s ease",
          }}
        >
          {post.title}
        </h3>

        {/* GutenVerse: small orange underline after title */}
        <div
          style={{
            width: 32,
            height: 2,
            borderRadius: 1,
            background: "var(--color-brand-orange)",
            marginBottom: "0.875rem",
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 0.2s ease, width 0.3s ease",
            ...(hovered ? { width: 48 } : {}),
          }}
        />

        <p
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.72,
            color: "var(--color-text-secondary)",
            marginBottom: "1.25rem",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>

        {/* GutenVerse: "READ MORE →" */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: hovered ? "0.75rem" : "0.4rem",
            fontSize: "0.78rem",
            fontWeight: 700,
            color: "var(--color-brand-orange)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            transition: "gap 0.2s ease",
          }}
        >
          Read More
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </article>
  );
}

/* ══════ 4. STAFF'S PICKS — GutenVerse editorial strip ══════ */
function StaffPicks({ posts, onOpen }) {
  const [ref, visible] = useFadeIn(0.1);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--color-bg-secondary)",
        padding: "var(--spacing-section) 0",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="container-site">
        {/* GutenVerse section header */}
        <div style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-text-tertiary)",
              marginBottom: "0.6rem",
            }}
          >
            You have to read this!
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
            }}
          >
            Editor's <span className="text-gradient-blue">Picks</span>
          </h2>
        </div>

        {/* Horizontal editorial cards — GutenVerse large landscape cards */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {posts.map((post, i) => (
            <EditorCard
              key={post.id}
              post={post}
              index={i}
              visible={visible}
              onOpen={onOpen}
              reverse={i % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorCard({ post, index, visible, onOpen, reverse }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onOpen(post)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: reverse ? "1fr 1.6fr" : "1.6fr 1fr",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.55s ease ${index * 0.12}s, border-color 0.25s, box-shadow 0.25s`,
        ...(hovered
          ? {
              borderColor: "rgba(0,70,255,0.3)",
              boxShadow: "var(--shadow-blue)",
            }
          : {}),
        minHeight: 200,
      }}
      className="editor-card"
    >
      {/* Image side */}
      <div
        style={{
          order: reverse ? 2 : 1,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={post.img}
          alt={post.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: reverse
              ? "linear-gradient(to left, rgba(0,0,0,0.2), transparent 60%)"
              : "linear-gradient(to right, rgba(0,0,0,0.2), transparent 60%)",
          }}
        />
      </div>

      {/* Content side */}
      <div
        style={{
          order: reverse ? 1 : 2,
          padding: "2rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderLeft: reverse ? "none" : "3px solid var(--color-brand-blue)",
          borderRight: reverse ? "3px solid var(--color-brand-blue)" : "none",
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-brand-blue)",
            marginBottom: "0.75rem",
            display: "block",
          }}
        >
          {post.category} · {post.readTime}
        </span>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
            lineHeight: 1.25,
            marginBottom: "0.875rem",
            color: hovered
              ? "var(--color-brand-blue)"
              : "var(--color-text-primary)",
            transition: "color 0.2s ease",
          }}
        >
          {post.title}
        </h3>

        <p
          style={{
            fontSize: "0.9rem",
            lineHeight: 1.75,
            color: "var(--color-text-secondary)",
            marginBottom: "1.25rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: hovered ? "0.75rem" : "0.4rem",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "var(--color-brand-blue)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            transition: "gap 0.2s ease",
          }}
        >
          Read More
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

