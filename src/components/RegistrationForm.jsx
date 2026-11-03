
import { useState } from 'react'
import site from '../data/site.json'

import {
  dbEnabled,
  registerForEvent,
} from '../lib/db'

/**
 * Event registration form.
 *
 * Firebase:
 * - One registration per email per event.
 * - Atomic seat counter.
 * - Maximum 30 seats.
 *
 * Fallback:
 * - Form endpoint or email.
 */

export default function RegistrationForm({ ev }) {
  const [state, setState] = useState('idle')

  const submit = async (e) => {
    e.preventDefault()

    const form = e.currentTarget
    const d = Object.fromEntries(
      new FormData(form)
    )

    // Honeypot protection against bots.
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

    // Firebase registration.
    if (dbEnabled) {
      try {
        await registerForEvent(rec)

        setState('done')
        form.reset()

      } catch (err) {
        console.error(
          'Registration failed:',
          err
        )

        if (
          err?.code === 'already-registered'
        ) {
          setState('duplicate')

        } else if (err?.code === 'full') {
          setState('full')

        } else {
          setState('error')
        }
      }

      return
    }

    // Optional external form endpoint.
    if (site.formEndpoint) {
      try {
        const response = await fetch(
          site.formEndpoint,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(rec),
          }
        )

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

    // Email fallback.
    window.location.href =
      `mailto:${site.email}` +
      `?subject=${encodeURIComponent(
        'Registration: ' + ev.title
      )}` +
      `&body=${encodeURIComponent(
        Object.entries(rec)
          .map(([k, v]) => `${k}: ${v}`)
          .join('\n')
      )}`

    setState('done')
  }

  const f =
    'mt-1 w-full rounded-lg border border-black/30 px-3 py-2'

  // Successful registration.
  if (state === 'done') {
    return (
      <p
        role="status"
        className="mt-4 font-semibold text-brand"
      >
        You're registered for {ev.title}.
        See you there!
      </p>
    )
  }

  return (
    <form
      onSubmit={submit}
      className="mt-4 grid gap-3 sm:grid-cols-2"
    >

      {/* Full name */}
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

      {/* Email */}
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

      {/* Phone */}
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

      {/* Roll number */}
      <label className="text-sm font-medium">
        Roll number

        <input
          name="roll"
          required
          maxLength="50"
          className={f}
        />
      </label>

      {/* Department */}
      <label className="text-sm font-medium">
        Department

        <input
          name="dept"
          required
          maxLength="150"
          className={f}
        />
      </label>

      {/* Semester */}
      <label className="text-sm font-medium">
        Semester

        <select
          name="semester"
          required
          defaultValue=""
          className={f}
        >
          <option value="" disabled>
            Select
          </option>

          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>

      {/* Honeypot field */}
      <input
        name="website"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {/* Submit and feedback */}
      <div className="sm:col-span-2">

        <button
          type="submit"
          disabled={state === 'sending'}
          className="btn btn-primary"
        >
          {state === 'sending'
            ? 'Sending…'
            : 'Register'}
        </button>

        {state === 'duplicate' && (
          <p
            role="alert"
            className="mt-2 text-sm text-orange-600"
          >
            This email is already registered
            for this event.
          </p>
        )}

        {state === 'full' && (
          <p
            role="alert"
            className="mt-2 text-sm text-red-600"
          >
            Sorry! All registration seats are full.
          </p>
        )}

        {state === 'error' && (
          <p
            role="alert"
            className="mt-2 text-sm text-red-600"
          >
            Something went wrong. Please try
            again or contact the organizers.
          </p>
        )}

      </div>
    </form>
  )
}
