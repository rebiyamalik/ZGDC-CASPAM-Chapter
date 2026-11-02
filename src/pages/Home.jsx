import Hero from '../components/Hero'
import Tracks from '../components/Tracks'
import { BrainIcon, SparkleIcon, CodeIcon, GlobeIcon, StarIcon, PinIcon, AIBotIcon } from '../components/Icons'
import { useState } from 'react'

/* ── AI Baithak featured card ────────────────────────────── */
const topics = [
  { color:"#4285F4", Icon:SparkleIcon, title:"Prompt Engineering", desc:"Communicate effectively with AI through structured prompts." },
  { color:"#EA4335", Icon:BrainIcon,   title:"Artificial Intelligence", desc:"Explore AI fundamentals and real-world applications." },
  { color:"#34A853", Icon:CodeIcon,    title:"App Development", desc:"Design and build apps using modern development tools." },
  { color:"#FBBC05", Icon:GlobeIcon,   title:"Google AI Studio", desc:"Experiment with AI models and build AI-powered apps." },
]

function AIBaithakSection() {
  return (
    <section style={{ background:"var(--soft)", padding:"80px 0", borderTop:"1px solid var(--border)" }}>
      <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px" }}>

        {/* Header */}
        <div style={{ textAlign:"center", maxWidth:680, margin:"0 auto 52px" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <span className="badge badge-red" style={{ fontSize:11 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#EA4335", display:"inline-block", animation:"pulse-dot 1.8s infinite" }}/>
              Upcoming Event
            </span>
          </div>
          <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(28px,4.5vw,42px)", color:"var(--ink)", marginBottom:16, display:"flex", alignItems:"center", justifyContent:"center", gap:14 }}>
            {/* SVG icon instead of emoji */}
            <span style={{ width:52, height:52, borderRadius:16, background:"rgba(66,133,244,.12)", display:"inline-grid", placeItems:"center", color:"#4285F4", flexShrink:0 }}>
              <AIBotIcon size={28}/>
            </span>
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

/* ── FAQ Section ─────────────────────────────────────────── */
const faqs = [
  { q:"How can I get study notes and learning resources?", a:"You can explore our Notes section, where we share beginner-friendly notes, learning materials, and useful resources related to Artificial Intelligence, Prompt Engineering, Google AI Studio, App Development, and other technology topics. Stay connected for future updates." },
  { q:"How can I participate in upcoming events?", a:"Visit our Events section to discover upcoming workshops, sessions, and community activities. Event details and registration information will be provided whenever available." },
  { q:"What is AI Baithak?", a:"AI Baithak is an upcoming learning session organized by ZGDC-CASPAM, focusing on Artificial Intelligence, Prompt Engineering, Google AI Studio, and App Development." },
  { q:"How can I register for an event?", a:"Visit the event details section and follow the registration instructions provided. For assistance, contact our chapter through the Contact section." },
  { q:"Who can join ZGDC-CASPAM activities?", a:"Students interested in technology, programming, Artificial Intelligence, innovation, and development are welcome to explore our activities and learning opportunities." },
  { q:"Where can I find updates about events and activities?", a:"Follow our official LinkedIn page to stay informed about upcoming events, community activities, announcements, and learning opportunities." },
  { q:"Do I need programming experience to participate?", a:"Not necessarily. Many learning activities are suitable for beginners. Students with curiosity and an interest in technology are encouraged to participate." },
  { q:"How can I contact the ZGDC-CASPAM team?", a:"Visit our Contact section to find our chapter information and available communication channels." },
]

function FAQSection() {
  const [open, setOpen] = useState(null)
  return (
    <section style={{ background:"#fff", padding:"80px 0" }}>
      <div style={{ maxWidth:760, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div className="eyebrow" style={{ justifyContent:"center" }}>FAQ</div>
          <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:"clamp(26px,4vw,36px)", color:"var(--ink)", marginBottom:12 }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color:"var(--text)", fontSize:16 }}>Everything you need to know about ZGDC&ndash;CASPAM.</p>
        </div>

        <div style={{ display:"grid", gap:10 }}>
          {faqs.map((f, i) => (
            <div key={i} className="accordion-item">
              <button className="accordion-btn" aria-expanded={open===i} onClick={()=>setOpen(open===i?null:i)}>
                <span>{f.q}</span>
                <span className="accordion-icon">{open===i ? "−" : "+"}</span>
              </button>
              {open===i && <div className="accordion-body">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Home page ────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <Tracks />
      <AIBaithakSection />
      <FAQSection />

      {/* Join CTA */}
      <section style={{ background:"var(--soft)", padding:"80px 0", borderTop:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px", textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:"clamp(26px,4vw,36px)", color:"var(--ink)", marginBottom:12 }}>
            Ready to join?
          </h2>
          <p style={{ color:"var(--text)", fontSize:17, marginBottom:32 }}>
            Come to our next event or get in touch &mdash; we'd love to have you.
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
