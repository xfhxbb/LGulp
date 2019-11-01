!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";let r={env:"local"};console.log("Global",r)},function(e,t,n){"use strict"},function(e,t,n){var r;e.exports=function e(t,n,i){function o(c,a){if(!n[c]){if(!t[c]){if(!a&&"function"==typeof r&&r)return r(c,!0);if(s)return s(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[c]={exports:{}};t[c][0].call(l.exports,(function(e){var n=t[c][1][e];return o(n||e)}),l,l.exports,e,t,n,i)}return n[c].exports}for(var s="function"==typeof r&&r,c=0;c<i.length;c++)o(i[c]);return o}({1:[function(e,t,n){"use strict";
/**
 * @file Embedded JavaScript templating engine. {@link http://ejs.co}
 * @author Matthew Eernisse <mde@fleegix.org>
 * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
 * @project EJS
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
 */var r=e("fs"),i=e("path"),o=e("./utils"),s=!1,c=e("../package.json").version,a="<",u=">",l="%",p="locals",f=["delimiter","scope","context","debug","compileDebug","client","_with","rmWhitespace","strict","filename","async"],h=f.concat("cache"),m=/^\uFEFF/;function d(e,t){var i,o,s=t.views,c=/^[A-Za-z]+:\\|^\//.exec(e);if(c&&c.length)i=n.resolveInclude(e.replace(/^\/*/,""),t.root||"/",!0);else if(t.filename&&(o=n.resolveInclude(e,t.filename),r.existsSync(o)&&(i=o)),i||Array.isArray(s)&&s.some((function(t){return o=n.resolveInclude(e,t,!0),r.existsSync(o)}))&&(i=o),!i)throw new Error('Could not find the include file "'+t.escapeFunction(e)+'"');return i}function g(e,t){var r,i=e.filename,o=arguments.length>1;if(e.cache){if(!i)throw new Error("cache option requires a filename");if(r=n.cache.get(i))return r;o||(t=_(i).toString().replace(m,""))}else if(!o){if(!i)throw new Error("Internal EJS error: no file name or template provided");t=_(i).toString().replace(m,"")}return r=n.compile(t,e),e.cache&&n.cache.set(i,r),r}function v(e,t,r){var i;if(!r){if("function"==typeof n.promiseImpl)return new n.promiseImpl((function(n,r){try{n(i=g(e)(t))}catch(e){r(e)}}));throw new Error("Please provide a callback function")}try{i=g(e)(t)}catch(e){return r(e)}r(null,i)}function _(e){return n.fileLoader(e)}function y(e,t,n,r,i){var o=t.split("\n"),s=Math.max(r-3,0),c=Math.min(o.length,r+3),a=i(n),u=o.slice(s,c).map((function(e,t){var n=t+s+1;return(n==r?" >> ":"    ")+n+"| "+e})).join("\n");throw e.path=a,e.message=(a||"ejs")+":"+r+"\n"+u+"\n\n"+e.message,e}function w(e){return e.replace(/;(\s*$)/,"$1")}function b(e,t){t=t||{};var r={};this.templateText=e,this.mode=null,this.truncate=!1,this.currentLine=1,this.source="",this.dependencies=[],r.client=t.client||!1,r.escapeFunction=t.escape||t.escapeFunction||o.escapeXML,r.compileDebug=!1!==t.compileDebug,r.debug=!!t.debug,r.filename=t.filename,r.openDelimiter=t.openDelimiter||n.openDelimiter||a,r.closeDelimiter=t.closeDelimiter||n.closeDelimiter||u,r.delimiter=t.delimiter||n.delimiter||l,r.strict=t.strict||!1,r.context=t.context,r.cache=t.cache||!1,r.rmWhitespace=t.rmWhitespace,r.root=t.root,r.outputFunctionName=t.outputFunctionName,r.localsName=t.localsName||n.localsName||p,r.views=t.views,r.async=t.async,r.strict?r._with=!1:r._with=void 0===t._with||t._with,this.opts=r,this.regex=this.createRegex()}n.cache=o.cache,n.fileLoader=r.readFileSync,n.localsName=p,n.promiseImpl=new Function("return this;")().Promise,n.resolveInclude=function(e,t,n){var r=i.dirname,o=i.extname,s=(0,i.resolve)(n?t:r(t),e);return o(e)||(s+=".ejs"),s},n.compile=function(e,t){return t&&t.scope&&(s||(console.warn("`scope` option is deprecated and will be removed in EJS 3"),s=!0),t.context||(t.context=t.scope),delete t.scope),new b(e,t).compile()},n.render=function(e,t,n){var r=t||{},i=n||{};return 2==arguments.length&&o.shallowCopyFromList(i,r,f),g(i,e)(r)},n.renderFile=function(){var e,t,n,r=Array.prototype.slice.call(arguments),i=r.shift(),s={filename:i};return"function"==typeof arguments[arguments.length-1]&&(e=r.pop()),r.length?(t=r.shift(),r.length?o.shallowCopy(s,r.pop()):(t.settings&&(t.settings.views&&(s.views=t.settings.views),t.settings["view cache"]&&(s.cache=!0),(n=t.settings["view options"])&&o.shallowCopy(s,n)),o.shallowCopyFromList(s,t,h)),s.filename=i):t={},v(s,t,e)},n.Template=b,n.clearCache=function(){n.cache.reset()},b.modes={EVAL:"eval",ESCAPED:"escaped",RAW:"raw",COMMENT:"comment",LITERAL:"literal"},b.prototype={createRegex:function(){var e="(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)",t=o.escapeRegExpChars(this.opts.delimiter),n=o.escapeRegExpChars(this.opts.openDelimiter),r=o.escapeRegExpChars(this.opts.closeDelimiter);return e=e.replace(/%/g,t).replace(/</g,n).replace(/>/g,r),new RegExp(e)},compile:function(){var e,t,n,r=this.opts,i="",s="",c=r.escapeFunction;this.source||(this.generateSource(),i+="  var __output = [], __append = __output.push.bind(__output);\n",r.outputFunctionName&&(i+="  var "+r.outputFunctionName+" = __append;\n"),!1!==r._with&&(i+="  with ("+r.localsName+" || {}) {\n",s+="  }\n"),s+='  return __output.join("");\n',this.source=i+this.source+s),e=r.compileDebug?"var __line = 1\n  , __lines = "+JSON.stringify(this.templateText)+"\n  , __filename = "+(r.filename?JSON.stringify(r.filename):"undefined")+";\ntry {\n"+this.source+"} catch (e) {\n  rethrow(e, __lines, __filename, __line, escapeFn);\n}\n":this.source,r.client&&(e="escapeFn = escapeFn || "+c.toString()+";\n"+e,r.compileDebug&&(e="rethrow = rethrow || "+y.toString()+";\n"+e)),r.strict&&(e='"use strict";\n'+e),r.debug&&console.log(e);try{if(r.async)try{n=new Function("return (async function(){}).constructor;")()}catch(e){throw e instanceof SyntaxError?new Error("This environment does not support async/await"):e}else n=Function;t=new n(r.localsName+", escapeFn, include, rethrow",e)}catch(e){throw e instanceof SyntaxError&&(r.filename&&(e.message+=" in "+r.filename),e.message+=" while compiling ejs\n\n",e.message+="If the above error is not helpful, you may want to try EJS-Lint:\n",e.message+="https://github.com/RyanZim/EJS-Lint",e.async||(e.message+="\n",e.message+="Or, if you meant to create an async function, pass async: true as an option.")),e}if(r.client)return t.dependencies=this.dependencies,t;var a=function(e){return t.apply(r.context,[e||{},c,function(t,n){var i=o.shallowCopy({},e);return n&&(i=o.shallowCopy(i,n)),function(e,t){var n=o.shallowCopy({},t);return n.filename=d(e,n),g(n)}(t,r)(i)},y])};return a.dependencies=this.dependencies,a},generateSource:function(){this.opts.rmWhitespace&&(this.templateText=this.templateText.replace(/[\r\n]+/g,"\n").replace(/^\s+|\s+$/gm,"")),this.templateText=this.templateText.replace(/[ \t]*<%_/gm,"<%_").replace(/_%>[ \t]*/gm,"_%>");var e=this,t=this.parseTemplateText(),r=this.opts.delimiter,i=this.opts.openDelimiter,s=this.opts.closeDelimiter;t&&t.length&&t.forEach((function(c,a){var u,l,p,f,h,g;if(0===c.indexOf(i+r)&&0!==c.indexOf(i+r+r)&&(l=t[a+2])!=r+s&&l!="-"+r+s&&l!="_"+r+s)throw new Error('Could not find matching close tag for "'+c+'".');if((p=c.match(/^\s*include\s+(\S+)/))&&(u=t[a-1])&&(u==i+r||u==i+r+"-"||u==i+r+"_"))return f=o.shallowCopy({},e.opts),h=function(e,t){var n,r,i=o.shallowCopy({},t);r=_(n=d(e,i)).toString().replace(m,""),i.filename=n;var s=new b(r,i);return s.generateSource(),{source:s.source,filename:n,template:r}}(p[1],f),g=e.opts.compileDebug?"    ; (function(){\n      var __line = 1\n      , __lines = "+JSON.stringify(h.template)+"\n      , __filename = "+JSON.stringify(h.filename)+";\n      try {\n"+h.source+"      } catch (e) {\n        rethrow(e, __lines, __filename, __line, escapeFn);\n      }\n    ; }).call(this)\n":"    ; (function(){\n"+h.source+"    ; }).call(this)\n",e.source+=g,void e.dependencies.push(n.resolveInclude(p[1],f.filename));e.scanLine(c)}))},parseTemplateText:function(){for(var e,t=this.templateText,n=this.regex,r=n.exec(t),i=[];r;)0!==(e=r.index)&&(i.push(t.substring(0,e)),t=t.slice(e)),i.push(r[0]),t=t.slice(r[0].length),r=n.exec(t);return t&&i.push(t),i},_addOutput:function(e){if(this.truncate&&(e=e.replace(/^(?:\r\n|\r|\n)/,""),this.truncate=!1),!e)return e;e=(e=(e=(e=e.replace(/\\/g,"\\\\")).replace(/\n/g,"\\n")).replace(/\r/g,"\\r")).replace(/"/g,'\\"'),this.source+='    ; __append("'+e+'")\n'},scanLine:function(e){var t,n=this.opts.delimiter,r=this.opts.openDelimiter,i=this.opts.closeDelimiter;switch(t=e.split("\n").length-1,e){case r+n:case r+n+"_":this.mode=b.modes.EVAL;break;case r+n+"=":this.mode=b.modes.ESCAPED;break;case r+n+"-":this.mode=b.modes.RAW;break;case r+n+"#":this.mode=b.modes.COMMENT;break;case r+n+n:this.mode=b.modes.LITERAL,this.source+='    ; __append("'+e.replace(r+n+n,r+n)+'")\n';break;case n+n+i:this.mode=b.modes.LITERAL,this.source+='    ; __append("'+e.replace(n+n+i,n+i)+'")\n';break;case n+i:case"-"+n+i:case"_"+n+i:this.mode==b.modes.LITERAL&&this._addOutput(e),this.mode=null,this.truncate=0===e.indexOf("-")||0===e.indexOf("_");break;default:if(this.mode){switch(this.mode){case b.modes.EVAL:case b.modes.ESCAPED:case b.modes.RAW:e.lastIndexOf("//")>e.lastIndexOf("\n")&&(e+="\n")}switch(this.mode){case b.modes.EVAL:this.source+="    ; "+e+"\n";break;case b.modes.ESCAPED:this.source+="    ; __append(escapeFn("+w(e)+"))\n";break;case b.modes.RAW:this.source+="    ; __append("+w(e)+")\n";break;case b.modes.COMMENT:break;case b.modes.LITERAL:this._addOutput(e)}}else this._addOutput(e)}this.opts.compileDebug&&t&&(this.currentLine+=t,this.source+="    ; __line = "+this.currentLine+"\n")}},n.escapeXML=o.escapeXML,n.__express=n.renderFile,e.extensions&&(e.extensions[".ejs"]=function(e,t){console.log("Deprecated: this API will go away in EJS v2.8");var r=t||e.filename,i={filename:r,client:!0},o=_(r).toString(),s=n.compile(o,i);e._compile("module.exports = "+s.toString()+";",r)}),n.VERSION=c,n.name="ejs","undefined"!=typeof window&&(window.ejs=n)},{"../package.json":6,"./utils":2,fs:3,path:4}],2:[function(e,t,n){"use strict";var r=/[|\\{}()[\]^$+*?.]/g;n.escapeRegExpChars=function(e){return e?String(e).replace(r,"\\$&"):""};var i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},o=/[&<>'"]/g;function s(e){return i[e]||e}n.escapeXML=function(e){return null==e?"":String(e).replace(o,s)},n.escapeXML.toString=function(){return Function.prototype.toString.call(this)+';\nvar _ENCODE_HTML_RULES = {\n      "&": "&amp;"\n    , "<": "&lt;"\n    , ">": "&gt;"\n    , \'"\': "&#34;"\n    , "\'": "&#39;"\n    }\n  , _MATCH_HTML = /[&<>\'"]/g;\nfunction encode_char(c) {\n  return _ENCODE_HTML_RULES[c] || c;\n};\n'},n.shallowCopy=function(e,t){for(var n in t=t||{})e[n]=t[n];return e},n.shallowCopyFromList=function(e,t,n){for(var r=0;r<n.length;r++){var i=n[r];void 0!==t[i]&&(e[i]=t[i])}return e},n.cache={_data:{},set:function(e,t){this._data[e]=t},get:function(e){return this._data[e]},remove:function(e){delete this._data[e]},reset:function(){this._data={}}}},{}],3:[function(e,t,n){},{}],4:[function(e,t,n){(function(e){function t(e,t){for(var n=0,r=e.length-1;r>=0;r--){var i=e[r];"."===i?e.splice(r,1):".."===i?(e.splice(r,1),n++):n&&(e.splice(r,1),n--)}if(t)for(;n--;n)e.unshift("..");return e}var r=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,i=function(e){return r.exec(e).slice(1)};function o(e,t){if(e.filter)return e.filter(t);for(var n=[],r=0;r<e.length;r++)t(e[r],r,e)&&n.push(e[r]);return n}n.resolve=function(){for(var n="",r=!1,i=arguments.length-1;i>=-1&&!r;i--){var s=i>=0?arguments[i]:e.cwd();if("string"!=typeof s)throw new TypeError("Arguments to path.resolve must be strings");s&&(n=s+"/"+n,r="/"===s.charAt(0))}return(r?"/":"")+(n=t(o(n.split("/"),(function(e){return!!e})),!r).join("/"))||"."},n.normalize=function(e){var r=n.isAbsolute(e),i="/"===s(e,-1);return(e=t(o(e.split("/"),(function(e){return!!e})),!r).join("/"))||r||(e="."),e&&i&&(e+="/"),(r?"/":"")+e},n.isAbsolute=function(e){return"/"===e.charAt(0)},n.join=function(){var e=Array.prototype.slice.call(arguments,0);return n.normalize(o(e,(function(e,t){if("string"!=typeof e)throw new TypeError("Arguments to path.join must be strings");return e})).join("/"))},n.relative=function(e,t){function r(e){for(var t=0;t<e.length&&""===e[t];t++);for(var n=e.length-1;n>=0&&""===e[n];n--);return t>n?[]:e.slice(t,n-t+1)}e=n.resolve(e).substr(1),t=n.resolve(t).substr(1);for(var i=r(e.split("/")),o=r(t.split("/")),s=Math.min(i.length,o.length),c=s,a=0;a<s;a++)if(i[a]!==o[a]){c=a;break}var u=[];for(a=c;a<i.length;a++)u.push("..");return(u=u.concat(o.slice(c))).join("/")},n.sep="/",n.delimiter=":",n.dirname=function(e){var t=i(e),n=t[0],r=t[1];return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."},n.basename=function(e,t){var n=i(e)[2];return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},n.extname=function(e){return i(e)[3]};var s="b"==="ab".substr(-1)?function(e,t,n){return e.substr(t,n)}:function(e,t,n){return t<0&&(t=e.length+t),e.substr(t,n)}}).call(this,e("_process"))},{_process:5}],5:[function(e,t,n){var r,i,o=t.exports={};function s(){throw new Error("setTimeout has not been defined")}function c(){throw new Error("clearTimeout has not been defined")}function a(e){if(r===setTimeout)return setTimeout(e,0);if((r===s||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:s}catch(e){r=s}try{i="function"==typeof clearTimeout?clearTimeout:c}catch(e){i=c}}();var u,l=[],p=!1,f=-1;function h(){p&&u&&(p=!1,u.length?l=u.concat(l):f=-1,l.length&&m())}function m(){if(!p){var e=a(h);p=!0;for(var t=l.length;t;){for(u=l,l=[];++f<t;)u&&u[f].run();f=-1,t=l.length}u=null,p=!1,function(e){if(i===clearTimeout)return clearTimeout(e);if((i===c||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(e);try{i(e)}catch(t){try{return i.call(null,e)}catch(t){return i.call(this,e)}}}(e)}}function d(e,t){this.fun=e,this.array=t}function g(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new d(e,t)),1!==l.length||p||a(m)},d.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=g,o.addListener=g,o.once=g,o.off=g,o.removeListener=g,o.removeAllListeners=g,o.emit=g,o.prependListener=g,o.prependOnceListener=g,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},{}],6:[function(e,t,n){t.exports={name:"ejs",description:"Embedded JavaScript templates",keywords:["template","engine","ejs"],version:"2.7.0",author:"Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",contributors:["Timothy Gu <timothygu99@gmail.com> (https://timothygu.github.io)"],license:"Apache-2.0",main:"./lib/ejs.js",repository:{type:"git",url:"git://github.com/mde/ejs.git"},bugs:"https://github.com/mde/ejs/issues",homepage:"https://github.com/mde/ejs",dependencies:{},devDependencies:{browserify:"^13.1.1",eslint:"^4.14.0","git-directory-deploy":"^1.5.1",istanbul:"~0.4.3",jake:"^8.0.16",jsdoc:"^3.4.0","lru-cache":"^4.0.1",mocha:"^5.0.5","uglify-js":"^3.3.16"},engines:{node:">=0.10.0"},scripts:{test:"jake test",lint:'eslint "**/*.js" Jakefile',coverage:"istanbul cover node_modules/mocha/bin/_mocha",doc:"jake doc",devdoc:"jake doc[dev]"}}},{}]},{},[1])(1)},function(e,t,n){e.exports=n(4)},function(e,t,n){"use strict";n.r(t);n(0),n(1);var r=n(2),i=n.n(r);console.log("sssssssssssssssaaaaa");var o=document.querySelector("#comments").innerHTML,s=i.a.render(o,{comments:[{user:"123",postdate:"2019",detail:"xxxxxxxxxx"}]});document.querySelector("#list").innerHTML=s}]);