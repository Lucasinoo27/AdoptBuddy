import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@/assets/global.css";
import { usePetStore } from "@/stores/petStore";
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS
AOS.init({
  duration: 800,
  easing: "ease-out-cubic",
  once: true,
});

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

// Reset store to load new pet data
const petStore = usePetStore(pinia);
petStore.resetStore();

app.mount("#app");
