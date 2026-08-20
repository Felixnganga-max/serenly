import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  PolarAngleAxis,
} from "recharts";
import {
  Mail,
  MessageSquareReply,
  Briefcase,
  FileText,
  Circle,
  CheckCircle2,
  Archive,
  ArrowRight,
} from "lucide-react";
import { api } from "../../lib/api";

const STATUS_META = {
  new: { label: "New", color: "var(--color-brand-orange)", bg: "rgba(239,105,5,0.1)", icon: Circle },
  read: { label: "Read", color: "var(--color-brand-blue)", bg: "rgba(0,85,218,0.08)", icon: CheckCircle2 },
  replied: { label: "Replied", color: "var(--color-brand-green)", bg: "rgba(91,126,60,0.1)", icon: MessageSquareReply },
  archived: { label: "Archived", color: "var(--color-text-tertiary)", bg: "var(--color-bg-tertiary)", icon: Archive },
};

const PROJECT_STATUS_META = {
  planning: { label: "Planning", color: "var(--color-brand-blue)", bg: "rgba(0,85,218,0.08)" },
  "in-progress": { label: "In progress", color: "var(--color-brand-orange)", bg: "rgba(239,105,5,0.1)" },
  review: { label: "Review", color: "var(--color-brand-blue-light)", bg: "rgba(56,120,230,0.1)" },
  completed: { label: "Completed", color: "var(--color-brand-green)", bg: "rgba(91,126,60,0.1)" },
  "on-hold": { label: "On hold", color: "var(--color-text-tertiary)", bg: "var(--color-bg-tertiary)" },
};

