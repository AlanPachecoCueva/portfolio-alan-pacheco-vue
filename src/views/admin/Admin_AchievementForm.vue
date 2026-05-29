<template>
  <div class="admin-page">
    <AdminNav />
    <div class="admin-content">
      <div class="page-header">
        <h1>{{ isEdit ? 'Editar logro' : 'Nuevo logro' }}</h1>
        <router-link :to="{ name: 'AdminAchievements' }" class="btn-edit">← Volver</router-link>
      </div>

      <div v-if="loadingData" class="state-msg">Cargando...</div>

      <form v-else class="achievement-form" @submit.prevent="handleSave">

        <!-- Información básica -->
        <section class="form-section">
          <h2 class="section-title">Información básica</h2>

          <div class="field-row">
            <div class="field">
              <label>Título (español) *</label>
              <input v-model="form.title" required placeholder="Nombre del logro o certificación" />
            </div>
            <div class="field">
              <label>Title (English) *</label>
              <input v-model="form.title_en" required placeholder="Achievement or certification name" />
            </div>
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
            <div class="field">
              <label>Institución / Emisor *</label>
              <input v-model="form.issuer" required placeholder="UDLA, Ingennials, PwC..." />
            </div>
            <div class="field">
              <label>Fecha</label>
              <input v-model="form.dateStr" type="date" />
            </div>
          </div>

          <div class="field">
            <label>URL del certificado / badge (opcional)</label>
            <input v-model="form.link" type="url" placeholder="https://..." />
          </div>
        </section>

        <!-- Descripciones bilingüe -->
        <section class="form-section">
          <h2 class="section-title">Descripción</h2>
          <div class="field">
            <label>Descripción en español *</label>
            <textarea v-model="form.description_es" required rows="3"
              placeholder="Describe el logro en español..." />
          </div>
          <div class="field">
            <label>Descripción en inglés *</label>
            <textarea v-model="form.description_en" required rows="3"
              placeholder="Describe the achievement in English..." />
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

        <!-- Imágenes relacionadas -->
        <section class="form-section">
          <h2 class="section-title">Imágenes relacionadas</h2>
          <div
            v-for="(img, i) in form.imageUrls"
            :key="i"
            class="detail-image-row"
          >
            <img :src="img.url" class="detail-thumb" alt="img" />
            <div class="detail-label">{{ img.url.split('/').pop().substring(0, 30) }}</div>
            <button type="button" class="btn-remove-img" @click="removeDetailImage(i)">✕</button>
          </div>
          <ImageSelector
            :single="false"
            @pick="onDetailPick"
          />
        </section>

        <!-- Opciones de display -->
        <section class="form-section">
          <h2 class="section-title">Opciones</h2>
          <div class="field field--sm">
            <label>Orden (opcional)</label>
            <input v-model.number="form.order" type="number" placeholder="null" />
          </div>
        </section>

        <!-- Publicación -->
        <section class="form-section">
          <label class="toggle-field">
            <input type="checkbox" v-model="form.published" />
            <span>Publicado (visible en /achievements)</span>
          </label>
        </section>

        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="saving">
            {{ saving ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear logro' }}
          </button>
          <router-link :to="{ name: 'AdminAchievements' }" class="btn-cancel-link">
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
import { getAchievement, createAchievement, updateAchievement } from '@/firebase/achievements.js'
import { Timestamp } from 'firebase/firestore'

export default {
  name: 'Admin_AchievementForm',
  components: { AdminNav, ImageSelector },
  data() {
    return {
      loadingData: false,
      saving: false,
      form: {
        title: '',
        title_en: '',
        description_es: '',
        description_en: '',
        dateStr: new Date().toISOString().split('T')[0],
        type: 'award',
        issuer: '',
        link: '',
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
      const achievement = await getAchievement(this.$route.params.id)
      if (achievement) {
        const date = achievement.date?.toDate?.() ?? new Date()
        this.form = {
          ...this.form,
          ...achievement,
          dateStr: date.toISOString().split('T')[0],
          order: achievement.order ?? null,
          link: achievement.link ?? '',
          imageUrls: achievement.imageUrls || [],
        }
      }
      this.loadingData = false
    }
  },
  methods: {
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
        this.form.imageUrls.push({ url })
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
          type: this.form.type,
          issuer: this.form.issuer,
          link: this.form.link || null,
          order: this.form.order !== '' ? this.form.order : null,
          published: this.form.published,
          thumbnailImageId: this.form.thumbnailImageId,
          thumbnailUrl: this.form.thumbnailUrl,
          imageIds: this.form.imageIds,
          imageUrls: this.form.imageUrls,
        }

        if (this.isEdit) {
          await updateAchievement(this.$route.params.id, data)
        } else {
          await createAchievement(data)
        }
        await this.$swal.fire({ icon: 'success', title: '¡Guardado!', text: `Logro "${data.title}" guardado correctamente.`, timer: 2000, showConfirmButton: false })
        this.$router.push({ name: 'AdminAchievements' })
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

.achievement-form {
  max-width: 780px;
  display: flex;
  flex-direction: column;
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

.field--sm { max-width: 140px; }

.field label { font-size: 0.83em; color: #888; }

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


.btn-remove-img {
  display: block;
  margin-top: 4px;
  background: transparent;
  border: none;
  color: #e74c3c;
  font-size: 0.78em;
  cursor: pointer;
}

.detail-image-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 10px;
  background: #1a1a1a;
  padding: 10px;
  border-radius: 8px;
}

.detail-thumb {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.detail-label {
  flex: 1;
  font-size: 0.78em;
  color: #888;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.toggle-field {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 0.92em;
  color: #ccc;
}

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
