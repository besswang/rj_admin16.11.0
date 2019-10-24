// 财务管理-已完成
import React, { Component } from 'react'
import { Button, Loading, Table, Message,Form } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectblackphone, deleteBlackphone, download, importExcel } from './actions'
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
		download: PropTypes.func.isRequired,
		importExcel: PropTypes.func.isRequired
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
					label: '真实姓名',
					prop: 'realName'
				}, {
					label: '手机号码',
					prop: 'phone'
				}, {
					label: '身份证号',
					prop: 'idCard'
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
		console.log(process.env)
  }
  componentDidMount() {
    this.props.selectblackphone()
	}
	delete(id) {
		console.log(id)
		this.props.deleteBlackphone({id:id})
	}
  handleSearch = e => {
    e.preventDefault()
    this.props.selectblackphone()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.selectblackphone()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.selectblackphone()
	}
	submitUpload() {
		this.upload.submit()
	}
	handleSuccess = res => {
		if(res.success){
			Message.success('上传成功')
			this.props.selectblackphone()
			this.upload.clearFiles()
		}
	}
	fileChang = e => {
		// console.log(e)
	}
	fileChange = f => {
		// console.log(f)
	}
	onPreview = f => {
		console.log(f)
	}
	up = () => {
		this.inputRef.click()
	}
	onChange = (e) => {
		const file = e.target.files[0]
		console.log(file)
		if(file){
			const formData = new FormData()
			formData.append('file', file)
			console.log(formData)
			this.props.importExcel(formData,e)
		}
	}
	render() {
		const { list } = this.props
		return (
			<div>
				<input
					type="file"
					name="file"
					ref={ e => {this.inputRef = e} }
					onChange={ (e)=> this.onChange(e) }
					style={ {display:'none'} }
					accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				/>
				<Search showSelect2>
					<Form.Item>
						<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
					</Form.Item>
					<Form.Item>
						<Button onClick={ this.props.download } type="primary">{'模版下载'}</Button>
					</Form.Item>
					<Form.Item>
						<Button onClick={ this.up } type="primary">{'上传'}</Button>
					</Form.Item>
				</Search>
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
		...bindActionCreators({sizeChange, currentChange, initSearch, selectblackphone, deleteBlackphone, download, importExcel }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BlackUser)
