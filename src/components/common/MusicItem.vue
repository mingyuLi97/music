<template>
  <div v-if="data" class="music-item-wrap" @click="toPlayPage">
    <img :src="data.picUrl" alt="" v-if="!index">
    <span v-else class="index">{{index}}</span>
    <div class="content">
      <span>{{data.name}}</span>
      <span>{{data.artist}}</span>
    </div>
    <div class="blank">

    </div>
    <div class="play-icon-wrap">
      <div class="play-icon" v-if="isPlay" >
        <div class="line" style="animation-delay: -1.2s;"></div>
        <div class="line"></div>
        <div class="line" style="animation-delay: -1.5s;"></div>
        <div class="line" style="animation-delay: -0.9s;"></div>
        <div class="line" style="animation-delay: -0.6s;"></div>
      </div>
      <svg class="icon" aria-hidden="true" v-else @click.stop="playMusic">
        <use xlink:href="#icon-play"></use>
      </svg>
    </div>

  </div>
</template>

<script>
import { mapGetters} from 'vuex';

export default {
  props:['data', 'index'],
  computed:{
    ...mapGetters(['curSong']),
    isPlay(){
      return (this.curSong.id === this.data.id)
       && this.$store.state.playState;
    }
  },
  methods:{
    /**
     * @method 跳转到播放界面
     */
    toPlayPage(){
      // 如果跳转 前没有播放，先播放再跳转
      !this.isPlay && this.playMusic();
      this.$router.push('/play');
    },
    /**
     * @method 修改当前播放的歌曲
     * @description 播放音乐时需要在vuex中保存播放列表，
     * 子组件获取不到，因此传递给父组件处理
     */
    playMusic(){
      this.$emit('play');
    }
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
  .index{
    margin-right: 10px;
    font-size: 20px;
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