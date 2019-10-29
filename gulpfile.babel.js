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

 gulp.task('html', function() {
    return gulp.src(['./src/html/**/*'])
    .pipe(gulp.dest('./dev/html'))
    .pipe(gulp.dest('./public/html'));
 });


 gulp.task('clean', function() {
     return del(['./dev/js/**/*', './public/js/**/*', './dev/html/**/*', './public/html/**/*', './dev/css/**/*', './public/css/**/*']);
 });
 gulp.task('cleanjs', function() {
     return del(['./dev/js/**/*', './public/js/**/*']);
 });

 gulp.task('run', ['clean'], function() {
     return runSequence(['lib', 'img', 'css', 'buildjs'], ['html'], ['watch']);
 });

 gulp.task('buildjs',['cleanjs'], function() {
     return runSequence(['js']);
 });

 gulp.task('watch', function() {
     gulp.watch('src/lib/**/*', ['lib']);
     gulp.watch('src/css/**/*', ['css']);
     gulp.watch('src/img/**/*', ['img']);
     gulp.watch('src/js/**/*', ['buildjs']);
     gulp.watch('src/html/*.html', ['html']);
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
