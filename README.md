# react-native-echarts
一个webview封装的图表组件。基于百度echarts3

## 安装步骤：

1. 安装依赖
  ```bash
  yarn add react-native-echarts
  ```
  或者
  ```bash
  npm install react-native-echarts --save
  ```
2. 修复android release bug

- 将node_modules/react-native-echarts/echarts 文件夹
- 移动至项目 android/app/src/main/assets文件夹下

3. 引用组件
```javascript
import Echarts from 'react-native-echarts';
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


## 历史版本特性
#### 1.0.0  上传基础组件，基于echarts3封装，修复了ios android闪白，ios默认移动适配，以及android release路径问题◊
