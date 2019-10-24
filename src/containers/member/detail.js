import React, { Component } from 'react'
import { Breadcrumb } from 'element-react'
import { Link } from 'react-router-dom'
class Detail extends Component{
	constructor(props){
		super(props)
		this.state = {

		}
	}
	componentWillMount() {

	}
	componentDidMount() {

	}
	render(){
		return(
			<div>
				<Breadcrumb separator="/">
					{/* <Breadcrumb.Item>会员管理</Breadcrumb.Item> */}
					<Breadcrumb.Item>
						<Link to="/member/mlist">
							{'会员列表'}
						</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>{'会员详情'}</Breadcrumb.Item>
				</Breadcrumb>
			</div>
		)
	}
}
export default Detail