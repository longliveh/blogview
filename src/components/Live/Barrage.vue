<template>
    <div class="barrages-drop">
        <vue-baberrage
                :lanes-count="10"
                :isShow="barrageIsShow"
                :barrageList="barrageList"
                :maxWordCount="maxWordCount"
                :throttleGap="throttleGap"
                :loop="barrageLoop"
                :boxHeight="boxHeight"
                :messageHeight="messageHeight"
        >
        </vue-baberrage>
    </div>
</template>
<script>
  import Vue from 'vue';
  import { vueBaberrage, MESSAGE_TYPE } from 'vue-baberrage';

  Vue.use(vueBaberrage);

  export default {
    name: 'Barrage',
    data() {
      return {
        initid:1,
        msg: '吃，汝所欲也，瘦，亦尔所欲也，二者不可得兼，好气也~',
        barrageIsShow: true,
        messageHeight: 3,
        boxHeight: 100,
        barrageLoop: false,
        maxWordCount: 60,
        throttleGap: 0,
        barrageList: []
      };
    },
    created(){
      window.addEventListener('onmessageWS', this.addBarrages)
    },
    mounted() {
      //this.addToList();
    },
    methods: {
      addToList() {
        let list = [
          {
            id: 1,
            avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
            msg: this.msg,
            time: Math.round(Math.random()*10),
            barrageStyle: 'yellow'
          }
        ];
        list.forEach((v) => {
          this.barrageList.push({
            id: v.id,
            avatar: v.avatar,
            msg: v.msg,
            time: v.time,
            type: MESSAGE_TYPE.NORMAL,
            barrageStyle: v.barrageStyle
          });
        });
      },
      addBarrages(e){
        let msg = JSON.parse(e.detail.data.data)
        console.log(msg)
        this.barrageList.push({
          id: ++this.initid,
          avatar: 'http://'+this.$host+'/static/avatar/'+msg.avatar,
          msg: msg.msg,
          time: Math.round(Math.random()*5+5),
          barrageStyle: 'yellow'
        });
      }

    }
  };
</script>
<style  lang="less" scoped>
    .barrages-drop {
        .blue {
            border-radius: 100px;
            background: #e6ff75;
            color: #fff;
        }

        .green {
            border-radius: 100px;
            background: #75ffcd;
            color: #fff;
        }
        .red {
            border-radius: 100px;
            background: #e68fba;
            color: #fff;
        }
        .yellow {
            border-radius: 100px;
            background: #dfc795;
            color: #fff;
        }
        .baberrage-stage {
            position: absolute;
            width: 100%;
            height: 212px;
            z-index: 9;
            /*margin-top: 520px;*/
        }
    }
</style>

