import React, { Component } from 'react'
// import { BrowserRouter as Router,Route, Switch, Redirect } from 'react-router-dom'
// 你如果不想访问到后端， 应该使用HashRouter
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Home from '@containers/home'
import Login from '@containers/user/login'
// import { CHILD_ROUTES } from './childRoutes'
//路由操作
class App extends Component {
  static propTypes = {
    router: PropTypes.object,
    user:PropTypes.object,
    // dispatch: PropTypes.func.isRequired,
    // location: PropTypes.object.isRequired,
	}
  constructor(props){
    super(props)
    this.state = {
      loginSuccess:false
    }
  }
  componentWillMount() {

  }
	componentDidMount() {
    this.setDefault()
	}
	componentDidUpdate() {
	  this.setDefault()
  }
  //设置侧边栏选中选项
  setDefault() {
    // this.props.router.routerName = this.findNameByPath(this.props.router.routerArr, this.props.location.pathname)
    // if (this.props.router.routerName[0].hideChildren) {
    //   this.props.router.defaultActive = this.props.router.routerName[0].path
    // } else {
    //   this.props.router.defaultActive = this.props.router.routerName[
    //     this.props.router.routerName.length - 1
    //   ].path
    // }
  }
  render() {
    const { loginSuccess } = this.state
    const { router } = this.props
    return(
        <Router>
          <Switch>
            <Route exact path="/"
              render={ () => {
                  if(loginSuccess){ //判断是否已经登陆
                    return <Redirect to="/welcome" />
                  }else{
                    return <Redirect to="/login" />
                  }

                  // return <Redirect to = "/login" / >
                }
              }
            />

            {/* { router.singleRouter.map((item) => (
							<Route exact key={ item.path } path={ item.path } component={ item.component } />
						)) } */}

            <Route exact path="/login" component={ Login } />
            {/* <Login /> */}
            <Home>
              {/* { router.singleRouter.map((item) => (
                <Route exact key={ item.path } path={ item.path } component={ item.component } />
              )) } */}
              { router.defaultRouter.map(item => {
                return <Route key={ item.name } path={ item.path } component={ item.component } />
              }) }
            </Home>

            {/* { router.defaultRouter.map((item) => (
              <Route exact key={ item.path } path={ item.path } component={ item.component } />
            )) } */}
          </Switch>
        </Router>
    )
  }
}
const mapStateToProps = state => {
	const { router } = state
	return { router }
}
export default connect(mapStateToProps)(App)
