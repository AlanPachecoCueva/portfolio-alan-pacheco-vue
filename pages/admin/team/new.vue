<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>Nuevo miembro</h1>
        <NuxtLink :to="{ name: 'admin-team' }" class="btn-edit">← Volver</NuxtLink>
      </div>

      <TeamMemberForm
        :taken-slugs="members.map((m) => m.slug)"
        :saving="saving"
        submit-label="Crear miembro"
        @submit="handleSave"
      />
    </div>
  </div>
</template>

<script>
import AdminNav from '~/components/admin/Admin_Nav.vue'
import TeamMemberForm from '~/components/admin/Team_Member_Form.vue'
import { useTeam } from '~/composables/useTeam.js'

// definePageMeta va en el <script> normal: un <script setup> sobrescribe el setup() de opciones (ERR-013)
definePageMeta({ middleware: 'auth', layout: false, i18n: false })

export default {
  name: 'Admin_TeamNew',
  components: { AdminNav, TeamMemberForm },
  setup() {
    const { members, createMember } = useTeam()
    return { members, createMember }
  },
  data() {
    return { saving: false }
  },
  methods: {
    async handleSave(data) {
      this.saving = true
      try {
        await this.createMember(data)
        await this.$swal.fire({ icon: 'success', title: '¡Guardado!', text: `Perfil de "${data.name}" creado correctamente.`, timer: 2000, showConfirmButton: false })
        this.$router.push({ name: 'admin-team' })
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
