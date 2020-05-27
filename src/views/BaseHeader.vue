<template>
    <Row class="headRow">
      <Menu class="header" mode="horizontal" theme="light" @on-select="selectMenu">
        <i-col span="2">
          <Icon></Icon>
        </i-col>

        <i-col :span="4">
          <router-link to="/general">
            <img class="logo" src="../assets/logo.png" />
          </router-link>
        </i-col>

        <i-col span="5">
          <!--<MenuItem name="1">-->
            <Input search v-model="search" @on-search="s" style="width: 250px" />
          <!--</MenuItem>-->
        </i-col>
        <i-col span="5">
          <MenuItem name="2">
            <Icon size="23" type="ios-home-outline" />
            首页
          </MenuItem>
          <MenuItem name="3">
            <Icon size="23" type="ios-videocam-outline" />
            直播
          </MenuItem>
          <MenuItem name="4">
            <Icon size="20" type="md-bulb" />
            发现
          </MenuItem>
        </i-col>
        <i-col span="6" v-if="islogin">
          <MenuItem name="5" class="username">
            <Icon type="md-person" />
            {{ name }}
          </MenuItem>
          <Submenu name="6" style="width: 100px">
            <template slot="title">
              <Icon size="20" type="ios-mail-outline" />
              <Badge dot class="dot"> </Badge>
            </template>

            <!--<Badge :count="message.atCount">-->
              <!--<MenuItem name="6-1">@我的</MenuItem>-->
            <!--</Badge>-->
            <Badge :count="message.commentCount">
              <MenuItem name="6-2">评论</MenuItem>
            </Badge>
            <Badge :count="message.fabulousCount">
              <MenuItem name="6-3">点赞</MenuItem>
            </Badge>
            <!--<MenuGroup title="私信">-->
              <!--<Badge :count="message.letterCount">-->
                <!--<MenuItem name="6-4">私信</MenuItem>-->
              <!--</Badge>-->
              <!--<Badge :count="message.strangerCount">-->
                <!--<MenuItem name="6-5">陌生人</MenuItem>-->
              <!--</Badge>-->
            <!--</MenuGroup>-->
          </Submenu>
          <Submenu name="7">
            <template slot="title">
              <Icon type="ios-settings" />
            </template>
            <MenuGroup title="使用">
              <MenuItem name="7-1">退出</MenuItem>
            </MenuGroup>
          </Submenu>
        </i-col>
        <i-col span="6" v-else>
          <MenuItem name="8">
            <a>注册</a>
          </MenuItem>

          <MenuItem name="9">
            <a>登录</a>
          </MenuItem>
        </i-col>
        <i-col span="2">
          <Icon></Icon>
        </i-col>
      </Menu>
    </Row>
</template>
<script>
export default {
  name: "BaseHeader",
  data() {
    return {
      search: "",
      islogin: this.$store.state.user.islogin,
      name: "",
      message: {
        atCount: 9,
        commentCount: 9,
        fabulousCount: 9,
        letterCount: 9,
        strangerCount: 9
      }
    };
  },
  methods: {
    init(){
      this.name = this.$store.state.user.userinfo.nickname;
    },
    selectMenu(name) {

      switch (name) {
        case "2":
          this.$router.push("/general");
          console.log(this.$store.state.user)
          break;
        case "3":
          this.$router.push("/startlive");
          break;
        case "5":
          this.$router.push("/user/"+this.$store.state.user.userinfo.userid);
          break;
        case "7-1":
          this.$store.dispatch("logOut").then(()=>{
            this.$router.push("/");
            this.$router.go("0")
          })
          break;
        case "8":
          this.$router.push("/regist");
          break;
        case "9":
          this.$router.push("/login");
          break;

      }
    },
    s()
    {
      console.log("search");
      this.$router.push({ path: '/search', query: { search: this.search }})
    }

  },
  watch: {
    // $route (to, from) {
    //   this.$router.go(0)
    // }
  },
  created(){
    this.init();
  }
};
</script>

<style scoped>

.logo {
  margin: 0px 0px -5px 120px;
}
.username {
  width: 176px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.header {
  background-color: hsla(0, 0%, 100%, 0.94);
  border-color: hsl(21, 95%, 61%);
  border-style: solid none none;
  border-width: 2px 0px 0px;
}

.headRow{
  margin-top: -1px;
}

.headRow li {
  font-size: 16px;
}
.dot {
  height: 20px;
}
</style>
