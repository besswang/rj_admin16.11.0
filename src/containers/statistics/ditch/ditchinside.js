import React, { Component } from 'react'
import { Tabs, Breadcrumb, Loading } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Todaytable from '@components/ditchTodayTable'
import Alltable from '@components/ditchAllTable'
import Costtable from '@components/ditchCostTable'
import MyPagination from '@components/MyPagination'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { pageChannelTheDayCount, pageChannelTotalCount, pageChannelCost } from './action'
class Ditchinside extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
		list: PropTypes.object.isRequired,
		sizeChange: PropTypes.func.isRequired,
		currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
    pageChannelTheDayCount: PropTypes.func.isRequired,
    pageChannelTotalCount: PropTypes.func.isRequired,
    pageChannelCost: PropTypes.func.isRequired,
	}
  constructor(props){
    super(props)
    this.state = {
      breadcrumbTitle:'',
      activeName:'',
      theDay:''
    }
  }
  componentWillMount() {
    this.props.initSearch()
    if (this.props.location.state !== undefined){
      this.setState({
        activeName: this.props.location.state.active,
        theDay: this.props.location.state.date
      })
    }else{
      this.setState({
        activeName: window.sessionStorage.getItem('activeName'),
        theDay: window.sessionStorage.getItem('theDay')
      })
    }

	}
	componentDidMount() {
    this.allFn()
  }
  allFn = () => {
    const { activeName, theDay } = this.state
    if (activeName === '1') {
      this.props.pageChannelTheDayCount({theDay:theDay})
      this.setState({
        breadcrumbTitle:'当天'
      })
    } else if (activeName === '2'){
      this.props.pageChannelTotalCount({theDay:theDay})
      this.setState({
        breadcrumbTitle: '总转化'
      })
    } else{
      this.props.pageChannelCost({theDay:theDay})
      this.setState({
        breadcrumbTitle: '渠道费用'
      })
    }
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.allFn()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.allFn()
  }
  tabChange = v => {
    const { theDay } = this.state
    window.sessionStorage.setItem('activeName', v)
    switch(v){
      case '1':
        this.setState({
          breadcrumbTitle: '当天',
          activeName:'1'
        })
        this.props.initSearch()
        this.props.pageChannelTheDayCount({theDay:theDay})
        break
      case '2':
        this.setState({
          breadcrumbTitle: '总转化',
          activeName: '2',
        })
        this.props.initSearch()
        this.props.pageChannelTotalCount({theDay:theDay})
        break
      case '3':
        this.setState({
          breadcrumbTitle: '渠道费用',
          activeName: '3',
        })
        this.props.initSearch()
        this.props.pageChannelCost({theDay:theDay})
        break
      default:
        return ''
    }
  }
  render(){
    const { list } = this.props
    const { breadcrumbTitle, activeName } = this.state
    return (
      <div>
        <Breadcrumb separator="/" className="margin-bottom15">
          <Breadcrumb.Item>
            <Link to="/statistics/ditch">
              {'渠道统计'}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{ breadcrumbTitle }</Breadcrumb.Item>
        </Breadcrumb>
        <Tabs activeName={ activeName } onTabClick={ tab => this.tabChange(tab.props.name) }>
          <Tabs.Pane label="当天" name="1">
            <Loading loading={ list.loading }>
              <Todaytable data={ list.data } />
            </Loading>
          </Tabs.Pane>
          <Tabs.Pane label="总转化" name="2">
            <Loading loading={ list.loading }>
              <Alltable data={ list.data } />
            </Loading>
          </Tabs.Pane>
          <Tabs.Pane label="渠道费用" name="3">
            <Loading loading={ list.loading }>
              <Costtable data={ list.data } />
            </Loading>
          </Tabs.Pane>
        </Tabs>
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
		...bindActionCreators({ sizeChange, currentChange, initSearch, pageChannelTheDayCount, pageChannelTotalCount,pageChannelCost }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Ditchinside)
