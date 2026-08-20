import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Mail,
  Phone,
  Building2,
  RefreshCw,
  Trash2,
  X,
  Circle,
  CheckCircle2,
  Archive,
  MessageSquareReply,
} from "lucide-react";
import { api } from "../../lib/api";

const STATUS_META = {
  new: { label: "New", color: "var(--color-brand-orange)", icon: Circle },
  read: { label: "Read", color: "var(--color-brand-blue)", icon: CheckCircle2 },
  replied: { label: "Replied", color: "var(--color-brand-green)", icon: MessageSquareReply },
  archived: { label: "Archived", color: "rgba(245,245,245,0.4)", icon: Archive },
};

const FILTERS = ["all", "new", "read", "replied", "archived"];

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }) + " · " + d.toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" });
}

export default function AdminContacts() {
  const [searchParams] = useSearchParams();
  const initialStatus = searchParams.get("status");
  const openId = searchParams.get("open");
  const didAutoOpen = useRef(false);

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState(
    initialStatus && FILTERS.includes(initialStatus) ? initialStatus : "all"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const load = useCallback(async (p = page, f = filter) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.contact.list({
        page: p,
        limit: 15,
        status: f === "all" ? undefined : f,
      });
      setItems(res.data);
      setTotal(res.total);
      setPages(res.pages || 1);
    } catch (err) {
      setError(err.message || "Couldn't load submissions.");
    } finally {
      setLoading(false);
    }
  }, [page, filter]);

  useEffect(() => {
    load(1, filter);
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    load(page, filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const openSubmission = async (item) => {
    setSelected(item);
    if (item.status === "new") {
      try {
        const res = await api.contact.get(item._id);
        setSelected(res.data);
        setItems((prev) => prev.map((i) => (i._id === item._id ? res.data : i)));
      } catch {
        // keep optimistic selection if refetch fails
      }
    }
  };

  // Deep-link support: open a specific submission (from ?open=<id>) once the
  // list has loaded. If it's present on the current page/filter, open it the
  // same way a click would; otherwise fetch it directly.
  useEffect(() => {
    if (!openId || didAutoOpen.current || loading) return;
    didAutoOpen.current = true;

    const inPage = items.find((i) => i._id === openId);
    if (inPage) {
      openSubmission(inPage);
      return;
    }

    (async () => {
      try {
        const res = await api.contact.get(openId);
        setSelected(res.data);
        setItems((prev) => prev.map((i) => (i._id === openId ? res.data : i)));
      } catch (err) {
        setError(err.message || "Couldn't load the requested submission.");
      }
    })();
  }, [openId, loading, items]);

  const updateStatus = async (id, status) => {
    try {
      const res = await api.contact.updateStatus(id, status);
      setItems((prev) => prev.map((i) => (i._id === id ? res.data : i)));
      setSelected((prev) => (prev && prev._id === id ? res.data : prev));
    } catch (err) {
      setError(err.message || "Couldn't update status.");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this submission permanently?")) return;
    try {
      await api.contact.remove(id);
      setItems((prev) => prev.filter((i) => i._id !== id));
      setTotal((t) => t - 1);
      if (selected?._id === id) setSelected(null);
    } catch (err) {
      setError(err.message || "Couldn't delete submission.");
    }
  };

  const newCount = items.filter((i) => i.status === "new").length;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.75rem" }}>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", margin: 0 }}>
          {total} total{newCount > 0 ? ` · ${newCount} new on this page` : ""}
        </p>
        <button
          type="button"
          onClick={() => load(page, filter)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "0.55rem 1rem",
            borderRadius: 8,
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            color: "var(--color-text-secondary)",
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            style={{
              padding: "0.45rem 1rem",
              borderRadius: 999,
              border: `1.5px solid ${filter === f ? "var(--color-brand-blue)" : "var(--color-border)"}`,
              background: filter === f ? "rgba(0,85,218,0.08)" : "var(--color-surface)",
              color: filter === f ? "var(--color-brand-blue)" : "var(--color-text-secondary)",
              fontSize: "0.8125rem",
              fontWeight: 700,
              textTransform: "capitalize",
              cursor: "pointer",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {error && (
        <div
          style={{
            padding: "0.9rem 1.1rem",
            borderRadius: 10,
            background: "rgba(226,114,91,0.1)",
            border: "1px solid rgba(226,114,91,0.3)",
            color: "#E2725B",
            fontSize: "0.875rem",
            marginBottom: "1.25rem",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1.3fr 1fr" : "1fr", gap: "1.5rem", alignItems: "start" }}>
        {/* List */}
        <div className="card" style={{ background: "var(--color-surface)", borderRadius: 14, overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "var(--color-text-tertiary)" }}>
              Loading submissions…
            </div>
          ) : items.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "var(--color-text-tertiary)" }}>
              No submissions{filter !== "all" ? ` with status "${filter}"` : ""} yet.
            </div>
          ) : (
            items.map((item) => {
              const meta = STATUS_META[item.status] || STATUS_META.new;
              const StatusIcon = meta.icon;
              const isActive = selected?._id === item._id;
              return (
                <button
                  key={item._id}
                  type="button"
                  onClick={() => openSubmission(item)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    borderBottom: "1px solid var(--color-border)",
                    background: isActive ? "var(--color-bg-tertiary)" : "transparent",
                    cursor: "pointer",
                    transition: "background 0.15s ease",
                  }}
                >
                  <StatusIcon size={16} style={{ color: meta.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                      <span style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-text-primary)" }}>
                        {item.name}
                      </span>
                      {item.service && (
                        <span style={{ fontSize: "0.7rem", color: "var(--color-text-tertiary)" }}>
                          · {item.service}
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.8125rem",
                        color: "var(--color-text-secondary)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.message}
                    </p>
                  </div>
                  <span style={{ fontSize: "0.7rem", color: "var(--color-text-tertiary)", whiteSpace: "nowrap", flexShrink: 0 }}>
                    {formatDate(item.createdAt)}
                  </span>
                </button>
              );
            })
          )}

          {pages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "1rem" }}>
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    border: "1px solid var(--color-border)",
                    background: p === page ? "var(--color-brand-blue)" : "var(--color-surface)",
                    color: p === page ? "#fff" : "var(--color-text-secondary)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="card" style={{ background: "var(--color-surface)", borderRadius: 14, padding: "1.75rem", position: "sticky", top: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", marginBottom: 4, color: "var(--color-text-primary)" }}>
                  {selected.name}
                </h2>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)" }}>
                  {formatDate(selected.createdAt)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-tertiary)" }}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
              <a href={`mailto:${selected.email}`} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.875rem", color: "var(--color-text-secondary)", textDecoration: "none" }}>
                <Mail size={14} /> {selected.email}
              </a>
              <a href={`tel:${selected.phone}`} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.875rem", color: "var(--color-text-secondary)", textDecoration: "none" }}>
                <Phone size={14} /> {selected.phone}
              </a>
              {selected.company && (
                <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                  <Building2 size={14} /> {selected.company}
                </span>
              )}
            </div>

            {(selected.service || selected.budget) && (
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                {selected.service && (
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.35rem 0.75rem", borderRadius: 999, background: "rgba(0,85,218,0.08)", color: "var(--color-brand-blue)" }}>
                    {selected.service}
                  </span>
                )}
                {selected.budget && (
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.35rem 0.75rem", borderRadius: 999, background: "rgba(91,126,60,0.1)", color: "var(--color-brand-green)" }}>
                    {selected.budget}
                  </span>
                )}
              </div>
            )}

            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "var(--color-text-primary)",
                background: "var(--color-bg-tertiary)",
                borderRadius: 10,
                padding: "1rem 1.1rem",
                marginBottom: "1.5rem",
                whiteSpace: "pre-wrap",
              }}
            >
              {selected.message}
            </p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {selected.status !== "replied" && (
                <button
                  type="button"
                  onClick={() => updateStatus(selected._id, "replied")}
                  style={{ flex: 1, minWidth: 120, padding: "0.65rem 1rem", borderRadius: 8, border: "none", background: "var(--color-brand-green)", color: "#fff", fontSize: "0.8125rem", fontWeight: 700, cursor: "pointer" }}
                >
                  Mark replied
                </button>
              )}
              {selected.status !== "archived" && (
                <button
                  type="button"
                  onClick={() => updateStatus(selected._id, "archived")}
                  style={{ flex: 1, minWidth: 120, padding: "0.65rem 1rem", borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-secondary)", fontSize: "0.8125rem", fontWeight: 700, cursor: "pointer" }}
                >
                  Archive
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(selected._id)}
                style={{ padding: "0.65rem 1rem", borderRadius: 8, border: "1px solid rgba(226,114,91,0.3)", background: "rgba(226,114,91,0.08)", color: "#E2725B", fontSize: "0.8125rem", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
