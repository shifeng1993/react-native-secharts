const renderChart = (props) => {
  const height = `${props.height || 400}px`;
  const width = props.width ? `${props.width}px` : 'auto';
  const backgroundColor = props.backgroundColor;
  return `
      document.getElementById('main').style.height = "${height}";
      document.getElementById('main').style.width = "${width}";
      document.getElementById('main').style.backgroundColor = "${backgroundColor}";
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(${JSON.stringify(props.option)});
      window.document.addEventListener('message', function(e) {
        var req = JSON.parse(e.data);
        switch (req.types) {
          case "SET_OPTION":
            myChart.setOption(req.payload);
            break;
          case "GET_IMAGE":
            var base64 = myChart.getDataURL();
            window.postMessage(JSON.stringify({"types":"GET_IMAGE","payload": base64}));
            break;
          default:
            break;
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

export default renderChart;
