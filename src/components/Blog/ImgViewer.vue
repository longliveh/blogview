<template>
    <viewer :images="imageList">
        <ul class="imglist">
            <li class="imgitem" v-for="src in imageList">
                <img :src="src" :key="src">
            </li>
        </ul>
    </viewer>
</template>

<script>
  export default {
    name: "ImgViewer",
    props:{
       urlList:{
         type:String,
       }
    },
    data() {
      return {
        msg: "vue2-viewer-test",
        // imageList: [
        //   "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=488030022,1694816207&fm=173&app=25&f=JPEG?w=580&h=347&s=A08FB35A5E0616C664F5631C030010D6",
        //   "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2574767313,3929397124&fm=173&app=25&f=JPEG?w=580&h=868&s=B784EEA3460236E17A1F137F0300A058",
        //   "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=488030022,1694816207&fm=173&app=25&f=JPEG?w=580&h=347&s=A08FB35A5E0616C664F5631C030010D6",
        //   "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2574767313,3929397124&fm=173&app=25&f=JPEG?w=580&h=868&s=B784EEA3460236E17A1F137F0300A058",
        //   "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=488030022,1694816207&fm=173&app=25&f=JPEG?w=580&h=347&s=A08FB35A5E0616C664F5631C030010D6",
        //   "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2574767313,3929397124&fm=173&app=25&f=JPEG?w=580&h=868&s=B784EEA3460236E17A1F137F0300A058",
        //   "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=488030022,1694816207&fm=173&app=25&f=JPEG?w=580&h=347&s=A08FB35A5E0616C664F5631C030010D6",
        //   "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2574767313,3929397124&fm=173&app=25&f=JPEG?w=580&h=868&s=B784EEA3460236E17A1F137F0300A058",
        //   "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=488030022,1694816207&fm=173&app=25&f=JPEG?w=580&h=347&s=A08FB35A5E0616C664F5631C030010D6",
        // ]
      };
    },
    methods: {
      onRemove(index) {
        alert(index);
      }
    },
    computed:{
      imageList(){
        if(this.urlList==="[]")
          return null
        let list = this.urlList.substring(1,this.urlList.length-1).split(",");
        // console.log(list)

        list.forEach((url,index,list)=>{
          list[index] = 'http://'+this.$host+'/static/img/'+url.trim()
          // console.log(url)
        })
        return list
      }
    }
  };
</script>

<style scoped>
    .imglist {
        max-width: 342px;
        max-height: 342px;
        list-style: none;
        overflow: hidden;
    }

    .imgitem {
        width: 110px;
        height: 110px;
        margin: 2px;
        float: left;
        /*background-color: red;*/
    }
    img{
        width: 100%;
        height: 100%;
        cursor:url('../../assets/Magnifier.svg'),auto;
    }
</style>