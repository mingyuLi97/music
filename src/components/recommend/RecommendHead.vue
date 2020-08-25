<template>
  <div>
    <div class="header">
      <h2>{{title}}</h2>
      <span>{{text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'text']
};
</script>

<style lang='scss' scoped>
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.667vw;
    h2{
        font-weight: 400;
        font-size: 5.333vw;
    }
    span{
        font-size: 3.2vw;
        padding: 0 2.667vw;
        border: 0.267vw solid #cccccc;
        border-radius: 2.667vw;
    }
}
</style>