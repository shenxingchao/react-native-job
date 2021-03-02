const GlobalConfig = {
  //请求BaseUrl
  configUrl:
    process.env.NODE_ENV === 'development' ? '' : 'http://www.test.com',
  //是否是d菜单jsdebug模式 这种模式可用web的mockjs否则需要自己定义json 通过这个来获取json数据
  debug: true
}
export { GlobalConfig }
