import { createRouter, createWebHistory } from "vue-router";

// pages
import PageNotFound from "../pages/PageNotFound.vue";
import WebSocker from "../pages/WebSocker.vue";
import Login from "../pages/Login.vue";
import Home from "../pages/Home.vue";

const routes: Array<any> = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/websocket",
    name: "websocket",
    component: WebSocker,
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
