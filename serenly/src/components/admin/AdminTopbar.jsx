import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Sun, Moon, Bell, Mail, Briefcase, FileText, Loader2 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { api } from "../../lib/api";

const TITLES = [
  { match: /^\/admin\/contacts/, title: "Contacts" },
  { match: /^\/admin\/projects/, title: "Projects" },
  { match: /^\/admin\/blog\/new/, title: "New Blog Post" },
  { match: /^\/admin\/blog\/.+\/edit/, title: "Edit Blog Post" },
  { match: /^\/admin\/blog/, title: "Blog Posts" },
  { match: /^\/admin$/, title: "Overview" },
];

function titleForPath(pathname) {
  const found = TITLES.find((t) => t.match.test(pathname));
  return found ? found.title : "Admin";
}

function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [pool, setPool] = useState(null);
  const boxRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const ensurePool = async () => {
    if (pool || loading) return;
    setLoading(true);
    try {
      const [contacts, projects, posts] = await Promise.all([
        api.contact.list({ limit: 100 }).catch(() => ({ data: [] })),
        api.projects.list({ limit: 100 }).catch(() => ({ data: [] })),
        api.posts.listAdmin({ limit: 100 }).catch(() => ({ data: [] })),
      ]);
      setPool({
        contacts: contacts.data || [],
        projects: projects.data || [],
        posts: posts.data || [],
      });
    } finally {
      setLoading(false);
    }
  };

  const q = query.trim().toLowerCase();
  const matches = (fields) => fields.some((f) => (f || "").toLowerCase().includes(q));

  const contactResults = q && pool ? pool.contacts.filter((c) => matches([c.name, c.email, c.company])).slice(0, 4) : [];
  const projectResults = q && pool ? pool.projects.filter((p) => matches([p.name, p.client])).slice(0, 4) : [];
  const postResults = q && pool ? pool.posts.filter((p) => matches([p.title, p.category])).slice(0, 4) : [];
  const hasResults = contactResults.length || projectResults.length || postResults.length;

  const go = (path) => {
    setOpen(false);
    setQuery("");
    navigate(path);
  };

  return (
    <div ref={boxRef} style={{ position: "relative", width: "100%", maxWidth: 340 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0.55rem 0.85rem",
          borderRadius: 10,
          border: "1.5px solid var(--color-border)",
          background: "var(--color-bg-tertiary)",
        }}
      >
        <Search size={15} style={{ color: "var(--color-text-tertiary)", flexShrink: 0 }} />
        <input
          value={query}
          onFocus={() => {
            setOpen(true);
            ensurePool();
          }}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search contacts, projects, posts…"
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "0.8125rem",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-body)",
          }}
        />
        {loading && <Loader2 size={14} className="animate-spin" style={{ color: "var(--color-text-tertiary)" }} />}
      </div>

      {open && q && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            boxShadow: "0 12px 32px rgba(0,0,0,0.14)",
            padding: "0.5rem",
            zIndex: 60,
            maxHeight: 360,
            overflowY: "auto",
          }}
        >
          {!hasResults && (
            <div style={{ padding: "1rem", textAlign: "center", fontSize: "0.8125rem", color: "var(--color-text-tertiary)" }}>
              {loading ? "Searching…" : "No matches"}
            </div>
          )}

          {contactResults.length > 0 && (
            <SearchGroup label="Contacts" icon={Mail}>
              {contactResults.map((c) => (
                <SearchRow key={c._id} title={c.name} sub={c.email} onClick={() => go(`/admin/contacts?open=${c._id}`)} />
              ))}
            </SearchGroup>
          )}

          {projectResults.length > 0 && (
            <SearchGroup label="Projects" icon={Briefcase}>
              {projectResults.map((p) => (
                <SearchRow key={p._id} title={p.name} sub={p.client} onClick={() => go(`/admin/projects?open=${p._id}`)} />
              ))}
            </SearchGroup>
          )}

          {postResults.length > 0 && (
            <SearchGroup label="Blog posts" icon={FileText}>
              {postResults.map((p) => (
                <SearchRow key={p._id} title={p.title} sub={p.status} onClick={() => go(`/admin/blog/${p._id}/edit`)} />
              ))}
            </SearchGroup>
          )}
        </div>
      )}
    </div>
  );
}

function SearchGroup({ label, icon, children }) {
  const Icon = icon;
  return (
    <div style={{ marginBottom: 6 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0.35rem 0.5rem",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "var(--color-text-tertiary)",
        }}
      >
        <Icon size={12} /> {label}
      </div>
      {children}
    </div>
  );
}

function SearchRow({ title, sub, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        display: "block",
        padding: "0.5rem 0.6rem",
        borderRadius: 8,
        border: "none",
        background: "transparent",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-bg-tertiary)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-text-primary)" }}>{title}</div>
      {sub && <div style={{ fontSize: "0.7rem", color: "var(--color-text-tertiary)" }}>{sub}</div>}
    </button>
  );
}

export default function AdminTopbar({ newContacts = 0 }) {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const title = titleForPath(location.pathname);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        padding: "1rem 1.75rem",
        background: "var(--color-surface-overlay)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.35rem",
          color: "var(--color-text-primary)",
          margin: 0,
          flexShrink: 0,
        }}
      >
        {title}
      </h1>

      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <GlobalSearch />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <button
          type="button"
          onClick={() => navigate("/admin/contacts?status=new")}
          aria-label="New contact submissions"
          title="New contact submissions"
          style={{
            position: "relative",
            width: 36,
            height: 36,
            borderRadius: 10,
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            color: "var(--color-text-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Bell size={16} />
          {newContacts > 0 && (
            <span
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                minWidth: 16,
                height: 16,
                padding: "0 3px",
                borderRadius: 999,
                background: "var(--color-brand-orange)",
                color: "#fff",
                fontSize: "0.6rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {newContacts > 9 ? "9+" : newContacts}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            color: "var(--color-text-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
