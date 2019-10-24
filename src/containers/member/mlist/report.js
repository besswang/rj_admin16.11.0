import React, { Component } from 'react'
import { Button, Tooltip, Layout } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import '@styles/report.less'
import { Link } from 'react-router-dom'
import Echartgauge from '@components/echartsGauge'
import EchartsBarLeft from '@components/echartsBarLeft'
import EchartsBarRight from '@components/echartsBarRight'
import phoneb from '@images/phoneb.png'
class Report extends Component{
	static propTypes = {
		reportDate: PropTypes.object
	}
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	textFn = val => {
		if(val === '0'){
			return <span className="dis-red">{'否'}</span>
		}else{
			return <span className="theme-green">{'是'}</span>
		}
	}
	render() {
		const { userInfo, lastTime, gaugeEchart,allTimes, barLeft1, barLeft2, barRight,lbs, devicesList, userFeatures } = this.props.reportDate
		return (
			<div>
				<ul className="flex flex-direction_row justify-content_flex-justify section1">
					<li className="flex flex-direction_row">
						<h5 className="title center">{'画像维度'}</h5>
						<p className="time">{'更新日期为 '}{ lastTime }</p>
					</li>
					<li>
						<Link to={ '/member/mlist' }>
							<Button className="back-btn" type="text" size="small">{ '返回会员列表' }</Button>
						</Link>
					</li>
				</ul>
				<Layout.Row gutter="10" className="section2">
					<Layout.Col xs="24" sm="24" md="24" lg="12">
					<div className="sec2 sec2-left">
						<h1 className="title">{'基本信息概况'}</h1>
						<div className="flex flex-direction_row sec2-left-bottom">
							<ul className="flex_1 left-bot-left">
								<li><span>{'身份证号码:'}</span>{ userInfo.id_number_mask }</li>
								<li><span>{'可信姓名:'}</span>{ userInfo.names }</li>
								<li><span>{'性别:'}</span>{ userInfo.gender }</li>
								<li><span>{'民族:'}</span>{ userInfo.nation }</li>
								<li><span>{'住址:'}</span>{ userInfo.address }</li>
							</ul>
							<div className="left-bot-right">
							{
								gaugeEchart.length>0 &&
								<Echartgauge gaugeData={ gaugeEchart } />
							}
								<Tooltip className="gauge-tool" effect="dark" content={
										<div className="tool-text">{'模型说明：有盾贷前评估模型是有盾特别针对互金行业提供盾一项服务。基于用户的全维度数据信息，结合有盾风控专家多年盾行业经验，有盾人工智能团队通过机器学习，数据挖掘算法，综合评判用户的信用行为，及时预警潜在的逾期风险。有盾信用评分分值从1-99分，分值越高，逾期概率越大，0分表示未评分，不在此信用评分统计值中。商户可以根据自己的业务自行选择阈值进行判断，同时，如果您希望进一步提升模型的效果，使其更加符合您的业务，您也可以直接咨询有盾商务。'}</div>
										} placement="top"
								>
									<Button className="gauge-btn" type="primary">{'有盾贷前模型'}</Button>
								</Tooltip>
							</div>
						</div>
					</div>
					</Layout.Col>
					<Layout.Col xs="24" sm="24" md="24" lg="12">
					<div className="sec2 sec2-right">
						<div className="flex flex-direction_row justify-content_flex-justify">
							<h1 className="title">{'用户特征'}</h1>
							<ul className="flex flex-direction_row sec2-title-right">
								<li><i className="color-block col1" />{'高危'}</li>
								<li><i className="color-block col2" />{'警示'}</li>
								<li><i className="color-block col3" />{'中立'}</li>
								<li><i className="color-block col4" />{'未触发'}</li>
								<li>
									<Tooltip className="tool" effect="dark" content={
										<div className="tool-text">{'有盾大数据系统根据用户的互联网交易行为、黑名单匹配情况、操作行为等多维度来识别用户的特征，特征下的日期为该用户最近一次满足该特征的日期，同时特征颜色反应了用户在互联网借贷行业失信风险的高低程度，红色最高，黄色次之，绿色最低，蓝色为中性特征，灰色表示该特征未被触发'}</div>
										} placement="left"
									>
										<i className="el-icon-information col5" />
									</Tooltip>
								</li>
							</ul>
						</div>
						<ul className="sec2-right-bottom flex flex-direction_row flex-wrap">
						{
							userFeatures.map(item => {
								return (
									<li key={ item.id } className={ item.time !== '' ? item.color:'height46' }>
										<Tooltip effect="dark" content={ item.tooltip }>
											<p className="center sec2-right-name">{ item.text }</p>
											{
												item.time !== '' &&
												<p className="center sec2-right-time">{ item.time }</p>
											}
										</Tooltip>
									</li>
								)
							})
						}
							{/* <li><Tooltip effect="dark" content="命中法院失信明单">{'法院失信'}</Tooltip></li>
							<li className="tag1"><Tooltip effect="dark" content="命中有网贷失信明单">{'网贷失信'}</Tooltip></li>
							<li className="tag2"><Tooltip effect="dark" content="有盾云慧眼系统识别出该用户有过活体攻击行为">{'活体攻击'}</Tooltip></li>
							<li className="tag3"><Tooltip effect="dark" content="命中有盾疑似团伙欺诈名单库">{'疑似欺诈团伙'}</Tooltip></li> */}
						</ul>
					</div>
					</Layout.Col>
				</Layout.Row>
				<section className="section3">
					<h1 className="title">{'信贷行为'}</h1>
					<Layout.Row gutter="10">
						<Layout.Col xs="24" sm="24" md="12" lg="9">
						{
							barLeft1.length > 0 &&
							<EchartsBarLeft />
						}
						</Layout.Col>
						<Layout.Col xs="24" sm="24" md="12" lg="9">
						{
							barRight.length > 0 &&
							<EchartsBarRight />
						}
						</Layout.Col>
						<Layout.Col xs="24" sm="24" md="12" lg="6" className="sec3-right">
							<p>{'总申请借款平台数: '}<span>{ barLeft1[0] }</span></p>
							<p>{'总借款平台数: '}<span>{ barLeft2[0] }</span></p>
							<p>{'总还款平台数: '}<span>{ barRight[0] }</span></p>
							<p>{'还款笔数: '}<span>{ allTimes }{'笔'}</span></p>
						</Layout.Col>
					</Layout.Row>
				</section>
				<section className="section4">
					<h1 className="title">{'LBS画像'}</h1>
					<hr style={ {height:'1px',background:'#bfbfbf',border:'none'} }/>
					<Layout.Row gutter="10" className="sec4-con">
						{
							lbs.proxyIp !== null &&
							<Layout.Col xs="24" sm="24" md="12" lg="6">
								<p>{'是否使用代理IP: '}{ this.textFn(lbs.proxyIp) }</p>
								<p>{'是否在不良区域申请: '}{ this.textFn(lbs.badArea) }</p>
							</Layout.Col>
						}
						<Layout.Col xs="24" sm="24" md="12" lg="6">
						{
							lbs.badIp !== null &&
							<p>{'是否命中不良IP: '}{ this.textFn(lbs.badIp) }</p>
						}
							<p>{'设备关联IP网段数量: '}{lbs.sum}</p>
						</Layout.Col>
						<Layout.Col xs="24" sm="24" md="12" lg="6">
							{
								lbs.badStation !==null &&
								<p>{'是否命中不良基站: '}{this.textFn(lbs.badStation)}</p>
							}
							<p>{'常用IP归属地: '}{lbs.place}</p>
						</Layout.Col>
						{
							lbs.wifimac !==null &&
							<Layout.Col xs="24" sm="24" md="12" lg="6">
								<p>{'是否命中不良wifi-mac: '}{this.textFn(lbs.wifimac)}</p>
							</Layout.Col>
						}
					</Layout.Row>
				</section>
				<section className="section6">
					<h1 className="title">{'关联信息'}</h1>
					<div className="subhead">
						<h4 className="sec6-subhead-title">{'移动设备情况'}</h4>
						<span className="sec6-subhead-info"><a>{'*'}</a>{'该用户共使用'}<span className="sec6-subhead-num">{ devicesList.length }</span>{'个设备，下方仅展示设备的最新信息'}</span>
					</div>
					<div className="sec6-con">
					{
						devicesList.length>0 &&
						devicesList.map((item,index) => {
							return (
								<Layout.Row key={ item.device_id } gutter="10" className="sec6-list flex flex-direction_row align-items_center justify-content_flex-center">
									<Layout.Col xs="24" sm="24" md="12" lg="8" className="sec6-left">
										<div className="flex flex-direction_row align-items_center">
											<div className="sec6-img">
												<img className="phoneb" src={ phoneb } alt=""/>
											</div>
											<ul className="sec6-left-info">
												<li className="sec6-left-title">{ item.device_name }</li>
												<li className="sec6-phone-info"><span>{'设备ID: '}</span>{ item.device_id }</li>
											</ul>
										</div>
									</Layout.Col>
									<Layout.Col xs="24" sm="24" md="12" lg="16">
										<div className="flex flex-direction_row align-items_center sec6-right">
											<ul className="sec6-right-ul flex_1">
												<li><span>{'最近使用时间: '}</span>{ item.device_last_use_date }</li>
												<li><span className="orange">{'设备使用用户数: '}</span>{ item.device_link_id_count }{'人'}</li>
											</ul>
											<ul className="sec6-right-ul flex_1">
											{
												item.device_detail.is_using_proxy_port &&
												<li><span>{'设备使用代理: '}</span>{ this.textFn(item.device_detail.is_using_proxy_port) }</li>
											}
												<li><span>{'网络类型: '}</span>{ item.device_detail.network_type }</li>
											</ul>
											<ul className="sec6-right-ul flex_1">
												{
													item.device_detail.is_rooted &&
													<li><span>{'设备越狱（root）: '}</span>{ this.textFn(item.device_detail.is_rooted) }</li>
												}
												{
													item.device_detail.cheats_device &&
													<li><span className="orange">{'是否安装作弊软件: '}</span>{this.textFn(item.device_detail.cheats_device)}</li>
												}
												{
													item.device_detail.app_instalment_count &&
													<li><span className="orange">{'借贷App安装数量: '}</span>{ item.device_detail.app_instalment_count }</li>
												}
											</ul>
										</div>
									</Layout.Col>
								</Layout.Row>
							)
						})
					}
					</div>
				</section>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { reportDate } = state
	return { reportDate }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Report)
