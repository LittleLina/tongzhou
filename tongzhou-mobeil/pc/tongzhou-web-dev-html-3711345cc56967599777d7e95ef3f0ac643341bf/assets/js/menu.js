$(document).ready(function() {

    // vegas 全屏背景图插件
    // 可能需要修改下方 src 的地址：

    $(function() {
        run_bg_img();

        function run_bg_img() {
            $('.site-menu__imgContainer').vegas({
                delay: 7000,
                timer: true,
                cover: true,
                slides: [
                    { src: '../tongzhou-web/assets/images/re-imgs/menu-bg/menu_bg_1.jpg' },
                    { src: '../tongzhou-web/assets//images/re-imgs/menu-bg/menu_bg_2.jpg' }
                ]
            });
        }
    });
});
