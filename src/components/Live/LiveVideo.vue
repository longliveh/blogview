<template>
    <div class="container">
        <div class="player">
            <video-player class="video-player vjs-custom-skin"
                          ref="videoPlayer"
                          :playsinline="true"
                          :options="playerOptions"
                          @play="onPlayerPlay($event)"
                          @pause="onPlayerPause($event)"
                          @error="onPlayerError($event)"
            >
            </video-player>
        </div>
    </div>
</template>

<script>
  import { videoPlayer } from "vue-video-player";

  export default {
    props: {
      url: "",
      errorimg:{
        type:String,
        default:"http://localhost:8888/static/img/live_end.png"
      },
    },
    data() {
      return {
        playerOptions: {
//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: "zh-CN",
          aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "application/x-mpegURL",
            src: this.url //你的m3u8地址（必填）
          }],
          poster: this.errorimg, //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: "暂无直播信息", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: false,
            durationDisplay: false,
            remainingTimeDisplay: false,
            currentTimeDisplay: false, // 当前时间
            volumeControl: false, // 声音控制键
            playToggle: true, // 暂停和播放键
            progressControl: true, // 进度条
            fullscreenToggle: true // 全屏按钮
          }
        }
      };
    },
    components: {
      videoPlayer
    },
    methods: {
      onPlayerPlay(player) {
        // alert("play");
      },
      onPlayerPause(player) {
        // alert("pause");
      },
      onPlayerError(player)
      {
        player.poster_ = "http://pic1.win4000.com/wallpaper/2020-05-14/5ebcd6d8cb45e.jpg";
        console.log(player)
      }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container {
        background-color: #efefef;
        width: 100%;
        height: 100%;
    }
</style>