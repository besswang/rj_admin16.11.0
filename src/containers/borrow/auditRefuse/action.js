import api from '@api/index'
import { FALSE } from '@meta/state'
import { requestPosts, receivePosts, failurePosts, shouldFetchPosts } from '@redux/actions'
import { MessageBox, Message } from 'element-react'
// 会员管理-会员列表
export const handelSearch = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const trans = Object.assign({}, searchAll, {state: FALSE})
    const data = await api.selectOrderByParamApi(trans)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}
// 开放申请
export const updateNextApplyTime = id => {
  return dispatch => {
    MessageBox.confirm('开放申请, 是否继续?', '提示', {
      type: 'warning'
    }).then(async () => {
      const data = await api.updateNextApplyTimeApi({id:id})
      if (data.success) {
        dispatch(handelSearch())
        Message.success(data.msg)
      } else {
        Message.warning(data.msg)
      }
    }).catch(() => {
      Message.info('取消操作')
    })
  }
}
