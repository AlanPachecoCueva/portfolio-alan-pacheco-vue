import { ref, onUnmounted } from 'vue'
import {
  subscribeToAlbums,
  createAlbum as fbCreate,
  updateAlbum as fbUpdate,
  deleteAlbum as fbDelete,
} from '@/firebase/albums.js'

/**
 * Composable de álbumes.
 * Proporciona lista reactiva en tiempo real + CRUD.
 */
export function useAlbums() {
  const albums = ref([])
  const loading = ref(true)
  const error = ref(null)

  const unsubscribe = subscribeToAlbums((data) => {
    albums.value = data
    loading.value = false
  })

  onUnmounted(() => unsubscribe())

  async function createAlbum(data) {
    return fbCreate(data)
  }

  async function updateAlbum(id, data) {
    return fbUpdate(id, data)
  }

  async function deleteAlbum(id) {
    return fbDelete(id)
  }

  return {
    albums,
    loading,
    error,
    createAlbum,
    updateAlbum,
    deleteAlbum,
  }
}
