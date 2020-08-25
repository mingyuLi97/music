<template>
  <div class="play-bar-wrap" @click="toPlayPage">
      
    <img :src="curSong.picUrl" alt="封面">

    <div class="content">
      <span>{{curSong.name}}</span>
      <span>喜欢你是我独家的记忆</span>
    </div>
    <div class="control" @click.stop="setPlayState(!playState)">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zanting" v-if="playState"></use>
        <use xlink:href="#icon-ai23" v-else></use>
      </svg>
      <van-circle
        v-model="currentRate"
        :rate="rate"
        color="#fa2800"
        layer-color="#4a4a4a"
        size="8.8vw"
        stroke-width="50"
      />
    </div>

    <svg class="icon menu" aria-hidden="true" @click.stop="showMenu">
      <use xlink:href="#icon-list"></use>
    </svg>

  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'; 
export default {
  data() { 
    return {
      currentRate: 0,
      rate: 0,
      playStatus: false,
      timer: null
    };
  },
  watch:{
    playStatus(status){
      if(status){
        this.timer =  setInterval(()=>{
          if(this.rate++ > 100){
            this.playStatus = false;
            this.rate = 0;
          }

        }, 100);
      }else{
        this.timer && clearInterval(this.timer);
      }
    }
  },
  computed:{
    ...mapState(['playState']),
    ...mapGetters(['curSong'])
  },
  methods:{
    ...mapMutations(['setPlayState']),
    play(){
      this.playStatus = !this.playStatus;
      console.log('play');
    },
    toPlayPage(){
      console.log('toPlayPage');
      this.$router.push('/play');
    },
    showMenu(){
      console.log('showMenu');
    }
  }
};
</script>

<style lang='scss' scoped>
.play-bar-wrap{
    display: flex;
    height: 50px;
    box-sizing: border-box;
    border-top: .5px solid #cccccc;
    align-items: center;
    padding: 0 10px;
    img{
        width: 35px;
        height: 35px;
        display: block;
        background-color: red;
        border-radius: 50%;
    }
    .content{
        flex: 1;
        padding-left: 10px;
        width: 200px;
        margin-right: 20px;
        span{
            display: block;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            &:first-of-type{
                font-size: 14px;
            }
            &:last-of-type{
                font-size: 12px;
                color: #999999;
            }
        }
    }
    .control{
        position: relative;
        display: flex;
        align-items: center;
        svg{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 20px;
        }
    }
    .menu{
        font-size: 30px;
        color: #4a4a4a;
        font-weight: 200;
        padding-left: 20px;
    }
}

</style>