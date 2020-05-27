<template>
    <div class="comment">
        <Input v-model="content" maxlength="100" show-word-limit type="textarea" :placeholder="placeholder"/>
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
        <span>表情</span>
        <Button style="float: right;margin-top: 6px" type="primary" @click="addComment">评论</Button>
    </div>
</template>

<script>
  import {
    TwemojiPicker
  } from "@kevinfaguiar/vue-twemoji-picker";
  import EmojiAllData from "@kevinfaguiar/vue-twemoji-picker/emoji-data/zh/emoji-all-groups.json";
  import EmojiGroups from "@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json";
  import blogApi from "../../api/blogApi"


  export default {
    name: "Comment",
    components: {
      "twemoji-picker": TwemojiPicker
    },
    props:{
      blogId:{
        type:Number,
        default:0
      },
      father:{
        type:Number,
        default:-1
      },
      toComment:{
        type:Number,
        default:-1
      },
      placeholder:""
    },
    data() {
      return {
        content: "",
      };
    },
    methods: {
      append(emoji) {
        this.content += emoji;
        console.log(this.content.toString());
      },
      async addComment(){
        let res = await blogApi.comment({
          "blogId":this.blogId,
          "content":this.content,
          "father":this.father,
          "toComment":this.toComment,
        });

        if(res.code==0)
        {
          this.$emit("commentCall",res.data.comment)
          this.$Message.success("成功！")
        }else if (res.code == 20001) {
          this.$Message.error("用户未登录！")
        }else {
          this.$Message.error("出现意外的错误！")
        }
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
    .comment {
        padding: 16px 20px 6px;
        position: relative;
    }
    .emoji {
        display: inline-block;
        margin-top: -12px;
    }
</style>