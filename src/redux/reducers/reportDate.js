import * as type from '../actionTypes'
import { Notification } from 'element-react'
import { features } from '@meta/details'
//初始化列表数据 详情-报告
const initReport ={
  userInfo:{}, // 基本信息
  lastTime:'', // 更新日期
  gaugeEchart:[], // 模型
  barLeft1: [], // 申请借款
  barLeft2: [], // 借款
  barRight:[], // 还款
  allTimes:'',// 还款笔数
  lbs: {}, // LBS画像
  devicesList:[], // 关联信息
  userFeatures:[] // 用户特征
}
const deepCopy = o => {
    let n = null
    if (o instanceof Array) {
        n = []
        for (let i = 0; i < o.length; ++i) {
            n[i] = deepCopy(o[i])
        }
        return n

    } else if (o instanceof Object) {
        n = {}
        for (const i in o) {
            n[i] = deepCopy(o[i])
        }
        return n
    } else {
        return o
    }
}
const reportDate = (state = initReport, action) => {
  switch (action.type) {
    case type.REPORT_REQUEST_POSTS:
      return {...state,
        userInfo:{},
        lastTime:'',
        gaugeEchart:[],
        barLeft1: [],
        barLeft2: [],
        barRight: [],
        allTimes:'',
        lbs:{},
        devicesList:[],
        loading: true
      }
    case type.REPORT_RECEIVE_POSTS: {
      let color = ''
      const v = parseInt(action.data.body.score_detail.score)
      const arr = action.data.body.user_features
      if(v>=0 && v<=30){
        color = '#13ce66'
      }else if(v>30 && v<=50){
        color = '#50bfff'
      }else if(v>55 && v<=80){
        color = '#50bfff'
      }else if(v>80 && v<=100){
        color = '#50bfff'
      }
      const loanDetail = action.data.body.loan_detail
      const deviceSummary = action.data.body.device_summary
      let lbsProfile = null
      if (action.data.body.request_info.LBS_profile){
        lbsProfile = action.data.body.request_info.LBS_profile
      }else{
        lbsProfile = null
      }
      const xrr = deepCopy(features)
      let yrr = []
      if(arr.length>0){
        for (const i in xrr){
          for(const j in arr){
            if (xrr[i].id === arr[j].user_feature_type){
              xrr[i].time = arr[j].last_modified_date
            }
          }
          yrr.push(xrr[i])
        }
      }else{
        yrr = features
      }
      return {...state,
        userInfo:action.data.body.id_detail,
        lastTime:action.data.body.last_modified_time,
        gaugeEchart: [{value:action.data.body.score_detail.score,name:action.data.body.score_detail.risk_evaluation,color:color}],
        barLeft1: [loanDetail.loan_platform_count, loanDetail.loan_platform_count_6m, loanDetail.loan_platform_count_3m, loanDetail.loan_platform_count_1m ],
        barLeft2: [loanDetail.actual_loan_platform_count, loanDetail.actual_loan_platform_count_6m, loanDetail.actual_loan_platform_count_3m, loanDetail.actual_loan_platform_count_1m],
        barRight: [loanDetail.repayment_platform_count, loanDetail.repayment_platform_count_6m, loanDetail.repayment_platform_count_3m, loanDetail.repayment_platform_count_1m],
        allTimes: loanDetail.repayment_times_count,
        lbs:{
          proxyIp: lbsProfile !== null ? lbsProfile.use_proxy_ip : null, //是否使用代理IP
          badArea: lbsProfile !== null ? lbsProfile.use_bad_area : null, //是否在不良区域申请
          badIp: lbsProfile !== null ? lbsProfile.use_bad_ip : null, // 是否命中不良IP
          sum: deviceSummary.ip_link_sum, //设备关联IP网段数量
          badStation: lbsProfile !== null ? lbsProfile.use_bad_base_station : null, //是否命中不良基站
          place: deviceSummary.ip_owner_place, // 常用IP归属地
          wifimac: lbsProfile !== null ? lbsProfile.use_bad_wifimac : null, // 是否命中不良wifi-mac
        },
        devicesList: action.data.body.devices_list,
        userFeatures: yrr,
        loading: false
      }
    }
    case type.REPORT_FAILURE_POSTS: {
      Notification.warning(action.data.msg)
      return {...state, userFeatures:[], loading: false}
    }
    default:
      return state
  }
}
export default reportDate
