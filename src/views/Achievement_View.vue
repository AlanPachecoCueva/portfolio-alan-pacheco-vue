<template>
  <main class="achievement-page">
    <div v-if="loading" class="state-msg">{{ $t('Achievement_Loading') }}</div>
    <div v-else-if="error" class="state-msg">{{ $t('Achievement_Error') }}</div>
    <div v-else class="achievement-grid">

      <!-- Panel de info — col 1, span calculado por JS -->
      <div class="info-panel" ref="infoPanel">
        <router-link :to="{ name: 'Achievements' }" class="back-link">{{ $t('Achievement_Back') }}</router-link>

        <div class="flag">
          <div class="flag-line" :style="{ backgroundColor: getHeroColor() }"></div>
          <span class="flag-text">{{ achievement.issuer }}</span>
        </div>

        <h2 class="achievement-title">{{ $i18n.locale === 'EN' ? (achievement.title_en || achievement.title) : achievement.title }}</h2>

        <p class="achievement-description">
          {{ $i18n.locale === 'EN' ? achievement.description_en : achievement.description_es }}
        </p>

        <a
          v-if="achievement.link"
          :href="achievement.link"
          target="_blank"
          rel="noopener"
          class="cert-link"
        >{{ $t('Achievement_Certificate') }}</a>
      </div>

      <!-- Imágenes con masonry JS — igual que Gallery_View -->
      <div
        v-for="(image, i) in allImages"
        :key="i"
        class="grid-img-wrap"
        :ref="el => { if (el) imageWrapRefs[i] = el; else delete imageWrapRefs[i] }"
      >
        <img
          :src="image.url"
          class="grid-img"
          :alt="achievement.title || 'Achievement image'"
          @load="onImageLoad($event, i)"
        />
      </div>

    </div>
  </main>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getAchievement } from '@/firebase/achievements.js'
import { useTheme } from '@/composables/useTheme'

const ROW_UNIT = 10

export default {
  name: 'Achievement_View',
  setup() {
    const route = useRoute()
    const achievement = ref({ imageUrls: [] })
    const loading = ref(true)
    const error = ref(false)
    const imageWrapRefs = {}

    getAchievement(route.params.id)
      .then((data) => {
        if (data) {
          achievement.value = data
          document.title = `${data.title} | Portfolio Alan Pacheco`
        }
        loading.value = false
      })
      .catch(() => {
        error.value = true
        loading.value = false
      })

    const allImages = computed(() => {
      const imgs = []
      const thumb = achievement.value.thumbnailUrl
      if (thumb) imgs.push({ url: thumb })
      const extras = achievement.value.imageUrls || []
      extras.forEach((img) => {
        if (img.url && img.url !== thumb) imgs.push(img)
      })
      return imgs
    })

    return {
      achievement,
      loading,
      error,
      allImages,
      imageWrapRefs,
      ...useTheme(),
    }
  },
  watch: {
    loading(newVal) {
      if (!newVal) {
        this.$nextTick(() => this.recalculateSpans())
      }
    },
  },
  mounted() {
    this._resizeHandler = () => this.recalculateSpans()
    window.addEventListener('resize', this._resizeHandler)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this._resizeHandler)
  },
  methods: {
    recalculateSpans() {
      this.updateInfoPanelSpan()
      Object.keys(this.imageWrapRefs).forEach((i) => {
        const wrapper = this.imageWrapRefs[i]
        if (!wrapper) return
        const img = wrapper.querySelector('img')
        if (!img || !img.complete || !img.naturalWidth) return
        const colWidth = wrapper.offsetWidth
        if (!colWidth) return
        const renderedHeight = Math.round(img.naturalHeight * colWidth / img.naturalWidth)
        const rows = Math.ceil(renderedHeight / ROW_UNIT)
        wrapper.style.gridRowEnd = `span ${rows}`
      })
    },
    updateInfoPanelSpan() {
      const el = this.$refs.infoPanel
      if (!el) return
      // En sm/xs el panel ocupa todo el ancho — dejar que CSS lo maneje
      if (window.innerWidth <= 959) {
        el.style.gridRowEnd = ''
        return
      }
      const rows = Math.ceil(el.scrollHeight / ROW_UNIT)
      el.style.gridRowEnd = `span ${rows}`
    },
    onImageLoad(event, index) {
      const wrapper = this.imageWrapRefs[index]
      if (!wrapper) return
      const imgEl = event.target
      const colWidth = wrapper.offsetWidth
      if (!colWidth) return
      const renderedHeight = Math.round(imgEl.naturalHeight * colWidth / imgEl.naturalWidth)
      const rows = Math.ceil(renderedHeight / ROW_UNIT)
      wrapper.style.gridRowEnd = `span ${rows}`
    },
  },
}
</script>

<style scoped>
.achievement-page {
  padding: 0 5%;
}

.state-msg {
  padding: 60px;
  text-align: center;
  color: #888;
}

/*
  Grid unificado con masonry JS — 5 columnas:
  col 1 = info panel (~260px), cols 2-5 = imágenes (~260px c/u)
  Con grid-auto-flow: dense las imágenes rodean el panel por la
  derecha y por debajo, igual que la galería general.
*/
.achievement-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 10px;
  grid-auto-flow: dense;
  gap: 0;
  margin-top: 5%;
}

/* Panel de info: siempre en columna 1 */
.info-panel {
  grid-column: 1;
  padding: 40px 20px 0 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.back-link {
  font-size: 0.82em;
  color: #888;
  text-decoration: none;
}
.back-link:hover { color: #ccc; }

.flag {
  display: flex;
  align-items: center;
  gap: 12px;
}

.flag-line {
  width: 36px;
  height: 3px;
  flex-shrink: 0;
}

.flag-text {
  font-size: 0.75em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #888;
}

.achievement-title {
  font-size: 1.4em;
  line-height: 1.25;
  margin: 0;
}

.achievement-description {
  font-size: 0.88em;
  line-height: 1.65;
  opacity: 0.8;
  margin: 0;
}

.cert-link {
  font-size: 0.88em;
  font-weight: bold;
  color: #f39c12;
  text-decoration: none;
  display: inline-block;
}
.cert-link:hover { text-decoration: underline; }

/* Imágenes — idéntico a Gallery_View */
.grid-img-wrap {
  position: relative;
  overflow: hidden;
  background-color: #111;
  border: 1px solid #222;
}

.grid-img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.4s ease;
}

.grid-img-wrap:hover .grid-img {
  transform: scale(1.05);
}

/* ── md: 960–1279px → 4 columnas (1 info + 3 imgs) ── */
@media (max-width: 1279px) {
  .achievement-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* ── sm: 600–959px → info full-width arriba, imgs en 3 cols ── */
@media (max-width: 959px) {
  .achievement-page {
    padding: 0 2%;
  }
  .achievement-grid {
    grid-template-columns: repeat(3, 1fr);
    margin-top: 70px;
  }
  .info-panel {
    grid-column: span 3;
    padding: 20px 0;
    gap: 12px;
  }
}

/* ── xs: < 600px → info full-width, imgs en 2 cols ── */
@media (max-width: 599px) {
  .achievement-page {
    padding: 0;
  }
  .achievement-grid {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 62px;
  }
  .info-panel {
    grid-column: span 2;
    gap: 10px;
    padding: 16px 4%;
  }
  .achievement-title {
    font-size: 1.25em;
  }
  .achievement-description {
    font-size: 0.85em;
  }
}
</style>
