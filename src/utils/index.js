
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



export default {
  transformNumber
};