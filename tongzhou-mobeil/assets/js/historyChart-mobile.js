$(document).ready(function() {
    $(function() {
        // tab切换
        $('.tab-title li').click(function(event) {
            var i = $(this).index();
            $(this).addClass('tab-title__active').siblings().removeClass('tab-title__active');
            $('.tab-content p').eq(i).addClass('tab-content__active').siblings().removeClass('tab-content__active');
        });

        // 折线图
        setLine()
            // 计算body高度
        $('html,body').height($(document).height())
            // 阻止自带键盘弹出
        $("#dateTime,#date,#month").focus(function() {
            document.activeElement.blur();
        });
        // 时间控件初始化
        var calendar = new lCalendar();
        calendar.init({
            'trigger': '#dateTime',
            'type': 'datetime'
        });
        var calendardatetime = new lCalendar();
        calendardatetime.init({
            'trigger': '#date',
            'type': 'date'
        });
        var calendar1 = new lCalendar();
        calendar1.init({
            'trigger': '#month',
            'type': 'date'
        });



    })

    function setLine() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('line'));
        var shuju = [10, 60, 110, 160, 210, 350, 80, 90, 120];
        option = {
            title: {
                text: '',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            legend: {
                data: ['PM2.5'],
                textStyle: {
                    color: '#fff'
                }
            },
            toolbox: {
                show: false,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                textStyle: {
                    color: '#fff'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                type: 'category',
                boundaryGap: false,
                data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00']
            },
            yAxis: {
                textStyle: {
                    color: '#fff'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            dataZoom: [{ // 这个dataZoom组件，默认控制x轴。
                textStyle: {
                    color: '#fff'
                },
                type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                start: 0, // 左边在 0% 的位置。
                end: 60, // 右边在 60% 的位置。
            }, { // 这个dataZoom组件，也控制x轴。
                type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                start: 0, // 左边在 0% 的位置。
                end: 60 // 右边在 60% 的位置。
            }],
            series: [{
                name: 'PM2.5',
                type: 'line',
                data: [11, 11, 15, 13, 12, 13, 10],
                itemStyle: {
                    normal: {
                        color: '#FAD492',
                        lineStyle: {
                            color: '#E9BF75'
                        }
                    }
                }
                // markLine: {
                //     data: [
                //         { type: 'average', name: '平均值' }
                //     ]
                // }
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

});
