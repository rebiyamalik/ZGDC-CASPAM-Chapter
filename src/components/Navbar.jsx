import { useState } from "react";

const links = [
  { label:"Home",       route:"home",    dot:false },
  { label:"About Us",   route:"about",   dot:false },
  { label:"Members",    route:"members", dot:false },
  { label:"Events",     route:"events",  dot:true  },   // ← upcoming event dot
  { label:"Notes",      route:"notes",   dot:false },
  { label:"Contact Us", route:"contact", dot:false },
];

export default function Navbar({ route }) {
  const [open, setOpen] = useState(false);

  return (
    <header style={{
      position:"sticky", top:0, zIndex:50,
      background:"rgba(255,255,255,.95)",
      backdropFilter:"blur(16px)",
      WebkitBackdropFilter:"blur(16px)",
      borderBottom:"1px solid var(--border)",
      fontFamily:"'Inter',system-ui,sans-serif",
    }} role="banner">

      {/* Google 4-colour top bar */}
      <div style={{ height:3, background:"linear-gradient(90deg,#4285F4 0%,#EA4335 33%,#FBBC05 66%,#34A853 100%)" }} aria-hidden="true"/>

      <nav aria-label="Main navigation" style={{
        maxWidth:1140, margin:"0 auto", padding:"0 24px",
        display:"flex", alignItems:"center", justifyContent:"space-between", height:64,
      }}>

        {/* ── Logo + wordmark ── */}
        <a href="#/home" aria-label="ZGDC CASPAM — home"
          style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none" }}>
          <div style={{ position:"relative", width:42, height:42, flexShrink:0 }}>
            <div aria-hidden="true" style={{
              position:"absolute", inset:-4, borderRadius:"50%",
              background:"conic-gradient(from 0deg,#4285F4,#EA4335,#FBBC05,#34A853,#4285F4)",
              filter:"blur(5px)", opacity:.5,
              animation:"navGlow 6s linear infinite",
            }}/>
            <img src="/zgdc-logo.jpg" alt="" style={{
              position:"relative", zIndex:1, width:"100%", height:"100%",
              borderRadius:"50%", objectFit:"contain", background:"#fff",
              border:"2px solid #fff", boxShadow:"0 2px 8px rgba(66,133,244,.25)",
            }}/>
          </div>
          <span style={{ fontFamily:"'Poppins','Sora',sans-serif", fontWeight:700, fontSize:17, color:"var(--ink)", lineHeight:1 }}>
            ZGDC<span style={{ color:"#4285F4" }}>–CASPAM</span>
          </span>
        </a>

        {/* ── Desktop nav ── */}
        <ul style={{ display:"flex", gap:2, listStyle:"none", margin:0, padding:0 }} className="nav-desktop">
          {links.map(({ label, route:r, dot }) => {
            const active = route === r;
            return (
              <li key={r} style={{ position:"relative" }}>
                <a href={`#/${r}`} aria-current={active ? "page" : undefined}
                  style={{
                    display:"inline-flex", alignItems:"center", gap:4,
                    padding:"8px 14px", borderRadius:999, fontSize:14,
                    fontWeight: active ? 600 : 500,
                    color: active ? "#4285F4" : "var(--text)",
                    background: active ? "rgba(66,133,244,.09)" : "transparent",
                    textDecoration:"none",
                    transition:"color .18s, background .18s",
                  }}
                  onMouseEnter={e=>{if(!active){e.currentTarget.style.color="#4285F4";e.currentTarget.style.background="rgba(66,133,244,.06)";}}}
                  onMouseLeave={e=>{if(!active){e.currentTarget.style.color="var(--text)";e.currentTarget.style.background="transparent";}}}
                >
                  {label}
                  {dot && <span className="nav-dot" aria-label="New event" title="New upcoming event"/>}
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── Mobile burger ── */}
        <button className="nav-burger"
          aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
          onClick={() => setOpen(!open)}
          style={{
            display:"none", background:"none", border:"1.5px solid var(--border)",
            borderRadius:8, padding:"6px 10px", cursor:"pointer", color:"var(--ink)",
            fontSize:18, lineHeight:1,
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* ── Mobile drawer ── */}
      {open && (
        <div style={{ borderTop:"1px solid var(--border)", padding:"12px 24px 20px", background:"rgba(255,255,255,.97)" }}>
          <ul style={{ listStyle:"none", margin:0, padding:0, display:"grid", gap:2 }}>
            {links.map(({ label, route:r, dot }) => {
              const active = route === r;
              return (
                <li key={r}>
                  <a href={`#/${r}`} aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    style={{
                      display:"flex", alignItems:"center", gap:6,
                      padding:"11px 16px", borderRadius:10, fontSize:15,
                      fontWeight: active ? 600 : 400,
                      color: active ? "#4285F4" : "var(--ink)",
                      background: active ? "rgba(66,133,244,.08)" : "transparent",
                      textDecoration:"none",
                    }}
                  >
                    {label}
                    {dot && <span className="nav-dot" aria-label="New event"/>}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <style>{`
        @keyframes navGlow { to { transform: rotate(360deg); } }
        @media (max-width:720px) {
          .nav-desktop { display:none !important; }
          .nav-burger  { display:block !important; }
        }
      `}</style>
    </header>
  );
}
