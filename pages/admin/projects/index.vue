<script setup>
definePageMeta({ middleware: 'auth', layout: false })
</script>

<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>Proyectos</h1>
        <NuxtLink :to="{ name: 'admin-projects-new' }" class="btn-primary">
          + Nuevo proyecto
        </NuxtLink>
      </div>

      <div v-if="loading" class="state-msg">Cargando...</div>
      <div v-else-if="projects.length === 0" class="state-msg">No hay proyectos aún.</div>
      <table v-else class="admin-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Categoría</th>
            <th>Publicado</th>
            <th>Orden</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td>{{ project.title }}</td>
            <td>{{ project.category }}</td>
            <td>
              <span :class="project.published ? 'badge-green' : 'badge-gray'">
                {{ project.published ? 'Sí' : 'No' }}
              </span>
            </td>
            <td>{{ project.order ?? '—' }}</td>
            <td class="actions">
              <NuxtLink
                :to="{ name: 'admin-projects-id-edit', params: { id: project.id } }"
                class="btn-edit"
              >Editar</NuxtLink>
              <button class="btn-delete" @click="handleDelete(project)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AdminNav from '~/components/admin/Admin_Nav.vue'
import { useProjects } from '~/composables/useProjects.js'

export default {
  name: 'Admin_Projects',
  components: { AdminNav },
  setup() {
    return useProjects()
  },
  methods: {
    async handleDelete(project) {
      const { isConfirmed } = await this.$swal.fire({
        icon: 'warning',
        title: '¿Eliminar proyecto?',
        text: `Se eliminará "${project.title}" permanentemente.`,
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#e74c3c',
      })
      if (!isConfirmed) return
      try {
        await this.deleteProject(project.id)
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
