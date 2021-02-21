//App.js
import 'react-native-gesture-handler' //据说不导入会报错 需要全局导入一次
import React from 'react'
//导入基础组件
import {} from 'react-native'
//导入安全区域容器
import { SafeAreaProvider } from 'react-native-safe-area-context'
//导入导航容器
import { NavigationContainer } from '@react-navigation/native'
//导入堆栈导航容器
import { createStackNavigator } from '@react-navigation/stack'
//导入底部tabbar容器
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//导入icon
import { Icon } from 'react-native-elements'
//导入首页tab
import IndexTab from './views/tabbar/IndexTab'
//导入我的tab
import MyTab from './views/tabbar/MyTab'
//导入颜色
import { ThemeColor } from './styles/theme'
//创建堆栈导航
const Stack = createStackNavigator()
//创建底部tab导航
const Tab = createBottomTabNavigator()

//定义一个主屏幕
let HomeScreen = ({ navigation, route }) => {
  return (
    <Tab.Navigator
      initialRouteName="IndexTab"
      labeled={false}
      tabBarOptions={{
        tabStyle: {
          backgroundColor: ThemeColor.white
        },
        labelStyle: {
          fontSize: 12
        },
        style: {
          bottom: 0,
          paddingTop: 4,
          paddingBottom: 4,
          height: 60 //tabbar高度
        },
        activeTintColor: ThemeColor.primary, //颜色
        keyboardHidesTabBar: true //键盘隐藏
      }}
    >
      <Tab.Screen
        name="IndexTab"
        component={IndexTab}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              type="material-community"
              color={color}
              size={40}
            />
          )
        }}
      />
      <Tab.Screen
        name="MyTab"
        component={MyTab}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'account' : 'account-outline'}
              type="material-community"
              color={color}
              size={40}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

//APP堆栈导航
let App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false //隐藏导航栏 就能用沉浸式导航啦
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
//嵌套  堆栈导航->tab导航->堆栈导航->实际页面
