//引入native mock
import json from '../mock/json'
const service = params => {
  return new Promise(resolve => {
    resolve(json(params.url))
  })
}
export default service
