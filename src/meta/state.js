// 打款状态
export const TO_BE_AUDITED = 'AUDIT' // 待审核
export const AUDIT = 'AUDIT' // 待审核
// export const AUDIT_FAILURE = 'FALSE' // 审核失败
export const PENDING_LOAN = 'PENDING_LOAN' // 待放款/审核成功
export const LOAN_FAILURE = 'LOAN_FAILURE' // 放款失败
export const PENDING_REPAYMENT = 'PENDING_REPAYMENT' // 待还款
export const COMPLETED = 'COMPLETED' // 已完成

export const PAGE_SIZE = 10 // 一页有多少条数据
export const CURRENT_PAGE = 1 //当前页

// 认证状态
export const PENDING_AUTH = 'PENDING_AUTH' // 待认证
export const CERTITICATTON = 'CERTITICATTON' // 认证中
// 认证完成 同上 COMPLETED

// 打款状态
export const NO_MONEY_PAID = 'NO_MONEY_PAID' // 未打款
export const FIGHT_MONEY = 'FIGHT_MONEY' // 打款中
export const FALSE = 'FALSE' // ("失败"),拒绝放款
export const SUCCESS = 'SUCCESS' // ("成功")

// 支付通道
export const ANDROID = 'ANDROID' // 安卓
export const IOS = 'IOS' // 苹果

// 还款方式/打款方式
export const WX = 'WX' // ("微信"),
// export const ALI = 'ALI' // ("支付宝"),
export const ALI = 'ALIPAY' // ("支付宝"),
// export const BANK = 'BANK' // ("银行卡"),
export const BANK = 'BANK_CARD' // ("银行卡"),
// export const UTL_ALI = 'UTL_ALI' // ("线下支付宝"),
export const UTL_ALI = 'UNDER_THE_LINE_ALIPAY' // ("线下支付宝"),
// export const UTL_WX = 'UTL_WX' // ("线下微信")
export const UTL_WX = 'UNDER_THE_LINE_WX' // ("线下微信")
export const REALITY_BANK_CARD = 'REALITY_BANK_CARD' // ("线下银行卡")

// 信息认证
export const PERSONAL_INFORMATION = 'PERSONAL_INFORMATION' // 个人信息
export const ID_CARD = 'ID_CARD' // 身份认证
export const PHONE = 'PHONE' // 手机认证
// 银行卡认证 同上 BANK
export const AILIPAY = 'AILIPAY' // 芝麻授信
export const AILI = 'AILI' // 淘宝认证

// 银行支付通道
export const LIANLIAN = 'LIANLIAN' // 连连
export const FUIOU = 'FUIOU' // 富有
export const KUAIQIAN = 'KUAIQIAN' // 快线

// 风控类型
export const RUIJING = 'RUIJING' // ("瑞鲸") 米融A
export const PAIXU = 'PAIXU' // ("排序"),米融B
export const MOXIE = 'MOXIE' // 米融C
export const QS = 'QS' //米融D

// 金额类型 // 还款类型
export const PART_RPM_AMOUNT = 'PART_RPM_AMOUNT' // 部分还款
export const RPM_AMOUNT = 'RPM_AMOUNT' // 还款金额
export const SERVER_MONEY = 'SERVER_MONEY' // 服务费
export const INTEREST = 'INTEREST' // 利息
export const DELAY = 'DELAY' // 延期
export const OVERDUE = 'OVERDUE' // 逾期
export const MAKE_MONEY = 'MAKE_MONEY' // 打款
export const REDUCTION_MONEY = 'REDUCTION_MONEY' // 减免金额
export const UTL_RPM_AMOUNT = 'UTL_RPM_AMOUNT' // 线下还款金额
export const AUTOMATIC_RPM_AMOUNT = 'AUTOMATIC_RPM_AMOUNT' // 自动还款金额,逾期代扣

// 订单类型
export const NORMAL = 'NORMAL' // ("正常"),
export const DEAL = 'DEAL' // ("延期"),
// 逾期 同上 OVERDUE

// 订单状态
// 延期 同上 DELAY
export const REPAYMENT = 'REPAYMENT' // ("还款")

export const MONEY_RATE = 'MONEY_RATE' // ("货款利率"),
export const CONTINUE_RATE = 'CONTINUE_RATE' // ("续借利率"),
export const OVERDUE_RATE = 'OVERDUE_RATE' // ("逾期利率"),
export const SERVICE_RATE = 'SERVICE_RATE' // ("服务费用"),
export const UP_MONEY = 'UP_MONEY' // ("上涨金额"),
export const CAPPING_MONEY = 'CAPPING_MONEY' // ("封顶金额"),
export const ABOUT_US = 'ABOUT_US' // ("关于我们"),
export const SERVICE_PHONE = 'SERVICE_PHONE' // ("客服电话"),
export const WECHAT = 'WECHAT' // ("官方微信"),
export const MODE_TYPE = 'MODE_TYPE' // ("申请扣款方式 0 先扣  1  后扣"),
export const DELAY_SWITCH = 'DELAY_SWITCH' // ("延期开关   0开启  1关闭"),
export const BE_APART_TIME = 'BE_APART_TIME' // ("申请相隔时间(天为单位)"),
export const USER = 'USER' // ("用户协议"),
export const LOAN = 'LOAN' // ("借款协议"),
export const SERVER = 'SERVER' // ("服务协议"),
export const DELAY_AGREEMENT = 'DELAY_AGREEMENT' // ("延期协议"),
export const DELAY_MAX_DAY = 'DELAY_MAX_DAY' // ("延期最大天数"),
export const DELAY_MINI_DAY = 'DELAY_MINI_DAY' // ("延期最小天数"),
export const PAY = 'PAY' // ("支付开关"),
export const LENDER = 'LENDER' // ("出借人"),
export const LENDER_IDCARD = 'LENDER_IDCARD' //("出借人身份证号"),
export const THIRDDER = 'THIRDDER' // ("第三方担保公司名称"),
export const LOAN_DYNAMIC = 'LOAN_DYNAMIC' // ("借款协议动态模板"),
export const SERVER_DYNAMIC = 'SERVER_DYNAMIC' // ("服务协议动态模板"),
export const MIN_MONEY = 'MIN_MONEY' // ("最小借款金额"),
export const THRESHOLD_SCORE = 'THRESHOLD_SCORE' // ("米融分机器审核门槛"),
export const THRESHOLD_SCORE_USER = 'THRESHOLD_SCORE_USER' // ("米融分人工审核门槛"),
export const BANK_PAY = 'BANK_PAY' // ("银行卡支付通道开关(连连,富有,快钱)"),
export const IDCARD_PRICE = 'IDCARD_PRICE' // ("身份证认证单价"),
export const MASSAGE_PRICE = 'MASSAGE_PRICE' // ("短信单价"),
export const MANAGEMENT_PRICE = 'MANAGEMENT_PRICE' // ("风控单价"),
export const PHONE_PRICE = 'PHONE_PRICE' // ("手机认证单价"),
export const DOWNLOAD_LINK = 'DOWNLOAD_LINK' // ("推广下载连接"),
export const QQ_NUMBER = 'QQ_NUMBER' // ("企业QQ"),
export const FUYOU_PAY = 'FUYOU_PAY' // ("富有自动打款开关"),
export const AGE_INTERVAL = 'AGE_INTERVAL' // ("年龄区间")

// 优惠券状态
export const USED = 'USED' // ("已使用"),
export const ALREADY_USED = 'ALREADY_USED' // ("未使用"),
export const BE_OVERDUE = 'BE_OVERDUE' // ("已过期")