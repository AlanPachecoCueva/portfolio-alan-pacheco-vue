<template>
  <!-- Layout de TheCodeSolutions: todas las páginas públicas -->
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

    // Imagen para compartir (WhatsApp, LinkedIn, Facebook, X): 1200×630 en JPG de ~70 KB.
    // WhatsApp en el celular no muestra la miniatura si la imagen pesa más de ~300 KB (ERR-021).
    // Una página puede reemplazarla con su propio ogImage (p. ej. el perfil con la foto).
    const { t, locale } = useI18n()
    const ogImageUrl = () => `https://thecodesolutions.com/og-thecodesolutions-${locale.value === 'en' ? 'en' : 'es'}.jpg`
    useSeoMeta({
      ogImage: () => ({ url: ogImageUrl(), width: 1200, height: 630, type: 'image/jpeg', alt: t('site.meta.ogImageAlt') }),
      twitterImage: ogImageUrl,
      twitterImageAlt: () => t('site.meta.ogImageAlt'),
    })
  },
}
</script>

<style>
@import '~/assets/site.css';
</style>
