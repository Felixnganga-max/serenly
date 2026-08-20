import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { api } from "../../lib/api";

export default function AdminShellLayout() {
  const [newContacts, setNewContacts] = useState(0);

  useEffect(() => {
    let cancelled = false;
    api.contact
      .list({ status: "new", limit: 1 })
      .then((res) => {
        if (!cancelled) setNewContacts(res.total || 0);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-bg-secondary)" }}>
      <AdminSidebar badges={{ newContacts }} />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <AdminTopbar newContacts={newContacts} />
        <main style={{ flex: 1, padding: "1.75rem", minWidth: 0 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
