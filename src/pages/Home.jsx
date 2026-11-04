import Hero from '../components/Hero'
import { StarIcon, PinIcon, CalendarIcon, SparkleIcon, CodeIcon, GrowthIcon, UsersIcon } from '../components/Icons'

/* ── Google colour dots (shared pattern) ── */
const GoogleDots = () => (
  <div style={{ display:"flex", gap:7, marginBottom:22 }}>
    {["#4285F4","#EA4335","#FBBC05","#34A853"].map(c => (
      <span key={c} style={{ width:11, height:11, borderRadius:"50%", background:c, display:"inline-block" }}/>
    ))}
  </div>
)

/* ─────────────────────────────────────────
   HOD Section — "A Message of Gratitude"
   Teamwork image alongside HOD portrait
───────────────────────────────────────── */
function HodSection() {
  return (
    <section style={{ background:"#F8F9FA", padding:"88px 0", borderTop:"1px solid #E8EAED" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px" }}>
        <div className="hod-grid" style={{ display:"grid", gap:60, alignItems:"center" }}>

          {/* HOD portrait */}
          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{
              width:"min(100%,320px)", aspectRatio:"1",
              borderRadius:24, overflow:"hidden",
              boxShadow:"0 8px 40px rgba(66,133,244,.14), 0 2px 8px rgba(60,64,67,.10)",
              border:"3px solid rgba(66,133,244,.18)",
            }}>
              <img src="/hod.jpg" alt="Head of Department"
                style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block" }}/>
            </div>
          </div>

          {/* Text */}
          <div>
            <GoogleDots/>
            <p style={{ fontSize:12, fontWeight:700, color:"#4285F4", textTransform:"uppercase",
              letterSpacing:".10em", marginBottom:10 }}>A Message of Gratitude</p>
            <h2 style={{
              fontFamily:"'Poppins',sans-serif", fontWeight:800,
              fontSize:"clamp(26px,3.5vw,40px)", color:"#202124",
              lineHeight:1.2, marginBottom:20,
            }}>
              Guided by Excellence
            </h2>
            <p style={{ fontSize:16, lineHeight:1.85, color:"#5F6368", marginBottom:18 }}>
              We sincerely acknowledge and appreciate the guidance, encouragement, and continuous
              support of our respected Head of Department. His commitment to academic excellence,
              innovation, and student development provides valuable encouragement to our community.
            </p>
            <p style={{ fontSize:16, lineHeight:1.85, color:"#5F6368" }}>
              His support motivates us to explore new opportunities, strengthen our abilities, and
              create a meaningful impact through technology and collaboration.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .hod-grid { grid-template-columns: auto 1fr; }
        @media (max-width:820px) {
          .hod-grid { grid-template-columns: 1fr; }
          .hod-grid > div:first-child { justify-content: center; }
        }
      `}</style>
    </section>
  )
}

/* ─────────────────────────────────────────
   What We Do — 4 pill-bar cards + teamwork image
───────────────────────────────────────── */
const activities = [
  { color:"#4285F4", Icon:SparkleIcon, title:"Technology & AI Workshops",
    desc:"Hands-on learning experiences in AI, programming, automation, and emerging technologies." },
  { color:"#EA4335", Icon:CodeIcon,    title:"Projects & Development",
    desc:"Building practical applications, experimenting with new ideas, and solving real-world problems." },
  { color:"#FBBC05", Icon:GrowthIcon,  title:"Competitions & Innovation",
    desc:"Providing opportunities to showcase creativity, technical skills, and innovative thinking." },
  { color:"#34A853", Icon:UsersIcon,   title:"Community & Collaboration",
    desc:"Connecting students, sharing knowledge, supporting one another, and growing together." },
]

function WhatWeDoSection() {
  return (
    <section style={{ background:"#fff", padding:"88px 0", borderTop:"1px solid #E8EAED" }}>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px" }}>

        {/* Section header */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:40, alignItems:"end", marginBottom:52 }}
          className="whatwedo-header">
          <div>
            <GoogleDots/>
            <p style={{ fontSize:12, fontWeight:700, color:"#4285F4", textTransform:"uppercase",
              letterSpacing:".10em", marginBottom:10 }}>What We Do</p>
            <h2 style={{
              fontFamily:"'Poppins',sans-serif", fontWeight:800,
              fontSize:"clamp(28px,4vw,44px)", color:"#202124",
              lineHeight:1.15, marginBottom:14,
            }}>
              Our Activities &amp;<br/>Focus Areas
            </h2>
            <p style={{ fontSize:16, color:"#5F6368", lineHeight:1.75, maxWidth:480 }}>
              ZGDC&ndash;CASPAM brings students together across a wide range of technology
              disciplines &mdash; from AI workshops to collaborative community projects.
            </p>
          </div>

          {/* Teamwork image */}
          <div style={{ width:"min(100%,340px)" }} className="whatwedo-img">
            <div style={{
              borderRadius:20, overflow:"hidden",
              boxShadow:"0 4px 24px rgba(60,64,67,.12)",
              aspectRatio:"4/3",
            }}>
              <img src="/teamwork1.jpg" alt="Team collaboration"
                style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
            </div>
          </div>
        </div>

        {/* 2×2 pill-bar cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16 }}>
          {activities.map(({ color, title, desc }) => (
            <div key={title} style={{
              background:"#fff", borderRadius:16,
              border:"1px solid #E8EAED",
              padding:"28px 28px 30px",
              boxShadow:"0 1px 3px rgba(60,64,67,.08), 0 4px 12px rgba(60,64,67,.04)",
              transition:"transform .22s ease, box-shadow .22s ease",
              cursor:"default",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 4px 20px rgba(60,64,67,.13)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 1px 3px rgba(60,64,67,.08), 0 4px 12px rgba(60,64,67,.04)";}}
            >
              <div style={{ width:44, height:6, borderRadius:999, background:color, marginBottom:22 }}/>
              <h3 style={{
                fontFamily:"'Poppins',sans-serif", fontWeight:700,
                fontSize:18, color:"#202124", marginBottom:10,
              }}>{title}</h3>
              <p style={{ fontSize:15, color:"#5F6368", lineHeight:1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width:860px) {
          .whatwedo-header { grid-template-columns: 1fr !important; }
          .whatwedo-img { width: 100% !important; }
        }
      `}</style>
    </section>
  )
}

