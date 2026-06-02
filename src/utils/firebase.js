import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

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

const provider = new GoogleAuthProvider()

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider)
  return result.user
}

export async function signOutUser() {
  await signOut(auth)
}
