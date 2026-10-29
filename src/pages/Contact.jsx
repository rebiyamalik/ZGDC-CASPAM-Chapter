import { useState } from 'react'
import site from '../data/site.json'
import { dbEnabled, saveDoc } from '../lib/db'

export default function Contact() {
  const [state, setState] = useState('idle')
  const submit = async (e) => {
    e.preventDefault(); const d = Object.fromEntries(new FormData(e.target))
    if (d.website) return // honeypot
    if (dbEnabled) { // saved to Firestore 'messages'
      try { await saveDoc('messages', { name: d.name, email: d.email, subject: d.subject, message: d.message }); setState('done') }
      catch { setState('error') }
      return
    }
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(`${d.message}\n\n— ${d.name} (${d.email})`)}`
  }
  const f = 'mt-1 w-full rounded-lg border border-black/30 px-3 py-2'
  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-2">
      <div>
        <h1 className="font-display text-4xl font-extrabold">Contact us</h1>
        <p className="mt-4">Questions, collaboration or want to join? Write to us.</p>
        <p className="mt-6"><strong>Email:</strong> <a className="text-brand underline" href={`mailto:${site.email}`}>{site.email}</a></p>
        <p className="mt-2"><strong>Find us:</strong> {site.address}</p>
      </div>
      {state === 'done'
        ? <p role="status" className="layered rounded-2xl bg-white p-6 font-semibold text-brand">Thanks! Your message was sent.</p>
        : <form onSubmit={submit} className="layered grid gap-3 rounded-2xl bg-white p-6">
            <label className="text-sm font-medium">Name<input name="name" required autoComplete="name" className={f} /></label>
            <label className="text-sm font-medium">Email<input name="email" type="email" required autoComplete="email" className={f} /></label>
            <label className="text-sm font-medium">Subject<input name="subject" required className={f} /></label>
            <label className="text-sm font-medium">Message<textarea name="message" required rows="4" className={f} /></label>
            <input name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" className="hidden" />
            <button className="btn btn-primary">Send message</button>
            {state === 'error' && <p role="alert" className="text-sm">Something went wrong. Please try again.</p>}
          </form>}
    </section>
  )
}
