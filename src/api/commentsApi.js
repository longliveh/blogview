import request from "@/utils/baseRequest/json";

const commentsApi = {
  //获取评论
  getComments(form) {
    return request({
      url: "/getcomment",
      params: form
    });
  },
  isLiked(id)
  {
    return request({
      url: "/isliked",
      method: "post",
      params: {
        queryid: id,
        type:1
      }
    });
  },
  likeComment(id,isliked) {
    return request({
      url: "/likeComment",
      params: {
        commentid: id,
        isliked:isliked
      }
    });
  },
  getCommentById(id)
  {
    return request({
      url: "/getcommentbyid",
      params: {
        id:id
      }
    });
  },
  recentComment() {
    return request({
      url: "/whocommentme",
      params: {

      }
    });
  },
  deletecomment(commentid)
  {
    return request({
      url: "/deletecomment",
      params: {
        commentid:commentid
      }
    });
  }
};
export default commentsApi;
