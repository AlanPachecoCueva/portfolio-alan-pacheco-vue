<template>
  <div>
    <article v-if="service">
      <section class="tcs-container svc__head" aria-labelledby="svc-titulo">
        <nav :aria-label="t('site.project.breadcrumb')" class="crumbs">
          <ol>
            <li><NuxtLink :to="localePath('index')">{{ t('site.service.home') }}</NuxtLink></li>
            <li aria-hidden="true">/</li>
            <li><NuxtLink :to="localePath({ name: 'index', hash: '#servicios' })">{{ t('site.service.services') }}</NuxtLink></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{{ title }}</li>
          </ol>
        </nav>

        <div class="svc__intro">
          <div class="svc__intro-text">
            <span class="svc__icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path :d="serviceIconPath(service.icon)" />
              </svg>
            </span>
            <h1 id="svc-titulo" class="svc__title">{{ title }}</h1>
            <p class="svc__lead">{{ text('summary') }}</p>
            <div class="svc__actions">
              <NuxtLink :to="localePath({ name: 'index', hash: '#contacto' })" class="tcs-btn tcs-btn--primary tcs-btn--lg">{{ t('site.service.cta') }}</NuxtLink>
              <a v-if="related.length" href="#proyectos-relacionados" class="tcs-btn tcs-btn--ghost tcs-btn--lg">{{ t('site.service.ctaSecondary') }}</a>
            </div>
          </div>

          <div v-if="includes.length" class="svc__includes">
            <h2 class="svc__h3">{{ t('site.service.includes') }}</h2>
            <ul>
              <li v-for="item in includes" :key="item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section v-if="text('body') || technologies.length" class="tcs-band" :aria-label="title">
        <div class="tcs-container svc__body">
          <!-- Texto plano con saltos de línea (nunca v-html con datos de Firestore) -->
          <p v-if="text('body')" class="svc__text">{{ text('body') }}</p>
          <div v-if="technologies.length">
            <h2 class="svc__h3">{{ t('site.service.tech') }}</h2>
            <ul class="svc__chips">
              <li v-for="tech in technologies" :key="tech" class="tcs-chip">{{ tech }}</li>
            </ul>
          </div>
        </div>
      </section>

      <section v-if="related.length" id="proyectos-relacionados" class="tcs-container" aria-labelledby="svc-proyectos">
        <h2 id="svc-proyectos" class="tcs-h2">{{ t('site.service.related') }}</h2>
        <ul class="related">
          <li v-for="p in related" :key="p.id">
            <NuxtLink :to="localePath({ name: 'proyectos-slug', params: { slug: p.slug } })" class="related__card">
              <img v-if="p.thumbnailUrl" :src="p.thumbnailUrl" alt="" width="140" height="92" loading="lazy" class="related__img" />
              <span>
                <span class="related__title">{{ localized(p, 'title', locale) }}</span>
                <span class="related__desc">{{ localized(p, 'description', locale) }}</span>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </section>

      <section v-if="faqs.length" class="tcs-band" aria-labelledby="svc-faq">
        <div class="tcs-container faq">
          <h2 id="svc-faq" class="tcs-h2">{{ t('site.service.faq') }}</h2>
          <!-- <details> nativo: accesible sin JS y las respuestas quedan en el HTML (FAQPage) -->
          <div class="faq__list">
            <details v-for="(f, i) in faqs" :key="i" class="faq__item" :open="i === 0">
              <summary class="faq__q">{{ f.q }}</summary>
              <p class="faq__a">{{ f.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <section class="tcs-container svc__cta" aria-labelledby="svc-cta">
        <div>
          <h2 id="svc-cta" class="tcs-h2">{{ t('site.service.ctaTitle') }}</h2>
          <p class="tcs-lead">{{ t('site.service.ctaText') }}</p>
        </div>
        <NuxtLink :to="localePath({ name: 'index', hash: '#contacto' })" class="tcs-btn tcs-btn--primary tcs-btn--lg">{{ t('site.service.cta') }}</NuxtLink>
      </section>

      <section v-if="others.length" class="tcs-band" aria-labelledby="svc-otros">
        <div class="tcs-container svc__others">
          <h2 id="svc-otros" class="svc__h3">{{ t('site.service.others') }}</h2>
          <ul>
            <li v-for="s in others" :key="s.id">
              <NuxtLink :to="localePath({ name: 'servicios-slug', params: { slug: s.slug } })" class="tcs-btn tcs-btn--ghost">
                {{ localized(s, 'title', locale) }} →
              </NuxtLink>
            </li>
          </ul>
        </div>
      </section>
    </article>

    <div v-else class="tcs-container missing">
      <p class="svc__lead">{{ pending ? t('site.service.loading') : t('site.service.notFound') }}</p>
      <NuxtLink v-if="!pending" :to="localePath({ name: 'index', hash: '#servicios' })" class="tcs-btn tcs-btn--ghost">
        {{ t('site.service.back') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePublicContent } from '~/composables/usePublicContent.js'
import { localized } from '~/utils/localized.js'
import { serviceIconPath } from '~/utils/service-icons.js'
import { metaDescription } from '~/utils/seo.js'

definePageMeta({ layout: 'site' })

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { content, pending } = usePublicContent()

const service = computed(() => content.value.services.find((s) => s.slug === route.params.slug) || null)
const text = (field) => localized(service.value, field, locale.value)
const title = computed(() => text('title'))

const includes = computed(() => {
  const s = service.value
  if (!s) return []
  return (locale.value === 'en' && s.includes_en?.length ? s.includes_en : s.includes_es) || []
})
const technologies = computed(() => service.value?.technologies || [])
const faqs = computed(() =>
  (service.value?.faqs || [])
    .map((f) => ({ q: localized(f, 'q', locale.value), a: localized(f, 'a', locale.value) }))
    .filter((f) => f.q && f.a)
)
const related = computed(() =>
  service.value
    ? content.value.projects.filter((p) => p.slug && (p.serviceIds || []).includes(service.value.id))
    : []
)
const others = computed(() => content.value.services.filter((s) => s.slug && s.slug !== route.params.slug))

useSeoMeta({
  title: () => (service.value ? `${title.value} — ${t('site.service.metaSuffix')}` : t('site.service.notFound')),
  description: () => metaDescription(text('summary')),
  ogTitle: () => title.value,
  ogDescription: () => metaDescription(text('summary')),
  robots: () => (service.value ? undefined : 'noindex'),
})

const baseUrl = 'https://thecodesolutions.com'
useHead(() => ({
  script: service.value
    ? [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('site.service.home'), item: baseUrl + localePath('index') },
                { '@type': 'ListItem', position: 2, name: t('site.service.services'), item: baseUrl + localePath('index') + '#servicios' },
                { '@type': 'ListItem', position: 3, name: title.value },
              ],
            },
            {
              '@type': 'Service',
              name: title.value,
              description: text('summary'),
              serviceType: title.value,
              provider: { '@id': `${baseUrl}/#organization` },
              areaServed: 'EC',
              inLanguage: locale.value === 'en' ? 'en-US' : 'es-EC',
            },
            ...(faqs.value.length
              ? [{
                  '@type': 'FAQPage',
                  mainEntity: faqs.value.map((f) => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: { '@type': 'Answer', text: f.a },
                  })),
                }]
              : []),
          ],
        }),
      }]
    : [],
}))
</script>

