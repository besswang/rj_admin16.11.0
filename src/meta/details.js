const text = '用户详情'
const userInfo = '用户信息'
const applyInfo = '申请信息'
const pathname = '/detail'
export const dmlist = {
  pathname: pathname,
  state: {
    name: userInfo,
    title: '会员列表',
    url: '/member/mlist'
  },
  text: text
}
export const doverdue = {
  pathname: pathname,
  state: {
    name: applyInfo,
    title: '逾期列表',
    url: '/collection/overdue'
  },
  text:text
}
export const daudit = {
  pathname: pathname,
  state: {
    name: applyInfo,
    title: '待审核',
    url: '/borrow/audit'
  },
  text: text
}
export const dauditRefuse = {
  pathname: pathname,
  state: {
    name: applyInfo,
    title: '审核拒绝',
    url: '/borrow/auditrefuse'
  },
  text: text
}
export const dcollection = {
  pathname: pathname,
  state: {
    name: applyInfo,
    title: '催收列表',
    url: '/collection/collection'
  },
  text: text
}
export const dwaitFang = {
  pathname: pathname,
  state: {
    name: applyInfo,
    title: '待放款',
    url: '/finance/waitFang'
  },
  text: text
}
export const dwaitHuan = {
  pathname: pathname,
  state: {
    name: applyInfo,
    title: '待还款',
    url: '/finance/waitHuan'
  },
  text: text
}
export const dCurrentDay = {
  pathname: pathname,
  state: {
    name: applyInfo,
    title: '当日到期',
    url: '/finance/day'
  },
  text: text
}
export const dalreadyWan = {
  pathname: pathname,
  state: {
    name: applyInfo,
    title: '已完成',
    url: '/finance/alreadyWan'
  },
  text: text
}
export const features = [
  {
    id: '0',
    text: '多头借贷',
    tooltip: '用户有在多家互联网借款平台有过实际借款行为',
    time: '',
    color: 'tag2'
  }, {
    id: '2',
    text: '羊毛党',
    tooltip: '用户在多家互联网理财平台进行投资且投资额度较小',
    time: '',
    color: 'tag2'
  }, {
    id: '5',
    text: '作弊软件',
    tooltip: '有盾设备指纹技术识别到该用户曾经使用的某个设备中安装了作弊软件',
    time: '',
    color: 'tag2'
  }, {
    id: '6',
    text: '法院失信',
    tooltip: '命中法院失信名单',
    time: '',
    color: 'tag1'
  }, {
    id: '7',
    text: '网贷失信',
    tooltip: '命中有盾网贷失信名单',
    time: '',
    color: 'tag1'
  }, {
    id: '8',
    text: '关联过多',
    tooltip: '身份证/设备号/手机中的任意两个相互关联超过一定数量',
    time: '',
    color: 'tag2'
  }, {
    id:'10',
    text: '曾使用可疑设备',
    tooltip: '有盾设备指纹技术识别到该用户曾经使用过的某个设备修改过关键信息',
    time: '',
    color: 'tag2'
  }, {
    id:'11',
    text: '安装极多借贷app',
    tooltip: '有盾设备指纹技术识别到该用户曾经使用到的某个设备安装了极多借贷类APP',
    time: '',
    color: 'tag2'
  }, {
    id: '13',
    text: '身份信息疑似泄漏',
    tooltip: '用户信息存在被盗用的嫌疑',
    time: '',
    color: 'tag1'
  }, {
    id: '17',
    text: '活体攻击设备',
    tooltip: '该用户使用的某个设备曾有过活体攻击行为',
    time: '',
    color: 'tag1'
  }, {
    id: '18',
    text: '活体攻击行为',
    tooltip: '有盾云慧眼系统识别出该用户有过活体攻击行为',
    time: '',
    color: 'tag1'
  }, {
    id: '21',
    text: '疑似欺诈团伙',
    tooltip: '命中有盾疑似团伙欺诈名单库',
    time: '',
    color: 'tag1'
  }, {
    id: '23',
    text: '网贷不良',
    tooltip: '命中有盾网贷不良黑名单，逾期天数为30～90天',
    time: '',
    color: 'tag2'
  }, {
    id: '24',
    text: '短期逾期',
    tooltip: '命中有盾短期逾期黑名单，逾期天数为0～30天',
    time: '',
    color: 'tag3'
  }
]
