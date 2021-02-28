/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

// import './src/mock' //引入mock.js 模拟数据 开启这里 使用moke/index.js文件拦截 仅限js debug模式 模拟经纬度时必须关闭mockjs 不然会出错

AppRegistry.registerComponent(appName, () => App)
