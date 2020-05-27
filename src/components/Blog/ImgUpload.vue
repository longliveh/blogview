<template>
    <div style="border: 1px dashed #515a6e;border-radius: 4px;padding: 4px 10px 4px 4px;display: inline-block; position:relative;">
        <div class="demo-upload-list" v-for="(item,index) in imgBase64">
            <template>
                <img :src="item.base64">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.name,index)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                </div>
            </template>
        </div>
        <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
        <Icon style=" position:absolute;top:-7px;right:-7px;" type="md-close" @click.native="clear"></Icon>
        <Modal title="View Image" v-model="visible">
            <p v-if="visible">{{ imgBase64[index].name }}</p>
            <img :src="imgBase64[index].base64" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
  export default {
    name: "ImgUpload",
    props:{
    },
    data() {
      return {
        index:0,
        visible: false,
        fileList: [],
        imgBase64:[]
      };
    },
    methods: {
      clear(){
        this.fileList=[];
        this.imgBase64=[];
        this.$emit('closeimg', false);
      },
      handleView(name,index) {
        this.imgName = name;
        this.visible = true;
        this.index=index;
      },
      handleRemove(index) {
        // const fileList = this.$refs.upload.fileList;
        // this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        this.fileList.splice(index,1)
        this.imgBase64.splice(index,1)
        // console.log(this.imgBase64,this.fileList)
      },
      handleSuccess(res, file) {
        file.url = "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
        file.name = "7eb99afb9d5f317c912f08b5212fd69a";
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: "The file format is incorrect",
          desc: "File format of " + file.name + " is incorrect, please select jpg or png."
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: "Exceeding file size limit",
          desc: "File  " + file.name + " is too large, no more than 2M."
        });
      },
      handleBeforeUpload(file) {


        if (this.fileList.length < 9) {
          //获取图片实现本地预览
          let reader = new FileReader();
          reader.onload = (e)=>{
            this.imgBase64.push({
              name:file.name,
              base64:e.target.result
            })
          }
          reader.readAsDataURL(file);
          this.fileList.push(file);
        }else {
          this.$Notice.warning({
            title: "最多能上传9张图片!"
          });
        }
        return false;
      }
    },
  };
</script>
<style>
    .demo-upload-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>