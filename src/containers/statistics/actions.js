import api from '@api/index'
import { requestPosts, receivePosts, failurePosts, shouldFetchPostsDate } from '@redux/actions'
import * as type from '@redux/actionTypes'
// 报表统计-逾期统计
export const overSearch = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPostsDate(getState())
    console.log(searchAll)
    const data = await api.pageOverdueCountApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 报表统计-放款统计
export const pageLoanCount = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPostsDate(getState())
    console.log(searchAll)
    const data = await api.pageLoanCountApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 报表统计-还款统计
export const pageRepaymentCount = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPostsDate(getState())
    console.log(searchAll)
    const data = await api.pageRepaymentCountApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
  }
}
// 报表统计-还款统计-当天
export const pageRepaymentCountByDay = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPostsDate(getState())
    const trans = Object.assign({}, searchAll, {date:window.sessionStorage.getItem('theDay')})
    const data = await api.pageRepaymentCountByDayApi(trans)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
  }
}
// 报表统计-消耗费用
export const pageCostCount = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPostsDate(getState())
    console.log(searchAll)
    const data = await api.pageCostCountApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 报表统计-进出账
export const pageInoutCount = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPostsDate(getState())
    console.log(searchAll)
    const data = await api.pageInoutCountApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

const lookRequest = () => ({
  type: type.LOOK_REQUEST_POSTS
})
// 请求成功后的存储方法
const lookReceive = data => ({
  type: type.LOOK_RECEIVE_POSTS,
  data
})
// 请求失败后的方法
const lookFailure = () => ({
  type: type.LOOK_FAILURE_POSTS
})
// 报表统计-数据看版
export const selectDataCheckCount = () => {
  return async (dispatch) => {
    dispatch(lookRequest())
    const data = await api.selectDataCheckCountApi()
    if (data.success) {
      dispatch(lookReceive(data.data[0]))
    } else {
      dispatch(lookFailure())
    }
  }
}
