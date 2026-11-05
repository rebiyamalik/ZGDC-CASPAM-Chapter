import { useState } from 'react'
import site from '../data/site.json'
import { dbEnabled, saveDoc } from '../lib/db'

/**
 * Event registration form -> Firestore 'registrations'.
 * One registration per email per event (doc id = eventId + email).
 */
export default function RegistrationForm({ ev }) {
  const [state, setState] = useState('idle') // idle | sending | done | duplicate | error
  const submit = async (e) => {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.target))
    if (d.website) return // honeypot
    const rec = {
      eventId: ev.id, event: ev.title,
      name: d.name.trim(), email: d.email.trim().toLowerCase(),
      phone: d.phone.trim(), roll: d.roll.trim(),
      dept: d.dept.trim(), semester: d.semester,
    }
    setState('sending')
    if (dbEnabled) {
      try { await saveDoc('registrations', rec, `${ev.id}_${rec.email}`); setState('done') }
      catch (err) { setState(err?.code === 'permission-denied' ? 'duplicate' : 'error') }
      return
    }
    if (site.formEndpoint) {
      try { await fetch(site.formEndpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(rec) }); setState('done') }
      catch { setState('error') }
      return
    }
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Registration: '+ev.title)}&body=${encodeURIComponent(Object.entries(rec).map(([k,v])=>`${k}: ${v}`).join('\n'))}`
    setState('done')
  }

  if (state === 'done') return (
    <div style={{
      marginTop:20, padding:"16px 20px", borderRadius:12,
      background:"rgba(52,168,83,.07)", border:"1px solid rgba(52,168,83,.2)",
      color:"#1e7e34", fontWeight:600, fontSize:15,
    }}>
      ✅ You&apos;re registered for {ev.title}. See you there!
    </div>
  )

  const fieldStyle = {
    width:'100%', padding:'11px 13px', borderRadius:8,
    border:'1.5px solid #E8EAED', fontSize:14,
    fontFamily:"'Inter',sans-serif", background:'#fff',
    color:'#202124', outline:'none', transition:'border-color .2s, box-shadow .2s',
  }
  const onFocus = e => { e.target.style.borderColor='#4285F4'; e.target.style.boxShadow='0 0 0 3px rgba(66,133,244,.12)' }
  const onBlur  = e => { e.target.style.borderColor='#E8EAED'; e.target.style.boxShadow='none' }

  return (
    <form onSubmit={submit} style={{ marginTop:20 }}>
      <p style={{ fontWeight:700, fontSize:13, color:"#202124", marginBottom:14,
        textTransform:"uppercase", letterSpacing:".06em" }}>Register Now</p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }} className="reg-grid">
        <label style={{ display:"flex", flexDirection:"column", gap:5 }}>
          <span style={{ fontSize:13, fontWeight:600, color:"#5F6368" }}>Full Name</span>
          <input name="name" required autoComplete="name" maxLength="100" placeholder="Your full name"
            style={fieldStyle} onFocus={onFocus} onBlur={onBlur}/>
        </label>
        <label style={{ display:"flex", flexDirection:"column", gap:5 }}>
          <span style={{ fontSize:13, fontWeight:600, color:"#5F6368" }}>Email</span>
          <input name="email" type="email" required autoComplete="email" maxLength="150" placeholder="you@example.com"
            style={fieldStyle} onFocus={onFocus} onBlur={onBlur}/>
        </label>
        <label style={{ display:"flex", flexDirection:"column", gap:5 }}>
          <span style={{ fontSize:13, fontWeight:600, color:"#5F6368" }}>WhatsApp / Phone</span>
          <input name="phone" type="tel" required autoComplete="tel" maxLength="30" placeholder="+92 300 0000000"
            style={fieldStyle} onFocus={onFocus} onBlur={onBlur}/>
        </label>
        <label style={{ display:"flex", flexDirection:"column", gap:5 }}>
          <span style={{ fontSize:13, fontWeight:600, color:"#5F6368" }}>Roll Number</span>
          <input name="roll" required maxLength="50" placeholder="e.g. BZU-123"
            style={fieldStyle} onFocus={onFocus} onBlur={onBlur}/>
        </label>
        <label style={{ display:"flex", flexDirection:"column", gap:5 }}>
          <span style={{ fontSize:13, fontWeight:600, color:"#5F6368" }}>Department</span>
          <input name="dept" required maxLength="150" placeholder="e.g. Mathematics"
            style={fieldStyle} onFocus={onFocus} onBlur={onBlur}/>
        </label>
        <label style={{ display:"flex", flexDirection:"column", gap:5 }}>
          <span style={{ fontSize:13, fontWeight:600, color:"#5F6368" }}>Semester</span>
          <select name="semester" required defaultValue="" style={{ ...fieldStyle, appearance:"auto" }}
            onFocus={onFocus} onBlur={onBlur}>
            <option value="" disabled>Select semester</option>
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
      </div>
      <input name="website" tabIndex="-1" autoComplete="off" aria-hidden="true"
        style={{ position:"absolute", left:"-9999px", width:1, height:1 }}/>
      <div style={{ marginTop:16, display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
        <button disabled={state === 'sending'} className="btn btn-primary" style={{ padding:"12px 24px", fontSize:14 }}>
          {state === 'sending' ? 'Sending…' : 'Register Now'}
        </button>
        {state === 'duplicate' && <span style={{ fontSize:13, color:"#c5221f", fontWeight:600 }}>This email is already registered for this event.</span>}
        {state === 'error'     && <span style={{ fontSize:13, color:"#c5221f", fontWeight:600 }}>Something went wrong. Please try again.</span>}
      </div>
      <style>{`
        @media (max-width:580px) { .reg-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </form>
  )
}
