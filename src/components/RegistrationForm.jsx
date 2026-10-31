import { useState } from 'react'
import site from '../data/site.json'
import { dbEnabled, saveDoc } from '../lib/db'

/**
 * Event registration form -> Firestore 'registrations'.
 * One registration per email per event (doc id = eventId + email). Falls back to email if the DB isn't configured.
 */
export default function RegistrationForm({ ev }) {
  const [state, setState] = useState('idle') // idle | sending | done | duplicate | error
  const submit = async (e) => {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.target))
    if (d.website) return // honeypot: bots fill the hidden field
    const rec = { eventId: ev.id, event: ev.title, name: d.name.trim(), email: d.email.trim().toLowerCase(), phone: d.phone.trim(), roll: d.roll.trim(), dept: d.dept.trim(), semester: d.semester }
    setState('sending')
    if (dbEnabled) {
      try { await saveDoc('registrations', rec, `${ev.id}_${rec.email}`); setState('done') }
      catch (err) { setState(err?.code === 'permission-denied' ? 'duplicate' : 'error') }
      return
    }
    if (site.formEndpoint) {
      try { await fetch(site.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rec) }); setState('done') }
      catch { setState('error') }
      return
    }
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Registration: ' + ev.title)}&body=${encodeURIComponent(Object.entries(rec).map(([k, v]) => `${k}: ${v}`).join('\n'))}`
    setState('done')
  }
  if (state === 'done') return <p role="status" className="mt-4 font-semibold text-brand">You're registered for {ev.title}. See you there!</p>
  const f = 'mt-1 w-full rounded-lg border border-black/30 px-3 py-2'
  return (
    <form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-2">
      <label className="text-sm font-medium">Full name<input name="name" required autoComplete="name" maxLength="100" className={f} /></label>
      <label className="text-sm font-medium">Email<input name="email" type="email" required autoComplete="email" maxLength="150" className={f} /></label>
      <label className="text-sm font-medium">WhatsApp / phone<input name="phone" type="tel" required autoComplete="tel" maxLength="30" className={f} /></label>
      <label className="text-sm font-medium">Roll number<input name="roll" required maxLength="50" className={f} /></label>
      <label className="text-sm font-medium">Department<input name="dept" required maxLength="150" className={f} /></label>
      <label className="text-sm font-medium">Semester
        <select name="semester" required defaultValue="" className={f}>
          <option value="" disabled>Select</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>
      <input name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="sm:col-span-2">
        <button disabled={state === 'sending'} className="btn btn-primary">{state === 'sending' ? 'Sending…' : 'Register'}</button>
        {state === 'duplicate' && <span role="alert" className="ml-3 text-sm">This email is already registered for this event.</span>}
        {state === 'error' && <span role="alert" className="ml-3 text-sm">Something went wrong. Please try again.</span>}
      </div>
    </form>
  )
}
