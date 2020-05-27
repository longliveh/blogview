<template>
    <Card style="margin-bottom: 4px" v-if="userinfo">
        <div class="userinfo">
            <div style="float: left;">
                <router-link :to="'/user/'+this.userid">
                    <Avatar size="40" :src="'http://'+this.$host+'/static/avatar/'+userinfo.avatar"/>
                </router-link>
            </div>
            <div style="margin-left: 50px">
                <div class="name">
                    <router-link :to="'/user/'+this.userid">{{ userinfo.nickname}}</router-link>
                    <div v-if="this.userid != this.$store.state.user.userinfo.userid" class="focus">
                        <Button style="margin-right: 10px;width: 80px" v-if="isfocus" @click="focusOrnot" type="success" ghost="">取消关注</Button>
                        <Button v-else  @click="focusOrnot" type="primary" ghost>关注</Button>
                    </div>
                </div>
                <div class="detail">
                    <span>关注
                    <em style="color: blue"> {{userinfo.focus}}</em>
                    </span>
                    <span>粉丝
                    <em style="color: blue"> {{userinfo.fans}}</em>
                    </span>
                    <span>微博
                    <em style="color: blue"> {{userinfo.blogs}}</em>
                    </span>
                </div>
            </div>
        </div>
    </Card>
</template>

<script>
  import userApi from "../../api/userApi";

  export default {
    name: "UserInfo",
    props: {
      userid: {
        type: Number,
        require: true,
      }
    },
    data() {
      return {
        userinfo: null,
        isfocus:false
      };
    },
    methods: {
      async getUserinfo() {
        let res = await userApi.getInfo(this.userid);
        if (res.code == 0) {
          this.userinfo = res.data;
          console.log(res);
        }
      },
      async isFocus(){
        let res = await userApi.isfocus(this.userid);
        if (res.code == 20009){
          this.isfocus = true;
        } else {
          this.isfocus = false;
        }
      },
      async focusOrnot(){
        let res = await userApi.focus(this.userid,!this.isfocus)
        if (res.code == 0){
          this.isfocus = !this.isfocus;
        }
      },
    },
    mounted() {
      this.getUserinfo();
      this.isFocus();
    }
  };
</script>

<style scoped>
    .userinfo {
    }
    .name a{
        font-weight: 700;
        font-size: 14px;
        line-height: 18.2px;
        color: black;
    }
    .detail{
        font-size: 12px;
    }
    .detail span{
        margin-right: 14px;
    }
    .focus{
        display: inline;
    }
    .focus button{
        height: 20px;
        width: 60px;
        float: right;
        margin-right: 10px;
    }
</style>