import Hero from '../components/Hero'
import Tracks from '../components/Tracks'
import {
  BrainIcon, SparkleIcon, CodeIcon, GlobeIcon,
  StarIcon, PinIcon, CalendarIcon,
  BookIcon, UsersIcon, GrowthIcon, RocketIcon,
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
            <div className="eyebrow" style={{ marginBottom:12 }}>A Message of Gratitude</div>
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
   What We Do — 6 cards
───────────────────────────────────────── */
const activities = [
  {
    color:"#4285F4", Icon:GlobeIcon,
    title:"Web Development",
    desc:"Exploring modern web technologies, frameworks, and building responsive, user-friendly web applications.",
  },
  {
    color:"#EA4335", Icon:SparkleIcon,
    title:"UI/UX Design",
    desc:"Understanding user experience, interface design principles, and creating intuitive, accessible digital products.",
  },
  {
    color:"#34A853", Icon:CodeIcon,
    title:"App Development",
    desc:"Exploring application development for mobile and desktop platforms using modern tools and technologies.",
  },
  {
    color:"#FBBC05", Icon:BrainIcon,
    title:"AI & Emerging Technologies",
    desc:"Discovering Artificial Intelligence, machine learning concepts, and the technologies shaping our future.",
  },
  {
    color:"#4285F4", Icon:BookIcon,
    title:"Workshops & Technical Learning",
    desc:"Interactive workshops, hands-on sessions, and practical learning activities for all experience levels.",
  },
  {
    color:"#34A853", Icon:UsersIcon,
    title:"Projects, Innovation & Collaboration",
    desc:"Encouraging creative ideas, team collaboration, and turning concepts into real-world technology projects.",
  },
]

function WhatWeDoSection() {
  return (
    <section style={{ background:"var(--soft)", padding:"80px 0", borderTop:"1px solid var(--border)" }}>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ textAlign:"center", maxWidth:620, margin:"0 auto 52px" }}>
          <div className="eyebrow" style={{ justifyContent:"center" }}>What We Do</div>
          <h2 style={{
            fontFamily:"'Poppins',sans-serif", fontWeight:800,
            fontSize:"clamp(26px,4vw,38px)", color:"var(--ink)", marginBottom:14, marginTop:10,
          }}>
            Learning, Building &amp; Growing Together
          </h2>
          <p style={{ fontSize:16, color:"var(--text)", lineHeight:1.75 }}>
            ZGDC&ndash;CASPAM brings students together to explore technology across a wide
            range of domains — from web development to artificial intelligence.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
          {activities.map(({ color, Icon, title, desc }) => (
            <div key={title} style={{
              background:"#fff", border:`1px solid ${color}22`,
              borderTop:`4px solid ${color}`, borderRadius:16,
              padding:26, boxShadow:"var(--shadow-sm)",
              transition:"transform .25s, box-shadow .25s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="var(--shadow)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="var(--shadow-sm)";}}
            >
              <div style={{ width:48, height:48, borderRadius:12, background:`${color}15`,
                display:"grid", placeItems:"center", color, marginBottom:14 }}>
                <Icon size={22}/>
              </div>
              <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:17, color:"var(--ink)", marginBottom:8 }}>{title}</h3>
              <p style={{ fontSize:14, color:"var(--text)", lineHeight:1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   AI Baithak — 4-session schedule
───────────────────────────────────────── */
const topics = [
  { color:"#4285F4", Icon:SparkleIcon, title:"Prompt Engineering",   desc:"Communicate effectively with AI through structured prompts." },
  { color:"#EA4335", Icon:BrainIcon,   title:"Artificial Intelligence", desc:"Explore AI fundamentals and real-world applications." },
  { color:"#34A853", Icon:CodeIcon,    title:"App Development",      desc:"Design and build apps using modern development tools." },
  { color:"#FBBC05", Icon:GlobeIcon,   title:"Google AI Studio",     desc:"Experiment with AI models and build AI-powered apps." },
]

const sessions = [
  { num:1, date:"Friday, 06 November 2026" },
  { num:2, date:"Friday, 20 November 2026" },
  { num:3, date:"Friday, 04 December 2026" },
  { num:4, date:"Friday, 18 December 2026" },
]

const sessionColors = ["#4285F4","#EA4335","#34A853","#FBBC05"]

function AIBaithakSection() {
  return (
    <section style={{ background:"#fff", padding:"80px 0", borderTop:"1px solid var(--border)" }}>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px" }}>

        {/* Header */}
        <div style={{ textAlign:"center", maxWidth:680, margin:"0 auto 52px" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <span className="badge badge-red" style={{ fontSize:11 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#EA4335", display:"inline-block", animation:"pulse-dot 1.8s infinite" }}/>
              Upcoming Event
            </span>
          </div>
          <h2 style={{
            fontFamily:"'Poppins',sans-serif", fontWeight:800,
            fontSize:"clamp(28px,4.5vw,42px)", color:"var(--ink)", marginBottom:16,
          }}>
            AI Baithak
          </h2>
          <p style={{ fontSize:17, color:"var(--text)", lineHeight:1.75 }}>
            An upcoming learning session by <strong>ZGDC&ndash;CASPAM</strong>, designed to introduce students
            to modern AI tools, emerging technologies, and practical development concepts.
          </p>
          <div style={{ marginTop:10, fontSize:14, color:"var(--muted)", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
            <PinIcon size={14} style={{ color:"#EA4335" }}/> CASPAM, Bahauddin Zakariya University, Multan
          </div>
        </div>

        {/* Session Schedule */}
        <div style={{ marginBottom:44 }}>
          <p style={{ fontWeight:600, fontSize:13, color:"var(--muted)", textTransform:"uppercase",
            letterSpacing:".08em", textAlign:"center", marginBottom:20 }}>Session Schedule</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:14 }}>
            {sessions.map(({ num, date }) => (
              <div key={num} style={{
                background:"#fff", border:`1px solid ${sessionColors[num-1]}33`,
                borderLeft:`4px solid ${sessionColors[num-1]}`,
                borderRadius:12, padding:"18px 20px",
                boxShadow:"var(--shadow-sm)",
                display:"flex", flexDirection:"column", gap:4,
              }}>
                <div style={{ fontSize:12, fontWeight:700, color:sessionColors[num-1],
                  textTransform:"uppercase", letterSpacing:".06em" }}>Session {num}</div>
                <div style={{ display:"flex", alignItems:"center", gap:7, fontSize:14, color:"var(--ink)", fontWeight:600 }}>
                  <CalendarIcon size={13} style={{ color:"var(--blue)", flexShrink:0 }}/>
                  {date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topics grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:20, marginBottom:40 }}>
          {topics.map(({ color, Icon, title, desc }) => (
            <div key={title} style={{
              background:"#fff", border:`1px solid ${color}22`,
              borderTop:`4px solid ${color}`, borderRadius:16,
              padding:24, boxShadow:"var(--shadow-sm)",
              transition:"transform .25s, box-shadow .25s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="var(--shadow)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="var(--shadow-sm)";}}
            >
              <div style={{ width:48, height:48, borderRadius:12, background:`${color}15`,
                display:"grid", placeItems:"center", color, marginBottom:14 }}>
                <Icon size={22}/>
              </div>
              <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:17, color:"var(--ink)", marginBottom:8 }}>{title}</h3>
              <p style={{ fontSize:14, color:"var(--text)", lineHeight:1.65 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign:"center", display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <a href="#/events" className="btn btn-primary">
            <StarIcon size={16}/> View Event Details
          </a>
          <a href="#/contact" className="btn btn-ghost">
            Get More Info
          </a>
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
          <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:"clamp(26px,4vw,36px)", color:"var(--ink)", marginBottom:12 }}>
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
