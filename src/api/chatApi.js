import request from "@/utils/baseRequest/json";

const chatApi = {
  //获取评论
  sendmsg(roomid,form)
  {
    return request({
        url: "/broadcast/"+roomid,
        params: form
      }
    )
  }
};
export default chatApi;
