//定义一个首页堆栈导航
import React, { useState } from 'react'
//导入基础组件
import { View, Text, StatusBar, ScrollView } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
//导入吸顶导航嵌套滚动
import { HPageViewHoc } from 'react-native-head-tab-view'
import { CollapsibleHeaderTabView } from 'react-native-scrollable-tab-view-collapsible-header'
const HScrollView = HPageViewHoc(ScrollView)
//导入主题
import { theme, ThemeColor } from '../../../styles/theme'

//定义一个首页
export default IndexScreen = ({ navigation, route, props }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <CollapsibleHeaderTabView
        makeHeaderHeight={() => 150}
        renderScrollHeader={() => (
          <View>
            <StatusBar
              backgroundColor="transparent"
              barStyle="light-content"
              animated={true}
              hidden={false}
              translucent={true}
            />
            <View style={{ height: 150, backgroundColor: 'red' }} />
          </View>
        )}
        style={{
          backgroundColor: ThemeColor.white
        }}
        initialPage={0} //初始化第一个tab
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
        <HScrollView
          index={0}
          tabLabel="推荐"
          style={{
            backgroundColor: 'yellow'
          }}
        >
          <Text style={{ height: 500 }}>推荐列表1</Text>
          <Text style={{ height: 500 }}>推荐列表2</Text>
          <Text style={{ height: 500 }}>推荐列表3</Text>
          <Text>推荐列表4</Text>
          <Text style={{ width: '100%', height: 100, backgroundColor: 'red' }}>
            xxx
          </Text>
        </HScrollView>
        <HScrollView
          index={1}
          tabLabel="最新"
          style={{
            backgroundColor: 'red'
          }}
        >
          <Text>最新列表</Text>
        </HScrollView>
        <HScrollView
          index={2}
          tabLabel="热门"
          style={{
            backgroundColor: 'blue'
          }}
        >
          <Text>热门列表</Text>
        </HScrollView>
      </CollapsibleHeaderTabView>
    </SafeAreaView>
  )
}
