import React, { Component } from 'react'
import { Button, Form, Input,Layout, Checkbox, Message } from 'element-react'
import api from '@api/index'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { managelogin } from './action'
import icon1 from '../../images/login-from-icon1.png'
import icon2 from '../../images/login-from-icon2.png'
import user from '../../images/user.png'
import code from '../../images/code.png'
import '@styles/login.less'
// import { get } from '../../fetch/get.js'
// import fetch from '../../fetch/mockFetch.js'
class Login extends Component {
  static propTypes = {
    // match: PropTypes.object.isRequired,
    // location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    managelogin: PropTypes.func.isRequired,
    btnLoading: PropTypes.bool.isRequired
  }
  constructor(props){
    super(props)
    this.state = {
      codeText: '获取验证码',
      codeDisabled: false,
      count: 60,
      type:false,
      form: {
        tel: '',
        code: ''
      },
      rules: {
        tel: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      channelForm: {
        user: '',
        password: '',
        rember: false, // 记住密码
      },
      channelRules: {
        user: [
          { required: true, message: '请输入用户名或手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
    }
  }
	componentWillMount() {
    console.log(this.props)
	}
	componentDidMount() {
    window.sessionStorage.clear()
    // window.sessionStorage.removeItem('defaultRouter')
    // window.sessionStorage.removeItem('routerArr')
    // console.log(this.getCookie('adminName'))
    // console.log(this.getCookie('password'))
    const a = this.getCookie('adminName')
    const p = this.getCookie('password')
    if(a && p){
      this.setState({
        channelForm: {
          user: a,
          password: p,
          rember: true, // 记住密码
        }
      })
    }
    // this.aaa()
  }
  // aaa = () => {
  //   // get('https://easy-mock.com/mock/5cf7653cf8ab93502742fb84/example/api/rolemenu/selectRolemenus')
  //   fetch('api/rolemenu/selectRolemenus', {
  //     method: 'get'
  //   })
	// }
  fetchLogin = async () => {
    const res = await api.manageloginApi({
      adminName: this.state.form.tel,
      password: this.state.form.code
    })
    if(res.success){
      Message.success(res.msg)
      setTimeout(() => {
        // this.props.history.push('/home')
        this.props.history.push('welcome')
      }, 2000)
    } else {
      Message.error(res.msg)
      this.setState({
        form: {
          tel: '',
          code: ''
        }
      })
    }
  }
  fetchCode = async () => {
    this.setState({
      codeDisabled: true
    })
    const res = await api.verifycodeApi({
      phone: this.state.form.tel
    })
    if (res.success) {
      Message.success(res.msg)
      let count = this.state.count
      const timer = setInterval(() => {
        this.setState({
          count: (count--),
          codeDisabled: true,
          codeText: count
        }, () => {
          if (count === 0) {
            clearInterval(timer)
            this.setState({
              count: 60,
              codeDisabled: false,
              codeText: '获取验证码'
            })
          }
        })
      }, 1000)
    } else {
      this.setState({form: {tel: ''},codeDisabled: false})
      Message.warning(res.msg)
    }
  }
  getCode = () => {
    if(this.state.form.tel === ''){
      Message.warning('请先输入手机号')
      return
    } else if (!(/^1[34578]\d{9}$/.test(this.state.form.tel))) {
      Message.warning('手机号格式不正确')
      this.setState({form:{tel: ''}})
      return
    } else {
      this.fetchCode()
    }
  }
   // 获取cookie
  getCookie(key) {
    const name = key + '='
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim()
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
  }
  // 设置cookie,默认是30天
  setCookie(key, value) {
      const d = new Date()
      d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000))
      const expires = 'expires=' + d.toGMTString()
      document.cookie = `${ key }=${ value };${ expires }`
  }
  removeCookie(key) {
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    const expires = 'expires=' + exp.toGMTString()
    const accountInfo = document.cookie
    var pos = accountInfo.indexOf(key)
    if (pos !== -1) {
      document.cookie = `${ key }='';${ expires }`
    }
  }
  // 用户名-密码登陆
  channelLogin = e => {
    e.preventDefault()
    this.channelForm.validate((valid) => {
      if (valid) {
        const { channelForm } = this.state
        if (channelForm.rember){// 记住密码
          this.setCookie('adminName', channelForm.user)
          this.setCookie('password', channelForm.password)
        }else{
          this.removeCookie('adminName')
          this.removeCookie('password')
        }
        const trans = {
          adminName: this.state.channelForm.user,
          password: this.state.channelForm.password
        }
        this.props.managelogin(trans,this.props.history)
      } else {
        this.setState({
          channelForm: {
            password: '',
            user: ''
          }
        })
        console.log('error submit!!')
        return false
      }
    })
  }
  loginFn = e => {
    e.preventDefault()
    this.form.validate((valid) => {
      if (valid) {
        this.fetchLogin()
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
  onChange = (key, val) => {
    this.setState({
      form: Object.assign({},this.state.form, {[key]: val})
    })
  }
  channelOnChange = (key, val) => {
    this.setState({
      channelForm: Object.assign({},this.state.channelForm, {[key]: val})
    })
  }
  Codeform = () => {
    const { type } = this.state
    const { btnLoading } = this.props
    if (type){
      return (
        <Form className="form-con" ref={ e => { this.form = e } } model={ this.state.form } rules={ this.state.rules }>
          <Form.Item prop="tel">
            <Input value={ this.state.form.tel } onChange={ this.onChange.bind(this,'tel') } placeholder="请输入您的手机号" prepend={
                <img src={ user } alt="" />
              }
            />
          </Form.Item>
          <div className="code-con">
            <Form.Item prop="code">
              <Input value={ this.state.form.code } onChange={ this.onChange.bind(this,'code') } placeholder="请输入您的验证码" prepend={
                  <img src={ code } alt="" />
                }
              />
            </Form.Item>
            <Form.Item className="flex_1 code-item">
              <Button type="text" onClick={ this.getCode } disabled={ this.state.codeDisabled }>{ this.state.codeText }</Button>
            </Form.Item>
          </div>
          <Form.Item className="lastitem">
            <Button className="login-btn" type="primary" onClick={ this.loginFn }>{'登陆'}</Button>
          </Form.Item>
        </Form>
      )
    }else{
      const { channelForm, channelRules } = this.state
      return (
        <Form className="form-con" ref={ e => { this.channelForm = e } } model={ channelForm } rules={ channelRules }>
          <Form.Item prop="user">
            <Input value={ channelForm.user } onChange={ this.channelOnChange.bind(this, 'user') } placeholder="请输入您的手机号/用户名" prepend={
                <img src={ user } alt="" />
              }
            />
          </Form.Item>
          <Form.Item prop="password">
            <Input type="password" value={ channelForm.password } onChange={ this.channelOnChange.bind(this, 'password') } placeholder="请输入您的密码" prepend={
                <img src={ code } alt="" />
              }
            />
          </Form.Item>
          <Form.Item className="lastitem">
            <Checkbox checked={ channelForm.rember } onChange={ this.channelOnChange.bind(this, 'rember') } label="记住用户名和密码" />
            <Button className="login-btn" type="primary" onClick={ this.channelLogin } loading={ btnLoading }>{'登陆'}</Button>
          </Form.Item>
        </Form>
      )
    }
  }
  render() {
    return (
      <div className="login-con">
        <Layout.Row type="flex" justify="center" align="middle" className="row-bg">
          <Layout.Col span="7" className="grid-content grid-left flex flex-direction_column justify-content_flex-center align-item_center">
            <img className="icon1" src={ icon1 } alt=""/>
            <div className="flex flex-direction_row borderb1 align-items_center">
              <h1 className="wel">{'欢迎来到'}</h1>
              <img className="icon2" src={ icon2 } alt=""/>
            </div>
            <h1 className="title">{'现金滴滴后台登陆系统'}</h1>
          </Layout.Col>
          <Layout.Col span="6" className="grid-content grid-right flex flex-direction_column justify-content_flex-center align-item_center">
          { this.Codeform() }
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}
Login.propTypes = {
  propsData:PropTypes.object,
  propsDataHistory: PropTypes.object
}
const mapStateToProps = state => {
  const {
    btnLoading
  } = state
  return {
    btnLoading
  }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ managelogin }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
