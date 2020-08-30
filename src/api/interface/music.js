
import axios from '../axios';

/**
 * @method 获取歌曲详情
 */

const getSongDetail = (ids, time) =>{
  return axios({
    url: `/song/detail?timestamp=${time}`,
    params:{
      ids
    }
  });
};

/**
 * 
 * @method 获取当前播放歌曲的歌词
 * @param {number} id 歌曲id
 */

const getLyric = id => {
  return axios({
    url: `/lyric?id=${id}`
  });
};

/**
 * @method 对歌单添加或删除歌曲
 * @param {String} op 从歌单增加单曲为 add, 删除为 del
 * @param {Number} pid 歌单 id
 * @param {String} tracks 歌曲 id,可多个,用逗号隔开
 * @description /playlist/tracks?op=add&pid=24381616&tracks=347231
 */

const updateSongList = (op, pid, tracks) =>{
  return axios({
    url: `/playlist/tracks`,
    params:{
      op,
      pid,
      tracks
    }
  });
};

export default {
  getSongDetail,
  updateSongList,
  getLyric
};