import React, { Component } from 'react'
import { Tree, Button, Message, Loading } from 'element-react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { area } from '../../mock/system/area'
import api from '@api/index'
class Backup extends Component {
	static propTypes = {

  }
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			data: [],
			options: {
				children: 'children',
				label: 'areaname'
			}
		}
	}
	componentWillMount() {

  }
  componentDidMount() {
		// this.selectAreas()
		// console.log(this.state.data)
		this.zdata(area[0].data)
		// this.zdata(this.state.data)
	}
	zdata = data => {
		const b = data.filter(item => {
			let d = null
			item['children'] = []
			d = item
			return d
		})
		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < b.length; j++) {
				if (data[i].parentid === b[j].id) {
						b[j].children.push(data[i])
				}
			}
		}
		// 过滤掉parentid不是1的对象
		const c = b.filter(item => item.parentid === 1)
		console.log(b)
		console.log(c)
		this.setState({
			data:c
		})
	}
	selectAreas = async () => {
		this.setState({
			loading:true
		})
		const data = await api.selectUnAllowableAreaApi()
		console.log(data.data)
		if(data.success){
			this.setState({
				loading:false
			})
			this.zdata(data.data)
		}

	}
	updateAreaState = async data => {
		const res = await api.updateAreaStateApi({id:data.id,state:data.state})
		if(res.success){
			this.selectAreas()
			Message.success(res.msg)
		}else{
			Message.error(res.msg)
		}
		console.log(res)
	}
	renderContent(nodeModel, data, store) {
		return (
			<div style={ { width: 'calc(100% - 30px)', display:'inline-block',position:'relative'} }>
				<span>{ data.areaname }</span>
				{/* <div style={ {display:'inline-block', width:'calc(100% - 70px)',textAlign:'center'} } className="">{ data.state === 1 ? '正常' : '禁用' }</div> */}
				<div style={ {position:'absolute',right:'50%',top:0, zIndex: 10} } className="">{ '禁用' }</div>
				<Button style={ { position:'absolute',right:'4px',top:'7px',zIndex: 10} } size="mini" onClick={ () => this.updateAreaState(data) } type="primary">{ '启用' }</Button>
			</div>
		)
	}
	render() {
		const { data, options, loading } = this.state
		console.log(data)
		return (
			<Loading loading={ loading }>
				<Tree
					data={ data }
					options={ options }
					nodeKey="id"
					expandOnClickNode={ false }
					renderContent={ (...args) => this.renderContent(...args) }
				/>
			</Loading>
		)
	}
}

// const mapStateToProps = state => {
// 	const {} = state
// 	return {}
// }
// const mapDispatchToProps = dispatch => {
// 	return {
// 		...bindActionCreators({}, dispatch)
// 	}
// }
export default connect()(Backup)
