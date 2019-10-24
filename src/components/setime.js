// 开始-结束时间组建
import React,{ Component } from 'react'
import { DateRangePicker } from 'element-react'
import PropTypes from 'prop-types'
export default class SetEndTime extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
	    value2: null
	  }
	}
	handleVal = (e) => {
		if(e !== null){
			const beginTime = Math.round(e[0])
			const endTime = Math.round(e[1])
			const data = {
				beginTime: beginTime,
				endTime: endTime
			}
			this.props.handleTime(data)
		} else {
			this.props.handleTime({})
		}
	}
  render (){
		// console.log(this.state.value2)
    const { value2 } = this.state
    return (
			<DateRangePicker
				value={ value2 }
				isShowTime
				placeholder="选择日期范围"
				align="right"
				ref={ e => { this.daterangepicker2 = e } }
				onChange={ date => {
						this.setState({ value2: date })
						this.handleVal(date)
					}
				}
				shortcuts={
					[
						{
							text: '最近一周',
							onClick: () => {
								const end = new Date()
								const start = new Date()
								start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
								this.setState({ value2: [start, end] })
								this.handleVal([start, end])
								this.daterangepicker2.togglePickerVisible()
							}
						}, {
							text: '最近一个月',
							onClick: () => {
								const end = new Date()
								const start = new Date()
								start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
								this.setState({ value2: [start, end] })
								this.handleVal([start, end])
								this.daterangepicker2.togglePickerVisible()
							}
						}, {
								text: '最近三个月',
								onClick: ()=> {
									const end = new Date()
									const start = new Date()
									start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
									this.setState({ value2: [start, end] })
									this.handleVal([start, end])
									this.daterangepicker2.togglePickerVisible()
								}
						}
					]
				}
			/>
    )
  }
}
SetEndTime.propTypes = {
	handleTime: PropTypes.func
}
