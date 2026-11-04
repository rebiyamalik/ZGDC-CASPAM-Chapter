/* Hero — logo replaces the 3D scene */
const dots = [
  { color:"#4285F4" }, { color:"#EA4335" },
  { color:"#FBBC05" }, { color:"#34A853" },
]

export default function Hero() {
  return (
    <section style={{ background:"#fff" }}>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px" }}>
        <div className="hero-grid" style={{
          display:"grid", alignItems:"center", gap:64,
          padding:"80px 0 72px",
        }}>

          {/* ── Left column ── */}
          <div className="fade-up">
            {/* Four Google colour dots */}
            <div style={{ display:"flex", gap:7, marginBottom:22 }}>
              {dots.map(d => (
                <span key={d.color} style={{
                  width:11, height:11, borderRadius:"50%",
                  background:d.color, display:"inline-block",
                }}/>
              ))}
            </div>

            <p style={{
              fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:13,
              color:"#4285F4", letterSpacing:".08em", textTransform:"uppercase", marginBottom:16,
            }}>
              BZU Multan &middot; Google Developer Club
            </p>

            <h1 style={{
              fontFamily:"'Poppins','Sora',sans-serif", fontWeight:800,
              fontSize:"clamp(34px,5.5vw,58px)", lineHeight:1.1,
              color:"#202124", marginBottom:22,
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
              fontSize:18, lineHeight:1.8, color:"#5F6368",
              maxWidth:460, marginBottom:36,
            }}>
              ZGDC&ndash;CASPAM is where students at Bahauddin Zakariya University
              explore technology, build real projects, and grow as developers and innovators.
            </p>

            <div style={{ display:"flex", flexWrap:"wrap", gap:14 }}>
              <a href="#/contact" className="btn btn-primary" style={{ padding:"14px 28px", fontSize:15 }}>
                Join the Chapter
              </a>
              <a href="#/events" className="btn btn-ghost" style={{ padding:"14px 28px", fontSize:15 }}>
                See Events
              </a>
            </div>
          </div>

          {/* ── Right column — official team logo ── */}
          <div className="hero-logo-wrap fade-up" style={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
            <div className="hero-logo-ring">
              <img
                src="/zgdc-logo.jpg"
                alt="Zakariyan Google Developer Club – CASPAM Chapter"
                className="hero-logo-img"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Hero grid ── */
        .hero-grid { grid-template-columns: 1.15fr 1fr; }

        /* ── Logo presentation ── */
        .hero-logo-ring {
          position: relative;
          width: clamp(260px, 34vw, 380px);
          aspect-ratio: 1;
          border-radius: 50%;
          padding: 6px;
          background: conic-gradient(
            from 0deg,
            #4285F4 0%,
            #EA4335 25%,
            #FBBC05 50%,
            #34A853 75%,
            #4285F4 100%
          );
          box-shadow:
            0 0 0 3px #fff,
            0 8px 40px rgba(66,133,244,.18),
            0 24px 64px rgba(60,64,67,.12);
          animation: hero-logo-float 5s ease-in-out infinite;
        }
        .hero-logo-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          background: #fff;
        }
        @keyframes hero-logo-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-logo-wrap { order: -1; }
          .hero-logo-ring { width: clamp(200px, 55vw, 280px); }
          .hero-grid > div:first-child { align-items: center; display: flex; flex-direction: column; }
        }
      `}</style>
    </section>
  )
}
