import React, { Component } from 'react'
import PropTypes from 'prop-types'
// 引入 ECharts 主模块
var echarts = require('echarts')
export default class EchartsGauge extends Component {
	static propTypes = {
		gaugeData: PropTypes.array
	}
    constructor(props) {
        super(props)
        this.state = {
			data: props.gaugeData
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
		this.gaugeChart()
	}
	componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
		this.setState({
			data: nextProps.gaugeData
		})
	}
	gaugeChart = () => {
	    // 基于准备好的dom，初始化echarts实例
	    var gaugeChart = echarts.init(document.getElementById('gauge'))
	    // 绘制图表
	    gaugeChart.setOption({
	        series: [{
	            type: 'gauge',
	            splitNumber: 20,
				data: this.state.data,
				// [{
	            //     value: 28,
	            //     name: '较低风险'
				// }
				// , {
	            //     value: 55,
	            //     name: '中度风险'
	            // }, {
	            //     value: 80,
	            //     name: '中高风险'
	            // }, {
	            //     value: 100,
	            //     name: '高风险'
				// }
				// ],
	            axisLine: {
	                lineStyle: {
	                    color: [
	                        [0.3, '#13ce66'],
	                        [0.55, '#50bfff'],
	                        [0.8, '#f7ba2a'],
	                        [1, '#ff4949']
	                    ],
	                    width: 10
	                }
	            },
	            splitLine: {
	                length: 8,
	            },
	            axisTick: {
	                show: false,
	                splitNumber: 5
	            },
	            axisLabel: {
	                color: '#9e9e9e',
	                formatter: function (value) {
	                    if (value === 0) {
	                        return 0
	                    } else if (value === 30) {
	                        return value
	                    } else if (value === 55) {
	                        return value
	                    } else if (value === 80) {
	                        return value
	                    } else if (value === 100) {
	                        return 100
	                    } else {
	                        return ''
	                    }
	                }
	            },
	            pointer: {
	                show: false // 不显示指针
	            },
	            title: {
	                color: this.state.data[0].color
	            },
	            detail: {
	                offsetCenter: [0, 0],
	                fontSize: 50,
	                fontWeight: 'bold'
	            }
	        }]
	    })
	}
    render() {
        return (
            <div id="gauge" className="gauge" />
        )
    }
}