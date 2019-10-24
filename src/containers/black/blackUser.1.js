// 财务管理-已完成
import React, { Component } from 'react'
import { Button, Loading, Table, Upload, Message,Form } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectblackphone, deleteBlackphone, download, importExcel } from './actions'
import Search from '@components/Search'
import MyPagination from '@components/MyPagination'
import XLSX from 'xlsx'
class BlackUser extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		selectblackphone: PropTypes.func.isRequired,
		deleteBlackphone: PropTypes.func.isRequired,
		download: PropTypes.func.isRequired,
		importExcel: PropTypes.func.isRequired,
  }
	constructor(props) {
		super(props)
		this.state = {
			d:[],
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
	onChange = (obj, parm, parm1) => {
		// https: //www.jianshu.com/p/d70bca7681ab
		// let list = []
		// let that = this
		let wb //读取完成的数据
		const rABS = false //是否将文件读取为二进制字符串
		if(!obj.target.files) {
			return
		}
		const f = obj.target.files[0]
		const reader = new FileReader()
			reader.onload = (e) => {
				const data = e.target.result
				if(rABS) {
					wb = XLSX.read(btoa(this.fixdata(data)), {//手动转化
						type: 'base64'
					})
				} else {
					wb = XLSX.read(data, {
						type: 'binary'
					})
				}
				//wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
				//wb.Sheets[Sheet名]获取第一个Sheet的数据
				// document.getElementById("demo").innerHTML= JSON.stringify(
				//XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
				const sheetInner = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
				// console.log(sheetInner)
				// const reqList=[]
				// 	for(const i in sheetInner){
				// 		const listObj = {
				// 			realName: sheetInner[i].realName,
				// 			phone: sheetInner[i].phone,
				// 			idCard: sheetInner[i].idCard
				// 		}
				// 		reqList.push(listObj)
				// 	}
					// const r = reqList.slice(1)
					if (sheetInner.length > 0) {
				// if(reqList.length === sheetInner.length && reqList.length !== 0){
				// if (r.length === sheetInner.length && r.length !== 0) {
					console.log(sheetInner)
					this.props.importExcel(sheetInner)
		// 			axios.post(url , JSON.stringify(reqList), {
		// 					headers: {
		// 							'Accept': 'application/json',
		// 　　　　    'Content-Type': 'application/json',
		// 					}
		// 				}).then(res => {
		// 						if(res.status === 200){
		// 							alert('上传成功');
		// 						//重新获取列表内容，得到最新的列表
		// 						}
		// 				}).catch(err => {
		// 						console.log(err);
		// 				})
					}
					//判断excel表是否为空
					if(sheetInner.length === 0){
						alert('表单无数据,请先填写内容')
						return
					}
			}
			if(rABS) {
				reader.readAsArrayBuffer(f)
			} else {
				reader.readAsBinaryString(f)
			}
			obj.target.value =''
    }
	fixdata(data) { //文件流转BinaryString
		var o = '',
			l = 0,
			w = 10240
			for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
				o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
				return o
	}
	handleSearch = e => {
    e.preventDefault()
    this.props.selectblackphone()
	}
	up = () => {
		this.inputRef.click()
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
				<Upload
					className = "margin-bottom15"
					ref={ e => {this.upload = e} }
					action = "/api/blackPhone/importExcel"
					onSuccess={ (response) => this.handleSuccess(response) }
					limit={ 1 }
					accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
					autoUpload
					tip={ <div className="el-upload__tip">{'只能上传xlsx/xls文件'}</div> }
					trigger={ <Button size="small" type="primary">{'选取文件'}</Button> }
				>
					<Button style={ { marginLeft: '10px'} } size="small" type="success" onClick={ () => this.submitUpload() }>{'上传到服务器'}</Button>
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
		...bindActionCreators({sizeChange, currentChange, initSearch, selectblackphone, deleteBlackphone, download, importExcel }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BlackUser)
