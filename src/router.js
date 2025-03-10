import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/General_View.vue";
import About from "./views/About_View.vue";
import Gallery from "./views/Gallery_View.vue";
import ProjectComponent from "./components/utils/Project_Component.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/project/:id",
    name: "Project",
    component: ProjectComponent,
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: Gallery,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // Si el usuario vuelve a una página, ir a la posición guardada
    } else if (to.hash) {
      return {
        el: to.hash, // Desplazarse al id (hash) de la página
        behavior: "smooth", // Desplazamiento suave
      };
    } else {
      return { top: 0 }; // Ir al inicio de la página si no hay hash
    }
  },
});

export default router;
