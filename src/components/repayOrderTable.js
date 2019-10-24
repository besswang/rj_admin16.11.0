import React, { Component } from 'react'
import { Table, Form, Button } from 'element-react'
// import num from '../../global/num'
import Time from './setime'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
export default class OrderTable extends Component {
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
          label:'应还人数',
          prop: ''
        },{
          label:'实还单数',
          prop: ''
        },{
          label:'未还单数',
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
        },{
          label: '操作',
          render: (row) => {
            const url = `/statistics/repayinside/${ this.props.tabName }/3`
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
OrderTable.propTypes = {
  tabName: PropTypes.string,
  data: PropTypes.array
}