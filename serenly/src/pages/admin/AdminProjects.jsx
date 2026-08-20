import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Plus,
  X,
  Trash2,
  Briefcase,
  Calendar,
  Wallet,
  Circle,
  Loader,
  Eye,
  CheckCircle2,
  PauseCircle,
  Loader2,
} from "lucide-react";
import { api } from "../../lib/api";

const STATUS_META = {
  planning: { label: "Planning", color: "var(--color-brand-blue)", icon: Circle },
  "in-progress": { label: "In Progress", color: "var(--color-brand-orange)", icon: Loader },
  review: { label: "Review", color: "var(--color-brand-blue-light)", icon: Eye },
  completed: { label: "Completed", color: "var(--color-brand-green)", icon: CheckCircle2 },
  "on-hold": { label: "On Hold", color: "var(--color-text-tertiary)", icon: PauseCircle },
};

const STATUS_VALUES = Object.keys(STATUS_META);
const FILTER_VALUES = ["all", ...STATUS_VALUES];

const SERVICE_META = {
  "web-dev": "Web Development",
  smm: "Social Media Marketing",
  branding: "Branding",
  seo: "SEO",
  other: "Other",
};

const SERVICE_VALUES = Object.keys(SERVICE_META);

const EMPTY_FORM = {
  name: "",
  client: "",
  service: "web-dev",
  status: "planning",
  startDate: "",
  dueDate: "",
  budget: "",
  notes: "",
};

function formatDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" });
}

function toDateInputValue(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

const inputStyle = {
  width: "100%",
  padding: "0.65rem 0.85rem",
  borderRadius: 10,
  border: "1.5px solid var(--color-border)",
  background: "var(--color-bg-secondary)",
  color: "var(--color-text-primary)",
  fontSize: "0.875rem",
  fontFamily: "var(--font-body)",
  outline: "none",
  boxSizing: "border-box",
};

function Field({ label, required, error, children }) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "var(--color-text-secondary)",
          marginBottom: 6,
        }}
      >
        {label}
        {required && <span style={{ color: "var(--color-brand-orange)" }}> *</span>}
      </label>
      {children}
      {error && (
        <p style={{ color: "#E2725B", fontSize: "0.75rem", marginTop: 4, marginBottom: 0 }}>{error}</p>
      )}
    </div>
  );
}

