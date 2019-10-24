//存放单个的 reducer
// 使用 reducers 来根据 action 更新 state 的用法。
//reducer 就是一个纯函数， 接收旧的 state 和 action， 返回新的 state。
// 现在只需要谨记 reducer 一定要保持纯净。 只要传入参数相同， 返回计算得到的下一个 state 就一定相同。 没有特殊情况、 没有副作用， 没有 API 请求、 没有变量修改， 单纯执行计算。
import { combineReducers } from 'redux'
import router from './router'
import user from '@containers/user/reducer'
import list from './list'
import * as type from '../actionTypes'
import { PAGE_SIZE, CURRENT_PAGE } from '@meta/state'
import treeData from '@containers/system/role/reducer'
import roleList from './roleList'
import collList from './collList'
import dayList from './dayList'
import { Message } from 'element-react'
import { Notification } from 'element-react'
import lookInfo from './lookInfo'
import tabObj from './tab'
import loanRole from './loanRole'
import reportDate from './reportDate'
// 搜索方式
const typeId = (state = 0, action) => {
  switch (action.type) {
    case type.SELECT_SUBREDDIT:{
      if ( action.typeId !=='' ){
        return action.typeId
      } else {
        return 0
      }
    }
    case type.CLEAR_SEARCH_ALL:
      return 0
    default:
      return state
  }
}
const typeName = (state = '', action) => {
  switch (action.type) {
    case type.SELECT_SEARCH_TEXT:
      return action.text
    case type.CLEAR_SEARCH_ALL:
    case type.SELECT_SUBREDDIT:
      return ''
    default:
      return state
  }
}
// 新老客户
const newClient = (state = 0, action) => {
  switch (action.type) {
    case type.SELECT_CLIENT:{
      if ( action.id !== ''){
        return action.id
      } else {
        return 0
      }
    }
    case type.CLEAR_SEARCH_ALL:
      return 0
    default:
      return state
  }
}
// 审核状态-通过/拒绝
const riskManagement = (state = 0, action) => {
  switch (action.type) {
    case type.SELECT_PASS: {
      if (action.id !== '') {
        return action.id
      } else {
        return 0
      }
    }
    case type.CLEAR_SEARCH_ALL:
      return 0
    default:
      return state
  }
}
// 日期搜索方式
const selectTime = (state = 0, action) => {
  switch (action.type) {
    case type.SELECT_TIME_TYPE:{
      if (action.id !== '') {
        return action.id
      } else {
        return 0
      }
    }
    case type.CLEAR_SEARCH_ALL:
      return 0
    default:
      return state
  }
}

