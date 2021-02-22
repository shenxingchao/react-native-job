import React, { useState } from 'react'
//导入img组件  from https://reactnativeelements.com/docs/image
import { Image } from 'react-native-elements'
//导入rn组件API
import { ActivityIndicator, Dimensions } from 'react-native'
//导入主题
import { ThemeColor } from '../../styles/theme'

//屏幕高度
const SCREEN_WIDTH = Dimensions.get('window').width

//导出宽度撑满高度自动图片组件
export default AutoHeightImage = props => {
  const [autoHeight, setAutoHeight] = useState(0)
  const { source, style } = props

  if (source.uri) {
    //如果是远程图片，则获取
    Image.getSize(source.uri, (width, height) => {
      let h = Math.floor((SCREEN_WIDTH / width) * height)
      setAutoHeight(h)
    })
  } else {
    const result = Image.resolveAssetSource(this.props.source)
    let height = result.height
    let width = result.width
    let h = Math.floor((SCREEN_WIDTH / width) * height)
    setAutoHeight(h)
  }

  return (
    <Image
      style={[
        { ...style },
        {
          width: SCREEN_WIDTH,
          height: autoHeight //自动高度组件参考 https://www.jianshu.com/p/634b60de3460
        }
      ]}
      PlaceholderContent={
        <ActivityIndicator size="large" color={ThemeColor.white} />
      }
      source={source}
    />
  )
}

// 使用
{
  /* <AutoHeightImage
source={{ uri: 'http://www.ay1.cc/img?w=720&h=150&c=f60f60' }}
/> */
}
