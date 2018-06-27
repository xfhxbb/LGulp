 'use strict';
 import gulp from 'gulp';
 /*======= 文件删除 ======*/
 import del from 'del';
 /*======= 任务排序 ======*/
 import runSequence from 'run-sequence';
 /*======= 合并文件 ======*/
 import concat from 'gulp-concat';
 /*======= 文件MD5时间戳 ======*/
 import revCollector from 'gulp-rev-collector';
 import child_process from 'child_process';
 import requireDir    from 'require-dir';

 requireDir('./gulp-task');


 /*======= css ======*/
 gulp.task('css', function() {
     return gulp.src(['./src/css/**/*'])
         .pipe(gulp.dest('./dev/css'))
         .pipe(gulp.dest('./public/css'))
 });
 /*======= lib ======*/
 gulp.task('lib', function() {
     return gulp.src(['./src/lib/**/*'])
         .pipe(gulp.dest('./dev/lib'))
         .pipe(gulp.dest('./public/lib'))
 });

 /*======= img ======*/
 gulp.task('img', function() {
     return gulp.src(['./src/img/**/*'])
         .pipe(gulp.dest('./dev/img'))
         .pipe(gulp.dest('./public/img'))
 });

 gulp.task('revHtml', function() {
     return gulp.src(['./src/rev/*.json', './src/html/*']) //- 读取 rev-manifest.json 文件以及需要进行路径替换的文件
         .pipe(revCollector({
             replaceReved: true
         })) //- 执行文件内路径的替换
         .pipe(gulp.dest('./dev/html/')) //- 替换后的文件输出的目录
         .pipe(gulp.dest('./public/html/')); //- 替换后的文件输出的目录
 });


 gulp.task('clean', function() {
     return del(['./dev/js/**/*', './public/js/**/*', './dev/html/**/*', './public/html/**/*', './dev/css/**/*', './public/css/**/*']);
 });

 gulp.task('run', ['clean'], function() {
     return runSequence(['lib', 'img', 'css', 'js'], ['revHtml'], ['watch']);
 });

 gulp.task('watch', function() {
     gulp.watch('src/lib/**/*', ['lib']);
     gulp.watch('src/css/**/*', ['css']);
     gulp.watch('src/img/**/*', ['img']);
     gulp.watch('src/js/**/*', ['run']);
     gulp.watch('src/html/*.html', ['revHtml']);
 });

 /*
  * auto restart gulp
  **/
 gulp.task('default', () => {
     let process,
         restart = function() {
             process && process.kill();
             process = child_process.spawn('gulp.cmd', ['run'], {
                 stdio: 'inherit'
             });
         };

     gulp.watch(['gulpfile.babel.js', './gulp-task/*.js'], restart);
     restart();
 });
 //gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
 //gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
 //gulp.dest(path[, options]) 处理完后文件生成路径
