<template>
    <Card style="margin-top: 10px">
        <Tabs value="name1" style="width: 264px">
            <TabPane label="最近评论我" name="name1">
                <Scroll class="scroll">
                    <div v-for="item in comment" style="border-bottom: 1px solid #E8EAEC">
                        <router-link :to="{path: '/blog/'+item.blogId, query: {commentid: item.id }}">
                            <CommentLv1 :showlv2="false" :comment="item"></CommentLv1>
                        </router-link>
                    </div>
                </Scroll>

            </TabPane>
            <TabPane label="最近赞我" name="name2">
                <div v-for="item in liketo">
                    <LikeToMsg :liketo="item"></LikeToMsg>
                </div>
            </TabPane>
        </Tabs>
    </Card>
</template>

<script>
  import CommentLv1 from "./Blog/CommentLv1";
  import LikeToMsg from "./LikeToMsg";
  import commentsApi from "../api/commentsApi";
  import userApi from "../api/userApi";

  export default {
    name: "RecentMsg",
    components: { LikeToMsg, CommentLv1 },
    data() {
      return {
        comment: [],
        liketo:[]
      };
    },
    methods: {
      async getRecentComment() {
        let res = await commentsApi.recentComment();
        if (res.code == 0) {
          this.comment = res.data;
        }
      },
      async getwholikedmeRecent() {
        let res = await userApi.getwholikedmeRecent();
        if (res.code == 0) {
          this.liketo = res.data;
        }
      }
    },
    mounted() {
      this.getRecentComment();
      this.getwholikedmeRecent();
    }
  };
</script>

<style scoped>
    .scroll >>> .ivu-scroll-container::-webkit-scrollbar {
        width: 0 !important;
    }
</style>