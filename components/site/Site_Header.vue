<template>
  <header class="site-header" :class="{ 'site-header--hidden': hidden }">
    <nav class="site-header__nav" :aria-label="$t('site.nav.label')">
      <NuxtLink :to="$localePath('index')" class="site-header__brand" :aria-label="$t('site.nav.home')">
        <Site_Logo :size="36" />
      </NuxtLink>

      <ul class="site-header__links">
        <li v-for="link in links" :key="link.hash">
          <NuxtLink :to="$localePath({ name: 'index', hash: link.hash })">{{ $t(link.label) }}</NuxtLink>
        </li>
      </ul>

      <div class="site-header__actions">
        <Site_Language class="site-header__desk" />
        <Theme_Selector_Component />
        <NuxtLink :to="$localePath({ name: 'index', hash: '#contacto' })" class="tcs-btn tcs-btn--primary site-header__desk">
          {{ $t('site.nav.quote') }}
        </NuxtLink>
        <button
          type="button"
          class="site-header__menu-btn"
          :aria-label="menuOpen ? $t('site.nav.close') : $t('site.nav.menu')"
          :aria-expanded="menuOpen ? 'true' : 'false'"
          aria-controls="site-mobile-menu"
          @click="toggleMenu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path v-if="menuOpen" d="M6 6l12 12 M18 6L6 18" />
            <path v-else d="M4 7h16 M4 12h16 M4 17h16" />
          </svg>
        </button>
      </div>
    </nav>

    <div v-if="menuOpen" id="site-mobile-menu" class="site-header__mobile">
      <NuxtLink
        v-for="link in links"
        :key="link.hash"
        :to="$localePath({ name: 'index', hash: link.hash })"
        @click="menuOpen = false"
      >{{ $t(link.label) }}</NuxtLink>
      <div class="site-header__mobile-actions">
        <Site_Language />
        <NuxtLink :to="$localePath({ name: 'index', hash: '#contacto' })" class="tcs-btn tcs-btn--primary" @click="menuOpen = false">
          {{ $t('site.nav.quote') }}
        </NuxtLink>
      </div>
    </div>
  </header>
  <div class="site-header__spacer" aria-hidden="true"></div>
</template>

<script>
import Site_Logo from '~/components/site/Site_Logo.vue'
import Site_Language from '~/components/site/Site_Language.vue'
import Theme_Selector_Component from '~/components/utils/Theme_Selector_Component.vue'

export default {
  name: 'Site_Header',
  components: { Site_Logo, Site_Language, Theme_Selector_Component },
  data() {
    return {
      hidden: false,
      menuOpen: false,
      lastY: 0,
      links: [
        { hash: '#servicios', label: 'site.nav.services' },
        { hash: '#proyectos', label: 'site.nav.projects' },
        { hash: '#proceso', label: 'site.nav.about' },
        { hash: '#equipo', label: 'site.nav.team' },
        { hash: '#contacto', label: 'site.nav.contact' },
      ],
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    // Se oculta al bajar y reaparece al subir, para tener los botones a mano sin volver arriba
    onScroll() {
      const y = window.scrollY
      this.hidden = !this.menuOpen && y > this.lastY && y > 80
      this.lastY = y
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen
      this.hidden = false
    },
  },
}
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgb(var(--v-theme-tcs-bg));
  border-bottom: 1px solid rgb(var(--v-theme-tcs-border));
  transition: transform 0.25s ease;
}

.site-header--hidden {
  transform: translateY(-100%);
}

.site-header__spacer {
  height: 77px;
}

.site-header__nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px 32px;
}

.site-header__brand {
  display: flex;
  text-decoration: none;
  color: rgb(var(--v-theme-tcs-text));
}

.site-header__links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 24px;
  font-size: 15px;
  font-weight: 500;
}

.site-header__links a,
.site-header__mobile a:not(.tcs-btn) {
  color: rgb(var(--v-theme-tcs-text));
  text-decoration: none;
}

.site-header__links a:hover {
  color: rgb(var(--v-theme-tcs-accent-text));
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

/* Theme_Selector_Component trae width: 100% en su contenedor; sin esto comprime
   (y recorta) el selector de idioma */
.site-header__actions > *,
.site-header__mobile-actions > * {
  flex: 0 0 auto;
  width: auto;
}

.site-header__menu-btn {
  display: none;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  border: 1px solid rgb(var(--v-theme-tcs-border));
  background: transparent;
  color: rgb(var(--v-theme-tcs-text));
  cursor: pointer;
  place-items: center;
}

.site-header__mobile {
  border-top: 1px solid rgb(var(--v-theme-tcs-border));
  padding: 8px 24px 20px;
  display: flex;
  flex-direction: column;
  font-size: 17px;
  font-weight: 500;
}

.site-header__mobile a:not(.tcs-btn) {
  padding: 12px 0;
}

.site-header__mobile-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

@media (max-width: 900px) {
  .site-header__links,
  .site-header__desk {
    display: none;
  }

  .site-header__menu-btn {
    display: grid;
  }
}
</style>
