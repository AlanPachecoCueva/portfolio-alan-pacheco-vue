<template>
  <!-- Layout de TheCodeSolutions. Las páginas viejas (galería, logros) siguen con layouts/default.vue -->
  <v-app class="tcs-site">
    <Site_Header />
    <main>
      <slot />
    </main>
    <Site_Footer />
  </v-app>
</template>

<script>
import Site_Header from '~/components/site/Site_Header.vue'
import Site_Footer from '~/components/site/Site_Footer.vue'

export default {
  name: 'SiteLayout',
  components: { Site_Header, Site_Footer },
  setup() {
    // SEO multilenguaje: <html lang>, hreflang (es, en, x-default), canonical y og:locale (DA-011)
    const i18nHead = useLocaleHead({ dir: true, lang: true, seo: true })
    useHead(() => ({
      htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang, dir: i18nHead.value.htmlAttrs?.dir },
      link: [
        ...(i18nHead.value.link || []),
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap',
        },
      ],
      meta: [...(i18nHead.value.meta || [])],
    }))
  },
}
</script>

<style>
@import '~/assets/site.css';
</style>
