export default {
  /**
   * @method 设置登录状态 
   */
  setLoginStatus(state, loginStatus){
    state.loginStatus = loginStatus;
  },
  /**
   * @method 存储用户信息
   */
  setUserInfo(state, userInfo){
    state.userInfo = userInfo;
  },
  /**
   * @method 设置播放模式
   */
  setPlayMode(state, mode){
    state.mode = mode;
  },
  /**
   * @method 设置当前播放的索引
   */
  setPlayIndex(state, index){
    state.playIndex = index;
  },
  /**
   * @method 设置播放列表
   */
  setPlayList(state, playList){
    state.playList = playList;
  },
  /**
   * @method 设置播放状态
   */
  setPlayState(state, playState){
    state.playState = playState;
  }
};