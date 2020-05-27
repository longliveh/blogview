<template>
    <div class="container">
        <div style="width: 100%;text-align: center">
            <div v-if="this.userid == this.$store.state.user.userinfo.userid">
                <Tooltip content="更换头像" placement="right" theme="light">
                    <a @click="toggleShow">
                        <Avatar class="avatar" size="100"
                                :src="'http://'+this.$host+'/static/avatar/'+avatar">
                        </Avatar>
                    </a>
                </Tooltip>
                <ImgUpload field="img"
                           @crop-success="cropSuccess"
                           @crop-upload-success="cropUploadSuccess"
                           @crop-upload-fail="cropUploadFail"
                           v-model="show"
                           :width="300"
                           :height="300"
                           url="/api/changeavatar"
                           :headers="headers"
                           img-format="png"></ImgUpload>
            </div>
            <Avatar v-else class="avatar" size="100"
                    :src="'http://'+this.$host+'/static/avatar/'+avatar">
            </Avatar>
        </div>
        <div class="name">
            <h1 style="display: inline;font-weight: normal;font-size: 22px">{{ nickname }}</h1>
            <div style="display: inline" v-if="this.userid == this.$store.state.user.userinfo.userid">
                <Tooltip content="修改昵称" placement="right" theme="light">
                    <a @click="model = true">
                        <Icon size="30" type="ios-create-outline"/>
                    </a>
                </Tooltip>
                <Modal v-model="model" @on-ok="changeName" draggable scrollable title="修改昵称">
                    <Input v-model="newname" maxlength="16"></Input>
                </Modal>
            </div>
        </div>
        <div v-if="this.userid != this.$store.state.user.userinfo.userid" class="focus">
            <Button v-if="isfocus" @click="focusOrnot" type="success" icon="md-remove" shape="circle">已关注</Button>
            <Button v-else @click="focusOrnot" type="primary" icon="md-add" shape="circle">关注</Button>
        </div>
    </div>
</template>

<script>
  import userApi from "@/api/userApi";
  import ImgUpload from "vue-image-crop-upload";

  export default {
    name: "UserHeader",
    components: { ImgUpload },
    props: {
      userid: {
        type: Number,
        require: true
      },
      avatar: {
        type: String
      },
      nickname: {
        type: String
      }
    },
    data() {
      return {
        isfocus: false,
        show: false,
        model:false,
        newname:this.nickname,
        headers: {
          smail: "*_~"
        },
        imgDataUrl: "" // the datebase64 url of created image
      };
    },
    methods: {
      async changeName(){
        if(this.nickname==this.newname)
        {
          this.$Message.warning("昵称和原来的一样")
        }else {
          let res = await userApi.changeName(this.newname);
          if (res.code == 0) {
            this.nickname = this.newname
            this.$Message.success("修改成功")
          }
        }
      },
      async focusOrnot() {
        let res = await userApi.focus(this.userid, !this.isfocus);
        if (res.code == 0) {
          this.isfocus = !this.isfocus;
        }
      },
      async isFocus() {
        let res = await userApi.isfocus(this.userid);
        if (res.code == 20009) {
          this.isfocus = true;
        } else {
          this.isfocus = false;
        }
      },
      toggleShow() {
        this.show = !this.show;
      },
      /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess(imgDataUrl, field) {
        console.log("-------- crop success --------");
      },
      /**
       * upload success
       *
       * [param] jsonData   服务器返回数据，已进行json转码
       * [param] field
       */
      cropUploadSuccess(jsonData, field) {
        console.log("-------- upload success --------");
        console.log(jsonData);
        this.$store.dispatch("getUserInfo").then(() => {
          this.$router.go(0);
        });
        console.log("field: " + field);
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail(status, field) {
        console.log("-------- upload fail --------");
        console.log(status);
        console.log("field: " + field);
      }
    },
    created() {
    },
    mounted() {
      this.isFocus();
    }
  };
</script>

<style scoped>
    .container {
        height: 220px;
        width: 100%;
        background-image: url("http://img.t.sinajs.cn/t5/skin/public/covervip/2048.jpg");
        margin-bottom: 10px;
    }

    .avatar {
        position: relative;
        margin: 30px auto 0;
    }

    .name {
        margin-top: 6px;
        color: #fff;
        text-align: center;
    }

    .focus {
        text-align: center;
    }
</style>