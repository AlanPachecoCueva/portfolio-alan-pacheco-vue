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
  serverTimestamp,
} from 'firebase/firestore'
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { db, storage } from './index.js'

const COLLECTION = 'images'

/**
 * Suscripción en tiempo real a todas las imágenes.
 * @param {Function} callback - Recibe array de imágenes
 * @returns {Function} unsubscribe
 */
export function subscribeToImages(callback) {
  const q = query(collection(db, COLLECTION), orderBy('uploadedAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    const images = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(images)
  })
}

/**
 * Suscripción en tiempo real a imágenes de la galería pública (showInGallery == true).
 * @param {Function} callback
 * @returns {Function} unsubscribe
 */
export function subscribeToGalleryImages(callback) {
  const q = query(
    collection(db, COLLECTION),
    where('showInGallery', '==', true)
  )
  return onSnapshot(q, (snapshot) => {
    const images = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(images)
  }, (err) => console.error('[subscribeToGalleryImages]', err))
}

/**
 * Obtiene una imagen por su ID.
 * @param {string} id
 */
export async function getImage(id) {
  const snapshot = await getDoc(doc(db, COLLECTION, id))
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}

/**
 * Sube una imagen a Storage y registra el documento en Firestore.
 * @param {File} file
 * @param {{ title, description, album, sizeFactor, showInGallery, date }} meta
 * @param {Function} onProgress - Recibe porcentaje (0-100)
 * @returns {Promise<string>} imageId generado
 */
export async function uploadImage(file, meta, onProgress) {
  const imageId = crypto.randomUUID()
  const ext = file.name.split('.').pop()
  const storagePath = `images/${imageId}_${file.name}`
  const fileRef = storageRef(storage, storagePath)

  await new Promise((resolve, reject) => {
    const task = uploadBytesResumable(fileRef, file)
    task.on(
      'state_changed',
      (snap) => {
        if (onProgress) {
          onProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100))
        }
      },
      reject,
      resolve
    )
  })

  const url = await getDownloadURL(fileRef)

  const docRef = await addDoc(collection(db, COLLECTION), {
    url,
    storagePath,
    title: meta.title || file.name.replace(`.${ext}`, ''),
    description: meta.description || '',
    date: meta.date || serverTimestamp(),
    album: meta.album || '',
    sizeFactor: meta.sizeFactor ?? 1,
    showInGallery: meta.showInGallery ?? false,
    uploadedAt: serverTimestamp(),
  })

  return { id: docRef.id, url }
}

/**
 * Actualiza los metadatos de una imagen.
 * @param {string} id
 * @param {object} data
 */
export async function updateImage(id, data) {
  return updateDoc(doc(db, COLLECTION, id), data)
}

/**
 * Activa/desactiva la visibilidad en galería.
 * @param {string} id
 * @param {boolean} value
 */
export async function toggleShowInGallery(id, value) {
  return updateDoc(doc(db, COLLECTION, id), { showInGallery: value })
}

/**
 * Cuenta cuántas imágenes pertenecen a un álbum dado.
 * @param {string} albumId
 * @returns {Promise<number>}
 */
export async function countImagesByAlbum(albumId) {
  const q = query(collection(db, COLLECTION), where('album', '==', albumId))
  const snapshot = await getDocs(q)
  return snapshot.size
}

/**
 * Elimina la imagen de Storage y su documento en Firestore.
 * @param {string} id
 * @param {string} storagePath
 */
export async function deleteImage(id, storagePath) {
  if (storagePath) {
    const fileRef = storageRef(storage, storagePath)
    await deleteObject(fileRef).catch(() => {})
  }
  return deleteDoc(doc(db, COLLECTION, id))
}
