import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/General_View.vue';
import About from './views/About_View.vue';
import ProjectComponent from "./components/utils/Project_Component.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/project/:id',
    name: 'Project',
    component: ProjectComponent,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
