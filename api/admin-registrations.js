import { createSign, timingSafeEqual } from 'node:crypto'

const TOKEN_SCOPE = 'https://www.googleapis.com/auth/datastore'
let cachedToken = ''
let cachedTokenExpiresAt = 0

function send(res, status, body) {
  return res.status(status).json(body)
}

function b64(value) {
  return Buffer.from(value).toString('base64url')
}

function decodeValue(value) {
  if ('stringValue' in value) return value.stringValue
  if ('integerValue' in value) return Number(value.integerValue)
  if ('doubleValue' in value) return Number(value.doubleValue)
  if ('booleanValue' in value) return value.booleanValue
  if ('timestampValue' in value) return value.timestampValue
  if ('nullValue' in value) return null
  return JSON.stringify(value)
}

function decodeDoc(doc) {
  return Object.fromEntries(Object.entries(doc.fields || {}).map(([key, value]) => [key, decodeValue(value)]))
}

async function accessToken(account) {
  if (cachedToken && Date.now() < cachedTokenExpiresAt - 60000) return cachedToken
  if (!account.client_email || !account.private_key || !account.project_id) throw new Error('Firebase service-account JSON is incomplete.')
  const tokenUri = account.token_uri || 'https://oauth2.googleapis.com/token'
  const now = Math.floor(Date.now() / 1000)
  const unsigned = b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' })) + '.' + b64(JSON.stringify({
    iss: account.client_email, scope: TOKEN_SCOPE, aud: tokenUri, iat: now, exp: now + 3600,
  }))
  const signer = createSign('RSA-SHA256')
  signer.update(unsigned)
  signer.end()
  const assertion = unsigned + '.' + signer.sign(account.private_key.replace(/\\n/g, '\n')).toString('base64url')
  const result = await fetch(tokenUri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
  })
  const data = await result.json().catch(() => ({}))
  if (!result.ok || !data.access_token) throw new Error('Firebase service-account authentication failed.')
  cachedToken = data.access_token
  cachedTokenExpiresAt = Date.now() + Number(data.expires_in || 3600) * 1000
  return cachedToken
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Content-Type', 'application/json')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return send(res, 405, { message: 'Only POST requests are allowed.' })
  }

  const origin = req.headers.origin
  if (origin && req.headers.host && new URL(origin).host !== req.headers.host) {
    return send(res, 403, { message: 'Request origin is not allowed.' })
  }

  const expected = process.env.ADMIN_EXPORT_PASSWORD || ''
  const supplied = String(req.headers.authorization || '').replace(/^Bearer\\s+/i, '')
  const a = Buffer.from(expected)
  const b = Buffer.from(supplied)
  if (!expected || a.length !== b.length || !timingSafeEqual(a, b)) {
    return send(res, 401, { message: 'Incorrect admin password.' })
  }

  try {
    const account = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '{}')
    const token = await accessToken(account)
    const endpoint = 'https://firestore.googleapis.com/v1/projects/' + encodeURIComponent(account.project_id) + '/databases/(default)/documents/registrations'
    const registrations = []
    let pageToken = ''
    do {
      const url = new URL(endpoint)
      url.searchParams.set('pageSize', '100')
      if (pageToken) url.searchParams.set('pageToken', pageToken)
      const result = await fetch(url, { headers: { Authorization: 'Bearer ' + token } })
      const data = await result.json().catch(() => ({}))
      if (!result.ok) throw new Error('Firestore could not return registrations. Check the service account permissions.')
      for (const doc of data.documents || []) registrations.push(decodeDoc(doc))
      pageToken = data.nextPageToken || ''
    } while (pageToken)
    registrations.sort((x, y) => String(y.createdAt || '').localeCompare(String(x.createdAt || '')))
    return send(res, 200, { registrations })
  } catch (error) {
    console.error('Admin registrations API:', error.message)
    return send(res, 500, { message: error.message || 'Unable to load registrations.' })
  }
}
