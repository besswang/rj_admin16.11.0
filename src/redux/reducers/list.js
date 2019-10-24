import * as type from '../actionTypes'
import { Notification } from 'element-react'
//初始化列表数据
const initList = {
  loading: false,
  total: 0,
  pageSizes: [5, 10, 20, 30],
  data: []
}
const list = (state = {
  ...initList
}, action) => {
  switch (action.type) {
    case type.REQUEST_POSTS:
      return {...state, loading: true}
    case type.RECEIVE_POSTS:{
      let arr = null
      if (action.posts.list && action.posts.list !== null){
        arr = action.posts.list
      }else{
        arr = []
      }
      return {...state, data: arr, total: action.posts.total, loading: false}
    }
    case type.FAILURE_POSTS:{
      Notification.warning(action.posts.msg)
      return {...state, loading: false, data: []}
    }
    default:
      return state
  }
}
export default list
