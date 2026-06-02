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

export function subscribeToAchievements(callback) {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    const achievements = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(achievements)
  })
}

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

export async function getAchievement(id) {
  const snapshot = await getDoc(doc(db, COLLECTION, id))
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}

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

export async function updateAchievement(id, data) {
  return updateDoc(doc(db, COLLECTION, id), data)
}

export async function deleteAchievement(id) {
  return deleteDoc(doc(db, COLLECTION, id))
}
