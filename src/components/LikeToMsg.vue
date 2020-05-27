<template>
    <div class="outer">
        <div class="avatar">
            <router-link :to="'/user/'+userinfo.userid">
                <Avatar size="30" :src="'http://'+this.$host+'/static/avatar/'+userinfo.avatar"/>
            </router-link>
        </div>
        <div class="content">
            <div class="text">
                <router-link :to="'/user/'+userinfo.userid">
                    {{userinfo.nickname}}
                </router-link>
                <div style="color: #a3a1a1;float: right;">{{time}}</div>
            </div>
            <div v-if="type">
                赞了你的微博~
                <router-link :to="gotoblog">查看</router-link>
            </div>
            <div v-else>
                赞了你的评论~
                <CommentLv2 v-if="comment!=null" style="background-color: #EAEAEC" :showaction="false" :comment="comment"></CommentLv2>
            </div>
        </div>

    </div>
</template>

<script>
  import Comment from "@/components/Blog/Comment";
  import dateformat from "@/utils/func";
  import commonApi from "../api/commonApi";
  import commentsApi from "../api/commentsApi";
  import CommentLv2 from "./Blog/CommentLv2";




  export default {
    name: "CommentLv1",
    components: { CommentLv2,  Comment },
    props:{
      liketo:{
        type:Object
      }
    },
    data(){
      return{
        type:this.liketo.type==0?true:false,//blog=true,comment=false
        userinfo: {
          avatar:"default_avatar.jpg"
        },
        showComment:false,
        comment:null
      }
    },
    methods:{
      showcomment(){
        this.showComment=!this.showComment;
      },
      async getUserInfo() {
        let res = await commonApi.getInfoById(this.liketo.f);
        this.userinfo = res.data;
        console.log(this.userinfo)
        // this.load = true;
      },
      async getComment(){
        let res = await commentsApi.getCommentById(this.liketo.t);
        if (res.code == 0) ;
        {
            this.comment =  res.data;
        }
      },
    },
    computed: {
      time(){
        return dateformat(this.liketo.date)
      },
      gotoblog(){
        return "/blog/"+this.liketo.t;
      }
    },
    created(){
    },
    mounted(){
      this.getUserInfo();
      this.getComment();
    }
  }
</script>

<style scoped>
    .outer {
        padding: 5px 0 7px;
    }

    .avatar {
        width: 30px;
        height: 30px;
        float: left;
    }

    .content {
        margin-left: 40px;
        color: hsl(0, 0%, 20%);
        /*line-height: 20px;*/
    }

    .action {

    }
    .lv2list{
        background-color: hsl(240, 5%, 92%);
        margin: 8px 0px 10px;
        padding: 0px 12px;
    }
</style>