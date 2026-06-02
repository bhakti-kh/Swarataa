import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCoqJDBqfENsIAf3ov-P25lBzS2g8DgsEc",
  authDomain: "swarataa-eb61a.firebaseapp.com",
  projectId: "swarataa-eb61a",
  storageBucket: "swarataa-eb61a.firebasestorage.app",
  messagingSenderId: "201792020361",
  appId: "1:201792020361:web:16601e21ee583fe3384b58"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

const provider = new GoogleAuthProvider()

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider)
  return result.user
}

export async function signOutUser() {
  await signOut(auth)
}

// Save user's prakriti plan to Firestore
export async function savePlanToFirestore(userId, plan) {
  try {
    await setDoc(doc(db, 'users', userId), {
      plan,
      updatedAt: new Date().toISOString(),
    }, { merge: true })
  } catch (e) {
    console.error('Firestore save error:', e)
  }
}

// Load user's prakriti plan from Firestore
export async function loadPlanFromFirestore(userId) {
  try {
    const snap = await getDoc(doc(db, 'users', userId))
    if (snap.exists()) return snap.data().plan || null
    return null
  } catch (e) {
    console.error('Firestore load error:', e)
    return null
  }
}
