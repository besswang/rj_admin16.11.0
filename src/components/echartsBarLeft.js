import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// 引入 ECharts 主模块
var echarts = require('echarts')
// 详情-报告-信贷行为-左边
class EchartsBarLeft extends Component {
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
		this.barLeftChart()
	}
	// componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
	// 	this.setState({
	// 		data: nextProps.gaugeData
	// 	})
	// }
	barLeftChart = () => {
	    // 基于准备好的dom，初始化echarts实例
	    var barLeftChart = echarts.init(document.getElementById('barLeft'))
	    // 绘制图表
	    barLeftChart.setOption({
			color: ['#1296db', '#1abddd'],
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
				data:['申请借款','借款']
			},
			xAxis : [
				{
					type: 'category',
					data: ['总计', '近6月', '近3月', '近1月']
				}
			],
			yAxis: {
				show: false
			},
			series : [
				{
					name:'申请借款',
					type:'bar',
					data: this.props.reportDate.barLeft1
				},
				{
					name:'借款',
					type:'bar',
					stack: '广告',
					data: this.props.reportDate.barLeft2
				}
			]
	    })
	}
    render() {
        return (
            <div id="barLeft" className="bar-left" />
        )
    }
}
const mapStateToProps = state => {
	const { reportDate } = state
	return { reportDate }
}
export default connect(mapStateToProps)(EchartsBarLeft)
