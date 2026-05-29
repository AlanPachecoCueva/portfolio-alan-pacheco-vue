<template>
  <div class="bigContainerAbout">
    <div class="leftSideAbout">
      <img src="../assets/About-Image.webp" alt="img about" loading="lazy" />
    </div>
    <div class="rightSideAbout">
      <div class="right-leftContainer">
        <p>{{ $t("About_Me_Flag") }}</p>
        <div class="single-line" :style="{ backgroundColor: getHeroColor() }"></div>
      </div>
      <div class="right-rightContainer">
        <div class="right-rightContainer-upper">
          <h2>{{ $t("About_Me_Title") }}</h2>
          <p>{{ $t("About_Me_Paragraph") }}</p>
        </div>
        <div class="right-rightContainer-lower">
          <router-link :to="{ name: 'Home', hash: '#contact-view' }">
            <input class="button" id="leftButton" type="button" :value="$t('About_Me_Contact_Me')"
              :style="generateAlternativeGradientStyle()" />
          </router-link>

          <input class="button" type="button" id="rightButton" @click="downloadCV" :value="$t('About_Me_Download_CV')"
            :style="generateGradientStyle()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTheme } from '@/composables/useTheme';

export default {
  name: "About_View",
  setup() {
    return useTheme()
  },
  methods: {
    downloadCV() {
      const link = document.createElement("a");
      if (this.$i18n.locale == "EN") {
        link.href = "/CV-Alan Pacheco-ENG.pdf";
        link.download = "CV-Alan Pacheco-ENG.pdf";
      } else {
        link.href = "/CV-Alan Pacheco-ESP.pdf";
        link.download = "CV-Alan Pacheco-ESP.pdf";
      }
      link.click();
    },
    generateGradientStyle() {
      return {
        background: `linear-gradient(to right, ${this.getBackgroundColor()} 50%, #CACACA 50%)`,
        backgroundSize: `200% 100%`,
        border: `1px solid ${this.getContrastColor()} !important`
      };
    },
    generateAlternativeGradientStyle() {
      return {
        background: `linear-gradient(to right, ${this.getAlternativeButtonColor()} 50%,  #CACACA 50%)`,
        backgroundSize: `200% 100%`,
      };
    },
  },
};
</script>

<style scoped>
/* ── Base styles (desktop) ── */
#rightButton {
  font-weight: bold;
}

.bigContainerAbout {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 5% 0px 5% 0px;
}

.leftSideAbout {
  width: 40%;
}

.leftSideAbout img {
  width: 100%;
}

.rightSideAbout {
  width: 40%;
  display: flex;
  flex-direction: row;
  margin: 0 0 100px 0;
}

.right-leftContainer {
  margin: 15px 5px 5px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

.single-line {
  margin-top: 20px;
  width: 3px;
  height: 20%;
}

.right-leftContainer p {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.right-rightContainer {
  margin: 0px 5px 0px 5px;
}

.right-rightContainer-upper {
  margin: 5px 5px 5px 5px;
}

.right-rightContainer-upper h2 {
  margin: 10px 0px 10px 0px;
}

.right-rightContainer-upper p {
  margin: 30px 0px 30px 0px;
}

#leftButton {
  margin-right: 30px;
  color: white;
}

/* ── md: 960–1279px ── */
@media (max-width: 1279px) {
  .leftSideAbout {
    width: 45%;
  }

  .rightSideAbout {
    width: 48%;
  }
}

/* ── sm: 600–959px ── */
@media (max-width: 959px) {
  .bigContainerAbout {
    flex-direction: column;
    align-items: center;
    margin: 5% 0;
  }

  .leftSideAbout {
    width: 60%;
    display: flex;
    justify-content: center;
  }

  .leftSideAbout img {
    width: 70%;
  }

  .rightSideAbout {
    width: 85%;
    margin: 0 0 40px 0;
  }
}

/* ── xs: < 600px ── */
@media (max-width: 599px) {
  .bigContainerAbout {
    flex-direction: column;
    align-items: center;
    margin: 5% 0;
  }

  .leftSideAbout {
    width: 80%;
    display: flex;
    justify-content: center;
  }

  .leftSideAbout img {
    width: 90%;
  }

  .rightSideAbout {
    width: 90%;
    flex-direction: column;
    margin: 10px 0 20px 0;
  }

  .right-leftContainer {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: auto;
    padding: 10px 0 8px 0;
    margin: 0 0 4px 0;
    width: 100%;
  }

  .right-leftContainer p {
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

  .right-rightContainer {
    width: 100%;
    margin: 0;
  }

  .right-rightContainer-upper {
    margin: 0;
  }

  .right-rightContainer-upper p {
    margin: 10px 0;
  }

  .right-rightContainer-lower {
    width: 100%;
    display: flex;
    gap: 10px;
  }

  .right-rightContainer-lower a {
    flex: 2;
    display: flex;
  }

  #leftButton {
    width: 100%;
    margin-right: 0;
    font-size: 11px;
    padding: 10px 5px;
    font-weight: bold;
  }

  #rightButton {
    flex: 3;
    width: auto;
    font-size: 11px;
    padding: 10px 5px;
  }
}
</style>
