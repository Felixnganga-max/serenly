import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Type,
  Heading2,
  ImagePlus,
  Quote as QuoteIcon,
  Trash2,
  ChevronUp,
  ChevronDown,
  Plus,
  Loader2,
  ImageOff,
  Save,
  UploadCloud,
} from "lucide-react";
import { api } from "../../lib/api";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "");
const resolveImage = (url) => (!url ? null : url.startsWith("http") ? url : `${API_ORIGIN}${url}`);
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

const CATEGORY_OPTIONS = [
  "Digital Marketing",
  "SEO",
  "Social Media",
  "Web Development",
  "E-Commerce",
  "Branding & Design",
  "Design & Print",
  "Paid Advertising",
];

const BLOCK_DEFAULTS = {
  paragraph: () => ({ _key: uid(), type: "paragraph", text: "" }),
  heading: () => ({ _key: uid(), type: "heading", text: "", level: 2 }),
  image: () => ({ _key: uid(), type: "image", url: "", alt: "", caption: "" }),
  quote: () => ({ _key: uid(), type: "quote", text: "", caption: "" }),
};

const INSERT_OPTIONS = [
  { type: "paragraph", label: "Text", icon: Type },
  { type: "heading", label: "Heading", icon: Heading2 },
  { type: "image", label: "Image", icon: ImagePlus },
  { type: "quote", label: "Quote", icon: QuoteIcon },
];

/* ── Thin insertion rail shown between every block ── */
function InsertRail({ onInsert }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ position: "relative", height: open ? "auto" : 18, display: "flex", alignItems: "center" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div style={{ flex: 1, height: 1, background: open ? "var(--color-brand-orange)" : "transparent", transition: "background 0.2s" }} />
      {open && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            display: "flex",
            gap: 4,
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: 999,
            padding: "0.3rem",
            boxShadow: "var(--shadow-md)",
            zIndex: 2,
          }}
        >
          {INSERT_OPTIONS.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              type="button"
              title={`Insert ${label}`}
              onClick={() => onInsert(type)}
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "none",
                background: "var(--color-bg-tertiary)",
                color: "var(--color-text-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AutoTextarea({ value, onChange, placeholder, style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = ref.current.scrollHeight + "px";
  }, [value]);
  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%",
        border: "none",
        outline: "none",
        resize: "none",
        overflow: "hidden",
        background: "transparent",
        fontFamily: "var(--font-body)",
        ...style,
      }}
    />
  );
}

function ImageBlockEditor({ block, update }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await api.uploads.image(file);
      update({ url: res.data.url });
    } catch (err) {
      alert(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div style={{ padding: "0.5rem 0" }}>
      {block.url ? (
        <div style={{ position: "relative" }}>
          <img
            src={resolveImage(block.url)}
            alt={block.alt}
            style={{ width: "100%", maxHeight: 380, objectFit: "cover", borderRadius: 10 }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            style={{
              position: "absolute", top: 10, right: 10,
              padding: "0.4rem 0.8rem", borderRadius: 999, border: "none",
              background: "rgba(46,41,16,0.75)", color: "#F5F5F5", fontSize: "0.75rem", fontWeight: 700,
              cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
            }}
          >
            {uploading ? <Loader2 size={12} className="animate-spin" /> : <UploadCloud size={12} />} Replace
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          style={{
            width: "100%",
            padding: "2.5rem 1rem",
            borderRadius: 10,
            border: "1.5px dashed var(--color-border-strong)",
            background: "var(--color-bg-tertiary)",
            color: "var(--color-text-tertiary)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
          }}
        >
          {uploading ? <Loader2 size={22} className="animate-spin" /> : <ImagePlus size={22} />}
          <span style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
            {uploading ? "Uploading…" : "Click to upload an image"}
          </span>
        </button>
      )}
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
      {block.url && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
          <input
            value={block.alt}
            onChange={(e) => update({ alt: e.target.value })}
            placeholder="Alt text (for accessibility & SEO)"
            style={{ fontSize: "0.8125rem", padding: "0.5rem 0.7rem", borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-primary)" }}
          />
          <input
            value={block.caption}
            onChange={(e) => update({ caption: e.target.value })}
            placeholder="Caption (optional, shown under image)"
            style={{ fontSize: "0.8125rem", padding: "0.5rem 0.7rem", borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-primary)" }}
          />
        </div>
      )}
    </div>
  );
}

function Block({ block, index, total, onChange, onRemove, onMove }) {
  const update = (patch) => onChange(index, { ...block, ...patch });

  return (
    <div
      style={{
        position: "relative",
        padding: "0.75rem 3rem 0.75rem 0.5rem",
        borderRadius: 10,
      }}
      className="admin-block"
    >
      <div
        className="admin-block-controls"
        style={{
          position: "absolute",
          top: 8,
          right: 0,
          display: "flex",
          gap: 3,
          opacity: 0,
          transition: "opacity 0.15s",
        }}
      >
        <button type="button" disabled={index === 0} onClick={() => onMove(index, -1)} style={iconBtnStyle}>
          <ChevronUp size={13} />
        </button>
        <button type="button" disabled={index === total - 1} onClick={() => onMove(index, 1)} style={iconBtnStyle}>
          <ChevronDown size={13} />
        </button>
        <button type="button" onClick={() => onRemove(index)} style={{ ...iconBtnStyle, color: "#E2725B" }}>
          <Trash2 size={13} />
        </button>
      </div>

      {block.type === "paragraph" && (
        <AutoTextarea
          value={block.text}
          onChange={(e) => update({ text: e.target.value })}
          placeholder="Write a paragraph…"
          style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--color-text-primary)" }}
        />
      )}

      {block.type === "heading" && (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <select
            value={block.level}
            onChange={(e) => update({ level: Number(e.target.value) })}
            style={{ fontSize: "0.7rem", fontWeight: 700, border: "1px solid var(--color-border)", borderRadius: 6, padding: "0.2rem 0.4rem", background: "var(--color-surface)", color: "var(--color-text-secondary)" }}
          >
            <option value={2}>H2</option>
            <option value={3}>H3</option>
          </select>
          <AutoTextarea
            value={block.text}
            onChange={(e) => update({ text: e.target.value })}
            placeholder="Heading text…"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: block.level === 2 ? "1.5rem" : "1.2rem",
              color: "var(--color-text-primary)",
            }}
          />
        </div>
      )}

      {block.type === "image" && <ImageBlockEditor block={block} update={update} />}

      {block.type === "quote" && (
        <div style={{ borderLeft: "3px solid var(--color-brand-orange)", paddingLeft: "1rem" }}>
          <AutoTextarea
            value={block.text}
            onChange={(e) => update({ text: e.target.value })}
            placeholder="Quote text…"
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.15rem", color: "var(--color-text-primary)" }}
          />
          <input
            value={block.caption}
            onChange={(e) => update({ caption: e.target.value })}
            placeholder="— Attribution"
            style={{ marginTop: 6, fontSize: "0.8125rem", border: "none", outline: "none", background: "transparent", color: "var(--color-text-tertiary)", width: "100%" }}
          />
        </div>
      )}

      <style>{`.admin-block:hover .admin-block-controls { opacity: 1; }`}</style>
    </div>
  );
}

