<template>
  <div class="content">
    <BaseHeader></BaseHeader>
    <!--<Login></Login>-->
    <!--<Publish></Publish>-->
    <!--<LiveVideo></LiveVideo>-->

    <template v-for="item in blogList">
      <Blog :blog="item"></Blog>
    </template>
    <router-view/>


  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseHeader from "@/views/BaseHeader";
import Login from "../components/Login";
import Register from "./Register";
import ImgViewer from "../components/Blog/ImgViewer";
import Blog from "@/components/Blog/Blog";
import Publish from "@/components/Blog/Publish";
import CommentList from "@/components/Blog/CommentList/CommentList";
import blogApi from "@/api/blogApi"
export default {
  components: { CommentList, Publish, Blog, ImgViewer, Login, BaseHeader},
  data(){
    return{
      transitionName:"",
      blogList:[]
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    handleSpinShow () {
      this.$Spin.show();
      setTimeout(() => {
        this.$Spin.hide();
      }, 500);
    },
    async getBlog(){
      let res = await blogApi.getBlogByUserid(1);
      this.blogList = res.data;
      console.log(res)
    }
  },
  created(){
    this.getBlog()
    console.log(this.blogList)
  },

  // watch $route 决定使用哪种过渡
  watch: {
    // '$route' (to, from) {
    //   this.handleSpinShow();
    // }
  }
};
</script>
<style>
 .content{
   background-repeat: no-repeat;
   background-position: center 0;
   background-attachment:fixed;
   background-size: 100%;
   background-image: url(https://file.iviewui.com/dev-dist/5825f033c6ff12cd1ed1f3c99dff5e4b.svg);

   /*background-color: #b4daf0;*/
   /*background-image-preview: url("../assets/body_bg.jpg");*/


 }

</style>
