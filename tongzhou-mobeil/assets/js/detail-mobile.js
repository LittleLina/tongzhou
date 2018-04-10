$(document).ready(function() {

    $(function() {
        //获取当前时间
        getSiteInfo();
        // setInterval(getSiteInfo, 5000);
    })

    //获取当前天气
    function getWeather(lat, lon) {
        $.ajax({
                headers: {
                    Authorization: 'APPCODE b460027da331477eb66d7f496b025ab8'
                },
                url: 'http://aliv8.data.moji.com/whapi/json/aliweather/condition',
                type: 'post',
                data: {
                    lat: lat,
                    lon: lon
                }
            })
            .done(function(res) {
                $('#pname').html(res.data.city.pname);
                $('#city').html(res.data.city.name);
                $('#tem').html(res.data.condition.temp);
                $('#condition').html(res.data.condition.condition);
                $('#windDir').html(res.data.condition.windDir);
                $('#windSpeed').html(res.data.condition.windSpeed);
            })
            .fail(function() {
                failure('天气接口发生错误!');
            })

    }

    function getSiteInfo() {
        $.ax(
            geturl('airmonitor/air_site_params?site_id=' + getArgs()['site_id']),
            null,
            'get',
            function(res) {
                if (res.success == 'true') {
                    var data = res.data;
                    getWeather(data.list[0].site_latitude, data.list[0].site_longitude);
                    $('.choose').val(data.list[0].site_name);
                    if (data.list[0].other_data.AQI_data) {
                        $('#aqi').html(data.list[0].other_data.AQI_data.value);
                    }
                    if (data.list[0].other_data.PM25_data) {
                        $('#pm25').html(data.list[0].other_data.PM25_data.value);
                    }
                    if (data.list[0].other_data.PM10_data) {
                        $('#pm10').html(data.list[0].other_data.PM10_data.value);
                    }
                    if (data.list[0].other_data.SO2_data) {
                        $('#so2').html(data.list[0].other_data.SO2_data.value);
                    }
                    if (data.list[0].other_data.CO_data) {
                        $('#co').html(data.list[0].other_data.CO_data.value);
                    }
                    if (data.list[0].other_data.O3_data) {
                        $('#o3').html(data.list[0].other_data.O3_data.value);
                    }
                    if (data.list[0].other_data.NO2_data) {
                        $('#no2').html(data.list[0].other_data.NO2_data.value);
                    }
                    if (data.list[0].other_data.TSP_data) {
                        $('#tsp').html(data.list[0].other_data.TSP_data);
                    }
                    if (data.list[0].other_data.netStatus == 'true') {
                        $('.status').css('color', 'blue');
                        $('.status span').html('在线');
                    } else {
                        $('.status').css('color', 'red');
                        $('.status span').html('掉线');
                    }
                    for (var i = 0; i < $('.air-data').length; i++) {
                        if (parseInt($('.air-data').eq(i).html()) >= 0 && parseInt($('.air-data').eq(i).html()) < 50) {
                            $('.air-data').eq(i).css('color', '#3fdf58');
                        } else if (parseInt($('.air-data').eq(i).html()) >= 50 && parseInt($('.air-data').eq(i).html()) < 100) {
                            $('.air-data').eq(i).css('color', '#febf00');
                        } else if (parseInt($('.air-data').eq(i).html()) >= 100 && parseInt($('.air-data').eq(i).html()) < 150) {
                            $('.air-data').eq(i).css('color', '#fe6600');
                        } else if (parseInt($('.air-data').eq(i).html()) >= 150 && parseInt($('.air-data').eq(i).html()) < 200) {
                            $('.air-data').eq(i).css('color', '#fd0000');
                        } else if (parseInt($('.air-data').eq(i).html()) >= 200 && parseInt($('.air-data').eq(i).html()) < 300) {
                            $('.air-data').eq(i).css('color', '#991951');
                        } else if (parseInt($('.color').eq(i).html()) >= 300) {
                            $('.air-data').eq(i).css('color', '#b02d23');
                        }
                    }
                    var timestamp = null;
                    timestamp = new Date().getTime();
                    $('.choose').val(format(timestamp, 'YYYY-MM-dd hh:mm:ss'));
                } else {
                    failure(res.data.msg);
                }
            },
            function(XHR) {
                error(XHR.status);
            }
        );
    }
})
