// 报表统计-逾期统计
import React, { Component } from 'react'
import { Table, Button, Loading,Form } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { overSearch } from './actions'
import MyPagination from '@components/MyPagination'
import { OVERDUE } from '@meta/columns'
import Search from '@components/Search'
class Overdue extends Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
    overSearch: PropTypes.func.isRequired,
  }
  componentWillMount() {
    this.props.initSearch()
  }
  componentDidMount() {
    this.props.overSearch()
  }
  handleSearch = e => {
    e.preventDefault()
    this.props.overSearch()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.overSearch()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.overSearch()
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
          columns={ OVERDUE }
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
		...bindActionCreators({sizeChange, currentChange, initSearch, overSearch}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Overdue)
