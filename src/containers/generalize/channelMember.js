import React, { Component } from 'react'
import { Button, Table, Loading, Form } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch, menuActive } from '@redux/actions'
import { selectChannelMember } from './actions'
import MyPagination from '@components/MyPagination20190813'
import Search from '@components/Search'
import timeDate from '@global/timeDate'
import filter from '@global/filter'
// import api from '@api/index'
class Apply extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		list: PropTypes.object.isRequired,
		sizeChange: PropTypes.func.isRequired,
		currentChange: PropTypes.func.isRequired,
		initSearch: PropTypes.func.isRequired,
		selectChannelMember: PropTypes.func.isRequired,
		menuActive: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props)
		this.state = {
			total:null,
			columns: [{
						label: '#',
						width: 60,
						render: (a, b, c) => {
							return c + 1
						}
					}, {
				label: '渠道名称',
				width:180,
				prop: 'channelName'
			}, {
				label: '姓名',
				width:120,
				prop: 'realName',
				render: row => {
					if (row.realName === null){
						return '未命名'
					}else{
						if (row.realName){
							const reg = row.realName.slice(1)
							const s = reg.split('')
							const x = []
							for(let i=0;i<s.length;i++){
								x.push('*')
							}
							const z = x.join('')
							const y = row.realName.substring(1, 0)
							return y+z
							// return row.realName.replace(/(?<=.)./g, '*')
						}
					}
				}
			}, {
				label: '手机号码',
				width:160,
				prop: 'phone',
				render: row => {
					if (row.phone){
						return row.phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')
					}
				}
			}, {
				label: '身份号码',
				width:180,
				prop: 'idcardNumber',
				render: row => {
					if (row.idcardNumber){
						return row.idcardNumber.replace(/^(\d{3})\d{8}(\d+)/, '$1****$2')
					}
				}
			}, {
				label: '身份证认证',
				width: 120,
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
				label: '银行卡认证',
				prop: 'bankType',
				width: 120,
				render: row => {
					return this.textType(row.bankType)
				}
			}, {
				label: '运营商认证', // 手机认证
				prop: 'mobileType',
				width: 120,
				render: row => {
					return this.textType(row.mobileType)
				}
			}, {
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
				label: '收款银行',
				width:140,
				prop: 'bankName'
			},{
				label: '注册时间',
				width:180,
				prop: 'gmt',
				render: row => {
					const date = timeDate.time(row.gmt, 'yyyy-MM-dd hh:mm:ss')
					return date
				}
			}, {
				label: '申请状态',
				width:100,
				prop: 'loanType',
				render: row => {
					const y = <span className="theme-blue">{'已申请'}</span>
					const n = <span className="dis-red">{'未申请'}</span>
					if (row.loanType !== null){
						return row.loanType === 0 ? n : y
					}else{
						return ''
					}
				}
			}]
		}
	}
	componentWillMount() {
		this.props.initSearch()
		// this.props.selectTotal()
		this.props.menuActive(this.props.location.pathname)
	}
	componentDidMount() {
		this.props.selectChannelMember()
	}
	textType = x => {
		const t = filter.personalType(x)
		if (x === 'COMPLETED') {
			return <span className="g-border">{t}</span>
		} else {
			return <span className="r-border">{t}</span>
		}
	}
	handleSearch = e => {
		e.preventDefault()
		this.props.selectChannelMember()
	}
	sizeChange = e => {
		this.props.sizeChange(e)
		this.props.selectChannelMember()
	}
	onCurrentChange = e => {
		this.props.currentChange(e)
		this.props.selectChannelMember()
	}
	// selectTotal = async () => {
	// 	const res = await api.selectTotal({pageNum:1,pageSize:10})
	// 	if (res.success) {
	// 		this.setState({
	// 			total: Number(res.data)
	// 		})
	// 	} else {
	// 		Message.warning(res.msg)
	// 	}
	// }
	render(){
		const { list } = this.props
		return(
			<div>
				<Search showChannel>
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
					total={ list.total }
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
		...bindActionCreators({sizeChange, currentChange, initSearch, menuActive, selectChannelMember}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Apply)
