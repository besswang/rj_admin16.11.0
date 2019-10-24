import * as type from '@redux/actionTypes'
const tabObj = (state = [], action) => {
  switch (action.type) {
    case type.TAB_ADD:{
      let flag = true
      state.length > 0 && state.map((item, i) => {
        if (item.name === action.data.name) {
          flag = false
        }
        return state
      })
      return flag ? [...state, action.data] : [...state]
    }
    case type.TAB_REMOVE:{
      state.filter((item,i) => {
        if (item.name === action.name){
          state.splice(i,1)
        }
        return item
      })
      return [...state]
    }
    default:
      return [...state]
  }
}
export default tabObj
