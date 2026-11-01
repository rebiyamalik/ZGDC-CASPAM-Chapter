/**
 * Free database: Firebase Firestore (Spark plan, no credit card).
 * Config comes from .env (see .env.example). If it is empty, forms fall back to email.
 * Firebase is loaded lazily so it never slows down the first page load.
 *
 * SEAT LIMIT: SEATS below must match maxSeats() in firestore.rules.
 */
export const SEATS = 30

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}
export const dbEnabled = Boolean(cfg.apiKey && cfg.projectId)

async function load() {
  const [{ initializeApp, getApps, getApp }, fs] = await Promise.all([import('firebase/app'), import('firebase/firestore')])
  const app = getApps().length ? getApp() : initializeApp(cfg)
  return { fs, db: fs.getFirestore(app) }
}

/** Save one document (used by the Contact form -> 'messages'). */
export async function saveDoc(collectionName, data, id) {
  const { fs, db } = await load()
  const payload = { ...data, createdAt: fs.serverTimestamp() }
  if (id) return fs.setDoc(fs.doc(db, collectionName, id), payload)
  return fs.addDoc(fs.collection(db, collectionName), payload)
}

/** How many seats are taken for an event (public counter document, no personal data). */
export async function getSeatsTaken(eventId) {
  const { fs, db } = await load()
  const snap = await fs.getDoc(fs.doc(db, 'eventStats', eventId))
  return snap.exists() ? snap.data().count : 0
}

/**
 * Register one person for an event, atomically:
 *  - stops at SEATS registrations (throws code 'full')
 *  - one registration per email per event (doc id = eventId_email; a repeat is rejected -> 'permission-denied')
 */
export async function registerForEvent(rec) {
  const { fs, db } = await load()
  const id = `${rec.eventId}_${rec.email}`
  const regRef = fs.doc(db, 'registrations', id)
  const statRef = fs.doc(db, 'eventStats', rec.eventId)
  await fs.runTransaction(db, async (tx) => {
    const snap = await tx.get(statRef)
    const count = snap.exists() ? snap.data().count : 0
    if (count >= SEATS) { const e = new Error('full'); e.code = 'full'; throw e }
    tx.set(regRef, { ...rec, createdAt: fs.serverTimestamp() })
    tx.set(statRef, { count: count + 1, lastReg: id })
  })
  return id
}
