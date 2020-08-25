<template>
  <div id="app">
    <nav-bar class="nav-bar"></nav-bar>
    <div class="container">
      <router-view />
    </div>
    <play-bar class="play-bar"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import PlayBar from '@/components/PlayBar';
export default {
  components: {
    NavBar,
    PlayBar
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
    background-color: #ffffff;
    z-index: 999;
  }
  .container{
    margin-top: 13.333vw;
  }
  .play-bar{
    position: fixed;
    width: 100%;
    bottom: 0;
    background-color: #ffffff;
    z-index: 999;
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
