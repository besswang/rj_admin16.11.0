import * as type from '@redux/actionTypes'
const roleList = (state = [], action) => {
  switch (action.type) {
    case type.SAVE_ROLE_LIST:
      {
        const data = action.data.filter(item => {
          item['value'] = item.id
          item['label'] = item.roleName
          return item
        })
        return data
      }
    default:
      return state
  }
}
export default roleList