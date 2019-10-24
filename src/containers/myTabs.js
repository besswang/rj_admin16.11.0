import React from 'react'
// import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { Link } from 'react-router-dom'
import '@styles/tab.less'
import { tabRemove, menuActive, changeTabActive } from '@redux/actions'
import { Tabs } from 'element-react'
// var createHistory = require('history').createBrowserHistory
// const history = createHistory()
class MyTabs extends React.Component{
	static propTypes = {
		history: PropTypes.object.isRequired,
		tabObj: PropTypes.array,
		tabRemove: PropTypes.func.isRequired,
		menuActive: PropTypes.func.isRequired,
		tabActive: PropTypes.string,
		changeTabActive: PropTypes.func.isRequired,
	}
	constructor(props) {
		super(props)
		this.state = {
			tabs: [{
				title: 'Tab 1',
				name: 'Tab 1',
				content: 'Tab 1 content',
			}, {
				title: 'Tab 2',
				name: 'Tab 2',
				content: 'Tab 2 content',
			}],
			tabIndex: 2
		}
	}
	componentWillMount() {

	}
	componentDidMount() {

	}
	addTab() {
		const { tabs, tabIndex } = this.state
		const index = tabIndex + 1
  	tabs.push({
			title: 'new Tab',
			name: 'Tab ' + index,
			content: 'new Tab content',
		})
		this.setState({
			tabs,
			tabIndex: index,
		})
	}

	removeTab(tab) {
		const arr = this.props.tabObj
		let flag = true
		for (const i in arr){
			if (arr[i].name === tab.props.name && arr[parseInt(arr.length) - 1].name !== this.props.tabActive && arr[0].name !== this.props.tabActive) {
				if (arr[parseInt(i) + 1]){
					this.props.history.push(arr[parseInt(i) + 1].path)
					this.props.menuActive(arr[parseInt(i) + 1].path)
					flag = false
				}else{
					flag = true
				}
			}
		}
		if(arr[0].name === this.props.tabActive && flag){
			flag = false
		}
		this.props.tabRemove(tab.props.name)
		if (this.props.tabObj.length > 0 && flag){
			const last = this.props.tabObj.pop()
			this.props.history.push(last.path)
			this.props.menuActive(last.path)
		}
	}
	onTabClick = e => {
		this.props.history.push(e.props.path)
		this.props.menuActive(e.props.path)
		this.props.changeTabActive(e.props.name)
	}
	render() {
		const { tabObj, tabActive } = this.props
		return (
			<div>
			{ tabObj.length > 0 &&
			<Tabs type="card" value={ tabActive } onTabRemove={ (tab) => this.removeTab(tab) } onTabClick={ e => this.onTabClick(e) } className="margin_top15">
        {
          tabObj.map(item => {
            return <Tabs.Pane key={ item.id } closable label={ item.name } name={ item.name } path={ item.path }></Tabs.Pane>
          })
        }
   </Tabs>
			}
			</div>
		)
	}
}
const mapStateToProps = state => {
	const { tabObj, tabActive } = state
	return { tabObj, tabActive }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ tabRemove,menuActive,changeTabActive }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MyTabs)
