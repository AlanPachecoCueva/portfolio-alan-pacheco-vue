import { ref, onUnmounted } from 'vue'
import {
  subscribeToServices,
  subscribeToPublishedServices,
  getService as fbGet,
  getPublishedServiceBySlug as fbGetBySlug,
  createService as fbCreate,
  updateService as fbUpdate,
  deleteService as fbDelete,
} from '~/utils/firebase/services.js'

export function useServices() {
  const services = ref([])
  const loading = ref(true)
  const error = ref(null)

  if (process.client) {
    const unsubscribe = subscribeToServices((data) => {
      services.value = data
      loading.value = false
    })
    onUnmounted(() => unsubscribe())
  }

  async function getService(id) {
    return fbGet(id)
  }

  async function createService(data) {
    return fbCreate(data)
  }

  async function updateService(id, data) {
    return fbUpdate(id, data)
  }

  async function deleteService(id) {
    return fbDelete(id)
  }

  return {
    services,
    loading,
    error,
    getService,
    createService,
    updateService,
    deleteService,
  }
}

export function usePublishedServices() {
  const services = ref([])
  const loading = ref(true)
  const error = ref(null)

  if (process.client) {
    const unsubscribe = subscribeToPublishedServices((data) => {
      services.value = data
      loading.value = false
    })
    onUnmounted(() => unsubscribe())
  }

  async function getServiceBySlug(slug) {
    return fbGetBySlug(slug)
  }

  return {
    services,
    loading,
    error,
    getServiceBySlug,
  }
}
