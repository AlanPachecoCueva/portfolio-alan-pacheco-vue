<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>Nuevo servicio</h1>
        <NuxtLink :to="{ name: 'admin-services' }" class="btn-edit">← Volver</NuxtLink>
      </div>

      <ServiceForm
        :taken-slugs="services.map((s) => s.slug)"
        :saving="saving"
        submit-label="Crear servicio"
        @submit="handleSave"
      />
    </div>
  </div>
</template>

<script>
import AdminNav from '~/components/admin/Admin_Nav.vue'
import ServiceForm from '~/components/admin/Service_Form.vue'
import { useServices } from '~/composables/useServices.js'

// definePageMeta va en el <script> normal: un <script setup> sobrescribe el setup() de opciones (ERR-013)
definePageMeta({ middleware: 'auth', layout: false, i18n: false })

export default {
  name: 'Admin_ServiceNew',
  components: { AdminNav, ServiceForm },
  setup() {
    const { services, createService } = useServices()
    return { services, createService }
  },
  data() {
    return { saving: false }
  },
  methods: {
    async handleSave(data) {
      this.saving = true
      try {
        await this.createService(data)
        await this.$swal.fire({ icon: 'success', title: '¡Guardado!', text: `Servicio "${data.title_es}" creado correctamente.`, timer: 2000, showConfirmButton: false })
        this.$router.push({ name: 'admin-services' })
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
