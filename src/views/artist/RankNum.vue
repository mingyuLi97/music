<template>
  <div class="order-wrap">
    <span class="index" :style="{color: curRank < 3 ? '#fa2800': '#4a4a4a'}">{{curRank+1}}</span>
    <div class="indexIcon">
      <svg class="icon menu" aria-hidden="true">
        <use :xlink:href="item.icon"></use>
      </svg>
      <span v-if="existLastRank">{{item.num}}</span>
    </div>

  </div>
</template>

<script>

export default {
  props:['cur-rank','last-rank'],
  computed:{
    existLastRank(){
      return typeof this.lastRank === 'number';
    },
    item(){
      if(this.existLastRank){
        const val = this.curRank - this.lastRank;
        let icon = '';
        if(val < 0){
          icon = '#icon-up';
        }
        else if(val > 0){
          icon = '#icon-down';
        }else if(val === 0){
          icon = '#icon-jian';
        }
        return {
          icon: icon,
          num: Math.abs(val)
        }; 
      }else{
        return {
          icon: '#icon-new',
          num: undefined
        };
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.order-wrap{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 12.267vw;
  .index{
    font-size: 5.333vw;
  }
  .indexIcon{
    font-size: 3.733vw;
    span{
      color: #4a4a4a;
    }
  }
}
</style>