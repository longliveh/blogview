import request from "@/utils/baseRequest/json";

const commonApi = {
  //注册
  search(type,query) {
    return request({
      url: "/search",
      params: {
        type:type,
        query:query
      }
    });
  },

  //注册
  register(form) {
    return request({
      url: "/regist",
      params: form
    });
  },

  //
  getInfoById(userid) {
    return request({
      url: "/getuserInfo",
      method: "post",
      params: {
        userid: userid
      }
    });
  },

  //
  getUserbyCommentId(commentid) {
    return request({
      url: "/getuserInfobyCom",
      method: "post",
      params: {
        commentid: commentid
      }
    });
  }
};
export default commonApi;