<style scoped>
.crumbs ol {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 14px;
  color: rgb(var(--v-theme-tcs-muted));
}

.crumbs a {
  color: rgb(var(--v-theme-tcs-muted));
}

.crumbs [aria-current] {
  color: rgb(var(--v-theme-tcs-text));
  font-weight: 600;
}

.svc__head {
  padding-top: 32px;
}

.svc__intro {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 48px;
}

.svc__intro-text {
  flex: 1 1 520px;
  min-width: 0;
}

.svc__icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: rgb(var(--v-theme-tcs-accent-soft));
  color: rgb(var(--v-theme-tcs-accent-text));
}

.svc__title {
  margin: 20px 0 0;
  font-family: var(--tcs-font-display);
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.svc__lead {
  margin: 20px 0 0;
  max-width: 640px;
  font-size: 20px;
  color: rgb(var(--v-theme-tcs-muted));
}

.svc__actions {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.svc__includes {
  flex: 1 1 360px;
  min-width: 0;
  padding: 28px;
  border-radius: 16px;
  border: 1px solid rgb(var(--v-theme-tcs-border));
  background: rgb(var(--v-theme-tcs-surface));
}

.svc__includes ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
}

.svc__includes li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  font-size: 15px;
}

.svc__includes svg {
  flex: 0 0 20px;
  margin-top: 2px;
  color: rgb(var(--v-theme-tcs-accent-text));
}

.svc__h3 {
  margin: 0 0 16px;
  font-family: var(--tcs-font-display);
  font-size: 22px;
}

.svc__body {
  display: grid;
  gap: 40px;
}

.svc__text {
  margin: 0;
  max-width: 760px;
  font-size: 18px;
  white-space: pre-line;
}

.svc__chips,
.svc__others ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.related {
  list-style: none;
  margin: 28px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.related__card {
  display: flex;
  gap: 18px;
  align-items: center;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid rgb(var(--v-theme-tcs-border));
  color: rgb(var(--v-theme-tcs-text));
  text-decoration: none;
}

.related__card:hover {
  border-color: rgb(var(--v-theme-tcs-accent));
}

.related__img {
  width: 140px;
  height: 92px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
}

.related__title {
  display: block;
  font-family: var(--tcs-font-display);
  font-size: 20px;
  font-weight: 600;
}

.related__desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 4px;
  font-size: 14px;
  color: rgb(var(--v-theme-tcs-muted));
}

.faq {
  max-width: 860px;
}

.faq__list {
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq__item {
  border-radius: 12px;
  border: 1px solid rgb(var(--v-theme-tcs-border));
  background: rgb(var(--v-theme-tcs-bg));
}

.faq__q {
  padding: 16px 20px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  list-style-position: inside;
}

.faq__a {
  margin: 0;
  padding: 0 20px 20px;
  font-size: 15px;
  color: rgb(var(--v-theme-tcs-muted));
}

.svc__cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.missing {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}
</style>
