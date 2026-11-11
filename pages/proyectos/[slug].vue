<template>
  <div>
    <article v-if="project" class="case">
      <div class="tcs-container case__head">
        <nav :aria-label="t('site.project.breadcrumb')" class="crumbs">
          <ol>
            <li><NuxtLink :to="localePath('index')">{{ t('site.project.home') }}</NuxtLink></li>
            <li aria-hidden="true">/</li>
            <li><NuxtLink :to="localePath({ name: 'index', hash: '#proyectos' })">{{ t('site.project.projects') }}</NuxtLink></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{{ title }}</li>
          </ol>
        </nav>

        <div class="case__intro">
          <div class="case__intro-text">
            <p v-if="serviceNames.length" class="tcs-eyebrow">{{ serviceNames.join(' · ') }}</p>
            <h1 class="case__title">{{ title }}</h1>
            <p class="case__lead">{{ description }}</p>
          </div>
          <a v-if="safeUrl" :href="safeUrl" target="_blank" rel="noopener noreferrer" class="tcs-btn tcs-btn--ghost">
            {{ t('site.project.visit') }} ↗
          </a>
        </div>

        <img
          v-if="project.thumbnailUrl"
          :src="project.thumbnailUrl"
          :alt="title"
          width="1200"
          height="525"
          fetchpriority="high"
          class="case__cover"
        />
      </div>

      <div class="tcs-container case__body">
        <div class="case__main">
          <section v-if="text('challenge')" aria-labelledby="reto">
            <h2 id="reto" class="case__h2">{{ t('site.project.challenge') }}</h2>
            <p class="case__p">{{ text('challenge') }}</p>
          </section>
          <section v-if="text('solution')" aria-labelledby="solucion">
            <h2 id="solucion" class="case__h2">{{ t('site.project.solution') }}</h2>
            <p class="case__p">{{ text('solution') }}</p>
          </section>
          <section v-if="text('result')" aria-labelledby="resultado">
            <h2 id="resultado" class="case__h2">{{ t('site.project.result') }}</h2>
            <p class="case__p">{{ text('result') }}</p>
          </section>
          <section v-if="images.length" aria-labelledby="galeria">
            <h2 id="galeria" class="case__h2">{{ t('site.project.gallery') }}</h2>
            <Site_Gallery :images="images" :name="title" />
          </section>
        </div>

        <aside class="case__aside" :aria-label="t('site.project.facts')">
          <div class="facts">
            <h2 class="facts__title">{{ t('site.project.facts') }}</h2>
            <dl>
              <div v-if="project.client">
                <dt>{{ t('site.project.client') }}</dt>
                <dd>{{ project.client }}</dd>
              </div>
              <div v-if="year">
                <dt>{{ t('site.project.year') }}</dt>
                <dd>{{ year }}</dd>
              </div>
              <div v-if="serviceNames.length">
                <dt>{{ t('site.project.services') }}</dt>
                <dd>{{ serviceNames.join(', ') }}</dd>
              </div>
              <div v-if="technologies.length">
                <dt>{{ t('site.project.tech') }}</dt>
                <dd class="facts__chips">
                  <span v-for="tech in technologies" :key="tech" class="tcs-chip facts__chip">{{ tech }}</span>
                </dd>
              </div>
              <div v-if="teamNames.length">
                <dt>{{ t('site.project.team') }}</dt>
                <dd>{{ teamNames.join(', ') }}</dd>
              </div>
            </dl>
          </div>
          <div class="cta">
            <h2 class="facts__title">{{ t('site.project.ctaTitle') }}</h2>
            <p>{{ t('site.project.ctaText') }}</p>
            <NuxtLink :to="localePath({ name: 'index', hash: '#contacto' })" class="tcs-btn tcs-btn--primary">
              {{ t('site.project.ctaButton') }}
            </NuxtLink>
          </div>
        </aside>
      </div>

      <section v-if="others.length" class="tcs-band" aria-labelledby="otros">
        <div class="tcs-container">
          <div class="others__head">
            <h2 id="otros" class="case__h2">{{ t('site.project.others') }}</h2>
            <NuxtLink :to="localePath({ name: 'index', hash: '#proyectos' })" class="tcs-link">{{ t('site.project.all') }} →</NuxtLink>
          </div>
          <ul class="others">
            <li v-for="p in others" :key="p.id">
              <NuxtLink :to="localePath({ name: 'proyectos-slug', params: { slug: p.slug } })" class="other">
                <img v-if="p.thumbnailUrl" :src="p.thumbnailUrl" alt="" width="120" height="80" loading="lazy" class="other__img" />
                <span class="other__title">{{ localized(p, 'title', locale) }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </section>
    </article>

    <div v-else class="tcs-container missing">
      <p class="case__lead">{{ pending ? t('site.project.loading') : t('site.project.notFound') }}</p>
      <NuxtLink v-if="!pending" :to="localePath({ name: 'index', hash: '#proyectos' })" class="tcs-btn tcs-btn--ghost">
        {{ t('site.project.back') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Site_Gallery from '~/components/site/Site_Gallery.vue'
import { usePublicContent } from '~/composables/usePublicContent.js'
import { localized } from '~/utils/localized.js'
import { metaDescription } from '~/utils/seo.js'

definePageMeta({ layout: 'site' })

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { content, pending } = usePublicContent()

const project = computed(() => content.value.projects.find((p) => p.slug === route.params.slug) || null)
const text = (field) => localized(project.value, field, locale.value)
const title = computed(() => text('title'))
const description = computed(() => text('description'))

const serviceNames = computed(() =>
  (project.value?.serviceIds || [])
    .map((id) => content.value.services.find((s) => s.id === id))
    .filter(Boolean)
    .map((s) => localized(s, 'title', locale.value))
)
const teamNames = computed(() =>
  (project.value?.teamMemberIds || [])
    .map((id) => content.value.team.find((m) => m.id === id)?.name)
    .filter(Boolean)
)
const technologies = computed(() =>
  [project.value?.technology, ...(project.value?.relatedTechnologies || [])].filter(Boolean)
)
const year = computed(() => {
  const s = project.value?.date?.seconds
  return s ? new Date(s * 1000).getUTCFullYear() : ''
})
const images = computed(() => (project.value?.imageUrls || []).filter((i) => i?.url))
// La URL se valida en el admin; aquí se vuelve a exigir http(s) antes de pintarla como enlace
const safeUrl = computed(() => (/^https?:\/\//i.test(project.value?.url || '') ? project.value.url : ''))
const others = computed(() =>
  content.value.projects.filter((p) => p.slug && p.slug !== route.params.slug).slice(0, 3)
)

// SEO: título, descripción e imagen por proyecto e idioma; noindex si no existe
useSeoMeta({
  title: () => (project.value ? `${title.value} — ${t('site.project.metaSuffix')}` : t('site.project.notFound')),
  description: () => metaDescription(description.value),
  ogTitle: () => title.value,
  ogDescription: () => metaDescription(description.value),
  ogImage: () => project.value?.thumbnailUrl,
  twitterImage: () => project.value?.thumbnailUrl,
  robots: () => (project.value ? undefined : 'noindex'),
})

const baseUrl = 'https://thecodesolutions.com'
useHead(() => ({
  script: project.value
    ? [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('site.project.home'), item: baseUrl + localePath('index') },
                { '@type': 'ListItem', position: 2, name: t('site.project.projects'), item: baseUrl + localePath('index') + '#proyectos' },
                { '@type': 'ListItem', position: 3, name: title.value },
              ],
            },
            {
              '@type': 'CreativeWork',
              name: title.value,
              description: description.value,
              image: project.value.thumbnailUrl || undefined,
              inLanguage: locale.value === 'en' ? 'en-US' : 'es-EC',
              creator: { '@id': `${baseUrl}/#organization` },
            },
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

.case__head {
  padding-top: 32px;
  padding-bottom: 0;
}

.case__intro {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

.case__intro-text {
  flex: 1 1 560px;
  min-width: 0;
}

.case__title {
  margin: 0;
  font-family: var(--tcs-font-display);
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.case__lead {
  margin: 20px 0 0;
  max-width: 720px;
  font-size: 19px;
  color: rgb(var(--v-theme-tcs-muted));
}

.case__cover {
  margin-top: 40px;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 7;
  object-fit: cover;
  border-radius: 18px;
  border: 1px solid rgb(var(--v-theme-tcs-border));
  display: block;
}

.case__body {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 56px;
  padding-top: 64px;
}

.case__main {
  flex: 999 1 560px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.case__h2 {
  margin: 0 0 12px;
  font-family: var(--tcs-font-display);
  font-size: 28px;
}

.case__p {
  margin: 0;
  font-size: 17px;
  color: rgb(var(--v-theme-tcs-muted));
}

.case__aside {
  flex: 1 1 300px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.facts,
.cta {
  padding: 24px;
  border-radius: 16px;
}

.facts {
  border: 1px solid rgb(var(--v-theme-tcs-border));
  background: rgb(var(--v-theme-tcs-surface));
}

.cta {
  background: rgb(var(--v-theme-tcs-accent-soft));
}

.cta p {
  margin: 8px 0 16px;
  font-size: 15px;
  color: rgb(var(--v-theme-tcs-muted));
}

.facts__title {
  margin: 0 0 16px;
  font-family: var(--tcs-font-display);
  font-size: 20px;
}

.facts dl {
  margin: 0;
  display: grid;
  gap: 14px;
  font-size: 15px;
}

.facts dt {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-tcs-muted));
}

.facts dd {
  margin: 2px 0 0;
}

.facts__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px !important;
}

.facts__chip {
  padding: 4px 10px;
  font-size: 13px;
}

.others__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
}

.others {
  list-style: none;
  margin: 28px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.other {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid rgb(var(--v-theme-tcs-border));
  background: rgb(var(--v-theme-tcs-bg));
  color: rgb(var(--v-theme-tcs-text));
  text-decoration: none;
}

.other__img {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
}

.other__title {
  font-family: var(--tcs-font-display);
  font-size: 19px;
  font-weight: 600;
}

.missing {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}
</style>
