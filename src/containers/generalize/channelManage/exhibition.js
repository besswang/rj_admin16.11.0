// 推广管理-渠道管理-展期模式
import React, { Component } from 'react'
import { Button, Table, Loading, Dialog, Form, Input, Radio, Breadcrumb } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { findDelayRate,findAllDelayRate, bindingRate, deleteDelayRate, updateDelayState } from './action'
import MyPagination from '@components/MyPagination'
import Search from '@components/Search'
import validate from '@global/validate'
import DisableBtn from '@components/DisableBtn'
class Exhibition extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		list: PropTypes.object.isRequired,
		sizeChange: PropTypes.func.isRequired,
		currentChange: PropTypes.func.isRequired,
		initSearch: PropTypes.func.isRequired,
		findDelayRate: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired,
		bindingRate: PropTypes.func.isRequired,
		deleteDelayRate: PropTypes.func.isRequired,
		findAllDelayRate: PropTypes.func.isRequired,
		updateDelayState: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props)
		this.state = {
			dialogTitle:'',
			id: null,
			channelName: '', // 渠道名称
			form: {
				dayNum: null, // 展期期限,
				delayRate: null, // 展期费率,
				status: 1, // 状态
			},
			rules: {
				dayNum:[{required: true, validator: validate.exceptZeroNum}],
				delayRate: [{required: true, validator: validate.feilv}]
			},
			dialogVisible: false,
			columns: [{
						label: '#',
						fixed:'left',
						width: 60,
						render: (a, b, c) => {
							return c + 1
						}
					}, {
					label: '渠道名称',
					prop: 'channelName',
					fixed: 'left',
					render: row => {
						const d = <span className="def-color">{'默认'}</span>
						return row.channelName === null ? d : row.channelName
					}
				}, {
					label: '展期期限',
					prop: 'dayNum'
				}, {
					label: '展期费率(%)',
					prop: 'delayRate'
				}, {
					label: '状态',
					prop: 'status',
					render: row => {
						const y = <span className="theme-blue">{'启用'}</span>
						const n = <span className="dis-red">{'禁用'}</span>
						return row.status === 1 ? y:n
					}
				}, {
						label: '操作',
						width:140,
						fixed: 'right',
						render: row => {
							return (
								<div>
									{
										this.props.history.location.pathname === '/system/exmessage' &&
										<div>
										<Button type="danger" size="mini" onClick={ this.props.deleteDelayRate.bind(this, row.id,null) }>{ '删除' }</Button>
										<DisableBtn value={ row.status } result={ 0 } text={ ['启用','禁用'] } onClick={ this.props.updateDelayState.bind(this,{id:row.id,state:row.status},null) } />
										</div>
									}
									{
										this.props.history.location.pathname !== '/system/exmessage' &&
										<div>
										<Button type="danger" size="mini" onClick={ this.props.deleteDelayRate.bind(this, row.id,row.channelName) }>{ '删除' }</Button>
										<DisableBtn value={ row.status } result={ 0 } text={ ['启用','禁用'] } onClick={ this.props.updateDelayState.bind(this,{id:row.id,state:row.status},row.channelName) } />
										</div>
									}
								</div>
							)
						}
				}]
		}
	}
	componentWillMount() {
		this.props.initSearch()
		let name = ''
		if (this.props.location.state !== undefined) {
			name = this.props.location.state.date
		} else {
			const n = window.sessionStorage.getItem('channelName')
			name = n
		}
		this.setState({
			channelName: name
		})
	}
	componentDidMount() {
		if (this.props.history.location.pathname === '/system/exmessage') { // 系统管理-展期管理
			this.props.findAllDelayRate()
		} else { // 推广管理-渠道管理-展期
			this.props.findDelayRate({channelName: this.state.channelName})
		}
	}
	openDialog = obj => {
		this.setState({
			dialogVisible: true
		})
		this.form.resetFields()
		if(obj === 'add'){
			this.setState({
				dialogTitle:'添加'
			})
		}
	}
	saveContent = e => {
		e.preventDefault()
		this.form.validate((valid) => {
			if (valid) {
				if (this.props.history.location.pathname === '/system/exmessage') { // 系统管理-展期管理
					this.props.bindingRate(this.state.form,1)
				} else { // 推广管理-渠道管理-展期
					const trans = Object.assign({},this.state.form,{channelName:this.state.channelName})
					this.props.bindingRate(trans)
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
	selectType = e => {
		console.log(e)
	}
	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
	}
	sizeChange = e => {
		this.props.sizeChange(e)
		if (this.props.history.location.pathname === '/system/exmessage') { // 系统管理-展期管理
			this.props.findAllDelayRate()
		} else { // 推广管理-渠道管理-展期
			this.props.findDelayRate({
				channelName: this.state.channelName
			})
		}
	}
	onCurrentChange = e => {
		this.props.currentChange(e)
		if (this.props.history.location.pathname === '/system/exmessage') { // 系统管理-展期管理
			this.props.findAllDelayRate()
		} else { // 推广管理-渠道管理-展期
			this.props.findDelayRate({
				channelName: this.state.channelName
			})
		}
	}
	handleSearch = e => {
		e.preventDefault()
		this.props.findAllDelayRate()
	}
	render(){
		const { list, btnLoading } = this.props
		const { dialogTitle, columns, dialogVisible, form, rules, channelName } = this.state
		return(
			<div>
				{
					this.props.history.location.pathname === '/system/exmessage' &&
					<Search showChannel showState>
						<Form.Item>
							<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
						</Form.Item>
						<Form.Item>
							<Button className="margin-bottom15" type="primary" onClick={ this.openDialog.bind(this,'add') }>{'添加'}</Button>
						</Form.Item>
					</Search>
				}
				{
					this.props.history.location.pathname !== '/system/exmessage' &&
					<div>
						<Breadcrumb separator="/" className="margin-bottom15">
							<Breadcrumb.Item>
								<Link to="/generalize/channelmanage">{'渠道管理'}</Link>
							</Breadcrumb.Item>
							<Breadcrumb.Item>{'展期'}</Breadcrumb.Item>
						</Breadcrumb>
						<Button className="margin-bottom15" type="primary" onClick={ this.openDialog.bind(this,'add') }>{'添加'}</Button>
					</div>
				}
				<Loading loading={ list.loading }>
					<Table
						style={ { width: '100%' } }
						columns={ columns }
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
						<Form labelWidth="120" ref={ e => {this.form=e} } model={ form } rules={ rules }>
							<Form.Item label="渠道名称">
								<p>{ channelName }</p>
							</Form.Item>
							<Form.Item label="展期期限" prop="dayNum">
								<Input type="number" value={ form.dayNum } onChange={ this.onChange.bind(this, 'dayNum') } append="天" />
							</Form.Item>
							<Form.Item label="展期费率" prop="delayRate">
								<Input type="number" value={ form.delayRate } onChange={ this.onChange.bind(this, 'delayRate') } append="%" />
							</Form.Item>
							<Form.Item label="状态">
								<Radio.Group value={ form.status } onChange={ this.onChange.bind(this, 'status') } >
									<Radio value={ 1 }>{'启用'}</Radio>
									<Radio value={ 0 }>{'禁用'}</Radio>
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
		...bindActionCreators({sizeChange, currentChange, initSearch, findDelayRate, bindingRate, deleteDelayRate,findAllDelayRate,updateDelayState }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Exhibition)
