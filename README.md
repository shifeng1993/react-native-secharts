# react-native-secharts
[![NPM Version](https://img.shields.io/npm/v/react-native-secharts.svg?style=flat)](https://www.npmjs.com/package/react-native-secharts)
  [![License](http://img.shields.io/npm/l/react-native-secharts.svg?style=flat)](https://github.com/shifeng1993/react-native-echarts/blob/master/LICENSE)
  
一个webview封装的图表组件。基于百度echarts4，相比native-echarts有echarts自带对象支持，例如渐变色等，用法与官网相同用法。

echarts version 4.0.4

如果要使用echarts3请切换至echarts3分支

## 安装步骤

1. 安装依赖
  ```bash
  yarn add react-native-secharts
  ```
  或者
  ```bash
  npm install react-native-secharts --save
  ```
2. 修复android release bug

- 将node_modules/react-native-secharts/main/dist/index.html 文件
- 移动至项目 android/app/src/main/assets/echarts/ 文件夹下(如果没有对应路径文件，请创建)

3. 引用组件
```javascript
import {Echarts, echarts} from 'react-native-secharts';
```
- 大写开头的`Echarts`是组件
- 小写开头的`echarts`是echarts对象

4. 使用组件
```javascript
<Echarts option={{}} height={400}/>
```
option具体配置请参考echarts官网api http://echarts.baidu.com/api.html#echarts

官方示例 http://echarts.baidu.com/examples/

## 使用组件

请看example文件夹中示例代码
运行示例
```bash
$ cd example
$ yarn
$ react-native run-ios  或者 $ react-native run-android  
```

## props

| 属性             | 类型    | 默认值                                                   | 备注 |
| -------------   | ------- | -------------                                           | ------------- |
| option          | obj     | null                                                    | echarts配置项，请参考echarts官网  |
| backgroundColor | string  | 'rgba(0,0,0,0)'                                         | 图表画布背景色 |
| width           | number  | 'auto'                                                  | 画布宽度  |
| height          | number  | 400                                                     | 画布高度  |
| renderLoading   | func    | ()=><View style={{backgroundColor: 'rgba(0,0,0,0)'}}/>  | loading时遮罩  |

## 实例方法
| 方法名称             | 参数    | 备注 |
| -------------   | ------- | ------------- |
| setOption         | option     |  echarts配置项，请参考echarts官网  |

## 历史版本特性
#### 1.0.0  上传基础组件，基于echarts3封装，修复了ios android闪白，ios默认移动适配，以及android release路径问题
#### 1.1.0  新增刷新option方法 ，使用refs获取组件实例进行使用
#### 1.2.0  主分支更新至echarts4， 修复不能使用clang系的转译字符问题
#### 1.3.0  新增echarts对象，可以使用对象内对应方法，例如渐变等
## 以下是示例图

#### 柱状图
![image](https://github.com/shifeng1993/react-native-echarts/blob/master/image/1.gif )

#### 折线图
![image](https://github.com/shifeng1993/react-native-echarts/blob/master/image/2.gif )

#### 饼状图
![image](https://github.com/shifeng1993/react-native-echarts/blob/master/image/3.gif )
