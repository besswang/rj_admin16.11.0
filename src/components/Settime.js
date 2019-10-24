// 开始-结束时间组建
import React from 'react'
import PropTypes from 'prop-types'
import { DateRangePicker } from 'element-react'
// let timeref = null
const Settime = ({value, onChange,placeholder, t}) => (
	<DateRangePicker
		value={ value }
		isShowTime
		placeholder={ placeholder ? placeholder:'选择日期范围' }
		align="right"
		ref={ e => { t = e } }
		onChange={ e => onChange(e) }
		shortcuts={
			[
				{
					text: '最近一周',
					onClick: () => {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
						onChange([start, end])
						t.togglePickerVisible()
					}
				}, {
					text: '最近一个月',
					onClick: () => {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
						onChange([start, end])
						t.togglePickerVisible()
					}
				}, {
						text: '最近三个月',
						onClick: ()=> {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
							onChange([start, end])
							t.togglePickerVisible()
						}
				}
			]
		}
	/>
)
Settime.propTypes = {
	timeref: PropTypes.func,
	value: PropTypes.array,
	onChange: PropTypes.func,
	t: PropTypes.func,
	placeholder: PropTypes.string
}
export default Settime
