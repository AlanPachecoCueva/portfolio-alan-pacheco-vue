<template>
  <div class="container">
    <!-- Primer ítem, el menú o encabezado -->
    <div class="item menu-item" :style="{ color: getTextColor() }">
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
      :style="{ backgroundColor: getPrimaryColor() }"
    >
      <div class="overlay">
        <img class="item-image" :src="item.image" alt="img home" />
        <div class="item-info">
          <div class="item-title">{{ item.title }}</div>
          <div class="item-date">{{ item.date }}</div>
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
  methods: {},
};
</script>

<style scoped>
.single-line {
  margin-top: 20px;
  width: 3px;
  height: 60px;
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;

  margin: 5% 5% 5% 5%;
}

/* Primer ítem, el menú */
.menu-item {
  grid-column: span 2; /* Ocupará dos columnas */
  height: 300px; /* Mayor altura para diferenciarlo */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 20px;
}

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
  /* background-color: aqua; */
  /* margin: 0px 5px 0px 5px; */
  height: 100%;

  padding: 20px 10px 10px 0px;
}

.menu-content-left p {
  writing-mode: vertical-rl;
  /* Orientación vertical, de derecha a izquierda */
  transform: rotate(180deg);
}

.menu-title {
  font-size: 2em;
  margin-bottom: 10px;
}

.menu-description {
  font-size: 1.2em;
  margin-bottom: 20px;
  max-width: 80%; /* Controlar el ancho del texto */
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

/* Ítems regulares */
.item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.item:hover {
  transform: translateY(-10px); /* Efecto hover */
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.item:hover .item-image {
  transform: scale(1.1); /* Zoom en la imagen al hover */
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
  transition: all 0.3s ease; /* Suaviza la animación */
}

.item:hover .item-info {
  opacity: 1;
  transform: translateY(0); /* La información sube al hover */
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
@media (max-width: 600px) {
  .menu-item {
    grid-column: span 1; /* Ocupará solo una columna en pantallas pequeñas */
    height: auto;
  }

  .menu-title {
    font-size: 1.5em;
  }

  .menu-description {
    font-size: 1em;
  }

  .container {
    gap: 10px;
  }
}
</style>
