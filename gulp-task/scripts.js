'use strict';
import gulp  from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
/*======= 增加文件头尾 ======*/
import header from 'gulp-header';
import pkg from '../package.json';
/*======= 语法检测 ======*/
import jshint from 'gulp-jshint';
import stylish from 'jshint-stylish';
/*======= 压缩重命名 ======*/
import rename from 'gulp-rename';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
/*======= 文件MD5时间戳 ======*/
import rev from 'gulp-rev';

function getDate() {
    return new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
}
let banner = [
    '/**',
    ' * <%= pkg.description %>',
    ' * ',
    ' * version:<%= pkg.version %>',
    ' * ',
    ' * author:<%= pkg.author %>',
    ' * ',
    ' * email:<%= pkg.email %>',
    ' * ',
    ' * Copyright ' + new Date().getFullYear() + '',
    ' * ',
    ' * Licensed under <%= pkg.license %>',
    ' * ',
    ' * 最近修改于： <%= date %>',
    ' */',
    ''
].join('\n') + 'console.log("version:<%= date %>");\n';

 /*======= 合并压缩js文件 ======*/
 gulp.task('js', function() {
    return browserify({
            entries: './src/js/index.js',
            debug: true
        })
        .transform("babelify", {
            presets: ["env"]
        })
        .bundle()
        .pipe(source('index.js'))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(header(banner, {
            pkg: pkg,
            date: getDate()
        }))
        .pipe(buffer())
        .pipe(rev())
        .pipe(gulp.dest('./dev/js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./src/rev'));
});