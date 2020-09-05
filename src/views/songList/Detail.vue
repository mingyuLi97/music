<template>
  <div v-if="data" class="detail-wrap">
    <describe
      v-if="showDescribe"
      class="describe-wrap"
      @close="showDescribe=false"
      :url='data.coverImgUrl'
      :name='data.name'
      :desc="data.description"
      :tags='data.tags'/>
    <div>
      <back-bar>歌单</back-bar>

      <div class="top">
        <cover
          class="cover"
          :count='data.playCount'
          :url='data.coverImgUrl'
          :name='""'
        />
        <div class="info">
          <span>{{data.name}}</span>
          <div class="creator">
            <img :src="data.creator.avatarUrl" alt="avatar">
            <span>{{data.creator.nickname}}</span>
          </div>
          <p @click="showDescribe = true">{{data.description}}</p>
        </div>
      </div>
      <songlist-tool-bar
        :commentCount='data.commentCount'
        :shareCount='data.shareCount'
      />

      <div class="songlist">
        <music-item
          v-for="(item, index) in musicArr"
          :key="item.id"
          :data="item"
          :index='index + 1'
          @play="playMusic(item.id)"
        />
        <div class="subscribers">
          <img
            v-for="(subscriber, index) in subscriberArr"
            :key="index"
            v-lazy="subscriber.avatarUrl" alt="">
          <span>
            {{subscribeCount}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackBar from '@/components/common/BackBar';
import Cover from '@/components/common/Cover';
import SonglistToolBar from '@/components/common/SongListToolBar';
import Song from '@/model/song';
import MusicItem from '@/components/common/MusicItem';
import Describe from './Describe';
import { playMode } from '@/model/playMode';
import { mapMutations } from 'vuex';

export default {
  components:{
    BackBar,
    Cover,
    SonglistToolBar,
    MusicItem,
    Describe
  },
  mounted(){
    console.log(this.$route.params.id);
    this._getPlaylistDetail(this.$route.params.id);
  },
  computed:{
    musicArr(){
      return this.data.tracks.map(item => new Song(item));
    },
    subscriberArr(){
      return this.data.subscribers.slice(0, 5);
    },
    subscribeCount(){
      const count = this.data.subscribedCount || 0;
      return this.utils.transformNumber(count) + '人收藏';
    }
  },
  data() { 
    return {
      data: null,
      showDescribe: false
    };
  },
  methods:{
    ...mapMutations([
      'setPlayMode',
      'setPlayIndex',
      'setPlayList',
      'setPlayState'
    ]),
    async _getPlaylistDetail(id){
      const res = await this.$api.getPlaylistDetail(id);
      console.log(res);
      this.data = res.playlist;
    },
    playMusic(id){
      console.log('playMusic');
      this.setPlayMode(playMode.sequence);
      this.setPlayList(this.musicArr);
      this.setPlayIndex(this.musicArr.findIndex(item => item.id === id));
      this.setPlayState(true);
    },
  }
};
</script>

<style lang='scss' scoped>
.describe-wrap{
    position: fixed;
    z-index: 1111;
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
}

.detail-wrap{
    box-sizing: border-box;
}
.top{
    display: flex;
    padding: 0 4vw;
    .cover{
        min-width: 34.667vw;
        max-width: 34.667vw;
        margin-right: 4vw;
    }
    .info{
        & > span{
            font-size: 4.8vw;
        }
        .creator{
            padding: 2.133vw 0;
            display: flex;
            img{
                border-radius: 50%;
                width: 6.667vw;
                margin-right: 1.333vw;
            }
            span{
                font-size: 4.267vw;
                line-height: 6.667vw;
            }
        }
    }
    p{
        position: relative;
        font-size: 3.733vw;
        color: #999999;
        overflow: hidden;
        padding-right: 2.667vw;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        &::after{
            position: absolute;
            top: 4vw;
            right: 1.067vw;
            display: block;
            width: 2.133vw;
            height: 2.133vw;
            border-right: 0.267vw solid #999999;
            border-top: 0.267vw solid #999999;
            transform: rotate(45deg);
            content: '';
        }
    }
}

.songlist{
    margin:0 10px 0 20px;
    .subscribers{
        img {
            width: 30px;
            border-radius: 50%;
            border: .1px solid #cccccc;
            margin: 10px 5px;
        }
        span{
            line-height: 50px;
            padding-right: 10px;
            float: right;
            font-size: 14px;
            color: #999999;
        }
    }
}
</style>
