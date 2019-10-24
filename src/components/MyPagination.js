import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'element-react'
import { connect } from 'react-redux'
class MyPagination extends Component {
  static propTypes = {
    total: PropTypes.number,
    onCurrentChange: PropTypes.func.isRequired,
    onSizeChange: PropTypes.func.isRequired,
    searchAll: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
  }
  componentDidMount() {

  }
  onSizeChange = e => {
    this.props.onSizeChange(e)
  }
  onCurrentChange = e =>{
    this.props.onCurrentChange(e)
  }
  render () {
    const { list, searchAll } = this.props
    return (
      <div className="pagination-con flex flex-direction_row justify-content_flex-center">
        <Pagination
        pageSize={ searchAll.pageSize }
        currentPage={ searchAll.pageNum }
        layout="total, sizes, prev, pager, next, jumper"
        total={ list.total }
        onSizeChange={ e => this.onSizeChange(e) }
        onCurrentChange={ e => this.onCurrentChange(e) }
        />
      </div>
    )
  }
}
const mapStateToProps = state => {
	const { list,searchAll } = state
	return { list,searchAll }
}
export default connect(mapStateToProps)(MyPagination)
