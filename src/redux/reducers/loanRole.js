import * as type from '@redux/actionTypes'
// select-贷超角色
const loanRole = (state = [], action) => {
  switch (action.type) {
    case type.SAVE_LOAN_ROLE:
      {
        const data = action.data.filter(item => {
          item['label'] = item.adminName
          item['value'] = item.id
          return item
        })
        return data
      }
    default:
      return state
  }
}
export default loanRole