import axios from '../axios';

const login = (phone, password)=>{
  return axios({
    url: `/login/cellphone?phone=${phone}&password=${password}`
  });
};


export default {
  login
};