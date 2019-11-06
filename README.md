LGulp 快速脚手架配置
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
├── module      模块存放路径
lib：常用库存放目录
...
```
## 功能
```
...
1、监听文件变换并同步至dev、public，自动使用browser-sync进行静态资源的启动
2、js使用es6方式进行编写，项目入口文件在gulp-task/config.js中进行管理
3、静态文件在html中自动生成版本号参数
...
```

## 启动及监听
构建及监听：
```
npm run dev

