/*
 * @Description: 主路由文件
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2019-07-20 12:22:41
 */

import {createAppContainer, createStackNavigator, StackViewTransitionConfigs} from 'react-navigation';

// 引入页面容器
import {
  IndexPage,        // 主页面
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
      }
    }, {
      initialRouteName: 'Main',
      transitionConfig: dynamicModalTransition
    }
  )
);

export default AppNavigator;

