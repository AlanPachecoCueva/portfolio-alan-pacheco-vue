<template>
  <form class="admin-form" @submit.prevent="handleSubmit">
    <section class="form-section">
      <h2 class="section-title">Información básica</h2>
      <div class="field-row">
        <div class="field">
          <label for="ac-title">Título (español) *</label>
          <input id="ac-title" v-model="form.title" required maxlength="120" placeholder="Nombre del logro" @input="syncSlug" />
        </div>
        <div class="field">
          <label for="ac-title-en">Title (English) *</label>
          <input id="ac-title-en" v-model="form.title_en" required maxlength="120" placeholder="Achievement name" />
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="ac-slug">Slug (URL) *</label>
          <input id="ac-slug" v-model="form.slug" required maxlength="80" @input="slugTouched = true" />
          <span class="field-hint">thecodesolutions.com/certificaciones/{{ form.slug || '…' }}</span>
        </div>
        <div class="field">
          <label for="ac-member">Obtenido por</label>
          <select id="ac-member" v-model="form.teamMemberId">
            <option value="">TheCodeSolutions (logro de la empresa)</option>
            <option v-for="m in members" :key="m.id" :value="m.id">{{ m.name }}</option>
          </select>
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="ac-type">Tipo *</label>
          <select id="ac-type" v-model="form.type" required>
            <option value="award">Premio</option>
            <option value="certification">Certificación</option>
            <option value="competition">Competencia</option>
            <option value="academic">Académico</option>
            <option value="work">Laboral</option>
          </select>
        </div>
        <div class="field"><label for="ac-issuer">Institución / Emisor *</label><input id="ac-issuer" v-model="form.issuer" required maxlength="120" placeholder="UDLA, Ingennials..." /></div>
        <div class="field"><label for="ac-date">Fecha</label><input id="ac-date" v-model="form.dateStr" type="date" /></div>
      </div>
      <div class="field"><label for="ac-link">URL del certificado (opcional)</label><input id="ac-link" v-model="form.link" type="url" placeholder="https://..." /></div>
    </section>

    <section class="form-section">
      <h2 class="section-title">Descripción</h2>
      <div class="field"><label for="ac-desc-es">Descripción en español *</label><textarea id="ac-desc-es" v-model="form.description_es" required rows="3" placeholder="Describe el logro en español..." /></div>
      <div class="field"><label for="ac-desc-en">Descripción en inglés *</label><textarea id="ac-desc-en" v-model="form.description_en" required rows="3" placeholder="Describe the achievement in English..." /></div>
    </section>

    <section class="form-section">
      <h2 class="section-title">Imagen de portada (thumbnail)</h2>
      <ImageSelector :single="true" :current-url="form.thumbnailUrl" @pick="onThumbnailPick" @remove="clearThumbnail" />
    </section>

    <section class="form-section">
      <h2 class="section-title">Imágenes relacionadas</h2>
      <div v-for="(img, i) in form.imageUrls" :key="i" class="detail-image-row">
        <img :src="img.url" class="detail-thumb" alt="" />
        <div class="detail-controls">{{ img.url.split('/').pop().substring(0, 30) }}</div>
        <button type="button" class="btn-remove-img" @click="removeDetailImage(i)">✕</button>
      </div>
      <ImageSelector :single="false" @pick="onDetailPick" />
    </section>

    <section class="form-section">
      <div class="field field--sm"><label for="ac-order">Orden</label><input id="ac-order" v-model.number="form.order" type="number" placeholder="—" /></div>
      <label class="toggle-field">
        <input v-model="form.published" type="checkbox" />
        <span>Publicado (visible en el sitio)</span>
      </label>
    </section>

    <p v-if="error" class="form-error" role="alert">{{ error }}</p>

    <div class="form-actions">
      <button type="submit" class="btn-primary" :disabled="saving">
        {{ saving ? 'Guardando...' : submitLabel }}
      </button>
      <NuxtLink :to="{ name: 'admin-achievements' }" class="btn-cancel-link">Cancelar</NuxtLink>
    </div>
  </form>
</template>

<script>
import ImageSelector from '~/components/admin/Image_Selector.vue'
import { slugify, isValidSlug } from '~/utils/slug.js'
import { Timestamp } from 'firebase/firestore'

const EMPTY = {
  title: '', title_en: '', slug: '', teamMemberId: '',
  type: 'award', issuer: '', dateStr: new Date().toISOString().split('T')[0], link: '',
  description_es: '', description_en: '',
  thumbnailImageId: '', thumbnailUrl: '', imageIds: [], imageUrls: [],
  order: null, published: false,
}

// El enlace se pinta como href en la página pública: solo http(s) (evita javascript:)
const isWebUrl = (url) => !url || /^https?:\/\/[^\s]+$/i.test(url)

export default {
  name: 'Achievement_Form',
  components: { ImageSelector },
  props: {
    initial: { type: Object, default: null },
    takenSlugs: { type: Array, default: () => [] },
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
      const rest = { ...this.initial }
      delete rest.date
      delete rest.createdAt
      delete rest.id
      form = { ...base, ...JSON.parse(JSON.stringify(rest)), dateStr: date.toISOString().split('T')[0] }
      form.link = form.link ?? ''
      form.teamMemberId = form.teamMemberId ?? ''
      form.order = form.order ?? null
    }
    return {
      form,
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
      if (!this.form.imageIds.includes(id)) { this.form.imageIds.push(id); this.form.imageUrls.push({ url }) }
    },
    handleSubmit() {
      this.error = ''
      const slug = slugify(this.form.slug)
      if (!isValidSlug(slug)) {
        this.error = 'El slug solo puede tener minúsculas, números y guiones.'
        return
      }
      if (this.takenSlugs.includes(slug)) {
        this.error = `Ya existe un logro con el slug "${slug}".`
        return
      }
      const link = this.form.link.trim()
      if (!isWebUrl(link)) {
        this.error = 'La URL del certificado debe empezar con https:// o http://'
        return
      }
      const f = this.form
      this.$emit('submit', {
        title: f.title.trim(),
        title_en: f.title_en.trim(),
        slug,
        teamMemberId: f.teamMemberId || null,
        type: f.type,
        issuer: f.issuer.trim(),
        date: f.dateStr ? Timestamp.fromDate(new Date(f.dateStr)) : Timestamp.now(),
        link: link || null,
        description_es: f.description_es.trim(),
        description_en: f.description_en.trim(),
        thumbnailImageId: f.thumbnailImageId,
        thumbnailUrl: f.thumbnailUrl,
        imageIds: f.imageIds,
        imageUrls: f.imageUrls,
        order: f.order === '' || f.order == null ? null : f.order,
        published: f.published,
      })
    },
  },
}
</script>

<style scoped>
@import '~/assets/admin.css';
</style>
