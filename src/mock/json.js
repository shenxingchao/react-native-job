const m = new Map([
  [
    '/Index/getIndexBanner',
    {
      message: 'success',
      code: 20000,
      data: {
        url:
          'https://static.zhipin.com/zhipin-geek/v375/h5/wap/images/home-bg.png'
      }
    }
  ],
  [
    '/Index/getIndexList',
    {
      message: 'success',
      code: 20000,
      data: [
        {
          id: 1,
          job_name: '高级RN开发工程师',
          image: 'http://dummyimage.com/400x400/3DD5C8/ffffff&text=R N',
          address: '安徽省 滁州市 南谯区',
          update_time: '2021-03-03 00:00:00',
          money: 17015,
          year: 5
        },
        {
          id: 2,
          job_name: '高级RN开发工程师',
          image: 'http://dummyimage.com/400x400/3DD5C8/ffffff&text=R N',
          address: '辽宁省 铁岭市 调兵山市',
          update_time: '2021-03-03 00:00:00',
          money: 10693,
          year: 3
        },
        {
          id: 3,
          job_name: '高级RN开发工程师',
          image: 'http://dummyimage.com/400x400/3DD5C8/ffffff&text=R N',
          address: '新疆维吾尔自治区 博尔塔拉蒙古自治州 博乐市',
          update_time: '2021-03-03 00:00:00',
          money: 15777,
          year: 4
        },
        {
          id: 4,
          job_name: '高级RN开发工程师',
          image: 'http://dummyimage.com/400x400/3DD5C8/ffffff&text=R N',
          address: '海南省 三沙市 西沙群岛',
          update_time: '2021-03-03 00:00:00',
          money: 9954,
          year: 1
        },
        {
          id: 5,
          job_name: '高级RN开发工程师',
          image: 'http://dummyimage.com/400x400/3DD5C8/ffffff&text=R N',
          address: '内蒙古自治区 包头市 土默特右旗',
          update_time: '2021-03-03 00:00:00',
          money: 3074,
          year: 4
        },
        {
          id: 6,
          job_name: '高级RN开发工程师',
          image: 'http://dummyimage.com/400x400/3DD5C8/ffffff&text=R N',
          address: '山西省 晋城市 泽州县',
          update_time: '2021-03-03 00:00:00',
          money: 9494,
          year: 2
        },
        {
          id: 7,
          job_name: '高级RN开发工程师',
          image: 'http://dummyimage.com/400x400/3DD5C8/ffffff&text=R N',
          address: '云南省 文山壮族苗族自治州 马关县',
          update_time: '2021-03-03 00:00:00',
          money: 19968,
          year: 2
        },
        {
          id: 8,
          job_name: '高级RN开发工程师',
          image: 'http://dummyimage.com/400x400/3DD5C8/ffffff&text=R N',
          address: '湖北省 随州市 广水市',
          update_time: '2021-03-03 00:00:00',
          money: 15069,
          year: 4
        },
        {
          id: 9,
          job_name: '高级RN开发工程师',
          image: 'http://dummyimage.com/400x400/3DD5C8/ffffff&text=R N',
          address: '浙江省 杭州市 余杭区',
          update_time: '2021-03-03 00:00:00',
          money: 7932,
          year: 3
        },
        {
          id: 10,
          job_name: '高级RN开发工程师',
          image: 'http://dummyimage.com/400x400/3DD5C8/ffffff&text=R N',
          address: '宁夏回族自治区 固原市 彭阳县',
          update_time: '2021-03-03 00:00:00',
          money: 2702,
          year: 4
        }
      ]
    }
  ]
])
const json = name => {
  return m.get(name)
}

export default json
