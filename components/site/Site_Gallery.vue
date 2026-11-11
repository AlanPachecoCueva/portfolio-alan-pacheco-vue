<template>
  <div>
    <!-- Mosaico: columnas y filas de cada imagen vienen del admin (imageUrls[].columns/rows) -->
    <ul class="gallery">
      <li
        v-for="(img, i) in images"
        :key="img.url"
        class="gallery__item"
        :style="{ gridColumn: `span ${clamp(img.columns)}`, gridRow: `span ${clamp(img.rows)}` }"
      >
        <button type="button" class="gallery__btn" :aria-label="$t('site.project.enlarge', { n: i + 1 })" @click="open(i)">
          <img :src="img.url" :alt="img.alt || $t('site.project.imageAlt', { name, n: i + 1 })" loading="lazy" decoding="async" width="600" height="400" />
        </button>
      </li>
    </ul>

    <Teleport to="body">
      <div
        v-if="current !== null"
        class="viewer"
        role="dialog"
        aria-modal="true"
        :aria-label="$t('site.project.viewer')"
        @click.self="close"
        @keydown.esc="close"
        @keydown.left="prev"
        @keydown.right="next"
      >
        <button ref="closeBtn" type="button" class="viewer__btn viewer__close" :aria-label="$t('site.project.close')" @click="close">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12 M18 6L6 18" /></svg>
        </button>
        <img :src="images[current].url" :alt="images[current].alt || $t('site.project.imageAlt', { name, n: current + 1 })" class="viewer__img" />
        <div class="viewer__nav">
          <button type="button" class="viewer__btn" :aria-label="$t('site.project.prev')" @click="prev">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <span aria-live="polite">{{ current + 1 }} / {{ images.length }}</span>
          <button type="button" class="viewer__btn" :aria-label="$t('site.project.next')" @click="next">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
export default {
  name: 'Site_Gallery',
  props: {
    images: { type: Array, default: () => [] },
    name: { type: String, default: '' },
  },
  data() {
    return { current: null, lastFocus: null }
  },
  methods: {
    clamp(n) {
      return Math.min(Math.max(Number(n) || 1, 1), 4)
    },
    open(i) {
      this.lastFocus = document.activeElement
      this.current = i
      document.body.style.overflow = 'hidden'
      this.$nextTick(() => this.$refs.closeBtn?.focus())
    },
    close() {
      this.current = null
      document.body.style.overflow = ''
      this.lastFocus?.focus?.()
    },
    prev() {
      this.current = (this.current - 1 + this.images.length) % this.images.length
    },
    next() {
      this.current = (this.current + 1) % this.images.length
    },
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  },
}
</script>

<style scoped>
.gallery {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: 140px;
  gap: 12px;
}

@media (max-width: 700px) {
  .gallery {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: 120px;
  }

  .gallery__item {
    grid-column: span 2 !important;
    grid-row: span 2 !important;
  }
}

.gallery__btn {
  width: 100%;
  height: 100%;
  padding: 0;
  border: 1px solid rgb(var(--v-theme-tcs-border));
  border-radius: 12px;
  overflow: hidden;
  background: rgb(var(--v-theme-tcs-surface));
  cursor: zoom-in;
}

.gallery__btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.viewer {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 24px;
  background: rgba(8, 9, 12, 0.9);
  color: #fff;
}

.viewer__img {
  max-width: min(1100px, 100%);
  max-height: 78vh;
  object-fit: contain;
  border-radius: 12px;
}

.viewer__nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.viewer__btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 0;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  cursor: pointer;
}

.viewer__close {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
