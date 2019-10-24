//存放分发的 action函数
// 使用 action 来描述“ 发生了什么”
import * as type from './actionTypes'
import api from '@api/index'
import { PAGE_SIZE, CURRENT_PAGE } from '@meta/state'
import timeDate from '@global/timeDate'
// 搜索渠道名称
export const selectAllChannel = () => {
  return async dispatch => {
    const data = await api.selectAllChannelApi()
    if (data.success) {
      dispatch(saveChannelName(data.data))
    }
    console.log(data)
  }
}
export const saveChannelName = data => ({
  type: type.SAVE_CHANNEL_NAME,
  data
})
export const selectChannel = data => ({
  type: type.SELECT_CHANNEL_NAME,
  data
})

export const initSearch = () => ({
  type: type.CLEAR_SEARCH_ALL,
  data:{
    beginTime: '',
    beginTime1: '',
    endTime1: '',
    startTime: '',
    endTime: '',
    pageNum: CURRENT_PAGE,
    pageSize: PAGE_SIZE,
    newClient: 0,
    timeType: 0,
    typeId: 0,
    typeName: '',
    realName: '',
    channelName:'',
    loanType: 0,
    neiCuiId: 0,
    isTheDay: null,
    isState: null,
    payTypeId: null,
    riskManagement: 0,
    roleId:null
  }
})
// menu选中状态
export const menuActive = defaultActive => ({
  type: type.MENU_ACTIVE,
  defaultActive
})
// select下搜索类型
export const selectSubreddit = typeId => ({
  type: type.SELECT_SUBREDDIT,
  typeId
})

// 搜索类型下的输入内容
export const selectSearchText = text => ({
  type: type.SELECT_SEARCH_TEXT,
  text
})
// 搜索真实姓名
export const saveRealName = text => ({
  type: type.SAVE_REAL_NAME,
  text
})
// select新老客户
export const changeClient = id => ({
  type: type.SELECT_CLIENT,
  id
})
// select审核状态-通过/拒绝
export const changePass = id => ({
  type: type.SELECT_PASS,
  id
})
// select借款类型
export const changeLoanType = data => ({
  type: type.SELECT_LOAN_TYPE,
  data
})
// select 日期搜索方式
export const changeTimeType = id => ({
  type: type.SELECT_TIME_TYPE,
  id
})

// 日期范围 startTime-endTime
export const saveTime = time => ({
  type: type.SAVE_TIME,
  time
})
// 日期范围 beginTime-endTime
export const registerTime = time => ({
  type: type.REGISTER_TIME,
  time
})
// 分页-每页条数
export const sizeChange = size => ({
  type: type.SIZE_CHANGE,
  size
})

// 分页-当前页
export const currentChange = pageNum => ({
  type: type.CURRENT_CHANGE,
  pageNum
})

// 请求loading的开始状态
export const requestPosts = () => ({
  type: type.REQUEST_POSTS
})
// 请求成功后的存储方法
export const receivePosts = json => ({
  type: type.RECEIVE_POSTS,
  posts: json
})
// 请求失败后的方法
export const failurePosts = json => ({
  type: type.FAILURE_POSTS,
  posts: json
})
// 按钮请求loading的开始状态
export const btnRequestPosts = () => ({
  type: type.BTN_REQUEST_POSTS
})
// 按钮的请求成功
export const btnReceivePosts = data => ({
  type: type.BTN_RECEIVE_POSTS,
  data
})
// 按钮的请求失败
export const btnFailurePosts = data => ({
  type: type.BTN_FAILURE_POSTS,
  data
})

// 区域loading状态
export const areaRequestPosts = () => ({
  type: type.AREA_REQUEST_POSTS
})
// 区域loading请求成功
export const areaReceivePosts = () => ({
  type: type.AREA_RECEIVE_POSTS
})
// 区域loading请求失败
export const areaFailurePosts = data => ({
  type: type.AREA_FAILURE_POSTS,
  data
})

// 不过滤搜索
export const shouldFetch = (state) => {
  const params = state.searchAll
  return params
}
// 搜索去空带时间戳的过滤
export const shouldFetchPosts = (state) => {
  const params = state.searchAll
  const pam = {}
  for (const i in params) {
    if (params[i]) {
      pam[i] = params[i]
      if (i === 'startTime') {
        pam[i] = timeDate.time(params[i], 'yyyy-MM-dd hh:mm:ss')
      }
      if (i === 'endTime') {
        pam[i] = timeDate.time(params[i], 'yyyy-MM-dd hh:mm:ss')
      }
    }
    if (params['isTheDay'] === 0) {
      pam['isTheDay'] = params['isTheDay']
    }
    if (params['payTypeId'] === 0) {
      pam['payTypeId'] = params['payTypeId']
    }
    if (params['isState'] || params['isState'] === 0) {
      pam['state'] = params['isState']
      delete pam['isState']
    }
  }
  return pam
}

// 搜索去空带时间格式yyyy-MM-dd hh:mm:ss的过滤
export const shouldFetchPostsDate = (state) => {
  const params = state.searchAll
  const pam = {}
  for (const i in params) {
    if (params[i]) {
      pam[i] = params[i]
      if (i === 'startTime') {
        pam[i] = timeDate.time(params[i], 'yyyy-MM-dd hh:mm:ss')
      }
      if (i === 'endTime') {
        pam[i] = timeDate.time(params[i], 'yyyy-MM-dd hh:mm:ss')
      }
    }
  }
  return pam
}

// 用户详情
export const saveList = data => ({
  type: type.SAVE_LIST_INFO,
  data
})
// 身份证信息
export const saveIdCardInfo = data => ({
  type: type.SAVE_ID_CARD_INFO,
  data
})

export const changeRole = data => ({
  type: type.ROLE_ID,
  data
})

export const changeAdminName = data => ({
  type:type.SAVE_ADMIN_NAME,
  data
})
// 存储角色列表
const saveRoleList = data => ({
  type: type.SAVE_ROLE_LIST,
  data
})
// 获取角色select
export const allRoles = coll => {
  return async dispatch => {
    const data = await api.allRolesApi()
    if (data.success) {
      if(coll){
        const obj = data.data.filter(item => item.roleName === 'nei催')
        if (obj[0]) {
          dispatch(selectAllAdmin(obj[0].id))
        }
      }else{
        dispatch(saveRoleList(data.data))
      }
    }
  }
}
// 存储催收员
const saveCollList = data => ({
  type: type.SAVE_COLL_LIST,
  data
})
// select催收员
export const changeColl = data => ({
  type: type.SELECT_COLL_TYPE,
  data
})
// 根据角色id查询多个用户
export const selectAllAdmin = id => {
  return async dispatch => {
    const data = await api.selectAllAdminApi({roleId:id})
    if (data.success) {
      dispatch(saveCollList(data.data))
    }
  }
}
export const selectAdminByCui = () => {
  return async dispatch => {
    const data = await api.selectAdminByCuiApi()
    if (data.success) {
      dispatch(saveCollList(data.data))
    }
  }
}

export const changeAllot = data => ({
  type: type.SELECT_ALLOT_TYPE,
  data
})
export const changeState = data => ({
  type: type.SELECT_STATE_TYPE,
  data
})
export const changePayTypeId = data => ({
  type: type.SELECT_LOAN_MODE,
  data
})
export const tabAdd = data => ({
  type: type.TAB_ADD,
  value:data.name,
  data
})
export const tabRemove = name => ({
  type: type.TAB_REMOVE,
  name
})
export const changeTabActive = name => ({
  type: type.CHANGE_TAB_ACTIVE,
  name
})
