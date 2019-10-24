// 推广管理-渠道管理-额度（不用了）
import React, { Component } from 'react'
import { Button, Table, Loading, Dialog, Form, Input, Radio, Breadcrumb } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { sizeChange, currentChange, initSearch, menuActive } from '@redux/actions'
import { findDelayRate, bindingRate, deleteDelayRate } from './action'
import { pageQuota } from '../../system/actions'
class Apply extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		list: PropTypes.object.isRequired,
		sizeChange: PropTypes.func.isRequired,
		currentChange: PropTypes.func.isRequired,
		initSearch: PropTypes.func.isRequired,
		findDelayRate: PropTypes.func.isRequired,
		menuActive: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired,
		bindingRate: PropTypes.func.isRequired,
		deleteDelayRate: PropTypes.func.isRequired,
		pageQuota: PropTypes.func.isRequired,
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
				status: true, // 状态
			},
			rules: {
				dayNum: [{
						required:true,
						validator: (rule, value, callback) => {
							if (value === '' || value === null) {
								callback(new Error('请输入展期期限'))
							} else {
								callback()
							}
						}
					}
				],
				delayRate: [{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '' || value === null) {
							callback(new Error('请输入展期费率'))
						} else {
							callback()
						}
					}
				}]
			},
			dialogVisible: false,
			columns: [{
						label: '#',
						width: 60,
						render: (a, b, c) => {
							return c + 1
						}
					}, {
					label: '展期期限',
					prop: 'dayNum'
				}, {
					label: '展期费率',
					prop: 'delayRate'
				}, {
					label: '状态',
					prop: 'status',
					render: row => {
						return row.status ? '启用':'禁用'
					}
				}, {
						label: '操作',
						width:80,
						fixed: 'right',
						render: row => {
							return (
								<div>
									<Button type="danger" size="mini" onClick={ this.props.deleteDelayRate.bind(this, row.id) }>{ '删除' }</Button>
								</div>
							)
						}
				}]
		}
	}
	componentWillMount() {
		this.props.initSearch()
		this.props.menuActive('/generalize/channelmanage')
	}
	componentDidMount() {
		let name = ''
		if (this.props.location.state !== undefined){
			name = this.props.location.state.date
		}else{
			const n = window.sessionStorage.getItem('channelName')
			name = n
		}

		this.props.pageQuota(name)
		this.setState({
			channelName: name,
		})
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
		// else {

		// }
	}
	saveContent = e => {
		e.preventDefault()
		this.form.validate((valid) => {
			if (valid) {
				const trans = Object.assign({},this.state.form,{channelName:this.state.channelName})
				this.props.bindingRate(trans)
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
	render(){
		const { list, btnLoading } = this.props
		const { dialogTitle, columns, dialogVisible, form, rules, channelName } = this.state
		return(
			<div>
				<Breadcrumb separator="/" className="margin-bottom15">
					<Breadcrumb.Item>
						<Link to="/generalize/channelmanage">{'渠道管理'}</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>{'额度'}</Breadcrumb.Item>
				</Breadcrumb>
				<Button className="margin-bottom15" type="primary" onClick={ this.openDialog.bind(this,'add') }>{'添加'}</Button>
				<Loading loading={ list.loading }>
					<Table
						style={ { width: '100%' } }
						columns={ columns }
						data={ list.data }
						border
						stripe
					/>
				</Loading>
				{/* <MyPagination
					onSizeChange={ this.sizeChange }
					onCurrentChange={ this.onCurrentChange }
				/> */}
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
									<Radio value>{'启用'}</Radio>
									<Radio value={ false }>{'禁用'}</Radio>
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
		...bindActionCreators({sizeChange, currentChange, initSearch, menuActive, findDelayRate, bindingRate, deleteDelayRate, pageQuota }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Apply)
