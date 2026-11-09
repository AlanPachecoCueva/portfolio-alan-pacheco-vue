<template>
  <form class="admin-form" @submit.prevent="handleSubmit">
    <section class="form-section">
      <h2 class="section-title">Información básica</h2>
      <div class="field-row">
        <div class="field">
          <label for="tm-name">Nombre completo *</label>
          <input id="tm-name" v-model="form.name" required maxlength="80" placeholder="Alan Pacheco Cueva" @input="syncSlug" />
        </div>
        <div class="field">
          <label for="tm-slug">Slug (URL) *</label>
          <input id="tm-slug" v-model="form.slug" required maxlength="80" placeholder="alan-pacheco" @input="slugTouched = true" />
          <span class="field-hint">thecodesolutions.com/equipo/{{ form.slug || '…' }}</span>
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="tm-role-es">Rol (español) *</label>
          <input id="tm-role-es" v-model="form.role_es" required maxlength="80" placeholder="Fundador y líder técnico" />
        </div>
        <div class="field">
          <label for="tm-role-en">Role (English) *</label>
          <input id="tm-role-en" v-model="form.role_en" required maxlength="80" placeholder="Founder & Tech Lead" />
        </div>
      </div>
    </section>

    <section class="form-section">
      <h2 class="section-title">Biografía</h2>
      <div class="field">
        <label for="tm-bio-es">Bio en español *</label>
        <textarea id="tm-bio-es" v-model="form.bio_es" required rows="4" maxlength="1200" />
      </div>
      <div class="field">
        <label for="tm-bio-en">Bio in English *</label>
        <textarea id="tm-bio-en" v-model="form.bio_en" required rows="4" maxlength="1200" />
      </div>
    </section>

    <section class="form-section">
      <h2 class="section-title">Foto</h2>
      <ImageSelector :single="true" :current-url="form.photoUrl" @pick="onPhotoPick" @remove="clearPhoto" />
    </section>

    <section class="form-section">
      <h2 class="section-title">Tecnologías y enlaces</h2>
      <div class="field">
        <label>Tecnologías</label>
        <TagsInput v-model="form.skills" placeholder="Vue.js, C#, Python…" />
      </div>
      <div class="field-row">
        <div class="field"><label for="tm-linkedin">LinkedIn</label><input id="tm-linkedin" v-model="form.links.linkedin" type="url" placeholder="https://linkedin.com/in/…" /></div>
        <div class="field"><label for="tm-github">GitHub</label><input id="tm-github" v-model="form.links.github" type="url" placeholder="https://github.com/…" /></div>
      </div>
      <div class="field"><label for="tm-web">Sitio web</label><input id="tm-web" v-model="form.links.web" type="url" placeholder="https://…" /></div>
      <div class="field-row">
        <div class="field">
          <label for="tm-cv-es">CV en español</label>
          <input id="tm-cv-es" v-model="form.cvUrl_es" placeholder="/CV-Alan Pacheco-ESP.pdf" />
        </div>
        <div class="field">
          <label for="tm-cv-en">CV in English</label>
          <input id="tm-cv-en" v-model="form.cvUrl_en" placeholder="/CV-Alan Pacheco-ENG.pdf" />
        </div>
      </div>
      <span class="field-hint">Enlaces: solo https://. CV: ruta del sitio (empieza con /) o https://.</span>
    </section>

    <section class="form-section">
      <div class="field-row">
        <div class="field field--sm"><label for="tm-order">Orden</label><input id="tm-order" v-model.number="form.order" type="number" placeholder="—" /></div>
      </div>
      <label class="toggle-field">
        <input v-model="form.showGallery" type="checkbox" />
        <span>Mostrar la pestaña Galería en su perfil</span>
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
      <NuxtLink :to="{ name: 'admin-team' }" class="btn-cancel-link">Cancelar</NuxtLink>
    </div>
  </form>
</template>

<script>
import TagsInput from '~/components/admin/Tags_Input.vue'
import ImageSelector from '~/components/admin/Image_Selector.vue'
import { slugify, isValidSlug } from '~/utils/slug.js'

const EMPTY = {
  name: '', slug: '', role_es: '', role_en: '', bio_es: '', bio_en: '',
  photoImageId: '', photoUrl: '', skills: [],
  links: { linkedin: '', github: '', web: '' },
  cvUrl_es: '', cvUrl_en: '', showGallery: false, order: null, published: false,
}

// Se pintan como href en páginas públicas: solo https evita javascript:/data: (XSS)
const isHttps = (url) => !url || /^https:\/\/[^\s]+$/i.test(url)
const isSitePathOrHttps = (url) => !url || /^\/[^\s/][^\s]*$/.test(url) || isHttps(url)

export default {
  name: 'Team_Member_Form',
  components: { TagsInput, ImageSelector },
  props: {
    initial: { type: Object, default: null },
    takenSlugs: { type: Array, default: () => [] },
    saving: { type: Boolean, default: false },
    submitLabel: { type: String, default: 'Guardar' },
  },
  emits: ['submit'],
  data() {
    const base = JSON.parse(JSON.stringify(EMPTY))
    const initial = this.initial ? JSON.parse(JSON.stringify(this.initial)) : null
    return {
      form: initial ? { ...base, ...initial, links: { ...base.links, ...(initial.links || {}) } } : base,
      slugTouched: !!initial?.slug,
      error: '',
    }
  },
  methods: {
    syncSlug() {
      if (!this.slugTouched) this.form.slug = slugify(this.form.name)
    },
    onPhotoPick({ id, url }) { this.form.photoImageId = id; this.form.photoUrl = url },
    clearPhoto() { this.form.photoImageId = ''; this.form.photoUrl = '' },
    handleSubmit() {
      this.error = ''
      const slug = slugify(this.form.slug)
      if (!isValidSlug(slug)) {
        this.error = 'El slug solo puede tener minúsculas, números y guiones.'
        return
      }
      if (this.takenSlugs.includes(slug)) {
        this.error = `Ya existe un miembro con el slug "${slug}".`
        return
      }
      const links = {
        linkedin: this.form.links.linkedin.trim(),
        github: this.form.links.github.trim(),
        web: this.form.links.web.trim(),
      }
      if (!Object.values(links).every(isHttps)) {
        this.error = 'Los enlaces deben empezar con https://'
        return
      }
      const cvUrl_es = this.form.cvUrl_es.trim()
      const cvUrl_en = this.form.cvUrl_en.trim()
      if (!isSitePathOrHttps(cvUrl_es) || !isSitePathOrHttps(cvUrl_en)) {
        this.error = 'El CV debe ser una ruta del sitio (/archivo.pdf) o un enlace https://'
        return
      }
      this.$emit('submit', {
        slug,
        name: this.form.name.trim(),
        role_es: this.form.role_es.trim(),
        role_en: this.form.role_en.trim(),
        bio_es: this.form.bio_es.trim(),
        bio_en: this.form.bio_en.trim(),
        photoImageId: this.form.photoImageId,
        photoUrl: this.form.photoUrl,
        skills: this.form.skills,
        links,
        cvUrl_es,
        cvUrl_en,
        showGallery: this.form.showGallery,
        order: this.form.order === '' || this.form.order == null ? null : this.form.order,
        published: this.form.published,
      })
    },
  },
}
</script>

<style scoped>
@import '~/assets/admin.css';
</style>
