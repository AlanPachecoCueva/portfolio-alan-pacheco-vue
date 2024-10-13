<template>
  <div class="container">
    <div class="item" v-for="item in items" :key="item.id" :style="{ backgroundColor: getPrimaryColor() }">
      <Icon class="icon_grid" :icon="item.icon" />
    </div>
  </div>
</template>

<script>
export default {
  // Aquí van las opciones del componente
  name: "Grid_Component", // Nombre del componente
  components: {},
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    // Datos reactivos del componente
    return {
      message: "Hello, Vue 3!",
    };
  },
  methods: {
    // Métodos del componente
  },
  computed: {
    // Propiedades computadas
  },
  mounted() {
    // Hook de ciclo de vida
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
  gap: 15px;
}

.item {

  /* background-color: rgba(85, 84, 84, 0.5); */
  border-radius: 8px;
  /* padding: 20px; */
  text-align: center;
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */

  width: 5em;
  height: 5em;

  position: relative;
}

.item i {
  font-size: 40px;
  /* margin-bottom: 10px; */
}

.item h3 {
  margin: 0;
  font-size: 18px;
}

.icon_grid {
  width: 3em;
  height: 3em;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centra el elemento */
}
</style>
