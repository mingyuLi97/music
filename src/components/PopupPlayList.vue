<template>
  <div class="popup-play-list-wrap">
    <div class="head">
      <span>当前播放</span>
      <span>({{musicListLen}})</span>
    </div>

    <div class="tool">
      <div>
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

          <span>{{modeText}}</span>
        </div>
        <!-- 收藏 -->
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon-"></use>
          </svg>
          <span>收藏全部</span>
        </div>
      </div>

      <!-- 清除列表 -->
      <svg class="icon" aria-hidden="true" @click.stop="_clearPlayList">
        <use xlink:href="#icon-dustbin_icon"></use>
      </svg>
    </div>

    <ul>
      <li
        v-for="item in playList"
        :key="item.id"
        @click="_playMusicById(item.id)"
      >
        <div class="song-info" :class="{'song-info-active': (curSong.id === item.id) && playState}">
          <div class="song-icon" v-if="(curSong.id === item.id) && playState">
            <svg class="icon " aria-hidden="true">
              <use xlink:href="#icon-shengyin_shiti"></use>
            </svg>
          </div>
          <span>{{item.name}}</span>
          <span> - {{item.artist}}</span>
        </div>

        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Group-"></use>
        </svg>

      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';

export default {
  data() { 
    return {
    };
  },
  computed:{
    ...mapState(['playList', 'mode', 'playState']),
    ...mapGetters([
      'curSong',
      'musicListLen']),
    modeText(){
      return ['列表循环', '单曲循环', '随机播放'][this.mode];
    }
  },
  watch:{

  },
  methods:{
    ...mapMutations([
      'setPlayMode', 
      'setPlayIndex',
      'setPlayList',
      'setShowPlayList',
      'setPlayState']),
    _playMusicById(id){
      if(this.curSong.id === id && this.playState) return; 
      this.setPlayIndex(this.playList.findIndex(item => item.id === id));
      // this.setPlayState(false);
      this.setPlayState(true);
    },
    _clearPlayList(){
      console.log('clear playList');
      this.setPlayList([]);
      this.setShowPlayList(false);
      this.setPlayState(false);
    }
  }
};
</script>

<style lang='scss' scoped>
.popup-play-list-wrap{
    padding: 20px;
}
.head{
    span{
        &:first-of-type{
            font-size: 18px;
            color: #4a4a4a;
        }
        &:last-of-type{
            padding-left: 2px;
            font-size: 14px;
            color: #cccccc;
        }
    }
}

.tool{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    & > svg{
        width: 30px;
        padding-left: 15px;
    }
    & > div{
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

ul{
    overflow: scroll;
    height: 280px;
    &::-webkit-scrollbar{
        display: none;
    }
    li{
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
        .song-info{
            width: 250px;
            overflow: hidden;
            // text-overflow:ellipsis;
            white-space: nowrap;
            display: flex;
            align-items: center;
            .song-icon{
              min-width: 20px;
              svg{
                font-size: 16px;
                padding-right: 3px;
                color: #fa2800;
              }
            }

        }
        span{
            &:first-of-type{
                font-size: 16px;
                color: #4a4a4a;
            }
            &:last-of-type{
                font-size: 12px;
                color: #cccccc;
            }
        }

        .song-info-active{
            span{
                color: #fa2800;
            }
        }

        svg{
            font-size: 25px;
            color: #cccccc;
        }
    }
}
</style>