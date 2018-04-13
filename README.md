# react-native-secharts
[![NPM Version](https://img.shields.io/npm/v/react-native-secharts.svg?style=flat)](https://www.npmjs.com/package/react-native-secharts)
  [![License](http://img.shields.io/npm/l/react-native-secharts.svg?style=flat)](https://github.com/shifeng1993/react-native-echarts/blob/master/LICENSE)
  
一个webview封装的图表组件。基于百度echarts4

echarts version 4.0.4

如果要使用echarts3请切换至echarts3分支

## 安装步骤：

1. 安装依赖
  ```bash
  yarn add react-native-secharts
  ```
  或者
  ```bash
  npm install react-native-secharts --save
  ```
2. 修复android release bug

- 将node_modules/react-native-secharts/echarts 文件夹
- 移动至项目 android/app/src/main/assets文件夹下

3. 引用组件
```javascript
import Echarts from 'react-native-secharts';
```

4. 使用组件
```javascript
<Echarts option={{}} height={400}/>
```


## 使用组件

请看example文件夹中示例代码
运行示例
```bash
$ cd example
$ yarn
$ react-native run-ios  或者 $ react-native run-android  
```

## props:

| 属性             | 类型    | 默认值                                                   | 备注 |
| -------------   | ------- | -------------                                           | ------------- |
| option          | obj     | null                                                    | echarts3配置项，请参考echarts3官网  |
| backgroundColor | string  | 'rgba(0,0,0,0)'                                         | 图表画布背景色 |
| width           | number  | 'auto'                                                  | 画布宽度  |
| height          | number  | 400                                                     | 画布高度  |
| renderLoading   | func    | ()=><View style={{backgroundColor: 'rgba(0,0,0,0)'}}/>  | loading时遮罩  |

## 实例方法：
| 方法名称             | 参数    | 备注 |
| -------------   | ------- | ------------- |
| setOption         | option     |  echarts3配置项，请参考echarts3官网  |


## 历史版本特性
#### 1.0.0  上传基础组件，基于echarts3封装，修复了ios android闪白，ios默认移动适配，以及android release路径问题
#### 1.1.0  新增刷新option方法 ，使用refs获取组件实例进行使用
#### 1.2.0  主分支更新至echarts4， 修复不能使用clang系的转译字符问题