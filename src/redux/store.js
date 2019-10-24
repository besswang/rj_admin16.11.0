// Store 就是把它们联系到一起的对象。 Store 有以下职责：
// 维持应用的 state；
// 提供 getState() 方法获取 state；
// 提供 dispatch(action) 方法更新 state；
// 通过 subscribe(listener) 注册监听器;
// 通过 subscribe(listener) 返回的函数注销监听器
import { createStore, applyMiddleware, compose } from 'redux'
// import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import reducers from './reducers'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
const loggerMiddleware = createLogger()
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )
)
export default store
