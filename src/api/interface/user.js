import axios from '../axios';

const login = (phone, password)=>{
  return axios({
    url: `/login/cellphone?phone=${phone}&password=${password}`
  });
};

const getUserDetail = (uid) => {
  return axios({
    url: `/user/detail?uid=${uid}`
  });
};

const getUserPlaylist = uid => {
  return axios({
    url: `/user/playlist?uid=${uid}`
  });
};

/**
 * @method 获取用户的播放记录
 * @param 必选参数 : uid : 用户 id
 * @param 可选参数 : type : type=1 时只返回 weekData, type=0 时返回 allData
 */

const getUserRecord = (uid, type) =>{
  return axios({
    url: `/user/record?uid=${uid}&type=${type}`
  });
};


export default {
  login,
  getUserDetail,
  getUserPlaylist,
  getUserRecord
};