const iconBtnStyle = {
  width: 26,
  height: 26,
  borderRadius: 6,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  color: "var(--color-text-secondary)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

export default function AdminBlogEditor() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("Serenly Team");
  const [readTime, setReadTime] = useState(4);
  const [status, setStatus] = useState("draft");
  const [blocks, setBlocks] = useState([BLOCK_DEFAULTS.paragraph()]);

  const coverFileRef = useRef(null);

  useEffect(() => {
    if (!isEdit) return;
    api.posts
      .getByIdAdmin(id)
      .then((res) => {
        const p = res.data;
        setTitle(p.title || "");
        setSlug(p.slug || "");
        setSlugTouched(true);
        setExcerpt(p.excerpt || "");
        setCoverImage(p.coverImage || "");
        setCategory(p.category || CATEGORY_OPTIONS[0]);
        setTags((p.tags || []).join(", "));
        setAuthor(p.author || "Serenly Team");
        setReadTime(p.readTime || 4);
        setStatus(p.status || "draft");
        setBlocks(
          p.content?.length
            ? p.content.map((b) => ({ _key: uid(), ...b }))
            : [BLOCK_DEFAULTS.paragraph()],
        );
      })
      .catch((err) => setError(err.message || "Couldn't load post."))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  useEffect(() => {
    if (slugTouched) return;
    setSlug(
      title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    );
  }, [title, slugTouched]);

  const insertBlock = useCallback((atIndex, type) => {
    setBlocks((prev) => {
      const next = [...prev];
      next.splice(atIndex, 0, BLOCK_DEFAULTS[type]());
      return next;
    });
  }, []);

  const updateBlock = (index, next) =>
    setBlocks((prev) => prev.map((b, i) => (i === index ? next : b)));

  const removeBlock = (index) =>
    setBlocks((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));

  const moveBlock = (index, dir) =>
    setBlocks((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const handleCoverFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const res = await api.uploads.image(file);
      setCoverImage(res.data.url);
    } catch (err) {
      setError(err.message || "Cover upload failed");
    } finally {
      setUploadingCover(false);
      if (coverFileRef.current) coverFileRef.current.value = "";
    }
  };

  const buildPayload = (finalStatus) => ({
    title,
    slug,
    excerpt,
    coverImage,
    category,
    tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    author,
    readTime: Number(readTime) || 4,
    status: finalStatus,
    content: blocks.map((b) => {
      const clean = { ...b };
      delete clean._key;
      return clean;
    }),
  });

  const save = async (finalStatus) => {
    if (!title.trim()) {
      setError("A title is required before saving.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = buildPayload(finalStatus);
      if (isEdit) {
        await api.posts.update(id, payload);
      } else {
        const res = await api.posts.create(payload);
        navigate(`/admin/blog/${res.data._id}/edit`, { replace: true });
      }
      setStatus(finalStatus);
    } catch (err) {
      setError(err.message || "Couldn't save post.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--color-text-tertiary)" }}>Loading post…</div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "2rem", alignItems: "start" }}>
      {/* Main editor */}
      <div>
        {error && (
          <div style={{ padding: "0.9rem 1.1rem", borderRadius: 10, background: "rgba(226,114,91,0.1)", border: "1px solid rgba(226,114,91,0.3)", color: "#E2725B", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
            {error}
          </div>
        )}

        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title…"
          rows={1}
          className="card"
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            resize: "none",
            background: "var(--color-surface)",
            borderRadius: 14,
            padding: "1.5rem",
            fontFamily: "var(--font-display)",
            fontSize: "2rem",
            lineHeight: 1.2,
            color: "var(--color-text-primary)",
            marginBottom: "1rem",
          }}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
        />

        <div className="card" style={{ background: "var(--color-surface)", borderRadius: 14, padding: "1.5rem 1.5rem 0.5rem" }}>
          <InsertRail onInsert={(type) => insertBlock(0, type)} />
          {blocks.map((block, i) => (
            <React.Fragment key={block._key}>
              <Block
                block={block}
                index={i}
                total={blocks.length}
                onChange={updateBlock}
                onRemove={removeBlock}
                onMove={moveBlock}
              />
              <InsertRail onInsert={(type) => insertBlock(i + 1, type)} />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ position: "sticky", top: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div className="card" style={{ background: "var(--color-surface)", borderRadius: 14, padding: "1.25rem" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
            <button
              type="button"
              onClick={() => save("draft")}
              disabled={saving}
              style={{ flex: 1, padding: "0.65rem", borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-secondary)", fontWeight: 700, fontSize: "0.8125rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              <Save size={14} /> Draft
            </button>
            <button
              type="button"
              onClick={() => save("published")}
              disabled={saving}
              className="btn btn-primary"
              style={{ flex: 1, borderRadius: 8, fontSize: "0.8125rem" }}
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : "Publish"}
            </button>
          </div>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              padding: "0.2rem 0.6rem",
              borderRadius: 999,
              background: status === "published" ? "rgba(91,126,60,0.1)" : "rgba(0,85,218,0.08)",
              color: status === "published" ? "var(--color-brand-green)" : "var(--color-brand-blue)",
            }}
          >
            {status}
          </span>
        </div>

        <div className="card" style={{ background: "var(--color-surface)", borderRadius: 14, padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          <Field label="Slug">
            <input value={slug} onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }} style={inputStyle} />
          </Field>

          <Field label="Cover image">
            {coverImage ? (
              <div style={{ position: "relative" }}>
                <img src={resolveImage(coverImage)} alt="" style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 8 }} />
                <button type="button" onClick={() => coverFileRef.current?.click()} style={{ position: "absolute", top: 6, right: 6, padding: "0.25rem 0.55rem", fontSize: "0.65rem", fontWeight: 700, borderRadius: 999, border: "none", background: "rgba(46,41,16,0.75)", color: "#F5F5F5", cursor: "pointer" }}>
                  Replace
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => coverFileRef.current?.click()}
                disabled={uploadingCover}
                style={{ width: "100%", padding: "1.5rem", borderRadius: 8, border: "1.5px dashed var(--color-border-strong)", background: "var(--color-bg-tertiary)", color: "var(--color-text-tertiary)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
              >
                {uploadingCover ? <Loader2 size={18} className="animate-spin" /> : <ImageOff size={18} />}
                <span style={{ fontSize: "0.75rem" }}>Upload cover</span>
              </button>
            )}
            <input ref={coverFileRef} type="file" accept="image/*" onChange={handleCoverFile} style={{ display: "none" }} />
          </Field>

          <Field label="Excerpt">
            <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          </Field>

          <Field label="Category">
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Tags (comma separated)">
            <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="seo, kenya, growth" style={inputStyle} />
          </Field>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }}>
            <Field label="Author">
              <input value={author} onChange={(e) => setAuthor(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Read time (min)">
              <input type="number" min={1} value={readTime} onChange={(e) => setReadTime(e.target.value)} style={inputStyle} />
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 6 }}>
        {label}
      </span>
      {children}
    </label>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.55rem 0.75rem",
  borderRadius: 8,
  border: "1px solid var(--color-border)",
  background: "var(--color-bg-tertiary)",
  color: "var(--color-text-primary)",
  fontSize: "0.8125rem",
  fontFamily: "var(--font-body)",
  outline: "none",
};
