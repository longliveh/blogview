import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const routes = [
  {
    path: "/",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    children:[
      {
        path: "general",
        name:"General",
        component: () => import(/* webpackChunkName: "about" */ "../views/General.vue"),
      },
      {
        path: "regist",
        name:"Register",
        component: () => import(/* webpackChunkName: "about" */ "../views/Register.vue"),
      },
      {
        path: "login",
        name:"Login",
        component: () => import(/* webpackChunkName: "about" */ "../components/Login.vue"),
      },
      {
        path: "live/:roomid",
        name:"Live",
        component: () => import(/* webpackChunkName: "about" */ "../views/live/Live.vue"),
      },
      {
        path: "user/:userid",
        name:"User",
        component: () => import(/* webpackChunkName: "about" */ "../views/User.vue"),
      },
      {
        path: "startlive",
        name:"StartLive",
        component: () => import(/* webpackChunkName: "about" */ "../views/live/StartLive.vue"),
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
