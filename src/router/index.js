import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"), // Lazy loading
  },
  {
    path: "/about-us",
    name: "About",
    component: () => import("@/views/About.vue"), // Lazy loading,
  },
  {
    path: "/artist",
    name: "Artist",
    component: () => import("@/views/Artist.vue"), // Lazy loading,
  },
];

const router = createRouter({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes,
});

export default router;
