import api from '@api/index'
import { MessageBox, Message } from 'element-react'
import { requestPosts, receivePosts, failurePosts, shouldFetchPosts } from '@redux/actions'
import { TO_BE_AUDITED, PENDING_LOAN } from '@meta/state'
// 会员管理-会员列表
export const handelSearch = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const trans = Object.assign({}, searchAll, {state: TO_BE_AUDITED})
    const data = await api.selectOrderByParamApi(trans)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
      // dispatch(push('/login'))
    }
    console.log(data.data)
  }
}

// 操作-通过/拒绝
const text = t => {
  if (t === PENDING_LOAN) {
    return '通过'
  } else {
    return '拒绝'
  }
}
export const handelAudit = subreddit => {
  const t = text(subreddit.state)
  return dispatch => {
    MessageBox.confirm(`审核${ t }该用户, 是否继续?`, '提示', {
      type: 'warning'
    }).then(async () => {
      dispatch(requestPosts())
      const data = await api.updataStateApi(subreddit)
      if (data.success) {
        dispatch(handelSearch())
        Message.success(data.msg)
      } else {
        dispatch(failurePosts(data))
      }
    }).catch(() => {
      Message.info(`已取消${ t }`)
    })
  }
}
