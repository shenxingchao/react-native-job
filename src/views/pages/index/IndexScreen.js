//定义一个首页堆栈导航
import React, { useState, useEffect } from 'react'

//导入基础组件
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
//导入吸顶导航嵌套滚动
import { HPageViewHoc } from 'react-native-head-tab-view'
import { CollapsibleHeaderTabView } from 'react-native-scrollable-tab-view-collapsible-header'
const HScrollView = HPageViewHoc(ScrollView)
//导入UI组件
import {} from 'react-native-elements'
//导入自定义组件
import AutoHeightImage from '../../components/AutoHeightImage'
//导入主题
import { theme, ThemeColor } from '../../../styles/theme'
//导入请求
import request from '../../../utils/request'

//定义一个首页
export default IndexScreen = ({ navigation, route, props }) => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showActivityIndicator, setShowActivityIndicator] = useState(false)

  useEffect(() => {
    //相当于 componentDidMount 和 componentDidUpdate 可以使用多次 并且可以订阅 #https://zh-hans.reactjs.org/docs/hooks-overview.html
    request({
      url: '/UserCenter/getInfo',
      method: 'get',
      params: {}
    })
      .then(res => {
        // console.log(res)
      })
      .catch(() => {})
  })

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <CollapsibleHeaderTabView
        makeHeaderHeight={() => 120}
        renderScrollHeader={() => (
          <View>
            <StatusBar
              backgroundColor="transparent"
              barStyle="light-content"
              animated={true}
              hidden={false}
              translucent={true}
            />
            <AutoHeightImage
              style={{ height: 120 }} //必须设高度 不然吸顶会失效
              source={{
                uri:
                  'https://placeholder.idcd.com/?w=720&h=180&text=600x300&bgcolor=f60f60&fontcolor=ffffff&fontsize=60'
              }}
              resizeMode="cover" //先设contain 再设cover 保证高度和图片差不多都能正好显示
            />
          </View>
        )}
        style={{
          backgroundColor: ThemeColor.white
        }}
        initialPage={0} //初始化第一个tab
        tabbarHeight={120} //初始选项卡的高度，如果设置了这个，性能可以得到改善
        tabBarPosition="top" //顶部
        locked={false} //锁定拖动 默认否
        tabBarUnderlineStyle={{
          backgroundColor: ThemeColor.primary
        }} //下划线颜色
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
        // isRefreshing={isRefreshing}
        // onStartRefresh={() => {
        //   setIsRefreshing(true)
        //   console.log('开始刷新')
        //   setTimeout(() => {
        //     console.log('刷新结束')
        //     setIsRefreshing(false)
        //   }, 2000)
        // }}
      >
        {/* 选项卡标签 */}
        <HScrollView
          index={0}
          tabLabel="推荐"
          style={{
            backgroundColor: 'yellow'
          }}
          //标签页下拉刷新
          isRefreshing={isRefreshing}
          onStartRefresh={() => {
            // console.log('开始刷新')
            setIsRefreshing(true)
            setShowActivityIndicator(true)
            setTimeout(() => {
              // console.log('刷新结束')
              setIsRefreshing(false)
              setShowActivityIndicator(false)
            }, 1500)
          }}
        >
          {showActivityIndicator && (
            <View
              style={{
                position: 'relative',
                justifyContent: 'center'
              }}
            >
              <ActivityIndicator
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0
                }}
                size="large"
                color={ThemeColor.primary}
              />
            </View>
          )}
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
