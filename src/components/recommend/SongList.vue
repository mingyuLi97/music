<template>
  <div class="song-list-wrap">
    <recommend-head
      title="人气歌单推荐"
      text="查看更多"
      @switch="$router.push('/songList')"/>

    <div class="song-list">
      <cover
        v-for="item in songArr"
        :key="item.id"
        :name='item.name'
        :count='item.playCount'
        :url='item.picUrl'
        class="song-item"
        @click.native="$router.push(`/songList/${item.id}`)"
      />
    </div>

  </div>
</template>

<script>
import RecommendHead from './RecommendHead';
import Cover from '@/components/common/Cover';
export default {
  components:{
    Cover,
    RecommendHead
  },
  data() { 
    return {
      limit: 10,
      songArr: []
    };
  },
  mounted(){
    this.getPersonalized();
  },
  methods:{
    getPersonalized(){
      this.$api.getPersonalized(this.limit)
        .then(res =>{
          console.log(res);
          this.songArr = res.result;
        })
        .catch(err=>{
          console.log(err);
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.song-list-wrap{
    padding: 0 2.667vw;
    margin-top: 5.333vw;
    overflow: scroll;
}
.song-list{
    display: flex;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }
    .song-item{
        flex-shrink:0;  // 防止盒子被挤压
        width: 27.2vw;
        margin: 1.333vw;
    }
}
</style>