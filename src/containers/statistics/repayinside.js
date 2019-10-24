import React, { Component } from 'react'
import {
  Pagination,
  Breadcrumb,
  Table
} from 'element-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
class RepayInside extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeName:'1',
      data: [],
      columns:[],
      tabValue:null,
      total:15,
      pageSize:5,
      pageSizes:[5,10,15],
      currentPage:1,
      tabName: this.props.match.params.tabName
    }
  }
  componentWillMount() {
    console.log('componentWillMount')
    console.log(this.props)
  }
  componentDidMount() {
    console.log('componentDidMount')
    // console.log(this.state.tabName)
    this.getList(this.state.tabName)
  }
  bread() {
    // console.log(this.props.match.params)
    // let {tabName,id} = this.props.match.params
    // console.log(this.state.tabName)
    const tabName = this.state.tabName
    // let tabName = this.props.match.params.tabName
    const url = `/statistics/repayment/${ tabName }`
    const text = (tabName === '1' ? '还款单分析' : '还款金额分析')
    return (
      <Link to={ `${ url }` }>
        { text }
      </Link>
    )
    // return text
  }
  getList = (name) => {
    switch (name) {
      case '1':
        this.setState({
          columns:[{
              type:'index'
            },{
              label: '渠道名称',
              prop: 'daiName',

            }, {
              label: '应还人数',
              prop: ''
            }, {
              label: '实还单数',
              prop: ''
            }, {
              label: '未还单数',
              prop: ''
            }, {
              label: '还款率'
            }, {
              label: '全额单数',
              prop: ''
            }, {
              label: '续期单数',
              prop: ''
            }, {
              label: '全款率',
              prop: ''
            }, {
              label: '续期率'
            }, {
              label: '新客应还单数',
              prop: ''
            }, {
              label: '老客应换单数',
              prop: ''
            }, {
              label: '新客已还单数',
              prop: ''
            }, {
              label: '老客已还单数',
              prop: ''
            }, {
              label: '新客还款率'
            }, {
              label: '老客还款率'
            }, {
              label: '新客未还',
              prop: ''
            }, {
              label: '老客未还',
              prop: ''
            }
          ],
          data: [{
            daiName: 'a',
            register: 10,
            person: 4,
            idcard: 20,
            phone: 30,
            bank: 40,
            apply: 2,
            loanNum: 12
          }, {
            daiName: 'b',
            register: 10,
            person: 4,
            idcard: 20,
            phone: 30,
            bank: 40,
            apply: 2,
            loanNum: 12
          }]
        })
        break
      default:
        this.setState({
          columns: [{
                label: '#',
                width: 60,
                render: (a, b, c) => {
                  return c + 1
                }
              }, {
            label:'渠道名称',
            prop: 'daiName',

          }, {
            label: '应还金额',
            prop: ''
          }, {
            label: '实还金额',
            prop: ''
          }, {
            label: '未还金额',
            prop: ''
          }, {
            label: '还款额率'
          }, {
            label: '全款金额',
            prop: ''
          }, {
            label: '续期金额',
            prop: ''
          }, {
            label: '全额率',
            prop: ''
          }, {
            label: '续期额率'
          }, {
            label: '新客应还金额',
            prop: ''
          }, {
            label: '老客应还金额',
            prop: ''
          }, {
            label: '新客已还金额',
            prop: ''
          }, {
            label: '老客已还金额',
            prop: ''
          }, {
            label: '新客还款频率'
          }, {
            label: '老客还款频率'
          }, {
            label: '新客未还额',
            prop: ''
          }, {
            label: '老客未还额',
            prop: ''
          }],
          data: [{
            daiName: '2345',
            dayregister: '11',
            daynum: '0',
            settlementAll: '7825',
            channelWay: 'fdf',
            settlementPrice: '18',
            dayPrice: '33.00',
            addupPrice: '84574.00'
          }]
        })
    }
  }
  render(){
    return (
      <div>
        <Breadcrumb separator="/" className="pb15">
          <Breadcrumb.Item>
              {
                this.bread()
              }
          </Breadcrumb.Item>
          <Breadcrumb.Item>{'详情'}</Breadcrumb.Item>
        </Breadcrumb>
        <Table
        style={ { width: '100%' } }
        columns={ this.state.columns }
        data={ this.state.data }
        border
        stripe
        />
        <div className="pagination-con flex flex-direction_row justify-content_flex-center">
          <Pagination
          layout="total, sizes, prev, pager, next, jumper"
          total={ this.state.total }
          pageSizes={ this.state.pageSizes }
          pageSize={ this.state.pageSize }
          currentPage={ this.state.currentPage }
          />
        </div>
      </div>
    )
  }
}
export default withRouter(RepayInside)