<template>
  <div>
    <div class="cover-wrap">
      <div v-if="count">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofangsanjiaoxing"></use>
        </svg>
        <span>
          {{count2str}}
        </span>
      </div>
      <img :src="url" alt="">
      <p>{{name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props:['count', 'url', 'name'],
  data() { 
    return {

    };
  },
  computed:{
    count2str(){
      return this.utils.transformNumber(this.count || 0);
    }
  }
};
</script>

<style lang='scss' scoped>
.cover-wrap{
    width: 100%;
    position: relative;
    div{
        position: absolute;
        top: 0;
        right: 0;
        color: #ffffff;
        font-size: 3.733vw;
        display: flex;
        align-items: center;
        padding: 0.533vw 1.333vw;
        // background: linear-gradient(0deg,rgba(0,0,0,.85),transparent);
    }

    img{
        border-radius: 1.067vw;
        width: 100%;
    }
    p{
        font-size: 3.467vw;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}
</style>