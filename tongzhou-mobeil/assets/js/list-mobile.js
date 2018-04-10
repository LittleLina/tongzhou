$(document).ready(function() {
    var paramData = 'AQI_data'
        //显示aqi隐藏单位
    $('#unit').hide();
    // 导航选中当前
    $('.global-nav li').eq(0).css('backgroundColor', '#F1F1F1');
    //状态值tab切换
    var time = null;
    $('.sp-content .swiper-slide').click(function(event) {
        $(this).addClass('swiper-slide-active').siblings().removeClass('swiper-slide-active');
        paramData = $(this).attr('data-type');
        //显示aqi隐藏单位
        if (paramData == 'AQI_data') {
            $('#unit').hide();
        } else {
            $('#unit').show();
        }

        $('#param-name').html($(this).html());
        getALLInfo();
        // 清除定时器
        clearInterval(time)
        time = setInterval(getALLInfo, 5000);
    });
    // 状态拖动
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 0,
        freeMode: true,
        slidesPerView: 'auto'
    });
    // 初始化参数
    var page_size = 10;
    var page = 1;
    var siteNameList = [];
    var monitorList = [];
    // 5s刷新接口
    getALLInfo();
    time = setInterval(getALLInfo, 5000);
    // 获取所有站点信息
    function getALLInfo() {
        $.ax(
            getStationurl('station/sites?page=' + page + '&page_size=' + page_size),
            null,
            'get',
            function(res) {
                var data = res.data;
                if (res.success == 'true') {
                    var siteIds = ''
                    var count = data.count;
                    for (var i = 0; i < data.list.length; i++) {
                        siteIds += data.list[i].site_id + ',';
                        siteNameList.push(data.list[i].site_id);
                    }
                    siteIds = siteIds.substring(0, siteIds.length - 1);
                    $.ax(
                        geturl('airmonitor/air_site_params?site_ids=' + siteIds),
                        null,
                        'get',
                        function(res) {
                            if (res.success == 'true') {
                                var html = '';
                                for (var i = 0; i < res.data.list.length; i++) {
                                    html += '<li>'
                                    html += '<span>' + res.data.list[i].site_name + '</span>'
                                    if (paramData == 'TSP_data') {
                                        html += '<span class="color">' + res.data.list[i].other_data.TSP_data + '</span>'
                                    } else if (paramData == 'PM25_data') {
                                        html += '<span class="color">' + res.data.list[i].other_data.PM25_data.value + '</span>'
                                    } else if (paramData == 'AQI_data') {
                                        html += '<span class="color">' + res.data.list[i].other_data.AQI_data.value + '</span>'
                                    } else if (paramData == 'PM10_data') {
                                        html += '<span class="color">' + res.data.list[i].other_data.PM10_data.value + '</span>'
                                    } else if (paramData == 'NO2_data') {
                                        html += '<span class="color">' + res.data.list[i].other_data.NO2_data.value + '</span>'
                                    } else if (paramData == 'SO2_data') {
                                        html += '<span class="color">' + res.data.list[i].other_data.SO2_data.value + '</span>'
                                    } else if (paramData == 'O3_data') {
                                        html += '<span class="color">' + res.data.list[i].other_data.O3_data.value + '</span>'
                                    } else if (paramData == 'CO_data') {
                                        html += '<span class="color">' + res.data.list[i].other_data.CO_data.value + '</span>'
                                    }
                                    if (res.data.list[i].other_data.netStatus == 'true') {
                                        html += '<span style="color:blue;">' + '在线' + '</span>'
                                    } else {
                                        html += '<span style="color:red;">' + '掉线' + '</span>'
                                    }
                                    html += '</li>'
                                }
                                $('.site__list').html(html);
                                for (var i = 0; i < $('.color').length; i++) {
                                    if (parseInt($('.color').eq(i).html()) >= 0 && parseInt($('.color').eq(i).html()) < 50) {
                                        $('.color').eq(i).css('color', '#3fdf58');
                                    } else if (parseInt($('.color').eq(i).html()) >= 50 && parseInt($('.color').eq(i).html()) < 100) {
                                        $('.color').eq(i).css('color', '#febf00');
                                    } else if (parseInt($('.color').eq(i).html()) >= 100 && parseInt($('.color').eq(i).html()) < 150) {
                                        $('.color').eq(i).css('color', '#fe6600');
                                    } else if (parseInt($('.color').eq(i).html()) >= 150 && parseInt($('.color').eq(i).html()) < 200) {
                                        $('.color').eq(i).css('color', '#fd0000');
                                    } else if (parseInt($('.color').eq(i).html()) >= 200 && parseInt($('.color').eq(i).html()) < 300) {
                                        $('.color').eq(i).css('color', '#991951');
                                    } else if(parseInt($('.color').eq(i).html()) >= 300) {
                                        $('.color').eq(i).css('color', '#b02d23');
                                    }
                                }
                                data_count = count;
                                page_fen(data_count);
                            } else {
                                failure(res.data.msg);
                            }
                        },
                        function(XHR) {
                            error(XHR.status);
                        }
                    );
                } else {
                    failure(res.data.msg)
                }
            },
            function(XHR) {
                error(XHR.status);
            }
        );
    }

    //分页
    function page_fen(data_count) {
        var pagehtml = "<li><a onclick='gotoPage(1)'>‹‹</a></li><li><a onclick='lastPage()'>‹</a></li>";
        if (data_count % page_size > 0) {
            countpage = parseInt(data_count / page_size) + 1;
        } else {
            countpage = parseInt(data_count / page_size);
        }
        if (countpage > 10) {
            //当前页大于5并且总页数比当前页数大于5
            if ((page - 5) > 0 && (countpage - page) > 5) {
                for (var i = page - 4; i <= parseInt(page) + 5; i++) {
                    if (i == page) {
                        pagehtml += "<li class='active'><a  onclick='findPage(this)'>" + i + "</a></li>";
                    } else {
                        pagehtml += "<li ><a onclick='findPage(this)'>" + i + "</a></li>";
                    }
                }
            } else if ((page - 5) > 0 && (countpage - page) <= 5) {
                for (var i = countpage - 9; i <= countpage; i++) {
                    if (i == page) {
                        pagehtml += "<li class='active'><a  onclick='findPage(this)'>" + i + "</a></li>";
                    } else {
                        pagehtml += "<li ><a onclick='findPage(this)'>" + i + "</a></li>";
                    }
                }
            } else if ((5 - page) >= 0) {
                for (var i = 1; i <= 10; i++) {
                    if (i == page) {
                        pagehtml += "<li class='active'><a  onclick='findPage(this)'>" + i + "</a></li>";
                    } else {
                        pagehtml += "<li ><a onclick='findPage(this)'>" + i + "</a></li>";
                    }
                }
            }
        } else {
            for (var i = 1; i <= countpage; i++) {
                if (i == page) {
                    pagehtml += "<li class='active'><a  onclick='findPage(this)'>" + i + "</a></li>";
                } else {
                    pagehtml += "<li ><a onclick='findPage(this)'>" + i + "</a></li>";
                }
            }
        }

        pagehtml += "<li><a onclick='nextPage()'>›</a></li><li><a onclick='gotoPage(" + countpage + ")'>››</a></li>";
        if (data_count > 0) {
            $(".pagediv").html(pagehtml);
        } else {
            $(".pagediv").html("");
        }
    }
    //分页查询
    function findPage(currPage) {
        data.page = $(currPage).html();
        page = $(currPage).html();
        getALLInfo(data);
    }
    //上一页
    function lastPage() {
        if (data.page == 1) {
            return;
        } else {
            data.page = (data.page - 1);
            page = data.page;
            getALLInfo(data);
        }
    }
    //下一页
    function nextPage() {
        if (data.page == countpage) {
            return;
        } else {
            data.page = Number(data.page) + Number(1);
            page = data.page;
            getALLInfo(data);
        }
    }
    //首页尾页
    function gotoPage(currPage) {
        data.page = currPage;
        page = currPage;
        getALLInfo(data);
    }
});
