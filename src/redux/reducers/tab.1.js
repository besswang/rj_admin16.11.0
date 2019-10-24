import * as type from '@redux/actionTypes'
const initTab = {
  tabs: [{name:'欢迎页',url:'/welcome'}],
  tabIndex: 2,
  tabActive: '欢迎页'
}
const tabObj = (state = initTab, action) => {
  switch (action.type) {
    case type.TAB_ADD:{
      // const brr = []
      let arr = initTab.tabs
      arr.push(action.data)
      const obj = {}
      arr = arr.reduce((cur, next) => {
        (obj[next.name] ? '' : obj[next.name] = true) && cur.push(next)
        return cur
      }, []) //设置cur默认类型为数组，并且初始值为空的数组
      return {...state, tabs:arr,tabActive:action.data.name}
    }
    case type.TAB_REMOVE:{
      // return state.tabs.map(item =>
      //     (item.name === action.name)
      //       ? {...item}
      //       : item
      //   )
      // const result = state.tabs.map((item,index) => {
      //   if(item.name === action.name){
      //     console.log(index)
      //     const te = item.splice(index, 1)
      //     return {item:te}
      //   }else{
      //     return
      //   }
      // })
      return state
    }
    default:
      return state
  }
}
export default tabObj