const time = (state = [], action) => {
  switch (action.type) {
    case type.SAVE_TIME:
      return action.time
    case type.CLEAR_SEARCH_ALL:
      return []
    default:
      return state
  }
}
const regTime = (state = [], action) => {
  switch(action.type){
    case type.REGISTER_TIME:
      return action.time
    case type.CLEAR_SEARCH_ALL:
      return []
    default:
      return state
  }
}
const payTime = (state = [], action) => {
  switch (action.type) {
    case type.END_REPAY_TIME:
      return action.time
    case type.CLEAR_SEARCH_ALL:
      return []
    default:
      return state
  }
}
// 非列表的loading状态
const btnLoading = (state = false, action) => {
  switch (action.type) {
    case type.BTN_REQUEST_POSTS:
      return true
    case type.BTN_RECEIVE_POSTS:{
      Message.success(action.data)
      return false
    }
    case type.BTN_FAILURE_POSTS:{
      Notification.error({title:'失败',message:action.data, duration:0})
      return false
    }
    default:
      return state
  }
}
const areaLoading = (state = false,action) => {
  switch(action.type){
    case type.AREA_REQUEST_POSTS:
      return true
    case type.AREA_RECEIVE_POSTS:
      return false
    case type.AREA_FAILURE_POSTS:{
      Notification.error({title:'失败',message:action.data, duration:0})
      return false
    }
    default:
      return state
  }
}
const realName = (state = '', action) => {
  switch (action.type) {
    case type.SAVE_REAL_NAME:
      return action.text
    case type.CLEAR_SEARCH_ALL:
      return ''
    default:
      return state
  }
}
const search = {
  startTime: '',
  endTime: '',
  pageNum: CURRENT_PAGE,
  pageSize: PAGE_SIZE,
  newClient: 0,
  timeType: 0,
  typeId: 0,
  typeName: '',
  realName: '',
  loanType: 0,
  neiCuiId: 0,
  isTheDay: null,
  isState: null,
  payTypeId:null,
  riskManagement:0
}
const searchAll = (state = search, action) => {
  switch (action.type) {
    case type.SELECT_LOAN_MODE:
      return { ...state, payTypeId: action.data, pageNum:1}
    case type.SELECT_ALLOT_TYPE:
      return { ...state, isTheDay: action.data, pageNum:1}
    case type.SELECT_STATE_TYPE:
      return { ...state, isState: action.data, pageNum:1}
    case type.SELECT_COLL_TYPE:
      return { ...state, neiCuiId: action.data, pageNum:1}
    case type.SELECT_LOAN_TYPE:
      return { ...state, loanType: action.data, pageNum:1}
    case type.SAVE_ADMIN_NAME:
      return {...state,adminName:action.data, pageNum:1}
    case type.ROLE_ID:
      return {...state, roleId: action.data, pageNum:1}
    case type.SELECT_CHANNEL_NAME:
      return {...state, channelName: action.data, pageNum:1}
    case type.SAVE_REAL_NAME:
      return { ...state, realName: action.text, pageNum:1}
    case type.SELECT_SUBREDDIT:{
      let id = ''
      if (action.typeId !== ''){
        id = action.typeId
      } else {
        id = 0
      }
      return {...state, typeId: id, typeName: '', pageNum:1}
    }
    case type.SELECT_CLIENT: {
      let client = ''
      if (action.id !== ''){
        client = action.id
      } else {
        client = 0
      }
      return { ...state, newClient: client, pageNum:1 }
    }
    case type.SELECT_PASS: {
      let risk = ''
      if (action.id !== ''){
        risk = action.id
      } else {
        risk = 0
      }
      return { ...state, riskManagement: risk, pageNum:1 }
    }
    case type.SELECT_TIME_TYPE: {
      let timeType = ''
      if (action.id !== ''){
        timeType = action.id
      } else {
        timeType = 0
      }
      return { ...state, timeType: timeType, pageNum:1 }
    }
    case type.SAVE_TIME: {
      let startTime = ''
      let endTime = ''
      if (action.time !== null) {
        startTime = Math.round(action.time[0])
        endTime = Math.round(action.time[1])
      }
      return { ...state, startTime, endTime, pageNum:1 }
    }
    case type.REGISTER_TIME: {
      let beginTime = ''
      let endTime = ''
      if (action.time !== null) {
        beginTime = Math.round(action.time[0])
        endTime = Math.round(action.time[1])
      }
      return { ...state, beginTime, endTime, pageNum:1 }
    }
    case type.END_REPAY_TIME: {
      let beginTime1 = ''
      let endTime1 = ''
      if (action.time !== null) {
        beginTime1 = Math.round(action.time[0])
        endTime1 = Math.round(action.time[1])
      }
      return { ...state, beginTime1, endTime1, pageNum:1 }
    }
    case type.SELECT_SEARCH_TEXT:
      return { ...state, typeName: action.text, pageNum:1 }
    case type.SIZE_CHANGE:
      return { ...state, pageSize: action.size }
    case type.CURRENT_CHANGE:
      return { ...state, pageNum: action.pageNum }
    case type.CLEAR_SEARCH_ALL:
      return { ...state, ...action.data }
    default:
      return state
  }
}
const listInfo = (state = {}, action) => {
  switch (action.type) {
    case type.SAVE_LIST_INFO:
      window.sessionStorage.setItem('detailList', JSON.stringify(action.data))
      return action.data
    default:
      return state
  }
}
const idCardInfo = (state = {}, action) => {
  switch (action.type) {
    case type.SAVE_ID_CARD_INFO:{
      if(action.data === null){
        return {}
      }else{
        return action.data
      }
    }
    default:
      return state
  }
}
const channelList = (state = [], action) => {
    switch (action.type) {
      case type.SAVE_CHANNEL_NAME:{
        if (action.data.length>0){
          const data = action.data.filter(item => {
            item['value'] = item.channelName
            return item
          })
          return data
        }else{
          return []
        }
      }

      default:
        return state
    }
}

