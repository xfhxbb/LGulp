(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

/**
 * 
 */

var _global = require('./module/global');

var _global2 = _interopRequireDefault(_global);

var _param = require('./module/param');

var _param2 = _interopRequireDefault(_param);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./module/global":2,"./module/param":3}],2:[function(require,module,exports){
'use strict';
/**
 * 全局变量
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Global = {
  env: "local"
};
console.log('Global', Global);
exports.default = Global;

},{}],3:[function(require,module,exports){
'use strict';

/**
 * 地址相关
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Param = function () {
    function Param() {
        _classCallCheck(this, Param);
    }

    _createClass(Param, null, [{
        key: 'getAll',

        //得到所有参数
        value: function getAll(url) {
            var query = {},
                i,
                params,
                param;
            if (url.indexOf('?') >= 0) url = url.split('?')[1];else return query;
            params = url.split('&');
            for (i = 0; i < params.length; i++) {
                param = params[i].split('=');
                query[param[0]] = param[1];
            }
            return query;
        }
        //得到某个参数的值

    }, {
        key: 'getKey',
        value: function getKey(key, url) {
            if (!url) url = window.location.href;
            key = key.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }
        //有某个参数

    }, {
        key: 'hasKey',
        value: function hasKey(key, url) {
            if (!url) url = window.location.href;
            key = key.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)'),
                results = regex.test(url);
            return results;
        }
    }]);

    return Param;
}();

exports.default = Param;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvbW9kdWxlL2dsb2JhbC5qcyIsInNyYy9qcy9tb2R1bGUvcGFyYW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQTs7OztBQUlBOzs7O0FBQ0E7Ozs7Ozs7QUNQQTtBQUNBOzs7Ozs7O0FBR0EsSUFBSSxTQUFPO0FBQ1AsT0FBSTtBQURHLENBQVg7QUFHQSxRQUFRLEdBQVIsQ0FBWSxRQUFaLEVBQXFCLE1BQXJCO2tCQUNlLE07OztBQ1JmOztBQUVBOzs7Ozs7Ozs7Ozs7SUFHTSxLOzs7Ozs7OztBQUNGOytCQUNjLEcsRUFBSztBQUNmLGdCQUFJLFFBQVEsRUFBWjtBQUFBLGdCQUNJLENBREo7QUFBQSxnQkFDTyxNQURQO0FBQUEsZ0JBQ2UsS0FEZjtBQUVBLGdCQUFJLElBQUksT0FBSixDQUFZLEdBQVosS0FBb0IsQ0FBeEIsRUFBMkIsTUFBTSxJQUFJLEtBQUosQ0FBVSxHQUFWLEVBQWUsQ0FBZixDQUFOLENBQTNCLEtBQ0ssT0FBTyxLQUFQO0FBQ0wscUJBQVMsSUFBSSxLQUFKLENBQVUsR0FBVixDQUFUO0FBQ0EsaUJBQUssSUFBSSxDQUFULEVBQVksSUFBSSxPQUFPLE1BQXZCLEVBQStCLEdBQS9CLEVBQW9DO0FBQ2hDLHdCQUFRLE9BQU8sQ0FBUCxFQUFVLEtBQVYsQ0FBZ0IsR0FBaEIsQ0FBUjtBQUNBLHNCQUFNLE1BQU0sQ0FBTixDQUFOLElBQWtCLE1BQU0sQ0FBTixDQUFsQjtBQUNIO0FBQ0QsbUJBQU8sS0FBUDtBQUNIO0FBQ0Q7Ozs7K0JBQ2MsRyxFQUFLLEcsRUFBSztBQUNwQixnQkFBSSxDQUFDLEdBQUwsRUFBVSxNQUFNLE9BQU8sUUFBUCxDQUFnQixJQUF0QjtBQUNWLGtCQUFNLElBQUksT0FBSixDQUFZLFNBQVosRUFBdUIsTUFBdkIsQ0FBTjtBQUNBLGdCQUFJLFFBQVEsSUFBSSxNQUFKLENBQVcsU0FBUyxHQUFULEdBQWUsbUJBQTFCLENBQVo7QUFBQSxnQkFDSSxVQUFVLE1BQU0sSUFBTixDQUFXLEdBQVgsQ0FEZDtBQUVBLGdCQUFJLENBQUMsT0FBTCxFQUFjLE9BQU8sSUFBUDtBQUNkLGdCQUFJLENBQUMsUUFBUSxDQUFSLENBQUwsRUFBaUIsT0FBTyxFQUFQO0FBQ2pCLG1CQUFPLG1CQUFtQixRQUFRLENBQVIsRUFBVyxPQUFYLENBQW1CLEtBQW5CLEVBQTBCLEdBQTFCLENBQW5CLENBQVA7QUFDSDtBQUNEOzs7OytCQUNjLEcsRUFBSyxHLEVBQUs7QUFDcEIsZ0JBQUksQ0FBQyxHQUFMLEVBQVUsTUFBTSxPQUFPLFFBQVAsQ0FBZ0IsSUFBdEI7QUFDVixrQkFBTSxJQUFJLE9BQUosQ0FBWSxTQUFaLEVBQXVCLE1BQXZCLENBQU47QUFDQSxnQkFBSSxRQUFRLElBQUksTUFBSixDQUFXLFNBQVMsR0FBVCxHQUFlLG1CQUExQixDQUFaO0FBQUEsZ0JBQ0ksVUFBVSxNQUFNLElBQU4sQ0FBVyxHQUFYLENBRGQ7QUFFQSxtQkFBTyxPQUFQO0FBQ0g7Ozs7OztrQkFFVSxLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogXG4gKi9cblxuaW1wb3J0IEdsb2JhbCBmcm9tICcuL21vZHVsZS9nbG9iYWwnO1xuaW1wb3J0IFBhcmFtIGZyb20gJy4vbW9kdWxlL3BhcmFtJztcbi8vaW1wb3J0IGIgZnJvbSAnLi9tb2R1bGUvYic7IiwiJ3VzZSBzdHJpY3QnO1xyXG4vKipcclxuICog5YWo5bGA5Y+Y6YePXHJcbiAqL1xyXG5sZXQgR2xvYmFsPXtcclxuICAgIGVudjpcImxvY2FsXCJcclxufTtcclxuY29uc29sZS5sb2coJ0dsb2JhbCcsR2xvYmFsKTtcclxuZXhwb3J0IGRlZmF1bHQgR2xvYmFsOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiDlnLDlnYDnm7jlhbNcclxuICovXHJcbmNsYXNzIFBhcmFtIHtcclxuICAgIC8v5b6X5Yiw5omA5pyJ5Y+C5pWwXHJcbiAgICBzdGF0aWMgZ2V0QWxsKHVybCkge1xyXG4gICAgICAgIHZhciBxdWVyeSA9IHt9LFxyXG4gICAgICAgICAgICBpLCBwYXJhbXMsIHBhcmFtO1xyXG4gICAgICAgIGlmICh1cmwuaW5kZXhPZignPycpID49IDApIHVybCA9IHVybC5zcGxpdCgnPycpWzFdO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIHF1ZXJ5O1xyXG4gICAgICAgIHBhcmFtcyA9IHVybC5zcGxpdCgnJicpO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJhbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcGFyYW0gPSBwYXJhbXNbaV0uc3BsaXQoJz0nKTtcclxuICAgICAgICAgICAgcXVlcnlbcGFyYW1bMF1dID0gcGFyYW1bMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBxdWVyeTtcclxuICAgIH1cclxuICAgIC8v5b6X5Yiw5p+Q5Liq5Y+C5pWw55qE5YC8XHJcbiAgICBzdGF0aWMgZ2V0S2V5KGtleSwgdXJsKSB7XHJcbiAgICAgICAgaWYgKCF1cmwpIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG4gICAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9bXFxbXFxdXS9nLCAnXFxcXCQmJyk7XHJcbiAgICAgICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCgnWz8mXScgKyBrZXkgKyAnKD0oW14mI10qKXwmfCN8JCknKSxcclxuICAgICAgICAgICAgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcclxuICAgICAgICBpZiAoIXJlc3VsdHMpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xyXG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XHJcbiAgICB9XHJcbiAgICAvL+acieafkOS4quWPguaVsFxyXG4gICAgc3RhdGljIGhhc0tleShrZXksIHVybCkge1xyXG4gICAgICAgIGlmICghdXJsKSB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICAgICAgICBrZXkgPSBrZXkucmVwbGFjZSgvW1xcW1xcXV0vZywgJ1xcXFwkJicpO1xyXG4gICAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoJ1s/Jl0nICsga2V5ICsgJyg9KFteJiNdKil8JnwjfCQpJyksXHJcbiAgICAgICAgICAgIHJlc3VsdHMgPSByZWdleC50ZXN0KHVybCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICB9XHJcbn0gXHJcbmV4cG9ydCBkZWZhdWx0IFBhcmFtOyJdfQ==
