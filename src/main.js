import { createSSRApp } from "vue";
import App from "./App.vue";
import uviewPlus from "uview-plus";

import axios from "./api/index";

import YaoPicture from "./components/yaoPicture/YaoPicture.vue";
import YaoPlayer from "./components/YaoPlayer/YaoPlayer";

import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";

const pinia = createPinia();
pinia.use(piniaPersist);

export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus);
  app.use(pinia);
  app.config.globalProperties.$http = axios;
  // 全局组件
  app.component("YaoPicture", YaoPicture);
  app.component("YaoPlayer", YaoPlayer);
  return {
    app,
  };
}
