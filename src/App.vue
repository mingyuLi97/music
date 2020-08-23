<template>
  <div id="app">
    <nav-bar class="nav-bar"></nav-bar>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
export default {
  components: {
    NavBar
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  .nav-bar{
    position: fixed;
    width: 100%;
    top: 0;
  }
  .container{
    margin-top: 13.333vw;
  }
}
* {
  padding: 0;
  margin: 0;
}
.icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
