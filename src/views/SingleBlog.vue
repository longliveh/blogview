<template>
    <div style="max-width: 600px">
        <Blog :autoopen="true" v-if="bloginfo" :blog="bloginfo"></Blog>
    </div>
</template>

<script>
  import Blog from "../components/Blog/Blog";
  import blogApi from "../api/blogApi"
  export default {
    name: "SingleBlog",
    components: { Blog },
    data(){
      return {
        bloginfo:null
      }
    },
    methods:{
      async getBlogById()
      {
        let res = await blogApi.getBlogById(Number.parseInt(this.$route.params.blogid))
        if (res.code === 0){
          this.bloginfo = res.data;
        }
      },

    },
    mounted() {
      this.getBlogById();
    }
  };
</script>

<style scoped>

</style>