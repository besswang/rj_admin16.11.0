import React, { Component } from 'react'
import { Button, Loading, Table, Dialog,Form, Input, Tree, Notification } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { pageRole, deleteRole, addRole, selectRolemenus, updateRolemenus } from './action'
import MyPagination from '@components/MyPagination'
class BlackUser extends Component {
	static propTypes = {
		list: PropTypes.object.isRequired,
		treeData: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		pageRole: PropTypes.func.isRequired,
		deleteRole: PropTypes.func.isRequired,
		addRole: PropTypes.func.isRequired,
		selectRolemenus: PropTypes.func.isRequired,
		updateRolemenus: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			treeKey: '',
			roleId: null,
			form:{
				roleName: null
			},
			rules: {
				roleName: [{required: true,message: '请输入角色名称',trigger: 'blur'}]
			},
			dialogVisible: false,
			treeDialogVisible: false,
			columns: [{
						label: '#',
						width: 60,
						render: (a, b, c) => {
							return c + 1
						}
					}, {
					label: '角色名称',
					prop: 'roleName'
				}, {
          label: '操作',
          render: row => {
            return (
							<div>
								<Button type="primary" size="mini" onClick={ this.openRules.bind(this,row.id) }>{'权限设置'}</Button>
								{
									(row.id !== 1 && row.roleName !== '催收员') &&
									<Button type="danger" size="mini" onClick={ this.props.deleteRole.bind(this, {roleId:row.id, state: 1}) }>{'删除'}</Button>
								}
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
		this.props.pageRole()
	}
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.pageRole()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.pageRole()
	}
	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
	}
	openDialog = e => {
		e.preventDefault()
		this.form.resetFields()
		this.setState({
			dialogVisible: true,
			roleName: null
		})
	}
	openRules = roleId => {
		const adminObj = JSON.parse(window.sessionStorage.getItem('adminInfo'))
		this.props.selectRolemenus({adminName: adminObj.adminName,roleId:roleId},this.tree)
		this.setState({
			roleId: roleId,
			treeDialogVisible: true
		})
	}
	renderTree = () => {
		this.setState({
			treeKey: +new Date()
		})
	}
	saveContent = e => {
		e.preventDefault()
		this.form.validate((valid) => {
			if (valid) {
				this.props.addRole({
					roleName: this.state.form.roleName,
				})
				this.setState({
					dialogVisible: false
				})
			} else {
				console.log('error submit!!')
				return false
			}
		})
	}
	aaa = id => {
		// const r = JSON.parse(window.sessionStorage.getItem('defaultRouter'))
		// console.log(r)
		const tree = this.props.treeData.data
		for (const i in tree) {
			const child = tree[i].children
			for(const j in child){
				if(child[j].id === id){
					return tree[i].id
				}
			}
		}
	}
	getCheckedKeys = e => {
		e.preventDefault()
		const brr = this.tree.getCheckedKeys()
		const xx = []
		for(const i in brr){
			const idd = this.aaa(brr[i])
			xx.push(idd)
		}
		const drr = [...new Set(xx)]
		const grr = brr.concat(drr)
		const frr = []
		for (const r of grr) {
			if (r) {
				frr.push(r)
			}
		}
		// 拼装后台传参格式
		if(frr.length >0){
			const arr = []
			for (let i = 0; i < frr.length; i++) {
				arr.push({
					menuId: frr[i],
					roleId: this.state.roleId
				})
			}
			this.props.updateRolemenus({rolemenus:arr})
			this.setState({
				treeDialogVisible: false
			})
		}else{
			Notification.warning('请勾选权限')
		}
	}
	render() {
		const { list, btnLoading, treeData } = this.props
		const { dialogVisible,treeKey, treeDialogVisible, rules, form } = this.state
		return (
			<div>
        <Button className="margin-bottom15" type="primary" onClick={ e => this.openDialog(e) }>{'添加'}</Button>
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
					title="添加角色"
					visible={ dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<Form labelWidth="120" ref={ e => {this.form=e} } model={ form } rules={ rules }>
							<Form.Item label="角色" prop="roleName">
								<Input value={ form.roleName } onChange={ this.onChange.bind(this, 'roleName') } />
							</Form.Item>
						</Form>
					</Dialog.Body>
					<Dialog.Footer className="dialog-footer">
						<Button onClick={ () => this.setState({ dialogVisible: false }) }>{'取 消'}</Button>
						<Button type="primary" onClick={ this.saveContent } loading={ btnLoading }>{'确 定'}</Button>
					</Dialog.Footer>
				</Dialog>

				<Dialog
					title="权限设置"
					visible={ treeDialogVisible }
					onCancel={ () => this.setState({ treeDialogVisible: false }) }
				>
					<Dialog.Body>
						<Loading loading={ treeData.loading }>
							<Tree
								ref={ e => {this.tree = e} }
								data={ treeData.data }
								options={ treeData.options }
								key={ treeKey }
								isShowCheckbox
								nodeKey="id"
								defaultCheckedKeys={ treeData.defaultCheckedKeys }
								defaultExpandedKeys={ treeData.defaultExpandedKeys }
							/>
						</Loading>
					</Dialog.Body>
					<Dialog.Footer className="dialog-footer">
						<Button onClick={ () => this.setState({ treeDialogVisible: false }) }>{'取 消'}</Button>
						<Button type="primary" onClick={ this.getCheckedKeys } loading={ btnLoading }>{'确定'}</Button>
					</Dialog.Footer>
				</Dialog>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { list, btnLoading, treeData } = state
	return { list, btnLoading, treeData }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({sizeChange, currentChange, initSearch, pageRole, deleteRole, addRole, selectRolemenus, updateRolemenus }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BlackUser)
