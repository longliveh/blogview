<template>
    <div style="margin-bottom: 10px">
        <Card class="blog">
            <div class="avatar">
                <router-link :to="'/user/'+blog.userid">
                    <Avatar v-if="load" size="50" :src="'http://'+this.$host+'/static/avatar/'+userinfo.avatar"/>
                </router-link>
            </div>
            <div class="b1">
                <div class="b2">
                    <router-link :to="'/user/'+blog.userid">{{ userinfo.nickname}}</router-link>
                </div>
                <div class="b3">
                    {{ time }}
                </div>
                <div class="b4">
                    {{ content }}
                    <span v-show="content_filed.isover">
                    <a @click='handleFold(false)' v-show="content_filed.maxLen  != content_filed.haystack.length">
                        展开<Icon type="ios-arrow-down"/>
                    </a>
                    <a @click='handleFold(true)' v-show="content_filed.maxLen  == content_filed.haystack.length">
                        收起<Icon type="ios-arrow-up"/>
                    </a>
                </span>
                </div>
                <ImgViewer v-if="blog.mediaType===1" :urlList="blog.urlList"></ImgViewer>
                <VedioPlayer v-if="blog.mediaType===2" :url="'http://'+this.$host+'/static/vedio/'+blog.urlList.substring(1,blog.urlList.length-1)"></VedioPlayer>
                <div v-if="blog.mediaType===3">
                    <router-link :to="'/live/'+blog.userid">
                        <Icon type="ios-videocam-outline" />{{ userinfo.nickname + "的直播" }}
                    </router-link>
                    <span v-if="liveinfo!=null&&blog.date===liveinfo.startdate" style="color: #19be6b">（正在直播）</span>
                    <span v-else style="color: #ff9900">（直播已结束）</span>
                </div>
            </div>
            <BlogBottom :blogid="blog.id" @Comment="handleComment"></BlogBottom>
            <!--<Comment></Comment>-->
            <div v-if="showComment" class="comment">
                <Spin v-if="loading">
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div>正在加载，请稍后...</div>
                </Spin>
                <div v-show="!loading">
                    <Comment @commentCall="addNewComment" :blogId="blog.id"></Comment>
                    <CommentList ref="comlist" :blogId="blog.id" @ok="loadingok"></CommentList>
                </div>
            </div>

        </Card>

    </div>

</template>

<script>
  import ImgViewer from "@/components/Blog/ImgViewer";
  import BlogBottom from "@/components/Blog/BlogBottom";
  import Comment from "@/components/Blog/Comment";
  import CommentList from "@/components/Blog/CommentList/CommentList";
  import commonApi from "../../api/commonApi";
  import dateformat from "@/utils/func";
  import VedioPlayer from "@/components/Blog/VedioPlayer";
  import liveApi from "../../api/liveApi"

  export default {
    name: "Blog",
    components: { VedioPlayer, CommentList, Comment, ImgViewer, BlogBottom },
    props: {
      blog: {
        type: Object,
        require: true
      },
      autoopen:{
        type: Boolean,
      }
    },
    data() {
      return {
        liveinfo:null,
        loading: true,
        showComment: false,
        content_filed: {
          haystack: "",
          maxLen: 150,
          mLen: 150,
          isover: false
        },
        load: false,
        userinfo: {}
      };
    },
    computed: {
      content() {
        this.content_filed.haystack = this.blog.content;
        const maxLen = this.content_filed.maxLen;
        const haystack = this.content_filed.haystack.toString();
        const length = haystack.length;
        if (length > maxLen) {
          this.content_filed.isover = true;
          return haystack.slice(0, maxLen) + "...";
        } else {
          return haystack;
        }
      },
      time() {
        return dateformat(this.blog.date);
      }
    },
    methods: {
      handleComment() {
        this.showComment = !this.showComment;
        this.loading = true;
      },
      handleFold(fold) {
        this.content_filed.maxLen = fold ? this.content_filed.mLen : this.content_filed.haystack.length;
      },
      async getUserInfo() {
        let res = await commonApi.getInfoById(this.blog.userid);
        this.userinfo = res.data;
        this.load = true;
      },
      loadingok() {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        setTimeout(()=>{
          if(this.$route.query.commentid!=null)
          {
            this.jump("#comment_"+this.$route.query.commentid)
          }
        },1000)
      },
      jump(querry) {
        this.$el.querySelector(querry).scrollIntoView({
          behavior: "smooth", // 平滑过渡
          block: "start" // 上边框与视窗顶部平齐。默认值
        });
        this.$el.querySelector(querry).style.border = "1px solid blue"
        console.log(this.$el.querySelector(querry).style)
      },
      async getLiveInfo()
      {
        let res = await liveApi.getliveinfo(this.blog.userid)
        if (res.code ===0 ) {
          this.liveinfo = res.data;
        }
      },
      addNewComment(comment)
      {
        console.log(comment)
        this.$refs.comlist.commentlv1.push(comment);
      }
    },
    created() {
      this.getUserInfo();
    },
    mounted() {
      if (this.blog.mediaType===3){
        this.getLiveInfo()
      }
      if (this.autoopen==true) {
        this.showComment = true;
      }
    }

  };
</script>

<style scoped>
    .blog {
        width: 600px;
        /*height: 308px;*/
        /*padding: 20px 20px 4px;*/
    }

    .avatar {
        width: 50px;
        height: 50px;
        float: left;
    }

    .b1 {
        margin: 0px 0px 0px 60px;
    }

    .b1 .b2 a {
        float: left;
        font-weight: 700;
        font-size: 14px;
        line-height: 18.2px;
        color: black;
    }

    .b2 {
        width: 500px;
        height: 23px;
    }

    .b3 {
        width: 500px;
        height: 15px;
        font-size: 12px;
        gap: normal;
        line-height: 15.6px;
        margin: 0px 0px 2px;
    }

    .b4 {
        width: 500px;
        /*max-height: 116px;*/
        font-size: 14px;
        color: hsl(0, 0%, 20%);
        line-height: 23px;
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        /*display: -webkit-box;*/
        /*-webkit-line-clamp: 4;*/
        /*-webkit-box-orient: vertical*/
    }

    .comment {
        background-color: hsl(240, 13%, 95%);
    }

    /*加载动画*/
    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .demo-spin-col {
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>