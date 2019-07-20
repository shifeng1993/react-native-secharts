import React, {Component} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import {renderChart,toString} from './renderChart';
import echarts from './echarts.min';
import PropTypes from 'prop-types';

class Echarts extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.state = {
      data: {},
      isFirstLoad: true,
      setOption: this.setOption
    }
    
  }

  static getDerivedStateFromProps(props, state) {
    if(state.isFirstLoad) {
        return {
          isFirstLoad:false
        }
    }else {
      state.setOption(props.option);
      return null
    }
  }

  static defaultProps = {
    backgroundColor: '#00000000',
    onPress: () => {},
    isMap: false
  }

  render() {
    const bmapSource = (Platform.OS == 'ios') ? require('./Bmap.html') : {'uri': 'file:///android_asset/echarts/Bmap.html'} // 修复android release路径问题
    const indexSource = (Platform.OS == 'ios') ? require('./index.html') : {'uri': 'file:///android_asset/echarts/index.html'} // 修复android release路径问题
    let source = this.props.isMap ? bmapSource : indexSource;
    return (
      <View style={{flexDirection: 'row', width: this.props.width}}>
        <View style={{flex: 1, height: this.props.height || 400}}>
          <WebView
            ref={this.chartRef}
            originWhitelist={['*']}
            useWebKit={true}  // ios使用最新webkit内核渲染
            renderLoading={this.props.renderLoading || (() => <View style={{backgroundColor: this.props.backgroundColor}} />)} // 设置空View，修复ioswebview闪白
            style={{backgroundColor: this.props.backgroundColor}} // 设置背景色透明，修复android闪白
            scrollEnabled={false}
            onMessage={this._handleMessage}
            javaScriptEnable={true}
            injectedJavaScript={renderChart(this.props)}
            startInLoadingState={false}
            source={source}
          />
        </View>
      </View>
    );
  }

  _handleMessage = (event) => {
    event.persist()
    if (!event) return null;
    const data = JSON.parse(event.nativeEvent.data)
    switch (data.types) {
      case 'ON_PRESS':
        this.props.onPress(JSON.parse(data.payload))
        break;
      case 'GET_IMAGE':
        this.setState({data})
        break;
      default:
        break;
    }
  };


  setOption = (option, notMerge =false, lazyUpdate=false) => {
    let data = {
      option: option,
      notMerge: notMerge,
      lazyUpdate: lazyUpdate
    }
    const run = `
    // alert('optionsChange')
    myChart.setOption(${toString(data.option)},${data.notMerge.toString()},${data.lazyUpdate.toString()});
    `
    this.chartRef.current.injectJavaScript(run);
  }

  clear = () => {
    this._postjs(`myChart.clear()`)
  }

  timer = null;

  getImage = (callback) => {
    let data = {
      types: 'GET_IMAGE',
      payload: null
    }
    
    const run = `
    // alert('getimage')
    var base64 = myChart.getDataURL();
    window.ReactNativeWebView.postMessage(JSON.stringify({"types":"GET_IMAGE","payload": base64}));
    `
    this.chartRef.current.injectJavaScript(run);

    this.timer = setTimeout(() => {
      if (this.state.data.types === 'GET_IMAGE') {
        let res  = !this.state.data.payload? null: this.state.data.payload;
        callback(this.state.data.payload)
      } else {
        callback(null)
      }
    }, 500);
  }

  componentWillUnmount() {
    !!this.timer && clearTimeout(this.timer);
  }

}

export {Echarts, echarts};
Echarts.propTypes = {
  option: PropTypes.object,
  backgroundColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  renderLoading: PropTypes.func,
  onPress: PropTypes.func
}