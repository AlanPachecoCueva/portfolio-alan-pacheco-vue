<template>
  <form class="admin-form" @submit.prevent="handleSubmit">
    <section class="form-section">
      <h2 class="section-title">Información básica</h2>
      <div class="field-row">
        <div class="field">
          <label for="svc-title-es">Nombre (español) *</label>
          <input id="svc-title-es" v-model="form.title_es" required maxlength="80" placeholder="Desarrollo web" @input="syncSlug" />
        </div>
        <div class="field">
          <label for="svc-title-en">Name (English) *</label>
          <input id="svc-title-en" v-model="form.title_en" required maxlength="80" placeholder="Web development" />
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="svc-slug">Slug (URL) *</label>
          <input id="svc-slug" v-model="form.slug" required maxlength="80" placeholder="desarrollo-web" @input="slugTouched = true" />
          <span class="field-hint">thecodesolutions.com/servicios/{{ form.slug || '…' }}</span>
        </div>
        <div class="field">
          <label for="svc-icon">Ícono</label>
          <select id="svc-icon" v-model="form.icon">
            <option v-for="opt in iconOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>
      </div>
    </section>

    <section class="form-section">
      <h2 class="section-title">Textos</h2>
      <div class="field">
        <label for="svc-summary-es">Resumen en español * <span class="field-hint">(tarjeta de la home, máx. 160)</span></label>
        <textarea id="svc-summary-es" v-model="form.summary_es" required maxlength="160" rows="2" />
      </div>
      <div class="field">
        <label for="svc-summary-en">Summary in English *</label>
        <textarea id="svc-summary-en" v-model="form.summary_en" required maxlength="160" rows="2" />
      </div>
      <div class="field">
        <label for="svc-body-es">Descripción larga en español <span class="field-hint">(página del servicio)</span></label>
        <textarea id="svc-body-es" v-model="form.body_es" rows="5" />
      </div>
      <div class="field">
        <label for="svc-body-en">Long description in English</label>
        <textarea id="svc-body-en" v-model="form.body_en" rows="5" />
      </div>
    </section>

    <section class="form-section">
      <h2 class="section-title">Qué incluye y tecnologías</h2>
      <div class="field">
        <label>Qué incluye (español)</label>
        <TagsInput v-model="form.includes_es" placeholder="Diseño adaptado a móvil… y Enter" />
      </div>
      <div class="field">
        <label>What's included (English)</label>
        <TagsInput v-model="form.includes_en" placeholder="Responsive design… and Enter" />
      </div>
      <div class="field">
        <label>Tecnologías</label>
        <TagsInput v-model="form.technologies" placeholder="Vue.js, Nuxt, Firebase…" />
      </div>
    </section>

    <section class="form-section">
      <h2 class="section-title">Preguntas frecuentes</h2>
      <div v-for="(faq, i) in form.faqs" :key="i" class="repeat-row">
        <div class="repeat-fields">
          <div class="field-row">
            <div class="field"><label :for="`faq-q-es-${i}`">Pregunta (ES)</label><input :id="`faq-q-es-${i}`" v-model="faq.q_es" maxlength="160" /></div>
            <div class="field"><label :for="`faq-q-en-${i}`">Question (EN)</label><input :id="`faq-q-en-${i}`" v-model="faq.q_en" maxlength="160" /></div>
          </div>
          <div class="field-row">
            <div class="field"><label :for="`faq-a-es-${i}`">Respuesta (ES)</label><textarea :id="`faq-a-es-${i}`" v-model="faq.a_es" rows="2" maxlength="800" /></div>
            <div class="field"><label :for="`faq-a-en-${i}`">Answer (EN)</label><textarea :id="`faq-a-en-${i}`" v-model="faq.a_en" rows="2" maxlength="800" /></div>
          </div>
        </div>
        <button type="button" class="btn-delete" @click="form.faqs.splice(i, 1)">Quitar</button>
      </div>
      <button type="button" class="btn-add-row" @click="form.faqs.push({ q_es: '', a_es: '', q_en: '', a_en: '' })">+ Agregar pregunta</button>
    </section>

    <section class="form-section">
      <div class="field-row">
        <div class="field field--sm"><label for="svc-order">Orden</label><input id="svc-order" v-model.number="form.order" type="number" placeholder="—" /></div>
      </div>
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
      <NuxtLink :to="{ name: 'admin-services' }" class="btn-cancel-link">Cancelar</NuxtLink>
    </div>
  </form>
</template>

<script>
import TagsInput from '~/components/admin/Tags_Input.vue'
import { slugify, isValidSlug } from '~/utils/slug.js'

const EMPTY = {
  title_es: '', title_en: '', slug: '', icon: 'web',
  summary_es: '', summary_en: '', body_es: '', body_en: '',
  includes_es: [], includes_en: [], technologies: [], faqs: [],
  order: null, published: false,
}

export default {
  name: 'Service_Form',
  components: { TagsInput },
  props: {
    initial: { type: Object, default: null },
    // Slugs de los demás servicios, para evitar duplicados
    takenSlugs: { type: Array, default: () => [] },
    saving: { type: Boolean, default: false },
    submitLabel: { type: String, default: 'Guardar' },
  },
  emits: ['submit'],
  data() {
    const base = JSON.parse(JSON.stringify(EMPTY))
    return {
      form: this.initial ? { ...base, ...JSON.parse(JSON.stringify(this.initial)) } : base,
      // En edición el slug ya existe: no se regenera al cambiar el título
      slugTouched: !!this.initial?.slug,
      error: '',
      iconOptions: [
        { value: 'web', label: 'Monitor (web)' },
        { value: 'mobile', label: 'Teléfono (móvil)' },
        { value: 'ai', label: 'Chip (IA)' },
        { value: 'systems', label: 'Capas (sistemas)' },
        { value: 'consulting', label: 'Conversación (consultoría)' },
      ],
    }
  },
  methods: {
    syncSlug() {
      if (!this.slugTouched) this.form.slug = slugify(this.form.title_es)
    },
    handleSubmit() {
      this.error = ''
      const slug = slugify(this.form.slug)
      if (!isValidSlug(slug)) {
        this.error = 'El slug solo puede tener minúsculas, números y guiones.'
        return
      }
      if (this.takenSlugs.includes(slug)) {
        this.error = `Ya existe un servicio con el slug "${slug}".`
        return
      }
      const faqs = this.form.faqs
        .map((f) => ({ q_es: f.q_es.trim(), a_es: f.a_es.trim(), q_en: f.q_en.trim(), a_en: f.a_en.trim() }))
        .filter((f) => f.q_es || f.q_en)
      this.$emit('submit', {
        slug,
        title_es: this.form.title_es.trim(),
        title_en: this.form.title_en.trim(),
        summary_es: this.form.summary_es.trim(),
        summary_en: this.form.summary_en.trim(),
        body_es: this.form.body_es.trim(),
        body_en: this.form.body_en.trim(),
        icon: this.form.icon,
        includes_es: this.form.includes_es,
        includes_en: this.form.includes_en,
        technologies: this.form.technologies,
        faqs,
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
