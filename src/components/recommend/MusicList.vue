<template>
  <div class="music-list-wrap">
    <recommend-head title="新歌风向标" text="更多新歌"/>
    <div class="group-container">
      <div class="music-group" v-for="(group, index) in musicGroup" :key="index">
        <music-item
          v-for="item in group"
          :key="item.id"
          :data="item"
          @play="playMusic(item.id)"
        />
      </div>
    </div>

  </div>
</template>

<script>
import Song from '@/model/song';
import RecommendHead from './RecommendHead';
import MusicItem from '@/components/common/MusicItem';
import { mapMutations } from 'vuex';
import {playMode} from '@/model/playMode';
export default {
  components:{
    RecommendHead,
    MusicItem
  },
  data() { 
    return {
      musicArr: []
    };
  },
  computed:{
    musicGroup(){
      const group = [],
        musicArr = this.musicArr;
      if(musicArr.length === 9){
        for(let i = 0; i < 9; i += 3){
          const tempArr = [];
          tempArr.push(musicArr[i]);
          tempArr.push(musicArr[i+1]);
          tempArr.push(musicArr[i+2]);
          group.push(tempArr);
        }
      }
      return group;
    }
  },
  mounted(){
    this.getNewSongs();
  },
  methods:{
    getNewSongs(){
      this.$api.getNewSongs(this.limit)
        .then(res =>{
          console.log(res);
          this.musicArr = res.result
            .slice(0, 9).map(item => {
              return new Song(item);
            });
          console.log(this.musicArr);
          // 初始化 vuex 临时代替
          this.setPlayState(false);
          this.setPlayMode(playMode.sequence);
          this.setPlayList(this.musicArr);
          this.setPlayIndex(0);
        })
        .catch(err=>{
          console.log(err);
        });
    },
    playMusic(id){
      this.setPlayState(true);
      this.setPlayMode(playMode.sequence);
      this.setPlayList(this.musicArr);
      this.setPlayIndex(this.musicArr.findIndex(item => item.id === id));
    },
    ...mapMutations([
      'setPlayMode',
      'setPlayIndex',
      'setPlayList',
      'setPlayState'
    ])
  }
};
</script>

<style lang='scss' scoped>
.music-list-wrap{
    padding: 0 2.667vw;
    margin-top: 5.333vw;
    .group-container{
        display: flex;
        overflow-x: scroll;
        &::-webkit-scrollbar {
            display: none; /* Chrome Safari */
        }
        .music-group{
            flex-shrink:0;  // 防止盒子被挤压
            width: 86.933vw;
            margin: 1.333vw;
        }
    }
}
</style>