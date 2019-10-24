import api from '@api/index'
import { requestPosts, receivePosts, failurePosts, shouldFetchPosts } from '@redux/actions'
import { MessageBox, Message } from 'element-react'
// 联系人列表
export const selectEmergency = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectEmergencyApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 联系人认证-删除
export const deleteEmergency = subreddit => {
  return dispatch => {
    MessageBox.confirm('删除该用户的联系人认证, 是否继续?', '提示', {
      type: 'warning'
    }).then(async () => {
      dispatch(requestPosts())
      const data = await api.deleteEmergencyApi(subreddit)
      if (data.success) {
        dispatch(selectEmergency())
        Message({
          type: 'success',
          message: data.msg
        })
      } else {
        dispatch(failurePosts(data))
      }
    }).catch(() => {
      Message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }
}

// 手机列表
export const selectPhoneDate = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectPhoneDateApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 手机认证-删除
export const deletePhoneDate = subreddit => {
  return dispatch => {
    MessageBox.confirm('删除该用户的手机认证, 是否继续?', '提示', {
      type: 'warning'
    }).then(async () => {
      dispatch(requestPosts())
      const data = await api.deletePhoneDateApi(subreddit)
      if (data.success) {
        dispatch(selectPhoneDate())
        Message({
          type: 'success',
          message: data.msg
        })
      } else {
        dispatch(failurePosts(data))
      }
    }).catch(() => {
      Message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }
}

// 银行卡认证
export const selectBank = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectBankApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}
// 银行卡认证-删除
export const deleteBankByUserId = subreddit => {
  return dispatch => {
    MessageBox.confirm('删除该用户的银行卡认证, 是否继续?', '提示', {
      type: 'warning'
    }).then(async () => {
      dispatch(requestPosts())
      const data = await api.deleteBankByUserIdApi(subreddit)
      if (data.success) {
        dispatch(selectBank())
        Message({
          type: 'success',
          message: data.msg
        })
      } else {
        dispatch(failurePosts(data))
      }
    }).catch(() => {
      Message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }
}

// 身份证认证
export const selectIdCard = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectIdCardApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}
// 身份证认证-删除
export const deleteIdCard = subreddit => {
  return dispatch => {
    MessageBox.confirm('删除该用户的身份证认证, 是否继续?', '提示', {
      type: 'warning'
    }).then(async () => {
      dispatch(requestPosts())
      const data = await api.deleteIdCardApi(subreddit)
      if (data.success) {
        dispatch(selectBank())
        Message({
          type: 'success',
          message: data.msg
        })
      } else {
        dispatch(failurePosts(data))
      }
    }).catch(() => {
      Message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }
}

// 认证参数
export const selectAuthentication = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectAuthenticationApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 是否显示
export const updateStatus = obj => {
  return async dispatch => {
    const data = await api.updateStatusApi(obj)
    if (data.success) {
      Message.success('修改成功')
      dispatch(selectAuthentication())
    }
  }
}
//借款是否必须认证
export const updateLoanType = obj => {
  return async dispatch => {
    const data = await api.updateLoanTypeApi(obj)
    if (data.success) {
      Message.success('修改成功')
      dispatch(selectAuthentication())
    }
  }
}

//排序
export const updateSort = obj => {
  return async dispatch => {
    const data = await api.updateSortApi(obj)
    if (data.success) {
      Message.success('修改成功')
      dispatch(selectAuthentication())
    }
  }
}