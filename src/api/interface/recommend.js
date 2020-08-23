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
 * @method 获取
 */

export default {
  getBanner
};