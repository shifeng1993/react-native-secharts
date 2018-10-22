import React, {
  Component
} from 'react';
import {
  createStackNavigator
} from 'react-navigation';

// 引入页面容器
import {
  IndexPage,
  MapPage
} from '../pages';

/* ****************************** 总导航 ****************************** */
const AppNavigator = createStackNavigator({
  Main: {
    screen: IndexPage,
    navigationOptions: {
      header: null,
      gesturesEnabled: false // 左侧滑动返回   ios默认开启，android默认关闭
    }
  },
  Map: {
    screen: MapPage,
  }
}, {
  initialRouteName: 'Main'
});

export default AppNavigator;
