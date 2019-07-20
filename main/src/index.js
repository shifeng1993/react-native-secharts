import React, {Component} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {WebView as RNWebView} from 'react-native-webview';
import renderChart from './utils/renderChart';
import {toString} from './utils/utils';
import {index} from './tmp/templates';
import echarts from './lib/echarts.min';
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
    if (state.isFirstLoad) {
      return {
        isFirstLoad: false
      }
    } else {
      state.setOption(props.option);
      return null
    }
  }

  static defaultProps = {
    backgroundColor: '#00000000',
    onPress: () => {}
  }

  render() {
    return (
      <View style={{flexDirection: 'row', width: this.props.width}}>
        <View style={{flex: 1, height: this.props.height || 400}}>
          <RNWebView
            ref={this.chartRef}
            originWhitelist={['*']}
            useWebKit={true}  // ios使用最新webkit内核渲染
            allowUniversalAccessFromFileURLs={true}
            geolocationEnabled={true}
            mixedContentMode={'always'}
            renderLoading={this.props.renderLoading || (() => <View style={{backgroundColor: this.props.backgroundColor}} />)} // 设置空View，修复ioswebview闪白
            style={{backgroundColor: this.props.backgroundColor}} // 设置背景色透明，修复android闪白
            scrollEnabled={false}
            onMessage={this._handleMessage}
            javaScriptEnabled={true}
            injectedJavaScript={renderChart(this.props)}
            startInLoadingState={false}
            source={{
              baseUrl: '',
              html: index()
            }}
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
        this.setState({data}, () => {
          console.log(this.state.data)
          this.emitImg()
        })
        break;
      default:
        break;
    }
  };


  setOption = (option, notMerge = false, lazyUpdate = false) => {
    let data = {
      option: option,
      notMerge: notMerge,
      lazyUpdate: lazyUpdate
    }
    const run = `
    // alert('optionsChange')
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(${toString(data.option)},${data.notMerge.toString()},${data.lazyUpdate.toString()});
    `
    this.chartRef.current.injectJavaScript(run);
  }

  clear = () => {
    const run = `
    var myChart = echarts.init(document.getElementById('main'));
    myChart.clear()
    `
    this.chartRef.current.injectJavaScript(run);
  }

  emitImg = () => {};

  getImage = (callback) => {
    const run = `
    // alert('getimage')
    var myChart = echarts.init(document.getElementById('main'));
    var base64 = myChart.getDataURL();
    window.ReactNativeWebView.postMessage(JSON.stringify({"types":"GET_IMAGE","payload": base64}));
    `
    this.chartRef.current.injectJavaScript(run);
    let self = this;
    this.emitImg = function () {
      if (self.state.data.types === 'GET_IMAGE') {
        let res = !self.state.data.payload ? null : self.state.data.payload;
        callback(res)
      } else {
        callback(null)
      }
    };
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