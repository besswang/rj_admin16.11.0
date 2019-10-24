import React, { Component } from 'react'
import { Button, Table, Loading, Form, Input, Message } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch, saveList, menuActive,tabAdd} from '@redux/actions'
import { handelSearch, updateUserType, exportUser, addUserBlack, removeUserBlack } from './action'
import DisableBtn from '@components/DisableBtn'
import MyPagination from '@components/MyPagination'
import Search from '@components/Search'
import DetailBtn from '@components/DetailBtn'
import timeDate from '@global/timeDate'
import { dmlist } from '@meta/details'
import filter from '@global/filter'
// import { Link } from 'react-router-dom'
class Mlist extends Component{
	static propTypes = {
		location: PropTypes.object.isRequired,
		list: PropTypes.object.isRequired,
		sizeChange: PropTypes.func.isRequired,
		currentChange: PropTypes.func.isRequired,
		initSearch: PropTypes.func.isRequired,
		handelSearch: PropTypes.func.isRequired,
		updateUserType: PropTypes.func.isRequired,
		exportUser: PropTypes.func.isRequired,
		addUserBlack: PropTypes.func.isRequired,
		removeUserBlack: PropTypes.func.isRequired,
		saveList: PropTypes.func.isRequired,
		menuActive: PropTypes.func.isRequired,
		tabAdd: PropTypes.func.isRequired,
		// btnLoading: PropTypes.bool.isRequired
	}
	constructor(props) {
		super(props)
		this.state = {
			form:{
				minScore:'', // 最小分控分
				maxScore:'' // 最大分控分
			},
			columns: [{
						label: '#',
						width: 60,
						fixed:'left',
						render: (a, b, c) => {
							return c + 1
						}
					}, {
					label: '渠道名称',
					prop: 'channelName',
					width:120,
					fixed: 'left'
				}, {
					label: '真实姓名',
					prop: 'realName',
					width:100,
					fixed: 'left',
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
				},{
					label: '手机号码',
					prop: 'phone',
					width:140,
					render: row => {
						if (row.phone) {
							return row.phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')
						}
					}
				},{
					label: '身份证号',
					prop: 'idNumber',
					width:200,
					render: row => {
						if (row.idNumber) {
							return row.idNumber.replace(/^(\d{3})\d{8}(\d+)/, '$1****$2')
						}
					}
				},{
					label: '授信额度',
					width: 100,
					prop: 'loanQuota'
				}, {
					label: '米融分',
					width:100,
					prop: 'thresholdScore'
				}, {
					label:'身份证认证',
					width:120,
					prop: 'idcardType',
					render: row => {
						return this.textType(row.idcardType)
					}
				}, {
					label: '个人信息认证',
					prop: 'personalType',
					width: 140,
					render: row => {
						return this.textType(row.personalType)
					}
				}, {
					label: '运营商认证', // 手机认证
					prop: 'mobileType',
					width: 120,
					render: row => {
						return this.textType(row.mobileType)
					}
				}, {
					label: '银行卡认证',
					prop: 'bankType',
					width: 120,
					render: row => {
						return this.textType(row.bankType)
					}
				}
				// {
				// 	label: '认证参数',
				// 	prop: 'authentype',
				// 	render: row => {
				// 		// authentype: ["COMPLETED", "COMPLETED", "COMPLETED", "COMPLETED"]
				// 		const text = []
				// 		if (row.authentype){
				// 			row.authentype.map(item => {
				// 				if (item === 'COMPLETED') {
				// 					text.push('red')
				// 				} else {
				// 					text.push('')
				// 				}
				// 				return text
				// 			})
				// 		}
				// 		return (
				// 			<div>
				// 				<span className={ text[0] }>{'身'}</span>{'、'}
				// 				<span className={ text[1] }>{'个'}</span>{'、'}
				// 				<span className={ text[2] }>{'手'}</span>{'、'}
				// 				<span className={ text[3] }>{'银'}</span>
				// 			</div>
				// 		)
				// 	}
				// }
				, {
					label: '支付宝认证',
					prop: 'alipayType',
					width: 120,
					render: row => {
						return this.textType(row.alipayType)
					}
				}, {
					label: '支付宝认证账号',
					prop: 'alipayNum',
					width: 200
				}, {
					label: '借款次数',
					width: 100,
					prop: 'loanNum'
				}, {
					label: '注册时间',
					prop: 'gmt',
					width:200,
					render: row => {
						const date = timeDate.time(row.gmt, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '登陆IP',
					prop: 'loginIp',
					width:160,
				}, {
					label: '登陆次数',
					width: 100,
					prop: 'loanNum'
				},{
					label: '手机机型',
					width: 100,
					prop: 'appType'
				}, {
					label: '风控等级',
					width: 100,
					prop: 'riskGrade'
				}, {
					label: '风控建议',
					width: 100,
					prop: 'toExamine',
					render: row => {
						// 2:通过，3:拒绝
						const y = <span className="theme-blue">{'通过'}</span>
						const n = <span className="dis-red">{'拒绝'}</span>
						if (row.toExamine){
							// return row.toExamine === 'noPass' ? n : y
							if (row.toExamine === '2') {
								return y
							} else {
								return n
							}
						}else{
							return ''
						}
					}
				}, {
				 	label: '黑名单',
					fixed:'right',
					 render: row => {
						 return (
							 <DisableBtn
									value={ row.blackStatus }
									result={ 0 }
									onClick={ this.userBlack.bind(this, row) }
									text={ ['添加','移除'] }
								/>
						 )
					 }
				},{
					label: '操作',
					fixed: 'right',
					width:160,
					render: row => {
						return (
							<div className="flex flex-direction_row">
								<DisableBtn
									value={ row.type }
									result={ 0 }
									onClick={ this.updateUserType.bind(this, row) }
									text={ ['启用','禁用'] }
								/>
								<DetailBtn linkTo={ dmlist } row={ row } />
								{/* <Link to={ '/member/report' } className="margin_left15">
									<Button type="text" size="small" onClick={ this.props.saveList.bind(this,row) }>{ '报告' }</Button>
								</Link> */}
							</div>
						)
					}
      }],
			data: []
		}
	}
	componentWillMount() {
		this.props.initSearch()
		this.props.menuActive(this.props.location.pathname)
		window.sessionStorage.removeItem('locationState')
		window.sessionStorage.removeItem('detailList')
		console.log(process.env)
		console.log(process.env.PUBLIC_URL)

	}
	componentDidMount() {
		this.props.handelSearch()
		const sess = {
			name: '用户信息',
			title: '会员列表',
			url: '/member/mlist'
		}
		window.sessionStorage.setItem('locationState', JSON.stringify(sess))
		this.props.tabAdd({
			name: '会员列表',
			url: '/member/mlist'
		})
	}
	handleSearch = e => {
		e.preventDefault()
		const { form } = this.state
		if (form.minScore !=='' || form.maxScore!==''){
			if (form.minScore !== '' && form.maxScore ===''){
				Message.warning('请输入最大分控')
				return false
			}
			if (form.minScore === '' && form.maxScore !== '') {
				Message.warning('请输入最小分控')
				return false
			}
			if (parseFloat(form.minScore) > parseFloat(form.maxScore)) {
				Message.warning('最小分控分不能大于最大分控分')
				return false
			}
			this.props.handelSearch(this.state.form)
		}else{
			this.props.handelSearch()
		}



	}
	sizeChange = e => {
		this.props.sizeChange(e)
		this.props.handelSearch()
	}
	onCurrentChange = e => {
		this.props.currentChange(e)
		this.props.handelSearch()
	}
	updateUserType(r) {
		this.props.updateUserType({id: r.id, type: r.type})
	}
	// 黑名单 idCard，phone,realName
	userBlack(r){
		if(r.blackStatus === 0){ // 添加
			const trans = {
				idCard: r.idNumber,
				phone: r.phone,
				realName: r.realName
			}
			this.props.addUserBlack(trans)
		} else { // 移除
			this.props.removeUserBlack({phone: r.phone})
		}
	}
	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
	}
	textType = x => {
		const t = filter.personalType(x)
		if (x === 'COMPLETED') {
			return <span className="g-border">{t}</span>
		} else {
			return <span className="r-border">{t}</span>
		}
	}
	render() {
		const { list } = this.props
		const { form } = this.state
		return (
			<div>
				<Search showSelect1 showTime>
					{/* <div> */}
						<Form.Item>
							<Input value={ form.minScore } onChange={ this.onChange.bind(this, 'minScore') } placeholder="请输入分控分(最小)" />
						</Form.Item>
						<Form.Item>{'~'}</Form.Item>
						<Form.Item>
							<Input value={ form.maxScore } onChange={ this.onChange.bind(this, 'maxScore') } placeholder="请输入分控分(最大)" />
						</Form.Item>
						<Form.Item>
							<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
						</Form.Item>
						<Form.Item>
							<Button onClick={ this.props.exportUser } type="primary">{'导出列表'}</Button>
						</Form.Item>
					{/* </div> */}
				</Search>

				<Loading loading={ list.loading }>
					<Table
					style= { { width: '100%' } }
					columns= { this.state.columns }
					data= { list.data }
					border
					stripe
					/>
				</Loading>
				<MyPagination
					onSizeChange={ this.sizeChange }
					onCurrentChange={ this.onCurrentChange }
				/>
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
		...bindActionCreators({ sizeChange, currentChange, initSearch, handelSearch, updateUserType, exportUser, addUserBlack, removeUserBlack, saveList, menuActive, tabAdd}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Mlist)
