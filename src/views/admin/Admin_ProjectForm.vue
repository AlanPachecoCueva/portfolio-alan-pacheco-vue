<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>{{ isEdit ? 'Editar proyecto' : 'Nuevo proyecto' }}</h1>
        <router-link :to="{ name: 'AdminProjects' }" class="btn-edit">← Volver</router-link>
      </div>

      <div v-if="loadingData" class="state-msg">Cargando...</div>

      <form v-else class="project-form" @submit.prevent="handleSave">

        <!-- Información básica -->
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

        <!-- Descripciones bilingüe -->
        <section class="form-section">
          <h2 class="section-title">Descripción</h2>
          <div class="field">
            <label>Descripción en español *</label>
            <textarea v-model="form.description_es" required rows="4"
              placeholder="Describe el proyecto en español..." />
          </div>
          <div class="field">
            <label>Descripción en inglés *</label>
            <textarea v-model="form.description_en" required rows="4"
              placeholder="Describe the project in English..." />
          </div>
        </section>

        <!-- Tecnologías -->
        <section class="form-section">
          <h2 class="section-title">Tecnologías</h2>
          <div class="field-row">
            <div class="field">
              <label>Tecnología principal *</label>
              <input v-model="form.technology" required placeholder="Vue, React, Python..." />
            </div>
          </div>
          <div class="field">
            <label>Tecnologías relacionadas</label>
            <div class="tags-input">
              <span v-for="(tech, i) in form.relatedTechnologies" :key="i" class="tag">
                {{ tech }}
                <button type="button" @click="removeTech(i)">✕</button>
              </span>
              <input
                v-model="techInput"
                placeholder="Agregar tecnología y presionar Enter"
                @keydown.enter.prevent="addTech"
                @keydown.comma.prevent="addTech"
              />
            </div>
          </div>
        </section>

        <!-- Thumbnail -->
        <section class="form-section">
          <h2 class="section-title">Imagen de portada (thumbnail)</h2>
          <ImageSelector
            :single="true"
            :current-url="form.thumbnailUrl"
            @pick="onThumbnailPick"
            @remove="clearThumbnail"
          />
        </section>

        <!-- Imágenes de detalle -->
        <section class="form-section">
          <h2 class="section-title">Imágenes de detalle</h2>
          <div
            v-for="(img, i) in form.imageUrls"
            :key="i"
            class="detail-image-row"
          >
            <img :src="img.url" class="detail-thumb" alt="img" />
            <div class="detail-controls">
              <div class="field-row">
                <div class="field field--sm">
                  <label>Columnas</label>
                  <input v-model.number="img.columns" type="number" min="1" max="4" />
                </div>
                <div class="field field--sm">
                  <label>Filas</label>
                  <input v-model.number="img.rows" type="number" min="1" max="4" />
                </div>
              </div>
            </div>
            <button type="button" class="btn-remove-img" @click="removeDetailImage(i)">✕</button>
          </div>
          <ImageSelector
            :single="false"
            @pick="onDetailPick"
          />
        </section>

        <!-- Layout en grid -->
        <section class="form-section">
          <h2 class="section-title">Tamaño en "My Works"</h2>
          <div class="field-row">
            <div class="field field--sm">
              <label>Columnas *</label>
              <input v-model.number="form.columns" type="number" min="1" max="4" required />
            </div>
            <div class="field field--sm">
              <label>Filas *</label>
              <input v-model.number="form.rows" type="number" min="1" max="4" required />
            </div>
            <div class="field field--sm">
              <label>Orden (opcional)</label>
              <input v-model.number="form.order" type="number" placeholder="null" />
            </div>
          </div>
        </section>

        <!-- Publicación -->
        <section class="form-section">
          <label class="toggle-field">
            <input type="checkbox" v-model="form.published" />
            <span>Publicado (visible en el portafolio)</span>
          </label>
        </section>

        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="saving">
            {{ saving ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear proyecto' }}
          </button>
          <router-link :to="{ name: 'AdminProjects' }" class="btn-cancel-link">
            Cancelar
          </router-link>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import AdminNav from '@/components/admin/Admin_Nav.vue'
import ImageSelector from '@/components/admin/Image_Selector.vue'
import { getProject, createProject, updateProject } from '@/firebase/projects.js'
import { Timestamp } from 'firebase/firestore'

export default {
  name: 'Admin_ProjectForm',
  components: { AdminNav, ImageSelector },
  data() {
    return {
      loadingData: false,
      saving: false,
      techInput: '',
      form: {
        title: '',
        title_en: '',
        description_es: '',
        description_en: '',
        dateStr: new Date().toISOString().split('T')[0],
        url: '',
        category: 'web',
        technology: '',
        relatedTechnologies: [],
        columns: 1,
        rows: 1,
        order: null,
        published: false,
        thumbnailImageId: '',
        thumbnailUrl: '',
        imageIds: [],
        imageUrls: [],
      },
    }
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id
    },
  },
  async mounted() {
    if (this.isEdit) {
      this.loadingData = true
      const project = await getProject(this.$route.params.id)
      if (project) {
        const date = project.date?.toDate?.() ?? new Date()
        this.form = {
          ...this.form,
          ...project,
          dateStr: date.toISOString().split('T')[0],
          order: project.order ?? null,
          url: project.url ?? '',
          imageUrls: project.imageUrls || [],
          relatedTechnologies: project.relatedTechnologies || [],
        }
      }
      this.loadingData = false
    }
  },
  methods: {
    addTech() {
      const val = this.techInput.trim().replace(/,$/, '')
      if (val && !this.form.relatedTechnologies.includes(val)) {
        this.form.relatedTechnologies.push(val)
      }
      this.techInput = ''
    },
    removeTech(i) {
      this.form.relatedTechnologies.splice(i, 1)
    },
    clearThumbnail() {
      this.form.thumbnailImageId = ''
      this.form.thumbnailUrl = ''
    },
    removeDetailImage(i) {
      this.form.imageIds.splice(i, 1)
      this.form.imageUrls.splice(i, 1)
    },
    onThumbnailPick({ id, url }) {
      this.form.thumbnailImageId = id
      this.form.thumbnailUrl = url
    },
    onDetailPick({ id, url }) {
      if (!this.form.imageIds.includes(id)) {
        this.form.imageIds.push(id)
        this.form.imageUrls.push({ url, columns: 1, rows: 1 })
      }
    },
    async handleSave() {
      this.saving = true
      try {
        const date = this.form.dateStr
          ? Timestamp.fromDate(new Date(this.form.dateStr))
          : Timestamp.now()

        const data = {
          title: this.form.title,
          title_en: this.form.title_en,
          description_es: this.form.description_es,
          description_en: this.form.description_en,
          date,
          url: this.form.url || null,
          category: this.form.category,
          technology: this.form.technology,
          relatedTechnologies: this.form.relatedTechnologies,
          columns: this.form.columns,
          rows: this.form.rows,
          order: this.form.order !== '' ? this.form.order : null,
          published: this.form.published,
          thumbnailImageId: this.form.thumbnailImageId,
          thumbnailUrl: this.form.thumbnailUrl,
          imageIds: this.form.imageIds,
          imageUrls: this.form.imageUrls,
        }

        if (this.isEdit) {
          await updateProject(this.$route.params.id, data)
        } else {
          await createProject(data)
        }
        await this.$swal.fire({ icon: 'success', title: '¡Guardado!', text: `Proyecto "${data.title}" guardado correctamente.`, timer: 2000, showConfirmButton: false })
        this.$router.push({ name: 'AdminProjects' })
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
@import '@/assets/admin.css';

.project-form {
  max-width: 780px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.form-section {
  padding: 24px 0;
  border-bottom: 1px solid #1e1e1e;
}

.section-title {
  font-size: 0.85em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #666;
  margin-bottom: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.field--sm { max-width: 120px; }

.field label {
  font-size: 0.83em;
  color: #888;
}

.field input,
.field select,
.field textarea {
  padding: 9px 12px;
  background: #1e1e1e;
  border: 1px solid #2a2a2a;
  border-radius: 7px;
  color: #eee;
  font-size: 0.92em;
  font-family: inherit;
  resize: vertical;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: #f39c12;
}

.field-row {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.field-row .field { flex: 1; min-width: 120px; }

/* ── Tags ── */
.tags-input {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  padding: 8px 10px;
  background: #1e1e1e;
  border: 1px solid #2a2a2a;
  border-radius: 7px;
  min-height: 42px;
  align-items: center;
}

.tags-input:focus-within { border-color: #f39c12; }

.tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #2a2a2a;
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 0.82em;
  color: #ddd;
}

.tag button {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 0.9em;
  padding: 0;
  line-height: 1;
}

.tag button:hover { color: #e74c3c; }

.tags-input input {
  background: transparent;
  border: none;
  outline: none;
  color: #eee;
  font-size: 0.88em;
  flex: 1;
  min-width: 160px;
  padding: 2px 0;
}

/* ── Image selectors ── */
.image-selector {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.image-preview {
  position: relative;
  display: inline-block;
}

.image-preview img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #333;
}

.image-placeholder {
  width: 100px;
  height: 100px;
  background: #1e1e1e;
  border: 1px dashed #333;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72em;
  color: #555;
  text-align: center;
  padding: 8px;
}

.btn-pick {
  padding: 8px 14px;
  background: #2a2a2a;
  border: 1px solid #333;
  border-radius: 7px;
  color: #ccc;
  font-size: 0.85em;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.btn-pick:hover {
  border-color: #f39c12;
  color: #f39c12;
}

.btn-remove-img {
  display: block;
  margin-top: 4px;
  background: transparent;
  border: none;
  color: #e74c3c;
  font-size: 0.78em;
  cursor: pointer;
}

/* ── Detail images ── */
.detail-image-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
  background: #1a1a1a;
  padding: 10px;
  border-radius: 8px;
}

.detail-thumb {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.detail-controls { flex: 1; }

/* ── Toggle ── */
.toggle-field {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 0.92em;
  color: #ccc;
}

/* ── Form actions ── */
.form-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 28px;
}

.btn-cancel-link {
  color: #888;
  font-size: 0.9em;
  text-decoration: none;
}

.btn-cancel-link:hover { color: #ccc; }

.form-error {
  color: #e74c3c;
  font-size: 0.85em;
  margin-top: 8px;
}
</style>
