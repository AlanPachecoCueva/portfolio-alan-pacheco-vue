<template>
  <div>
    <article v-if="member">
      <section class="tcs-container profile" aria-labelledby="perfil-nombre">
        <nav :aria-label="t('site.project.breadcrumb')" class="crumbs">
          <ol>
            <li><NuxtLink :to="localePath('index')">{{ t('site.profile.home') }}</NuxtLink></li>
            <li aria-hidden="true">/</li>
            <li><NuxtLink :to="localePath({ name: 'index', hash: '#equipo' })">{{ t('site.profile.team') }}</NuxtLink></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{{ member.name }}</li>
          </ol>
        </nav>

        <div class="profile__head">
          <img
            :src="member.photoUrl"
            :srcset="member.photoSrcset"
            :alt="t('site.team.photoAlt', { name: member.name })"
            width="320"
            height="320"
            fetchpriority="high"
            class="profile__photo"
          />
          <div class="profile__info">
            <p class="tcs-eyebrow">{{ member.role }}</p>
            <h1 id="perfil-nombre" class="profile__name">{{ member.name }}</h1>
            <p class="profile__bio">{{ member.bio }}</p>
            <div class="profile__actions">
              <a v-if="cv.primary" :href="cv.primary" download class="tcs-btn tcs-btn--primary">{{ t('site.profile.cv') }}</a>
              <a v-if="cv.secondary" :href="cv.secondary" download class="tcs-btn tcs-btn--ghost">{{ t('site.profile.cvOther') }}</a>
              <a v-for="l in member.links" :key="l.href" :href="l.href" target="_blank" rel="noopener noreferrer" class="tcs-link profile__link">{{ l.label }}</a>
            </div>
            <ul v-if="member.skills.length" class="profile__skills" :aria-label="t('site.profile.skills')">
              <li v-for="s in member.skills" :key="s" class="tcs-chip profile__chip">{{ s }}</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="tcs-band" :aria-label="t('site.profile.tabs')">
        <div class="tcs-container profile__work">
          <div role="tablist" :aria-label="t('site.profile.tabs')" class="tabs">
            <button
              v-for="tab in tabs"
              :id="`tab-${tab.id}`"
              :key="tab.id"
              type="button"
              role="tab"
              class="tab"
              :class="{ 'tab--active': active === tab.id }"
              :aria-selected="active === tab.id ? 'true' : 'false'"
              :aria-controls="`panel-${tab.id}`"
              :tabindex="active === tab.id ? 0 : -1"
              @click="active = tab.id"
            >{{ tab.label }} <span class="tab__count">{{ tab.count }}</span></button>
          </div>

          <!-- v-show (no v-if): las tres secciones quedan en el HTML para los buscadores -->
          <div v-show="active === 'proyectos'" id="panel-proyectos" role="tabpanel" aria-labelledby="tab-proyectos" class="panel">
            <ul v-if="memberProjects.length" class="cards">
              <li v-for="p in memberProjects" :key="p.id">
                <NuxtLink :to="localePath({ name: 'proyectos-slug', params: { slug: p.slug } })" class="card">
                  <img v-if="p.thumbnailUrl" :src="p.thumbnailUrl" alt="" width="400" height="225" loading="lazy" class="card__img" />
                  <span class="card__body">
                    <span class="card__title">{{ localized(p, 'title', locale) }}</span>
                    <span class="card__meta">{{ localized(p, 'description', locale) }}</span>
                  </span>
                </NuxtLink>
              </li>
            </ul>
            <p v-else class="panel__empty">{{ t('site.profile.noProjects') }}</p>
          </div>

          <div v-show="active === 'certificaciones'" id="panel-certificaciones" role="tabpanel" aria-labelledby="tab-certificaciones" class="panel">
            <ul v-if="certifications.length" class="certs">
              <li v-for="a in certifications" :key="a.id" class="cert">
                <img v-if="a.thumbnailUrl" :src="a.thumbnailUrl" alt="" width="72" height="72" loading="lazy" class="cert__img" />
                <span v-else class="cert__icon" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M8.5 14l-1.5 7 5-3 5 3-1.5-7" /></svg>
                </span>
                <div class="cert__body">
                  <p class="cert__meta">{{ certType(a.type) }}<span v-if="a.issuer"> · {{ a.issuer }}</span><span v-if="yearOf(a)"> · {{ yearOf(a) }}</span></p>
                  <h3 class="cert__title">{{ localized(a, 'title', locale) }}</h3>
                  <p class="cert__desc">{{ localized(a, 'description', locale) }}</p>
                  <a v-if="safeLink(a.link)" :href="safeLink(a.link)" target="_blank" rel="noopener noreferrer" class="tcs-link">{{ t('site.profile.verify') }} ↗</a>
                </div>
              </li>
            </ul>
            <p v-else class="panel__empty">{{ t('site.profile.noCerts') }}</p>
          </div>

          <div v-if="member.showGallery" v-show="active === 'galeria'" id="panel-galeria" role="tabpanel" aria-labelledby="tab-galeria" class="panel">
            <Site_Gallery v-if="galleryImages.length" :images="galleryImages" :name="member.name" />
            <p v-else class="panel__empty">{{ t('site.profile.noImages') }}</p>
          </div>
        </div>
      </section>
    </article>

    <div v-else class="tcs-container missing">
      <p class="profile__bio">{{ t('site.profile.notFound') }}</p>
      <NuxtLink :to="localePath({ name: 'index', hash: '#equipo' })" class="tcs-btn tcs-btn--ghost">{{ t('site.profile.back') }}</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Site_Gallery from '~/components/site/Site_Gallery.vue'
