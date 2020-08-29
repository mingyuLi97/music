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
      <span>喜欢你是我独家的记忆</span>
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
export default {
  components:{
    PopupPlayList
  },
  data() { 
    return {
      currentRate: 0,
      timer: null
    };
  },
  watch:{
    playState(state){
      this._onPlayStatusChange(state);
    },
    curSong(){
      this._onPlayStatusChange(this.playState);
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
      // this.show = true;
      this.setShowPlayList(true);
    },
    _onPlayStatusChange(state){ // 当播放状态或者播放索引发生改变
      if(state){
        this._updateTime();
        setTimeout(()=>{
          console.log('Play status changed');
          this.$refs.audio.play();
        },0);
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
        this.updateTime({
          curTime: Math.floor(this.$refs.audio.currentTime),
          totalTime: Math.floor(this.$refs.audio.duration)
        });
      }, 1000);
    },
    // playNext(){
    // const _mode = this.mode,
    //   _len = this.musicListLen,
    //   _index = this.playIndex;
    // console.log('play next music');
    // if(_mode === playMode.singleCycle || _len === 1){
    //   console.log('mode: singleCycle');
    //   this.setPlayState(false);
    //   setTimeout(()=>{
    //     this.setPlayState(true);
    //   },0);
    // }
    // else if(_mode === playMode.sequence){
    //   console.log('mode: sequence');
    //   this.setPlayIndex((_index + 1) % _len);
    // }
    // else if(_mode === playMode.random){
    //   console.log('mode: random');
    //   let randomIndex = parseInt(Math.random()*(this.musicListLen-1+1),10);
    //   if(randomIndex === _index){
    //     randomIndex = (_index + 1) % _len;
    //   }
    //   this.setPlayIndex(randomIndex);
    // }
    // }
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