/**
 * 提出请求url公共部分
 */
function geturl(url) {
   url = 'http://123.56.238.189/api/' + url;
   // url = 'http://192.168.100.109/airmonitor/api/' + url;
    return url;
}
function getStationurl(url) {
   url = 'http://182.92.70.247/station_v2/api/' + url;
    // url = 'http://192.168.100.109/station/api/' + url;
    return url;
}

/**
 * 截取地址栏参数
 */
function getArgs() {
    var args = [];
    var qs = location.search.length > 0 ? location.search.substring(1) : '';
    var items = qs.split('&');
    var item = null,
        name = null,
        value = null;
    for (var i = 0; i < items.length; i++) {
        item = items[i].split('=');
        name = item[0];
        value = item[1]
        args[name] = value;
    }
    return args;
}

/**
 * 设置cookie
 */
function setCookie(name, value, expires, path, domain, secure) {
    var cookieName = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (expires instanceof Date) {
        cookieName += '; expires=' + expires;
    }
    if (path) {
        cookieName += '; path=' + path;
    }
    if (domain) {
        cookieName += '; domain=' + domain;
    }
    if (secure) {
        cookieName += '; secure';
    }
    document.cookie = cookieName;
}
/**
 * cookie有效期所用的方法
 */
function setCookieDate(time) {
    var date = null;
    if (typeof time == 'number' && time > 0) {
        date = new Date();
        date.setTime(time);
    } else {
        throw new Error('出错了');
    }
    return date;
}
/**
 * 获取cookie的值
 */
function getCookie(name) {
    var cookieName = encodeURIComponent(name) + '=';
    var cookieStart = document.cookie.indexOf(cookieName);
    var cookieValue = null;
    if (cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(';', cookieStart);
        if (cookieEnd == -1) {
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }
    return cookieValue;
}
/**
 *清除cookie
 */
function unsetCookie(name) {
    document.cookie = name + "= ; expires=" + new Date(0);
}

/**
 * 操作成功提示
 */
function success(msg,url) {
    window.swal({
        title: 'Good!',
        text: msg,
        type: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false
    },function() {
    	if (url){
    		location.href = url
    	}
    })
}

/**
 * 操作失败提示
 */
function failure(msg) {
    window.swal({
        title: 'OMG!',
        text: msg,
        type: 'error',
        allowOutsideClick: false,
        allowEscapeKey: false
    },function(){
        if (msg == 'user_token已过期' || msg == '无效user_token') {
            // deleteSession('user_name')
            // wsCache.delete('token');
            // location.href = "login.jsp";
        }
        if(msg == '无权访问!') {
        	location.href = "menu.jsp"
        }
    })
}
/**
 * 危险操作提示
 */
function danger(title, msg) {
    swal({
        title: title,
        text: msg,
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonText: "确定",
        confirmButtonColor: "#ec6c62"
    })
}
/**
 * 时间戳转换为时间
 * tiem 为时间戳
 * format 为显示时间的格式
 */
function format(time, format) {
    var dates = new Date(Number(time))
    var date = {
        "M+": dates.getMonth() + 1,
        "d+": dates.getDate(),
        "h+": dates.getHours(),
        "m+": dates.getMinutes(),
        "s+": dates.getSeconds(),
        "q+": Math.floor((dates.getMonth() + 3) / 3),
        "S+": dates.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (dates.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}
/**
 * 日期转时间戳
 */
function DateToUnix(string) {
    var f = string.split(' ', 2);
    var d = (f[0] ? f[0] : '').split('-', 3);
    var t = (f[1] ? f[1] : '').split(':', 3);
    return (new Date(
        parseInt(d[0], 10) || null,
        (parseInt(d[1], 10) || 1) - 1,
        parseInt(d[2], 10) || null,
        parseInt(t[0], 10) || null,
        parseInt(t[1], 10) || null,
        parseInt(t[2], 10) || null
        )).getTime() / 1000;
}
/**
 * ajax封装
 * url 发送请求的地址
 * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
 * async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
 *       注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
 * type 请求方式("POST" 或 "GET")， 默认为 "post"
 * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
 * successfn 成功回调函数
 * errorfn 失败回调函数
 */

jQuery.ax = function(url, data, type, successfn, errorfn, async, dataType) {
    async = (async == null || async == "" || typeof(async) == "undefined") ? "true" : async;
    type = (type == null || type == "" || typeof(type) == "undefined") ? "post" : type;
    dataType = (dataType == null || dataType == "" || typeof(dataType) == "undefined") ? "json" : dataType;
    data = (data == null || data == "" || typeof(data) == "undefined") ? { "date": new Date().getTime() } : data;
    $.ajax({
        headers: {
            user_token: '9d92b24f9b97d4398b8c15167cff6422'
        },
        type: type,
        async: async,
        data: data,
        url: url,
        // contentType:"application/json",
        dataType: dataType,
        success: function(d) {
            successfn(d);
        },
        error: function(e) {
            errorfn(e);
        }
    });
};
/**
 * 跳转到404页面或者提示
 * */
function error(status) {
    if (status == 404) {
        //        location.href = '404.jsp'
    } else {
        failure('请求出错啦，请重试！！！')
    }
}
/**
 * 设置sessionStorage
 * */
function setSeession(key, value) {
    sessionStorage.setItem(key, value);
}
/**
 * 获取sessionStorage
 * */
function getSeesion(key) {
    return sessionStorage.getItem(key)
}

/**
 * 删除sessionStorage
 * */
function deleteSession(key) {
    sessionStorage.removeItem(key)
}
