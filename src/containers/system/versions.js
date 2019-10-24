import React, { Component } from 'react'
import { Button, Loading, Table, Dialog,Form, Input, Radio } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { pageAppversion, addAppversion, updateAppversion } from './actions'
import MyPagination from '@components/MyPagination'
import validate from '@global/validate'
class BlackUser extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		pageAppversion: PropTypes.func.isRequired,
		addAppversion: PropTypes.func.isRequired,
		updateAppversion: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			dialogTitle:'',
			adminDisabled: false,
			form:{
				versionId:'',
				publisher:'',
				updateAddress:'',
				isUpdate: 0, // 是否必须更新，0是1否
				phoneType: 'ANDROID', // 手机类型
				state:0, // 状态0启用1禁用
				updateContent:''
			},
			rules: {
				versionId: [{required: true, validator: validate.versionId}],
				publisher: [
					{ required: true, message: '请输入发布人', trigger: 'blur' }
				],
				updateAddress: [
					{ required: true, message: '请输入更新地址', trigger: 'blur' }
				],
				updateContent: [
					{ required: true, message: '请输入备注', trigger: 'blur' }
				]
			},
			value: 1,
			sort: null,
			id: null,
			dialogVisible: false,
			columns: [{
						label: '#',
						width: 60,
						render: (a, b, c) => {
							return c + 1
						}
					}, {
					label: '版本号',
					prop: 'versionId'
				}, {
					label: '发布人',
					prop: 'publisher'
				}, {
					label: '更新地址',
					width: 240,
					prop: 'updateAddress',
					render: row => {
						return <a className="theme-blue" href={ row.updateAddress } target="_blank" rel="noopener noreferrer">{ row.updateAddress }</a>
					}
				}, {
					label: '是否必须更新',
					width:140,
					prop: 'isUpdate',
					render: row => {
						const y = <span className="theme-blue">{'是'}</span>
						const n = <span className="dis-red">{'否'}</span>
						const text = row.isUpdate === 1 ? y : n
						return text
					}
				}, {
					label: '手机类型',
					width:100,
					prop: 'phoneType'
				}, {
					label: '状态',
					prop: 'state',
					render: row => {
						const y = <span className="theme-blue">{'正常'}</span>
						const n = <span className="dis-red">{'禁用'}</span>
						const text = row.state === 1 ? y : n
						return text
					}
				}, {
					label: '备注',
					prop: 'updateContent'
				},{
					label:'操作',
					render: row => {
						return (
							<Button type="primary" size="mini" onClick={ this.openDialog.bind(this,row) }>{'编辑'}</Button>
						)
					}
				}]
		}
	}
	componentWillMount() {
		this.props.initSearch()
  }
  componentDidMount() {
    this.props.pageAppversion()
	}
	handleSearch = e => {
		e.preventDefault()
		this.props.pageAppversion()
	}
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.pageAppversion()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.pageAppversion()
	}
	onChange(key, value) {
		let v = null
		if(value && (typeof value === 'string')){
			v = value.trim()
		}else{
			v = value
		}
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: v })
		})
	}
	openDialog = r => {
		this.form.resetFields()
		this.setState({
			dialogVisible: true
		})
		if (r === 'add') { //添加
			console.log('add')
			this.setState({
				dialogTitle: '添加版本',
				form:{
					isUpdate: 0, // 是否必须更新，0是1否
					phoneType: 'ANDROID', // 手机类型
					state: 0 // 状态0启用1禁用
				}
			})
		} else { // 编辑
			this.setState({
				dialogTitle: '编辑版本',
				form: {
					versionId: r.versionId,
					publisher: r.publisher,
					updateAddress: r.updateAddress,
					isUpdate: r.isUpdate, // 是否必须更新，0是1否
					phoneType: r.phoneType, // 手机类型
					state: r.state, // 状态0启用1禁用
					updateContent: r.updateContent
				},
				id:r.id,
				adminDisabled: true
			})
		}
	}
	saveContent = e => {
		e.preventDefault()
		this.form.validate((valid) => {
			if (valid) {
				this.setState({
					dialogVisible: false
				})
				if (this.state.id) {
					const trans = Object.assign({},this.state.form,{id:this.state.id})
					this.props.updateAppversion(trans)
				} else {
					this.props.addAppversion(this.state.form)
				}

			} else {
				console.log('error submit!!')
				return false
			}
		})
	}
	onRadioChange(value) {
		this.setState({ value })
	}
	render() {
		const { list, btnLoading } = this.props
		const { form, rules, dialogTitle } = this.state
		return (
			<div>
				<Button type="primary" className="margin-bottom15" onClick={ this.openDialog.bind(this,'add') }>{'添加'}</Button>
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
					title= { dialogTitle }
					visible={ this.state.dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<Form labelWidth="120" model={ form } ref={ e => {this.form = e} } rules={ rules }>
							<Form.Item label="版本号" prop="versionId">
								<Input value={ form.versionId } onChange={ this.onChange.bind(this, 'versionId') } />
							</Form.Item>
							<Form.Item label="发布人" prop="publisher">
								<Input value={ form.publisher } onChange={ this.onChange.bind(this, 'publisher') } />
							</Form.Item>
							<Form.Item label="更新地址" prop="updateAddress">
								<Input value={ form.updateAddress } onChange={ this.onChange.bind(this, 'updateAddress') } />
							</Form.Item>
							<Form.Item label="是否必须更新">
								<Radio.Group value={ form.isUpdate } onChange={ this.onChange.bind(this, 'isUpdate') } >
									<Radio value={ 1 }>{'是'}</Radio>
									<Radio value={ 0 }>{'否'}</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item label="手机类型">
								<Radio.Group value={ form.phoneType } onChange={ this.onChange.bind(this, 'phoneType') }>
									<Radio value={ 'ANDROID' }>{'安卓'}</Radio>
									<Radio value={ 'IOS' }>{'苹果'}</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item label="状态">
								<Radio.Group value={ form.state } onChange={ this.onChange.bind(this, 'state') }>
									<Radio value={ 1 }>{'启用'}</Radio>
									<Radio value={ 0 }>{'禁用'}</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item label="备注" prop="updateContent">
								<Input value={ form.updateContent } onChange={ this.onChange.bind(this, 'updateContent') } />
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
		...bindActionCreators({sizeChange, currentChange, initSearch, pageAppversion, addAppversion, updateAppversion}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BlackUser)
