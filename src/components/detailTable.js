import React, { Component } from 'react'
import { Table, Loading } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectReportMail, selectReport, selectUserSms } from '@containers/detail/action'
import MyPagination from './MyPagination'
class Detailtable extends Component {
  static propTypes = {
    list: PropTypes.object,
    num: PropTypes.number,
    userId: PropTypes.number,
    columns: PropTypes.array,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    selectReportMail: PropTypes.func.isRequired,
    selectReport: PropTypes.func.isRequired,
    selectUserSms: PropTypes.func.isRequired,
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    const { num, userId } = this.props
    if(num === 1){
      this.props.selectReportMail({userId:userId})
    } else if(num ===2) {
      this.props.selectReport({userId:userId})
    }else{
      this.props.selectUserSms({userId:userId})
    }
  }
  onCurrentChange = e => {
    console.log(e)
    this.props.currentChange(e)
    const { num, userId } = this.props
    if(num === 1){
      this.props.selectReportMail({userId:userId})
    } else if(num === 2) {
      this.props.selectReport({userId:userId})
    }else{
      this.props.selectUserSms({userId:userId})
    }
	}
  render() {
    const { list, columns } = this.props
    return (
      <div style={ {paddingBottom:240} }>
        <Loading loading={ list.loading }>
          <Table
            style={ { width: '100%' } }
            columns={ columns }
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
		...bindActionCreators({sizeChange, currentChange, initSearch, selectReportMail, selectReport, selectUserSms }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Detailtable)