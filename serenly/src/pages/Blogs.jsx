// src/pages/Blogs.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { api } from "../lib/api";
import { Reveal, ParallaxLayer } from "../components/Parallax";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "");
const resolveImage = (url) => (!url ? null : url.startsWith("http") ? url : `${API_ORIGIN}${url}`);

const ACCENTS = ["orange", "blue", "green"];
const ACCENT_CLASS = {
  orange: { tag: "section-tag-orange", text: "text-brand-orange" },
  blue: { tag: "section-tag-blue", text: "text-brand-blue" },
  green: { tag: "section-tag-green", text: "text-brand-green" },
};

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" });
}

function PostCard({ post, index }) {
  const accent = ACCENT_CLASS[ACCENTS[index % ACCENTS.length]];
  const img = resolveImage(post.coverImage);

  return (
    <Reveal type="up" delay={(index % 3) * 0.08}>
      <Link to={`/blogs/${post.slug}`} className="group block h-full">
        <div className="relative aspect-[4/3] rounded-soft overflow-hidden mb-5 bg-bg-tertiary">
          {img ? (
            <img
              src={img}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-periwinkle to-brand-blue/20">
              <span className="font-display text-xl text-brand-blue">{post.category}</span>
            </div>
          )}
          <span className={`absolute top-4 left-4 section-tag ${accent.tag}`}>{post.category}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-text-tertiary mb-2.5">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} /> {formatDate(post.publishedAt || post.createdAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} /> {post.readTime} min
          </span>
        </div>
        <h3 className={`font-display text-xl leading-snug mb-2 text-foreground transition-colors group-hover:${accent.text}`}>
          {post.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
        <span className={`inline-flex items-center gap-1.5 text-sm font-bold ${accent.text}`}>
          Read more <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </Reveal>
  );
}

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    setLoading(true);
    api.posts
      .list({ limit: 24, category: category === "All" ? undefined : category })
      .then((res) => setPosts(res.data))
      .catch((err) => setError(err.message || "Couldn't load posts."))
      .finally(() => setLoading(false));
  }, [category]);

  const [allCategories, setAllCategories] = useState([]);
  useEffect(() => {
    api.posts
      .list({ limit: 100 })
      .then((res) => {
        const cats = Array.from(new Set(res.data.map((p) => p.category))).filter(Boolean);
        setAllCategories(cats);
      })
      .catch(() => {});
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6 lg:px-12 text-center">
        <ParallaxLayer
          speed={-40}
          className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(239,105,5,0.14) 0%, transparent 70%)", filter: "blur(30px)" }}
        />
        <ParallaxLayer
          speed={50}
          className="absolute -bottom-32 -right-24 w-[460px] h-[460px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(91,126,60,0.14) 0%, transparent 70%)", filter: "blur(30px)" }}
        />

        <Reveal type="up" className="relative max-w-2xl mx-auto">
          <span className="section-tag section-tag-blue mb-5">Insights &amp; Strategies</span>
          <h1 className="mb-5">
            The Serenly <span className="text-brand-orange">Blog</span>
          </h1>
          <p className="text-text-secondary leading-relaxed">
            Stories, playbooks, and hard-won lessons on building a brand people
            remember — from the team that lives it every day.
          </p>
        </Reveal>
      </section>

      {/* Category filters */}
      {allCategories.length > 0 && (
        <div className="container-site flex flex-wrap gap-2 justify-center mb-14 px-6">
          <button
            onClick={() => setCategory("All")}
            className={`px-4 py-2 rounded-pill text-sm font-bold border transition-colors ${
              category === "All"
                ? "bg-brand-orange border-brand-orange text-neutral-0"
                : "border-border text-text-secondary hover:border-brand-orange/50"
            }`}
          >
            All
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-pill text-sm font-bold border transition-colors ${
                category === cat
                  ? "bg-brand-orange border-brand-orange text-neutral-0"
                  : "border-border text-text-secondary hover:border-brand-orange/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <section className="container-site pb-28 px-6 lg:px-12">
        {error && (
          <p className="text-center text-sm mb-8" style={{ color: "#E2725B" }}>
            {error}
          </p>
        )}
        {loading ? (
          <div className="text-center text-text-tertiary py-20">Loading articles…</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-text-tertiary py-20">
            No articles published yet — check back soon.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {posts.map((post, i) => (
              <PostCard key={post._id} post={post} index={i} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
