import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {Echarts, echarts} from './src/index';

export default class App extends Component {
  state = {  }
  render() {
    const l1 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: '#1a98f8'
    }, {
        offset: 1,
        color: '#ff0000'
    }])
    const option = {
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      color: l1,
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
        <TouchableOpacity onPress={this.getImage} ><Text>点我获取echarts image</Text></TouchableOpacity>
      </View>
    );
  }

  editOption = () => {
    const newOption = {
      series: [{
          data: [123, 321, 123, 321, 1290, 111, 654]
      }]
    };
    this.refs.echarts1.setOption(newOption)
  }
  getImage = () => {
    this.refs.echarts1.getImage((res)=>{
      console.log(res)
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  }
});
