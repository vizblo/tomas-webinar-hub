import { useState } from "react";
import { useLocation } from "react-router-dom";

const PAGES = [
  { path: "/", label: "Split-test root" },
  { path: "/a", label: "Variant A" },
  { path: "/b", label: "Variant B" },
  { path: "/tack", label: "Thank you" },
  { path: "/bokad", label: "Booked" },
  { path: "/confirmed", label: "Confirmed" },
  { path: "/replay", label: "Replay" },
  { path: "/admin/optin", label: "Admin opt-in" },
  { path: "/privacy", label: "Privacy" },
  { path: "/terms", label: "Terms" },
];

const DevNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 99999,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {open && (
        <div
          style={{
            background: "#1a1a1a",
            border: "1px solid #444",
            borderRadius: 8,
            padding: 8,
            marginBottom: 8,
            maxHeight: "60vh",
            overflowY: "auto",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            minWidth: 180,
          }}
        >
          {PAGES.map((p) => (
            <a
              key={p.path}
              href={p.path}
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                window.history.pushState({}, "", p.path);
                window.dispatchEvent(new PopStateEvent("popstate"));
              }}
              style={{
                display: "block",
                padding: "8px 12px",
                color: location.pathname === p.path ? "#fbbf24" : "#e5e5e5",
                textDecoration: "none",
                fontSize: 13,
                borderRadius: 4,
                background: location.pathname === p.path ? "rgba(251,191,36,0.1)" : "transparent",
              }}
            >
              <span style={{ opacity: 0.5, marginRight: 8 }}>{p.path}</span>
              {p.label}
            </a>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          background: "#fbbf24",
          color: "#1a1a1a",
          border: "none",
          borderRadius: 20,
          padding: "8px 16px",
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        {open ? "✕ Close" : "☰ Pages"}
      </button>
    </div>
  );
};

export default DevNav;
