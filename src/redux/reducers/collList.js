import * as type from '@redux/actionTypes'
const collList = (state = [], action) => {
  switch (action.type) {
    case type.SAVE_COLL_LIST:
      {
        const data = action.data.filter(item => {
          item['value'] = item.id
          item['label'] = item.nickName
          return item
        })
        return data
      }
    default:
      return state
  }
}
export default collList