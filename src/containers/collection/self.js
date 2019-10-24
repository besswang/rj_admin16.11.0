// 催收管理-个人对账
import React, { Component } from 'react'
import { Button, Loading, Table,Form } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectthePersion,exportThePersion } from './actions'
import Search from '@components/Search'
import MyPagination from '@components/MyPagination'
import filter from '@global/filter'
import timeDate from '@global/timeDate'
class Self extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		selectthePersion: PropTypes.func.isRequired,
		exportThePersion: PropTypes.func.isRequired,
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
					label: '申请单号',
					width:200,
					prop: 'orderNumber'
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
				}, {
					label: '身份证号',
					width: 200,
					prop: 'idCard',
					render: row => {
						if (row.idCard) {
							return row.idCard.replace(/^(\d{3})\d{8}(\d+)/, '$1****$2')
						}
					}
				}, {
					label: '借款金额',
					width: 100,
					prop: 'applyMoney'
				}, {
					label: '应还金额',
					width: 100,
					prop: 'realRepaymentMoney' // 到期应还金额
				}, {
					label: '支付方式',
					width: 100,
					prop: 'payType', // 默认 0 支付宝 1微信 2 银行卡 3 线下
					render: row => {
						 const data = filter.loanModeState(row.payType)
						 return data
					}
				}, {
					label: '催收催回金额',
					width: 140,
					prop: 'realMoney'
				}, {
					label: '逾期天数',
					width: 100,
					prop: 'overdueNumber'
				}, {
					label: '分单时间',
					prop: 'fendanDate',
					width: 180,
					render: row => {
						const date = timeDate.time(row.fendanDate, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '催回时间',
					prop: 'realRepaymentDate',
					width: 180,
					render: row => {
						const date = timeDate.time(row.realRepaymentDate, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '催回催收人',
					width: 120,
					prop: 'customerName'
				}, {
					label: '订单类型',
					width: 100,
					prop: 'loanType', // 默认  0 正常 1 延期   2逾期
					render: row => {
						const data = filter.loanTyp(row.loanType)
						return data
					}
				}]
		}
	}
	componentWillMount() {
    this.props.initSearch()
  }
  componentDidMount() {
    this.props.selectthePersion()
  }
  handleSearch = e => {
    e.preventDefault()
    this.props.selectthePersion()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.selectthePersion()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.selectthePersion()
	}
	render() {
		const { list } = this.props
		return (
			<div>
				<Search showSelect2 showSomeColl>
					<Form.Item>
						<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
					</Form.Item>
					<Form.Item>
						<Button onClick={ this.props.exportThePersion } type="primary">{'导出列表'}</Button>
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
		...bindActionCreators({sizeChange, currentChange, initSearch, selectthePersion, exportThePersion }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Self)
