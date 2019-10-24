export const SIDE_BAR_TEXT = [
  {
    subIndex: '1',
    title: '会员管理',
    menuItem: [
      {
        itemIndex: '1-1',
        path: '/member/mlist',
        title: '会员列表'
      }, {
        itemIndex: '1-2',
        path: '/member/apply',
        title: '注册未申请'
      }, {
        itemIndex: '1-3',
        path:'/member/normal',
        title: '正常还款未借'
      },
      // {
      //   itemIndex: '1-4',
      //   title: '全部会员'
      // }
    ]
  }, {
    subIndex: '2',
    title: '报表统计',
    menuItem: [
      {
        itemIndex: '2-1',
        path:'/statistics/ditch',
        title: '渠道统计'
      }, {
        itemIndex: '2-2',
        path: '/statistics/overdue',
        title: '逾期统计'
      }, {
        itemIndex: '2-3',
        path: '/statistics/loan',
        title: '放款统计'
      }, {
        itemIndex: '2-4',
        path: '/statistics/repayment/1',
        title: '还款统计'
      }, {
        itemIndex: '2-5',
        path: '/statistics/consume',
        title: '消耗费用'
      }, {
        itemIndex: '2-6',
        path: '/statistics/turnover',
        title: '进出账'
      }, {
        itemIndex: '2-7',
        path: '/statistics/look',
        title: '数据看版'
      }
    ]
  }, {
    subIndex: '3',
    title: '借款管理',
    menuItem: [
      {
      itemIndex: '3-1',
      path: '/borrow/audit',
      title: '待审核'
    }, {
      itemIndex: '3-2',
      path: '/borrow/auditrefuse',
      title: '审核拒绝'
    }
  ]
  }, {
    subIndex: '4',
    title: '催收管理',
    menuItem: [
    {
      itemIndex: '4-1',
      path: '/collection/overdue',
      title: '逾期列表'
    }, {
      itemIndex: '4-2',
      path: '/collection/collection',
      title: '催收列表'
    }, {
      itemIndex: '4-3',
      path: '/collection/self',
      title: '个人对账'
    }
  ]
  }, {
    subIndex: '5',
    title: '财务管理',
    menuItem: [
      {
      itemIndex: '5-1',
      path: '/finance/waitFang',
      title: '待放款'
    }, {
      itemIndex: '5-2',
      path: '/finance/waitHuan',
      title: '待还款'
    }, {
      itemIndex: '5-3',
      path: '/finance/alreadyWan',
      title: '已完成'
    }, {
      itemIndex: '5-4',
      path: '/finance/alreadyHuan',
      title: '已还款'
    }, {
      itemIndex: '5-5',
      path: '/finance/day',
      title: '当日到期'
    }
  ]
  }, {
    subIndex: '6',
    title: '黑名单管理',
    menuItem: [
    {
      itemIndex: '6-1',
      path: '/black/blackUser',
      title: '黑名单用户'
    }
  ]
  }, {
    subIndex: '7',
    title: '认证管理',
    menuItem: [{
      itemIndex: '7-1',
      title: '联系人认证'
    }, {
      itemIndex: '7-2',
      title: '手机认证'
    }, {
      itemIndex: '7-3',
      title: '银行卡认证'
    }, {
      itemIndex: '7-4',
      title: '身份证认证'
    }, {
      itemIndex: '7-5',
      title: '支付宝认证'
    }, {
      itemIndex: '7-6',
      title: '认证参数'
    }]
  }, {
    subIndex: '8',
    title: '系统管理',
    menuItem: [{
      itemIndex: '8-1',
      title: '期限管理'
    }, {
      itemIndex: '8-2',
      title: '用户管理'
    }, {
      itemIndex: '8-3',
      title: '角色'
    }, {
      itemIndex: '8-4',
      title: '区域管理'
    }, {
      itemIndex: '8-5',
      title: '数据备份'
    }, {
      itemIndex: '8-6',
      title: '借款额度管理'
    }, {
      itemIndex: '8-7',
      title: '帮助中心'
    }, {
      itemIndex: '8-8',
      title: '文本设置'
    }, {
      itemIndex: '8-9',
      title: '轮播图管理'
    }, {
      itemIndex: '8-10',
      title: '系统参数设置'
    }, {
      itemIndex: '8-11',
      title: '提额管理'
    }, {
      itemIndex: '8-12',
      title: '优惠券列表'
    }, {
      itemIndex: '8-13',
      title: '优惠券管理'
    }, {
      itemIndex: '8-14',
      title: '系统消息'
    }, {
      itemIndex: '8-15',
      title: '意见反馈'
    }, {
      itemIndex: '8-16',
      title: '版本管理'
    }]
  }, {
    subIndex: '9',
    title: '推广管理',
    menuItem: [{
      itemIndex: '9-1',
      title: '渠道管理'
    }, {
      itemIndex: '9-2',
      title: '推广统计'
    }, {
      itemIndex: '9-3',
      title: '渠道会员'
    }]
  }
]