<template>
    <Scroll loading-text="加载中。。。" class="scroll" height="940" :on-reach-bottom="handleReachBottom">
        <div class="content">
            <div class="bloglist">
                <Publish>
                </Publish>
                <div style="margin-bottom: 10px">
                    <Card class="select">
                        <Tabs v-model="select" style="width: 100%">
                            <TabPane label="热门" icon="md-flame" name="0"></TabPane>
                            <TabPane label="全部" icon="md-more" name="1"></TabPane>
                            <TabPane label="图片" icon="md-images" name="2"></TabPane>
                            <TabPane label="视频" icon="logo-youtube" name="3"></TabPane>
                            <TabPane label="直播" icon="md-videocam" name="4"></TabPane>
                        </Tabs>
                    </Card>
                </div>

                <template v-for="item in blogList">
                    <Blog :key="item.blogid" :blog="item"></Blog>
                </template>
            </div>
            <div class="usercard">
                <Affix :offset-top="75">
                    <UserCard></UserCard>
                    <RecentMsg></RecentMsg>
                </Affix>
            </div>
        </div>
    </Scroll>

</template>


<script>
  import Blog from "@/components/Blog/Blog";
  import blogApi from "@/api/blogApi";
  import UserCard from "../components/UserCard";
  import Publish from "@/components/Blog/Publish";
  import RecentMsg from "../components/RecentMsg";
  import VedioUpload from "@/components/Blog/VedioUpload";
  import VedioPlayer from "@/components/Blog/VedioPlayer";


  export default {
    name: "General",
    components: { VedioPlayer, VedioUpload, RecentMsg, Publish, UserCard, Blog },
    props: {},
    data() {
      return {
        select: "10",
        transitionName: "",
        blogList: []
      };
    },
    methods: {
      async getBlogByFocus() {
        let res = await blogApi.getBlogByUserid(1);
        this.blogList = res.data;
        console.log(res);
      },
      async getBlog(select) {
        let res = await blogApi.getBlog(select, this.$store.getters.getBlogCount);
        if (res.code === 0) {
          res.data.forEach((val) => {
            this.blogList.push(val);
          });
          this.$store.commit("setblogCount", this.blogList.length);
          console.log(this.$store.getters.getBlogCount);
        }
      },
      handleReachBottom() {
        setTimeout(() => {
          this.getBlog(this.select);
        }, 1000);
      }
    },
    watch: {
      select(val, oldVal) {//普通的watch监听
        this.blogList = [];
        switch (val) {
          case "0":
            this.getBlog(0);
            break;
          case "1":
            this.getBlog(1);
            break;
          case "2":
            this.getBlog(2);
            break;
          case "3":
            this.getBlog(3);
            break;
          case "4":
            this.getBlog(4);
            break;
        }
      }
    },
    mounted() {
      this.select = "0";
    }
  };
</script>

<style scoped>
    .content {
        max-width: 910px;
        margin: 0 auto;
    }
    .scroll{
        max-width: 1920px;

    }

    .bloglist {
        float: left;
    }

    .usercard {
        float: right;
    }

    .select{
        text-align: center;
    }

    .select >>> .ivu-card-body {
        padding: 0 16px;
    }

    /*.scroll >>> .ivu-scroll-container::-webkit-scrollbar {*/
        /*width: 0 !important;*/
    /*}*/
</style>