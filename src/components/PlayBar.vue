<template>
  <div class="play-bar-wrap">
      
    <img src="@/assets/images/logo.jpeg" alt="" @click="play()">


    <div class="content">
      <span>歌曲名称歌曲名称歌曲名称歌曲名称歌曲名称歌曲名称歌曲名称歌曲名称歌曲名称</span>
      <span>当前正在播放的歌词当前正在播放的歌词当前正在播放的歌词当前正在播放的歌词</span>
    </div>
    <div class="control" @click="play()">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zanting" v-if="playStatus"></use>
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

    <svg class="icon menu" aria-hidden="true">
      <use xlink:href="#icon-list"></use>
    </svg>

  </div>
</template>

<script>
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
  methods:{
    play(){
      this.playStatus = !this.playStatus;
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
            color: #fa2800;
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