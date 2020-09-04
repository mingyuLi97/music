<template>
  <div id="app">
    <div class="container" v-if="$route.meta.navBar">
      <nav-bar class="nav-bar" />
    </div>
    <!-- <router-view /> -->
    <keep-alive>
      <router-view v-if="$route.meta.isKeep"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeep"></router-view>
    <div class="container" v-show="showPlayBar">
      <play-bar class="play-bar" />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import PlayBar from '@/components/PlayBar';
import store from '@/store';
export default {
  components: {
    NavBar,
    PlayBar
  },
  mounted(){
    // console.log(this.$route.meta);
    // console.log(store.getters.musicListLen);
  },
  computed:{
    showPlayBar(){
      return !!store.getters.musicListLen
       && this.$route.meta.playBar;
    }
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
