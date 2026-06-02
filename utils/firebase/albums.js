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

export function subscribeToAlbums(callback) {
  const q = query(collection(db, COLLECTION), orderBy('name', 'asc'))
  return onSnapshot(q, (snapshot) => {
    const albums = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(albums)
  })
}

export async function getAlbums() {
  const q = query(collection(db, COLLECTION), orderBy('name', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function createAlbum(data) {
  return addDoc(collection(db, COLLECTION), {
    name: data.name,
    description: data.description || '',
    createdAt: serverTimestamp(),
  })
}

export async function updateAlbum(id, data) {
  return updateDoc(doc(db, COLLECTION, id), data)
}

export async function deleteAlbum(id) {
  return deleteDoc(doc(db, COLLECTION, id))
}
