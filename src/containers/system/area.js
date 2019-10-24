import React, { Component } from 'react'
import { Select, Message, Button, Loading, Table } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import api from '@api/index'
import { sizeChange, currentChange, initSearch, requestPosts, receivePosts, failurePosts } from '@redux/actions'
import { selectUnAllowableArea } from './actions'
import MyPagination from '@components/MyPagination'
class Backup extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
		list: PropTypes.object.isRequired,
		sizeChange: PropTypes.func.isRequired,
		currentChange: PropTypes.func.isRequired,
		initSearch: PropTypes.func.isRequired,
		selectUnAllowableArea: PropTypes.func.isRequired,
		requestPosts: PropTypes.func.isRequired,
		receivePosts: PropTypes.func.isRequired,
		failurePosts: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props)
		this.state = {
			btnLoading: false,
			selectBtnLoading:false,
			province: [], // 省
			city: [], // 市
			area: [], // 区
			country: [], //乡
			provinceId: null,
			cityId: null,
			areaId: null,
			countryId:null,
			id:null,
			columns: [{
						label: '#',
						width: 60,
						render: (a, b, c) => {
							return c + 1
						}
					}, {
					label: '地区',
					prop: 'areaname'
				}, {
					label: '状态',
					render: () => {
						return <span className="dis-red">{'禁用'}</span>
					}
				}, {
					label: '操作',
					render: row => {
						return (
							<Button className="margin_left15" type="primary" size="mini" onClick={ this.updateAreaState.bind(this,1,row.id) }>{ '启用' }</Button>
						)
					}
				}
			]
		}
	}
	componentWillMount() {
		this.props.initSearch()
	}
  componentDidMount() {
		this.selectProvince()
		this.props.selectUnAllowableArea(this.props.history)
		// if (res.msg === '请先登陆') {
		// 	setTimeout(() => {
				// this.props.history.push('/login')
		// 	}, 3000)
		// }
	}
	selectProvince = async () => {
		const data = await api.selectAreasByIdApi()
		if(data.success){
			this.setState({
				province: data.data,
			})
		}else{
			Message.error(data.msg)
		}
	}
	selectCity = async id => {
		const data = await api.selectAreasByIdApi({id:id})
		if (data.success) {
			this.setState({
				city: data.data
			})
		} else {
			Message.error(data.msg)
		}
	}
	selectArea = async id => {
		const data = await api.selectAreasByIdApi({
			id: id
		})
		if (data.success) {
			this.setState({
				area: data.data
			})
		} else {
			Message.error(data.msg)
		}
	}
	selectCountry = async id => {
		const data = await api.selectAreasByIdApi({
			id: id
		})
		if (data.success) {
			this.setState({
				country: data.data
			})
		} else {
			Message.error(data.msg)
		}
	}
	onChangePro = e => {
		this.setState({
			id: e,
			provinceId: e,
			cityId:null,
			areaId:null,
			countryId: null
		})
		if(e !== ''){
			this.selectCity(e)
		}else{
			this.setState({
				provinceId: null,
				cityId: null,
				areaId: null,
				countryId: null
			})
		}
	}
	onChangeCity = e => {
		this.setState({
			id: e,
			cityId:e,
			areaId: null,
			countryId: null
		})
		if (e !== '') {
			this.selectArea(e)
		}
	}
	onChangeArea = e => {
		this.setState({
			id: e,
			areaId:e,
			countryId: null
		})
		if( e !== ''){
			this.selectCountry(e)
		}
	}
	onChangeCountry = e => {
		this.setState({
			id: e,
			countryId:e
		})
	}
	updateAreaState = async (type, rowId) => {
		const id = this.state.id
		let rId = null
		if (rowId !== null && type !== 0) {
			// 列表中的启用
			rId = rowId
		}else{
			// select 中的启用/禁用
			if(id === null){
				Message.warning('请选择地区')
				return false
			}else{
				if (type === 0){ // 禁用
					this.setState({
						btnLoading: true
					})
				}else{ // 启用
					this.setState({
						selectBtnLoading: true
					})
				}
				rId = id
			}
		}
		this.props.currentChange(1)
		this.props.requestPosts()
		const res = await api.updateAreaStateApi({id:rId,state:type})
		if(res.success){
			Message.success(res.msg)
			this.props.selectUnAllowableArea()
			this.setState({
				provinceId: null,
				cityId: null,
				areaId: null,
				countryId: null,
				id: null,
				selectBtnLoading: false,
				btnLoading: false
			})
		}else{
			this.props.failurePosts()
			Message.error(res.msg)
		}
	}
	sizeChange = e => {
    this.props.sizeChange(e)
    this.props.selectUnAllowableArea()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.selectUnAllowableArea()
	}
	render() {
		const { list } = this.props
		const { province, provinceId, btnLoading, selectBtnLoading } = this.state
		return (
			<div>
				<Select
					onChange={ e => this.onChangePro(e) }
					value={ provinceId }
					clearable
					placeholder="选择省"
				>
					{
						province &&
						province.map(el => {
							return (<Select.Option key={ el.id } label={ el.areaname } value={ el.id } />)
						})
					}
				</Select>
				{/* { city.length>0 && provinceId !=='' && provinceId !==null &&
					<Select
						onChange={ e => this.onChangeCity(e) }
						value={ cityId }
						clearable
						placeholder="选择市"
					>
						{
							city.map(el => {
								return (<Select.Option key={ el.id } label={ el.areaname } value={ el.id } />)
							})
						}
					</Select>
				} */}
				{/* {
					area.length > 0 && cityId !== '' && cityId !== null && provinceId !== null &&
					<Select
						onChange={ e => this.onChangeArea(e) }
						value={ areaId }
						clearable
						placeholder="选择区"
					>
						{
							area.map(el => {
								return (<Select.Option key={ el.id } label={ el.areaname } value={ el.id } />)
							})
						}
					</Select>
				} */}
				{/* { country.length>0 && areaId !=='' && areaId !== null && provinceId !==null &&
					<Select
						onChange={ e => this.onChangeCountry(e) }
						value={ countryId }
						clearable
						placeholder="选择乡"
					>
						{
							country.map(el => {
								return (<Select.Option key={ el.id } label={ el.areaname } value={ el.id } />)
							})
						}
					</Select>
				} */}
				<Button className="margin_left15" onClick={ this.updateAreaState.bind(this, 0) } type="warning" loading={ btnLoading }>{ '禁用' }</Button>
				<Button className="margin_left15" onClick={ this.updateAreaState.bind(this, 1, null) } type="primary" loading={ selectBtnLoading }>{ '启用' }</Button>

				<Loading loading={ list.loading } className="margin_top15">
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
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { list } = state
	return { list }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({sizeChange, currentChange, initSearch, selectUnAllowableArea, requestPosts, receivePosts, failurePosts}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Backup)
