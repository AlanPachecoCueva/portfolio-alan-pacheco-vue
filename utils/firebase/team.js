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

const COLLECTION = 'team'

export function subscribeToTeam(callback) {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  return onSnapshot(
    q,
    (snapshot) => {
      const members = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      callback(sortMembers(members))
    },
    (err) => console.error('[subscribeToTeam]', err)
  )
}

export function subscribeToPublishedTeam(callback) {
  const q = query(
    collection(db, COLLECTION),
    where('published', '==', true)
  )
  return onSnapshot(
    q,
    (snapshot) => {
      const all = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      callback(sortMembers(all))
    },
    (err) => console.error('[subscribeToPublishedTeam]', err)
  )
}

function sortMembers(members) {
  const withOrder = members
    .filter((m) => m.order != null)
    .sort((a, b) => a.order - b.order)
  const withoutOrder = members
    .filter((m) => m.order == null)
    .sort((a, b) => {
      const ta = a.createdAt?.seconds ?? 0
      const tb = b.createdAt?.seconds ?? 0
      return ta - tb
    })
  return [...withOrder, ...withoutOrder]
}

export async function getMember(id) {
  const snapshot = await getDoc(doc(db, COLLECTION, id))
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}

// Para páginas públicas (/equipo/:slug). Incluye el filtro published para cumplir las reglas.
export async function getPublishedMemberBySlug(slug) {
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

export async function createMember(data) {
  return addDoc(collection(db, COLLECTION), {
    slug: data.slug,
    name: data.name,
    role_es: data.role_es || '',
    role_en: data.role_en || '',
    bio_es: data.bio_es || '',
    bio_en: data.bio_en || '',
    photoImageId: data.photoImageId || '',
    photoUrl: data.photoUrl || '',
    skills: data.skills || [],
    links: {
      linkedin: data.links?.linkedin || '',
      github: data.links?.github || '',
      web: data.links?.web || '',
    },
    cvUrl_es: data.cvUrl_es || '',
    cvUrl_en: data.cvUrl_en || '',
    showGallery: data.showGallery ?? false,
    published: data.published ?? false,
    order: data.order ?? null,
    createdAt: serverTimestamp(),
  })
}

export async function updateMember(id, data) {
  return updateDoc(doc(db, COLLECTION, id), data)
}

export async function deleteMember(id) {
  return deleteDoc(doc(db, COLLECTION, id))
}
