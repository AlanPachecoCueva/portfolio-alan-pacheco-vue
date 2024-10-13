// src/plugins/vuetify.js
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
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
          auxiliar: '#ffffff',
          alternativeButtoncolor: '#E58818',
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
          auxiliar: '#373636',
          alternativeButtoncolor: '#E58818',
        },
      },
    },
  },
});
