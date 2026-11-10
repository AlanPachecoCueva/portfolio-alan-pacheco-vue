<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>Solicitudes de cotización</h1>
      </div>

      <div class="lead-filters" role="group" aria-label="Filtrar por estado">
        <button
          v-for="f in filters"
          :key="f.value"
          type="button"
          class="lead-filter"
          :class="{ active: filter === f.value }"
          :aria-pressed="filter === f.value"
          @click="filter = f.value"
        >{{ f.label }} ({{ f.count }})</button>
      </div>

      <div v-if="loading" class="state-msg">Cargando...</div>
      <div v-else-if="visibleLeads.length === 0" class="state-msg">No hay solicitudes en este estado.</div>
      <table v-else class="admin-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Contacto</th>
            <th>Proyecto</th>
            <th>Mensaje</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- Datos enviados por el público: solo interpolación de texto, nunca v-html -->
          <tr v-for="lead in visibleLeads" :key="lead.id">
            <td>{{ formatDate(lead.createdAt) }}</td>
            <td>
              <strong>{{ lead.name }}</strong>
              <div v-if="lead.company">{{ lead.company }}</div>
              <div><a :href="`mailto:${lead.email}`" class="btn-cancel-link">{{ lead.email }}</a></div>
              <div v-if="lead.phone">
                <a :href="whatsappUrl(lead.phone)" target="_blank" rel="noopener noreferrer" class="btn-cancel-link">{{ lead.phone }}</a>
              </div>
            </td>
            <td>
              <div>{{ lead.service || '—' }}</div>
              <div v-if="lead.budget" class="field-hint">Presupuesto: {{ lead.budget }}</div>
              <div v-if="lead.timeline" class="field-hint">Plazo: {{ lead.timeline }}</div>
              <div class="field-hint">Idioma: {{ lead.locale === 'en' ? 'EN' : 'ES' }}</div>
            </td>
            <td><p class="lead-message">{{ lead.message }}</p></td>
            <td>
              <select
                class="lead-status-select"
                :value="lead.status"
                :aria-label="`Estado de la solicitud de ${lead.name}`"
                @change="changeStatus(lead, $event.target.value)"
              >
                <option v-for="s in statuses" :key="s" :value="s">{{ statusLabel(s) }}</option>
              </select>
            </td>
            <td class="actions">
              <button class="btn-delete" @click="handleDelete(lead)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AdminNav from '~/components/admin/Admin_Nav.vue'
import { useLeads } from '~/composables/useLeads.js'

const STATUS_LABELS = {
  nuevo: 'Nuevo',
  contactado: 'Contactado',
  cotizado: 'Cotizado',
  ganado: 'Ganado',
  perdido: 'Perdido',
}

// definePageMeta va en el <script> normal: un <script setup> sobrescribe el setup() de opciones (ERR-013)
definePageMeta({ middleware: 'auth', layout: false, i18n: false })

export default {
  name: 'Admin_Leads',
  components: { AdminNav },
  setup() {
    return useLeads()
  },
  data() {
    return { filter: 'nuevo' }
  },
  computed: {
    filters() {
      const count = (s) => this.leads.filter((l) => l.status === s).length
      return [
        ...this.statuses.map((s) => ({ value: s, label: STATUS_LABELS[s], count: count(s) })),
        { value: 'todos', label: 'Todos', count: this.leads.length },
      ]
    },
    visibleLeads() {
      return this.filter === 'todos' ? this.leads : this.leads.filter((l) => l.status === this.filter)
    },
  },
  methods: {
    statusLabel(s) {
      return STATUS_LABELS[s] || s
    },
    formatDate(ts) {
      const date = ts?.toDate?.()
      return date ? date.toLocaleString('es-EC', { dateStyle: 'medium', timeStyle: 'short' }) : '—'
    },
    whatsappUrl(phone) {
      return `https://wa.me/${String(phone).replace(/\D/g, '')}`
    },
    async changeStatus(lead, status) {
      try {
        await this.updateLeadStatus(lead.id, status)
      } catch (err) {
        this.$swal.fire({ icon: 'error', title: 'No se pudo cambiar el estado', text: err.message })
      }
    },
    async handleDelete(lead) {
      const { isConfirmed } = await this.$swal.fire({
        icon: 'warning',
        title: '¿Eliminar solicitud?',
        text: `Se eliminará la solicitud de "${lead.name}" permanentemente.`,
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#e74c3c',
      })
      if (!isConfirmed) return
      try {
        await this.deleteLead(lead.id)
        this.$swal.fire({ icon: 'success', title: 'Eliminada', timer: 1500, showConfirmButton: false })
      } catch (err) {
        this.$swal.fire({ icon: 'error', title: 'Error al eliminar', text: err.message })
      }
    },
  },
}
</script>

<style scoped>
@import '~/assets/admin.css';
</style>
