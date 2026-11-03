
import { useState } from 'react'
import site from '../data/site.json'

import {
  dbEnabled,
  registerForEvent,
} from '../lib/db'

export default function RegistrationForm({ ev }) {
  const [state, setState] = useState('idle')

  const submit = async (e) => {
    e.preventDefault()

    const form = e.currentTarget
    const d = Object.fromEntries(new FormData(form))

    if (d.website) return

    const rec = {
      eventId: ev.id,
      event: ev.title,
      name: d.name.trim(),
      email: d.email.trim().toLowerCase(),
      phone: d.phone.trim(),
      roll: d.roll.trim(),
      dept: d.dept.trim(),
      semester: d.semester,
    }

    setState('sending')

    if (dbEnabled) {
      try {
        await registerForEvent(rec)

        setState('done')
        form.reset()

      } catch (err) {
        console.error('Registration failed:', {
          code: err?.code,
          message: err?.message,
        })

        if (err?.code === 'full') {
          setState('full')
        } else if (
          err?.code === 'permission-denied' ||
          err?.code === 'already-exists'
        ) {
          setState('check')
        } else {
          setState('error')
        }
      }

      return
    }

    if (site.formEndpoint) {
      try {
        const response = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rec),
        })

        if (!response.ok) {
          throw new Error('Form submission failed')
        }

        setState('done')
        form.reset()

      } catch (err) {
        console.error(err)
        setState('error')
      }

      return
    }

    window.location.href =
      `mailto:${site.email}` +
      `?subject=${encodeURIComponent('Registration: ' + ev.title)}` +
      `&body=${encodeURIComponent(
        Object.entries(rec)
          .map(([k, v]) => `${k}: ${v}`)
          .join('\n')
      )}`

    setState('done')
  }

  const f = 'mt-1 w-full rounded-lg border border-black/30 px-3 py-2'

  if (state === 'done') {
    return (
      <p role="status" className="mt-4 font-semibold text-brand">
        You're registered for {ev.title}. See you there!
      </p>
    )
  }

  return (
    <form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-2">

      <label className="text-sm font-medium">
        Full name
        <input
          name="name"
          required
          autoComplete="name"
          maxLength="100"
          className={f}
        />
      </label>

      <label className="text-sm font-medium">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength="150"
          className={f}
        />
      </label>

      <label className="text-sm font-medium">
        WhatsApp / phone
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          maxLength="30"
          className={f}
        />
      </label>

      <label className="text-sm font-medium">
        Roll number
        <input
          name="roll"
          required
          maxLength="50"
          className={f}
        />
      </label>

      <label className="text-sm font-medium">
        Department
        <input
          name="dept"
          required
          maxLength="150"
          className={f}
        />
      </label>

      <label className="text-sm font-medium">
        Semester
        <select
          name="semester"
          required
          defaultValue=""
          className={f}
        >
          <option value="" disabled>Select</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>

      <input
        name="website"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="sm:col-span-2">

        <button
          type="submit"
          disabled={state === 'sending'}
          className="btn btn-primary"
        >
          {state === 'sending' ? 'Sending…' : 'Register'}
        </button>

        {state === 'check' && (
          <p role="alert" className="mt-2 text-sm text-orange-600">
            This email may already be registered. If this is your first
            attempt, please contact the organizers.
          </p>
        )}

        {state === 'full' && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            Sorry! All registration seats are full.
          </p>
        )}

        {state === 'error' && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            Something went wrong. Please try again or contact the organizers.
          </p>
        )}

      </div>
    </form>
  )
}
