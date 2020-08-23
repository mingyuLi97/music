<template>
  <div class="banner-wrap">
    <van-swipe :autoplay="3000" indicator-color="#fa2800">
      <van-swipe-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="">
        <span>{{item.typeTitle}}</span>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data() { 
    return {
      banners: []
    };
  },
  mounted(){
    this.getBanner();
  },
  methods:{
    getBanner(){
      this.$api.getBanner()
        .then(res => {
          this.banners = res.banners;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang='scss' scoped>

.banner-wrap{
    margin: 0 10px;

    .van-swipe{
        overflow: hidden;
        transform: translateY(0);
        border-radius: 4px;
    }
    .van-swipe-item{
        position: relative;
        margin-bottom: -6px;
    }
    img{
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
    span{
        position: absolute;
        bottom: 6px;
        right: 0;
        color: #ffffff;
        font-size: 12px;
        line-height: 20px;
        padding: 0 5px;
        border-top-left-radius: 4px;
        border-bottom-right-radius: 4px;
        background-color: #fa2800;
    }

}
</style>