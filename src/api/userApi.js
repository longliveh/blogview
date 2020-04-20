import request from "@/utils/baseRequest/json";

const user = {
  //登录
  login(form) {
    return request({
      url: "/login",
      method: "post",
      params: form
    });
  },
  //用户信息
  getInfo(userid) {
    return request({
      url: "/getuserInfo",
      method: "post",
      params: {
        "userid":userid
      }
    });
  },
  //登出
  logOut() {
    return request({
      url: "/logout",
      method: "post",
      params:{}
    });
  },
  focus(userid,focus){
    return request({
      url: "/focusornot",
      method: "post",
      params: {
        "userid":userid,
        "focus":focus
      }
    });
  },
  //检查是否关注
  isfocus(userid){
    return request({
      url: "/isfocus",
      method: "post",
      params: {
        "userid":userid,
      }
    });
  },
  //查询关注列表or查询粉丝列表
  //type 10="关注" 20="粉丝"
  getFocusOrFansList(userid,type) {
    return request({
      url: "/getfocusorfanslist",
      method: "post",
      params: {
        "userid":userid,
        "type":type
      }
    });
  }
};
export default user;
