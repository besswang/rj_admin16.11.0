import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import '@styles/tab.less'
import { tabRemove } from '@redux/actions'
class MyTabs extends React.Component{
	static propTypes = {
		history: PropTypes.object.isRequired,
		tabObj: PropTypes.object.isRequired,
		tabRemove: PropTypes.func.isRequired,
	}
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	componentWillMount() {

	}
	componentDidMount() {

	}
	handleTabRemove = (tab,index,e) => {
		// e.stopPropagation()
		 e.preventDefault()

		// console.log(this.props.tabObj.tabs)
		// this.props.tabObj.tabs.splice(index, 1)
		// console.log(this.props.tabObj.tabs)
		// this.props.tabRemove(this.props.tabObj.tabs)
		// this.props.history.push('/welcome')
		// console.log(index)
		// this.props.tabRemove(this.props.tabObj.tabs,index)

		// this.props.tabRemove(this.props.tabObj.tabs)
	}
	render() {
		const { tabObj } = this.props
		return (
			<div style={ {margin:'15px'} }>
			<div className="el-tabs el-tabs--card">
				<div className="el-tabs__header">
					<div className="el-tabs__nav-wrap">
						<div className="el-tabs__nav-scroll">
							<ul className="el-tabs__nav">
								{
									tabObj.tabs.map((item, index) => {
										return (
											<li className="el-tabs__item is-closable" key={ item.name }>
												<Link to={ item.url }>{item.name}</Link>
												{
													item.name !=='欢迎页' &&
													<span className="el-icon-close" onClick={ (e) => this.handleTabRemove(item, index, e) } />
												}
											</li>
										)
									})
								}
							</ul>
						</div>
					</div>
				</div>
			</div>
			</div>
		)
	}
}
const mapStateToProps = state => {
	const { tabObj } = state
	return { tabObj }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ tabRemove }, dispatch)
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyTabs))
