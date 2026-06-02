<script setup>
definePageMeta({ middleware: 'auth', layout: false })
</script>

<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>Nuevo proyecto</h1>
        <NuxtLink :to="{ name: 'admin-projects' }" class="btn-edit">← Volver</NuxtLink>
      </div>

      <form class="project-form" @submit.prevent="handleSave">
        <section class="form-section">
          <h2 class="section-title">Información básica</h2>
          <div class="field-row">
            <div class="field">
              <label>Título (español) *</label>
              <input v-model="form.title" required placeholder="Nombre del proyecto" />
            </div>
            <div class="field">
              <label>Title (English) *</label>
              <input v-model="form.title_en" required placeholder="Project name" />
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <label>Categoría *</label>
              <select v-model="form.category" required>
                <option value="web">Web</option>
                <option value="ai">IA</option>
                <option value="mobile">Mobile</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div class="field">
              <label>Fecha</label>
              <input v-model="form.dateStr" type="date" />
            </div>
          </div>
          <div class="field">
            <label>URL del proyecto (opcional)</label>
            <input v-model="form.url" type="url" placeholder="https://..." />
          </div>
        </section>

        <section class="form-section">
          <h2 class="section-title">Descripción</h2>
          <div class="field">
            <label>Descripción en español *</label>
            <textarea v-model="form.description_es" required rows="4" placeholder="Describe el proyecto en español..." />
          </div>
          <div class="field">
            <label>Descripción en inglés *</label>
            <textarea v-model="form.description_en" required rows="4" placeholder="Describe the project in English..." />
          </div>
        </section>

        <section class="form-section">
          <h2 class="section-title">Tecnologías</h2>
          <div class="field">
            <label>Tecnología principal *</label>
            <input v-model="form.technology" required placeholder="Vue, React, Python..." />
          </div>
          <div class="field">
            <label>Tecnologías relacionadas</label>
            <div class="tags-input">
              <span v-for="(tech, i) in form.relatedTechnologies" :key="i" class="tag">
                {{ tech }}
                <button type="button" @click="removeTech(i)">✕</button>
              </span>
              <input v-model="techInput" placeholder="Agregar tecnología y presionar Enter"
                @keydown.enter.prevent="addTech" @keydown.comma.prevent="addTech" />
            </div>
          </div>
        </section>

        <section class="form-section">
          <h2 class="section-title">Imagen de portada (thumbnail)</h2>
          <ImageSelector :single="true" :current-url="form.thumbnailUrl" @pick="onThumbnailPick" @remove="clearThumbnail" />
        </section>

        <section class="form-section">
          <h2 class="section-title">Imágenes de detalle</h2>
          <div v-for="(img, i) in form.imageUrls" :key="i" class="detail-image-row">
            <img :src="img.url" class="detail-thumb" alt="img" />
            <div class="detail-controls">
              <div class="field-row">
                <div class="field field--sm"><label>Columnas</label><input v-model.number="img.columns" type="number" min="1" max="4" /></div>
                <div class="field field--sm"><label>Filas</label><input v-model.number="img.rows" type="number" min="1" max="4" /></div>
              </div>
            </div>
            <button type="button" class="btn-remove-img" @click="removeDetailImage(i)">✕</button>
          </div>
          <ImageSelector :single="false" @pick="onDetailPick" />
        </section>

        <section class="form-section">
          <h2 class="section-title">Tamaño en "My Works"</h2>
          <div class="field-row">
            <div class="field field--sm"><label>Columnas *</label><input v-model.number="form.columns" type="number" min="1" max="4" required /></div>
            <div class="field field--sm"><label>Filas *</label><input v-model.number="form.rows" type="number" min="1" max="4" required /></div>
            <div class="field field--sm"><label>Orden (opcional)</label><input v-model.number="form.order" type="number" placeholder="null" /></div>
          </div>
        </section>

        <section class="form-section">
          <label class="toggle-field">
            <input type="checkbox" v-model="form.published" />
            <span>Publicado (visible en el portafolio)</span>
          </label>
        </section>

        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="saving">
            {{ saving ? 'Guardando...' : 'Crear proyecto' }}
          </button>
          <NuxtLink :to="{ name: 'admin-projects' }" class="btn-cancel-link">Cancelar</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AdminNav from '~/components/admin/Admin_Nav.vue'
import ImageSelector from '~/components/admin/Image_Selector.vue'
import { createProject } from '~/utils/firebase/projects.js'
import { Timestamp } from 'firebase/firestore'

export default {
  name: 'Admin_ProjectNew',
  components: { AdminNav, ImageSelector },
  data() {
    return {
      saving: false,
      techInput: '',
      form: {
        title: '', title_en: '', description_es: '', description_en: '',
        dateStr: new Date().toISOString().split('T')[0],
        url: '', category: 'web', technology: '', relatedTechnologies: [],
        columns: 1, rows: 1, order: null, published: false,
        thumbnailImageId: '', thumbnailUrl: '', imageIds: [], imageUrls: [],
      },
    }
  },
  methods: {
    addTech() {
      const val = this.techInput.trim().replace(/,$/, '')
      if (val && !this.form.relatedTechnologies.includes(val)) this.form.relatedTechnologies.push(val)
      this.techInput = ''
    },
    removeTech(i) { this.form.relatedTechnologies.splice(i, 1) },
    clearThumbnail() { this.form.thumbnailImageId = ''; this.form.thumbnailUrl = '' },
    removeDetailImage(i) { this.form.imageIds.splice(i, 1); this.form.imageUrls.splice(i, 1) },
    onThumbnailPick({ id, url }) { this.form.thumbnailImageId = id; this.form.thumbnailUrl = url },
    onDetailPick({ id, url }) {
      if (!this.form.imageIds.includes(id)) {
        this.form.imageIds.push(id)
        this.form.imageUrls.push({ url, columns: 1, rows: 1 })
      }
    },
    async handleSave() {
      this.saving = true
      try {
        const date = this.form.dateStr ? Timestamp.fromDate(new Date(this.form.dateStr)) : Timestamp.now()
        const data = { ...this.form, date, url: this.form.url || null, order: this.form.order !== '' ? this.form.order : null }
        await createProject(data)
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
