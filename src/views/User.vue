<template>
    <Scroll loading-text="加载中。。。" class="scroll" height="940" :on-reach-bottom="handleReachBottom">
        <div v-if="userinfo" class="cc">
            <UserHeader :userid="userinfo.userid" :avatar="userinfo.avatar" :nickname="userinfo.nickname">
            </UserHeader>

            <Affix :offset-top="200">
                <div class="focusAndFans">
                    <FocusAndFans :focus="userinfo.focus" :fans="userinfo.fans" :blogs="userinfo.blogs">
                    </FocusAndFans>
                </div>
            </Affix>
            <div style="float: right">
                <template v-for="item in blogList">
                    <Blog :blog="item"></Blog>
                </template>
            </div>

        </div>
    </Scroll>
</template>

<script>
  import UserHeader from "../components/User/UserHeader";
  import blogApi from "@/api/blogApi";
  import userApi from "@/api/userApi";
  import Blog from "@/components/Blog/Blog";
  import FocusAndFans from "../components/User/FocusAndFans";

  export default {
    name: "User",
    components: { FocusAndFans, UserHeader, Blog },
    data() {
      return {
        blogList: [],
        userinfo: null
      };
    },
    methods: {
      init() {
        this.getBlog();
        this.getUserinfo();
      },
      async getBlog() {
        let res = await blogApi.getBlogByUserid(Number.parseInt(this.$route.params.userid));
        if (res.code == 0) {
          this.blogList = res.data;
          console.log(res);
        }
      },
      async getUserinfo() {
        let res = await userApi.getInfo(Number.parseInt(this.$route.params.userid));
        if (res.code == 0) {
          this.userinfo = res.data;
          console.log(res);
        }
      },
      change(status) {
        this.$Message.info(`Status: ${status}`);
      },
      handleReachBottom() {
        setTimeout(() => {
          this.getBlog();
        }, 1000);
      }
    },

    watch: {
      "$route"(to, from) { //监听路由是否变化
        if (to.params.userid != from.params.userid) {
          this.$router.go(0);
        }
      }
    },
    created() {

    },
    mounted() {
      this.init();
    }
  };
</script>

<style scoped>
    .cc {
        width: 900px;
        margin: 0 auto;
    }
    .scroll{
        max-width: 1920px;

    }
    .focusAndFans {
        /*width: 300px;*/
        float: left;
    }
</style>