import { ref, onUnmounted } from 'vue'
import {
  subscribeToProjects,
  subscribeToPublishedProjects,
  getProject as fbGet,
  createProject as fbCreate,
  updateProject as fbUpdate,
  deleteProject as fbDelete,
} from '~/utils/firebase/projects.js'

export function useProjects() {
  const projects = ref([])
  const loading = ref(true)
  const error = ref(null)

  if (process.client) {
    const unsubscribe = subscribeToProjects((data) => {
      projects.value = data
      loading.value = false
    })
    onUnmounted(() => unsubscribe())
  }

  async function getProject(id) {
    return fbGet(id)
  }

  async function createProject(data) {
    return fbCreate(data)
  }

  async function updateProject(id, data) {
    return fbUpdate(id, data)
  }

  async function deleteProject(id) {
    return fbDelete(id)
  }

  return {
    projects,
    loading,
    error,
    getProject,
    createProject,
    updateProject,
    deleteProject,
  }
}

export function usePublishedProjects() {
  const projects = ref([])
  const loading = ref(true)
  const error = ref(null)

  if (process.client) {
    const unsubscribe = subscribeToPublishedProjects((data) => {
      projects.value = data
      loading.value = false
    })
    onUnmounted(() => unsubscribe())
  }

  return {
    projects,
    loading,
    error,
  }
}
