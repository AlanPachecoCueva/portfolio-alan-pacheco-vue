<template>
  <section id="proyectos" class="tcs-band" aria-labelledby="proyectos-titulo">
    <div class="tcs-container">
      <div class="projects__head">
        <div>
          <p class="tcs-eyebrow">{{ $t('site.projects.eyebrow') }}</p>
          <h2 id="proyectos-titulo" class="tcs-h2">{{ $t('site.projects.title') }}</h2>
        </div>
        <div v-if="filters.length > 1" role="group" :aria-label="$t('site.projects.filter')" class="projects__filters">
          <button
            v-for="f in filters"
            :key="f.id"
            type="button"
            class="pill"
            :class="{ 'pill--active': active === f.id }"
            :aria-pressed="active === f.id ? 'true' : 'false'"
            @click="active = f.id"
          >{{ f.label }}</button>
        </div>
      </div>

      <ul v-if="visible.length" class="projects">
        <li v-for="project in visible" :key="project.id" class="project">
          <img
            v-if="project.thumbnailUrl"
            :src="project.thumbnailUrl"
            :alt="$t('site.projects.imageAlt', { name: text(project, 'title') })"
            width="640"
            height="400"
            loading="lazy"
            decoding="async"
            class="project__img"
          />
          <div v-else class="project__img project__img--empty" aria-hidden="true">{{ text(project, 'title') }}</div>
          <div class="project__body">
            <p class="project__meta">{{ tags(project) }}<span v-if="year(project)"> · {{ year(project) }}</span></p>
            <h3 class="project__title">{{ text(project, 'title') }}</h3>
            <p class="project__desc">{{ text(project, 'description') }}</p>
            <NuxtLink :to="projectLink(project)" class="tcs-link project__link">
              {{ $t('site.projects.view') }} →
            </NuxtLink>
          </div>
        </li>
      </ul>
      <p v-else class="tcs-lead">{{ $t('site.projects.empty') }}</p>
    </div>
  </section>
</template>

<script>
import { localized } from '~/utils/localized.js'

export default {
  name: 'Site_Projects',
  props: {
    projects: { type: Array, default: () => [] },
    services: { type: Array, default: () => [] },
  },
  data() {
    return { active: 'all' }
  },
  computed: {
    // Solo los servicios que tienen al menos un proyecto
    filters() {
      const used = new Set(this.projects.flatMap((p) => p.serviceIds || []))
      return [
        { id: 'all', label: this.$t('site.projects.all') },
        ...this.services.filter((s) => used.has(s.id)).map((s) => ({ id: s.id, label: this.text(s, 'title') })),
      ]
    },
    visible() {
      if (this.active === 'all') return this.projects
      return this.projects.filter((p) => (p.serviceIds || []).includes(this.active))
    },
  },
  methods: {
    text(obj, field) {
      return localized(obj, field, this.$i18n.locale)
    },
    tags(project) {
      return (project.serviceIds || [])
        .map((id) => this.services.find((s) => s.id === id))
        .filter(Boolean)
        .map((s) => this.text(s, 'title'))
        .join(' · ')
    },
    // URL con slug; los proyectos que aún no tienen slug usan la ruta vieja por id
    projectLink(project) {
      return project.slug
        ? this.$localePath({ name: 'proyectos-slug', params: { slug: project.slug } })
        : this.$localePath({ name: 'project-id', params: { id: project.id } })
    },
    year(project) {
      const seconds = project.date?.seconds
      return seconds ? new Date(seconds * 1000).getUTCFullYear() : ''
    },
  },
}
</script>

<style scoped>
.projects__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

.projects__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pill {
  min-height: 44px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid rgb(var(--v-theme-tcs-border));
  background: transparent;
  color: rgb(var(--v-theme-tcs-text));
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.pill--active {
  background: rgb(var(--v-theme-tcs-text));
  border-color: rgb(var(--v-theme-tcs-text));
  color: rgb(var(--v-theme-tcs-bg));
}

.projects {
  list-style: none;
  margin: 40px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.project {
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  overflow: hidden;
  background: rgb(var(--v-theme-tcs-bg));
  border: 1px solid rgb(var(--v-theme-tcs-border));
}

.project__img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  display: block;
}

.project__img--empty {
  display: grid;
  place-items: center;
  background: rgb(var(--v-theme-tcs-accent-soft));
  color: rgb(var(--v-theme-tcs-accent-text));
  font-family: var(--tcs-font-display);
  font-size: 26px;
  font-weight: 700;
}

.project__body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.project__meta {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-tcs-muted));
}

.project__title {
  margin: 0;
  font-family: var(--tcs-font-display);
  font-size: 21px;
}

.project__desc {
  margin: 0;
  font-size: 15px;
  color: rgb(var(--v-theme-tcs-muted));
}

.project__link {
  margin-top: auto;
  padding-top: 8px;
}
</style>
