import React, { Component } from 'react'
// import { tree } from 'element-react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { area } from '../../mock/system/area'
import api from '@api/index'
import Tree from './tree'
class Backup extends Component {
	static propTypes = {

  }
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			options: {
				children: 'children',
				label: 'areaname'
			}
		}
	}
	componentWillMount() {
		// this.selectAreas()
  }
  componentDidMount() {
		// console.log(area[0].data)
		this.zdata(area[0].data)

	}
	zdata = data => {
		const b = data.filter(item => {
			let d = null
			// if (item.parentid === 1){
				item['children'] = []
				d = item
			// }
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
		const data = await api.selectAreasApi()
		console.log(data)
	}
	show = item => {
		console.log(item)
		return 2233
	}
	render() {
		const { data, options } = this.state
		return (
			<Tree
				ref={ e => {this.tree = e} }
				JurisArr={ data }
				options={ options }
			/>
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
