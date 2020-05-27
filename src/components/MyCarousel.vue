<template>
    <Card>
        <Carousel
                v-model="value3"
                :autoplay="setting.autoplay"
                :autoplay-speed="setting.autoplaySpeed"
                :dots="setting.dots"
                :radius-dot="setting.radiusDot"
                :trigger="setting.trigger"
                :arrow="setting.arrow">
            <template v-for="item in topicList">
                <CarouselItem>
                    <div :style="dealstyle(item.bgimg)" class="demo-carousel">
                        <h1 class="topic">{{item.topicname}}</h1>
                    </div>
                </CarouselItem>
            </template>

        </Carousel>
    </Card>
</template>

<script>
  export default {
    name: "MyCarousel",
    data() {
      return {
        topicList: [
          {
            topicname: "#五一劳动节#",
            bgimg: "bd15e586-cb36-40f1-9a7e-d8c07d96f997.jpg"
          }
        ],
        value3: 0,
        setting: {
          autoplay: false,
          autoplaySpeed: 2000,
          dots: "inside",
          radiusDot: false,
          trigger: "hover",
          arrow: "hover"
        }
      };
    },

    methods: {
      dealstyle(bgimg) {
        return {
          background: "url('" + "http://" + this.$host + "/static/img/" + bgimg + "') no-repeat",
          backgroundSize: "100%"
        };
      }
    }
  };
</script>

<style scoped>
    .demo-carousel {
        width: 100%;
        height: 260px;
    }

    .topic {
        color: hsl(0, 0%, 100%);
        font-size: 18px;
        font-weight: 700;
        gap: normal;
        line-height: 20px;
        text-align: left;
        position: relative;
        top: 210px;
        left: 18px;
    }
</style>