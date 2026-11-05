/* ─────────────────────────────────────────
   Hero — ZGDC Banner image + polished layout
───────────────────────────────────────── */
const dots = [
  { color:"#4285F4" }, { color:"#EA4335" },
  { color:"#FBBC05" }, { color:"#34A853" },
]

export default function Hero() {
  return (
    <section style={{ background:"#fff", borderBottom:"1px solid #E8EAED" }}>
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 24px" }}>
        <div className="hero-grid" style={{
          display:"grid", alignItems:"center", gap:56,
          padding:"72px 0 68px",
        }}>

          {/* ── Left column ── */}
          <div className="fade-up">
            {/* Four Google colour dots */}
            <div style={{ display:"flex", gap:7, marginBottom:20 }}>
              {dots.map(d => (
                <span key={d.color} style={{
                  width:10, height:10, borderRadius:"50%",
                  background:d.color, display:"inline-block",
                }}/>
              ))}
            </div>

            <p style={{
              fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:12,
              color:"#4285F4", letterSpacing:".10em", textTransform:"uppercase", marginBottom:14,
            }}>
              BZU Multan &middot; Google Developer Club
            </p>

            <h1 style={{
              fontFamily:"'Poppins','Sora',sans-serif", fontWeight:800,
              fontSize:"clamp(32px,5vw,54px)", lineHeight:1.12,
              color:"#202124", marginBottom:20,
            }}>
              Build.&nbsp;Learn.{" "}
              <span style={{
                background:"linear-gradient(100deg,#4285F4,#34A853)",
                WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent",
              }}>
                Grow together.
              </span>
            </h1>

            <p style={{
              fontSize:17, lineHeight:1.8, color:"#5F6368",
              maxWidth:460, marginBottom:34,
            }}>
              ZGDC&ndash;CASPAM is a student technology community at Bahauddin Zakariya University
              where students explore technology, build real projects, and grow as developers.
            </p>

            <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
              <a href="#/contact" className="btn btn-primary" style={{ padding:"13px 26px", fontSize:14 }}>
                Join the Chapter
              </a>
              <a href="#/events" className="btn btn-ghost" style={{ padding:"13px 26px", fontSize:14 }}>
                See Events
              </a>
            </div>

            {/* Stats row under CTA */}
            <div className="hero-stats" style={{
              display:"flex", gap:28, flexWrap:"wrap",
              marginTop:36, paddingTop:28,
              borderTop:"1px solid #E8EAED",
            }}>
              {[
                { val:"25+", label:"Members",        color:"#4285F4" },
                { val:"1",   label:"Upcoming Event", color:"#EA4335" },
                { val:"2026",label:"Year",           color:"#34A853" },
                { val:"CASPAM", label:"Campus",      color:"#FBBC05" },
              ].map(({ val, label, color }) => (
                <div key={label}>
                  <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(18px,2.5vw,24px)", color, lineHeight:1 }}>{val}</div>
                  <div style={{ fontSize:11, fontWeight:600, color:"#9AA0A6", textTransform:"uppercase", letterSpacing:".08em", marginTop:4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column — ZGDC banner image ── */}
          <div className="hero-img-wrap fade-up" style={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
            <div style={{
              width:"min(100%,520px)",
              borderRadius:20,
              overflow:"hidden",
              boxShadow:"0 8px 48px rgba(66,133,244,.14), 0 2px 12px rgba(60,64,67,.10)",
              border:"1px solid #E8EAED",
            }}>
              <img
                src="/zgdc-banner.jpg"
                alt="ZGDC–CASPAM Chapter — Zakariyan Google Developer Club"
                style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid { grid-template-columns: 1.1fr 1fr; }
        @media (max-width:860px) {
          .hero-grid { grid-template-columns: 1fr; text-align: center; }
          .hero-img-wrap { order: -1; }
          .hero-grid > div:first-child { align-items: center; display: flex; flex-direction: column; }
          .hero-stats { justify-content: center; }
        }
      `}</style>
    </section>
  )
}
