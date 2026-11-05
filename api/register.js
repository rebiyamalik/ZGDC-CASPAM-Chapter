import { createSign } from 'node:crypto'

const MAX_SEATS = 30
const TOKEN_SCOPE = 'https://www.googleapis.com/auth/datastore'
const DEFAULT_ORIGIN = 'https://zgdccaspamchapter.vercel.app'

let cachedToken = ''
let cachedTokenExpiresAt = 0

function send(res, status, body) {
  return res.status(status).json(body)
}

function base64url(value) {
  return Buffer.from(value).toString('base64url')
}

function makeError(message, code, status = 500) {
  const error = new Error(message)
  error.code = code
  error.status = status
  return error
}

function firestoreError(data, httpStatus) {
  const apiError = data?.error || {}
  const rawCode = apiError.status || `http-${httpStatus}`
  const code = String(rawCode).toLowerCase().replaceAll('_', '-')
  const message = apiError.message || `Firestore request failed with HTTP ${httpStatus}`
  return makeError(message, code, httpStatus)
}

async function getAccessToken(serviceAccount) {
  if (cachedToken && Date.now() < cachedTokenExpiresAt - 60_000) {
    return cachedToken
  }

  if (!serviceAccount.client_email || !serviceAccount.private_key) {
    throw makeError(
      'The service-account JSON is missing client_email or private_key.',
      'invalid-service-account',
    )
  }

  const tokenUri = serviceAccount.token_uri || 'https://oauth2.googleapis.com/token'
  const now = Math.floor(Date.now() / 1000)
  const jwtHeader = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const jwtClaims = base64url(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: TOKEN_SCOPE,
    aud: tokenUri,
    iat: now,
    exp: now + 3600,
  }))
  const unsignedJwt = `${jwtHeader}.${jwtClaims}`

  const signer = createSign('RSA-SHA256')
  signer.update(unsignedJwt)
  signer.end()

  const privateKey = serviceAccount.private_key.replace(/\\n/g, '\n')
  const signature = signer.sign(privateKey).toString('base64url')
  const assertion = `${unsignedJwt}.${signature}`

  const response = await fetch(tokenUri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok || !payload.access_token) {
    throw makeError(
      payload.error_description || payload.error || 'Google service-account authentication failed.',
      'service-account-auth-failed',
      response.status || 500,
    )
  }

  cachedToken = payload.access_token
  cachedTokenExpiresAt = Date.now() + Number(payload.expires_in || 3600) * 1000
  return cachedToken
}

function documentName(projectId, collection, id) {
  return `projects/${projectId}/databases/(default)/documents/${collection}/${id}`
}

function documentUrl(baseUrl, collection, id) {
  return `${baseUrl}/${collection}/${encodeURIComponent(id)}`
}

