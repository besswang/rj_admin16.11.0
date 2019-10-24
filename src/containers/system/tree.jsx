import React, { Component } from 'react'
import { Tree, Button } from 'element-react'
import PropTypes from 'prop-types'
import api from '@api/index'
export default class Juris extends Component {
	static propTypes = {
		JurisArr: PropTypes.arrayOf(
			PropTypes.object.isRequired
		),
		options: PropTypes.object.isRequired,
  }
	append(store, data) {
		store.append({ id: this.id++, label: '新增权限', children: [] }, data)
	}

	// remove(store, data) {
	// 	// store.remove(data)
	// 	console.log(store)
	// 	console.log(data)
	// }
	updateAreaState = async data => {
		const d = await api.updateAreaStateApi({id:data.id,state:data.state})
		console.log(d)
	}
	renderContent(nodeModel, data, store) {
		return (
			<div style={ { width: 'calc(100% - 30px)', display:'inline-block',position:'relative'} }>
				<span>{ data.areaname }</span>
				{/* <div style={ {display:'inline-block', width:'calc(100% - 70px)',textAlign:'center'} } className="">{ data.state === 1 ? '正常' : '禁用' }</div> */}
				<div style={ {position:'absolute',right:'50%',top:0, zIndex: 10} } className="">{ data.state === 1 ? '正常' : '禁用' }</div>
				<Button style={ { position:'absolute',right:'4px',top:'7px',zIndex: 10} } size="mini" onClick={ () => this.updateAreaState(data) } type="primary">{ '启用' }</Button>
			</div>
		)
	}

	render() {
		const { JurisArr, options } = this.props
		return (
			<div className="admin__user__juris">
				<Tree
					data={ JurisArr }
					options={ options }
					nodeKey="id"
					expandOnClickNode={ false }
					defaultExpandedKeys={ [1] }
					renderContent={ (...args) => this.renderContent(...args) }
				/>
			</div>
		)
	}
}
