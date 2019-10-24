import React, { Component } from 'react'
import { Button, Loading, Table, Input, Dialog } from 'element-react'
import E from 'wangeditor'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { pageGlobalconfig, updateGlobalConfig } from './actions'
import MyPagination from '@components/MyPagination'
class Help extends Component {
	static propTypes = {
		list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		pageGlobalconfig: PropTypes.func.isRequired,
		updateGlobalConfig: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			dialogVisible: false,
			id: null,
			columns: [{
					label: '#',
					width: 60,
					render: (a, b, c) => {
						return c + 1
					}
				}, {
					label: '标签',
					prop: 'title'
				}, {
					label: '内容',
					prop: 'configValue',
					render: row => {
						const reg = /<[^<>]+>/g
						let data = ''
						if (row.configValue){
								data = row.configValue.replace(reg, '')
						}
						return (
							<Input
								type="textarea"
								autosize={ { minRows: 1, maxRows: 2} }
								value={ data }
							/>
						)
					}
				}, {
					label: '操作',
					width:80,
					render: row => {
						return (
							<Button type="primary" size="mini" onClick={ this.openDialog.bind(this, row) }>{'编辑'}</Button>
						)
					}
				}]
		}
	}
	componentWillMount() {
    this.props.initSearch()
  }
  componentDidMount() {
		this.props.pageGlobalconfig()
		this.initEditor()
	}
	initEditor () {
    const elem = this.editorElem
    const editor = new E(elem)
    this.editor = editor
    editor.customConfig.zIndex = 100
    // editor.customConfig.uploadImgServer = utils.url + '/fileclient-management/api/uploadpic'
    // 限制一次最多上传 1 张图片
    editor.customConfig.uploadImgMaxLength = 1
    editor.customConfig.customUploadImg = function (files, insert) {
      // files 是 input 中选中的文件列表
      console.log(files)
      // if (files[0]) {
      //   const formData = new window.FormData()
      //   formData.append('file', files[0], 'cover.jpg')
      //   fetch(utils.url + '/fileclient-management/api/uploadpic', {
      //     method: 'POST',
      //     body: formData
      //   }).then((res) => {
      //     return res.json()
      //   }).then((res) => {
      //     const data = res.resultData
      //     if (data) {
      //       // 上传代码返回结果之后，将图片插入到编辑器中
      //       insert(data.resourceUrl)
      //     } else {
      //       console.log(data.msg)
      //     }
      //   })
      // } else {
      //   Message.info('請選擇要上傳的圖片')
      // }
    }
    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      // 'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      // 'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      // 'backColor', // 背景颜色
      // 'link', // 插入链接
      // 'list', // 列表
      'justify', // 对齐方式
      // 'quote', // 引用
      // 'emoticon', // 表情
      // 'image', // 插入图片
      // 'table', // 表格
      // 'video', // 插入视频
      // 'code', // 插入代码
      // 'undo', // 撤销
      // 'redo' // 重复
    ]
    editor.customConfig.lang = {
      '设置标题': 'Title',
      '字号': 'Size',
      '文字颜色': 'Color',
      '设置列表': 'List',
      '有序列表': '',
      '无序列表': '',
      '对齐方式': 'Align',
      '靠左': '',
      '居中': '',
      '靠右': '',
      '正文': 'p',
      // '链接文字': 'link text',
      // '链接': 'link'
      // '上传图片': 'Upload',
      // '网络图片': 'Web',
      // '图片link': 'image url',
      // '插入视频': 'Video',
      // '格式如': 'format',
      // '上传': 'Upload',
      // '创建': 'init'
    }
    editor.create()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.pageGlobalconfig()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.pageGlobalconfig()
	}
	openDialog = r => {
		this.editor.txt.html('')
		this.setState({
			dialogVisible: true,
			id: r.id
		})
		this.editor.txt.html(r.configValue)
	}
	saveContent = e => {
		e.preventDefault()
		const data = this.editor.txt.html()
		this.props.updateGlobalConfig({id:this.state.id,configValue: `'${ data }'`})
		this.setState({
			dialogVisible: false
		})
	}
	render() {
		const { list, btnLoading } = this.props
		const { dialogVisible, columns } = this.state
		return (
			<div>
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
					title="编辑内容"
					visible={ dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<div ref={ e => {this.editorElem=e} } />
					</Dialog.Body>
					<Dialog.Footer className="dialog-footer">
						<Button onClick={ () => this.setState({ dialogVisible: false }) }>{'取 消'}</Button>
						<Button type="primary" onClick={ this.saveContent } loading={ btnLoading }>{'确 定'}</Button>
					</Dialog.Footer>
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
		...bindActionCreators({sizeChange, currentChange, initSearch, pageGlobalconfig, updateGlobalConfig }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Help)
// https: //www.kancloud.cn/wangfupeng/wangeditor3/332599
