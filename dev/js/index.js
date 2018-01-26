/**
 * 快速脚手架
 * 
 * version:1.0
 * 
 * author:lennyhuang
 * 
 * email:xfhxbb@yeah.net
 * 
 * Copyright 2018
 * 
 * Licensed under MIT
 * 
 * 最近修改于： 2018-1-26 20:8:19
 */
console.log("version:2018-1-26 20:8:19");
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvbW9kdWxlL2IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQTs7OztBQUlBOzs7Ozs7QUFFQSxJQUFNLE1BQUksWUFBRSxJQUFGLEVBQVY7QUFDQSxJQUFNLFVBQVEscUJBQWQ7QUFDQSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0IsV0FBL0IsR0FBOEMsT0FBOUMsU0FBeUQsR0FBekQ7OztBQ1ZBOztBQUVBOzs7Ozs7O0FBR0EsSUFBTSxVQUFRLHFCQUFkO0FBQ0EsSUFBTSxJQUFFLFNBQUYsQ0FBRSxHQUFXLENBQUUsQ0FBckI7QUFDQSxFQUFFLFNBQUYsR0FBYztBQUNWLFFBQU0sZ0JBQVc7QUFDZCxRQUFJLE1BQUksYUFBUjtBQUNBLFdBQU8sR0FBUDtBQUNGO0FBSlMsQ0FBZDtBQU1BLElBQUksS0FBRyxJQUFJLENBQUosRUFBUDtrQkFDZSxFIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBcbiAqL1xuXG5pbXBvcnQgYiBmcm9tICcuL21vZHVsZS9iJztcblxuY29uc3Qgc3RyPWIuaW5pdCgpO1xuY29uc3QgdmVyc2lvbj1cIi8qIEBlY2hvIHZlcnNpb24gKi9cIjtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS50ZXh0Q29udGVudD1gJHt2ZXJzaW9ufSAke3N0cn1gOyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBcbiAqL1xuY29uc3QgdmVyc2lvbj1cIi8qIEBlY2hvIHZlcnNpb24gKi9cIjtcbmNvbnN0IGI9ZnVuY3Rpb24oKSB7fVxuYi5wcm90b3R5cGUgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgbGV0IHN0cj0naGVsbG8gd29ybGQnO1xuICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufTtcbnZhciBiYj1uZXcgYigpO1xuZXhwb3J0IGRlZmF1bHQgYmI7Il19
