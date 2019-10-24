import React, { Component } from 'react'
import { Button, Table, Loading,Form,Dialog, Message,Tabs } from 'element-react'
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
			activeName: '1',
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
					prop: 'realName'
				}, {
					label: '米融分',
					width:100,
					prop: 'riskNum'
				}, {
					label: '手机号码',
					width: 140,
					prop: 'phone'
				}, {
					label: '身份证号',
					width: 200,
					prop: 'idcardNumber'
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
						const y = <span className="theme-blue">{'通过'}</span>
						const n = <span className="dis-red">{'不通过'}</span>
						if (row.toExamine){
							return row.toExamine === 'noPass' ? n : y
						}else{
							return ''
						}
					}
				}, {
					label: '操作',
					fixed: 'right',
					width:180,
					render: row => {
						return (
							<div className="flex flex-direction_row">
								<Button className="margin_right10" type="success" size="mini" onClick={ this.openDialog.bind(this,row.id) }>
									{'审核'}
								</Button>
								<DetailBtn linkTo={ daudit } row={ row } />
							</div>
						)
						// return (
						// 	<div className="flex flex-direction_row">
						// 		<Button className="margin_right10" type="success" size="mini"
						// 			onClick={ this.handelAudit.bind(this,row.id, PENDING_LOAN) }
						// 		>
						// 			{'通过'}
						// 		</Button>
						// 		<Button className="margin_right10" type="danger" size="mini"
						// 			onClick={ this.handelAudit.bind(this,row.id, FALSE) }
						// 		>
						// 			{'拒绝'}
						// 		</Button>
						// 		<DetailBtn linkTo={ daudit } row={ row } />
						// 	</div>
						// )
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
	openDialog = async(id) => {
		const res = await api.selectUserInformationByIdApi({id:11216})
		if (res.success) {
			this.setState({
				activeName:'1',
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
	handelAudit(state) {
		const obj = JSON.parse(window.sessionStorage.getItem('adminInfo'))
		const trans = {
			id:this.state.id,
			state:state,
			adminId: obj.id
		}
		console.log(trans)
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
		const { dialogVisible,activeName,contactUrl,phoneUrl,reportUrl } = this.state
		return (
			<div>
				<Search showSelect2 showTime>
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
					size="large"
					visible={ dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<Tabs activeName={ activeName }>
							<Tabs.Pane label="联系人" name="1">
								<iframe src={ contactUrl } frameborder="0" title="联系人" allowtransparency="true" style={ {'backgroundColor':'transparent'} } width="100%" height="400" />
							</Tabs.Pane>
							<Tabs.Pane label="通话明细" name="2">
								<iframe src={ phoneUrl } frameborder="0" title="通话明细" allowtransparency="true" style={ {'backgroundColor':'transparent'} } width="100%" height="400" />
							</Tabs.Pane>
							<Tabs.Pane label="报告" name="3">
								<iframe src={ reportUrl } frameborder="0" title="报告" allowtransparency="true" style={ {'backgroundColor':'transparent'} } width="100%" height="400" />
							</Tabs.Pane>
						</Tabs>
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