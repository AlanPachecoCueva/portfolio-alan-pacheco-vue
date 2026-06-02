<template>
  <main class="gallery-grid">
    <div
      v-for="img in shuffledImages"
      :key="img.id"
      class="gallery-item"
      :style="{ gridColumn: 'span ' + (img.sizeFactor || 1), backgroundColor: getAuxiliarColor(), borderColor: getContrastColor() }"
      :ref="el => { if (el) gridItems[img.id] = el; else delete gridItems[img.id] }"
    >
      <img
        :src="img.url"
        :alt="img.title"
        @load="onImageLoad($event, img)"
      />
      <div class="image-info">
        <h3>{{ img.title }}</h3>
        <p>{{ img.description }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import { useGalleryImages } from '~/composables/useImages.js'
import { useTheme } from '~/composables/useTheme'

const ROW_UNIT = 10

function shuffle(arr) {
  return [...arr]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export default {
  name: 'GalleryPage',
  setup() {
    useHead({ title: 'Gallery | Portfolio Alan Pacheco' })
    const { images } = useGalleryImages()
    return { images, ...useTheme() }
  },
  data() {
    return {
      gridItems: {},
      shuffledImages: [],
    }
  },
  watch: {
    images(newImages) {
      if (this.shuffledImages.length === 0 && newImages.length > 0) {
        this.shuffledImages = shuffle(newImages)
      }
    },
  },
  methods: {
    onImageLoad(event, img) {
      const el = this.gridItems[img.id]
      if (!el) return
      const imgEl = event.target
      const colWidth = el.offsetWidth
      const renderedHeight = Math.round(imgEl.naturalHeight * colWidth / imgEl.naturalWidth)
      const rows = Math.ceil(renderedHeight / ROW_UNIT)
      el.style.gridRowEnd = `span ${rows}`
    },
  },
}
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 10px;
  grid-auto-flow: dense;
  gap: 0;
  margin: 5% 0;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
}

.gallery-item img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.4s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

.image-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.4s ease, transform 0.4s ease;
  padding: 1rem;
}

.gallery-item:hover .image-info {
  opacity: 1;
  transform: translateY(0);
}

.image-info h3 {
  margin: 0 0 4px;
  font-size: 0.95rem;
}

.image-info p {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.85;
}

@media (max-width: 1279px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 959px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 70px;
  }
}

@media (max-width: 599px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 62px;
  }
}
</style>
