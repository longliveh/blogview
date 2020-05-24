import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

const routes = [
  {
    path: "/",redirect:"/view",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    children: [
      {
        path: "search",
        name: "Search",
        component: () => import(/* webpackChunkName: "about" */ "../views/Search.vue")
      },
      {
        path: "view",
        name: "UnloginContent",
        component: () => import(/* webpackChunkName: "about" */ "../views/UnloginContent.vue")
      },
      {
        path: "general",
        name: "General",
        component: () => import(/* webpackChunkName: "about" */ "../views/General.vue")
      },
      {
        path: "regist",
        name: "Register",
        component: () => import(/* webpackChunkName: "about" */ "../views/Register.vue")
      },
      {
        path: "login",
        name: "Login",
        component: () => import(/* webpackChunkName: "about" */ "../components/Login.vue")
      },
      {
        path: "live/:roomid",
        name: "Live",
        component: () => import(/* webpackChunkName: "about" */ "../views/live/Live.vue")
      },
      {
        path: "user/:userid",
        name: "User",
        component: () => import(/* webpackChunkName: "about" */ "../views/User.vue")
      },
      {
        path: "startlive",
        name: "StartLive",
        component: () => import(/* webpackChunkName: "about" */ "../views/live/StartLive.vue")
      },
      {
        path: "blog/:blogid",
        name: "SingleBlog",
        component: () => import(/* webpackChunkName: "about" */ "../views/SingleBlog.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  saveScrollPosition: true,
  routes
});

router.beforeEach((to, from, next) => {

  if (to.path === "/view") { // 判断该路由是否需要登录权限
    let islogin = store.getters.islogin;
    if (islogin == true) {
      console.log(to);
      next({
        path: "/general"
      });
    }else {
      next();
    }
  }else if (to.path === "/general") {
    let islogin = store.getters.islogin;
    if (islogin == null || islogin == false) {
      next({
        path: "/view"
      });
    }else {
      next();
    }
  }else {
    next();
  }


});

export default router;
