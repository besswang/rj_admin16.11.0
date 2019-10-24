export default {
  'managelogin': 'login/managelogin', // 用户登陆
  'verifycode': 'login/verifycode', // 获取验证码
  'logout': 'logout', // 登出
  'selectAdminLoginByName': 'admin/selectAdminLoginByName', //根据用户名查询登录方式
  'channellogin': 'login/channellogin', // 渠道登陆
  // 欢迎页
  'selectQu': 'chart/selectQus', // 渠道统计-饼图
  'selectLoanRepayment': 'chart/selectLoanRepayment', // 放/还款统计-折线
  'selectTotalLogByTime': 'order/selectTotalLogByTime', // 查询
  // 会员管理
  'selectUserBySeach': 'user/selectUserBySeach', // 会员列表
  'selectIdCardByUserId': 'idCard/selectIdCardByUserId', // 会员详情-身份证信息
  'selectPhoneDateByUserId': 'phone/selectPhoneDateByUserId', //会员详情-手机认证
  'selectMobileReport': 'phone/selectMobileReport', // 查看手机报表
  'selectEmergencyByUserId': 'emergency/selectEmergencyByUserId', // 会员详情-紧急联系人
  'selectBankByUserId': 'bank/selectBankByUserId', // 会员详情-银行卡信息
  'selectReportMail': 'phone/selectReportMail', // 会员详情-通讯录
  'selectUserSms': 'phone/selectUserSms', // 会员详情-短信详情
  'selectPresentationByUserId': 'idCard/selectPresentationByUserId', // 报告
  'selectLoginDate': 'loginDate/selectLoginDate', // 手机设备
  'selectReport': 'phone/selectReport', // 通话记录
  'updateUserType': 'user/updateUserType', // 修改用户禁用状态
  'addUserBlack': 'user/addUserBlack', // 添加黑名单
  'removeUserBlack': 'user/removeUserBlack', // 移除黑名单
  'selectUserNotApply': 'user/selectUserNotApply', // 注册未申请
  'selectUserNoLoan': 'user/selectUserNoLoan', // 正常还款未借
  // 报表统计
  'pageChannelCount': 'reportForm/pageChannelCount', // 渠道统计
  'pageChannelTheDayCount': 'reportForm/pageChannelTheDayCount', // 渠道统计-当天
  'pageChannelTotalCount': 'reportForm/pageChannelTotalCount', // 渠道统计-总转化
  'pageChannelCost': 'reportForm/pageChannelCost', // 渠道统计-渠道费用
  'pageOverdueCount': 'reportForm/pageOverdueCount', // 逾期统计
  'pageLoanCount': 'reportForm/pageLoanCount', // 放款统计
  'pageRepaymentCount': 'reportForm/pageRepaymentCount', // 还款统计
  'pageRepaymentCountByDay': 'reportForm/pageRepaymentCountByDay', // 还款统计-当天
  'pageCostCount': 'reportForm/pageCostCount', // 消耗费用
  'pageInoutCount': 'reportForm/pageInoutCount', // 进出账
  'selectDataCheckCount': 'reportForm/selectDataCheckCount', // 数据看版
   // 借款管理-待审核
  'selectOrderByParam': 'order/selectOrderByParam', // 待审核/审核拒绝列表
  'updataState': 'order/updataState', // 操作-通过/拒绝
  'updateNextApplyTime': 'order/updateNextApplyTime', // 审核拒绝-开放申请
  // 催收管理-逾期列表
  'selectCollectionByParam': 'order/selectCollectionByParam', // 催收列表
  'updateOrderCuishou': 'order/updateOrderCuishou', // 分配催收人员
  'selectOverdueByParam': 'order/selectOverdueByParam', // 逾期列表
  'selectthePersion': 'order/selectthePersion', // 个人对账
  // 财务管理
  'selectPendingLoan': 'order/selectPendingLoan', // 待放款
  'updateStateLoan': 'order/updateStateLoan', // 拒绝放款
  'toLoanBank': 'order/toLoanBank', // 待放款-放款-银行卡
  'toLoan': 'order/toLoan', // 待放款-放款-线下放款
  'selectPendingRepay': 'order/selectPendingRepay', // 待还款
  'updateStateComplete': 'order/updateStateComplete', // 待还款-还款-全款
  'findRepaymentMoney': 'order/findRepaymentMoney', // 剩余应还金额
  'updateStateDelay': 'order/updateStateDelay', // 待还款-还款-延期
  'findAllDelayRate': 'quotaDelay/findAllDelayRate',
  'updateStateReduction': 'order/updateStateReduction', // 待还款-还款-减免
  'selectOrderCompleted': 'order/selectOrderCompleted', // 已完成
  'selectBill': 'bill/selectBill', // 已还款
  'selectTheDayLoan': 'order/selectTheDayLoan', // 当日到期
  'insertRemarks': 'remarks/insertRemarks', // 备注
  'distributionsCuiShou': 'order/distributionsCuiShou', // 分配
  // 黑名单管理
  'selectblackphone': 'blackPhone/selectblackphone', // 黑名单用户
  'deleteBlackphone': 'blackPhone/deleteBlackphone', // 删除黑名单
  'importExcel': 'blackPhone/importExcel', // 导入黑明单
  // 认证管理
  'selectEmergency': 'emergency/selectEmergency', // 联系人认证
  'deleteEmergency': 'emergency/deleteEmergency', // 联系人认证删除
  'selectPhoneDate': 'phone/selectPhoneDate', // 手机认证
  'deletePhoneDate': 'phone/deletePhoneDate', // 手机认证删除
  'selectBank': 'bank/selectBank', // 银行卡认证
  'deleteBankByUserId': 'bank/deleteBankByUserId', // 银行卡认证-删除
  'selectIdCard': 'idCard/selectIdCard', // 身份证认证
  'deleteIdCard': 'idCard/deleteIdCard', // 身份证认证-删除
  'selectAuthentication': 'authentication/selectAuthentication', // 认证参数
  'updateStatus': 'authentication/updateStatus', // 认证参数-是否显示
  'updateLoanType': 'authentication/updateLoanType', // 借款是否必须认证
  'updateSort': 'authentication/updateSort', // 排序
  // 系统管理-用户管理
  'pageAdmin': 'admin/pageAdmin', // 列表
  'addAdmin': 'admin/addAdmin', // 添加用户
  'updateAdmin': 'admin/updateAdmin', // 编辑用户
  // 系统管理-角色管理
  'pageRole': 'role/pageRole', // 列表
  'deleteRole': 'role/deleteRole', // 删除
  'addRole': 'role/addRole', // 添加
  'selectRolemenus': 'rolemenu/selectRolemenus', // 权限设置-menu
  'updateRolemenus': 'rolemenu/updateRolemenus', //权限设置-提交
  // 系统管理-区域管理
  // 'selectAreas': 'area/selectAreas', // 列表
  'selectAreasById': 'area/selectAreasById', // 根据ID查询子区域
  'updateAreaState': 'area/updateAreaState', // 启用/禁用
  'selectUnAllowableArea': 'area/selectUnAllowableArea', // 所有禁用区域
  // 系统管理-数据备份
  'pageBackup': 'sqlCopy/pageBackup',
  'backup': 'sqlCopy/backup', // 备份
  // 系统管理-借款额度管理
  'pageQuota': 'quota/pageQuota', //列表
  'addQuota': 'quota/addQuota', // 添加
  'deleteQuota': 'quota/deleteQuota', // 删除
  'updateQuota': 'quota/updateQuota', // 修改
  // 系统管理-帮助中心
  'pageGlobalconfig': 'globalConfig/pageGlobalconfig', //列表
  'updateGlobalConfig': 'globalConfig/updateGlobalConfig', // 编辑
  // 系统管理-提额规则设置
  'findAllLiftingAmount': 'findAllLiftingAmount',
  'findMinAndCappingMoney': 'globalConfig/findMinAndCappingMoney',
  'addLiftingAmount': 'addLiftingAmount',
  'updateLiftingAmount': 'updateLiftingAmount',
  'updateMinAndCappingMoney': 'globalConfig/updateMinAndCappingMoney',
  // 系统管理-系统充值
  'addRecharge': 'addRecharge', // 充值
  'pageRecharge': 'pageRecharge', // 列表
  // 系统管理-系统配置
  'selectOtherConfig': 'globalConfig/selectOtherConfig',
  'updateGlobalConfigss': 'globalConfig/updateGlobalConfigss', // 修改
  // 系统管理-文本设置
  'selectTextConfig': 'globalConfig/selectTextConfig', // 文本设置-列表
  // 系统高级设置
  'selectSeniorConfig': 'globalConfig/selectSeniorConfig',
  'updateGlobalConfigs': 'globalConfig/updateGlobalConfigs', // 修改
  // 轮播图管理
  'pageRotationChart': 'rotationChart/pageRotationChart', // 列表
  'deleteRotationChart': 'rotationChart/deleteRotationChart', // 删除
  'updateRotationChart': 'rotationChart/updateRotationChart', // 上/下架
  // 提额管理
  'pageuserQuota': 'userQuota/pageuserQuota', // 列表
  'adduserquota': 'userQuota/adduserquota', // 添加
  'updateuserquota': 'userQuota/updateuserquota', // 编辑
  'deleteuserquota': 'userQuota/deleteuserquota', // 删除
  // 版本管理
  'pageAppversion': 'appversion/pageAppversion', // 列表
  'addAppversion': 'appversion/addAppversion', // 添加
  'updateAppversion': 'appversion/updateAppversion', // 编辑
  // 推广管理
  'selectChannel': 'channel/selectChannel', // 渠道管理
  'insertChannel': 'channel/insertChannel', // 渠道管理-添加
  'updateChannel': 'channel/updateChannel', // 渠道管理-编辑
  'selectRoleD': 'role/selectRoleD', // 渠道管理-操作-绑定
  'updateChannelById': 'updateChannelById', //渠道管理-操作-绑定-保存
  'prohibitChannel': 'channel/prohibitChannel', // 渠道管理-禁用
  'findDelayRate': 'quotaDelay/findDelayRate', // 渠道管理-展期模式-列表 // // 待还款-还款-延期-延期天数
  'bindingRate': 'channel/bindingRate', // 渠道管理-展期模式-添加
  'deleteDelayRate': 'quotaDelay/deleteDelayRate', // 渠道管理-展期模式-删除
  'updateDelayState': 'quotaDelay/updateDelayState', // 渠道管理-展期模式-启用/禁用
  'selectPromotionStatistics': 'order/selectPromotionStatistics', // 推广统计
  'selectChannelMember': 'user/selectChannelMember', // 渠道会员
  // select-渠道名称搜索
  'selectAllChannel': 'channel/selectAllChannel',
  'allRoles': 'role/allRoles',
  'selectAllAdmin': 'admin/selectAllAdmin', // 根据角色id查询多个用户
  // footer
  'selectGlobalValue': 'selectGlobalValue',
  'insertRotationChart': 'rotationChart/insertRotationChart', // 增加banner图
  'exportUser': 'user/exportUser', // 用户管理-会员列表-导出
  'exportUserNotApply': 'user/exportUserNotApply', // 用户管理-注册未申请-导出
  'exportUserNoLoan': 'user/exportUserNoLoan', //用户管理-正常还款未借-导出
  'exportTheDayLoan': 'order/exportTheDayLoan', // 还款计划-当日到期-导出
  'exportOverdue': 'order/exportOverdue', // 催收管理-逾期列表-导出
  'selectChannelByName': 'selectChannelByName', // 根据渠道名查渠道
  'selectTotal': 'user/selectTotal',
  'deductionFee': 'order/deductionFee', // 还款计划-待还款-代扣
  'exportCollection': 'order/exportCollection', //催收管理-催收列表-导出
  'exportThePersion': 'order/exportThePersion', //催收管理-个人对帐-导出
  'exportPendingRepay': 'order/exportPendingRepay', // 还款计划-待还款-导出
  'exportOrderCompleted': 'order/exportOrderCompleted', // 还款计划-已完成-导出
  'selectAdminByCui': 'admin/selectAdminByCui', //角色id是3和4的催收员列表
  'selectHomePageDate': 'reportForm/selectHomePageDate',
  'selectHomePage': 'reportForm/selectHomePage',
  'selectFaceAuthResult': 'idCard/selectFaceAuthResult', //根据userId查询身份证人脸识别结果
  'selectFaceAuthResultOther': 'idCard/selectFaceAuthResultOther', //根据userId查询身份证人脸识别结果其他信息
  'selectUserInformationById': 'user/selectUserInformationById', //根据id查询会员风控返回信息
  'exportPendingLoan': 'order/exportPendingLoan' // 待放款列表导出
}