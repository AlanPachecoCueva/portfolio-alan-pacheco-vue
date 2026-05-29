import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './index.js'

const COLLECTION = 'albums'

/**
 * Suscripción en tiempo real a todos los álbumes, ordenados por nombre.
 * @param {Function} callback - Recibe array de álbumes
 * @returns {Function} unsubscribe
 */
export function subscribeToAlbums(callback) {
  const q = query(collection(db, COLLECTION), orderBy('name', 'asc'))
  return onSnapshot(q, (snapshot) => {
    const albums = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(albums)
  })
}

/**
 * Obtiene todos los álbumes una sola vez.
 */
export async function getAlbums() {
  const q = query(collection(db, COLLECTION), orderBy('name', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/**
 * Crea un álbum nuevo.
 * @param {{ name: string, description?: string }} data
 */
export async function createAlbum(data) {
  return addDoc(collection(db, COLLECTION), {
    name: data.name,
    description: data.description || '',
    createdAt: serverTimestamp(),
  })
}

/**
 * Actualiza un álbum existente.
 * @param {string} id
 * @param {{ name?: string, description?: string }} data
 */
export async function updateAlbum(id, data) {
  return updateDoc(doc(db, COLLECTION, id), data)
}

/**
 * Elimina un álbum.
 * @param {string} id
 */
export async function deleteAlbum(id) {
  return deleteDoc(doc(db, COLLECTION, id))
}
