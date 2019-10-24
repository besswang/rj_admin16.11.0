import * as type from '@redux/actionTypes'
// const initTab = {
//   tabs: [{name:'欢迎页',url:'/welcome'}],
//   tabIndex: 2,
//   tabActive: '欢迎页'
// }
const tabObj = (state = [], action) => {
  switch (action.type) {
    case type.TAB_ADD:{
      // console.log(action.data)
      if(state.length>0){
        const ele = state.map(item =>
          (item.name !== action.data.name)
            ? action.data
            : {}
        )
        return [...state, ele]
      }else{
        return [...state, action.data]
      }
      // return [...state,action.data]
    }
    case type.TAB_REMOVE:{
      state.splice(action.index, 1)
      return [...state]
    }
    default:
      return state
  }
}
export default tabObj