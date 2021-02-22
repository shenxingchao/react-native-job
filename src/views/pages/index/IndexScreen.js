//定义一个首页堆栈导航
import React, { useState } from 'react'
//导入基础组件
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
//导入吸顶导航嵌套滚动
import { HPageViewHoc } from 'react-native-head-tab-view'
import { CollapsibleHeaderTabView } from 'react-native-scrollable-tab-view-collapsible-header'
const HScrollView = HPageViewHoc(ScrollView)
//导入UI组件
import { Image } from 'react-native-elements'
//导入主题
import { theme, ThemeColor } from '../../../styles/theme'

const SCREEN_WIDTH = Dimensions.SCREEN_WIDTH
//定义一个首页
export default IndexScreen = ({ navigation, route, props }) => {
  const [isRefreshing, setIsRefreshing] = useState(false)
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
            <Image
              style={{
                width: SCREEN_WIDTH,
                height: 150 //自动高度组件 写一下 https://www.jianshu.com/p/634b60de3460  https://reactnativeelements.com/docs/image 这个有一个imagecomponet属性
              }}
              source={{
                uri: 'http://www.ay1.cc/img?w=720&h=150&c=f60f60'
              }}
              PlaceholderContent={
                <ActivityIndicator size="large" color={ThemeColor.white} />
              }
              resizeMode="cover"
            />
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
        //整个页面下拉刷新
        isRefreshing={isRefreshing}
        onStartRefresh={() => {
          setIsRefreshing(true)
          console.log('开始刷新')
          setTimeout(() => {
            console.log('刷新结束')
            setIsRefreshing(false)
          }, 2000)
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
