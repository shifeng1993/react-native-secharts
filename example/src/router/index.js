import React, {
  Component
} from 'react';
import {createAppContainer, createStackNavigator, StackViewTransitionConfigs} from 'react-navigation';
// 引入页面容器
import {
  IndexPage,
  MapPage
} from '../pages';


const IOS_MODAL_ROUTES = ['Login'];

const dynamicModalTransition = (transitionProps, prevTransitionProps) => {
  const isModal = IOS_MODAL_ROUTES.some(
    screenName =>
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
  )
  return StackViewTransitionConfigs.defaultTransitionConfig(
    transitionProps,
    prevTransitionProps,
    isModal
  );
};

/* ****************************** 总导航 ****************************** */
const AppNavigator = createAppContainer(
  createStackNavigator(
    {
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
      initialRouteName: 'Main',
      transitionConfig: dynamicModalTransition
    }
  )
);

export default AppNavigator;
