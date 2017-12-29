LGulp v1.0快速脚手架配置
==========
轻量级的脚手架配置，快速进入web前端开发阶段
## 描述
目录：
```
...
dev：测试环境
public：正式环境
src：开发环境
...
```
src分为：
```
...
css：样式存放目录
html：页面存放目录
img：图片存放目录
js：脚本存放目录
lib：常用库存放目录
...
```
## 功能
```
...
1、监听文件变换并同步至dev、public，不包含本地服务启动，本人使用browser-sync（全局安装）进行静态资源的启动
2、js文件夹内的文件统一合并压缩成index.js（由于css由重构负责，脚手架弱化css预处理和后处理）
3、js文件夹内的文件在html中自动生成版本号参数
...
```
在日常开发过程中经常会遇到文件改动后进行发布，由于缓存的原因导致移动端调试无法确认文件是否是最新，虽然已经添加了版本号，但是并不能直观的在移动端中打印出来，本脚手架配置借助gulp-preprocess，通过构建过程中注入version变量，让版本信息可以随时存在js文件的任意位置，使用方法如下：
```
使用/* @echo version */标识注入版本变量至脚本的任意位置
...
var version="/* @echo version */";
...
文件推至dev、public中（脚手架配置默认使用时间作为参数）
...
var version="2017-12-28 15:58:10";
...
//随时使用恰当的方式打印出来
console.log(version);
alert(version);
$().html(version);
```
## 启动及监听
构建及监听：
```
gulp
```
启动页面：
```
1、命令：browser-sync start --server --files "index.html" 
2、浏览器会打开类似http://localhost:3000
2、地址栏修改url：
测试：http://localhost:3000/dev/html/index.html
正式：http://localhost:3000/public/html/index.html
```
## 注意
* 为保证js自动生成版本号功能不污染js文件名，本人特殊处理过node_modules内文件，使用时请勿重新npm install。
* 由于js文件夹内的文件统一合并压缩成index.js，html中关于js文件夹只需要引人index.js即可。

