import Storage from "@/utils/storage";
import userApi from "@/api/userApi";
const user = {
  state: {
    islogin:Storage.get("islogin")==null?false:true,
    userinfo: JSON.parse(Storage.get("userinfo"))
  },

  mutations: {

    SET_ISLOGIN: (state, islogin) => {
      Storage.set("islogin", islogin);
      state.islogin = islogin;
    },
    SET_USER_INFO: (state, userInfo) => {
      Storage.set("userinfo", userInfo);
      state.userinfo = userInfo;
    }
  },

  actions: {
    setlogin({ commit }, islogin) {
      commit("SET_ISLOGIN", islogin);
    },
    //用户信息
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        userApi
          .getInfo(-1)
          .then(res => {
            if (res.code==0) {
              commit("SET_USER_INFO", res.data);
              resolve()
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //登出
    logOut({ commit }) {
      return new Promise((resolve, reject) => {
        userApi
          .logOut()
          .then(res => {
            if (res.code === 0)
            {
              Storage.cle();
              resolve()
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
export default user;
