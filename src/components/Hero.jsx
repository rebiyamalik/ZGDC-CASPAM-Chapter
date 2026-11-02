import { lazy, Suspense } from 'react'
import { ZGDC } from '../data/zgdcInfo'
const Scene3D = lazy(() => import('./Scene3D'))

const dots = [
  { color:"#4285F4" }, { color:"#EA4335" },
  { color:"#FBBC05" }, { color:"#34A853" },
]

export default function Hero() {
  return (
    <section style={{ background:"#fff" }}>
      {/* ── Main hero grid ── */}
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px" }}>
        <div className="hero-grid" style={{
          display:"grid", alignItems:"center", gap:48,
          padding:"72px 0 56px",
        }}>
          {/* Left */}
          <div className="fade-up">
            {/* Google dots */}
            <div style={{ display:"flex", gap:6, marginBottom:20 }}>
              {dots.map(d => (
                <span key={d.color} style={{ width:10, height:10, borderRadius:"50%", background:d.color, display:"inline-block" }}/>
              ))}
            </div>

            <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:14,
              color:"#4285F4", letterSpacing:".06em", textTransform:"uppercase", marginBottom:14 }}>
              BZU Multan · Google Developer Club
            </p>

            <h1 style={{ fontFamily:"'Poppins','Sora',sans-serif", fontWeight:800,
              fontSize:"clamp(32px,5.5vw,54px)", lineHeight:1.15, color:"var(--ink)", marginBottom:20 }}>
              Build.&nbsp;Learn.{" "}
              <span style={{
                background:"linear-gradient(90deg,#4285F4,#34A853)",
                WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent",
              }}>
                Grow together.
              </span>
            </h1>

            <p style={{ fontSize:18, lineHeight:1.75, color:"var(--text)", maxWidth:480, marginBottom:32 }}>
              ZGDC–CASPAM is where students at Bahauddin Zakariya University
              explore technology, build real projects, and grow as developers and innovators.
            </p>

            <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
              <a href="#/contact" className="btn btn-primary">Join the Chapter</a>
              <a href="#/events" className="btn btn-ghost">See Events</a>
            </div>
          </div>

          {/* Right — 3-D scene */}
          <div style={{ height:340, minHeight:280 }}>
            <Suspense fallback={<div style={{ height:"100%", display:"grid", placeItems:"center", color:"var(--muted)", fontSize:14 }}>Loading…</div>}>
              <Scene3D />
            </Suspense>
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div style={{ background:"var(--soft)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1140, margin:"0 auto", padding:"32px 24px" }}>
          <div className="stats-grid" style={{ display:"grid", gap:24, textAlign:"center" }}>
            {[
              { num:`${ZGDC.members}`, label:"Members",    color:"#4285F4" },
              { num:"1",              label:"Upcoming Event", color:"#EA4335" },
              { num:"2024",           label:"Founded",     color:"#34A853" },
              { num:"CASPAM",         label:"Campus",      color:"#FBBC05" },
            ].map(({ num, label, color }) => (
              <div key={label} style={{ padding:"20px 16px" }}>
                <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800,
                  fontSize:"clamp(28px,4vw,40px)", lineHeight:1,
                  background:`linear-gradient(135deg,${color},${color}bb)`,
                  WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent",
                  marginBottom:6 }}>
                  {num}
                </div>
                <div style={{ fontSize:13, fontWeight:600, color:"var(--muted)",
                  textTransform:"uppercase", letterSpacing:".08em" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid       { grid-template-columns: 1.1fr 1fr; }
        .stats-grid      { grid-template-columns: repeat(4, 1fr); }
        @media (max-width:860px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-grid > div:last-child { height: 260px; }
        }
        @media (max-width:600px) {
          .stats-grid { grid-template-columns: repeat(2,1fr); }
        }
      `}</style>
    </section>
  )
}
