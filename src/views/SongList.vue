<template>
  <div>
    <back-bar>
      <span>歌单广场</span>
    </back-bar>
    <van-tabs @change='changeCategory'>
      <van-tab
        v-for="(catName, index) in categoryNameArr"
        :key="index"
        :title="catName">
        {{ catName }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import BackBar from '@/components/common/BackBar';
export default {
  components:{
    BackBar
  },
  mounted(){
    this._getHotCatList();
  },
  data() { 
    return {
      categoryNameArr: [],
      limit: 15,
      offset: 0,
      category: '全部',
      order: 'hot',
      curSonglist: []
    };
  },
  methods:{
    async _getHotCatList(){
      const res = await this.$api.getHotCatList();
      if(res.code !== 200){
        console.log('!!!Error: _getHotCatList', res.code);
        return;
      }
      console.log(res);
      this.categoryNameArr = res.tags.map(item => item.name);
      
      if(this.categoryNameArr.length){
        this.category = this.categoryNameArr[0];
        this._getPlaylistByCat();
      }
    },
    async _getPlaylistByCat(){
      const res = await this.$api.getPlaylistByCat(
        this.category,
        this.limit,
        this.offset * this.limit,
        this.order
      );
      if(res.code !== 200){
        console.log('!!!Error: _getPlaylistByCat', res.code);
        return;
      }
      console.log(res);
    },
    changeCategory(name, title){
      // name 相当于索引 0 1 2
      console.log(name, title);
      this.category = title;
      this.offset = 0;
      this._getPlaylistByCat();
    }
  }
};
</script>

<style scoped>
</style>
