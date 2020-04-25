<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  #app{
    width: 100%;
    height: 100%;
    position: absolute;
    background-repeat: no-repeat;
    background-position: center 0;
    background-attachment:fixed;
    background-size: 100%;

    /*background-image: url(https://file.iviewui.com/dev-dist/5825f033c6ff12cd1ed1f3c99dff5e4b.svg);*/
    background-image: url("./assets/bg1.jpg");
    overflow-x: hidden;
    /*background-color: #b4daf0;*/
    /*background-image: url("../assets/body_bg.jpg");*/
  }
</style>