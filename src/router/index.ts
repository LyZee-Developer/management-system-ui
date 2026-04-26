import { createRouter, createWebHistory } from "vue-router";

// pages
import Login from "../pages/login.vue";
import PageNotFound from "../pages/PageNotFound.vue";
import OurSystem from "../pages/OurSystem.vue";

const routes: Array<any> = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/our",
    name: "our",
    component: OurSystem,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
