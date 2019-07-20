import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Echarts, echarts} from 'react-native-secharts';

const l1 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  offset: 0,
  color: '#1a98f8'
}, {
  offset: 1,
  color: '#fff'
}])

export default class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      option1: {
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
      },
      flag: false  // 这个布尔值是为了测试option1在setstate操作后不会被重置成初始状态。
    }
    this.echart1 = React.createRef();
  }

  render() {
    return (
      <View style={styles.container}>
        <View><Echarts ref={this.echart1} option={this.state.option1} onPress={this.onPress} height={300} /></View>
        <View style={{padding: 20, alignItems: "center"}}><Text>{`当前state内状态: falg = ${this.state.flag.toString()}`}</Text></View>
        <TouchableOpacity onPress={this.editOption}>
          <Text>点我改变echarts option</Text>
        </TouchableOpacity>
        <Text numberOfLines={1}>{!this.state.image ? '这里显示base64格式的img字符串' : this.state.image}</Text>
        <TouchableOpacity onPress={this.getImage}>
          <Text>点我获取echarts image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({flag: !this.state.flag})}>
          <Text>点我测试option 改变后进行setState</Text>
        </TouchableOpacity>
      </View>
    );
  }

  editOption = () => {
    this.setState({
      option1: {
        ...this.state.option1,
        series: [
          {
            data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100]
          }
        ]
      }
    })
  }
  getImage = () => {
    this.echart1.current.getImage((res) => {
      this.setState({image: res})
    })
  }
  onPress = (e) => {
    console.log(e)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
