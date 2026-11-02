import events from '../data/events.json'
<<<<<<< HEAD
import RegistrationForm from '../components/RegistrationForm'

=======
import site from '../data/site.json'
import { dbEnabled, saveDoc } from '../lib/db'
import { useState } from 'react'
import { CalendarIcon, PinIcon, SparkleIcon, BrainIcon, CodeIcon, GlobeIcon, ArrowIcon } from '../components/Icons'

const topicIcons = { prompt: SparkleIcon, ai: BrainIcon, app: CodeIcon, google: GlobeIcon }
const topicColors = { prompt:"#4285F4", ai:"#EA4335", app:"#34A853", google:"#FBBC05" }

/* ── Registration form ── */
function Register({ ev }) {
  const [state, setState] = useState('idle')
  const submit = async (e) => {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.target))
    if (d.website) return
    if (dbEnabled) {
      try { await saveDoc('registrations', { eventId:ev.id, event:ev.title, name:d.name, email:d.email, dept:d.dept }); setState('done') }
      catch { setState('error') }
      return
    }
    if (site.formEndpoint) {
      try { await fetch(site.formEndpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ event:ev.title, ...d }) }); setState('done') }
      catch { setState('error') }
    } else {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Registration: '+ev.title)}&body=${encodeURIComponent(`Name: ${d.name}\nEmail: ${d.email}\nRoll no / Dept: ${d.dept}`)}`
      setState('done')
    }
  }
  if (state === 'done') return <p role="status" style={{ color:"var(--green)", fontWeight:600, marginTop:16 }}>✅ Your registration was submitted. We'll be in touch!</p>
  const inp = { style:{ width:"100%", padding:"10px 14px", borderRadius:10, border:"1.5px solid var(--border)", fontSize:14, fontFamily:"'Inter',sans-serif", outline:"none" } }
  return (
    <form onSubmit={submit} style={{ marginTop:20, display:"grid", gap:12 }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
        <label style={{ fontSize:13, fontWeight:600, color:"var(--ink)" }}>Name<input name="name" required autoComplete="name" {...inp}/></label>
        <label style={{ fontSize:13, fontWeight:600, color:"var(--ink)" }}>Email<input name="email" type="email" required autoComplete="email" {...inp}/></label>
        <label style={{ fontSize:13, fontWeight:600, color:"var(--ink)" }}>Roll No. / Dept<input name="dept" required {...inp}/></label>
      </div>
      <input name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" style={{ display:"none" }}/>
      <div style={{ display:"flex", gap:10 }}>
        <button className="btn btn-primary" type="submit">Register Now</button>
        {state==='error' && <span role="alert" style={{ fontSize:13, color:"var(--red)", alignSelf:"center" }}>Something went wrong. Try again.</span>}
      </div>
    </form>
  )
}

/* ── Event card ── */
>>>>>>> f563fd9 (feat: complete redesign - About, Contact, Events, Notes, FAQ, LinkedIn added)
function EventCard({ ev }) {
  const upcoming = ev.status === 'upcoming'
  return (
<<<<<<< HEAD
    <li className="layered mb-6 rounded-2xl bg-white p-6">
      <time dateTime={ev.date} className="text-sm font-semibold text-brand">{ev.date} · {ev.time} · {ev.venue}</time>
      <h3 className="mt-1 font-display text-xl font-bold">{ev.title}</h3>
      <p className="mt-1">{ev.desc}</p>
      {up && (ev.registerUrl
        ? <a href={ev.registerUrl} className="btn btn-primary mt-4" rel="noopener">Register on form</a>
        : <RegistrationForm ev={ev} />)}
      {ev.notes.length > 0 && (
        <div className="mt-4"><h4 className="text-sm font-bold">Notes (PDF)</h4>
          <ul className="mt-1 list-disc pl-5">{ev.notes.map(n => <li key={n.file}><a className="text-brand underline" href={n.file} download>{n.title}</a></li>)}</ul></div>
      )}
    </li>
=======
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
            <CalendarIcon size={15} style={{ color:"var(--blue)" }}/> {ev.date}{ev.time !== "TBA" ? ` · ${ev.time}` : ""}
          </span>
          <span style={{ display:"flex", alignItems:"center", gap:6 }}>
            <PinIcon size={15} style={{ color:"var(--red)" }}/> {ev.venue}
          </span>
        </div>

        {/* Topics */}
        {ev.topics && ev.topics.length > 0 && (
          <div>
            <p style={{ fontWeight:600, fontSize:13, color:"var(--muted)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:12 }}>
              Topics Covered
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12 }}>
              {ev.topics.map(t => {
                const Icon = topicIcons[t.icon] || SparkleIcon
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

        {/* Registration */}
        {upcoming && (
          ev.registerUrl
            ? <a href={ev.registerUrl} className="btn btn-primary" style={{ marginTop:24 }} rel="noopener">Register Now <ArrowIcon size={16}/></a>
            : <Register ev={ev}/>
        )}

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
>>>>>>> f563fd9 (feat: complete redesign - About, Contact, Events, Notes, FAQ, LinkedIn added)
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
            Workshops, learning sessions, and community activities organized by ZGDC–CASPAM.
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
