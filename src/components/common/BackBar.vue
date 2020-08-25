<template>
  <div class="back-bar-wrap">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-icon-test"></use>
    </svg>
    <slot />
  </div>
</template>

<script>
export default {
  data() { 
    return {

    };
  }
};
</script>

<style lang='scss' scoped>
.back-bar-wrap{
    display: flex;
    box-sizing: border-box;
    align-items: center;
    color: #4a4a4a;
    height: 13.333vw;
    font-size: 6.933vw;
    padding: 2.667vw;
    svg{
        margin-right: 5.333vw;
    }
}
</style>