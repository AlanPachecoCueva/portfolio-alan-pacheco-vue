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
import { useTheme } from '@/composables/useTheme';

export default {
  name: "GeneralView",
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
      ...useTheme(),
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

/* ── md: 960–1279px ── */
@media (max-width: 1279px) {
  .cardsContainer {
    margin: 5% 5% 5% 5%;
  }
}

/* ── sm: 600–959px ── */
@media (max-width: 959px) {
  .cardsContainer {
    flex-direction: column;
    align-items: center;
    margin: 5% 0 60px 0;
    height: auto;
  }

  .card {
    width: 75%;
    height: 90px;
    margin: 0 0 16px 0;
  }
}

/* ── xs: < 600px ── */
@media (max-width: 599px) {
  .cardsContainer {
    flex-direction: column;
    align-items: center;
    margin: 5% 0 100px 0;
    width: 100%;
    height: auto;
  }

  .card {
    width: 85%;
    height: 90px;
    margin: 0 0 20px 0;
  }
}
</style>
