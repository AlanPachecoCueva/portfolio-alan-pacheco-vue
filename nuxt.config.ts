// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: true,

  modules: [
    '@nuxtjs/i18n',
  ],

  // DA-011: español en "/" y la versión en inglés indexable en "/en/...".
  // useLocaleHead (layouts/default.vue) genera hreflang, canonical y og:locale por página.
  i18n: {
    locales: [
      { code: 'es', language: 'es-EC', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    baseUrl: 'https://thecodesolutions.com',
    langDir: 'locales/',
    // Sin detección automática: en el sitio estático cambiaba los textos al idioma del navegador
    // sin cambiar la URL (página en "/" con textos en inglés). Cada URL muestra siempre su idioma
    // y el visitante cambia con el selector (DA-011).
    detectBrowserLanguage: false,
  },

  runtimeConfig: {
    public: {
      firebaseApiKey:            process.env.VITE_FIREBASE_API_KEY,
      firebaseAuthDomain:        process.env.VITE_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId:         process.env.VITE_FIREBASE_PROJECT_ID,
      firebaseStorageBucket:     process.env.VITE_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId:             process.env.VITE_FIREBASE_APP_ID,
      emailjsServiceId:          process.env.VITE_EMAILJS_SERVICE_ID,
      emailjsTemplateId:         process.env.VITE_EMAILJS_TEMPLATE_ID,
      emailjsPublicKey:          process.env.VITE_EMAILJS_PUBLIC_KEY,
    },
  },

  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/', '/gallery', '/achievements', '/en', '/en/gallery', '/en/achievements'],
      ignore: ['/admin', '/admin/**'],
    },
  },

  css: [
    '@mdi/font/css/materialdesignicons.css',
    'vuetify/styles',
  ],

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      charset: 'utf-8',
      viewport: 'width=device-width,initial-scale=1.0',
      // Valores por defecto: cada página pública define los suyos con useSeoMeta por idioma.
      title: 'TheCodeSolutions — Software a medida en Quito, Ecuador',
      meta: [
        { name: 'google-site-verification', content: '9AXAGLhC7HPco0ggKSwRYMFdeMJ5Vf5qtcrDCuN9GTQ' },
        { name: 'description', content: 'TheCodeSolutions desarrolla software a medida en Quito, Ecuador: sitios y apps web, apps móviles, soluciones con IA, sistemas a medida y consultoría.' },
        { name: 'theme-color', content: '#6D4AFF' },
        // Open Graph
        { property: 'og:site_name', content: 'TheCodeSolutions' },
        { property: 'og:title', content: 'TheCodeSolutions — Software a medida' },
        { property: 'og:description', content: 'Desarrollo web, apps móviles, soluciones con IA, sistemas a medida y consultoría desde Quito, Ecuador.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://thecodesolutions.com/ThecodesolutionsPreview.png' },
        { property: 'og:image:width', content: '2349' },
        { property: 'og:image:height', content: '1355' },
        // Twitter Cards
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'TheCodeSolutions — Software a medida' },
        { name: 'twitter:description', content: 'Desarrollo web, apps móviles, soluciones con IA, sistemas a medida y consultoría desde Quito, Ecuador.' },
        { name: 'twitter:image', content: 'https://thecodesolutions.com/ThecodesolutionsPreview.png' },
      ],
      link: [
        // Logo 3 "llaves con núcleo" (DA-010); el .ico queda para navegadores sin soporte SVG
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          // Empresa + fundador + sitio. Contacto provisional (DA-009) hasta tener correo corporativo.
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'ProfessionalService',
                '@id': 'https://thecodesolutions.com/#organization',
                name: 'TheCodeSolutions',
                url: 'https://thecodesolutions.com',
                logo: 'https://thecodesolutions.com/logo-tcs.svg',
                image: 'https://thecodesolutions.com/ThecodesolutionsPreview.png',
                description: 'Desarrollo de software a medida: web, apps móviles, soluciones con IA, sistemas a medida y consultoría.',
                email: 'alan.pacheco.dev@gmail.com',
                telephone: '+593962163336',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Quito',
                  addressCountry: 'EC',
                },
                areaServed: 'EC',
                knowsLanguage: ['es', 'en'],
                founder: { '@id': 'https://thecodesolutions.com/#alan-pacheco' },
              },
              {
                '@type': 'Person',
                '@id': 'https://thecodesolutions.com/#alan-pacheco',
                name: 'Alan Pacheco Cueva',
                alternateName: 'Alan Pacheco',
                jobTitle: 'Fundador y líder técnico',
                worksFor: { '@id': 'https://thecodesolutions.com/#organization' },
                image: 'https://thecodesolutions.com/About-Image.webp',
                sameAs: [
                  'https://ec.linkedin.com/in/alan-pacheco-cueva-b7b3a9223',
                  'https://github.com/AlanPachecoCueva',
                ],
                knowsAbout: ['Vue.js', 'JavaScript', 'TypeScript', 'C#', '.NET', 'Java', 'Python', 'Firebase'],
              },
              {
                '@type': 'WebSite',
                '@id': 'https://thecodesolutions.com/#website',
                url: 'https://thecodesolutions.com',
                name: 'TheCodeSolutions',
                inLanguage: ['es-EC', 'en-US'],
                publisher: { '@id': 'https://thecodesolutions.com/#organization' },
              },
            ],
          }),
        },
      ],
    },
  },
})
