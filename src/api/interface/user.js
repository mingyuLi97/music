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


export default {
  login,
  getUserDetail
};