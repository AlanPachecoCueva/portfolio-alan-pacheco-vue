<template>
  <section id="servicios" class="tcs-band" aria-labelledby="servicios-titulo">
    <div class="tcs-container">
      <p class="tcs-eyebrow">{{ $t('site.services.eyebrow') }}</p>
      <h2 id="servicios-titulo" class="tcs-h2">{{ $t('site.services.title') }}</h2>

      <ul class="services">
        <li v-for="service in services" :key="service.id" class="service">
          <span class="service__icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path :d="iconPath(service.icon)" />
            </svg>
          </span>
          <h3 class="service__title">{{ text(service, 'title') }}</h3>
          <p class="service__summary">{{ text(service, 'summary') }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { localized } from '~/utils/localized.js'

// Íconos de línea por tipo de servicio (campo `icon` del admin)
const ICONS = {
  web: 'M3 5h18v11H3z M8 20h8 M12 16v4',
  mobile: 'M8 3h8v18H8z M11 18h2',
  ai: 'M7 7h10v10H7z M10 3v4 M14 3v4 M10 17v4 M14 17v4 M3 10h4 M3 14h4 M17 10h4 M17 14h4',
  systems: 'M12 3l9 5-9 5-9-5z M3 13l9 5 9-5',
  consulting: 'M4 5h16v11H9l-5 4z',
}

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
      return ICONS[icon] || ICONS.web
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

.service__summary {
  margin: 0;
  font-size: 15px;
  color: rgb(var(--v-theme-tcs-muted));
}
</style>
