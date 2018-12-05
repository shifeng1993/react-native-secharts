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
const renderChart = (props) => {
    const height = `${props.height || 400}px`;
    const width = props.width ? `${props.width}px` : 'auto';
    const backgroundColor = props.backgroundColor;
    const defaultHighlightSeletion = props.defaultHighlightSeletion;
    return `
      document.getElementById('main').style.height = "${height}";
      document.getElementById('main').style.width = "${width}";
      document.getElementById('main').style.backgroundColor = "${backgroundColor}";
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(${toString(props.option)});
      window.document.addEventListener('message', function(e) {
        var req = JSON.parse(e.data);
        switch (req.types) {
          case "SET_OPTION":
            myChart.setOption(req.payload.option,req.payload.notMerge,req.payload.lazyUpate);
            break;
          case "GET_IMAGE":
            var base64 = myChart.getDataURL();
            window.postMessage(JSON.stringify({"types":"GET_IMAGE","payload": base64}));
            break;
          case "CLEAR":
            myChart.clear();
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
        window.postMessage(JSON.stringify({"types":"ON_PRESS","payload": paramsString}));
      });
    if(${defaultHighlightSeletion} !== null && ${defaultHighlightSeletion} !== undefined){
        var highlightSeletionIndex =  ${defaultHighlightSeletion} < ${props.option.series[0].data.length} ? ${defaultHighlightSeletion} : 0;
        // 默认选中第一条数据
        myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: highlightSeletionIndex,
                dataIndex: highlightSeletionIndex
           });
       myChart.dispatchAction({
               type: 'showTip',
              seriesIndex: highlightSeletionIndex,
                dataIndex: highlightSeletionIndex
           });
    
      lastMouseOverIndex=null;
      myChart.on('mouseover', function (params) {
          var dataLen = ${props.option.series[0].data.length} || 20;
          lastMouseOverIndex = params.dataIndex;
          for(var i=0;i<dataLen;i++){
              if(i!= params.dataIndex){
                 myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: i
               })
           }
       }
   });
     myChart.on('mouseout', function (params) {
        myChart.dispatchAction({
           type: 'highlight',
           seriesIndex: 0,
           dataIndex: lastMouseOverIndex
       })  
   });
 }
   
    `
}

export default renderChart;
