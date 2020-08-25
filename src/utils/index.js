
/**
 * @method 将数字转化为带有汉字的字符串
 * @param {Number} num
 */

const transformNumber = num =>{
  let numStr = num.toString();
  const len =numStr.length;

  if(len > 8){
    numStr = parseFloat((num / 100000000).toFixed(1)) + '亿';
  }else if(len > 6){
    numStr = parseFloat((num / 10000).toFixed(0)) + '万'; 
  }else if(len > 4){
    numStr = parseFloat((num / 10000).toFixed(1)) + '万';
  }
  return numStr;
};

const second2time = (result) =>{
  let h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
  let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
  let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
  return result = h + ':' + m + ':' + s;
};


export default {
  transformNumber,
  second2time
};