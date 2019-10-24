// 催收管理-逾期列表
import React, { Component } from 'react'
import { Button, Loading, Table, Dialog, Form, Message } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectOverdueByParam, addUserBlack, removeUserBlack, updateOrderCuishou, exportOverdue } from './actions'
import Search from '@components/Search'
import MyPagination from '@components/MyPagination'
import DisableBtn from '@components/DisableBtn'
import DetailBtn from '@components/DetailBtn'
import filter from '@global/filter'
import timeDate from '@global/timeDate'
import { doverdue } from '@meta/details'
import SelectPicker from '@components/SelectPicker'
class Overdue extends Component{
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		selectOverdueByParam: PropTypes.func.isRequired,
		addUserBlack: PropTypes.func.isRequired,
		removeUserBlack: PropTypes.func.isRequired,
		collList: PropTypes.array,
		btnLoading: PropTypes.bool.isRequired,
		updateOrderCuishou: PropTypes.func.isRequired,
		exportOverdue: PropTypes.func.isRequired,
  }
	constructor(props) {
		super(props)
		this.state = {
			showAllBtn:false, // 批量分配/取消分配的按钮开关
			ids:[],
			dialogVisible:false,
			form:{
				id: null
			},
			rules: {
				id: [{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '' || value === null) {
							callback(new Error('请选择催收人员'))
						} else {
							callback()
						}
					}
				}]
			},
			columns: [
				{
					type: 'selection'
				}, {
					label: '#',
					fixed:'left',
					width: 60,
					render: (a, b, c) => {
						return c + 1
					}
				}, {
					label: '订单号',
					prop: 'orderNumber',
					width:200,
					fixed: 'left'
				},{
					label: '渠道名称',
					width: 120,
					prop: 'channelName'
				}, {
					label: '米融分',
					width: 100,
					prop: 'riskNum'
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
					label: '到账金额',// 已放金额
					width: 100,
					prop: 'loanMoney'
				}, {
					label: '银行名称',
					width: 160,
					prop: 'bankName'
				}, {
					label: '银行账号',
					width: 200,
					prop: 'bankNumber'
				}, {
					label: '约定还款日',
					width: 180,
					prop: 'repaymentDate'
				}, {
					label: '应还金额',
					width: 100,
					prop: 'repaymentMoney'
				}, {
					label: '逾期天数',
					width: 100,
					prop: 'overdueNumber'
				}, {
					label: '逾期费用', // 逾期金额
					width: 100,
					prop: 'overdueMoney'
				}, {
					label: '借款次数',
					width: 100,
					prop: 'loanTerm'
				}, {
					label: '新老客户',
					width: 100,
					prop: 'loanTerm', // 等于0 为新客  大于0 为老客
					render: row => {
						const data = filter.loanTerm(row.loanTerm)
						return data
					 }
				}, {
					label: '申请时间',
					prop: 'gmt',
					width: 180,
					render: row => {
						const date = timeDate.time(row.gmt, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
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
					width:180,
					render: row => {
						const date = timeDate.time(row.loanDate, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '打款单号',
					width: 200,
					prop: 'loanNumber'
				}, {
					label: '打款方式',
					width: 100,
					prop: 'loanMode',
					render: row => {
						const t = filter.payType(row.loanMode)
						return t
					}
				}, {
					label: '跟单人',
					prop: 'neicuiCustomerName',
					fixed: 'right'
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
				}, {
					label: '操作',
					fixed: 'right',
					align: 'center',
					render: row => {
						return (
							<DetailBtn linkTo={ doverdue } row={ row } />
						)
					}
      }]
		}
	}
	componentWillMount() {
		this.props.initSearch()
		const obj = JSON.parse(window.sessionStorage.getItem('adminInfo'))
		if (obj.roleId === 3 || obj.roleId === 4) {
			this.setState({
				showAllBtn:false
			})
		}else{
			this.setState({
				showAllBtn:true
			})
		}
  }
  componentDidMount() {
		this.props.selectOverdueByParam()
	}
  handleSearch = e => {
    e.preventDefault()
    this.props.selectOverdueByParam()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.selectOverdueByParam()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.selectOverdueByParam()
	}
		// 黑名单 idCard，phone,realName
	userBlack(r){
		if(r.blackStatus === 0){ // 添加
			const trans = {
				idCard: r.idcardNumber,
				phone: r.phone,
				realName: r.realName
			}
			this.props.addUserBlack(trans,'overdue')
		} else { // 移除
			this.props.removeUserBlack({phone: r.phone},'overdue')
		}
	}
	openDialog = r => {
		if(this.state.ids.length !==0){
			this.form.resetFields()
			this.setState({
				dialogVisible: true
			})
		}else{
			Message.warning('请勾选订单')
		}
	}
	saveContent = e => {
		e.preventDefault()
		this.form.validate((valid) => {
			if (valid) {
				const trans = Object.assign({},{ids:this.state.ids},{adminId:this.state.form.id})
				this.props.updateOrderCuishou(trans)
				this.setState({
					dialogVisible: false,
					ids:[]
				})
			} else {
				console.log('error submit!!')
				return false
			}
		})
	}
	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
	}
	onSelectChange = v => {
		const listid = v.map(item => item.id)
		this.setState({
			ids: listid
		})
	}
	onSelectAll = v => {
		const listid = v.filter(item => item.id)
		this.setState({
			ids: listid
		})
	}
	cancelAllot = () => {
		if(this.state.ids.length !==0){
			const trans = Object.assign({},{ids:this.state.ids},{adminId:''})
			this.props.updateOrderCuishou(trans)
		}else{
			Message.warning('请勾选订单')
		}
	}

	render() {
		const { list, collList, btnLoading } = this.props
		const { form, rules, dialogVisible, showAllBtn } = this.state
		return (
			<div>
				<Search showSelect2 showSomeColl showSelectClient showSelectTime>
					<Form.Item>
						<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
					</Form.Item>
					{
						showAllBtn &&
						<Form.Item>
							<Button type="primary" onClick={ this.openDialog.bind(this) }>{'批量分配'}</Button>
						</Form.Item>
					}
					{
						showAllBtn &&
						<Form.Item>
							<Button type="warning" onClick={ this.cancelAllot.bind(this) }>{'取消分配'}</Button>
						</Form.Item>
					}
					<Form.Item>
						<Button onClick={ this.props.exportOverdue } type="primary">{'导出列表'}</Button>
					</Form.Item>
				</Search>
				<Loading loading={ list.loading }>
					<Table
						style={ { width: '100%' } }
						columns={ this.state.columns }
						data={ list.data }
						border
						stripe
						onSelectChange={ (selection) => { this.onSelectChange(selection)} }
      			onSelectAll={ (selection) => { this.onSelectAll(selection)} }
					/>
				</Loading>

        <MyPagination
          onSizeChange={ this.sizeChange }
          onCurrentChange={ this.onCurrentChange }
        />
				<Dialog
					title="分配催收员"
					visible={ dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<Form labelWidth="120" model={ form } ref={ e => {this.form = e} } rules={ rules }>
							{
								<Form.Item label="催收人员" prop="id">
									<SelectPicker value={ form.id } options={ collList } onChange={ this.onChange.bind(this, 'id') } />
								</Form.Item>
							}
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
	const { list, collList, btnLoading } = state
	return { list, collList, btnLoading }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({sizeChange, currentChange, initSearch, selectOverdueByParam, addUserBlack, removeUserBlack, updateOrderCuishou, exportOverdue }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Overdue)
