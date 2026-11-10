<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>Nuevo logro</h1>
        <NuxtLink :to="{ name: 'admin-achievements' }" class="btn-edit">← Volver</NuxtLink>
      </div>

      <AchievementForm
        :taken-slugs="achievements.map((a) => a.slug).filter(Boolean)"
        :members="members"
        :saving="saving"
        submit-label="Crear logro"
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
  name: 'Admin_AchievementNew',
  components: { AdminNav, AchievementForm },
  setup() {
    const { achievements, createAchievement } = useAchievements()
    const { members } = useTeam()
    return { achievements, createAchievement, members }
  },
  data() {
    return { saving: false }
  },
  methods: {
    async handleSave(data) {
      this.saving = true
      try {
        await this.createAchievement(data)
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
