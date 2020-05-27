<template>
    <div class="livebox">
        <div v-if="liveinfo" style="width: 1253px;float: left">
            <Card class="headcard" style="width: 1253px;margin-bottom: 4px">
                <div v-if="userinfo" class="head">
                    <Avatar style="display: inline-block;float: left" class="avatar" size="70"
                            :src="'http://'+this.$host+'/static/avatar/'+userinfo.avatar">
                    </Avatar>
                    <div class="t_n">
                        <p style="font-size: 35px;line-height: 40px">{{liveinfo.title}}</p>
                        <router-link style="font-size: 18px" :to="'/user/'+userinfo.userid">
                            <Icon style="position: relative;top: 1px" size="25" type="ios-person-outline"/>
                            <span>{{userinfo.nickname}}</span>
                        </router-link>
                    </div>
                </div>
            </Card>

            <div class="video">
                <Barrage style="z-index: 99"></Barrage>
                <LiveVideo v-if="liveinfo.state"
                        :url="liveinfo.url+liveinfo.code+'/index.m3u8'"
                        errorimg="null"
                ></LiveVideo>
                <LiveVideo v-else="liveinfo.state"
                           :url="liveinfo.url+liveinfo.code+'/index.m3u8'"
                ></LiveVideo>
            </div>

        </div>
        <div class="chat">
            <Chat></Chat>
        </div>
    </div>
</template>

<script>
  import LiveVideo from "@/components/Live/LiveVideo";
  import Barrage from "@/components/Live/Barrage";
  import Chat from "../../components/Live/Chat";
  import liveApi from "../../api/liveApi";
  import commonApi from "../../api/commonApi";

  export default {
    components: { Chat, Barrage, LiveVideo },
    name: "Live",
    data() {
      return {
        liveinfo: null,
        userinfo: null
      };
    },
    methods: {
      async getLiveInfo() {
        let res = await liveApi.getliveinfo(this.$route.params.roomid);
        if (res.code == 0) {
          this.liveinfo = res.data;
          this.getUserInfo();
        }
      },
      async getUserInfo() {
        let res = await commonApi.getInfoById(this.liveinfo.userid);
        if (res.code == 0) {
          this.userinfo = res.data;
        }
      }
    },
    mounted() {
      this.getLiveInfo();
    }
  };
</script>

<style scoped>
    .livebox {
        width: 1603px;
        height: 843px;
        margin: 0 auto;
    }

    .video {
        width: 1253px;
        height: 705px;
        overflow: hidden;
        float: left;
    }

    .chat {
        width: 340px;
        height: 680px;
        float: right;
    }

    .head {
        height: 80px;
    }

    .headcard >>> .ivu-card-body {
        padding: 4px 0;
    }

    .t_n {
        display: inline-block;
        margin-left: 20px;
        margin-top: 4px;
    }
    .avatar{
        position: relative;
        left: 10px;
        top:4px
    }

</style>