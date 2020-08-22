import axios from 'axios';
import config from './config';
import qs from 'qs';


export default function $axios(options) {
  const instance = axios.create({
    ...config
  });

  instance.defaults.transformRequest = [
    data => {
      return qs.stringify(data);
    }
  ];
  // request 拦截器
  instance.interceptors.request.use(
    config => {
      return config;
    },
      
    error => {
      // 请求错误时
      console.log('request-error:', error);
      return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
    }
  );
      
  // response 拦截器
  instance.interceptors.response.use(
    response => {
      let data;
      // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
      if (response.data == undefined) {
        data = JSON.parse(response.request.responseText);
      } else {
        data = response.data;
      }
      
      return data;
    },
    err => {
      if (err && err.response) {
        switch (err.response.status) {
        case 400:
          err.message = '请求错误';
          break;
        case 401:
          err.message = '未授权，请登录';
          break;
        case 403:
          err.message = '拒绝访问';
          break;
        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`;
          break;
        case 408:
          err.message = '请求超时';
          break;
        case 500:
          err.message = '服务器内部错误';
          break;
        case 501:
          err.message = '服务未实现';
          break;
        case 502:
          err.message = '网关错误';
          break;
        case 503:
          err.message = '服务不可用';
          break;
        case 504:
          err.message = '网关超时';
          break;
        case 505:
          err.message = 'HTTP版本不受支持';
          break;
        default:
        }
      }
      console.log(err);
      return Promise.reject(err); // 返回接口返回的错误信息
    }
  );
  return instance(options);
}