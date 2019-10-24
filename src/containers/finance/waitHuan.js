// 催收管理-个人对账
import React, { Component } from 'react'
import { Button, Loading, Table, Dialog, Form, Input, Tabs, Message, MessageBox, Radio } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectPendingRepay, updateStateComplete, updateStateDelay, findAllDelayRate, updateStateReduction,deductionFee,exportPendingRepay } from './actions'
import Search from '@components/Search'
import MyPagination from '@components/MyPagination'
import filter from '@global/filter'
import timeDate from '@global/timeDate'
import SelectPicker from '@components/SelectPicker'
import { REPAYMENT_TYPE } from '@meta/select'
import DetailBtn from '@components/DetailBtn'
import { dwaitHuan } from '@meta/details'
import api from '@api/index'
import SelectDay from '@components/SelectDay'
import validate from '@global/validate'
import * as math from 'mathjs'
class WaitHuan extends Component {
	static propTypes = {
		list: PropTypes.object.isRequired,
		btnLoading: PropTypes.bool.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		selectPendingRepay: PropTypes.func.isRequired,
		updateStateComplete: PropTypes.func.isRequired,
		updateStateDelay: PropTypes.func.isRequired,
		findAllDelayRate: PropTypes.func.isRequired,
		updateStateReduction: PropTypes.func.isRequired,
		dayList: PropTypes.arrayOf(
			PropTypes.object.isRequired
		),
		deductionFee: PropTypes.func.isRequired,
		exportPendingRepay: PropTypes.func.isRequired,
  }
	constructor(props) {
		super(props)
		this.state = {
			xuDay:'', // 下期应还日
			xuMoney:0, // 续期金额
			dialogVisible2:false,
			listObj:{},
			channelName:'',
			delayNumber: null, // 延期天数
			reMoney: null, // 延期金额
			delayRate:null, // 费率
			surplusMoney: null, // 剩余应还金额
			activeName: '1',
			orderNumber:'', // 订单号
			realRepaymentMoney: null, // 应还金额
			applyMoney: null, // 借款金额
			serviceMoney: null, // 服务费
			orderId: null,
			loanDate: '', // 放款时间
			finalDate: '', // 约定还款日
			dialogVisible: false,
			realName:'',// 姓名
			phone:'',// 手机号码
			// type: '', //线下  ONDERLINE，线上 ONLINE
			form2:{
				delayId: null, // 延期选择天数id
			},
			type: 1, // 代扣方式 1：到期还款 2:到期续期
			rules2:{
				delayId: [{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '' || value === null) {
							callback(new Error('请选择延期天数'))
						} else {
							callback()
						}
					}
				}],
			},
			form: {
				repaymentType: 3, // 还款方式（3:线下支付宝，4：线下微信）
				repaymentMoney:null, // 还款金额
				payNumber: null, // 支付单号
				dayValue: null,
				principalReductionMoney: null, // 减免本金
				rateReductionMoney: null, // 利息减免
				overdueReductionMoney: null, // 逾期减免
				serviceReductionMoney: null, // 服务费减免
			},
			rules: {
				principalReductionMoney: [{required: true, validator: validate.moneyType}],
				rateReductionMoney: [{required: true, validator: validate.moneyType}],
				overdueReductionMoney: [{required: true, validator: validate.moneyType}],
				serviceReductionMoney: [{required: true, validator: validate.moneyType}],
				dayValue: [{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '' || value === null) {
							callback(new Error('请选择延期天数'))
						} else {
							callback()
						}
					}
				}],
				repaymentType: [{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '' || value === null) {
							callback(new Error('请选择还款方式'))
						} else {
							callback()
						}
					}
				}],
				repaymentMoney: [{required: true, validator: validate.moneyType}],
				payNumber: [{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '' || value === null) {
							callback(new Error('请输入支付单号'))
						} else {
							callback()
						}
					}
				}]
			},
			columns: [{
						label: '#',
						width: 60,
						render: (a, b, c) => {
							return c + 1
						}
					}, {
					label: '申请单号',
					width:200,
					prop: 'orderNumber'
				}, {
					label: '渠道名称',
					width: 120,
					prop: 'channelName'
				}, {
					label: '真实姓名',
					width: 100,
					prop: 'realName',
					render: row => {
						if (row.realName) {
							const reg = row.realName.slice(1)
							const s = reg.split('')
							const x = []
							for (let i = 0; i < s.length; i++) {
								x.push('*')
							}
							const z = x.join('')
							const y = row.realName.substring(1, 0)
							return y + z
						}
					}
				}, {
					label: '手机号码',
					width: 140,
					prop: 'phone',
					render: row => {
						if (row.phone) {
							return row.phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')
						}
					}
				},
				// {
				// 	label: '新老客户',
				// 	prop: 'loanTerm', // 等于0 为新客  大于0 为老客
				// 	render: row => {
				// 		const data = filter.loanTerm(row.loanTerm)
				// 		return data
				// 	}
				// },
				//  {
				// 	label: '身份证号',
				// 	prop: 'idcardNumber'
				// },
				{
					label: '米融分',
					width:120,
					prop: 'riskNum'
				}, {
					label: '风控类型',
					width: 100,
					prop: 'riskType',
					render:row =>{ // 排序
						const data = filter.riskType(row.riskType)
						return data
					}
				}, {
					label: '申请期限',
					width: 100,
					prop: 'applyTerm'
				}, {
					label: '申请金额',
					width: 100,
					prop: 'applyMoney'
				}, {
					label: '服务费',
					prop: 'serviceMoney'
				}, {
					label: '放款金额',
					width: 100,
					prop: 'loanMoney'
				}, {
					label: '应还金额',
					width: 100,
					prop: 'repaymentMoney'
				}, {
					label: '部分还款',
					width: 100,
					prop: 'reductionAmount'
				}, {
					label: '减免金额',
					width: 100,
					prop: '',
					render: row => {
						// 减免金额 = 应还金额 - 目前应还金额 - 部分还款
						const t = parseFloat(row.repaymentMoney) - parseFloat(row.realRepayMoney) - parseFloat(row.reductionAmount)
						return t
					}
				}, {
					label: '目前应还',
					width: 100,
					prop: 'realRepayMoney',
					render: row =>{
						return row.realRepayMoney === null ? 0 :row.realRepayMoney
					}
				}, {
					label: '约定还款日',
					width: 120,
					prop: 'finalDate'
				},{
					label: '记录延期时间',
					prop: 'recordDelay',
					width:200,
					render: row => {
						if (row.recordDelay && row.recordDelay !== null && row.recordDelay.length>0){
							const b = row.recordDelay.map((item, index) => {
								if (index + 1 - row.recordDelay.length === 0) {
									return item
								}else{
									return <span>{ item }<span className="theme-blue">{'---'}</span></span>
								}
							})
							return b
						}else{
							return ''
						}
					}
				},
				// {
				// 	label: '借款次数',
				// 	prop: 'loanTerm'
				// }, {
				// 	label: '申请时间',
				// 	prop: 'upt',
				// 	width: 120,
				// 	render: row => {
				// 		const date = timeDate.time(row.upt, 'yyyy-MM-dd hh:mm:ss')
				// 		return date
				// 	}
				// }, {
				// 	label: '审核客服',
				// 	prop: 'examineCustomerName'
				// }, {
				// 	label: '审核时间',
				// 	prop: 'examineDate',
				// 	width:120,
				// 	render: row => {
				// 		const date = timeDate.time(row.examineDate, 'yyyy-MM-dd hh:mm:ss')
				// 		return date
				// 	}
				// }, {
				// 	label: '打款状态',
				// 	prop: 'payStatus',
				// 	render: row => {
				// 		const data = filter.payStatus(row.payStatus)
				// 		return data
				// 	}
				// },
				{
					label: '银行名称',
					width: 180,
					prop: 'bankName'
				}, {
					label: '银行卡号',
					width: 220,
					prop: 'bankNumber'
				}, {
					label: '订单类型',
					width: 100,
					prop: 'loanTerm', // 等于0 为新客  大于0 为老客
					render: row => {
						const data = filter.loanTer(row.loanTerm)
						return data
					}
				}, {
					label: '续期订单',
					width: 100,
					prop: 'orderType',
					render: row =>{
						return filter.loanTyp(row.orderType)
					}
				}, {
					label: '是否逾期',
					width: 100,
					prop: 'overType',
					render: row =>{
						return row.overType ? '是': '否'
					}
				}, {
					label: '操作',
					fixed: 'right',
					width:200,
					render: row => {
							return (
								<div className="flex flex-direction_row">
									<Button className="margin_right10" type="primary" size="mini" onClick={ this.openDialog.bind(this,row) }>
										{'还款'}
									</Button>
									<Button className="margin_right10" type="success" size="mini" onClick={ this.openDialog2.bind(this,row) }>
										{'代扣'}
									</Button>
									<DetailBtn linkTo={ dwaitHuan } row={ row } />
								</div>
							)
					}
      }]
		}
	}
	componentWillMount() {
		this.props.initSearch()
		window.sessionStorage.removeItem('locationState')
		window.sessionStorage.removeItem('detailList')
  }
  componentDidMount() {
		this.props.selectPendingRepay()
		const sess = {
			name: '申请信息',
			title: '待还款',
			url: '/finance/waitHuan'
		}
		window.sessionStorage.setItem('locationState', JSON.stringify(sess))
		// this.props.findAllDelayRate()
		this.getNewData('2019-08-09', 2)
	}
	getNewData = (dateTemp, days) => {
		const dateT = dateTemp.split('-')
		const nDate = new Date(dateT[1] + '-' + dateT[2] + '-' + dateT[0]) //转换为MM-DD-YYYY格式
		const millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000)
		const rDate = new Date(millSeconds)
		const year = rDate.getFullYear()
		let month = rDate.getMonth() + 1
		if (month < 10) month = '0' + month
		let date = rDate.getDate()
		if (date < 10) date = '0' + date
		return (year + '-' + month + '-' + date)
	}
  handleSearch = e => {
    e.preventDefault()
    this.props.selectPendingRepay()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.selectPendingRepay()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.selectPendingRepay()
	}
	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
		if (key === 'dayValue'){
			const day = this.props.dayList.filter(item => item.id === value)
			const reM = math.round(day[0].delayRate * this.state.applyMoney * day[0].dayNum, 2)
			this.setState({
				delayRate: day[0].delayRate,
				reMoney: reM,
				delayNumber: day[0].dayNum
			})
		}
	}
	onChange2(key, value) {
		this.setState({
			form2: Object.assign({}, this.state.form2, { [key]: value })
		})
		if (key === 'delayId') {
			const day = this.props.dayList.filter(item => item.id === value)
			const reM = math.round(day[0].delayRate * this.state.applyMoney * day[0].dayNum, 2)
			const xuD = this.getNewData(this.state.finalDate, day[0].dayNum)
			this.setState({
				xuMoney: reM,
				xuDay: xuD
			})
		}
	}
	openDialog = obj => {
		const time = new Date()
		const t = timeDate.time(time, 'yyyy-MM-dd')
		const adm = JSON.parse(window.sessionStorage.getItem('adminInfo'))
		console.log(adm.rePay)
		if (adm.rePay === false) {
			if (t < obj.finalDate) {
				MessageBox.confirm('非常抱歉当前订单没有到还款日不能进行线下操作 请你联系技术人员，和让客户在APP操作还款或续期!', '提示', {
					type: 'warning'
				}).then(() => {

				}).catch(() => {

				})
				return false
			}
		}
		this.setState({
			listObj: obj,
			channelName: obj.channelName,
			dialogVisible: true,
			orderId: obj.id,
			orderNumber: obj.orderNumber, // 订单号
			realRepaymentMoney: obj.realRepaymentMoney, // 应还金额
			applyMoney: obj.applyMoney, // 借款金额
			reMoney: obj.applyMoney, // 延期金额
			serviceMoney: obj.serviceMoney, // 服务费
			loanDate: obj.loanDate, // 放款时间
			finalDate: obj.finalDate, // 约定还款日
			// type:''
		})
		this.tabClick('1')
		this.form.resetFields()
		this.findRepaymentMoney(obj.id)
	}
	saveContent = e => {
		e.preventDefault()
		this.form.validate((valid) => {
			if (valid) {
				const obj = {}
				const { activeName, form, orderId, delayNumber, delayRate, reMoney } = this.state
				// if (type === ''){
				// 	Message.warning('请选择线下还是线上！')
				// 	return false
				// }
				for(const a in form){
					if (form[a]){
						obj[a] = form[a]
					}
				}

				const adminObj = JSON.parse(window.sessionStorage.getItem('adminInfo'))
				const data = Object.assign({}, obj, {orderId:orderId},{adminName:adminObj.adminName})
				if(activeName === '1'){ // 还款
				 	// const huan = Object.assign({}, data,{type:type})
					this.props.updateStateComplete(data)
				} else if (activeName === '2') { // 延期
					 // const trans = Object.assign({},data,{delayNumber:delayNumber},{delayRate:delayRate},{reMoney:reMoney},{type:type})
					const trans = Object.assign({},data,{delayNumber:delayNumber},{delayRate:delayRate},{reMoney:reMoney})
				 	this.props.updateStateDelay(trans)
				} else { // 减免
				 	this.props.updateStateReduction(data)
				}
				this.setState({
					dialogVisible: false
				})
			} else {
				console.log('error submit!!')
				return false
			}
		})
	}
	saveContent2 = e => { // 代扣
		e.preventDefault()
		// console.log(this.state.form2)
		this.form2.validate((valid) => {
			if (valid) {
				const { form2, orderId, type } = this.state
				const obj = {}
				for(const a in form2){
					if (type === 1){
						form2['delayId'] = null
					}
					if(form2[a]){
						obj[a] = form2[a]
					}
				}
				const data = Object.assign({}, obj, {orderId:orderId},{type:type})
				this.props.deductionFee(data)
				this.setState({
					dialogVisible: false
				})
			} else {
				console.log('error submit!!')
				return false
			}
		})
	}
	tabClick = v => {
		this.setState({
			activeName: v
		})
		this.form.resetFields()
		if(v === '2'){
			this.props.findAllDelayRate(this.state.channelName)
		}
	}
	findRepaymentMoney = async (id) => {
		const res = await api.findRepaymentMoneyApi({id:id})
		if(res.success){
			this.setState({
				surplusMoney: res.data
			})
		}else{
			Message.error(res.msg)
		}
	}
	valiNum = num => {
		if(num<0){
			Message.warning('金额不能为负数')
		}
	}
	// blurMoney1 = () => {
	// 	const { listObj, form } = this.state
	// 	const n = listObj.realPrincipal - form.principalReductionMoney
	// 	if(n<0){
	// 		this.setState({
	// 			form:{
	// 				principalReductionMoney:listObj.realPrincipal
	// 			}
	// 		})
	// 	}
	// }
	onTypeChange = v => {
		this.setState({
			type:v
		})
	}
	openDialog2 = obj => {
		const time = new Date()
		const t = timeDate.time(time, 'yyyy-MM-dd')
		if (t < obj.finalDate) {
			MessageBox.confirm('非常抱歉当前订单没有到还款日不能进行线下操作 请你联系技术人员，和让客户在APP操作还款或续期!', '提示', {
				type: 'warning'
			}).then(() => {

			}).catch(() => {

			})
			return false
		}
		this.setState({
			listObj: obj,
			channelName: obj.channelName,
			dialogVisible2: true,
			orderId: obj.id,
			orderNumber: obj.orderNumber, // 订单号
			realRepaymentMoney: obj.realRepaymentMoney, // 应还金额
			applyMoney: obj.applyMoney, // 借款金额
			reMoney: obj.applyMoney, // 延期金额
			serviceMoney: obj.serviceMoney, // 服务费
			loanDate: obj.loanDate, // 放款时间
			finalDate: obj.finalDate, // 约定还款日
			realName: obj.realName,
			phone:obj.phone,
			type: 1,
			xuMoney:0,
			xuDay:obj.finalDate
		})
		this.form2.resetFields()
		this.findRepaymentMoney(obj.id)
		this.props.findAllDelayRate(obj.channelName)
	}
	render() {
		const { list, btnLoading, dayList } = this.props
		const { columns, dialogVisible, form, rules, orderNumber, realRepaymentMoney, applyMoney, serviceMoney, loanDate, finalDate, activeName, surplusMoney, reMoney, listObj, dialogVisible2, form2, rules2,realName,phone,xuMoney,type, xuDay } = this.state
		return (
			<div>
				<Search showSelect2 showLoanType showSelectClient showSelectTime>
					<Form.Item>
						<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
					</Form.Item>
					<Form.Item>
						<Button onClick={ this.props.exportPendingRepay } type="primary">{'导出列表'}</Button>
					</Form.Item>
				</Search>
				<Loading loading={ list.loading }>
					<Table
						style={ { width: '100%' } }
						columns={ columns }
						data={ list.data }
						border
						stripe
					/>
				</Loading>
        <MyPagination
          onSizeChange={ this.sizeChange }
          onCurrentChange={ this.onCurrentChange }
        />
				<Dialog
					title="线下还款"
					visible={ dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<Tabs activeName={ activeName } onTabClick={ (tab) => this.tabClick(tab.props.name) }>
							<Tabs.Pane label="还款" name="1"></Tabs.Pane>
							<Tabs.Pane label="延期" name="2"></Tabs.Pane>
							{/* <Tabs.Pane label="部分还款" name="3"></Tabs.Pane> */}
							<Tabs.Pane label="减免" name="3"></Tabs.Pane>
						</Tabs>
						{
							(activeName === '1' || activeName === '2') &&
							<ul className="flex flex-direction_column margin-bottom15">
								<li className="flex flex-direction_row justify-content_flex-justify ptb5">
									<p>{'订单号:'}{ orderNumber }</p>
								</li>
								<li className="flex flex-direction_row justify-content_flex-justify ptb5">
									<p>{'应还金额:'}{ realRepaymentMoney }</p>
									<p>{'借款金额:'}{ applyMoney }</p>
								</li>
								<li className="flex flex-direction_row justify-content_flex-justify ptb5">
									<p>{'服务费:'}{ serviceMoney }</p>

									<p>{'借款期限:'}{ timeDate.time(loanDate, 'yyyy-MM-dd hh:mm:ss') }{'-'}{ finalDate }</p>
								</li>
								<li className="flex flex-direction_row justify-content_flex-justify ptb5">
									{/* 剩余应还=剩余应还-还款金额 */}
									<p className="red">{'剩余应还:'}{ surplusMoney-form.repaymentMoney }
										{this.valiNum(surplusMoney-form.repaymentMoney)}
									</p>
									{/* 延期天数中的百分比 * 借款金额*天数 = 延期金额 */}
									{
										activeName === '2' &&
										<p>{'延期金额:'}{ reMoney }</p>
									}
								</li>
							</ul>
						}
						{
							(activeName === '3') &&
							<ul className="flex flex-direction_column margin-bottom15">
								<li className="flex flex-direction_row justify-content_flex-justify ptb5">
									<p>{'应还金额:'}{ realRepaymentMoney }</p>
								</li>
								<li className="flex flex-direction_row justify-content_flex-justify ptb5">
									<p className="red">{'剩余应还:'}{ surplusMoney-form.repaymentMoney }
										{this.valiNum(surplusMoney-form.repaymentMoney)}
									</p>
									{/* （应还-本金减免-利息-逾期-服务费=本金结算） */}
									<p>{'本金结算:'}{ surplusMoney-form.principalReductionMoney-form.rateReductionMoney-form.overdueReductionMoney-form.serviceReductionMoney }</p>
									{this.valiNum(surplusMoney-form.principalReductionMoney-form.rateReductionMoney-form.overdueReductionMoney-form.serviceReductionMoney)}
								</li>
							</ul>
						}
						<Form labelWidth="110" ref={ e => {this.form=e} } model={ form } rules={ rules }>
							<Form.Item label="还款方式" prop="repaymentType">
								<SelectPicker
									value={ form.repaymentType }
									clearable={ 1 }
									onChange={ this.onChange.bind(this, 'repaymentType') }
									options={ REPAYMENT_TYPE }
									placeholder={ '选择还款方式' }
								/>
							</Form.Item>
							{
								activeName === '1' &&
								<Form.Item label="还款金额" prop="repaymentMoney">
									<Input type="number" value={ form.repaymentMoney } onChange={ this.onChange.bind(this, 'repaymentMoney') } />
								</Form.Item>
							}
							{
								activeName === '2' &&
								<Form.Item label="延期天数" prop="dayValue">
									<SelectDay value={ form.dayValue } options={ dayList } onChange={ this.onChange.bind(this, 'dayValue') }/>
								</Form.Item>
							}
							{
								(activeName === '3') &&
								<div className="flex flex-direction_row justify-content_flex-justify">
									<Form.Item label="减免本金" prop="principalReductionMoney">
										<Input type="number" value={ form.principalReductionMoney } onChange={ this.onChange.bind(this, 'principalReductionMoney') } onBlur={ this.blurMoney1 } />
									</Form.Item>
									<Form.Item label="本金">
											<p>{ listObj.realPrincipal-form.principalReductionMoney }</p>
											{this.valiNum(listObj.realPrincipal-form.principalReductionMoney)}
									</Form.Item>
								</div>
							}
							{
								(activeName === '3') &&
								<div className="flex flex-direction_row justify-content_flex-justify">
									<Form.Item label="减免利息" prop="rateReductionMoney">
										<Input type="number" value={ form.rateReductionMoney } onChange={ this.onChange.bind(this, 'rateReductionMoney') } />
									</Form.Item>
									<Form.Item label="利息">
											<p>{ listObj.realRateMoney-form.rateReductionMoney }</p>
											{this.valiNum(listObj.realRateMoney-form.rateReductionMoney)}
									</Form.Item>
								</div>
							}
							{
								(activeName === '3') &&
								<div className="flex flex-direction_row justify-content_flex-justify">
									<Form.Item label="减免逾期" prop="overdueReductionMoney">
										<Input type="number" value={ form.overdueReductionMoney } onChange={ this.onChange.bind(this, 'overdueReductionMoney') } />
									</Form.Item>
									<Form.Item label="逾期">
											{/* <p>{ listObj.realOverdueMoney-form.overdueReductionMoney }</p>
											{this.valiNum(listObj.realOverdueMoney-form.overdueReductionMoney)} */}
											<p>{ listObj.overdueRealMoney !== null ? listObj.overdueRealMoney : 0 }</p>
									</Form.Item>
								</div>
							}
							{
								(activeName === '3') && listObj.deductionMethod===false &&
								<div className="flex flex-direction_row justify-content_flex-justify">
									<Form.Item label="减免服务费" prop="serviceReductionMoney">
										<Input type="number" value={ form.serviceReductionMoney } onChange={ this.onChange.bind(this, 'serviceReductionMoney') } />
									</Form.Item>
									<Form.Item label="服务费">
											<p>{ listObj.realServiceMoney-form.serviceReductionMoney }</p>
											{this.valiNum(listObj.realServiceMoney-form.serviceReductionMoney)}
									</Form.Item>
								</div>
							}
							<Form.Item label="单号" prop="payNumber">
								<Input value={ form.payNumber } onChange={ this.onChange.bind(this, 'payNumber') } />
							</Form.Item>
							{/* {
								activeName !== '3' &&
								<Form.Item label="">
									<Radio.Group value={ type } onChange={ e=> this.onTypeChange(e) } >
										<Radio value={ 'ONDERLINE' }>{'线下'}</Radio>
										<Radio value={ 'ONLINE' }>{'线上'}</Radio>
									</Radio.Group>
								</Form.Item>
							} */}
						</Form>
					</Dialog.Body>
					<Dialog.Footer className="dialog-footer">
						<Button onClick={ () => this.setState({ dialogVisible: false }) }>{'取 消'}</Button>
						<Button type="primary" onClick={ this.saveContent } loading={ btnLoading }>{'确 定'}</Button>
					</Dialog.Footer>
				</Dialog>
				<Dialog
					title="代扣"
					visible={ dialogVisible2 }
					onCancel={ () => this.setState({ dialogVisible2: false }) }
				>
					<Dialog.Body>
							<ul className="flex flex-direction_row">
								<li style={ {width:'36%'} }>
									<p className="ptb5">{'订单号: '}{ orderNumber }</p>
									<p className="ptb5">{'借款金额: '}{ applyMoney }</p>
								</li>
								<li className="flex_1">
									<p className="ptb5">{'姓名: '}{realName}</p>
									<p className="ptb5">{'服务费: '}{ serviceMoney }</p>
								</li>
								<li className="flex_1">
									<p className="ptb5">{'手机号码: '}{phone}</p>
									<p className="ptb5">{'应还金额: '}{ realRepaymentMoney }</p>
								</li>
							</ul>
							<p className="ptb5">{'借款期限: '}{ timeDate.time(loanDate, 'yyyy-MM-dd hh:mm:ss') }{'-'}{ finalDate }</p>
							<p className="red ptb5">{'剩余应还: '}{ surplusMoney-form.repaymentMoney }
								{this.valiNum(surplusMoney-form.repaymentMoney)}
							</p>
						<Form labelWidth="110" ref={ e => {this.form2=e} } model={ form2 } rules={ rules2 }>
							<Form.Item label="代扣方式">
								<Radio.Group value={ type } onChange={ e => this.onTypeChange(e) }>
									<Radio value={ 1 }>{'到期还款'}</Radio>
									<Radio value={ 2 }>{'到期续期'}</Radio>
								</Radio.Group>
							</Form.Item>
							{
								type === 2 &&
								<div>
									<Form.Item label="延期天数" prop="delayId">
										<SelectDay value={ form2.delayId } options={ dayList } onChange={ this.onChange2.bind(this, 'delayId') }/>
									</Form.Item>
									<Form.Item label="续期金额">
										{ xuMoney }
									</Form.Item>
									<Form.Item label="下期应还日">
										{ xuDay }
									</Form.Item>
								</div>
							}
						</Form>
					</Dialog.Body>
					<Dialog.Footer className="dialog-footer">
						<Button onClick={ () => this.setState({ dialogVisible2: false }) }>{'取 消'}</Button>
						<Button type="primary" onClick={ this.saveContent2 } loading={ btnLoading }>{'确 定'}</Button>
					</Dialog.Footer>
				</Dialog>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { list, btnLoading, dayList } = state
	return { list, btnLoading, dayList }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({sizeChange, currentChange, initSearch, selectPendingRepay, updateStateComplete, updateStateDelay,findAllDelayRate, updateStateReduction, deductionFee,exportPendingRepay }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(WaitHuan)
