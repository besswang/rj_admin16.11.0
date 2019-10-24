import React from 'react'
import Welcome from '@containers/welcome'
// 会员管理-会员列表
import Mlist from '@containers/member/mlist/index'
// 会员管理-会员详情
import Detail from '@containers/detail/index'
// 会员管理-注册未申请
import Apply from '@containers/member/apply'
// 会员管理-正常还款未借
import Normal from '@containers/member/normal'
// 报表统计-渠道统计
import Ditch from '@containers/statistics/ditch/index'
// 报表统计-渠道统计-当天/总转化/渠道费用
import Ditchinside from '@containers/statistics/ditch/ditchinside'
// 报表统计-逾期统计
import Overdue from '@containers/statistics/overdue'
// 报表统计-放款统计
import Loan from '@containers/statistics/loan'
// 报表统计-还款统计
import Repayment from '@containers/statistics/repayment'
// 报表统计-还款统计-查看
import Repayinside from '@containers/statistics/repayinside'
// 报表统计-消耗费用
import Consume from '@containers/statistics/consume'
// 报表统计-进出账
import Turnover from '@containers/statistics/turnover'
// 报表统计-数据看版
import Look from '@containers/statistics/look'
// 借款管理-待审核
import Audit from '@containers/borrow/audit/index'
// 借款管理-待审核-详情
import Auddetail from '@containers/borrow/auddetail'
// 借款管理-审核拒绝
import Auditrefuse from '@containers/borrow/auditRefuse/index'
// 催收管理-逾期列表
import Colloverdue from '@containers/collection/overdue'
import Collection from '@containers/collection/collection'
import Self from '@containers/collection/self'
// 财务管理-待放款
import WaitFang from '@containers/finance/waitFang'
import WaitHuan from '@containers/finance/waitHuan'
import AlreadyWan from '@containers/finance/alreadyWan'
import AlreadyHuan from '@containers/finance/alreadyHuan'
import Day from '@containers/finance/day'
// 黑名单管理
import BlackUser from '@containers/black/blackUser'
export const CHILD_ROUTES = [{
  id: 1,
  path: '/home',
  name: '首页',
  exact: true,
  main: () => <Welcome />
}, {
  id: 2,
  path: '/member/mlist',
  exact: true,
  main: () => <Mlist />
}, {
  id: 3,
  path: '/detail',
  exact: true,
  main: () => <Detail />
}, {
  id: 4,
  path: '/member/apply',
  exact: true,
  main: () => <Apply />
}, {
  id: 5,
  path: '/member/normal',
  exact: true,
  main: () => <Normal />
}, {
  id: 6,
  path: '/statistics/ditch',
  exact: true,
  main: () => <Ditch />
}, {
  id: 7,
  path: '/statistics/ditchinside',
  exact: true,
  main: () => <Ditchinside />
}, {
  id: 8,
  path: '/statistics/overdue',
  exact: true,
  main: () => <Overdue />
}, {
  id: 9,
  path: '/statistics/loan',
  exact: true,
  main: () => <Loan />
}, {
  id: 10,
  path: '/statistics/repayment/:tabName',
  exact: true,
  main: () => <Repayment />
}, {
  id: 11,
  path: '/statistics/repayinside/:tabName/:id',
  exact: true,
  main: () => <Repayinside />
}, {
  id: 12,
  path: '/statistics/consume',
  exact: true,
  main: () => <Consume />
}, {
  id: 13,
  path: '/statistics/turnover',
  exact: true,
  main: () => <Turnover />
}, {
  id: 14,
  path: '/statistics/look',
  exact: true,
  main: () => <Look />
}, {
  id: 15,
  path: '/borrow/audit',
  exact: true,
  main: () => <Audit />
}, {
  id: 16,
  path: '/borrow/auddetail',
  exact: true,
  main: () => <Auddetail />
},{
  id: 17,
  path: '/borrow/auditrefuse',
  exact: true,
  main: () => <Auditrefuse />
}, {
  id: 18,
  path: '/collection/overdue',
  exact: true,
  main: () => <Colloverdue />
}, {
  id: 19,
  path: '/collection/collection',
  exact: true,
  main: () => <Collection />
}, {
  id: 20,
  path: '/collection/self',
  exact: true,
  main: () => <Self />
}, {
  id: 21,
  path: '/finance/waitFang',
  exact: true,
  main: () => <WaitFang />
}, {
  id: 22,
  path: '/finance/waitHuan',
  exact: true,
  main: () => <WaitHuan />
}, {
  id: 23,
  path: '/finance/alreadyWan',
  exact: true,
  main: () => <AlreadyWan />
}, {
  id: 24,
  path: '/finance/alreadyHuan',
  exact: true,
  main: () => <AlreadyHuan />
}, {
  id: 25,
  path: '/finance/day',
  exact: true,
  main: () => <Day />
}, {
  id: 26,
  path: '/black/blackUser',
  exact: true,
  main: () => <BlackUser />
}]
