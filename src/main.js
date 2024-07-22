import { createSSRApp } from "vue";
import App from "./App.vue";
import uviewPlus from "uview-plus";

import axios from "./api/index";

import YaoPicture from "./components/yaoPicture/YaoPicture.vue";

import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";

const pinia = createPinia();
pinia.use(piniaPersist);

export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus);
  app.use(pinia);
  app.config.globalProperties.$http = axios;
  app.component("YaoPicture", YaoPicture);
  return {
    app,
  };
}
