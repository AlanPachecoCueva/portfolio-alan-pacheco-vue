<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>Equipo</h1>
        <NuxtLink :to="{ name: 'admin-team-new' }" class="btn-primary">
          + Nuevo miembro
        </NuxtLink>
      </div>

      <div v-if="loading" class="state-msg">Cargando...</div>
      <div v-else-if="members.length === 0" class="state-msg">No hay miembros aún.</div>
      <table v-else class="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Perfil</th>
            <th>Publicado</th>
            <th>Orden</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members" :key="member.id">
            <td>{{ member.name }}</td>
            <td>{{ member.role_es }}</td>
            <td>/equipo/{{ member.slug }}</td>
            <td>
              <span :class="member.published ? 'badge-green' : 'badge-gray'">
                {{ member.published ? 'Sí' : 'No' }}
              </span>
            </td>
            <td>{{ member.order ?? '—' }}</td>
            <td class="actions">
              <NuxtLink
                :to="{ name: 'admin-team-id-edit', params: { id: member.id } }"
                class="btn-edit"
              >Editar</NuxtLink>
              <button class="btn-delete" @click="handleDelete(member)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AdminNav from '~/components/admin/Admin_Nav.vue'
import { useTeam } from '~/composables/useTeam.js'

// definePageMeta va en el <script> normal: un <script setup> sobrescribe el setup() de opciones (ERR-013)
definePageMeta({ middleware: 'auth', layout: false, i18n: false })

export default {
  name: 'Admin_Team',
  components: { AdminNav },
  setup() {
    return useTeam()
  },
  methods: {
    async handleDelete(member) {
      const { isConfirmed } = await this.$swal.fire({
        icon: 'warning',
        title: '¿Eliminar miembro?',
        text: `Se eliminará el perfil de "${member.name}" permanentemente. Sus proyectos y logros quedarán sin autor.`,
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#e74c3c',
      })
      if (!isConfirmed) return
      try {
        await this.deleteMember(member.id)
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
