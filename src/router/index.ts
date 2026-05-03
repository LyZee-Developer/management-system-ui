import { createRouter, createWebHistory } from "vue-router";

// pages
import PageNotFound from "../pages/PageNotFound.vue";
import WebSocker from "../pages/WebSocker.vue";
import Login from "../pages/Login.vue";
import Home from "../pages/Home.vue";
import Chat from "../pages/communicate/Chat.vue";

const routes: Array<any> = [
  { path: "/", name: "home", component: Home },
  { path: "/login", name: "login", component: Login },
  
  //sub children of communicate
  { path: "/chat", name: "chat", component: Chat },
  { path: "/websocket", name: "websocket", component: WebSocker },
  
  // url doesn't match with url 
  { path: "/:pathMatch(.*)*", name: "not-found", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
