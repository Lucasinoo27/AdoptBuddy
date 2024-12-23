import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@/assets/global.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
