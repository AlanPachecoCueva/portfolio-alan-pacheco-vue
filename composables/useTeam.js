import { ref, onUnmounted } from 'vue'
import {
  subscribeToTeam,
  subscribeToPublishedTeam,
  getMember as fbGet,
  getPublishedMemberBySlug as fbGetBySlug,
  createMember as fbCreate,
  updateMember as fbUpdate,
  deleteMember as fbDelete,
} from '~/utils/firebase/team.js'

export function useTeam() {
  const members = ref([])
  const loading = ref(true)
  const error = ref(null)

  if (process.client) {
    const unsubscribe = subscribeToTeam((data) => {
      members.value = data
      loading.value = false
    })
    onUnmounted(() => unsubscribe())
  }

  async function getMember(id) {
    return fbGet(id)
  }

  async function createMember(data) {
    return fbCreate(data)
  }

  async function updateMember(id, data) {
    return fbUpdate(id, data)
  }

  async function deleteMember(id) {
    return fbDelete(id)
  }

  return {
    members,
    loading,
    error,
    getMember,
    createMember,
    updateMember,
    deleteMember,
  }
}

export function usePublishedTeam() {
  const members = ref([])
  const loading = ref(true)
  const error = ref(null)

  if (process.client) {
    const unsubscribe = subscribeToPublishedTeam((data) => {
      members.value = data
      loading.value = false
    })
    onUnmounted(() => unsubscribe())
  }

  async function getMemberBySlug(slug) {
    return fbGetBySlug(slug)
  }

  return {
    members,
    loading,
    error,
    getMemberBySlug,
  }
}
