<template>
  <div class="artist-list-wrap">
    <recommend-head
      title="热门歌手"
      text="全部歌手"
      @switch="$router.push('/artist')"
    />
    <div class="artist-container">
      <div
        class="artist"
        v-for="item in artists"
        :key="item.id"
      >
        <div
          :style="`background-image: url(${item.picUrl})`"
        />
        <span>{{item.name}}</span>
        <span>单曲数{{item.musicSize}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import RecommendHead from './RecommendHead';

export default {
  components:{
    RecommendHead,
  },
  data() { 
    return {
      artists: []
    };
  },
  mounted(){
    this.getHotSinger();
  },
  methods:{
    getHotSinger(){
      this.$api.getHotSinger()
        .then(res =>{
          console.log(res);
          this.artists = res.artists;
        })
        .catch(err=>{
          console.log(err);
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.artist-list-wrap{
    padding: 0 2.667vw;
    margin-top: 5.333vw;
    .artist-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .artist{
            flex: 30%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1.333vw;
            div{
                width: 26.667vw;
                height: 26.667vw;
                border-radius: 50%;
                background-repeat: no-repeat;
                background-position: center center;
                background-size: auto 100%;
                margin-bottom: 1.067vw;
            }
            span{
                padding: 0.533vw;
                &:first-of-type{
                    font-size: 4.8vw;
                    letter-spacing: 0.267vw
                }
                &:last-of-type{
                    font-size: 3.2vw;
                    color: #fa2800
                }
            }
        }
    }
}
</style>