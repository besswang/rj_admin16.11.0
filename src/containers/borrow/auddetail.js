import React, { Component } from 'react'
import { Button, Tabs, Breadcrumb } from 'element-react'
import Detailtable from '@components/detailTable'
import { Link } from 'react-router-dom'
import { BANK, ADDRESS, CALL_LOG } from '@meta/columns'
class Auddetail extends Component{
	constructor(props) {
		super(props)
		this.state = {
			total:25,
			pageSizes: [5,10,20,30],
			pageSize:5,
			currentPage:1,
			data: [{id:1}],
			columns:[]
		}
	}
	tabChange = (e) => {
		// console.log(e.props)
		// let {name} = this.props
		// switch (name) {
		// 	case '6':
		// 		this.setState({
		// 			columns:BANK
		// 		})
		// 	case '8':
		// 		this.setState({
		// 			columns: ADDRESS
		// 		})
		// 	default:
		// 		return '0'
		// }
	}
	render() {
		return (
			<div>
				<Breadcrumb separator="/">
					<Breadcrumb.Item>
						<Link to="/borrow/audit">{'待审核'}</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>{'审核详情'}</Breadcrumb.Item>
				</Breadcrumb>
				<div className="flex flex-direction_row justify-content_flex-end">
					<Button type="success">{'通过'}</Button>
					<Button type="danger">{'拒绝'}</Button>
				</div>
				<Tabs activeName="1" onTabClick={ this.tabChange }>
					<Tabs.Pane label="申请信息" name="1"></Tabs.Pane>
					<Tabs.Pane label="身份证信息" name="2"></Tabs.Pane>
					<Tabs.Pane label="手机认证" name="3">{'角色管理'}</Tabs.Pane>
					<Tabs.Pane label="支付宝认证" name="4">{'定时补偿任务'}</Tabs.Pane>
					<Tabs.Pane label="紧急联系人" name="5">{'用户管理'}</Tabs.Pane>
					<Tabs.Pane label="银行卡信息" name="6">
						<Detailtable columns={ BANK }/>
					</Tabs.Pane>
					<Tabs.Pane label="芝麻信用" name="7">{'角色管理'}</Tabs.Pane>
					<Tabs.Pane label="通讯录" name="8">
						<Detailtable columns={ ADDRESS }/>
					</Tabs.Pane>
					<Tabs.Pane label="通话记录" name="9">
						<Detailtable columns={ CALL_LOG }/>
					</Tabs.Pane>
				</Tabs>
			</div>
		)
	}
}
export default Auddetail