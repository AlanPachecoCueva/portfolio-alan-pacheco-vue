<template>
  <NuxtLayout name="site">
    <section class="tcs-container not-found" aria-labelledby="error-titulo">
      <p class="tcs-eyebrow">{{ is404 ? '404' : error?.statusCode }}</p>
      <h1 id="error-titulo" class="not-found__title">{{ is404 ? t('site.error.title404') : t('site.error.title') }}</h1>
      <p class="tcs-lead">{{ t('site.error.text') }}</p>
      <div class="not-found__actions">
        <button type="button" class="tcs-btn tcs-btn--primary" @click="goHome">{{ t('site.error.home') }}</button>
        <button type="button" class="tcs-btn tcs-btn--ghost" @click="goContact">{{ t('site.error.contact') }}</button>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  error: { type: Object, default: null },
})

const { t } = useI18n()
const localePath = useLocalePath()
const is404 = computed(() => !props.error || props.error.statusCode === 404)

// Con el fallback de Netlify (200.html) una URL inexistente responde 200: noindex evita
// que Google la trate como página real (soft 404)
useSeoMeta({
  title: () => (is404.value ? t('site.error.title404') : t('site.error.title')),
  robots: 'noindex',
})

const goHome = () => clearError({ redirect: localePath('index') })
const goContact = () => clearError({ redirect: localePath({ name: 'index', hash: '#contacto' }) })
</script>

<style scoped>
.not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.not-found__title {
  margin: 0;
  font-family: var(--tcs-font-display);
  font-size: clamp(32px, 4.5vw, 52px);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.not-found__actions {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
