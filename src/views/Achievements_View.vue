<template>
  <div class="container">
    <!-- Header item — igual al menu-item de Projects -->
    <div class="menu-item" :style="{ color: getTextColor() }">
      <div class="menu-content">
        <div class="menu-content-left">
          <p>{{ $t('Achievements_Flag') }}</p>
          <div class="single-line" :style="{ backgroundColor: getHeroColor() }"></div>
        </div>
        <div class="menu-content-right">
          <p class="menu-title">{{ $t('Achievements_Title') }}</p>
          <p class="menu-description">{{ $t('Achievements_Paragraph') }}</p>
        </div>
      </div>
    </div>

    <!-- Cards clickeables -->
    <template v-if="!loading">
      <div
        v-for="item in achievements"
        :key="item.id"
        class="item"
        :style="{ backgroundColor: getPrimaryColor() }"
        @click="goToAchievement(item)"
      >
        <div class="overlay">
          <img
            v-if="item.thumbnailUrl"
            class="item-image"
            :src="item.thumbnailUrl"
            :alt="item.title"
          />
          <div class="item-info">
            <div class="item-title">{{ $i18n.locale === 'EN' ? (item.title_en || item.title) : item.title }}</div>
            <div class="item-issuer">{{ item.issuer }}</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { useTheme } from '@/composables/useTheme.js'
import { usePublishedAchievements } from '@/composables/useAchievements.js'

export default {
  name: 'Achievements_View',
  setup() {
    const theme = useTheme()
    const { achievements, loading } = usePublishedAchievements()
    return { ...theme, achievements, loading }
  },
  methods: {
    goToAchievement(achievement) {
      this.$router.push({ name: 'Achievement', params: { id: achievement.id } })
    },
  },
}
</script>

<style scoped>
.single-line {
  margin-top: 20px;
  width: 3px;
  height: 60px;
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
  height: 100%;
  padding: 20px 10px 10px 0;
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
  font-size: 1.1em;
  max-width: 80%;
}

.container {
  display: grid;
  grid-template-columns: repeat(4, minmax(300px, 1fr));
  grid-auto-flow: dense;
  gap: 20px;
  padding: 20px;
  margin: 5%;
}

.menu-item {
  grid-column: span 2;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Cards de logros */
.item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  grid-row-end: span 2;
  cursor: pointer;
}

.item:hover {
  transform: translateY(-10px);
}

.overlay {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 3px;
}

.item-issuer {
  font-size: 13px;
  color: #ddd;
}

/* ── md: 960–1279px ── */
@media (max-width: 1279px) {
  .container {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }
  .menu-item {
    grid-column: span 3;
    height: auto;
  }
}

/* ── sm: 600–959px ── */
@media (max-width: 959px) {
  .container {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
    margin: 5% 2%;
  }
  .menu-item {
    grid-column: span 2;
    height: auto;
  }
  .menu-description {
    max-width: 100%;
  }
}

/* ── xs: < 600px ── */
@media (max-width: 599px) {
  .container {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
  }
  .menu-item {
    height: fit-content;
    padding: 16px 0;
    box-shadow: none;
  }
  .menu-content {
    flex-direction: column;
  }
  .menu-content-left {
    flex-direction: row;
    height: auto;
    width: 100%;
    padding: 10px 0 8px 0;
    align-items: center;
    justify-content: flex-start;
  }
  .menu-content-left p {
    writing-mode: horizontal-tb;
    transform: none;
    font-size: 0.75em;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .single-line {
    width: 30px;
    height: 3px;
    margin-top: 0;
    margin-left: 8px;
  }
  .menu-content-right {
    width: 100%;
  }
  .item {
    height: 260px;
    margin: 12px 0;
  }
  .menu-title {
    font-size: 1.5em;
  }
  .menu-description {
    font-size: 12px;
  }
}
</style>
