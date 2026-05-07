<template>
  <header>
    <nav>
      <div id="logo-side">
        <div class="nav-logo">
          <img class="logo" alt="Vue logo" src="../assets/logo-no-letters.png" />
        </div>
      </div>

      <!-- Desktop links (≥ 960px) -->
      <ul class="nav-links">
        <div class="nav-sides" id="center-side">
          <li><router-link :to="{ name: 'Home', hash: '#home-view' }"><a>{{ $t("Home_Text") }}</a></router-link></li>
          <li><router-link :to="{ name: 'Home', hash: '#about-view' }"><a>{{ $t("About_Text") }}</a></router-link></li>
          <li><router-link :to="{ name: 'Home', hash: '#skills-view' }"><a>{{ $t("Skills_Text") }}</a></router-link></li>
          <li><router-link :to="{ name: 'Home', hash: '#projects-view' }"><a>{{ $t("Portfolio_Text") }}</a></router-link></li>
          <li><router-link :to="{ name: 'Home', hash: '#contact-view' }"><a>{{ $t("Contact_Text") }}</a></router-link></li>
        </div>
        <div class="nav-sides" id="right-side">
          <li><Language_Selector_Component id="languageSelector"></Language_Selector_Component></li>
          <li><Theme_Selector_Component></Theme_Selector_Component></li>
        </div>
      </ul>

      <!-- Mobile controls (< 960px) -->
      <div class="mobile-controls">
        <Language_Selector_Component></Language_Selector_Component>
        <Theme_Selector_Component></Theme_Selector_Component>
        <button class="hamburger-btn" @click="menuOpen = !menuOpen" :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'">
          <Icon :icon="menuOpen ? 'mdi:close' : 'mdi:menu'" style="width:26px;height:26px;" />
        </button>
      </div>
    </nav>

    <!-- Mobile dropdown -->
    <div class="mobile-menu" v-show="menuOpen">
      <ul>
        <li @click="menuOpen = false"><router-link :to="{ name: 'Home', hash: '#home-view' }">{{ $t("Home_Text") }}</router-link></li>
        <li @click="menuOpen = false"><router-link :to="{ name: 'Home', hash: '#about-view' }">{{ $t("About_Text") }}</router-link></li>
        <li @click="menuOpen = false"><router-link :to="{ name: 'Home', hash: '#skills-view' }">{{ $t("Skills_Text") }}</router-link></li>
        <li @click="menuOpen = false"><router-link :to="{ name: 'Home', hash: '#projects-view' }">{{ $t("Portfolio_Text") }}</router-link></li>
        <li @click="menuOpen = false"><router-link :to="{ name: 'Home', hash: '#contact-view' }">{{ $t("Contact_Text") }}</router-link></li>
      </ul>
    </div>
  </header>
</template>

<script>
import Language_Selector_Component from "../components/utils/Language_Selector_Component.vue";
import Theme_Selector_Component from "../components/utils/Theme_Selector_Component.vue";

export default {
  name: "Nav_Bar",
  components: {
    Language_Selector_Component,
    Theme_Selector_Component,
  },
  data() {
    return {
      menuOpen: false,
    };
  },
};
</script>

<style scoped>
header {
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  padding: 0 !important;
}

a {
  color: inherit;
  text-decoration: none;
}

/* ── Base (desktop ≥ 1280px) ── */
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
  width: 30%;
  justify-content: center;
  align-items: center;
}

#right-side li {
  padding: 0 0.5rem;
}

#languageSelector {
  padding: 0;
}

/* Mobile controls: ocultos en desktop */
.mobile-controls {
  display: none;
}

/* Mobile hamburger button */
.hamburger-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Mobile dropdown */
.mobile-menu {
  background: rgb(var(--v-theme-header));
  width: 100%;
  position: fixed;
  top: 62px;
  left: 0;
  right: 0;
  z-index: 9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.mobile-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-menu li {
  padding: 14px 24px;
  border-top: 1px solid rgba(128, 128, 128, 0.15);
  font-size: 15px;
}

.mobile-menu a {
  color: inherit;
  text-decoration: none;
  display: block;
}

.mobile-menu a:hover {
  color: orange;
}

/* ── md: 960–1279px — links más compactos ── */
@media (max-width: 1279px) {
  .nav-links {
    width: 73%;
    font-size: 13px;
  }

  #logo-side {
    width: 27%;
  }
}

/* ── sm/xs: < 960px — hamburger ── */
@media (max-width: 959px) {
  nav {
    width: 100%;
    justify-content: space-between;
    padding: 0 16px;
    box-sizing: border-box;
  }

  #logo-side {
    width: auto;
    padding-left: 0;
  }

  .nav-links {
    display: none;
  }

  .mobile-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
