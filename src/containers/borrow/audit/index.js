import React, { Component } from 'react'
import { Button, Table, Loading,Form,Dialog, Message } from 'element-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { handelSearch, handelAudit } from './action'
import MyPagination from '@components/MyPagination'
import Search from '@components/Search'
import DetailBtn from '@components/DetailBtn'
import { daudit } from '@meta/details'
import { FALSE, PENDING_LOAN } from '@meta/state'
import filter from '@global/filter'
import timeDate from '@global/timeDate'
import api from '@api/index'
// import store from '@redux/store'
class Audit extends Component{
	static propTypes = {
		list: PropTypes.object.isRequired,
		sizeChange: PropTypes.func.isRequired,
		currentChange: PropTypes.func.isRequired,
		initSearch: PropTypes.func.isRequired,
		handelSearch: PropTypes.func.isRequired,
		handelAudit: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props)
		// 监听state状态改变
		// store.subscribe(() => {
		// 	console.log('更新')
		// 	const state = store.getState()
		// 	console.log(state)
		// })
		this.state = {
			contactUrl:'',
			phoneUrl:'',
			reportUrl:'',
			dialogVisible:false,
			columns: [{
						label: '#',
						width: 60,
						fixed: 'left',
						render: (a, b, c) => {
							return c + 1
						}
					}, {
					label: '订单号',
					prop: 'orderNumber',
					width:200,
					fixed: 'left'
				}, {
					label: '渠道名称',
					width: 120,
					prop: 'channelName'
				}, {
					label: '新老客户',
					width: 100,
					prop: 'loanTerm',
					render: row => {
						const text = filter.loanTerm(row.loanTerm)
						return text
					}
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
					label: '米融分',
					width:100,
					prop: 'riskNum'
				}, {
					label: '手机号码',
					width: 140,
					prop: 'phone',
					render: row => {
						if (row.phone) {
							return row.phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')
						}
					}
				}, {
					label: '身份证号',
					width: 200,
					prop: 'idcardNumber',
					render: row => {
						if (row.idcardNumber) {
							return row.idcardNumber.replace(/^(\d{3})\d{8}(\d+)/, '$1****$2')
						}
					}
				}, {
					label: '申请金额',
					width: 100,
					prop: 'applyMoney'
				}, {
					label: '申请期限',
					width: 100,
					prop: 'applyTerm'
				}, {
					label: '服务费',
					prop: 'serviceMoney'
				}, {
					label: '借款次数',
					width: 100,
					prop: 'loanTerm'
				}, {
					label: '申请时间',
					width: 190,
					prop: 'gmt',
					render: row => {
						const date = timeDate.time(row.gmt, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '审核建议',
					width: 100,
					prop: 'toExamine',
					render: row => {
						// 2:通过，3:拒绝
						const y = <span className="theme-blue">{'通过'}</span>
						const n = <span className="dis-red">{'拒绝'}</span>
						if (row.toExamine){
							// return row.toExamine === 'noPass' ? n : y
							if (row.toExamine === '2'){
								return y
							}else{
								return n
							}
						}else{
							return ''
						}
					}
				}, {
					label: '操作',
					fixed: 'right',
					width:180,
					render: row => {
						// return (
						// 	<div className="flex flex-direction_row">
						// 		<Button className="margin_right10" type="success" size="mini" onClick={ this.openDialog.bind(this,row.id,row.userId) }>
						// 			{'审核'}
						// 		</Button>
						// 		<DetailBtn linkTo={ daudit } row={ row } />
						// 	</div>
						// )
						return (
							<div className="flex flex-direction_row">
								<Button className="margin_right10" type="success" size="mini"
									onClick={ this.handelAudit.bind(this,PENDING_LOAN,row.id) }
								>
									{'通过'}
								</Button>
								<Button className="margin_right10" type="danger" size="mini"
									onClick={ this.handelAudit.bind(this,FALSE,row.id) }
								>
									{'拒绝'}
								</Button>
								<DetailBtn linkTo={ daudit } row={ row } />
							</div>
						)
					}
      }]
		}
	}
	componentWillMount() {
		this.props.initSearch()
	}
  componentDidMount() {
		this.props.handelSearch()
	}
	openDialog = async (id, userId) => {
		const res = await api.selectUserInformationByIdApi({id:userId})
		if (res.success) {
			this.setState({
				dialogVisible: true,
				id: id,
				contactUrl: res.data.contact_url,
				phoneUrl: res.data.phone_url,
				reportUrl: res.data.report_url,
			})
		} else {
			Message.warning(res.msg)
		}
	}
	handelAudit(state,id) {
		const obj = JSON.parse(window.sessionStorage.getItem('adminInfo'))
		const xid = id ? id : this.state.id
		const trans = {
			id:xid,
			state:state,
			adminId: obj.id
		}
		this.setState({
			dialogVisible:false
		})
		this.props.handelAudit(trans)
	}
	handleSearch = e => {
		e.preventDefault()
		this.props.handelSearch()
	}
	sizeChange = e => {
		this.props.sizeChange(e)
		this.props.handelSearch()
	}
	onCurrentChange = e => {
		this.props.currentChange(e)
		this.props.handelSearch()
	}
	render() {
		const { list } = this.props
		const { dialogVisible,contactUrl,phoneUrl,reportUrl } = this.state
		return (
			<div>
				<Search showSelect2 showTime showChannel showPass>
					<Form.Item>
						<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
					</Form.Item>
					<Form.Item />
				</Search>
				<Loading loading={ list.loading }>
					<Table
						style={ { width: '100%' } }
						columns={ this.state.columns }
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
					visible={ dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<a className="theme-blue" href={ contactUrl } target="_blank" rel="noopener noreferrer">{'通讯录/短信'}</a>
						<a className="theme-blue margin_left15" href={ phoneUrl } target="_blank" rel="noopener noreferrer">{'通话明细'}</a>
						<a className="theme-blue margin_left15" href={ reportUrl } target="_blank" rel="noopener noreferrer">{'报告'}</a>
					</Dialog.Body>
					<Dialog.Footer className="dialog-footer">
						<Button className="margin_right10" onClick={ () => this.setState({ dialogVisible: false }) }>{'取 消'}</Button>
						<Button className="margin_right10" type="danger"
							onClick={ this.handelAudit.bind(this,FALSE) }
						>
							{'拒绝'}
						</Button>
						<Button className="margin_right10" type="success"
								onClick={ this.handelAudit.bind(this,PENDING_LOAN) }
						>
								{'通过'}
						</Button>
					</Dialog.Footer>
				</Dialog>
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
		...bindActionCreators({ sizeChange, currentChange, initSearch, handelSearch, handelAudit }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Audit)