async function readDocument(baseUrl, token, collection, id) {
  const response = await fetch(documentUrl(baseUrl, collection, id), {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (response.status === 404) return null

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw firestoreError(payload, response.status)
  return payload
}

async function commitWrites(baseUrl, token, writes) {
  const response = await fetch(`${baseUrl}:commit`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ writes }),
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw firestoreError(payload, response.status)
  return payload
}

function stringField(value) {
  return { stringValue: String(value) }
}

function integerField(value) {
  return { integerValue: String(value) }
}

function makeUpdate(name, fields, currentDocument) {
  return {
    update: { name, fields },
    currentDocument,
  }
}

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return send(res, 405, {
      code: 'method-not-allowed',
      message: 'Only POST requests are allowed.',
    })
  }

  const origin = req.headers.origin
  const allowedOrigins = (process.env.ALLOWED_REGISTRATION_ORIGINS || DEFAULT_ORIGIN)
    .split(',')
    .map(value => value.trim())
    .filter(Boolean)

  if (origin && !allowedOrigins.includes(origin)) {
    return send(res, 403, {
      code: 'origin-not-allowed',
      message: 'This website origin is not allowed to submit registrations.',
    })
  }

  let input
  try {
    input = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
  } catch {
    return send(res, 400, {
      code: 'invalid-json',
      message: 'The registration request body is not valid JSON.',
    })
  }

  try {
    const eventId = cleanString(input.eventId)
    const event = cleanString(input.event)
    const name = cleanString(input.name)
    const email = cleanString(input.email).toLowerCase()
    const phone = cleanString(input.phone)
    const roll = cleanString(input.roll)
    const dept = cleanString(input.dept)
    const semester = cleanString(input.semester)

    if (eventId !== 'ai-baithak') {
      return send(res, 400, {
        code: 'invalid-event',
        message: 'This event is not accepting registrations.',
      })
    }

    if (
      !name || name.length >= 100 ||
      !email || email.length >= 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
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

    const rawServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
    if (!rawServiceAccount) {
      return send(res, 500, {
        code: 'missing-service-account',
        message: 'Vercel environment variable FIREBASE_SERVICE_ACCOUNT_JSON is not configured.',
      })
    }

    let serviceAccount
    try {
      serviceAccount = JSON.parse(rawServiceAccount)
    } catch {
      return send(res, 500, {
        code: 'invalid-service-account-json',
        message: 'FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON.',
      })
    }

    const projectId = serviceAccount.project_id
    if (!projectId) {
      return send(res, 500, {
        code: 'missing-project-id',
        message: 'The service-account JSON does not contain project_id.',
      })
    }

    const token = await getAccessToken(serviceAccount)
    const baseUrl = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents`
    const registrationId = `${eventId}_${email}`
    const registrationName = documentName(projectId, 'registrations', registrationId)
    const lockName = documentName(projectId, 'registrationLocks', registrationId)
    const statsName = documentName(projectId, 'eventStats', eventId)

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const [registration, lock, stats] = await Promise.all([
        readDocument(baseUrl, token, 'registrations', registrationId),
        readDocument(baseUrl, token, 'registrationLocks', registrationId),
        readDocument(baseUrl, token, 'eventStats', eventId),
      ])

      if (registration) {
        return send(res, 409, {
          code: 'already-registered',
          message: 'Already registered.',
        })
      }

      // Recover a stale lock only when its registration document is absent.
      if (lock) {
        try {
          await commitWrites(baseUrl, token, [{
            delete: lockName,
            currentDocument: { updateTime: lock.updateTime },
          }])
          continue
        } catch (error) {
          if (error.code === 'failed-precondition' || error.code === 'aborted') continue
          throw error
        }
      }

      const countValue = stats?.fields?.count?.integerValue ??
        stats?.fields?.count?.doubleValue ?? '0'
      const count = Number(countValue)

      if (!Number.isSafeInteger(count) || count < 0) {
        throw makeError('The eventStats count is invalid.', 'invalid-event-stats')
      }

      if (count >= MAX_SEATS) {
        return send(res, 409, {
          code: 'full',
          message: 'All 30 seats are full.',
        })
      }

      const registrationFields = {
        eventId: stringField(eventId),
        event: stringField(event || 'AI Baithak'),
        name: stringField(name),
        email: stringField(email),
        phone: stringField(phone),
        roll: stringField(roll),
        dept: stringField(dept),
        semester: stringField(semester),
        createdAt: { timestampValue: new Date().toISOString() },
      }

      const statsFields = {
        count: integerField(count + 1),
        lastReg: stringField(registrationId),
      }

      const statsPrecondition = stats
        ? { updateTime: stats.updateTime }
        : { exists: false }

      try {
        await commitWrites(baseUrl, token, [
          makeUpdate(registrationName, registrationFields, { exists: false }),
          makeUpdate(lockName, { eventId: stringField(eventId) }, { exists: false }),
          makeUpdate(statsName, statsFields, statsPrecondition),
        ])

        return send(res, 200, {
          ok: true,
          message: 'Registration successful.',
        })
      } catch (error) {
        if (error.code === 'failed-precondition' || error.code === 'aborted') continue
        throw error
      }
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

    return send(res, error?.status >= 400 && error.status < 600 ? error.status : 500, {
      code: error?.code || 'registration-server-error',
      message: error?.message || 'Unknown registration server error.',
    })
  }
}
