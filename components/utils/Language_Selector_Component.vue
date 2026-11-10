<template>
  <v-select
    v-model="currentLanguage"
    :items="languages"
    item-title="title"
    item-value="value"
    aria-label="Idioma / Language"
    class="language-select"
    hide-details
  ></v-select>
</template>

<script>
export default {
  name: "Language_Selector_Component",
  data() {
    return {
      languages: [
        { title: "ES", value: "es" },
        { title: "EN", value: "en" },
      ],
    };
  },
  computed: {
    // Refleja el idioma de la URL (/ o /en/...). setLocale navega a la ruta del otro idioma.
    currentLanguage: {
      get() {
        return this.$i18n.locale;
      },
      set(value) {
        this.$i18n.setLocale(value);
      },
    },
  },
};
</script>

<style scoped>
.language-select {
  width: 85px; /* Ajusta el ancho según sea necesario */
  font-size: 0.75rem; /* Reduce el tamaño del texto */
}
@media (max-width: 599px) {
  .language-select {
    width: 65px;
  }
}

.language-select .v-select__selections {
  font-weight: normal; /* Ajusta el peso de la fuente */
  text-transform: none; /* Desactiva la transformación del texto */
}

.language-select .v-select__slot {
  border-radius: 4px; /* Reduce el radio del borde */
}

.language-select .v-select__menu {
  font-size: 0.75rem; /* Reduce el tamaño del texto del menú desplegable */
}
</style>
