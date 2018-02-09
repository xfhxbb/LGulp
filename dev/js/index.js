/**
 * 快速脚手架
 * 
 * version:1.2.0
 * 
 * author:lennyhuang
 * 
 * email:xfhxbb@yeah.net
 * 
 * Copyright 2018
 * 
 * Licensed under MIT
 * 
 * 最近修改于： 2018-2-9 16:3:21
 */
console.log("version:2018-2-9 16:3:21");
(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

/**
 * 
 */

var _b = require('./module/b');

var _b2 = _interopRequireDefault(_b);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var str = _b2.default.init();
var version = "/* @echo version */";
document.querySelector('body').textContent = version + ' ' + str;

},{"./module/b":2}],2:[function(require,module,exports){
'use strict';

/**
 * 
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var version = "/* @echo version */";
var b = function b() {};
b.prototype = {
  init: function init() {
    var str = 'hello world';
    return str;
  }
};
var bb = new b();
exports.default = bb;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvbW9kdWxlL2IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQTs7OztBQUlBOzs7Ozs7QUFFQSxJQUFNLE1BQUksWUFBRSxJQUFGLEVBQVY7QUFDQSxJQUFNLFVBQVEscUJBQWQ7QUFDQSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0IsV0FBL0IsR0FBOEMsT0FBOUMsU0FBeUQsR0FBekQ7OztBQ1ZBOztBQUVBOzs7Ozs7O0FBR0EsSUFBTSxVQUFRLHFCQUFkO0FBQ0EsSUFBTSxJQUFFLFNBQUYsQ0FBRSxHQUFXLENBQUUsQ0FBckI7QUFDQSxFQUFFLFNBQUYsR0FBYztBQUNWLFFBQU0sZ0JBQVc7QUFDZCxRQUFJLE1BQUksYUFBUjtBQUNBLFdBQU8sR0FBUDtBQUNGO0FBSlMsQ0FBZDtBQU1BLElBQUksS0FBRyxJQUFJLENBQUosRUFBUDtrQkFDZSxFIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogXHJcbiAqL1xyXG5cclxuaW1wb3J0IGIgZnJvbSAnLi9tb2R1bGUvYic7XHJcblxyXG5jb25zdCBzdHI9Yi5pbml0KCk7XHJcbmNvbnN0IHZlcnNpb249XCIvKiBAZWNobyB2ZXJzaW9uICovXCI7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS50ZXh0Q29udGVudD1gJHt2ZXJzaW9ufSAke3N0cn1gOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBcclxuICovXHJcbmNvbnN0IHZlcnNpb249XCIvKiBAZWNobyB2ZXJzaW9uICovXCI7XHJcbmNvbnN0IGI9ZnVuY3Rpb24oKSB7fVxyXG5iLnByb3RvdHlwZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgbGV0IHN0cj0naGVsbG8gd29ybGQnO1xyXG4gICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxufTtcclxudmFyIGJiPW5ldyBiKCk7XHJcbmV4cG9ydCBkZWZhdWx0IGJiOyJdfQ==
