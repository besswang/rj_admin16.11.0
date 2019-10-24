import React, { Component } from 'react'
import { Button, Loading, Table, Dialog, Upload, Message, Form, Input } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { pageRotationChart, deleteRotationChart, updateRotationChart,insertRotationChart, editAdvertUrl } from './actions'
import MyPagination from '@components/MyPagination'
import DisableBtn from '@components/DisableBtn'
class Banner extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		pageRotationChart: PropTypes.func.isRequired,
		deleteRotationChart: PropTypes.func.isRequired,
		updateRotationChart: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired,
		insertRotationChart: PropTypes.func.isRequired,
		editAdvertUrl: PropTypes.func.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			id:null,
			dialogVisible: false,
			dialogVisible3:false,
			imgUrl: '',
			form:{
				advertUrl: '', // 跳转地址
			},
			rules:{
				advertUrl:[{ required: true, message: '请输入跳转地址', trigger: 'blur' }]
			},
			btnLoading: false,
			dialogVisible2: false,
			dialogImageUrl: '',
			columns: [{
						label: '#',
						width: 60,
						render: (a, b, c) => {
							return c + 1
						}
					}, {
					label: '图片',
					prop: 'imgUrl',
					align: 'center',
					render: row => {
						return (
							<div className="table-img-con">
								<img className="table-img" src={ row.imgUrl } alt="" onClick={ this.openDialog2.bind(this,row.imgUrl) }/>
							</div>
						)
					}
				}, {
					label: '跳转地址',
					width:300,
					prop: 'advertUrl',
					render: row => {
						return (<div className="flex"><a className="theme-blue flex_1" href={ row.advertUrl } target="_blank" rel="noopener noreferrer">{ row.advertUrl }</a><Button className="margin_left15" type="info" size="mini" onClick={ this.openDialog3.bind(this,row.advertUrl,row.id) }>{'修改'}</Button></div>)
					}
				}, {
					label: '上架状态',
					prop: 'status',
					render: row => {
						const text = row.status === 0 ? '已下架' : '已上架'
						return text
					}
				}, {
					label: '排序',
					prop: 'sort'
				}, {
          label: '操作',
          render: row => {
            return (
							<div>
								<DisableBtn value={ row.status } result={ 0 } text={ ['上架','下架'] } onClick={ this.props.updateRotationChart.bind( this,{id:row.id, status:row.status}) }/>
								<Button type="danger" size="mini" onClick={ this.props.deleteRotationChart.bind(this,{id:row.id}) }>{'删除'}</Button>
							</div>
            )
          }
        }]
		}
	}
	componentWillMount() {
    this.props.initSearch()
  }
  componentDidMount() {
    this.props.pageRotationChart()
	}
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.pageRotationChart()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.pageRotationChart()
	}
	openDialog2 = url => {
		this.setState({
			dialogVisible2: true,
			dialogImageUrl: url,
			form: {
				advertUrl: ''
			}
		})
	}
	openDialog3 = (url, id) => {
		this.setState({
			dialogVisible3: true,
			form:{
				advertUrl: url
			},
			id:id
		})
	}
	submitUpload() {
		this.upload.submit()
		this.setState({
			btnLoading: true,
		})
	}
	onChange2 = (file) => {
		const { success, msg } = file.response
		if(success){
			Message.success(msg)
			this.props.pageRotationChart()
			this.setState({
				imgUrl:file.response.data
			})
		}else{
			Message.error(msg)
		}
		this.upload.clearFiles()
		this.setState({
			btnLoading: false
		})
	}
	onChange(key, value) {
		let v = null
		if (value && (typeof value === 'string')) {
			v = value.trim()
		} else {
			v = value
		}
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: v })
		})
	}
	openDialog = () => {
		this.setState({
			dialogVisible: true,
			imgUrl: '',
			btnLoading:false
		})
	}
	saveContent = e => {
		e.preventDefault()
		if (this.state.imgUrl === '') {
			Message.warning('请上传图片')
			return false
		}
		this.form.validate((valid) => {
			if (valid) {
				console.log(this.state)
				this.props.insertRotationChart({imgUrl:this.state.imgUrl,advertUrl: this.state.form.advertUrl})
				this.setState({
					dialogVisible:false
				})
			} else {
				console.log('error submit!!')
				return false
			}
		})
	}
	saveContentEdit = e => {
		e.preventDefault()
		this.form.validate((valid) => {
			if (valid) {
				this.props.editAdvertUrl({id:this.state.id, advertUrl:this.state.form.advertUrl})
				this.setState({
					dialogVisible3:false
				})
			} else {
				console.log('error submit!!')
				return false
			}
		})
	}
	render() {
		const { list } = this.props
		const load = this.props.btnLoading
		const { columns, dialogVisible2, dialogImageUrl, btnLoading,dialogVisible,form, rules, dialogVisible3 } = this.state
		return (
			<div>
				<Button className="margin-bottom15" type="primary" onClick={ this.openDialog.bind(this) }>{'添加'}</Button>
				<Dialog
					title={ '添加' }
					visible={ dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<Form labelWidth="140" ref={ e => {this.form=e} } model={ form } rules={ rules }>
							<Form.Item label="上传图片">
								<Upload
									className = "margin-bottom15"
									ref={ e => {this.upload = e} }
									action="/api/rotationChart/addRotationChart"
									accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
									limit={ 1 }
									autoUpload={ false }
									tip={ <div className="el-upload__tip">{'只能上传jpg/png文件，且不超过500kb'}</div> }
									trigger={ <Button size="small" type="primary">{'选取文件'}</Button> }
									onChange={ this.onChange2 }
								>
									<Button style={ { marginLeft: '10px'} } size="small" type="success" onClick={ () => this.submitUpload() } loading={ btnLoading }>{'上传到服务器'}</Button>
								</Upload>
							</Form.Item>
							<Form.Item label="跳转地址" prop="advertUrl">
								<Input value={ form.advertUrl } onChange={ this.onChange.bind(this,'advertUrl') } prepend="Http://"/>
							</Form.Item>
						</Form>
					</Dialog.Body>
					<Dialog.Footer className="dialog-footer">
						<Button onClick={ () => this.setState({ dialogVisible: false }) }>{'取 消'}</Button>
						<Button type="primary" onClick={ this.saveContent } loading={ load }>{'确 定'}</Button>
					</Dialog.Footer>
				</Dialog>
				<Dialog
					title={ '修改' }
					visible={ dialogVisible3 }
					onCancel={ () => this.setState({ dialogVisible3: false }) }
				>
					<Dialog.Body>
						<Form labelWidth="140" ref={ e => {this.form=e} } model={ form } rules={ rules }>
							<Form.Item label="跳转地址" prop="advertUrl">
								<Input value={ form.advertUrl } onChange={ this.onChange.bind(this,'advertUrl') } prepend="Http://"/>
							</Form.Item>
						</Form>
					</Dialog.Body>
					<Dialog.Footer className="dialog-footer">
						<Button onClick={ () => this.setState({ dialogVisible3: false }) }>{'取 消'}</Button>
						<Button type="primary" onClick={ this.saveContentEdit } loading={ load }>{'确 定'}</Button>
					</Dialog.Footer>
				</Dialog>
				{/* <Upload
					className = "margin-bottom15"
					ref={ e => {this.upload = e} }
					action="/api/rotationChart/addRotationChart"
					accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
					limit={ 1 }
					autoUpload={ false }
					tip={ <div className="el-upload__tip">{'只能上传jpg/png文件，且不超过500kb'}</div> }
					trigger={ <Button size="small" type="primary">{'选取文件'}</Button> }
					onChange={ this.onChange2 }
				>
					<Button style={ { marginLeft: '10px'} } size="small" type="success" onClick={ () => this.submitUpload() } loading={ btnLoading }>{'上传到服务器'}</Button>
				</Upload> */}
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
				<Dialog
				visible={ dialogVisible2 }
				onCancel={ () => this.setState({ dialogVisible2: false }) }
				>
					<img width="100%" src={ dialogImageUrl } alt="" />
				</Dialog>
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
		...bindActionCreators({ sizeChange, currentChange, initSearch, pageRotationChart, deleteRotationChart, updateRotationChart,insertRotationChart, editAdvertUrl }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Banner)