const ACCENT = {
  blue: { fg: "var(--color-brand-blue)", bg: "rgba(0,85,218,0.1)" },
  green: { fg: "var(--color-brand-green)", bg: "rgba(91,126,60,0.1)" },
  orange: { fg: "var(--color-brand-orange)", bg: "rgba(239,105,5,0.1)" },
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatShortDate(dateStr) {
  const [, m, d] = dateStr.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]}`;
}

function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hrs = Math.floor(min / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-KE", { day: "numeric", month: "short" });
}

function ChartTooltip({ active, payload, label, formatter }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 10,
        padding: "0.5rem 0.75rem",
        boxShadow: "0 8px 24px rgba(0,0,0,0.14)",
        fontSize: "0.75rem",
      }}
    >
      <div style={{ color: "var(--color-text-tertiary)", marginBottom: 2 }}>{label}</div>
      <div style={{ color: "var(--color-text-primary)", fontWeight: 700 }}>
        {formatter ? formatter(payload[0].value) : payload[0].value}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, accent, sub }) {
  const a = ACCENT[accent];
  const Icon = icon;
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        padding: "1.5rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-text-secondary)" }}>{label}</span>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: a.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={17} style={{ color: a.fg }} />
        </div>
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", color: "var(--color-text-primary)", lineHeight: 1 }}>
        {value}
      </div>
      <p style={{ margin: "0.55rem 0 0", fontSize: "0.75rem", color: "var(--color-text-tertiary)" }}>{sub}</p>
    </div>
  );
}

function LeadsOverTimeCard({ data }) {
  const chartData = data.map((d) => ({ ...d, label: formatShortDate(d.date) }));
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        padding: "1.5rem",
      }}
    >
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", margin: "0 0 1rem", color: "var(--color-text-primary)" }}>
        Leads over time
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-brand-blue)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--color-brand-blue)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 5" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }}
            axisLine={false}
            tickLine={false}
            interval={4}
          />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} width={28} />
          <Tooltip
            content={<ChartTooltip formatter={(v) => `${v} lead${v === 1 ? "" : "s"}`} />}
            cursor={{ stroke: "var(--color-border-strong)", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="var(--color-brand-blue)"
            strokeWidth={2}
            fill="url(#leadsGradient)"
            activeDot={{ r: 4 }}
            isAnimationActive
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function BusiestDayCard({ data, busiestDay }) {
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        padding: "1.25rem 1.5rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.35rem" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", margin: 0, color: "var(--color-text-primary)" }}>
          Busiest day
        </h3>
        {busiestDay.count > 0 && (
          <span style={{ fontSize: "0.7rem", color: "var(--color-brand-orange)", fontWeight: 700 }}>{busiestDay.day}</span>
        )}
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} interval={0} />
          <YAxis hide allowDecimals={false} width={0} />
          <Tooltip
            content={<ChartTooltip formatter={(v) => `${v} lead${v === 1 ? "" : "s"}`} />}
            cursor={{ fill: "var(--color-bg-tertiary)" }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={22} isAnimationActive>
            {data.map((d) => (
              <Cell
                key={d.day}
                fill={d.day === busiestDay.day && d.count > 0 ? "var(--color-brand-orange)" : "var(--color-border-strong)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ResponseGaugeCard({ responseRate, contacts }) {
  const gaugeData = [{ name: "rate", value: responseRate }];
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        padding: "1.25rem 1.5rem",
      }}
    >
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", margin: "0 0 0.25rem", color: "var(--color-text-primary)" }}>
        Response rate
      </h3>
      <div style={{ position: "relative", height: 140 }}>
        <ResponsiveContainer width="100%" height={140}>
          <RadialBarChart data={gaugeData} innerRadius="72%" outerRadius="100%" startAngle={90} endAngle={-270} barSize={12}>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
            <RadialBar
              dataKey="value"
              fill="var(--color-brand-green)"
              cornerRadius={8}
              background={{ fill: "var(--color-bg-tertiary)" }}
              isAnimationActive
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            color: "var(--color-text-primary)",
            pointerEvents: "none",
          }}
        >
          {responseRate}%
        </div>
      </div>
      <p style={{ margin: "0.25rem 0 0", textAlign: "center", fontSize: "0.75rem", color: "var(--color-text-tertiary)" }}>
        {contacts.replied} of {contacts.total} replied
      </p>
    </div>
  );
}

function RecentSubmissionsCard({ items, navigate }) {
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "1.25rem 1.5rem 0.85rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", margin: 0, color: "var(--color-text-primary)" }}>
          Recent submissions
        </h3>
        <button
          type="button"
          onClick={() => navigate("/admin/contacts")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "var(--color-brand-blue)",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: 0,
          }}
        >
          View all <ArrowRight size={13} />
        </button>
      </div>

      {items.length === 0 ? (
        <div style={{ padding: "2.5rem 1.5rem", textAlign: "center", color: "var(--color-text-tertiary)", fontSize: "0.875rem" }}>
          No submissions yet — your contact form is ready and waiting.
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0 1.5rem 0.5rem",
              fontSize: "0.68rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.03em",
              color: "var(--color-text-tertiary)",
            }}
          >
            <span style={{ flex: "1 1 32%" }}>Name</span>
            <span style={{ flex: "1 1 34%" }}>Email</span>
            <span style={{ flexShrink: 0, width: 76 }}>Status</span>
            <span style={{ flexShrink: 0, width: 60, textAlign: "right" }}>Received</span>
          </div>
          {items.map((item) => {
            const meta = STATUS_META[item.status] || STATUS_META.new;
            const StatusIcon = meta.icon;
            return (
              <button
                key={item._id}
                type="button"
                onClick={() => navigate(`/admin/contacts?open=${item._id}`)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.8rem 1.5rem",
                  borderTop: "1px solid var(--color-border)",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    flex: "1 1 32%",
                    minWidth: 0,
                    fontWeight: 700,
                    fontSize: "0.8375rem",
                    color: "var(--color-text-primary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.name}
                </span>
                <span
                  style={{
                    flex: "1 1 34%",
                    minWidth: 0,
                    fontSize: "0.8rem",
                    color: "var(--color-text-secondary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.email}
                </span>
                <span
                  style={{
                    flexShrink: 0,
                    width: 76,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    padding: "0.25rem 0.5rem",
                    borderRadius: 999,
                    background: meta.bg,
                    color: meta.color,
                  }}
                >
                  <StatusIcon size={11} />
                  {meta.label}
                </span>
                <span style={{ flexShrink: 0, width: 60, textAlign: "right", fontSize: "0.7rem", color: "var(--color-text-tertiary)" }}>
                  {timeAgo(item.createdAt)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatusBreakdownCard({ contacts }) {
  const segments = [
    { key: "new", label: "New", count: contacts.new, color: "var(--color-brand-orange)" },
    { key: "read", label: "Read", count: contacts.read, color: "var(--color-brand-blue)" },
    { key: "replied", label: "Replied", count: contacts.replied, color: "var(--color-brand-green)" },
    { key: "archived", label: "Archived", count: contacts.archived, color: "var(--color-text-tertiary)" },
  ];
  const total = contacts.total;

  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        padding: "1.5rem",
      }}
    >
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", margin: "0 0 1.1rem", color: "var(--color-text-primary)" }}>
        Status breakdown
      </h3>
      {total === 0 ? (
        <>
          <div style={{ height: 14, borderRadius: 999, background: "var(--color-bg-tertiary)" }} />
          <p style={{ margin: "0.75rem 0 0", fontSize: "0.8125rem", color: "var(--color-text-tertiary)", textAlign: "center" }}>
            No data yet
          </p>
        </>
      ) : (
        <>
          <div style={{ display: "flex", height: 14, borderRadius: 999, overflow: "hidden", gap: 2 }}>
            {segments
              .filter((s) => s.count > 0)
              .map((s) => (
                <div
                  key={s.key}
                  title={`${s.label}: ${s.count}`}
                  style={{ width: `${(s.count / total) * 100}%`, background: s.color }}
                />
              ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem 1rem", marginTop: "1.1rem" }}>
            {segments.map((s) => (
              <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: s.color, flexShrink: 0 }} />
                {s.label}&nbsp;<strong style={{ color: "var(--color-text-primary)" }}>{s.count}</strong>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function RecentProjectsCard({ items, total, navigate }) {
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        padding: "1.5rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", margin: 0, color: "var(--color-text-primary)" }}>
          Recent projects
        </h3>
        <button
          type="button"
          onClick={() => navigate("/admin/projects")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "var(--color-brand-blue)",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: 0,
          }}
        >
          View all <ArrowRight size={13} />
        </button>
      </div>

      {total === 0 ? (
        <div style={{ padding: "1.5rem 0", textAlign: "center" }}>
          <p style={{ margin: "0 0 0.75rem", fontSize: "0.875rem", color: "var(--color-text-tertiary)" }}>No projects yet.</p>
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "0.8125rem",
              fontWeight: 700,
              color: "var(--color-brand-orange)",
            }}
          >
            + New project
          </button>
        </div>
      ) : (
        <div>
          {items.map((p, i) => {
            const meta = PROJECT_STATUS_META[p.status] || PROJECT_STATUS_META.planning;
            return (
              <button
                key={p._id}
                type="button"
                onClick={() => navigate(`/admin/projects?open=${p._id}`)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.8rem 0",
                  borderTop: i === 0 ? "none" : "1px solid var(--color-border)",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      color: "var(--color-text-primary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.name}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)" }}>{p.client}</div>
                </div>
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "0.25rem 0.65rem",
                    borderRadius: 999,
                    background: meta.bg,
                    color: meta.color,
                  }}
                >
                  {meta.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminOverview() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [recentContacts, setRecentContacts] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [overviewRes, contactsRes, projectsRes] = await Promise.all([
          api.stats.overview(),
          api.contact.list({ limit: 5 }),
          api.projects.list({ limit: 4 }),
        ]);
        if (cancelled) return;
        setData(overviewRes.data);
        setRecentContacts(contactsRes.data || []);
        setRecentProjects(projectsRes.data || []);
      } catch (err) {
        if (!cancelled) setError(err.message || "Couldn't load the overview.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "4rem 0", textAlign: "center", color: "var(--color-text-tertiary)", fontSize: "0.9rem" }}>
        Loading overview…
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "0.9rem 1.1rem",
          borderRadius: 10,
          background: "rgba(226,114,91,0.1)",
          border: "1px solid rgba(226,114,91,0.3)",
          color: "#E2725B",
          fontSize: "0.875rem",
        }}
      >
        {error}
      </div>
    );
  }

  if (!data) return null;

  const { contacts, posts, projects, responseRate } = data;
  const activeProjects = projects.inProgress + projects.planning + projects.review;
  const busiestDay = contacts.byDayOfWeek.reduce(
    (max, d) => (d.count > max.count ? d : max),
    contacts.byDayOfWeek[0] || { day: "", count: 0 },
  );

  const statCards = [
    { label: "Total Leads", value: contacts.total, icon: Mail, accent: "blue", sub: `${contacts.new} new` },
    {
      label: "Response Rate",
      value: `${responseRate}%`,
      icon: MessageSquareReply,
      accent: "green",
      sub: `${contacts.replied} of ${contacts.total} replied`,
    },
    { label: "Active Projects", value: activeProjects, icon: Briefcase, accent: "orange", sub: `${projects.completed} completed` },
    { label: "Published Posts", value: posts.published, icon: FileText, accent: "blue", sub: `${posts.draft} drafts` },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
          {contacts.total} lead{contacts.total !== 1 ? "s" : ""} · {activeProjects} active project{activeProjects !== 1 ? "s" : ""} ·{" "}
          {posts.published} published post{posts.published !== 1 ? "s" : ""}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
        {statCards.map((c) => (
          <StatCard key={c.label} {...c} />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.25rem", alignItems: "stretch" }}>
        <LeadsOverTimeCard data={contacts.last30Days} />
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <BusiestDayCard data={contacts.byDayOfWeek} busiestDay={busiestDay} />
          <ResponseGaugeCard responseRate={responseRate} contacts={contacts} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "1.25rem", alignItems: "start" }}>
        <RecentSubmissionsCard items={recentContacts} navigate={navigate} />
        <StatusBreakdownCard contacts={contacts} />
      </div>

      <RecentProjectsCard items={recentProjects} total={projects.total} navigate={navigate} />
    </div>
  );
}
