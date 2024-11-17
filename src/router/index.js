import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";
import About from "../views/AboutPage.vue";
import AddPetPage from "@/views/AddPetPage.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/add-pet", name: "AddPetPage", component: AddPetPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
