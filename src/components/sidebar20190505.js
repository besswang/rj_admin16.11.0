import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'element-react'
import { SIDE_BAR_TEXT } from '@meta/sidebarText'
export default class Sidebar extends Component{
  componentDidMount(){
    // console.log(this.props)
  }
  onOpen = e => {
    console.log(e)
  }

  onClose = e => {
    console.log(e)
  }
  render(){
    return (
      <Menu theme="dark" onOpen={ this.onOpen } onClose={ this.onClose } style={ { width:230 } }>
        {SIDE_BAR_TEXT.map(item => {
          return (
            <Menu.SubMenu index={ item.subIndex } title={ <span>{ item.title }</span> } key={ item.title }>

              { item.menuItem.map((list) => {
                return (
                  <Link to={ `${ list.path }` } key={ list.title } style={ { block:'block' } }>
                    <Menu.Item index={ list.itemIndex }>
                      { list.title }
                    </Menu.Item>
                  </Link>
                )
              })}
            </Menu.SubMenu>
          )
        })}
        {/* <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>会员管理</span>}>
          <Menu.Item index="1-1">会员列表</Menu.Item>
          <Menu.Item index="1-2">注册未申请</Menu.Item>
          <Menu.Item index="1-3">正常还款未借</Menu.Item>
          <Menu.Item index="1-4">全部会员</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu index="2" title={<span>报表统计</span>}>
          <Menu.Item index="2-1">渠道统计</Menu.Item>
          <Menu.Item index="2-2">逾期统计</Menu.Item>
          <Menu.Item index="2-3">放款统计</Menu.Item>
          <Menu.Item index="2-4">还款统计</Menu.Item>
          <Menu.Item index="2-5">消耗费用</Menu.Item>
          <Menu.Item index="2-4">进出账</Menu.Item>
          <Menu.Item index="2-5">数据看版</Menu.Item>
        </Menu.SubMenu> */}
      </Menu>
    )
  }
}