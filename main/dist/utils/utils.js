const toString = (obj) => {
  let result = JSON.stringify(obj, function (key, val) {
    // 对function进行特殊处理
    if (typeof val === 'function') {
      return `~ha~${val}~ha~`;
    }
    return val;
  });
  // 再进行还原
  do {
    result = result.replace('\"~ha~', '').replace('~ha~\"', '').replace(/\\n/g, '').replace(/\\\"/g, "\"");//最后一个replace将release模式中莫名生成的\"转换成"
  } while (result.indexOf('~ha~') >= 0);
  return result;
}

export {
  toString
}
