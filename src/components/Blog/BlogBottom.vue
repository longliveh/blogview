<template>
    <div style="margin-bottom: 6px">
        <Divider class="divider"/>
        <Row class="blog_bottom">
            <Col span="6" class="boder">
                <a type="text">
                    <Icon type="ios-star-outline" size="18" />
                    收藏
                </a>
            </Col>
            <Col span="6" class="boder">
                <a type="text">
                    <Icon type="ios-share-alt-outline" size="18"/>
                    {{ count.shareCount==0?"":count.shareCount}}
                </a>
            </Col>
            <Col span="6" class="boder">
                <a type="text" @click="comment">
                    <Icon type="ios-chatboxes-outline" size="18"/>
                    {{ count.commentCount==0?"":count.commentCount}}
                </a>
            </Col>
            <Col span="6">
                <a type="text" @click="likeBlog">
                    <Icon v-if="isliked" color="red" type="ios-thumbs-up" size="18"/>
                    <Icon v-else type="ios-thumbs-up-outline" size="18"/>
                    {{ count.stars==0?"":count.stars}}
                </a>
            </Col>

        </Row>
        <Divider class="divider"/>
        <!--<Divider style="margin: 6px 0px 0px 0px"/>-->
    </div>
</template>

<script>
    import blogApi from "../../api/blogApi.js"
  export default {
    name: "BlogBottom",
    props:{
      blogid:Number
    },
    data(){
      return{
        isliked:false,
        count:{
            "shareCount": 0,
            "stars": 0,
            "commentCount": 0
      }
      }
    },
    methods:{
      comment(){
        this.$emit("Comment")
      },
      async getCount(){
        let res = await blogApi.getBlogDetail(this.blogid);
        if (res.code==0)
        {
          this.count = res.data;
        }
      },
      async isLiked()
      {
        let res = await blogApi.isLiked(this.blogid);
        if (res.code ==0)
        {
          this.isliked = res.data.isliked;
        }
      },
      async likeBlog(){
        let res = await blogApi.likeBlog(this.blogid,this.isliked);
        if (res.code === 0){
          if(this.isliked==false)
          {
            this.isliked = true;
            this.count.stars++;
          }else {
            this.isliked = false;
            this.count.stars--;
          }
        }
      }

    },
    mounted() {
      this.getCount();
      this.isLiked();
    }
  };
</script>

<style scoped>
    .divider {
        margin: 6px 0px;
    }
    .blog_bottom{
        text-align: center;
        -webkit-user-select: none;
    }
    .blog_bottom .boder{
        border: 1px solid #d9d9d9;
        border-top:none;
        border-bottom:none;
        border-left: none;
    }
    .blog_bottom a{
        color: #808080;
        width: 100%;
        height: 100%;
        display: inline-block;
    }
</style>