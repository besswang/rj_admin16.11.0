import api from '@api/index'
import { requestPosts, receivePosts, failurePosts, shouldFetchPosts, btnRequestPosts, btnReceivePosts, btnFailurePosts } from '@redux/actions'
import { MessageBox, Message } from 'element-react'
// 催收管理--逾期列表
export const selectOverdueByParam = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectOverdueByParamApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
  }
}
// 催收管理--逾期列表-分配
export const updateOrderCuishou = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.updateOrderCuishouApi(obj)
    if (data.success) {
      dispatch(btnReceivePosts(data.msg))
      dispatch(selectOverdueByParam())
    } else {
      dispatch(btnFailurePosts())
    }
  }
}
// 催收管理--催收列表
export const selectCollectionByParam = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectCollectionByParamApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
  }
}

// 催收管理--个人对账
export const selectthePersion = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectthePersionApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
  }
}

// 逾期-添加黑名单
export const addUserBlack = (subreddit,text) => {
  return dispatch => {
    MessageBox.confirm('将该用户添加至黑名单, 是否继续?', '提示', {
      type: 'warning'
    }).then(async () => {
      dispatch(requestPosts())
      const data = await api.addUserBlackApi(subreddit)
      if (data.success) {
        if(text === 'overdue'){ // 逾期
          dispatch(selectOverdueByParam())
        }else{
          dispatch(selectCollectionByParam())
        }
        Message.success(data.msg)
      } else {
        dispatch(failurePosts(data))
      }
    }).catch(() => {
      Message.info('已取消操作')
    })
  }
}
// 逾期-移除黑名单
export const removeUserBlack = (subreddit, text) => {
  return dispatch => {
    MessageBox.confirm('将该用户添从黑名单移除, 是否继续?', '提示', {
      type: 'warning'
    }).then(async () => {
      dispatch(requestPosts())
      const data = await api.removeUserBlackApi(subreddit)
      if (data.success) {
        if (text === 'overdue') { // 逾期
          dispatch(selectOverdueByParam())
        }else{
          dispatch(selectCollectionByParam())
        }
        Message.success('从黑名单移除成功')
      } else {
        dispatch(failurePosts(data))
      }
    }).catch(() => {
      Message.info('已取消操作')
    })
  }
}
// 备注-保存
export const insertRemarks = (obj) => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.insertRemarksApi(obj)
    if (data.success) {
      dispatch(selectCollectionByParam())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
// 催收管理-逾期列表-导出
export const exportOverdue = () => {
  return async (dispatch, getState) => {
    const searchAll = shouldFetchPosts(getState())
    await api.exportOverdueApi(searchAll)
  }
}
// 催收管理-催收列表-导出
export const exportCollection = () => {
  return async (dispatch, getState) => {
    const searchAll = shouldFetchPosts(getState())
    await api.exportCollectionApi(searchAll)
  }
}
// 催收管理-个人对帐-导出
export const exportThePersion = () => {
  return async (dispatch, getState) => {
    const searchAll = shouldFetchPosts(getState())
    await api.exportThePersionApi(searchAll)
  }
}
