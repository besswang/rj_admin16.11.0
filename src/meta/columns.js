import timeDate from '@global/timeDate'
import filter from '@global/filter'
export const NORMAL_COLUMNS = [
{
  label: '#',
  width: 60,
  render: (a, b, c) => {
    return c + 1
  }
}, {
    label: '渠道名称',
    prop: 'channelName'
  }, {
    label: '真实姓名',
    prop: 'realName',
    render: row => {
      if (row.realName) {
        const reg = row.realName.slice(1)
        const s = reg.split('')
        const x = []
        for (let i = 0; i < s.length; i++) {
          x.push('*')
        }
        const z = x.join('')
        const y = row.realName.substring(1, 0)
        return y + z
      }
    }
  }, {
    label: '手机号码',
    width:140,
    prop: 'phone',
    render: row => {
      if (row.phone) {
        return row.phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')
      }
    }
  }, {
    label: '身份证号',
    width:200,
    prop: 'idcardNumber',
    render: row => {
      if (row.idcardNumber) {
        return row.idcardNumber.replace(/^(\d{3})\d{8}(\d+)/, '$1****$2')
      }
    }
  }, {
    label: '注册时间',
    width:180,
    prop: 'gmt',
    render: row => {
      const date = timeDate.time(row.gmt, 'yyyy-MM-dd hh:mm:ss')
      return date
    }
  }, {
    label: '最后还款日期',
    width: 180,
    prop: 'realRepaymentDate',
    render: row => {
      const date = timeDate.time(row.realRepaymentDate, 'yyyy-MM-dd hh:mm:ss')
      return date
    }
  }, {
    label: '借款次数',
    prop: 'loanNum'
  },
]
export const TODAY_DITCH = [
  {
    label: '#',
    width: 60,
    render: (a, b, c) => {
      return c + 1
    }
  }, {
    label: '渠道名称',
    prop: 'daiName'
  }, {
    label: '注册人数',
    prop: 'num'
  }, {
    label: '个人信息',
    prop: 'self'
  }, {
    label: '身份认证',
    prop: 'approve'
  }, {
    label: '手机认证',
    prop: 'tel'
  }, {
    label: '银行认证',
    prop: 'bank'
  }, {
    label: '申请单数',
    prop: 'applynum'
  }, {
    label: '申请率',
    prop: 'apply'
  }, {
    label: '放款人数',
    prop: 'moneynum'
  }, {
    label: '放款率',
    prop: 'money'
  }
]
export const ALL_DITCH = [
  {
    label: '#',
    width: 60,
    render: (a, b, c) => {
      return c + 1
    }
  }, {
    label: '渠道名称',
    prop: 'daiName'
  }, {
    label: '日注册量',
    prop: 'dayregister'
  }, {
    label: '日申请量',
    prop: 'apply'
  }, {
    label: '日申请率',
    prop: 'dayapplycount'
  }, {
    label: '日下单量',
    prop: 'dayorder'
  }, {
    label: '日转化率',
    prop: 'bank'
  }, {
    label: '总注册量',
    prop: 'zregister'
  }, {
    label: '总申请量',
    prop: 'zapply'
  }, {
    label: '总申请率',
    prop: 'applycount'
  }, {
    label: '总下单量',
    prop: 'zloanNum'
  }, {
    label: '总转化率',
    prop: 'zloanNumcount'
  }
]
export const COST_DITCH = [
  {
    label: '#',
    width: 60,
    render: (a, b, c) => {
      return c + 1
    }
  }, {
    label: '名称',
    prop: 'daiName'
  }, {
    label: '日注册量',
    prop: 'dayregister'
  }, {
    label: '日结算量',
    prop: 'daynum'
  }, {
    label: '累计结算量',
    prop: 'settlementAll'
  }, {
    label: '推广方式',
    prop: 'channelWay'
  }, {
    label: '结算价格',
    prop: 'settlementPrice'
  }, {
    label: '日结算金额',
    prop: 'dayPrice'
  }, {
    label: '累计结算金额',
    prop: 'addupPrice'
  }
]
export const OVERDUE = [
  {
    label: '#',
    width: 60,
    fixed: 'left',
    render: (a, b, c) => {
      return c + 1
    }
  }, {
    label: '日期',
    prop: 'date',
    fixed: 'left',
    width: 120
  }, {
    label: '应还单数',
    width:100,
    prop: 'shouldRepaidNum'
  }, {
    label: '首逾率',
    width:100,
    prop: 'oneOverdueRate'
  }, {
    label: '再逾率',
    width: 100,
    prop: 'towOverdueRate'
  }, {
    label: '逾期总单数',
    width: 110,
    prop: 'allOverdueNum'
  }, {
    label: '新客逾期单数',
    width: 130,
    prop: 'newCustomerOverdueNum'
  }, {
    label: '老客逾期单数',
    width: 130,
    prop: 'oldCustomerOverdueNum'
  }, {
    label: '逾期1-3天单数',
    width:130,
    prop: 'oneThreeNum'
  }, {
    label: '逾期1-3天回款率',
    width: 150,
    prop: 'oneThreeReturnRate'
  }, {
    label: '逾期4-7天单数',
    width: 140,
    prop: 'fourSevenNum'
  }, {
    label: '逾期4-7天已还单数',
    width: 160,
    prop: 'fourSevenReturnNum'
  }, {
    label: '逾期4-7天回款率',
    width: 150,
    prop: 'fourSevenReturnRate'
  }, {
    label: '逾期8-15天单数',
    width: 150,
    prop: 'eightFifteenNum'
  }, {
    label: '逾期8-15天已还单数',
    width: 170,
    prop: 'eightFifteenReturnNum'
  }, {
    label: '逾期8-15天回款率',
    width: 160,
    prop: 'eightFifteenReturnRate'
  }, {
    label: '逾期15+天单数',
    width: 140,
    prop: 'fifteenMoreNum'
  }, {
    label: '逾期15+天已还单数',
    width: 170,
    prop: 'fifteenMoreReturnNum'
  }, {
    label: '逾期15+天回款率',
    width: 150,
    prop: 'fifteenMoreReturnRate'
  }
]
export const CONSUME = [
  {
    label: '#',
    width: 60,
    render: (a, b, c) => {
      return c + 1
    }
  }, {
    label: '日期',
    prop: 'date',
    width:120
  }, {
    label: '总费用',
    width:120,
    prop: 'costCount'
  }, {
    label: '短信条数',
    width: 100,
    prop: 'message'
  }, {
    label: '短信金额',
    width: 100,
    prop: 'messageAmount'
  }, {
    label: '身份人数',
    width: 100,
    prop: 'idCard'
  }, {
    label: '身份金额',
    width: 100,
    prop: 'idCardAmount'
  }, {
    label: '手机人数',
    width: 100,
    prop: 'phone'
  }, {
    label: '手机金额',
    width: 100,
    prop: 'phoneAmount'
  }, {
    label: 'A风控',
    headerAlign: 'center',
    subColumns: [
      {
        label:'首借人数',
        width: 100,
        prop: 'newRiskA'
      }, {
        label: '复借人数',
        width: 100,
        prop: 'fuRiskA'
      }, {
        label: '风控金额',
        width: 100,
        prop: 'riskAmountA',
        render: row => {
          return row.riskAmountA === null ? 0 : row.riskAmountA
        }
      }
    ]
  }, {
    label: 'B风控',
    headerAlign: 'center',
    subColumns: [{
      label: '首借人数',
      width: 100,
      prop: 'newRiskB'
    }, {
      label: '复借人数',
      width: 100,
      prop: 'fuRiskB'
    }, {
      label: '风控金额',
      width: 100,
      prop: 'riskAmountB',
      render: row => {
        return row.riskAmountB === null ? 0 : row.riskAmountB
      }
    }]
  }, {
    label: 'C风控',
    headerAlign: 'center',
    subColumns: [{
      label: '首借人数',
      width: 100,
      prop: 'newRiskC'
    }, {
      label: '复借人数',
      width: 100,
      prop: 'fuRiskC'
    }, {
      label: '风控金额',
      width: 100,
      prop: 'riskAmountC',
      render: row => {
        return row.riskAmountC === null ? 0 : row.riskAmountC
      }
    }]
  }, {
    label: 'D风控',
    headerAlign: 'center',
    subColumns: [{
      label: '首借人数',
      width: 100,
      prop: 'newRiskD'
    }, {
      label: '复借人数',
      width: 100,
      prop: 'fuRiskD'
    }, {
      label: '风控金额',
      width: 100,
      prop: 'riskAmountD',
      render: row => {
        return row.riskAmountD === null ? 0 : row.riskAmountD
      }
    }]
  }, {
    label: 'ABCD风控',
    headerAlign: 'center',
    subColumns: [{
      label: '首借人数',
      width: 100,
      prop: 'newRiskABCD'
    }, {
      label: '复借人数',
      width: 100,
      prop: 'fuRiskABCD'
    }, {
      label: '风控金额',
      width: 100,
      prop: 'riskAmountABCD'
    }]
  }
]
export const TURNOVER = [
  {
    label: '#',
    width: 60,
    render: (a, b, c) => {
      return c + 1
    }
  }, {
    label: '进账日期',
    prop: 'date'
  }, {
    label: '总进账',
    prop: 'allInAmount'
  }, {
    label: '微信',
    prop: 'onlineWxInAmount'
  }, {
    label: '支付宝',
    prop: 'onlineZfbInAmount'
  }, {
    label: '银联收款',
    prop: 'onlineYlInAmount'
  }, {
    label: '线下微信',
    prop: 'wxInAmount'
  }, {
    label: '线下支付宝',
    prop: 'zfbInAmount'
  }, {
    label: '线下银联',
    prop: 'ylInAmount'
  }, {
    label: '银联出账',
    prop: 'ylOutAmount'
  }
]
export const BANK = [{
      label: '#',
      width: 60,
      render: (a, b, c) => {
        return c + 1
      }
    }, {
  label: '银行卡号',
  prop: 'bankNumber'
}, {
  label: '所属银行',
  prop: 'bank'
}, {
  label: '预留号码',
  prop: 'reservePhone'
}, {
  label: '状态',
  prop: 'bankAuthType',
  render: row => {
    const type = filter.personalType(row.bankAuthType)
    return type
  }
}, {
  label: '认证时间',
  prop: 'gmt',
  render: row => {
    const date = timeDate.time(row.gmt, 'yyyy-MM-dd hh:mm:ss')
    return date
  }
}]
export const ADDRESS = [{
      label: '#',
      width: 60,
      render: (a, b, c) => {
        return c + 1
      }
    }, {
  label: '姓名',
  prop: 'contact_name'
}, {
  label: '电话',
  prop: 'contact_phone'
}, {
  label: '通话次数',
  prop: 'conversation_number'
}]
//通话记录
export const CALL_LOG = [{
      label: '#',
      width: 60,
      render: (a, b, c) => {
        return c + 1
      }
    }, {
  label: '通讯号码',
  prop: 'peerNumber'
}, {
  label: '通讯时间',
  prop: 'time'
}, {
  label: '通讯方式',
  prop: 'locationType'
}, {
  label: '通话时长/秒',
  prop: 'duration'
}, {
  label: '通话地点',
  prop: 'location'
}]
//通话记录
export const NOTE = [{
  label: '#',
  width: 60,
  render: (a, b, c) => {
    return c + 1
  }
}, {
  label: '时间',
  prop: 'strDate'
  // render: row => {
  //   const date = timeDate.time(row.strDate, 'yyyy-MM-dd hh:mm:ss')
  //   return date
  // }
}, {
  label: '手机号',
  prop: 'strAddress'
}, {
  label: '内容',
  prop: 'strBody'
}]

//通话记录
export const DEVICES_LIST = [{
  label: '#',
  width: 60,
  render: (a, b, c) => {
    return c + 1
  }
}, {
  label: '设备名',
  prop: 'deviceName'
}, {
  label: '设备ID',
  prop: 'deviceId'
}, {
  label: '设备最后使用日期',
  prop: 'deviceLastUseDate'
}, {
  label: '设备关联用户数',
  prop: 'deviceLinkIdCount'
}, {
  label: '是否root',
  prop: 'isRooted',
  render: row => {
    if (row.isRooted) {
      return row.isRooted === '0' ? '否' : '是'
    }
  }
}, {
  label: '是否使用代理',
  prop: 'isUsingProxyPort',
  render: row => {
    if (row.isUsingProxyPort) {
      return row.isUsingProxyPort === '0' ? '否' : '是'
    }
  }
}, {
  label: '网络类型',
  prop: 'networkType'
}, {
  label: '有无活体攻击行为',
  prop: 'livingAttack',
  render: row => {
    if (row.livingAttack) {
      return row.livingAttack === '0' ? '未检测到活体攻击' : '存在活体攻击风险'
    }
  }
}]