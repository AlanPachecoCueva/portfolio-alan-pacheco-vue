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

export function subscribeToImages(callback) {
  const q = query(collection(db, COLLECTION), orderBy('uploadedAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    const images = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(images)
  })
}

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

export async function getImage(id) {
  const snapshot = await getDoc(doc(db, COLLECTION, id))
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}

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

export async function updateImage(id, data) {
  return updateDoc(doc(db, COLLECTION, id), data)
}

export async function toggleShowInGallery(id, value) {
  return updateDoc(doc(db, COLLECTION, id), { showInGallery: value })
}

export async function countImagesByAlbum(albumId) {
  const q = query(collection(db, COLLECTION), where('album', '==', albumId))
  const snapshot = await getDocs(q)
  return snapshot.size
}

export async function deleteImage(id, storagePath) {
  if (storagePath) {
    const fileRef = storageRef(storage, storagePath)
    await deleteObject(fileRef).catch(() => {})
  }
  return deleteDoc(doc(db, COLLECTION, id))
}
