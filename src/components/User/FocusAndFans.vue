<template>
    <Card style="width: 280px">
        <Tabs v-model="chose">
            <TabPane :distance-to-edge="distance" loading-text="加载中" :label="label_focus" name="focus">
                <Scroll :on-reach-bottom="handleReachBottom" class="scroll" :height="scrollheight">
                    <template v-for="item in focusList">
                        <UserInfo :userid="item.t"></UserInfo>
                    </template>
                </Scroll>
            </TabPane>
            <TabPane :distance-to-edge="distance" loading-text="加载中" :label="label_fans" name="fans">
                <Scroll :on-reach-bottom="handleReachBottom" class="scroll" :height="scrollheight">
                    <template v-for="item in fansList">
                        <UserInfo :userid="item.f"></UserInfo>
                    </template>
                </Scroll>
            </TabPane>
            <TabPane :label="label_blogs"></TabPane>
        </Tabs>
    </Card>
</template>

<script>
    import userApi from "../../api/userApi"
    import UserInfo from "@/components/User/UserInfo";
  export default {
    name: "FocusAndFans",
    components: { UserInfo },
    props: {
      focus: {
        type: Number,
        require: true
      },
      fans: {
        type: Number,
        require: true
      },
      blogs: {
        type: Number,
        require: true
      }
    },
    data() {
      return {
        distance:-20,
        scrollheight:0,
        chose:-1,
        focusList:[],
        fansList:[],
        focus_fans_blogs:{
          "text-align": "center",
          "line-height": "18px"
        },
        label_focus: (h) => {
          return h("div", {
            "style": this.focus_fans_blogs
          }, [
            h("p", "关注"),
            h("span", this.focus)
          ]);
        },
        label_fans: (h) => {
          return h("div",{
            "style": this.focus_fans_blogs
          }, [
            h("p", "粉丝"),
            h("span", this.fans)
          ]);
        },
        label_blogs: (h) => {
          return h("div",{
            "style": this.focus_fans_blogs
          }, [
            h("p", "微博"),
            h("span", this.blogs)
          ]);
        }
      };
    },
    watch:{
      chose(newv,oldv){
        switch (newv) {
          case "focus":
            this.getFocusOrFans(10)
            break;
          case "fans":
            this.getFocusOrFans(20)
            break;
        }
      }
    },
    methods:{
      async getFocusOrFans(type){
        let res = await userApi.getFocusOrFansList(this.$route.params.userid,type)
        if (type == 10){
          this.focusList = res.data
          this.scrollheight=this.focusList.length>=5?400:this.focusList.length*80
        }
        if (type == 20){
          this.fansList = res.data
          this.scrollheight=this.fansList.length>=5?400:this.fansList.length*80
        }
      },
      handleReachBottom (type) {
        return new Promise(resolve => {

            resolve();
        });
      }
    },
    mounted(){
      this.chose="focus"
    }
  };
</script>

<style scoped>
    .scroll >>> .ivu-scroll-container::-webkit-scrollbar {
        width: 0 !important;
    }

</style>