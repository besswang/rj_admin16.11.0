import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// 引入 ECharts 主模块
var echarts = require('echarts')
// 详情-报告-信贷行为-左边
class EchartsBarRight extends Component {
	static propTypes = {
		reportDate: PropTypes.object
	}
    constructor(props) {
        super(props)
        this.state = {
			// data: props.gaugeData
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
		this.barRightChart()
	}
	// componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
	// 	this.setState({
	// 		data: nextProps.gaugeData
	// 	})
	// }
	barRightChart = () => {
	    // 基于准备好的dom，初始化echarts实例
	    var barRightChart = echarts.init(document.getElementById('barRight'))
	    // 绘制图表
	    barRightChart.setOption({
			color: ['#25ba7d'],
			barWidth:'35%',
			label:{
				show:true,
				position: 'top'
			},
			emphasis: {
				label: {
					show: true,
					position: 'top',
					fontSize: 14
				}
			},
			legend: {
				data:['还款']
			},
			xAxis : [
				{
					type: 'category',
					data: ['总计', '近6月', '近3月', '近1月']
				}
			],
			yAxis : {
				show:false
			},
			series : [
				{
					name:'还款',
					type:'bar',
					data: this.props.reportDate.barRight
				}
			]
	    })
	}
    render() {
        return (
            <div id="barRight" className="bar-right" />
        )
    }
}
const mapStateToProps = state => {
	const { reportDate } = state
	return { reportDate }
}
export default connect(mapStateToProps)(EchartsBarRight)
