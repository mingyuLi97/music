<template>
  <div class="play-container">
    <back-bar>
      play
    </back-bar>

    <div class="play-wrap">
      <!-- 声音控制 -->
      <div class="vol-bar">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shengyin" ></use>
        </svg>
        <van-slider
          v-model="volVal"
          @change="onChange" 
          button-size="10"
          active-color="#fa2800"
        />
      </div>

      <!--  歌词-->
      <div class="lyric">

      </div>

      <!--  歌曲进度 -->
      <div class="progress-bar">
        <span>03:32</span>
        <van-slider
          v-model="volVal"
          @change="onChange" 
          button-size="10"
          active-color="#cccccc"
        />
        <span>06:32</span>
      </div>

      <!-- 控制 -->
      <div class="control-bar">
        <!-- 模式 -->
        <div @click="setPlayMode((mode+1) % 3)">
          <!-- playMode.sequence -->
          <svg class="icon" aria-hidden="true" v-show="mode === 0">
            <use xlink:href="#icon-xunhuan"></use>
          </svg>
          <!-- playMode.singleCycle -->
          <svg class="icon" aria-hidden="true" v-show="mode === 1">
            <use xlink:href="#icon-danquxunhuan"></use>
          </svg>
          <!-- playMode.random -->
          <svg class="icon" aria-hidden="true" v-show="mode === 2">
            <use xlink:href="#icon-suijibofang"></use>
          </svg>
        </div>

        <!--  上一曲 -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shangyiqu101"></use>
        </svg>

        <!-- 播放/暂停 -->
        <div @click.stop="setPlayState(!playState)">
          <svg class="icon" aria-hidden="true" v-show="playState">
            <use xlink:href="#icon-bofangsanjiaoxing" ></use>
          </svg>

          <svg class="icon" aria-hidden="true" v-show="!playState">
            <use xlink:href="#icon-zanting" ></use>
          </svg>
        </div>

        <!-- 下一曲 -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiayiqu101"></use>
        </svg>

        <!-- 播放列表 -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-list" ></use>
        </svg>
      </div>
    </div>

  </div>
</template>

<script>
import BackBar from '@/components/common/BackBar';
import {mapState, mapGetters, mapMutations} from 'vuex';
import {playMode} from '@/model/playMode';
export default {
  components:{
    BackBar
  },
  data() { 
    return {
      // volVal: 0
    };
  },
  computed:{
    ...mapState(['playState', 'mode', 'volume']),
    ...mapGetters(['curSong']),
    volVal:{
      get(){
        return this.volume;
      },
      set(val){
        this.setVolume(val);
      }
    }
  },
  methods:{
    ...mapMutations(['setPlayState', 'setPlayMode', 'setVolume']),
    onChange(){
      console.log('onChange');
    }
  }
};
</script>

<style lang='scss' scoped>
.play-container{
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.play-wrap{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  .vol-bar{
    display: flex;
    align-items: center;
    svg{
      color: #999999;
      font-size: 24px;
      margin-left: 10px;
    }
    .van-slider{
      margin: 16px;
    }
  }

  .lyric{
    flex: 1;
    background-color: pink;
  }

  .progress-bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
      font-size: 14px;
      color: #999999;
    }
    .van-slider{
      margin: 16px;
    }
  }

  .control-bar{
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 30px;
    margin: 10px 0;
  }
}
</style>