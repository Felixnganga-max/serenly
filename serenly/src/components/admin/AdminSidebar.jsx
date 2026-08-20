import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Mail,
  Briefcase,
  FileText,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import assets from "../../assets/assets";

const NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/contacts", label: "Contacts", icon: Mail, end: false, badgeKey: "newContacts" },
  { to: "/admin/projects", label: "Projects", icon: Briefcase, end: false },
  { to: "/admin/blog", label: "Blog Posts", icon: FileText, end: false },
];

export default function AdminSidebar({ badges = {} }) {
  const { admin, logout } = useAuth();

  const initials = (admin?.name || admin?.email || "A")
    .trim()
    .split(/\s+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <aside
      style={{
        width: 264,
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--color-brand-black)",
        borderRight: "1px solid rgba(245,245,245,0.08)",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "1.5rem 1.5rem 1.25rem",
          textDecoration: "none",
        }}
      >
        <img src={assets.logo} alt="Serenly" style={{ height: 30, width: 30 }} />
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", color: "#F5F5F5" }}>
          Serenly{" "}
          <span
            style={{
              color: "rgba(245,245,245,0.4)",
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
            }}
          >
            / Admin
          </span>
        </span>
      </Link>

      <nav style={{ flex: 1, padding: "0.5rem 0.9rem", display: "flex", flexDirection: "column", gap: 4, overflowY: "auto" }}>
        {NAV.map((item) => {
          const Icon = item.icon;
          const badgeValue = item.badgeKey ? badges[item.badgeKey] : 0;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "0.65rem 0.85rem",
                borderRadius: 10,
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
                color: isActive ? "#F5F5F5" : "rgba(245,245,245,0.55)",
                background: isActive ? "rgba(0,85,218,0.22)" : "transparent",
                borderLeft: isActive ? "3px solid var(--color-brand-blue-light, #3878e6)" : "3px solid transparent",
                transition: "background 0.15s ease, color 0.15s ease",
              })}
            >
              <Icon size={17} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {!!badgeValue && (
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    minWidth: 20,
                    textAlign: "center",
                    padding: "0.1rem 0.4rem",
                    borderRadius: 999,
                    background: "var(--color-brand-orange)",
                    color: "#fff",
                  }}
                >
                  {badgeValue}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div style={{ padding: "0.9rem" }}>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            padding: "0.9rem 1rem",
            borderRadius: 12,
            textDecoration: "none",
            background:
              "linear-gradient(135deg, rgba(239,105,5,0.25), rgba(0,85,218,0.3))",
            border: "1px solid rgba(245,245,245,0.1)",
          }}
        >
          <span>
            <span style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#F5F5F5" }}>
              View live site
            </span>
            <span style={{ fontSize: "0.7rem", color: "rgba(245,245,245,0.55)" }}>
              See what your visitors see
            </span>
          </span>
          <ExternalLink size={16} style={{ color: "#F5F5F5", flexShrink: 0 }} />
        </a>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "1rem 1.25rem",
          borderTop: "1px solid rgba(245,245,245,0.08)",
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "var(--color-brand-green)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.75rem",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "0.8125rem",
              fontWeight: 700,
              color: "#F5F5F5",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {admin?.name || "Admin"}
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              color: "rgba(245,245,245,0.45)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {admin?.email}
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          aria-label="Log out"
          title="Log out"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(245,245,245,0.5)",
            padding: 6,
            flexShrink: 0,
          }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
