<template>
  <div class="music-list-wrap">
    <recommend-head title="新歌风向标" text="更多新歌"/>
    <div class="group-container">
      <div class="music-group" v-for="(group, index) in musicGroup" :key="index">
        <music-item
          v-for="item in group"
          :key="item.id"
          :data="item"
        />
      </div>
    </div>

  </div>
</template>

<script>
import Song from '@/model/song';
import RecommendHead from './RecommendHead';
import MusicItem from '@/components/common/MusicItem';
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
          tempArr.push(new Song(musicArr[i]));
          tempArr.push(new Song(musicArr[i+1]));
          tempArr.push(new Song(musicArr[i+2]));
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
          this.musicArr = res.result.slice(0, 9);
          console.log(this.musicArr);
        })
        .catch(err=>{
          console.log(err);
        });
    }
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