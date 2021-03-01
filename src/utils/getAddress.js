//引入rn推荐的地理定位
import Geolocation from '@react-native-community/geolocation'
//引入axios
import axios from 'axios'
let BaiduMap_URL =
  'http://api.map.baidu.com/reverse_geocoding/v3/?ak=OBNY0mfY8n4RR1pRKNxGfa4Blnf4aBqE&output=json&coordtype=wgs84ll&location='

//rn内置获取经纬度
let getLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve([position.coords.longitude, position.coords.latitude])
      },
      error => {
        reject(error)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  })
}

//百度地图根据经纬度  你地址解析接口 #http://lbs.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
let getMapdata = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    axios({
      url: BaiduMap_URL + latitude + ',' + longitude,
      method: 'get'
    })
      .then(res => {
        if (res.data.status == 0) {
          resolve(res) //res.data.result.addressComponent #省市区
        } else {
          reject(res)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

//获取省市区
let getAddress = () => {
  return new Promise((resolve, reject) => {
    getLocation()
      //获取经纬度的方法返回的是经纬度组成的数组
      .then(locationArr => {
        let longitude = locationArr[0]
        let latitude = locationArr[1]

        getMapdata(latitude, longitude)
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject('获取地理位置失败' + error)
          })
      })
      .catch(error => {
        reject('获取经纬度失败' + error)
      })
  })
}

export default getAddress
