<template>
    <div class="upload-area-div">
        <Upload
                v-show="filePercent===0"
                class="upload-area"
                :multiple="false"
                :show-upload-list="false"
                :before-upload="beforeUpload"
                :action="uploadUrl">
            <Button ref="upload" icon="ios-cloud-upload-outline">添加视频</Button>
        </Upload>
        <Icon style=" position:absolute;top:-7px;right:-7px;" type="md-close" @click.native="close"></Icon>
        <div class="upload-progress">
            <p v-if="filePercent!==0" class="file-name">{{fileName}}</p>
            <Progress v-if="filePercent" class="modu-progress" :percent="filePercent" :stroke-width="6"></Progress>
            <div class="progress-btn">
                <a size="large" class="modu-ghost-btn" v-if="filePercent !== 0&&filePercent!==100"
                   @click="cancel">取消
                </a>
                <a size="large" class="modu-ghost-btn" v-if="filePercent===100"
                   @click="reupload">重新上传
                </a>
                <!-- <Button type="primary" size="large" class="modu-primary-btn" v-show="filePercent === 100" @click="onComplete">完成</Button> -->
            </div>
        </div>
        <Modal v-model="cancelcheck"
               @on-ok="clear"
               width="200">
            <Icon type="ios-information-circle"></Icon>
            <span>取消上传视频</span>
        </Modal>
    </div>
</template>

<script>

  export default {
    name: "VedioUpload",
    props: {
      upType: {   // 是否允许拖拽上传,select为点击上传
        type: String,
        default: "drag"
      },
      uploadUrl: {   // 上传文件接口
        type: String,
        default: "/api/uploadvedio"
      },
      fileformat: {  // 允许上传的文件类型后缀
        type: Array,
        default: function() {
          return ["mp4"];
        }
      }
    },
    data() {
      return {
        fileName: null, // 文件名字
        filePercent: 0, // 上传进度
        uploadres: null,
        cancelcheck: false
      };
    },
    mounted() {

    },
    methods: {
      close() {
        if (this.filePercent == 0) {
          this.$emit("show");
        } else {
          this.cancelcheck = true;
        }
      },
      reupload() {
        this.clear();
        console.log(this.$refs.upload);
        this.$refs.upload.$el.click();
      },

      clear() {
        this.fileName = null;
        this.filePercent = 0;
        this.uploadres = null;
        this.cancelcheck = false;
      },
      // 上传之前
      beforeUpload(file) {
        this.fileName = file.name;
        this.fileAjaxUpload(file);
        return false;
      },
      // 上传文件请求
      fileAjaxUpload(file) {
        // var request = axios.create({
        //   baseURL: process.env.BASE_URL, // api 的 base_url
        //   timeout: 5000000, // 请求超时时间
        //   method: "post"
        // });
        let that = this;
        let cancelToken = that.$http.CancelToken;//Axios使我修改axios原型链了。
        that.source = cancelToken.source();
        var fd = new FormData();//声明formData()
        fd.append("file", file);
        that.$http({//发送axios请求
          method: "post",
          url: that.uploadUrl,
          data: fd,
          headers: { "Content-Type": "multipart/form-data" },
          cancelToken: that.source.token,//取消事件
          onUploadProgress(progressEvent) {//上传进度条事件
            if (progressEvent.lengthComputable) {
              let val = (progressEvent.loaded / progressEvent.total * 100).toFixed(0);
              that.filePercent = parseInt(val);
            }
          }
        })
          .then(function(r) {
            let res = r.data
            if (res.code == 20011) {
              that.$Message.success("已经完成上传");
              that.uploadres = res.data.asyncvedio;
            } else {
              that.$Message.error("上传失败");
            }
          })
          .catch(function(error) {
            setTimeout(function() {
              that.filePercent = 0;
              if (that.$http.isCancel(error)) {//主要是这里
                that.$Message.success("已经取消上传");
              }
            }, 500);
          });
      },
      cancel() {
        let that = this;
        if (that.source) {//我先判断soucre是否存在，因为如果我打开弹框不作任何操作，点击取消按钮没有这一层判断的话，that.source.cancel('取消上传');会报错。
          that.source.cancel("取消上传");//"取消上传"这几个字，会在上面catch（）的error中输出的，可以console看一下。
        }
      }
    }
  };
</script>

<style scoped>
    .upload-area-div {
        width: 88%;
        height: 100%;
        border: 1px dashed #515a6e;
        border-radius: 4px;
        padding: 4px 10px 4px 4px;
        display: inline-block;
        position: relative;
    }

    .upload-progress {

    }

    .modu-progress {
        width: 85%;
        float: left;

    }

    .modu-ghost-btn {
        display: inline;
        float: right;
    }
</style>