import React, { Component } from 'react'
import { Checkbox, Button, Input } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectSeniorConfig } from './actions'
class HighSetting extends Component {
	static propTypes = {
		list: PropTypes.object.isRequired,
		selectSeniorConfig: PropTypes.func.isRequired,
  }
	constructor(props) {
		super(props)
		this.state = {
			data:[
				{value:'0,0,1,0',id:1},
				{value:'true',id:2}
			],
			checkedCities:[],
			obj:{
				bankPay: [1, 2, 3, 4], //银行卡支付通道开关(连连,富有,快钱,合利)
				downloadLink:'', // 下载链接
				idcardPrice:'', // 省份证认证单价
				massagePrice:'', // 短信单价
				modeType: true, // 服务费申请扣款方式 true 先扣  false  后扣
				pay:[1,2,3], // 支付开关(微信， 支付宝， 银行卡)
				phonePrice:'', //手机认证单价
				riskManagement: [1,2], //风控选择 排序,瑞鲸
				testSwitch:false, // 测试开关
			}
			// 开关一律有true或false，checkbox的用数组，redio用数字
		}
	}
	componentWillMount() {

  }
  componentDidMount() {
		this.props.selectSeniorConfig()
	}
	arr = (value) => {
		return value.split(',')
	}
	handleCheckedCitiesChange(value) {
		this.setState({
			bankPay: value,
		})
	}
onChange(key, value) {
	this.setState({
		obj: Object.assign(this.state.obj, {
			[key]: value
		})
	})
}
	render() {
		const { obj } = this.state
		return (
			<div>
			<ul>
				<li>
					<Checkbox.Group
					value={ obj.bankPay }
					>
						<Checkbox value={ 1 } label="连连" />
						<Checkbox value={ 2 } label="富有" />
						<Checkbox value={ 3 } label="快钱" />
						<Checkbox value={ 4 } label="合利" />
					</Checkbox.Group>
				</li>
				<li>
					<Input value={ obj.downloadLink } placeholder="下载链接" onChange={ this.onChange.bind(this,'downloadLink') } />
				</li>
				<li>
					<label htmlFor="">{'身份证认证单价'}</label>
					<Input value={ obj.idcardPrice } placeholder="身份证认证单价" onChange={ this.onChange.bind(this,'idcardPrice') } />
				</li>
			</ul>
			<Button onClick={ () => {console.log(obj)} }>{'看看'}</Button>
				{/* <Form labelWidth="120" model={ form } ref={ e => {this.form = e} } rules={ rules }>
					<Form.Item label="登陆方式">
						<Radio.Group value={ form.loginMode } onChange={ this.onChange.bind(this, 'loginMode') } >
							<Radio value={ 'PASSWORD' } disabled={ adminDisabled }>{'密码登陆'}</Radio>
							<Radio value={ 'VERIFYCODE' } disabled={ adminDisabled }>{'验证码登陆'}</Radio>
						</Radio.Group>
					</Form.Item>
				</Form> */}
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { list } = state
	return { list }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ selectSeniorConfig }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(HighSetting)
// export default HighSetting
