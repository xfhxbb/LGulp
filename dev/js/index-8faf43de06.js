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
 * 最近修改于： 2018-6-21 15:38:28
 */
console.log("version:2018-6-21 15:38:28");
(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

/**
 * 
 */

var _b = require('./module/b');

var _b2 = _interopRequireDefault(_b);

var _utils = require('./module/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var str = _b2.default.init();
document.querySelector('body').textContent = 'test';
console.log("================");

},{"./module/b":2,"./module/utils":3}],2:[function(require,module,exports){
'use strict';

/**
 * 
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var b = function b() {};
b.prototype = {
  init: function init() {
    var str = 'hello world';
    return str;
  }
};
var bb = new b();
exports.default = bb;

},{"./utils":3}],3:[function(require,module,exports){
'use strict';

/**
 * 
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "init",
    value: function init(v) {
      console.log("module Utils init " + v);
    }
  }]);

  return Utils;
}();

Utils.init("201806211117");
exports.default = Utils;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvbW9kdWxlL2IuanMiLCJzcmMvanMvbW9kdWxlL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUE7Ozs7QUFJQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLE1BQUksWUFBRSxJQUFGLEVBQVY7QUFDQSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0IsV0FBL0I7QUFDQSxRQUFRLEdBQVIsQ0FBWSxrQkFBWjs7O0FDWEE7O0FBRUE7Ozs7Ozs7O0FBR0E7Ozs7OztBQUNBLElBQU0sSUFBRSxTQUFGLENBQUUsR0FBVyxDQUFFLENBQXJCO0FBQ0EsRUFBRSxTQUFGLEdBQWM7QUFDVixRQUFNLGdCQUFXO0FBQ2QsUUFBSSxNQUFJLGFBQVI7QUFDQSxXQUFPLEdBQVA7QUFDRjtBQUpTLENBQWQ7QUFNQSxJQUFJLEtBQUcsSUFBSSxDQUFKLEVBQVA7a0JBQ2UsRTs7O0FDZGY7O0FBRUE7Ozs7Ozs7Ozs7OztJQUdNLEs7Ozs7Ozs7eUJBQ1UsQyxFQUFHO0FBQ1gsY0FBUSxHQUFSLHdCQUFpQyxDQUFqQztBQUNGOzs7Ozs7QUFFTixNQUFNLElBQU4sQ0FBVyxjQUFYO2tCQUNlLEsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBcbiAqL1xuXG5pbXBvcnQgYiBmcm9tICcuL21vZHVsZS9iJzsgXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9tb2R1bGUvdXRpbHMnO1xuXG5jb25zdCBzdHI9Yi5pbml0KCk7IFxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnRleHRDb250ZW50PWB0ZXN0YDtcbmNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PVwiKTsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogXG4gKi9cbmltcG9ydCBVdGlscyBmcm9tICcuL3V0aWxzJztcbmNvbnN0IGI9ZnVuY3Rpb24oKSB7fVxuYi5wcm90b3R5cGUgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgbGV0IHN0cj0naGVsbG8gd29ybGQnO1xuICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufTtcbnZhciBiYj1uZXcgYigpO1xuZXhwb3J0IGRlZmF1bHQgYmI7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIFxyXG4gKi9cclxuY2xhc3MgVXRpbHMge1xyXG4gICAgc3RhdGljIGluaXQodikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBtb2R1bGUgVXRpbHMgaW5pdCAke3Z9YCk7XHJcbiAgICAgfVxyXG59IFxyXG5VdGlscy5pbml0KFwiMjAxODA2MjExMTE3XCIpO1xyXG5leHBvcnQgZGVmYXVsdCBVdGlsczsiXX0=
