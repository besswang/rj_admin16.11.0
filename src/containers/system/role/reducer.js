import * as type from '@redux/actionTypes'
import { Notification } from 'element-react'
//初始化列表数据
const initTree = {
  loading: false,
  defaultExpandedKeys:[], // 展开的项
  defaultCheckedKeys:[], // 选中的项
  data: [],
  options: {
    children: 'children',
    label: 'text'
  }
}
const treeData = (state = initTree, action) => {
  switch (action.type) {
    case type.MENU_REQUEST_POSTS:
      return {...state, loading: true, data:[], defaultCheckedKeys:[],defaultExpandedKeys:[]}
    case type.MENU_RECEIVE_POSTS:{
      const b = action.posts.filter(item => {
        let data = null
        if (item.pid === 0){
          item['children'] = []
          data = item
        }
        return data
      })
      const keys = []
      const expandedKeys = []
      for(let i=0;i<action.posts.length;i++){
        for(let j=0;j<b.length;j++){
          if (action.posts[i].pid === b[j].zid){
            b[j].children.push(action.posts[i])
            if (action.posts[i].state1 === '1') {
              keys.push(action.posts[i].id)
            }
          }
        }
        // 单独判断欢迎页，因为是一级目录，没有children，在内部判断会取不到状态，在这里做单独判断
        if (action.posts[i].text === '欢迎页'){
          if (action.posts[i].state1 === '1') {
            keys.push(action.posts[i].id)
          }
        }
        if(action.posts[i].state === 1){
          expandedKeys.push(action.posts[i].id)
        }
      }
      // 去重
      const k = new Set(keys)
      return {
        ...state, data: b, loading: false, defaultCheckedKeys: [...k], defaultExpandedKeys: expandedKeys
      }
    }
    case type.MENU_FAILURE_POSTS:{
      Notification.warning(action.posts.msg)
      return {...state, loading: false, data: [], defaultCheckedKeys:[]}
    }
    default:
      return state
  }
}
export default treeData
