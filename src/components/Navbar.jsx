import { useState } from "react";

const links = [
  ["Home",       "home"],
  ["About Us",   "about"],
  ["Members",    "members"],
  ["Events",     "events"],
  ["Notes",      "notes"],
  ["Contact Us", "contact"],
];

export default function Navbar({ route }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid #E8EAED",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
      role="banner"
    >
      {/* Google-colour top accent line */}
      <div
        style={{
          height: 3,
          background: "linear-gradient(90deg, #4285F4 0%, #EA4335 33%, #FBBC05 66%, #34A853 100%)",
        }}
        aria-hidden="true"
      />

      <nav
        aria-label="Main navigation"
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo + wordmark */}
        <a
          href="#/home"
          aria-label="ZGDC CASPAM — home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
          }}
        >
          {/* 3-D logo with glow */}
          <div
            style={{
              position: "relative",
              width: 44,
              height: 44,
              flexShrink: 0,
            }}
          >
            {/* glow ring */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: -4,
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg, #4285F4, #EA4335, #FBBC05, #34A853, #4285F4)",
                filter: "blur(6px)",
                opacity: 0.55,
                animation: "navSpin 6s linear infinite",
              }}
            />
            <img
              src="/zgdc-logo.jpg"
              alt=""
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "contain",
                background: "#fff",
                border: "2px solid #fff",
                boxShadow: "0 2px 8px rgba(66,133,244,.3)",
              }}
            />
          </div>

          {/* Wordmark */}
          <span
            style={{
              fontFamily: "'Poppins','Sora',sans-serif",
              fontWeight: 700,
              fontSize: 17,
              color: "#202124",
              lineHeight: 1,
            }}
          >
            ZGDC
            <span style={{ color: "#4285F4" }}>–CASPAM</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <ul
          style={{
            display: "flex",
            gap: 4,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="nav-links-desktop"
        >
          {links.map(([label, r]) => {
            const active = route === r;
            return (
              <li key={r}>
                <a
                  href={`#/${r}`}
                  aria-current={active ? "page" : undefined}
                  style={{
                    display: "inline-block",
                    padding: "8px 16px",
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: active ? 600 : 500,
                    color: active ? "#4285F4" : "#5F6368",
                    background: active ? "rgba(66,133,244,.10)" : "transparent",
                    textDecoration: "none",
                    transition: "color .18s, background .18s",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "#4285F4";
                      e.currentTarget.style.background = "rgba(66,133,244,.06)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "#5F6368";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile burger */}
        <button
          className="nav-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "none",
            border: "1.5px solid #E8EAED",
            borderRadius: 8,
            padding: "6px 10px",
            cursor: "pointer",
            color: "#202124",
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            borderTop: "1px solid #E8EAED",
            padding: "12px 24px 20px",
            background: "rgba(255,255,255,.97)",
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 4 }}>
            {links.map(([label, r]) => {
              const active = route === r;
              return (
                <li key={r}>
                  <a
                    href={`#/${r}`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    style={{
                      display: "block",
                      padding: "10px 16px",
                      borderRadius: 10,
                      fontSize: 15,
                      fontWeight: active ? 600 : 400,
                      color: active ? "#4285F4" : "#202124",
                      background: active ? "rgba(66,133,244,.08)" : "transparent",
                      textDecoration: "none",
                    }}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Keyframe + responsive styles */}
      <style>{`
        @keyframes navSpin { to { transform: rotate(360deg); } }
        @media (max-width: 800px) {
          .nav-links-desktop { display: none !important; }
          .nav-burger { display: block !important; }
        }
      `}</style>
    </header>
  );
}
