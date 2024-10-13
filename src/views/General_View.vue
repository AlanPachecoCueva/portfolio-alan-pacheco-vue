<template>
  <HomeView id="home-view"></HomeView>
  <br />
  <div class="cardsContainer">
    <CardComponent
      class="card"
      url="http://www.google.com"
      icon_name="marketeq:reward"
      :title="$t('Card_Achievements')"
      content=""
      :style="{ backgroundColor: getAuxiliarColor() }"
    ></CardComponent>
    <CardComponent
      class="card"
      url="http://www.google.com"
      icon_name="icon-park:file-code"
      :title="$t('Card_Projects')"
      content=""
      :style="{ backgroundColor: getAuxiliarColor() }"
    ></CardComponent>
    <CardComponent
      class="card"
      url="http://www.google.com"
      icon_name="marketeq:gallery-collections"
      :title="$t('Card_Galery')"
      content=""
      :style="{ backgroundColor: getAuxiliarColor() }"
    ></CardComponent>
  </div>
  <br />
  <AboutView id="about-view"></AboutView>
  <SkillsView id="skills-view"></SkillsView>
  <ProjectsComponent :items="projects" id="projects-view"></ProjectsComponent>
  <ContactView id="contact-view"></ContactView>
</template>

<script>
import HomeView from "../views/Home_View.vue";
import CardComponent from "../components/utils/Card_Component.vue";
import AboutView from "../views/About_View.vue";
import SkillsView from "../views/Skills_View.vue";
import ProjectsComponent from "../components/utils/Projects_Component.vue";
import ContactView from "../views/Contact_View.vue";

export default {
  name: "GeneralView", // Nombre del componente
  components: {
    HomeView,
    CardComponent,
    AboutView,
    SkillsView,
    ProjectsComponent,
    ContactView
  },
  data() {
    return {
      projects: [
        {
          title: "KVMI Rewards",
          description: "Plataforma de recompensas para una empresa chocolatera, integrada con inteligencia artificial para la creación de campañas publicitarias personalizadas, que permite generar afiches, banners y slogans, y ofrece un sistema para gestionar campañas y premios.",
          date: "Marzo 2024",
          image: "https://media.licdn.com/dms/image/v2/C5612AQFz2jYSPYu8hw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1628894163030?e=1732752000&v=beta&t=RHOsnV2MQpOP2n9IQwg7Uv-n6Aj_sNy_8Y3vfEnww50",
          url: "url 1"
        },
        {
          title: "Guru Project",
          description: "Plataforma de gestión de proyectos que facilita la planificación, asignación de tareas, y coordinación de equipos, permitiendo un control eficiente del progreso y rendimiento de los miembros.",
          date: "Julio 2023",
          image: "https://media.licdn.com/dms/image/v2/C5612AQFz2jYSPYu8hw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1628894163030?e=1732752000&v=beta&t=RHOsnV2MQpOP2n9IQwg7Uv-n6Aj_sNy_8Y3vfEnww50",
          url: "url 2"
        },
        {
          title: "CowID",
          description: "Aplicación móvil para la gestión completa del ganado, proporcionando herramientas para el seguimiento de enfermedades, control de gastos en alimentación, y otros aspectos clave de la administración del ganado.",
          date: "Enero 2023",
          image: "https://media.licdn.com/dms/image/v2/C5612AQFz2jYSPYu8hw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1628894163030?e=1732752000&v=beta&t=RHOsnV2MQpOP2n9IQwg7Uv-n6Aj_sNy_8Y3vfEnww50",
          url: "url 4"
        },
        {
          title: "Mikhuna Ecuador",
          description: "Sitio web para compartir y descubrir recetas de cocina, donde los usuarios pueden calificar, comentar y seguir sus recetas favoritas, creando una comunidad culinaria interactiva.",
          date: "Marzo 2022",
          image: "https://media.licdn.com/dms/image/v2/C5612AQFz2jYSPYu8hw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1628894163030?e=1732752000&v=beta&t=RHOsnV2MQpOP2n9IQwg7Uv-n6Aj_sNy_8Y3vfEnww50",
          url: "url 3"
        },
      ],
    };
  },
};
</script>

<style scoped>
.cardsContainer {
  display: flex;
  flex-direction: row;
  margin: 5% 10% 5% 10%;

  justify-content: space-between;
}

.card {
  width: 30%;
  height: 110px;
}
</style>
