import React from 'react'
import { Button } from 'element-react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { tabAdd } from '../redux/actions'
import Echart from '@components/echarts'
import Time from '@components/setime'
import api from '@api/index'
import '@styles/welcome.less'
class Welcome extends React.Component{
	static propTypes = {
		router: PropTypes.object.isRequired,
		tabAdd: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props)
		this.state = {
			time: {},
			overdueCount: 0, // 逾期数
			loanCount: 0, // 申请贷款数
			auditFailureCount: 0, // 审核失败数
			registerCount: 0, // 注册app数
			authenticationCount: 0 // 认证信息数
		}
	}
	componentWillMount() {
		this.initData()
		this.props.tabAdd({
			name: '欢迎页'
		})
	}
	componentDidMount() {

	}
	search = () => {
		this.initData()
	}
	initData = async () => {
		const res = await api.selectTotalLogByTimeApi(this.state.time)
		if(res.success){
			this.setState({
				overdueCount:res.data.overdueCount,
				loanCount: res.data.loanCount,
				auditFailureCount: res.data.auditFailureCount,
				registerCount: res.data.registerCount,
				authenticationCount: res.data.authenticationCount
			})
		}
	}
	render(){
		const { router } = this.props
		const wel = router.defaultRouter.filter( item => item.text === '欢迎页')
		if (wel[0].hideInMenu) {
			return ''
		}else{
			return(
				<div>
					<div className="section">
						<Time handleTime={ data => this.setState({ time: data }) }/>
						<Button type="primary" className="margin_left15" onClick={ this.search }>{'查询'}</Button>
					</div>
					<div className="section">
							<h1 className="title">{'统计'}</h1>
							<ul className="flex flex-direction_row justify-content_flex-center wel-ul">
								<li>
									<p>{'逾期数'}</p>
									<span>{ this.state.overdueCount }</span>
								</li>
								<li>
									<p>{'申请贷款数'}</p>
									<span>{ this.state.loanCount }</span>
								</li>
								<li>
									<p>{'审核失败数'}</p>
									<span>{ this.state.auditFailureCount }</span>
								</li>
								<li>
									<p>{'注册app数'}</p>
									<span>{ this.state.registerCount }</span>
								</li>
								<li>
									<p>{'认证信息数'}</p>
									<span>{ this.state.authenticationCount }</span>
								</li>
							</ul>
					</div>
					<div className="section">
						<Echart/>
					</div>
				</div>
			)
		}
	}
}
const mapStateToProps = state => {
	const { router } = state
	return { router }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ tabAdd }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Welcome)