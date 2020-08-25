import axios from '../axios';


/**
 * @method 获取轮播图
 */
const getBanner = ()=>{
  return axios({
    url: 'banner'
  });
};

/**
 * @method 获取推荐歌单
 * @param {Number} limit 取出的数量，默认 30
 */
const getPersonalized = limit =>{
  return axios({
    url: `/personalized?limit=${limit}`
  });
};

/**
 * @method 获取推荐歌歌曲
 */

const getNewSongs = () =>{
  return axios({
    url: '/personalized/newsong'
  });
};

/**
 * @method 获取热门歌手
 */

const getHotSinger = () =>{
  return axios({
    url: '/top/artists?offset=0&limit=9'
  });
};



export default {
  getBanner,
  getPersonalized,
  getNewSongs,
  getHotSinger
};