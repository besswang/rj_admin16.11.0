import React, {Component} from 'react'
import {
  Pagination,
  Tabs,
  Breadcrumb,
  Table
} from 'element-react'
import {Link} from 'react-router-dom'
// import Time from '../common/setime'
// import Tabtable from '../common/tabtable'
import {TODAY_DITCH,ALL_DITCH,COST_DITCH} from '@meta/columns'
class Ditchinside extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeName:'1',
      columns:TODAY_DITCH,
      data: [{
        daiName: 'dkfj',
        num: '11',
        self: '457485',
        approve: '343',
        tel: 58457,
        bank: 787,
        applynum: 5475,
        apply: 84574,
        moneynum: 475,
        money: 78
      }],
      tabValue:null,
      total:15,
      pageSize:5,
      pageSizes:[5,10,15],
      currentPage:1
    }
    this.tabChange = this.tabChange.bind(this)
  }
  tabChange(e){
    console.log(e.props.name)
    switch(e.props.name){
      case '1':
      this.setState({
        columns:TODAY_DITCH,
        data: [{
          daiName: 'dkfj',
          num: '11',
          self: '457485',
          approve: '343',
          tel: 58457,
          bank: 787,
          applynum: 5475,
          apply: 84574,
          moneynum: 475,
          money: 78
        }]
      })
      break;
      case '2':
      this.setState({
        columns:ALL_DITCH,
        data: [{
          daiName: '2345',
          dayregister: '11',
          apply: '457485',
          dayapplycount: '23%',
          dayorder: 3,
          bank: '11%',
          zregister: 33,
          zapply: 84574,
          applycount: '33%',
          zloanNum: 78,
          zloanNumcount: '12%'
        }]
      })
      break;
      case '3':
       this.setState({
        columns:COST_DITCH,
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
       break;
    }
  }
  render(){
    return (
      <div>
      	{/* <Form inline={true}>
					<Form.Item>
            <Time></Time>
          </Form.Item>
          <Form.Item>
            <Button nativeType="submit" type="primary">搜索</Button>
          </Form.Item>
        </Form> */}
        <Breadcrumb separator="/">
					<Breadcrumb.Item>
						<Link to="/statistics/ditch">
							渠道统计
						</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>当天</Breadcrumb.Item>
        </Breadcrumb>
        <Tabs activeName={ this.state.activeName } onTabClick={ this.tabChange }>
          <Tabs.Pane label="当天" name="1"></Tabs.Pane>
          <Tabs.Pane label="总转化" name="2">总转化</Tabs.Pane>
          <Tabs.Pane label="渠道费用" name="3">渠道费用</Tabs.Pane>
        </Tabs>
				<Table
					style={ {width: '100%'} }
					columns={ this.state.columns }
					data={ this.state.data }
					border
          stripe
				>
    </Table>
          {/* <Tabtable tabvalue={this.state.activeName}></Tabtable> */}
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
export default Ditchinside