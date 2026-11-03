
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
  const [{ initializeApp, getApps, getApp }, fs] =
    await Promise.all([
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

/**
 * Get occupied seats for an event.
 */
export async function getSeatsTaken(eventId) {
  const { fs, db } = await load()

  const snap = await fs.getDoc(
    fs.doc(db, 'eventStats', eventId)
  )

  return snap.exists()
    ? snap.data().count
    : 0
}


export async function registerForEvent(rec) {
  const { fs, db } = await load()

  const email = rec.email.trim().toLowerCase()
  const id = `${rec.eventId}_${email}`

  const regRef = fs.doc(
    db,
    'registrations',
    id
  )

  const statRef = fs.doc(
    db,
    'eventStats',
    rec.eventId
  )

  await fs.runTransaction(db, async (tx) => {

    const [regSnap, statSnap] = await Promise.all([
      tx.get(regRef),
      tx.get(statRef),
    ])

    if (regSnap.exists()) {
      const error = new Error(
        'This email is already registered.'
      )

      error.code = 'already-registered'
      throw error
    }

    
    const count = statSnap.exists()
      ? statSnap.data().count
      : 0

   
    if (count >= SEATS) {
      const error = new Error(
        'All registration seats are full.'
      )

      error.code = 'full'
      throw error
    }

   
    tx.set(regRef, {
      ...rec,
      email,
      createdAt: fs.serverTimestamp(),
    })


    tx.set(statRef, {
      count: count + 1,
      lastReg: id,
    })
  })

  return id
}
