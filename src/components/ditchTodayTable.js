import React, { Component } from 'react'
import { Table } from 'element-react'
import PropTypes from 'prop-types'
import num from '../global/num'
export default class TodayTable extends Component {
  render() {
    const [ ...arrObj ] = this.props.data
    return (
      <Table
        style={ { width: '100%' } }
        data={ arrObj }
        border
        stripe
      >
        <Table.Column label="#" width={ 60 } render={
          (a,b,c) => {
            return c+1
          }
        }
        />
        <Table.Column label="渠道名称" prop="channelName" width={ 140 }/>
        <Table.Column label="UV" prop="uv"/>
        <Table.Column label="注册人数" prop="userCount"/>
        <Table.Column label="个人信息" prop="emergencyCount"/>
        <Table.Column label="身份认证" prop="idCardCount"/>
        <Table.Column label="手机认证" prop="phoneDateCount"/>
        <Table.Column label="银行认证" prop="bankAuthenticationCount"/>
        <Table.Column label="申请单数" prop="orderCount"/>
        {/* prop = "orderRate" */}
        {/* <Table.Column label="申请率" prop="orderRate" /> */}
        <Table.Column label="申请率" render = {
          (row) => {
            if (row.orderCount && row.userCount) {
              // 申请率 = 申请单数 / 注册人数
              const applynum = parseInt(row.orderCount) / parseInt(row.userCount)
              return (num.toDecimal(applynum*100))
            } else {
              return ('0.00%')
            }
          }
        }
        />

        <Table.Column label="放款人数" prop="orderStateCount"/>
        {/* prop = "orderStateRate" */}
        <Table.Column label="放款率" render = {
          (row) => {
            if (row.orderStateCount && row.userCount) {
              // 放款率 = 放款人数 / 注册人数
              const loanNumnum = parseInt(row.orderStateCount) / parseInt(row.userCount)
              return (num.toDecimal(loanNumnum*100))
            } else {
              return ('0.00%')
            }
          }
        }
        />
      </Table>
    )
  }
}
TodayTable.propTypes= {
  data: PropTypes.array
}