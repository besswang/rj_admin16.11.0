import React, { Component } from 'react'
import { Table, Form, Button } from 'element-react'
import Time from './setime'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
export default class MoneyTable extends Component {
  constructor(props){
    super(props)
    this.state = {
      column:[
        {
          label: '#',
          width: 60,
          fixed: 'left',
          render: (a, b, c) => {
            return c + 1
          }
        }, {
          label:'日期',
          prop: 'theDate'
        },{
          label:'应还金额',
          prop: ''
        },{
          label:'实还金额',
          prop: ''
        },{
          label:'未还金额',
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
        },{
          label: '操作',
          render: (row) => {
            const url = `/statistics/repayinside/${ this.props.tabName }/4`
            return (
              <Link to={ `${ url }` }>
                <Button type="text" size="mini">{'查看'}</Button>
              </Link>
            )
          }
        }
      ]
    }
  }
  render() {
    const [ ...arrObj ] = this.props.data
    return (
      <div>
        <Form inline>
          <Form.Item>
            <Time />
          </Form.Item>
          <Form.Item>
            <Button nativeType="submit" type="primary">{'搜索'}</Button>
          </Form.Item>
        </Form>
        <Table
        style={ { width: '100%' } }
        columns={ this.state.column }
        data={ arrObj }
        border
        stripe
        />
      </div>
    )
  }
}
MoneyTable.propTypes = {
  tabName: PropTypes.string,
  data: PropTypes.array
}