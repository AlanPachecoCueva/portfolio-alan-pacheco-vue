<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>Servicios</h1>
        <NuxtLink :to="{ name: 'admin-services-new' }" class="btn-primary">
          + Nuevo servicio
        </NuxtLink>
      </div>

      <div v-if="loading" class="state-msg">Cargando...</div>
      <div v-else-if="services.length === 0" class="state-msg">No hay servicios aún.</div>
      <table v-else class="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Slug</th>
            <th>Publicado</th>
            <th>Orden</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in services" :key="service.id">
            <td>{{ service.title_es }}</td>
            <td>/servicios/{{ service.slug }}</td>
            <td>
              <span :class="service.published ? 'badge-green' : 'badge-gray'">
                {{ service.published ? 'Sí' : 'No' }}
              </span>
            </td>
            <td>{{ service.order ?? '—' }}</td>
            <td class="actions">
              <NuxtLink
                :to="{ name: 'admin-services-id-edit', params: { id: service.id } }"
                class="btn-edit"
              >Editar</NuxtLink>
              <button class="btn-delete" @click="handleDelete(service)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AdminNav from '~/components/admin/Admin_Nav.vue'
import { useServices } from '~/composables/useServices.js'

// definePageMeta va en el <script> normal: un <script setup> sobrescribe el setup() de opciones (ERR-013)
definePageMeta({ middleware: 'auth', layout: false, i18n: false })

export default {
  name: 'Admin_Services',
  components: { AdminNav },
  setup() {
    return useServices()
  },
  methods: {
    async handleDelete(service) {
      const { isConfirmed } = await this.$swal.fire({
        icon: 'warning',
        title: '¿Eliminar servicio?',
        text: `Se eliminará "${service.title_es}" permanentemente. Los proyectos que lo referencian quedarán sin este servicio.`,
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#e74c3c',
      })
      if (!isConfirmed) return
      try {
        await this.deleteService(service.id)
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
