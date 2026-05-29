import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from './index.js'

/**
 * Inicia sesión con email y contraseña.
 * Verifica que el uid esté en la colección admins.
 * @returns {Promise<import('firebase/auth').User>}
 */
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

/**
 * Cierra la sesión actual.
 */
export async function logout() {
  await signOut(auth)
}

/**
 * Suscripción reactiva al estado de autenticación.
 * @param {Function} callback - Recibe el usuario o null
 * @returns {Function} unsubscribe
 */
export function onAuthChanged(callback) {
  return onAuthStateChanged(auth, callback)
}
