<script setup>
definePageMeta({ middleware: 'auth', layout: false })
</script>

<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>Logros</h1>
        <NuxtLink :to="{ name: 'admin-achievements-new' }" class="btn-primary">
          + Nuevo logro
        </NuxtLink>
      </div>

      <div v-if="loading" class="state-msg">Cargando...</div>
      <div v-else-if="achievements.length === 0" class="state-msg">No hay logros aún.</div>
      <table v-else class="admin-table">
        <thead>
          <tr>
            <th>Título</th><th>Tipo</th><th>Institución</th><th>Publicado</th><th>Orden</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="achievement in achievements" :key="achievement.id">
            <td>{{ achievement.title }}</td>
            <td>{{ achievement.type }}</td>
            <td>{{ achievement.issuer }}</td>
            <td>
              <span :class="achievement.published ? 'badge-green' : 'badge-gray'">
                {{ achievement.published ? 'Sí' : 'No' }}
              </span>
            </td>
            <td>{{ achievement.order ?? '—' }}</td>
            <td class="actions">
              <NuxtLink :to="{ name: 'admin-achievements-id-edit', params: { id: achievement.id } }" class="btn-edit">Editar</NuxtLink>
              <button class="btn-delete" @click="handleDelete(achievement)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AdminNav from '~/components/admin/Admin_Nav.vue'
import { useAchievements } from '~/composables/useAchievements.js'

export default {
  name: 'Admin_Achievements',
  components: { AdminNav },
  setup() {
    return useAchievements()
  },
  methods: {
    async handleDelete(achievement) {
      const { isConfirmed } = await this.$swal.fire({
        icon: 'warning', title: '¿Eliminar logro?',
        text: `Se eliminará "${achievement.title}" permanentemente.`,
        showCancelButton: true, confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar', confirmButtonColor: '#e74c3c',
      })
      if (!isConfirmed) return
      try {
        await this.deleteAchievement(achievement.id)
        this.$swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
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
