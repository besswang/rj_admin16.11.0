import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'element-react'
const MyPagination = ({ total, onSizeChange, onCurrentChange, pageSize, pageNum }) => (
  <div className="pagination-con flex flex-direction_row justify-content_flex-center">
    <Pagination
    pageSize={ pageSize }
    currentPage={ pageNum }
    layout="total, sizes, prev, pager, next, jumper"
    total={ total }
    onSizeChange={ e => onSizeChange(e) }
    onCurrentChange={ e => onCurrentChange(e) }
    />
  </div>
)

MyPagination.propTypes = {
  total: PropTypes.number,
  onSizeChange: PropTypes.func.isRequired,
  onCurrentChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  pageNum: PropTypes.number,
}

export default MyPagination
