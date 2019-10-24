import React, { Component } from 'react'
import { Table } from 'element-react'
import PropTypes from 'prop-types'
// import num from '../global/num'
export default class CostTable extends Component {
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
        <Table.Column label="渠道名称" prop="channelName" />
        <Table.Column label="UV" prop="uv"/>
        <Table.Column label="日注册量" prop="userCount" />
        <Table.Column label="日结算量" prop="userPreCount" />
        <Table.Column label="累计结算量" prop="userAllCount" />
        <Table.Column label="推广方式" prop="expandType" />
        <Table.Column label="结算价格" prop="expandPrice" />
        <Table.Column label="日结算金额" prop="dayAmount" />
        {/* render = {
          (row) => {
            // 日结算金额 = 结算价格*日结算量
            if (row.settlementPrice && row.settlementDay) {
              const setConversion = parseInt(row.settlementPrice) / parseInt(row.settlementDay)
              return (num.toDecimal(setConversion,1))
            } else {
              return ('0.00')
            }
          }
        } */}
        <Table.Column label="累计结算金额" prop="allDayAmount" />
        {/* render = {
          (row) => {
            // 累计结算金额 = 累计结算量*结算价格
            if (row.settlementAll && row.settlementPrice) {
              const allConversion = parseInt(row.settlementAll) / parseInt(row.settlementPrice)
              return (num.toDecimal(allConversion, 1))
            } else {
              return ('0.00')
            }
          }
        } */}
      </Table>
    )
  }
}
CostTable.propTypes = {
  data: PropTypes.array
}