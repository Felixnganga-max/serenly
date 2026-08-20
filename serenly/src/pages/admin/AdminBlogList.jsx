import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, Pencil, ImageOff } from "lucide-react";
import { api } from "../../lib/api";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "");

function resolveImage(url) {
  if (!url) return null;
  return url.startsWith("http") ? url : `${API_ORIGIN}${url}`;
}

const STATUS_STYLE = {
  draft: { bg: "rgba(0,85,218,0.08)", color: "var(--color-brand-blue)" },
  published: { bg: "rgba(91,126,60,0.1)", color: "var(--color-brand-green)" },
};

export default function AdminBlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    api.posts
      .listAdmin({ limit: 50 })
      .then((res) => setPosts(res.data))
      .catch((err) => setError(err.message || "Couldn't load posts."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const remove = async (id, title) => {
    if (!window.confirm(`Delete "${title}" permanently?`)) return;
    try {
      await api.posts.remove(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message || "Couldn't delete post.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.75rem" }}>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", margin: 0 }}>
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>
        <Link
          to="/admin/blog/new"
          className="btn btn-primary"
          style={{ borderRadius: 10, display: "inline-flex", alignItems: "center", gap: 8 }}
        >
          <Plus size={16} /> New Post
        </Link>
      </div>

      {error && (
        <div style={{ padding: "0.9rem 1.1rem", borderRadius: 10, background: "rgba(226,114,91,0.1)", border: "1px solid rgba(226,114,91,0.3)", color: "#E2725B", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
          {error}
        </div>
      )}

      <div className="card" style={{ background: "var(--color-surface)", borderRadius: 14, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--color-text-tertiary)" }}>Loading posts…</div>
        ) : posts.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--color-text-tertiary)" }}>
            No blog posts yet. Click "New Post" to write your first one.
          </div>
        ) : (
          posts.map((post) => {
            const statusStyle = STATUS_STYLE[post.status] || STATUS_STYLE.draft;
            const img = resolveImage(post.coverImage);
            return (
              <div
                key={post._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.1rem",
                  padding: "1rem 1.25rem",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <div style={{ width: 64, height: 48, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "var(--color-bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {img ? (
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <ImageOff size={16} style={{ color: "var(--color-text-tertiary)" }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-text-primary)" }}>
                      {post.title}
                    </span>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        padding: "0.15rem 0.5rem",
                        borderRadius: 999,
                        background: statusStyle.bg,
                        color: statusStyle.color,
                      }}
                    >
                      {post.status}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--color-text-tertiary)" }}>
                    {post.category} · /{post.slug}
                  </p>
                </div>
                <Link
                  to={`/admin/blog/${post._id}/edit`}
                  aria-label="Edit"
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid var(--color-border)", color: "var(--color-text-secondary)",
                  }}
                >
                  <Pencil size={14} />
                </Link>
                <button
                  type="button"
                  onClick={() => remove(post._id, post.title)}
                  aria-label="Delete"
                  style={{
                    width: 36, height: 36, borderRadius: 8, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid rgba(226,114,91,0.3)", background: "rgba(226,114,91,0.08)", color: "#E2725B",
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
