import * as state from '@meta/state'
export default {
  //实名认证结果
  verifyStatus(x){
    switch (x) {
      case '1':
        return '姓名与号码一致'
      case '2':
        return '姓名与号码不一致'
      case '3':
        return '查询无结果'
      default:
        return '空值'
    }
  },
  classify(x) {
    switch (x) {
      case '0':
        return '复印件'
      case '1':
        return 'PS证件'
      case '2':
        return '正常证件'
      case '3':
        return '屏幕翻拍'
      case '4':
        return '临时身份证'
      default:
        return '空值'
    }
  },
  authResult(x) {
    switch (x) {
      case 'T':
        return '认证通过'
      case 'F':
        return '认证未通过'
      default:
        return '空值'
    }
  },
  resultStatus(x) {
    switch (x) {
      case '01':
        return '系统判断为同一人'
      case '02':
        return '系统判断为不同人'
      case '03':
        return '不能确定是否为同一人'
      case '04':
        return '系统无法比对'
      case '05':
        return '库中无照片'
      default:
        return '空值'
    }
  },
  // 还款类型
  // moneyType(x) {
  //   switch (x) {
  //     case state.DELAY:
  //       return '延期'
  //     case state.PART_RPM_AMOUNT:
  //       return '部分还款'
  //     case state.NORMAL:
  //       return '正常'
  //     default:
  //       return '空值'
  //   }
  // },
    moneyType(x) {
      switch (x) {
        case state.RPM_AMOUNT:
          return '还款金额'
        case state.SERVER_MONEY:
          return '服务费'
        case state.INTEREST:
          return '利息'
        case state.DELAY:
          return '延期'
        case state.OVERDUE:
          return '逾期'
        case state.MAKE_MONEY:
          return '打款'
        case state.REDUCTION_MONEY:
          return '减免金额'
        case state.UTL_RPM_AMOUNT:
          return '线下还款金额'
        case state.AUTOMATIC_RPM_AMOUNT:
          return '自动还款金额'
        case state.PART_RPM_AMOUNT:
          return '线下部分还款'
        default:
          return '空值'
      }
    },
  // 支付方式：0 支付宝 1微信 2 银行卡 3 线下
  payType(x) {
    switch (x) {
      case state.WX:
        return '微信'
      case state.ALI:
        return '支付宝'
      case state.BANK:
        return '银行卡'
      case state.UTL_ALI:
        return '线下支付宝'
      case state.UTL_WX:
        return '线下微信'
      case state.REALITY_BANK_CARD:
        return '线下银行卡'
      default:
        return '空值'
    }
  },
  loanMode (x) {
    switch (x) {
      case 0:
        return '支付宝'
      case 1:
        return '微信'
      case 2:
        return '银行卡'
      case 3:
        return '线下'
      default:
        return '空值'
    }
  },
  // 打款方式
  loanModeState(x) {
    switch (x) {
      case state.ALI:
        return '支付宝'
      case state.WX:
        return '微信'
      case state.BANK:
        return '银行卡'
      case state.UTL_ALI:
        return '线下支付宝'
      case state.UTL_WX:
        return '线下微信'
      default:
        return '空值'
    }
  },
  // 订单类型 默认  0 正常 1 延期   2逾期
  loanType (x) {
    switch (x) {
      case 0:
        return '正常'
      case 1:
        return '延期'
      case 2:
        return '逾期'
      default:
        return '空值'
    }
  },
  // 订单类型 默认  0 正常 1 延期   2逾期
  loanTyp(x) {
    switch (x) {
      case state.NORMAL:
        return '正常'
      case state.DEAL:
        return '延期'
      case state.OVERDUE:
        return '逾期'
      default:
        return '空值'
    }
  },

  // 新老客户 等于0 为新客  大于0 为老客
  loanTerm(x) {
    if (parseInt(x) === 0) {
      return '新客'
    } else {
      return '老客'
    }
  },
  // 等于0为首借 大于0为复借
  loanTer(x) {
    if (parseInt(x) === 0) {
      return '首借'
    } else {
      return '复借'
    }
  },

  // 打款状态
  payStatus(x) {
    switch (x) {
      case state.NO_MONEY_PAID:
        return '未打款'
      case state.FIGHT_MONEY:
        return '打款中'
      case state.FALSE:
        return '失败'
      case state.SUCCESS:
        return '成功'
      default:
        return '空值'
    }
  },
    // 认证状态
  personalType(x) {
    switch (x) {
      case state.PENDING_AUTH:
        return '待认证'
      case state.CERTITICATTON:
        return '认证中'
      case state.COMPLETED:
        return '认证完成'
      default:
        return '空值'
    }
  },

  // 审核状态
  auditType(x) {
    switch (x) {
      case state.AUDIT:
        return '待审核'
      case state.FALSE:
        return '审核失败'
      case state.PENDING_LOAN:// 待放款
        return '审核成功'
      case state.LOAN_FAILURE:
        return '放款失败'
      case state.PENDING_REPAYMENT:
        return '待还款'
      case state.COMPLETED:
        return '已完成'
      default:
        return '空值'
    }
  },
  // 风控类型
  riskType(x) {
    switch (x) {
      case state.RUIJING:
        return '米融A'
      case state.PAIXU:
        return '米融B'
      case state.MOXIE:
        return '米融C'
      case state.QS:
        return '米融D'
      default:
        return '空值'
    }
  }
}

