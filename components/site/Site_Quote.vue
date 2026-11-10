<template>
  <section id="contacto" class="tcs-container quote" aria-labelledby="contacto-titulo">
    <div class="quote__intro">
      <p class="tcs-eyebrow">{{ $t('site.quote.eyebrow') }}</p>
      <h2 id="contacto-titulo" class="tcs-h2">{{ $t('site.quote.title') }}</h2>
      <p class="tcs-lead">{{ $t('site.quote.text') }}</p>
      <dl class="quote__contact">
        <div>
          <dt>{{ $t('site.quote.whatsapp') }}</dt>
          <dd><a :href="contact.whatsappUrl" target="_blank" rel="noopener noreferrer">{{ contact.phoneDisplay }}</a></dd>
        </div>
        <div>
          <dt>{{ $t('site.quote.email') }}</dt>
          <dd><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></dd>
        </div>
        <div>
          <dt>{{ $t('site.quote.location') }}</dt>
          <dd>{{ $t('site.quote.locationValue') }}</dd>
        </div>
      </dl>
    </div>

    <form class="quote__form" :aria-label="$t('site.quote.form.label')" novalidate @submit.prevent="submit">
      <div class="field">
        <label for="q-name">{{ $t('site.quote.form.name') }}</label>
        <input id="q-name" v-model="form.name" type="text" autocomplete="name" maxlength="120" :placeholder="$t('site.quote.form.namePlaceholder')" :aria-invalid="!!errors.name" aria-describedby="q-name-err" />
        <span id="q-name-err" class="field__error">{{ errors.name }}</span>
      </div>
      <div class="field">
        <label for="q-company">{{ $t('site.quote.form.company') }} <span class="field__optional">{{ $t('site.quote.form.optional') }}</span></label>
        <input id="q-company" v-model="form.company" type="text" autocomplete="organization" maxlength="120" :placeholder="$t('site.quote.form.companyPlaceholder')" />
      </div>
      <div class="field">
        <label for="q-email">{{ $t('site.quote.form.email') }}</label>
        <input id="q-email" v-model="form.email" type="email" autocomplete="email" maxlength="254" :placeholder="$t('site.quote.form.emailPlaceholder')" :aria-invalid="!!errors.email" aria-describedby="q-email-err" />
        <span id="q-email-err" class="field__error">{{ errors.email }}</span>
      </div>
      <div class="field">
        <label for="q-phone">{{ $t('site.quote.form.phone') }}</label>
        <input id="q-phone" v-model="form.phone" type="tel" autocomplete="tel" maxlength="40" :placeholder="$t('site.quote.form.phonePlaceholder')" />
      </div>
      <div class="field">
        <label for="q-service">{{ $t('site.quote.form.service') }}</label>
        <select id="q-service" v-model="form.service">
          <option v-for="s in serviceOptions" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
      <div class="field">
        <label for="q-timeline">{{ $t('site.quote.form.timeline') }}</label>
        <select id="q-timeline" v-model="form.timeline">
          <option v-for="(label, key) in timelines" :key="key" :value="key">{{ label }}</option>
        </select>
      </div>
      <div class="field field--wide">
        <label for="q-budget">{{ $t('site.quote.form.budget') }}</label>
        <select id="q-budget" v-model="form.budget">
          <option v-for="(label, key) in budgets" :key="key" :value="key">{{ label }}</option>
        </select>
      </div>
      <div class="field field--wide">
        <label for="q-message">{{ $t('site.quote.form.message') }}</label>
        <textarea id="q-message" v-model="form.message" rows="5" maxlength="5000" :placeholder="$t('site.quote.form.messagePlaceholder')" :aria-invalid="!!errors.message" aria-describedby="q-message-err"></textarea>
        <span id="q-message-err" class="field__error">{{ errors.message }}</span>
      </div>

      <!-- Trampa para bots: invisible para personas; si llega con texto, no se envía nada -->
      <div class="quote__trap" aria-hidden="true">
        <label for="q-website">Website</label>
        <input id="q-website" v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
      </div>

      <div class="field field--wide">
        <label class="field__check">
          <input v-model="form.consent" type="checkbox" aria-describedby="q-consent-err" />
          <span>{{ $t('site.quote.form.consent') }}</span>
        </label>
        <span id="q-consent-err" class="field__error">{{ errors.consent }}</span>
      </div>

      <div class="field--wide quote__actions">
        <button type="submit" class="tcs-btn tcs-btn--primary tcs-btn--lg" :disabled="sending">
          {{ sending ? $t('site.quote.form.sending') : $t('site.quote.form.submit') }}
        </button>
        <p v-if="status" role="status" class="quote__status" :class="`quote__status--${status}`">
          {{ status === 'ok' ? $t('site.quote.form.success') : $t('site.quote.form.error') }}
        </p>
      </div>
    </form>
  </section>
</template>

<script>
import { localized } from '~/utils/localized.js'
import { CONTACT } from '~/utils/site-contact.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emptyForm = () => ({
  name: '', company: '', email: '', phone: '', service: '', budget: 'unknown',
  timeline: 'flexible', message: '', consent: false, website: '',
})

