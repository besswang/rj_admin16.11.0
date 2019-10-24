import api from '@api/index'
import * as type from '@redux/actionTypes'
import { requestPosts, receivePosts, failurePosts, shouldFetchPosts } from '@redux/actions'

// 最后还款日日期搜索
export const endPayTime = time => ({
  type: type.END_REPAY_TIME,
  time
})
// 注册未申请
export const applySearch = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectUserNotApplyApi(searchAll)
    if(data.success){
      dispatch(receivePosts(data.data))
    }else{
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 正常还款未借
export const normalSearch = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectUserNoLoanApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 用户管理-注册未申请-导出
export const exportUserNotApply = () => {
  return async (dispatch, getState) => {
    const searchAll = shouldFetchPosts(getState())
    await api.exportUserNotApplyApi(searchAll)
  }
}
// 用户管理-正常还款未借-导出
export const exportUserNoLoan = () => {
  return async (dispatch, getState) => {
    const searchAll = shouldFetchPosts(getState())
    await api.exportUserNoLoanApi(searchAll)
  }
}
