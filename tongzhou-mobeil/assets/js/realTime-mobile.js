$(document).ready(function() {
    var paramData = 'AQI_data';
    var time = null;
    var paramName = 'AQI';
    $(function() {
            // 导航选中当前
            $('.global-nav li').eq(0).css('backgroundColor', '#F1F1F1');
            // 切换污染参数
            $('.unit').hide();
            // 切换项目
            $('.site-check').change(function(event) {
                getALLInfo();
                // 清除定时器
                clearInterval(time);
                time = setInterval(getALLInfo, 5000);
            });
            $('.check-content li').click(function() {
                    flag = 0;
                    var i = $(this).index();
                    $(this).addClass('active').siblings().removeClass('active');
                    if (i == 0) {
                        $('.unit').hide();
                    } else {
                        $('.unit').show();
                    }
                    paramName = $(this).html();
                    // 获得当前要显示的参数
                    paramData = $(this).attr('data-type');
                    getALLInfo();
                    // 清除定时器
                    clearInterval(time);
                    time = setInterval(getALLInfo, 5000);
                })
                // 计算body高度
            $('html,body').height($(document).height())
                // 获取所有项目
            getAllprojects();
            time = setInterval(getALLInfo, 5000);

        })
    // 获取所有项目
    function getAllprojects() {
        $.ax(
            getStationurl('station/projects?page=1&page_size=1000'),
            null,
            'get',
            function(res) {
                if (res.success == 'true') {
                    var data = res.data;
                    var html = '';
                    for (var i = 0; i < data.list.length; i++) {
                        html += ' <option value="' + data.list[i].pro_id + '">' + data.list[i].pro_name + '</option>'
                    }
                    $('.site-check').append(html);
                    getALLInfo();
                } else {
                    failure(res.data.msg);
                }
            },
            function(XHR) {
                error(XHR.status);
            }
        );
    }
    // 获取某一个项目下的台站信息
    var paramList = [];
    var sigleList = [];
    var siteList = [];
    var flag = 0;
    var updataTime = '123';
    var everyTime = ''
    function getALLInfo() {
        $.ax(
            geturl('airmonitor/air_site_params?pro_id=' + $('.site-check').val()),
            null,
            'get',
            function(res) {
                if (res.success == 'true') {
                    var data = res.data
                    sigleList = [];
                    siteList = [];
                    everyTime = ''
                    for (var i = 0; i < data.list.length; i++) {
                        siteList.push(data.list[i].site_name);
                        paramList.push(data.list[i]);
                        everyTime += res.data.list[i].other_data.coll_time;
                        if (paramData == 'TSP_data') {
                            sigleList.push(data.list[i].other_data.TSP_data);
                        } else if (paramData == 'PM25_data') {
                            sigleList.push(data.list[i].other_data.PM25_data.value);
                        } else if (paramData == 'AQI_data') {
                            sigleList.push(data.list[i].other_data.AQI_data.value);
                        } else if (paramData == 'PM10_data') {
                            sigleList.push(data.list[i].other_data.PM10_data.value);
                        } else if (paramData == 'NO2_data') {
                            sigleList.push(data.list[i].other_data.NO2_data.value);
                        } else if (paramData == 'SO2_data') {
                            sigleList.push(data.list[i].other_data.SO2_data.value);
                        } else if (paramData == 'O3_data') {
                            sigleList.push(data.list[i].other_data.O3_data.value);
                        } else if (paramData == 'CO_data') {
                            sigleList.push(data.list[i].other_data.CO_data.value);
                        }
                    }
                    if (flag == 0) {
                        setLine();
                        flag = 1;
                    }
                    if (updataTime != everyTime) {
                        updataTime = everyTime;
                        setLine();
                        // console.log('改变');
                    }
                    // console.log(updataTime)
                    // console.log(everyTime)
                    var timestamp = null;
                    timestamp = new Date().getTime();
                    $('#nowdate').html(format(timestamp, 'YYYY-MM-dd hh:mm:ss'));
                } else {
                    failure(res.data.msg);
                }
            },
            function(XHR) {
                error(XHR.status);
            }
        );
    }

    function setLine() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('line'));

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                },
                lineStyle: {
                    color: '#fff'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                textStyle: {
                    color: '#fff'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                type: 'category',
                data: siteList,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    interval: 0,
                    formatter: function(value) {
                        var ret = ""; //拼接加\n返回的类目项  
                        var maxLength = 2; //每项显示文字个数  
                        var valLength = value.length; //X轴类目项的文字个数  
                        var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
                        if (rowN > 1) //如果类目项的文字大于3,  
                        {
                            for (var i = 0; i < rowN; i++) {
                                var temp = ""; //每次截取的字符串  
                                var start = i * maxLength; //开始截取的位置  
                                var end = start + maxLength; //结束截取的位置  
                                //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                                temp = value.substring(start, end) + "\n";
                                ret += temp; //凭借最终的字符串  
                            }
                            return ret;
                        } else {
                            return value;
                        }
                    }
                }
            }],
            yAxis: [{
                textStyle: {
                    color: '#fff'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                type: 'value'
            }],
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
                name: paramName,
                type: 'bar',
                itemStyle: {
                    normal: { //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                        color: function(params) {
                            if (sigleList[params.dataIndex] >= 0 && sigleList[params.dataIndex] < 50) {
                                return '#3fdf58'
                            } else if (sigleList[params.dataIndex] >= 50 && sigleList[params.dataIndex] < 100) {
                                return '#febf00'
                            } else if (sigleList[params.dataIndex] >= 100 && sigleList[params.dataIndex] < 150) {
                                return '#fe6600'
                            } else if (sigleList[params.dataIndex] >= 150 && sigleList[params.dataIndex] < 200) {
                                return '#fd0000'
                            } else if (sigleList[params.dataIndex] >= 200 && sigleList[params.dataIndex] < 300) {
                                return '#991951'
                            } else {
                                return '#b02d23'
                            }
                        }, //以下为是否显示，显示位置和显示格式的设置了
                        label: {
                            show: true,
                            position: 'top',
                            //                             formatter: '{c}'
                            formatter: '{b}\n{c}'
                        }
                    }
                }, //设置柱的宽度，要是数据太少，柱子太宽不美观~
                barWidth: 30,
                data: sigleList
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

});
