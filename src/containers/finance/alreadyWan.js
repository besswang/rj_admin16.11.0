// 财务管理-已完成
import React, { Component } from 'react'
import { Button, Loading, Table, Form } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectOrderCompleted,exportOrderCompleted } from './actions'
import Search from '@components/Search'
import MyPagination from '@components/MyPagination'
import filter from '@global/filter'
import DetailBtn from '@components/DetailBtn'
import { dalreadyWan } from '@meta/details'
import timeDate from '@global/timeDate'
import * as math from 'mathjs'
class AlreadyWan extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		selectOrderCompleted: PropTypes.func.isRequired,
		exportOrderCompleted: PropTypes.func.isRequired,
  }
	constructor(props) {
		super(props)
		this.state = {
			columns: [{
						label: '#',
						width: 60,
						render: (a, b, c) => {
							return c + 1
						}
					}, {
					label: '渠道名称',
					width:120,
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
					width: 120,
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
					label: '已放金额', // 到账金额
					width: 100,
					prop: 'loanMoney'
				}, {
					label: '实还金额',
					width: 100,
					prop: 'realRepaymentMoney'
				}, {
					label: '实际还款日',
					prop: 'realRepaymentDate',
					width: 180,
					render: row => {
						const date = timeDate.time(row.realRepaymentDate, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '延期费用',
					width: 100,
					prop: 'continuePayNumber',
					render: row => {
						// delay_rate单次延期费率 * delay_num单次延期天数 * apply_money申请金额
						if (row.delayRate && row.delayNum && row.applyMoney) {
							return math.round(row.delayRate * row.delayNum * row.applyMoney, 2)
						}else{
							return 0
						}
					}
				}, {
					label: '延期天数',
					width: 100,
					prop: 'continueDay'
				}, {
					label: '借款次数',
					width: 100,
					prop: 'loanTerm'
				}, {
					label: '放款客服',
					width: 100,
					prop: 'loanCustomer'
				}, {
					label: '申请时间',
					prop: 'upt',
					width: 180,
					render: row => {
						const date = timeDate.time(row.upt, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '审核客服',
					width: 100,
					prop: 'examineCustomerName'
				}, {
					label: '审核时间',
					prop: 'examineDate',
					width: 180,
					render: row => {
						const date = timeDate.time(row.examineDate, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '放款时间',
					prop: 'loanDate',
					width: 180,
					render: row => {
						const date = timeDate.time(row.loanDate, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '约定还款日',
					width:140,
					prop: 'finalDate'
				}, {
					label: '打款单号',
					width: 200,
					prop: 'loanNumber'
				}, {
					label: '打款方式',
					width: 100,
					prop: 'loanMode',
					render: row => {
						const data = filter.payType(row.loanMode)
						return data
					}
				}, {
					label: '还款方式',
					width: 100,
					prop: 'repaymentType',
					render: row => {
						const data = filter.loanModeState(row.repaymentType)
						return data
					}
				}, {
					label: '申请单号',
					width: 200,
					prop: 'orderNumber'
				}, {
					label: '银行名称',
					width: 140,
					prop: 'bankName'
				}, {
					label: '银行账号',
					width: 220,
					prop: 'bankNumber'
				}, {
					label: '操作',
					fixed: 'right',
					render: row => {
							return (
								<DetailBtn linkTo={ dalreadyWan } row={ row } />
							)
					}
      }]
		}
	}
	componentWillMount() {
		this.props.initSearch()
  }
  componentDidMount() {
    this.props.selectOrderCompleted()
  }
  handleSearch = e => {
    e.preventDefault()
    this.props.selectOrderCompleted()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.selectOrderCompleted()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.selectOrderCompleted()
	}
	render() {
		const { list } = this.props
		return (
			<div>
				<Search showSelect2>
					<Form.Item>
						<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
					</Form.Item>
					<Form.Item>
						<Button onClick={ this.props.exportOrderCompleted } type="primary">{'导出列表'}</Button>
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
		...bindActionCreators({sizeChange, currentChange, initSearch, selectOrderCompleted,exportOrderCompleted }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AlreadyWan)
