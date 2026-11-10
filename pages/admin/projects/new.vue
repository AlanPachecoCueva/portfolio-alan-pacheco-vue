<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>Nuevo proyecto</h1>
        <NuxtLink :to="{ name: 'admin-projects' }" class="btn-edit">← Volver</NuxtLink>
      </div>

      <ProjectForm
        :taken-slugs="projects.map((p) => p.slug).filter(Boolean)"
        :services="services"
        :members="members"
        :saving="saving"
        submit-label="Crear proyecto"
        @submit="handleSave"
      />
    </div>
  </div>
</template>

<script>
import AdminNav from '~/components/admin/Admin_Nav.vue'
import ProjectForm from '~/components/admin/Project_Form.vue'
import { useProjects } from '~/composables/useProjects.js'
import { useServices } from '~/composables/useServices.js'
import { useTeam } from '~/composables/useTeam.js'

// definePageMeta va en el <script> normal: un <script setup> sobrescribe el setup() de opciones (ERR-013)
definePageMeta({ middleware: 'auth', layout: false, i18n: false })

export default {
  name: 'Admin_ProjectNew',
  components: { AdminNav, ProjectForm },
  setup() {
    const { projects, createProject } = useProjects()
    const { services } = useServices()
    const { members } = useTeam()
    return { projects, createProject, services, members }
  },
  data() {
    return { saving: false }
  },
  methods: {
    async handleSave(data) {
      this.saving = true
      try {
        await this.createProject(data)
        await this.$swal.fire({ icon: 'success', title: '¡Guardado!', text: `Proyecto "${data.title}" creado correctamente.`, timer: 2000, showConfirmButton: false })
        this.$router.push({ name: 'admin-projects' })
      } catch (err) {
        this.$swal.fire({ icon: 'error', title: 'Error al guardar', text: err.message })
      } finally {
        this.saving = false
      }
    },
  },
}
</script>

<style scoped>
@import '~/assets/admin.css';
</style>