// 渠道名称
const channelName = (state = '', action) => {
  switch (action.type) {
    case type.SELECT_CHANNEL_NAME:
      return action.data
    case type.CLEAR_SEARCH_ALL:
      return ''
    default:
      return state
  }
}
// 角色id
const roleId = (state = null, action) => {
  switch (action.type) {
    case type.ROLE_ID:{
      if(action.data !== ''){
        return action.data
      }else{
        return null
      }
    }
    case type.CLEAR_SEARCH_ALL:
      return null
    default:
      return state
  }
}
// 用户账号
const adminName = (state = '', action) => {
  switch (action.type) {
    case type.SAVE_ADMIN_NAME:
      return action.data
    case type.CLEAR_SEARCH_ALL:
      return ''
    default:
      return state
  }
}
// 借款类型 延期/逾期
const loanType = (state = 0, action) => {
  switch (action.type) {
    case type.SELECT_LOAN_TYPE:{
      let t = null
      if (action.data !== '') {
        t = action.data
      } else {
        t = 0
      }
      return t
    }
    case type.CLEAR_SEARCH_ALL:
      return 0
    default:
      return state
  }
}
// 催收人员id
const neiCuiId = (state = 0, action) => {
  switch (action.type) {
    case type.SELECT_COLL_TYPE:
      {
        let t = null
        if (action.data !== '') {
          t = action.data
        } else {
          t = 0
        }
        return t
      }
    case type.CLEAR_SEARCH_ALL:
      return 0
    default:
      return state
  }
}
// 分配状态
const isTheDay = (state = null, action) => {
  switch (action.type) {
    case type.SELECT_ALLOT_TYPE:
      if(action.data !== ''){
        return action.data
      }else{
        return null
      }
    case type.CLEAR_SEARCH_ALL:
      return null
    default:
      return state
  }
}
// 启用状态
const isState = (state = null, action) => {
  switch (action.type) {
    case type.SELECT_STATE_TYPE:
      if (action.data !== '') {
        return action.data
      } else {
        return null
      }
      case type.CLEAR_SEARCH_ALL:
        return null
      default:
        return state
  }
}
// 支付类型
const payTypeId = (state = null, action) => {
  switch (action.type) {
    case type.SELECT_LOAN_MODE:
      if(action.data !== ''){
        return action.data
      } else {
        return null
      }
    case type.CLEAR_SEARCH_ALL:
      return null
    default:
      return state
  }
}
const tabActive = (state='',action) => {
  switch(action.type){
    case type.TAB_ADD:
      return action.value
    case type.CHANGE_TAB_ACTIVE:
    console.log(action.name)
      return action.name
    default:
      return state
  }
}
export default combineReducers({
  user, typeId, typeName, searchAll, time, regTime, payTime, list, listInfo, idCardInfo, newClient, selectTime, router, btnLoading, realName, treeData, channelList, channelName, roleList, roleId, adminName, loanType, collList, dayList, neiCuiId, isTheDay, payTypeId, lookInfo, tabObj, isState, areaLoading, loanRole, reportDate, tabActive, riskManagement
})
