import React, { Component } from 'react'
import { Button, Loading, Table } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { pageBackup, backup } from './actions'
import MyPagination from '@components/MyPagination'
import timeDate from '@global/timeDate'
class Backup extends Component {
	static propTypes = {
		list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		pageBackup: PropTypes.func.isRequired,
		backup: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			columns: [{
						label: '#',
						width: 60,
						render: (a, b, c) => {
							return c + 1
						}
					}, {
					label: '备份文件名',
					prop: 'backupsName'
				}, {
					label: '备份日期',
					prop: 'gmt',
					render: row => {
						const date = timeDate.time(row.gmt, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '文件大小',
					prop: 'backupsSize'
				}]
		}
	}
	componentWillMount() {
    this.props.initSearch()
  }
  componentDidMount() {
    this.props.pageBackup()
	}
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.pageBackup()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.pageBackup()
	}
	backupBtn = e => {
		e.preventDefault()
		this.props.backup()
		this.props.pageBackup()
	}
	render() {
		const { list, btnLoading } = this.props
		return (
			<div>
        <Button className="margin-bottom15" type="primary" onClick={ e => this.backupBtn(e) } loading={ btnLoading }>{'备份'}</Button>
				<Loading loading={ list.loading }>
					<Table
						style={ { width: '100%' } }
						columns={ this.state.columns }
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
	const { list, btnLoading } = state
	return { list, btnLoading }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({sizeChange, currentChange, initSearch, pageBackup, backup }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Backup)
