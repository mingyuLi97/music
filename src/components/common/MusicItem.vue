<template>
  <div v-if="data" class="music-item-wrap">
    <img :src="data.picUrl" alt="">
    <div class="content">
      <span>{{data.name}}</span>
      <span>{{data.artist}}</span>
    </div>
    <div class="blank">

    </div>
    <div class="play-icon-wrap" @click="isPlay = !isPlay">
      <div class="play-icon" v-if="isPlay" >
        <div class="line" style="animation-delay: -1.2s;"></div>
        <div class="line"></div>
        <div class="line" style="animation-delay: -1.5s;"></div>
        <div class="line" style="animation-delay: -0.9s;"></div>
        <div class="line" style="animation-delay: -0.6s;"></div>
      </div>
      <svg class="icon" aria-hidden="true" v-else>
        <use xlink:href="#icon-play"></use>
      </svg>
    </div>

  </div>
</template>

<script>
export default {
  props:['data'],
  data(){
    return {
      isPlay: false
    };
  }
};
</script>

<style lang='scss' scoped>
.music-item-wrap{
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.667vw;
  align-items: center;
  img{
    width: 14.667vw;
    border-radius: 1.067vw;
    border: 0.267vw solid #cccccc;
  }
  .content{
    span{
      display: block;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      padding: 0.533vw 2.667vw;
      width: 53.333vw;
      &:first-of-type{
        color: #333333;
        font-size: 4.8vw;
      }
      &:last-of-type{
        color: #999999;
        font-size: 3.2vw;
      }
    }
  }
  .blank{
    flex: 1;
  }
  .play-icon-wrap{
    font-size: 6.667vw;
    padding-right: 5.333vw;
    .play-icon {
    display: flex;
    height: 4.267vw;
    min-width: 4.8vw;
    overflow: hidden;
    .line {
      width: 0.533vw;
      height: 100%;
      margin-left: 0.533vw;
      background-color: #ff410f;
      animation: play .9s linear infinite alternate;
    }
  }
  }

}
@keyframes play {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(85%);
  }
}

</style>