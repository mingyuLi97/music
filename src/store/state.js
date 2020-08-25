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
  volume: 0

};