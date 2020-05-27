import axios from "axios";
import request from "@/utils/baseRequest/json";

const blog = {
  //发布纯文字微博

  //发布图片文字微博
  publish_img(form, handle) {
    var request = axios.create({
      baseURL: process.env.BASE_URL, // api 的 base_url
      timeout: 5000000, // 请求超时时间
      method: "post"
    });
    let formData = new FormData();
    formData.append("content", form.content);
    form.filelist.forEach(file => {
      formData.append("filelist", file);
    });

    request.post("/publish", formData).then(function(res) {
      handle(res);
    });
  },
  //发布视频文字微博
  publish_vedio(content,vediopath) {
    return request({
      url: "/publish_vedio",
      method: "post",
      params: {
        content:content,
        vediopath:vediopath
      }
    });
  },
  //评论
  comment(form) {
    return request({
      url: "/comment",
      method: "post",
      params: form
    });
  },

  //获取微博byUserid
  getBlogByUserid(userid) {
    return request({
      url: "/get_blog_by_userid",
      method: "post",
      params: {
        userid: userid
      }
    });
  },
  getBlog(query,pagination) {
    return request({
      url: "/getblog",
      method: "post",
      params: {
        query:query,
        pagination:pagination
      }
    });
  },
  getBlogById(blogid) {
    return request({
      url: "/getblogbyid",
      method: "post",
      params: {
        blogid: blogid
      }
    });
  },

  getBlogDetail(blogid) {
    return request({
      url: "/getCount",
      method: "post",
      params: {
        blogid: blogid
      }
    });
  },
  likeBlog(blogid,isliked){
    return request({
      url: "/likeBlog",
      method: "post",
      params: {
        blogid: blogid,
        isliked:isliked
      }
    });
  },
  isLiked(blogid)
  {
    return request({
      url: "/isliked",
      method: "post",
      params: {
        queryid: blogid,
        type:0
      }
    });
  }

};
export default blog;
