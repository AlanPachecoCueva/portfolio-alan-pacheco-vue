<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>Editar logro</h1>
        <NuxtLink :to="{ name: 'admin-achievements' }" class="btn-edit">← Volver</NuxtLink>
      </div>

      <div v-if="loadingData" class="state-msg">Cargando...</div>
      <div v-else-if="!achievement" class="state-msg">El logro no existe.</div>
      <AchievementForm
        v-else
        :initial="achievement"
        :taken-slugs="achievements.filter((a) => a.id !== achievement.id).map((a) => a.slug).filter(Boolean)"
        :members="members"
        :saving="saving"
        submit-label="Guardar cambios"
        @submit="handleSave"
      />
    </div>
  </div>
</template>

<script>
import AdminNav from '~/components/admin/Admin_Nav.vue'
import AchievementForm from '~/components/admin/Achievement_Form.vue'
import { useAchievements } from '~/composables/useAchievements.js'
import { useTeam } from '~/composables/useTeam.js'

// definePageMeta va en el <script> normal: un <script setup> sobrescribe el setup() de opciones (ERR-013)
definePageMeta({ middleware: 'auth', layout: false, i18n: false })

export default {
  name: 'Admin_AchievementEdit',
  components: { AdminNav, AchievementForm },
  setup() {
    const { achievements, getAchievement, updateAchievement } = useAchievements()
    const { members } = useTeam()
    return { achievements, getAchievement, updateAchievement, members }
  },
  data() {
    return { loadingData: true, saving: false, achievement: null }
  },
  async mounted() {
    this.achievement = await this.getAchievement(this.$route.params.id)
    this.loadingData = false
  },
  methods: {
    async handleSave(data) {
      this.saving = true
      try {
        await this.updateAchievement(this.$route.params.id, data)
        await this.$swal.fire({ icon: 'success', title: '¡Guardado!', timer: 2000, showConfirmButton: false })
        this.$router.push({ name: 'admin-achievements' })
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
