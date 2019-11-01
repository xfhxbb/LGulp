'use strict';
import gulp from 'gulp';
import del from 'del';
/*======= 增加文件头尾 ======*/
import header from 'gulp-header';
import pkg from '../package.json';
/*======= 语法检测 ======*/
import jshint from 'gulp-jshint';
import stylish from 'jshint-stylish';
import named from 'vinyl-named';
import config from './config';
import webpack from 'webpack-stream';

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

function cleanjs() {
    return del(['../dev/js/**/*', '../public/js/**/*'], { force: true });
};

/*======= 合并压缩js文件 ======*/
function devjs() {
    return gulp.src(config.entrys)
        .pipe(named())
        .pipe(webpack({
            mode: `development`,
            devtool: 'source-map'
        }))
        .pipe(gulp.dest('../dev/js'));
};

function prodjs() {
    return gulp.src(config.entrys)
        .pipe(named())
        .pipe(webpack({
            mode: `production`
        }))
        .pipe(gulp.dest('../public/js'));
};

const jstask = gulp.series(cleanjs, devjs, prodjs);
export { jstask };