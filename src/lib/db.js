/**
 * Free database: Firebase Firestore (Spark plan, no credit card).
 * Config comes from .env (see .env.example). If it is empty, forms fall back to email,
 * so the site still works before the database is set up.
 * Firebase is loaded lazily so it never slows down the first page load.
 */
const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}
export const dbEnabled = Boolean(cfg.apiKey && cfg.projectId)

/** Save one document. collectionName: 'registrations' | 'messages'. Allowed fields are enforced by firestore.rules. */
export async function saveDoc(collectionName, data, id) {
  const [{ initializeApp, getApps, getApp }, fs] = await Promise.all([import('firebase/app'), import('firebase/firestore')])
  const app = getApps().length ? getApp() : initializeApp(cfg)
  const db = fs.getFirestore(app)
  const payload = { ...data, createdAt: fs.serverTimestamp() }
  // With an id, a second save of the same id is rejected by the rules (create-only) = duplicate protection.
  if (id) return fs.setDoc(fs.doc(db, collectionName, id), payload)
  return fs.addDoc(fs.collection(db, collectionName), payload)
}
