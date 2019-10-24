// 财务管理-已完成
import React, { Component } from 'react'
import { Button, Loading, Table, Upload, Message,Form } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectblackphone, deleteBlackphone, download } from './actions'
import Search from '@components/Search'
import MyPagination from '@components/MyPagination'
class BlackUser extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		selectblackphone: PropTypes.func.isRequired,
		deleteBlackphone: PropTypes.func.isRequired,
		download: PropTypes.func.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			btnLoading: false,
			columns: [{
						label: '#',
						width: 60,
						render: (a, b, c) => {
							return c + 1
						}
					}, {
					label: '真实姓名',
					prop: 'realName',
					render: row => {
						if (row.realName) {
							const reg = row.realName.slice(1)
							const s = reg.split('')
							const x = []
							for (let i = 0; i < s.length; i++) {
								x.push('*')
							}
							const z = x.join('')
							const y = row.realName.substring(1, 0)
							return y + z
						}
					}
				}, {
					label: '手机号码',
					prop: 'phone',
					render: row => {
						if (row.phone) {
							return row.phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')
						}
					}
				}, {
					label: '身份证号',
					prop: 'idCard',
					render: row => {
						if (row.idCard) {
							return row.idCard.replace(/^(\d{3})\d{8}(\d+)/, '$1****$2')
						}
					}
				}, {
					label: '操作',
					render: row => {
						return (
							<Button type="danger" size="mini"
								onClick={ this.delete.bind(this, row.id) }
							>
								{'删除'}
							</Button>
						)
					}
      }]
		}
	}
	componentWillMount() {
		this.props.initSearch()
  }
  componentDidMount() {
    this.props.selectblackphone()
	}
	delete(id) {
		console.log(id)
		this.props.deleteBlackphone({id:id})
	}
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.selectblackphone()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.selectblackphone()
	}
	handleSearch = e => {
    e.preventDefault()
    this.props.selectblackphone()
	}
	submitUpload() {
		this.upload.submit()
		this.setState({
			btnLoading:true
		})
	}
	onChange = (file) => {
		const { success, msg } = file.response
		if(success){
			Message.success(msg)
			this.props.selectblackphone()
		}else{
			Message.error(msg)
		}
		this.upload.clearFiles()
		this.setState({
			btnLoading: false
		})
	}
	render() {
		const { list } = this.props
		const { btnLoading } = this.state
		return (
			<div>
				<Search showSelect2>
					<Form.Item>
					 	<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
					</Form.Item>
					<Form.Item>
						<Button onClick={ this.props.download } type="primary">{'模版下载'}</Button>
					</Form.Item>
				</Search>
				<Upload
					className = "margin-bottom15"
					ref={ e => {this.upload = e} }
					action = "/api/blackPhone/importExcel"
					limit={ 1 }
					accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
					autoUpload={ false }
					tip={ <div className="el-upload__tip">{'只能上传xlsx/xls文件'}</div> }
					trigger={ <Button size="small" type="primary">{'选取文件'}</Button> }
					onChange={ this.onChange }
				>
					<Button style={ { marginLeft: '10px'} } size="small" type="success" onClick={ () => this.submitUpload() } loading={ btnLoading }>{'上传到服务器'}</Button>
				</Upload>
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
	const { list } = state
	return { list }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({sizeChange, currentChange, initSearch, selectblackphone, deleteBlackphone, download }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BlackUser)
