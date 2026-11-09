<template>
  <form class="admin-form" @submit.prevent="handleSubmit">
    <section class="form-section">
      <h2 class="section-title">Información básica</h2>
      <div class="field-row">
        <div class="field">
          <label for="pr-title">Título (español) *</label>
          <input id="pr-title" v-model="form.title" required maxlength="80" placeholder="Nombre del proyecto" @input="syncSlug" />
        </div>
        <div class="field">
          <label for="pr-title-en">Title (English) *</label>
          <input id="pr-title-en" v-model="form.title_en" required maxlength="80" placeholder="Project name" />
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="pr-slug">Slug (URL) *</label>
          <input id="pr-slug" v-model="form.slug" required maxlength="80" placeholder="kvmi" @input="slugTouched = true" />
          <span class="field-hint">thecodesolutions.com/proyectos/{{ form.slug || '…' }}</span>
        </div>
        <div class="field">
          <label for="pr-client">Cliente</label>
          <input id="pr-client" v-model="form.client" maxlength="80" placeholder="Nombre del cliente (opcional)" />
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="pr-category">Categoría (sitio actual) *</label>
          <select id="pr-category" v-model="form.category" required>
            <option value="web">Web</option>
            <option value="ai">IA</option>
            <option value="mobile">Mobile</option>
            <option value="other">Otro</option>
          </select>
        </div>
        <div class="field">
          <label for="pr-date">Fecha</label>
          <input id="pr-date" v-model="form.dateStr" type="date" />
        </div>
      </div>
      <div class="field">
        <label for="pr-url">URL del proyecto (opcional)</label>
        <input id="pr-url" v-model="form.url" type="url" placeholder="https://..." />
      </div>
    </section>

    <section class="form-section">
      <h2 class="section-title">Servicios y equipo</h2>
      <div class="field">
        <label>Servicios relacionados</label>
        <div v-if="services.length" class="check-list">
          <label v-for="s in services" :key="s.id" class="toggle-field">
            <input v-model="form.serviceIds" type="checkbox" :value="s.id" />
            <span>{{ s.title_es }}</span>
          </label>
        </div>
        <span v-else class="field-hint">Todavía no hay servicios. Créalos en Servicios.</span>
      </div>
      <div class="field">
        <label>Equipo que participó</label>
        <div v-if="members.length" class="check-list">
          <label v-for="m in members" :key="m.id" class="toggle-field">
            <input v-model="form.teamMemberIds" type="checkbox" :value="m.id" />
            <span>{{ m.name }}</span>
          </label>
        </div>
        <span v-else class="field-hint">Todavía no hay miembros. Créalos en Equipo.</span>
      </div>
    </section>

    <section class="form-section">
      <h2 class="section-title">Descripción corta</h2>
      <div class="field">
        <label for="pr-desc-es">Descripción en español *</label>
        <textarea id="pr-desc-es" v-model="form.description_es" required rows="3" placeholder="Describe el proyecto en español..." />
      </div>
      <div class="field">
        <label for="pr-desc-en">Descripción en inglés *</label>
        <textarea id="pr-desc-en" v-model="form.description_en" required rows="3" placeholder="Describe the project in English..." />
      </div>
    </section>

    <section class="form-section">
      <h2 class="section-title">Caso de éxito (opcional)</h2>
      <div class="field-row">
        <div class="field"><label for="pr-ch-es">El reto (ES)</label><textarea id="pr-ch-es" v-model="form.challenge_es" rows="3" placeholder="¿Qué problema tenía el cliente?" /></div>
        <div class="field"><label for="pr-ch-en">The challenge (EN)</label><textarea id="pr-ch-en" v-model="form.challenge_en" rows="3" /></div>
      </div>
      <div class="field-row">
        <div class="field"><label for="pr-so-es">La solución (ES)</label><textarea id="pr-so-es" v-model="form.solution_es" rows="3" placeholder="¿Qué construimos?" /></div>
        <div class="field"><label for="pr-so-en">The solution (EN)</label><textarea id="pr-so-en" v-model="form.solution_en" rows="3" /></div>
      </div>
      <div class="field-row">
        <div class="field"><label for="pr-re-es">El resultado (ES)</label><textarea id="pr-re-es" v-model="form.result_es" rows="3" placeholder="¿Qué cambió? Datos concretos si los hay" /></div>
        <div class="field"><label for="pr-re-en">The result (EN)</label><textarea id="pr-re-en" v-model="form.result_en" rows="3" /></div>
      </div>
    </section>

    <section class="form-section">
      <h2 class="section-title">Tecnologías</h2>
      <div class="field">
        <label for="pr-tech">Tecnología principal *</label>
        <input id="pr-tech" v-model="form.technology" required placeholder="Vue, React, Python..." />
      </div>
      <div class="field">
        <label>Tecnologías relacionadas</label>
        <TagsInput v-model="form.relatedTechnologies" placeholder="Agregar tecnología y presionar Enter" />
      </div>
    </section>

    <section class="form-section">
      <h2 class="section-title">Imagen de portada (thumbnail)</h2>
      <ImageSelector :single="true" :current-url="form.thumbnailUrl" @pick="onThumbnailPick" @remove="clearThumbnail" />
    </section>

    <section class="form-section">
      <h2 class="section-title">Imágenes de detalle</h2>
      <div v-for="(img, i) in form.imageUrls" :key="i" class="detail-image-row">
        <img :src="img.url" class="detail-thumb" alt="" />
        <div class="detail-controls">
          <div class="field-row">
            <div class="field field--sm"><label :for="`pr-img-c-${i}`">Columnas</label><input :id="`pr-img-c-${i}`" v-model.number="img.columns" type="number" min="1" max="4" /></div>
            <div class="field field--sm"><label :for="`pr-img-r-${i}`">Filas</label><input :id="`pr-img-r-${i}`" v-model.number="img.rows" type="number" min="1" max="4" /></div>
          </div>
        </div>
        <button type="button" class="btn-remove-img" @click="removeDetailImage(i)">✕</button>
      </div>
      <ImageSelector :single="false" @pick="onDetailPick" />
    </section>

    <section class="form-section">
      <h2 class="section-title">Tamaño y orden</h2>
      <div class="field-row">
        <div class="field field--sm"><label for="pr-cols">Columnas *</label><input id="pr-cols" v-model.number="form.columns" type="number" min="1" max="4" required /></div>
        <div class="field field--sm"><label for="pr-rows">Filas *</label><input id="pr-rows" v-model.number="form.rows" type="number" min="1" max="4" required /></div>
        <div class="field field--sm"><label for="pr-order">Orden</label><input id="pr-order" v-model.number="form.order" type="number" placeholder="—" /></div>
      </div>
      <label class="toggle-field">
        <input v-model="form.featured" type="checkbox" />
        <span>Destacado en la home</span>
      </label>
      <label class="toggle-field" style="margin-top: 12px">
        <input v-model="form.published" type="checkbox" />
        <span>Publicado (visible en el sitio)</span>
      </label>
    </section>

    <p v-if="error" class="form-error" role="alert">{{ error }}</p>

    <div class="form-actions">
      <button type="submit" class="btn-primary" :disabled="saving">
        {{ saving ? 'Guardando...' : submitLabel }}
      </button>
      <NuxtLink :to="{ name: 'admin-projects' }" class="btn-cancel-link">Cancelar</NuxtLink>
    </div>
  </form>
