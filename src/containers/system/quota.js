import React, { Component } from 'react'
import { Button, Loading, Table, Dialog,Form, Input } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { pageuserQuota, adduserquota, updateuserquota, deleteuserquota } from './actions'
import MyPagination from '@components/MyPagination'
import validate from '@global/validate'
class BlackUser extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		pageuserQuota: PropTypes.func.isRequired,
		adduserquota: PropTypes.func.isRequired,
		updateuserquota: PropTypes.func.isRequired,
		deleteuserquota: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			dialogTitle:'',
			adminDisabled: false,
			form:{
				orderNumber: null,
				money: null,
			},
			rules: {
				orderNumber:[{required: true, validator: validate.ci}],
				money: [{required: true, validator: validate.edu}]
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
					label: '借款次数',
					prop: 'orderNumber'
				}, {
					label: '提额额度',
					prop: 'money'
				},{
          label: '操作',
          render: row => {
            return (
							<div>
								<Button type="primary" size="mini" onClick={ this.openDialog.bind(this,row) }>{'编辑'}</Button>
								<Button type="danger" size="mini" onClick={ this.props.deleteuserquota.bind(this, row.id) }>{'删除'}</Button>
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
    this.props.pageuserQuota()
	}
	handleSearch = e => {
		e.preventDefault()
		this.props.pageuserQuota()
	}
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.pageuserQuota()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.pageuserQuota()
	}
	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
	}
	openDialog = r => {
		this.form.resetFields()
		this.setState({
			dialogVisible: true
		})
		if (r === 'add') { //添加
			this.setState({
				dialogTitle: '添加提额额度',
				form: {
					orderNumber: null,
					money: null,
				},
				id: null,
				adminDisabled: false
			})
		} else { // 编辑
			console.log(r)
			this.setState({
				dialogTitle: '编辑提额额度',
				form: {
					orderNumber: r.orderNumber,
					money: r.money,
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
					this.props.updateuserquota(trans)
				} else {
					this.props.adduserquota(this.state.form)
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
		const { form, rules, dialogTitle, adminDisabled } = this.state
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
							<Form.Item label="借款次数" prop="orderNumber">
								<Input disabled={ adminDisabled } type="number" value={ form.orderNumber } onChange={ this.onChange.bind(this, 'orderNumber') } />
							</Form.Item>
							<Form.Item label="提额额度" prop="money">
								<Input type="number" value={ form.money } onChange={ this.onChange.bind(this, 'money') } />
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
		...bindActionCreators({sizeChange, currentChange, initSearch, pageuserQuota, adduserquota, updateuserquota,deleteuserquota }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BlackUser)
