<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>Editar miembro</h1>
        <NuxtLink :to="{ name: 'admin-team' }" class="btn-edit">← Volver</NuxtLink>
      </div>

      <div v-if="loadingData" class="state-msg">Cargando...</div>
      <div v-else-if="!member" class="state-msg">El miembro no existe.</div>
      <TeamMemberForm
        v-else
        :initial="member"
        :taken-slugs="members.filter((m) => m.id !== member.id).map((m) => m.slug)"
        :saving="saving"
        submit-label="Guardar cambios"
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
definePageMeta({ middleware: 'auth', layout: false })

export default {
  name: 'Admin_TeamEdit',
  components: { AdminNav, TeamMemberForm },
  setup() {
    const { members, getMember, updateMember } = useTeam()
    return { members, getMember, updateMember }
  },
  data() {
    return { loadingData: true, saving: false, member: null }
  },
  async mounted() {
    this.member = await this.getMember(this.$route.params.id)
    this.loadingData = false
  },
  methods: {
    async handleSave(data) {
      this.saving = true
      try {
        await this.updateMember(this.$route.params.id, data)
        await this.$swal.fire({ icon: 'success', title: '¡Guardado!', text: `Perfil de "${data.name}" guardado correctamente.`, timer: 2000, showConfirmButton: false })
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
