import * as React from 'react'
import { View, ScrollView, StatusBar } from 'react-native'
import { HPageViewHoc } from 'react-native-head-tab-view'
import { CollapsibleHeaderTabView } from 'react-native-scrollable-tab-view-collapsible-header'
const HScrollView = HPageViewHoc(ScrollView)

export default ExampleBasic = () => {
  return (
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
          <View style={{ height: 200, backgroundColor: 'red' }} />
        </View>
      )}
    >
      <HScrollView
        tabLabel="推荐"
        style={{
          backgroundColor: 'yellow'
        }}
        index={0}
      >
        <View style={{ height: 1000 }} />
      </HScrollView>
      <HScrollView index={1}>
        <View style={{ height: 1000, backgroundColor: '#673ab7' }} />
      </HScrollView>
    </CollapsibleHeaderTabView>
  )
}
