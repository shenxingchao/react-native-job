import React, { useState, useEffect } from 'react'
//导入img组件  from https://reactnativeelements.com/docs/image
import { Image } from 'react-native-elements'
//导入rn组件API
import { View, Text, ActivityIndicator, Dimensions } from 'react-native'
//导入主题
import { ThemeColor } from '../../styles/theme'

//屏幕高度
const SCREEN_WIDTH = Dimensions.get('window').width

//导出宽度撑满高度自动图片组件
export default AutoHeightImage = props => {
  const [autoHeight, setAutoHeight] = useState(0)
  const { source, style, resizeMode } = props

  let base_width = style.width ? style.width : SCREEN_WIDTH //图片宽度 不能设百分比 设像素点

  useEffect(() => {
    if (source.uri) {
      if (source.uri == '')
        return (
          <View {...style}>
            <Text>图片不存在</Text>
          </View>
        )
      //如果是远程图片，则获取
      Image.getSize(source.uri, (width, height) => {
        let h = Math.floor((base_width / width) * height)
        setAutoHeight(h)
      })
    } else {
      const result = Image.resolveAssetSource(props.source)
      let height = result.height
      let width = result.width
      let h = Math.floor((base_width / width) * height)
      setAutoHeight(h)
    }
  }, [])

  return (
    <Image
      style={[
        {
          width: base_width,
          height: autoHeight //自动高度组件参考 https://www.jianshu.com/p/634b60de3460
        },
        { ...style } //后面的覆盖前面的样式
      ]}
      PlaceholderContent={
        <ActivityIndicator size="large" color={ThemeColor.white} />
      }
      source={source}
      resizeMode={resizeMode}
    />
  )
}

// 使用
{
  /* <AutoHeightImage
  style={{ height: 120 }}
  source={{ uri: 'http://www.ay1.cc/img?w=720&h=180&c=f60f60' }}
  resizeMode="contain"//先设contain 再设cover
/> */
}
