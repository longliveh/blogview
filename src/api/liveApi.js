import request from "@/utils/baseRequest/json";

const live = {
  //登录
  createlive(form) {
    return request({
      url: "/createlive",
      method: "post",
      params: form
    });
  },
  getliveinfo(roomid)
  {
    return request({
      url: "/getliveinfo",
      method: "post",
      params: {
        "roomid":roomid
      }
    });
  },
  endlive() {
    return request({
      url: "/endlive",
      method: "post",
      params: {}
    });
  },
  changetTitle(title) {
    return request({
      url: "/changetitle",
      method: "post",
      params: {
        title:title
      }
    });
  }
}

export default live;