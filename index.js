/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

import './src/mock' //引入mock.js 模拟数据 开启这里 使用moke/index.js文件拦截

AppRegistry.registerComponent(appName, () => App)
