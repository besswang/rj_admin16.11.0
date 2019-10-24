import React, { Component } from 'react'
import { Switch, Button, Form, Message, Radio, Checkbox, Input } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectSeniorConfig, updateGlobalConfigs } from './actions'
import api from '@api/index'
class HighSetting extends Component {
	static propTypes = {
		selectSeniorConfig: PropTypes.func.isRequired,
		updateGlobalConfigs: PropTypes.func.isRequired,
  }
	constructor(props) {
		super(props)
		this.state = {
			pay:'',
			wechat:[],
			qqnumber:[],
			servicephone:[],
			form: {
				// modetype: 'true', // 服务费申请扣款方式 true 先扣  false  后扣
				// wechat: '1,2,3,4', // 官方微信
				// cappingmoneyl: '3000', // 封顶金额
				// qqnumber: '1,2,3', //企业QQ号
				// servicephone: '1,2,3,0', // 客服电话
				// overhightday: '6', //逾期计算最高天数
				// beaparttime: '7', // 申请相隔时间(天为单位)
				// thresholdscoreuser: '0', //风控分数人工审核门槛
				// fengkongnumber: 'false', // 老客是否调用
				// thresholdscore: '0', // 风控分数机器审核门槛
				// riskilencetime: '0.1' // 手机认证单价
			},
			rules:{
				cappingmoneyl: [{required: true,message: '请输入封顶金额',trigger: 'blur'}],
				overhightday: [{required: true,message: '请输入逾期计算最高天数',trigger: 'blur'}],
				beaparttime: [{required: true,message: '请输入申请相隔时间(天为单位)',trigger: 'blur'}],
				thresholdscoreuser: [{required: true,message: '请输入风控分数人工审核门槛',trigger: 'blur'}],
				thresholdscore: [{required: true,message: '请输入风控分数机器审核门槛',trigger: 'blur'}],
				riskilencetime: [{required: true,message: '请输入手机认证单价',trigger: 'blur'}],
			}
		}
	}
	componentWillMount() {

  }
  componentDidMount() {
		// this.props.selectSeniorConfig()
		this.configData()
	}
	arr = (value) => {
		return value.split(',')
	}
	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
	}
	configData = async () => {
    const res = await api.selectOtherConfigApi()
    if (res.success) {
			console.log(res)
			const x = this.arr(res.data.wechat)
			console.log(x)
			const obj = {}
			const arrx = []
			for(const i in x){
				obj['key'] = i
				obj['value'] = x[i]
				arrx.push(obj)
			}
			console.log(arrx)
			const y = this.arr(res.data.qqnumber)
			const z = this.arr(res.data.servicephone)
			this.setState({
				wechat: x,
				qqnumber: y,
				servicephone: z,
				form:res.data
			})
		}else{
			Message.warning(res.msg)
		}
	}
	saveApi = async obj => {
		const res = await api.updateGlobalConfigsApi(obj)
		if (res.success) {
			Message.success(res.msg)
			this.configData()
		}else{
			Message.warning(res.msg)
		}
	}
	saveContent = e => {
		e.preventDefault()
		this.form.validate((valid) => {
			if (valid) {
				const x = this.state.wechat.join(',')
				const y = this.state.qqnumber.join(',')
				const z = this.state.servicephone.join(',')
				const trans = Object.assign({},this.state.form,{wechat:x},{qqnumber:y},{servicephone:z})
				this.saveApi(trans)
			} else {
				console.log('error submit!!')
				return false
			}
		})
	}
	onChange1 = value => {
		this.setState({
			pay: value
		})
	}
	removeDomain(item, e) {
		var index = this.state.wechat.indexOf(item)

		if (index !== -1) {
			this.state.wechat.splice(index, 1)
			this.forceUpdate()
		}

		e.preventDefault()
	}
	addDomain(e) {
		e.preventDefault()

		this.state.wechat.push('')

		this.forceUpdate()
	}
	onChange2 = (index, value) => {
		this.state.wechat[index] = value
		this.forceUpdate()
	}
	render() {
				// modetype: 'true', // 服务费申请扣款方式 true 先扣  false  后扣
				// wechat: '1,2,3,4', // 官方微信
				// cappingmoneyl: '3000', // 封顶金额
				// qqnumber: '1,2,3', //企业QQ号
				// servicephone: '1,2,3,0', // 客服电话
				// overhightday: '6', //逾期计算最高天数
				// beaparttime: '7', // 申请相隔时间(天为单位)
				// thresholdscoreuser: '0', //风控分数人工审核门槛
				// fengkongnumber: 'false', // 老客是否调用
				// thresholdscore: '0', // 风控分数机器审核门槛
				// riskilencetime: '0.1' // 手机认证单价
		const { form, pay, rules, wechat } = this.state
		console.log(wechat)
		return (
			<div style={ {width:'50%'} }>
				<Form labelWidth="120" model={ form } ref={ e => {this.form = e} } rules={ rules }>
					<Form.Item label="服务费申请扣款方式">
						<Radio.Group value={ form.modetype } onChange={ this.onChange.bind(this,'modetype') }>
							<Radio value={ 'true' }>{'先扣'}</Radio>
							<Radio value={ 'false' }>{'后扣'}</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="官方微信">
					{
						wechat.map((item,index) => {
							return (
								<div key={ item } className="flex flex-direction_row margin-bottom15">
									<Input value={ item } onChange={ this.onChange2.bind(this, index) }/>
									<Button type="danger" size="mini" className="margin_left15" onClick={ this.removeDomain.bind(this, item) }>{ '删 除' }</Button>
								</div>
							)
						})
					}
					<Button type="primary" onClick={ this.addDomain.bind(this) }>{ '新增' }</Button>
					</Form.Item>
					<Form.Item label="下载链接" prop="downloadlink">
						<Input value={ form.downloadlink } onChange={ this.onChange.bind(this,'downloadlink') } />
					</Form.Item>
					<Form.Item label="身份证认证单价" prop="idcardprice">
						<Input value={ form.idcardprice } onChange={ this.onChange.bind(this,'idcardprice') } />
					</Form.Item>
					<Form.Item label="短信单价" prop="massageprice">
						<Input value={ form.massageprice } onChange={ this.onChange.bind(this,'massageprice') } />
					</Form.Item>
					<Form.Item label="支付开关">
						<Checkbox.Group value={ pay } onChange={ v => this.onChange1(v) }>
							<Checkbox label="微信" name="type" />
							<Checkbox label="支付宝" name="type" />
							<Checkbox label="银行卡" name="type" />
						</Checkbox.Group>
					</Form.Item>
					<Form.Item label="手机认证单价" prop="phoneprice">
						<Input value={ form.phoneprice } onChange={ this.onChange.bind(this,'phoneprice') } />
					</Form.Item>
					<Form.Item label="风控选择">
						<Radio.Group value={ form.riskmanagement } onChange={ this.onChange.bind(this,'riskmanagement') }>
							<Radio value="排序">{'排序'}</Radio>
							<Radio value="瑞鲸">{'瑞鲸'}</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="测试开关">
						<Switch
							value = { form.testswitch }
							onText=""
							offText=""
							onValue = { 'true' }
							offValue={ 'false' }
							onChange={ this.onChange.bind(this, 'testswitch') }
						/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" onClick={ this.saveContent }>{'确 定'}</Button>
					</Form.Item>
				</Form>
				{/* <Button onClick={ () => {console.log(this.state.form)} }>{'obj'}</Button> */}
			</div>
		)
	}
}

// const mapStateToProps = state => {
// 	const {  } = state
// 	return {  }
// }
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ selectSeniorConfig, updateGlobalConfigs }, dispatch)
	}
}
export default connect(mapDispatchToProps)(HighSetting)
// export default HighSetting
