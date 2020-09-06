export default {
  userInfo(state){
    return state.userInfo || JSON.parse(window.localStorage.getItem('userInfo'));
  },
  loginStatus(state){
    return state.loginStatus || JSON.parse(window.localStorage.getItem('loginStatus'));
  },
  curSong(state){
    return state.playList[state.playIndex] || {};
  },
  curProgress(state){
    return Math.floor(state.curTime / state.totalTime * 100);
  },
  musicListLen(state){
    return state.playList.length || 0;
  }
};