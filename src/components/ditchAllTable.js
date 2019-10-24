import React, { Component } from 'react'
import { Table } from 'element-react'
import PropTypes from 'prop-types'
// import num from '../global/num'
export default class AllTable extends Component {
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
        <Table.Column label="渠道名称" prop="channelName" width={ 120 } />
        <Table.Column label="UV" prop="uv"/>
        <Table.Column label="日注册量" prop="userCount" width={ 100 } />
        <Table.Column label="日申请量" prop="orderCount" width={ 100 } />
        <Table.Column label="日申请率" prop="orderRate" width={ 100 } />
        {/* render = {
          (row) => {
            // 日申请率 = 日申请量/日注册量
            if (row.apply && row.register) {
              const applynum = parseInt(row.apply) / parseInt(row.register)
              return (num.toDecimal(applynum))
            } else {
              return ('0.00%')
            }
          }
        } */}
        {/* <Table.Column label="日下单量" prop=""
          render = {
            (row) => {
              return (row.loanNum ? row.loanNum : '0')
            }
          }
        /> */}

        {/* <Table.Column label="日转化率"
          render = {
            (row) => {
              // 日转化率 = 日下单量/日注册量
              if (row.loanNum && row.register) {
                const loanConversion = parseInt(row.loanNum) / parseInt(row.register)
                return (num.toDecimal(loanConversion))
              } else {
                return ('0.00%')
              }
            }
          }
        /> */}
        <Table.Column label="放款人数" prop="orderStateCount" width={ 100 } />
        <Table.Column label="放款率" prop="orderStateCount" />
        <Table.Column label="总注册量" prop="userTotalCount" width={ 100 } />
        <Table.Column label="总申请量" prop="orderTotalCount" width={ 100 } />
        <Table.Column label="总申请率" prop="orderTotalRate" width={ 100 } />
        {/* render={
          (row) => {
            // 总申请率 = 总申请量/总注册量
            if (row.zapply && row.zregister) {
              const zapplyConversion = parseInt(row.zapply) / parseInt(row.zregister)
              return (num.toDecimal(zapplyConversion))
            }else{
              return ('0.00%')
            }
          }
        } */}
        {/* <Table.Column label="总下单量" prop="zloanNum"
          render={
            (row) => {
              return (row.zloanNum ? row.zloanNum : '0')
            }
          }
        />
        <Table.Column label="总转化率"
          render = {
            (row) => {
              //总转化率 = 总下单量/总注册量
              if (row.zloanNum && row.zregister) {
                const zloanConversion = parseInt(row.zloanNum) / parseInt(row.zregister)
                return (num.toDecimal(zloanConversion))
              } else {
                return ('0.00%')
              }
            }
          }
        /> */}
        <Table.Column label="总放款人数" prop="orderTotalStateCount" width={ 120 } />
        <Table.Column label="总放款率" prop="orderTotalStateRate" width={ 100 } />
      </Table>
    )
  }
}
AllTable.propTypes = {
  tabName: PropTypes.string,
  data: PropTypes.array
}