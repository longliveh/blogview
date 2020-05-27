<template>
    <div class="comments">
        <Divider style="margin: 4px 0px;background: #808695"></Divider>
        <div class="orderby">
            <a :style="{fontWeight:(orderBy==0?'bold':'normal')}" @click="orderBy=0">
                按热度
            </a>
            <Divider type="vertical" style="background: black"></Divider>
            <a :style="{fontWeight:(orderBy==1?'bold':'normal')}" @click="orderBy=1">
                按时间
            </a>
        </div>
        <Scroll class="scroll" :height="commentheight" :on-reach-bottom="handleReachBottom">
            <template v-for="item in commentlv1">
                <CommentLv1 @deleteme="deleteCom" :comment="item" :id="'comment_'+item.id"></CommentLv1>
            </template>
        </Scroll>
    </div>
</template>

<script>
  import CommentLv1 from "@/components/Blog/CommentLv1";
  import commentsApi from "../../../api/commentsApi";

  export default {
    name: "CommentList",
    components: { CommentLv1 },
    props: {
      blogId: {
        type: Number,
        require: true
      }
    },
    data() {
      return {
        loading: true,
        orderBy: 0,
        commentlv1: [],
        commentheight:0
      };
    },
    methods: {
      async getData() {
        let comment_p = 0;
        if (this.$store.getters.getBlogCommentCount != null && this.$store.getters.getBlogCommentCount.get(this.blogId) != null) {
          comment_p = this.$store.getters.getBlogCommentCount.get(this.blogId).get("lv1");
        }
        let res = await commentsApi.getComments({
          "blogid": this.blogId,
          "orderby": this.orderBy,//0:点赞 1:时间
          "father": -1,
          "comment_p": comment_p
        });


        if (res.code == 0) ;
        {
          let data = {}
          if(comment_p == 0)
          {
            data = {
              lv1:this.commentlv1.length,
              lv2:new Map()
            }
          }else {
            data = this.$store.getters.getBlogCommentCount.get(this.blogId);
            data.lv1 = this.commentlv1.length+res.data.length
          }
          this.$store.commit("setblogCommentCount", {
            blogid: this.blogId,
            data: data
          });
          console.log(this.$store.getters.getBlogCommentCount.get(this.blogId))
          res.data.forEach((val) => {
            this.commentlv1.push(val);
          });
          this.commentheight = this.commentlv1.length*300
          console.log(this.commentlv1);
          this.$emit("ok");
        }
      },
      handleReachBottom() {
        setTimeout(()=>{
          this.getData();
        },1000)
      },
      deleteCom(comment) {
        for (let i = 0; i < this.commentlv1.length; i++) {
          if (this.commentlv1[i].id == comment.id) {
            this.commentlv1.splice(i, 1);
          }
        }
      }

    },
    created() {
      this.getData();
    }
  };
</script>

<style scoped>
    .comments {
        color: hsl(0, 0%, 20%);
        padding: 0px 20px 6px;
        background-color: hsl(240, 13%, 95%);
        position: relative;
    }

    .orderby a {
        color: black;
    }
    .scroll >>> .ivu-scroll-container::-webkit-scrollbar {
        width: 0 !important;
    }

</style>