$(document).ready(function() {
    var $map = $("#map");

    var myStyleJson = {
        myStyleJsonWithLabel: [
            {
                featureType: "land",
                elementType: "geometry.fill",
                stylers: {
                    color: "#303845",
                    visibility: "on"
                }
            },
            {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: {
                    color: "#232931",
                    visibility: "on"
                }
            },
            {
                featureType: "land",
                elementType: "geometry.stroke",
                stylers: {
                    color: "#596a7f",
                    visibility: "on"
                }
            },
            {
                featureType: "green",
                elementType: "all",
                stylers: {
                    visibility: "off"
                }
            },
            {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                    visibility: "off"
                }
            },
            {
                featureType: "building",
                elementType: "all",
                stylers: {
                    visibility: "off"
                }
            },
            {
                featureType: "road",
                elementType: "all",
                stylers: {
                    visibility: "off"
                }
            },
            {
                featureType: "poi",
                elementType: "all",
                stylers: {
                    visibility: "off"
                }
            },
            {
                featureType: "label",
                elementType: "labels.icon",
                stylers: {
                    visibility: "off"
                }
            },
            {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                    color: "#596a7f",
                    visibility: "on"
                }
            }
        ],
        myStyleJsonWithOutLabel: [
            {
                featureType: "land",
                elementType: "geometry.fill",
                stylers: {
                    color: "#303845",
                    visibility: "on"
                }
            },
            {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: {
                    color: "#232931",
                    visibility: "on"
                }
            },
            {
                featureType: "land",
                elementType: "geometry.stroke",
                stylers: {
                    color: "#596a7f",
                    visibility: "on"
                }
            },
            {
                featureType: "green",
                elementType: "all",
                stylers: {
                    visibility: "off"
                }
            },
            {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                    visibility: "off"
                }
            },
            {
                featureType: "building",
                elementType: "all",
                stylers: {
                    visibility: "off"
                }
            },
            {
                featureType: "road",
                elementType: "all",
                stylers: {
                    visibility: "off"
                }
            },
            {
                featureType: "poi",
                elementType: "all",
                stylers: {
                    visibility: "off"
                }
            },
            {
                featureType: "label",
                elementType: "labels",
                stylers: {
                    visibility: "off"
                }
            },
            {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                    color: "#596a7f",
                    visibility: "on"
                }
            }
        ]
    };

    // 模拟数据
    var markersArr = [
        {
            title: "站点名称：广州火车站",
            point: "113.264531,23.157003",
            address: "广东省广州市广州火车站",
            value: "12306"
        },
        {
            title: "站点名称：广州塔（赤岗塔）",
            point: "113.330934,23.113401",
            address: "广东省广州市广州塔（赤岗塔） ",
            value: "18500"
        },
        {
            title: "站点名称：广州动物园",
            point: "113.312213,23.147267",
            address: "广东省广州市广州动物园",
            value: "185"
        },
        {
            title: "站点名称：天河公园",
            point: "113.372867,23.134274",
            address: "广东省广州市天河公园",
            value: "18500"
        }
    ];

    // 设置地图容器的高度
    $map.height(getHeight());

    // 窗口改变事件
    $(window).resize(function() {
        $map.height(getHeight());
    });

    function getHeight() {
        return $(window).height() - 114;
    }

    function initMap() {
        // 百度地图API功能

        // 第1步：创建Map实例

        var map = new BMap.Map("map", { minZoom: 6, maxZoom: 16 });
        // 加载百度地图 marker 点管理器
        var mgr = new BMapLib.MarkerManager(map, {
            trackMarkers: true
        });

        // 第2步：进行配置设置

        // 设置地图自定义样式
        map.setMapStyle({ styleJson: myStyleJson.myStyleJsonWithLabel });
        // 设置中心点坐标和地图级别
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
        // 设置地图显示的城市 此项是必须设置的
        map.setCurrentCity("北京");
        // 设置开启鼠标滚轮缩放
        map.enableScrollWheelZoom(true);
        // // 设置左上角，添加缩放快捷工具
        // map.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }));
        // 左上角，添加比例尺
        map.addControl(new BMap.NavigationControl());

        // 第3步：读取后台数据， 并生成地图站点

        var points = [];
        var markers = []; // 存放地图中所有marker点
        var infos = []; // 存放地图中所有marker点的信息窗口

        //TODO:ajax从后台获取数据
        setTimeout(function() {
            addSiteData(markersArr);
        }, 2000);

        /**
         * [addMarkers 添加坐标点到百度地图]
         * @param {[type]} _markersArr [description]
         */
        function addSiteData(SiteDataArr) {
            // 循环读取markerArr数组，向地图上写入点, 并过滤、绑定操作事件 ,此时marker点是隐藏的。
            for (var i = 0; i < SiteDataArr.length; i++) {
                var p0 = SiteDataArr[i].point.split(",")[0];
                var p1 = SiteDataArr[i].point.split(",")[1];
                var name = SiteDataArr[i].title;
                var value = SiteDataArr[i].value;
                var point = new BMap.Point(p0, p1);
                points.push(point);
                // marker点自定义html
                var markerHtmlStr =
                    '<div style="position: absolute; margin: 0pt; padding: 0pt; width: 80px; height: 26px; left: -10px; top: -35px; overflow: hidden;">' +
                    '<img id="rm3_image" style="border:none;left:0px; top:0px; position:absolute;" src="./assets/images/re-imgs/site-logos/back1.png">' +
                    "</div>" +
                    '<label class=" BMapLabel" unselectable="on" style="position: absolute; -moz-user-select: none; display: inline; cursor: inherit; border: 0px none; padding: 2px 1px 1px; white-space: nowrap; font: 12px arial,simsun; z-index: 80; color: rgb(255, 102, 0); left: 15px; top: -35px;">' +
                    value +
                    "</label>";
                var richMarker = new BMapLib.RichMarker(markerHtmlStr, point, {
                    anchor: new BMap.Size(-18, -27), // 偏移
                    enableDragging: false // 是否可以拖拽
                });

                // marker点的文字标签
                var labelOpts = {
                    position: point, // 指定文本标注所在的地理位置
                    offset: new BMap.Size(-30, -27) //设置文本偏移量
                };
                var label = new BMap.Label(name, labelOpts);
                label.setStyle({
                    color: "#fff",
                    fontSize: "20px",
                    height: "20px",
                    lineHeight: "20px",
                    fontFamily: "微软雅黑",
                    background: "transparent",
                    border: "none"
                });

                //TODO:可以根据设备类型，动态设置marker点显示/隐藏 zoom层级范围。
                mgr.addMarker(richMarker, 6, 16);
                markers.push(richMarker);

                map.addOverlay(label);

                // 是否可以拖动
                richMarker.disableDragging();
            }
            // 第4步：显示marker点, 并自动调整视野。
            mgr.showMarkers();
            // 自动调整视野
            map.setViewport(points);
        }

        /**
         * 显示／隐藏 地图城市label
         *--------------------------------------------------------------------------*/

        $(".map-control__showCityName").on("click", function() {
            var $toggleLabel = $(this).find(".toggle-label");
            $toggleLabel.toggleClass("toggle-label--on");

            if ($toggleLabel.hasClass("toggle-label--on")) {
                console.log("toggle-label is on");
                map.setMapStyle({
                    styleJson: myStyleJson.myStyleJsonWithLabel
                });
            } else {
                console.log("toggle-label is off");
                map.setMapStyle({
                    styleJson: myStyleJson.myStyleJsonWithOutLabel
                });
            }
        });
    }

    // 调用initMap代码
    initMap();

    /**
     * 地图页面 右侧信息窗口折叠／展开按钮方法
     *--------------------------------------------------------------------------*/

    $(".map-side__toggle").on("click", function() {
        var $mapSide = $(".map-side");
        $mapSide.toggleClass("map-side--open");

        if ($mapSide.hasClass("map-side--open")) {
            console.log("map-side is opened");
        } else {
            console.log("map-side is closed");
        }
    });

    /**
     * 左侧项目、站点列表 点击折叠／展开效果 js
     *--------------------------------------------------------------------------*/

    $(".sidebar-lists__collapse").on("click", function() {
        var layoutLeft = $(".site-layout__sidebar");
        var layoutRight = $(".site-layout__content");

        layoutLeft.toggleClass("site-layout__sidebar--collapse");
        layoutRight.toggleClass("site-layout__content--collapse");
    });
});
