import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
import VideoPlayer from "vue-video-player";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
import hls from "videojs-contrib-hls";
import { vueBaberrage } from "vue-baberrage";
Vue.use(vueBaberrage);
Vue.use(hls);
Vue.use(VideoPlayer);

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
});

Vue.use(ViewUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

Vue.prototype.$host = "localhost:8888";

console.log(process.env);
