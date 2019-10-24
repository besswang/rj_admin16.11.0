import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import 'whatwg-fetch'
class Example extends Component {
	static propTypes = {
	  // dispatch: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
  }
	componentWillMount() {
	  // console.log(this.props)
	}
	componentDidMount() {
	  // console.log(this.props)
  }
  fetchFn = () => {
    fetch('/api/login/channellogin', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({adminName:'admin', password: '123456'})
    }).then(function (response) {
      console.log(response)
    }).catch(function (err) {
      // 出错了;等价于 then 的第二个参数,但这样更好用更直观 :(
    })
  }
  render() {
    return (
      <div onClick={ this.fetchFn }>测试单独用fetch</div>
    )
  }
}
export default connect(Example)