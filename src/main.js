import { createSSRApp } from "vue";
import App from "./App.vue";
import uviewPlus from "uview-plus";

import axios from "./api/index";

import YaoPicture from "./components/yaoPicture/YaoPicture.vue";

export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus);
  app.config.globalProperties.$http = axios;
  app.component("YaoPicture", YaoPicture);

  return {
    app,
  };
}
