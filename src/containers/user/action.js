import api from '@api/index'
import { MessageBox, Message } from 'element-react'
import { btnRequestPosts, btnReceivePosts, btnFailurePosts } from '@redux/actions'
import * as type from '@redux/actionTypes'

// 存储用户信息
export const saveUser = (form, data) => ({
  type: type.SAVE_USER,
  form: form, // 提交的表单信息
  data: data // 登陆返回的数据
})
// 清除用户信息
export const clearUser = () => ({
  type: type.CLEAR_USER
})
// 登陆(用户名-密码)
export const managelogin = (form, fn) => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.manageloginApi(form)
    if (data.success) {
      dispatch(saveUser(form, data.data))
      // fn.push('/home')
      // setTimeout(() => {
        dispatch(btnReceivePosts(data.msg))
        fn.push('/welcome')
        dispatch(selectRolemenus(data.data.adminName))
      // }, 1000)
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
// 退出(用户名-密码)
export const logout = (fn) => {
  return dispatch => {
    MessageBox.confirm('退出登陆, 是否继续?', '提示', {
      type: 'warning'
    }).then(async () => {
      const data = await api.logoutApi()
      if (data.success) {
        dispatch(clearUser())
        Message.success(data.msg)
        fn.push('/login')
        window.sessionStorage.clear()
        window.sessionStorage.removeItem('defaultRouter')
        window.sessionStorage.removeItem('routerArr')
      } else {
        Message.error(data.msg)
      }
      console.log(data)
    }).catch(() => {
      Message.info('已取消退出')
    })
  }
}
const saveDefaultRouter = data => ({
  type: type.SAVE_DEFAULT_ROUTER,
  data
})
export const selectRolemenus = name => {
  return async dispatch => {
    const data = await api.selectRolemenusApi({adminName:name})
    if (data.success) {
      dispatch(saveDefaultRouter(data.data))
    } else {
      Message.error(data.msg)
    }
  }
}