const getters = {
  islogin:state=>state.user.islogin,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo
};
export default getters;
