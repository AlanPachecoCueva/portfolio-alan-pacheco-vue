<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <p class="site-footer__brand">
        <Site_Logo :size="28" />
        <span>{{ $t('site.footer.place') }} · © {{ year }}</span>
      </p>
      <nav :aria-label="$t('site.footer.nav')" class="site-footer__nav">
        <NuxtLink :to="$localePath({ name: 'index', hash: '#servicios' })">{{ $t('site.nav.services') }}</NuxtLink>
        <NuxtLink :to="$localePath({ name: 'index', hash: '#proyectos' })">{{ $t('site.nav.projects') }}</NuxtLink>
        <NuxtLink :to="$localePath({ name: 'index', hash: '#equipo' })">{{ $t('site.nav.team') }}</NuxtLink>
        <NuxtLink :to="$localePath({ name: 'index', hash: '#contacto' })">{{ $t('site.nav.contact') }}</NuxtLink>
      </nav>
    </div>
  </footer>

  <a
    :href="whatsappUrl"
    class="site-whatsapp"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="$t('site.footer.whatsapp')"
  >
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5z" />
    </svg>
  </a>
</template>

<script>
import Site_Logo from '~/components/site/Site_Logo.vue'
import { CONTACT } from '~/utils/site-contact.js'

export default {
  name: 'Site_Footer',
  components: { Site_Logo },
  data() {
    return {
      year: new Date().getFullYear(),
      whatsappUrl: CONTACT.whatsappUrl,
    }
  },
}
</script>

<style scoped>
.site-footer {
  border-top: 1px solid rgb(var(--v-theme-tcs-border));
  background: rgb(var(--v-theme-tcs-surface));
}

.site-footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  font-size: 14px;
  color: rgb(var(--v-theme-tcs-muted));
}

.site-footer__brand {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.site-footer__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.site-footer__nav a {
  color: rgb(var(--v-theme-tcs-muted));
  text-decoration: none;
}

.site-footer__nav a:hover {
  color: rgb(var(--v-theme-tcs-accent-text));
}

.site-whatsapp {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 40;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgb(var(--v-theme-tcs-accent));
  color: rgb(var(--v-theme-tcs-on-accent));
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
}
</style>
