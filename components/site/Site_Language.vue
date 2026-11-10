<template>
  <!-- Enlaces reales a la otra versión de la página: Google los sigue y funcionan sin JavaScript -->
  <nav class="site-lang" :aria-label="$t('site.nav.language')">
    <NuxtLink
      v-for="loc in locales"
      :key="loc.code"
      :to="$switchLocalePath(loc.code)"
      :hreflang="loc.language"
      :lang="loc.language"
      :aria-current="loc.code === $i18n.locale ? 'true' : undefined"
      class="site-lang__link"
      :class="{ 'site-lang__link--active': loc.code === $i18n.locale }"
    >{{ loc.code.toUpperCase() }}</NuxtLink>
  </nav>
</template>

<script>
import { unref } from 'vue'

export default {
  name: 'Site_Language',
  computed: {
    // En @nuxtjs/i18n 10, $i18n.locales es un ref
    locales() {
      return unref(this.$i18n.locales).map((l) => (typeof l === 'string' ? { code: l, language: l } : l))
    },
  },
}
</script>

<style scoped>
.site-lang {
  display: inline-flex;
  border: 1px solid rgb(var(--v-theme-tcs-border));
  border-radius: 10px;
  overflow: hidden;
}

.site-lang__link {
  min-width: 44px;
  min-height: 44px;
  display: grid;
  place-items: center;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  color: rgb(var(--v-theme-tcs-muted));
}

.site-lang__link--active {
  background: rgb(var(--v-theme-tcs-accent-soft));
  color: rgb(var(--v-theme-tcs-accent-text));
}
</style>
