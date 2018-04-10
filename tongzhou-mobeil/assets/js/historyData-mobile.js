$(document).ready(function() {
    $(function() {
        $('.tab-title li').click(function(event) {
            var i = $(this).index();
            $(this).addClass('tab-title__active').siblings().removeClass('tab-title__active');
            $('.tab-content p').eq(i).addClass('tab-content__active').siblings().removeClass('tab-content__active');
        });
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
})