export default {
  name: 'Site_Quote',
  props: {
    services: { type: Array, default: () => [] },
  },
  data() {
    return {
      contact: CONTACT,
      form: emptyForm(),
      errors: {},
      sending: false,
      status: '',
    }
  },
  computed: {
    serviceOptions() {
      return [
        ...this.services.map((s) => localized(s, 'title', this.$i18n.locale)),
        this.$t('site.quote.form.serviceUnknown'),
      ]
    },
    // $tm devuelve mensajes compilados; $rt los convierte en texto
    budgets() {
      return this.plainMessages('site.quote.budgets')
    },
    timelines() {
      return this.plainMessages('site.quote.timelines')
    },
  },
  watch: {
    serviceOptions: {
      immediate: true,
      handler(options) {
        if (!options.includes(this.form.service)) this.form.service = options[0] || ''
      },
    },
  },
  methods: {
    plainMessages(key) {
      return Object.fromEntries(Object.entries(this.$tm(key)).map(([k, v]) => [k, this.$rt(v)]))
    },
    validate() {
      const t = (k) => this.$t(`site.quote.form.${k}`)
      const errors = {}
      if (!this.form.name.trim()) errors.name = t('required')
      if (!this.form.email.trim()) errors.email = t('required')
      else if (!EMAIL_RE.test(this.form.email.trim())) errors.email = t('invalidEmail')
      if (!this.form.message.trim()) errors.message = t('required')
      if (!this.form.consent) errors.consent = t('consentRequired')
      this.errors = errors
      return Object.keys(errors).length === 0
    },
    async submit() {
      this.status = ''
      if (!this.validate()) return
      // Bot: se finge éxito sin enviar nada
      if (this.form.website) {
        this.status = 'ok'
        return
      }
      this.sending = true
      const budget = this.budgets[this.form.budget]
      const timeline = this.timelines[this.form.timeline]
      const details = [
        ...(this.form.company ? [`Empresa: ${this.form.company}`] : []),
        `Servicio: ${this.form.service}`,
        `Presupuesto: ${budget}`,
        `Plazo: ${timeline}`,
      ]
      const lead = {
        name: this.form.name, company: this.form.company, email: this.form.email,
        phone: this.form.phone, service: this.form.service, budget, timeline,
        message: this.form.message, locale: this.$i18n.locale,
      }
      // Firebase y EmailJS se cargan solo al enviar: la home no los descarga al abrirse
      const [saved, mailed] = await Promise.allSettled([
        import('~/utils/firebase/leads.js').then(({ createLead }) => createLead(lead)),
        import('@emailjs/browser').then(({ default: emailjs }) => emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            user_name: lead.name,
            user_email: lead.email,
            user_phone: lead.phone,
            message: [...details, '', lead.message].join('\n'),
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )),
      ])
      if (saved.status === 'rejected') console.error('[Site_Quote] Firestore:', saved.reason)
      if (mailed.status === 'rejected') console.error('[Site_Quote] EmailJS:', mailed.reason)
      this.sending = false
      if (saved.status === 'fulfilled' || mailed.status === 'fulfilled') {
        this.status = 'ok'
        this.form = emptyForm()
        this.form.service = this.serviceOptions[0] || ''
      } else {
        this.status = 'error'
      }
    },
  },
}
</script>

<style scoped>
.quote {
  display: flex;
  flex-wrap: wrap;
  gap: 56px;
}

.quote__intro {
  flex: 1 1 320px;
  min-width: 0;
}

.quote__contact {
  margin: 32px 0 0;
  display: grid;
  gap: 18px;
}

.quote__contact dt {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-tcs-muted));
}

.quote__contact dd {
  margin: 2px 0 0;
  font-size: 17px;
  font-weight: 600;
}

.quote__contact a {
  color: rgb(var(--v-theme-tcs-text));
}

.quote__form {
  flex: 1 1 520px;
  min-width: 0;
  padding: 32px;
  border-radius: 16px;
  background: rgb(var(--v-theme-tcs-surface));
  border: 1px solid rgb(var(--v-theme-tcs-border));
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field--wide {
  grid-column: 1 / -1;
}

.field label {
  font-size: 14px;
  font-weight: 600;
}

.field__optional {
  font-weight: 400;
  color: rgb(var(--v-theme-tcs-muted));
}

.field input,
.field select,
.field textarea {
  min-height: 48px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid rgb(var(--v-theme-tcs-border));
  background: rgb(var(--v-theme-tcs-bg));
  color: rgb(var(--v-theme-tcs-text));
  font: inherit;
}

.field textarea {
  padding: 12px 14px;
  resize: vertical;
}

.field [aria-invalid='true'] {
  border-color: rgb(var(--v-theme-error));
}

.field__error {
  min-height: 1em;
  font-size: 13px;
  color: rgb(var(--v-theme-error));
}

.field__check {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-weight: 400 !important;
  color: rgb(var(--v-theme-tcs-muted));
}

.field__check input {
  min-height: 0;
  width: 18px;
  height: 18px;
  margin-top: 3px;
}

.quote__trap {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.quote__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.quote__status {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

.quote__status--ok {
  color: rgb(var(--v-theme-tcs-secondary));
}

.quote__status--error {
  color: rgb(var(--v-theme-error));
}
</style>
