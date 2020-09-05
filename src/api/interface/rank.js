import axios from '../axios';

/**
 * @method 获取排行榜
 */

const getTopList = () =>{
  return axios({
    url: '/toplist',
  });
};

/**
 * @method 获取歌手排行榜
 */

const getTopArtistList = type => {
  return axios({
    url: `/toplist/artist`,
    params:{
      type
    }
  });
};

export default {
  getTopList,
  getTopArtistList
};