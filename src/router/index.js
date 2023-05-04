import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home.vue";
import AboutView from "@/views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView
  },
  {
    path: "/about-us",
    name: "About",
    component: AboutView
  }
];

const router = createRouter({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes
});

export default router;
