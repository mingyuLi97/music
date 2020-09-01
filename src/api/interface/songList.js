import axios from '../axios';

/**
 * @method 获取歌单分类
 */
const getCatList = () =>{
  return axios({
    url: '/playlist/catlist'
  });
};

/**
 * @method 获取热门歌单分类
 */
const getHotCatList = () =>{
  return axios({
    url: '/playlist/hot'
  });
};

/**
 * 
 * @method 根据歌单类别获取歌单列表
 * 
 * @param {*} cat 类别 "华语 "、" 流行 ", 默认为 "全部", 可从歌单分类接口获取(/playlist/catlist)
 * @param {*} limit 取出歌单数量 , 默认为 50
 * @param {*} offset 偏移数量 , 用于分页 一般为 n * limit 
 * @param {*} order 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 */
const getPlaylistByCat = (cat='全部', limit=50, offset=0, order='hot') =>{
  return axios({
    url: `/top/playlist?limit=${limit}&order=${order}&cat=${cat}&offset=${offset}`
  });
};

export default {
  getCatList,
  getHotCatList,
  getPlaylistByCat
};