import { playMode } from '@/model/playMode';
import { Toast } from 'vant';

export default{
  /**
   * @method 设置播放的索引
   */
  selectPlayIndex({ commit, state }, index){
    setTimeout(() => {
      commit('setPlayIndex', index);
    }, 100);
  },
  /**
   * 
   * @param {number} step
   *    0 - 播放器按照默认切换
   *    1 - 手动切换下一曲 手动切换 忽略单曲循环模式
   *   -1 - 手动切换上一首
   */
  playNext({ commit, state, getters }, step = 0){
    const _mode = state.mode,
      _len = getters.musicListLen,
      _index = state.playIndex;
    console.log('play next music, stet', step);
    if(_mode === playMode.singleCycle && step === 0){
      console.log('mode: singleCycle');
      commit('setPlayState', false);
      setTimeout(()=>{
        commit('setPlayState', true);
      },0);
    }
    else if(_len === 1){
      Toast('当前播放列表没有更多歌曲了');
      commit('setPlayState', false);
      setTimeout(()=>{
        commit('setPlayState', true);
      },0);
    }
    else if(_mode === playMode.sequence || Math.abs(step) === 1){
      console.log('mode: sequence');
      const nextIndex = step === 1 ? (_index + 1) % _len : (_index - 1 + _len) % _len;
      commit('setPlayIndex', nextIndex);
    }
    else if(_mode === playMode.random){
      console.log('mode: random');
      let randomIndex = parseInt(Math.random()*(getters.musicListLen-1+1),10);
      if(randomIndex === _index){
        randomIndex = (_index + 1) % _len;
      }
      commit('setPlayIndex', randomIndex);
    }
  }
};