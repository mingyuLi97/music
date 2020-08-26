import {playMode} from '@/model/playMode';

export default {
  // 是否登录 boolean
  loginStatus: null,
  // 用户信息
  userInfo: null,
  // 播放模式
  mode: playMode.sequence,
  // 播放索引
  playIndex: 0,
  // 播放列表
  playList: [],
  // 播放状态
  playState: false,
  // 音量
  volume: 20,
  // 当前播放的进度
  curTime: 0,
  // 视频总长度
  totalTime: 0.1,
  // 强制修改播放进度
  forceTime:0,
  // 是否显示播放列表 popup
  // playBar 和 play 两个界面效果一样 因此借助 vuex
  showPlayList: false
};