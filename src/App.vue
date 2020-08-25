<template>
  <div id="app">
    <div class="container" v-if="$route.meta.navBar">
      <nav-bar class="nav-bar" />
    </div>
    <router-view />
    <play-bar class="play-bar" v-if="$route.meta.playBar"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import PlayBar from '@/components/PlayBar';
export default {
  components: {
    NavBar,
    PlayBar
  },
  mounted(){
    console.log(this.$route.meta);
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
    height: 13.333vw;
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
