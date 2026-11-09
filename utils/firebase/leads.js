import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './index.js'

const COLLECTION = 'leads'

// Estados del embudo. Deben coincidir con la validación de firestore.rules.
export const LEAD_STATUSES = ['nuevo', 'contactado', 'cotizado', 'ganado', 'perdido']

// Solo admins (firestore.rules)
export function subscribeToLeads(callback) {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  return onSnapshot(
    q,
    (snapshot) => {
      const leads = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      callback(leads)
    },
    (err) => console.error('[subscribeToLeads]', err)
  )
}

// Público: lo usa el formulario de cotización. Las reglas validan campos, tipos y tamaños,
// así que solo se envían las claves permitidas y status/createdAt fijos.
export async function createLead(data) {
  return addDoc(collection(db, COLLECTION), {
    name: String(data.name || '').trim(),
    company: String(data.company || '').trim(),
    email: String(data.email || '').trim(),
    phone: String(data.phone || '').trim(),
    service: String(data.service || '').trim(),
    budget: String(data.budget || '').trim(),
    timeline: String(data.timeline || '').trim(),
    message: String(data.message || '').trim(),
    locale: data.locale === 'en' ? 'en' : 'es',
    status: 'nuevo',
    createdAt: serverTimestamp(),
  })
}

export async function updateLeadStatus(id, status) {
  if (!LEAD_STATUSES.includes(status)) throw new Error(`Estado de lead inválido: ${status}`)
  return updateDoc(doc(db, COLLECTION, id), { status })
}

export async function deleteLead(id) {
  return deleteDoc(doc(db, COLLECTION, id))
}
