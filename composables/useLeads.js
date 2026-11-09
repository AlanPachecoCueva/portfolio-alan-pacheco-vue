import { ref, onUnmounted } from 'vue'
import {
  LEAD_STATUSES,
  subscribeToLeads,
  createLead as fbCreate,
  updateLeadStatus as fbUpdateStatus,
  deleteLead as fbDelete,
} from '~/utils/firebase/leads.js'

// Admin: lista en tiempo real (requiere ser admin según firestore.rules)
export function useLeads() {
  const leads = ref([])
  const loading = ref(true)
  const error = ref(null)

  if (process.client) {
    const unsubscribe = subscribeToLeads((data) => {
      leads.value = data
      loading.value = false
    })
    onUnmounted(() => unsubscribe())
  }

  async function updateLeadStatus(id, status) {
    return fbUpdateStatus(id, status)
  }

  async function deleteLead(id) {
    return fbDelete(id)
  }

  return {
    leads,
    loading,
    error,
    statuses: LEAD_STATUSES,
    updateLeadStatus,
    deleteLead,
  }
}

// Público: formulario de cotización. No abre ninguna suscripción.
export function useCreateLead() {
  async function createLead(data) {
    return fbCreate(data)
  }

  return { createLead }
}
