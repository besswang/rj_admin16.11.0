import * as type from '@redux/actionTypes'
// select-延期天数
const dayList = (state = [], action) => {
  switch (action.type) {
    case type.SAVE_DAY_LIST:
      {
        const data = action.data.filter(item => {
          // item['label'] = `${ item.channelName } - 期限${ item.dayNum } 天 - 费率${ item.delayRate }`
          item['label'] = `期限${ item.dayNum } 天 - 费率${ item.delayRate }`
          return item
        })
        return data
      }
    default:
      return state
  }
}
export default dayList