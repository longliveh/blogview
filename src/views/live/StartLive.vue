<template>
    <Card class="startlive">
        <div>
            <h3>第一步：推流软件下载</h3>
            <span style="font-weight: bold">PC端：</span>
            <span>下载OBS第三方推流软件</span>
            <a href="http://iview.talkingdata.com/#/components/icon">
                <Icon type="ios-link-outline"/>
                下载
            </a><br>
            <span style="font-weight: bold">Android端：</span>
            <span>下载“快直播”第三方推流软件</span>
        </div>
        <Divider style="margin: 12px auto"></Divider>
        <div>
            <h3>第二步：复制推流地址</h3>
            <p>推流地址</p>
            <Input v-model="rtpmurl" :type="type[type1]" disabled style="width: 300px">
                <Icon slot="suffix" @click="type1=++type1%2" type="ios-eye-outline" />
            </Input>
            <Button type="primary">复制</Button>
            <p>流名称</p>
            <Input v-model="livecode" :type="type[type2]" disabled style="width: 300px">
                <Icon slot="suffix" @click="type2=++type2%2" type="ios-eye-outline" />
            </Input>
            <Button type="primary">复制</Button>
        </div>
        <Divider style="margin: 12px auto"></Divider>
        <div>
            <h3>第三步：创建直播</h3>

            <Form ref="formValidate" :model="live" :rules="ruleValidate" label-position="top">
                <FormItem label="直播标题" prop="title">
                    <Input v-model="live.title" placeholder="直播标题（必填）" style="width: 400px" />
                </FormItem>
                <FormItem v-if="isliveing==false" label="微博正文" prop="content">
                    <Input v-model="live.content" type="textarea" :rows="4" placeholder="微博正文（必填）" style="width: 400px" />
                </FormItem>
                <FormItem v-if="isliveing==false">
                    <Button type="primary" @click="handleSubmit('formValidate')">创建直播并发布微博</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">清空</Button>
                </FormItem>
                <div v-else >
                    <Button type="warning" @click="endLive">结束直播</Button>
                    <Button style="margin-left: 20px" type="primary" @click="changetTitle">修改标题</Button>
                    <router-link v-if="liveinfo!=null" target="_blank" :to="'/live/'+liveinfo.userid" style="margin-left: 20px">点击查看直播</router-link>
                </div>
            </Form>

        </div>
        <Divider style="margin: 12px auto"></Divider>

        <div>
            <h3>第四步：结束直播</h3>
            <span>直播结束后，点击推流软件的结束按钮，并点击微博网页版的结束直播按钮.</span>
        </div>
    </Card>
</template>

<script>
    import liveApi from "../../api/liveApi"
  export default {
    name: "StartLive",
    data() {
      return {
        rtpmurl: "rtmp://47.102.214.2:1935/hls",
        livecode: "1",
        type:["password","text"],
        type1:0,
        type2:0,
        isliveing:false,
        live:{
          title:"",
          content:""
        },
        liveinfo:null,
        ruleValidate:{
          title: [
            { required: true, message: '请填写直播标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请填写微博内容', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            let res = await liveApi.createlive(this.live);
            if (res.code === 0) {
              this.$Notice.success({
                title:"直播创建成功"
              });
              this.getLiveInfo()
            }
          } else {
            this.$Message.error('请填写完整数据');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      async getLiveInfo()
      {
        let res = await liveApi.getliveinfo(this.$store.state.user.userinfo.userid);
        if (res.code == 0) {
          this.liveinfo = res.data;
          let liveinfo = res.data;
          this.live.title = liveinfo.title
          this.isliveing = true
        }
      },
      async changetTitle(){
        let res = await liveApi.changetTitle(this.live.title);
        if (res.code == 0){
          this.$Message.success('修改标题成功');
        }
      },
      async endLive()
      {
        let res = await liveApi.endlive();
        if (res.code == 0) {
          this.liveinfo = null;
          this.live.title = ""
          this.isliveing = false
        }
      }

    },
    mounted(){
      this.getLiveInfo();
    }
  };
</script>

<style scoped>
    .startlive {
        max-width: 910px;
    }
</style>