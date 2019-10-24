// 使用 Mock
//var Mock = require('mockjs')
import Mock from 'mockjs'
import { mlisttable } from './mlisttable'
// page-product-editor --end
const data = [].concat(mlisttable)
data.forEach(function (res) {
  if (res) {
    Mock.mock(res.path, res.data)
    // 输出结果
    //console.log(Mock.mock(res.data), null, 4)
  }
})

export default Mock