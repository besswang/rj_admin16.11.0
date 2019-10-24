// 催收管理-个人对账
import React, { Component } from 'react'
import { Button, Loading, Table, Dialog, Radio, Form, MessageBox } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectPendingLoan, updateStateLoan, toLoanBank, toLoan, exportPendingLoan } from './actions'
import Search from '@components/Search'
import MyPagination from '@components/MyPagination'
import filter from '@global/filter'
import { FALSE } from '@meta/state'
import DetailBtn from '@components/DetailBtn'
import { dwaitFang } from '@meta/details'
import timeDate from '@global/timeDate'
class WaitFang extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		selectPendingLoan: PropTypes.func.isRequired,
		exportPendingLoan: PropTypes.func.isRequired,
		updateStateLoan: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired,
		toLoanBank: PropTypes.func.isRequired,
		toLoan: PropTypes.func.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			obj:{},
			loanType: 1,
			dialogVisible: false,
			columns: [{
						label: '#',
						width: 60,
						render: (a, b, c) => {
							return c + 1
						}
					}, {
					label: '渠道名称',
					width:140,
					prop: 'channelName'
				}, {
					label: '新老客户',
					width: 100,
					prop: 'loanTerm', // 等于0 为新客  大于0 为老客
					render: row => {
						const data = filter.loanTerm(row.loanTerm)
						return data
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
					label: '支付宝认证账号',
					prop: 'alipayNum',
					width: 200
				}, {
					label: '申请金额',
					width: 120,
					prop: 'applyMoney'
				}, {
					label: '申请期限',
					width: 180,
					prop: 'applyTerm'
				}, {
					label: '服务费',
					prop: 'serviceMoney'
				}, {
					label: '待放金额',
					width: 100,
					prop: 'loanMoney'
				}, {
					label: '借款次数',
					width: 100,
					prop: 'loanTerm'
				}, {
					label: '申请时间',
					width: 180,
					prop: 'gmt',
					render: row => {
						const date = timeDate.time(row.gmt, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '审核客服',
					width: 100,
					prop: 'examineCustomerName'
				}, {
					label: '审核时间',
					width: 180,
					prop: 'examineDate',
					render: row => {
						const date = timeDate.time(row.examineDate, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '打款状态',
					width: 100,
					prop: 'payStatus',
					render: row => {
						const data = filter.payStatus(row.payStatus)
						return data
					}
				}, {
					label: '申请单号',
					width: 200,
					prop: 'orderNumber'
				}, {
					label: '银行名称',
					width: 180,
					prop: 'bankName'
				}, {
					label: '银行卡号',
					width: 200,
					prop: 'bankNumber'
				}, {
					label: '打款失败信息',
					width: 200,
					prop: 'failureMessage'
				}, {
					label: '操作',
					fixed: 'right',
					width:180,
					render: row => {
							return (
								<div className="flex flex-direction_row">
									<Button className="margin_right10" type="success" size="mini" onClick={ this.openDialog.bind(this,row) }>
										{'放款'}
									</Button>
									<Button className="margin_right10" type="danger" size="mini" onClick={ this.props.updateStateLoan.bind(this,{orderId:row.id,phone:row.phone,realName:row.realName,state:FALSE}, row.payStatus) }>
										{'拒绝'}
									</Button>
									<DetailBtn linkTo={ dwaitFang } row={ row } />
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
    this.props.selectPendingLoan()
  }
  handleSearch = e => {
    e.preventDefault()
    this.props.selectPendingLoan()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.selectPendingLoan()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.selectPendingLoan()
	}
	openDialog = r => {
		if (r.payStatus === 'FIGHT_MONEY'){
			 MessageBox.confirm('打款中', '提示', {
			 	type: 'warning'
			 }).then(() => {

			 }).catch(() => {

			 })
		}else{
			this.setState({
				dialogVisible: true,
				loanType: 1,
				obj: r
			})
		}
	}
	onChange = v => {
		this.setState({
			loanType: v
		})
	}
	saveContent = e => {
		e.preventDefault()
		const id = this.state.obj.id
		if(this.state.loanType === 0) { // 银行卡
			this.props.toLoanBank(id)
		}else{
			this.props.toLoan(id)
		}
		this.setState({
			dialogVisible: false
		})
	}
	render() {
		const { list, btnLoading } = this.props
		const { loanType, dialogVisible, obj } = this.state
		return (
			<div>
				<Search showSelect2>
					<Form.Item>
						<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
					</Form.Item>
					<Form.Item>
						<Button onClick={ this.props.exportPendingLoan } type="primary">{'导出列表'}</Button>
					</Form.Item>
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
					title="放款方式"
					visible={ dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<ul className="flex flex-direction_column info-ul">
							<li className="flex flex-direction_row info-li">
								<p>{'真实姓名：'}{ obj.realName }</p>
							</li>
							<li className="flex flex-direction_row info-li">
								<p>{'手机号码：'}{ obj.phone }</p>
								<p>{'身份证号：'}{ obj.idcardNumber }</p>
							</li>
							<li className="flex flex-direction_row info-li">
								<p>{'申请期限：'}{ obj.applyTerm }</p>
								<p>{'申请时间：'}{ timeDate.time(obj.gmt, 'yyyy-MM-dd hh:mm:ss') }</p>
							</li>
							<li className="flex flex-direction_row info-li">
								<p>{'借款金额：'}{ obj.applyMoney }</p>
								<p>{'应放金额：'}{ obj.loanMoney }</p>
							</li>
							<li className="flex flex-direction_row info-li">
								<p>{'息费：'}</p>
								<p>{'服务费：'}{ obj.serviceMoney }</p>
							</li>
							<li className="flex flex-direction_row info-li">
								<p>{'到期应还：'}{ obj.repaymentMoney }</p>
								<p>{'约定还款时间：'}{ obj.repaymentDate }</p>
							</li>
						</ul>
						<Form labelWidth="80">
							<Form.Item label="放款方式:">
								<Radio.Group value={ loanType } onChange={ this.onChange.bind(this) }>
									{/* <Radio value={ 0 }>{'银行卡'}</Radio> */}
									<Radio value={ 1 }>{'线下放款'}</Radio>
								</Radio.Group>
							</Form.Item>
						</Form>
					</Dialog.Body>
					<Dialog.Footer className="dialog-footer">
						<Button onClick={ () => this.setState({ dialogVisible: false }) }>{'取 消'}</Button>
						<Button type="primary" onClick={ this.saveContent } loading={ btnLoading }>{'确 定'}</Button>
					</Dialog.Footer>
				</Dialog>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { list, btnLoading } = state
	return { list, btnLoading }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({sizeChange, currentChange, initSearch, selectPendingLoan, updateStateLoan, toLoanBank, toLoan,exportPendingLoan }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(WaitFang)
