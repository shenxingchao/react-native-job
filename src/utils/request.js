// import React from 'react'
import { ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from 'axios'

import { config } from './config'
// create an axios instance
let baseURL = config.configUrl
const service = axios.create({
  baseURL: baseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  responseType: 'json' // default
})

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
    const res = response.data
    if (res.code !== 20000) {
      // ToastAndroid.show(res.message || 'Error', 5 * 1000)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // console.log(res)
      return res
    }
  },
  error => {
    // console.log('err' + error) // for debug
    // ToastAndroid.show(error.message, 5 * 1000)
    return Promise.reject(error)
  }
)

export default service
