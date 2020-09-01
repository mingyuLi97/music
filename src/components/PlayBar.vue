<template>
  <div class="play-bar-wrap" @click="toPlayPage">

    <audio
      ref="audio"
      :src="curSong.mp3Url"
      @ended="playNext(0)"
    />
    <img :src="curSong.picUrl" alt="封面">

    <div class="content">
      <span>{{curSong.name}}</span>
      <span>{{curTxt}}</span>
    </div>

    <div class="control" @click.stop="setPlayState(!playState)">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zanting" v-if="playState"></use>
        <use xlink:href="#icon-ai23" v-else></use>
      </svg>
      <van-circle
        v-model="currentRate"
        :rate="curProgress"
        color="#fa2800"
        layer-color="#4a4a4a"
        size="8.8vw"
        stroke-width="50"
      />
    </div>

    <svg class="icon menu" aria-hidden="true" @click.stop="showMenu">
      <use xlink:href="#icon-list"></use>
    </svg>
    
    <van-popup
      v-model="show"
      get-container="body"
      position="bottom"
      :round='true'
      class="popup-play-list">
      <popup-play-list ></popup-play-list>
    </van-popup>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import PopupPlayList from '@/components/PopupPlayList';
import {playMode} from '@/model/playMode';
import Lyric from 'lyric-parser';
import bus from '@/assets/js/eventBus';

export default {
  components:{
    PopupPlayList
  },
  mounted(){
    bus.$on('updateLyric', this._sendLyricLinesToPlayPage);
  },
  data() { 
    return {
      currentRate: 0,
      timer: null,
      currentLyric: null,
      currentLineNum: 0,
      curTxt:'',  // 当前正在播放的歌词
    };
  },
  watch:{
    playState(state){
      this._onPlayStatusChange(state);
      this.currentLyric.togglePlay();
    },
    curSong(){
      this._onPlayStatusChange(this.playState);
      // 切换歌曲时将进度调整为初始状态
      this.updateTime({
        curTime: 0,
        totalTime: 0.1
      });
      // 上一首歌词停止播放
      this.currentLyric && this.currentLyric.stop();
      this._getLyric();
    },
    volume(val){
      this.$refs.audio.volume = val / 100;
    },
    forceTime(val){
      this.$refs.audio.currentTime = val;
    }
  },
  computed:{
    ...mapState([
      'playState',
      'volume',
      'forceTime',
      'showPlayList',
      'playIndex',
      'mode']),
    ...mapGetters([
      'curSong',
      'curProgress',
      'musicListLen']),
    show:{
      get(){
        return this.showPlayList;
      },
      set(val){
        this.setShowPlayList(val);
      }
    }
  },
  methods:{
    ...mapMutations([
      'setPlayState',
      'updateTime',
      'setShowPlayList',
      'setPlayIndex'
    ]),
    ...mapActions([
      'playNext'
    ]),
    toPlayPage(){
      console.log('toPlayPage');
      this.$router.push('/play');
    },
    showMenu(){
      console.log('showMenu');
      this.setShowPlayList(true);
    },
    _onPlayStatusChange(state){ // 当播放状态或者播放索引发生改变
      if(state){
        console.log('play music');
        this.$nextTick(()=>{
          const promise = this.$refs.audio.play();
          if(promise !== undefined){
            promise
              .then(_ => {})
              .catch(err => {
                console.log('音乐资源错误');
                this.$toast.fail('音乐资源错误');
                setTimeout(_ => {
                  this.playNext(1);
                },1000);
              });
          }

          this._updateTime();
        });
      }else{
        console.log('stop music');
        this.$refs.audio.pause();
        this.timer && clearInterval(this.timer);
      }
    },
    _updateTime(){
      // 开启新定时器前先清除之前的，防止重复开启
      this.timer && clearInterval(this.timer);
      this.timer = setInterval(()=>{
        const currentTime = this.$refs.audio.currentTime;
        this.updateTime({
          curTime: Math.floor(currentTime),
          totalTime: Math.floor(this.$refs.audio.duration)
        });
        this.currentLyric && this.currentLyric.seek(currentTime * 1000);
      }, 1000);
    },
    //---------------------- 处理歌词 ------------------------------
    async _getLyric(){
      let res = await this.$api.getLyric(this.curSong.id);
      console.log('lyric:', res);
      if(res.code === 200){
        let lyric = res.lrc.lyric;
        this.currentLyric = new Lyric(lyric, this._handleLyric);
        this._sendLyricLinesToPlayPage();
      }
    },
    _handleLyric({lineNum, txt}){
      this.currentLineNum = lineNum;
      this.curTxt = txt;
      bus.$emit('updateLineNum', lineNum); 
    },
    /**
     * @method 获取歌曲发送到play组件
     */
    _sendLyricLinesToPlayPage(){
      console.log('_sendLyricLinesToPlayPage');
      const curLyc = this.currentLyric,
        lines = curLyc ? curLyc.lines : [];
      bus.$emit('lyricLines', lines);
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

.popup-play-list{
  // padding: 20px;
  height: 60%;
}
</style>