<template>
    <div style="width: 950px">
        <div style="height: 300px">
            <MyCarousel style="display: block;width: 600px;float: left"></MyCarousel>
            <Affix :offset-top="70">
                <Login style="float: right"></Login>
            </Affix>
        </div>
        <template v-for="item in blogList">
            <Blog :key="item.blogid" :blog="item"></Blog>
        </template>
    </div>
</template>

<script>
  import Login from "../components/Login";
  import MyCarousel from "../components/MyCarousel";
  import blogApi from "../api/blogApi";
  import Blog from "../components/Blog/Blog";

  export default {
    name: "UnloginContent",
    components: { Blog, MyCarousel, Login },
    data() {
      return {
        blogList: []
      };
    },
    methods: {
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
    mounted() {
      this.getBlog(0);
    }
  };
</script>

<style scoped>

</style>