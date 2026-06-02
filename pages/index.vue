<template>
  <main class="general-container">
    <HomeView id="home-view"></HomeView>
    <br />
    <div class="cardsContainer">
      <CardComponent
        class="card"
        route-name="achievements"
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
        route-name="gallery"
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
  </main>
</template>

<script>
import HomeView from '~/src/views/Home_View.vue'
import CardComponent from '~/components/utils/Card_Component.vue'
import AboutView from '~/src/views/About_View.vue'
import SkillsView from '~/src/views/Skills_View.vue'
import ProjectsComponent from '~/components/utils/Projects_Component.vue'
import ContactView from '~/src/views/Contact_View.vue'
import { usePublishedProjects } from '~/composables/useProjects.js'
import { useTheme } from '~/composables/useTheme'

export default {
  name: 'IndexPage',
  components: {
    HomeView,
    CardComponent,
    AboutView,
    SkillsView,
    ProjectsComponent,
    ContactView,
  },
  setup() {
    useHead({ title: 'Portfolio Alan Pacheco — Software Engineer' })
    const { projects } = usePublishedProjects()
    return {
      projects,
      ...useTheme(),
    }
  },
}
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

@media (max-width: 1279px) {
  .cardsContainer {
    margin: 5% 5% 5% 5%;
  }
}

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
