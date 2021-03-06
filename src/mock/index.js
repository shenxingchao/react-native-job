//示例
// 'data|100': [
//   //生成100条数据 数组
//   {
//     'shopId|+1': 1, //生成商品id，自增1
//     shopMsg: '@ctitle(10)', //生成商品信息，长度为10个汉字
//     shopName: '@csentence', //生成商品名 ， 都是中国人的名字
//     shopTel: /^1(5|3|7|8)[0-9]{9}$/, //生成随机电话号
//     shopAddress: '@county(true)', //随机生成地址
//     'shopStar|1-5': '', //随机生成1-5个字符串
//     'salesVolume|30-1000': 30, //随机生成商品价格 在30-1000之间
//     shopLogo: '@Image("100x40","#c33", "#ffffff","小北鼻")', //生成随机图片，大小/背景色/字体颜色/文字信息
//     'food|7': [
//       //每个商品中再随机生成七个food
//       {
//         foodName: '@cname', //food的名字
//         foodPic: '@Image("100x40","#c33", "#ffffff","小可爱")', //生成随机图片，大小/背景色/字体颜色/文字信息
//         'foodPrice|1-100': 20, //生成1-100的随机数
//         'aname|14': [
//           {
//             aname: '@cname',
//             'aprice|30-60': 20
//           }
//         ]
//       }
//     ]
//   }
// ]
// mockjs 在线编辑器 http://mockjs.com/0.1/editor.html#help

const Mock = require('mockjs')

//获取首页顶部banner图
let getIndexBanner = Mock.mock({
  message: 'success',
  code: 20000,
  data: {
    url: '@Image("720x300","#5DD5C8", "#ffffff","720x300")'
  }
})
Mock.mock(/Index\/getIndexBanner/, 'get', () => {
  return getIndexBanner
})

//获取首页顶部banner图
let getIndexList = Mock.mock({
  message: 'success',
  code: 20000,
  'data|10': [
    {
      'id|+1': 1,
      job_name: '高级RN开发工程师',
      image: '@Image("400x400","#5DD5C8", "#ffffff","400x400")',
      address: '@county(true)',
      update_time: '2021-03-03 00:00:00',
      'money|2000-20000': 2000,
      'year|1-5': 1
    }
  ]
})
Mock.mock(/Index\/getIndexList/, 'get', () => {
  return getIndexList
})
