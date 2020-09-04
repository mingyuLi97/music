<template>
  <div class="play-container">
    <back-bar>
      <div class="cur-song-info">
        <span>{{curSong.name}}</span>
        <span>{{curSong.artist}}</span>
      </div>
    </back-bar>

    <div class="play-wrap">
      <!-- 声音控制 -->
      <div class="vol-bar">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shengyin"></use>
        </svg>
        <van-slider
          v-model="volVal"
          button-size="10"
          active-color="#fa2800"
        />
      </div>

      <!--  歌词-->
      <div class="lyric">
        <div :style="{marginTop: currentLineNum > 10 ? `${-25 * (currentLineNum-10)}px` : '0'}">
          <p
            v-for="(line,index) in lyricLines"
            :key="index"
            :class="{'current-line':currentLineNum===index}"
            class="text">{{line.txt}}</p>  
        </div>
      </div>

      <!--  歌曲进度 -->
      <div class="progress-bar">
        <span>{{curTimeStr}}</span>
        <van-slider
          v-model="progressVal"
          button-size="10"
          active-color="#cccccc"
        />
        <span>{{totalTimeStr}}</span>
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
        <svg class="icon" aria-hidden="true" @click.stop="playNext(-1)">
          <use xlink:href="#icon-shangyiqu101"></use>
        </svg>

        <!-- 播放/暂停 -->
        <div @click.stop="setPlayState(!playState)">
          <svg class="icon" aria-hidden="true" v-show="!playState">
            <use xlink:href="#icon-bofangsanjiaoxing" ></use>
          </svg>

          <svg class="icon" aria-hidden="true" v-show="playState">
            <use xlink:href="#icon-zanting" ></use>
          </svg>
        </div>

        <!-- 下一曲 -->
        <svg class="icon" aria-hidden="true" @click.stop="playNext(1)">
          <use xlink:href="#icon-xiayiqu101"></use>
        </svg>

        <!-- 播放列表 -->
        <svg class="icon" aria-hidden="true" @click.stop="setShowPlayList(true)">
          <use xlink:href="#icon-list" ></use>
        </svg>
      </div>
    </div>

  </div>
</template>

<script>
import BackBar from '@/components/common/BackBar';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import {playMode} from '@/model/playMode';
import utils from '@/utils';
import bus from '@/assets/js/eventBus';

export default {
  components:{
    BackBar
  },
  mounted(){
    bus.$on('lyricLines', lyricLines => {
      console.log('recive _sendLyricLinesToPlayPage');
      this.lyricLines = lyricLines;
    });

    bus.$on('updateLineNum', lineNum => {
      // console.log('updateLineNum', lineNum);
      this.currentLineNum = lineNum;
    });

    bus.$emit('updateLyric');
  },
  data() { 
    return {
      lyricLines: [],
      currentLineNum: 0
    };
  },
  computed:{
    ...mapState([
      'playState',
      'mode',
      'volume',
      'curTime',
      'totalTime'
    ]),
    ...mapGetters([
      'curSong',
      'curProgress',
      'musicListLen'
    ]),
    volVal:{
      get(){
        return this.volume;
      },
      set(val){
        this.setVolume(val);
      }
    },
    progressVal:{
      get(){
        return this.curProgress;
      },
      set(val){
        if(!this.playState){
          this.setPlayState(true);
        }
        this.setForceTime(val / 100 * this.totalTime);
        this.updateTime({
          curTime: val / 100 * this.totalTime,
          totalTime: this.totalTime
        });
      }
    },
    totalTimeStr(){
      return this.getTimeStr(this.totalTime);
    },
    curTimeStr(){
      return this.getTimeStr(this.curTime);
    }
  },
  watch:{
    musicListLen:{
      handler(len){
        if(!len){
          this.$router.go(-1);
        }
      },
      immediate: true
    }
  },
  methods:{
    ...mapMutations([
      'setPlayState',
      'setPlayMode',
      'setVolume',
      'setForceTime', 
      'setShowPlayList',
      'updateTime'
    ]),
    ...mapActions([
      'playNext'
    ]),
    getTimeStr(time){
      const timeStr = utils.second2time(time);
      return timeStr.startsWith('00:') ? timeStr.substring(3) :timeStr;
    }
  }
};
</script>

<style lang='scss' scoped>
.play-container{
  display: flex;
  flex-direction: column;
  height: 100vh;
  .cur-song-info{
    span{
      display: block;
      font-size: 18px;
      &:last-of-type{
        color: #999999;
        font-size: 12px;
      }
    }
  }
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
    overflow: scroll;
    height: 124.8vw;

    .text{
      color: #4a4a4a;
      font-size: 14px;
      line-height: 20px;
      margin: 5px 0;
      text-align: center;
    }
    .current-line{
      color: #fa2800;
    }
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