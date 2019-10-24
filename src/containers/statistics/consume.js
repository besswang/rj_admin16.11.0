// 报表统计-消耗费用
import React, { Component } from 'react'
import { Button, Loading, Table,Form } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { pageCostCount } from './actions'
import MyPagination from '@components/MyPagination'
import { CONSUME } from '@meta/columns'
import Search from '@components/Search'
class Consume extends Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
    pageCostCount: PropTypes.func.isRequired
  }
  componentWillMount() {
    this.props.initSearch()
  }
  componentDidMount() {
    this.props.pageCostCount()
  }
  handleSearch = e => {
    e.preventDefault()
    this.props.pageCostCount()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.pageCostCount()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.pageCostCount()
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
            columns={ CONSUME }
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
		...bindActionCreators({sizeChange, currentChange, initSearch, pageCostCount }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Consume)
