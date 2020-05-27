<template>
    <div class="outer">
        <div class="avatar">
            <router-link :to="'/user/'+comment.fromUser">
                <Avatar size="30" :src="'http://'+this.$host+'/static/avatar/'+userinfo.avatar"/>
            </router-link>
        </div>
        <div class="content">
            <div class="text">
                <router-link :to="'/user/'+comment.fromUser">
                    {{userinfo.nickname}}
                </router-link>
            </div>
            {{ comment.content }}
            <div class="action">
                <div style="float: right">
                    <a class="delete" v-if="this.userinfo.userid === this.$store.state.user.userinfo.userid"
                       @click="deleteComment">
                        <span>删除</span>
                        <Divider type="vertical" style="background: black"></Divider>
                    </a>
                    <a @click="showcomment">
                        <span>回复</span>
                    </a>
                    <Divider type="vertical" style="background: black"></Divider>
                    <a type="text" @click="likeComment">
                        <Icon v-if="isliked" color="red" type="ios-thumbs-up" size="18"/>
                        <Icon v-else type="ios-thumbs-up-outline" size="18"/>
                        {{ comment.star==0?"":comment.star}}
                    </a>
                </div>
                <div style="color: #a3a1a1">{{time}}</div>
            </div>
            <Comment @commentCall="addNewComment" v-if="showComment"
                     :blogId="this.comment.blogId"
                     :father="this.comment.id"
                     :toComment="this.comment.id"
                     style="background-color: white"
                     :placeholder="'回复 '+userinfo.nickname"></Comment>
            <div class="lv2list" v-for="item in commentlv2">
                <CommentLv2 @commentCall="addNewComment" @deleteme="deleteCom" v-if="showlv2" :id="'comment_'+item.id"
                            :father="comment.id" :comment="item"></CommentLv2>
            </div>
            <a>
                <span style="float: right" v-if="commentlv2.length>0&&commentlv2.length%10==0">查看更多</span>
            </a>
        </div>
    </div>
</template>

<script>
  import CommentLv2 from "./CommentLv2";
  import Comment from "@/components/Blog/Comment";
  import dateformat from "@/utils/func";
  import commonApi from "../../api/commonApi";
  import commentsApi from "../../api/commentsApi";


  export default {
    name: "CommentLv1",
    components: { Comment, CommentLv2 },
    props: {
      showlv2: {
        type: Boolean,
        require: true,
        default: true
      },
      comment: {
        type: Object,
        require: true
      }
    },
    data() {
      return {
        isliked: false,
        userinfo: {
          avatar: "default_avatar.jpg"
        },
        showComment: false,
        commentlv2: []
      };
    },
    methods: {
      showcomment() {
        this.showComment = !this.showComment;
      },
      async getUserInfo() {
        let res = await commonApi.getInfoById(this.comment.fromUser);
        this.userinfo = res.data;
        console.log(this.userinfo);
        // this.load = true;
      },
      async getComments() {
        let comment_p = 0;
        if (this.$store.getters.getBlogCommentCount.get(this.comment.blogId).lv2.get(this.comment.id) != null) {
          comment_p = this.$store.getters.getBlogCommentCount.get(this.comment.blogId).lv2.get(this.comment.id);
        }
        let res = await commentsApi.getComments({
          "blogid": this.comment.blogId,
          "orderby": 0,//0:点赞 1:时间
          "father": this.comment.id,
          "comment_p": comment_p
        });

        if (res.code == 0) ;
        {
          res.data.forEach((val) => {
            this.commentlv2.push(val);
          });
          let data = {};
          data = this.$store.getters.getBlogCommentCount.get(this.comment.blogId);
          data.lv2.set(this.comment.id, this.commentlv2.length);
          this.$store.commit("setblogCommentCount", {
            blogid: this.comment.blogId,
            data: data
          });
          console.log(this.commentlv2);
        }
      },
      async isLiked() {
        let res = await commentsApi.isLiked(this.comment.id);
        if (res.code == 0) {
          this.isliked = res.data.isliked;
        }
      },
      async likeComment() {
        let res = await commentsApi.likeComment(this.comment.id, this.isliked);
        if (res.code === 0) {
          if (this.isliked == false) {
            this.isliked = true;
            this.comment.star++;
          } else {
            this.isliked = false;
            this.comment.star--;
          }
        }
      },
      async deleteComment() {
        this.$Modal.confirm({
          title: this.commentlv2.length > 0 ? "<p>删除评论后，评论下的所有回复都会被删除</p>" : "<p>确认删除吗？</p>",
          content: "",
          onOk: async () => {
            let res = await commentsApi.deletecomment(this.comment.id);
            if (res.code === 0) {
              this.$emit("deleteme", this.comment);
              this.$Message.success("删除成功");
            }
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
        // let res = await commentsApi.deletecomment(this.comment.id);
        // if (res.code === 0) {
        //
        // }
      },
      deleteCom(comment) {
        for (let i = 0; i < this.commentlv2.length; i++) {
          if (this.commentlv2[i].id == comment.id) {
            this.commentlv2.splice(i, 1);
          }
        }
      },
      addNewComment(comment) {
        if (this.commentlv2 == null) {
          console.log(comment);
        }
        this.commentlv2.push(comment);
      }
    },
    computed: {
      time() {
        return dateformat(this.comment.date);
      }
    },
    created() {
      this.getUserInfo();
      this.getComments();
    },
    mounted() {
      this.isLiked();
    }
  };
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

    .lv2list {
        background-color: hsl(240, 5%, 92%);
        margin: 8px 0px 10px;
        padding: 0px 12px;
    }

    .delete {
        opacity: 0;
    }

    .outer:hover .delete {
        opacity: 1;
    }
</style>