import api from '@api/index'
import { requestPosts, receivePosts, failurePosts, saveIdCardInfo, shouldFetchPosts,areaRequestPosts,areaReceivePosts,areaFailurePosts } from '@redux/actions'
import { Message } from 'element-react'
import * as type from '@redux/actionTypes'
// 身份证信息
export const selectIdCardByUserId = id => {
  return async dispatch => {
    dispatch(areaRequestPosts())
    const data = await api.selectIdCardByUserIdApi(id)
    if (data.success) {
      dispatch(areaReceivePosts())
      dispatch(saveIdCardInfo(data.data))
      if(data.data === null){
        Message.info('无数据')
      }
    }else{
      dispatch(areaFailurePosts(data.msg))
    }
  }
}

// 手机认证
export const selectPhoneDateByUserId = id => {
  return async dispatch => {
    console.log('123')
    const data = await api.selectPhoneDateByUserIdApi(id)
    if (data.success) {
      console.log(data)
      if (data.data){
        dispatch(saveIdCardInfo(data.data))
      }else{
        Message.info('无数据')
      }
    }
  }
}

// 紧急联系人
export const emergency = id => {
  return async dispatch => {
    const data = await api.selectEmergencyByUserIdApi(id)
    if (data.success) {
      if (data.data) {
        dispatch(saveIdCardInfo(data.data))
      } else {
        Message.info('无数据')
      }
    }
  }
}
// 银行卡信息
export const bankInfo = id => {
  return async dispatch => {
    dispatch(requestPosts())
    const data = await api.selectBankByUserIdApi(id)
    if (data.success) {
      if (data.data === null) {
        dispatch(receivePosts({list:[]}))
      }else{
        dispatch(receivePosts({list:[data.data]}))
      }
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 通讯录
export const selectReportMail = posts => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const trans = Object.assign({},searchAll,posts)
    const data = await api.selectReportMailApi(trans)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}
// 通话记录
export const selectReport = posts => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const trans = Object.assign({}, searchAll, posts)
    const data = await api.selectReportApi(trans)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}
// 短信详情
export const selectUserSms = posts => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const trans = Object.assign({}, searchAll, posts)
    const data = await api.selectUserSmsApi(trans)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}
// 报告
// 请求loading的开始状态
const reportRequestPosts = () => ({
  type: type.REPORT_REQUEST_POSTS
})
// 请求成功后的存储方法
const reportReceivePosts = data => ({
  type: type.REPORT_RECEIVE_POSTS,
  data
})
// 请求失败后的方法
const reportFailurePosts = data => ({
  type: type.REPORT_FAILURE_POSTS,
  data
})
export const selectPresentationByUserId = obj => {
  return async dispatch => {
    dispatch(reportRequestPosts())
    const data = await api.selectPresentationByUserIdApi(obj)
    if (data.success) {
      dispatch(reportReceivePosts(data.data))
    } else {
      console.log(data)
      dispatch(reportFailurePosts(data))
    }
  }
}
