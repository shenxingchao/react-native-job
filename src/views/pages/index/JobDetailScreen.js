//定义一个职位详情堆栈导航
import React, { useState, useEffect } from 'react'
//导入基础组件
import { View, Text, StatusBar } from 'react-native'
//安全view
import SafeAreaView from 'react-native-safe-area-view'
//导入UI组件
import { ThemeProvider } from 'react-native-elements'
//导入自定义组件
import AutoHeightImage from '../../components/AutoHeightImage'
//导入主题
import { theme, ThemeColor } from '../../../styles/theme'

export default DetailsScreen = ({ navigation, route }) => {
  const { id } = route.params //获取路由参数
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <ThemeProvider theme={theme}>
        <StatusBar
          backgroundColor={ThemeColor.primary}
          barStyle="dark-content" //字没变黑的话是安卓版本太低了
          animated={true}
          hidden={false}
          translucent={true}
        />
        <Text>详情页id:{id}</Text>
      </ThemeProvider>
    </SafeAreaView>
  )
}
