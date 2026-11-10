<template>
  <div>
    <Site_Hero />
    <Site_Services :services="content.services" />
    <Site_Process />
    <Site_Projects :projects="content.projects" :services="content.services" />

    <section class="tcs-container stack" aria-labelledby="stack-titulo">
      <h2 id="stack-titulo" class="stack__title">{{ t('site.stack.title') }}</h2>
      <ul class="stack__list">
        <li v-for="tech in stack" :key="tech" class="tcs-chip">{{ tech }}</li>
      </ul>
    </section>

    <div class="tcs-band">
      <Site_Team :team="content.team" />
    </div>
    <Site_Quote :services="content.services" />
  </div>
</template>

<script setup>
import Site_Hero from '~/components/site/Site_Hero.vue'
import Site_Services from '~/components/site/Site_Services.vue'
import Site_Process from '~/components/site/Site_Process.vue'
import Site_Projects from '~/components/site/Site_Projects.vue'
import Site_Team from '~/components/site/Site_Team.vue'
import Site_Quote from '~/components/site/Site_Quote.vue'
import { usePublicContent } from '~/composables/usePublicContent.js'

definePageMeta({ layout: 'site' })

const { t } = useI18n()
const { content } = usePublicContent()

const stack = ['Vue.js', 'Nuxt', 'JavaScript', 'TypeScript', 'C#', '.NET', 'Java', 'Python', 'Firebase']

// SEO por idioma (hreflang y canonical los pone el layout con useLocaleHead)
useSeoMeta({
  title: () => t('site.meta.title'),
  description: () => t('site.meta.description'),
  ogTitle: () => t('site.meta.title'),
  ogDescription: () => t('site.meta.description'),
  twitterTitle: () => t('site.meta.title'),
  twitterDescription: () => t('site.meta.description'),
})
</script>

<style scoped>
.stack {
  padding-top: 72px;
  padding-bottom: 72px;
}

.stack__title {
  margin: 0;
  font-family: var(--tcs-font-display);
  font-size: 24px;
  letter-spacing: -0.01em;
}

.stack__list {
  list-style: none;
  margin: 24px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
