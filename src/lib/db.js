
export const SEATS = 30

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const dbEnabled = Boolean(
  cfg.apiKey && cfg.projectId
)

async function load() {
  const [
    { initializeApp, getApps, getApp },
    fs,
  ] = await Promise.all([
    import('firebase/app'),
    import('firebase/firestore'),
  ])

  const app = getApps().length
    ? getApp()
    : initializeApp(cfg)

  return {
    fs,
    db: fs.getFirestore(app),
  }
}

// Keep this function for other parts of your website.
export async function saveDoc(collectionName, data, id) {
  const { fs, db } = await load()

  const payload = {
    ...data,
    createdAt: fs.serverTimestamp(),
  }

  if (id) {
    return fs.setDoc(
      fs.doc(db, collectionName, id),
      payload
    )
  }

  return fs.addDoc(
    fs.collection(db, collectionName),
    payload
  )
}

// Public counter: contains no student information.
export async function getSeatsTaken(eventId) {
  const { fs, db } = await load()

  const snap = await fs.getDoc(
    fs.doc(db, 'eventStats', eventId)
  )

  return snap.exists()
    ? snap.data().count
    : 0
}

// Free Firestore-only registration.
export async function registerForEvent(rec) {
  const { fs, db } = await load()

  const eventId = rec.eventId
  const email = rec.email.trim().toLowerCase()

  const id = `${eventId}_${email}`

  const regRef = fs.doc(
    db,
    'registrations',
    id
  )

  const lockRef = fs.doc(
    db,
    'registrationLocks',
    id
  )

  const statRef = fs.doc(
    db,
    'eventStats',
    eventId
  )

  await fs.runTransaction(db, async (tx) => {
    // The counter is public, so this read is permitted.
    const statSnap = await tx.get(statRef)

    const count = statSnap.exists()
      ? Number(statSnap.data().count || 0)
      : 0

    if (count >= SEATS) {
      const error = new Error('All seats are full.')
      error.code = 'full'
      throw error
    }

    // Do not read registration or lock documents.
    // Security rules enforce create-only behavior.
    tx.set(regRef, {
      eventId,
      event: rec.event,
      name: rec.name.trim(),
      email,
      phone: rec.phone.trim(),
      roll: rec.roll.trim(),
      dept: rec.dept.trim(),
      semester: String(rec.semester),
      createdAt: fs.serverTimestamp(),
    })

    // Contains no personal information in its fields.
    tx.set(lockRef, {
      eventId,
    })

    tx.set(statRef, {
      count: count + 1,
      lastReg: id,
    })
  })

  return id
}
