// 报表统计-渠道统计
import React, { Component } from 'react'
import { Table, Button, Loading, Form } from 'element-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch, menuActive } from '@redux/actions'
import { handleSearch } from './action'
import MyPagination from '@components/MyPagination'
import Search from '@components/Search'
// import num from '@global/num'
class Ditch extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
		currentChange: PropTypes.func.isRequired,
		initSearch: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    menuActive: PropTypes.func.isRequired
	}
  constructor(props){
    super(props)
    this.state = {
      columns: [
        {
          label: '#',
          width: 60,
          render: (a, b, c) => {
            return c + 1
          }
        }, {
					label: '日期',
          prop: 'date',
          width:150
				}, {
				  label: 'UV',
				  prop: 'uv'
				}, {
          label: '注册人数',
          width:100,
				  prop: 'userCount'
				}, {
          label: '个人信息',
          width: 100,
				  prop: 'emergencyCount'
				}, {
          label: '身份认证',
          width: 100,
				  prop: 'idCardCount'
				}, {
          label: '手机认证',
          width: 100,
				  prop: 'phoneDateCount'
				}, {
          label: '银行认证',
          width: 100,
				  prop: 'bankAuthenticationCount'
				}, {
          label: '申请单数',
          width: 100,
          prop: 'orderCount'
				}, {
          label: '申请率',
          width:100,
          prop: 'orderRate'
          // render: (row) => {
          //   // 申请率 = 申请单数/注册人数
          //   if (row.apply && row.register){
          //     const applyConversion = parseInt(row.apply) / parseInt(row.register)
          //     return (num.toDecimal(applyConversion))
          //   }else{
          //     return ('0.00%')
          //   }
          // }
				}, {
          label: '放款人数',
          width: 100,
				  prop: 'orderStateCount'
				}, {
          label: '放款率',
          prop: 'orderStateRate'
          // render: (row) => {
          //   // 放款率 = 放款人数/注册人数
          //   if (row.loanNum && row.register) {
          //     const loanConversion = parseInt(row.loanNum) / parseInt(row.register)
          //     return (num.toDecimal(loanConversion))
          //   } else {
          //     return ('0.00%')
          //   }
          // }
				}, {
          label: '0分申请人数',
          width:140,
				  prop: 'zeroCount'
				}, {
          label: '0分申请率',
          width: 120,
          prop: 'zeroRate',
          render: row => {
            console.log()
            const a = parseFloat(row.zeroRate)
            const b = parseFloat('15%')
            const c = a <= b ? 'green' : 'red'
            return <span className={ c }>{ row.zeroRate }</span>
          }
				}, {
				  label: '操作',
          prop: 'operate',
          width:220,
          fixed:'right',
          render: row => {
            return (
              <div>
                <Link to={ {pathname:'/statistics/ditchinside',state:{date:row.date,active:'1'}} }>
                  <Button onClick={ this.ditchType.bind(this, row.date, '1') } type="primary" size="mini">{'当天'}</Button>
                </Link>
                <Link to={ {pathname:'/statistics/ditchinside',state:{date:row.date,active:'2'}} }>
                  <Button onClick={ this.ditchType.bind(this, row.date, '2') } style={ {margin:'0 15px'} } type="primary" size="mini">{'总转化'}</Button>
                </Link>
                <Link to={ {pathname:'/statistics/ditchinside',state:{date:row.date,active:'3'}} }>
                  <Button onClick={ this.ditchType.bind(this, row.date, '3') } type="primary" size="mini">{'渠道费用'}</Button>
                </Link>
              </div>
            )
          }
				}
      ]
    }
  }
  componentWillMount() {
    this.props.initSearch()
    this.props.menuActive(this.props.location.pathname)
    window.sessionStorage.removeItem('theDay')
    window.sessionStorage.removeItem('activeName')
	}
	componentDidMount() {
		this.props.handleSearch()
  }
  ditchType = (time, type) => {
    window.sessionStorage.setItem('theDay', time)
    window.sessionStorage.setItem('activeName',type)
  }
	handleSearch = e => {
		e.preventDefault()
		this.props.handleSearch()
	}
	sizeChange = e => {
    this.props.sizeChange(e)
    this.props.handleSearch()

	}
	onCurrentChange = e => {
		this.props.currentChange(e)
		this.props.handleSearch()
	}
  render(){
    const { list } = this.props
    return (
      <div>
        <Search showTime>
          <Form.Item>
            <Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
          </Form.Item>
          <Form.Item />
        </Search>
        <Loading loading={ list.loading }>
          <Table
            style={ { width: '100%' } }
            columns={ this.state.columns }
            data={ list.data }
            border
            stripe
          />
        </Loading>
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
		...bindActionCreators({sizeChange, currentChange, initSearch, handleSearch, menuActive}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Ditch)
