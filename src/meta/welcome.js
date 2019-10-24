import wel1 from '@images/wel1.jpg'
import wel2 from '@images/wel2.jpg'
import wel3 from '@images/wel3.jpg'
import wel4 from '@images/wel4.jpg'
export const WEL_STATISTICS = [{
    icon: 'icon iconfont icon-Time',
    color: '#20a0ff',
    text: '逾期数',
    value: 'overdueCount'
  }, {
    icon: 'icon iconfont icon-icon_shakehands',
    color: '#59cf67',
    text: '申请贷款数',
    value: 'loanCount'
  }, {
    icon: 'icon iconfont icon-icon_roundclose',
    color: '#f0533b',
    text: '审核失败数',
    value: 'auditFailureCount'
  }, {
    icon: 'icon iconfont icon-Personal',
    color: '#20a0ff',
    text: '注册app数',
    value: 'registerCount'
  }, {
    icon: 'icon iconfont icon-icon_attestation',
    color: '#f7ba2a',
    text: '认证信息数',
    value: 'authenticationCount'
  }
]
export const WEL1 = [{
    id:1,
    icon: 'icon iconfont icon-Personal',
    bg: wel1,
    text: '今日注册量',
    value: 'toDayRegister'
  }, {
    id:2,
    icon: 'icon iconfont icon-Time',
    bg: wel2,
    text: '今日放款量(今日下单用户)',
    value: 'toDayLoan'
  }, {
    id:3,
    icon: 'icon iconfont icon-Check',
    bg: wel3,
    text: '今日借款金额',
    value: 'toDayLoanMoney'
  }, {
    id:4,
    icon: 'icon iconfont icon-RectangleCopy1',
    bg: wel4,
    text: '今日实放金额',
    value: 'toDayToLoanMoney'
  }
]
export const WEL2 = [
  {
    title:'今日借款申请',
    child:[
      {
        value: 0,
        text:'借款申请人数'
      },{
        value: 0,
        text: '借款总金额'
      }
    ]
  }
]
