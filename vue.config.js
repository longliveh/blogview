const path = require("path");
module.exports = {
  configureWebpack: () => ({
    resolve: {
      alias: {
        "@": path.resolve("./src")
      }
    }
  }),
  chainWebpack: config => {
    config.plugin("define").tap(args => {
      args[0]["process.env"].BASE_URL = JSON.stringify(process.env.BASE_URL);
      return args;
    });
  },

  outputDir: "dist", //build输出目录
  assetsDir: "assets", //静态资源目录（js, css, img）
  lintOnSave: true, //是否开启eslint
  devServer: {
    open: false, //是否自动弹出浏览器页面
    host: "192.168.1.106",
    port: "8080",
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: "http://192.168.1.106:8888", //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          "^/api": ""
        }
      }
    }
  }
};
