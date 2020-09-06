<template>
  <div class="songlist-tool-bar-wrap">
    <div v-for="(item, index) in dataList" :key="index">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="item.icon"></use>
      </svg>
      <span>
        {{item.text}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props:['commentCount', 'shareCount'],
  computed: {
    dataList(){
      return [
        {
          icon: '#icon-pinglun',
          text: this.utils.transformNumber(this.commentCount)
        },
        {
          icon: '#icon-fenxiang',
          text: this.utils.transformNumber(this.shareCount)
        },
        {
          icon: '#icon-xiazai',
          text: '下载'
        },
        {
          icon: '#icon-icon_duoxuankuangzu',
          text: '多选'
        }
      ];
    }
  },
};
</script>

<style lang='scss' scoped>
.songlist-tool-bar-wrap{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 2.667vw 0;
    & > div{
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #4a4a4a;
        font-size: 6.667vw;
        span{
            margin-top: 1.333vw;
            font-size: 3.733vw;
        }
    }
}
</style>
