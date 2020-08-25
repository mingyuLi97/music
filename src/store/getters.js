export default {
  curSong(state){
    return state.playList[state.playIndex] || {};
  },
  curProgress(state){
    return Math.floor(state.curTime / state.totalTime * 100);
  }
};