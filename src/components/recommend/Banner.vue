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
    margin: 0 2.667vw;
    .van-swipe{
        overflow: hidden;
        transform: translateY(0);
        border-radius: 1.067vw;
    }
    .van-swipe-item{
        position: relative;
        margin-bottom: -1.6vw;
    }
    img{
        width: 100%;
        height: 100%;
        border-radius: 1.067vw;
    }
    span{
        position: absolute;
        bottom: 1.6vw;
        right: 0;
        color: #ffffff;
        font-size: 3.2vw;
        line-height: 5.333vw;
        padding: 0 1.333vw;
        border-top-left-radius: 1.067vw;
        border-bottom-right-radius: 1.067vw;
        background-color: #fa2800;
    }

}
</style>