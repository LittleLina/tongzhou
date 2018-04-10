$(document).ready(function() {
    // 公共导航点击出现
    var flagnav = 0
    $('.navbtn').click(function(event) {
        if (flagnav == 0) {
            $('.global-nav').removeClass('bounceOutLeft').addClass('bounceInLeft').show();
            $('.mark').show();
            flagnav = 1
        } else {
            $('.global-nav').removeClass('bounceInLeft').addClass('bounceOutLeft');
            $('.mark').hide();
            flagnav = 0
        }
    });
    $('.mark').click(function(event) {
        $('.global-nav').removeClass('bounceInLeft').addClass('bounceOutLeft');
        $('.mark').hide();
        flagnav = 0
    });
});
