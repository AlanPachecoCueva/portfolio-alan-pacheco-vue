import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/General_View.vue";
import About from "./views/About_View.vue";
import Gallery from "./views/Gallery_View.vue";
import ProjectComponent from "./components/utils/Project_Component.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/index.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/index.js";

// Estado de auth cacheado: evita crear un listener nuevo en cada navegación.
// En el primer load esperamos a que Firebase resuelva; en navegaciones posteriores
// usamos el valor ya conocido sin crear listeners adicionales.
let _authResolved = false;
let _currentUser = null;

onAuthStateChanged(auth, (user) => {
  _currentUser = user;
  _authResolved = true;
});

function waitForAuthReady() {
  if (_authResolved) return Promise.resolve(_currentUser);
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      resolve(user);
    });
  });
}

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
  {
    path: "/achievements",
    name: "Achievements",
    component: () => import("./views/Achievements_View.vue"),
  },
  {
    path: "/achievement/:id",
    name: "Achievement",
    component: () => import("./views/Achievement_View.vue"),
  },

  // ── Admin ────────────────────────────────────────────────────────────────
  {
    path: "/admin",
    redirect: "/admin/projects",
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: () => import("./views/admin/Admin_Login.vue"),
  },
  {
    path: "/admin/projects",
    name: "AdminProjects",
    component: () => import("./views/admin/Admin_Projects.vue"),
  },
  {
    path: "/admin/projects/new",
    name: "AdminProjectNew",
    component: () => import("./views/admin/Admin_ProjectForm.vue"),
  },
  {
    path: "/admin/projects/:id/edit",
    name: "AdminProjectEdit",
    component: () => import("./views/admin/Admin_ProjectForm.vue"),
  },
  {
    path: "/admin/achievements",
    name: "AdminAchievements",
    component: () => import("./views/admin/Admin_Achievements.vue"),
  },
  {
    path: "/admin/achievements/new",
    name: "AdminAchievementNew",
    component: () => import("./views/admin/Admin_AchievementForm.vue"),
  },
  {
    path: "/admin/achievements/:id/edit",
    name: "AdminAchievementEdit",
    component: () => import("./views/admin/Admin_AchievementForm.vue"),
  },
  {
    path: "/admin/images",
    name: "AdminImages",
    component: () => import("./views/admin/Admin_Images.vue"),
  },
  {
    path: "/admin/albums",
    name: "AdminAlbums",
    component: () => import("./views/admin/Admin_Albums.vue"),
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

// ── Navigation guard ───────────────────────────────────────────────────────
// Cache del uid verificado para no hacer getDoc en cada navegación interna.
let _verifiedAdminUid = null;

router.beforeEach(async (to) => {
  if (!to.path.startsWith("/admin")) return true;
  if (to.name === "AdminLogin") return true;

  const user = await waitForAuthReady();
  if (!user) {
    _verifiedAdminUid = null;
    return { name: "AdminLogin" };
  }

  // Si el uid ya fue verificado en esta sesión, no repetimos el getDoc
  if (_verifiedAdminUid === user.uid) return true;

  const adminDoc = await getDoc(doc(db, "admins", user.uid));
  if (!adminDoc.exists()) {
    _verifiedAdminUid = null;
    return { name: "AdminLogin" };
  }

  _verifiedAdminUid = user.uid;
  return true;
});

// ── Document title ─────────────────────────────────────────────────────────
const BASE_TITLE = "Portfolio Alan Pacheco";
router.afterEach((to) => {
  if (to.name === "Project" && to.params.id) {
    document.title = `${to.params.id} | ${BASE_TITLE}`;
  } else {
    const titles = {
      Home: `${BASE_TITLE} — Software Engineer`,
      About: `About | ${BASE_TITLE}`,
      Gallery: `Gallery | ${BASE_TITLE}`,
      Achievements: `Achievements | ${BASE_TITLE}`,
      Achievement: `Achievement | ${BASE_TITLE}`,
      AdminLogin: `Admin Login | ${BASE_TITLE}`,
      AdminProjects: `Admin — Projects | ${BASE_TITLE}`,
      AdminAchievements: `Admin — Achievements | ${BASE_TITLE}`,
      AdminImages: `Admin — Images | ${BASE_TITLE}`,
      AdminAlbums: `Admin — Albums | ${BASE_TITLE}`,
    };
    document.title = titles[to.name] || BASE_TITLE;
  }
});

export default router;
