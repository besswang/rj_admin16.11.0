import api from '@api/index'
import { requestPosts, receivePosts, failurePosts, shouldFetchPosts } from '@redux/actions'
import { MessageBox, Message } from 'element-react'
// 列表
export const selectblackphone = () => {
  return async (dispatch, getState) => {
    const searchAll = shouldFetchPosts(getState())
    if (searchAll.typeId && !searchAll.typeName) {
      Message.warning('请输入搜索内容')
      return false
    }
    dispatch(requestPosts())
    const data = await api.selectblackphoneApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 删除
export const deleteBlackphone = subreddit => {
  return dispatch => {
    MessageBox.confirm('删除该用户, 是否继续?', '提示', {
      type: 'warning'
    }).then(async () => {
      dispatch(requestPosts())
      const data = await api.deleteBlackphoneApi(subreddit)
      if (data.success) {
        dispatch(selectblackphone())
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

export const download = () => {
  return dispatch => {
    const url = `${ process.env.PUBLIC_URL }/api/blackPhone/exblackPhone`
    console.log(url)
    const a = document.createElement('a')
    a.setAttribute('download', '')
    a.setAttribute('href', url)
    a.click()
  }
}

// 导入
// export const importExcel = (subreddit,input) => {
//   return async dispatch => {
//     const data = await api.importExcelApi(subreddit)
//     if (data.success) {
//       dispatch(selectblackphone())
//       input.target.value = '' // 上传之后还原
//     }
//   }
// }
