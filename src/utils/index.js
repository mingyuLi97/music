
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

/**
 * @method 深拷贝
 */
const deepCopy = target =>{
  let result = {};
  const type = typeof target;
  if (type === 'object') {
    if (target === null) return target;
    if (target instanceof RegExp) return new RegExp(target);
    if (target instanceof Date) return new Date(target);
    if (Array.isArray(target)) return target.map(item => deepCopy(item));
    for (let key in target) {
      result[key] = deepCopy(target[key]);
    }
  } else {
    result = target;
  }
  return result;
};

/**
 * @method 检测数据类型
 * @returns 小写的类型  date
 */

function toType(obj){

  if(obj == null){  // 如果传入的是 null 或者 undefined，返回对应的字符串
    return obj + '';
  }
  const class2type = {},
    toString = class2type.toString, // 等价于 Object.prototype.toString
    typeList = 'Boolean Number String Function Array Date RegExp Object Error'.split(' '); 

  // 设定数据类型的映射表
  typeList.forEach(name => {
    class2type[`[object ${name}]`] = name.toLowerCase();
  });
  return typeof obj === 'object' || typeof obj === 'function'
    ? class2type[toString.call(obj)] || 'object'
    : typeof obj;
}


export default {
  transformNumber,
  second2time,
  deepCopy,
  toType
};