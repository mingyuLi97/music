import utils from '@/utils';


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
    state.playList = utils.deepCopy(playList);
  },
  /**
   * @method 设置播放状态
   */
  setPlayState(state, playState){
    // console.log('设置playState', playState);
    state.playState = playState;
  },
  /**
   * @method 设置播放器音量
   */
  setVolume(state, volume){
    state.volume = volume;
  },
  /**
   * @method 设置当前播放的时间
   */
  updateTime(state, payload){
    state.curTime = payload.curTime;
    state.totalTime = payload.totalTime;
  },
  /**
   * @method 强制修改播放器进度
   */
  setForceTime(state, forceTime){
    state.forceTime = forceTime;
  },
  /**
   * @method 是否显示播放列表弹窗
   */
  setShowPlayList(state, showPlayList){
    state.showPlayList = showPlayList;
  }
};