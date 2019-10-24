import api from '@api/index'
import { requestPosts, receivePosts, failurePosts, shouldFetchPosts } from '@redux/actions'
// 推广统计
export const selectPromotionStatistics = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectPromotionStatisticsApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

//渠道会员
// export const selectTotal = () => {
//   return async (dispatch, getState) => {
//     dispatch(requestPosts())
//     const searchAll = shouldFetchPosts(getState())
//     const b = await api.selectTotalApi(searchAll)
//     if (b.success) {
//       dispatch(receivePosts({total: Number(b.data)}))
//     } else {
//       dispatch(failurePosts(b.msg))
//     }
//   }
// }
export const selectChannelMember = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const a = await api.selectChannelMemberApi(searchAll)
    const b = await api.selectTotalApi(searchAll)
    if (a.success && b.success) {
      dispatch(receivePosts({list:a.data,total:Number(b.data)}))
    } else {
      dispatch(failurePosts(a.msg))
      dispatch(failurePosts(b.msg))
    }
  }
}
