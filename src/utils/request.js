// import React from 'react'
import {} from 'react-native'
//引入本地缓存
import AsyncStorage from '@react-native-async-storage/async-storage'
//引入axios
import axios from 'axios'
//引入全局配置文件
import { GlobalConfig } from './config'
//导入原生mock拦截
import mockrequest from './mockrequest'

// create an axios instance
let baseURL = GlobalConfig.configUrl
const service = GlobalConfig.debug
  ? axios.create({
      baseURL: baseURL, // url = base url + request url
      // withCredentials: true, // send cookies when cross-domain requests
      timeout: 5000, // request timeout
      responseType: 'json' // default
    })
  : mockrequest

if (GlobalConfig.debug) {
  // request interceptor
  service.interceptors.request.use(
    async config => {
      // do something before request is sent
      try {
        const token = await AsyncStorage.getItem('token')
        if (token !== null) {
          config.headers.common['X-Token'] = token
        }
      } catch (e) {
        // error reading value
      }
      return config
    },
    error => {
      // do something with request error
      // console.log(error) // for debug
      return Promise.reject(error)
    }
  )

  // response interceptor
  service.interceptors.response.use(
    response => {
      // console.log(response) // for debug
      const res = response.data
      if (res.code !== 20000) {
        // ToastAndroid.show(res.message || 'Error', 5 * 1000)
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }
    },
    error => {
      // console.log('err' + error) // for debug
      // ToastAndroid.show(error.message, 5 * 1000)
      return Promise.reject(error)
    }
  )
}

export default service
