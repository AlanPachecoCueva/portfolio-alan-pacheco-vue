<template>
  <div class="slogan-home-container">
    <div class="home-content">
      <div
        class="home-image"
        @mousemove="parallaxEffect"
        @mouseleave="resetImage"
      >
        <img
          id="home-image-2"
          src="../assets/color-background.webp"
          alt="img home"
        />

        <img
          id="home-image"
          class="fade-out-image"
          src="../assets/Home-Image.webp"
          alt="img home"
        />
      </div>

      <div id="slogan-home">
        {{ $t("Home_Main_Slogan_P1") }}
        <br />
        {{ $t("Home_Main_Slogan_P2") }}
      </div>
      <router-link :to="{ name: 'Home', hash: `#contact-view` }">
        <button id="contact-button" name="button">
          {{ $t("Home_Contact_Button") }}
        </button>
      </router-link>
    </div>

    <div class="hero-social-container">
      <ul class="hero-social-ul">
        <li class="hero-social-li">
          <a
            href="https://ec.linkedin.com/in/alan-pacheco-cueva-b7b3a9223"
            target="_blank"
            class="hero-social-item"
            :style="{ color: getHeroColor() }"
          >
            <Icon class="hero-social-icon" icon="ri:linkedin-fill" />
          </a>
        </li>
        <li class="hero-social-li">
          <a
            href="https://github.com/AlanPachecoCueva"
            target="_blank"
            class="hero-social-item"
            :style="{ color: getHeroColor() }"
          >
            <Icon class="hero-social-icon" icon="mingcute:github-fill" />
          </a>
        </li>
        <li class="hero-social-li">
          <a
            href="/twitter"
            target="_blank"
            class="hero-social-item"
            :style="{ color: getHeroColor() }"
          >
            <Icon class="hero-social-icon" icon="mdi:twitter" />
          </a>
        </li>
      </ul>
      <div
        class="single-line"
        :style="{ backgroundColor: getHeroColor() }"
      ></div>
    </div>
  </div>
</template>

<script>
import { useTheme } from '@/composables/useTheme';

export default {
  name: "HomeView",
  setup() {
    return useTheme()
  },
  data() {
    return {
      message: "Hello, Vue 3!",
    };
  },
  methods: {
    parallaxEffect(event) {
      const image = event.target;
      const rect = image.getBoundingClientRect();

      const moveX = (event.clientX - rect.left - rect.width / 2) * -0.02;
      const moveY = (event.clientY - rect.top - rect.height / 2) * -0.02;

      image.style.marginLeft = `${moveX}px`;
      image.style.marginTop = `${moveY}px`;
    },
    resetImage(event) {
      const image = event.target;
      image.style.marginLeft = "0px";
      image.style.marginTop = "0px";
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style scoped>


.hero-social-container {
  position: absolute;
  left: 2%;

  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.hero-social-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
}

.hero-social-li {
  list-style: none;
}

.single-line {
  width: 3px;
  height: 20%;
}

.slogan-home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.fade-out-image {
  width: 100%;
  height: auto;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 70%,
    rgba(0, 0, 0, 0)
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 97%,
    rgba(0, 0, 0, 0)
  );
}

.home-content {
  top: 0px;
  position: absolute;
  text-align: center;
  width: 100%;
  height: 100vh;
}

/* ── sm: 600–959px ── */
@media (max-width: 959px) {
  .home-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 10%;
  }

  #slogan-home {
    font-size: 2em !important;
    margin-top: 0 !important;
  }

  .hero-social-container {
    left: 1% !important;
  }
}

/* ── xs: < 600px ── */
@media (max-width: 599px) {
  .home-content {
    justify-content: space-between;
    padding: 8% 5%;
    box-sizing: border-box;
  }

  .home-image {
    position: relative !important;
    width: 55vw !important;
    height: 55vw !important;
    overflow: hidden !important;
    bottom: auto !important;
    left: auto !important;
    transform: none !important;
  }

  #home-image-2 {
    width: 130% !important;
  }

  #home-image {
    width: 120% !important;
  }

  #slogan-home {
    font-size: 1.3em !important;
    margin-top: 0 !important;
    padding: 0 12px;
    color: inherit !important;
    text-shadow: none !important;
  }

  .hero-social-container {
    display: none;
  }
}

.home-image {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, -12%);

  width: 30vw;
  height: 30vw;
}

.home-image img {
  transition: margin 0.2s ease-out;
}

#home-image {
 width: 140%;
  z-index: 2 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#home-image-2 {
  width: 150%;
  z-index: 1 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
}

#slogan-home {
  font-size: 3em;
  color: white;
  text-shadow: -2px -1px 4px rgba(0, 0, 0);
  z-index: 3 !important;
  position: relative;

  margin-top: 30%;
}

#contact-button {
  z-index: 3 !important;
  position: relative;

  font-size: 1em;
  color: white;
  text-shadow: -2px -1px 4px rgba(0, 0, 0);
  border: 2px solid;
  border-color: white;
  padding: 5px 15px 5px 15px;

  border-radius: 6px;
  background-color: rgb(109, 112, 112, 35%);
}
</style>
