import api from '@api/index'
import { requestPosts, receivePosts, failurePosts, shouldFetchPostsDate } from '@redux/actions'
// 渠道统计
export const handleSearch = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPostsDate(getState())
    const data = await api.pageChannelCountApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 渠道统计-当天
export const pageChannelTheDayCount = obj => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPostsDate(getState())
    const trans = Object.assign({},searchAll,obj)
    const data = await api.pageChannelTheDayCountApi(trans)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 渠道统计-总转化
export const pageChannelTotalCount = obj => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPostsDate(getState())
    const trans = Object.assign({}, searchAll, obj)
    const data = await api.pageChannelTotalCountApi(trans)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 渠道统计-渠道费用
export const pageChannelCost = obj => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPostsDate(getState())
    const trans = Object.assign({}, searchAll, obj)
    const data = await api.pageChannelCostApi(trans)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}
