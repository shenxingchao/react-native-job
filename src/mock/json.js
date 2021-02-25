const m = new Map([
  [
    '/Index/getIndexBanner',
    {
      message: 'success',
      code: 20000,
      data: { url: 'http://dummyimage.com/720x180/f60f60/ffffff&text=720x180' }
    }
  ]
])
const json = name => {
  return m.get(name)
}

export default json
