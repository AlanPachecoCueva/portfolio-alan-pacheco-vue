// src/mixins/themeMixin.js
export default {
  methods: {
    getPrimaryColor() {
      const theme = this.$vuetify.theme.current;
      return theme.colors.primary;
    },
    getSecondaryColor() {
      const theme = this.$vuetify.theme.current;
      return theme.colors.secondary;
    },
    getHeaderColor() {
      const theme = this.$vuetify.theme.current;
      return theme.colors.header;
    },
    getHeroColor() {
      const theme = this.$vuetify.theme.current;
      return theme.colors.hero;
    },
    getContrastColor() {
      const theme = this.$vuetify.theme.current;
      return theme.colors.contrast;
    },
    getBackgroundColor() {
      const theme = this.$vuetify.theme.current;
      return theme.colors.primary;
    },
    getTextColor() {
      const theme = this.$vuetify.theme.current;
      return theme.colors.text;
    },
    getTextAuxiliarColor() {
      const theme = this.$vuetify.theme.current;
      return theme.colors.textAuxiliar;
    },
    getAuxiliarColor() {
      const theme = this.$vuetify.theme.current;
      return theme.colors.auxiliar;
    },
    getAlternativeButtonColor(){
      const theme = this.$vuetify.theme.current;
      return theme.colors.alternativeButtoncolor;
    }
  },
};
