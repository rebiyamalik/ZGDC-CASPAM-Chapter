import events from '../data/events.json'
import RegistrationForm from '../components/RegistrationForm'
import { CalendarIcon, PinIcon, SparkleIcon, BrainIcon, CodeIcon, GlobeIcon } from '../components/Icons'

const topicIcons  = { prompt: SparkleIcon, ai: BrainIcon, app: CodeIcon, google: GlobeIcon }
const topicColors = { prompt:"#4285F4", ai:"#EA4335", app:"#34A853", google:"#FBBC05" }

/* ── Event card ── */
function EventCard({ ev }) {
  const upcoming = ev.status === 'upcoming'
  return (
    <article style={{
      background:"#fff", border:"1px solid var(--border)", borderRadius:20,
      overflow:"hidden", boxShadow:"var(--shadow-sm)",
      transition:"transform .25s, box-shadow .25s",
    }}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="var(--shadow)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="var(--shadow-sm)";}}
    >
      {/* Coloured top accent */}
      <div style={{ height:4, background: upcoming
        ? "linear-gradient(90deg,#4285F4,#34A853)"
        : "linear-gradient(90deg,var(--border),var(--border))" }}/>

      <div style={{ padding:"28px 28px 32px" }}>
        {/* Badge */}
        <span className={upcoming ? "badge badge-green" : "badge badge-blue"} style={{ marginBottom:16 }}>
          {upcoming ? "🟢 Upcoming" : "Past Event"}
        </span>

        <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:"clamp(22px,3vw,28px)", color:"var(--ink)", marginBottom:12 }}>
          {ev.title}
        </h3>
        <p style={{ fontSize:15, color:"var(--text)", lineHeight:1.75, marginBottom:16 }}>{ev.desc}</p>

        {/* Meta */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:16, marginBottom:20, fontSize:14, color:"var(--text)" }}>
          <span style={{ display:"flex", alignItems:"center", gap:6 }}>
            <CalendarIcon size={15} style={{ color:"var(--blue)" }}/> {ev.date}{ev.time && ev.time !== "TBA" ? ` · ${ev.time}` : ""}
          </span>
          <span style={{ display:"flex", alignItems:"center", gap:6 }}>
            <PinIcon size={15} style={{ color:"var(--red)" }}/> {ev.venue}
          </span>
        </div>

        {/* Topics */}
        {ev.topics && ev.topics.length > 0 && (
          <div style={{ marginBottom:24 }}>
            <p style={{ fontWeight:600, fontSize:13, color:"var(--muted)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:12 }}>
              Topics Covered
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12 }}>
              {ev.topics.map(t => {
                const Icon  = topicIcons[t.icon]  || SparkleIcon
                const color = topicColors[t.icon] || "#4285F4"
                return (
                  <div key={t.title} style={{
                    background:"var(--soft)", borderRadius:12, padding:"14px 16px",
                    border:`1px solid ${color}22`, display:"flex", gap:12, alignItems:"flex-start",
                  }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:`${color}18`,
                      display:"grid", placeItems:"center", color, flexShrink:0 }}>
                      <Icon size={18}/>
                    </div>
                    <div>
                      <div style={{ fontWeight:600, fontSize:14, color:"var(--ink)", marginBottom:3 }}>{t.title}</div>
                      <div style={{ fontSize:13, color:"var(--text)", lineHeight:1.55 }}>{t.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Seats notice for upcoming events */}
        {upcoming && (
          <div style={{
            background:"rgba(234,67,53,.06)", border:"1px solid rgba(234,67,53,.2)",
            borderRadius:10, padding:"10px 16px", marginBottom:20,
            fontSize:13, color:"#c5221f", fontWeight:600,
            display:"flex", alignItems:"center", gap:8,
          }}>
            <span style={{ fontSize:16 }}>⚠️</span>
            Seats are limited — only 20 seats available!
          </div>
        )}

        {/* Registration — using original RegistrationForm component */}
        {upcoming && <RegistrationForm ev={ev}/>}

        {/* Past event notes */}
        {ev.notes && ev.notes.length > 0 && (
          <div style={{ marginTop:20 }}>
            <h4 style={{ fontSize:14, fontWeight:700, marginBottom:8, color:"var(--ink)" }}>Session Notes (PDF)</h4>
            <ul style={{ listStyle:"none", padding:0, margin:0, display:"grid", gap:6 }}>
              {ev.notes.map(n => (
                <li key={n.file}>
                  <a href={n.file} download style={{ color:"var(--blue)", fontWeight:600, fontSize:14, textDecoration:"none" }}>
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
    <section style={{ background:"#fff", padding:"80px 0" }}>
      <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px" }}>

        {/* Page header */}
        <div style={{ marginBottom:52 }}>
          <div className="eyebrow">Events</div>
          <h1 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800,
            fontSize:"clamp(32px,5vw,48px)", color:"var(--ink)", marginBottom:14 }}>
            Community Events
          </h1>
          <p style={{ fontSize:17, color:"var(--text)", maxWidth:560 }}>
            Workshops, learning sessions, and community activities organized by ZGDC&ndash;CASPAM.
          </p>
        </div>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div style={{ marginBottom:64 }}>
            <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:22,
              color:"var(--ink)", marginBottom:24, display:"flex", alignItems:"center", gap:10 }}>
              <span className="badge badge-green">Upcoming</span>
            </h2>
            <div style={{ display:"grid", gap:24 }}>
              {upcoming.map(e => <EventCard key={e.id} ev={e}/>)}
            </div>
          </div>
        )}

        {/* Past */}
        {past.length > 0 && (
          <div>
            <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:22,
              color:"var(--ink)", marginBottom:24 }}>
              Past Events
            </h2>
            <div style={{ display:"grid", gap:24 }}>
              {past.map(e => <EventCard key={e.id} ev={e}/>)}
            </div>
          </div>
        )}

        {/* Empty past state */}
        {past.length === 0 && (
          <div style={{ background:"var(--soft)", borderRadius:16, padding:"40px 24px", textAlign:"center", border:"1px solid var(--border)" }}>
            <p style={{ color:"var(--muted)", fontSize:15 }}>Past events will be listed here after they take place.</p>
          </div>
        )}

      </div>
    </section>
  )
}
