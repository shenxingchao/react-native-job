import request from '../../utils/request'

//获取首页顶部banner图
export function getIndexBanner(params) {
  return request({
    url: '/Index/getIndexBanner',
    method: 'get',
    params: params
  })
}

//获取首页招聘列表
export function getIndexList(params) {
  return request({
    url: '/Index/getIndexList',
    method: 'get',
    params: params
  })
}