</template>

<script>
import TagsInput from '~/components/admin/Tags_Input.vue'
import ImageSelector from '~/components/admin/Image_Selector.vue'
import { slugify, isValidSlug } from '~/utils/slug.js'
import { Timestamp } from 'firebase/firestore'

const EMPTY = {
  title: '', title_en: '', slug: '', client: '', category: 'web',
  dateStr: new Date().toISOString().split('T')[0], url: '',
  serviceIds: [], teamMemberIds: [],
  description_es: '', description_en: '',
  challenge_es: '', challenge_en: '', solution_es: '', solution_en: '', result_es: '', result_en: '',
  technology: '', relatedTechnologies: [],
  thumbnailImageId: '', thumbnailUrl: '', imageIds: [], imageUrls: [],
  columns: 1, rows: 1, order: null, featured: false, published: false,
}

// La URL se pinta como href en la página pública: solo http(s) (evita javascript:)
const isWebUrl = (url) => !url || /^https?:\/\/[^\s]+$/i.test(url)

export default {
  name: 'Project_Form',
  components: { TagsInput, ImageSelector },
  props: {
    initial: { type: Object, default: null },
    takenSlugs: { type: Array, default: () => [] },
    services: { type: Array, default: () => [] },
    members: { type: Array, default: () => [] },
    saving: { type: Boolean, default: false },
    submitLabel: { type: String, default: 'Guardar' },
  },
  emits: ['submit'],
  data() {
    const base = JSON.parse(JSON.stringify(EMPTY))
    let form = base
    if (this.initial) {
      const date = this.initial.date?.toDate?.() ?? new Date()
      // Copia sin Timestamps (no sobreviven a JSON) y con valores por defecto para documentos antiguos
      const rest = { ...this.initial }
      delete rest.date
      delete rest.createdAt
      delete rest.id
      form = { ...base, ...JSON.parse(JSON.stringify(rest)), dateStr: date.toISOString().split('T')[0] }
      form.url = form.url ?? ''
      form.order = form.order ?? null
    }
    return {
      form,
      // Proyectos antiguos no tienen slug: se propone uno a partir del título
      slugTouched: !!this.initial?.slug,
      error: '',
    }
  },
  created() {
    if (!this.form.slug) this.form.slug = slugify(this.form.title)
  },
  methods: {
    syncSlug() {
      if (!this.slugTouched) this.form.slug = slugify(this.form.title)
    },
    clearThumbnail() { this.form.thumbnailImageId = ''; this.form.thumbnailUrl = '' },
    removeDetailImage(i) { this.form.imageIds.splice(i, 1); this.form.imageUrls.splice(i, 1) },
    onThumbnailPick({ id, url }) { this.form.thumbnailImageId = id; this.form.thumbnailUrl = url },
    onDetailPick({ id, url }) {
      if (!this.form.imageIds.includes(id)) {
        this.form.imageIds.push(id)
        this.form.imageUrls.push({ url, columns: 1, rows: 1 })
      }
    },
    handleSubmit() {
      this.error = ''
      const slug = slugify(this.form.slug)
      if (!isValidSlug(slug)) {
        this.error = 'El slug solo puede tener minúsculas, números y guiones.'
        return
      }
      if (this.takenSlugs.includes(slug)) {
        this.error = `Ya existe un proyecto con el slug "${slug}".`
        return
      }
      const url = this.form.url.trim()
      if (!isWebUrl(url)) {
        this.error = 'La URL del proyecto debe empezar con https:// o http://'
        return
      }
      const f = this.form
      this.$emit('submit', {
        title: f.title.trim(),
        title_en: f.title_en.trim(),
        slug,
        client: f.client.trim(),
        category: f.category,
        date: f.dateStr ? Timestamp.fromDate(new Date(f.dateStr)) : Timestamp.now(),
        url: url || null,
        serviceIds: f.serviceIds,
        teamMemberIds: f.teamMemberIds,
        description_es: f.description_es.trim(),
        description_en: f.description_en.trim(),
        challenge_es: f.challenge_es.trim(),
        challenge_en: f.challenge_en.trim(),
        solution_es: f.solution_es.trim(),
        solution_en: f.solution_en.trim(),
        result_es: f.result_es.trim(),
        result_en: f.result_en.trim(),
        technology: f.technology.trim(),
        relatedTechnologies: f.relatedTechnologies,
        thumbnailImageId: f.thumbnailImageId,
        thumbnailUrl: f.thumbnailUrl,
        imageIds: f.imageIds,
        imageUrls: f.imageUrls,
        columns: f.columns,
        rows: f.rows,
        order: f.order === '' || f.order == null ? null : f.order,
        featured: f.featured,
        published: f.published,
      })
    },
  },
}
</script>

<style scoped>
@import '~/assets/admin.css';
</style>
