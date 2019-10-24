import api from '@api/index'
import * as type from '@redux/actionTypes'
import { requestPosts, receivePosts, failurePosts, shouldFetchPosts, btnRequestPosts, btnReceivePosts, btnFailurePosts } from '@redux/actions'
import { MessageBox, Message } from 'element-react'
// 角色列表
export const pageRole = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.pageRoleApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}
// 角色添加
export const addRole = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.addRoleApi(obj)
    if (data.success) {
      dispatch(pageRole())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
// 角色-删除
export const deleteRole = subreddit => {
  return dispatch => {
    MessageBox.confirm('删除该角色, 是否继续?', '提示', {
      type: 'warning'
    }).then(async () => {
      dispatch(btnRequestPosts())
      const data = await api.deleteRoleApi(subreddit)
      if (data.success) {
        dispatch(pageRole())
        dispatch(btnReceivePosts(data.msg))
      } else {
        dispatch(btnFailurePosts(data.msg))
      }
    }).catch(() => {
      Message.info('已取消删除')
    })
  }
}
// 角色-权限
// 请求loading的开始状态
const menuRequestPosts = () => ({
  type: type.MENU_REQUEST_POSTS
})
// 请求成功后的存储方法
const menuReceivePosts = json => ({
  type: type.MENU_RECEIVE_POSTS,
  posts: json
})
// 请求失败后的方法
const menuFailurePosts = json => ({
  type: type.MENU_FAILURE_POSTS,
  posts: json
})
export const selectRolemenus = (obj, tree) => {
  return async dispatch => {
    dispatch(menuRequestPosts())
    const data = await api.selectRolemenusApi(obj)
    if (data.success) {
      dispatch(menuReceivePosts(data.data))
      tree.setCheckedKeys(tree.props.defaultCheckedKeys, false)
    } else {
      dispatch(menuFailurePosts(data))
    }
    console.log(data)
  }
}
// 角色-权限-提交
export const updateRolemenus = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.updateRolemenusApi(obj)
    if (data.success) {
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}