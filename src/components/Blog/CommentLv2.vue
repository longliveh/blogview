<template>
    <div class="outer">
        <div v-if="father===comment.toComment" class="content">
            <router-link :to="'/user/'+fromuserinfo.userid">
                {{fromuserinfo.nickname}}
            </router-link>
            ：{{comment.content}}
        </div>
        <div v-else class="content">
            <router-link :to="'/user/'+fromuserinfo.userid">
                {{fromuserinfo.nickname}}
            </router-link>
            回复
            <router-link :to="'/user/'+touserinfo.userid">
                {{touserinfo.nickname}}
            </router-link>
            ： {{comment.content}}
        </div>
        <div v-if="showaction" class="action">
            <div style="float: right">
                <a class="delete" v-if="this.fromuserinfo.userid === this.$store.state.user.userinfo.userid"
                   @click="deleteComment">
                    <span>删除</span>
                    <Divider type="vertical" style="background: black"></Divider>
                </a>
                <a @click="show">
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
        <Comment
                @commentCall="addNewComment"
                v-if="showComment"
                :blogId="this.comment.blogId"
                :father="father"
                :toComment="this.comment.id"
                style="background-color: white"
                :placeholder="'回复 '+fromuserinfo.nickname"></Comment>

    </div>
</template>

<script>
  import Comment from "@/components/Blog/Comment";
  import dateformat from "@/utils/func";
  import commonApi from "../../api/commonApi";
  import commentsApi from "../../api/commentsApi";

  export default {
    name: "CommentLv2",
    components: { Comment },
    props: {
      showaction: {
        type: Boolean,
        default: true
      },
      comment: {
        type: Object,
        default: {}
      },
      father: {
        type: Number,
        default: -1
      }
    },
    data() {
      return {
        isliked: false,
        showComment: false,
        fromuserinfo: {},
        touserinfo: {}
      };
    },
    methods: {
      show() {
        this.showComment = !this.showComment;
      },
      async getUserInfo() {
        let res = await commonApi.getInfoById(this.comment.fromUser);
        this.fromuserinfo = res.data;
      },
      async findToUserInfo() {
        let res = await commonApi.getUserbyCommentId(this.comment.id);
        this.touserinfo = res.data;
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
          title: "<p>确认删除吗？</p>",
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
      },
      addNewComment(comment) {
        this.$emit("commentCall",comment)
      }

    },
    created() {

    },
    beforeUpdate() {

    },
    computed: {
      time() {
        return dateformat(this.comment.date);
      }

    },
    mounted() {
      this.isLiked();
      this.getUserInfo();
      if (this.father !== this.comment.toComment) {
        this.findToUserInfo();
      }
    }
  };
</script>

<style scoped>
    .outer {
        padding: 5px 0 7px;
        border-bottom: 1px solid #d9d9d9;
    }

    .content {
        color: hsl(0, 0%, 20%);
        font-size: 12px;
        line-height: 20px;
        padding: 0 0 2px;
    }

    .delete {
        opacity: 0;
    }

    .outer:hover .delete {
        opacity: 1;
    }
</style>