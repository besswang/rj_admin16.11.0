import React, { Component } from 'react'
import { Button, Loading, Table, Dialog,Form, Input, Radio, Breadcrumb } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { pageQuota, deleteQuota, addQuota, updateQuota } from './actions'
import MyPagination from '@components/MyPagination'
import validate from '@global/validate'
import Search from '@components/Search'
import { Link } from 'react-router-dom'
import DisableBtn from '@components/DisableBtn'
// import filter from '@global/filter'
class BlackUser extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		pageQuota: PropTypes.func.isRequired,
		deleteQuota: PropTypes.func.isRequired,
		addQuota: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired,
		updateQuota: PropTypes.func.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			channelName: '', // 渠道名称
			dialogTitle: '',
			id: null,
			form: {
				money: null, // 额度
				// defaultValue: 1,
				state:1,
				// sort:null,
				delayType:1,
				overdueType:1,
				// moneyRate:'',
				overdueRate:'',
				serverMoney: null,
				// continueMoney:null,
				dayNumber:null
			},
			rules: {
				money: [{required: true, validator: validate.edu}],
				// sort: [{required: true, validator:validate.sort}],
				// moneyRate: [{required: true,validator:validate.moneyRate}],
				overdueRate: [{required: true,validator:validate.lilv}],
				serverMoney: [{required: true, validator: validate.serverMoney}],
				// continueMoney: [{required: true, validator:validate.continueMoney}],
				dayNumber: [{required: true,validator:validate.dayNumber}],
			},
			dialogVisible: false,
			columns: [{
						label: '#',
						width: 60,
						fixed:'left',
						render: (a, b, c) => {
							return c + 1
						}
					}, {
					label: '渠道名称',
					width:140,
					prop: 'channelName',
					fixed: 'left',
					render: row => {
						const d = <span className="def-color">{'默认'}</span>
						return row.channelName === null ? d : row.channelName
					}
				}, {
					label: '额度',
					prop: 'money',
					fixed: 'left'
				}, {
					label: '申请天数',
					width: 100,
					prop: 'dayNumber'
				},
				// {
				// 	label: '是否是默认值',
				// 	prop: 'defaultValue',
				// 	render: row => {
				// 		const y = <span className="theme-blue">{'是'}</span>
				// 		const n = <span className="dis-red">{'否'}</span>
				// 		const data = row.defaultValue === 1 ? y : n
				// 		return data
				// 	}
				// },
				{
					label: '状态',
					prop: 'state',
					render: row => {
						const y = <span className="theme-blue">{'启用'}</span>
						const n = <span className="dis-red">{'禁用'}</span>
						const t = row.state === 1 ? y : n
						return t
					}
				},
				//  {
				// 	label: '排序',
				// 	prop: 'sort'
				// },
				{
					label: '是否开启延期功能',
					width: 160,
					prop: 'delayType',
					render: row => {
						const y = <span className="theme-blue">{'开'}</span>
						const n = <span className="dis-red">{'关'}</span>
						const t = row.delayType === 1 ? y : n
						return t
					}
				}, {
					label: '逾期是否可以延期',
					width:160,
					prop: 'overdueType',
					render: row => {
						const y = <span className="theme-blue">{'开'}</span>
						const n = <span className="dis-red">{'关'}</span>
						const t = row.overdueType === 1 ? y : n
						return t
					}
				},
				// {
				// 	label: '借款年化利率（利息）',
				// 	prop: 'moneyRate'
				// },
				{
					label: '逾期利率',
					width: 100,
					prop: 'overdueRate'
				}, {
					label: '服务费',
					prop: 'serverMoney'
				},
				// {
				// 	label: '延期金额',
				// 	prop: 'continueMoney'
				// },
				{
					label: '操作',
					width:140,
					fixed: 'right',
          render: row => {
            return (
							<div>
							{/* {
								row.defaultValue !==0 &&
								<Button type="primary" size="mini" onClick={ this.props.deleteQuota.bind(this,{id:row.id, defaultValue:0}) }>{'设为默认'}</Button>
							} */}
							<Button type="primary" size="mini" onClick={ this.openDialog.bind(this, row) }>{'编辑'}</Button>
							{/* <Button type="danger" size="mini" onClick={ this.props.deleteQuota.bind(this, row.id, null) }>{'删除'}</Button> */}
							{
								this.props.history.location.pathname === '/system/borrowlimit' &&
								<DisableBtn value={ row.state } result={ 0 } text={ ['启用','禁用'] } onClick={ this.props.updateQuota.bind(this,{state:row.state===1 ? 0:1,id:row.id}) } />
							}
              {
								this.props.history.location.pathname !== '/system/borrowlimit' &&
								<DisableBtn value={ row.state } result={ 0 } text={ ['启用','禁用'] } onClick={ this.props.updateQuota.bind(this,{state:row.state===1 ? 0:1,id:row.id},1) }/>
							}
							</div>
            )
          }
        }]
		}
	}
	componentWillMount() {
		this.props.initSearch()
		const n = window.sessionStorage.getItem('channelName')
		this.setState({
			channelName: n
		})
  }
  componentDidMount() {
		const { channelName } = this.state
		if (this.props.history.location.pathname === '/system/borrowlimit') {
			this.props.pageQuota()
		}else{
			this.props.pageQuota(channelName)
		}
	}
  sizeChange = e => {
		this.props.sizeChange(e)
		if (this.props.history.location.pathname === '/system/borrowlimit') {
			this.props.pageQuota()
		} else {
			this.props.pageQuota(this.state.channelName)
		}
  }
  onCurrentChange = e => {
		this.props.currentChange(e)
		if (this.props.history.location.pathname === '/system/borrowlimit') {
			this.props.pageQuota()
		} else {
			this.props.pageQuota(this.state.channelName)
		}
	}
	openDialog = r => {
		this.form.resetFields()
		this.setState({
			dialogVisible: true
		})
		if(r === 'add'){
			this.setState({
				dialogTitle: '添加额度',
				id: null,
				form: {
					money: null,
					// defaultValue: 1,
					state: 1,
					// sort: null,
					delayType: 1,
					overdueType: 1,
					// moneyRate: '',
					overdueRate: '',
					serverMoney: null,
					// continueMoney: null,
					dayNumber: null
				}
			})
		} else {
			this.setState({
				dialogTitle: '编辑额度',
				channelName:r.channelName,
				id: r.id,
				form: {
					money: r.money, // 额度
					// defaultValue: r.defaultValue,
					state:r.state,
					// sort:r.sort,
					delayType:r.delayType,
					overdueType:r.overdueType,
					// moneyRate:r.moneyRate,
					overdueRate:r.overdueRate,
					serverMoney: r.serverMoney,
					// continueMoney:r.continueMoney,
					dayNumber:r.dayNumber
				}
			})
		}
	}
	saveContent = e => {
		e.preventDefault()
		this.form.validate((valid) => {
			if (valid) {
				if(this.state.id){// 编辑
					const data = Object.assign({},this.state.form,{id:this.state.id},{channelName:this.state.channelName})
					if (this.props.history.location.pathname === '/system/borrowlimit') {
						this.props.updateQuota(data, )
					}else{
						this.props.updateQuota(data,1)
					}
				}else{//添加
					if (this.props.history.location.pathname === '/system/borrowlimit'){
						this.props.addQuota(this.state.form)
					}else{
						const trans = Object.assign({}, this.state.form,{channelName:this.state.channelName})
						this.props.addQuota(trans,this.state.channelName)
					}

				}
				this.setState({
					dialogVisible: false
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
	handleSearch = e => {
		e.preventDefault()
		this.props.pageQuota()
	}
	render() {
		const { list, btnLoading } = this.props
		const { form, rules, dialogTitle, dialogVisible } = this.state
		return (
			<div>
				{
					this.props.history.location.pathname === '/system/borrowlimit' &&
					<Search showChannel showState>
						<Form.Item>
							<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
						</Form.Item>
						<Form.Item>
							<Button className="margin-bottom15" type="primary" onClick={ this.openDialog.bind(this,'add') }>{'添加'}</Button>
						</Form.Item>
					</Search>
				}
				{	this.props.history.location.pathname !== '/system/borrowlimit' &&
					<div>
						<Breadcrumb separator="/" className="margin-bottom15">
							<Breadcrumb.Item>
								<Link to="/generalize/channelmanage">{'渠道管理'}</Link>
							</Breadcrumb.Item>
							<Breadcrumb.Item>{'额度'}</Breadcrumb.Item>
						</Breadcrumb>
						<Button className="margin-bottom15" type="primary" onClick={ this.openDialog.bind(this,'add') }>{'添加'}</Button>
					</div>
				}
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
					title={ dialogTitle }
					visible={ dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<Form labelWidth="140" ref={ e => {this.form=e} } model={ form } rules={ rules }>
							<Form.Item label="额度" prop="money">
								<Input type="number" value={ form.money } onChange={ this.onChange.bind(this,'money') } append="元" />
							</Form.Item>
							{/* <Form.Item label="是否默认">
								<Radio.Group value={ form.defaultValue } onChange={ this.onChange.bind(this,'defaultValue') }>
									<Radio value={ 1 }>{'是'}</Radio>
									<Radio value={ 0 }>{'否'}</Radio>
								</Radio.Group>
							</Form.Item> */}
							<Form.Item label="状态">
								<Radio.Group value={ form.state } onChange={ this.onChange.bind(this,'state') }>
									<Radio value={ 1 }>{'启用'}</Radio>
									<Radio value={ 0 }>{'禁用'}</Radio>
								</Radio.Group>
							</Form.Item>
							{/* <Form.Item label="排序" prop="sort">
								<Input type="number" value={ form.sort } onChange={ this.onChange.bind(this,'sort') } />
							</Form.Item> */}
							<Form.Item label="是否开启延期功能">
								<Radio.Group value={ form.delayType } onChange={ this.onChange.bind(this,'delayType') }>
									<Radio value={ 1 }>{'开'}</Radio>
									<Radio value={ 0 }>{'关'}</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item label="逾期是否可以延期">
								<Radio.Group value={ form.overdueType } onChange={ this.onChange.bind(this,'overdueType') }>
									<Radio value={ 1 }>{'开'}</Radio>
									<Radio value={ 0 }>{'关'}</Radio>
								</Radio.Group>
							</Form.Item>
							{/* <Form.Item label="借款年化利率（利息）" prop="moneyRate">
								<Input value={ form.moneyRate } onChange={ this.onChange.bind(this,'moneyRate') } />
							</Form.Item> */}
							<Form.Item label="逾期利率" prop="overdueRate">
								<Input value={ form.overdueRate } onChange={ this.onChange.bind(this,'overdueRate') } append="%" />
							</Form.Item>
							<Form.Item label="服务费" prop="serverMoney">
								<Input type="number" value={ form.serverMoney } onChange={ this.onChange.bind(this,'serverMoney') } append="元" />
							</Form.Item>
							{/* <Form.Item label="延期金额" prop="continueMoney">
								<Input type="number" value={ form.continueMoney } onChange={ this.onChange.bind(this,'continueMoney') } />
							</Form.Item> */}
							<Form.Item label="申请天数" prop="dayNumber">
								<Input type="number" value={ form.dayNumber } onChange={ this.onChange.bind(this,'dayNumber') } append="天" />
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
		...bindActionCreators({ sizeChange, currentChange, initSearch, pageQuota, deleteQuota, addQuota, updateQuota }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BlackUser)
