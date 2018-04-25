const toString = (obj) => {
  let result = JSON.stringify(obj, function(key, val) {
        if (typeof val === 'function') {
            return `~--demo--~${val}~--demo--~`;
        }
        return val;
    });

    do {
        result = result.replace('\"~--demo--~', '').replace('~--demo--~\"', '');
    } while (result.indexOf('~--demo--~') >= 0);
    result = result.replace(/\\n/g, '').replace(/\\\"/g,"\"");//最后一个replace将release模式中莫名生成的\"转换成"
    return result;
}
export default function renderChart(props) {
  const height = `${props.height || 400}px`;
  const width = props.width ? `${props.width}px` : 'auto';
  const backgroundColor = props.backgroundColor;
  return `
    document.getElementById('main').style.height = "${height}";
    document.getElementById('main').style.width = "${width}";
    document.getElementById('main').style.backgroundColor = "${backgroundColor}";
    var myChart = echarts.init(document.getElementById('main'));
    var outMessage = function(types, payload) {
      var res = {
        types: types,
        payload: payload
      }
      window.postMessage(JSON.stringify(res));
    }
    myChart.setOption(${toString(props.option)});
    window.document.addEventListener('message', async (e) => {
      var data = JSON.parse(e.data);
      if (data.types === "SET_OPTION") {
        myChart.setOption(data.payload);
      } else if (data.types === "GET_IMAGE") {
        try{
          let base64 = await myChart.getDataURL();
          outMessage('GET_IMAGE', base64);
        }catch(e){
          console.log(e)
        }
      }
    });

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
      window.postMessage(paramsString);
    });
  `
}
