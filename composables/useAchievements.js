import { ref, onUnmounted } from 'vue'
import {
  subscribeToAchievements,
  subscribeToPublishedAchievements,
  getAchievement as fbGet,
  createAchievement as fbCreate,
  updateAchievement as fbUpdate,
  deleteAchievement as fbDelete,
} from '~/utils/firebase/achievements.js'

export function useAchievements() {
  const achievements = ref([])
  const loading = ref(true)
  const error = ref(null)

  if (process.client) {
    const unsubscribe = subscribeToAchievements((data) => {
      achievements.value = data
      loading.value = false
    })
    onUnmounted(() => unsubscribe())
  }

  async function getAchievement(id) {
    return fbGet(id)
  }

  async function createAchievement(data) {
    return fbCreate(data)
  }

  async function updateAchievement(id, data) {
    return fbUpdate(id, data)
  }

  async function deleteAchievement(id) {
    return fbDelete(id)
  }

  return {
    achievements,
    loading,
    error,
    getAchievement,
    createAchievement,
    updateAchievement,
    deleteAchievement,
  }
}

export function usePublishedAchievements() {
  const achievements = ref([])
  const loading = ref(true)
  const error = ref(null)

  if (process.client) {
    const unsubscribe = subscribeToPublishedAchievements((data) => {
      achievements.value = data
      loading.value = false
    })
    onUnmounted(() => unsubscribe())
  }

  return {
    achievements,
    loading,
    error,
  }
}
