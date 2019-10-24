export default {
  toDecimal(x,flag) {// 除法后面加00%
    const f = parseFloat(x)
    if (isNaN(f)) {
      return false
    }
    const m = Math.round(x * 100) / 100
    var s = m.toString()
    var rs = s.indexOf('.')
    if (rs < 0) {
      rs = s.length
      s += '.'
    }
    while (s.length <= rs + 2) {
      s += '0'
    }
    if(flag === 1){
      return s
    }else{
      return s + '%'
    }
  },
  // js浮点数的加减乘除解决方案-减法 //https://www.jianshu.com/p/719379c65a31
  minus (num1, num2){
    const num1Digits = (num1.toString().split('.')[1] || '').length
    const num2Digits = (num2.toString().split('.')[1] || '').length
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits))
    return (times(num1, baseNum) - times(num2, baseNum)) / baseNum *10
  },
  // js浮点数的加减乘除解决方案-加法
  plus (num1, num2) {
    const num1Digits = (num1.toString().split('.')[1] || '').length
    const num2Digits = (num2.toString().split('.')[1] || '').length
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits))
    return (times(num1, baseNum) + times(num2, baseNum)) / baseNum
  },
  // js浮点数的加减乘除解决方案-乘法
  times (num1, num2) {
    const num1String = num1.toString()
    const num2String = num2.toString()
    const num1Digits = (num1String.split('.')[1] || '').length
    const num2Digits = (num2String.split('.')[1] || '').length
    const baseNum = Math.pow(10, num1Digits + num2Digits)
    return Number(num1String.replace('.', '')) * Number(num2String.replace('.', '')) / baseNum
  },
  // js浮点数的加减乘除解决方案-除法
  divide (num1, num2) {
    const num1String = num1.toString()
    const num2String = num2.toString()
    const num1Digits = (num1String.split('.')[1] || '').length
    const num2Digits = (num2String.split('.')[1] || '').length
    const baseNum = Math.pow(10, num1Digits + num2Digits)
    const n1 = floatRound(num1, baseNum)
    const n2 = floatRound(num2, baseNum)
    return Number(n1) / Number(n2)
  }
}
function divide(num1, num2) {
    const num1String = num1.toString()
    const num2String = num2.toString()
    const num1Digits = (num1String.split('.')[1] || '').length
    const num2Digits = (num2String.split('.')[1] || '').length
    const baseNum = Math.pow(10, num1Digits + num2Digits)
    const n1 = floatRound(num1, baseNum)
    const n2 = floatRound(num2, baseNum)
    return Number(n1) / Number(n2)
  }
// len表示保留几位数小数
function floatRound(num, len = 2) {
  const n = divide(Math.round(times(num, Math.pow(10, len))), Math.pow(10, len))
  return n.toFixed(len)
}
function times(num1, num2) {
  const num1String = num1.toString()
  const num2String = num2.toString()
  const num1Digits = (num1String.split('.')[1] || '').length
  const num2Digits = (num2String.split('.')[1] || '').length
  const baseNum = Math.pow(10, num1Digits + num2Digits)
  return Number(num1String.replace('.', '')) * Number(num2String.replace('.', '')) / baseNum
}