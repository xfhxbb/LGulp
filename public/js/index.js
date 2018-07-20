/**
 * 快速脚手架
 * 
 * version:1.3.1
 * 
 * author:lennyhuang
 * 
 * email:xfhxbb@yeah.net
 * 
 * Copyright 2018
 * 
 * Licensed under MIT
 * 
 * 最近修改于： 2018-7-20 15:17:9
 */
console.log("version:2018-7-20 15:17:9");
!function(){return function e(n,r,t){function o(l,i){if(!r[l]){if(!n[l]){var a="function"==typeof require&&require;if(!i&&a)return a(l,!0);if(u)return u(l,!0);var f=new Error("Cannot find module '"+l+"'");throw f.code="MODULE_NOT_FOUND",f}var c=r[l]={exports:{}};n[l][0].call(c.exports,function(e){var r=n[l][1][e];return o(r||e)},c,c.exports,e,n,r,t)}return r[l].exports}for(var u="function"==typeof require&&require,l=0;l<t.length;l++)o(t[l]);return o}}()({1:[function(e,n,r){"use strict";t(e("./module/global")),t(e("./module/param"));function t(e){return e&&e.__esModule?e:{default:e}}},{"./module/global":2,"./module/param":3}],2:[function(e,n,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t={env:"local"};console.log("Global",t),r.default=t},{}],3:[function(e,n,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=function(){function e(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,r,t){return r&&e(n.prototype,r),t&&e(n,t),n}}();var o=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}return t(e,null,[{key:"getAll",value:function(e){var n,r,t,o={};if(!(e.indexOf("?")>=0))return o;for(r=(e=e.split("?")[1]).split("&"),n=0;n<r.length;n++)o[(t=r[n].split("="))[0]]=t[1];return o}},{key:"getKey",value:function(e,n){n||(n=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var r=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(n);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null}},{key:"hasKey",value:function(e,n){return n||(n=window.location.href),e=e.replace(/[\[\]]/g,"\\$&"),new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").test(n)}}]),e}();r.default=o},{}]},{},[1]);