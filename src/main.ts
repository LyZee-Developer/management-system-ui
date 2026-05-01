import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createBootstrap } from "bootstrap-vue-next";

// Required CSS
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

//them system
import "./css/dark-mode.css"
import "./css/bootstrap-style.scss"
// using notification with toast
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// controller langauge for our system
import i18n from './i18n/i18n'

createApp(App)
  .use(router)
  .use(i18n)
  .use(Vue3Toastify, {
    autoClose: 3000,
    // ...
  } as ToastContainerOptions)
  .use(createBootstrap())
  .mount("#app");
