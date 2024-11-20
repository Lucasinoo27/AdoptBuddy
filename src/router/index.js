import { createRouter, createWebHistory } from "vue-router";
import LandingPageView from "@/views/LandingPageView.vue";
import Home from "../views/HomePage.vue";
import About from "../views/AboutPage.vue";
import AddPetPage from "@/views/AddPetPage.vue";
import PetDetail from "@/views/PetDetail.vue";

const routes = [
  { path: "/", name: "LandingPage", component: LandingPageView },
  { path: "/home", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/add-pet", name: "AddPetPage", component: AddPetPage },
  {
    path: "/pet/:id",
    name: "PetDetail",
    component: PetDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
