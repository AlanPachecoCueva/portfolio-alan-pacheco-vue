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

const COLLECTION = 'projects'

/**
 * Suscripción en tiempo real a todos los proyectos (admin).
 * @param {Function} callback
 * @returns {Function} unsubscribe
 */
export function subscribeToProjects(callback) {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  return onSnapshot(
    q,
    (snapshot) => {
      const projects = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      callback(projects)
    },
    (err) => console.error('[subscribeToProjects]', err)
  )
}

/**
 * Suscripción en tiempo real a proyectos publicados (vista pública).
 * Orden: primero los que tienen order != null (ASC), luego los demás por createdAt DESC.
 * Como Firestore no soporta ese orden mixto en un solo query, se hace client-side.
 * @param {Function} callback
 * @returns {Function} unsubscribe
 */
export function subscribeToPublishedProjects(callback) {
  const q = query(
    collection(db, COLLECTION),
    where('published', '==', true)
  )
  return onSnapshot(
    q,
    (snapshot) => {
      const all = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      const ordered = sortProjects(all)
      callback(ordered)
    },
    (err) => console.error('[subscribeToPublishedProjects]', err)
  )
}

/**
 * Ordenación: proyectos con order != null primero (ASC), luego por createdAt DESC.
 */
function sortProjects(projects) {
  const withOrder = projects
    .filter((p) => p.order != null)
    .sort((a, b) => a.order - b.order)
  const withoutOrder = projects
    .filter((p) => p.order == null)
    .sort((a, b) => {
      const ta = a.createdAt?.seconds ?? 0
      const tb = b.createdAt?.seconds ?? 0
      return tb - ta
    })
  return [...withOrder, ...withoutOrder]
}

/**
 * Obtiene un proyecto por ID.
 * @param {string} id
 */
export async function getProject(id) {
  const snapshot = await getDoc(doc(db, COLLECTION, id))
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}

/**
 * Crea un proyecto.
 * @param {object} data
 */
export async function createProject(data) {
  return addDoc(collection(db, COLLECTION), {
    title: data.title,
    description_es: data.description_es,
    description_en: data.description_en,
    date: data.date || serverTimestamp(),
    thumbnailImageId: data.thumbnailImageId || '',
    thumbnailUrl: data.thumbnailUrl || '',
    url: data.url || null,
    category: data.category || 'other',
    technology: data.technology || '',
    relatedTechnologies: data.relatedTechnologies || [],
    columns: data.columns ?? 1,
    rows: data.rows ?? 1,
    imageIds: data.imageIds || [],
    imageUrls: data.imageUrls || [],
    published: data.published ?? false,
    order: data.order ?? null,
    createdAt: serverTimestamp(),
  })
}

/**
 * Actualiza un proyecto.
 * @param {string} id
 * @param {object} data
 */
export async function updateProject(id, data) {
  return updateDoc(doc(db, COLLECTION, id), data)
}

/**
 * Elimina un proyecto.
 * @param {string} id
 */
export async function deleteProject(id) {
  return deleteDoc(doc(db, COLLECTION, id))
}
