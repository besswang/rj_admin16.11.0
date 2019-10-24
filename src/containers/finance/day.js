// 催收管理-当日到期
import React, { Component } from 'react'
import { Button, Loading, Table, Dialog, Form, Input, Message } from 'element-react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectTheDayLoan, insertRemarks, distributionsCuiShou, exportTheDayLoan } from './actions'
import Search from '@components/Search'
import MyPagination from '@components/MyPagination'
import filter from '@global/filter'
import SelectPicker from '@components/SelectPicker'
import timeDate from '@global/timeDate'
import DetailBtn from '@components/DetailBtn'
import { dCurrentDay } from '@meta/details'
class WaitHuan extends Component {
	static propTypes = {
		btnLoading: PropTypes.bool.isRequired,
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		selectTheDayLoan: PropTypes.func.isRequired,
		insertRemarks: PropTypes.func.isRequired,
		collList: PropTypes.array,
		distributionsCuiShou: PropTypes.func.isRequired,
		exportTheDayLoan: PropTypes.func.isRequired,
  }
	constructor(props) {
		super(props)
		this.state = {
			ids: [],
			dialogVisible: false,// 备注
			dialogVisible2: false, // 分配
			content: '',
			orderNumber: '',
			orderId: null,
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
					width: 60,
					render: (a, b, c) => {
						return c + 1
					}
				}, {
					label: '单号',
					width:200,
					prop: 'orderNumber'
				}, {
					label: '备注信息',
					width: 100,
					prop: 'content'
				}, {
					label: '渠道名称',
					width: 120,
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
					width: 160,
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
					width: 180,
					prop: 'applyTerm'
				}, {
					label: '服务费',
					prop: 'serviceMoney'
				}, {
					label: '已放金额', // 到账金额
					width: 100,
					prop: 'loanMoney'
				}, {
					label: '应还金额', // 到期应还金额
					width: 100,
					prop: 'repaymentMoney'
				}, {
					label: '借款次数',
					width: 100,
					prop: 'loanTerm'
				}, {
					label: '申请时间',
					prop: 'gmt',
					width:180,
					render: row => {
						return timeDate.time(row.gmt, 'yyyy-MM-dd hh:mm:ss')
					}
				}, {
					label: '放款时间',
					prop: 'loanDate',
					width: 180,
					render: row => {
						return timeDate.time(row.gmt, 'yyyy-MM-dd hh:mm:ss')
					}
				}, {
					label: '约定还款日',
					width: 180,
					prop: 'finalDate'
				}, {
					label: '打款方式',
					width: 100,
					prop: 'loanMode',
					render: row => {
						const t = filter.payType(row.loanMode)
						return t
					}
				}, {
					label: '订单类型',
					width: 100,
					prop: 'loanTerm', // 等于0 为新客  大于0 为老客
					render: row => {
						const data = filter.loanTer(row.loanTerm)
						return data
					}
				}, {
					label: '银行名称',
					width: 140,
					prop: 'bankName'
				}, {
					label: '银行卡号',
					width: 200,
					prop: 'bankNumber'
				}, {
					label: '操作',
					width:160,
					fixed: 'right',
					render: row => {
							return (
								<div className="flex flex-direction_row">
									<Button className="margin_right10" type="primary" size="mini" onClick={ this.openDialog.bind(this, row) }>
										{'备注'}
									</Button>
									<DetailBtn linkTo={ dCurrentDay } row={ row } />
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
    this.props.selectTheDayLoan()
	}
	openDialog = r => {
		this.setState({
			dialogVisible: true,
			content: r.content,
			orderNumber: r.orderNumber,
			orderId: r.id
		})
	}
  handleSearch = e => {
    e.preventDefault()
    this.props.selectTheDayLoan()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.selectTheDayLoan()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.selectTheDayLoan()
	}
	onChange = e => {
		this.setState({
			content: e
		})
	}
	saveContent = e => {
		e.preventDefault()
		this.props.insertRemarks({
			content: this.state.content,
			orderId: this.state.orderId
		})
		this.setState({
			dialogVisible: false
		})
	}
	openDialog2 = () => {
		if(this.state.ids.length !==0){
			this.form.resetFields()
			this.setState({
				dialogVisible2: true
			})
		}else{
			Message.warning('请勾选订单')
		}
	}
	onChange2(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
	}
	saveContent2 = e => {
		e.preventDefault()
		this.form.validate((valid) => {
			if (valid) {
				this.setState({
					dialogVisible2: false
				})
				const trans = Object.assign({},{ids:this.state.ids},{adminId:this.state.form.id})
				this.props.distributionsCuiShou(trans)
			} else {
				console.log('error submit!!')
				return false
			}
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
			this.props.distributionsCuiShou(trans)
		}else{
			Message.warning('请勾选订单')
		}
	}
	render() {
		const { list, collList, btnLoading } = this.props
		const { dialogVisible, dialogVisible2, form, rules } = this.state
		return (
			<div>
				<Search showSelect2 showColl showSelectClient showAllotType showSelectTime2>
					<Form.Item>
						<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
					</Form.Item>
					<Form.Item>
						<Button type="primary" onClick={ this.openDialog2.bind(this) }>{'批量分配'}</Button>
					</Form.Item>
					<Form.Item>
						<Button type="warning" onClick={ this.cancelAllot.bind(this) }>{'取消分配'}</Button>
					</Form.Item>
					<Form.Item>
						<Button onClick={ this.props.exportTheDayLoan } type="primary">{'导出列表'}</Button>
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
					title="修改备注"
					visible={ dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<Form>
							<Form.Item label="订单号" labelWidth="120">
								<p>{ this.state.orderNumber }</p>
							</Form.Item>
							<Form.Item label="备注信息" labelWidth="120">
								<Input type="textarea" value={ this.state.content } onChange={ e => this.onChange(e) } />
							</Form.Item>
						</Form>
					</Dialog.Body>
					<Dialog.Footer className="dialog-footer">
						<Button onClick={ () => this.setState({ dialogVisible: false }) }>{'取 消'}</Button>
						<Button type="primary" onClick={ this.saveContent } loading={ btnLoading }>{'确 定'}</Button>
					</Dialog.Footer>
				</Dialog>
				<Dialog
					title="分配催收员"
					visible={ dialogVisible2 }
					onCancel={ () => this.setState({ dialogVisible2: false }) }
				>
					<Dialog.Body>
						<Form labelWidth="120" model={ form } ref={ e => {this.form = e} } rules={ rules }>
							{
								<Form.Item label="催收人员" prop="id">
									<SelectPicker placeholder="请选择催收人员" value={ form.id } options={ collList } onChange={ this.onChange2.bind(this, 'id') } />
								</Form.Item>
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
	const { list, collList, btnLoading } = state
	return { list, collList, btnLoading }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({sizeChange, currentChange, initSearch, selectTheDayLoan, insertRemarks, distributionsCuiShou, exportTheDayLoan }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(WaitHuan)
