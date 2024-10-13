<template>
  <div class="card">
    <div id="card_left_side">
      <Icon class="hero-social-icon" :icon="getIconName()" />
    </div>
    <div id="card_right_side">
      <h2>{{ title }}</h2>
      <p>{{ content }}</p>
    </div>
    <Icon id="arrow" class="hero-social-icon" icon="ep:arrow-right-bold" />
  </div>
</template>

<script>
import { stringifyQuery } from 'vue-router';


export default {
  name: 'CardComponent', // Nombre del componente

  props: {
    url: {
      type: String, // Tipo de la prop
      required: true // Marca la prop como requerida
    },
    title: {
      type: String, // Tipo de la prop
      required: true // Marca la prop como requerida
    },
    content: {
      type: String,
      required: false,
      default: '' // Valor por defecto si no se pasa la prop
    },
    icon_name: {
      type: stringifyQuery,
      required: true,
      default: "token-branded:moon"
    }
  },
  methods: {
    getIconName() {
      let aux = this.icon_name;
      return aux;
    }
  }
};
</script>

<style scoped>
/* Aquí van los estilos específicos del componente */
#arrow{
  width: 22px;
}

.card:hover #arrow{
  color: rgb(113, 111, 111);
}

.card {
  /* border: 1px solid #ccc; */
  padding: 16px;

  display: flex;

  justify-content:space-around;
  align-items: center;

  color: inherit;
  font-size: 16px;
  border-radius: 15px;
  transition: transform 0.2s ease-in-out; /* Para suavizar la animación */
  cursor: pointer; /* Cambia el cursor a pointer */
  box-shadow: 10px black;
}

.card:hover {
  transform: translateY(-10px); /* Hace que el objeto "salte" */
}

.hero-social-icon {

  display: inline-block;
  width: 4em;
  height: 4em;
}
</style>