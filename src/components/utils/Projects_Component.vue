<template>
  <div class="container">
    <!-- Primer ítem, el menú o encabezado -->
    <div class="menu-item" :style="{ color: getTextColor() }">
      <div class="menu-content">
        <div class="menu-content-left">
          <p>{{ $t("Project_Flag") }}</p>
          <div
            class="single-line"
            :style="{ backgroundColor: getHeroColor() }"
          ></div>
        </div>
        <div class="menu-content-right">
          <p class="menu-title">{{ $t("Project_Title") }}</p>
          <p class="menu-description">
            {{ $t("Project_Paragraph") }}
          </p>
          <div class="menu-links">
            <a href="#">{{ $t("Project_Button_All") }}</a> /
            <a href="#">{{ $t("Project_Button_Web") }}</a> /
            <a href="#">{{ $t("Project_Button_AI") }}</a> /
            <a href="#">{{ $t("Project_Button_Mobile") }}</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Los demás ítems -->
    <div
      class="item"
      v-for="item in items"
      :key="item.id"
      :style="{
        backgroundColor: getPrimaryColor(),
        gridColumn: `span ${item.columns}`, // Define cuántas columnas ocupa
        gridRow: `span ${item.rows}`, // Define cuántas filas ocupa
      }"
      @click="goToProject(item)"
    >
      <div class="overlay">
        <img
          class="item-image"
          :src="require(`@/assets/${item.image}`)"
          alt="img home"
        />
        <div class="item-info">
          <div class="item-title">{{ item.title }}</div>
          <div class="item-date">{{ $t(item.date) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Projects_Component",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    goToProject(project) {
      this.$router.push({ name: "Project", params: { id: project.title } });
    },
  },
};
</script>

<style scoped>
.single-line {
  margin-top: 20px;
  width: 3px;
  height: 60px;
}

/* Primer ítem, el menú */
/* .menu-item {
  grid-column: span 2; 
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 20px;
} */

.menu-content {
  text-align: left;
  display: flex;
  flex-direction: row;
}

.menu-content-left {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;
  padding: 20px 10px 10px 0px;
}

.menu-content-left p {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.menu-title {
  font-size: 2em;
  margin-bottom: 10px;
}

.menu-description {
  font-size: 1.2em;
  margin-bottom: 20px;
  max-width: 80%;
}

.menu-links a {
  text-decoration: none;
  color: inherit;
  margin-right: 10px;
  font-weight: bold;
}

.menu-links a:hover {
  color: #f39c12;
}

.menu-links a:hover {
  text-decoration: underline;
}
.container {
  display: grid;
  grid-template-columns: repeat(4, minmax(300px, 1fr));
  grid-auto-flow: dense; /* Evita huecos en la disposición del grid */
  gap: 20px;
  padding: 20px;
  margin: 5% 5% 5% 5%;
  grid-auto-flow: dense;
}

.menu-item {
  grid-column: span 2; /* Ocupará dos columnas */
  height: 300px; /* Mayor altura para diferenciarlo */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* grid-column: 1 / 3; */
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

/* Estilos responsivos */
@media (max-width: 400px) {
  .container {
    display: flex;
    flex-direction: column;

    width: 100vw !important;
    height: fit-content !important;
    margin: 0% 0px !important;
    padding: 20px;
  }

  .item {
    height: auto; /* Permite que los ítems se ajusten automáticamente */
    max-height: 300px;
    /* Esta línea permitió que se ajusten los widths automáticamente de las rows */
    margin: 20px 0px;
  }

  .menu-item {
    grid-column: span 1;
    height:fit-content;
  }

  .menu-title {
    font-size: 1.5em;
  }

  .menu-description {
    font-size: 10px;
  }
}
</style>
