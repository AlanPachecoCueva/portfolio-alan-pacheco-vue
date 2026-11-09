import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './index.js'

const COLLECTION = 'services'

export function subscribeToServices(callback) {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  return onSnapshot(
    q,
    (snapshot) => {
      const services = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      callback(sortServices(services))
    },
    (err) => console.error('[subscribeToServices]', err)
  )
}

export function subscribeToPublishedServices(callback) {
  const q = query(
    collection(db, COLLECTION),
    where('published', '==', true)
  )
  return onSnapshot(
    q,
    (snapshot) => {
      const all = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      callback(sortServices(all))
    },
    (err) => console.error('[subscribeToPublishedServices]', err)
  )
}

function sortServices(services) {
  const withOrder = services
    .filter((s) => s.order != null)
    .sort((a, b) => a.order - b.order)
  const withoutOrder = services
    .filter((s) => s.order == null)
    .sort((a, b) => {
      const ta = a.createdAt?.seconds ?? 0
      const tb = b.createdAt?.seconds ?? 0
      return tb - ta
    })
  return [...withOrder, ...withoutOrder]
}

export async function getService(id) {
  const snapshot = await getDoc(doc(db, COLLECTION, id))
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}

// Para páginas públicas (/servicios/:slug). Incluye el filtro published para cumplir las reglas.
export async function getPublishedServiceBySlug(slug) {
  const q = query(
    collection(db, COLLECTION),
    where('slug', '==', slug),
    where('published', '==', true),
    limit(1)
  )
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const d = snapshot.docs[0]
  return { id: d.id, ...d.data() }
}

export async function createService(data) {
  return addDoc(collection(db, COLLECTION), {
    slug: data.slug,
    title_es: data.title_es,
    title_en: data.title_en || '',
    summary_es: data.summary_es || '',
    summary_en: data.summary_en || '',
    body_es: data.body_es || '',
    body_en: data.body_en || '',
    icon: data.icon || '',
    includes_es: data.includes_es || [],
    includes_en: data.includes_en || [],
    technologies: data.technologies || [],
    faqs: data.faqs || [],
    published: data.published ?? false,
    order: data.order ?? null,
    createdAt: serverTimestamp(),
  })
}

export async function updateService(id, data) {
  return updateDoc(doc(db, COLLECTION, id), data)
}

export async function deleteService(id) {
  return deleteDoc(doc(db, COLLECTION, id))
}
