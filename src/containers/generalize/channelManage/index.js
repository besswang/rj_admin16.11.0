import React, { Component } from 'react'
import { Button, Table, Loading, Dialog, Form, Input, Radio, Message } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { sizeChange, currentChange, initSearch, menuActive } from '@redux/actions'
import { selectChannel, insertChannel, updateChannel, prohibitChannel, selectRoleD, updateChannelById } from './action'
import MyPagination from '@components/MyPagination'
import Search from '@components/Search'
import SelectPicker from '@components/SelectPicker'
import { PROMOTION_TYPE } from '@meta/select'
import DisableBtn from '@components/DisableBtn'
import validate from '@global/validate'
import filter from '@global/filter'
class Apply extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		list: PropTypes.object.isRequired,
		sizeChange: PropTypes.func.isRequired,
		currentChange: PropTypes.func.isRequired,
		initSearch: PropTypes.func.isRequired,
		selectChannel: PropTypes.func.isRequired,
		menuActive: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired,
		insertChannel: PropTypes.func.isRequired,
		updateChannel: PropTypes.func.isRequired,
		prohibitChannel: PropTypes.func.isRequired,
		selectRoleD: PropTypes.func.isRequired,
		updateChannelById: PropTypes.func.isRequired,
		loanRole: PropTypes.arrayOf(
			PropTypes.object
		)
	}
	constructor(props) {
		super(props)
		this.state = {
			adminId: null,
			dialogVisible2:false,
			dialogTitle:'',
			id: null,
			generType:'',
			form: {
				channelName: '', // 渠道名称,
				daiName: '', // 贷超名称,
				price: null, // 单价,
				machineScore: null, // 机审分数,
				userScore: null, // 人工分数
				firstMoney: null, // 首借额度
				remake: '', // 备注,
				riskType: 'RUIJING' // PAIXU("排序-米融B"),RUIJING("瑞鲸-米融A")
			},
			rules: {
				channelName: [{required: true,message: '请输入渠道名称',trigger: 'blur'}],
				daiName: [{required: true,message: '请输入超贷名称',trigger: 'blur'}],
				firstMoney: [{required: true, validator: validate.edu}],
				price:[{required: true, validator: validate.moneyType}],
				machineScore: [{required: true, validator: validate.machfen}],
				userScore: [{required: true, validator: validate.userfen}],
				remake: [{required: true,message: '请输入备注',trigger: 'blur'}]
			},
			dialogVisible: false,
			columns: [{
						label: '#',
						width: 60,
						render: (a, b, c) => {
							return c + 1
						}
					}, {
					label: '渠道名称',
					width: 120,
					prop: 'channelName'
				}, {
					label: '超贷名称',
					width: 100,
					prop: 'daiName'
				}, {
					label: '推广链接',
					prop: 'extensionLink',
					width:280,
					render: row => {
						return (<div className="flex"><a className="theme-blue flex_1" href={ row.extensionLink } target="_blank" rel="noopener noreferrer">{ row.extensionLink }</a></div>)
					}
					// render: row =>{
					// 	return <Button type="text" onClick={ this.copy.bind(this,row.extensionLink) }>{ row.extensionLink }</Button>
					// }
				}, {
					label: '渠道查看链接',
					prop: 'selectLink',
					width: 280,
					render: row => {
						return (<div className="flex"><a className="theme-blue flex_1" href={ row.selectLink } target="_blank" rel="noopener noreferrer">{ row.selectLink }</a></div>)
					}
				}, {
					label: '单价',
					prop: 'price'
				}, {
					label: '推广方式',
					width: 100,
					prop: 'type'
				},
				//  {
				// 	label: '推广费用',
				// 	prop: 'money'
				// },
				{
					label: '机审分数',
					width: 100,
					prop: 'machineScore'
				}, {
					label: '人工审核分数',
					width: 140,
					prop: 'userScore'
				}, {
					label: '首借额度',
					width: 100,
					prop: 'firstMoney'
				}, {
					label: '风控类型',
					width: 100,
					prop: 'riskType',
					render: row => {
						const data = filter.riskType(row.riskType)
						return data
					}
				}, {
					label: '备注',
					width:120,
					prop: 'remake'
				}, {
					label: '状态',
					prop: 'state',
					render: row => {
						const y = <span className="theme-blue">{'正常'}</span>
						const n = <span className="dis-red">{'禁用'}</span>
						return (row.state === 1 ? y: n)
					}
				}, {
						label: '操作',
						width:260,
						fixed: 'right',
						render: row => {
							return (
								<div>
									<Button type="primary" size="mini" onClick={ this.openDialog.bind(this, row) }>{'编辑'}</Button>
									<DisableBtn value={ row.state } result={ 0 } text={ ['启用','禁用'] } onClick={ this.props.prohibitChannel.bind(this,{channelName:row.channelName,id:row.id,state:row.state}) }/>
									<Link to={ {pathname:'/generalize/exhibition',state:{date:row.channelName}} } className="margin_right10">
										<Button type="success" size="mini" onClick={ this.ditchType.bind(this, row.channelName) }>{'展期'}</Button>
									</Link>
									<Link to={ {pathname:'/generalize/channellimit',state:{date:row.channelName}} } className="margin_right10">
										<Button type="warning" size="mini" onClick={ this.ditchType.bind(this, row.channelName) }>{'额度'}</Button>
									</Link>
									<Button type="primary" size="mini" onClick={ this.openDialog2.bind(this, row.id) }>{'绑定'}</Button>
								</div>
							)
						}
				}]
		}
	}
	componentWillMount() {
		this.props.initSearch()
		this.props.menuActive(this.props.location.pathname)
		// window.sessionStorage.clear()
		window.sessionStorage.removeItem('channelName')
	}
	componentDidMount() {
		this.props.selectChannel()
		this.props.selectRoleD()
	}
	// copy = url => {
  //  // 执行浏览器复制
  //  document.execCommand('Copy')
	// }
	ditchType = (name) => {
    window.sessionStorage.setItem('channelName', name)
  }
	handleSearch = e => {
		e.preventDefault()
		this.props.selectChannel()
	}
	sizeChange = e => {
		this.props.sizeChange(e)
		this.props.selectChannel()
	}
	onCurrentChange = e => {
		this.props.currentChange(e)
		this.props.selectChannel()
	}
	openDialog = obj => {
		console.log(obj.type)
		this.setState({
			dialogVisible: true
		})
		this.form.resetFields()
		if(obj === 'add'){
			this.setState({
				dialogTitle:'添加',
				id: null
			})
		} else {
			this.setState({
				dialogTitle:'编辑',
				generType:obj.type,
				form:{
					channelName: obj.channelName,
					daiName: obj.daiName,
					price: obj.price,
					machineScore: obj.machineScore,
					userScore: obj.userScore,
					firstMoney: obj.firstMoney,
					remake: obj.remake,
					riskType: obj.riskType
				},
				id: obj.id
			})
		}
	}
	saveContent = e => {
		e.preventDefault()
		this.form.validate((valid) => {
			if (valid) {
				if(this.state.id){// 编辑
					const pam = {}
					const { form } = this.state
					for (const i in form) {
						if (form['riskType'] === 'PAIXU' || form['riskType'] === 'QS') {
							form['machineScore'] = null
							form['userScore'] = null
						}
						if (form[i]){
							pam[i] = form[i]
						}
					}
					const data = Object.assign({},pam,{id:this.state.id},{type:this.state.generType})
					this.props.updateChannel(data)
				}else{//添加
					this.props.insertChannel(this.state.form)
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
	openDialog2 = id => {
		this.setState({
			dialogVisible2: true,
			id:id
		})
	}
	onChange2 = val => {
		this.setState({
			adminId:val
		})
	}
	saveContent2 = () => {
		if (this.state.adminId !==null){
			const data = Object.assign({},{id:this.state.id},{adminId:this.state.adminId})
			this.props.updateChannelById(data)
			this.setState({
				adminId: null,
				dialogVisible2: false,
				id: null
			})
		}else{
			Message.warning('请选择贷超角色！')
			return false
		}
	}
	onChange3 = val => {
		this.setState({
			generType:val
		})
	}
	render(){
		const { list, btnLoading, loanRole } = this.props
		const { dialogTitle, columns, dialogVisible, form, rules, id, dialogVisible2, adminId, generType } = this.state
		return(
			<div>
				<Search showChannel>
					<Form.Item>
						<Button onClick={ this.handleSearch } type="primary" className="margin_right10">{'搜索'}</Button>

						{/* <Button type="primary" onClick={ this.openDialog.bind(this,'add') }>{'添加'}</Button> */}
						<Link to={ {pathname:'/generalize/add'} }>
							<Button type="primary">{'添加'}</Button>
						</Link>
					</Form.Item>
					<Form.Item />
				</Search>
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
							<Form.Item label="渠道名称" prop="channelName">
								<Input disabled={ id ? true : false } value={ form.channelName } onChange={ this.onChange.bind(this, 'channelName') } />
							</Form.Item>
							<Form.Item label="贷超名称" prop="daiName">
								<Input value={ form.daiName } onChange={ this.onChange.bind(this, 'daiName') } />
							</Form.Item>
							<Form.Item label="单价" prop="price">
								<Input type="number" value={ form.price } onChange={ this.onChange.bind(this, 'price') } append="元" />
							</Form.Item>
							<Form.Item label="推广方式">
								<SelectPicker
									stringValue={ generType }
									onChange={ v => this.onChange3(v) }
									clearable={ 1 }
									optionsArr={ PROMOTION_TYPE }
									placeholder={ '选择方式' }
								/>
							</Form.Item>
							{
								form.riskType !== 'PAIXU' && form.riskType !== 'QS' &&
								<div>
									<Form.Item label="机审分数" prop="machineScore">
										<Input type="number" value={ form.machineScore } onChange={ this.onChange.bind(this, 'machineScore') } append="分" />
									</Form.Item>
									<Form.Item label="人工审核分数" prop="userScore">
										<Input type="number" value={ form.userScore } onChange={ this.onChange.bind(this, 'userScore') } append="分" />
									</Form.Item>
								</div>
							}
							<Form.Item label="首借额度" prop="firstMoney">
								<Input type="number" value={ form.firstMoney } onChange={ this.onChange.bind(this, 'firstMoney') } append="元" />
							</Form.Item>
							<Form.Item label="备注" prop="remake">
								<Input value={ form.remake } onChange={ this.onChange.bind(this, 'remake') } />
							</Form.Item>
							<Form.Item label="选择风控">
								<Radio.Group value={ form.riskType } onChange={ this.onChange.bind(this,'riskType') }>
									<Radio value="RUIJING">{'米融A风控'}</Radio>
									<Radio value="PAIXU">{'米融B风控'}</Radio>
									<Radio value="MOXIE">{'米融C风控'}</Radio>
									<Radio value="QS">{'米融D风控'}</Radio>
								</Radio.Group>
							</Form.Item>
						</Form>
					</Dialog.Body>
					<Dialog.Footer className="dialog-footer">
						<Button onClick={ () => this.setState({ dialogVisible: false }) }>{'取 消'}</Button>
						<Button type="primary" onClick={ this.saveContent } loading={ btnLoading }>{'确 定'}</Button>
					</Dialog.Footer>
				</Dialog>
				<Dialog
					title={ '绑定' }
					visible={ dialogVisible2 }
					onCancel={ () => this.setState({ dialogVisible2: false }) }
				>
					<Dialog.Body>
						<Form labelWidth="120">
							<Form.Item label="贷超角色">
								<SelectPicker
									value={ adminId }
									onChange={ val => this.onChange2(val) }
									options={ loanRole }
									clearable = { 1 }
									placeholder={ '选择角色' }
								/>
							</Form.Item>
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
	const { list, btnLoading, loanRole } = state
	return { list, btnLoading, loanRole }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({sizeChange, currentChange, initSearch, menuActive, selectChannel, insertChannel, updateChannel, prohibitChannel, selectRoleD, updateChannelById}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Apply)
