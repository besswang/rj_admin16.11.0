import React, { Component } from 'react'
import { Button, Loading, Table, Tooltip, Switch, Dialog,Form, Input } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectAuthentication, updateStatus, updateLoanType, updateSort } from './actions'
import MyPagination from '@components/MyPagination'
// import filter from '@global/filter'
class BlackUser extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		selectAuthentication: PropTypes.func.isRequired,
		updateStatus: PropTypes.func.isRequired,
		updateLoanType: PropTypes.func.isRequired,
		updateSort: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
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
					label: '认证标识',
					prop: 'authType'
				}, {
				  label: '认证名称',
				  prop: 'typeName'
				}, {
					label: '是否显示',
					prop: 'status',
					render: row => {
						return (
							<Tooltip
								placement="top"
								content={
									row.status === 0 ? '隐藏':'显示'
								}
							>
								<Switch
									value={ row.status }
									onColor="#13ce66"
									offColor="#ff4949"
									onValue={ 1 }
									offValue={ 0 }
									onChange={ e => this.props.updateStatus({ id: row.id, status:row.status }) }
								/>
							</Tooltip>
						)
					}
				}, {
					label: '借款是否必须认证',
					prop: 'loanType',
					render: row => {
						return (
							<Tooltip
								placement="top"
								content={
									row.loanType === 0 ? '否' : '是'
								}
							>
								<Switch
									value={ row.loanType }
									onColor="#13ce66"
									offColor="#ff4949"
									onValue={ 1 }
									offValue={ 0 }
									onChange={ e => this.props.updateLoanType({ id: row.id, loanType:row.loanType }) }
								/>
							</Tooltip>
						)
					}
				}, {
					label: '排序',
					prop: 'sort',
					render: row => {
						return (
							<Button type="text" onClick={ this.openDialog.bind(this, row) }>{ row.sort }</Button>
						)
					}
				}]
		}
	}
	componentWillMount() {
    this.props.initSearch()
  }
  componentDidMount() {
    this.props.selectAuthentication()
	}
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.selectAuthentication()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.selectAuthentication()
	}
	onChange = e => {
		this.setState({
			sort: e
		})
	}
	openDialog = r => {
		this.setState({
			dialogVisible: true,
			sort: r.sort,
			id: r.id
		})
	}
	saveContent = e => {
		e.preventDefault()
		this.props.updateSort({
			sort: this.state.sort,
			id: this.state.id
		})
		this.setState({
			dialogVisible: false
		})
	}
	render() {
		const { list, btnLoading } = this.props
		return (
			<div>
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
					title="修改排序"
					visible={ this.state.dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<Form>
							<Form.Item label="排序" labelWidth="120">
								<Input type="number" value={ this.state.sort } onChange={ e => this.onChange(e) } />
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
		...bindActionCreators({sizeChange, currentChange, initSearch, selectAuthentication, updateStatus, updateLoanType, updateSort }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BlackUser)
