// 报表统计-进出账
import React, { Component } from 'react'
import { Button, Loading, Table, Form } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { pageInoutCount } from './actions'
import MyPagination from '@components/MyPagination'
import { TURNOVER } from '@meta/columns'
import Search from '@components/Search'
class Turnover extends Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
    pageInoutCount: PropTypes.func.isRequired
  }
  componentWillMount() {
    this.props.initSearch()
  }
  componentDidMount() {
    this.props.pageInoutCount()
  }
  handleSearch = e => {
    e.preventDefault()
    this.props.pageInoutCount()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.pageInoutCount()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.pageInoutCount()
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
            columns={ TURNOVER }
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
		...bindActionCreators({sizeChange, currentChange, initSearch, pageInoutCount}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Turnover)
