// src/components/ScrollToHash.jsx
// On every route change: jump to top, or — if the URL carries a #hash
// (e.g. navigating to /#services from another page) — scroll that section
// into view once it has rendered.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
      return;
    }
    const id = hash.replace("#", "");
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const t = setTimeout(scroll, 60);
    return () => clearTimeout(t);
  }, [pathname, hash]);

  return null;
}
