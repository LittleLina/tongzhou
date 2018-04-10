$(document).ready(function() {

    /*
     * 表格插件 js
     */

    // 初始化日期控件
    
    // var calendar = new lCalendar();
    // calendar.init({
    //     'trigger': '#site-date',
    //     'type': 'date'
    // });
    // var calendardatetime = new lCalendar();
    // calendardatetime.init({
    //     'trigger': '#site-time',
    //     'type': 'time'
    // });
    // var calendar1 = new lCalendar();
    // calendar1.init({
    //     'trigger': '#day-date',
    //     'type': 'date'
    // });
    var $table = $("#table");
    var $remove = $("#remove");
    var selections = [];
    
    // 阻止自带键盘弹出
    $("#site-date,#site-time,#day-date").focus(function() {
        document.activeElement.blur();
    });
    
    /**
     * [operateFormatter 生成操作按钮html。]
     * @param  {[type]} value [description]
     * @param  {[type]} row   [description]
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    function operateFormatter(value, row, index) {
        return [
            '<a class="operate operate-propertyMgmt" href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" title="权限管理">',
            '<i class="fa fa-address-card-o" aria-hidden="true"></i>',
            '</a>  ',
            '<a class="operate operate-stationMgmt" href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" title="台站管理">',
            '<i class="fa fa-television" aria-hidden="true"></i>',
            '</a>',
            '<a class="operate operate-edit" href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" title="查看/编辑">',
            '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
            '</a>',
            '<a class="operate operate-ban" href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" title="启用/禁用">',
            '<i class="fa fa-ban" aria-hidden="true"></i>',
            '</a>'
        ].join('');
    }


    /**
     * [operateEvents 给操作按钮绑定相应方法。]
     * @type {Object}
     */
    window.operateEvents = {
        'click .operate-propertyMgmt': function(e, value, row, index) {
            alert('You click like action, row: ' + JSON.stringify(row));
        },
        'click .remove': function(e, value, row, index) {
            $table.bootstrapTable('remove', {
                field: 'id',
                values: [row.id]
            });
        }
    };

    // 工具提示
    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });

    /**
     * [totalTextFormatter description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    function totalTextFormatter(data) {
        return "Total";
    }

    /**
     * [totalNameFormatter description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    function totalNameFormatter(data) {
        return data.length;
    }

    /**
     * [totalPriceFormatter description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    function totalPriceFormatter(data) {
        var total = 0;
        $.each(data, function(i, row) {
            total += +(row.price.substring(1));
        });
        return "$" + total;
    }

    /**
     * [getHeight 获取表格高度]
     * @return {[type]} [description]
     */
    function getHeight() {
        // return $(window).height();
    }
    /**
     * [getIdSelections description]
     * @return {[type]} [description]
     */
    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function(row) {
            return row.id;
        });
    }

    /**
     * [initTable 表格初始化操作]
     * @return {[type]} [description]
     */
    function initTable() {

        //先销毁表格  
        $table.bootstrapTable('destroy');

        $table.bootstrapTable({
            height: '300px',
            url: "",
            method: "get",
            dataType: "json",
            ajaxOptions: {
                beforeSend: function(request) {
                    request.setRequestHeader("user_token", "411b763b4e47bab33dc909efc657764f");
                }
            },
            queryParamsType: "undefined",
            queryParams: function queryParams(params) { //设置查询参数
                var _params = {
                    page: params.pageNumber,
                    page_size: params.pageSize,
                    order: params.sortOrder,
                    sortby: params.sortName
                };
                return _params;
            },
            responseHandler: function(res) {
                var _data = res.data;
                return {
                    total: _data.count,
                    rows: _data.list
                };
            },
            onLoadSuccess: function() { //加载成功时执行
                console.log("加载成功");
            },
            onLoadError: function() { //加载失败时执行
                console.log("加载数据失败");
            },
            pagination: true,
            pageNumber: 1, //当前第几页
            pageSize: 10, //每页显示的记录数
            pageList: [10, 25, 50, 100], //记录数可选列表
            sortName: "user_name",
            sortOrder: "asc",
            // 设置在 client 还是 server进行操作。
            sidePagination: "client",
            smartDisplay: false,
            clickToSelect: true,
            paginationPreText: "<<",
            paginationNextText: ">>",

            // 表头设置
            columns: [
                [{
                    field: "user_name",
                    title: "站点名称",
                    align: "center",
                    valign: "middle",
                    width: "25%",
                    sortable: true,
                    footerFormatter: totalTextFormatter
                }, {
                    field: "user_real_name",
                    title: "小时均值",
                    sortable: true,
                    editable: true,
                    width: "25%",
                    footerFormatter: totalNameFormatter,
                    align: "center"
                }, {
                    field: "user_mobile",
                    title: "日均值",
                    sortable: true,
                    align: "center",
                    width: "25%",
                    footerFormatter: totalPriceFormatter
                }, {
                    field: "user_role_name",
                    title: "月均值",
                    width: "25%",
                    sortable: true,
                    editable: true,
                    footerFormatter: totalNameFormatter,
                    align: "center"
                }]
            ],

            // 数据设置
            data: [{
                "state": "BJ3/OHM/LAN",
                "user_name": "2017/5/5 16:30:20",
                "user_real_name": "站点单频网异常报警!",
                "user_mobile": "已消警",
                "user_role_name": "已消警",
                "operate": "2017/5/5 16:30:20",
                "data_order": 23
            }, {
                "state": "BJ3/OHM/LAN",
                "user_name": "2017/5/5 16:30:20",
                "user_real_name": "站点单频网异常报警!",
                "user_mobile": "已消警",
                "user_role_name": "已消警",
                "operate": "2017/5/5 16:30:20",
                "data_order": 23
            }, {
                "state": "BJ3/OHM/LAN",
                "user_name": "2017/5/5 16:30:20",
                "user_real_name": "站点单频网异常报警!",
                "user_mobile": "已消警",
                "user_role_name": "已消警",
                "operate": "2017/5/5 16:30:20",
                "data_order": 23
            }, {
                "state": "BJ3/OHM/LAN",
                "user_name": "2017/5/5 16:30:20",
                "user_real_name": "站点单频网异常报警!",
                "user_mobile": "已消警",
                "user_role_name": "已消警",
                "operate": "2017/5/5 16:30:20",
                "data_order": 23
            }, {
                "state": "BJ3/OHM/LAN",
                "user_name": "2017/5/5 16:30:20",
                "user_real_name": "站点单频网异常报警!",
                "user_mobile": "已消警",
                "user_role_name": "已消警",
                "operate": "2017/5/5 16:30:20",
                "data_order": 23
            }]

        });
        // sometimes footer render error.
        setTimeout(function() {
            $table.bootstrapTable("resetView");
        }, 200);
        $table.on("check.bs.table uncheck.bs.table " +
            "check-all.bs.table uncheck-all.bs.table",
            function() {
                $remove.prop("disabled", !$table.bootstrapTable("getSelections").length);
                // save your data, here just save the current page
                selections = getIdSelections();
                // push or splice the selections if you want to save all data selections
            });
        $table.on("expand-row.bs.table", function(e, index, row, $detail) {
            if (index % 2 == 1) {
                $detail.html("Loading from ajax request...");
                $.get("LICENSE", function(res) {
                    $detail.html(res.replace(/\n/g, "<br>"));
                });
            }
        });
        $table.on("all.bs.table", function(e, name, args) {
            // console.log(name, args);
        });
        $remove.click(function() {
            var ids = getIdSelections();
            $table.bootstrapTable("remove", {
                field: "id",
                values: ids
            });
            $remove.prop("disabled", true);
        });
        $(window).resize(function() {
            $table.bootstrapTable("resetView", {
                height: getHeight()
            });
        });
    }

    initTable();

});
