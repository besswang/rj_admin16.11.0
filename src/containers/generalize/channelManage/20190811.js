// 推广管理-渠道管理-展期模式
import React, { Component } from 'react'
import { Button, Breadcrumb, Form, Input, Layout, Radio } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { menuActive } from '@redux/actions'
import { insertChannel } from './action'
import SelectPicker from '@components/SelectPicker'
import { PROMOTION_TYPE } from '@meta/select'
import validate from '@global/validate'
class Apply extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
		menuActive: PropTypes.func.isRequired,
		insertChannel: PropTypes.func.isRequired,
	}
	constructor(props) {
		super(props)
		this.state = {
			form: {
				channelName: '', // 渠道名称,
				daiName: '', // 贷超名称,
				price: null, // 单价,
				type: '', // 类型,
				machineScore: null, // 机审分数,
				userScore: null, // 人工分数
				firstMoney: null, // 授信额度
				remake: '', // 备注,
				money: null, // 额度
				defaultValue: 1,
				state:1,
				// sort:null, // 排序
				delayType:1,
				overdueType:1,
				// moneyRate: '', // 借款年化利率（利息）
				overdueRate: '', // 逾期利率
				serverMoney: null, // 逾期服务费
				// continueMoney:null,
				dayNumber:null, // 申请天数
				riskType: 'RUIJING'
			},
			rules: {
				// channelName: [{required: true,message: '请输入渠道名称',trigger: 'blur'}],
				channelName:[{
					required:true,
					validator: (rule, value, callback) => {
						const usern = /^[a-zA-Z0-9_]{1,}$/
						if (value === '' || value === null) {
							callback(new Error('请输入首借额度'))
						} else if (!value.match(usern)) {
							callback(new Error('渠道名称只能由字母数字组成'))
						} else {
							callback()
						}
					}
				}],
				daiName: [{required: true,message: '请输入超贷名称',trigger: 'blur'}],
				firstMoney: [{required: true, validator: validate.edu}],
				price: [{
						required:true,
						validator: (rule, value, callback) => {
							if (value === '' || value === null) {
								callback(new Error('请输入单价'))
							} else {
								callback()
							}
						}
					}
				],
				type: [{required: true,message: '请选择推广方式',trigger: 'blur'}],
				machineScore: [{required: true, validator: validate.machfen}],
				userScore: [{required: true, validator: validate.userfen}],
				remake: [{required: true,message: '请输入备注',trigger: 'blur'}],
				money: [{required: true, validator: validate.edu}],
				// sort: [{required: true, validator:validate.sort}],
				// moneyRate: [{required: true,validator:validate.moneyRate}],
				overdueRate: [{required: true,validator:validate.lilv}],
				serverMoney: [{required: true, validator: validate.moneyType}],
				// continueMoney: [{required: true, validator:validate.continueMoney}],
				dayNumber: [{required: true,validator:validate.dayNum}]
			}
		}
	}
	componentWillMount() {
		this.props.menuActive('/generalize/channelmanage')
	}
	componentDidMount() {

	}
	onChange(key, value) {
		let v = null
		if(value && (typeof value === 'string')){
			v = value.trim()
		}else{
			v = value
		}
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: v })
		})
	}
	saveContent = e => {
		e.preventDefault()
		console.log(this.state.form)
		this.form.validate((valid) => {
			if (valid) {
				console.log(this.state.form)
				this.props.insertChannel(this.state.form, this.props.history)
			} else {
				console.log('error submit!!')
				return false
			}
		})
	}
	render(){
		const { form, rules } = this.state
		return(
			<div>
				<Breadcrumb separator="/" className="margin-bottom15">
					<Breadcrumb.Item>
						<Link to="/generalize/channelmanage">{'渠道管理'}</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>{'添加'}</Breadcrumb.Item>
				</Breadcrumb>

				<Form labelWidth="140" ref={ e => {this.form=e} } model={ form } rules={ rules }>
					<h1 className="channeltitle">{ '渠道添加' }</h1>
					<Layout.Row>
						<Layout.Col span="12" xs="24" sm="24" md="12" lg="10">
							<Form.Item label="渠道名称" prop="channelName">
								<Input value={ form.channelName } onChange={ this.onChange.bind(this, 'channelName') } />
							</Form.Item>
							<Form.Item label="贷超名称" prop="daiName">
								<Input value={ form.daiName } onChange={ this.onChange.bind(this, 'daiName') } />
							</Form.Item>
							<Form.Item label="单价" prop="price">
								<Input type="number" value={ form.price } onChange={ this.onChange.bind(this, 'price') } append="元" />
							</Form.Item>
							<Form.Item label="推广方式" prop="type">
								<SelectPicker
									stringValue={ form.type }
									onChange={ this.onChange.bind(this, 'type') }
									optionsArr={ PROMOTION_TYPE }
									placeholder={ '选择方式' }
								/>
							</Form.Item>
							<Form.Item label="选择风控">
								<Radio.Group value={ form.riskType } onChange={ this.onChange.bind(this,'riskType') }>
									<Radio value="RUIJING">{'米融A风控'}</Radio>
									<Radio value="PAIXU">{'米融B风控'}</Radio>
								</Radio.Group>
							</Form.Item>
						</Layout.Col>
						<Layout.Col span="12" xs="24" sm="24" md="12" lg="10">
							<Form.Item label="机审分数" prop="machineScore">
								<Input type="number" value={ form.machineScore } onChange={ this.onChange.bind(this, 'machineScore') } append="分" />
							</Form.Item>
							<Form.Item label="人工审核分数" prop="userScore">
								<Input type="number" value={ form.userScore } onChange={ this.onChange.bind(this, 'userScore') } append="分" />
							</Form.Item>
							<Form.Item label="授信额度" prop="firstMoney">
								<Input type="number" value={ form.firstMoney } onChange={ this.onChange.bind(this, 'firstMoney') } append="元" />
							</Form.Item>
							<Form.Item label="备注" prop="remake">
								<Input value={ form.remake } onChange={ this.onChange.bind(this, 'remake') } />
							</Form.Item>
						</Layout.Col>
					</Layout.Row>
					<h1 className="channeltitle">{ '额度添加' }</h1>
					<Layout.Row>
						<Layout.Col span="12" xs="24" sm="24" md="12" lg="10">
							<Form.Item label="额度" prop="money">
								<Input type="number" value={ form.money } onChange={ this.onChange.bind(this,'money') } append="元" />
							</Form.Item>
							<Form.Item label="是否默认">
								<Radio.Group value={ form.defaultValue } onChange={ this.onChange.bind(this,'defaultValue') }>
									<Radio value="1">{'是'}</Radio>
									<Radio value="0">{'否'}</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item label="状态">
								<Radio.Group value={ form.state } onChange={ this.onChange.bind(this,'state') }>
									<Radio value="1">{'启用'}</Radio>
									<Radio value="0">{'禁用'}</Radio>
								</Radio.Group>
							</Form.Item>
							{/* <Form.Item label="排序" prop="sort">
								<Input type="number" value={ form.sort } onChange={ this.onChange.bind(this,'sort') } />
							</Form.Item> */}
							<Form.Item label="是否开启延期功能">
								<Radio.Group value={ form.delayType } onChange={ this.onChange.bind(this,'delayType') }>
									<Radio value="1">{'开'}</Radio>
									<Radio value="0">{'关'}</Radio>
								</Radio.Group>
							</Form.Item>
						</Layout.Col>
						<Layout.Col span="12" xs="24" sm="24" md="12" lg="10">
							{/* <Form.Item label="借款年化利率（利息）" prop="moneyRate">
								<Input value={ form.moneyRate } onChange={ this.onChange.bind(this,'moneyRate') } />
							</Form.Item> */}
							<Form.Item label="逾期利率" prop="overdueRate">
								<Input value={ form.overdueRate } onChange={ this.onChange.bind(this,'overdueRate') } append="%" />
							</Form.Item>
							<Form.Item label="服务费" prop="serverMoney">
								<Input type="number" value={ form.serverMoney } onChange={ this.onChange.bind(this,'serverMoney') } append="元" />
							</Form.Item>
							{/* <Form.Item label="延期金额" prop="continueMoney">
								<Input type="number" value={ form.continueMoney } onChange={ this.onChange.bind(this,'continueMoney') } />
							</Form.Item> */}
							<Form.Item label="申请天数" prop="dayNumber">
								<Input type="number" value={ form.dayNumber } onChange={ this.onChange.bind(this,'dayNumber') } append="天" />
							</Form.Item>
							<Form.Item label="逾期是否可以延期">
								<Radio.Group value={ form.overdueType } onChange={ this.onChange.bind(this,'overdueType') }>
									<Radio value="1">{'开'}</Radio>
									<Radio value="0">{'关'}</Radio>
								</Radio.Group>
							</Form.Item>
						</Layout.Col>
					</Layout.Row>
					<Layout.Row>
						<Layout.Col span="12" xs="24" sm="24" md="12" lg="8">
							<Form.Item></Form.Item>
						</Layout.Col>
						<Layout.Col span="12" xs="24" sm="24" md="12" lg="8">
							<Form.Item>
								<div style={ {float:'right'} }>
									<Link to="/generalize/channelmanage" className="margin_right10"><Button>{'取 消'}</Button></Link>
									<Button type="primary" onClick={ this.saveContent }>{'确 定'}</Button>
								</div>
							</Form.Item>
						</Layout.Col>
					</Layout.Row>
				</Form>
			</div>
		)
	}
}
const mapStateToProps = state => {
	// const { } = state
	// return { }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ menuActive, insertChannel }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Apply)
