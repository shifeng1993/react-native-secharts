import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Echarts from './src/index.js';

export default class App extends Component {
  state = {  }
  render() {
    const option = {
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
      }]
    };
    return (
      <View style={styles.container}>
        <Echarts ref="echarts1" option={option}/>
        <TouchableOpacity onPress={this.editOption} ><Text>点我改变echarts option</Text></TouchableOpacity>
      </View>
    );
  }

  editOption = () => {
    const newOption = {
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [123, 321, 123, 321, 1290, 111, 654],
          type: 'line',
          areaStyle: {}
      }]
    };
    this.refs.echarts1.setOption(newOption)
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  }
});
