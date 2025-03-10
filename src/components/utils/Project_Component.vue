<template>
  <div class="bigContainer_Project">
    <div class="infoContainer">
      <div class="flagContainer">
        <div
          class="single-line"
          :style="{ backgroundColor: getHeroColor() }"
        ></div>
        <p>{{ project.technology }}</p>
      </div>

      <h2>{{ project.title }}</h2>
      <p>{{ $t(project.description) }}</p>

      <div class="relatedTecnologies_container">
        <div
          class="relatedtechnology_item"
          v-for="relatedtechnology in project.relatedTechnologies"
          :key="relatedtechnology"
          :style="generateAlternativeGradientStyle()" 
        >
          <p>{{ relatedtechnology }}</p>
        </div>
      </div>

      <!-- <div>
        <button>PRESS ME</button>
      </div> -->
    </div>

    <div class="imagesContainer">
      <div
        class="item"
        v-for="image in project.images"
        :key="image.name"
        :style="{
          backgroundColor: getPrimaryColor(),
          gridColumn: `span ${image.columns}`, // Define cuántas columnas ocupa
          gridRow: `span ${image.rows}`, // Define cuántas filas ocupa
        }"
      >
        <div class="overlay">
          <img
            class="item-image"
            :src="require(`@/assets/${image.image}`)"
            alt="img home"
          />
          <div class="item-info">
            <div class="item-title">{{ image.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useProjectStore } from "../../plugins/stores/projectsStore.js";

export default {
  name: "Project_Component",
  // created() {
  //   this.project = JSON.parse(this.$route.query.project);
  // },
  methods: {
    generateAlternativeGradientStyle() {
      return {
        background: `linear-gradient(to right, ${this.getAlternativeButtonColor()} 50%,  #CACACA 50%)`,
        backgroundSize: `200% 100%`
      }

    },
  },
  setup() {
    const route = useRoute(); // Obtener el parámetro id de la ruta
    const projectStore = useProjectStore(); // Instancia del store de Pinia

    const projectId = route.params.id; // Obtener el id desde la ruta
    const project = projectStore.getProject(projectId); // Llamar al getter con el id
    console.log("proyecto recibido: ", project);
    return {
      project,
    };
  },
};
</script>

<style scoped>
.bigContainer_Project {
  display: flex;
  padding: 0px 5% 0px 5%;
}

.infoContainer {
  width: 30%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content:space-around;
}

.imagesContainer {
  width: 70%;

  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  grid-auto-flow: dense; /* Evita huecos en la disposición del grid */
  gap: 20px;
  padding: 20px;
  /* margin: 5% 5% 5% 5%; */
  grid-auto-flow: dense;
}

.flagContainer {
  display: flex;
  justify-content: left;
  align-items: center;
}

.single-line {
  width: 60px;
  height: 3px;
  margin-right: 20px;
}

.relatedTecnologies_container {
  display: flex;
  flex-wrap: wrap;
}

.relatedtechnology_item {
  width: fit-content;
  height: fit-content;
  border-radius: 8px;
  margin: 2px;
  padding: 2px 5px 2px 5px;
}

.relatedtechnology_item p {
  font-size: smaller;
  color: white;
}

/* Ítems regulares */
.item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: auto; /* Permite que los ítems se ajusten automáticamente */

  /* Esta línea permitió que se ajusten los widths automáticamente de las rows */
  grid-row-end: span 2;
}

.item:hover {
  transform: translateY(-10px);
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.item:hover .item-image {
  transform: scale(1.1);
}

.overlay {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.item-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.3s ease;
}

.item:hover .item-info {
  opacity: 1;
  transform: translateY(0);
}

.item-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.item-date {
  font-size: 14px;
  color: #ddd;
}

</style>
