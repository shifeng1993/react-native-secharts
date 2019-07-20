# react-native-secharts
[![NPM Version](https://img.shields.io/npm/v/react-native-secharts.svg?style=flat)](https://www.npmjs.com/package/react-native-secharts)
  [![License](http://img.shields.io/npm/l/react-native-secharts.svg?style=flat)](https://github.com/shifeng1993/react-native-echarts/blob/master/LICENSE)
  
一个webview封装的图表组件。基于百度echarts4，相比native-echarts有echarts自带对象支持，例如渐变色等，用法与官网相同用法。

echarts version 4.2.1

注：react-native 最近几个版本 webview 改动频繁，请仔细阅读安装步骤。

## 已知bug 和 需要注意的点
- android 模拟器上面渲染会出问题，目前android真机是没有问题的，请不要提类似issues。

- echarts配置项内所有的函数均无法被`new function()` 或者 `eval()`重新还原为函数, 这个bug只能找到echarts源码内的方法进行修改，后续找到地方会进行修复，请不要在提类似的bug。

- 实例方法setOption不会保存修改后的option，这意味着在react 执行setState操作后重新render，当前state的状态会重新覆盖webview内setOption的状态，所以不推荐使用。

- 目前已经修复组件因为onload发生的闪烁，这意味着可以不用组件setOption的实例方法，直接通过修改当容器组件的绑定的state值，setState操作，然后secharts组件会监听 state中option的改变，来进行option修改。当然组件实例方法setOption还是可以使用的，只是有bug，不推荐而已。

## 安装步骤

1. 安装依赖

- react-native >= 0.60.2
  
  ```bash
  yarn add react-native-secharts react-native-webview@androidx
  ```
    或者
  ```bash
  npm install react-native-secharts react-native-webview@androidx --save
  ```
  安装完成后在`android/gradle.properties`文件添加2行配置，确保在项目中启用AndroidX

  注：0.60+采用自动link 安装后不需要进行link
  
  ```
  android.useAndroidX=true
  android.enableJetifier=true
  ```
- react-native >= 0.57 && react-native > 0.60.2
  ```bash
  yarn add react-native-secharts react-native-webview
  react-native link react-native-webview
  ```
    或者
  ```bash
  npm install react-native-secharts@1.6.1 react-native-webview --save
  react-native link react-native-webview
  ```

- react-native = 0.56
  ```bash
  yarn add react-native-secharts@1.5.3
  ```
    或者
  ```bash
  npm install react-native-secharts@1.5.3 --save
  ```

- react-native < 0.56
  ```bash
  yarn add react-native-secharts@1.4.5
  ```
    或者
  ```bash
  npm install react-native-secharts@1.4.5 --save
  ```

2. 修复android release bug
- 组件版本`1.7.0`以上（包含），不需要此步骤，请跳过
- 在你的项目创建此路径的文件夹 `$yourProject/android/app/src/main/assets/echarts`，
- 创建完成后请在你的项目根目录（`$yourProject/） 文件夹下使用命令
- 以下是 mac && linux 
```bash
cp node_modules/react-native-secharts/main/dist/index.html android/app/src/main/assets/echarts/ && cp node_modules/react-native-secharts/main/dist/Bmap.html android/app/src/main/assets/echarts/
```
- 以下是 windows
```bash
copy node_modules/react-native-secharts/main/dist/index.html android/app/src/main/assets/echarts/ && copy node_modules/react-native-secharts/main/dist/Bmap.html android/app/src/main/assets/echarts/
```

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
请看example文件夹中示例代码  

链接：https://github.com/shifeng1993/react-native-secharts/tree/master/example

运行示例
```bash
$ cd example
$ yarn
$ react-native run-ios  或者 $ react-native run-android  
```
option具体配置请参考echarts官网api http://echarts.baidu.com/api.html#echarts

官方示例 http://echarts.baidu.com/examples/

## props

| 属性             | 类型    | 默认值                                                   | 备注 |
| -------------   | ------- | -------------                                           | ------------- |
| option          | obj     | null                                                    | echarts配置项，请参考echarts官网  |
| backgroundColor | string  | 'rgba(0,0,0,0)'                                         | 图表画布背景色 |
| width           | number  | 'auto'                                                  | 画布宽度  |
| height          | number  | 400                                                     | 画布高度  |
| renderLoading   | func    | ()=><View style={{backgroundColor: 'rgba(0,0,0,0)'}}/>  | loading时遮罩  |
| onPress         | func    | (e)=>{}                                                 | 点击事件  |


## 实例方法
| 方法名称         | 参数                            | 备注 |
| -------------   | -------                        | ------------- |
| setOption       | (option: Object, notMerge?: boolean, lazyUpdate?: boolean) |  参数参考：http://echarts.baidu.com/api.html#echartsInstance.setOption |
| getImage        | (base64)=>{}                   |  返回函数的参数base64，可结合RNFS写入相册  |
| clear           | 无                             |  清空echarts画布  |


## 历史版本特性
#### 1.7.0  修复bug，增加适配androidx，更新echarts版本到4.2.1，去掉isMap属性
#### 1.6.1  修复文档错误部分
#### 1.6.0  修复0.57版本出现的本地不能渲染的bug。
#### 1.5.3  修复1.5.2版本出现的不能渲染的bug，使用最新版本rn重写示例。
#### 1.5.2  新增了必要的props使用canvas或者svg渲染
#### 1.5.1  修复组件在重绘过程中会刷新webview的闪烁,更新echarts版本到4.2.0-rc.2
#### 1.5.0  更新组件到支持rn0.56版本，修复ios release出现的不能渲染的bug。
#### 1.4.5  更新echarts版本到4.1.0
#### 1.4.4  增加echart实例方法setOption的附加参数调用，增加clear实例方法调用
#### 1.4.3  修复设置了echarts地图，其余图表只能显示一个的问题
#### 1.4.2  修复echarts地图不能显示的问题，目前只支持echarts最新的bmap形式。
#### 1.4.0  更新echarts版本到4.1.0.rc2，修复图表点击事件。
#### 1.3.9  修复formatter属性function被屏蔽的问题。
#### 1.3.7  修复了flex：1不能显示的问题
#### 1.3.6  修复了formatter属性不能使用clang系的转译字符，以及被误转为string的问题
#### 1.3.3  新增获取图片getImage方法 ，使用refs获取组件实例进行使用
#### 1.3.0  新增echarts对象，可以使用对象内对应方法，例如渐变等
#### 1.2.0  主分支更新至echarts4
#### 1.1.0  新增刷新option方法 ，使用refs获取组件实例进行使用
#### 1.0.0  上传基础组件，基于echarts3封装，修复了ios android闪白，ios默认移动适配，以及android release路径问题


## 以下是示例图

#### 柱状图
![image](https://github.com/shifeng1993/react-native-echarts/blob/master/image/1.gif )

#### 折线图
![image](https://github.com/shifeng1993/react-native-echarts/blob/master/image/2.gif )

#### 饼状图
![image](https://github.com/shifeng1993/react-native-echarts/blob/master/image/3.gif )
