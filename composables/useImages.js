import { ref, onUnmounted } from 'vue'
import {
  subscribeToImages,
  subscribeToGalleryImages,
  uploadImage as fbUpload,
  updateImage as fbUpdate,
  toggleShowInGallery as fbToggle,
  deleteImage as fbDelete,
} from '~/utils/firebase/images.js'

export function useImages() {
  const images = ref([])
  const loading = ref(true)
  const error = ref(null)

  if (process.client) {
    const unsubscribe = subscribeToImages((data) => {
      images.value = data
      loading.value = false
    })
    onUnmounted(() => unsubscribe())
  }

  async function uploadImage(file, meta, onProgress) {
    return fbUpload(file, meta, onProgress)
  }

  async function updateImage(id, data) {
    return fbUpdate(id, data)
  }

  async function toggleShowInGallery(id, value) {
    return fbToggle(id, value)
  }

  async function deleteImage(id, storagePath) {
    return fbDelete(id, storagePath)
  }

  return {
    images,
    loading,
    error,
    uploadImage,
    updateImage,
    toggleShowInGallery,
    deleteImage,
  }
}

export function useGalleryImages() {
  const images = ref([])
  const loading = ref(true)
  const error = ref(null)

  if (process.client) {
    const unsubscribe = subscribeToGalleryImages((data) => {
      images.value = data
      loading.value = false
    })
    onUnmounted(() => unsubscribe())
  }

  return {
    images,
    loading,
    error,
  }
}
