<template>
  <!-- URL vieja del portafolio (/project/:id): solo redirige a /proyectos/:slug -->
  <div class="tcs-container legacy">
    <p v-if="!target && !pending">{{ t('site.project.notFound') }}</p>
    <NuxtLink :to="target || localePath({ name: 'index', hash: '#proyectos' })" class="tcs-btn tcs-btn--ghost">
      {{ t('site.project.back') }}
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { usePublicContent } from '~/composables/usePublicContent.js'

definePageMeta({ layout: 'site' })

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const { content, pending } = usePublicContent()

const target = computed(() => {
  const project = content.value.projects.find((p) => p.id === route.params.id)
  return project?.slug ? localePath({ name: 'proyectos-slug', params: { slug: project.slug } }) : ''
})

useSeoMeta({ robots: 'noindex' })

if (import.meta.client) {
  watchEffect(() => {
    if (target.value) navigateTo(target.value, { replace: true })
  })
}
</script>

<style scoped>
.legacy {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}
</style>
