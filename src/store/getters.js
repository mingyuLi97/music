export default {
  curSong(state){
    return state.playList[state.playIndex] || {};
  }
};