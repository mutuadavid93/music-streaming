import { createApp } from "vue";
import "animate.css";

import { createPinia } from "pinia";
import piniaPluginPersistentstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistentstate);

import "./style.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
