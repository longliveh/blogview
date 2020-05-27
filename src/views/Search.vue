<template>
    <div style="width: 800px;">
        <Card class="searchbar">
            <Input :placeholder="search" v-model="query" style="width: 650px"/>
            <Button style="margin-left: 40px" type="primary" @click="search_fun">搜索</Button>
        </Card>
        <div style="margin-bottom: 10px">
            <Card class="select">
                <Tabs v-model="select" style="width: 100%">
                    <TabPane label="综合" icon="md-stats" name="0"></TabPane>
                    <TabPane label="用户" icon="md-person" name="1"></TabPane>
                    <TabPane label="图片" icon="md-images" name="2"></TabPane>
                    <TabPane label="视频" icon="logo-youtube" name="3"></TabPane>
                    <TabPane label="直播" icon="md-videocam" name="4"></TabPane>
                </Tabs>
            </Card>
        </div>
        <div class="conentlist">
            <div v-if="select=='1'" style="width:600px;float: left">
                <template v-for="item in userList">
                    <UserInfo :userid="item"></UserInfo>
                </template>
            </div>
            <div v-else-if="select=='0'" style="width:600px;float: left">
                <template v-for="item in blogList">
                    <Blog :key="item.blogid" :blog="item"></Blog>
                </template>
            </div>
            <div v-else style="width:600px;float: left">
                <template v-for="item in filterList">
                    <Blog :key="item.blogid" :blog="item"></Blog>
                </template>
            </div>

            <div style="width: 180px;float: right;">
                <Card>
                    <p slot="title">搜索历史</p>
                    <template v-for="item in search_history">
                        <a class="serach_history" @click="click_history(item)">
                            <p>{{item}}</p>

                        </a>
                    </template>
                </Card>
            </div>
        </div>

    </div>
</template>

<script>
  import Storage from "@/utils/storage";
  import commonApi from "../api/commonApi";
  import Blog from "@/components/Blog/Blog";
  import UserInfo from "@/components/User/UserInfo";

  export default {
    name: "Search",
    components: { UserInfo, Blog },
    data() {
      return {
        search_history:JSON.parse(Storage.get("search_list")).reverse(),
        select: "0",
        search: this.$route.query.search,
        query: this.$route.query.search,
        searchres: new Map(),
        blogList: [],
        userList:[],
        filterList:[]
      };
    },
    methods: {
      click_history(item){
        this.query = item
      },
      search_fun() {
        if(this.query.length==0)
          return
        let liststr = Storage.get("search_list");
        let list = JSON.parse(liststr)
        if(list == null)
          list = new Array()
        if (list.length>=10) {
          list = list.slice(list.length-10,list.length)
        }
        list.push(this.query);
        this.search_history = list.reverse()
        Storage.set("search_list", list);
        this.selected(this.select);
      },
      async selected(select) {
        if (this.searchres == null) {
          this.searchres = new Map();
        }

        switch (select) {
          case "0":
            let res0 = await commonApi.search(0, this.query);
            if (res0.code == 0) {
              this.searchres.set("blog", res0.data);
              this.blogList = res0.data;
            }
            break;
          case "1":
            let res1 = await commonApi.search(1, this.query);
            if (res1.code == 0) {
              this.searchres.set("user", res1.data);
              this.userList = res1.data
            }
            break;
          case "2":
            console.log("2")
            this.filterList = this.blogList.filter((item)=>{
              return item.mediaType == 1
            }) ;
            break;
          case "3":
            this.filterList = this.blogList.filter((item)=>{
              return item.mediaType ==2
            }) ;
            break;
          case "4":
            this.filterList = this.blogList.filter((item)=>{
              return item.mediaType == 3
            });
            break;
          default :

            break;
        }
      }
    },
    watch: {
      select(val, oldVal){//普通的watch监听
        this.selected(val)
      }
    }
  };
</script>

<style scoped>

    .serach_history{
        width: 100%;
        height: 100%;
    }

    .serach_history p:hover{
        background-color: hsl(240, 13%, 95%);
    }

    .conentlist {
        width: 800px;
    }

    .searchbar {
        margin-bottom: 10px;
    }

    .select {
        text-align: center;
    }

    .select >>> .ivu-card-body {
        padding-bottom: 0px;
    }

    .select >>> .ivu-tabs-tab {
        width: 130px;
    }

    .select >>> .ivu-tabs-ink-bar {
        width: 140px;
    }
</style>