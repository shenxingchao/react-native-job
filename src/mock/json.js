const m = new Map([
  [
    '/Index/getIndexBanner',
    {
      message: 'success',
      code: 20000,
      data: { url: 'http://dummyimage.com/720x300/5DD5C8/ffffff&text=720x300' }
    }
  ]
])
const json = name => {
  return m.get(name)
}

export default json
