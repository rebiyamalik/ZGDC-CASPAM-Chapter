import Hero from '../components/Hero'
import Tracks from '../components/Tracks'
import {
  StarIcon, PinIcon, CalendarIcon, BookIcon, UsersIcon,
  GrowthIcon, SparkleIcon, CodeIcon, GlobeIcon,
} from '../components/Icons'

/* ─────────────────────────────────────────
   HOD Section — "A Message of Gratitude"
───────────────────────────────────────── */
function HodSection() {
  return (
    <section style={{ background:"#fff", padding:"80px 0", borderTop:"1px solid var(--border)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px" }}>
        <div className="hod-grid" style={{ display:"grid", gap:56, alignItems:"center" }}>

          {/* Image */}
          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{
              width:300, height:300, borderRadius:24, overflow:"hidden",
              boxShadow:"0 4px 24px rgba(66,133,244,.15)",
              border:"3px solid rgba(66,133,244,.18)",
              flexShrink:0,
            }}>
              <img
                src="/hod.jpg"
                alt="Head of Department"
                style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center" }}
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <p style={{ fontSize:12, fontWeight:600, color:"#4285F4", textTransform:"uppercase",
              letterSpacing:".12em", marginBottom:12 }}>A Message of Gratitude</p>
            <h2 style={{
              fontFamily:"'Poppins',sans-serif", fontWeight:800,
              fontSize:"clamp(24px,3.5vw,36px)", color:"var(--ink)", marginBottom:20,
            }}>
              Guided by Excellence
            </h2>
            <p style={{ fontSize:16, lineHeight:1.85, color:"var(--text)", marginBottom:20 }}>
              We sincerely acknowledge and appreciate the guidance, encouragement, and continuous
              support of our respected Head of Department. His commitment to academic excellence,
              innovation, and student development provides valuable encouragement to our community.
            </p>
            <p style={{ fontSize:16, lineHeight:1.85, color:"var(--text)" }}>
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
   What We Do — 4 cards (matching About page)
───────────────────────────────────────── */
const activities = [
  {
    color:"#4285F4", Icon:SparkleIcon,
    title:"Technology & AI Workshops",
    desc:"Hands-on learning experiences in AI, programming, automation, and emerging technologies.",
  },
  {
    color:"#EA4335", Icon:CodeIcon,
    title:"Projects & Development",
    desc:"Building practical applications, experimenting with new ideas, and solving real-world problems.",
  },
  {
    color:"#FBBC05", Icon:GrowthIcon,
    title:"Competitions & Innovation",
    desc:"Providing opportunities to showcase creativity, technical skills, and innovative thinking.",
  },
  {
    color:"#34A853", Icon:UsersIcon,
    title:"Community & Collaboration",
    desc:"Connecting students, sharing knowledge, supporting one another, and growing together.",
  },
]

function WhatWeDoSection() {
  return (
    <section style={{ background:"var(--soft)", padding:"80px 0", borderTop:"1px solid var(--border)" }}>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ textAlign:"center", maxWidth:600, margin:"0 auto 48px" }}>
          <p style={{ fontSize:12, fontWeight:600, color:"#4285F4", textTransform:"uppercase",
            letterSpacing:".12em", marginBottom:12 }}>What We Do</p>
          <h2 style={{
            fontFamily:"'Poppins',sans-serif", fontWeight:800,
            fontSize:"clamp(26px,4vw,38px)", color:"var(--ink)", marginBottom:14,
          }}>
            Our Activities &amp; Focus Areas
          </h2>
          <p style={{ fontSize:16, color:"var(--text)", lineHeight:1.75 }}>
            ZGDC&ndash;CASPAM brings students together across a wide range of technology disciplines &mdash;
            from AI workshops to collaborative community projects.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20 }}>
          {activities.map(({ color, Icon, title, desc }) => (
            <div key={title} style={{
              background:"#fff", borderRadius:16,
              border:`1px solid ${color}20`,
              padding:28, boxShadow:"var(--shadow-sm)",
              transition:"transform .25s, box-shadow .25s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="var(--shadow)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="var(--shadow-sm)";}}
            >
              <div style={{ width:40, height:4, borderRadius:4, background:color, marginBottom:20 }}/>
              <div style={{ width:48, height:48, borderRadius:12, background:`${color}15`,
                display:"grid", placeItems:"center", color, marginBottom:16 }}>
                <Icon size={22}/>
              </div>
              <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:17,
                color:"var(--ink)", marginBottom:10 }}>{title}</h3>
              <p style={{ fontSize:14, color:"var(--text)", lineHeight:1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   AI Baithak — event info + session dates only
   (No topics — those are on the Events page)
───────────────────────────────────────── */
const sessions = [
  { num:1, date:"Friday, 06 November 2026", color:"#4285F4" },
  { num:2, date:"Friday, 20 November 2026", color:"#EA4335" },
  { num:3, date:"Friday, 04 December 2026", color:"#34A853" },
  { num:4, date:"Friday, 18 December 2026", color:"#FBBC05" },
]

function AIBaithakSection() {
  return (
    <section style={{ background:"#fff", padding:"80px 0", borderTop:"1px solid var(--border)" }}>
      <div style={{ maxWidth:860, margin:"0 auto", padding:"0 24px" }}>

        {/* Header */}
        <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 48px" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <span className="badge badge-red" style={{ fontSize:11 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#EA4335",
                display:"inline-block", animation:"pulse-dot 1.8s infinite" }}/>
              Upcoming Event
            </span>
          </div>
          <h2 style={{
            fontFamily:"'Poppins',sans-serif", fontWeight:800,
            fontSize:"clamp(28px,4.5vw,42px)", color:"var(--ink)", marginBottom:14,
          }}>
            AI Baithak
          </h2>
          <p style={{ fontSize:17, color:"var(--text)", lineHeight:1.75, marginBottom:16 }}>
            An upcoming learning session by <strong>ZGDC&ndash;CASPAM</strong>, designed to introduce
            students to modern AI tools, emerging technologies, and practical development concepts.
          </p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", flexWrap:"wrap", gap:20, fontSize:14, color:"var(--muted)" }}>
            <span style={{ display:"flex", alignItems:"center", gap:6 }}>
              <PinIcon size={14} style={{ color:"#EA4335" }}/>
              Computer Lab, CASPAM, Bahauddin Zakariya University, Multan
            </span>
            <span style={{ display:"flex", alignItems:"center", gap:6 }}>
              <CalendarIcon size={14} style={{ color:"#4285F4" }}/>
              Every alternate Friday
            </span>
          </div>
        </div>

        {/* Session dates */}
        <div style={{ marginBottom:44 }}>
          <p style={{ fontWeight:600, fontSize:13, color:"var(--muted)", textTransform:"uppercase",
            letterSpacing:".08em", textAlign:"center", marginBottom:20 }}>Session Schedule</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:14 }}>
            {sessions.map(({ num, date, color }) => (
              <div key={num} style={{
                background:"#fff", border:`1px solid ${color}33`,
                borderLeft:`4px solid ${color}`, borderRadius:12,
                padding:"18px 20px", boxShadow:"var(--shadow-sm)",
                display:"flex", flexDirection:"column", gap:6,
              }}>
                <div style={{ fontSize:11, fontWeight:700, color,
                  textTransform:"uppercase", letterSpacing:".06em" }}>Session {num}</div>
                <div style={{ display:"flex", alignItems:"center", gap:7, fontSize:14,
                  color:"var(--ink)", fontWeight:600 }}>
                  <CalendarIcon size={13} style={{ color:"var(--blue)", flexShrink:0 }}/>
                  {date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign:"center", display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <a href="#/events" className="btn btn-primary">
            <StarIcon size={16}/> View Full Event Details
          </a>
          <a href="#/contact" className="btn btn-ghost">Get More Info</a>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   Home page — section order
───────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <Tracks />
      <HodSection />
      <WhatWeDoSection />
      <AIBaithakSection />

      {/* Join CTA */}
      <section style={{ background:"var(--soft)", padding:"80px 0", borderTop:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px", textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700,
            fontSize:"clamp(26px,4vw,36px)", color:"var(--ink)", marginBottom:12 }}>
            Ready to join?
          </h2>
          <p style={{ color:"var(--text)", fontSize:17, marginBottom:32 }}>
            Come to our next event or get in touch &mdash; we&apos;d love to have you.
          </p>
          <div style={{ display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap" }}>
            <a href="#/events" className="btn btn-primary"><StarIcon size={16}/> See Events</a>
            <a href="#/contact" className="btn btn-ghost">Contact Us</a>
          </div>
        </div>
      </section>
    </>
  )
}
