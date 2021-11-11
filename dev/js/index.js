/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../src/js/module/global.js":
/*!**********************************!*\
  !*** ../src/js/module/global.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
          /* harmony export */
});

        /**
         * 全局变量
         */

        var Global = {
          env: "local"
        };
        console.log('Global', Global);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Global);

        /***/
}),

/***/ "../src/js/module/param.js":
/*!*********************************!*\
  !*** ../src/js/module/param.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
          /* harmony export */
});
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/esm/createClass.js");

        /**
         * 地址相关
         */




        var Param = /*#__PURE__*/function () {
          function Param() {
            (0, _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Param);
          }

          (0, _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Param, null, [{
            key: "getAll",
            value: //得到所有参数
              function getAll(url) {
                var query = {},
                  i,
                  params,
                  param;
                if (url.indexOf('?') >= 0) url = url.split('?')[1]; else return query;
                params = url.split('&');

                for (i = 0; i < params.length; i++) {
                  param = params[i].split('=');
                  query[param[0]] = param[1];
                }

                return query;
              } //得到某个参数的值

          }, {
            key: "getKey",
            value: function getKey(key, url) {
              if (!url) url = window.location.href;
              key = key.replace(/[\[\]]/g, '\\$&');
              var regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
              if (!results) return null;
              if (!results[2]) return '';
              return decodeURIComponent(results[2].replace(/\+/g, ' '));
            } //有某个参数

          }, {
            key: "hasKey",
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Param);

        /***/
}),

/***/ "../node_modules/ejs/ejs.js":
/*!**********************************!*\
  !*** ../node_modules/ejs/ejs.js ***!
  \**********************************/
/***/ ((module) => {

        (function (f) { if (true) { module.exports = f() } else { var g; } })(function () {
          var define, module, exports; return (function () { function r(e, n, t) { function o(i, f) { if (!n[i]) { if (!e[i]) { var c = undefined; if (!f && c) return require(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = undefined, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
            1: [function (require, module, exports) {
              /*
               * EJS Embedded JavaScript templates
               * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
               *
               * Licensed under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License.
               * You may obtain a copy of the License at
               *
               *         http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software
               * distributed under the License is distributed on an "AS IS" BASIS,
               * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
               * See the License for the specific language governing permissions and
               * limitations under the License.
               *
              */

              'use strict';

              /**
               * @file Embedded JavaScript templating engine. {@link http://ejs.co}
               * @author Matthew Eernisse <mde@fleegix.org>
               * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
               * @project EJS
               * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
               */

              /**
               * EJS internal functions.
               *
               * Technically this "module" lies in the same file as {@link module:ejs}, for
               * the sake of organization all the private functions re grouped into this
               * module.
               *
               * @module ejs-internal
               * @private
               */

              /**
               * Embedded JavaScript templating engine.
               *
               * @module ejs
               * @public
               */

              var fs = require('fs');
              var path = require('path');
              var utils = require('./utils');

              var scopeOptionWarned = false;
              /** @type {string} */
              var _VERSION_STRING = require('../package.json').version;
              var _DEFAULT_OPEN_DELIMITER = '<';
              var _DEFAULT_CLOSE_DELIMITER = '>';
              var _DEFAULT_DELIMITER = '%';
              var _DEFAULT_LOCALS_NAME = 'locals';
              var _NAME = 'ejs';
              var _REGEX_STRING = '(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)';
              var _OPTS_PASSABLE_WITH_DATA = ['delimiter', 'scope', 'context', 'debug', 'compileDebug',
                'client', '_with', 'rmWhitespace', 'strict', 'filename', 'async'];
              // We don't allow 'cache' option to be passed in the data obj for
              // the normal `render` call, but this is where Express 2 & 3 put it
              // so we make an exception for `renderFile`
              var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat('cache');
              var _BOM = /^\uFEFF/;

              /**
               * EJS template function cache. This can be a LRU object from lru-cache NPM
               * module. By default, it is {@link module:utils.cache}, a simple in-process
               * cache that grows continuously.
               *
               * @type {Cache}
               */

              exports.cache = utils.cache;

              /**
               * Custom file loader. Useful for template preprocessing or restricting access
               * to a certain part of the filesystem.
               *
               * @type {fileLoader}
               */

              exports.fileLoader = fs.readFileSync;

              /**
               * Name of the object containing the locals.
               *
               * This variable is overridden by {@link Options}`.localsName` if it is not
               * `undefined`.
               *
               * @type {String}
               * @public
               */

              exports.localsName = _DEFAULT_LOCALS_NAME;

              /**
               * Promise implementation -- defaults to the native implementation if available
               * This is mostly just for testability
               *
               * @type {PromiseConstructorLike}
               * @public
               */

              exports.promiseImpl = (new Function('return this;'))().Promise;

              /**
               * Get the path to the included file from the parent file path and the
               * specified path.
               *
               * @param {String}  name     specified path
               * @param {String}  filename parent file path
               * @param {Boolean} [isDir=false] whether the parent file path is a directory
               * @return {String}
               */
              exports.resolveInclude = function (name, filename, isDir) {
                var dirname = path.dirname;
                var extname = path.extname;
                var resolve = path.resolve;
                var includePath = resolve(isDir ? filename : dirname(filename), name);
                var ext = extname(name);
                if (!ext) {
                  includePath += '.ejs';
                }
                return includePath;
              };

              /**
               * Try to resolve file path on multiple directories
               *
               * @param  {String}        name  specified path
               * @param  {Array<String>} paths list of possible parent directory paths
               * @return {String}
               */
              function resolvePaths(name, paths) {
                var filePath;
                if (paths.some(function (v) {
                  filePath = exports.resolveInclude(name, v, true);
                  return fs.existsSync(filePath);
                })) {
                  return filePath;
                }
              }

              /**
               * Get the path to the included file by Options
               *
               * @param  {String}  path    specified path
               * @param  {Options} options compilation options
               * @return {String}
               */
              function getIncludePath(path, options) {
                var includePath;
                var filePath;
                var views = options.views;
                var match = /^[A-Za-z]+:\\|^\//.exec(path);

                // Abs path
                if (match && match.length) {
                  path = path.replace(/^\/*/, '');
                  if (Array.isArray(options.root)) {
                    includePath = resolvePaths(path, options.root);
                  } else {
                    includePath = exports.resolveInclude(path, options.root || '/', true);
                  }
                }
                // Relative paths
                else {
                  // Look relative to a passed filename first
                  if (options.filename) {
                    filePath = exports.resolveInclude(path, options.filename);
                    if (fs.existsSync(filePath)) {
                      includePath = filePath;
                    }
                  }
                  // Then look in any views directories
                  if (!includePath && Array.isArray(views)) {
                    includePath = resolvePaths(path, views);
                  }
                  if (!includePath && typeof options.includer !== 'function') {
                    throw new Error('Could not find the include file "' +
                      options.escapeFunction(path) + '"');
                  }
                }
                return includePath;
              }

              /**
               * Get the template from a string or a file, either compiled on-the-fly or
               * read from cache (if enabled), and cache the template if needed.
               *
               * If `template` is not set, the file specified in `options.filename` will be
               * read.
               *
               * If `options.cache` is true, this function reads the file from
               * `options.filename` so it must be set prior to calling this function.
               *
               * @memberof module:ejs-internal
               * @param {Options} options   compilation options
               * @param {String} [template] template source
               * @return {(TemplateFunction|ClientFunction)}
               * Depending on the value of `options.client`, either type might be returned.
               * @static
               */

              function handleCache(options, template) {
                var func;
                var filename = options.filename;
                var hasTemplate = arguments.length > 1;

                if (options.cache) {
                  if (!filename) {
                    throw new Error('cache option requires a filename');
                  }
                  func = exports.cache.get(filename);
                  if (func) {
                    return func;
                  }
                  if (!hasTemplate) {
                    template = fileLoader(filename).toString().replace(_BOM, '');
                  }
                }
                else if (!hasTemplate) {
                  // istanbul ignore if: should not happen at all
                  if (!filename) {
                    throw new Error('Internal EJS error: no file name or template '
                      + 'provided');
                  }
                  template = fileLoader(filename).toString().replace(_BOM, '');
                }
                func = exports.compile(template, options);
                if (options.cache) {
                  exports.cache.set(filename, func);
                }
                return func;
              }

              /**
               * Try calling handleCache with the given options and data and call the
               * callback with the result. If an error occurs, call the callback with
               * the error. Used by renderFile().
               *
               * @memberof module:ejs-internal
               * @param {Options} options    compilation options
               * @param {Object} data        template data
               * @param {RenderFileCallback} cb callback
               * @static
               */

              function tryHandleCache(options, data, cb) {
                var result;
                if (!cb) {
                  if (typeof exports.promiseImpl == 'function') {
                    return new exports.promiseImpl(function (resolve, reject) {
                      try {
                        result = handleCache(options)(data);
                        resolve(result);
                      }
                      catch (err) {
                        reject(err);
                      }
                    });
                  }
                  else {
                    throw new Error('Please provide a callback function');
                  }
                }
                else {
                  try {
                    result = handleCache(options)(data);
                  }
                  catch (err) {
                    return cb(err);
                  }

                  cb(null, result);
                }
              }

              /**
               * fileLoader is independent
               *
               * @param {String} filePath ejs file path.
               * @return {String} The contents of the specified file.
               * @static
               */

              function fileLoader(filePath) {
                return exports.fileLoader(filePath);
              }

              /**
               * Get the template function.
               *
               * If `options.cache` is `true`, then the template is cached.
               *
               * @memberof module:ejs-internal
               * @param {String}  path    path for the specified file
               * @param {Options} options compilation options
               * @return {(TemplateFunction|ClientFunction)}
               * Depending on the value of `options.client`, either type might be returned
               * @static
               */

              function includeFile(path, options) {
                var opts = utils.shallowCopy({}, options);
                opts.filename = getIncludePath(path, opts);
                if (typeof options.includer === 'function') {
                  var includerResult = options.includer(path, opts.filename);
                  if (includerResult) {
                    if (includerResult.filename) {
                      opts.filename = includerResult.filename;
                    }
                    if (includerResult.template) {
                      return handleCache(opts, includerResult.template);
                    }
                  }
                }
                return handleCache(opts);
              }

              /**
               * Re-throw the given `err` in context to the `str` of ejs, `filename`, and
               * `lineno`.
               *
               * @implements {RethrowCallback}
               * @memberof module:ejs-internal
               * @param {Error}  err      Error object
               * @param {String} str      EJS source
               * @param {String} flnm     file name of the EJS file
               * @param {Number} lineno   line number of the error
               * @param {EscapeCallback} esc
               * @static
               */

              function rethrow(err, str, flnm, lineno, esc) {
                var lines = str.split('\n');
                var start = Math.max(lineno - 3, 0);
                var end = Math.min(lines.length, lineno + 3);
                var filename = esc(flnm);
                // Error context
                var context = lines.slice(start, end).map(function (line, i) {
                  var curr = i + start + 1;
                  return (curr == lineno ? ' >> ' : '    ')
                    + curr
                    + '| '
                    + line;
                }).join('\n');

                // Alter exception message
                err.path = filename;
                err.message = (filename || 'ejs') + ':'
                  + lineno + '\n'
                  + context + '\n\n'
                  + err.message;

                throw err;
              }

              function stripSemi(str) {
                return str.replace(/;(\s*$)/, '$1');
              }

              /**
               * Compile the given `str` of ejs into a template function.
               *
               * @param {String}  template EJS template
               *
               * @param {Options} [opts] compilation options
               *
               * @return {(TemplateFunction|ClientFunction)}
               * Depending on the value of `opts.client`, either type might be returned.
               * Note that the return type of the function also depends on the value of `opts.async`.
               * @public
               */

              exports.compile = function compile(template, opts) {
                var templ;

                // v1 compat
                // 'scope' is 'context'
                // FIXME: Remove this in a future version
                if (opts && opts.scope) {
                  if (!scopeOptionWarned) {
                    console.warn('`scope` option is deprecated and will be removed in EJS 3');
                    scopeOptionWarned = true;
                  }
                  if (!opts.context) {
                    opts.context = opts.scope;
                  }
                  delete opts.scope;
                }
                templ = new Template(template, opts);
                return templ.compile();
              };

              /**
               * Render the given `template` of ejs.
               *
               * If you would like to include options but not data, you need to explicitly
               * call this function with `data` being an empty object or `null`.
               *
               * @param {String}   template EJS template
               * @param {Object}  [data={}] template data
               * @param {Options} [opts={}] compilation and rendering options
               * @return {(String|Promise<String>)}
               * Return value type depends on `opts.async`.
               * @public
               */

              exports.render = function (template, d, o) {
                var data = d || {};
                var opts = o || {};

                // No options object -- if there are optiony names
                // in the data, copy them to options
                if (arguments.length == 2) {
                  utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
                }

                return handleCache(opts, template)(data);
              };

              /**
               * Render an EJS file at the given `path` and callback `cb(err, str)`.
               *
               * If you would like to include options but not data, you need to explicitly
               * call this function with `data` being an empty object or `null`.
               *
               * @param {String}             path     path to the EJS file
               * @param {Object}            [data={}] template data
               * @param {Options}           [opts={}] compilation and rendering options
               * @param {RenderFileCallback} cb callback
               * @public
               */

              exports.renderFile = function () {
                var args = Array.prototype.slice.call(arguments);
                var filename = args.shift();
                var cb;
                var opts = { filename: filename };
                var data;
                var viewOpts;

                // Do we have a callback?
                if (typeof arguments[arguments.length - 1] == 'function') {
                  cb = args.pop();
                }
                // Do we have data/opts?
                if (args.length) {
                  // Should always have data obj
                  data = args.shift();
                  // Normal passed opts (data obj + opts obj)
                  if (args.length) {
                    // Use shallowCopy so we don't pollute passed in opts obj with new vals
                    utils.shallowCopy(opts, args.pop());
                  }
                  // Special casing for Express (settings + opts-in-data)
                  else {
                    // Express 3 and 4
                    if (data.settings) {
                      // Pull a few things from known locations
                      if (data.settings.views) {
                        opts.views = data.settings.views;
                      }
                      if (data.settings['view cache']) {
                        opts.cache = true;
                      }
                      // Undocumented after Express 2, but still usable, esp. for
                      // items that are unsafe to be passed along with data, like `root`
                      viewOpts = data.settings['view options'];
                      if (viewOpts) {
                        utils.shallowCopy(opts, viewOpts);
                      }
                    }
                    // Express 2 and lower, values set in app.locals, or people who just
                    // want to pass options in their data. NOTE: These values will override
                    // anything previously set in settings  or settings['view options']
                    utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
                  }
                  opts.filename = filename;
                }
                else {
                  data = {};
                }

                return tryHandleCache(opts, data, cb);
              };

              /**
               * Clear intermediate JavaScript cache. Calls {@link Cache#reset}.
               * @public
               */

              /**
               * EJS template class
               * @public
               */
              exports.Template = Template;

              exports.clearCache = function () {
                exports.cache.reset();
              };

              function Template(text, opts) {
                opts = opts || {};
                var options = {};
                this.templateText = text;
                /** @type {string | null} */
                this.mode = null;
                this.truncate = false;
                this.currentLine = 1;
                this.source = '';
                options.client = opts.client || false;
                options.escapeFunction = opts.escape || opts.escapeFunction || utils.escapeXML;
                options.compileDebug = opts.compileDebug !== false;
                options.debug = !!opts.debug;
                options.filename = opts.filename;
                options.openDelimiter = opts.openDelimiter || exports.openDelimiter || _DEFAULT_OPEN_DELIMITER;
                options.closeDelimiter = opts.closeDelimiter || exports.closeDelimiter || _DEFAULT_CLOSE_DELIMITER;
                options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
                options.strict = opts.strict || false;
                options.context = opts.context;
                options.cache = opts.cache || false;
                options.rmWhitespace = opts.rmWhitespace;
                options.root = opts.root;
                options.includer = opts.includer;
                options.outputFunctionName = opts.outputFunctionName;
                options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
                options.views = opts.views;
                options.async = opts.async;
                options.destructuredLocals = opts.destructuredLocals;
                options.legacyInclude = typeof opts.legacyInclude != 'undefined' ? !!opts.legacyInclude : true;

                if (options.strict) {
                  options._with = false;
                }
                else {
                  options._with = typeof opts._with != 'undefined' ? opts._with : true;
                }

                this.opts = options;

                this.regex = this.createRegex();
              }

              Template.modes = {
                EVAL: 'eval',
                ESCAPED: 'escaped',
                RAW: 'raw',
                COMMENT: 'comment',
                LITERAL: 'literal'
              };

              Template.prototype = {
                createRegex: function () {
                  var str = _REGEX_STRING;
                  var delim = utils.escapeRegExpChars(this.opts.delimiter);
                  var open = utils.escapeRegExpChars(this.opts.openDelimiter);
                  var close = utils.escapeRegExpChars(this.opts.closeDelimiter);
                  str = str.replace(/%/g, delim)
                    .replace(/</g, open)
                    .replace(/>/g, close);
                  return new RegExp(str);
                },

                compile: function () {
                  /** @type {string} */
                  var src;
                  /** @type {ClientFunction} */
                  var fn;
                  var opts = this.opts;
                  var prepended = '';
                  var appended = '';
                  /** @type {EscapeCallback} */
                  var escapeFn = opts.escapeFunction;
                  /** @type {FunctionConstructor} */
                  var ctor;
                  /** @type {string} */
                  var sanitizedFilename = opts.filename ? JSON.stringify(opts.filename) : 'undefined';

                  if (!this.source) {
                    this.generateSource();
                    prepended +=
                      '  var __output = "";\n' +
                      '  function __append(s) { if (s !== undefined && s !== null) __output += s }\n';
                    if (opts.outputFunctionName) {
                      prepended += '  var ' + opts.outputFunctionName + ' = __append;' + '\n';
                    }
                    if (opts.destructuredLocals && opts.destructuredLocals.length) {
                      var destructuring = '  var __locals = (' + opts.localsName + ' || {}),\n';
                      for (var i = 0; i < opts.destructuredLocals.length; i++) {
                        var name = opts.destructuredLocals[i];
                        if (i > 0) {
                          destructuring += ',\n  ';
                        }
                        destructuring += name + ' = __locals.' + name;
                      }
                      prepended += destructuring + ';\n';
                    }
                    if (opts._with !== false) {
                      prepended += '  with (' + opts.localsName + ' || {}) {' + '\n';
                      appended += '  }' + '\n';
                    }
                    appended += '  return __output;' + '\n';
                    this.source = prepended + this.source + appended;
                  }

                  if (opts.compileDebug) {
                    src = 'var __line = 1' + '\n'
                      + '  , __lines = ' + JSON.stringify(this.templateText) + '\n'
                      + '  , __filename = ' + sanitizedFilename + ';' + '\n'
                      + 'try {' + '\n'
                      + this.source
                      + '} catch (e) {' + '\n'
                      + '  rethrow(e, __lines, __filename, __line, escapeFn);' + '\n'
                      + '}' + '\n';
                  }
                  else {
                    src = this.source;
                  }

                  if (opts.client) {
                    src = 'escapeFn = escapeFn || ' + escapeFn.toString() + ';' + '\n' + src;
                    if (opts.compileDebug) {
                      src = 'rethrow = rethrow || ' + rethrow.toString() + ';' + '\n' + src;
                    }
                  }

                  if (opts.strict) {
                    src = '"use strict";\n' + src;
                  }
                  if (opts.debug) {
                    console.log(src);
                  }
                  if (opts.compileDebug && opts.filename) {
                    src = src + '\n'
                      + '//# sourceURL=' + sanitizedFilename + '\n';
                  }

                  try {
                    if (opts.async) {
                      // Have to use generated function for this, since in envs without support,
                      // it breaks in parsing
                      try {
                        ctor = (new Function('return (async function(){}).constructor;'))();
                      }
                      catch (e) {
                        if (e instanceof SyntaxError) {
                          throw new Error('This environment does not support async/await');
                        }
                        else {
                          throw e;
                        }
                      }
                    }
                    else {
                      ctor = Function;
                    }
                    fn = new ctor(opts.localsName + ', escapeFn, include, rethrow', src);
                  }
                  catch (e) {
                    // istanbul ignore else
                    if (e instanceof SyntaxError) {
                      if (opts.filename) {
                        e.message += ' in ' + opts.filename;
                      }
                      e.message += ' while compiling ejs\n\n';
                      e.message += 'If the above error is not helpful, you may want to try EJS-Lint:\n';
                      e.message += 'https://github.com/RyanZim/EJS-Lint';
                      if (!opts.async) {
                        e.message += '\n';
                        e.message += 'Or, if you meant to create an async function, pass `async: true` as an option.';
                      }
                    }
                    throw e;
                  }

                  // Return a callable function which will execute the function
                  // created by the source-code, with the passed data as locals
                  // Adds a local `include` function which allows full recursive include
                  var returnedFn = opts.client ? fn : function anonymous(data) {
                    var include = function (path, includeData) {
                      var d = utils.shallowCopy({}, data);
                      if (includeData) {
                        d = utils.shallowCopy(d, includeData);
                      }
                      return includeFile(path, opts)(d);
                    };
                    return fn.apply(opts.context, [data || {}, escapeFn, include, rethrow]);
                  };
                  if (opts.filename && typeof Object.defineProperty === 'function') {
                    var filename = opts.filename;
                    var basename = path.basename(filename, path.extname(filename));
                    try {
                      Object.defineProperty(returnedFn, 'name', {
                        value: basename,
                        writable: false,
                        enumerable: false,
                        configurable: true
                      });
                    } catch (e) {/* ignore */ }
                  }
                  return returnedFn;
                },

                generateSource: function () {
                  var opts = this.opts;

                  if (opts.rmWhitespace) {
                    // Have to use two separate replace here as `^` and `$` operators don't
                    // work well with `\r` and empty lines don't work well with the `m` flag.
                    this.templateText =
                      this.templateText.replace(/[\r\n]+/g, '\n').replace(/^\s+|\s+$/gm, '');
                  }

                  // Slurp spaces and tabs before <%_ and after _%>
                  this.templateText =
                    this.templateText.replace(/[ \t]*<%_/gm, '<%_').replace(/_%>[ \t]*/gm, '_%>');

                  var self = this;
                  var matches = this.parseTemplateText();
                  var d = this.opts.delimiter;
                  var o = this.opts.openDelimiter;
                  var c = this.opts.closeDelimiter;

                  if (matches && matches.length) {
                    matches.forEach(function (line, index) {
                      var closing;
                      // If this is an opening tag, check for closing tags
                      // FIXME: May end up with some false positives here
                      // Better to store modes as k/v with openDelimiter + delimiter as key
                      // Then this can simply check against the map
                      if (line.indexOf(o + d) === 0        // If it is a tag
                        && line.indexOf(o + d + d) !== 0) { // and is not escaped
                        closing = matches[index + 2];
                        if (!(closing == d + c || closing == '-' + d + c || closing == '_' + d + c)) {
                          throw new Error('Could not find matching close tag for "' + line + '".');
                        }
                      }
                      self.scanLine(line);
                    });
                  }

                },

                parseTemplateText: function () {
                  var str = this.templateText;
                  var pat = this.regex;
                  var result = pat.exec(str);
                  var arr = [];
                  var firstPos;

                  while (result) {
                    firstPos = result.index;

                    if (firstPos !== 0) {
                      arr.push(str.substring(0, firstPos));
                      str = str.slice(firstPos);
                    }

                    arr.push(result[0]);
                    str = str.slice(result[0].length);
                    result = pat.exec(str);
                  }

                  if (str) {
                    arr.push(str);
                  }

                  return arr;
                },

                _addOutput: function (line) {
                  if (this.truncate) {
                    // Only replace single leading linebreak in the line after
                    // -%> tag -- this is the single, trailing linebreak
                    // after the tag that the truncation mode replaces
                    // Handle Win / Unix / old Mac linebreaks -- do the \r\n
                    // combo first in the regex-or
                    line = line.replace(/^(?:\r\n|\r|\n)/, '');
                    this.truncate = false;
                  }
                  if (!line) {
                    return line;
                  }

                  // Preserve literal slashes
                  line = line.replace(/\\/g, '\\\\');

                  // Convert linebreaks
                  line = line.replace(/\n/g, '\\n');
                  line = line.replace(/\r/g, '\\r');

                  // Escape double-quotes
                  // - this will be the delimiter during execution
                  line = line.replace(/"/g, '\\"');
                  this.source += '    ; __append("' + line + '")' + '\n';
                },

                scanLine: function (line) {
                  var self = this;
                  var d = this.opts.delimiter;
                  var o = this.opts.openDelimiter;
                  var c = this.opts.closeDelimiter;
                  var newLineCount = 0;

                  newLineCount = (line.split('\n').length - 1);

                  switch (line) {
                    case o + d:
                    case o + d + '_':
                      this.mode = Template.modes.EVAL;
                      break;
                    case o + d + '=':
                      this.mode = Template.modes.ESCAPED;
                      break;
                    case o + d + '-':
                      this.mode = Template.modes.RAW;
                      break;
                    case o + d + '#':
                      this.mode = Template.modes.COMMENT;
                      break;
                    case o + d + d:
                      this.mode = Template.modes.LITERAL;
                      this.source += '    ; __append("' + line.replace(o + d + d, o + d) + '")' + '\n';
                      break;
                    case d + d + c:
                      this.mode = Template.modes.LITERAL;
                      this.source += '    ; __append("' + line.replace(d + d + c, d + c) + '")' + '\n';
                      break;
                    case d + c:
                    case '-' + d + c:
                    case '_' + d + c:
                      if (this.mode == Template.modes.LITERAL) {
                        this._addOutput(line);
                      }

                      this.mode = null;
                      this.truncate = line.indexOf('-') === 0 || line.indexOf('_') === 0;
                      break;
                    default:
                      // In script mode, depends on type of tag
                      if (this.mode) {
                        // If '//' is found without a line break, add a line break.
                        switch (this.mode) {
                          case Template.modes.EVAL:
                          case Template.modes.ESCAPED:
                          case Template.modes.RAW:
                            if (line.lastIndexOf('//') > line.lastIndexOf('\n')) {
                              line += '\n';
                            }
                        }
                        switch (this.mode) {
                          // Just executing code
                          case Template.modes.EVAL:
                            this.source += '    ; ' + line + '\n';
                            break;
                          // Exec, esc, and output
                          case Template.modes.ESCAPED:
                            this.source += '    ; __append(escapeFn(' + stripSemi(line) + '))' + '\n';
                            break;
                          // Exec and output
                          case Template.modes.RAW:
                            this.source += '    ; __append(' + stripSemi(line) + ')' + '\n';
                            break;
                          case Template.modes.COMMENT:
                            // Do nothing
                            break;
                          // Literal <%% mode, append as raw output
                          case Template.modes.LITERAL:
                            this._addOutput(line);
                            break;
                        }
                      }
                      // In string mode, just add the output
                      else {
                        this._addOutput(line);
                      }
                  }

                  if (self.opts.compileDebug && newLineCount) {
                    this.currentLine += newLineCount;
                    this.source += '    ; __line = ' + this.currentLine + '\n';
                  }
                }
              };

              /**
               * Escape characters reserved in XML.
               *
               * This is simply an export of {@link module:utils.escapeXML}.
               *
               * If `markup` is `undefined` or `null`, the empty string is returned.
               *
               * @param {String} markup Input string
               * @return {String} Escaped string
               * @public
               * @func
               * */
              exports.escapeXML = utils.escapeXML;

              /**
               * Express.js support.
               *
               * This is an alias for {@link module:ejs.renderFile}, in order to support
               * Express.js out-of-the-box.
               *
               * @func
               */

              exports.__express = exports.renderFile;

              /**
               * Version of EJS.
               *
               * @readonly
               * @type {String}
               * @public
               */

              exports.VERSION = _VERSION_STRING;

              /**
               * Name for detection of EJS.
               *
               * @readonly
               * @type {String}
               * @public
               */

              exports.name = _NAME;

              /* istanbul ignore if */
              if (typeof window != 'undefined') {
                window.ejs = exports;
              }

            }, { "../package.json": 6, "./utils": 2, "fs": 3, "path": 4 }], 2: [function (require, module, exports) {
              /*
               * EJS Embedded JavaScript templates
               * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
               *
               * Licensed under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License.
               * You may obtain a copy of the License at
               *
               *         http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software
               * distributed under the License is distributed on an "AS IS" BASIS,
               * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
               * See the License for the specific language governing permissions and
               * limitations under the License.
               *
              */

              /**
               * Private utility functions
               * @module utils
               * @private
               */

              'use strict';

              var regExpChars = /[|\\{}()[\]^$+*?.]/g;

              /**
               * Escape characters reserved in regular expressions.
               *
               * If `string` is `undefined` or `null`, the empty string is returned.
               *
               * @param {String} string Input string
               * @return {String} Escaped string
               * @static
               * @private
               */
              exports.escapeRegExpChars = function (string) {
                // istanbul ignore if
                if (!string) {
                  return '';
                }
                return String(string).replace(regExpChars, '\\$&');
              };

              var _ENCODE_HTML_RULES = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&#34;',
                "'": '&#39;'
              };
              var _MATCH_HTML = /[&<>'"]/g;

              function encode_char(c) {
                return _ENCODE_HTML_RULES[c] || c;
              }

              /**
               * Stringified version of constants used by {@link module:utils.escapeXML}.
               *
               * It is used in the process of generating {@link ClientFunction}s.
               *
               * @readonly
               * @type {String}
               */

              var escapeFuncStr =
                'var _ENCODE_HTML_RULES = {\n'
                + '      "&": "&amp;"\n'
                + '    , "<": "&lt;"\n'
                + '    , ">": "&gt;"\n'
                + '    , \'"\': "&#34;"\n'
                + '    , "\'": "&#39;"\n'
                + '    }\n'
                + '  , _MATCH_HTML = /[&<>\'"]/g;\n'
                + 'function encode_char(c) {\n'
                + '  return _ENCODE_HTML_RULES[c] || c;\n'
                + '};\n';

              /**
               * Escape characters reserved in XML.
               *
               * If `markup` is `undefined` or `null`, the empty string is returned.
               *
               * @implements {EscapeCallback}
               * @param {String} markup Input string
               * @return {String} Escaped string
               * @static
               * @private
               */

              exports.escapeXML = function (markup) {
                return markup == undefined
                  ? ''
                  : String(markup)
                    .replace(_MATCH_HTML, encode_char);
              };
              exports.escapeXML.toString = function () {
                return Function.prototype.toString.call(this) + ';\n' + escapeFuncStr;
              };

              /**
               * Naive copy of properties from one object to another.
               * Does not recurse into non-scalar properties
               * Does not check to see if the property has a value before copying
               *
               * @param  {Object} to   Destination object
               * @param  {Object} from Source object
               * @return {Object}      Destination object
               * @static
               * @private
               */
              exports.shallowCopy = function (to, from) {
                from = from || {};
                for (var p in from) {
                  to[p] = from[p];
                }
                return to;
              };

              /**
               * Naive copy of a list of key names, from one object to another.
               * Only copies property if it is actually defined
               * Does not recurse into non-scalar properties
               *
               * @param  {Object} to   Destination object
               * @param  {Object} from Source object
               * @param  {Array} list List of properties to copy
               * @return {Object}      Destination object
               * @static
               * @private
               */
              exports.shallowCopyFromList = function (to, from, list) {
                for (var i = 0; i < list.length; i++) {
                  var p = list[i];
                  if (typeof from[p] != 'undefined') {
                    to[p] = from[p];
                  }
                }
                return to;
              };

              /**
               * Simple in-process cache implementation. Does not implement limits of any
               * sort.
               *
               * @implements {Cache}
               * @static
               * @private
               */
              exports.cache = {
                _data: {},
                set: function (key, val) {
                  this._data[key] = val;
                },
                get: function (key) {
                  return this._data[key];
                },
                remove: function (key) {
                  delete this._data[key];
                },
                reset: function () {
                  this._data = {};
                }
              };

              /**
               * Transforms hyphen case variable into camel case.
               *
               * @param {String} string Hyphen case string
               * @return {String} Camel case string
               * @static
               * @private
               */
              exports.hyphenToCamel = function (str) {
                return str.replace(/-[a-z]/g, function (match) { return match[1].toUpperCase(); });
              };

            }, {}], 3: [function (require, module, exports) {

            }, {}], 4: [function (require, module, exports) {
              (function (process) {
                // .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
                // backported and transplited with Babel, with backwards-compat fixes

                // Copyright Joyent, Inc. and other Node contributors.
                //
                // Permission is hereby granted, free of charge, to any person obtaining a
                // copy of this software and associated documentation files (the
                // "Software"), to deal in the Software without restriction, including
                // without limitation the rights to use, copy, modify, merge, publish,
                // distribute, sublicense, and/or sell copies of the Software, and to permit
                // persons to whom the Software is furnished to do so, subject to the
                // following conditions:
                //
                // The above copyright notice and this permission notice shall be included
                // in all copies or substantial portions of the Software.
                //
                // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                // USE OR OTHER DEALINGS IN THE SOFTWARE.

                // resolves . and .. elements in a path array with directory names there
                // must be no slashes, empty elements, or device names (c:\) in the array
                // (so also no leading and trailing slashes - it does not distinguish
                // relative and absolute paths)
                function normalizeArray(parts, allowAboveRoot) {
                  // if the path tries to go above the root, `up` ends up > 0
                  var up = 0;
                  for (var i = parts.length - 1; i >= 0; i--) {
                    var last = parts[i];
                    if (last === '.') {
                      parts.splice(i, 1);
                    } else if (last === '..') {
                      parts.splice(i, 1);
                      up++;
                    } else if (up) {
                      parts.splice(i, 1);
                      up--;
                    }
                  }

                  // if the path is allowed to go above the root, restore leading ..s
                  if (allowAboveRoot) {
                    for (; up--; up) {
                      parts.unshift('..');
                    }
                  }

                  return parts;
                }

                // path.resolve([from ...], to)
                // posix version
                exports.resolve = function () {
                  var resolvedPath = '',
                    resolvedAbsolute = false;

                  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                    var path = (i >= 0) ? arguments[i] : process.cwd();

                    // Skip empty and invalid entries
                    if (typeof path !== 'string') {
                      throw new TypeError('Arguments to path.resolve must be strings');
                    } else if (!path) {
                      continue;
                    }

                    resolvedPath = path + '/' + resolvedPath;
                    resolvedAbsolute = path.charAt(0) === '/';
                  }

                  // At this point the path should be resolved to a full absolute path, but
                  // handle relative paths to be safe (might happen when process.cwd() fails)

                  // Normalize the path
                  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
                    return !!p;
                  }), !resolvedAbsolute).join('/');

                  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
                };

                // path.normalize(path)
                // posix version
                exports.normalize = function (path) {
                  var isAbsolute = exports.isAbsolute(path),
                    trailingSlash = substr(path, -1) === '/';

                  // Normalize the path
                  path = normalizeArray(filter(path.split('/'), function (p) {
                    return !!p;
                  }), !isAbsolute).join('/');

                  if (!path && !isAbsolute) {
                    path = '.';
                  }
                  if (path && trailingSlash) {
                    path += '/';
                  }

                  return (isAbsolute ? '/' : '') + path;
                };

                // posix version
                exports.isAbsolute = function (path) {
                  return path.charAt(0) === '/';
                };

                // posix version
                exports.join = function () {
                  var paths = Array.prototype.slice.call(arguments, 0);
                  return exports.normalize(filter(paths, function (p, index) {
                    if (typeof p !== 'string') {
                      throw new TypeError('Arguments to path.join must be strings');
                    }
                    return p;
                  }).join('/'));
                };


                // path.relative(from, to)
                // posix version
                exports.relative = function (from, to) {
                  from = exports.resolve(from).substr(1);
                  to = exports.resolve(to).substr(1);

                  function trim(arr) {
                    var start = 0;
                    for (; start < arr.length; start++) {
                      if (arr[start] !== '') break;
                    }

                    var end = arr.length - 1;
                    for (; end >= 0; end--) {
                      if (arr[end] !== '') break;
                    }

                    if (start > end) return [];
                    return arr.slice(start, end - start + 1);
                  }

                  var fromParts = trim(from.split('/'));
                  var toParts = trim(to.split('/'));

                  var length = Math.min(fromParts.length, toParts.length);
                  var samePartsLength = length;
                  for (var i = 0; i < length; i++) {
                    if (fromParts[i] !== toParts[i]) {
                      samePartsLength = i;
                      break;
                    }
                  }

                  var outputParts = [];
                  for (var i = samePartsLength; i < fromParts.length; i++) {
                    outputParts.push('..');
                  }

                  outputParts = outputParts.concat(toParts.slice(samePartsLength));

                  return outputParts.join('/');
                };

                exports.sep = '/';
                exports.delimiter = ':';

                exports.dirname = function (path) {
                  if (typeof path !== 'string') path = path + '';
                  if (path.length === 0) return '.';
                  var code = path.charCodeAt(0);
                  var hasRoot = code === 47 /*/*/;
                  var end = -1;
                  var matchedSlash = true;
                  for (var i = path.length - 1; i >= 1; --i) {
                    code = path.charCodeAt(i);
                    if (code === 47 /*/*/) {
                      if (!matchedSlash) {
                        end = i;
                        break;
                      }
                    } else {
                      // We saw the first non-path separator
                      matchedSlash = false;
                    }
                  }

                  if (end === -1) return hasRoot ? '/' : '.';
                  if (hasRoot && end === 1) {
                    // return '//';
                    // Backwards-compat fix:
                    return '/';
                  }
                  return path.slice(0, end);
                };

                function basename(path) {
                  if (typeof path !== 'string') path = path + '';

                  var start = 0;
                  var end = -1;
                  var matchedSlash = true;
                  var i;

                  for (i = path.length - 1; i >= 0; --i) {
                    if (path.charCodeAt(i) === 47 /*/*/) {
                      // If we reached a path separator that was not part of a set of path
                      // separators at the end of the string, stop now
                      if (!matchedSlash) {
                        start = i + 1;
                        break;
                      }
                    } else if (end === -1) {
                      // We saw the first non-path separator, mark this as the end of our
                      // path component
                      matchedSlash = false;
                      end = i + 1;
                    }
                  }

                  if (end === -1) return '';
                  return path.slice(start, end);
                }

                // Uses a mixed approach for backwards-compatibility, as ext behavior changed
                // in new Node.js versions, so only basename() above is backported here
                exports.basename = function (path, ext) {
                  var f = basename(path);
                  if (ext && f.substr(-1 * ext.length) === ext) {
                    f = f.substr(0, f.length - ext.length);
                  }
                  return f;
                };

                exports.extname = function (path) {
                  if (typeof path !== 'string') path = path + '';
                  var startDot = -1;
                  var startPart = 0;
                  var end = -1;
                  var matchedSlash = true;
                  // Track the state of characters (if any) we see before our first dot and
                  // after any path separator we find
                  var preDotState = 0;
                  for (var i = path.length - 1; i >= 0; --i) {
                    var code = path.charCodeAt(i);
                    if (code === 47 /*/*/) {
                      // If we reached a path separator that was not part of a set of path
                      // separators at the end of the string, stop now
                      if (!matchedSlash) {
                        startPart = i + 1;
                        break;
                      }
                      continue;
                    }
                    if (end === -1) {
                      // We saw the first non-path separator, mark this as the end of our
                      // extension
                      matchedSlash = false;
                      end = i + 1;
                    }
                    if (code === 46 /*.*/) {
                      // If this is our first dot, mark it as the start of our extension
                      if (startDot === -1)
                        startDot = i;
                      else if (preDotState !== 1)
                        preDotState = 1;
                    } else if (startDot !== -1) {
                      // We saw a non-dot and non-path separator before our dot, so we should
                      // have a good chance at having a non-empty extension
                      preDotState = -1;
                    }
                  }

                  if (startDot === -1 || end === -1 ||
                    // We saw a non-dot character immediately before the dot
                    preDotState === 0 ||
                    // The (right-most) trimmed path component is exactly '..'
                    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
                    return '';
                  }
                  return path.slice(startDot, end);
                };

                function filter(xs, f) {
                  if (xs.filter) return xs.filter(f);
                  var res = [];
                  for (var i = 0; i < xs.length; i++) {
                    if (f(xs[i], i, xs)) res.push(xs[i]);
                  }
                  return res;
                }

                // String.prototype.substr - negative index don't work in IE8
                var substr = true
                  ? function (str, start, len) { return str.substr(start, len) }
                  : 0
                  ;

              }).call(this, require('_process'))
            }, { "_process": 5 }], 5: [function (require, module, exports) {
              // shim for using process in browser
              var process = module.exports = {};

              // cached from whatever global is present so that test runners that stub it
              // don't break things.  But we need to wrap it in a try catch in case it is
              // wrapped in strict mode code which doesn't define any globals.  It's inside a
              // function because try/catches deoptimize in certain engines.

              var cachedSetTimeout;
              var cachedClearTimeout;

              function defaultSetTimout() {
                throw new Error('setTimeout has not been defined');
              }
              function defaultClearTimeout() {
                throw new Error('clearTimeout has not been defined');
              }
              (function () {
                try {
                  if (typeof setTimeout === 'function') {
                    cachedSetTimeout = setTimeout;
                  } else {
                    cachedSetTimeout = defaultSetTimout;
                  }
                } catch (e) {
                  cachedSetTimeout = defaultSetTimout;
                }
                try {
                  if (typeof clearTimeout === 'function') {
                    cachedClearTimeout = clearTimeout;
                  } else {
                    cachedClearTimeout = defaultClearTimeout;
                  }
                } catch (e) {
                  cachedClearTimeout = defaultClearTimeout;
                }
              }())
              function runTimeout(fun) {
                if (cachedSetTimeout === setTimeout) {
                  //normal enviroments in sane situations
                  return setTimeout(fun, 0);
                }
                // if setTimeout wasn't available but was latter defined
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                  cachedSetTimeout = setTimeout;
                  return setTimeout(fun, 0);
                }
                try {
                  // when when somebody has screwed with setTimeout but no I.E. maddness
                  return cachedSetTimeout(fun, 0);
                } catch (e) {
                  try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                    return cachedSetTimeout.call(null, fun, 0);
                  } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                    return cachedSetTimeout.call(this, fun, 0);
                  }
                }


              }
              function runClearTimeout(marker) {
                if (cachedClearTimeout === clearTimeout) {
                  //normal enviroments in sane situations
                  return clearTimeout(marker);
                }
                // if clearTimeout wasn't available but was latter defined
                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                  cachedClearTimeout = clearTimeout;
                  return clearTimeout(marker);
                }
                try {
                  // when when somebody has screwed with setTimeout but no I.E. maddness
                  return cachedClearTimeout(marker);
                } catch (e) {
                  try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                    return cachedClearTimeout.call(null, marker);
                  } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                    // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                    return cachedClearTimeout.call(this, marker);
                  }
                }



              }
              var queue = [];
              var draining = false;
              var currentQueue;
              var queueIndex = -1;

              function cleanUpNextTick() {
                if (!draining || !currentQueue) {
                  return;
                }
                draining = false;
                if (currentQueue.length) {
                  queue = currentQueue.concat(queue);
                } else {
                  queueIndex = -1;
                }
                if (queue.length) {
                  drainQueue();
                }
              }

              function drainQueue() {
                if (draining) {
                  return;
                }
                var timeout = runTimeout(cleanUpNextTick);
                draining = true;

                var len = queue.length;
                while (len) {
                  currentQueue = queue;
                  queue = [];
                  while (++queueIndex < len) {
                    if (currentQueue) {
                      currentQueue[queueIndex].run();
                    }
                  }
                  queueIndex = -1;
                  len = queue.length;
                }
                currentQueue = null;
                draining = false;
                runClearTimeout(timeout);
              }

              process.nextTick = function (fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) {
                  for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                  }
                }
                queue.push(new Item(fun, args));
                if (queue.length === 1 && !draining) {
                  runTimeout(drainQueue);
                }
              };

              // v8 likes predictible objects
              function Item(fun, array) {
                this.fun = fun;
                this.array = array;
              }
              Item.prototype.run = function () {
                this.fun.apply(null, this.array);
              };
              process.title = 'browser';
              process.browser = true;
              process.env = {};
              process.argv = [];
              process.version = ''; // empty string to avoid regexp issues
              process.versions = {};

              function noop() { }

              process.on = noop;
              process.addListener = noop;
              process.once = noop;
              process.off = noop;
              process.removeListener = noop;
              process.removeAllListeners = noop;
              process.emit = noop;
              process.prependListener = noop;
              process.prependOnceListener = noop;

              process.listeners = function (name) { return [] }

              process.binding = function (name) {
                throw new Error('process.binding is not supported');
              };

              process.cwd = function () { return '/' };
              process.chdir = function (dir) {
                throw new Error('process.chdir is not supported');
              };
              process.umask = function () { return 0; };

            }, {}], 6: [function (require, module, exports) {
              module.exports = {
                "name": "ejs",
                "description": "Embedded JavaScript templates",
                "keywords": [
                  "template",
                  "engine",
                  "ejs"
                ],
                "version": "3.1.6",
                "author": "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",
                "license": "Apache-2.0",
                "bin": {
                  "ejs": "./bin/cli.js"
                },
                "main": "./lib/ejs.js",
                "jsdelivr": "ejs.min.js",
                "unpkg": "ejs.min.js",
                "repository": {
                  "type": "git",
                  "url": "git://github.com/mde/ejs.git"
                },
                "bugs": "https://github.com/mde/ejs/issues",
                "homepage": "https://github.com/mde/ejs",
                "dependencies": {
                  "jake": "^10.6.1"
                },
                "devDependencies": {
                  "browserify": "^16.5.1",
                  "eslint": "^6.8.0",
                  "git-directory-deploy": "^1.5.1",
                  "jsdoc": "^3.6.4",
                  "lru-cache": "^4.0.1",
                  "mocha": "^7.1.1",
                  "uglify-js": "^3.3.16"
                },
                "engines": {
                  "node": ">=0.10.0"
                },
                "scripts": {
                  "test": "mocha"
                }
              }

            }, {}]
          }, {}, [1])(1)
        });


        /***/
}),

