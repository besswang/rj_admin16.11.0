export default {
  money: (rule, value, callback) => {
    const reg = new RegExp('^[0-9]+(.[0-9]{1,2})?$')
    if (value === '' || value === null) {
      callback(new Error('请输入额度'))
    } else if(!reg.test(value)){
      callback(new Error('请输入有效的额度'))
    } else {
      callback()
    }
  },
  sort: (rule, value, callback) => {
    if (value === '' || value === null) {
      callback(new Error('请输入排序'))
    } else {
      callback()
    }
  },
  serverMoney: (rule, value, callback) => {
    const reg = new RegExp('^[0-9]+(.[0-9]{1,2})?$')
    if (value === '' || value === null) {
      callback(new Error('请输入服务费'))
    } else if(!reg.test(value)){
      callback(new Error('请输入有效金额'))
    }else {
      callback()
    }
  },
  continueMoney: (rule, value, callback) => {
    if (value === '' || value === null) {
      callback(new Error('请输入延期金额'))
    } else {
      callback()
    }
  },
  dayNumber: (rule, value, callback) => {
    const r = new RegExp('^[0-9]*$')
    if (value === '' || value === null) {
      callback(new Error('请输入申请天数'))
    } else if(!r.test(value)){
      callback(new Error('请输入有效数字'))
    } else {
      callback()
    }
  },
  moneyRate: (rule, value, callback) => {
    if (value === '' || value === null) {
      callback(new Error('请输入借款年化利率'))
    } else {
      callback()
    }
  },
  overdueRate: (rule, value, callback) => {
    const reg = new RegExp('^[0-9]+(.[0-9]{1,2})?$')
    if (value === '' || value === null) {
      callback(new Error('请输入逾期利率'))
    } else if(!reg.test(value)){
      callback(new Error('请输入有效的数字'))
    } else {
      callback()
    }
  },
  numEmpty: (rule, value, callback) => {
    if (value === '' || value === null) {
      callback(new Error('金额不能为空'))
    } else {
      callback()
    }
  },
  versionId: (rule, value, callback) => {
    const r = new RegExp('^[0-9.]+$')
    if (value === '' || value === null) {
      callback(new Error('请输入版本号'))
    } else if(!r.test(value)){
      callback(new Error('版本号必须是数字和小数点组成'))
    } else {
      callback()
    }
  },
  password: (rule, value, callback) => {
    // 正则表达式匹配大写， 小写， 数字及特殊字符 ,必须符合其中三个要求
    // const r1 = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])[0-9A-Za-z!-)]{8,}$/
    // const r2 = /((?=[\x21-\x7e]+)[^A-Za-z0-9])/

    // 正则表达式匹配大写， 小写， 数字及特殊字符 ,必须符合其中三个要求
    // const s = new RegExp('^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{8,30}$')
    const r = new RegExp('^[0-9a-zA-Z!-_!@#$%^&*]+$')
    if (value === '' || value === null) {
      callback(new Error('密码不能为空'))
    } else if(!r.test(value)){
      callback(new Error('密码可以是大小写字母，数字，特殊字符'))
    } else {
      callback()
    }
  },
  userfen: (rule, value, callback) => {
    const r = new RegExp('^[0-9]*$')
    const adminInfo = JSON.parse(window.sessionStorage.getItem('adminInfo'))
    console.log(adminInfo.userScoreLimit) //人工分数限制
    if (value === '' || value === null) {
      callback(new Error('分数不能为空'))
    } else if (!r.test(value) || parseInt(value) < parseInt(adminInfo.userScoreLimit)) {
    // } else if (!r.test(value)) {
      callback(new Error(`请输入有效分数,大于或等于${ adminInfo.userScoreLimit }的正整数`))
      // callback(new Error('请输入有效分数,大于或等于0的正整数'))
    } else {
      callback()
    }
  },
  machfen: (rule, value, callback) => {
    const r = new RegExp('^[0-9]*$')
    const adminInfo = JSON.parse(window.sessionStorage.getItem('adminInfo'))
    console.log(adminInfo.machineScoreLimit) // 机器分数限制
    if (value === '' || value === null) {
      callback(new Error('分数不能为空'))
    } else if (!r.test(value) || parseInt(value) < parseInt(adminInfo.machineScoreLimit)) {
    // } else if (!r.test(value)) {
      callback(new Error(`请输入有效分数,大于或等于${ adminInfo.machineScoreLimit }的正整数`))
      // callback(new Error('请输入有效分数,大于或等于0的正整数'))
    } else {
      callback()
    }
  },
  helpfen: (rule, value, callback) => {
    const r = new RegExp('^[0-9]*$')
    if (value === '' || value === null) {
      callback(new Error('分数不能为空'))
    } else if (!r.test(value)) {
      callback(new Error('请输入有效分数'))
    } else {
      callback()
    }
  },
  ci: (rule, value, callback) => { // 次数是大于等于0的正整数
    const r = new RegExp('^[0-9]*$')
    if (value === '' || value === null) {
      callback(new Error('次数不能为空'))
    } else if (!r.test(value)) {
      callback(new Error('请输入有效次数，大于或等于0的正整数'))
    } else {
      callback()
    }
  },
  edu: (rule, value, callback) => { // 额度是大于等于0的正整数
    const r = new RegExp('^[0-9]*$')
    // const r2 = new RegExp('^(0.|[2-9][0-9]*)$') // 用3000的时候会报错
    if (value === '' || value === null) {
      callback(new Error('额度不能为空'))
    } else if (!r.test(value)) {
      callback(new Error('请输入有效额度，大于或等于0的正整数'))
    } else {
      callback()
    }
  },
  exceptZeroNum: (rule, value, callback) => { // 不包括0的天数
    const r = new RegExp('^[1-9]*$')
    if (value === '' || value === null) {
      callback(new Error('天数不能为空'))
    } else if (!r.test(value)) {
      callback(new Error('请输入有效天数'))
    } else {
      callback()
    }
  },
  dayNum: (rule, value, callback) => { // 包括0的天数
    const r = new RegExp('^[0-9]*$')
    if (value === '' || value === null) {
      callback(new Error('天数不能为空'))
    } else if(!r.test(value)){
      callback(new Error('请输入有效天数'))
    } else {
      callback()
    }
  },
  lilv: (rule, value, callback) => { // 利率
    // const reg = new RegExp('^[0-9]+(.[0-9]{1,2})?$')
    const reg = new RegExp('^[0-1]+(.[0-9]{1,4})?$') // 0-1
  // const r2 = new RegExp('^(0.|[2-9][0-9]*)$') // 用3000的时候会报错
    if (value === '' || value === null) {
      callback(new Error('请输入利率'))
    } else if (!reg.test(value) || parseInt(value) > 1 || parseFloat(value) > 1) {
      callback(new Error('请输入0-1之间有效的利率,,最多可输入四位小数'))
    } else {
      callback()
    }
  },
  feilv: (rule, value, callback) => { // 费率
    // const reg = new RegExp('^[0-9]+(.[0-9]{1,2})?$')
    const reg = new RegExp('^[0-1]+(.[0-9]{1,4})?$')
    // const r2 = new RegExp('^(0.|[2-9][0-9]*)$') // 用3000的时候会报错
    if (value === '' || value === null) {
      callback(new Error('请输入费率'))
    }else if(!reg.test(value) || parseInt(value)>1 || parseFloat(value)>1){
      callback(new Error('请输入0-1之间有效费率,最多可输入四位小数'))
    } else {
      callback()
    }
  },
  moneyType: (rule, value, callback) => {
    const reg = new RegExp('^[0-9]+(.[0-9]{1,2})?$')
    if (value === '' || value === null) {
      callback(new Error('请输入金额'))
    }else if(!reg.test(value)){
      callback(new Error('请输入有效金额'))
    } else {
      callback()
    }
  }
}