<template>
  <div>
    <van-tabs @change='changeCategory' :before-change='beforeChangeCategory'>
      <van-tab
        v-for="(catName, index) in categoryNameArr"
        :key="index"
        :title="catName">
        
        <div class="cover-list" @scroll="handleScroll" :style="{height:coverListHeight}">
          <cover
            v-for="(item, index) in curSonglist"
            :key="index"
            :count='item.playCount'
            :url='item.coverImgUrl'
            :name='item.name'
            class="cover-item"
          />
          <div class="list-tip">{{listTip}}</div>
        </div>
        
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Cover from '@/components/common/Cover';
import { mapGetters } from 'vuex';
export default {
  components:{
    Cover
  },
  mounted(){
    this._getHotCatList();
  },
  computed:{
    ...mapGetters(['musicListLen']),
    coverListHeight(){
      return this.musicListLen ? '139.467vw' : '152.8vw';
    },
    listTip(){
      return this.finished ? '没有更多了 ' : '加载中...';
    }
  },
  data() { 
    return {
      categoryNameArr: [],
      curCategoryIndex: 0,
      cacheSonglist: [],  // 缓存所有加载过的页面数据
      limit: 15,
      offset: 0,
      category: '全部',
      order: 'hot',
      curSonglist: [],  // 页面渲染依赖的数组
      loading: false,
      finished: true,
    };
  },
  methods:{
    async _getHotCatList(){
      const res = await this.$api.getHotCatList();
      if(res.code !== 200){
        console.log('!!!Error: _getHotCatList', res.code);
        return;
      }
      this.categoryNameArr = res.tags.map(item => item.name);
      
      if(this.categoryNameArr.length){
        this.category = this.categoryNameArr[0];
        this._getPlaylistByCat();
      }
    },
    async _getPlaylistByCat(){
      console.log('call _getPlaylistByCat');
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
      this.finished = !res.more;

      this.loading = false;
      this.curSonglist = this.curSonglist.concat(res.playlists);
    },
    beforeChangeCategory(name){
      // 跳转的是当前页面直接返回
      if(name === this.curCategoryIndex) return false;
      // 缓存当前页面数据
      this.cacheSonglist[this.curCategoryIndex] = this.curSonglist;
      return true;
    },
    changeCategory(name, title){
      // name 相当于索引 0 1 2
      this.curCategoryIndex = name;
      this.category = title;
      // 先从缓存中获取数据
      this.curSonglist = this.cacheSonglist[this.curCategoryIndex] || [];
      this.offset = this.curSonglist.length;
      !this.curSonglist.length && this._getPlaylistByCat();
    },
    handleScroll(e){
      if(this.loading || this.finished) return;
    
      // 滚动条距离顶部的距离
      let scrollTop = e.target.scrollTop;
      // 整个窗体的高度
      let clientHeight = e.target.clientHeight;
      // 整个滚动条的高度
      let scrollHeight = e.target.scrollHeight;

      if(scrollTop + clientHeight >= scrollHeight){
        this.loading = true;
        this.offset++;
        this._getPlaylistByCat();
      }
    }
  }
};
</script>

<style lang='scss' scoped>

.cover-list {
  overflow: scroll;
  padding: 0 2vw;
  .cover-item{
    display: inline-block;
    width: 29.333vw;
    margin: 2.667vw 1.333vw;
    vertical-align: top;  // 行内元素存在基线 会居中对齐 当文字是一行的时候会导致塌陷
  }
  .list-tip{
    line-height: 13.333vw;
    text-align: center;
    font-size: 3.733vw;
    color: #999999;
  }
}
</style>
