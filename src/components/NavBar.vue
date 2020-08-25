<template>
  <div>
    <div class="nav-bar-wrap">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-qita"></use>
      </svg>

      <ul class="category">
        <li
          v-for="item in categoryArr"
          :key="item.id"
          :class="{'activate': activateIndex === item.id}"
          @click="changeCategory(item)"
        >
          {{item.text}}
          <!-- <router-link :to="{ name: item.name }" tag="span">{{item.text}}</router-link> -->
        </li>
      </ul>
      
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<script>
const CATEGORY_ARR = [
  {
    id: 0,
    name:'recommend',
    text: '发现'
  },
  {
    id: 1,
    name:'user',
    text: '我的'
  }, 
  {
    id: 2,
    name:'rank',
    text: '排行榜'
  }, 
  {
    id: 3,
    name:'songList',
    text: '歌单'
  }];
export default {
  data() { 
    return {
      categoryArr: CATEGORY_ARR.map(item => Object.freeze(item)),
      activateIndex: null
    };
  },
  mounted(){
    // 默认选择 user 选项
    const item = this.categoryArr[1];
    this.changeCategory(item);
  },
  methods:{
    changeCategory(item){
      this.activateIndex = item.id;
      this.$router.push({name: item.name});
    }
  }
};
</script>

<style lang='scss' scoped>
.nav-bar-wrap{
  display: flex;
  padding: 2.667vw;
  align-items: center;
  color: #4a4a4a;
  svg{
    font-size: 8vw;
  }
  ul {
    flex: 1;
    display: flex;
    li{
      flex: 1;
      justify-content: space-between;
      text-align: center;
      font-size: 4.8vw;
      line-height: 5.333vw;
    }
    .activate{
      color: #fa2800;
      position: relative;
      font-size: 5.667vw;
      &::after{
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -2.667vw;
        width: 1.067vw;
        height: 1.067vw;
        border-radius: 50%;
        background-color: #fa2800;
        margin: 0 auto;
      }
    }
  }
}
</style>
