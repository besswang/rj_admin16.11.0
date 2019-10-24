import React, { Component } from 'react'
import { Button, Form, Input,Layout, Message } from 'element-react'
import api from '@api/index'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { managelogin } from './action'
import user from '../../images/user.png'
import code from '../../images/code.png'
import '@styles/login.less'
class Login extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    managelogin: PropTypes.func.isRequired,
    btnLoading: PropTypes.bool.isRequired
  }
  constructor(props){
    super(props)
    this.state = {
      loginMode: '', // 登陆方式：VERIFYCODE("验证码登录")；PASSWORD("密码登录")
      codeText: '获取验证码',
      codeDisabled: false,
      count: 60,
      form: {
        adminName: '',
        password: '',
        code: ''
      },
      rules: {
        adminName: [
          { required: true, message: '请输入用户名或手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  }
	componentWillMount() {
    // const elements = [
    //   'Hydrogen',
    //   'Helium',
    //   'Lithium',
    //   'Beryllium'
    // ]

    // const xx = elements.map(({ 'length': item }) => item)
    // console.log(xx)
	}
	componentDidMount() {
    window.sessionStorage.clear()
    const a = this.getCookie('adminName')
    const p = this.getCookie('password')
    if(a && p){
      this.setState({
        channelForm: {
          adminName: a,
          password: p
        }
      })
    }
  }
  fetchCode = async () => {
    this.setState({
      codeDisabled: true
    })
    const res = await api.verifycodeApi({
      phone: this.state.form.adminName
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
      this.setState({form: {adminName: ''},codeDisabled: false})
      Message.warning(res.msg)
    }
  }
  getCode = () => {
    if(this.state.form.adminName === ''){
      Message.warning('请先输入手机号')
      return
    } else if (!(/^1[34578]\d{9}$/.test(this.state.form.adminName))) {
      Message.warning('手机号格式不正确')
      this.setState({form:{adminName: ''}})
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
    if(this.state.loginMode !== ''){
      this.form.validate((valid) => {
        if (valid) {
          const { form } = this.state
          let trans = {}
          if (this.state.loginMode === 'PASSWORD'){
            trans = {
              adminName: form.adminName,
              password: form.password
            }
          }else{
            trans = {
              adminName: form.adminName,
              password: form.code
            }
          }
          this.props.managelogin(trans,this.props.history)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }else{
      return false
    }
  }
  onChange = (key, val) => {
    this.setState({
      form: Object.assign({},this.state.form, {[key]: val})
    })
  }
  selectAdminLoginByName = async () => {
    const res = await api.selectAdminLoginByNameApi({adminName:this.state.form.adminName})
    console.log(res)
    if(res.success){
      this.setState({
        adminName:this.state.form.adminName,
        loginMode:res.data
      })
    }else{
      this.setState({
        form: {
          adminName: ''
        }
      })
      Message.warning(res.msg)
    }
  }
  nameBlur = () => {
    if(this.state.form.adminName !== ''){
      this.selectAdminLoginByName()
    }
  }
  render() {
    const { form, rules, loginMode } = this.state
    const { btnLoading } = this.props
    return (
      <div className="login-con">
        <div className="title-con">
          <h1 className="title">{ '点金手渠道登录后台' }</h1>
          {/* 小赢花花,及享用,梦想借,pizza,牛肉干,加油站,百花果,点金手 */}
          <p className="info">{'BACKSTAGE MANAGEMENT DEPARTMENT'}</p>
        </div>
        <Layout.Row type="flex" justify="center" align="middle" className="row-bg">
          <Layout.Col span="6" className="grid-content grid-right flex flex-direction_column">
            <h1 className="wel">{'欢迎登录!'}</h1>
            <Form className="form-con" ref={ e => { this.form = e } } model={ form } rules={ rules }>
              <Form.Item prop="adminName">
                <Input value={ form.adminName } onChange={ this.onChange.bind(this, 'adminName') } onBlur={ this.nameBlur } placeholder="请输入您的手机号/用户名" prepend={
                    <img src={ user } alt="" />
                  }
                />
              </Form.Item>
            {
              loginMode === 'PASSWORD' &&
              <Form.Item prop="password">
                <Input type="password" value={ form.password } onChange={ this.onChange.bind(this, 'password') } placeholder="请输入您的密码" prepend={
                    <img src={ code } alt="" />
                  }
                />
              </Form.Item>
            }
            { loginMode === 'VERIFYCODE' &&
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
            }
              <Form.Item className="lastitem">
                <Button className="login-btn" type="primary" onClick={ this.channelLogin } loading={ btnLoading }>{'登陆'}</Button>
              </Form.Item>
            </Form>
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
