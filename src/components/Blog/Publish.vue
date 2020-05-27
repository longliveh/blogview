<template>
    <Card class="publish">

        <Input
                v-model="content"
                type="textarea"
                placeholder="每日新鲜事"/>
        <div>
            <div class="emojiselect">
                <twemoji-picker
                        class="emoji"
                        :emojiData="emojiDataAll"
                        :emojiGroups="emojiGroups"
                        :skinsSelection="false"
                        :searchEmojisFeat="true"
                        searchEmojiPlaceholder="查找表情"
                        searchEmojiNotFound="Emojis not found."
                        isLoadingLabel="Loading..."
                        :randomEmojiArray="['😀']"
                        @emojiUnicodeAdded="append"
                ></twemoji-picker>
                <span style="margin-left: -6px">表情</span>
            </div>
            <div class="imgup">
                <a @click="showImgOrnot" style="user-select:none;">
                    <img style="width: 25px;height: 25px;vertical-align: middle" src="../../assets/imgicon.png">
                    <span style="margin-left: 6px">图片</span>
                </a>
            </div>
            <div class="imgup">
                <a @click="showVedioOrnot" style="user-select:none;">
                    <img style="width: 25px;height: 25px;vertical-align: middle" src="../../assets/vedioiocon.png">
                    <span style="margin-left: 6px">视频</span>
                </a>
            </div>
            <div class="publishbtn">
                <Button type="primary" @click="publish" :disabled="content===''||uploading">发布</Button>
            </div>
        </div>
        <ImgUpload ref="img" @closeimg="showImgOrnot" v-show="showImg"></ImgUpload>
        <VedioUpload ref="vedio" v-show="showVedio" @show="showVedio = false"></VedioUpload>
    </Card>
</template>

<script>
  import {
    TwemojiPicker
  } from "@kevinfaguiar/vue-twemoji-picker";
  import EmojiAllData from "@kevinfaguiar/vue-twemoji-picker/emoji-data/zh/emoji-all-groups.json";
  import EmojiGroups from "@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json";
  import ImgUpload from "@/components/Blog/ImgUpload";
  import blogApi from "../../api/blogApi";
  import VedioUpload from "@/components/Blog/VedioUpload";

  export default {
    name: "Publish",
    components: {
      VedioUpload,
      ImgUpload,
      "twemoji-picker": TwemojiPicker
    },
    data() {
      return {
        mediaType: 0,    //0：仅文字    1：图片    2：视频
        showImg: false,
        showVedio: false,
        uploading: false,
        content: ""
      };
    },
    methods: {
      async publish() {
        if (this.mediaType == 0 || this.mediaType == 1) {
          if (this.content == "" && this.$refs.img.fileList.length == 0) {
            this.$Message.error("不能发空微博哦！");
          } else {
            blogApi.publish_img({
              "content": this.content,
              "filelist": this.$refs.img.fileList
            }, res => {
              this.$Message.success("发布成功！");
              this.content = "";
              this.$refs.img.fileList = [];
              this.$refs.img.imgBase64 = [];
            });
          }
        } else if (this.mediaType == 2) {
          let res = await blogApi.publish_vedio(this.content, this.$refs.vedio.uploadres);
          if (res.code==0) {
            this.$Message.success("发布成功！");
            this.content = "";
            this.$refs.vedio.clear()
          }
        }
      },
      append(emoji) {
        this.content += emoji;
        console.log(this.content.toString());
      },
      showImgOrnot() {
        this.mediaType = 1;
        this.showVedio = false;
        this.showImg = !this.showImg;
      },
      showVedioOrnot() {
        this.mediaType = 2;
        this.showImg = false;
        this.showVedio = !this.showVedio;
      }
    },
    computed: {
      emojiDataAll() {
        return EmojiAllData;
      },
      emojiGroups() {
        return EmojiGroups;
      }
    }
  };
</script>

<style scoped>
    .publish {
        width: 600px;
        margin-bottom: 10px;
    }

    .emojiselect {
        display: inline-block;
        margin-right: 20px;
        height: 40px;
    }

    .emoji {
        display: inline-block;
        margin-top: -12px;
    }

    .imgup {
        /*overflow:hidden;*/
        display: inline-block;
        margin-right: 20px;
        /*margin-bottom: -22px;*/
        /*height: 40px;*/
    }

    .publishbtn {
        display: inline-block;
        float: right;
        margin: 5px 2px;
        height: 59px;
    }
</style>