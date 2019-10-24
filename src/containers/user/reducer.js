//存放单个的 reducer
// 使用 reducers 来根据 action 更新 state 的用法。
//reducer 就是一个纯函数， 接收旧的 state 和 action， 返回新的 state。
// 现在只需要谨记 reducer 一定要保持纯净。 只要传入参数相同， 返回计算得到的下一个 state 就一定相同。 没有特殊情况、 没有副作用， 没有 API 请求、 没有变量修改， 单纯执行计算。

//初始化验证码
// state初始值
import * as type from '@redux/actionTypes'
const initUser = {
  redirectTo: '', // 完成之后跳到哪里
  adminName: '', // 账号
  password: '', // 密码
  type: '', // 用户类型
  msg: '', // 错误消息
  id:null,
  isLogin: false // 是否登录
}
const user = (state = initUser, action) => {
  switch (action.type) {
    case type.SAVE_USER:
      // return { ...state, isLogin: true, data: action.data, adminName: action.form.adminName, password: action.form.password }
      window.sessionStorage.setItem('adminInfo', JSON.stringify(action.data))
      return { ...state, isLogin: true, adminName: action.data.adminName, id:action.data.id}
    case type.CLEAR_USER:
      window.sessionStorage.removeItem('adminInfo')
      return { ...state, isLogin: false }
    default:
      return state
  }
}

export default user