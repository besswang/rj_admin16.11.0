import api from '@api/index'
import * as type from '@redux/actionTypes'
import { requestPosts, receivePosts, failurePosts, shouldFetchPosts, btnRequestPosts, btnReceivePosts, btnFailurePosts } from '@redux/actions'
import { MessageBox, Message } from 'element-react'
// 待放款
export const selectPendingLoan = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectPendingLoanApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 待放款-放款-银行卡
export const toLoanBank = id => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const admin = JSON.parse(window.sessionStorage.getItem('adminInfo'))
    const data = await api.toLoanBankApi({
      id: id,
      adminId: admin.id
    })
    if (data.success) {
      dispatch(btnReceivePosts(data.msg))
      dispatch(selectPendingLoan())
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
//待放款-放款-线下放款
export const toLoan = id => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const admin = JSON.parse(window.sessionStorage.getItem('adminInfo'))
    console.log(admin)
    const data = await api.toLoanApi({
      id: id,
      adminId: admin.id
    })
    if (data.success) {
      dispatch(btnReceivePosts(data.msg))
      dispatch(selectPendingLoan())
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
// 待放款-拒绝
export const updateStateLoan = (subreddit, t) => {
  return dispatch => {
    if (t === 'FIGHT_MONEY') {
      MessageBox.confirm('打款中', '提示', {
        type: 'warning'
      }).then(() => {

      }).catch(() => {

      })
      return false
    }else{
      MessageBox.confirm('拒绝该用户, 是否继续?', '提示', {
        type: 'warning'
      }).then(async () => {
        dispatch(requestPosts())
        const data = await api.updateStateLoanApi(subreddit)
        if (data.success) {
          dispatch(selectPendingLoan())
          Message.success(data.msg)
        } else {
          dispatch(failurePosts(data))
        }
      }).catch(() => {
        Message.info('已取消操作')
      })
    }
  }
}
// 待还款
export const selectPendingRepay = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectPendingRepayApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}
// 待还款-还款
export const updateStateComplete = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.updateStateCompleteApi(obj)
    if (data.success) {
      dispatch(selectPendingRepay())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
//还款计划-待还款-代扣
export const deductionFee = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.deductionFeeApi(obj)
    if (data.success) {
      dispatch(selectPendingRepay())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
// 待还款-延期
export const updateStateDelay = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.updateStateDelayApi(obj)
    if (data.success) {
      dispatch(selectPendingRepay())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
// 待还款-减免
export const updateStateReduction = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.updateStateReductionApi(obj)
    if (data.success) {
      dispatch(selectPendingRepay())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
// 已完成
export const selectOrderCompleted = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectOrderCompletedApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 已还款
export const selectBill = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectBillApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 当日到期
export const selectTheDayLoan = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectTheDayLoanApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 备注-保存
export const insertRemarks = (obj) => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.insertRemarksApi(obj)
    if (data.success) {
      dispatch(selectTheDayLoan())
      dispatch(btnReceivePosts(data.msg))
    }else{
      dispatch(btnFailurePosts(data.msg))
    }
  }
}

// 当日到期-分配
export const distributionsCuiShou = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.distributionsCuiShouApi(obj)
    if (data.success) {
      dispatch(btnReceivePosts(data.msg))
      dispatch(selectTheDayLoan())
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}

// 待还款-还款-延期-延期天数 findAllDelayRateApi
// select-延期天数
const saveDayList = data => ({
  type: type.SAVE_DAY_LIST,
  data
})
export const findAllDelayRate = name => {
  return async dispatch => {
    const data = await api.findDelayRateApi({channelName:name})
    if (data.success) {
      dispatch(saveDayList(data.data))
    } else {
      Message.error(data.msg)
    }
  }
}

// 还款计划-当日到期-导出
export const exportTheDayLoan = () => {
  return async (dispatch, getState) => {
    const searchAll = shouldFetchPosts(getState())
    await api.exportTheDayLoanApi(searchAll)
  }
}
// 还款计划-待还款-导出
export const exportPendingRepay = () => {
  return async (dispatch, getState) => {
    const searchAll = shouldFetchPosts(getState())
    await api.exportPendingRepayApi(searchAll)
  }
}
// 还款计划-已完成-导出
export const exportOrderCompleted = () => {
  return async (dispatch, getState) => {
    const searchAll = shouldFetchPosts(getState())
    await api.exportOrderCompletedApi(searchAll)
  }
}
// 借款管理-待放款-导出
export const exportPendingLoan = () => {
  return async (dispatch, getState) => {
    const searchAll = shouldFetchPosts(getState())
    await api.exportPendingLoanApi(searchAll)
  }
}
