import React, { Component } from 'react';
import { WebView, View, StyleSheet,Platform} from 'react-native';
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
    if(nextProps.option !== this.props.option) {
      this.refs.chart.reload();
    }
  }
  static defaultProps = {
    backgroundColor: '#00000000'
  } 
  render() {
    const source = (Platform.OS == 'ios') ? require('./index.html') : {'uri':'file:///android_asset/echarts/index.html'} // 修复android release路径问题
    return (
      <View style={{flex: 1, height: this.props.height || 400}}>
        <WebView
          ref="chart"
          renderLoading={this.props.renderLoading || (()=><View style={{backgroundColor:this.props.backgroundColor}}/>)} // 设置空View，修复ioswebview闪白
          style={{backgroundColor:this.props.backgroundColor}} // 设置背景色透明，修复android闪白
          scrollEnabled={false}
          onMessage={this._handleMessage}
          injectedJavaScript={renderChart(this.props)}
          startInLoadingState={false}
          source={source}
        />
      </View>
    );
  }
  _handleMessage = (e) => this.setState({data:JSON.parse(e.nativeEvent.data)});
  setOption = (option) => {
    let data = {
      types: 'SET_OPTION',
      payload: option
    }
    this.refs.chart.postMessage(JSON.stringify(data));
  }
  getImage = (callback) => {
    let data = {
      types: 'GET_IMAGE',
      payload: null
    }
    this.refs.chart.postMessage(JSON.stringify(data));
    setTimeout(() => {
      if(this.state.data.types === 'GET_IMAGE') {
        callback(this.state.data)
      } else {
        callback(null)
      }
    }, 500);
  }  
}

export {Echarts, echarts};
Echarts.propTypes = {
  option:PropTypes.object,
  backgroundColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  renderLoading: PropTypes.func
}