/* ─────────────────────────────────────────
   AI Baithak — event info + 4 session dates
   (topics details stay on Events page)
───────────────────────────────────────── */
const sessions = [
  { num:1, date:"Friday, 06 November 2026", color:"#4285F4" },
  { num:2, date:"Friday, 20 November 2026", color:"#EA4335" },
  { num:3, date:"Friday, 04 December 2026", color:"#34A853" },
  { num:4, date:"Friday, 18 December 2026", color:"#FBBC05" },
]

function AIBaithakSection() {
  return (
    <section style={{ background:"#F8F9FA", padding:"88px 0", borderTop:"1px solid #E8EAED" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px" }}>

        {/* Two-col layout: text left, image right */}
        <div className="baithak-grid" style={{ display:"grid", gap:56, alignItems:"center", marginBottom:52 }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:16 }}>
              <span className="badge badge-red" style={{ fontSize:11 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#EA4335",
                  display:"inline-block", animation:"pulse-dot 1.8s infinite" }}/>
                Upcoming Event
              </span>
            </div>
            <GoogleDots/>
            <h2 style={{
              fontFamily:"'Poppins',sans-serif", fontWeight:800,
              fontSize:"clamp(28px,4vw,44px)", color:"#202124",
              lineHeight:1.15, marginBottom:18,
            }}>
              AI Baithak
            </h2>
            <p style={{ fontSize:16, color:"#5F6368", lineHeight:1.8, marginBottom:20 }}>
              An upcoming learning session by <strong style={{ color:"#202124" }}>ZGDC&ndash;CASPAM</strong>,
              designed to introduce students to modern AI tools, emerging technologies,
              and practical development concepts.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:20, fontSize:14, color:"#9AA0A6", marginBottom:28 }}>
              <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                <PinIcon size={14} style={{ color:"#EA4335" }}/>
                Computer Lab, CASPAM, BZU Multan
              </span>
              <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                <CalendarIcon size={14} style={{ color:"#4285F4" }}/>
                Every alternate Friday
              </span>
            </div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <a href="#/events" className="btn btn-primary" style={{ padding:"13px 26px", fontSize:14 }}>
                <StarIcon size={15}/> View Full Details
              </a>
              <a href="#/contact" className="btn btn-ghost" style={{ padding:"13px 26px", fontSize:14 }}>
                Get More Info
              </a>
            </div>
          </div>

          {/* Teamwork image */}
          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{
              width:"min(100%,420px)", borderRadius:20, overflow:"hidden",
              boxShadow:"0 4px 24px rgba(60,64,67,.12)",
              aspectRatio:"4/3",
            }}>
              <img src="/teamwork2.jpg" alt="ZGDC CASPAM workshop session"
                style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
            </div>
          </div>
        </div>

        {/* Session schedule cards */}
        <div>
          <p style={{ fontWeight:700, fontSize:12, color:"#9AA0A6", textTransform:"uppercase",
            letterSpacing:".10em", textAlign:"center", marginBottom:20 }}>Session Schedule</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:14 }}>
            {sessions.map(({ num, date, color }) => (
              <div key={num} style={{
                background:"#fff", border:`1px solid ${color}33`,
                borderLeft:`4px solid ${color}`, borderRadius:12,
                padding:"18px 20px",
                boxShadow:"0 1px 4px rgba(60,64,67,.08)",
                display:"flex", flexDirection:"column", gap:6,
              }}>
                <div style={{ fontSize:11, fontWeight:700, color,
                  textTransform:"uppercase", letterSpacing:".06em" }}>Session {num}</div>
                <div style={{ display:"flex", alignItems:"center", gap:7, fontSize:14,
                  color:"#202124", fontWeight:600 }}>
                  <CalendarIcon size={13} style={{ color:"#4285F4", flexShrink:0 }}/>
                  {date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .baithak-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width:820px) {
          .baithak-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

/* ─────────────────────────────────────────
   Home page  —  exact section order:
   Hero → HOD → What We Do → AI Baithak → CTA
   NOTE: <Tracks/> (first "What We Do") is intentionally removed
───────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <HodSection />
      <WhatWeDoSection />
      <AIBaithakSection />

      {/* Join CTA */}
      <section style={{ background:"#fff", padding:"88px 0", borderTop:"1px solid #E8EAED" }}>
        <div style={{ maxWidth:700, margin:"0 auto", padding:"0 24px", textAlign:"center" }}>
          <GoogleDots/>
          <h2 style={{
            fontFamily:"'Poppins',sans-serif", fontWeight:800,
            fontSize:"clamp(28px,4vw,42px)", color:"#202124", marginBottom:14,
          }}>
            Ready to join?
          </h2>
          <p style={{ color:"#5F6368", fontSize:17, lineHeight:1.75, marginBottom:36 }}>
            Come to our next event or get in touch &mdash; we&apos;d love to have you as part of the community.
          </p>
          <div style={{ display:"flex", justifyContent:"center", gap:14, flexWrap:"wrap" }}>
            <a href="#/events" className="btn btn-primary" style={{ padding:"14px 32px", fontSize:15 }}>
              <StarIcon size={16}/> See Events
            </a>
            <a href="#/contact" className="btn btn-ghost" style={{ padding:"14px 32px", fontSize:15 }}>
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
