import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
// Solo los componentes que se usan (hoy solo VApp, en layouts/site.vue).
// Importar 'vuetify/components' completo metía ~100 componentes en el bundle.
// Al usar un componente nuevo de Vuetify, agregarlo aquí.
import { VApp } from 'vuetify/components/VApp'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: { VApp },
    theme: {
      defaultTheme: 'dark',
      themes: {
        light: {
          dark: false,
          colors: {
            header: '#ffffff',
            hero: '#AFAFAF',
            primary: '#E7E4E4',
            secondary: '#545454',
            text: '#000',
            textAuxiliar: '#8a8888',
            contrast: '#000',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            auxiliar: '#f0eeee',
            alternativeButtoncolor: '#E58818',
            // Paleta C · Violeta moderno (DA-010, docs/diseno-thecodesolutions/README.md).
            // Tokens de las páginas nuevas de TheCodeSolutions; los de arriba son del portafolio
            // y se eliminan cuando todas las páginas usen estos.
            'tcs-bg': '#FFFFFF',
            'tcs-surface': '#F5F4FA',
            'tcs-text': '#16141F',
            'tcs-muted': '#5A5768',
            'tcs-border': '#E3E1EC',
            'tcs-accent': '#6D4AFF',
            'tcs-on-accent': '#FFFFFF',
            'tcs-accent-text': '#5B39E8',
            'tcs-accent-soft': '#ECE7FF',
            'tcs-secondary': '#0B7A7A',
          },
        },
        dark: {
          dark: true,
          colors: {
            header: '#545454',
            hero: '#DFDFDF',
            primary: '#000',
            secondary: '#ffffff',
            text: '#ffffff',
            textAuxiliar: '#d1c9c9',
            contrast: '#fff',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            auxiliar: '#1c1c1c',
            alternativeButtoncolor: '#E58818',
            'tcs-bg': '#0E0D14',
            'tcs-surface': '#17151F',
            'tcs-text': '#F2F1F7',
            'tcs-muted': '#A6A3B5',
            'tcs-border': '#2A2736',
            'tcs-accent': '#8F75FF',
            'tcs-on-accent': '#0E0D14',
            'tcs-accent-text': '#AA97FF',
            'tcs-accent-soft': '#231D3D',
            'tcs-secondary': '#3FD0C9',
          },
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