/***/ "../node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
          /* harmony export */
});
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        /***/
}),

/***/ "../node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!*****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
          /* harmony export */
});
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        /***/
})

    /******/
});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
      /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
      /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
    /******/
}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
      /******/
};
    /******/
})();
/******/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for (var key in definition) {
/******/ 				if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          /******/
}
        /******/
}
      /******/
};
    /******/
})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
    /******/
})();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/
}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
      /******/
};
    /******/
})();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  (() => {
    "use strict";
    /*!**************************!*\
      !*** ../src/js/index.js ***!
      \**************************/
    __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/global */ "../src/js/module/global.js");
/* harmony import */ var _module_param__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module/param */ "../src/js/module/param.js");
/* harmony import */ var ejs_ejs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ejs/ejs */ "../node_modules/ejs/ejs.js");
/* harmony import */ var ejs_ejs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ejs_ejs__WEBPACK_IMPORTED_MODULE_2__);





    console.log("env", _module_global__WEBPACK_IMPORTED_MODULE_0__["default"].env);
    console.log("".concat(_module_param__WEBPACK_IMPORTED_MODULE_1__["default"].getAll(window.location.href)));
    var template = document.querySelector('#comments').innerHTML;
    var html = ejs_ejs__WEBPACK_IMPORTED_MODULE_2__.render(template, {
      comments: [{
        user: "123",
        postdate: "2019",
        detail: "xxxxxxxxxx"
      }]
    });
    document.querySelector('#list').innerHTML = html;
  })();

  /******/
})()
  ;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQUYsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBWixFQUFtQkgsMERBQW5CO0FBQ0FFLE9BQU8sQ0FBQ0MsR0FBUixXQUFlQyw0REFBQSxDQUFhVSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLElBQTdCLENBQWY7QUFDQSxJQUFJVSxRQUFRLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixXQUF2QixFQUFvQ0MsU0FBbkQ7QUFDQSxJQUFJQyxJQUFJLEdBQUdOLDJDQUFBLENBQVdFLFFBQVgsRUFBcUI7QUFBRU0sRUFBQUEsUUFBUSxFQUFFLENBQUM7QUFBRUMsSUFBQUEsSUFBSSxFQUFFLEtBQVI7QUFBZUMsSUFBQUEsUUFBUSxFQUFFLE1BQXpCO0FBQWlDQyxJQUFBQSxNQUFNLEVBQUU7QUFBekMsR0FBRDtBQUFaLENBQXJCLENBQVg7QUFDQVIsUUFBUSxDQUFDQyxhQUFULENBQXVCLE9BQXZCLEVBQWdDQyxTQUFoQyxHQUE0Q0MsSUFBNUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uLi9zcmMvanMvbW9kdWxlL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2pzL21vZHVsZS9wYXJhbS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2Vqcy9lanMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi4vc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuLyoqXHJcbiAqIOWFqOWxgOWPmOmHj1xyXG4gKi9cclxubGV0IEdsb2JhbD17XHJcbiAgICBlbnY6XCJsb2NhbFwiXHJcbn07XHJcbmNvbnNvbGUubG9nKCdHbG9iYWwnLEdsb2JhbCk7XHJcbmV4cG9ydCBkZWZhdWx0IEdsb2JhbDsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICog5Zyw5Z2A55u45YWzXHJcbiAqL1xyXG5jbGFzcyBQYXJhbSB7XHJcbiAgICAvL+W+l+WIsOaJgOacieWPguaVsFxyXG4gICAgc3RhdGljIGdldEFsbCh1cmwpIHtcclxuICAgICAgICB2YXIgcXVlcnkgPSB7fSxcclxuICAgICAgICAgICAgaSwgcGFyYW1zLCBwYXJhbTtcclxuICAgICAgICBpZiAodXJsLmluZGV4T2YoJz8nKSA+PSAwKSB1cmwgPSB1cmwuc3BsaXQoJz8nKVsxXTtcclxuICAgICAgICBlbHNlIHJldHVybiBxdWVyeTtcclxuICAgICAgICBwYXJhbXMgPSB1cmwuc3BsaXQoJyYnKTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHBhcmFtID0gcGFyYW1zW2ldLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgICAgIHF1ZXJ5W3BhcmFtWzBdXSA9IHBhcmFtWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcXVlcnk7XHJcbiAgICB9XHJcbiAgICAvL+W+l+WIsOafkOS4quWPguaVsOeahOWAvFxyXG4gICAgc3RhdGljIGdldEtleShrZXksIHVybCkge1xyXG4gICAgICAgIGlmICghdXJsKSB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICAgICAgICBrZXkgPSBrZXkucmVwbGFjZSgvW1xcW1xcXV0vZywgJ1xcXFwkJicpO1xyXG4gICAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoJ1s/Jl0nICsga2V5ICsgJyg9KFteJiNdKil8JnwjfCQpJyksXHJcbiAgICAgICAgICAgIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XHJcbiAgICAgICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBpZiAoIXJlc3VsdHNbMl0pIHJldHVybiAnJztcclxuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csICcgJykpO1xyXG4gICAgfVxyXG4gICAgLy/mnInmn5DkuKrlj4LmlbBcclxuICAgIHN0YXRpYyBoYXNLZXkoa2V5LCB1cmwpIHtcclxuICAgICAgICBpZiAoIXVybCkgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL1tcXFtcXF1dL2csICdcXFxcJCYnKTtcclxuICAgICAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKCdbPyZdJyArIGtleSArICcoPShbXiYjXSopfCZ8I3wkKScpLFxyXG4gICAgICAgICAgICByZXN1bHRzID0gcmVnZXgudGVzdCh1cmwpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgfVxyXG59IFxyXG5leHBvcnQgZGVmYXVsdCBQYXJhbTsiLCIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5lanMgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiBFSlMgRW1iZWRkZWQgSmF2YVNjcmlwdCB0ZW1wbGF0ZXNcbiAqIENvcHlyaWdodCAyMTEyIE1hdHRoZXcgRWVybmlzc2UgKG1kZUBmbGVlZ2l4Lm9yZylcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAZmlsZSBFbWJlZGRlZCBKYXZhU2NyaXB0IHRlbXBsYXRpbmcgZW5naW5lLiB7QGxpbmsgaHR0cDovL2Vqcy5jb31cbiAqIEBhdXRob3IgTWF0dGhldyBFZXJuaXNzZSA8bWRlQGZsZWVnaXgub3JnPlxuICogQGF1dGhvciBUaWFuY2hlbmcgXCJUaW1vdGh5XCIgR3UgPHRpbW90aHlndTk5QGdtYWlsLmNvbT5cbiAqIEBwcm9qZWN0IEVKU1xuICogQGxpY2Vuc2Uge0BsaW5rIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMCBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjB9XG4gKi9cblxuLyoqXG4gKiBFSlMgaW50ZXJuYWwgZnVuY3Rpb25zLlxuICpcbiAqIFRlY2huaWNhbGx5IHRoaXMgXCJtb2R1bGVcIiBsaWVzIGluIHRoZSBzYW1lIGZpbGUgYXMge0BsaW5rIG1vZHVsZTplanN9LCBmb3JcbiAqIHRoZSBzYWtlIG9mIG9yZ2FuaXphdGlvbiBhbGwgdGhlIHByaXZhdGUgZnVuY3Rpb25zIHJlIGdyb3VwZWQgaW50byB0aGlzXG4gKiBtb2R1bGUuXG4gKlxuICogQG1vZHVsZSBlanMtaW50ZXJuYWxcbiAqIEBwcml2YXRlXG4gKi9cblxuLyoqXG4gKiBFbWJlZGRlZCBKYXZhU2NyaXB0IHRlbXBsYXRpbmcgZW5naW5lLlxuICpcbiAqIEBtb2R1bGUgZWpzXG4gKiBAcHVibGljXG4gKi9cblxudmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgc2NvcGVPcHRpb25XYXJuZWQgPSBmYWxzZTtcbi8qKiBAdHlwZSB7c3RyaW5nfSAqL1xudmFyIF9WRVJTSU9OX1NUUklORyA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpLnZlcnNpb247XG52YXIgX0RFRkFVTFRfT1BFTl9ERUxJTUlURVIgPSAnPCc7XG52YXIgX0RFRkFVTFRfQ0xPU0VfREVMSU1JVEVSID0gJz4nO1xudmFyIF9ERUZBVUxUX0RFTElNSVRFUiA9ICclJztcbnZhciBfREVGQVVMVF9MT0NBTFNfTkFNRSA9ICdsb2NhbHMnO1xudmFyIF9OQU1FID0gJ2Vqcyc7XG52YXIgX1JFR0VYX1NUUklORyA9ICcoPCUlfCUlPnw8JT18PCUtfDwlX3w8JSN8PCV8JT58LSU+fF8lPiknO1xudmFyIF9PUFRTX1BBU1NBQkxFX1dJVEhfREFUQSA9IFsnZGVsaW1pdGVyJywgJ3Njb3BlJywgJ2NvbnRleHQnLCAnZGVidWcnLCAnY29tcGlsZURlYnVnJyxcbiAgJ2NsaWVudCcsICdfd2l0aCcsICdybVdoaXRlc3BhY2UnLCAnc3RyaWN0JywgJ2ZpbGVuYW1lJywgJ2FzeW5jJ107XG4vLyBXZSBkb24ndCBhbGxvdyAnY2FjaGUnIG9wdGlvbiB0byBiZSBwYXNzZWQgaW4gdGhlIGRhdGEgb2JqIGZvclxuLy8gdGhlIG5vcm1hbCBgcmVuZGVyYCBjYWxsLCBidXQgdGhpcyBpcyB3aGVyZSBFeHByZXNzIDIgJiAzIHB1dCBpdFxuLy8gc28gd2UgbWFrZSBhbiBleGNlcHRpb24gZm9yIGByZW5kZXJGaWxlYFxudmFyIF9PUFRTX1BBU1NBQkxFX1dJVEhfREFUQV9FWFBSRVNTID0gX09QVFNfUEFTU0FCTEVfV0lUSF9EQVRBLmNvbmNhdCgnY2FjaGUnKTtcbnZhciBfQk9NID0gL15cXHVGRUZGLztcblxuLyoqXG4gKiBFSlMgdGVtcGxhdGUgZnVuY3Rpb24gY2FjaGUuIFRoaXMgY2FuIGJlIGEgTFJVIG9iamVjdCBmcm9tIGxydS1jYWNoZSBOUE1cbiAqIG1vZHVsZS4gQnkgZGVmYXVsdCwgaXQgaXMge0BsaW5rIG1vZHVsZTp1dGlscy5jYWNoZX0sIGEgc2ltcGxlIGluLXByb2Nlc3NcbiAqIGNhY2hlIHRoYXQgZ3Jvd3MgY29udGludW91c2x5LlxuICpcbiAqIEB0eXBlIHtDYWNoZX1cbiAqL1xuXG5leHBvcnRzLmNhY2hlID0gdXRpbHMuY2FjaGU7XG5cbi8qKlxuICogQ3VzdG9tIGZpbGUgbG9hZGVyLiBVc2VmdWwgZm9yIHRlbXBsYXRlIHByZXByb2Nlc3Npbmcgb3IgcmVzdHJpY3RpbmcgYWNjZXNzXG4gKiB0byBhIGNlcnRhaW4gcGFydCBvZiB0aGUgZmlsZXN5c3RlbS5cbiAqXG4gKiBAdHlwZSB7ZmlsZUxvYWRlcn1cbiAqL1xuXG5leHBvcnRzLmZpbGVMb2FkZXIgPSBmcy5yZWFkRmlsZVN5bmM7XG5cbi8qKlxuICogTmFtZSBvZiB0aGUgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGxvY2Fscy5cbiAqXG4gKiBUaGlzIHZhcmlhYmxlIGlzIG92ZXJyaWRkZW4gYnkge0BsaW5rIE9wdGlvbnN9YC5sb2NhbHNOYW1lYCBpZiBpdCBpcyBub3RcbiAqIGB1bmRlZmluZWRgLlxuICpcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAcHVibGljXG4gKi9cblxuZXhwb3J0cy5sb2NhbHNOYW1lID0gX0RFRkFVTFRfTE9DQUxTX05BTUU7XG5cbi8qKlxuICogUHJvbWlzZSBpbXBsZW1lbnRhdGlvbiAtLSBkZWZhdWx0cyB0byB0aGUgbmF0aXZlIGltcGxlbWVudGF0aW9uIGlmIGF2YWlsYWJsZVxuICogVGhpcyBpcyBtb3N0bHkganVzdCBmb3IgdGVzdGFiaWxpdHlcbiAqXG4gKiBAdHlwZSB7UHJvbWlzZUNvbnN0cnVjdG9yTGlrZX1cbiAqIEBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLnByb21pc2VJbXBsID0gKG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXM7JykpKCkuUHJvbWlzZTtcblxuLyoqXG4gKiBHZXQgdGhlIHBhdGggdG8gdGhlIGluY2x1ZGVkIGZpbGUgZnJvbSB0aGUgcGFyZW50IGZpbGUgcGF0aCBhbmQgdGhlXG4gKiBzcGVjaWZpZWQgcGF0aC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gIG5hbWUgICAgIHNwZWNpZmllZCBwYXRoXG4gKiBAcGFyYW0ge1N0cmluZ30gIGZpbGVuYW1lIHBhcmVudCBmaWxlIHBhdGhcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2lzRGlyPWZhbHNlXSB3aGV0aGVyIHRoZSBwYXJlbnQgZmlsZSBwYXRoIGlzIGEgZGlyZWN0b3J5XG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMucmVzb2x2ZUluY2x1ZGUgPSBmdW5jdGlvbihuYW1lLCBmaWxlbmFtZSwgaXNEaXIpIHtcbiAgdmFyIGRpcm5hbWUgPSBwYXRoLmRpcm5hbWU7XG4gIHZhciBleHRuYW1lID0gcGF0aC5leHRuYW1lO1xuICB2YXIgcmVzb2x2ZSA9IHBhdGgucmVzb2x2ZTtcbiAgdmFyIGluY2x1ZGVQYXRoID0gcmVzb2x2ZShpc0RpciA/IGZpbGVuYW1lIDogZGlybmFtZShmaWxlbmFtZSksIG5hbWUpO1xuICB2YXIgZXh0ID0gZXh0bmFtZShuYW1lKTtcbiAgaWYgKCFleHQpIHtcbiAgICBpbmNsdWRlUGF0aCArPSAnLmVqcyc7XG4gIH1cbiAgcmV0dXJuIGluY2x1ZGVQYXRoO1xufTtcblxuLyoqXG4gKiBUcnkgdG8gcmVzb2x2ZSBmaWxlIHBhdGggb24gbXVsdGlwbGUgZGlyZWN0b3JpZXNcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICBuYW1lICBzcGVjaWZpZWQgcGF0aFxuICogQHBhcmFtICB7QXJyYXk8U3RyaW5nPn0gcGF0aHMgbGlzdCBvZiBwb3NzaWJsZSBwYXJlbnQgZGlyZWN0b3J5IHBhdGhzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVQYXRocyhuYW1lLCBwYXRocykge1xuICB2YXIgZmlsZVBhdGg7XG4gIGlmIChwYXRocy5zb21lKGZ1bmN0aW9uICh2KSB7XG4gICAgZmlsZVBhdGggPSBleHBvcnRzLnJlc29sdmVJbmNsdWRlKG5hbWUsIHYsIHRydWUpO1xuICAgIHJldHVybiBmcy5leGlzdHNTeW5jKGZpbGVQYXRoKTtcbiAgfSkpIHtcbiAgICByZXR1cm4gZmlsZVBhdGg7XG4gIH1cbn1cblxuLyoqXG4gKiBHZXQgdGhlIHBhdGggdG8gdGhlIGluY2x1ZGVkIGZpbGUgYnkgT3B0aW9uc1xuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gIHBhdGggICAgc3BlY2lmaWVkIHBhdGhcbiAqIEBwYXJhbSAge09wdGlvbnN9IG9wdGlvbnMgY29tcGlsYXRpb24gb3B0aW9uc1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRJbmNsdWRlUGF0aChwYXRoLCBvcHRpb25zKSB7XG4gIHZhciBpbmNsdWRlUGF0aDtcbiAgdmFyIGZpbGVQYXRoO1xuICB2YXIgdmlld3MgPSBvcHRpb25zLnZpZXdzO1xuICB2YXIgbWF0Y2ggPSAvXltBLVphLXpdKzpcXFxcfF5cXC8vLmV4ZWMocGF0aCk7XG5cbiAgLy8gQWJzIHBhdGhcbiAgaWYgKG1hdGNoICYmIG1hdGNoLmxlbmd0aCkge1xuICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL15cXC8qLywgJycpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMucm9vdCkpIHtcbiAgICAgIGluY2x1ZGVQYXRoID0gcmVzb2x2ZVBhdGhzKHBhdGgsIG9wdGlvbnMucm9vdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluY2x1ZGVQYXRoID0gZXhwb3J0cy5yZXNvbHZlSW5jbHVkZShwYXRoLCBvcHRpb25zLnJvb3QgfHwgJy8nLCB0cnVlKTtcbiAgICB9XG4gIH1cbiAgLy8gUmVsYXRpdmUgcGF0aHNcbiAgZWxzZSB7XG4gICAgLy8gTG9vayByZWxhdGl2ZSB0byBhIHBhc3NlZCBmaWxlbmFtZSBmaXJzdFxuICAgIGlmIChvcHRpb25zLmZpbGVuYW1lKSB7XG4gICAgICBmaWxlUGF0aCA9IGV4cG9ydHMucmVzb2x2ZUluY2x1ZGUocGF0aCwgb3B0aW9ucy5maWxlbmFtZSk7XG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcbiAgICAgICAgaW5jbHVkZVBhdGggPSBmaWxlUGF0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVGhlbiBsb29rIGluIGFueSB2aWV3cyBkaXJlY3Rvcmllc1xuICAgIGlmICghaW5jbHVkZVBhdGggJiYgQXJyYXkuaXNBcnJheSh2aWV3cykpIHtcbiAgICAgIGluY2x1ZGVQYXRoID0gcmVzb2x2ZVBhdGhzKHBhdGgsIHZpZXdzKTtcbiAgICB9XG4gICAgaWYgKCFpbmNsdWRlUGF0aCAmJiB0eXBlb2Ygb3B0aW9ucy5pbmNsdWRlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCB0aGUgaW5jbHVkZSBmaWxlIFwiJyArXG4gICAgICAgICAgb3B0aW9ucy5lc2NhcGVGdW5jdGlvbihwYXRoKSArICdcIicpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW5jbHVkZVBhdGg7XG59XG5cbi8qKlxuICogR2V0IHRoZSB0ZW1wbGF0ZSBmcm9tIGEgc3RyaW5nIG9yIGEgZmlsZSwgZWl0aGVyIGNvbXBpbGVkIG9uLXRoZS1mbHkgb3JcbiAqIHJlYWQgZnJvbSBjYWNoZSAoaWYgZW5hYmxlZCksIGFuZCBjYWNoZSB0aGUgdGVtcGxhdGUgaWYgbmVlZGVkLlxuICpcbiAqIElmIGB0ZW1wbGF0ZWAgaXMgbm90IHNldCwgdGhlIGZpbGUgc3BlY2lmaWVkIGluIGBvcHRpb25zLmZpbGVuYW1lYCB3aWxsIGJlXG4gKiByZWFkLlxuICpcbiAqIElmIGBvcHRpb25zLmNhY2hlYCBpcyB0cnVlLCB0aGlzIGZ1bmN0aW9uIHJlYWRzIHRoZSBmaWxlIGZyb21cbiAqIGBvcHRpb25zLmZpbGVuYW1lYCBzbyBpdCBtdXN0IGJlIHNldCBwcmlvciB0byBjYWxsaW5nIHRoaXMgZnVuY3Rpb24uXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTplanMtaW50ZXJuYWxcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9ucyAgIGNvbXBpbGF0aW9uIG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBbdGVtcGxhdGVdIHRlbXBsYXRlIHNvdXJjZVxuICogQHJldHVybiB7KFRlbXBsYXRlRnVuY3Rpb258Q2xpZW50RnVuY3Rpb24pfVxuICogRGVwZW5kaW5nIG9uIHRoZSB2YWx1ZSBvZiBgb3B0aW9ucy5jbGllbnRgLCBlaXRoZXIgdHlwZSBtaWdodCBiZSByZXR1cm5lZC5cbiAqIEBzdGF0aWNcbiAqL1xuXG5mdW5jdGlvbiBoYW5kbGVDYWNoZShvcHRpb25zLCB0ZW1wbGF0ZSkge1xuICB2YXIgZnVuYztcbiAgdmFyIGZpbGVuYW1lID0gb3B0aW9ucy5maWxlbmFtZTtcbiAgdmFyIGhhc1RlbXBsYXRlID0gYXJndW1lbnRzLmxlbmd0aCA+IDE7XG5cbiAgaWYgKG9wdGlvbnMuY2FjaGUpIHtcbiAgICBpZiAoIWZpbGVuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhY2hlIG9wdGlvbiByZXF1aXJlcyBhIGZpbGVuYW1lJyk7XG4gICAgfVxuICAgIGZ1bmMgPSBleHBvcnRzLmNhY2hlLmdldChmaWxlbmFtZSk7XG4gICAgaWYgKGZ1bmMpIHtcbiAgICAgIHJldHVybiBmdW5jO1xuICAgIH1cbiAgICBpZiAoIWhhc1RlbXBsYXRlKSB7XG4gICAgICB0ZW1wbGF0ZSA9IGZpbGVMb2FkZXIoZmlsZW5hbWUpLnRvU3RyaW5nKCkucmVwbGFjZShfQk9NLCAnJyk7XG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKCFoYXNUZW1wbGF0ZSkge1xuICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBpZjogc2hvdWxkIG5vdCBoYXBwZW4gYXQgYWxsXG4gICAgaWYgKCFmaWxlbmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnRlcm5hbCBFSlMgZXJyb3I6IG5vIGZpbGUgbmFtZSBvciB0ZW1wbGF0ZSAnXG4gICAgICAgICAgICAgICAgICAgICsgJ3Byb3ZpZGVkJyk7XG4gICAgfVxuICAgIHRlbXBsYXRlID0gZmlsZUxvYWRlcihmaWxlbmFtZSkudG9TdHJpbmcoKS5yZXBsYWNlKF9CT00sICcnKTtcbiAgfVxuICBmdW5jID0gZXhwb3J0cy5jb21waWxlKHRlbXBsYXRlLCBvcHRpb25zKTtcbiAgaWYgKG9wdGlvbnMuY2FjaGUpIHtcbiAgICBleHBvcnRzLmNhY2hlLnNldChmaWxlbmFtZSwgZnVuYyk7XG4gIH1cbiAgcmV0dXJuIGZ1bmM7XG59XG5cbi8qKlxuICogVHJ5IGNhbGxpbmcgaGFuZGxlQ2FjaGUgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucyBhbmQgZGF0YSBhbmQgY2FsbCB0aGVcbiAqIGNhbGxiYWNrIHdpdGggdGhlIHJlc3VsdC4gSWYgYW4gZXJyb3Igb2NjdXJzLCBjYWxsIHRoZSBjYWxsYmFjayB3aXRoXG4gKiB0aGUgZXJyb3IuIFVzZWQgYnkgcmVuZGVyRmlsZSgpLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6ZWpzLWludGVybmFsXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnMgICAgY29tcGlsYXRpb24gb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgICAgICAgIHRlbXBsYXRlIGRhdGFcbiAqIEBwYXJhbSB7UmVuZGVyRmlsZUNhbGxiYWNrfSBjYiBjYWxsYmFja1xuICogQHN0YXRpY1xuICovXG5cbmZ1bmN0aW9uIHRyeUhhbmRsZUNhY2hlKG9wdGlvbnMsIGRhdGEsIGNiKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICghY2IpIHtcbiAgICBpZiAodHlwZW9mIGV4cG9ydHMucHJvbWlzZUltcGwgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG5ldyBleHBvcnRzLnByb21pc2VJbXBsKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXN1bHQgPSBoYW5kbGVDYWNoZShvcHRpb25zKShkYXRhKTtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGEgY2FsbGJhY2sgZnVuY3Rpb24nKTtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGhhbmRsZUNhY2hlKG9wdGlvbnMpKGRhdGEpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gY2IoZXJyKTtcbiAgICB9XG5cbiAgICBjYihudWxsLCByZXN1bHQpO1xuICB9XG59XG5cbi8qKlxuICogZmlsZUxvYWRlciBpcyBpbmRlcGVuZGVudFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlUGF0aCBlanMgZmlsZSBwYXRoLlxuICogQHJldHVybiB7U3RyaW5nfSBUaGUgY29udGVudHMgb2YgdGhlIHNwZWNpZmllZCBmaWxlLlxuICogQHN0YXRpY1xuICovXG5cbmZ1bmN0aW9uIGZpbGVMb2FkZXIoZmlsZVBhdGgpe1xuICByZXR1cm4gZXhwb3J0cy5maWxlTG9hZGVyKGZpbGVQYXRoKTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHRlbXBsYXRlIGZ1bmN0aW9uLlxuICpcbiAqIElmIGBvcHRpb25zLmNhY2hlYCBpcyBgdHJ1ZWAsIHRoZW4gdGhlIHRlbXBsYXRlIGlzIGNhY2hlZC5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmVqcy1pbnRlcm5hbFxuICogQHBhcmFtIHtTdHJpbmd9ICBwYXRoICAgIHBhdGggZm9yIHRoZSBzcGVjaWZpZWQgZmlsZVxuICogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zIGNvbXBpbGF0aW9uIG9wdGlvbnNcbiAqIEByZXR1cm4geyhUZW1wbGF0ZUZ1bmN0aW9ufENsaWVudEZ1bmN0aW9uKX1cbiAqIERlcGVuZGluZyBvbiB0aGUgdmFsdWUgb2YgYG9wdGlvbnMuY2xpZW50YCwgZWl0aGVyIHR5cGUgbWlnaHQgYmUgcmV0dXJuZWRcbiAqIEBzdGF0aWNcbiAqL1xuXG5mdW5jdGlvbiBpbmNsdWRlRmlsZShwYXRoLCBvcHRpb25zKSB7XG4gIHZhciBvcHRzID0gdXRpbHMuc2hhbGxvd0NvcHkoe30sIG9wdGlvbnMpO1xuICBvcHRzLmZpbGVuYW1lID0gZ2V0SW5jbHVkZVBhdGgocGF0aCwgb3B0cyk7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbmNsdWRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBpbmNsdWRlclJlc3VsdCA9IG9wdGlvbnMuaW5jbHVkZXIocGF0aCwgb3B0cy5maWxlbmFtZSk7XG4gICAgaWYgKGluY2x1ZGVyUmVzdWx0KSB7XG4gICAgICBpZiAoaW5jbHVkZXJSZXN1bHQuZmlsZW5hbWUpIHtcbiAgICAgICAgb3B0cy5maWxlbmFtZSA9IGluY2x1ZGVyUmVzdWx0LmZpbGVuYW1lO1xuICAgICAgfVxuICAgICAgaWYgKGluY2x1ZGVyUmVzdWx0LnRlbXBsYXRlKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVDYWNoZShvcHRzLCBpbmNsdWRlclJlc3VsdC50ZW1wbGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBoYW5kbGVDYWNoZShvcHRzKTtcbn1cblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGUgYHN0cmAgb2YgZWpzLCBgZmlsZW5hbWVgLCBhbmRcbiAqIGBsaW5lbm9gLlxuICpcbiAqIEBpbXBsZW1lbnRzIHtSZXRocm93Q2FsbGJhY2t9XG4gKiBAbWVtYmVyb2YgbW9kdWxlOmVqcy1pbnRlcm5hbFxuICogQHBhcmFtIHtFcnJvcn0gIGVyciAgICAgIEVycm9yIG9iamVjdFxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciAgICAgIEVKUyBzb3VyY2VcbiAqIEBwYXJhbSB7U3RyaW5nfSBmbG5tICAgICBmaWxlIG5hbWUgb2YgdGhlIEVKUyBmaWxlXG4gKiBAcGFyYW0ge051bWJlcn0gbGluZW5vICAgbGluZSBudW1iZXIgb2YgdGhlIGVycm9yXG4gKiBAcGFyYW0ge0VzY2FwZUNhbGxiYWNrfSBlc2NcbiAqIEBzdGF0aWNcbiAqL1xuXG5mdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmbG5tLCBsaW5lbm8sIGVzYykge1xuICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpO1xuICB2YXIgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKTtcbiAgdmFyIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gIHZhciBmaWxlbmFtZSA9IGVzYyhmbG5tKTtcbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbiAobGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnID4+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnZWpzJykgKyAnOidcbiAgICArIGxpbmVubyArICdcXG4nXG4gICAgKyBjb250ZXh0ICsgJ1xcblxcbidcbiAgICArIGVyci5tZXNzYWdlO1xuXG4gIHRocm93IGVycjtcbn1cblxuZnVuY3Rpb24gc3RyaXBTZW1pKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvOyhcXHMqJCkvLCAnJDEnKTtcbn1cblxuLyoqXG4gKiBDb21waWxlIHRoZSBnaXZlbiBgc3RyYCBvZiBlanMgaW50byBhIHRlbXBsYXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSAgdGVtcGxhdGUgRUpTIHRlbXBsYXRlXG4gKlxuICogQHBhcmFtIHtPcHRpb25zfSBbb3B0c10gY29tcGlsYXRpb24gb3B0aW9uc1xuICpcbiAqIEByZXR1cm4geyhUZW1wbGF0ZUZ1bmN0aW9ufENsaWVudEZ1bmN0aW9uKX1cbiAqIERlcGVuZGluZyBvbiB0aGUgdmFsdWUgb2YgYG9wdHMuY2xpZW50YCwgZWl0aGVyIHR5cGUgbWlnaHQgYmUgcmV0dXJuZWQuXG4gKiBOb3RlIHRoYXQgdGhlIHJldHVybiB0eXBlIG9mIHRoZSBmdW5jdGlvbiBhbHNvIGRlcGVuZHMgb24gdGhlIHZhbHVlIG9mIGBvcHRzLmFzeW5jYC5cbiAqIEBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmNvbXBpbGUgPSBmdW5jdGlvbiBjb21waWxlKHRlbXBsYXRlLCBvcHRzKSB7XG4gIHZhciB0ZW1wbDtcblxuICAvLyB2MSBjb21wYXRcbiAgLy8gJ3Njb3BlJyBpcyAnY29udGV4dCdcbiAgLy8gRklYTUU6IFJlbW92ZSB0aGlzIGluIGEgZnV0dXJlIHZlcnNpb25cbiAgaWYgKG9wdHMgJiYgb3B0cy5zY29wZSkge1xuICAgIGlmICghc2NvcGVPcHRpb25XYXJuZWQpe1xuICAgICAgY29uc29sZS53YXJuKCdgc2NvcGVgIG9wdGlvbiBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gRUpTIDMnKTtcbiAgICAgIHNjb3BlT3B0aW9uV2FybmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCFvcHRzLmNvbnRleHQpIHtcbiAgICAgIG9wdHMuY29udGV4dCA9IG9wdHMuc2NvcGU7XG4gICAgfVxuICAgIGRlbGV0ZSBvcHRzLnNjb3BlO1xuICB9XG4gIHRlbXBsID0gbmV3IFRlbXBsYXRlKHRlbXBsYXRlLCBvcHRzKTtcbiAgcmV0dXJuIHRlbXBsLmNvbXBpbGUoKTtcbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBgdGVtcGxhdGVgIG9mIGVqcy5cbiAqXG4gKiBJZiB5b3Ugd291bGQgbGlrZSB0byBpbmNsdWRlIG9wdGlvbnMgYnV0IG5vdCBkYXRhLCB5b3UgbmVlZCB0byBleHBsaWNpdGx5XG4gKiBjYWxsIHRoaXMgZnVuY3Rpb24gd2l0aCBgZGF0YWAgYmVpbmcgYW4gZW1wdHkgb2JqZWN0IG9yIGBudWxsYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gICB0ZW1wbGF0ZSBFSlMgdGVtcGxhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSAgW2RhdGE9e31dIHRlbXBsYXRlIGRhdGFcbiAqIEBwYXJhbSB7T3B0aW9uc30gW29wdHM9e31dIGNvbXBpbGF0aW9uIGFuZCByZW5kZXJpbmcgb3B0aW9uc1xuICogQHJldHVybiB7KFN0cmluZ3xQcm9taXNlPFN0cmluZz4pfVxuICogUmV0dXJuIHZhbHVlIHR5cGUgZGVwZW5kcyBvbiBgb3B0cy5hc3luY2AuXG4gKiBAcHVibGljXG4gKi9cblxuZXhwb3J0cy5yZW5kZXIgPSBmdW5jdGlvbiAodGVtcGxhdGUsIGQsIG8pIHtcbiAgdmFyIGRhdGEgPSBkIHx8IHt9O1xuICB2YXIgb3B0cyA9IG8gfHwge307XG5cbiAgLy8gTm8gb3B0aW9ucyBvYmplY3QgLS0gaWYgdGhlcmUgYXJlIG9wdGlvbnkgbmFtZXNcbiAgLy8gaW4gdGhlIGRhdGEsIGNvcHkgdGhlbSB0byBvcHRpb25zXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIpIHtcbiAgICB1dGlscy5zaGFsbG93Q29weUZyb21MaXN0KG9wdHMsIGRhdGEsIF9PUFRTX1BBU1NBQkxFX1dJVEhfREFUQSk7XG4gIH1cblxuICByZXR1cm4gaGFuZGxlQ2FjaGUob3B0cywgdGVtcGxhdGUpKGRhdGEpO1xufTtcblxuLyoqXG4gKiBSZW5kZXIgYW4gRUpTIGZpbGUgYXQgdGhlIGdpdmVuIGBwYXRoYCBhbmQgY2FsbGJhY2sgYGNiKGVyciwgc3RyKWAuXG4gKlxuICogSWYgeW91IHdvdWxkIGxpa2UgdG8gaW5jbHVkZSBvcHRpb25zIGJ1dCBub3QgZGF0YSwgeW91IG5lZWQgdG8gZXhwbGljaXRseVxuICogY2FsbCB0aGlzIGZ1bmN0aW9uIHdpdGggYGRhdGFgIGJlaW5nIGFuIGVtcHR5IG9iamVjdCBvciBgbnVsbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgICAgIHBhdGggICAgIHBhdGggdG8gdGhlIEVKUyBmaWxlXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgICBbZGF0YT17fV0gdGVtcGxhdGUgZGF0YVxuICogQHBhcmFtIHtPcHRpb25zfSAgICAgICAgICAgW29wdHM9e31dIGNvbXBpbGF0aW9uIGFuZCByZW5kZXJpbmcgb3B0aW9uc1xuICogQHBhcmFtIHtSZW5kZXJGaWxlQ2FsbGJhY2t9IGNiIGNhbGxiYWNrXG4gKiBAcHVibGljXG4gKi9cblxuZXhwb3J0cy5yZW5kZXJGaWxlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gIHZhciBmaWxlbmFtZSA9IGFyZ3Muc2hpZnQoKTtcbiAgdmFyIGNiO1xuICB2YXIgb3B0cyA9IHtmaWxlbmFtZTogZmlsZW5hbWV9O1xuICB2YXIgZGF0YTtcbiAgdmFyIHZpZXdPcHRzO1xuXG4gIC8vIERvIHdlIGhhdmUgYSBjYWxsYmFjaz9cbiAgaWYgKHR5cGVvZiBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdID09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IGFyZ3MucG9wKCk7XG4gIH1cbiAgLy8gRG8gd2UgaGF2ZSBkYXRhL29wdHM/XG4gIGlmIChhcmdzLmxlbmd0aCkge1xuICAgIC8vIFNob3VsZCBhbHdheXMgaGF2ZSBkYXRhIG9ialxuICAgIGRhdGEgPSBhcmdzLnNoaWZ0KCk7XG4gICAgLy8gTm9ybWFsIHBhc3NlZCBvcHRzIChkYXRhIG9iaiArIG9wdHMgb2JqKVxuICAgIGlmIChhcmdzLmxlbmd0aCkge1xuICAgICAgLy8gVXNlIHNoYWxsb3dDb3B5IHNvIHdlIGRvbid0IHBvbGx1dGUgcGFzc2VkIGluIG9wdHMgb2JqIHdpdGggbmV3IHZhbHNcbiAgICAgIHV0aWxzLnNoYWxsb3dDb3B5KG9wdHMsIGFyZ3MucG9wKCkpO1xuICAgIH1cbiAgICAvLyBTcGVjaWFsIGNhc2luZyBmb3IgRXhwcmVzcyAoc2V0dGluZ3MgKyBvcHRzLWluLWRhdGEpXG4gICAgZWxzZSB7XG4gICAgICAvLyBFeHByZXNzIDMgYW5kIDRcbiAgICAgIGlmIChkYXRhLnNldHRpbmdzKSB7XG4gICAgICAgIC8vIFB1bGwgYSBmZXcgdGhpbmdzIGZyb20ga25vd24gbG9jYXRpb25zXG4gICAgICAgIGlmIChkYXRhLnNldHRpbmdzLnZpZXdzKSB7XG4gICAgICAgICAgb3B0cy52aWV3cyA9IGRhdGEuc2V0dGluZ3Mudmlld3M7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuc2V0dGluZ3NbJ3ZpZXcgY2FjaGUnXSkge1xuICAgICAgICAgIG9wdHMuY2FjaGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVuZG9jdW1lbnRlZCBhZnRlciBFeHByZXNzIDIsIGJ1dCBzdGlsbCB1c2FibGUsIGVzcC4gZm9yXG4gICAgICAgIC8vIGl0ZW1zIHRoYXQgYXJlIHVuc2FmZSB0byBiZSBwYXNzZWQgYWxvbmcgd2l0aCBkYXRhLCBsaWtlIGByb290YFxuICAgICAgICB2aWV3T3B0cyA9IGRhdGEuc2V0dGluZ3NbJ3ZpZXcgb3B0aW9ucyddO1xuICAgICAgICBpZiAodmlld09wdHMpIHtcbiAgICAgICAgICB1dGlscy5zaGFsbG93Q29weShvcHRzLCB2aWV3T3B0cyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEV4cHJlc3MgMiBhbmQgbG93ZXIsIHZhbHVlcyBzZXQgaW4gYXBwLmxvY2Fscywgb3IgcGVvcGxlIHdobyBqdXN0XG4gICAgICAvLyB3YW50IHRvIHBhc3Mgb3B0aW9ucyBpbiB0aGVpciBkYXRhLiBOT1RFOiBUaGVzZSB2YWx1ZXMgd2lsbCBvdmVycmlkZVxuICAgICAgLy8gYW55dGhpbmcgcHJldmlvdXNseSBzZXQgaW4gc2V0dGluZ3MgIG9yIHNldHRpbmdzWyd2aWV3IG9wdGlvbnMnXVxuICAgICAgdXRpbHMuc2hhbGxvd0NvcHlGcm9tTGlzdChvcHRzLCBkYXRhLCBfT1BUU19QQVNTQUJMRV9XSVRIX0RBVEFfRVhQUkVTUyk7XG4gICAgfVxuICAgIG9wdHMuZmlsZW5hbWUgPSBmaWxlbmFtZTtcbiAgfVxuICBlbHNlIHtcbiAgICBkYXRhID0ge307XG4gIH1cblxuICByZXR1cm4gdHJ5SGFuZGxlQ2FjaGUob3B0cywgZGF0YSwgY2IpO1xufTtcblxuLyoqXG4gKiBDbGVhciBpbnRlcm1lZGlhdGUgSmF2YVNjcmlwdCBjYWNoZS4gQ2FsbHMge0BsaW5rIENhY2hlI3Jlc2V0fS5cbiAqIEBwdWJsaWNcbiAqL1xuXG4vKipcbiAqIEVKUyB0ZW1wbGF0ZSBjbGFzc1xuICogQHB1YmxpY1xuICovXG5leHBvcnRzLlRlbXBsYXRlID0gVGVtcGxhdGU7XG5cbmV4cG9ydHMuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uICgpIHtcbiAgZXhwb3J0cy5jYWNoZS5yZXNldCgpO1xufTtcblxuZnVuY3Rpb24gVGVtcGxhdGUodGV4dCwgb3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgdGhpcy50ZW1wbGF0ZVRleHQgPSB0ZXh0O1xuICAvKiogQHR5cGUge3N0cmluZyB8IG51bGx9ICovXG4gIHRoaXMubW9kZSA9IG51bGw7XG4gIHRoaXMudHJ1bmNhdGUgPSBmYWxzZTtcbiAgdGhpcy5jdXJyZW50TGluZSA9IDE7XG4gIHRoaXMuc291cmNlID0gJyc7XG4gIG9wdGlvbnMuY2xpZW50ID0gb3B0cy5jbGllbnQgfHwgZmFsc2U7XG4gIG9wdGlvbnMuZXNjYXBlRnVuY3Rpb24gPSBvcHRzLmVzY2FwZSB8fCBvcHRzLmVzY2FwZUZ1bmN0aW9uIHx8IHV0aWxzLmVzY2FwZVhNTDtcbiAgb3B0aW9ucy5jb21waWxlRGVidWcgPSBvcHRzLmNvbXBpbGVEZWJ1ZyAhPT0gZmFsc2U7XG4gIG9wdGlvbnMuZGVidWcgPSAhIW9wdHMuZGVidWc7XG4gIG9wdGlvbnMuZmlsZW5hbWUgPSBvcHRzLmZpbGVuYW1lO1xuICBvcHRpb25zLm9wZW5EZWxpbWl0ZXIgPSBvcHRzLm9wZW5EZWxpbWl0ZXIgfHwgZXhwb3J0cy5vcGVuRGVsaW1pdGVyIHx8IF9ERUZBVUxUX09QRU5fREVMSU1JVEVSO1xuICBvcHRpb25zLmNsb3NlRGVsaW1pdGVyID0gb3B0cy5jbG9zZURlbGltaXRlciB8fCBleHBvcnRzLmNsb3NlRGVsaW1pdGVyIHx8IF9ERUZBVUxUX0NMT1NFX0RFTElNSVRFUjtcbiAgb3B0aW9ucy5kZWxpbWl0ZXIgPSBvcHRzLmRlbGltaXRlciB8fCBleHBvcnRzLmRlbGltaXRlciB8fCBfREVGQVVMVF9ERUxJTUlURVI7XG4gIG9wdGlvbnMuc3RyaWN0ID0gb3B0cy5zdHJpY3QgfHwgZmFsc2U7XG4gIG9wdGlvbnMuY29udGV4dCA9IG9wdHMuY29udGV4dDtcbiAgb3B0aW9ucy5jYWNoZSA9IG9wdHMuY2FjaGUgfHwgZmFsc2U7XG4gIG9wdGlvbnMucm1XaGl0ZXNwYWNlID0gb3B0cy5ybVdoaXRlc3BhY2U7XG4gIG9wdGlvbnMucm9vdCA9IG9wdHMucm9vdDtcbiAgb3B0aW9ucy5pbmNsdWRlciA9IG9wdHMuaW5jbHVkZXI7XG4gIG9wdGlvbnMub3V0cHV0RnVuY3Rpb25OYW1lID0gb3B0cy5vdXRwdXRGdW5jdGlvbk5hbWU7XG4gIG9wdGlvbnMubG9jYWxzTmFtZSA9IG9wdHMubG9jYWxzTmFtZSB8fCBleHBvcnRzLmxvY2Fsc05hbWUgfHwgX0RFRkFVTFRfTE9DQUxTX05BTUU7XG4gIG9wdGlvbnMudmlld3MgPSBvcHRzLnZpZXdzO1xuICBvcHRpb25zLmFzeW5jID0gb3B0cy5hc3luYztcbiAgb3B0aW9ucy5kZXN0cnVjdHVyZWRMb2NhbHMgPSBvcHRzLmRlc3RydWN0dXJlZExvY2FscztcbiAgb3B0aW9ucy5sZWdhY3lJbmNsdWRlID0gdHlwZW9mIG9wdHMubGVnYWN5SW5jbHVkZSAhPSAndW5kZWZpbmVkJyA/ICEhb3B0cy5sZWdhY3lJbmNsdWRlIDogdHJ1ZTtcblxuICBpZiAob3B0aW9ucy5zdHJpY3QpIHtcbiAgICBvcHRpb25zLl93aXRoID0gZmFsc2U7XG4gIH1cbiAgZWxzZSB7XG4gICAgb3B0aW9ucy5fd2l0aCA9IHR5cGVvZiBvcHRzLl93aXRoICE9ICd1bmRlZmluZWQnID8gb3B0cy5fd2l0aCA6IHRydWU7XG4gIH1cblxuICB0aGlzLm9wdHMgPSBvcHRpb25zO1xuXG4gIHRoaXMucmVnZXggPSB0aGlzLmNyZWF0ZVJlZ2V4KCk7XG59XG5cblRlbXBsYXRlLm1vZGVzID0ge1xuICBFVkFMOiAnZXZhbCcsXG4gIEVTQ0FQRUQ6ICdlc2NhcGVkJyxcbiAgUkFXOiAncmF3JyxcbiAgQ09NTUVOVDogJ2NvbW1lbnQnLFxuICBMSVRFUkFMOiAnbGl0ZXJhbCdcbn07XG5cblRlbXBsYXRlLnByb3RvdHlwZSA9IHtcbiAgY3JlYXRlUmVnZXg6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RyID0gX1JFR0VYX1NUUklORztcbiAgICB2YXIgZGVsaW0gPSB1dGlscy5lc2NhcGVSZWdFeHBDaGFycyh0aGlzLm9wdHMuZGVsaW1pdGVyKTtcbiAgICB2YXIgb3BlbiA9IHV0aWxzLmVzY2FwZVJlZ0V4cENoYXJzKHRoaXMub3B0cy5vcGVuRGVsaW1pdGVyKTtcbiAgICB2YXIgY2xvc2UgPSB1dGlscy5lc2NhcGVSZWdFeHBDaGFycyh0aGlzLm9wdHMuY2xvc2VEZWxpbWl0ZXIpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8lL2csIGRlbGltKVxuICAgICAgLnJlcGxhY2UoLzwvZywgb3BlbilcbiAgICAgIC5yZXBsYWNlKC8+L2csIGNsb3NlKTtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChzdHIpO1xuICB9LFxuXG4gIGNvbXBpbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICB2YXIgc3JjO1xuICAgIC8qKiBAdHlwZSB7Q2xpZW50RnVuY3Rpb259ICovXG4gICAgdmFyIGZuO1xuICAgIHZhciBvcHRzID0gdGhpcy5vcHRzO1xuICAgIHZhciBwcmVwZW5kZWQgPSAnJztcbiAgICB2YXIgYXBwZW5kZWQgPSAnJztcbiAgICAvKiogQHR5cGUge0VzY2FwZUNhbGxiYWNrfSAqL1xuICAgIHZhciBlc2NhcGVGbiA9IG9wdHMuZXNjYXBlRnVuY3Rpb247XG4gICAgLyoqIEB0eXBlIHtGdW5jdGlvbkNvbnN0cnVjdG9yfSAqL1xuICAgIHZhciBjdG9yO1xuICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgIHZhciBzYW5pdGl6ZWRGaWxlbmFtZSA9IG9wdHMuZmlsZW5hbWUgPyBKU09OLnN0cmluZ2lmeShvcHRzLmZpbGVuYW1lKSA6ICd1bmRlZmluZWQnO1xuXG4gICAgaWYgKCF0aGlzLnNvdXJjZSkge1xuICAgICAgdGhpcy5nZW5lcmF0ZVNvdXJjZSgpO1xuICAgICAgcHJlcGVuZGVkICs9XG4gICAgICAgICcgIHZhciBfX291dHB1dCA9IFwiXCI7XFxuJyArXG4gICAgICAgICcgIGZ1bmN0aW9uIF9fYXBwZW5kKHMpIHsgaWYgKHMgIT09IHVuZGVmaW5lZCAmJiBzICE9PSBudWxsKSBfX291dHB1dCArPSBzIH1cXG4nO1xuICAgICAgaWYgKG9wdHMub3V0cHV0RnVuY3Rpb25OYW1lKSB7XG4gICAgICAgIHByZXBlbmRlZCArPSAnICB2YXIgJyArIG9wdHMub3V0cHV0RnVuY3Rpb25OYW1lICsgJyA9IF9fYXBwZW5kOycgKyAnXFxuJztcbiAgICAgIH1cbiAgICAgIGlmIChvcHRzLmRlc3RydWN0dXJlZExvY2FscyAmJiBvcHRzLmRlc3RydWN0dXJlZExvY2Fscy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGRlc3RydWN0dXJpbmcgPSAnICB2YXIgX19sb2NhbHMgPSAoJyArIG9wdHMubG9jYWxzTmFtZSArICcgfHwge30pLFxcbic7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3B0cy5kZXN0cnVjdHVyZWRMb2NhbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgbmFtZSA9IG9wdHMuZGVzdHJ1Y3R1cmVkTG9jYWxzW2ldO1xuICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgZGVzdHJ1Y3R1cmluZyArPSAnLFxcbiAgJztcbiAgICAgICAgICB9XG4gICAgICAgICAgZGVzdHJ1Y3R1cmluZyArPSBuYW1lICsgJyA9IF9fbG9jYWxzLicgKyBuYW1lO1xuICAgICAgICB9XG4gICAgICAgIHByZXBlbmRlZCArPSBkZXN0cnVjdHVyaW5nICsgJztcXG4nO1xuICAgICAgfVxuICAgICAgaWYgKG9wdHMuX3dpdGggIT09IGZhbHNlKSB7XG4gICAgICAgIHByZXBlbmRlZCArPSAgJyAgd2l0aCAoJyArIG9wdHMubG9jYWxzTmFtZSArICcgfHwge30pIHsnICsgJ1xcbic7XG4gICAgICAgIGFwcGVuZGVkICs9ICcgIH0nICsgJ1xcbic7XG4gICAgICB9XG4gICAgICBhcHBlbmRlZCArPSAnICByZXR1cm4gX19vdXRwdXQ7JyArICdcXG4nO1xuICAgICAgdGhpcy5zb3VyY2UgPSBwcmVwZW5kZWQgKyB0aGlzLnNvdXJjZSArIGFwcGVuZGVkO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmNvbXBpbGVEZWJ1Zykge1xuICAgICAgc3JjID0gJ3ZhciBfX2xpbmUgPSAxJyArICdcXG4nXG4gICAgICAgICsgJyAgLCBfX2xpbmVzID0gJyArIEpTT04uc3RyaW5naWZ5KHRoaXMudGVtcGxhdGVUZXh0KSArICdcXG4nXG4gICAgICAgICsgJyAgLCBfX2ZpbGVuYW1lID0gJyArIHNhbml0aXplZEZpbGVuYW1lICsgJzsnICsgJ1xcbidcbiAgICAgICAgKyAndHJ5IHsnICsgJ1xcbidcbiAgICAgICAgKyB0aGlzLnNvdXJjZVxuICAgICAgICArICd9IGNhdGNoIChlKSB7JyArICdcXG4nXG4gICAgICAgICsgJyAgcmV0aHJvdyhlLCBfX2xpbmVzLCBfX2ZpbGVuYW1lLCBfX2xpbmUsIGVzY2FwZUZuKTsnICsgJ1xcbidcbiAgICAgICAgKyAnfScgKyAnXFxuJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzcmMgPSB0aGlzLnNvdXJjZTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5jbGllbnQpIHtcbiAgICAgIHNyYyA9ICdlc2NhcGVGbiA9IGVzY2FwZUZuIHx8ICcgKyBlc2NhcGVGbi50b1N0cmluZygpICsgJzsnICsgJ1xcbicgKyBzcmM7XG4gICAgICBpZiAob3B0cy5jb21waWxlRGVidWcpIHtcbiAgICAgICAgc3JjID0gJ3JldGhyb3cgPSByZXRocm93IHx8ICcgKyByZXRocm93LnRvU3RyaW5nKCkgKyAnOycgKyAnXFxuJyArIHNyYztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3B0cy5zdHJpY3QpIHtcbiAgICAgIHNyYyA9ICdcInVzZSBzdHJpY3RcIjtcXG4nICsgc3JjO1xuICAgIH1cbiAgICBpZiAob3B0cy5kZWJ1Zykge1xuICAgICAgY29uc29sZS5sb2coc3JjKTtcbiAgICB9XG4gICAgaWYgKG9wdHMuY29tcGlsZURlYnVnICYmIG9wdHMuZmlsZW5hbWUpIHtcbiAgICAgIHNyYyA9IHNyYyArICdcXG4nXG4gICAgICAgICsgJy8vIyBzb3VyY2VVUkw9JyArIHNhbml0aXplZEZpbGVuYW1lICsgJ1xcbic7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChvcHRzLmFzeW5jKSB7XG4gICAgICAgIC8vIEhhdmUgdG8gdXNlIGdlbmVyYXRlZCBmdW5jdGlvbiBmb3IgdGhpcywgc2luY2UgaW4gZW52cyB3aXRob3V0IHN1cHBvcnQsXG4gICAgICAgIC8vIGl0IGJyZWFrcyBpbiBwYXJzaW5nXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY3RvciA9IChuZXcgRnVuY3Rpb24oJ3JldHVybiAoYXN5bmMgZnVuY3Rpb24oKXt9KS5jb25zdHJ1Y3RvcjsnKSkoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlKSB7XG4gICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBTeW50YXhFcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGVudmlyb25tZW50IGRvZXMgbm90IHN1cHBvcnQgYXN5bmMvYXdhaXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGN0b3IgPSBGdW5jdGlvbjtcbiAgICAgIH1cbiAgICAgIGZuID0gbmV3IGN0b3Iob3B0cy5sb2NhbHNOYW1lICsgJywgZXNjYXBlRm4sIGluY2x1ZGUsIHJldGhyb3cnLCBzcmMpO1xuICAgIH1cbiAgICBjYXRjaChlKSB7XG4gICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgZWxzZVxuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBTeW50YXhFcnJvcikge1xuICAgICAgICBpZiAob3B0cy5maWxlbmFtZSkge1xuICAgICAgICAgIGUubWVzc2FnZSArPSAnIGluICcgKyBvcHRzLmZpbGVuYW1lO1xuICAgICAgICB9XG4gICAgICAgIGUubWVzc2FnZSArPSAnIHdoaWxlIGNvbXBpbGluZyBlanNcXG5cXG4nO1xuICAgICAgICBlLm1lc3NhZ2UgKz0gJ0lmIHRoZSBhYm92ZSBlcnJvciBpcyBub3QgaGVscGZ1bCwgeW91IG1heSB3YW50IHRvIHRyeSBFSlMtTGludDpcXG4nO1xuICAgICAgICBlLm1lc3NhZ2UgKz0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9SeWFuWmltL0VKUy1MaW50JztcbiAgICAgICAgaWYgKCFvcHRzLmFzeW5jKSB7XG4gICAgICAgICAgZS5tZXNzYWdlICs9ICdcXG4nO1xuICAgICAgICAgIGUubWVzc2FnZSArPSAnT3IsIGlmIHlvdSBtZWFudCB0byBjcmVhdGUgYW4gYXN5bmMgZnVuY3Rpb24sIHBhc3MgYGFzeW5jOiB0cnVlYCBhcyBhbiBvcHRpb24uJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhyb3cgZTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYSBjYWxsYWJsZSBmdW5jdGlvbiB3aGljaCB3aWxsIGV4ZWN1dGUgdGhlIGZ1bmN0aW9uXG4gICAgLy8gY3JlYXRlZCBieSB0aGUgc291cmNlLWNvZGUsIHdpdGggdGhlIHBhc3NlZCBkYXRhIGFzIGxvY2Fsc1xuICAgIC8vIEFkZHMgYSBsb2NhbCBgaW5jbHVkZWAgZnVuY3Rpb24gd2hpY2ggYWxsb3dzIGZ1bGwgcmVjdXJzaXZlIGluY2x1ZGVcbiAgICB2YXIgcmV0dXJuZWRGbiA9IG9wdHMuY2xpZW50ID8gZm4gOiBmdW5jdGlvbiBhbm9ueW1vdXMoZGF0YSkge1xuICAgICAgdmFyIGluY2x1ZGUgPSBmdW5jdGlvbiAocGF0aCwgaW5jbHVkZURhdGEpIHtcbiAgICAgICAgdmFyIGQgPSB1dGlscy5zaGFsbG93Q29weSh7fSwgZGF0YSk7XG4gICAgICAgIGlmIChpbmNsdWRlRGF0YSkge1xuICAgICAgICAgIGQgPSB1dGlscy5zaGFsbG93Q29weShkLCBpbmNsdWRlRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluY2x1ZGVGaWxlKHBhdGgsIG9wdHMpKGQpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBmbi5hcHBseShvcHRzLmNvbnRleHQsIFtkYXRhIHx8IHt9LCBlc2NhcGVGbiwgaW5jbHVkZSwgcmV0aHJvd10pO1xuICAgIH07XG4gICAgaWYgKG9wdHMuZmlsZW5hbWUgJiYgdHlwZW9mIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIGZpbGVuYW1lID0gb3B0cy5maWxlbmFtZTtcbiAgICAgIHZhciBiYXNlbmFtZSA9IHBhdGguYmFzZW5hbWUoZmlsZW5hbWUsIHBhdGguZXh0bmFtZShmaWxlbmFtZSkpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJldHVybmVkRm4sICduYW1lJywge1xuICAgICAgICAgIHZhbHVlOiBiYXNlbmFtZSxcbiAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZSkgey8qIGlnbm9yZSAqL31cbiAgICB9XG4gICAgcmV0dXJuIHJldHVybmVkRm47XG4gIH0sXG5cbiAgZ2VuZXJhdGVTb3VyY2U6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0cyA9IHRoaXMub3B0cztcblxuICAgIGlmIChvcHRzLnJtV2hpdGVzcGFjZSkge1xuICAgICAgLy8gSGF2ZSB0byB1c2UgdHdvIHNlcGFyYXRlIHJlcGxhY2UgaGVyZSBhcyBgXmAgYW5kIGAkYCBvcGVyYXRvcnMgZG9uJ3RcbiAgICAgIC8vIHdvcmsgd2VsbCB3aXRoIGBcXHJgIGFuZCBlbXB0eSBsaW5lcyBkb24ndCB3b3JrIHdlbGwgd2l0aCB0aGUgYG1gIGZsYWcuXG4gICAgICB0aGlzLnRlbXBsYXRlVGV4dCA9XG4gICAgICAgIHRoaXMudGVtcGxhdGVUZXh0LnJlcGxhY2UoL1tcXHJcXG5dKy9nLCAnXFxuJykucmVwbGFjZSgvXlxccyt8XFxzKyQvZ20sICcnKTtcbiAgICB9XG5cbiAgICAvLyBTbHVycCBzcGFjZXMgYW5kIHRhYnMgYmVmb3JlIDwlXyBhbmQgYWZ0ZXIgXyU+XG4gICAgdGhpcy50ZW1wbGF0ZVRleHQgPVxuICAgICAgdGhpcy50ZW1wbGF0ZVRleHQucmVwbGFjZSgvWyBcXHRdKjwlXy9nbSwgJzwlXycpLnJlcGxhY2UoL18lPlsgXFx0XSovZ20sICdfJT4nKTtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgbWF0Y2hlcyA9IHRoaXMucGFyc2VUZW1wbGF0ZVRleHQoKTtcbiAgICB2YXIgZCA9IHRoaXMub3B0cy5kZWxpbWl0ZXI7XG4gICAgdmFyIG8gPSB0aGlzLm9wdHMub3BlbkRlbGltaXRlcjtcbiAgICB2YXIgYyA9IHRoaXMub3B0cy5jbG9zZURlbGltaXRlcjtcblxuICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXMubGVuZ3RoKSB7XG4gICAgICBtYXRjaGVzLmZvckVhY2goZnVuY3Rpb24gKGxpbmUsIGluZGV4KSB7XG4gICAgICAgIHZhciBjbG9zaW5nO1xuICAgICAgICAvLyBJZiB0aGlzIGlzIGFuIG9wZW5pbmcgdGFnLCBjaGVjayBmb3IgY2xvc2luZyB0YWdzXG4gICAgICAgIC8vIEZJWE1FOiBNYXkgZW5kIHVwIHdpdGggc29tZSBmYWxzZSBwb3NpdGl2ZXMgaGVyZVxuICAgICAgICAvLyBCZXR0ZXIgdG8gc3RvcmUgbW9kZXMgYXMgay92IHdpdGggb3BlbkRlbGltaXRlciArIGRlbGltaXRlciBhcyBrZXlcbiAgICAgICAgLy8gVGhlbiB0aGlzIGNhbiBzaW1wbHkgY2hlY2sgYWdhaW5zdCB0aGUgbWFwXG4gICAgICAgIGlmICggbGluZS5pbmRleE9mKG8gKyBkKSA9PT0gMCAgICAgICAgLy8gSWYgaXQgaXMgYSB0YWdcbiAgICAgICAgICAmJiBsaW5lLmluZGV4T2YobyArIGQgKyBkKSAhPT0gMCkgeyAvLyBhbmQgaXMgbm90IGVzY2FwZWRcbiAgICAgICAgICBjbG9zaW5nID0gbWF0Y2hlc1tpbmRleCArIDJdO1xuICAgICAgICAgIGlmICghKGNsb3NpbmcgPT0gZCArIGMgfHwgY2xvc2luZyA9PSAnLScgKyBkICsgYyB8fCBjbG9zaW5nID09ICdfJyArIGQgKyBjKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBtYXRjaGluZyBjbG9zZSB0YWcgZm9yIFwiJyArIGxpbmUgKyAnXCIuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNlbGYuc2NhbkxpbmUobGluZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfSxcblxuICBwYXJzZVRlbXBsYXRlVGV4dDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdHIgPSB0aGlzLnRlbXBsYXRlVGV4dDtcbiAgICB2YXIgcGF0ID0gdGhpcy5yZWdleDtcbiAgICB2YXIgcmVzdWx0ID0gcGF0LmV4ZWMoc3RyKTtcbiAgICB2YXIgYXJyID0gW107XG4gICAgdmFyIGZpcnN0UG9zO1xuXG4gICAgd2hpbGUgKHJlc3VsdCkge1xuICAgICAgZmlyc3RQb3MgPSByZXN1bHQuaW5kZXg7XG5cbiAgICAgIGlmIChmaXJzdFBvcyAhPT0gMCkge1xuICAgICAgICBhcnIucHVzaChzdHIuc3Vic3RyaW5nKDAsIGZpcnN0UG9zKSk7XG4gICAgICAgIHN0ciA9IHN0ci5zbGljZShmaXJzdFBvcyk7XG4gICAgICB9XG5cbiAgICAgIGFyci5wdXNoKHJlc3VsdFswXSk7XG4gICAgICBzdHIgPSBzdHIuc2xpY2UocmVzdWx0WzBdLmxlbmd0aCk7XG4gICAgICByZXN1bHQgPSBwYXQuZXhlYyhzdHIpO1xuICAgIH1cblxuICAgIGlmIChzdHIpIHtcbiAgICAgIGFyci5wdXNoKHN0cik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjtcbiAgfSxcblxuICBfYWRkT3V0cHV0OiBmdW5jdGlvbiAobGluZSkge1xuICAgIGlmICh0aGlzLnRydW5jYXRlKSB7XG4gICAgICAvLyBPbmx5IHJlcGxhY2Ugc2luZ2xlIGxlYWRpbmcgbGluZWJyZWFrIGluIHRoZSBsaW5lIGFmdGVyXG4gICAgICAvLyAtJT4gdGFnIC0tIHRoaXMgaXMgdGhlIHNpbmdsZSwgdHJhaWxpbmcgbGluZWJyZWFrXG4gICAgICAvLyBhZnRlciB0aGUgdGFnIHRoYXQgdGhlIHRydW5jYXRpb24gbW9kZSByZXBsYWNlc1xuICAgICAgLy8gSGFuZGxlIFdpbiAvIFVuaXggLyBvbGQgTWFjIGxpbmVicmVha3MgLS0gZG8gdGhlIFxcclxcblxuICAgICAgLy8gY29tYm8gZmlyc3QgaW4gdGhlIHJlZ2V4LW9yXG4gICAgICBsaW5lID0gbGluZS5yZXBsYWNlKC9eKD86XFxyXFxufFxccnxcXG4pLywgJycpO1xuICAgICAgdGhpcy50cnVuY2F0ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIWxpbmUpIHtcbiAgICAgIHJldHVybiBsaW5lO1xuICAgIH1cblxuICAgIC8vIFByZXNlcnZlIGxpdGVyYWwgc2xhc2hlc1xuICAgIGxpbmUgPSBsaW5lLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJyk7XG5cbiAgICAvLyBDb252ZXJ0IGxpbmVicmVha3NcbiAgICBsaW5lID0gbGluZS5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJyk7XG4gICAgbGluZSA9IGxpbmUucmVwbGFjZSgvXFxyL2csICdcXFxccicpO1xuXG4gICAgLy8gRXNjYXBlIGRvdWJsZS1xdW90ZXNcbiAgICAvLyAtIHRoaXMgd2lsbCBiZSB0aGUgZGVsaW1pdGVyIGR1cmluZyBleGVjdXRpb25cbiAgICBsaW5lID0gbGluZS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJyk7XG4gICAgdGhpcy5zb3VyY2UgKz0gJyAgICA7IF9fYXBwZW5kKFwiJyArIGxpbmUgKyAnXCIpJyArICdcXG4nO1xuICB9LFxuXG4gIHNjYW5MaW5lOiBmdW5jdGlvbiAobGluZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgZCA9IHRoaXMub3B0cy5kZWxpbWl0ZXI7XG4gICAgdmFyIG8gPSB0aGlzLm9wdHMub3BlbkRlbGltaXRlcjtcbiAgICB2YXIgYyA9IHRoaXMub3B0cy5jbG9zZURlbGltaXRlcjtcbiAgICB2YXIgbmV3TGluZUNvdW50ID0gMDtcblxuICAgIG5ld0xpbmVDb3VudCA9IChsaW5lLnNwbGl0KCdcXG4nKS5sZW5ndGggLSAxKTtcblxuICAgIHN3aXRjaCAobGluZSkge1xuICAgIGNhc2UgbyArIGQ6XG4gICAgY2FzZSBvICsgZCArICdfJzpcbiAgICAgIHRoaXMubW9kZSA9IFRlbXBsYXRlLm1vZGVzLkVWQUw7XG4gICAgICBicmVhaztcbiAgICBjYXNlIG8gKyBkICsgJz0nOlxuICAgICAgdGhpcy5tb2RlID0gVGVtcGxhdGUubW9kZXMuRVNDQVBFRDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgbyArIGQgKyAnLSc6XG4gICAgICB0aGlzLm1vZGUgPSBUZW1wbGF0ZS5tb2Rlcy5SQVc7XG4gICAgICBicmVhaztcbiAgICBjYXNlIG8gKyBkICsgJyMnOlxuICAgICAgdGhpcy5tb2RlID0gVGVtcGxhdGUubW9kZXMuQ09NTUVOVDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgbyArIGQgKyBkOlxuICAgICAgdGhpcy5tb2RlID0gVGVtcGxhdGUubW9kZXMuTElURVJBTDtcbiAgICAgIHRoaXMuc291cmNlICs9ICcgICAgOyBfX2FwcGVuZChcIicgKyBsaW5lLnJlcGxhY2UobyArIGQgKyBkLCBvICsgZCkgKyAnXCIpJyArICdcXG4nO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBkICsgZCArIGM6XG4gICAgICB0aGlzLm1vZGUgPSBUZW1wbGF0ZS5tb2Rlcy5MSVRFUkFMO1xuICAgICAgdGhpcy5zb3VyY2UgKz0gJyAgICA7IF9fYXBwZW5kKFwiJyArIGxpbmUucmVwbGFjZShkICsgZCArIGMsIGQgKyBjKSArICdcIiknICsgJ1xcbic7XG4gICAgICBicmVhaztcbiAgICBjYXNlIGQgKyBjOlxuICAgIGNhc2UgJy0nICsgZCArIGM6XG4gICAgY2FzZSAnXycgKyBkICsgYzpcbiAgICAgIGlmICh0aGlzLm1vZGUgPT0gVGVtcGxhdGUubW9kZXMuTElURVJBTCkge1xuICAgICAgICB0aGlzLl9hZGRPdXRwdXQobGluZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubW9kZSA9IG51bGw7XG4gICAgICB0aGlzLnRydW5jYXRlID0gbGluZS5pbmRleE9mKCctJykgPT09IDAgfHwgbGluZS5pbmRleE9mKCdfJykgPT09IDA7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgLy8gSW4gc2NyaXB0IG1vZGUsIGRlcGVuZHMgb24gdHlwZSBvZiB0YWdcbiAgICAgIGlmICh0aGlzLm1vZGUpIHtcbiAgICAgICAgLy8gSWYgJy8vJyBpcyBmb3VuZCB3aXRob3V0IGEgbGluZSBicmVhaywgYWRkIGEgbGluZSBicmVhay5cbiAgICAgICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICAgICAgY2FzZSBUZW1wbGF0ZS5tb2Rlcy5FVkFMOlxuICAgICAgICBjYXNlIFRlbXBsYXRlLm1vZGVzLkVTQ0FQRUQ6XG4gICAgICAgIGNhc2UgVGVtcGxhdGUubW9kZXMuUkFXOlxuICAgICAgICAgIGlmIChsaW5lLmxhc3RJbmRleE9mKCcvLycpID4gbGluZS5sYXN0SW5kZXhPZignXFxuJykpIHtcbiAgICAgICAgICAgIGxpbmUgKz0gJ1xcbic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgICAgIC8vIEp1c3QgZXhlY3V0aW5nIGNvZGVcbiAgICAgICAgY2FzZSBUZW1wbGF0ZS5tb2Rlcy5FVkFMOlxuICAgICAgICAgIHRoaXMuc291cmNlICs9ICcgICAgOyAnICsgbGluZSArICdcXG4nO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIC8vIEV4ZWMsIGVzYywgYW5kIG91dHB1dFxuICAgICAgICBjYXNlIFRlbXBsYXRlLm1vZGVzLkVTQ0FQRUQ6XG4gICAgICAgICAgdGhpcy5zb3VyY2UgKz0gJyAgICA7IF9fYXBwZW5kKGVzY2FwZUZuKCcgKyBzdHJpcFNlbWkobGluZSkgKyAnKSknICsgJ1xcbic7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgLy8gRXhlYyBhbmQgb3V0cHV0XG4gICAgICAgIGNhc2UgVGVtcGxhdGUubW9kZXMuUkFXOlxuICAgICAgICAgIHRoaXMuc291cmNlICs9ICcgICAgOyBfX2FwcGVuZCgnICsgc3RyaXBTZW1pKGxpbmUpICsgJyknICsgJ1xcbic7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVGVtcGxhdGUubW9kZXMuQ09NTUVOVDpcbiAgICAgICAgICAvLyBEbyBub3RoaW5nXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgLy8gTGl0ZXJhbCA8JSUgbW9kZSwgYXBwZW5kIGFzIHJhdyBvdXRwdXRcbiAgICAgICAgY2FzZSBUZW1wbGF0ZS5tb2Rlcy5MSVRFUkFMOlxuICAgICAgICAgIHRoaXMuX2FkZE91dHB1dChsaW5lKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gSW4gc3RyaW5nIG1vZGUsIGp1c3QgYWRkIHRoZSBvdXRwdXRcbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9hZGRPdXRwdXQobGluZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNlbGYub3B0cy5jb21waWxlRGVidWcgJiYgbmV3TGluZUNvdW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnRMaW5lICs9IG5ld0xpbmVDb3VudDtcbiAgICAgIHRoaXMuc291cmNlICs9ICcgICAgOyBfX2xpbmUgPSAnICsgdGhpcy5jdXJyZW50TGluZSArICdcXG4nO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBFc2NhcGUgY2hhcmFjdGVycyByZXNlcnZlZCBpbiBYTUwuXG4gKlxuICogVGhpcyBpcyBzaW1wbHkgYW4gZXhwb3J0IG9mIHtAbGluayBtb2R1bGU6dXRpbHMuZXNjYXBlWE1MfS5cbiAqXG4gKiBJZiBgbWFya3VwYCBpcyBgdW5kZWZpbmVkYCBvciBgbnVsbGAsIHRoZSBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1hcmt1cCBJbnB1dCBzdHJpbmdcbiAqIEByZXR1cm4ge1N0cmluZ30gRXNjYXBlZCBzdHJpbmdcbiAqIEBwdWJsaWNcbiAqIEBmdW5jXG4gKiAqL1xuZXhwb3J0cy5lc2NhcGVYTUwgPSB1dGlscy5lc2NhcGVYTUw7XG5cbi8qKlxuICogRXhwcmVzcy5qcyBzdXBwb3J0LlxuICpcbiAqIFRoaXMgaXMgYW4gYWxpYXMgZm9yIHtAbGluayBtb2R1bGU6ZWpzLnJlbmRlckZpbGV9LCBpbiBvcmRlciB0byBzdXBwb3J0XG4gKiBFeHByZXNzLmpzIG91dC1vZi10aGUtYm94LlxuICpcbiAqIEBmdW5jXG4gKi9cblxuZXhwb3J0cy5fX2V4cHJlc3MgPSBleHBvcnRzLnJlbmRlckZpbGU7XG5cbi8qKlxuICogVmVyc2lvbiBvZiBFSlMuXG4gKlxuICogQHJlYWRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQHB1YmxpY1xuICovXG5cbmV4cG9ydHMuVkVSU0lPTiA9IF9WRVJTSU9OX1NUUklORztcblxuLyoqXG4gKiBOYW1lIGZvciBkZXRlY3Rpb24gb2YgRUpTLlxuICpcbiAqIEByZWFkb25seVxuICogQHR5cGUge1N0cmluZ31cbiAqIEBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLm5hbWUgPSBfTkFNRTtcblxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5pZiAodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJykge1xuICB3aW5kb3cuZWpzID0gZXhwb3J0cztcbn1cblxufSx7XCIuLi9wYWNrYWdlLmpzb25cIjo2LFwiLi91dGlsc1wiOjIsXCJmc1wiOjMsXCJwYXRoXCI6NH1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqIEVKUyBFbWJlZGRlZCBKYXZhU2NyaXB0IHRlbXBsYXRlc1xuICogQ29weXJpZ2h0IDIxMTIgTWF0dGhldyBFZXJuaXNzZSAobWRlQGZsZWVnaXgub3JnKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuKi9cblxuLyoqXG4gKiBQcml2YXRlIHV0aWxpdHkgZnVuY3Rpb25zXG4gKiBAbW9kdWxlIHV0aWxzXG4gKiBAcHJpdmF0ZVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHJlZ0V4cENoYXJzID0gL1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nO1xuXG4vKipcbiAqIEVzY2FwZSBjaGFyYWN0ZXJzIHJlc2VydmVkIGluIHJlZ3VsYXIgZXhwcmVzc2lvbnMuXG4gKlxuICogSWYgYHN0cmluZ2AgaXMgYHVuZGVmaW5lZGAgb3IgYG51bGxgLCB0aGUgZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgSW5wdXQgc3RyaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9IEVzY2FwZWQgc3RyaW5nXG4gKiBAc3RhdGljXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnRzLmVzY2FwZVJlZ0V4cENoYXJzID0gZnVuY3Rpb24gKHN0cmluZykge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKCFzdHJpbmcpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVnRXhwQ2hhcnMsICdcXFxcJCYnKTtcbn07XG5cbnZhciBfRU5DT0RFX0hUTUxfUlVMRVMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJiMzNDsnLFxuICBcIidcIjogJyYjMzk7J1xufTtcbnZhciBfTUFUQ0hfSFRNTCA9IC9bJjw+J1wiXS9nO1xuXG5mdW5jdGlvbiBlbmNvZGVfY2hhcihjKSB7XG4gIHJldHVybiBfRU5DT0RFX0hUTUxfUlVMRVNbY10gfHwgYztcbn1cblxuLyoqXG4gKiBTdHJpbmdpZmllZCB2ZXJzaW9uIG9mIGNvbnN0YW50cyB1c2VkIGJ5IHtAbGluayBtb2R1bGU6dXRpbHMuZXNjYXBlWE1MfS5cbiAqXG4gKiBJdCBpcyB1c2VkIGluIHRoZSBwcm9jZXNzIG9mIGdlbmVyYXRpbmcge0BsaW5rIENsaWVudEZ1bmN0aW9ufXMuXG4gKlxuICogQHJlYWRvbmx5XG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5cbnZhciBlc2NhcGVGdW5jU3RyID1cbiAgJ3ZhciBfRU5DT0RFX0hUTUxfUlVMRVMgPSB7XFxuJ1xuKyAnICAgICAgXCImXCI6IFwiJmFtcDtcIlxcbidcbisgJyAgICAsIFwiPFwiOiBcIiZsdDtcIlxcbidcbisgJyAgICAsIFwiPlwiOiBcIiZndDtcIlxcbidcbisgJyAgICAsIFxcJ1wiXFwnOiBcIiYjMzQ7XCJcXG4nXG4rICcgICAgLCBcIlxcJ1wiOiBcIiYjMzk7XCJcXG4nXG4rICcgICAgfVxcbidcbisgJyAgLCBfTUFUQ0hfSFRNTCA9IC9bJjw+XFwnXCJdL2c7XFxuJ1xuKyAnZnVuY3Rpb24gZW5jb2RlX2NoYXIoYykge1xcbidcbisgJyAgcmV0dXJuIF9FTkNPREVfSFRNTF9SVUxFU1tjXSB8fCBjO1xcbidcbisgJ307XFxuJztcblxuLyoqXG4gKiBFc2NhcGUgY2hhcmFjdGVycyByZXNlcnZlZCBpbiBYTUwuXG4gKlxuICogSWYgYG1hcmt1cGAgaXMgYHVuZGVmaW5lZGAgb3IgYG51bGxgLCB0aGUgZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkLlxuICpcbiAqIEBpbXBsZW1lbnRzIHtFc2NhcGVDYWxsYmFja31cbiAqIEBwYXJhbSB7U3RyaW5nfSBtYXJrdXAgSW5wdXQgc3RyaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9IEVzY2FwZWQgc3RyaW5nXG4gKiBAc3RhdGljXG4gKiBAcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZXNjYXBlWE1MID0gZnVuY3Rpb24gKG1hcmt1cCkge1xuICByZXR1cm4gbWFya3VwID09IHVuZGVmaW5lZFxuICAgID8gJydcbiAgICA6IFN0cmluZyhtYXJrdXApXG4gICAgICAucmVwbGFjZShfTUFUQ0hfSFRNTCwgZW5jb2RlX2NoYXIpO1xufTtcbmV4cG9ydHMuZXNjYXBlWE1MLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcykgKyAnO1xcbicgKyBlc2NhcGVGdW5jU3RyO1xufTtcblxuLyoqXG4gKiBOYWl2ZSBjb3B5IG9mIHByb3BlcnRpZXMgZnJvbSBvbmUgb2JqZWN0IHRvIGFub3RoZXIuXG4gKiBEb2VzIG5vdCByZWN1cnNlIGludG8gbm9uLXNjYWxhciBwcm9wZXJ0aWVzXG4gKiBEb2VzIG5vdCBjaGVjayB0byBzZWUgaWYgdGhlIHByb3BlcnR5IGhhcyBhIHZhbHVlIGJlZm9yZSBjb3B5aW5nXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSB0byAgIERlc3RpbmF0aW9uIG9iamVjdFxuICogQHBhcmFtICB7T2JqZWN0fSBmcm9tIFNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm4ge09iamVjdH0gICAgICBEZXN0aW5hdGlvbiBvYmplY3RcbiAqIEBzdGF0aWNcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydHMuc2hhbGxvd0NvcHkgPSBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgZnJvbSA9IGZyb20gfHwge307XG4gIGZvciAodmFyIHAgaW4gZnJvbSkge1xuICAgIHRvW3BdID0gZnJvbVtwXTtcbiAgfVxuICByZXR1cm4gdG87XG59O1xuXG4vKipcbiAqIE5haXZlIGNvcHkgb2YgYSBsaXN0IG9mIGtleSBuYW1lcywgZnJvbSBvbmUgb2JqZWN0IHRvIGFub3RoZXIuXG4gKiBPbmx5IGNvcGllcyBwcm9wZXJ0eSBpZiBpdCBpcyBhY3R1YWxseSBkZWZpbmVkXG4gKiBEb2VzIG5vdCByZWN1cnNlIGludG8gbm9uLXNjYWxhciBwcm9wZXJ0aWVzXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSB0byAgIERlc3RpbmF0aW9uIG9iamVjdFxuICogQHBhcmFtICB7T2JqZWN0fSBmcm9tIFNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSAge0FycmF5fSBsaXN0IExpc3Qgb2YgcHJvcGVydGllcyB0byBjb3B5XG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgRGVzdGluYXRpb24gb2JqZWN0XG4gKiBAc3RhdGljXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnRzLnNoYWxsb3dDb3B5RnJvbUxpc3QgPSBmdW5jdGlvbiAodG8sIGZyb20sIGxpc3QpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHAgPSBsaXN0W2ldO1xuICAgIGlmICh0eXBlb2YgZnJvbVtwXSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgdG9bcF0gPSBmcm9tW3BdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdG87XG59O1xuXG4vKipcbiAqIFNpbXBsZSBpbi1wcm9jZXNzIGNhY2hlIGltcGxlbWVudGF0aW9uLiBEb2VzIG5vdCBpbXBsZW1lbnQgbGltaXRzIG9mIGFueVxuICogc29ydC5cbiAqXG4gKiBAaW1wbGVtZW50cyB7Q2FjaGV9XG4gKiBAc3RhdGljXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnRzLmNhY2hlID0ge1xuICBfZGF0YToge30sXG4gIHNldDogZnVuY3Rpb24gKGtleSwgdmFsKSB7XG4gICAgdGhpcy5fZGF0YVtrZXldID0gdmFsO1xuICB9LFxuICBnZXQ6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YVtrZXldO1xuICB9LFxuICByZW1vdmU6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICBkZWxldGUgdGhpcy5fZGF0YVtrZXldO1xuICB9LFxuICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgfVxufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGh5cGhlbiBjYXNlIHZhcmlhYmxlIGludG8gY2FtZWwgY2FzZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIEh5cGhlbiBjYXNlIHN0cmluZ1xuICogQHJldHVybiB7U3RyaW5nfSBDYW1lbCBjYXNlIHN0cmluZ1xuICogQHN0YXRpY1xuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0cy5oeXBoZW5Ub0NhbWVsID0gZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLy1bYS16XS9nLCBmdW5jdGlvbiAobWF0Y2gpIHsgcmV0dXJuIG1hdGNoWzFdLnRvVXBwZXJDYXNlKCk7IH0pO1xufTtcblxufSx7fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbn0se31dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzKXtcbi8vIC5kaXJuYW1lLCAuYmFzZW5hbWUsIGFuZCAuZXh0bmFtZSBtZXRob2RzIGFyZSBleHRyYWN0ZWQgZnJvbSBOb2RlLmpzIHY4LjExLjEsXG4vLyBiYWNrcG9ydGVkIGFuZCB0cmFuc3BsaXRlZCB3aXRoIEJhYmVsLCB3aXRoIGJhY2t3YXJkcy1jb21wYXQgZml4ZXNcblxuLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIHJlc29sdmVzIC4gYW5kIC4uIGVsZW1lbnRzIGluIGEgcGF0aCBhcnJheSB3aXRoIGRpcmVjdG9yeSBuYW1lcyB0aGVyZVxuLy8gbXVzdCBiZSBubyBzbGFzaGVzLCBlbXB0eSBlbGVtZW50cywgb3IgZGV2aWNlIG5hbWVzIChjOlxcKSBpbiB0aGUgYXJyYXlcbi8vIChzbyBhbHNvIG5vIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMgLSBpdCBkb2VzIG5vdCBkaXN0aW5ndWlzaFxuLy8gcmVsYXRpdmUgYW5kIGFic29sdXRlIHBhdGhzKVxuZnVuY3Rpb24gbm9ybWFsaXplQXJyYXkocGFydHMsIGFsbG93QWJvdmVSb290KSB7XG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciBsYXN0ID0gcGFydHNbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKGFsbG93QWJvdmVSb290KSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBwYXJ0cy51bnNoaWZ0KCcuLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0cztcbn1cblxuLy8gcGF0aC5yZXNvbHZlKFtmcm9tIC4uLl0sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZXNvbHZlID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXNvbHZlZFBhdGggPSAnJyxcbiAgICAgIHJlc29sdmVkQWJzb2x1dGUgPSBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gLTEgJiYgIXJlc29sdmVkQWJzb2x1dGU7IGktLSkge1xuICAgIHZhciBwYXRoID0gKGkgPj0gMCkgPyBhcmd1bWVudHNbaV0gOiBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgLy8gU2tpcCBlbXB0eSBhbmQgaW52YWxpZCBlbnRyaWVzXG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGgucmVzb2x2ZSBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9IGVsc2UgaWYgKCFwYXRoKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXNvbHZlZFBhdGggPSBwYXRoICsgJy8nICsgcmVzb2x2ZWRQYXRoO1xuICAgIHJlc29sdmVkQWJzb2x1dGUgPSBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xuICB9XG5cbiAgLy8gQXQgdGhpcyBwb2ludCB0aGUgcGF0aCBzaG91bGQgYmUgcmVzb2x2ZWQgdG8gYSBmdWxsIGFic29sdXRlIHBhdGgsIGJ1dFxuICAvLyBoYW5kbGUgcmVsYXRpdmUgcGF0aHMgdG8gYmUgc2FmZSAobWlnaHQgaGFwcGVuIHdoZW4gcHJvY2Vzcy5jd2QoKSBmYWlscylcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcmVzb2x2ZWRQYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHJlc29sdmVkUGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFyZXNvbHZlZEFic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgcmV0dXJuICgocmVzb2x2ZWRBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHJlc29sdmVkUGF0aCkgfHwgJy4nO1xufTtcblxuLy8gcGF0aC5ub3JtYWxpemUocGF0aClcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMubm9ybWFsaXplID0gZnVuY3Rpb24ocGF0aCkge1xuICB2YXIgaXNBYnNvbHV0ZSA9IGV4cG9ydHMuaXNBYnNvbHV0ZShwYXRoKSxcbiAgICAgIHRyYWlsaW5nU2xhc2ggPSBzdWJzdHIocGF0aCwgLTEpID09PSAnLyc7XG5cbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gIHBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFpc0Fic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgaWYgKCFwYXRoICYmICFpc0Fic29sdXRlKSB7XG4gICAgcGF0aCA9ICcuJztcbiAgfVxuICBpZiAocGF0aCAmJiB0cmFpbGluZ1NsYXNoKSB7XG4gICAgcGF0aCArPSAnLyc7XG4gIH1cblxuICByZXR1cm4gKGlzQWJzb2x1dGUgPyAnLycgOiAnJykgKyBwYXRoO1xufTtcblxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5pc0Fic29sdXRlID0gZnVuY3Rpb24ocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbn07XG5cbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMuam9pbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcGF0aHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICByZXR1cm4gZXhwb3J0cy5ub3JtYWxpemUoZmlsdGVyKHBhdGhzLCBmdW5jdGlvbihwLCBpbmRleCkge1xuICAgIGlmICh0eXBlb2YgcCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLmpvaW4gbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfVxuICAgIHJldHVybiBwO1xuICB9KS5qb2luKCcvJykpO1xufTtcblxuXG4vLyBwYXRoLnJlbGF0aXZlKGZyb20sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZWxhdGl2ZSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG4gIGZyb20gPSBleHBvcnRzLnJlc29sdmUoZnJvbSkuc3Vic3RyKDEpO1xuICB0byA9IGV4cG9ydHMucmVzb2x2ZSh0bykuc3Vic3RyKDEpO1xuXG4gIGZ1bmN0aW9uIHRyaW0oYXJyKSB7XG4gICAgdmFyIHN0YXJ0ID0gMDtcbiAgICBmb3IgKDsgc3RhcnQgPCBhcnIubGVuZ3RoOyBzdGFydCsrKSB7XG4gICAgICBpZiAoYXJyW3N0YXJ0XSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIHZhciBlbmQgPSBhcnIubGVuZ3RoIC0gMTtcbiAgICBmb3IgKDsgZW5kID49IDA7IGVuZC0tKSB7XG4gICAgICBpZiAoYXJyW2VuZF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBbXTtcbiAgICByZXR1cm4gYXJyLnNsaWNlKHN0YXJ0LCBlbmQgLSBzdGFydCArIDEpO1xuICB9XG5cbiAgdmFyIGZyb21QYXJ0cyA9IHRyaW0oZnJvbS5zcGxpdCgnLycpKTtcbiAgdmFyIHRvUGFydHMgPSB0cmltKHRvLnNwbGl0KCcvJykpO1xuXG4gIHZhciBsZW5ndGggPSBNYXRoLm1pbihmcm9tUGFydHMubGVuZ3RoLCB0b1BhcnRzLmxlbmd0aCk7XG4gIHZhciBzYW1lUGFydHNMZW5ndGggPSBsZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZnJvbVBhcnRzW2ldICE9PSB0b1BhcnRzW2ldKSB7XG4gICAgICBzYW1lUGFydHNMZW5ndGggPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdmFyIG91dHB1dFBhcnRzID0gW107XG4gIGZvciAodmFyIGkgPSBzYW1lUGFydHNMZW5ndGg7IGkgPCBmcm9tUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBvdXRwdXRQYXJ0cy5wdXNoKCcuLicpO1xuICB9XG5cbiAgb3V0cHV0UGFydHMgPSBvdXRwdXRQYXJ0cy5jb25jYXQodG9QYXJ0cy5zbGljZShzYW1lUGFydHNMZW5ndGgpKTtcblxuICByZXR1cm4gb3V0cHV0UGFydHMuam9pbignLycpO1xufTtcblxuZXhwb3J0cy5zZXAgPSAnLyc7XG5leHBvcnRzLmRlbGltaXRlciA9ICc6JztcblxuZXhwb3J0cy5kaXJuYW1lID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykgcGF0aCA9IHBhdGggKyAnJztcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSByZXR1cm4gJy4nO1xuICB2YXIgY29kZSA9IHBhdGguY2hhckNvZGVBdCgwKTtcbiAgdmFyIGhhc1Jvb3QgPSBjb2RlID09PSA0NyAvKi8qLztcbiAgdmFyIGVuZCA9IC0xO1xuICB2YXIgbWF0Y2hlZFNsYXNoID0gdHJ1ZTtcbiAgZm9yICh2YXIgaSA9IHBhdGgubGVuZ3RoIC0gMTsgaSA+PSAxOyAtLWkpIHtcbiAgICBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xuICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgIGVuZCA9IGk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvclxuICAgICAgbWF0Y2hlZFNsYXNoID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaWYgKGVuZCA9PT0gLTEpIHJldHVybiBoYXNSb290ID8gJy8nIDogJy4nO1xuICBpZiAoaGFzUm9vdCAmJiBlbmQgPT09IDEpIHtcbiAgICAvLyByZXR1cm4gJy8vJztcbiAgICAvLyBCYWNrd2FyZHMtY29tcGF0IGZpeDpcbiAgICByZXR1cm4gJy8nO1xuICB9XG4gIHJldHVybiBwYXRoLnNsaWNlKDAsIGVuZCk7XG59O1xuXG5mdW5jdGlvbiBiYXNlbmFtZShwYXRoKSB7XG4gIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHBhdGggPSBwYXRoICsgJyc7XG5cbiAgdmFyIHN0YXJ0ID0gMDtcbiAgdmFyIGVuZCA9IC0xO1xuICB2YXIgbWF0Y2hlZFNsYXNoID0gdHJ1ZTtcbiAgdmFyIGk7XG5cbiAgZm9yIChpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgIGlmIChwYXRoLmNoYXJDb2RlQXQoaSkgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSBwYXRoIHNlcGFyYXRvciB0aGF0IHdhcyBub3QgcGFydCBvZiBhIHNldCBvZiBwYXRoXG4gICAgICAgIC8vIHNlcGFyYXRvcnMgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLCBzdG9wIG5vd1xuICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgIHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZW5kID09PSAtMSkge1xuICAgICAgLy8gV2Ugc2F3IHRoZSBmaXJzdCBub24tcGF0aCBzZXBhcmF0b3IsIG1hcmsgdGhpcyBhcyB0aGUgZW5kIG9mIG91clxuICAgICAgLy8gcGF0aCBjb21wb25lbnRcbiAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgICAgZW5kID0gaSArIDE7XG4gICAgfVxuICB9XG5cbiAgaWYgKGVuZCA9PT0gLTEpIHJldHVybiAnJztcbiAgcmV0dXJuIHBhdGguc2xpY2Uoc3RhcnQsIGVuZCk7XG59XG5cbi8vIFVzZXMgYSBtaXhlZCBhcHByb2FjaCBmb3IgYmFja3dhcmRzLWNvbXBhdGliaWxpdHksIGFzIGV4dCBiZWhhdmlvciBjaGFuZ2VkXG4vLyBpbiBuZXcgTm9kZS5qcyB2ZXJzaW9ucywgc28gb25seSBiYXNlbmFtZSgpIGFib3ZlIGlzIGJhY2twb3J0ZWQgaGVyZVxuZXhwb3J0cy5iYXNlbmFtZSA9IGZ1bmN0aW9uIChwYXRoLCBleHQpIHtcbiAgdmFyIGYgPSBiYXNlbmFtZShwYXRoKTtcbiAgaWYgKGV4dCAmJiBmLnN1YnN0cigtMSAqIGV4dC5sZW5ndGgpID09PSBleHQpIHtcbiAgICBmID0gZi5zdWJzdHIoMCwgZi5sZW5ndGggLSBleHQubGVuZ3RoKTtcbiAgfVxuICByZXR1cm4gZjtcbn07XG5cbmV4cG9ydHMuZXh0bmFtZSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHBhdGggPSBwYXRoICsgJyc7XG4gIHZhciBzdGFydERvdCA9IC0xO1xuICB2YXIgc3RhcnRQYXJ0ID0gMDtcbiAgdmFyIGVuZCA9IC0xO1xuICB2YXIgbWF0Y2hlZFNsYXNoID0gdHJ1ZTtcbiAgLy8gVHJhY2sgdGhlIHN0YXRlIG9mIGNoYXJhY3RlcnMgKGlmIGFueSkgd2Ugc2VlIGJlZm9yZSBvdXIgZmlyc3QgZG90IGFuZFxuICAvLyBhZnRlciBhbnkgcGF0aCBzZXBhcmF0b3Igd2UgZmluZFxuICB2YXIgcHJlRG90U3RhdGUgPSAwO1xuICBmb3IgKHZhciBpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xuICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIGEgcGF0aCBzZXBhcmF0b3IgdGhhdCB3YXMgbm90IHBhcnQgb2YgYSBzZXQgb2YgcGF0aFxuICAgICAgICAvLyBzZXBhcmF0b3JzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZywgc3RvcCBub3dcbiAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcbiAgICAgICAgICBzdGFydFBhcnQgPSBpICsgMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICBpZiAoZW5kID09PSAtMSkge1xuICAgICAgLy8gV2Ugc2F3IHRoZSBmaXJzdCBub24tcGF0aCBzZXBhcmF0b3IsIG1hcmsgdGhpcyBhcyB0aGUgZW5kIG9mIG91clxuICAgICAgLy8gZXh0ZW5zaW9uXG4gICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICAgIGVuZCA9IGkgKyAxO1xuICAgIH1cbiAgICBpZiAoY29kZSA9PT0gNDYgLyouKi8pIHtcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBvdXIgZmlyc3QgZG90LCBtYXJrIGl0IGFzIHRoZSBzdGFydCBvZiBvdXIgZXh0ZW5zaW9uXG4gICAgICAgIGlmIChzdGFydERvdCA9PT0gLTEpXG4gICAgICAgICAgc3RhcnREb3QgPSBpO1xuICAgICAgICBlbHNlIGlmIChwcmVEb3RTdGF0ZSAhPT0gMSlcbiAgICAgICAgICBwcmVEb3RTdGF0ZSA9IDE7XG4gICAgfSBlbHNlIGlmIChzdGFydERvdCAhPT0gLTEpIHtcbiAgICAgIC8vIFdlIHNhdyBhIG5vbi1kb3QgYW5kIG5vbi1wYXRoIHNlcGFyYXRvciBiZWZvcmUgb3VyIGRvdCwgc28gd2Ugc2hvdWxkXG4gICAgICAvLyBoYXZlIGEgZ29vZCBjaGFuY2UgYXQgaGF2aW5nIGEgbm9uLWVtcHR5IGV4dGVuc2lvblxuICAgICAgcHJlRG90U3RhdGUgPSAtMTtcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhcnREb3QgPT09IC0xIHx8IGVuZCA9PT0gLTEgfHxcbiAgICAgIC8vIFdlIHNhdyBhIG5vbi1kb3QgY2hhcmFjdGVyIGltbWVkaWF0ZWx5IGJlZm9yZSB0aGUgZG90XG4gICAgICBwcmVEb3RTdGF0ZSA9PT0gMCB8fFxuICAgICAgLy8gVGhlIChyaWdodC1tb3N0KSB0cmltbWVkIHBhdGggY29tcG9uZW50IGlzIGV4YWN0bHkgJy4uJ1xuICAgICAgcHJlRG90U3RhdGUgPT09IDEgJiYgc3RhcnREb3QgPT09IGVuZCAtIDEgJiYgc3RhcnREb3QgPT09IHN0YXJ0UGFydCArIDEpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgcmV0dXJuIHBhdGguc2xpY2Uoc3RhcnREb3QsIGVuZCk7XG59O1xuXG5mdW5jdGlvbiBmaWx0ZXIgKHhzLCBmKSB7XG4gICAgaWYgKHhzLmZpbHRlcikgcmV0dXJuIHhzLmZpbHRlcihmKTtcbiAgICB2YXIgcmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZih4c1tpXSwgaSwgeHMpKSByZXMucHVzaCh4c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbi8vIFN0cmluZy5wcm90b3R5cGUuc3Vic3RyIC0gbmVnYXRpdmUgaW5kZXggZG9uJ3Qgd29yayBpbiBJRThcbnZhciBzdWJzdHIgPSAnYWInLnN1YnN0cigtMSkgPT09ICdiJ1xuICAgID8gZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikgeyByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKSB9XG4gICAgOiBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7XG4gICAgICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gc3RyLmxlbmd0aCArIHN0YXJ0O1xuICAgICAgICByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKTtcbiAgICB9XG47XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpKVxufSx7XCJfcHJvY2Vzc1wiOjV9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cbn0se31dLDY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJlanNcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkVtYmVkZGVkIEphdmFTY3JpcHQgdGVtcGxhdGVzXCIsXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwidGVtcGxhdGVcIixcbiAgICBcImVuZ2luZVwiLFxuICAgIFwiZWpzXCJcbiAgXSxcbiAgXCJ2ZXJzaW9uXCI6IFwiMy4xLjZcIixcbiAgXCJhdXRob3JcIjogXCJNYXR0aGV3IEVlcm5pc3NlIDxtZGVAZmxlZWdpeC5vcmc+IChodHRwOi8vZmxlZWdpeC5vcmcpXCIsXG4gIFwibGljZW5zZVwiOiBcIkFwYWNoZS0yLjBcIixcbiAgXCJiaW5cIjoge1xuICAgIFwiZWpzXCI6IFwiLi9iaW4vY2xpLmpzXCJcbiAgfSxcbiAgXCJtYWluXCI6IFwiLi9saWIvZWpzLmpzXCIsXG4gIFwianNkZWxpdnJcIjogXCJlanMubWluLmpzXCIsXG4gIFwidW5wa2dcIjogXCJlanMubWluLmpzXCIsXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJnaXQ6Ly9naXRodWIuY29tL21kZS9lanMuZ2l0XCJcbiAgfSxcbiAgXCJidWdzXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL21kZS9lanMvaXNzdWVzXCIsXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGh1Yi5jb20vbWRlL2Vqc1wiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJqYWtlXCI6IFwiXjEwLjYuMVwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImJyb3dzZXJpZnlcIjogXCJeMTYuNS4xXCIsXG4gICAgXCJlc2xpbnRcIjogXCJeNi44LjBcIixcbiAgICBcImdpdC1kaXJlY3RvcnktZGVwbG95XCI6IFwiXjEuNS4xXCIsXG4gICAgXCJqc2RvY1wiOiBcIl4zLjYuNFwiLFxuICAgIFwibHJ1LWNhY2hlXCI6IFwiXjQuMC4xXCIsXG4gICAgXCJtb2NoYVwiOiBcIl43LjEuMVwiLFxuICAgIFwidWdsaWZ5LWpzXCI6IFwiXjMuMy4xNlwiXG4gIH0sXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiPj0wLjEwLjBcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwidGVzdFwiOiBcIm1vY2hhXCJcbiAgfVxufVxuXG59LHt9XX0se30sWzFdKSgxKVxufSk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufSIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IEdsb2JhbCBmcm9tICcuL21vZHVsZS9nbG9iYWwnO1xyXG5pbXBvcnQgUGFyYW0gZnJvbSAnLi9tb2R1bGUvcGFyYW0nO1xyXG5pbXBvcnQgKiBhcyBlanMgZnJvbSAnZWpzL2Vqcyc7XHJcbmNvbnNvbGUubG9nKFwiZW52XCIsIEdsb2JhbC5lbnYpO1xyXG5jb25zb2xlLmxvZyhgJHtQYXJhbS5nZXRBbGwod2luZG93LmxvY2F0aW9uLmhyZWYpfWApO1xyXG52YXIgdGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29tbWVudHMnKS5pbm5lckhUTUw7XHJcbnZhciBodG1sID0gZWpzLnJlbmRlcih0ZW1wbGF0ZSwgeyBjb21tZW50czogW3sgdXNlcjogXCIxMjNcIiwgcG9zdGRhdGU6IFwiMjAxOVwiLCBkZXRhaWw6IFwieHh4eHh4eHh4eFwiIH1dIH0pXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaXN0JykuaW5uZXJIVE1MID0gaHRtbDtcclxuIl0sIm5hbWVzIjpbIkdsb2JhbCIsImVudiIsImNvbnNvbGUiLCJsb2ciLCJQYXJhbSIsInVybCIsInF1ZXJ5IiwiaSIsInBhcmFtcyIsInBhcmFtIiwiaW5kZXhPZiIsInNwbGl0IiwibGVuZ3RoIiwia2V5Iiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwicmVwbGFjZSIsInJlZ2V4IiwiUmVnRXhwIiwicmVzdWx0cyIsImV4ZWMiLCJkZWNvZGVVUklDb21wb25lbnQiLCJ0ZXN0IiwiZWpzIiwiZ2V0QWxsIiwidGVtcGxhdGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpbm5lckhUTUwiLCJodG1sIiwicmVuZGVyIiwiY29tbWVudHMiLCJ1c2VyIiwicG9zdGRhdGUiLCJkZXRhaWwiXSwic291cmNlUm9vdCI6IiJ9