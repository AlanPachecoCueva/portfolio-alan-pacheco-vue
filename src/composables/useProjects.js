import { ref, onUnmounted } from 'vue'
import {
  subscribeToProjects,
  subscribeToPublishedProjects,
  getProject as fbGet,
  createProject as fbCreate,
  updateProject as fbUpdate,
  deleteProject as fbDelete,
} from '@/firebase/projects.js'

/**
 * Composable de proyectos — administración (todos los proyectos).
 */
export function useProjects() {
  const projects = ref([])
  const loading = ref(true)
  const error = ref(null)

  const unsubscribe = subscribeToProjects((data) => {
    projects.value = data
    loading.value = false
  })

  onUnmounted(() => unsubscribe())

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

/**
 * Composable de proyectos — vista pública (solo publicados, ordenados).
 */
export function usePublishedProjects() {
  const projects = ref([])
  const loading = ref(true)
  const error = ref(null)

  const unsubscribe = subscribeToPublishedProjects((data) => {
    projects.value = data
    loading.value = false
  })

  onUnmounted(() => unsubscribe())

  return {
    projects,
    loading,
    error,
  }
}
