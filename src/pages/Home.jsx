import Hero from '../components/Hero'
import '../styles/Home.css'
import { StarIcon, PinIcon, CalendarIcon } from '../components/Icons'
import { ZGDC } from '../data/zgdcInfo'

/* ── Google colour dots ── */
const GoogleDots = () => (
  <div style={{ marginBottom:18 }}>
    <span className="zgdc-animated-dots" aria-hidden="true"><i/><i/><i/><i/></span>
  </div>
)

/* ── Eyebrow label ── */
const Eyebrow = ({ text, color="#4285F4" }) => (
  <p style={{ fontSize:12, fontWeight:700, color, textTransform:"uppercase",
    letterSpacing:".10em", marginBottom:10 }}>{text}</p>
)

/* ─────────────────────────────────────────
   HOD Section
───────────────────────────────────────── */
function HodSection() {
  return (
    <section className="home-gratitude">
      <div className="home-gratitude-shell">
        <div className="home-gratitude-grid">
          <div className="home-gratitude-copy">
            <span className="home-gratitude-eyebrow">
              <span className="zgdc-animated-dots" aria-hidden="true"><i/><i/><i/><i/></span>
              A Message of Gratitude
            </span>
            <h2>Guided by Excellence</h2>
            <p className="home-gratitude-lead">
              Recognising the guidance and support that help our student community grow.
            </p>
            <p>
              We sincerely acknowledge and appreciate the guidance, encouragement, and
              continuous support of <strong>Prof. Dr. Imran Javaid, Head of Department, CASPAM</strong>.
              His commitment to academic excellence and student development provides
              valuable encouragement to our community.
            </p>
            <p>
              His support motivates us to explore new opportunities, strengthen our abilities,
              and create a meaningful impact through technology and collaboration.
            </p>
            <div className="home-gratitude-signature">
              <span className="home-gratitude-signature-rule"/>
              <div>
                <strong>Prof. Dr. Imran Javaid</strong>
                <span>Head of Department · CASPAM, BZU Multan</span>
              </div>
            </div>
          </div>

          <div className="home-gratitude-photo-wrap">
            <div className="home-gratitude-photo-frame">
              <img src="/hod.jpg" alt="Prof. Dr. Imran Javaid, Head of Department at CASPAM"/>
            </div>
            <div className="home-gratitude-photo-caption">
              <strong>Prof. Dr. Imran Javaid</strong>
              <span>Head of Department, CASPAM</span>
            </div>
            <span className="home-gratitude-photo-accent" aria-hidden="true"/>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   What We Do — 4 pill-bar cards
───────────────────────────────────────── */
const activities = [
  { color:"#4285F4", title:"Technology & AI Workshops",
    desc:"Hands-on learning experiences in AI, programming, automation, and emerging technologies." },
  { color:"#EA4335", title:"Projects & Development",
    desc:"Building practical applications, experimenting with new ideas, and solving real-world problems." },
  { color:"#FBBC05", title:"Competitions & Innovation",
    desc:"Providing opportunities to showcase creativity, technical skills, and innovative thinking." },
  { color:"#34A853", title:"Community & Collaboration",
    desc:"Connecting students, sharing knowledge, supporting one another, and growing together." },
]

function WhatWeDoSection() {
  return (
    <section className="home-whatwedo" style={{ background:"#fff", padding:"80px 0", borderTop:"1px solid #E8EAED" }}>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px" }}>

        {/* Section header */}
        <div className="whatwedo-header" style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:40, alignItems:"end", marginBottom:44 }}>
          <div>
            <Eyebrow text="What We Do"/>
            <GoogleDots/>
            <h2 style={{
              fontFamily:"'Poppins',sans-serif", fontWeight:800,
              fontSize:"clamp(26px,3.5vw,42px)", color:"#202124",
              lineHeight:1.15, marginBottom:12,
            }}>
              Our Activities &amp;<br/>Focus Areas
            </h2>
            <p style={{ fontSize:16, color:"#5F6368", lineHeight:1.75, maxWidth:480 }}>
              From AI workshops to collaborative projects &mdash; ZGDC&ndash;CASPAM brings students
              together across a wide range of technology disciplines.
            </p>
          </div>

          {/* Real session photo */}
          <div style={{ width:"min(100%,420px)" }} className="whatwedo-img">
            <div style={{
              borderRadius:16, overflow:"hidden",
              boxShadow:"0 4px 20px rgba(60,64,67,.10)",
              border:"1px solid #E8EAED",
              aspectRatio:"16/9",
            }}>
              <img src="/zgdc-banner.jpg" alt="ZGDC CASPAM student developer community"
                loading="lazy" decoding="async"
                style={{ width:"100%", height:"100%", objectFit:"contain", background:"#111827", display:"block" }}/>
            </div>
          </div>
        </div>

        {/* 2×2 pill-bar cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16 }}>
          {activities.map(({ color, title, desc }) => (
            <div key={title} style={{
              background:"#fff", borderRadius:16,
              border:"1px solid #E8EAED",
              padding:"26px 26px 28px",
              boxShadow:"0 1px 3px rgba(60,64,67,.06), 0 4px 12px rgba(60,64,67,.03)",
              transition:"transform .22s ease, box-shadow .22s ease",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 4px 20px rgba(60,64,67,.12)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 1px 3px rgba(60,64,67,.06), 0 4px 12px rgba(60,64,67,.03)";}}
            >
              <div style={{ width:40, height:5, borderRadius:999, background:color, marginBottom:20 }}/>
              <h3 style={{
                fontFamily:"'Poppins',sans-serif", fontWeight:700,
                fontSize:17, color:"#202124", marginBottom:9,
              }}>{title}</h3>
              <p style={{ fontSize:14.5, color:"#5F6368", lineHeight:1.7 }}>{desc}</p>
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


/* ── Upcoming event spotlight ── */
function UpcomingEventSpotlight() {
  return (
    <section className="home-event-wrap">
      <div className="home-event-card">
        <div className="home-event-accent"/>
        <div className="home-event-copy">
          <span className="home-event-label"><i/> Upcoming event</span>
          <h2>AI Baithak</h2>
          <p>A practical learning series exploring modern AI tools, emerging technologies, and development concepts.</p>
          <div className="home-event-details">
            <span><PinIcon size={14}/> Computer Lab, CASPAM, BZU Multan</span>
            <span><CalendarIcon size={14}/> Friday, 06 November 2026</span>
            <strong>Free of cost</strong>
          </div>
        </div>
        <div className="home-event-action">
          <span className="home-event-free">30 seats available</span>
          <a href="#/events" className="btn btn-primary">Register Now <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  )
}

/* ── Chapter facts ── */
function CommunityStats() {
  const stats = [
    { value:`${ZGDC.members}+`, label:"Community members", color:"#4285F4" },
    { value:"4", label:"Focus areas", color:"#EA4335" },
    { value:ZGDC.founded, label:"Chapter established", color:"#FBBC05" },
    { value:"CASPAM", label:"BZU Multan", color:"#34A853" },
  ]
  return (
    <section className="home-stats">
      <div className="home-stats-grid">
        {stats.map(item => (
          <div className="home-stat" key={item.label} style={{"--stat-color":item.color}}>
            <strong>{item.value}</strong><span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   AI Baithak — event info + 4 session dates
───────────────────────────────────────── */
const sessions = [
  { num:1, date:"Friday, 06 November 2026", color:"#4285F4" },
  { num:2, date:"Friday, 20 November 2026", color:"#EA4335" },
  { num:3, date:"Friday, 04 December 2026", color:"#34A853" },
  { num:4, date:"Friday, 18 December 2026", color:"#FBBC05" },
]

function AIBaithakSection() {
  return (
    <section className="home-baithak" style={{ background:"#F8F9FA", padding:"80px 0", borderTop:"1px solid #E8EAED" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px" }}>

        {/* Two-col layout */}
        <div className="baithak-grid" style={{ display:"grid", gap:56, alignItems:"center", marginBottom:44 }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:16 }}>
              <span style={{
                display:"inline-flex", alignItems:"center", gap:6,
                background:"rgba(234,67,53,.08)", border:"1px solid rgba(234,67,53,.2)",
                borderRadius:999, padding:"5px 12px",
                fontSize:11, fontWeight:700, color:"#EA4335", textTransform:"uppercase", letterSpacing:".08em",
              }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#EA4335",
                  display:"inline-block", animation:"pulse-dot 1.8s infinite" }}/>
                Upcoming Event
              </span>
            </div>
            <GoogleDots/>
            <h2 style={{
              fontFamily:"'Poppins',sans-serif", fontWeight:800,
              fontSize:"clamp(26px,3.8vw,42px)", color:"#202124",
              lineHeight:1.15, marginBottom:16,
            }}>
              AI Baithak
            </h2>
            <p style={{ fontSize:16, color:"#5F6368", lineHeight:1.8, marginBottom:18 }}>
              An upcoming learning series by <strong style={{ color:"#202124" }}>ZGDC&ndash;CASPAM</strong>,
              designed to introduce students to modern AI tools, emerging technologies,
              and practical development concepts.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:18, fontSize:14, color:"#9AA0A6", marginBottom:26 }}>
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
              <a href="#/events" className="btn btn-primary" style={{ padding:"12px 24px", fontSize:14 }}>
                <StarIcon size={14}/> View Full Details
              </a>
              <a href="#/contact" className="btn btn-ghost" style={{ padding:"12px 24px", fontSize:14 }}>
                Get More Info
              </a>
            </div>
          </div>

          {/* Real session photo */}
          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{
              width:"min(100%,420px)", borderRadius:16, overflow:"hidden",
              boxShadow:"0 4px 24px rgba(60,64,67,.10)",
              border:"1px solid #E8EAED",
              aspectRatio:"4/3",
            }}>
              <img src="/session-photo.jpg" alt="AI Baithak session at CASPAM"
                style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
            </div>
          </div>
        </div>

        {/* Session schedule cards */}
        <div>
          <p style={{ fontWeight:700, fontSize:11, color:"#9AA0A6", textTransform:"uppercase",
            letterSpacing:".10em", textAlign:"center", marginBottom:18 }}>Session Schedule</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12 }}>
            {sessions.map(({ num, date, color }) => (
              <div key={num} style={{
                background:"#fff", border:`1px solid ${color}25`,
                borderLeft:`4px solid ${color}`, borderRadius:12,
                padding:"16px 18px",
                boxShadow:"0 1px 4px rgba(60,64,67,.06)",
                display:"flex", flexDirection:"column", gap:6,
              }}>
                <div style={{ fontSize:11, fontWeight:700, color,
                  textTransform:"uppercase", letterSpacing:".06em" }}>Session {num}</div>
                <div style={{ display:"flex", alignItems:"center", gap:7, fontSize:13.5,
                  color:"#202124", fontWeight:600 }}>
                  <CalendarIcon size={12} style={{ color:"#4285F4", flexShrink:0 }}/>
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
   Home page — section order:
   Hero → HOD → What We Do → AI Baithak → CTA
───────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <UpcomingEventSpotlight />
      <HodSection />
      <WhatWeDoSection />
      <CommunityStats />
      <AIBaithakSection />

      {/* Join CTA */}
      <section className="home-join" style={{ background:"#fff", padding:"80px 0", borderTop:"1px solid #E8EAED" }}>
        <div style={{ maxWidth:680, margin:"0 auto", padding:"0 24px", textAlign:"center" }}>
          <GoogleDots/>
          <h2 style={{
            fontFamily:"'Poppins',sans-serif", fontWeight:800,
            fontSize:"clamp(26px,3.8vw,40px)", color:"#202124", marginBottom:12,
          }}>
            Ready to join?
          </h2>
          <p style={{ color:"#5F6368", fontSize:16, lineHeight:1.8, marginBottom:32 }}>
            Come to our next event or get in touch &mdash; we&apos;d love to have you
            as part of the community.
          </p>
          <div style={{ display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap" }}>
            <a href="#/events" className="btn btn-primary" style={{ padding:"13px 28px", fontSize:14 }}>
              <StarIcon size={15}/> See Events
            </a>
            <a href="#/contact" className="btn btn-ghost" style={{ padding:"13px 28px", fontSize:14 }}>
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
