'use strict';
import Param from "./param";
//序列化对象
const serializeObject = (obj) => {
    if (typeof obj === 'string') return obj;
    var resultArray = [];
    var separator = '&';
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (Util.isArray(obj[prop])) {
                var toPush = [];
                for (var i = 0; i < obj[prop].length; i++) {
                    toPush.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop][i]));
                }
                if (toPush.length > 0) resultArray.push(toPush.join(separator));
            } else {
                resultArray.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
            }
        }

    }
    return resultArray.join(separator);
}
//转义字符串为字符实体
const escape = (s) => {
    if (typeof (s) !== 'string') {
        return s;
    }
    if (s.length == 0) {
        return "";
    }
    s = s.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\\n/g, "");
    s = s.replace(/\\r/g, "");
    console.log("escape return:", s);
    return s;
}
//n位随机数
const generateRandomId = (n) => {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let res = "";
    for (let i = 0; i < n; i++) {
        let id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
};
//前面带日期+n位随机数
const generateDateRandomId = (n) => {
    let currentTime = new Date();
    let year = currentTime.getFullYear();
    let month = currentTime.getMonth() + 1;
    let date = currentTime.getDate();
    if (month < 10) {
        month = '0' + month;
    }
    if (date < 10) {
        date = '0' + date;
    }
    return year.toString() + month.toString() + date.toString() + '_' + Util.generateRandomId(n);
};
//判断是否是数组
const isArray = (arr) => {
    if (Object.prototype.toString.apply(arr) === '[object Array]') return true;
    else return false;
}
const isFunction = (value) => {
    return Object.prototype.toString.call(value) == '[object Function]';
}
const isWindow = (value) => {
    return Object.prototype.toString.call(value) == '[object Window]';
}
const isDocumentType = (value) => {
    return Object.prototype.toString.call(value) == '[object DocumentType]';
}
const isDOM = (value) => {
    return value.nodeType;
}
//将复杂结构平铺成字符串
const renderContent = (msg) => {
    var arr = [];
    var text = '';
    if (msg instanceof Array) {
        for (var i = 0, len = msg.length; i < len; i++) {
            let item = msg[i];
            if (typeof item === "object") {
                arr.push(renderContent(item));
                text = "[" + arr.join(',') + "]";
            } else {
                arr.push("" + item);
                text = "[" + arr.join(',') + "]";
            }
        }
    }
    else if (msg&&msg instanceof Object) {
           if(msg===null){
            text = null;
           }
           else if (isFunction(msg)) {
                text = "function(){}";
            }
            else if (isDOM(msg)) {
                text = msg.toString();
            }
            else if (isWindow(msg)) {
                text = msg.toString();
            } else {
                for (let item in msg) {
                    if (typeof msg[item] === "object") {
                        arr.push((item + ": ") + renderContent(msg[item]));
                        text = "{" + arr.join(',') + "}";
                    } else {
                        arr.push(item + ": " + msg[item]);
                        text = "{" + arr.join(',') + "}";
                    }
                }
            }
    }
    else {
        text = msg;
    }
    return text;
}
const readme = () => {
    console.log('Util', {
    });
}
export default {
    escape: escape,//转义字符串为字符实体:(string),
    generateRandomId: generateRandomId,// n位随机数:(number),
    generateDateRandomId: generateDateRandomId,//前面带日期+n位随机数:(number),
    isArray: isArray,//判断是否是数组:(Array)
    renderContent: renderContent//将复杂结构体平铺成字符串
};