//定义一个首页堆栈导航
import React from 'react'
//导入基础组件
import { View, Text, StatusBar } from 'react-native'
//导入堆栈导航容器
import { createStackNavigator } from '@react-navigation/stack'
//导入首页
import IndexScreen from '../pages/index/IndexScreen'
//导入职位详情页
import JobDetailScreen from '../pages/index/JobDetailScreen'
//导入主题
import { ThemeColor } from '../../styles/theme'

const Stack = createStackNavigator()

export default IndexTab = () => {
  return (
    <Stack.Navigator
      initialRouteName="IndexScreen"
      screenOptions={{
        //跨屏幕共享样式
        headerStyle: {
          backgroundColor: ThemeColor.primary
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <Stack.Screen
        name="IndexScreen"
        component={IndexScreen}
        options={{
          headerShown: false //隐藏导航栏 就能用沉浸式导航啦
        }}
      />
      {/* 首页里面的页面写这里！！！！！！！！！！！！！！！！ */}
      <Stack.Screen
        name="JobDetailScreen"
        component={JobDetailScreen}
        options={{
          headerShown: true //隐藏导航栏 就能用沉浸式导航啦
        }}
      />
    </Stack.Navigator>
  )
}
