<template>
    <Card class="container">
        <div class="photo-background">
        </div>

        <router-link :to="'/user/'+userid">
            <Avatar class="avatar" size="90"
                    :src="'http://'+this.$host+'/static/avatar/'+avatar">
            </Avatar>
        </router-link>
        <div class="user-detail">
            <div class="nameBox">
                <a class="name">{{ name }}</a>
            </div>
            <ul style="list-style: none;text-align: center;margin-top: 6px">
                <Row>
                    <Col span="8">
                        <li>
                            <a>
                                <strong>{{ focus }}</strong>
                                <span>关注</span>
                            </a>
                        </li>
                    </Col>
                    <Col span="8">
                        <li>
                            <a style="border: 1px #d9d9d9 solid;border-width: 0 1px">
                                <strong>{{ fans }}</strong>
                                <span>粉丝</span>
                            </a>
                        </li>
                    </Col>
                    <Col span="8">
                        <li>
                            <a>
                                <strong>{{ blogs }}</strong>
                                <span>微博</span>
                            </a>
                        </li>
                    </Col>
                </Row>


            </ul>
        </div>
    </Card>
</template>

<script>
  import userApi from "../api/userApi.js";

  export default {
    name: "UserCard",
    data() {
      return {
        userid:this.$store.state.user.userinfo.userid,
        avatar: this.$store.state.user.userinfo.avatar,
        name: this.$store.state.user.userinfo.nickname,
        focus: this.$store.state.user.userinfo.focus,
        fans: this.$store.state.user.userinfo.fans,
        blogs: this.$store.state.user.userinfo.blogs
      };
    },
    methods: {
      async getuserInfo() {
        let res = userApi.getInfo();
      }
    },
    created() {

    }
  };
</script>

<style scoped>
    .container {
        width: 298px;
        height: 228px;
        padding: 0;
        text-align: center;
        /*background: rgba(0, 149, 255, .2)*/
        /*opacity:0.2;*/
    }


    .photo-background {
        height: 114px;
        background: url(https://jyjjj.top/wp-content/themes/kratos-pjax-master/static/images/about.jpg) no-repeat center center;
        -webkit-background-size: cover;
        background-size: cover;
    }

    .avatar {
        margin: -60px auto 0;
    }

    .container >>> .ivu-card-body {
        padding: 0;
    }

    .user-detail {
        height: 74px;
    }

    .user-detail ul li {
        float: left;
        width: 100%;
        height: 100%;
    }

    .user-detail ul li a {
        display: block;
        color: black;
        width: 100%;
        height: 100%;
    }

    .user-detail a:hover {
        color: #cb7350;
    }

    .user-detail ul li a strong {
        display: block;
        font-weight: bold;
        line-height: 14px;
        font-size: 18px;
    }

    .user-detail ul li a span {
        color: #808080;
    }

    .nameBox {
        color: black;
        margin-top: 5px;
    }

    .nameBox a {
        color: black;
        font-size: 14px;
        font-weight: bold;
    }
</style>