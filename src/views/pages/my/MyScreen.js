//定义一个我的堆栈导航
import React from 'react'
//导入基础组件
import { View, Text, StatusBar, ScrollView } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
//定义一个我的
export default MyScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <ScrollView style={{ flex: 1, backgroundColor: '#f60f60' }}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          animated={true}
          hidden={false}
          translucent={true}
        />
        <Text style={{ height: 200 }}>我的1</Text>
        <Text style={{ height: 200 }}>我的2</Text>
        <Text style={{ height: 200 }}>我的3</Text>
        <Text>我的</Text>
        <Text>我的</Text>
        <Text>我的</Text>
        <Text>我的</Text>
        <Text>我的</Text>
        <Text>我的</Text>
        <Text>我的</Text>
        <Text>我的8</Text>
        <Text>我的9</Text>
        <Text>我的10</Text>
      </ScrollView>
    </SafeAreaView>
  )
}
