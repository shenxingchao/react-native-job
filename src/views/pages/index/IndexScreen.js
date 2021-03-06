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
  FlatList,
  SectionList,
  ActivityIndicator,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
//导入吸顶导航嵌套滚动
import { HPageViewHoc } from 'react-native-head-tab-view'
import { CollapsibleHeaderTabView } from 'react-native-scrollable-tab-view-collapsible-header' //修改SlideTabView import  createHeaderTabsComponent  from './createHeaderTabsComponent'
const HScrollView = HPageViewHoc(ScrollView) //自定义内容滚动列表
const FScrollView = HPageViewHoc(FlatList) //滚动列表
const SScrollView = HPageViewHoc(SectionList) //有标题的滚动列表
//导入UI组件
import { ThemeProvider, Button, SearchBar } from 'react-native-elements'
//导入自定义组件
import AutoHeightImage from '../../components/AutoHeightImage'
//导入主题
import { theme, ThemeColor } from '../../../styles/theme'
//导入API请求
import { getIndexBanner, getIndexList } from '../../../api/index/index'
//导入获取所在省市区
import getAddress from '../../../utils/getAddress'

//定义一个首页
export default IndexScreen = ({ navigation, route, props }) => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  //定义页面属性
  const [data, setData] = useState({
    banner: null, //头部banner
    province: '', //省份
    city: '全部', //城市
    keyword: '' //搜索关键词
  })

  //定义列表关联属性
  const [table, setTable] = useState({
    page: 1, //当前页
    page_size: 10, //每页数量
    type: 0, //0推荐 1最新 2热门
    list: [] //列表数据
  })

  //获取列表
  const getList = async () => {
    try {
      //获取首页招聘列表
      const list = await getIndexList({
        page: table.page,
        page_size: table.page_size,
        type: table.type
      })
      setTable({
        ...table,
        list: table.page == 1 ? list.data : table.list.concat(list.data)
      })
    } catch (err) {}
  }

  //相当于 componentDidMount
  useEffect(() => {
    const getInfo = async () => {
      try {
        //获取定位
        const address = await getAddress()
        const { province, city } = address.data.result.addressComponent
        //获取首页顶部banner图
        const banner = await getIndexBanner({}) // 复制json值console.log(JSON.stringify(res))
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
  useEffect(() => {
    // console.log(table.page, table.type)
    getList()
  }, [table.page, table.type])

  return (
    <SafeAreaView style={styles.container}>
      <ThemeProvider theme={theme}>
        <CollapsibleHeaderTabView
          makeHeaderHeight={() => 250}
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
                style={{ height: 250 }} //必须设高度 不然吸顶会失效
                source={{ uri: data.banner }}
                resizeMode="cover" //先设contain 再设cover 保证高度和图片差不多都能正好显示
              />
              <View style={styles.searchbar_box}>
                <SearchBar
                  containerStyle={styles.searchbar_container}
                  inputContainerStyle={styles.searchbar_input_container}
                  inputStyle={styles.searchbar_input}
                  leftIconContainerStyle={styles.searchbar_left_icon_container}
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
                  style={styles.city_container}
                >
                  <Text>{data.city}</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  activeOpacity={0.95}
                  underlayColor={ThemeColor.bg_deep}
                  onPress={() => alert('搜索')}
                  style={styles.search_container}
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
          frozeTop={70}
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
          onChangeTab={item => {
            setTable({
              ...table,
              page: 1,
              type: item.i
            })
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

          //是否显示指示器高度
          makeRoomInRefreshing={false}
        >
          {/* 选项卡标签 */}
          <FScrollView
            index={0}
            tabLabel="推荐"
            style={{
              backgroundColor: ThemeColor.white
            }}
            //标签页下拉刷新
            isRefreshing={isRefreshing}
            renderRefreshControl={() => (
              <ActivityIndicator size="large" color={ThemeColor.primary} />
            )}
            onStartRefresh={() => {
              // console.log('开始刷新')
              setTable({
                ...table,
                page: 1
              })
              setIsRefreshing(true)
              setTimeout(() => {
                // console.log('刷新结束')
                setIsRefreshing(false)
              }, 1500)
            }}
            onEndReached={() => {
              setTable({
                ...table,
                page: table.page + 1
              })
              // console.log('到底了' + data.page)
            }}
            onEndReachedThreshold={0.1} //距离底部还剩多少触发onEndReached，这是一个比值0 ~ 1
            data={table.list}
            keyExtractor={(item, index) => index.toString()}
            // keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableHighlight
                activeOpacity={0.95}
                underlayColor={ThemeColor.bg_deep}
                onPress={() =>
                  navigation.navigate('JobDetailScreen', { id: item.id })
                }
              >
                <View style={styles.item_container}>
                  <AutoHeightImage
                    style={styles.item_image}
                    source={{ uri: item.image }}
                    resizeMode="cover" //先设contain 再设cover 保证高度和图片差不多都能正好显示
                  />
                  <View style={styles.item_content_container}>
                    <Text style={styles.item_content_job_name}>
                      {item.job_name}
                    </Text>
                    <Text style={styles.item_content_address}>
                      {item.address}
                    </Text>
                    <Text style={styles.item_content_text}>
                      {item.year + '年'}
                    </Text>
                    <Text style={styles.item_content_text}>
                      {item.update_time + '更新'}
                    </Text>
                  </View>
                  <View style={styles.item_right_container}>
                    <Text>{'￥' + item.money}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            )}
          ></FScrollView>
          <FScrollView
            index={1}
            tabLabel="最新"
            style={{
              backgroundColor: ThemeColor.white
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
            data={table.list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item_container}>
                <AutoHeightImage
                  style={styles.item_image}
                  source={{ uri: item.image }}
                  resizeMode="cover" //先设contain 再设cover 保证高度和图片差不多都能正好显示
                />
                <View style={styles.item_content_container}>
                  <Text style={styles.item_content_job_name}>
                    {item.job_name}
                  </Text>
                  <Text style={styles.item_content_address}>
                    {item.address}
                  </Text>
                  <Text style={styles.item_content_text}>
                    {item.year + '年'}
                  </Text>
                  <Text style={styles.item_content_text}>
                    {item.update_time + '更新'}
                  </Text>
                </View>
                <View style={styles.item_right_container}>
                  <Text>{'￥' + item.money}</Text>
                </View>
              </View>
            )}
            // renderSectionHeader={({ section: { item_content_job_name } }) => (
            //   <Text>{item_content_job_name}</Text>
            // )}
          ></FScrollView>
          <FScrollView
            index={2}
            tabLabel="热门"
            style={{
              backgroundColor: ThemeColor.white
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
            data={table.list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item_container}>
                <AutoHeightImage
                  style={styles.item_image}
                  source={{ uri: item.image }}
                  resizeMode="cover" //先设contain 再设cover 保证高度和图片差不多都能正好显示
                />
                <View style={styles.item_content_container}>
                  <Text style={styles.item_content_job_name}>
                    {item.job_name}
                  </Text>
                  <Text style={styles.item_content_address}>
                    {item.address}
                  </Text>
                  <Text style={styles.item_content_text}>
                    {item.year + '年'}
                  </Text>
                  <Text style={styles.item_content_text}>
                    {item.update_time + '更新'}
                  </Text>
                </View>
                <View style={styles.item_right_container}>
                  <Text>{'￥' + item.money}</Text>
                </View>
              </View>
            )}
          ></FScrollView>
        </CollapsibleHeaderTabView>
      </ThemeProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  //外部容器
  container: {
    flex: 1
  },
  //搜索框
  searchbar_box: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchbar_container: {
    margin: 'auto',
    width: '90%',
    backgroundColor: null,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0
  },
  searchbar_input_container: {
    backgroundColor: ThemeColor.white,
    borderRadius: 50,
    color: ThemeColor.h1,
    paddingRight: '20%',
    paddingLeft: '20%'
  },
  searchbar_input: {
    fontSize: 16
  },
  searchbar_left_icon_container: {
    width: '20%'
  },
  //城市icon
  city_container: {
    width: '20%',
    height: '100%',
    position: 'absolute',
    left: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50
  },
  //搜索icon
  search_container: {
    width: '20%',
    height: '100%',
    position: 'absolute',
    right: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50
  },
  //列表
  item_container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 20
  },
  item_image: {
    width: 100,
    marginRight: 20
  },
  item_content_container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  item_content_job_name: {
    fontSize: 20,
    color: ThemeColor.primary
  },
  item_content_address: {
    color: ThemeColor.h2
  },
  item_content_text: {
    color: ThemeColor.h3
  },
  item_right_container: {
    width: 80,
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  }
})
