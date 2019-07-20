/*
 * @Description: 主入口文件
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2019-07-20 11:11:38
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