import { usePublicContent } from '~/composables/usePublicContent.js'
import { usePublicProfile } from '~/composables/usePublicProfile.js'
import { localized } from '~/utils/localized.js'
import { FOUNDER } from '~/utils/founder.js'
import { metaDescription } from '~/utils/seo.js'

definePageMeta({ layout: 'site' })

const route = useRoute()
const { t, te, locale } = useI18n()
const localePath = useLocalePath()
const { content } = usePublicContent()
const { profile } = usePublicProfile()

const safeLink = (url) => (/^https?:\/\//i.test(url || '') ? url : '')

const member = computed(() => {
  const doc = content.value.team.find((m) => m.slug === route.params.slug)
  if (doc) {
    return {
      id: doc.id,
      name: doc.name,
      role: localized(doc, 'role', locale.value),
      bio: localized(doc, 'bio', locale.value),
      photoUrl: doc.photoUrl || FOUNDER.photoUrl,
      photoSrcset: doc.photoUrl ? undefined : FOUNDER.photoSrcset,
      skills: doc.skills || [],
      links: ['linkedin', 'github', 'web']
        .filter((k) => safeLink(doc.links?.[k]))
        .map((k) => ({ href: doc.links[k], label: k === 'web' ? 'Web' : k === 'github' ? 'GitHub' : 'LinkedIn' })),
      cvUrl_es: doc.cvUrl_es,
      cvUrl_en: doc.cvUrl_en,
      showGallery: !!doc.showGallery,
    }
  }
  // Respaldo: perfil del fundador mientras no exista su ficha en Equipo
  if (route.params.slug === FOUNDER.slug && !content.value.team.length) {
    return {
      ...FOUNDER,
      role: t('site.team.founderRole'),
      bio: t('site.team.founderBio'),
      links: [
        { href: FOUNDER.links.linkedin, label: 'LinkedIn' },
        { href: FOUNDER.links.github, label: 'GitHub' },
      ],
    }
  }
  return null
})

// Con un solo miembro (hoy, el fundador) todo el trabajo publicado es suyo
const ownsEverything = computed(() => content.value.team.length <= 1)

const memberProjects = computed(() =>
  content.value.projects.filter((p) => p.slug && (ownsEverything.value || (p.teamMemberIds || []).includes(member.value?.id)))
)
const certifications = computed(() =>
  profile.value.achievements.filter((a) => ownsEverything.value || a.teamMemberId === member.value?.id)
)
const galleryImages = computed(() =>
  profile.value.images
    .filter((img) => img.url)
    .map((img) => {
      const big = Number(img.sizeFactor) > 1
      return { url: img.url, columns: big ? 2 : 1, rows: big ? 2 : 1, alt: img.title || img.description || '' }
    })
)

// CV en el idioma de la página primero; rutas con espacios codificadas
const cv = computed(() => {
  const es = member.value?.cvUrl_es ? encodeURI(member.value.cvUrl_es) : ''
  const en = member.value?.cvUrl_en ? encodeURI(member.value.cvUrl_en) : ''
  return locale.value === 'en' ? { primary: en || es, secondary: en ? es : '' } : { primary: es || en, secondary: es ? en : '' }
})

const tabs = computed(() => [
  { id: 'proyectos', label: t('site.profile.projects'), count: memberProjects.value.length },
  { id: 'certificaciones', label: t('site.profile.certifications'), count: certifications.value.length },
  ...(member.value?.showGallery ? [{ id: 'galeria', label: t('site.profile.gallery'), count: galleryImages.value.length }] : []),
])
// Las URLs viejas /gallery y /achievements redirigen aquí con #galeria / #certificaciones.
// El hash solo se lee en el cliente tras montar: el HTML pre-renderizado no lo conoce y
// elegir otra pestaña antes de hidratar desincroniza el v-show.
const active = ref('proyectos')
onMounted(() => {
  if (['#galeria', '#certificaciones'].includes(route.hash)) active.value = route.hash.slice(1)
})

const certType = (type) => (te(`site.profile.types.${type}`) ? t(`site.profile.types.${type}`) : type || '')
const yearOf = (a) => (a.date?.seconds ? new Date(a.date.seconds * 1000).getUTCFullYear() : '')

useSeoMeta({
  title: () => (member.value ? `${member.value.name} — ${member.value.role} | TheCodeSolutions` : t('site.profile.notFound')),
  description: () => metaDescription(member.value?.bio),
  ogTitle: () => member.value?.name,
  ogDescription: () => metaDescription(member.value?.bio),
  ogImage: () => (member.value ? `https://thecodesolutions.com${member.value.photoUrl}` : undefined),
  ogType: 'profile',
  robots: () => (member.value ? undefined : 'noindex'),
})

const baseUrl = 'https://thecodesolutions.com'
useHead(() => ({
  script: member.value
    ? [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          mainEntity: {
            '@type': 'Person',
            '@id': member.value.id === FOUNDER.id ? `${baseUrl}/#alan-pacheco` : undefined,
            name: member.value.name,
            jobTitle: member.value.role,
            description: member.value.bio,
            image: baseUrl + member.value.photoUrl,
            worksFor: { '@id': `${baseUrl}/#organization` },
            sameAs: member.value.links.map((l) => l.href),
            knowsAbout: member.value.skills,
          },
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

.profile {
  padding-top: 32px;
}

.profile__head {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 48px;
}

.profile__photo {
  flex: 0 0 auto;
  width: min(320px, 100%);
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 20px;
  background: rgb(var(--v-theme-tcs-accent-soft));
}

.profile__info {
  flex: 1 1 480px;
  min-width: 0;
}

.profile__name {
  margin: 0;
  font-family: var(--tcs-font-display);
  font-size: clamp(34px, 4.6vw, 52px);
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.profile__bio {
  margin: 20px 0 0;
  max-width: 640px;
  font-size: 18px;
  color: rgb(var(--v-theme-tcs-muted));
}

.profile__actions {
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.profile__link {
  padding: 0 8px;
  font-size: 15px;
}

.profile__skills {
  list-style: none;
  margin: 28px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.profile__chip {
  padding: 6px 14px;
  font-size: 13px;
}

.profile__work {
  padding-top: 48px;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border-bottom: 1px solid rgb(var(--v-theme-tcs-border));
}

.tab {
  min-height: 48px;
  margin-bottom: -1px;
  padding: 0 18px;
  border: 0;
  border-bottom: 3px solid transparent;
  background: transparent;
  color: rgb(var(--v-theme-tcs-muted));
  font: inherit;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.tab--active {
  color: rgb(var(--v-theme-tcs-text));
  border-bottom-color: rgb(var(--v-theme-tcs-accent));
}

.tab__count {
  font-weight: 500;
  color: rgb(var(--v-theme-tcs-muted));
}

.panel {
  margin-top: 32px;
}

.panel__empty {
  color: rgb(var(--v-theme-tcs-muted));
}

.cards {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgb(var(--v-theme-tcs-border));
  background: rgb(var(--v-theme-tcs-bg));
  color: rgb(var(--v-theme-tcs-text));
  text-decoration: none;
}

.card:hover {
  border-color: rgb(var(--v-theme-tcs-accent));
}

.card__img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
}

.card__body {
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.card__title {
  font-family: var(--tcs-font-display);
  font-size: 20px;
  font-weight: 600;
}

.card__meta {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
  color: rgb(var(--v-theme-tcs-muted));
}

.certs {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.cert {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 18px;
  border-radius: 14px;
  border: 1px solid rgb(var(--v-theme-tcs-border));
  background: rgb(var(--v-theme-tcs-bg));
}

.cert__img,
.cert__icon {
  flex: 0 0 72px;
  width: 72px;
  height: 72px;
  border-radius: 12px;
  object-fit: cover;
}

.cert__icon {
  display: grid;
  place-items: center;
  background: rgb(var(--v-theme-tcs-accent-soft));
  color: rgb(var(--v-theme-tcs-accent-text));
}

.cert__body {
  min-width: 0;
}

.cert__meta {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-tcs-muted));
}

.cert__title {
  margin: 4px 0 6px;
  font-size: 17px;
}

.cert__desc {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0 0 8px;
  font-size: 14px;
  color: rgb(var(--v-theme-tcs-muted));
}

.missing {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}
</style>
