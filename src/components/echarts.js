import React, { Component } from 'react'
import api from '../api/index'
// 引入 ECharts 主模块
var echarts = require('echarts')
// import echarts from 'echarts/lib/echarts';
// import 'echarts/lib/chart/line';
// // 引入提示框和标题组件
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
export default class Echarts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pieLegend: [],
            pieSeries: [],
            lineXaxis: [],
            lineSeries1: [],
            lineSeries2: []
        }
    }
    componentWillMount() {
        // console.log(this.props)
        this.fetchPie()
        this.fetchLine()
    }
    componentDidMount() {

    }
    fetchPie = async () => {
        const res = await api.selectQuApi()
        if(res.success){
            const pie = []
            let pieObj = {}
            for (const item of res.data[1]) {
                pieObj = {
                    name: item.channelName,
                    value: item.count
                }
                pie.push(pieObj)
            }
            this.setState({
                pieLegend: res.data[0],
                pieSeries: pie
            })
            this.pieEchart()
        }
    }
    fetchLine = async () => {
        const myDate = new Date()
        const nowTime = myDate.getTime()
        const week = myDate.getDay()
        const res = await api.selectLoanRepaymentApi({
            nowTime: nowTime,
            week: week
        })
        if (res.success) {
            this.setState({
                lineXaxis: res.data.weekList,
                lineSeries1: res.data.loanMoney,
                lineSeries2: res.data.repayment
            })
            this.lineChart()
        }
    }
    lineChart = () => {
       // 基于准备好的dom，初始化echarts实例
       var lineChart = echarts.init(document.getElementById('line'))
       // 绘制图表
       lineChart.setOption({
           title: {
               text: '放/还款统计'
           },
           tooltip: {
               trigger: 'axis'
           },
           legend: {
               data: ['放款记录', '还款记录']
           },
           xAxis: {
               data: this.state.lineXaxis
           },
           yAxis: {},
           series: [{
               name: '放款记录',
               type: 'line',
               data: this.state.lineSeries1
           }, {
               name: '还款记录',
               type: 'line',
               data: this.state.lineSeries2
           }]
       })
    }
    pieEchart = () => {
        var pieChart = echarts.init(document.getElementById('pie'))
        // 绘制图表
        pieChart.setOption({
            title: {
                text: '渠道统计'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                data: this.state.pieLegend
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {
                        show: true
                    },
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    }
                }
            },
            calculable: true,
            series: [{
                name: '渠道统计',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: this.state.pieSeries
            }]
        })
    }
    render() {
        return (
            <div>
                <div id="line" style={ { width: 600, height: 400 } } />
                <div id="pie" style={ { width: 600, height: 400 } } />
            </div>
        )

    }
}