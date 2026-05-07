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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      return { top: 0 };
    }
  },
});

const BASE_TITLE = 'Portfolio Alan Pacheco'
router.afterEach((to) => {
  if (to.name === 'Project' && to.params.id) {
    document.title = `${to.params.id} | ${BASE_TITLE}`
  } else {
    const titles = {
      Home: `${BASE_TITLE} — Software Engineer`,
      About: `About | ${BASE_TITLE}`,
      Gallery: `Gallery | ${BASE_TITLE}`,
    }
    document.title = titles[to.name] || BASE_TITLE
  }
})

export default router;
