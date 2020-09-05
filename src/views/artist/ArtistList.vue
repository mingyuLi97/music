<template>
  <div>
    <back-bar>
      歌手排行
    </back-bar>
    <van-tabs v-model="active" :before-change='beforeChangeCategory' @change="changeCategory">
      <van-tab
        v-for="(name, index) in TYPE_NAME_ARR"
        :key="index"
        :title="name"
      >
        <div class="artist-item" v-for="(item, indexNum) in curArtists" :key="indexNum">
          <rank-num :cur-rank="indexNum" :last-rank='item.lastRank'></rank-num>
          <img v-lazy="item.img1v1Url" alt="">
          <div class="info">
            <span>{{item.name}}</span>
            <div class="hot">
              <svg class="icon menu" aria-hidden="true">
                <use xlink:href="#icon-hot"></use>
              </svg>
              <span>{{item.score}}</span>
            </div>
            <div class="music-size">
              <span>单曲数: {{item.musicSize}}</span>
              <span>专辑数: {{item.albumSize}}</span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import BackBar from '@/components/common/BackBar';
import RankNum from './RankNum';
export default {
  components:{
    BackBar,
    RankNum
  },
  mounted(){
    this._getTopArtistList();
  },
  data() { 
    return {
      active: 0,
      TYPE_NAME_ARR: ['华语', '欧美', '韩国', '日本'],
      curArtists: [],
      cacheArtists:[]
    };
  },
  methods:{
    async _getTopArtistList(){
      console.log('_getTopArtistList');
      const res = await this.$api.getTopArtistList(this.active + 1);
      console.log(res);
      this.curArtists = res.code === 200 ? res.list.artists :[];
    },
    beforeChangeCategory(name){
      // 跳转的是当前页面直接返回
      if(name === this.active) return false;
      // 缓存当前页面数据
      this.cacheArtists[this.active] = this.curArtists;
      return true;
    },
    changeCategory(name, title){
      console.log(name, title);
      // name 相当于索引 0 1 2
      // // 先从缓存中获取数据
      this.curArtists = this.cacheArtists[name] || [];
      !this.curArtists.length && this._getTopArtistList();
    },
  }
};
</script>

<style lang='scss' scoped>
.artist-item{
  display: flex;
  margin-top: 2.667vw;
  img{
    width: 21.333vw;
    border-radius: 1.333vw;
    margin-right: 4vw;
  }
  .info{
    display: flex;
    flex-direction: column;
    & > span{
      font-size: 5.333vw;
      color: #4a4a4a;
    }
    .hot{
      color: #999999;
      font-size: 4.267vw;
      margin: 1.333vw 0;
    }
    .music-size{
      span{
        padding-right: 1.333vw;
      }
      color: #999999;
      font-size: 4.267vw;
    }
  }
}
</style>