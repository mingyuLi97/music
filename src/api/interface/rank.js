import axios from '../axios';

/**
 * @method 获取排行榜
 */

const getTopList = () =>{
  return axios({
    url: '/toplist',
  });
};


export default {
  getTopList
};