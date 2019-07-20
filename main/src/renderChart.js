const toString = (obj) => {
  let result = JSON.stringify(obj, function(key, val) {
        // 对function进行特殊处理
        if (typeof val === 'function') {
            return `~ha~${val}~ha~`;
        }
        return val;
    });
    // 再进行还原
    do {
        result = result.replace('\"~ha~', '').replace('~ha~\"', '').replace(/\\n/g, '').replace(/\\\"/g,"\"");//最后一个replace将release模式中莫名生成的\"转换成"
    } while (result.indexOf('~ha~') >= 0);
    return result;
}

const renderChart = (props) => {
  const height = `${props.height || 400}px`;
  const width = props.width ? `${props.width}px` : 'auto';
  const backgroundColor = props.backgroundColor;
  return `
      document.getElementById('main').style.height = "${height}";
      document.getElementById('main').style.width = "${width}";
      document.getElementById('main').style.backgroundColor = "${backgroundColor}";
      setTimeout(function(){ 
        window.ReactNativeWebView.postMessage(JSON.stringify({"types":"GET_IMAGE","payload": ""}))
      }, 2000)
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(${toString(props.option)});
      myChart.on('click', function(params) {
        var seen = [];
        var paramsString = JSON.stringify(params, function(key, val) {
          if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
              return;
            }
            seen.push(val);
          }
          return val;
        });
        window.ReactNativeWebView.postMessage(JSON.stringify({"types":"ON_PRESS","payload": paramsString}));
      });
    `
}

export {
  renderChart,
  toString
};
