
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

export default {
  getSongDetail
};