<template>
  <div class="general-container">
    <HomeView id="home-view"></HomeView>
    <br />
    <div class="cardsContainer">
      <CardComponent
        class="card"
        url=""
        icon_name="marketeq:reward"
        :title="$t('Card_Achievements')"
        content=""
        :style="{ backgroundColor: getAuxiliarColor() }"
      ></CardComponent>
      <CardComponent
        class="card"
        url="#projects-view"
        icon_name="icon-park:file-code"
        :title="$t('Card_Projects')"
        content=""
        :style="{ backgroundColor: getAuxiliarColor() }"
      ></CardComponent>
      <CardComponent
        class="card"
        @click="goToGallery"
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
  </div>
</template>

<script>
import HomeView from "../views/Home_View.vue";
import CardComponent from "../components/utils/Card_Component.vue";
import AboutView from "../views/About_View.vue";
import SkillsView from "../views/Skills_View.vue";
import ProjectsComponent from "../components/utils/Projects_Component.vue";
import ContactView from "../views/Contact_View.vue";

import { useProjectStore } from "../plugins/stores/projectsStore.js";

export default {
  name: "GeneralView", // Nombre del componente
  components: {
    HomeView,
    CardComponent,
    AboutView,
    SkillsView,
    ProjectsComponent,
    ContactView,
  },
  data() {
    return {};
  },
  methods: {
    goToGallery() {
      this.$router.push({ name: "Gallery" });
    },
  },
  setup() {
    const projectStore = useProjectStore();
    const projects = projectStore.getAllProjects;

    return {
      projects,
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

@media (max-width: 400px) {
  .general-container {
/*    

    background-color: red; */
  }

  .cardsContainer {
    flex-direction: column;
    margin: 5% 0% 100px 0%;

    justify-content: space-around;
    align-items: center;
    width: 100% !important;
    height: 7% !important;
  }

  .card {
    width: 80%;
    height: 90px;
    margin: 0 0 20px 0;
  }
}
</style>
