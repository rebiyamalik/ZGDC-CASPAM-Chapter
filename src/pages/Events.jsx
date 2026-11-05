import events from '../data/events.json'
import RegistrationForm from '../components/RegistrationForm'
import { CalendarIcon, PinIcon, SparkleIcon, BrainIcon, CodeIcon, GlobeIcon } from '../components/Icons'

const GoogleDots = () => (
  <div style={{ display:"flex", gap:7, marginBottom:18 }}>
    {["#4285F4","#EA4335","#FBBC05","#34A853"].map(c => (
      <span key={c} style={{ width:10, height:10, borderRadius:"50%", background:c, display:"inline-block" }}/>
    ))}
  </div>
)

const topicIcons  = { prompt: SparkleIcon, ai: BrainIcon, app: CodeIcon, google: GlobeIcon }
const topicColors = { prompt:"#4285F4", ai:"#EA4335", app:"#34A853", google:"#FBBC05" }

const sessionColors = ["#4285F4","#EA4335","#34A853","#FBBC05"]
const sessions = [
  { num:1, date:"Friday, 06 November 2026" },
  { num:2, date:"Friday, 20 November 2026" },
  { num:3, date:"Friday, 04 December 2026" },
  { num:4, date:"Friday, 18 December 2026" },
]

/* ── Event card ── */
function EventCard({ ev }) {
  const upcoming = ev.status === 'upcoming'
  return (
    <article style={{
      background:"#fff", border:"1px solid #E8EAED", borderRadius:20,
      overflow:"hidden", boxShadow:"0 1px 4px rgba(60,64,67,.06), 0 4px 16px rgba(60,64,67,.04)",
      transition:"transform .25s, box-shadow .25s",
    }}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 4px 24px rgba(60,64,67,.12)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 1px 4px rgba(60,64,67,.06), 0 4px 16px rgba(60,64,67,.04)";}}
    >
      {/* Top colour accent */}
      <div style={{ height:4, background: upcoming
        ? "linear-gradient(90deg,#4285F4,#34A853)"
        : "linear-gradient(90deg,#E8EAED,#E8EAED)" }}/>

      <div style={{ padding:"28px 28px 32px" }}>
        {/* Badge */}
        <div style={{ marginBottom:16 }}>
          <span style={{
            display:"inline-flex", alignItems:"center", gap:6,
            background: upcoming ? "rgba(52,168,83,.08)" : "rgba(66,133,244,.08)",
            border: upcoming ? "1px solid rgba(52,168,83,.2)" : "1px solid rgba(66,133,244,.2)",
            borderRadius:999, padding:"4px 12px",
            fontSize:11, fontWeight:700,
            color: upcoming ? "#1e7e34" : "#1a56c4",
            textTransform:"uppercase", letterSpacing:".08em",
          }}>
            {upcoming ? "🟢 Upcoming" : "Past Event"}
          </span>
        </div>

        <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:"clamp(20px,2.8vw,26px)", color:"#202124", marginBottom:10 }}>
          {ev.title}
        </h3>
        <p style={{ fontSize:15, color:"#5F6368", lineHeight:1.75, marginBottom:16 }}>{ev.desc}</p>

        {/* Meta */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:14, marginBottom:20, fontSize:14, color:"#5F6368" }}>
          <span style={{ display:"flex", alignItems:"center", gap:6 }}>
            <CalendarIcon size={14} style={{ color:"#4285F4" }}/> {ev.date}{ev.time && ev.time !== "TBA" ? ` · ${ev.time}` : ""}
          </span>
          <span style={{ display:"flex", alignItems:"center", gap:6 }}>
            <PinIcon size={14} style={{ color:"#EA4335" }}/> {ev.venue}
          </span>
        </div>

        {/* Session Schedule */}
        {upcoming && (
          <div style={{ marginBottom:22 }}>
            <p style={{ fontWeight:600, fontSize:12, color:"#9AA0A6", textTransform:"uppercase", letterSpacing:".08em", marginBottom:12 }}>
              Session Schedule
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:10 }}>
              {sessions.map(({ num, date }) => (
                <div key={num} style={{
                  background:"#F8F9FA", borderRadius:10, padding:"12px 14px",
                  border:`1px solid ${sessionColors[num-1]}25`,
                  borderLeft:`3px solid ${sessionColors[num-1]}`,
                  display:"flex", flexDirection:"column", gap:4,
                }}>
                  <div style={{ fontSize:11, fontWeight:700, color:sessionColors[num-1],
                    textTransform:"uppercase", letterSpacing:".06em" }}>Session {num}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"#202124", fontWeight:500 }}>
                    <CalendarIcon size={11} style={{ color:"#4285F4", flexShrink:0 }}/>
                    {date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Topics */}
        {ev.topics && ev.topics.length > 0 && (
          <div style={{ marginBottom:22 }}>
            <p style={{ fontWeight:600, fontSize:12, color:"#9AA0A6", textTransform:"uppercase", letterSpacing:".08em", marginBottom:12 }}>
              Topics Covered
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:10 }}>
              {ev.topics.map(t => {
                const Icon  = topicIcons[t.icon]  || SparkleIcon
                const color = topicColors[t.icon] || "#4285F4"
                return (
                  <div key={t.title} style={{
                    background:"#F8F9FA", borderRadius:10, padding:"12px 14px",
                    border:`1px solid ${color}18`, display:"flex", gap:10, alignItems:"flex-start",
                  }}>
                    <div style={{ width:32, height:32, borderRadius:8, background:`${color}15`,
                      display:"grid", placeItems:"center", color, flexShrink:0 }}>
                      <Icon size={16}/>
                    </div>
                    <div>
                      <div style={{ fontWeight:600, fontSize:13.5, color:"#202124", marginBottom:2 }}>{t.title}</div>
                      <div style={{ fontSize:12.5, color:"#5F6368", lineHeight:1.5 }}>{t.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Seats notice */}
        {upcoming && (
          <div style={{
            background:"rgba(234,67,53,.05)", border:"1px solid rgba(234,67,53,.18)",
            borderRadius:10, padding:"10px 14px", marginBottom:20,
            fontSize:13, color:"#c5221f", fontWeight:600,
            display:"flex", alignItems:"center", gap:8,
          }}>
            <span style={{ fontSize:15 }}>⚠️</span>
            Seats are limited &mdash; only 20 seats available. Register early to secure your spot.
          </div>
        )}

        {/* Registration form */}
        {upcoming && <RegistrationForm ev={ev}/>}

        {/* Past event notes */}
        {ev.notes && ev.notes.length > 0 && (
          <div style={{ marginTop:20 }}>
            <h4 style={{ fontSize:13.5, fontWeight:700, marginBottom:8, color:"#202124" }}>Session Notes (PDF)</h4>
            <ul style={{ listStyle:"none", padding:0, margin:0, display:"grid", gap:6 }}>
              {ev.notes.map(n => (
                <li key={n.file}>
                  <a href={n.file} download style={{ color:"#4285F4", fontWeight:600, fontSize:13.5, textDecoration:"none" }}>
                    ⬇ {n.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  )
}

/* ── Page ── */
export default function Events() {
  const upcoming = events.filter(e => e.status === 'upcoming')
  const past     = events.filter(e => e.status === 'past')

  return (
    <section style={{ background:"#fff", padding:"72px 0" }}>
      <div style={{ maxWidth:880, margin:"0 auto", padding:"0 24px" }}>

        {/* Page header */}
        <div style={{ marginBottom:52 }}>
          <GoogleDots/>
          <p style={{ fontSize:12, fontWeight:700, color:"#4285F4", textTransform:"uppercase",
            letterSpacing:".10em", marginBottom:10 }}>Events</p>
          <h1 style={{
            fontFamily:"'Poppins',sans-serif", fontWeight:800,
            fontSize:"clamp(30px,5vw,48px)", color:"#202124",
            lineHeight:1.1, marginBottom:12,
          }}>
            Community Events
          </h1>
          <p style={{ fontSize:16, color:"#5F6368", maxWidth:520, lineHeight:1.75 }}>
            Workshops, learning sessions, and community activities organized by ZGDC&ndash;CASPAM.
          </p>
        </div>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div style={{ marginBottom:56 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
              <span style={{
                display:"inline-flex", alignItems:"center", gap:6,
                background:"rgba(52,168,83,.08)", border:"1px solid rgba(52,168,83,.2)",
                borderRadius:999, padding:"5px 14px",
                fontSize:12, fontWeight:700, color:"#1e7e34",
                textTransform:"uppercase", letterSpacing:".08em",
              }}>Upcoming</span>
            </div>
            <div style={{ display:"grid", gap:24 }}>
              {upcoming.map(e => <EventCard key={e.id} ev={e}/>)}
            </div>
          </div>
        )}

        {/* Past */}
        {past.length > 0 && (
          <div>
            <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:20,
              color:"#202124", marginBottom:20 }}>
              Past Events
            </h2>
            <div style={{ display:"grid", gap:24 }}>
              {past.map(e => <EventCard key={e.id} ev={e}/>)}
            </div>
          </div>
        )}

        {/* Empty past state */}
        {past.length === 0 && (
          <div style={{ background:"#F8F9FA", borderRadius:14, padding:"36px 24px", textAlign:"center", border:"1px solid #E8EAED" }}>
            <p style={{ color:"#9AA0A6", fontSize:14 }}>Past events will be listed here after they take place.</p>
          </div>
        )}

      </div>
    </section>
  )
}
