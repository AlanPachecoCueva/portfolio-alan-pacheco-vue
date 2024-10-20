<template>
  <header>
    <nav>
      <div id="logo-side">
        <div class="nav-logo">
          <img
            class="logo"
            alt="Vue logo"
            :src="require('../assets/logo-no-letters.png')"
          />
        </div>
      </div>

      <ul class="nav-links">
        <div class="nav-sides" id="center-side">
          <li>
            <router-link :to="{ name: 'Home', hash: '#home-view' }"
              ><a>{{ $t("Home_Text") }} </a></router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'Home', hash: '#about-view' }"
              ><a>{{ $t("About_Text") }}</a></router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'Home', hash: '#skills-view' }"
              ><a> {{ $t("Skills_Text") }}</a></router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'Home', hash: '#projects-view' }"
              ><a>
                {{ $t("Portfolio_Text") }}</a
              ></router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'Home', hash: '#contact-view' }"
              ><a>
              {{ $t("Contact_Text") }}</a
            ></router-link
            >
            
          </li>
        </div>
        <div class="nav-sides" id="right-side">
          <!-- <li><a href="#services">EN</a></li> -->
          <li>
            <Language_Selector_Component
              id="languageSelector"
            ></Language_Selector_Component>
          </li>
          <li>
            <Theme_Selector_Component></Theme_Selector_Component>
          </li>

          <!-- <li><a href="#contact"> {{ $t('Theme_Text') }}</a></li> -->
          <li>
            <a href="#contact"> {{ $t("More_Text") }}</a>
          </li>
        </div>
      </ul>
    </nav>
  </header>
</template>

<script>
import Language_Selector_Component from "../components/utils/Language_Selector_Component.vue";
import Theme_Selector_Component from "../components/utils/Theme_Selector_Component.vue";

export default {
  // Aquí van las opciones del componente
  name: "Nav_Bar", // Nombre del componente
  components: {
    Language_Selector_Component,
    Theme_Selector_Component,
  },
  props: {
    // Definición de propiedades que el componente puede recibir
  },
  data() {
    // Datos reactivos del componente
    return {};
  },
  methods: {
    scrollTo(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        // Desplazamiento suave
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
  computed: {
    // Propiedades computadas
  },
  mounted() {
    // Hook de ciclo de vida
  },
};
</script>

<style scoped>
header {
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  padding: 0px !important;
}
a {
  color: inherit;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.logo {
  height: 60px;
}

.nav-links {
  width: 66.66%;
  list-style: none;
  display: flex;
  padding: 0;
  justify-content: space-between;
  align-items: center;
}

.nav-links li {
  margin: 0;
}

.nav-links a {
  text-decoration: none;
}

#logo-side {
  width: 33.33%;
  display: flex;
  justify-content: left;
  padding-left: 5%;
  align-items: center;
}

.nav-sides {
  width: 50%;
  display: flex;
}

#center-side {
  justify-content: space-around;
}

#right-side {
  width: 30% !important;
  justify-content: center;
  align-items: center;
}

#right-side li {
  padding: 0 0.5rem 0 0.5rem;
}

#languageSelector {
  padding: 0;
}
</style>
