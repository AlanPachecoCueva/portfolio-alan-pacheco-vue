import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from './index.js'

export async function login(email, password) {
  await setPersistence(auth, browserLocalPersistence)
  const credential = await signInWithEmailAndPassword(auth, email, password)
  const user = credential.user

  const adminDoc = await getDoc(doc(db, 'admins', user.uid))
  if (!adminDoc.exists()) {
    await signOut(auth)
    throw new Error('No autorizado')
  }

  return user
}

export async function logout() {
  await signOut(auth)
}

export function onAuthChanged(callback) {
  return onAuthStateChanged(auth, callback)
}
