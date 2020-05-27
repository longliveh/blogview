export default {

  state: {

    //属性

    blogCount: 0,
    blogCommentCount:null

  },

  getters: {

    getBlogCount: state => state.blogCount,
    getBlogCommentCount: state => state.blogCommentCount

  },

  mutations: {

    //set方法

    setblogCount(state, blogCount) {

      state.blogCount = blogCount;

    },
    setblogCommentCount(state, blogCommentCount) {
      console.log(blogCommentCount);
      if (state.blogCommentCount == null) {
        state.blogCommentCount = new Map();
      }
      console.log(state.blogCommentCount);
      state.blogCommentCount.set(blogCommentCount.blogid, blogCommentCount.data);
    }


  }

};
