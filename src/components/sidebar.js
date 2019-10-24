import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'element-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { tabAdd } from '@redux/actions'
// import { SIDE_BAR_TEXT } from '@meta/sidebarText'
// import { CHILD_ROUTES } from '../routes/childRoutes'
class Sidebar extends Component{
  static propTypes = {
    router: PropTypes.object,
    tabAdd: PropTypes.func.isRequired
	}
  componentDidMount(){
    // console.log(this.props)
  }
  handleClick = v => {
    this.props.tabAdd(v)
  }
  recursion = arr => {
    const time = +new Date()
    const menu = arr.map((item) => {
      if (!item.hideInMenu){
        if (item.children && item.children.length) {
          return (
            <Menu.SubMenu
              index={ item.path }
              key={ item.name }
              title={
                <span>
                  {item.name}
                </span>
              }
            >
              <div>{ this.recursion(item.children) }</div>
            </Menu.SubMenu>
          )
        } else if (!item.hideInMenu) {
          return (
            <Link to={ item.path+'?'+time } key={ item.name+time } onClick={ ()=>this.handleClick(item) }>
              <Menu.Item index={ item.path }>
                { item.name }
              </Menu.Item>
            </Link>
          )
        }
      }
      return true
    })
    return menu
	}
  render(){
    const { router } = this.props
    return (
      <Menu theme="dark" style={ { width:230 } } defaultActive={ router.defaultActive }>
        { this.recursion(router.routerArr) }
        <div style={ {height:120} } />
      </Menu>
    )
  }
}

const mapStateToProps = state => {
	const { router } = state
	return { router }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ tabAdd }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)