function ProjectModal({ mode, form, setForm, errors, saving, modalError, onClose, onSubmit }) {
  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "1.5rem",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 480,
          maxHeight: "90vh",
          overflowY: "auto",
          background: "var(--color-surface)",
          borderRadius: 16,
          padding: "2rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", margin: 0, color: "var(--color-text-primary)" }}>
            {mode === "edit" ? "Edit Project" : "New Project"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-tertiary)" }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          <Field label="Name" required error={errors.name}>
            <input style={inputStyle} value={form.name} onChange={set("name")} placeholder="e.g. Serenly Website Revamp" />
          </Field>

          <Field label="Client" required error={errors.client}>
            <input style={inputStyle} value={form.client} onChange={set("client")} placeholder="e.g. Acme Ltd" />
          </Field>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <Field label="Service">
              <select style={{ ...inputStyle, cursor: "pointer" }} value={form.service} onChange={set("service")}>
                {SERVICE_VALUES.map((v) => (
                  <option key={v} value={v}>
                    {SERVICE_META[v]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Status">
              <select style={{ ...inputStyle, cursor: "pointer" }} value={form.status} onChange={set("status")}>
                {STATUS_VALUES.map((v) => (
                  <option key={v} value={v}>
                    {STATUS_META[v].label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <Field label="Start Date">
              <input type="date" style={inputStyle} value={form.startDate} onChange={set("startDate")} />
            </Field>
            <Field label="Due Date">
              <input type="date" style={inputStyle} value={form.dueDate} onChange={set("dueDate")} />
            </Field>
          </div>

          <Field label="Budget">
            <input style={inputStyle} value={form.budget} onChange={set("budget")} placeholder="e.g. KSh 150,000" />
          </Field>

          <Field label="Notes">
            <textarea
              style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
              rows={3}
              value={form.notes}
              onChange={set("notes")}
              placeholder="Any extra context about this project…"
            />
          </Field>

          {modalError && (
            <p style={{ color: "#E2725B", fontSize: "0.8125rem", margin: 0 }}>{modalError}</p>
          )}

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: "0.25rem" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "0.65rem 1.25rem",
                borderRadius: 10,
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-text-secondary)",
                fontSize: "0.8125rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0.65rem 1.25rem",
                borderRadius: 10,
                border: "none",
                background: "var(--color-brand-orange)",
                color: "#fff",
                fontSize: "0.8125rem",
                fontWeight: 700,
                cursor: saving ? "not-allowed" : "pointer",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Saving…
                </>
              ) : mode === "edit" ? (
                "Save Changes"
              ) : (
                "Create Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminProjects() {
  const [searchParams] = useSearchParams();
  const initialStatus = searchParams.get("status");
  const openId = searchParams.get("open");
  const didAutoOpen = useRef(false);

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState(
    initialStatus && STATUS_VALUES.includes(initialStatus) ? initialStatus : "all"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [modalMode, setModalMode] = useState(null); // null | "create" | "edit"
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [modalError, setModalError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async (p = page, f = filter) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.projects.list({
        page: p,
        limit: 15,
        status: f === "all" ? undefined : f,
      });
      setItems(res.data);
      setTotal(res.total);
      setPages(res.pages || 1);
    } catch (err) {
      setError(err.message || "Couldn't load projects.");
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

  const openCreateModal = () => {
    setForm(EMPTY_FORM);
    setFormErrors({});
    setModalError("");
    setEditingId(null);
    setModalMode("create");
  };

  const openEditModal = (project) => {
    setForm({
      name: project.name || "",
      client: project.client || "",
      service: SERVICE_VALUES.includes(project.service) ? project.service : "web-dev",
      status: STATUS_VALUES.includes(project.status) ? project.status : "planning",
      startDate: toDateInputValue(project.startDate),
      dueDate: toDateInputValue(project.dueDate),
      budget: project.budget || "",
      notes: project.notes || "",
    });
    setFormErrors({});
    setModalError("");
    setEditingId(project._id);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingId(null);
  };

  // Deep-link support: open a specific project (from ?open=<id>) once the list
  // has loaded. If it's present on the current page/filter, open it the same
  // way a click would; otherwise fetch it directly. Guarded to run once.
  useEffect(() => {
    if (!openId || didAutoOpen.current || loading) return;
    didAutoOpen.current = true;

    const inPage = items.find((i) => i._id === openId);
    if (inPage) {
      openEditModal(inPage);
      return;
    }

    (async () => {
      try {
        const res = await api.projects.get(openId);
        openEditModal(res.data);
      } catch (err) {
        setError(err.message || "Couldn't load the requested project.");
      }
    })();
  }, [openId, loading, items]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalError("");
    setFormErrors({});
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.startDate) delete payload.startDate;
      if (!payload.dueDate) delete payload.dueDate;

      if (editingId) {
        await api.projects.update(editingId, payload);
      } else {
        await api.projects.create(payload);
      }
      closeModal();
      load(page, filter);
    } catch (err) {
      if (err.errors) setFormErrors(err.errors);
      setModalError(err.message || "Couldn't save this project.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this project permanently?")) return;
    try {
      await api.projects.remove(id);
      setItems((prev) => prev.filter((i) => i._id !== id));
      setTotal((t) => Math.max(0, t - 1));
    } catch (err) {
      setError(err.message || "Couldn't delete project.");
    }
  };

  const isEmptyOverall = !loading && total === 0 && filter === "all";

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.75rem" }}>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", margin: 0 }}>
          {total === 0 ? "No projects yet" : `${total} project${total !== 1 ? "s" : ""}`}
        </p>
        <button
          type="button"
          onClick={openCreateModal}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "0.6rem 1.15rem",
            borderRadius: 10,
            border: "none",
            background: "var(--color-brand-orange)",
            color: "#fff",
            fontSize: "0.8125rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Plus size={15} /> New Project
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {FILTER_VALUES.map((f) => {
          const active = filter === f;
          const meta = f === "all" ? null : STATUS_META[f];
          const color = meta ? meta.color : "var(--color-brand-blue)";
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              style={{
                padding: "0.45rem 1rem",
                borderRadius: 999,
                border: `1.5px solid ${active ? color : "var(--color-border)"}`,
                background: active ? "var(--color-bg-tertiary)" : "var(--color-surface)",
                color: active ? color : "var(--color-text-secondary)",
                fontSize: "0.8125rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {f === "all" ? "All" : meta.label}
            </button>
          );
        })}
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

      <div className="card" style={{ background: "var(--color-surface)", borderRadius: 14, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--color-text-tertiary)" }}>
            Loading projects…
          </div>
        ) : isEmptyOverall ? (
          <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: "var(--color-bg-tertiary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem",
              }}
            >
              <Briefcase size={24} style={{ color: "var(--color-brand-blue)" }} />
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--color-text-primary)", marginBottom: 6 }}>
              No projects yet
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-tertiary)", marginBottom: "1.5rem" }}>
              Start tracking client work by creating your first project.
            </p>
            <button
              type="button"
              onClick={openCreateModal}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0.65rem 1.25rem",
                borderRadius: 10,
                border: "none",
                background: "var(--color-brand-orange)",
                color: "#fff",
                fontSize: "0.8125rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <Plus size={15} /> New Project
            </button>
          </div>
        ) : items.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--color-text-tertiary)" }}>
            No projects with status "{STATUS_META[filter]?.label || filter}".
          </div>
        ) : (
          items.map((item) => {
            const meta = STATUS_META[item.status] || STATUS_META.planning;
            const StatusIcon = meta.icon;
            const dueLabel = formatDate(item.dueDate);
            return (
              <div
                key={item._id}
                onClick={() => openEditModal(item)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  borderBottom: "1px solid var(--color-border)",
                  cursor: "pointer",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-bg-tertiary)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <StatusIcon size={16} style={{ color: meta.color, flexShrink: 0 }} />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-text-primary)" }}>
                      {item.name}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "0.15rem 0.55rem",
                        borderRadius: 999,
                        background: "var(--color-bg-tertiary)",
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      {SERVICE_META[item.service] || item.service}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                    {item.client}
                  </p>
                </div>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "0.25rem 0.65rem",
                    borderRadius: 999,
                    border: `1.5px solid ${meta.color}`,
                    color: meta.color,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {meta.label}
                </span>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: "0.75rem",
                    color: "var(--color-text-tertiary)",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    minWidth: 110,
                    justifyContent: "flex-end",
                  }}
                >
                  <Calendar size={12} /> {dueLabel || "No due date"}
                </span>

                {item.budget && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--color-brand-green)",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    <Wallet size={12} /> {item.budget}
                  </span>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(item._id);
                  }}
                  aria-label="Delete project"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(226,114,91,0.3)",
                    background: "rgba(226,114,91,0.08)",
                    color: "#E2725B",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            );
          })
        )}

        {!loading && !isEmptyOverall && pages > 1 && (
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

      {modalMode && (
        <ProjectModal
          mode={modalMode}
          form={form}
          setForm={setForm}
          errors={formErrors}
          saving={saving}
          modalError={modalError}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
