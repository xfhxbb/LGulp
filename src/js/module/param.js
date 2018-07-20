'use strict';

/**
 * 地址相关
 */
class Param {
    //得到所有参数
    static getAll(url) {
        var query = {},
            i, params, param;
        if (url.indexOf('?') >= 0) url = url.split('?')[1];
        else return query;
        params = url.split('&');
        for (i = 0; i < params.length; i++) {
            param = params[i].split('=');
            query[param[0]] = param[1];
        }
        return query;
    }
    //得到某个参数的值
    static getKey(key, url) {
        if (!url) url = window.location.href;
        key = key.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    //有某个参数
    static hasKey(key, url) {
        if (!url) url = window.location.href;
        key = key.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)'),
            results = regex.test(url);
        return results;
    }
} 
export default Param;