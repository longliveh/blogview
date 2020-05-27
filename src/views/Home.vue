<template>
  <div class="content_">
    <Affix :offset-top="1">
      <BaseHeader></BaseHeader>
    </Affix>

    <!--<Login></Login>-->
    <!--<Publish></Publish>-->
    <!--<LiveVideo></LiveVideo>-->


    <router-view class="main"/>


  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseHeader from "@/views/BaseHeader";
export default {
  components: {  BaseHeader},
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
    }
  },
  created(){

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
 .content_{
   /*background-repeat: no-repeat;*/
   /*background-position: center 0;*/
   /*background-attachment:fixed;*/
   /*!*width: 100%;*!*/
   /*!*height: 100%;*!*/
   /*background-size: 100%;*/

   /*!*background-image: url(https://file.iviewui.com/dev-dist/5825f033c6ff12cd1ed1f3c99dff5e4b.svg);*!*/
   /*background-image: url("../assets/bg1.jpg");*/
   /*overflow: auto;*/
   /*!*background-color: #b4daf0;*!*/
   /*!*background-image: url("../assets/body_bg.jpg");*!*/
 }
  .main{
    margin:0 auto;
  }


</style>
