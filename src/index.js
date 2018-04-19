import React, { Component } from 'react';
import { WebView, View, StyleSheet, Platform } from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';
import PropTypes from 'prop-types';

export default class Echarts extends Component {
  static propTypes = {
    option: PropTypes.object,
    backgroundColor: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    renderLoading: PropTypes.func,
    onPress: PropTypes.func
  }
  static defaultProps = {
    backgroundColor: '#00000000'
  }
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.option !== this.props.option) {
      this.refs.chart.reload();
    }
  }
  _onPress = () => {
    this.props.onPress && this.props.onPress(JSON.parse(event.nativeEvent.data))
  }
  _renderLoading = () => {
    if (this.props.renderLoading) {
      return this.props.renderLoading
    }
    return <View style={{ backgroundColor: this.props.backgroundColor }} />
  }
  render() {
    const source = (Platform.OS == 'ios') ? require('./index.html') : { 'uri': 'file:///android_asset/echarts/index.html' } // 修复android release路径问题
    return (
      <View style={{ height: this.props.height || 400, }}>
        <WebView
          ref="chart"
          renderLoading={this._renderLoading} // 设置空View，修复ioswebview闪白
          style={{ backgroundColor: this.props.backgroundColor, }} // 设置背景色透明，修复android闪白
          scrollEnabled={false}
          injectedJavaScript={renderChart(this.props)}
          source={source}
          onMessage={this._onPress}
        />
      </View>
    );
  }
  setOption = (option) => {
    this.refs.chart.postMessage(JSON.stringify(option));
  }
}


