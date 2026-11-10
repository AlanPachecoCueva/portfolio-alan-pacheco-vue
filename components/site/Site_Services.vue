<template>
  <section id="servicios" class="tcs-band" aria-labelledby="servicios-titulo">
    <div class="tcs-container">
      <p class="tcs-eyebrow">{{ $t('site.services.eyebrow') }}</p>
      <h2 id="servicios-titulo" class="tcs-h2">{{ $t('site.services.title') }}</h2>

      <ul class="services">
        <li v-for="service in services" :key="service.id">
          <NuxtLink :to="$localePath({ name: 'servicios-slug', params: { slug: service.slug } })" class="service">
            <span class="service__icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path :d="iconPath(service.icon)" />
              </svg>
            </span>
            <h3 class="service__title">{{ text(service, 'title') }}</h3>
            <p class="service__summary">{{ text(service, 'summary') }}</p>
            <span class="tcs-link service__more">{{ $t('site.services.more') }} →</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { localized } from '~/utils/localized.js'
import { serviceIconPath } from '~/utils/service-icons.js'

export default {
  name: 'Site_Services',
  props: {
    services: { type: Array, default: () => [] },
  },
  methods: {
    text(service, field) {
      return localized(service, field, this.$i18n.locale)
    },
    iconPath(icon) {
      return serviceIconPath(icon)
    },
  },
}
</script>

<style scoped>
.services {
  list-style: none;
  margin: 48px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 20px;
}

.service {
  height: 100%;
  color: rgb(var(--v-theme-tcs-text));
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 28px 24px;
  border-radius: 14px;
  background: rgb(var(--v-theme-tcs-bg));
  border: 1px solid rgb(var(--v-theme-tcs-border));
}

.service__icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: rgb(var(--v-theme-tcs-accent-soft));
  color: rgb(var(--v-theme-tcs-accent-text));
}

.service__title {
  margin: 4px 0 0;
  font-family: var(--tcs-font-display);
  font-size: 20px;
  letter-spacing: -0.01em;
}

.service__more {
  margin-top: auto;
  padding-top: 8px;
}

.service:hover {
  border-color: rgb(var(--v-theme-tcs-accent));
}

.service__summary {
  margin: 0;
  font-size: 15px;
  color: rgb(var(--v-theme-tcs-muted));
}
</style>
