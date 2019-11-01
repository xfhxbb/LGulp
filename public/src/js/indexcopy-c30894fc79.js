/**
 * 快速脚手架
 * 
 * version:1.3.1
 * 
 * author:lennyhuang
 * 
 * email:xfhxbb@yeah.net
 * 
 * Copyright 2019
 * 
 * Licensed under MIT
 * 
 * 最近修改于： 2019-11-1 17:42:59
 */
console.log("version:2019-11-1 17:42:59");
!function u(l,i,a){function f(n,e){if(!i[n]){if(!l[n]){var r="function"==typeof require&&require;if(!e&&r)return r(n,!0);if(c)return c(n,!0);var t=new Error("Cannot find module '"+n+"'");throw t.code="MODULE_NOT_FOUND",t}var o=i[n]={exports:{}};l[n][0].call(o.exports,function(e){return f(l[n][1][e]||e)},o,o.exports,u,l,i,a)}return i[n].exports}for(var c="function"==typeof require&&require,e=0;e<a.length;e++)f(a[e]);return f}({1:[function(e,n,r){"use strict";t(e("./module/global")),t(e("./module/param"));function t(e){return e&&e.__esModule?e:{default:e}}},{"./module/global":2,"./module/param":3}],2:[function(e,n,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t={env:"local"};console.log("Global",t),r.default=t},{}],3:[function(e,n,r){"use strict";function t(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}Object.defineProperty(r,"__esModule",{value:!0});var o=(function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}(u,null,[{key:"getAll",value:function(e){var n,r,t,o={};if(!(0<=e.indexOf("?")))return o;for(r=(e=e.split("?")[1]).split("&"),n=0;n<r.length;n++)o[(t=r[n].split("="))[0]]=t[1];return o}},{key:"getKey",value:function(e,n){n=n||window.location.href,e=e.replace(/[\[\]]/g,"\\$&");var r=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(n);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null}},{key:"hasKey",value:function(e,n){return n=n||window.location.href,e=e.replace(/[\[\]]/g,"\\$&"),new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").test(n)}}]),u);function u(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,u)}r.default=o},{}]},{},[1]);