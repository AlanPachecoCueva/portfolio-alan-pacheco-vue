<template>
  <main>
    <div v-if="loading" style="padding: 60px; text-align: center; color: #888;">{{ $t('Project_Loading') }}</div>
    <div v-else class="bigContainer_Project">
      <div class="infoContainer">
        <div class="flagContainer">
          <div class="single-line" :style="{ backgroundColor: getHeroColor() }"></div>
          <p>{{ project.technology }}</p>
        </div>

        <h2>{{ $i18n.locale === 'EN' ? (project.title_en || project.title) : project.title }}</h2>
        <p id="project_description">{{ $i18n.locale === 'EN' ? project.description_en : project.description_es }}</p>

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
      </div>

      <div class="imagesContainer">
        <div
          class="item"
          v-for="(image, i) in project.imageUrls"
          :key="i"
          :style="{
            backgroundColor: getPrimaryColor(),
            gridColumn: `span ${image.columns || 1}`,
            gridRow: `span ${image.rows || 1}`,
          }"
        >
          <div class="overlay">
            <img
              class="item-image"
              :src="image.url"
              :alt="project.title || 'Project image'"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getProject } from '~/utils/firebase/projects.js'
import { useTheme } from '~/composables/useTheme'

export default {
  name: 'ProjectPage',
  setup() {
    const route = useRoute()
    const project = ref({ imageUrls: [], relatedTechnologies: [] })
    const loading = ref(true)

    if (process.client) {
      getProject(route.params.id).then((data) => {
        if (data) {
          project.value = data
          useHead({ title: `${data.title} | Portfolio Alan Pacheco` })
        }
        loading.value = false
      })
    }

    return {
      project,
      loading,
      ...useTheme(),
    }
  },
  methods: {
    generateAlternativeGradientStyle() {
      return {
        background: `linear-gradient(to right, ${this.getAlternativeButtonColor()} 50%, #CACACA 50%)`,
        backgroundSize: `200% 100%`,
      }
    },
  },
}
</script>

<style scoped>
@media (max-width: 400px) {
  .bigContainer_Project {
    flex-direction: column;
    padding: 30px 0px 0px 0px !important;
  }
  .infoContainer {
    width: 100% !important;
    height: fit-content !important;
    justify-content: space-evenly !important;
    padding: 0px 5% 0px 5% !important;
  }
  .infoContainer h2 {
    margin: 15px 0px 5px 0px;
  }
  #project_description {
    margin: 5px 0px 15px 0px;
  }
  .imagesContainer {
    width: 100% !important;
    display: flex !important;
    flex-direction: row;
    flex-wrap: wrap !important;
    justify-content: center;
  }
  .item {
    max-height: 40vh !important;
  }
}

.bigContainer_Project {
  display: flex;
  padding: 0px 5% 0px 5%;
}

.infoContainer {
  width: 30%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.imagesContainer {
  width: 70%;
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  grid-auto-flow: dense;
  gap: 20px;
  padding: 20px;
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

.item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: auto;
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
</style>
