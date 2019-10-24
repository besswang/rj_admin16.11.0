import api from '@api/index'
import { MessageBox, Message } from 'element-react'
import { requestPosts, receivePosts, failurePosts, shouldFetchPosts} from '@redux/actions'
// btnRequestPosts, btnReceivePosts, btnFailurePosts
// 会员管理-会员列表
export const handelSearch = form => {
  return async (dispatch, getState) => {
    const searchAll = shouldFetchPosts(getState())
    if (searchAll.typeId && !searchAll.typeName) {
      Message.warning('请输入搜索内容')
      return false
    }
    dispatch(requestPosts())
    const trans = Object.assign({}, searchAll,form)
    const data = await api.selectUserBySeachApi(trans)
    if(data.success){
      dispatch(receivePosts(data.data))
    }else{
      dispatch(failurePosts(data))
      // dispatch(push('/login'))
    }
    console.log(data)
  }
}
// 添加黑名单
export const addUserBlack = subreddit => {
  return (dispatch) => {
    MessageBox.confirm('将该用户添加至黑名单, 是否继续?', '提示', {
      type: 'warning'
    }).then(async () => {
      dispatch(requestPosts())
      const data = await api.addUserBlackApi(subreddit)
      if (data.success) {
        dispatch(handelSearch())
        Message.success(data.msg)
      } else {
        dispatch(failurePosts(data))
      }
    }).catch(() => {
      Message.info('已取消操作')
    })
  }
}
// 移除黑名单
export const removeUserBlack = subreddit => {
  return (dispatch) => {
    MessageBox.confirm('将该用户从黑名单移除, 是否继续?', '提示', {
      type: 'warning'
    }).then(async () => {
      dispatch(requestPosts())
      const data = await api.removeUserBlackApi(subreddit)
      if (data.success) {
        dispatch(handelSearch())
        Message.success('移除成功')
      } else {
        dispatch(failurePosts(data))
      }
    }).catch(() => {
      Message.info('已取消操作')
    })
  }
}

const text = t => {
  if(t === 0){
    return '启用'
  } else {
    return '禁用'
  }
}
// 会员管理-禁用/启用
export const updateUserType = subreddit => {
    const t = text(subreddit.type)
    return (dispatch) => {
      MessageBox.confirm(`将该用户${ t }, 是否继续?`, '提示', {
        type: 'warning'
      }).then(async () => {
        dispatch(requestPosts())
        const data = await api.updateUserTypeApi(subreddit)
        if (data.success) {
          dispatch(handelSearch())
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
          message: `已取消${ t }`
        })
      })
    }
}

// 导出
// const formdate = (state) => {
//   const params = state.searchAll
//   const arr = []
//   for (var name in params) {
//     if (params[name]) {
//       arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(params[name]))
//     }
//   }
//   return arr.join('&')
// }
// 用户管理-会员列表-导出
export const exportUser = () => {
  // return (dispatch, getState) => {
  //   const data = formdate(getState())
  //   const url = `${ process.env.PUBLIC_URL }/api/user/exportUser?${ data }`
  //   console.log(url)
	// 	const a = document.createElement('a')
	// 	a.setAttribute('download', '')
	// 	a.setAttribute('href', url)
	// 	a.click()
  // }
  return async (dispatch, getState) => {
    // dispatch(btnRequestPosts())
    const searchAll = shouldFetchPosts(getState())
    await api.exportUserApi(searchAll)
  }
}
