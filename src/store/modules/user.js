import Storage from "@/utils/storage";
import userApi from "@/api/userApi";
const user = {
  state: {
    islogin:Storage.get("islogin")==null?false:true,
    userInfo: ""
  },

  mutations: {

    SET_ISLOGIN: (state, islogin) => {
      Storage.set("islogin", islogin);
      state.islogin = islogin;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    }
  },

  actions: {
    setlogin({ commit }, islogin) {
      commit("SET_ISLOGIN", islogin);
    },
    //用户信息
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        userApi
          .getInfo({ token: state.token })
          .then(res => {
            if (res.result) {
              commit("SET_USER_INFO", res.result.userInfo);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //登出
    logOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        userApi
          .logOut({ token: state.token })
          .then(() => {
            commit("SET_TOKEN", "");
            Storage.cle();
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
