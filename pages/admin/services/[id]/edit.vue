<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>Editar servicio</h1>
        <NuxtLink :to="{ name: 'admin-services' }" class="btn-edit">← Volver</NuxtLink>
      </div>

      <div v-if="loadingData" class="state-msg">Cargando...</div>
      <div v-else-if="!service" class="state-msg">El servicio no existe.</div>
      <ServiceForm
        v-else
        :initial="service"
        :taken-slugs="services.filter((s) => s.id !== service.id).map((s) => s.slug)"
        :saving="saving"
        submit-label="Guardar cambios"
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
definePageMeta({ middleware: 'auth', layout: false })

export default {
  name: 'Admin_ServiceEdit',
  components: { AdminNav, ServiceForm },
  setup() {
    const { services, getService, updateService } = useServices()
    return { services, getService, updateService }
  },
  data() {
    return { loadingData: true, saving: false, service: null }
  },
  async mounted() {
    this.service = await this.getService(this.$route.params.id)
    this.loadingData = false
  },
  methods: {
    async handleSave(data) {
      this.saving = true
      try {
        await this.updateService(this.$route.params.id, data)
        await this.$swal.fire({ icon: 'success', title: '¡Guardado!', text: `Servicio "${data.title_es}" guardado correctamente.`, timer: 2000, showConfirmButton: false })
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
