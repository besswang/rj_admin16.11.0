import * as type from '../actionTypes'
import { CHILD_ROUTES } from '../../routes/childRoutes'

const recursion = (arr, result = []) => {
  arr.map((item) => {
    if (item.children && item.children.length && !item.hideChildren) {
      result.push(item)
      return recursion(item.children, result)
    } else {
      if (item.children && item.children.length && item.hideChildren) {
        result.push(item)
        return recursion(item.children, result)
      } else {
        return result.push(item)

      }
    }
  })
  return result
}
const distributeRouter = () => {
  const defaultRouter = []
  recursion(CHILD_ROUTES).map(item => {
    return defaultRouter.push(item)
  })
  return defaultRouter
}
const singleRouterFn = () => {
  const singleRouter = []
  recursion(CHILD_ROUTES).map(item => {
    if(item.single){
      return singleRouter.push(item)
    }
    return singleRouter
  })
  return singleRouter
}
const defaultRouterSession = () => {
  if (window.sessionStorage.getItem('defaultRouter')) {
    const r = JSON.parse(window.sessionStorage.getItem('defaultRouter'))
    const l = distributeRouter()
    for (const i in r) {
      for (const j in l) {
        if(r[i].name === l[j].name){
          r[i].component = l[j].component
        }
      }
    }
    // console.log('defaultRouterSession有缓存')
    return r
  }else{
    // console.log('defaultRouterSession为【】')
    return []
  }
}
const routerArr = window.sessionStorage.getItem('routerArr') ? JSON.parse(window.sessionStorage.getItem('routerArr')) : []
const router = (state = {
    routerArr,
    defaultActive: '',
    routerName: [],
    defaultRouter: defaultRouterSession(),
    singleRouter: singleRouterFn()
  }, action) => {
    switch (action.type) {
      case type.SAVE_DEFAULT_ROUTER:{
        const l = distributeRouter()
        const arr = []
        const d = action.data
        function fl(x) {
          for(const i in l){
            if (x.text === l[i].name) {
              x['name'] = x.text
              x['path'] = l[i].path
              x['exact'] = true
              x['component'] = l[i].component
              if (x.state1 === null){
                x['hideInMenu'] = true
                l[i]['hideInMenu'] = true
              }else{
                x['hideInMenu'] = false
                l[i]['hideInMenu'] = false
              }
              arr.push(x)
            }
          }
        }
        // 过滤内页的单独页面(详情页，当天/总转化/渠道费用)
        const ssss = l.filter(item => item.childSingle)
        arr.push(...ssss)
        console.log(arr)
        for (const i in d) {
          fl(d[i])
        }
        // console.log(action.data)
        // console.log(arr)
        const brr = arr.filter(item => {
          let da = null
          if (item.pid === 0) {
            item['children'] = []
            da = item
          }
          return da
        })
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < brr.length; j++) {
            if (arr[i].pid === brr[j].zid) {
              brr[j].children.push(arr[i])
            }
          }
        }
        if (window.sessionStorage.getItem('defaultRouter')) {
          // console.log('取缓存数据')
          return {...state}
        }else{
          // console.log('为空')
          window.sessionStorage.setItem('defaultRouter', JSON.stringify(arr))
          window.sessionStorage.setItem('routerArr', JSON.stringify(brr))
          return {...state,defaultRouter: arr, routerArr:brr}
        }
      }
      case type.MENU_ACTIVE:
        return {...state, defaultActive: action.defaultActive}
      default:
        return state
    }
  }
  export default router