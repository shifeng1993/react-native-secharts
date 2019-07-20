/*
 * @Description: 根组件
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2019-07-20 12:21:32
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import AppNavigator from './router' // app路由导航

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppNavigator></AppNavigator>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  }
});
