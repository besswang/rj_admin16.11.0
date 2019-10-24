import React, { Component } from 'react'
import { Button, Loading, Table, Input, Dialog } from 'element-react'
import E from 'wangeditor'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectTextConfig, updateGlobalConfig } from './actions'
class TextSet extends Component {
	static propTypes = {
		list: PropTypes.object.isRequired,
		selectTextConfig: PropTypes.func.isRequired,
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

  }
  componentDidMount() {
		this.props.selectTextConfig()
		this.initEditor()
	}
	initEditor () {
    const elem = this.editorElem
    const editor = new E(elem)
    this.editor = editor
    editor.customConfig.zIndex = 100
    editor.customConfig.uploadImgMaxLength = 1
    editor.customConfig.customUploadImg = function (files, insert) {
      console.log(files)
    }
    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'italic', // 斜体
      'underline', // 下划线
      'foreColor', // 文字颜色
      'justify', // 对齐方式
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
      '正文': 'p'
    }
    editor.create()
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
		this.props.updateGlobalConfig({id:this.state.id,configValue: `'${ data }'`},2)
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
		...bindActionCreators({ selectTextConfig, updateGlobalConfig }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(TextSet)
// https: //www.kancloud.cn/wangfupeng/wangeditor3/332599
