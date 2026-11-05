import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'

const MAX_SEATS = 30
const ALLOWED_ORIGIN = 'https://zgdccaspamchapter.vercel.app'

function getDb() {
  if (!getApps().length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
    if (!raw) {
      const error = new Error('Missing Vercel environment variable FIREBASE_SERVICE_ACCOUNT_JSON.')
      error.code = 'missing-service-account'
      throw error
    }

    let serviceAccount
    try {
      serviceAccount = JSON.parse(raw)
    } catch {
      const error = new Error('FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON.')
      error.code = 'invalid-service-account-json'
      throw error
    }

    initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id,
    })
  }

  return getFirestore()
}

function send(res, status, payload) {
  return res.status(status).json(payload)
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return send(res, 405, {
      code: 'method-not-allowed',
      message: 'Only POST requests are allowed.',
    })
  }

  const origin = req.headers.origin
  const allowedOrigins = (process.env.ALLOWED_REGISTRATION_ORIGINS || ALLOWED_ORIGIN)
    .split(',')
    .map(value => value.trim())
    .filter(Boolean)

  if (origin && !allowedOrigins.includes(origin)) {
    return send(res, 403, {
      code: 'origin-not-allowed',
      message: 'This website is not allowed to submit registrations.',
    })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
    const eventId = clean(body.eventId)
    const event = clean(body.event)
    const name = clean(body.name)
    const email = clean(body.email).toLowerCase()
    const phone = clean(body.phone)
    const roll = clean(body.roll)
    const dept = clean(body.dept)
    const semester = clean(body.semester)

    if (eventId !== 'ai-baithak') {
      return send(res, 400, {
        code: 'invalid-event',
        message: 'This event is not accepting registrations.',
      })
    }

    if (
      !name || name.length >= 100 ||
      !email || email.length >= 150 || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email) ||
      !phone || phone.length >= 30 ||
      !roll || roll.length >= 50 ||
      !dept || dept.length >= 150 ||
      !['1', '2', '3', '4', '5', '6', '7', '8'].includes(semester)
    ) {
      return send(res, 400, {
        code: 'invalid-registration-data',
        message: 'Please check all registration fields and try again.',
      })
    }

    const db = getDb()
    const registrationId = `${eventId}_${email}`
    const registrationRef = db.collection('registrations').doc(registrationId)
    const lockRef = db.collection('registrationLocks').doc(registrationId)
    const statsRef = db.collection('eventStats').doc(eventId)

    // Check the private registration record on the server. Admin SDK reads
    // never expose student data to the public browser.
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const outcome = await db.runTransaction(async transaction => {
        const [registrationSnap, lockSnap, statsSnap] = await Promise.all([
          transaction.get(registrationRef),
          transaction.get(lockRef),
          transaction.get(statsRef),
        ])

        if (registrationSnap.exists) {
          return 'duplicate'
        }

        // Recover a lock left behind if an organizer manually removed only
        // the registration document. The next request can then retry.
        if (lockSnap.exists) {
          transaction.delete(lockRef)
          return 'retry'
        }

        const count = statsSnap.exists
          ? Number(statsSnap.get('count') || 0)
          : 0

        if (!Number.isInteger(count) || count < 0) {
          const error = new Error('The eventStats count is invalid.')
          error.code = 'invalid-event-stats'
          throw error
        }

        if (count >= MAX_SEATS) {
          return 'full'
        }

        transaction.create(registrationRef, {
          eventId,
          event: event || 'AI Baithak',
          name,
          email,
          phone,
          roll,
          dept,
          semester,
          createdAt: FieldValue.serverTimestamp(),
        })

        transaction.create(lockRef, { eventId })

        transaction.set(statsRef, {
          count: count + 1,
          lastReg: registrationId,
        })

        return 'created'
      })

      if (outcome === 'duplicate') {
        return send(res, 409, {
          code: 'already-registered',
          message: 'Already registered.',
        })
      }

      if (outcome === 'full') {
        return send(res, 409, {
          code: 'full',
          message: 'All 30 seats are full.',
        })
      }

      if (outcome === 'created') {
        return send(res, 200, {
          ok: true,
          message: 'Registration successful.',
        })
      }

      // A stale lock was deleted. Run another transaction to register.
    }

    return send(res, 409, {
      code: 'registration-conflict',
      message: 'The registration changed while being submitted. Please try again.',
    })
  } catch (error) {
    console.error('Registration API failed:', {
      code: error?.code,
      message: error?.message,
    })

    return send(res, 500, {
      code: error?.code || 'registration-server-error',
      message: error?.message || 'Unknown registration server error.',
    })
  }
}
