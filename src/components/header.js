import React, { Component } from 'react'
// import { Dropdown } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '@containers/user/action'
import '@styles/header.less'
class Header extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      adminName: ''
    }
  }
  componentWillMount() {
		// console.log('header')
		// console.log(this.props)
	}
	componentDidMount() {
    // console.log(this.props.user)
    // if (this.props.user.adminName !== '') {
    //   this.setState({
    //     adminName: this.props.user.adminName
    //   })
    // }else{
      const obj = JSON.parse(window.sessionStorage.getItem('adminInfo'))
      this.setState({
        adminName: obj.adminName
      })
    // }
	}
  // handleCommand = async e => {
  //   if(e === '0'){
  //     this.props.logout(this.props.history)
  //     // this.props.history.push('/login')
  //   }
  // }
  handleCommand = async () => {
      this.props.logout(this.props.history)
  }
  render() {
    // const { adminName } = this.props.user
    // const obj = JSON.parse(window.sessionStorage.getItem('adminInfo'))
    // const { adminName } = obj
    const { adminName } = this.state
    return (
      <ul className= "header-ul flex flex-direction_row justify-content_flex-justify align-items_center" >
        <li className="flex flex-direction_row">
          <h4>{'管理系统'}</h4>
          <span>{'欢迎'}{ adminName }</span>
        </li>
        <li>
          <span onClick={ this.handleCommand }>{'退出'}</span>
          {/* <Dropdown onCommand={ this.handleCommand } menu={ (
            <Dropdown.Menu>
              <Dropdown.Item command="1">{'修改'}<i className="el-icon-edit el-icon--right" /></Dropdown.Item>
              <Dropdown.Item command="0">{'退出'}</Dropdown.Item>
            </Dropdown.Menu>
            ) }
          >
            <span className="el-dropdown-link">{'设置'}<i className="el-icon-caret-bottom el-icon--right" /></span>
          </Dropdown> */}
        </li>
      </ul>
    )
  }
}
Header.propTypes = {
  propsData: PropTypes.object,
  propsDataHistory: PropTypes.object
}
const mapStateToProps = state => {
  const {
    user
  } = state
  return {
    user
  }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ logout }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
