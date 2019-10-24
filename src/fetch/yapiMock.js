import 'whatwg-fetch'
// import qs from 'qs'
//参考： https: //www.2cto.com/kf/201809/778497.html
// 处理promise和fetch的兼容性以及引入
require('es6-promise').polyfill()
// 前置拼接url,process.env.luoHost取的是config--dev.env.js--tbtHost
// const luoHost = process.env.luoHost && process.env.luoHost.url
// yapi
const luoHost = 'http://yapi.demo.qunar.com/mock/72782/admin/'
// 自定义headers
const headers = {
  // 'Accept': 'application/json',
  // 'Content-Type': 'application/x-www-form-urlencoded'
  // 'Content-Type': 'application/json'
}

// 处理get请求，传入参数对象拼接
const formatUrl = obj => {
  const params = Object.values(obj).reduce((a, b, i) => `${ a }${ Object.keys(obj)[i] }=${ b }&`, '?')
  return params.substring(0, params.length - 1)
}

/**
 * @param url    (String) 接口URL
 * @param option (Object) 参数对象，包括method(请求方式，不填默认'get')，headers(设置请求头，选填)，data(请求参数，所有请求方式均适用)
 */
const Fetch = (url, option = {}) => {
  // 设置请求超时的时间，默认10秒
  const timeout = option.timeout || 30000
  option.headers = option.headers || headers
  // option.headers['token'] = `${window.sessionStorage.getItem('token')}`
  option.method = (option.method || 'get').toLocaleLowerCase()
  // 格式化get请求的数据(fetch的get请求需要需要将参数拼接到url后面)
  if (option.method === 'get' || option.method === 'delete') {
    if (option.data) {
      url = url + formatUrl(option.data)
    }
  }

  // 对非get类请求头和请求体做处理
  if (option.method === 'post' || option.method === 'put') {
    // option.headers['Content-Type'] = option.headers['Content-Type'] || 'application/json'
    // option.body = qs.stringify(option.body)
    if (option.headers['Content-Type'] === 'application/json') {
      option.body = JSON.stringify(option.body)
    }
  }
  delete option.data
  return addTimeout(fetch(luoHost + url, option), timeout)
}
//
/**
 * 增加超时处理：fetch本身是没有请求超时处理的，所以可以通过
 * @param fetchPromise (Promise) fetch请求
 * @param timeout      (Number)  请求超时的时间
 */
function addTimeout(fetchPromise, timeout) {
  let timeoutFn = null

  // 请求超时的Promise
  var timeoutPromise = new Promise((resolve, reject) => {
    timeoutFn = function () {
      reject(new Error('请求超时，请重试'))
      // reject({
      //   code: 'timeOut',
      //   text: '请求超时，请重试'
      // })
    }
  })

  // 声明Promise.race
  const racePromise = Promise.race([
    fetchPromise,
    timeoutPromise
  ])

  setTimeout(function () {
    timeoutFn()
  }, timeout)

  // 将racePromise的结果返回
  return new Promise((resolve, reject) => {
    // let status = 0
    racePromise
      // .then(response => {
      //   status = response.status
      //   return response
      // })
      // .then(parseJSON)
      .then(response => response.json())
      .then(response => {
        // 将状态码添加到返回结果中，以备后用
        // response.status = status
        // 如果返回码在300到900之间，将以错误返回，如果需要对错误统一处理，可以放在下面判断中
        if (/^[3-9]\d{2}$/.test(response.status) || response.code === 400) {
          reject(response)
          return false
        } else {
          // 否则以正确值返回
          resolve(response)
        }
      })
      .catch(error => {
        // 请求出错则报错 Fetch Error: ***
        console.log('Fetch Error:', error)
      })
  })
}

export default Fetch