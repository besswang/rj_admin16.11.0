import React from 'react'
import { Message, Layout,Card } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import Time from '@components/setime'
import api from '@api/index'
import '@styles/welcome.less'
import { WEL1 } from '@meta/welcome'
import * as math from 'mathjs'
class Welcome extends React.Component{
	static propTypes = {
		history: PropTypes.object.isRequired,
		router: PropTypes.object.isRequired
	}
	constructor(props) {
		super(props)
		this.state = {
			time: {},
			wel1: [],
			sec1:null,
			sec2:null
		}
	}
	componentWillMount() {

	}
	componentDidMount() {
		const wel = this.props.router.defaultRouter.filter(item => item.text === '欢迎页')
		if (wel[0].hideInMenu){
			return false
		}
		this.initData()
		this.initData2()
	}
	search = () => {
		this.initData()
		this.initData2()
	}
	initData = async () => {
		const res = await api.selectHomePageDateApi()
		if(res.success){
			const arr = []
			let obj = {}
			for (const i in WEL1) {
				obj = {
					id: WEL1[i].id,
					value: res.data[WEL1[i].value] ? res.data[WEL1[i].value] : 0,
					icon: WEL1[i].icon,
					bg: WEL1[i].bg,
					text: WEL1[i].text
				}
				arr.push(obj)
			}
			this.setState({
				wel1: arr,
				sec1:res.data
			})
		}else{
			// if(res.msg === '请先登录'){
			// 	// setTimeout(() => {
			// 		this.props.history.push('/login')
			// 	// },1000)
			// }
			// Message.warning(res.msg)
			if(res.msg === '没有权限'){
				console.log('没有权限')
			}else{
				Message.warning(res.msg)
			}
		}
	}
	initData2 = async () => {
		const res = await api.selectHomePageApi()
		if (res.success) {
			this.setState({
				sec2:res.data
			})
		}else{
			Message.warning(res.msg)
		}
	}
	num = (x,y) => {
		if(x && y){
			return `${ math.round(x / y, 4)*100 }%`
		}else{
			return '0%'
		}
	}
	render(){
		const { router } = this.props
		const { wel1, sec1, sec2 } = this.state
		const wel = router.defaultRouter.filter( item => item.text === '欢迎页')
		if (wel[0].hideInMenu) {
			return ''
		}else{
			return(
				<div>
					{/* <div className="section">
						<Time handleTime={ data => this.setState({ time: data }) }/>
						<Button type="primary" className="margin_left15" onClick={ this.search }>{'查询'}</Button>
					</div> */}
					<div className="section margin-bottom15">
							{/* <h1 className="title">{'统计'}</h1> */}
							<Layout.Row gutter="50" className="margin-bottom15 margin_top15">
							{
								wel1.length > 0 &&
									wel1.map((item) => {
											return (
												<Layout.Col xs="24" sm="24" md="12" lg="6" key={ item.id }>
													<div className="sec-bg flex flex-direction_row align-items_center" style={ { 'backgroundImage':`url(${ item.bg })` } }>
														<i className={ `${ item.icon }` } />
														<div className="flex_1">
															<span className="money">{ item.value }</span>
															<p className="info">{ item.text }</p>
														</div>
													</div>
												</Layout.Col>
											)
									})
							}
							</Layout.Row>
							{
								sec1 !== null &&
								<Layout.Row gutter="20" className="card-row">
									<Layout.Col xs="24" sm="24" md="8" lg="8">
										<Card
											header={
												<div className="clearfix">
													<span>{'今日借款申请'}</span>
												</div>
											}
										>
											<ul className="card-body flex flex-direction_row flex-wrap">
												<li>
													{/* 借款申请人数 = 新客申请人数+复借申请人数 */}
													<h1>{ math.add(sec1.toDayNewApply,sec1.toDayOldApply) }</h1>
													<p>{'借款申请人数'}</p>
												</li>
												<li>
													{/* 借款总金额 = 新客借款总金额+复借借款总金额 */}
													<h1>{ math.add(sec1.toDayNewApplyMoney,sec1.toDayOldApplyMoney) }</h1>
													<p>{'借款总金额'}</p>
												</li>
												<li>
													<h1>{ sec1.toDayNewApply }</h1>
													<p>{'新客申请人数'}</p>
												</li>
												<li>
													<h1>{ sec1.toDayNewApplyMoney }</h1>
													<p>{'新客借款总金额'}</p>
												</li>
												<li>
													<h1>{ sec1.toDayOldApply }</h1>
													<p>{'复借申请人数'}</p>
												</li>
												<li>
													<h1>{ sec1.toDayOldApplyMoney }</h1>
													<p>{'复借借款总金额'}</p>
												</li>
											</ul>
										</Card>
									</Layout.Col>
									<Layout.Col xs="24" sm="24" md="8" lg="8">
										<Card
											header={
												<div className="clearfix">
													<span>{'今日放款订单 (所有下单用户)'}</span>
												</div>
											}
										>
											<ul className="card-body flex flex-direction_row flex-wrap">
												<li>
													{/* 通过订单量 = 新客通过订单量+复借通过订单量 */}
													<h1>{ math.add(sec1.toDayNewPass,sec1.toDayOldPass) }</h1>
													<p>{'通过订单量'}</p>
												</li>
												<li>
													{/* 通过订单总金额 = 新客通过订单总金额+复借通过订单总金额 */}
													<h1>{ math.add(sec1.toDayNewPassMoney,sec1.toDayOldPassMoney) }</h1>
													<p>{'通过订单总金额'}</p>
												</li>
												<li>
													<h1>{ sec1.toDayNewPass }</h1>
													<p>{'新客通过订单量'}</p>
												</li>
												<li>
													<h1>{ sec1.toDayNewPassMoney }</h1>
													<p>{'新客通过订单总金额'}</p>
												</li>
												<li>
													<h1>{ sec1.toDayOldPass }</h1>
													<p>{'复借通过订单量'}</p>
												</li>
												<li>
													<h1>{ sec1.toDayOldPassMoney }</h1>
													<p>{'复借通过订单总金额'}</p>
												</li>
												<li>
													<h1>{ sec1.toDayRegisterApply }</h1>
													<p>{'今日注册订单量'}</p>
												</li>
												<li>
													<h1>{ sec1.toDayRegisterApplyMoney }</h1>
													<p>{'今日注册订单总金额(包含通过和拒绝)'}</p>
												</li>
											</ul>
										</Card>
									</Layout.Col>
									<Layout.Col xs="24" sm="24" md="8" lg="8">
										<Card
											header={
												<div className="clearfix">
													<span>{'今日放款订单 (今日下单用户)'}</span>
												</div>
											}
										>
											<ul className="card-body flex flex-direction_row flex-wrap">
												<li>
													{/* 放款订单量 = 新客放款订单量+复借放款订单量 */}
													<h1>{ math.add(sec1.toDayNewLoan,sec1.toDayOldLoan) }</h1>
													<p>{'放款订单量'}</p>
												</li>
												<li>
													{/* 放款总金额 = 新客放款总金额+复借放款总金额 */}
													<h1>{ math.add(sec1.toDayNewLoanMoney,sec1.toDayOldLoanMoney) }</h1>
													<p>{'放款总金额'}</p>
												</li>
												<li>
													<h1>{ sec1.toDayNewLoan }</h1>
													<p>{'新客放款订单量'}</p>
												</li>
												<li>
													<h1>{ sec1.toDayNewLoanMoney }</h1>
													<p>{'新客放款总金额'}</p>
												</li>
												<li>
													<h1>{ sec1.toDayOldLoan }</h1>
													<p>{'复借放款订单量'}</p>
												</li>
												<li>
													<h1>{ sec1.toDayOldLoanMoney }</h1>
													<p>{'复借放款总金额'}</p>
												</li>
											</ul>
										</Card>
									</Layout.Col>
								</Layout.Row>
							}
							{ sec2 !== null && sec1 !== null &&
								<Layout.Row className="margin-bottom15">
									<Layout.Col xs="24" sm="24" md="12" lg="12">
										<div className="sec-bg flex flex-direction_row align-items_center sec-bg1" style={ { 'width':'60%','margin':'auto' } }>
											<i className="icon iconfont icon-Personal" />
											<div className="flex_1">
												{/* 转化率 = 申请/注册 */}
												<span className="money">{ this.num(sec2.toDayApply,sec1.toDayRegister) }</span>
												<p className="info">{ '转化率' }</p>
											</div>
										</div>
									</Layout.Col>
									<Layout.Col xs="24" sm="24" md="12" lg="12">
										<div className="sec-bg flex flex-direction_row align-items_center sec-bg2" style={ { 'width':'60%','margin':'auto' } }>
											<i className="icon iconfont icon-icon_shakehands" />
											<div className="flex_1">
												<span className="money">{ this.num(sec2.toDayRiskPass, sec2.toDayIsRisk) }</span>
												<p className="info">{ '风控通过率 (风控通过数/风控调用数)' }</p>
											</div>
										</div>
									</Layout.Col>
								</Layout.Row>
							}
							{
								sec2 !== null &&
								<Layout.Row gutter="20" className="card-row2">
									<Layout.Col xs="24" sm="24" md="8" lg="8">
										<Card
											header={
												<div className="clearfix">
													<span>{'到期订单'}</span>
												</div>
											}
										>
											<ul className="card-body flex flex-direction_row flex-wrap">
												<li>
													<h1>{ sec2.toDayExpire }</h1>
													<p>{'当日到期订单数'}</p>
												</li>
												<li>
													<h1>{ sec2.toDayExpireMoney }</h1>
													<p>{'当日到期金额'}</p>
												</li>
												<li>
													<h1>{ sec2.toDayAllExpire }</h1>
													<p>{'总到期订单数'}</p>
												</li>
												<li>
													<h1>{ sec2.toDayAllExpireMoney }</h1>
													<p>{'总到期金额'}</p>
												</li>
											</ul>
										</Card>
									</Layout.Col>
									<Layout.Col xs="24" sm="24" md="8" lg="8">
										<Card
											header={
												<div className="clearfix">
													<span>{'还款订单'}</span>
												</div>
											}
										>
											<ul className="card-body flex flex-direction_row flex-wrap">
												<li>
													<h1>{ sec2.toDayRepay }</h1>
													<p>{'当日还款订单量'}</p>
												</li>
												<li>
													<h1>{ sec2.toDayRepayMoney }</h1>
													<p>{'当日还款金额'}</p>
												</li>
												<li>
													<h1>{ sec2.toDayAllRepay }</h1>
													<p>{'总还款订单量'}</p>
												</li>
												<li>
													<h1>{ sec2.toDayAllRepayMoney }</h1>
													<p>{'总还款金额'}</p>
												</li>
											</ul>
										</Card>
									</Layout.Col>
									<Layout.Col xs="24" sm="24" md="8" lg="8">
										<Card
											header={
												<div className="clearfix">
													<span>{'续期订单'}</span>
												</div>
											}
										>
											<ul className="card-body flex flex-direction_row flex-wrap">
												<li>
													<h1>{ sec2.toDayDelay }</h1>
													<p>{'今日续期订单量'}</p>
												</li>
												<li>
													<h1>{ sec2.toDayDelayMoney }</h1>
													<p>{'今日续期总金额'}</p>
												</li>
												<li>
													<h1>{ sec2.toDayAllDelay }</h1>
													<p>{'总续期订单量'}</p>
												</li>
												<li>
													<h1>{ sec2.toDayAllDelayMoney }</h1>
													<p>{'总续期总金额'}</p>
												</li>
											</ul>
										</Card>
									</Layout.Col>
									<Layout.Col xs="24" sm="24" md="8" lg="8">
										<Card
											header={
												<div className="clearfix">
													<span>{'线下还款订单'}</span>
												</div>
											}
										>
											<ul className="card-body flex flex-direction_row flex-wrap">
												<li>
													<h1>{ sec2.toDayUnderLine }</h1>
													<p>{'当日线下还款订单量'}</p>
												</li>
												<li>
													<h1>{ sec2.toDayUnderLineMoney }</h1>
													<p>{'当日线下还款金额'}</p>
												</li>
												<li>
													<h1>{ sec2.toDayAllUnderLine }</h1>
													<p>{'总线下还款订单量'}</p>
												</li>
												<li>
													<h1>{ sec2.toDayAllUnderLineMoney }</h1>
													<p>{'总线下还款金额'}</p>
												</li>
											</ul>
										</Card>
									</Layout.Col>
									<Layout.Col xs="24" sm="24" md="8" lg="8">
										<Card
											header={
												<div className="clearfix">
													<span>{'未到期订单'}</span>
												</div>
											}
										>
											<ul className="card-body flex flex-direction_column flex-wrap align-items_center">
												<li>
													<h1>{ sec2.toDayNoExpire }</h1>
													<p>{'未到期订单量'}</p>
												</li>
												<li>
													<h1>{ sec2.toDayNoExpireMoney }</h1>
													<p>{'未到期订单金额'}</p>
												</li>
											</ul>
										</Card>
									</Layout.Col>
									<Layout.Col xs="24" sm="24" md="8" lg="8">
										<Card
											header={
												<div className="clearfix">
													<span>{'逾期订单'}</span>
												</div>
											}
										>
											<ul className="card-body flex flex-direction_column flex-wrap align-items_center">
												<li>
													<h1>{ sec2.toDayOverdue }</h1>
													<p>{'逾期订单订单量'}</p>
												</li>
												<li>
													<h1>{ sec2.toDayOverdueMoney }</h1>
													<p>{'逾期订单订单金额'}</p>
												</li>
											</ul>
										</Card>
									</Layout.Col>
								</Layout.Row>
						}
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
export default connect(mapStateToProps)(Welcome)