import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: () => import("@/views/LandingPageView.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/AboutPage.vue"),
  },
  {
    path: "/add-pet",
    name: "AddPetPage",
    component: () => import("@/views/AddPetPage.vue"),
  },
  {
    path: "/pet/:id",
    name: "PetDetail",
    component: () => import("@/views/PetDetail.vue"),
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If the user used browser navigation (back/forward), restore their position
    if (savedPosition) {
      return savedPosition;
    }
    // For all other navigation, scroll to top
    return { top: 0 };
  },
});

export default router;
