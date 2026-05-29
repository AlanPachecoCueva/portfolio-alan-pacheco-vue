import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './index.js'

const COLLECTION = 'achievements'

/**
 * Suscripción en tiempo real a todos los logros (admin).
 * @param {Function} callback
 * @returns {Function} unsubscribe
 */
export function subscribeToAchievements(callback) {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    const achievements = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(achievements)
  })
}

/**
 * Suscripción en tiempo real a logros publicados (vista pública).
 * Orden: order != null primero (ASC), luego createdAt DESC.
 * @param {Function} callback
 * @returns {Function} unsubscribe
 */
export function subscribeToPublishedAchievements(callback) {
  const q = query(
    collection(db, COLLECTION),
    where('published', '==', true)
  )
  return onSnapshot(q, (snapshot) => {
    const all = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    const ordered = sortAchievements(all)
    callback(ordered)
  })
}

/**
 * Ordenación: con order != null primero (ASC), luego createdAt DESC.
 */
function sortAchievements(items) {
  const withOrder = items
    .filter((a) => a.order != null)
    .sort((a, b) => a.order - b.order)
  const withoutOrder = items
    .filter((a) => a.order == null)
    .sort((a, b) => {
      const ta = a.createdAt?.seconds ?? 0
      const tb = b.createdAt?.seconds ?? 0
      return tb - ta
    })
  return [...withOrder, ...withoutOrder]
}

/**
 * Obtiene un logro por ID.
 * @param {string} id
 */
export async function getAchievement(id) {
  const snapshot = await getDoc(doc(db, COLLECTION, id))
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}

/**
 * Crea un logro.
 * @param {object} data
 */
export async function createAchievement(data) {
  return addDoc(collection(db, COLLECTION), {
    title: data.title,
    description_es: data.description_es,
    description_en: data.description_en,
    date: data.date || serverTimestamp(),
    type: data.type || 'award',
    issuer: data.issuer || '',
    link: data.link || null,
    thumbnailImageId: data.thumbnailImageId || '',
    thumbnailUrl: data.thumbnailUrl || '',
    imageIds: data.imageIds || [],
    imageUrls: data.imageUrls || [],
    published: data.published ?? false,
    order: data.order ?? null,
    createdAt: serverTimestamp(),
  })
}

/**
 * Actualiza un logro.
 * @param {string} id
 * @param {object} data
 */
export async function updateAchievement(id, data) {
  return updateDoc(doc(db, COLLECTION, id), data)
}

/**
 * Elimina un logro.
 * @param {string} id
 */
export async function deleteAchievement(id) {
  return deleteDoc(doc(db, COLLECTION, id))
}
