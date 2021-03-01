//定义一个首页堆栈导航
import React, { useState, useEffect } from 'react'
//导入启动页隐藏
import SplashScreen from 'react-native-splash-screen'
//导入基础组件
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
//导入吸顶导航嵌套滚动
import { HPageViewHoc } from 'react-native-head-tab-view'
import { CollapsibleHeaderTabView } from 'react-native-scrollable-tab-view-collapsible-header' //修改SlideTabView import  createHeaderTabsComponent  from './createHeaderTabsComponent'
const HScrollView = HPageViewHoc(ScrollView)
//导入UI组件
import { ThemeProvider, Button, SearchBar } from 'react-native-elements'
//导入自定义组件
import AutoHeightImage from '../../components/AutoHeightImage'
//导入主题
import { theme, ThemeColor } from '../../../styles/theme'
//导入API请求
import { getIndexBanner } from '../../../api/index/index'
//导入获取所在省市区
import getAddress from '../../../utils/getAddress'

//定义一个首页
export default IndexScreen = ({ navigation, route, props }) => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  //定义页面属性
  const [data, setData] = useState({
    banner: null, //头部banner
    province: '', //身份
    city: '全部', //城市
    keyword: '' //搜索关键词
  })

  //相当于 componentDidMount
  useEffect(() => {
    const getInfo = async () => {
      try {
        //获取首页顶部banner图
        const banner = await getIndexBanner({}) // 复制json值console.log(JSON.stringify(res))
        //获取定位
        const address = await getAddress()
        const { province, city } = address.data.result.addressComponent

        //下面就可以批量设置了
        setData({
          ...data,
          banner: banner.data.url,
          province: province,
          city: city
        })
      } catch (err) {}
    }
    getInfo()
    SplashScreen.hide()
  }, [])
  //componentDidUpdate 可以使用多次 并且可以订阅 #https://zh-hans.reactjs.org/docs/hooks-overview.html
  useEffect(() => {})

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <ThemeProvider theme={theme}>
        <CollapsibleHeaderTabView
          makeHeaderHeight={() => 200}
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
                style={{ height: 200 }} //必须设高度 不然吸顶会失效
                source={{ uri: data.banner }}
                resizeMode="contain" //先设contain 再设cover 保证高度和图片差不多都能正好显示
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 10,
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <SearchBar
                  containerStyle={{
                    margin: 'auto',
                    width: '90%',
                    backgroundColor: null,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    padding: 0
                  }}
                  inputContainerStyle={{
                    backgroundColor: ThemeColor.white,
                    borderRadius: 50,
                    color: ThemeColor.h1,
                    paddingRight: '20%',
                    paddingLeft: '20%'
                  }}
                  inputStyle={{
                    fontSize: 16
                  }}
                  leftIconContainerStyle={{
                    width: '20%'
                  }}
                  searchIcon={null}
                  round={true}
                  placeholder="搜索职位/公司"
                  value={data.keyword}
                  onChangeText={value => {
                    setData({ ...data, keyword: value })
                  }}
                />
                <TouchableHighlight
                  activeOpacity={0.95}
                  underlayColor={ThemeColor.bg_deep}
                  onPress={() => alert('选中')}
                  style={{
                    width: '20%',
                    height: '100%',
                    position: 'absolute',
                    left: '5%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: 50,
                    borderBottomLeftRadius: 50
                  }}
                >
                  <Text>{data.city}</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  activeOpacity={0.95}
                  underlayColor={ThemeColor.bg_deep}
                  onPress={() => alert('搜索')}
                  style={{
                    width: '20%',
                    height: '100%',
                    position: 'absolute',
                    right: '5%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopRightRadius: 50,
                    borderBottomRightRadius: 50
                  }}
                >
                  <Text>搜索</Text>
                </TouchableHighlight>
              </View>
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
              backgroundColor: '#ffffff'
            }}
            //标签页下拉刷新
            isRefreshing={isRefreshing}
            renderRefreshControl={() => (
              <ActivityIndicator size="large" color={ThemeColor.primary} />
            )}
            onStartRefresh={() => {
              // console.log('开始刷新')
              setIsRefreshing(true)
              setTimeout(() => {
                // console.log('刷新结束')
                setIsRefreshing(false)
              }, 1500)
            }}
          >
            <Text style={{ height: 500 }}>推荐列表1</Text>
            <Text style={{ height: 500 }}>推荐列表2</Text>
          </HScrollView>
          <HScrollView
            index={1}
            tabLabel="最新"
            style={{
              backgroundColor: '#ffffff'
            }}
          >
            <Button title="My Button" />
            <Button
              title="My 2nd Button"
              buttonStyle={{ backgroundColor: 'red' }}
            />
            <Button title="My 3nd Button" disabled={true} />
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
      </ThemeProvider>
    </SafeAreaView>
  )
}
