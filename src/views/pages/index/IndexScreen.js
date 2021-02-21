//定义一个首页堆栈导航
import React, { useState } from 'react'
//导入基础组件
import { View, Text, StatusBar, ScrollView } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import ScrollableTabView, {
  ScrollableTabBar
} from 'react-native-scrollable-tab-view'
import { theme, ThemeColor } from '../../../styles/theme'

//定义一个首页
export default IndexScreen = ({ navigation, route, props }) => {
  const [scrollEnabled, setScrollEnabled] = useState(true)
  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: '#f60' }}
        scrollEnabled={scrollEnabled}
        stickyHeaderIndices={[2]} //吸顶效果
        onScroll={e => {
          console.log(e.nativeEvent.contentOffset.y) //大于tab栏高度+状态栏高度
        }}
      >
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          animated={true}
          hidden={false}
          translucent={true}
        />
        <View style={{ height: 100, backgroundColor: 'green' }}></View>
        <ScrollableTabView
          style={{
            backgroundColor: ThemeColor.white,
            height: 1000
          }}
          initialPage={0} //初始化第一个tab
          renderTabBar={() => <ScrollableTabBar />}
          tabBarPosition="top" //顶部
          locked={false} //锁定拖动 默认否
          tabBarUnderlineStyle={{ backgroundColor: ThemeColor.primary }} //下划线颜色
          tabBarActiveTextColor={ThemeColor.primary}
          tabBarInactiveTextColor={ThemeColor.h2}
          tabBarTextStyle={{ fontSize: 16 }}
          onScroll={position => {
            // console.log('滑动时的位置：' + position)
          }}
          onChangeTab={(key, ref) => {
            // console.log(key)//在这里处理点击显示哪个tab key 就是tabitem的key
          }}
        >
          {/* 选项卡标签 */}
          <ScrollView
            tabLabel="推荐"
            style={{
              backgroundColor: 'yellow'
            }}
            scrollEnabled={!scrollEnabled}
          >
            <Text style={{ height: 500 }}>推荐列表1</Text>
            <Text style={{ height: 500 }}>推荐列表2</Text>
            <Text style={{ height: 500 }}>推荐列表3</Text>
            <Text>推荐列表4</Text>
            <Text
              style={{ width: '100%', height: 100, backgroundColor: 'red' }}
            >
              xxx
            </Text>
          </ScrollView>
          <ScrollView
            tabLabel="最新"
            style={{
              backgroundColor: 'red'
            }}
          >
            <Text>最新列表</Text>
          </ScrollView>
          <ScrollView
            tabLabel="热门"
            style={{
              flex: 1
            }}
          >
            <Text>热门列表</Text>
          </ScrollView>
        </ScrollableTabView>
      </ScrollView>
    </SafeAreaView>
  )
}
