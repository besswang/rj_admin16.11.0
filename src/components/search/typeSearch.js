// 开始-结束时间组建
// 检查没用的话，可以删除
import React,{ Component } from 'react'
import { Input, Form, Button, Select, Notification} from 'element-react'
import { AUDIT_SELECT } from '@meta/select'
import Time from '../setime'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { auditRefuseList } from '@redux/actions'
class TypeSearch extends Component {
  static propTypes = {
    searchType: PropTypes.number
  }
  constructor(props){
    super(props)
    this.state = {
      form: {
        content:'',
        selectValue:null
      }
    }
  }
  TIME = () => {
    let TIME=null
    if (this.props.searchType === 2) {
      TIME = <Form.Item><Time /></Form.Item>
    }
    return TIME
  }
  onSubmit = e => {
    e.preventDefault()
    console.log(this.state.form)
    if(this.state.form.selectValue === '2'){//手机号码
      const tel = this.state.form.content
      const regex = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/
      if(tel){
        if (!regex.test(tel)) {
          Notification({
            title: '警告',
            message: '请输入正确的手机号码',
            type: 'warning'
          })
          this.setState({
            form: Object.assign(this.state.form, {
              content: ''
            })
          })
          return false
        }
      }
    } else if (this.state.form.selectValue === '3'){
      const code = this.state.form.content
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (code) {
        if (!reg.test(code)) {
          Notification({
            title: '警告',
            message: '请输入有效的身份证号',
            type: 'warning'
          })
          this.setState({
            form: Object.assign(this.state.form, {
              content: ''
            })
          })
          return false
        }
      }
    }
    console.log(this.props)
    // const { dispatch } = this.props
    // dispatch(auditRefuseList(this.state.form))
  }
  onChange(key, value) {
    this.setState({
      form: Object.assign(this.state.form, {
        [key]: value
      })
    })
  }
  render (){
    // let TIME = null
    // if (this.props.searchType === '2') {
    //   TIME = < Form.Item > < Time / > < /Form.Item>
    // }
    const { selectValue, content } = this.state.form
    return (
      <Form inline model={ this.state.form } onSubmit={ this.onSubmit }>
        <Form.Item>
          <Select value={ selectValue } clearable placeholder="搜索类型" onChange={ this.onChange.bind(this,'selectValue') }>
            {
              AUDIT_SELECT.map(el => {
                return <Select.Option key={ el.value } label={ el.label } value={ el.value } />
              })
            }
          </Select>
        </Form.Item>
        <Form.Item>
          <Input value={ content } placeholder="请输入内容" onChange={ this.onChange.bind(this,'content') } />
        </Form.Item>
        {this.TIME()}
        {/* {TIME} */}
        <Form.Item>
          <Button nativeType="submit" type="primary">{'搜索'}</Button>
        </Form.Item>
      </Form>
    )
  }
}
TypeSearch.propTypes = {
  dispatch: PropTypes.func.isRequired
}
export default connect()(TypeSearch)