<template>
    <v-select v-model="currentLanguage" :items="languages" 
        class="language-select"   hide-details></v-select>

</template>

<script>
export default {
    name: "Language_Selector_Component",
    data() {
        return {
            currentLanguage: 'EN',
            languages: [
                'EN',
                'ES'
            ]
        }
    },
    methods: {
    },
    watch: {
        currentLanguage(newValue) {
            console.log("Language changed to: ", newValue);
            this.$i18n.locale = newValue;
        }
    }
}
</script>

<style scoped>
.language-select {
    width: 85px; /* Ajusta el ancho según sea necesario */
    font-size: 0.75rem; /* Reduce el tamaño del texto */
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