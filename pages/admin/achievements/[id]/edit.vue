<script setup>
definePageMeta({ middleware: 'auth', layout: false })
</script>

<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>Editar logro</h1>
        <NuxtLink :to="{ name: 'admin-achievements' }" class="btn-edit">← Volver</NuxtLink>
      </div>

      <div v-if="loadingData" class="state-msg">Cargando...</div>

      <form v-else class="achievement-form" @submit.prevent="handleSave">
        <section class="form-section">
          <h2 class="section-title">Información básica</h2>
          <div class="field-row">
            <div class="field"><label>Título (español) *</label><input v-model="form.title" required placeholder="Nombre del logro" /></div>
            <div class="field"><label>Title (English) *</label><input v-model="form.title_en" required placeholder="Achievement name" /></div>
          </div>
          <div class="field-row">
            <div class="field">
              <label>Tipo *</label>
              <select v-model="form.type" required>
                <option value="award">Premio</option>
                <option value="certification">Certificación</option>
                <option value="competition">Competencia</option>
                <option value="academic">Académico</option>
                <option value="work">Laboral</option>
              </select>
            </div>
            <div class="field"><label>Institución / Emisor *</label><input v-model="form.issuer" required /></div>
            <div class="field"><label>Fecha</label><input v-model="form.dateStr" type="date" /></div>
          </div>
          <div class="field"><label>URL del certificado (opcional)</label><input v-model="form.link" type="url" /></div>
        </section>

        <section class="form-section">
          <h2 class="section-title">Descripción</h2>
          <div class="field"><label>Descripción en español *</label><textarea v-model="form.description_es" required rows="3" /></div>
          <div class="field"><label>Descripción en inglés *</label><textarea v-model="form.description_en" required rows="3" /></div>
        </section>

        <section class="form-section">
          <h2 class="section-title">Imagen de portada (thumbnail)</h2>
          <ImageSelector :single="true" :current-url="form.thumbnailUrl" @pick="onThumbnailPick" @remove="clearThumbnail" />
        </section>

        <section class="form-section">
          <h2 class="section-title">Imágenes relacionadas</h2>
          <div v-for="(img, i) in form.imageUrls" :key="i" class="detail-image-row">
            <img :src="img.url" class="detail-thumb" alt="img" />
            <div class="detail-label">{{ img.url.split('/').pop().substring(0, 30) }}</div>
            <button type="button" class="btn-remove-img" @click="removeDetailImage(i)">✕</button>
          </div>
          <ImageSelector :single="false" @pick="onDetailPick" />
        </section>

        <section class="form-section">
          <h2 class="section-title">Opciones</h2>
          <div class="field field--sm"><label>Orden (opcional)</label><input v-model.number="form.order" type="number" /></div>
        </section>

        <section class="form-section">
          <label class="toggle-field">
            <input type="checkbox" v-model="form.published" />
            <span>Publicado (visible en /achievements)</span>
          </label>
        </section>

        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="saving">{{ saving ? 'Guardando...' : 'Guardar cambios' }}</button>
          <NuxtLink :to="{ name: 'admin-achievements' }" class="btn-cancel-link">Cancelar</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AdminNav from '~/components/admin/Admin_Nav.vue'
import ImageSelector from '~/components/admin/Image_Selector.vue'
import { getAchievement, updateAchievement } from '~/utils/firebase/achievements.js'
import { Timestamp } from 'firebase/firestore'

export default {
  name: 'Admin_AchievementEdit',
  components: { AdminNav, ImageSelector },
  data() {
    return {
      loadingData: false,
      saving: false,
      form: {
        title: '', title_en: '', description_es: '', description_en: '',
        dateStr: new Date().toISOString().split('T')[0],
        type: 'award', issuer: '', link: '', order: null, published: false,
        thumbnailImageId: '', thumbnailUrl: '', imageIds: [], imageUrls: [],
      },
    }
  },
  async mounted() {
    this.loadingData = true
    const achievement = await getAchievement(this.$route.params.id)
    if (achievement) {
      const date = achievement.date?.toDate?.() ?? new Date()
      this.form = { ...this.form, ...achievement, dateStr: date.toISOString().split('T')[0], order: achievement.order ?? null, link: achievement.link ?? '', imageUrls: achievement.imageUrls || [] }
    }
    this.loadingData = false
  },
  methods: {
    clearThumbnail() { this.form.thumbnailImageId = ''; this.form.thumbnailUrl = '' },
    removeDetailImage(i) { this.form.imageIds.splice(i, 1); this.form.imageUrls.splice(i, 1) },
    onThumbnailPick({ id, url }) { this.form.thumbnailImageId = id; this.form.thumbnailUrl = url },
    onDetailPick({ id, url }) {
      if (!this.form.imageIds.includes(id)) { this.form.imageIds.push(id); this.form.imageUrls.push({ url }) }
    },
    async handleSave() {
      this.saving = true
      try {
        const date = this.form.dateStr ? Timestamp.fromDate(new Date(this.form.dateStr)) : Timestamp.now()
        const data = { ...this.form, date, link: this.form.link || null, order: this.form.order !== '' ? this.form.order : null }
        await updateAchievement(this.$route.params.id, data)
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
