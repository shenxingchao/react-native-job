//定义一个我的
import React from 'react'
//导入基础组件
import { View, Text, StatusBar } from 'react-native'
//导入堆栈导航容器
import { createStackNavigator } from '@react-navigation/stack'
//导入我的
import MyScreen from '../pages/my/MyScreen'

const Stack = createStackNavigator()

export default MyTab = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyScreen"
      screenOptions={{
        //跨屏幕共享样式
        headerStyle: {
          backgroundColor: '#f60f60'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <Stack.Screen
        name="MyScreen"
        component={MyScreen}
        options={{
          headerShown: false //隐藏导航栏 就能用沉浸式导航啦
        }}
      />
    </Stack.Navigator>
  )
}
