import React, { Component } from 'react'
import { Breadcrumb, Tabs, Button, Table, Loading, Dialog, Message } from 'element-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initSearch } from '@redux/actions'
import { selectIdCardByUserId, emergency, bankInfo, selectReportMail, selectReport, selectPhoneDateByUserId, selectUserSms,selectPresentationByUserId } from './action'
import Detailtable from '@components/detailTable'
import { BANK, ADDRESS, CALL_LOG, NOTE, DEVICES_LIST } from '@meta/columns'
import '@styles/detail.less'
import timeDate from '@global/timeDate'
import filter from '@global/filter'
import api from '@api/index'
import ReportDetail from '../member/mlist/report'
class Detail extends Component{
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    listInfo: PropTypes.object,
    list: PropTypes.object,
    idCardInfo: PropTypes.object,
    selectIdCardByUserId: PropTypes.func.isRequired,
    emergency:PropTypes.func.isRequired,
    bankInfo: PropTypes.func.isRequired,
    selectReportMail:PropTypes.func.isRequired,
    selectReport: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
    areaLoading: PropTypes.bool,
    selectPhoneDateByUserId: PropTypes.func.isRequired,
    selectUserSms: PropTypes.func.isRequired,
    selectPresentationByUserId: PropTypes.func.isRequired
  }
  constructor(props) {
      super(props)
      this.state = {
        dialogVisible: false,
        dialogImageUrl:'',
        name: '',
        title:'',
        linkUrl:'',
        listInfo: {},
        activeName: '1',
        mobileData:'',
        phoneInfo:{}, // 手机设备
        btnLoading: false,
        faceInfo:{}, // 人脸识别结果
        userId:null,
        devicesListList:[],// 设备信息
        graphDetail:{}, // 图谱统计值
        performanceInfo:{}, // 履约信息
        requestInfo:{} // 申请信息
      }
  }
	componentWillMount() {
    this.props.initSearch()
    if (this.props.location.state !== undefined) {
      this.setState({
        name: this.props.location.state.name,
        title: this.props.location.state.title,
        linkUrl: this.props.location.state.url,
        listInfo:this.props.listInfo,
        activeName: '1',
        userId: this.props.listInfo.userId ? this.props.listInfo.userId : this.props.listInfo.id
      })
    } else {
      const s = JSON.parse(window.sessionStorage.getItem('locationState'))
      const r = JSON.parse(window.sessionStorage.getItem('detailList'))
      this.setState({
        name: s.name,
        title: s.title,
        linkUrl: s.url,
        listInfo:r,
        userId: r.userId ? r.userId : r.id,
        activeName: window.sessionStorage.getItem('activeName')
      })
    }
	}
	componentDidMount() {
    console.log(this.state.activeName)
    this.tabChange(this.state.activeName)
    // this.selectFaceAuthResultOther({userId:this.state.userId})
  }
  selectMobileReport = async (obj) => {
    this.setState({
      btnLoading: true
    })
    const res = await api.selectMobileReportApi(obj)
    if (res.success) {
      this.setState({
        mobileData:res.data,
        btnLoading: false
      })
    }else{
      Message.warning(res.msg)
    }
  }
  faceFetch = async (obj) => {
    this.setState({
      btnLoading: true
    })
    const res = await api.selectFaceAuthResultApi(obj)
    if (res.success) {
      this.setState({
        faceInfo: res.data,
      })
    }else{
      Message.warning(res.msg)
    }
  }
  selectLoginDate = async (obj) => {
    const res = await api.selectLoginDateApi(obj)
    console.log(res.data)
    if (res.success) {
      this.setState({
        phoneInfo: {
          one: res.data.arrFingerMark !== null ? res.data.arrFingerMark[0] : '', // 设备号
          arrPhoneType: res.data.arrPhoneType !== null ? res.data.arrPhoneType.join(' , '):'', // 型号
          simulator: res.data.simulator ? '是' : '否', //模拟器
          arrAddress: res.data.arrAddress !== null ? res.data.arrAddress.join(' , ') : '', //定位地址
          arrFingerMark: res.data.arrFingerMark !== null ? res.data.arrFingerMark.join(' , ') : '', //手机关联设备
          arrPhone: res.data.arrPhone !== null ? res.data.arrPhone.join(' , ') : '', //设备关联手机
          ci1: res.data.arrFingerMark !== null ? res.data.arrFingerMark.length:0,
          ci2: res.data.arrPhone !== null ? res.data.arrPhone.length : 0
        }
      })
    }else{
      Message.warning(res.msg)
    }
  }
  selectFaceAuthResultOther = async (obj) => {
    this.setState({
      btnLoading: true
    })
    const res = await api.selectFaceAuthResultOtherApi(obj)
    if (res.success) {
      this.setState({
        devicesListList: res.data.devicesListList,
        graphDetail: res.data.graphDetail,
        performanceInfo: res.data.performanceInfo,
        requestInfo: res.data.requestInfo
      })
    } else {
      Message.warning(res.msg)
    }
  }
  tabChange = (e) => {
    window.sessionStorage.setItem('activeName',e)
    // this.setState({
    //   userId: this.state.listInfo.userId ? this.state.listInfo.userId : this.state.listInfo.id
    // })
    // const userId = this.state.listInfo.userId ? this.state.listInfo.userId : this.state.listInfo.id
    const { userId } = this.state
    switch (e) {
      case '1':{ // 身份证信息
        return this.selectFaceAuthResultOther({userId: userId})
      }
      case '2':{ // 身份证信息
        this.faceFetch({userId: userId})
        return this.props.selectIdCardByUserId({userId: userId})
      }
      case '3':{ // 手机认证
        this.selectMobileReport({userId: userId})
        return this.props.selectPhoneDateByUserId({userId: userId})
      }
      case '4':{ // 紧急联系人
        return this.props.emergency({userId: userId})
      }
      case '5':{ // 银行卡信息
        return this.props.bankInfo({userId: userId})
      }
      case '6': // 通讯录
        this.props.initSearch()
        this.props.selectReportMail({userId:userId})
        break
      case '7': // 通话记录
        this.props.initSearch()
        this.props.selectReport({userId:userId})
        break
      case '8': // 短信详情
        this.props.initSearch()
        this.props.selectUserSms({userId:userId})
        break
      case '9': // 报告
        this.props.selectPresentationByUserId({userId:userId})
        break
      case '10': // 手机设备
        this.selectLoginDate({userId:userId})
        break
      default:
        return ''
    }
  }
  text = obj => {
    if(obj){
      const t = JSON.parse(obj)
      return t.living_attack === '0' ? '未检测到活体攻击' : '存在活体攻击风险'
    }
  }
  goReport = () => {
    console.log(this.state.mobileData)
    if (this.state.mobileData){
      const a = document.createElement('a')
      a.setAttribute('target', '_blank')
      a.setAttribute('rel', 'noopener noreferrer')
      a.setAttribute('href', this.state.mobileData)
      a.click()
    }
  }
  openDialog = url => {
		this.setState({
			dialogVisible: true,
			dialogImageUrl: url
		})
  }
	render(){
    const { idCardInfo, list } = this.props
    const { name, title, linkUrl, listInfo, activeName, userId, dialogVisible, dialogImageUrl, btnLoading, phoneInfo,faceInfo, devicesListList, graphDetail, performanceInfo, requestInfo } = this.state
		return(
			<div>
				<Breadcrumb separator="/" className="margin-bottom15">
					<Breadcrumb.Item>
						<Link to={ linkUrl }>{ title }</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>{'用户详情'}</Breadcrumb.Item>
				</Breadcrumb>
        <Tabs activeName={ activeName } onTabClick={ tab => this.tabChange(tab.props.name) }>
          {
              name === '申请信息' &&
              <Tabs.Pane label={ name } name="1">
                <ul className="flex flex-direction_column info-ul">
                  <li className="flex flex-direction_row info-li">
                    <p>{'真实姓名：'}{ listInfo.realName }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'手机号码：'}{ listInfo.phone }</p>
                    <p>{'借款金额：'}{ listInfo.applyMoney }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'申请期限：'}{ listInfo.applyTerm }</p>
                    <p>{'申请时间：'}{ timeDate.time(listInfo.gmt, 'yyyy-MM-dd hh:mm:ss') }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'审核状态：'}{ filter.auditType(listInfo.state) }</p>
                    <p>{'贷款利率：'}{ listInfo.moneyRate }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'息费：'}{ listInfo.rateMoney }</p>
                    <p>{'服务费：'}{ listInfo.serviceMoney }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'到期应还：'}{ listInfo.repaymentMoney }</p>
                    <p>{'应放金额：'}{ listInfo.loanMoney }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'实际还款：'}{ listInfo.realRepaymentMoney }</p>
                    <p>{'逾期费用：'}{ listInfo.overdueMoney }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'约定还款时间：'}{ listInfo.repaymentDate }</p>
                    <p>{'还款时间：'}{ listInfo.finalDate }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'优惠券：'}</p>
                    <p>{'打款单号：'}{ listInfo.loanNumber }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'打款方式：'}{ filter.payType(listInfo.loanMode) }</p>
                    <p>{'打款账号：'}{ listInfo.accountNumber }</p>
                  </li>
                </ul>
              </Tabs.Pane>
          }
          {
            name === '用户信息' &&
            <Tabs.Pane label={ name } name="1">
              <ul className="flex flex-direction_column info-ul">
                <li className="flex flex-direction_row info-li">
                  <p>{'真实姓名：'}{ listInfo.realName }</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'注册手机：'}{ listInfo.phone }</p>
                  <p>{'会员状态：'}{ listInfo.type === 0? '禁用':'启用' }</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'最后登陆时间：'}{ timeDate.time(listInfo.upt, 'yyyy-MM-dd hh:mm:ss') }</p>
                  <p>{'登陆IP地址：'}{ listInfo.loginIp }</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'注册时间：'}{ timeDate.time(listInfo.gmt, 'yyyy-MM-dd hh:mm:ss') }</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'家庭住址：'}</p>
                  <p>{'月收入：'}</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'单位名称：'}</p>
                  <p>{'单位电话：'}</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'单位地址：'}</p>
                  <p>{'职业：'}</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'QQ：'}</p>
                  <p>{'微信：'}</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'昵称：'}</p>
                  <p>{'性别：'}</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'借款次数：'}{ listInfo.loanNum }</p>
                  <p>{'登陆次数：'}</p>
                </li>
              </ul>
              <h4 className="detail-title">{'图谱统计值'}</h4>
              {
                graphDetail !== null &&
                <ul className="flex flex-direction_row graph-detail">
                  <li>{'使用手机号个数：'}{graphDetail.mobileCount}</li>
                  <li>{'关联用户数：'}{graphDetail.linkUserCount}</li>
                  <li>{'使用设备数：'}{graphDetail.linkDeviceCount}</li>
                </ul>
              }

              <h4 className="detail-title">{'设备信息'}</h4>
              {
                devicesListList !== null &&
              <Table
                style= { { width: '100%' } }
                columns= { DEVICES_LIST }
                data= { devicesListList }
                border
                stripe
              />
              }

              <h4 className="detail-title">{'统计'}</h4>
              {
                performanceInfo !== null && requestInfo !== null &&
                 <ul className="flex flex-direction_row face-ul">
                  <li className="flex flex-direction_column align-items_center">
                    <p>{''}</p>
                    <p>{'申请次数'}</p>
                    <p>{'总申请平台数'}</p>
                    <p>{'放款次数'}</p>
                    <p>{'放款平台数'}</p>
                    <p>{'履约次数'}</p>
                    <p>{'履约平台数'}</p>
                  </li>
                  <li className="flex flex-direction_column align-items_center">
                    <p>{'近1天(包含今日和昨日)'}</p>
                    <p>{ requestInfo.requestCount1d }</p>
                    <p>{ requestInfo.requestOrgCount1d }</p>
                    <p>{ performanceInfo.loanCount1d }</p>
                    <p>{ performanceInfo.loanOrgCount1d }</p>
                    <p>{ performanceInfo.performanceCount1d }</p>
                    <p>{ performanceInfo.performanceOrgCount1d }</p>
                  </li>
                  <li className="flex flex-direction_column align-items_center">
                    <p>{'近7天'}</p>
                    <p>{ requestInfo.requestCount7d }</p>
                    <p>{ requestInfo.requestOrgCount7d }</p>
                    <p>{ performanceInfo.loanCount7d }</p>
                    <p>{ performanceInfo.loanOrgCount7d }</p>
                    <p>{ performanceInfo.performanceCount7d }</p>
                    <p>{ performanceInfo.performanceOrgCount7d }</p>
                  </li>
                  <li className="flex flex-direction_column align-items_center">
                    <p>{'近15天'}</p>
                    <p>{ requestInfo.requestCount15d }</p>
                    <p>{ requestInfo.requestOrgCount15d }</p>
                    <p>{ performanceInfo.loanCount15d }</p>
                    <p>{ performanceInfo.loanOrgCount15d }</p>
                    <p>{ performanceInfo.performanceCount15d }</p>
                    <p>{ performanceInfo.performanceOrgCount15d }</p>
                  </li>
                  <li className="flex flex-direction_column align-items_center">
                    <p>{'近30天'}</p>
                    <p>{ requestInfo.requestCount30d }</p>
                    <p>{ requestInfo.requestOrgCount30d }</p>
                    <p>{ performanceInfo.loanCount30d }</p>
                    <p>{ performanceInfo.loanOrgCount30d }</p>
                    <p>{ performanceInfo.performanceCount30d }</p>
                    <p>{ performanceInfo.performanceOrgCount30d }</p>
                  </li>
                 </ul>
              }
             {
               performanceInfo !== null &&
               <p className="per-time">{'最近履约时间:'}{performanceInfo.lastPerformanceTime}</p>
             }
            </Tabs.Pane>
          }
          <Tabs.Pane label="身份证信息" name="2">
            {/* <Loading loading={ areaLoading }> */}
              <ul className="flex flex-direction_column info-ul">
                <li className="flex flex-direction_row info-li">
                  <p>{'身份证信息'}</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  {
                    idCardInfo.idcardFrontPhoto &&
                    <div className="photo">
                      <img src = { `data:image/jpeg;base64,${ idCardInfo.idcardFrontPhoto }` } alt="" onClick={ this.openDialog.bind(this,`data:image/jpeg;base64,${ idCardInfo.idcardFrontPhoto }`) } />
                      <p>{'身份证正面'}</p>
                    </div>
                  }
                  {
                    idCardInfo.idcardBackPhoto &&
                    <div className="photo">
                      <img src={ `data:image/jpeg;base64,${ idCardInfo.idcardBackPhoto }` } alt="" onClick={ this.openDialog.bind(this,`data:image/jpeg;base64,${ idCardInfo.idcardBackPhoto }`) } />
                      <p>{'身份证反面'}</p>
                    </div>
                  }
                  {
                    idCardInfo.livingPhoto &&
                    <div className="photo">
                      <img src={ `data:image/jpeg;base64,${ idCardInfo.livingPhoto }` } alt="" onClick={ this.openDialog.bind(this,`data:image/jpeg;base64,${ idCardInfo.livingPhoto }`) } />
                      <p>{'人脸照片'}</p>
                    </div>
                  }
                  {
                    faceInfo.idcardPortraitPhoto &&
                    <div className="photo">
                      <img src={ `data:image/jpeg;base64,${ faceInfo.idcardPortraitPhoto }` } alt="" onClick={ this.openDialog.bind(this,`data:image/jpeg;base64,${ faceInfo.idcardPortraitPhoto }`) } />
                      <p>{'头像图片'}</p>
                    </div>
                  }
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'姓名：'}{ idCardInfo.realName }</p>
                  <p>{'性别：'}{ idCardInfo.gender }</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'民族：'}{ faceInfo.nation }</p>
                  <p>{'出生日期：'}{ faceInfo.birthday }</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'年龄：'}{ faceInfo.age }</p>
                  <p>{'身份证号：'}{ idCardInfo.idNumber}</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'家庭住址：'}{ idCardInfo.address }</p>
                  <p>{'签发机关：'}{ idCardInfo.issuingAuthority }</p>
                </li>
                <li className="flex flex-direction_row info-li">
                   <p>{'实名认证结果：'}{ filter.verifyStatus(idCardInfo.verifyStatus) }</p>
                  <p>{'有效期：'}{ idCardInfo.validityPeriod }</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'风险标签：'}{ this.text(idCardInfo.riskTag) }</p>
                  <p>{'认证日期：'}{ timeDate.time(idCardInfo.gmt, 'yyyy-MM-dd hh:mm:ss') }</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'商户唯一订单号：'}{ idCardInfo.partnerOrderId }</p>
                  <p>{'分类检测：'}{ filter.classify(faceInfo.classify) }</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'分类检测置信度(0-1)：'}{ faceInfo.classifyScore }</p>
                  <p>{'人脸比对相似度(0-1)：'}{ faceInfo.similarity }</p>
                </li>
                <li className="flex flex-direction_row info-li">
                   <p>{'不通过原因：'}{ faceInfo.failReason }</p>
                  <p>{'比对结果：'}{ filter.authResult(faceInfo.authResult) }</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'认证结果：'}{ filter.resultStatus(faceInfo.resultStatus) }</p>
                </li>
              </ul>
            {/* </Loading> */}
          </Tabs.Pane>
          <Tabs.Pane label="手机认证" name="3">
            <ul className="flex flex-direction_column info-ul">
              <li className="flex flex-direction_row info-li">
                <p>{'真实姓名：'}{ listInfo.realName }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'认证手机号：'}{ idCardInfo.phone }</p>
                <p>{'认证时间：'}{ timeDate.time(idCardInfo.gmt, 'yyyy-MM-dd hh:mm:ss') }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'认证状态：'}{ filter.personalType(idCardInfo.mobileType) }</p>
              </li>
            </ul>
            <div className="flex flex-direction_row justify-content_flex-end">
              <Button loading={ btnLoading } size="small" type="primary" className="margin_top15" onClick={ this.goReport.bind(this) }>{'查看手机报表'}</Button>
            </div>
          </Tabs.Pane>
          <Tabs.Pane label="紧急联系人" name="4">
            <ul className="flex flex-direction_column info-ul">
              <li className="flex flex-direction_row info-li">
                <p>{'真实姓名：'}{ listInfo.realName }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'亲属姓名：'}{ idCardInfo.relativesName }</p>
                <p>{'亲属关系：'}{ idCardInfo.relatives }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'亲属电话：'}{ idCardInfo.relativesPhone }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'社会姓名：'}{ idCardInfo.sociologyName }</p>
                <p>{'社会关系：'}{ idCardInfo.sociology }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'社会电话：'}{ idCardInfo.sociologyPhone }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'认证状态：'}{ filter.personalType(idCardInfo.personalType) }</p>
                <p>{'认证时间：'}{ timeDate.time(idCardInfo.gmt, 'yyyy-MM-dd hh:mm:ss') }</p>
              </li>
            </ul>
          </Tabs.Pane>
          <Tabs.Pane label="银行卡信息" name="5">
            <Loading loading={ list.loading }>
              <Table
                style={ { width: '100%' } }
                columns={ BANK }
                data={ list.data }
                border
                stripe
              />
            </Loading>
          </Tabs.Pane>
          <Tabs.Pane label="通讯录" name="6">
            <Detailtable columns={ ADDRESS } num={ 1 } userId={ userId } />
          </Tabs.Pane>
          <Tabs.Pane label="通话记录" name="7">
            <Detailtable columns={ CALL_LOG } num={ 2 } userId={ userId }/>
          </Tabs.Pane>
          <Tabs.Pane label="短信详情" name="8">
            <Detailtable columns={ NOTE } num={ 3 } userId={ userId }/>
          </Tabs.Pane>
          <Tabs.Pane label="报告" name="9">
            <ReportDetail />
          </Tabs.Pane>
          <Tabs.Pane label="手机设备" name="10" className="tab10">
            <ul className="flex flex-direction_column tab10-ul">
              <li><span>{'设备号: '}</span>{ phoneInfo.one }</li>
              <li><span>{'型号: '}</span>{phoneInfo.arrPhoneType}</li>
              <li><span>{'模拟器: '}</span>{ phoneInfo.simulator }</li>
              <li><span>{'定位地址: '}</span>{ phoneInfo.arrAddress }</li>
              <li><span>{'手机关联设备: '}</span><i>{phoneInfo.ci1}{'次'}</i>{ phoneInfo.arrFingerMark }</li>
              <li><span>{'设备关联手机: '}</span><i>{phoneInfo.ci2}{'次'}</i>{ phoneInfo.arrPhone }</li>
            </ul>
          </Tabs.Pane>
        </Tabs>
        <Dialog
				visible={ dialogVisible }
        size="tiny"
				onCancel={ () => this.setState({ dialogVisible: false }) }
        >
					<img width="100%" src={ dialogImageUrl } alt="" />
        </Dialog>
			</div>
		)
	}
}
const mapStateToProps = state => {
	const { listInfo, idCardInfo, list, areaLoading } = state
	return { listInfo, idCardInfo, list, areaLoading }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ selectIdCardByUserId, emergency, bankInfo, initSearch, selectReportMail, selectReport,selectPhoneDateByUserId, selectUserSms, selectPresentationByUserId }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail)
