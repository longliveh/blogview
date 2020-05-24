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
import VueParticles from "vue-particles";
import axios from "axios";

Vue.use(VueParticles);
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

Vue.prototype.$ip = "localhost";
Vue.prototype.$host = Vue.prototype.$ip + ":" + "8888";
Vue.prototype.$http = axios
console.log(process.env);
