import React, { Component } from 'react'
import { Button, Table, Loading,Form } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch, menuActive } from '@redux/actions'
import { selectPromotionStatistics } from './actions'
import MyPagination from '@components/MyPagination'
import Search from '@components/Search'
import num from '@global/num'
class Apply extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		list: PropTypes.object.isRequired,
		sizeChange: PropTypes.func.isRequired,
		currentChange: PropTypes.func.isRequired,
		initSearch: PropTypes.func.isRequired,
		selectPromotionStatistics: PropTypes.func.isRequired,
		menuActive: PropTypes.func.isRequired
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
					label: '日期',
					width:120,
					prop: 'date'
				}, {
					label: 'PV',
					prop: 'pv'
				}, {
					label: 'UV',
					prop: 'uv'
				}, {
					label: '注册人数',
					width:100,
					prop: 'userCount',
					render: row => {
						return row.userCount === null ? 0 : row.userCount
					}
				}, {
					label: '登陆APP人数',
					width:140,
					prop: 'loginCount'
				}, {
					label: '登陆APP比例',
					width: 130,
					render: row => {
						//登陆APP比例 = 登陆APP人数/注册人数
						if (row.loginCount && row.userCount) {
							const n = parseInt(row.loginCount) / parseInt(row.userCount)
							return (num.toDecimal(n * 100))
						} else {
							return ('0.00%')
						}
					}
					// prop: 'loginRate'
				}, {
					label: '资料完成人数',
					width:140,
					prop: 'completedCount'
				}, {
					label: '申请人数',
					width: 100,
					prop: 'applicantsCount'
				}, {
					label: '申请比例',
					width: 100,
					render: row => {
						//申请比例 = 申请人数/注册人数
						if (row.applicantsCount && row.userCount) {
							const n = parseInt(row.applicantsCount) / parseInt(row.userCount)
							return (num.toDecimal(n * 100))
						} else {
							return ('0.00%')
						}
					}
					// prop: 'applicantsRate'
				}, {
					label: '放款人数',
					width: 100,
					prop: 'orderStateCount'
				}, {
					label: '放款比例',
					width: 100,
					render: row => {
						//申请比例 = 放款人数/注册人数
						if (row.orderStateCount && row.userCount) {
							const n = parseInt(row.orderStateCount) / parseInt(row.userCount)
							return (num.toDecimal(n * 100))
						} else {
							return ('0.00%')
						}
					}
					// prop: 'orderStateRate'
				}, {
					label: '获客成本',
					width: 100,
					prop: 'moneyTotal'
				}
			]
		}
	}
	componentWillMount() {
		this.props.initSearch()
		this.props.menuActive(this.props.location.pathname)
	}
	componentDidMount() {
		this.props.selectPromotionStatistics()
	}
	handleSearch = e => {
		e.preventDefault()
		this.props.selectPromotionStatistics()
	}
	sizeChange = e => {
		this.props.sizeChange(e)
		this.props.selectPromotionStatistics()
	}
	onCurrentChange = e => {
		this.props.currentChange(e)
		this.props.selectPromotionStatistics()
	}
	render(){
		const { list } = this.props
		return(
			<div>
				<Search showChannel showTime>
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
		...bindActionCreators({sizeChange, currentChange, initSearch, menuActive, selectPromotionStatistics}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Apply)
