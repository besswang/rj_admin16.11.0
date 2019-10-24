import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button } from 'element-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveList, saveIdCardInfo } from '@redux/actions'
class DetailBtn extends Component {
 static propTypes = {
  linkTo: PropTypes.object.isRequired,
    saveList: PropTypes.func.isRequired,
    row: PropTypes.object.isRequired,
    saveIdCardInfo: PropTypes.func.isRequired,
 }
 componentWillMount() {

 }
 componentDidMount() {
  this.props.saveIdCardInfo(null)
 }
 render() {
    const { linkTo, row } = this.props
    return (
      <Link to={ linkTo }>
        <Button type="text" size="small" onClick={ this.props.saveList.bind(this,row) }>{ linkTo.text }</Button>
      </Link>
    )
  }
}

const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ saveList, saveIdCardInfo }, dispatch)
	}
}
export default connect(null, mapDispatchToProps)(DetailBtn)
