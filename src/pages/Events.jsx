import { useState } from 'react'
import events from '../data/events.json'
import site from '../data/site.json'
import { dbEnabled, saveDoc } from '../lib/db'

/** Registration form. Sends to site.formEndpoint (Formspree / Google Apps Script) if set, otherwise opens an email. */
function Register({ ev }) {
  const [state, setState] = useState('idle')
  const submit = async (e) => {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.target))
    if (d.website) return // honeypot: bots fill the hidden field
    if (dbEnabled) {
      try { await saveDoc('registrations', { eventId: ev.id, event: ev.title, name: d.name, email: d.email, dept: d.dept }); setState('done') }
      catch { setState('error') }
      return
    }
    if (site.formEndpoint) {
      try { await fetch(site.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: ev.title, ...d }) }); setState('done') }
      catch { setState('error') }
    } else {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Registration: ' + ev.title)}&body=${encodeURIComponent(`Name: ${d.name}\nEmail: ${d.email}\nRoll no / Dept: ${d.dept}`)}`
      setState('done')
    }
  }
  if (state === 'done') return <p role="status" className="mt-4 font-semibold text-brand">Thanks! Your registration was sent.</p>
  const f = 'mt-1 w-full rounded-lg border border-black/30 px-3 py-2'
  return (
    <form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-3">
      <label className="text-sm font-medium">Name<input name="name" required autoComplete="name" className={f} /></label>
      <label className="text-sm font-medium">Email<input name="email" type="email" required autoComplete="email" className={f} /></label>
      <label className="text-sm font-medium">Roll no. / Department<input name="dept" required className={f} /></label>
      <input name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="sm:col-span-3"><button className="btn btn-primary">Register</button>{state === 'error' && <span role="alert" className="ml-3 text-sm">Something went wrong. Try again.</span>}</div>
    </form>
  )
}
function EventCard({ ev }) {
  const up = ev.status === 'upcoming'
  return (
    <li className="layered mb-6 rounded-2xl bg-white p-6">
      <time dateTime={ev.date} className="text-sm font-semibold text-brand">{ev.date} · {ev.time} · {ev.venue}</time>
      <h3 className="mt-1 font-display text-xl font-bold">{ev.title}</h3>
      <p className="mt-1">{ev.desc}</p>
      {up && (ev.registerUrl
        ? <a href={ev.registerUrl} className="btn btn-primary mt-4" rel="noopener">Register on form</a>
        : <Register ev={ev} />)}
      {ev.notes.length > 0 && (
        <div className="mt-4"><h4 className="text-sm font-bold">Notes (PDF)</h4>
          <ul className="mt-1 list-disc pl-5">{ev.notes.map(n => <li key={n.file}><a className="text-brand underline" href={n.file} download>{n.title}</a></li>)}</ul></div>
      )}
    </li>
  )
}
export default function Events() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-4xl font-extrabold">Events</h1>
      {['upcoming', 'past'].map(s => (
        <div key={s}>
          <h2 className="mb-4 mt-10 font-display text-2xl font-bold capitalize">{s} events</h2>
          <ul>{events.filter(e => e.status === s).map(e => <EventCard key={e.id} ev={e} />)}</ul>
        </div>
      ))}
    </section>
  )
}
