import * as type from '../actionTypes'
import { Notification } from 'element-react'
const lookData = [{
  text: '放款金额',
  num: 'allLoanMoney'
}, {
  text: '待还总金额',
  num: 'allToReturnMoney'
}, {
  text: '未逾期待还金额',
  num: 'noOverdueReturnMoney'
}, {
  text: '还款总金额',
  num: 'allReturnMoney'
}, {
  text: '还款收益',
  num: 'allReturnProfit'
}, {
  text: '续期金额',
  num: 'allRenewalMoney'
}, {
  text: '逾期金额',
  num: 'overdueToReturnMoney'
}, {
  text: '逾期本金',
  num: 'overduePrincipal'
}]
//初始化列表数据
const initLook = {
  loading: false,
  data: []
}
const lookInfo = (state = {
  ...initLook
}, action) => {
  switch (action.type) {
    case type.LOOK_REQUEST_POSTS:
      return {...state, loading: true}
    case type.LOOK_RECEIVE_POSTS:{
      const arr = []
      let obj = {}
      for (const i in lookData){
        obj = {
          num: action.data[lookData[i].num] ? action.data[lookData[i].num] : 0,
          text: lookData[i].text
        }
        arr.push(obj)
      }
      return {...state, data: arr, loading: false}
    }
    case type.LOOK_FAILURE_POSTS:{
      Notification.warning(action.posts.msg)
      return {...state, loading: false, data: []}
    }
    default:
      return state
  }
}
export default lookInfo
