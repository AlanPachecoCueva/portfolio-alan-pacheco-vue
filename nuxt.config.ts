// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: true,

  modules: [
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: [
      { code: 'ES', language: 'es-EC', file: 'es.json' },
      { code: 'EN', language: 'en-US', file: 'en.json' },
    ],
    defaultLocale: 'ES',
    strategy: 'no_prefix',
    langDir: 'locales/',
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
      routes: ['/', '/gallery', '/achievements'],
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
      title: 'Portfolio Alan Pacheco',
      meta: [
        { name: 'google-site-verification', content: '9AXAGLhC7HPco0ggKSwRYMFdeMJ5Vf5qtcrDCuN9GTQ' },
        { name: 'description', content: 'Portafolio profesional de Alan Pacheco, Ingeniero de Software en Quito, Ecuador. Proyectos en Vue.js, C#, .NET, JavaScript y más.' },
        // Open Graph
        { property: 'og:title', content: 'Portfolio Alan Pacheco — Software Engineer' },
        { property: 'og:description', content: 'Portafolio profesional de Alan Pacheco, Ingeniero de Software en Quito, Ecuador. Proyectos en Vue.js, C#, .NET, JavaScript y más.' },
        { property: 'og:url', content: 'https://thecodesolutions.com/' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://thecodesolutions.com/ThecodesolutionsPreview.png' },
        { property: 'og:image:width', content: '2349' },
        { property: 'og:image:height', content: '1355' },
        { property: 'og:locale', content: 'es_EC' },
        // Twitter Cards
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Portfolio Alan Pacheco — Software Engineer' },
        { name: 'twitter:description', content: 'Portafolio profesional de Alan Pacheco, Ingeniero de Software en Quito, Ecuador. Proyectos en Vue.js, C#, .NET, JavaScript y más.' },
        { name: 'twitter:image', content: 'https://thecodesolutions.com/ThecodesolutionsPreview.png' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://thecodesolutions.com/' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Alan Pacheco',
            alternateName: 'Alan Pacheco Cueva',
            jobTitle: 'Software Engineer',
            url: 'https://thecodesolutions.com',
            image: 'https://thecodesolutions.com/About-Image.webp',
            sameAs: [
              'https://ec.linkedin.com/in/alan-pacheco-cueva-b7b3a9223',
              'https://github.com/AlanPachecoCueva',
            ],
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Quito',
              addressCountry: 'EC',
            },
            knowsAbout: ['Vue.js', 'JavaScript', 'TypeScript', 'C#', '.NET', 'Java', 'Python', 'Firebase'],
          }),
        },
      ],
    },
  },
})
