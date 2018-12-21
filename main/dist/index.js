import React, {Component} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import renderChart from './renderChart';
import echarts from './echarts.min';
import PropTypes from 'prop-types';

class Echarts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.option !== this.props.option) {
      this.setOption(nextProps.option)
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
            ref="chart"
            originWhitelist={['*']}
            useWebKit={true}  // ios使用最新webkit内核渲染
            renderLoading={this.props.renderLoading || (() => <View style={{backgroundColor: this.props.backgroundColor}} />)} // 设置空View，修复ioswebview闪白
            style={{backgroundColor: this.props.backgroundColor}} // 设置背景色透明，修复android闪白
            scrollEnabled={false}
            onMessage={this._handleMessage}
            injectedJavaScript={renderChart(this.props)}
            startInLoadingState={false}
            source={source}
          />
        </View>
      </View>
    );
  }

  _handleMessage = (e) => {
    if (!e) return null;
    const data = JSON.parse(e.nativeEvent.data)
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

  _postMessage(data) {
    this.refs.chart.postMessage(JSON.stringify(data));
  }

  setOption = (option, notMerge, lazyUpdate) => {
    let data = {
      types: 'SET_OPTION',
      payload: {
        option: option,
        notMerge: notMerge || false,
        lazyUpdate: lazyUpdate || false
      }
    }
    this._postMessage(data);
  }

  clear = () => {
    let data = {
      types: 'CLEAR'
    }
    this._postMessage(data);
  }

  getImage = (callback) => {
    let data = {
      types: 'GET_IMAGE',
      payload: null
    }
    this._postMessage(data);
    setTimeout(() => {
      if (this.state.data.types === 'GET_IMAGE') {
        callback(this.state.data)
      } else {
        callback(null)
      }
    }, 500);
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